"use client";
import { memo, Suspense } from "react";
import dynamic from "next/dynamic";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import ViewAllButton from "./components/view-all";
import Title from "./components/title";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import SkillsChips from "./components/skills-chips";
import QuoteCard from "./components/quote-card";
import SubscribeBox from "./components/subscribe-box";
import WorksSection from "./components/works-at";
import EducationList from "./components/education-list";
import { GithubSkeleton } from "@/components/skeleton/github-skeleton";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import {
  AboutSkeleton,
  ProfileSkeleton,
  ProjectsGridListSkeleton,
} from "./skeleton";
import { getLoadingState } from "@/store/features/loadingSlice";
import { useAppSelector } from "@/hooks/hooks";
import SocialsSkeleton from "./socials-skeleton";

// Dynamic imports for heavy components
const Profile = dynamic(
  () => import("./components/profile").then((mod) => mod.default),
  { loading: () => <ProfileSkeleton />, ssr: false },
);

const About = dynamic(
  () => import("./components/about").then((mod) => mod.default),
  { loading: () => <AboutSkeleton />, ssr: false },
);

const Socials = dynamic(
  () => import("./components/socials").then((mod) => mod.default),
  { loading: () => <SocialsSkeleton />, ssr: false },
);

const GithubContributions = dynamic(
  () =>
    import("@/components/github-calendar").then(
      (mod) => mod.GithubContributions,
    ),
  { loading: () => <GithubSkeleton />, ssr: false },
);

const ProjectsGridList = dynamic(
  () => import("./components/project-list").then((mod) => mod.default),
  { loading: () => <ProjectsGridListSkeleton />, ssr: false },
);

const BelowFoldContent = memo(() => (
  <>
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
      <Suspense fallback={<ProjectsGridListSkeleton />}>
        <ProjectsGridList />
      </Suspense>
    </VerticalDashedBorderLayout>
    <HorizontalDashedBorder />
    <VerticalDashedBorderLayout>
      <ViewAllButton href="/projects" />
    </VerticalDashedBorderLayout>
  </>
));
BelowFoldContent.displayName = "BelowFoldContent";

function page() {
  const isLoading = useAppSelector(getLoadingState);

  if (isLoading) {
    return (
      <>
        <VerticalDashedBorderLayout>
          <ProfileSkeleton />
        </VerticalDashedBorderLayout>
        <HorizontalDashedBorder />
        <VerticalDashedBorderLayout>
          <AboutSkeleton />
          <SocialsSkeleton />
          <GithubSkeleton />
        </VerticalDashedBorderLayout>
      </>
    );
  }

  return (
    <>
      <VerticalDashedBorderLayout>
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile />
        </Suspense>
      </VerticalDashedBorderLayout>

      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <Suspense fallback={<AboutSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SocialsSkeleton />}>
          <Socials />
        </Suspense>
        <section id="contributions">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <Suspense fallback={<GithubSkeleton />}>
              <GithubContributions />
            </Suspense>
          </BlurFade>
        </section>
      </VerticalDashedBorderLayout>

      <Suspense fallback={<div />}>
        <BelowFoldContent />
      </Suspense>
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
