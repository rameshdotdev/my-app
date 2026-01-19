"use client";

import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
};

export default function ImagePreviewModal({
  open,
  onClose,
  src,
  alt = "Preview",
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close"
        draggable={false}
        onClick={onClose}
        className="fixed right-4 top-4 z-10 cursor-pointer rounded-full border border-border bg-muted p-3 text-foreground transition duration-300 hover:bg-muted/70"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Image box */}
      <div
        className="h-fit w-[450px] max-w-full cursor-default overflow-hidden rounded-[10px] border border-border bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1200}
          draggable={false}
          priority
          className="select-none object-contain"
        />
      </div>
    </div>
  );
}
