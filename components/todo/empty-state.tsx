import { AlertCircle } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      <AlertCircle className="mb-4 h-10 w-10 text-muted-foreground" />
      <p className="text-sm font-medium">There is no list</p>
      <p className="text-xs text-muted-foreground">
        Press + to add the list
      </p>
    </div>
  );
}
