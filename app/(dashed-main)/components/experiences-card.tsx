import Image from "next/image";

type ExperienceItemProps = {
  logo: string;
  alt: string;
  company: string;
  type?: string; // Full Time / Part Time
  role: string;
  duration: string;
  location: string;
  points: string[];
  tags: string[];
};

function ExprerienceCard({
  logo,
  alt,
  company,
  type,
  role,
  duration,
  location,
  points,
  tags,
}: ExperienceItemProps) {
  return (
    <div className="m-1">
      <div className="flex flex-col">
        {/* Header Row */}
        <div className="group flex select-none flex-row justify-between gap-4 p-3 transition-colors duration-300">
          {/* Left */}
          <div className="flex flex-1 items-center gap-3 truncate sm:truncate-none">
            {/* Logo */}
            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-background p-[2px] sm:size-12">
              <Image
                src={logo}
                alt={alt}
                width={56}
                height={56}
                draggable={false}
                className="h-full w-full rounded-[8px] border border-border object-cover"
              />
            </div>

            {/* Company + Role */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[1.05rem] font-semibold leading-[0.90] text-foreground sm:text-[1.20rem]">
                  {company}
                </h3>

                {type ? (
                  <span className="rounded-[4px] border border-border px-1 py-0 text-xs font-medium text-muted-foreground">
                    {type}
                  </span>
                ) : null}
              </div>

              <p className="text-xs text-muted-foreground sm:text-sm">{role}</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs font-medium text-foreground sm:text-sm">
                {duration}
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {location}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="ml-4 mt-1 overflow-hidden">
          <div className="flex flex-col gap-2">
            {points.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="shrink-0 text-muted-foreground">•</span>
                <p className="text-sm leading-relaxed text-foreground">{p}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="my-3 flex flex-wrap items-center gap-1.5 select-none">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-[4px] border border-border bg-muted px-1.5 py-0.5 text-xs text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExprerienceCard;
