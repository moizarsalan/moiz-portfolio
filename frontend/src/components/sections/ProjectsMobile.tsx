"use client";

import {
  TouchEvent,
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

export default function ProjectsMobile() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const contentRef =
    useRef<HTMLDivElement>(null);

  const touchStartX =
    useRef<number | null>(null);

  const previousIndex =
    useRef(0);

  const firstRender =
    useRef(true);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const project =
    projects[activeIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section =
      sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      gsap.from(".mobile-project-intro", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".mobile-project-intro",
          start: "top 86%",
          toggleActions:
            "play none none reverse",
        },
      });

      gsap.from(".mobile-project-shell", {
        opacity: 0,
        y: 55,
        scale: 0.97,
        duration: 0.85,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".mobile-project-shell",
          start: "top 88%",
          toggleActions:
            "play none none reverse",
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      previousIndex.current =
        activeIndex;
      return;
    }

    if (!contentRef.current) return;

    const direction =
      activeIndex >
      previousIndex.current
        ? 1
        : -1;

    const elements =
      contentRef.current.querySelectorAll(
        ".mobile-active-item"
      );

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        x: 22 * direction,
        y: 15,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: 0.045,
        duration: 0.4,
        ease: "power3.out",
      }
    );

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

  function handleTouchStart(
    event: TouchEvent
  ) {
    touchStartX.current =
      event.touches[0].clientX;
  }

  function handleTouchEnd(
    event: TouchEvent
  ) {
    if (
      touchStartX.current === null
    ) {
      return;
    }

    const endX =
      event.changedTouches[0].clientX;

    const difference =
      touchStartX.current - endX;

    if (Math.abs(difference) > 45) {
      if (difference > 0) {
        nextProject();
      } else {
        previousProject();
      }
    }

    touchStartX.current = null;
  }

  return (
    <div
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        pb-24
        pt-24
      "
    >
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.16]" />

      <div
        className="
          pointer-events-none
          absolute
          -right-44
          top-24
          h-80
          w-80
          rounded-full
          bg-secondary/8
          blur-[120px]
        "
      />

      <div className="container-custom relative z-10">

        {/* Intro */}

        <div className="mobile-project-intro">

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
              Selected Work
            </span>

          </div>

          <h2
            className="
              mt-5
              text-[2.55rem]
              font-bold
              leading-[0.98]
              tracking-[-0.05em]
              text-foreground
            "
          >
            Projects built to be

            <span className="block text-gradient">
              experienced.
            </span>
          </h2>

        </div>

        {/* Project tabs */}

        <div
          className="
            mt-9
            flex
            gap-2
            overflow-x-auto
            pb-2
          "
        >
          {projects.map(
            (item, index) => (
              <button
                key={item.slug}
                type="button"
                onClick={() =>
                  setActiveIndex(index)
                }
                className={`
                  shrink-0
                  rounded-full
                  border
                  px-4
                  py-2
                  font-mono
                  text-[9px]
                  tracking-[0.12em]
                  transition-all
                  duration-300

                  ${
                    activeIndex === index
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-surface/50 text-muted"
                  }
                `}
              >
                {item.number}{" "}
                {item.title}
              </button>
            )
          )}
        </div>

        {/* Main compact project */}

        <div
          className="
            mobile-project-shell
            mt-6
            overflow-hidden
            rounded-[1.8rem]
            border
            border-border
            bg-surface/45
            p-3
            backdrop-blur-xl
          "
          onTouchStart={
            handleTouchStart
          }
          onTouchEnd={
            handleTouchEnd
          }
        >
          <div
            ref={contentRef}
            key={project.slug}
          >
            {/* Browser preview */}

            <div
              className="
                mobile-active-item
                relative
                aspect-[1.15/1]
                overflow-hidden
                rounded-[1.45rem]
                border
                border-border
                bg-background-secondary
              "
            >
              {/* Browser bar */}

              <div
                className="
                  flex
                  h-10
                  items-center
                  gap-3
                  border-b
                  border-border
                  bg-surface/40
                  px-3
                "
              >
                <div className="flex gap-1">

                  <span className="h-1.5 w-1.5 rounded-full bg-error/70" />

                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />

                  <span className="h-1.5 w-1.5 rounded-full bg-success/70" />

                </div>

                <div
                  className="
                    flex-1
                    rounded-md
                    border
                    border-border
                    px-2
                    py-1
                    font-mono
                    text-[7px]
                    text-muted
                  "
                >
                  {project.slug}.dev
                </div>

              </div>

              {/* Fake website */}

              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  p-5
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-12
                    h-48
                    w-48
                    rounded-full
                    bg-primary/14
                    blur-[75px]
                  "
                />

                <p
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.16em]
                    text-primary
                  "
                >
                  {project.category}
                </p>

                <h3
                  className="
                    mt-3
                    max-w-[75%]
                    text-2xl
                    font-bold
                    leading-[0.96]
                    tracking-[-0.05em]
                    text-foreground
                  "
                >
                  {project.title}
                </h3>

                <div className="mt-4 space-y-1.5">

                  <div className="h-1.5 w-[72%] rounded bg-muted/15" />

                  <div className="h-1.5 w-[60%] rounded bg-muted/15" />

                </div>

                <div
                  className="
                    absolute
                    -bottom-8
                    -right-4
                    h-[47%]
                    w-[46%]
                    -rotate-3
                    rounded-xl
                    border
                    border-border
                    [background:linear-gradient(135deg,var(--primary-glow),var(--secondary-glow))]
                  "
                />

              </div>
            </div>

            {/* Content */}

            <div className="px-3 pb-4 pt-6">

              <div
                className="
                  mobile-active-item
                  flex
                  items-center
                  justify-between
                "
              >
                <div className="flex items-center gap-3">

                  <span
                    className="
                      font-mono
                      text-[9px]
                      text-primary
                    "
                  >
                    {project.number}
                  </span>

                  <span className="h-px w-7 bg-border" />

                  <span
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.14em]
                      text-muted
                    "
                  >
                    {project.category}
                  </span>

                </div>

                <span
                  className="
                    font-mono
                    text-[8px]
                    text-muted
                  "
                >
                  {activeIndex + 1} /{" "}
                  {projects.length}
                </span>

              </div>

              <h3
                className="
                  mobile-active-item
                  mt-4
                  text-3xl
                  font-bold
                  leading-[1]
                  tracking-[-0.045em]
                  text-foreground
                "
              >
                {project.title}
              </h3>

              <p
                className="
                  mobile-active-item
                  mt-3
                  text-base
                  font-medium
                  leading-6
                  text-foreground-secondary
                "
              >
                {project.headline}
              </p>

              <p
                className="
                  mobile-active-item
                  mt-4
                  text-sm
                  leading-7
                  text-muted
                "
              >
                {project.description}
              </p>

              <div
                className="
                  mobile-active-item
                  mt-5
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
                        bg-background-secondary
                        px-3
                        py-2
                        text-[9px]
                        text-foreground-secondary
                      "
                    >
                      {technology}
                    </span>
                  )
                )}
              </div>

              <div
                className="
                  mobile-active-item
                  mt-6
                  flex
                  flex-wrap
                  gap-3
                "
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="
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
                  "
                >
                  Case Study

                  <ArrowRight
                    size={14}
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
                      px-4
                      py-2.5
                      text-xs
                      text-foreground
                    "
                  >
                    Live Site

                    <ArrowUpRight
                      size={14}
                    />
                  </a>
                )}

              </div>

            </div>
          </div>

          {/* Navigation */}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-border
              px-3
              py-4
            "
          >
            <button
              type="button"
              onClick={previousProject}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-border
                text-muted
              "
              aria-label="Previous project"
            >
              <ChevronLeft
                size={16}
              />
            </button>

            <div className="flex gap-2">

              {projects.map(
                (item, index) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    aria-label={`Show ${item.title}`}
                    className={`
                      h-1.5
                      rounded-full
                      transition-all
                      duration-300

                      ${
                        activeIndex === index
                          ? "w-7 bg-primary"
                          : "w-1.5 bg-border-strong"
                      }
                    `}
                  />
                )
              )}

            </div>

            <button
              type="button"
              onClick={nextProject}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-border
                text-muted
              "
              aria-label="Next project"
            >
              <ChevronRight
                size={16}
              />
            </button>

          </div>

        </div>

        <Link
          href="/projects"
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-primary
          "
        >
          Explore all projects

          <ArrowRight
            size={15}
          />
        </Link>

      </div>
    </div>
  );
}