import Image from "next/image";
import Link from "next/link";

type ExperienceItemProps = {
  logo: string;
  alt: string;
  company: string;
  type?: string; // Full Time / Part Time
  href?: string;
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
  href,
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
                className="h-full w-full rounded-[8px] border border-border object-contain"
              />
            </div>

            {/* Company + Role */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <Link target="_blank" href={href ?? "#"}>
                  <h3
                    className="relative text-[1.05rem] font-semibold leading-[0.90] text-foreground sm:text-[1.20rem] transition-colors hover:text-foreground
                               after:absolute after:-bottom-1 after:left-0
                               after:h-0.5 after:w-0 after:bg-primary
                               after:transition-all hover:after:w-full"
                  >
                    {company}
                  </h3>
                </Link>

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
