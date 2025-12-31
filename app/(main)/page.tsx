import { GridBackground } from "@/components/grid-background";
import Hero from "./components/hero";
import Skills from "./components/skills";
import { Navbar } from "./components/navbar";

function page() {
  return (
    <>
      <GridBackground className="min-h-screen">
        <Navbar />
        <Hero />
        <Skills/>
      </GridBackground>
    </>
  );
}

export default page;
