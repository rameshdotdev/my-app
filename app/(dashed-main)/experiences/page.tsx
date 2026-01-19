"use client";
import Title from "../components/title";
import ExperienceCard from "../components/experiences-card";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import { useAppSelector } from "@/hooks/hooks";
import { getWorksData } from "@/store/features/workSlice";

export default function Page() {
  const works = useAppSelector(getWorksData);

  if (!works?.length) return null;

  return (
    <>
      <Title title="Experiences" isSubPage />

      <VerticalDashedBorderLayout className="p-0">
        {works.map((work, idx) => (
          <div key={work._id}>
            <ExperienceCard
              logo={work.logoUrl?.url || "/placeholder.webp"}
              alt={work.company}
              company={work.company}
              type={work.type}
              href={work?.href}
              role={work.role}
              duration={`${work.start} - ${work.end}`}
              location={`${work.location} - ${work.location_type}`}
              points={work.points}
              tags={work.tags}
            />

            {works.length !== idx + 1 && <HorizontalDashedBorder height={2} />}
          </div>
        ))}
      </VerticalDashedBorderLayout>
    </>
  );
}
