import { Pin as Pinned } from "lucide-react";

function Pin() {
  return (
    <div className="absolute right-1 top-1 rounded-[8px] border border-border bg-background p-1.5 text-foreground">
      <Pinned className="h-4 w-4" />
    </div>
  );
}

export default Pin;
