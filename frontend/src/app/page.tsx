import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import AboutPreview from "@/components/sections/AboutPreview";
import Reviews from "@/components/sections/Reviews";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="bg-background">
      <Hero />
      <Skills />
      <Projects />
      <Services />
      <AboutPreview />
      <Reviews />
      <FinalCTA />
    </main>
  );
}