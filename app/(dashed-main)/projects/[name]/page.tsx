"use client";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import Title from "../../components/title";
import { useParams } from "next/navigation";
import ProjectDetails from "./project-details";

export default function Page() {
  const params = useParams();
  return (
    <>
      <Title title="Projects" isSubPage />

      <VerticalDashedBorderLayout className="p-0">
        <ProjectDetails />
      </VerticalDashedBorderLayout>
    </>
  );
}
