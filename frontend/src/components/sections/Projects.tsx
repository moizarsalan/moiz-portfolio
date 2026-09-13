import ProjectsDesktop from "./ProjectsDesktop";
import ProjectsMobile from "./ProjectsMobile";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-border/50 bg-background"
    >
      <div className="hidden lg:block">
        <ProjectsDesktop />
      </div>

      <div className="lg:hidden">
        <ProjectsMobile />
      </div>
    </section>
  );
}