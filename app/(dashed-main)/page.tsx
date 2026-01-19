import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import Profile from "./components/profile";
import Socials from "@/app/(dashed-main)/components/socials";
import Experiences from "./components/experiences";
import ViewAllButton from "./components/view-all";
import Title from "./components/title";
import ProjectsGrid from "./components/project-grid";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import BlogCard from "./components/blogs-card";
import SkillsChips from "./components/skills-chips";
import QuoteCard from "./components/quote-card";
import SubscribeBox from "./components/subscribe-box";
import BgDotGrid from "@/components/bg-dot-grid";
import About from "./components/about";
function page() {
  return (
    <>
      <VerticalDashedBorderLayout>
        <Profile />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <About />
        <Socials />
      </VerticalDashedBorderLayout>
      <Title title="Experiences" />
      <VerticalDashedBorderLayout className="p-0">
        <Experiences />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <ViewAllButton href="/experiences" />
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
      {/* <DotBackground gridSize={32} isOverlay={true} className="min-h-screen">
        <div className="relative max-w-[95%] lg:max-w-[80%] px-2 mx-auto space-y-28 pt-10 md:pt-24">
          <Hero />
          <Skills />
          <ProjectsPage />
          <ContactForm />
        </div>
        <Footer />
      </DotBackground> */}
    </>
  );
}

export default page;
