"use client";

import {
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import { projects } from "@/data/projects";

/* =========================================================
   PROJECTS PAGE
========================================================= */

export default function ProjectsPageClient() {
  const pageRef =
    useRef<HTMLDivElement>(null);

  const previewRef =
    useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeProject =
    projects[activeIndex];

  /* =========================================================
     PAGE ANIMATION
  ========================================================= */

  useEffect(() => {
    gsap.registerPlugin(
      ScrollTrigger
    );

    const page =
      pageRef.current;

    if (!page) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) {
      return;
    }

    const context =
      gsap.context(() => {
        gsap.fromTo(
          ".projects-page-reveal",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.7,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          ".project-index-row",
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            stagger: 0.06,
            duration: 0.55,
            delay: 0.18,
            ease: "power3.out",
          }
        );

        gsap.to(
          ".projects-page-word",
          {
            xPercent: -8,

            scrollTrigger: {
              trigger: page,
              start: "top top",
              end: "bottom top",
              scrub: 0.9,
            },
          }
        );
      }, page);

    return () => {
      context.revert();
    };
  }, []);

  /* =========================================================
     PROJECT CHANGE
  ========================================================= */

  useEffect(() => {
    if (!previewRef.current) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) {
      return;
    }

    gsap.fromTo(
      previewRef.current,
      {
        opacity: 0,
        scale: 0.985,
        x: 14,
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.42,
        ease: "power3.out",
      }
    );
  }, [activeIndex]);

  /* =========================================================
     PREVIEW TILT
  ========================================================= */

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (
      !previewRef.current ||
      window.innerWidth < 1024
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX -
        rect.left) /
      rect.width;

    const y =
      (event.clientY -
        rect.top) /
      rect.height;

    gsap.to(
      previewRef.current,
      {
        rotateY:
          (x - 0.5) * 2.2,

        rotateX:
          (0.5 - y) * 2.2,

        transformPerspective:
          1200,

        duration: 0.35,

        ease: "power2.out",
      }
    );
  }

  function handlePointerLeave() {
    if (!previewRef.current) {
      return;
    }

    gsap.to(
      previewRef.current,
      {
        rotateX: 0,
        rotateY: 0,
        duration: 0.45,
        ease: "power3.out",
      }
    );
  }

  /* =========================================================
     CONTROLS
  ========================================================= */

  function nextProject() {
    setActiveIndex(
      (current) =>
        (current + 1) %
        projects.length
    );
  }

  function previousProject() {
    setActiveIndex(
      (current) =>
        (current -
          1 +
          projects.length) %
        projects.length
    );
  }

  return (
    <div
      ref={pageRef}
      className="
        relative
        overflow-hidden
        bg-background
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          hero-grid
          opacity-[0.08]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-44
          top-0
          h-[420px]
          w-[420px]
          rounded-full
          bg-primary/6
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-44
          top-[30%]
          h-[440px]
          w-[440px]
          rounded-full
          bg-secondary/6
          blur-[160px]
        "
      />

      <div
        className="
          projects-page-word
          pointer-events-none
          absolute
          right-[-4%]
          top-6
          hidden
          whitespace-nowrap
          text-[10rem]
          font-black
          leading-none
          tracking-[-0.09em]
          text-foreground
          opacity-[0.014]
          xl:block
        "
      >
        PROJECTS
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section
        className="
          container-custom
          relative
          z-10
          pb-8
          pt-12
          lg:pb-10
          lg:pt-16
        "
      >
        <div
          className="
            grid
            gap-7
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-end
            lg:gap-10
          "
        >
          <div>
            <div
              className="
                projects-page-reveal
                flex
                items-center
                gap-2
              "
            >
              <Sparkles
                size={14}
                className="text-primary"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-primary
                "
              >
                Selected Work / 001
              </span>
            </div>

            <h1
              className="
                projects-page-reveal
                mt-4
                max-w-4xl
                text-4xl
                font-black
                leading-[0.95]
                tracking-[-0.055em]
                text-foreground
                sm:text-5xl
                lg:text-6xl
              "
            >
              Projects built through

              <span
                className="
                  block
                  text-gradient
                "
              >
                design + development.
              </span>
            </h1>
          </div>

          <p
            className="
              projects-page-reveal
              max-w-md
              text-sm
              leading-7
              text-muted
              lg:ml-auto
            "
          >
            A selection of websites and interfaces I&apos;ve
            built while developing my frontend and full-stack
            web development skills.
          </p>
        </div>
      </section>

      {/* =====================================================
          PROJECT WORKSPACE
      ====================================================== */}

      <section
        className="
          container-custom
          relative
          z-10
          pb-20
          lg:pb-24
        "
      >
        <div
          className="
            overflow-hidden
            rounded-[1.8rem]
            border
            border-border
            bg-surface/25
            shadow-2xl
            backdrop-blur-xl
            lg:grid
            lg:grid-cols-[320px_minmax(0,1fr)]
          "
        >
          {/* =================================================
              PROJECT INDEX
          ================================================== */}

          <div
            className="
              border-b
              border-border
              lg:border-b-0
              lg:border-r
            "
          >
            <div
              className="
                border-b
                border-border
                px-5
                py-4
                lg:px-6
              "
            >
              <p
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.16em]
                  text-primary
                "
              >
                Project Index
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  text-muted
                "
              >
                Select a project to inspect.
              </p>
            </div>

            {projects.map(
              (
                project,
                index
              ) => {
                const active =
                  index ===
                  activeIndex;

                return (
                  <button
                    key={
                      project.slug
                    }
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        index
                      )
                    }
                    className={`
                      project-index-row
                      group
                      relative
                      flex
                      w-full
                      items-center
                      gap-3
                      border-b
                      border-border
                      px-5
                      py-4
                      text-left
                      transition-all
                      duration-300
                      last:border-b-0
                      lg:px-6

                      ${
                        active
                          ? "bg-primary/[0.055]"
                          : "hover:bg-surface/40"
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute
                        bottom-3
                        left-0
                        top-3
                        w-[2px]
                        rounded-full
                        bg-primary
                        shadow-[0_0_10px_var(--primary)]
                        transition-opacity

                        ${
                          active
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      `}
                    />

                    <span
                      className="
                        w-7
                        shrink-0
                        font-mono
                        text-[8px]
                        text-primary
                      "
                    >
                      {
                        project.number
                      }
                    </span>

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      <p
                        className={`
                          truncate
                          text-sm
                          font-semibold

                          ${
                            active
                              ? "text-foreground"
                              : "text-foreground-secondary"
                          }
                        `}
                      >
                        {
                          project.title
                        }
                      </p>

                      <p
                        className="
                          mt-1
                          truncate
                          font-mono
                          text-[7px]
                          uppercase
                          tracking-[0.12em]
                          text-muted
                        "
                      >
                        {
                          project.category
                        }
                      </p>
                    </div>

                    <ArrowRight
                      size={14}
                      className={`
                        shrink-0
                        transition-all

                        ${
                          active
                            ? "text-primary"
                            : "-translate-x-1 text-muted opacity-45 group-hover:translate-x-0"
                        }
                      `}
                    />
                  </button>
                );
              }
            )}
          </div>

          {/* =================================================
              ACTIVE PROJECT
          ================================================== */}

          <div
            className="
              min-w-0
              p-5
              lg:p-6
            "
          >
            <div
              ref={previewRef}
              onPointerMove={
                handlePointerMove
              }
              onPointerLeave={
                handlePointerLeave
              }
              className="
                [transform-style:preserve-3d]
              "
            >
              {/* =============================================
                  SCREENSHOT
              ============================================== */}

              <div
                className="
                  overflow-hidden
                  rounded-[1.45rem]
                  border
                  border-border
                  bg-background-secondary
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-border
                    bg-background/55
                    px-4
                    py-3
                    backdrop-blur-xl
                  "
                >
                  <div
                    className="
                      flex
                      gap-1.5
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-border-strong" />
                    <span className="h-2 w-2 rounded-full bg-border-strong" />
                    <span className="h-2 w-2 rounded-full bg-border-strong" />
                  </div>

                  <span
                    className="
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.14em]
                      text-muted
                    "
                  >
                    Project Preview
                  </span>

                  <a
                    href={
                      activeProject.liveUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${activeProject.title} live website`}
                    className="
                      text-muted
                      transition-colors
                      hover:text-primary
                    "
                  >
                    <ExternalLink
                      size={13}
                    />
                  </a>
                </div>

                <div
                  className="
                    relative
                    aspect-[16/7.2]
                    overflow-hidden
                    bg-background-secondary
                  "
                >
                  <Image
                    src={
                      activeProject.mainImage
                    }
                    alt={
                      activeProject.mainImageAlt
                    }
                    fill
                    sizes="(max-width: 1023px) 100vw, 850px"
                    className="
                      object-cover
                      object-top
                      transition-transform
                      duration-700
                      ease-out
                      hover:scale-[1.015]
                    "
                  />
                </div>
              </div>

              {/* =============================================
                  PROJECT INFO
              ============================================== */}

              <div
                className="
                  mt-5
                  grid
                  gap-5
                  lg:grid-cols-[1fr_auto]
                  lg:items-end
                "
              >
                <div>
                  <p
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.15em]
                      text-primary
                    "
                  >
                    {
                      activeProject.category
                    }
                  </p>

                  <h2
                    className="
                      mt-2
                      text-2xl
                      font-bold
                      tracking-[-0.04em]
                      text-foreground
                      sm:text-3xl
                    "
                  >
                    {
                      activeProject.title
                    }
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-2xl
                      text-sm
                      leading-7
                      text-muted
                    "
                  >
                    {
                      activeProject.shortDescription
                    }
                  </p>

                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {activeProject.capabilities.map(
                      (
                        capability
                      ) => (
                        <span
                          key={
                            capability
                          }
                          className="
                            rounded-lg
                            border
                            border-border
                            bg-surface/35
                            px-3
                            py-1.5
                            font-mono
                            text-[7px]
                            uppercase
                            tracking-[0.11em]
                            text-foreground-secondary
                          "
                        >
                          {
                            capability
                          }
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* ===========================================
                    ACTIONS
                ============================================ */}

                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    lg:items-end
                  "
                >
                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    <Link
                      href={`/projects/${activeProject.slug}`}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                        px-4
                        py-2.5
                        text-xs
                        font-semibold
                        text-white
                        shadow-[0_0_18px_var(--primary-glow)]
                      "
                    >
                      View Case Study

                      <ArrowUpRight
                        size={14}
                        className="
                          transition-transform
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      />
                    </Link>

                    <a
                      href={
                        activeProject.liveUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-border
                        bg-surface/40
                        px-4
                        py-2.5
                        text-xs
                        font-medium
                        text-foreground
                        transition-all
                        hover:border-primary/35
                        hover:text-primary
                      "
                    >
                      Live Site

                      <ExternalLink
                        size={13}
                        className="
                          transition-transform
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      />
                    </a>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <button
                      type="button"
                      onClick={
                        previousProject
                      }
                      aria-label="Previous project"
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-border
                        bg-surface/40
                        text-muted
                        transition-all
                        hover:border-primary/30
                        hover:text-primary
                      "
                    >
                      <ChevronLeft
                        size={16}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={
                        nextProject
                      }
                      aria-label="Next project"
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-border
                        bg-surface/40
                        text-muted
                        transition-all
                        hover:border-primary/30
                        hover:text-primary
                      "
                    >
                      <ChevronRight
                        size={16}
                      />
                    </button>

                    <span
                      className="
                        ml-2
                        font-mono
                        text-[8px]
                        tracking-[0.14em]
                        text-muted
                      "
                    >
                      0
                      {
                        activeIndex +
                        1
                      }{" "}
                      / 0
                      {
                        projects.length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}