import { DotBackground } from "@/components/dot-background";
import Hero from "./components/hero";
import SkillBoardPreview from "./components/skills";
// import ProjectsPage from "./components/projects";
import { ContactForm } from "./components/contact-form";
import { Footer } from "./components/footer";

function page() {
  return (
    <div>
      <DotBackground gridSize={32} isOverlay={true} className="min-h-screen">
        <div className="relative max-w-[95%] lg:max-w-[80%] px-2 mx-auto space-y-28 pt-10 md:pt-24">
          <Hero />
          <SkillBoardPreview />
          {/* <ProjectsPage /> */}
          <ContactForm />
        </div>
        <Footer />
      </DotBackground>
    </div>
  );
}

export default page;
