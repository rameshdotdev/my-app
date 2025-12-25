import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden py-0">
      <Skeleton className="h-40 w-full" />

      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />

        <div className="flex items-center justify-between pt-3">
          <Skeleton className="h-5 w-10" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>
    </Card>
  );
}
