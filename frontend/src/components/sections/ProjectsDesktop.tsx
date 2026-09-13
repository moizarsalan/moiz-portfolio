"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { projects } from "@/data/projects";

export default function ProjectsDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const previewRefs =
    useRef<Array<HTMLDivElement | null>>([]);

  const copyRef =
    useRef<HTMLDivElement>(null);

  const progressRef =
    useRef<HTMLDivElement>(null);

  const previousIndex =
    useRef(0);

  const firstRender =
    useRef(true);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const project = projects[activeIndex];

  /* =========================================================
     SECTION ENTRANCE
     ========================================================= */

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const context = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from(".projects-desktop-intro", {
        opacity: 0,
        y: 50,
        duration: 0.85,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".projects-desktop-intro",
          start: "top 84%",
          toggleActions:
            "play none none reverse",
        },
      });

      gsap.from(".projects-showcase-shell", {
        opacity: 0,
        y: 65,
        scale: 0.985,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".projects-showcase-shell",
          start: "top 86%",
          toggleActions:
            "play none none reverse",
        },
      });

      gsap.to(".projects-ambient-word", {
        xPercent: -10,

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

  /* =========================================================
     INITIAL PREVIEW STATE
     ========================================================= */

  useEffect(() => {
    previewRefs.current.forEach(
      (preview, index) => {
        if (!preview) return;

        gsap.set(preview, {
          opacity:
            index === activeIndex ? 1 : 0,

          scale:
            index === activeIndex ? 1 : 0.96,

          pointerEvents:
            index === activeIndex
              ? "auto"
              : "none",

          zIndex:
            index === activeIndex ? 20 : 1,
        });
      }
    );

    if (progressRef.current) {
      gsap.set(progressRef.current, {
        scaleX:
          (activeIndex + 1) /
          projects.length,
        transformOrigin: "left center",
      });
    }
    // Only establish initial state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     PROJECT CHANGE ANIMATION
     ========================================================= */

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      previousIndex.current = activeIndex;
      return;
    }

    const oldIndex =
      previousIndex.current;

    const oldPreview =
      previewRefs.current[oldIndex];

    const newPreview =
      previewRefs.current[activeIndex];

    const direction =
      activeIndex > oldIndex ? 1 : -1;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (!oldPreview || !newPreview) {
      previousIndex.current = activeIndex;
      return;
    }

    if (reducedMotion) {
      gsap.set(oldPreview, {
        opacity: 0,
        pointerEvents: "none",
        zIndex: 1,
      });

      gsap.set(newPreview, {
        opacity: 1,
        scale: 1,
        y: 0,
        clipPath:
          "inset(0% 0% 0% 0% round 2rem)",
        pointerEvents: "auto",
        zIndex: 20,
      });

      previousIndex.current =
        activeIndex;

      return;
    }

    const timeline = gsap.timeline();

    gsap.set(newPreview, {
      pointerEvents: "auto",
      zIndex: 20,
    });

    gsap.set(oldPreview, {
      zIndex: 10,
    });

    /* outgoing project */

    timeline.to(
      oldPreview,
      {
        opacity: 0,
        scale: 0.965,

        y:
          direction === 1
            ? -25
            : 25,

        clipPath:
          direction === 1
            ? "inset(0% 0% 100% 0% round 2rem)"
            : "inset(100% 0% 0% 0% round 2rem)",

        duration: 0.42,
        ease: "power3.inOut",

        onComplete: () => {
          oldPreview.style.pointerEvents =
            "none";
        },
      },
      0
    );

    /* incoming project */

    timeline.fromTo(
      newPreview,
      {
        opacity: 0,
        scale: 1.035,

        y:
          direction === 1
            ? 35
            : -35,

        clipPath:
          direction === 1
            ? "inset(100% 0% 0% 0% round 2rem)"
            : "inset(0% 0% 100% 0% round 2rem)",
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,

        clipPath:
          "inset(0% 0% 0% 0% round 2rem)",

        duration: 0.65,
        ease: "power3.out",
      },
      0.16
    );

    /* copy animation */

    if (copyRef.current) {
      const items =
        copyRef.current.querySelectorAll(
          ".project-copy-item"
        );

      timeline.fromTo(
        items,
        {
          opacity: 0,
          y: 22,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.045,
          duration: 0.35,
          ease: "power3.out",
        },
        0.16
      );
    }

    /* progress */

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX:
          (activeIndex + 1) /
          projects.length,

        transformOrigin: "left center",

        duration: 0.55,
        ease: "power3.out",
      });
    }

    previousIndex.current =
      activeIndex;
  }, [activeIndex]);

  function previousProject() {
    setActiveIndex((current) =>
      current === 0
        ? projects.length - 1
        : current - 1
    );
  }

  function nextProject() {
    setActiveIndex((current) =>
      current ===
      projects.length - 1
        ? 0
        : current + 1
    );
  }

  return (
    <div
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        pb-28
        pt-28
        xl:pb-32
        xl:pt-32
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.17]" />

      <div
        className="
          pointer-events-none
          absolute
          -right-56
          top-[5%]
          h-[560px]
          w-[560px]
          rounded-full
          bg-secondary/7
          blur-[180px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          bottom-[-10%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-primary/6
          blur-[170px]
        "
      />

      <div
        className="
          projects-ambient-word
          pointer-events-none
          absolute
          left-[45%]
          top-16
          whitespace-nowrap
          text-[11rem]
          font-black
          leading-none
          tracking-[-0.08em]
          text-foreground
          opacity-[0.018]
        "
      >
        PROJECTS
      </div>

      <div className="container-custom relative z-10">

        {/* =====================================================
            INTRO
        ====================================================== */}

        <div
          className="
            projects-desktop-intro
            flex
            items-end
            justify-between
            gap-12
          "
        >
          <div>

            <div className="flex items-center gap-2">

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
                Selected Work
              </span>

            </div>

            <h2
              className="
                mt-5
                max-w-4xl
                text-5xl
                font-bold
                leading-[0.98]
                tracking-[-0.055em]
                text-foreground
                xl:text-6xl
              "
            >
              Projects built to be

              <span className="block text-gradient">
                experienced.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-xl
                text-base
                leading-7
                text-muted
              "
            >
              Selected web projects presented in one
              interactive showcase — without making you
              scroll through several screens.
            </p>

          </div>

          <Link
            href="/projects"
            className="
              group
              mb-2
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-border
              bg-surface/60
              px-5
              py-3
              text-sm
              font-medium
              text-foreground
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-primary/40
              hover:text-primary
            "
          >
            All Projects

            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>

        </div>

        {/* =====================================================
            PROJECT SELECTOR
        ====================================================== */}

        <div
          className="
            mt-12
            grid
            grid-cols-3
            border-b
            border-border
          "
        >
          {projects.map(
            (item, index) => {
              const active =
                activeIndex === index;

              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  aria-pressed={active}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-4
                    px-3
                    py-5
                    text-left
                    transition-all
                    duration-300

                    ${
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground-secondary"
                    }
                  `}
                >
                  <span
                    className={`
                      font-mono
                      text-[10px]
                      tracking-[0.16em]

                      ${
                        active
                          ? "text-primary"
                          : "text-muted"
                      }
                    `}
                  >
                    {item.number}
                  </span>

                  <span
                    className="
                      truncate
                      text-sm
                      font-semibold
                    "
                  >
                    {item.title}
                  </span>

                  <span
                    className={`
                      absolute
                      bottom-[-1px]
                      left-0
                      h-[2px]
                      transition-all
                      duration-500
                      [background:linear-gradient(90deg,var(--primary),var(--secondary))]

                      ${
                        active
                          ? "w-full opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />

                </button>
              );
            }
          )}
        </div>

        {/* =====================================================
            SHOWCASE
        ====================================================== */}

        <div
          className="
            projects-showcase-shell
            relative
            mt-10
            overflow-hidden
            rounded-[2.25rem]
            border
            border-border
            bg-surface/35
            p-6
            backdrop-blur-xl
            xl:p-8
          "
        >
          {/* ambient border glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[-220px]
              h-[360px]
              w-[700px]
              -translate-x-1/2
              rounded-full
              bg-primary/5
              blur-[110px]
            "
          />

          <div
            className="
              relative
              grid
              min-h-[540px]
              grid-cols-[0.82fr_1.18fr]
              items-center
              gap-12
              xl:min-h-[570px]
              xl:gap-16
            "
          >
            {/* =================================================
                COPY
            ================================================== */}

            <div
              ref={copyRef}
              key={project.slug}
              className="
                relative
                z-20
                py-6
              "
            >
              <div
                className="
                  project-copy-item
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    font-mono
                    text-xs
                    font-semibold
                    tracking-[0.16em]
                    text-primary
                  "
                >
                  {project.number}
                </span>

                <span className="h-px w-10 bg-border" />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.17em]
                    text-muted
                  "
                >
                  {project.category}
                </span>
              </div>

              <h3
                className="
                  project-copy-item
                  mt-7
                  text-5xl
                  font-bold
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-foreground
                  xl:text-[3.6rem]
                "
              >
                {project.title}
              </h3>

              <p
                className="
                  project-copy-item
                  mt-5
                  max-w-lg
                  text-xl
                  font-medium
                  leading-8
                  tracking-[-0.025em]
                  text-foreground-secondary
                "
              >
                {project.headline}
              </p>

              <p
                className="
                  project-copy-item
                  mt-5
                  max-w-lg
                  text-sm
                  leading-7
                  text-muted
                "
              >
                {project.description}
              </p>

              {/* Technologies */}

              <div
                className="
                  project-copy-item
                  mt-7
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {project.technologies.map(
                  (technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-lg
                        border
                        border-border
                        bg-background-secondary/70
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-foreground-secondary
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-primary/40
                        hover:text-primary
                      "
                    >
                      {technology}
                    </span>
                  )
                )}
              </div>

              {/* Buttons */}

              <div
                className="
                  project-copy-item
                  mt-8
                  flex
                  flex-wrap
                  gap-3
                "
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_0_22px_var(--primary-glow)]
                  "
                >
                  View Case Study

                  <ArrowRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-border
                      bg-surface/60
                      px-5
                      py-3
                      text-sm
                      font-medium
                      text-foreground
                      transition-all
                      duration-300
                      hover:border-primary/40
                      hover:text-primary
                    "
                  >
                    Live Site

                    <ArrowUpRight
                      size={15}
                    />
                  </a>
                )}
              </div>

            </div>

            {/* =================================================
                PREVIEW AREA
            ================================================== */}

            <div className="relative">

              {/* Top controls */}

              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.16em]
                    text-muted
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

                  Project preview
                </div>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={previousProject}
                    aria-label="Previous project"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-border
                      bg-surface/50
                      text-muted
                      transition-all
                      duration-300
                      hover:border-primary/40
                      hover:text-primary
                    "
                  >
                    <ChevronLeft
                      size={16}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={nextProject}
                    aria-label="Next project"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-border
                      bg-surface/50
                      text-muted
                      transition-all
                      duration-300
                      hover:border-primary/40
                      hover:text-primary
                    "
                  >
                    <ChevronRight
                      size={16}
                    />
                  </button>

                </div>
              </div>

              {/* Preview progress */}

              <div className="mb-5 h-px overflow-hidden bg-border">

                <div
                  ref={progressRef}
                  className="
                    h-full
                    w-full
                    origin-left
                    [background:linear-gradient(90deg,var(--primary),var(--secondary))]
                    shadow-[0_0_10px_var(--primary-glow)]
                  "
                />

              </div>

              {/* Browser stage */}

              <div
                className="
                  relative
                  aspect-[1.25/1]
                  w-full
                "
              >
                {projects.map(
                  (previewProject, index) => (
                    <div
                      key={previewProject.slug}
                      ref={(element) => {
                        previewRefs.current[index] =
                          element;
                      }}
                      className="
                        absolute
                        inset-0
                      "
                    >
                      <ProjectBrowser
                        project={previewProject}
                        index={index}
                      />
                    </div>
                  )
                )}
              </div>

              {/* Counter */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    font-mono
                    text-[10px]
                    tracking-[0.15em]
                    text-primary
                  "
                >
                  {project.number} / 0
                  {projects.length}
                </span>

                <span
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.14em]
                    text-muted
                  "
                >
                  Select project above
                </span>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT BROWSER MOCKUP
   ========================================================= */

function ProjectBrowser({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <div
      className="
        relative
        h-full
        overflow-hidden
        rounded-[2rem]
        border
        border-border
        bg-background
        p-2.5
        shadow-2xl
      "
    >
      <div
        className="
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-[1.55rem]
          border
          border-border
          bg-background-secondary
        "
      >
        {/* Browser chrome */}

        <div
          className="
            flex
            h-12
            shrink-0
            items-center
            gap-4
            border-b
            border-border
            bg-surface/50
            px-4
          "
        >
          <div className="flex gap-1.5">

            <span className="h-2 w-2 rounded-full bg-error/70" />

            <span className="h-2 w-2 rounded-full bg-primary/70" />

            <span className="h-2 w-2 rounded-full bg-success/70" />

          </div>

          <div
            className="
              flex-1
              rounded-lg
              border
              border-border
              bg-background/60
              px-3
              py-1.5
              font-mono
              text-[8px]
              text-muted
            "
          >
            {project.slug}.dev
          </div>

        </div>

        {/* Mock web page */}

        <div
          className="
            relative
            flex-1
            overflow-hidden
            p-7
          "
        >
          {/* Ambient light */}

          <div
            className={`
              pointer-events-none
              absolute
              h-[330px]
              w-[330px]
              rounded-full
              blur-[110px]

              ${
                index === 0
                  ? "-right-20 -top-24 bg-primary/14"
                  : index === 1
                    ? "-left-20 bottom-[-80px] bg-secondary/14"
                    : "right-[10%] top-[20%] bg-primary/10"
              }
            `}
          />

          {/* Fake top navigation */}

          <div
            className="
              relative
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-2">

              <div
                className="
                  h-6
                  w-6
                  rounded-lg
                  [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                "
              />

              <div className="h-2.5 w-20 rounded-full bg-foreground/70" />

            </div>

            <div className="flex gap-4">

              <div className="h-1.5 w-8 rounded bg-muted/20" />

              <div className="h-1.5 w-8 rounded bg-muted/20" />

              <div className="h-1.5 w-8 rounded bg-muted/20" />

            </div>

          </div>

          {/* Main hero */}

          <div
            className="
              relative
              mt-16
              max-w-[67%]
            "
          >
            <p
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.17em]
                text-primary
              "
            >
              {project.category}
            </p>

            <h4
              className="
                mt-4
                text-4xl
                font-bold
                leading-[0.94]
                tracking-[-0.055em]
                text-foreground
              "
            >
              {project.title}
            </h4>

            <div className="mt-5 space-y-2">

              <div className="h-2 w-full rounded-full bg-muted/15" />

              <div className="h-2 w-[87%] rounded-full bg-muted/15" />

              <div className="h-2 w-[65%] rounded-full bg-muted/15" />

            </div>

            <div
              className="
                mt-7
                h-10
                w-28
                rounded-xl
                [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                shadow-[0_0_22px_var(--primary-glow)]
              "
            />

          </div>

          {/* Floating UI panel */}

          <div
            className={`
              absolute
              h-[47%]
              w-[43%]
              rounded-[1.5rem]
              border
              border-border
              bg-surface/70
              p-4
              shadow-2xl
              backdrop-blur-xl

              ${
                index % 2 === 0
                  ? "-bottom-8 -right-4 -rotate-3"
                  : "-bottom-8 -right-3 rotate-3"
              }
            `}
          >
            <div
              className="
                relative
                h-full
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-background-secondary
              "
            >
              <div
                className="
                  absolute
                  inset-x-4
                  top-4
                  h-2
                  rounded-full
                  bg-foreground/20
                "
              />

              <div
                className="
                  absolute
                  left-4
                  right-[35%]
                  top-9
                  h-1.5
                  rounded-full
                  bg-muted/15
                "
              />

              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  right-4
                  top-[42%]
                  rounded-lg
                  [background:linear-gradient(135deg,var(--primary-glow),var(--secondary-glow))]
                "
              />

            </div>
          </div>

          {/* Status */}

          <div
            className="
              absolute
              bottom-5
              left-7
              flex
              items-center
              gap-2
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

            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.14em]
                text-muted
              "
            >
              {project.status}
            </span>

          </div>

        </div>
      </div>
    </div>
  );
}