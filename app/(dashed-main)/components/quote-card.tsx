import { FaQuoteLeft } from "react-icons/fa";

export default function QuoteCard() {
  return (
    <div className="group relative flex flex-col items-center overflow-hidden py-10 text-center sm:py-6">
      <div className="absolute inset-0" />

      <FaQuoteLeft className="mb-6 text-4xl text-muted-foreground/30 sm:mb-6" />

      <blockquote className="relative z-10 max-w-2xl px-1 sm:px-4">
        <p className="text-xl font-bold italic leading-relaxed tracking-tight text-foreground sm:text-3xl">
          "Do so much work that it would be unreasonable for you to not be
          successful."
        </p>
      </blockquote>

      <div className="z-10 mt-6 flex items-center gap-3 sm:mt-12">
        <div className="h-px w-8 bg-muted/40" />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
          Alex Hormozi
        </span>
        <div className="h-px w-8 bg-muted/40" />
      </div>
    </div>
  );
}
