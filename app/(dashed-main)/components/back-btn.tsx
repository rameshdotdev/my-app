"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

function BackBtn({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      className={cn(
        "z-50 border border-border rounded-[10px] p-[2px] shadow-lg group cursor-pointer transition-all duration-300 ease-out hover:shadow-xl",
        className,
      )}
    >
      <div
        className="
          flex items-center justify-center
          rounded-[8px]
          border border-border
          w-full h-full p-1.5
          transition-colors duration-300
          group-hover:bg-muted/60
        "
      >
        <IoChevronBack className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      </div>
    </button>
  );
}

export default BackBtn;
