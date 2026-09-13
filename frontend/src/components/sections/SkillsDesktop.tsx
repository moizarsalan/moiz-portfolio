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
    title: "Frontend",
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
    side: "left",
  },

  {
    number: "02",
    short: "BACKEND",
    layer: "Application Layer",
    title: "Backend",
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
    side: "right",
  },

  {
    number: "03",
    short: "DATABASE",
    layer: "Data Layer",
    title: "Database",
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
    side: "left",
  },

  {
    number: "04",
    short: "PRODUCT",
    layer: "Delivery Layer",
    title: "Complete Product",
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
    side: "right",
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          section.querySelectorAll(
            [
              ".hybrid-intro",
              ".hybrid-copy",
              ".hybrid-terminal",
              ".hybrid-node",
              ".hybrid-chip",
              ".hybrid-terminal-line",
              ".hybrid-signal",
              ".hybrid-connector",
            ].join(",")
          ),
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          }
        );

        gsap.set(".hybrid-progress", {
          scaleY: 1,
        });

        return;
      }

      /* =====================================================
         INTRO
      ====================================================== */

      gsap.from(".hybrid-intro", {
        opacity: 0,
        y: 55,
        duration: 0.9,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".hybrid-intro",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      /* =====================================================
         PIPELINE
      ====================================================== */

      gsap.set(".hybrid-progress", {
        scaleY: 0,
        transformOrigin: "top center",
      });

      gsap.to(".hybrid-progress", {
        scaleY: 1,
        ease: "none",

        scrollTrigger: {
          trigger: ".hybrid-story",
          start: "top 65%",
          end: "bottom 42%",
          scrub: 1,
        },
      });

      /* =====================================================
         DATA PACKET
      ====================================================== */

      gsap.set(".hybrid-packet", {
        top: "0%",
      });

      gsap.to(".hybrid-packet", {
        top: "100%",
        ease: "none",

        scrollTrigger: {
          trigger: ".hybrid-story",
          start: "top 65%",
          end: "bottom 42%",
          scrub: 0.75,
        },
      });

      /* =====================================================
         INDIVIDUAL STAGES
      ====================================================== */

      const stageElements =
        gsap.utils.toArray<HTMLElement>(".hybrid-stage");

      stageElements.forEach((stage) => {
        const side = stage.dataset.side ?? "left";

        const copy =
          stage.querySelector<HTMLElement>(".hybrid-copy");

        const terminal =
          stage.querySelector<HTMLElement>(".hybrid-terminal");

        const node =
          stage.querySelector<HTMLElement>(".hybrid-node");

        const connectorLeft =
          stage.querySelector<HTMLElement>(".hybrid-connector-left");

        const connectorRight =
          stage.querySelector<HTMLElement>(".hybrid-connector-right");

        const chips =
          stage.querySelectorAll<HTMLElement>(".hybrid-chip");

        const terminalLines =
          stage.querySelectorAll<HTMLElement>(
            ".hybrid-terminal-line"
          );

        const signal =
          stage.querySelector<HTMLElement>(".hybrid-signal");

        const word =
          stage.querySelector<HTMLElement>(
            ".hybrid-background-word"
          );

        /* -----------------------------------------------
           STAGE DEPTH
        ------------------------------------------------ */

        gsap.fromTo(
          stage,
          {
            opacity: 0.5,
          },
          {
            opacity: 1,

            scrollTrigger: {
              trigger: stage,
              start: "top 80%",
              end: "center 55%",
              scrub: 0.8,
            },
          }
        );

        /* -----------------------------------------------
           COPY
        ------------------------------------------------ */

        if (copy) {
          gsap.fromTo(
            copy,
            {
              opacity: 0,
              x: side === "left" ? -85 : 85,
              y: 55,
              scale: 0.96,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              ease: "power3.out",

              scrollTrigger: {
                trigger: stage,
                start: "top 80%",
                end: "center 59%",
                scrub: 0.9,
              },
            }
          );
        }

        /* -----------------------------------------------
           TERMINAL
        ------------------------------------------------ */

        if (terminal) {
          gsap.fromTo(
            terminal,
            {
              opacity: 0,
              x: side === "left" ? 85 : -85,
              y: 70,
              scale: 0.94,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              ease: "power3.out",

              scrollTrigger: {
                trigger: stage,
                start: "top 75%",
                end: "center 55%",
                scrub: 0.95,
              },
            }
          );
        }

        /* -----------------------------------------------
           NODE
        ------------------------------------------------ */

        if (node) {
          gsap.fromTo(
            node,
            {
              opacity: 0.5,
              scale: 0.65,
              boxShadow:
                "0 0 0px var(--primary-glow)",
            },
            {
              opacity: 1,
              scale: 1,
              boxShadow:
                "0 0 40px var(--primary-glow)",

              scrollTrigger: {
                trigger: stage,
                start: "top 67%",
                end: "center 51%",
                scrub: true,
              },
            }
          );
        }

        /* -----------------------------------------------
           CONNECTORS
        ------------------------------------------------ */

        if (connectorLeft) {
          gsap.fromTo(
            connectorLeft,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,

              scrollTrigger: {
                trigger: stage,
                start: "top 68%",
                end: "center 53%",
                scrub: 0.8,
              },
            }
          );
        }

        if (connectorRight) {
          gsap.fromTo(
            connectorRight,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,

              scrollTrigger: {
                trigger: stage,
                start: "top 68%",
                end: "center 53%",
                scrub: 0.8,
              },
            }
          );
        }

        /* -----------------------------------------------
           TECHNOLOGY TAGS RISE UP
        ------------------------------------------------ */

        if (chips.length) {
          gsap.from(chips, {
            opacity: 0,
            y: 24,
            scale: 0.9,
            stagger: 0.055,
            duration: 0.42,
            ease: "power2.out",

            scrollTrigger: {
              trigger: stage,
              start: "center 70%",
              toggleActions:
                "play none none reverse",
            },
          });
        }

        /* -----------------------------------------------
           TERMINAL PROCESSING
        ------------------------------------------------ */

        if (terminalLines.length) {
          gsap.from(terminalLines, {
            opacity: 0,
            x: 22,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out",

            scrollTrigger: {
              trigger: stage,
              start: "center 67%",
              toggleActions:
                "play none none reverse",
            },
          });
        }

        /* -----------------------------------------------
           SIGNAL
        ------------------------------------------------ */

        if (signal) {
          gsap.from(signal, {
            opacity: 0,
            y: 15,
            scale: 0.9,
            duration: 0.4,

            scrollTrigger: {
              trigger: stage,
              start: "center 73%",
              toggleActions:
                "play none none reverse",
            },
          });
        }

        /* -----------------------------------------------
           BACKGROUND TYPOGRAPHY PARALLAX
        ------------------------------------------------ */

        if (word) {
          gsap.fromTo(
            word,
            {
              xPercent: side === "left" ? 10 : -10,
              yPercent: -2,
            },
            {
              xPercent: side === "left" ? -10 : 10,
              yPercent: 5,

              scrollTrigger: {
                trigger: stage,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8,
              },
            }
          );
        }
      });

      /* =====================================================
         AMBIENT LIGHT PARALLAX
      ====================================================== */

      gsap.to(".hybrid-glow-left", {
        y: 180,
        x: 70,

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".hybrid-glow-right", {
        y: -180,
        x: -60,

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
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
      id="skills"
      className="
        relative
        overflow-hidden
        border-t border-border/50
        bg-background
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.25]" />

      <div
        className="
          hybrid-glow-left
          pointer-events-none
          absolute
          -left-56
          top-[12%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-primary/7
          blur-[160px]
        "
      />

      <div
        className="
          hybrid-glow-right
          pointer-events-none
          absolute
          -right-56
          bottom-[12%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-secondary/7
          blur-[160px]
        "
      />

      {/* =====================================================
          INTRO
      ====================================================== */}

      <div
        className="
          container-custom
          relative
          z-10
          pb-16
          pt-28
          lg:pb-20
          lg:pt-36
        "
      >
        <div className="hybrid-intro max-w-4xl">

          <div className="mb-5 flex items-center gap-2">

            <Sparkles
              size={16}
              className="text-primary"
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.24em]
                text-primary
              "
            >
              Building the Stack
            </span>

          </div>

          <h2
            className="
              text-4xl
              font-bold
              leading-[1.03]
              tracking-[-0.045em]
              text-foreground
              sm:text-5xl
              lg:text-6xl
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
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-foreground-secondary
              md:text-lg
            "
          >
            Scroll through the development architecture and see
            how interface, server logic and data connect into one
            complete product.
          </p>

          {/* Architecture mini bar */}

          <div
            className="
              mt-9
              inline-flex
              max-w-full
              flex-wrap
              items-center
              gap-3
              rounded-full
              border
              border-border
              bg-surface/55
              px-4
              py-2.5
              backdrop-blur-xl
            "
          >
            <span className="font-mono text-[10px] text-primary">
              UI
            </span>

            <span className="text-muted">
              →
            </span>

            <span className="font-mono text-[10px] text-muted">
              API
            </span>

            <span className="text-muted">
              →
            </span>

            <span className="font-mono text-[10px] text-muted">
              DATA
            </span>

            <span className="text-muted">
              →
            </span>

            <span className="font-mono text-[10px] text-secondary-bright">
              SHIP
            </span>

            <span className="mx-1 hidden h-4 w-px bg-border sm:block" />

            <span className="hidden items-center gap-2 sm:flex">

              <span
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-success
                "
              />

              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                  text-muted
                "
              >
                Pipeline active
              </span>

            </span>

          </div>

        </div>
      </div>

      {/* =====================================================
          SCROLLING ARCHITECTURE
      ====================================================== */}

      <div
        className="
          hybrid-story
          container-custom
          relative
          z-10
        "
      >
        {/* BASE LINE */}

        <div
          className="
            absolute
            bottom-0
            left-[25px]
            top-0
            w-px
            bg-border
            lg:left-1/2
            lg:-translate-x-1/2
          "
        />

        {/* PROGRESS LINE */}

        <div
          className="
            hybrid-progress
            absolute
            bottom-0
            left-[25px]
            top-0
            z-[3]
            w-px
            origin-top
            [background:linear-gradient(to_bottom,var(--primary),var(--secondary))]
            shadow-[0_0_20px_var(--primary-glow)]
            lg:left-1/2
            lg:-translate-x-1/2
          "
        />

        {/* TRAVELLING PACKET */}

        <div
          className="
            hybrid-packet
            absolute
            left-[25px]
            z-30
            h-3
            w-3
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-primary
            shadow-[0_0_25px_var(--primary)]
            lg:left-1/2
          "
        />

        {/* =================================================
            STAGES
        ================================================== */}

        {stages.map((stage) => {
          const copyLeft =
            stage.side === "left";

          return (
            <article
              key={stage.number}
              data-side={stage.side}
              className="
                hybrid-stage
                relative
                min-h-[680px]
                py-16
                lg:flex
                lg:min-h-[82vh]
                lg:items-center
                lg:py-20
              "
            >
              {/* =============================================
                  GIANT BACKGROUND WORD
              ============================================== */}

              <div
                className="
                  hybrid-background-word
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  -z-10
                  -translate-x-1/2
                  -translate-y-1/2
                  whitespace-nowrap
                  text-[17vw]
                  font-black
                  leading-none
                  tracking-[-0.08em]
                  text-foreground
                  opacity-[0.025]
                "
              >
                {stage.short}
              </div>

              {/* =============================================
                  MOBILE NODE
              ============================================== */}

              <div
                className="
                  absolute
                  left-0
                  top-16
                  z-20
                  flex
                  w-[52px]
                  justify-center
                  lg:hidden
                "
              >
                <div
                  className="
                    hybrid-node
                    flex
                    h-[52px]
                    w-[52px]
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-primary/35
                    bg-background
                    font-mono
                    text-[11px]
                    font-bold
                    text-primary
                  "
                >
                  {stage.node}
                </div>
              </div>

              {/* =============================================
                  DESKTOP / MOBILE GRID
              ============================================== */}

              <div
                className="
                  ml-[72px]
                  grid
                  w-full
                  gap-8
                  lg:ml-0
                  lg:grid-cols-[minmax(0,1fr)_110px_minmax(0,1fr)]
                  lg:items-center
                  lg:gap-8
                  xl:gap-12
                "
              >
                {/* =============================================
                    CENTER NODE
                ============================================== */}

                <div
                  className="
                    hidden
                    lg:col-start-2
                    lg:row-start-1
                    lg:flex
                    lg:items-center
                    lg:justify-center
                  "
                >
                  {/* Left connector */}

                  <div
                    className="
                      hybrid-connector
                      hybrid-connector-left
                      absolute
                      left-[calc(50%-110px)]
                      h-px
                      w-[55px]
                      origin-right
                      bg-gradient-to-l
                      from-primary/60
                      to-transparent
                    "
                  />

                  {/* Node */}

                  <div
                    className="
                      hybrid-node
                      relative
                      z-20
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-[1.6rem]
                      border
                      border-primary/35
                      bg-background/90
                      font-mono
                      text-sm
                      font-bold
                      text-primary
                      backdrop-blur-xl
                    "
                  >
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-[-12px]
                        rounded-[2rem]
                        border
                        border-primary/10
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-2
                        rounded-[1.2rem]
                        [background:radial-gradient(circle,var(--primary-glow),transparent_70%)]
                      "
                    />

                    <span className="relative z-10">
                      {stage.node}
                    </span>
                  </div>

                  {/* Right connector */}

                  <div
                    className="
                      hybrid-connector
                      hybrid-connector-right
                      absolute
                      right-[calc(50%-110px)]
                      h-px
                      w-[55px]
                      origin-left
                      bg-gradient-to-r
                      from-primary/60
                      to-transparent
                    "
                  />

                </div>

                {/* =============================================
                    COPY
                ============================================== */}

                <div
                  className={`
                    hybrid-copy
                    min-w-0

                    ${
                      copyLeft
                        ? "lg:col-start-1 lg:row-start-1"
                        : "lg:col-start-3 lg:row-start-1"
                    }
                  `}
                >
                  <div
                    className={`
                      ${
                        copyLeft
                          ? ""
                          : "lg:pl-3"
                      }
                    `}
                  >
                    <p
                      className="
                        font-mono
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-primary
                      "
                    >
                      {stage.number} / {stage.layer}
                    </p>

                    <h3
                      className="
                        mt-5
                        max-w-xl
                        text-4xl
                        font-bold
                        leading-[0.96]
                        tracking-[-0.05em]
                        text-foreground
                        sm:text-5xl
                        xl:text-6xl
                      "
                    >
                      {stage.statement}
                    </h3>

                    <p
                      className="
                        mt-6
                        max-w-lg
                        text-sm
                        leading-7
                        text-muted
                        sm:text-base
                      "
                    >
                      {stage.description}
                    </p>

                    {/* Signal */}

                    <div
                      className="
                        hybrid-signal
                        mt-7
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
                          shadow-[0_0_10px_var(--primary)]
                        "
                      />

                      <span
                        className="
                          font-mono
                          text-[9px]
                          uppercase
                          tracking-[0.15em]
                          text-primary
                        "
                      >
                        {stage.signal}
                      </span>
                    </div>

                    {/* Technologies */}

                    <div
                      className="
                        mt-8
                        flex
                        max-w-xl
                        flex-wrap
                        gap-2
                      "
                    >
                      {stage.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="
                              hybrid-chip
                              rounded-lg
                              border
                              border-border
                              bg-surface/65
                              px-3
                              py-2
                              text-xs
                              font-medium
                              text-foreground-secondary
                              backdrop-blur-md
                              transition-all
                              duration-300
                              hover:-translate-y-1
                              hover:border-primary/40
                              hover:text-primary
                              hover:shadow-[0_0_14px_var(--primary-glow)]
                            "
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>

                  </div>
                </div>

                {/* =============================================
                    TERMINAL
                ============================================== */}

                <div
                  className={`
                    hybrid-terminal
                    min-w-0

                    ${
                      copyLeft
                        ? "lg:col-start-3 lg:row-start-1"
                        : "lg:col-start-1 lg:row-start-1"
                    }
                  `}
                >
                  <div
                    className="
                      hybrid-terminal-box
                      relative
                      overflow-hidden
                      rounded-[1.8rem]
                      border
                      border-border
                      bg-surface/55
                      p-6
                      font-mono
                      shadow-2xl
                      backdrop-blur-xl
                      sm:p-7
                    "
                  >
                    {/* top */}

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
                          text-[8px]
                          uppercase
                          tracking-[0.18em]
                          text-muted
                        "
                      >
                        runtime
                      </span>
                    </div>

                    {/* Command */}

                    <div
                      className="
                        mt-6
                        flex
                        items-start
                        gap-2
                      "
                    >
                      <span className="text-primary">
                        $
                      </span>

                      <span
                        className="
                          break-all
                          text-xs
                          text-foreground
                          sm:text-sm
                        "
                      >
                        {stage.terminalTitle}
                      </span>
                    </div>

                    {/* Terminal lines */}

                    <div className="mt-8 space-y-4">

                      {stage.terminalLines.map(
                        (line, index) => (
                          <div
                            key={line}
                            className="
                              hybrid-terminal-line
                              flex
                              items-center
                              gap-3
                            "
                          >
                            <span
                              className="
                                text-[9px]
                                text-muted/40
                              "
                            >
                              0{index + 1}
                            </span>

                            <span
                              className="
                                text-[11px]
                                text-muted
                                sm:text-xs
                              "
                            >
                              {line}
                            </span>
                          </div>
                        )
                      )}

                    </div>

                    {/* status */}

                    <div
                      className="
                        mt-9
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
                          text-[8px]
                          uppercase
                          tracking-[0.18em]
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
                          text-[9px]
                          font-semibold
                          tracking-[0.12em]
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

                    {/* Animated scan */}

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

                    {/* Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-48
                        w-48
                        rounded-full
                        bg-primary/7
                        blur-[75px]
                      "
                    />

                  </div>
                </div>

              </div>
            </article>
          );
        })}

        {/* =================================================
            PIPELINE END
        ================================================== */}

        <div
          className="
            relative
            flex
            justify-start
            pb-28
            pl-[1px]
            lg:justify-center
            lg:pb-36
            lg:pl-0
          "
        >
          <div
            className="
              relative
              z-20
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              [background:linear-gradient(135deg,var(--primary),var(--secondary))]
              font-mono
              text-lg
              font-bold
              text-white
              shadow-[0_0_38px_var(--primary-glow)]
            "
          >
            ✓
          </div>
        </div>

      </div>

      {/* =====================================================
          FINAL OUTPUT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          border-t
          border-border
          bg-background
        "
      >
        <div
          className="
            container-custom
            py-20
            lg:py-28
          "
        >
          <p
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-primary
            "
          >
            BUILD COMPLETE
          </p>

          <div
            className="
              mt-4
              flex
              flex-col
              gap-7
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <h3
              className="
                max-w-4xl
                text-3xl
                font-bold
                leading-tight
                tracking-[-0.045em]
                text-foreground
                sm:text-4xl
                lg:text-5xl
              "
            >
              Four connected layers.

              <span className="block text-gradient">
                One complete web experience.
              </span>
            </h3>

            <p
              className="
                max-w-md
                text-sm
                leading-7
                text-muted
                lg:text-right
              "
            >
              Interface → server logic → persistent data →
              production-ready application.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}