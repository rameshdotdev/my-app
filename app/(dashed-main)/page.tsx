"use client";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import Profile from "./components/profile";
import Socials from "@/app/(dashed-main)/components/socials";
import ViewAllButton from "./components/view-all";
import Title from "./components/title";
import ProjectsGrid from "./components/project-grid";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import BlogCard from "./components/blogs-card";
import SkillsChips from "./components/skills-chips";
import QuoteCard from "./components/quote-card";
import SubscribeBox from "./components/subscribe-box";
import About from "./components/about";
import WorksSection from "./components/works-at";
import EducationList from "./components/education-list";
import dynamic from "next/dynamic";
import { GithubSkeleton } from "@/components/skeleton/github-skeleton";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";

function page() {
  const GithubContributions = dynamic(
    () =>
      import("@/components/github-calendar").then(
        (mod) => mod.GithubContributions,
      ),
    {
      ssr: false,
      loading: () => <GithubSkeleton />,
    },
  );
  return (
    <>
      <VerticalDashedBorderLayout>
        <Profile />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <About />
        <Socials />
        <section id="contributions">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            {/* <h2 className="text-xl font-bold">GitHub Contributions</h2> */}
            <GithubContributions />
          </BlurFade>
        </section>
      </VerticalDashedBorderLayout>

      <Title title="Experiences" />
      <VerticalDashedBorderLayout className="p-0">
        <WorksSection />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <ViewAllButton href="/experiences" />
      </VerticalDashedBorderLayout>
      <Title title="Education" />
      <VerticalDashedBorderLayout className="p-0">
        <EducationList />
      </VerticalDashedBorderLayout>
      <Title title="Projects" />
      <VerticalDashedBorderLayout className="p-0">
        <ProjectsGrid />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <ViewAllButton href="/projects" />
      </VerticalDashedBorderLayout>
      <Title title="Blogs" />
      <VerticalDashedBorderLayout className="p-0">
        <BlogCard />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <ViewAllButton href="/blogs" />
      </VerticalDashedBorderLayout>
      <Title title="Skills & Technologies" />
      <VerticalDashedBorderLayout>
        <SkillsChips />
      </VerticalDashedBorderLayout>
      <Title title="Newsletter" />
      <VerticalDashedBorderLayout className="p-0">
        <SubscribeBox />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <QuoteCard />
      </VerticalDashedBorderLayout>
    </>
  );
}

export default page;
