import { GridBackground } from "@/components/grid-background";
import Hero from "./components/hero";
import { Navbar } from "./components/navbar";

function page() {
  return (
    <>
      <GridBackground className="min-h-screen">
        <Navbar />
        <Hero />
      </GridBackground>
    </>
  );
}

export default page;
