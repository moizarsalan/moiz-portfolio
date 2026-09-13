import type { Metadata } from "next";

import ProjectOrderForm from "@/components/forms/ProjectOrderForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Start a web development project with Abdul Moiz Arsalan. Build a project brief covering requirements, scope, timeline and contact information.",
};

export default function OrderPage() {
  return (
    <main className="bg-background">
      <ProjectOrderForm />
    </main>
  );
}