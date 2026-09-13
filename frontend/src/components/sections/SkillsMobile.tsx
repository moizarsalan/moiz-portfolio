"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

const stages = [
  {
    number: "01",
    short: "FRONTEND",
    layer: "Interface Layer",
    statement: "I build the interface.",
    description:
      "Responsive and interactive interfaces built with reusable components, modern layouts and a strong focus on usability across devices.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Responsive UI",
    ],
    node: "</>",
    signal: "USER INTERACTION",
    terminalTitle: "client.render()",
    terminalLines: [
      "route → component",
      "state → interaction",
      "layout → responsive",
      "render → complete",
    ],
    status: "DOM READY",
  },

  {
    number: "02",
    short: "BACKEND",
    layer: "Application Layer",
    statement: "I power the experience.",
    description:
      "Server-side logic, APIs, validation and application workflows that connect the interface with real functionality.",
    technologies: [
      "Laravel",
      "PHP",
      "Node.js",
      "REST APIs",
      "Server Logic",
      "API Integration",
    ],
    node: "API",
    signal: "REQUEST / RESPONSE",
    terminalTitle: "POST /api/project",
    terminalLines: [
      "request → received",
      "validation → passed",
      "logic → executed",
      "response → JSON",
    ],
    status: "200 OK",
  },

  {
    number: "03",
    short: "DATABASE",
    layer: "Data Layer",
    statement: "I structure the data.",
    description:
      "Persistent application data organized through reliable relational structures designed for maintainability and efficient access.",
    technologies: [
      "MySQL",
      "Database Design",
      "Data Modeling",
      "Queries",
      "CRUD",
      "Data Integration",
    ],
    node: "DB",
    signal: "READ / WRITE",
    terminalTitle: "SELECT * FROM projects",
    terminalLines: [
      "connection → established",
      "schema → relational",
      "query → executed",
      "records → synchronized",
    ],
    status: "DATA SYNCED",
  },

  {
    number: "04",
    short: "PRODUCT",
    layer: "Delivery Layer",
    statement: "I connect every layer.",
    description:
      "Frontend, backend and persistent data combine into one optimized, maintainable and production-ready web product.",
    technologies: [
      "Git",
      "GitHub",
      "npm",
      "Dynamic Routing",
      "Optimization",
      "Deployment",
    ],
    node: "✓",
    signal: "PRODUCTION",
    terminalTitle: "npm run build",
    terminalLines: [
      "components → compiled",
      "assets → optimized",
      "routes → generated",
      "deployment → ready",
    ],
    status: "BUILD PASSED",
  },
];

export default function SkillsMobile() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (!section) return;

    if (!window.matchMedia("(max-width: 1023px)").matches) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          section.querySelectorAll(
            ".mobile-stage, .mobile-copy, .mobile-terminal, .mobile-chip, .mobile-node"
          ),
          {
            opacity: 1,
            y: 0,
            scale: 1,
          }
        );

        gsap.set(".mobile-progress", {
          scaleY: 1,
        });

        return;
      }

      /* =============================================
         INTRO
      ============================================== */

      gsap.from(".mobile-skills-intro", {
        opacity: 0,
        y: 45,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".mobile-skills-intro",
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });

      /* =============================================
         PIPELINE
      ============================================== */

      gsap.set(".mobile-progress", {
        scaleY: 0,
        transformOrigin: "top center",
      });

      gsap.to(".mobile-progress", {
        scaleY: 1,
        ease: "none",

        scrollTrigger: {
          trigger: ".mobile-story",
          start: "top 72%",
          end: "bottom 38%",
          scrub: 0.9,
        },
      });

      /* =============================================
         TRAVELLING PACKET
      ============================================== */

      gsap.set(".mobile-packet", {
        top: "0%",
      });

      gsap.to(".mobile-packet", {
        top: "100%",
        ease: "none",

        scrollTrigger: {
          trigger: ".mobile-story",
          start: "top 72%",
          end: "bottom 38%",
          scrub: 0.7,
        },
      });

      /* =============================================
         STAGES
      ============================================== */

      const stageElements =
        gsap.utils.toArray<HTMLElement>(".mobile-stage");

      stageElements.forEach((stage) => {
        const copy =
          stage.querySelector<HTMLElement>(".mobile-copy");

        const terminal =
          stage.querySelector<HTMLElement>(
            ".mobile-terminal"
          );

        const node =
          stage.querySelector<HTMLElement>(".mobile-node");

        const chips =
          stage.querySelectorAll<HTMLElement>(".mobile-chip");

        const terminalLines =
          stage.querySelectorAll<HTMLElement>(
            ".mobile-terminal-line"
          );

        const word =
          stage.querySelector<HTMLElement>(".mobile-word");

        /* -----------------------------------------
           NODE ACTIVATION
        ------------------------------------------ */

        if (node) {
          gsap.fromTo(
            node,
            {
              opacity: 0.45,
              scale: 0.68,
              boxShadow:
                "0 0 0px var(--primary-glow)",
            },
            {
              opacity: 1,
              scale: 1,
              boxShadow:
                "0 0 30px var(--primary-glow)",

              scrollTrigger: {
                trigger: stage,
                start: "top 72%",
                end: "top 47%",
                scrub: 0.7,
              },
            }
          );
        }

        /* -----------------------------------------
           COPY COMES UP
        ------------------------------------------ */

        if (copy) {
          gsap.fromTo(
            copy,
            {
              opacity: 0,
              y: 65,
              scale: 0.97,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power3.out",

              scrollTrigger: {
                trigger: stage,
                start: "top 85%",
                end: "top 52%",
                scrub: 0.85,
              },
            }
          );
        }

        /* -----------------------------------------
           TECHNOLOGIES
        ------------------------------------------ */

        if (chips.length) {
          gsap.from(chips, {
            opacity: 0,
            y: 20,
            scale: 0.9,
            stagger: 0.055,
            duration: 0.38,
            ease: "power2.out",

            scrollTrigger: {
              trigger: stage,
              start: "top 51%",
              toggleActions:
                "play none none reverse",
            },
          });
        }

        /* -----------------------------------------
           TERMINAL COMES UP AFTER CONTENT
        ------------------------------------------ */

        if (terminal) {
          gsap.fromTo(
            terminal,
            {
              opacity: 0,
              y: 80,
              scale: 0.94,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power3.out",

              scrollTrigger: {
                trigger: terminal,
                start: "top 92%",
                end: "top 65%",
                scrub: 0.8,
              },
            }
          );
        }

        /* -----------------------------------------
           TERMINAL LINES EXECUTE
        ------------------------------------------ */

        if (terminalLines.length) {
          gsap.from(terminalLines, {
            opacity: 0,
            x: 16,
            stagger: 0.1,
            duration: 0.4,

            scrollTrigger: {
              trigger: terminal ?? stage,
              start: "top 67%",
              toggleActions:
                "play none none reverse",
            },
          });
        }

        /* -----------------------------------------
           BACKGROUND WORD PARALLAX
        ------------------------------------------ */

        if (word) {
          gsap.fromTo(
            word,
            {
              xPercent: 8,
              yPercent: -8,
            },
            {
              xPercent: -12,
              yPercent: 12,

              scrollTrigger: {
                trigger: stage,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-background
        pb-24
        pt-24
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.22]" />

      <div
        className="
          pointer-events-none
          absolute
          -right-52
          top-[10%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-primary/8
          blur-[140px]
        "
      />

      {/* =============================================
          INTRO
      ============================================== */}

      <div className="container-custom relative z-10">

        <div className="mobile-skills-intro">

          <div className="flex items-center gap-2">

            <Sparkles
              size={15}
              className="text-primary"
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-primary
              "
            >
              Building the Stack
            </span>

          </div>

          <h2
            className="
              mt-5
              text-[2.6rem]
              font-bold
              leading-[0.98]
              tracking-[-0.05em]
              text-foreground
              sm:text-5xl
            "
          >
            Follow the build.

            <span className="block">
              Layer by{" "}
              <span className="text-gradient">
                layer.
              </span>
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-md
              text-sm
              leading-7
              text-muted
            "
          >
            Scroll through how interface, server logic and data
            become one complete web product.
          </p>

          <div
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-border
              bg-surface/60
              px-3
              py-2
              backdrop-blur-xl
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-success
              "
            />

            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-muted
              "
            >
              Scroll to trace architecture
            </span>
          </div>

        </div>

      </div>

      {/* =============================================
          MOBILE PIPELINE
      ============================================== */}

      <div
        className="
          mobile-story
          container-custom
          relative
          z-10
          mt-16
        "
      >
        {/* Base Line */}

        <div
          className="
            absolute
            bottom-0
            left-[25px]
            top-0
            w-px
            bg-border
          "
        />

        {/* Animated Line */}

        <div
          className="
            mobile-progress
            absolute
            bottom-0
            left-[25px]
            top-0
            z-[2]
            w-px
            origin-top
            [background:linear-gradient(to_bottom,var(--primary),var(--secondary))]
            shadow-[0_0_15px_var(--primary-glow)]
          "
        />

        {/* Travelling Packet */}

        <div
          className="
            mobile-packet
            absolute
            left-[25px]
            z-30
            h-2.5
            w-2.5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-primary
            shadow-[0_0_18px_var(--primary)]
          "
        />

        {/* =============================================
            STAGES
        ============================================== */}

        {stages.map((stage) => (
          <article
            key={stage.number}
            className="
              mobile-stage
              relative
              min-h-[780px]
              pb-24
              pl-[70px]
              pt-5
            "
          >
            {/* Giant background typography */}

            <div
              className="
                mobile-word
                pointer-events-none
                absolute
                -right-16
                top-[25%]
                -z-10
                whitespace-nowrap
                text-[24vw]
                font-black
                leading-none
                tracking-[-0.08em]
                text-foreground
                opacity-[0.025]
              "
            >
              {stage.short}
            </div>

            {/* Node */}

            <div
              className="
                mobile-node
                absolute
                left-0
                top-0
                z-20
                flex
                h-[50px]
                w-[50px]
                items-center
                justify-center
                rounded-xl
                border
                border-primary/35
                bg-background/95
                font-mono
                text-[10px]
                font-bold
                text-primary
                backdrop-blur-xl
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-[-7px]
                  rounded-2xl
                  border
                  border-primary/10
                "
              />

              {stage.node}
            </div>

            {/* Copy */}

            <div className="mobile-copy">

              <p
                className="
                  font-mono
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.19em]
                  text-primary
                "
              >
                {stage.number} / {stage.layer}
              </p>

              <h3
                className="
                  mt-4
                  text-[2.15rem]
                  font-bold
                  leading-[0.98]
                  tracking-[-0.05em]
                  text-foreground
                  sm:text-5xl
                "
              >
                {stage.statement}
              </h3>

              <p
                className="
                  mt-5
                  text-sm
                  leading-7
                  text-muted
                "
              >
                {stage.description}
              </p>

              {/* Signal */}

              <div
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-primary/20
                  bg-primary/5
                  px-3
                  py-1.5
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-primary
                    shadow-[0_0_8px_var(--primary)]
                  "
                />

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.13em]
                    text-primary
                  "
                >
                  {stage.signal}
                </span>

              </div>

              {/* Skills */}

              <div className="mt-6 flex flex-wrap gap-2">

                {stage.technologies.map(
                  (technology) => (
                    <span
                      key={technology}
                      className="
                        mobile-chip
                        rounded-lg
                        border
                        border-border
                        bg-surface/65
                        px-3
                        py-2
                        text-[10px]
                        font-medium
                        text-foreground-secondary
                        backdrop-blur-md
                      "
                    >
                      {technology}
                    </span>
                  )
                )}

              </div>

            </div>

            {/* Terminal */}

            <div
              className="
                mobile-terminal
                mt-8
                overflow-hidden
                rounded-[1.4rem]
                border
                border-border
                bg-surface/55
                p-5
                font-mono
                shadow-xl
                backdrop-blur-xl
              "
            >
              {/* Terminal header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-border
                  pb-4
                "
              >
                <div className="flex gap-1.5">

                  <span className="h-2 w-2 rounded-full bg-error/70" />

                  <span className="h-2 w-2 rounded-full bg-primary/70" />

                  <span className="h-2 w-2 rounded-full bg-success/70" />

                </div>

                <span
                  className="
                    text-[7px]
                    uppercase
                    tracking-[0.18em]
                    text-muted
                  "
                >
                  runtime
                </span>

              </div>

              {/* Command */}

              <div className="mt-5 flex gap-2">

                <span className="text-xs text-primary">
                  $
                </span>

                <span
                  className="
                    break-all
                    text-[11px]
                    text-foreground
                  "
                >
                  {stage.terminalTitle}
                </span>

              </div>

              {/* Execution */}

              <div className="mt-6 space-y-3">

                {stage.terminalLines.map(
                  (line, index) => (
                    <div
                      key={line}
                      className="
                        mobile-terminal-line
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <span
                        className="
                          text-[8px]
                          text-muted/40
                        "
                      >
                        0{index + 1}
                      </span>

                      <span
                        className="
                          text-[10px]
                          text-muted
                        "
                      >
                        {line}
                      </span>
                    </div>
                  )
                )}

              </div>

              {/* Status */}

              <div
                className="
                  mt-7
                  flex
                  items-center
                  justify-between
                  border-t
                  border-border
                  pt-4
                "
              >
                <span
                  className="
                    text-[7px]
                    uppercase
                    tracking-[0.16em]
                    text-muted
                  "
                >
                  status
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-2
                    text-[8px]
                    font-semibold
                    tracking-[0.1em]
                    text-success
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-success
                      shadow-[0_0_8px_var(--success)]
                    "
                  />

                  {stage.status}
                </span>

              </div>

              <div
                className="
                  hybrid-terminal-scan
                  pointer-events-none
                  absolute
                  left-0
                  right-0
                  h-px
                "
              />

            </div>

            {/* Continue */}

            <div
              className="
                mt-8
                flex
                items-center
                gap-3
                font-mono
                text-[8px]
                uppercase
                tracking-[0.14em]
                text-muted
              "
            >
              <span className="h-px w-8 bg-border" />

              next layer ↓
            </div>

          </article>
        ))}

        {/* End */}

        <div
          className="
            relative
            pb-12
            pl-[70px]
          "
        >
          <div
            className="
              absolute
              left-0
              top-0
              z-20
              flex
              h-[50px]
              w-[50px]
              items-center
              justify-center
              rounded-full
              [background:linear-gradient(135deg,var(--primary),var(--secondary))]
              font-mono
              text-sm
              font-bold
              text-white
              shadow-[0_0_30px_var(--primary-glow)]
            "
          >
            ✓
          </div>

          <p
            className="
              pt-1
              font-mono
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-primary
            "
          >
            BUILD COMPLETE
          </p>

          <h3
            className="
              mt-3
              text-3xl
              font-bold
              leading-[1]
              tracking-[-0.045em]
              text-foreground
            "
          >
            Full stack.

            <span className="block text-gradient">
              Connected.
            </span>
          </h3>

        </div>

      </div>
    </section>
  );
}