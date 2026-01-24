"use client";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import ViewAllButton from "./components/view-all";
import Title from "./components/title";
import ProjectsGrid from "./components/project-grid";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import BlogCard from "./components/blogs-card";
import SkillsChips from "./components/skills-chips";
import QuoteCard from "./components/quote-card";
import SubscribeBox from "./components/subscribe-box";
import WorksSection from "./components/works-at";
import EducationList from "./components/education-list";
import dynamic from "next/dynamic";
import { GithubSkeleton } from "@/components/skeleton/github-skeleton";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import { AboutSkeleton, ProfileSkeleton } from "./skeleton";
import { getLoadingState } from "@/store/features/loadingSlice";
import { useAppSelector } from "@/hooks/hooks";
import SocialsSkeleton from "./socials-skeleton";

function page() {
  const isLoading = useAppSelector(getLoadingState);
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
  const Profile = dynamic(
    () => import("./components/profile").then((mod) => mod.default),
    {
      ssr: false,
      loading: () => <ProfileSkeleton />,
    },
  );
  const About = dynamic(
    () => import("./components/about").then((mod) => mod.default),
    {
      ssr: false,
      loading: () => <AboutSkeleton />,
    },
  );
  const Socials = dynamic(
    () => import("./components/socials").then((mod) => mod.default),
    {
      ssr: false,
      loading: () => <SocialsSkeleton />,
    },
  );
  return (
    <>
      <VerticalDashedBorderLayout>
        {isLoading ? <ProfileSkeleton /> : <Profile />}
      </VerticalDashedBorderLayout>

      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        {isLoading ? <AboutSkeleton /> : <About />}
        {isLoading ? <SocialsSkeleton /> : <Socials />}
        {isLoading ? (
          <GithubSkeleton />
        ) : (
          <section id="contributions">
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <GithubContributions />
            </BlurFade>
          </section>
        )}
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
