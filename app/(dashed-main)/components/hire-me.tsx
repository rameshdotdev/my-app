"use client";

export function FloatingHireMe({ email }: { email: string }) {
  return (
    <div className="absolute -top-18 -left-26 hidden -rotate-14 flex-col items-center justify-center select-none transition-all duration-700 lg:flex group">
      <a
        className="mr-6 cursor-pointer select-none text-xl text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-foreground shake-on-hover caveat-400"
        href={`mailto:${email}`}
      >
        HIRE ME
      </a>

      <svg
        width="100"
        height="100"
        viewBox="0 0 512 512"
        fill="none"
        className="size-16 rotate-12 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
      >
        <path
          d="M 437 441 Q 363 418, 264 351 Q 198 295, 160 225 Q 138 178, 122 119"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 161 149 L 125 73"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 123 71 L 83 148"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
