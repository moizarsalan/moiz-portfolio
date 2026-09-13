import ServicesDesktop from "./ServicesDesktop";
import ServicesMobile from "./ServicesMobile";

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-border/50 bg-background"
    >
      <div className="hidden lg:block">
        <ServicesDesktop />
      </div>

      <div className="lg:hidden">
        <ServicesMobile />
      </div>
    </section>
  );
}