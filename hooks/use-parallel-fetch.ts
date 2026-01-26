import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type EndpointMap = Record<string, string>;

export type ParallelErrors<TEndpoints extends EndpointMap> = Partial<
  Record<keyof TEndpoints, string>
>;

export type ParallelResult<
  TResponse,
  TEndpoints extends EndpointMap
> = TResponse & {
  __errors?: ParallelErrors<TEndpoints>;
};
async function fetchParallelSettled<TResponse, TEndpoints extends EndpointMap>(
  endpoints: TEndpoints,
  options?: { skipAuth?: boolean }
): Promise<ParallelResult<TResponse, TEndpoints>> {
  const keys = Object.keys(endpoints) as (keyof TEndpoints)[];

  const settled = await Promise.allSettled(
    keys.map((key) =>
      api.get(endpoints[key], {
        ...(options?.skipAuth ? ({ skipAuth: true } as any) : {}),
      })
    )
  );

  const result: any = {};
  const errors: any = {};

  settled.forEach((item, index) => {
    const key = keys[index];

    if (item.status === "fulfilled") {
      result[key] = item.value.data;
    } else {
      // axios error message fallback
      const message =
        (item.reason?.response?.data?.message as string) ||
        item.reason?.message ||
        "Request failed";

      errors[key] = message;
      result[key] = null; // keep key present
    }
  });

  if (Object.keys(errors).length > 0) {
    result.__errors = errors;
  }

  return result as ParallelResult<TResponse, TEndpoints>;
}

export function useParallelQuery<
  TResponse,
  TEndpoints extends EndpointMap = EndpointMap
>(
  queryKey: string[],
  endpoints: TEndpoints,
  options?: { enabled?: boolean; skipAuth?: boolean }
) {
  return useQuery<ParallelResult<TResponse, TEndpoints>>({
    queryKey,
    queryFn: () => fetchParallelSettled<TResponse, TEndpoints>(endpoints, options),
    staleTime: 1000 * 60 * 5,
    enabled: options?.enabled ?? true,
  });
}
