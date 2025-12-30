import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type EndpointMap = Record<string, string>;

async function fetchParallel<TResponse, TEndpoints extends EndpointMap>(
  endpoints: TEndpoints
): Promise<TResponse> {
  const keys = Object.keys(endpoints) as (keyof TEndpoints)[];
  const requests = keys.map((key) => api.get(endpoints[key]));

  const responses = await Promise.all(requests);

  const result: Partial<TResponse> = {};
  responses.forEach((res, index) => {
    (result as any)[keys[index]] = res.data;
  });

  return result as TResponse;
}

export function useParallelQuery<
  TResponse,
  TEndpoints extends EndpointMap = EndpointMap // ✅ DEFAULT
>(queryKey: string[], endpoints: TEndpoints) {
  return useQuery<TResponse>({
    queryKey,
    queryFn: () => fetchParallel<TResponse, TEndpoints>(endpoints),
    staleTime: 1000 * 60 * 5,
  });
}
