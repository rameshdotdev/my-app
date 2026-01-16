import Hero from "./components/hero";
import Skills from "./components/skills";
// import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import ProjectsPage from "./components/projects";
import { ContactForm } from "./components/contact-form";
import { DotBackground } from "@/components/dot-background";

function page() {
  return (
    <>
      <DotBackground gridSize={32} isOverlay={true} className="min-h-screen">
        <div className="relative max-w-[95%] lg:max-w-[80%] px-2 mx-auto space-y-28 pt-10 md:pt-24">
          <Hero />
          <Skills />
          <ProjectsPage />
          <ContactForm />
        </div>
        <Footer />
      </DotBackground>
    </>
  );
}

export default page;
