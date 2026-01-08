import Meteors from "@/components/ui/meteors";

export function MeteorsBackground() {
  return (
    <div className="fixed inset-0 z-1 overflow-hidden pointer-events-none">
      <Meteors number={70} />
    </div>
  );
}
