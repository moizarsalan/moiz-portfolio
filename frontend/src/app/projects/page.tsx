import type { Metadata } from "next";

import ProjectsPageClient from "@/components/projects/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",

  description:
    "Explore web development projects by Abdul Moiz Arsalan, including interactive websites, dashboards and hospitality web experiences.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-background">
      <ProjectsPageClient />
    </main>
  );
}