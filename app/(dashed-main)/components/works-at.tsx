"use client";

import { useEffect, useMemo, useState } from "react";

import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import ExperienceList from "./experience-list";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getWorksData, setWorksData } from "@/store/features/workSlice";
import { useFetch } from "@/hooks/use-fetch";
import { Work } from "@/types/work";

export default function WorksSection() {
  const dispatch = useAppDispatch();
  const { data } = useFetch<Work[]>("/works-at", {
    revalidate: 120,
    tags: ["works-at"],
  });
  useEffect(() => {
    if (data) {
      dispatch(setWorksData(data));
    }
  }, [data, dispatch]);
  const works = useAppSelector(getWorksData);
  const sortedWorks = useMemo(() => {
    if (!works?.length) return [];

    return [...works].sort((a, b) => {
      const aPresent = String(a.end).toLowerCase() === "present";
      const bPresent = String(b.end).toLowerCase() === "present";

      // Present should come first
      if (aPresent && !bPresent) return -1;
      if (!aPresent && bPresent) return 1;

      return 0; // keep original order for others
    });
  }, [works]);

  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!sortedWorks.length) return;
    setOpenId(sortedWorks[0]._id); // first card open
  }, [sortedWorks]);

  if (!sortedWorks.length) return null;

  return (
    <div>
      {sortedWorks.map((work, idx) => {
        const isOpen = openId === work._id;

        return (
          <div key={work._id}>
            <ExperienceList
              logo={work.logoUrl?.url || "/placeholder.webp"}
              alt={work.company}
              company={work.company}
              type={work.type}
              role={work.role}
              href={work?.href}
              duration={`${work.start} - ${work.end}`}
              location={`${work.location} - ${work.location_type}`}
              points={work.points}
              tags={work.tags}
              isOpen={isOpen}
              onToggle={() => setOpenId(isOpen ? null : work._id)}
            />

            {sortedWorks.length !== idx + 1 && (
              <HorizontalDashedBorder height={2} />
            )}
          </div>
        );
      })}
    </div>
  );
}
