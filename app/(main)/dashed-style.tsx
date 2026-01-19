import { DotBackground } from "@/components/dot-background";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import Profile from "../(dashed-main)/components/profile";
import About from "../(dashed-main)/components/about";
import Socials from "@/app/(dashed-main)/components/socials";

import Experiences from "../(dashed-main)/components/experiences";
import ViewAllButton from "../(dashed-main)/components/view-all";
import Title from "../(dashed-main)/components/title";
import ProjectsGrid from "../(dashed-main)/components/project-grid";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import BlogCard from "../(dashed-main)/components/blogs-card";
import SkillsChips from "../(dashed-main)/components/skills-chips";
import QuoteCard from "../(dashed-main)/components/quote-card";
import SubscribeBox from "../(dashed-main)/components/subscribe-box";
import BgDotGrid from "@/components/bg-dot-grid";
export default function DashedStyle() {
  return (
    <>
      {/* Header */}
      <VerticalDashedBorderLayout>
        <BgDotGrid />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <Profile />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <About />
        <Socials />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <Title title="Experiences" />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <Experiences />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <ViewAllButton href="/expriences" />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <Title title="Projects" />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout className="p-0">
        <ProjectsGrid />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <ViewAllButton href="/projects" />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <Title title="Blogs" />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <BlogCard />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <ViewAllButton href="/blogs" />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <Title title="Skills & Technologies" />
      </VerticalDashedBorderLayout>

      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <SkillsChips />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <Title title="Newsletter" />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout className="p-0">
        <SubscribeBox />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <QuoteCard />
      </VerticalDashedBorderLayout>
      {/* Footer */}
      <HorizontalDashedBorder height={2} />
      <VerticalDashedBorderLayout>
        <BgDotGrid />
      </VerticalDashedBorderLayout>
    </>
  );
}
