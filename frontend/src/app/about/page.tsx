import type { Metadata } from "next";

import AboutDesktop from "@/components/about/AboutDesktop";
import AboutMobile from "@/components/about/AboutMobile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Abdul Moiz Arsalan, a Full-Stack Web Developer working across frontend development, backend systems, APIs and databases.",
};

export default function AboutPage() {
  return (
    <main className="bg-background">
      <div className="hidden lg:block">
        <AboutDesktop />
      </div>

      <div className="lg:hidden">
        <AboutMobile />
      </div>
    </main>
  );
}