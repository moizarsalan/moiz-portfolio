"use client";

import {
  useEffect,
  useRef,
} from "react";

import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import type {
  Project,
} from "@/data/projects";

/* =========================================================
   PROJECT CASE STUDY
========================================================= */

export default function ProjectCaseStudyClient({
  project,
}: {
  project: Project;
}) {
  const pageRef =
    useRef<HTMLDivElement>(null);

  /* =========================================================
     GSAP
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
          ".case-hero-reveal",
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.65,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          ".case-main-preview",
          {
            opacity: 0,
            y: 35,
            scale: 0.985,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.16,
            ease: "power3.out",
          }
        );

        const sections =
          gsap.utils.toArray<HTMLElement>(
            ".case-section"
          );

        sections.forEach(
          (section) => {
            const elements =
              section.querySelectorAll(
                ".case-section-reveal"
              );

            gsap.fromTo(
              elements,
              {
                opacity: 0,
                y: 25,
              },
              {
                opacity: 1,
                y: 0,
                stagger: 0.055,
                duration: 0.6,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: section,
                  start: "top 84%",
                  toggleActions:
                    "play none none reverse",
                },
              }
            );
          }
        );

        gsap.to(
          ".case-background-word",
          {
            xPercent: -7,

            scrollTrigger: {
              trigger: page,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }, page);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, [project.slug]);

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
          -right-48
          top-0
          h-[440px]
          w-[440px]
          rounded-full
          bg-primary/6
          blur-[155px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-48
          top-[45%]
          h-[440px]
          w-[440px]
          rounded-full
          bg-secondary/5
          blur-[160px]
        "
      />

      <div
        className="
          case-background-word
          pointer-events-none
          absolute
          right-[-6%]
          top-8
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
        CASE STUDY
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
          container-custom
          relative
          z-10
          pb-10
          pt-12
          lg:pb-12
          lg:pt-16
        "
      >
        <Link
          href="/projects"
          className="
            case-hero-reveal
            group
            inline-flex
            items-center
            gap-2
            text-xs
            font-medium
            text-muted
            transition-colors
            hover:text-primary
          "
        >
          <ArrowLeft
            size={14}
            className="
              transition-transform
              group-hover:-translate-x-1
            "
          />

          All Projects
        </Link>

        <div
          className="
            mt-8
            grid
            gap-7
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-end
            lg:gap-12
          "
        >
          <div>
            <div
              className="
                case-hero-reveal
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
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.17em]
                  text-primary
                "
              >
                Project{" "}
                {project.number}
              </span>
            </div>

            <p
              className="
                case-hero-reveal
                mt-4
                font-mono
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-muted
              "
            >
              {project.category}
            </p>

            <h1
              className="
                case-hero-reveal
                mt-2
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
              {project.title}
            </h1>
          </div>

          <div
            className="
              case-hero-reveal
              max-w-md
              lg:ml-auto
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-muted
              "
            >
              {
                project.description
              }
            </p>

            <a
              href={
                project.liveUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-primary/25
                bg-primary/5
                px-4
                py-2.5
                text-xs
                font-semibold
                text-primary
                transition-all
                hover:border-primary/45
                hover:bg-primary/10
                hover:shadow-[0_0_18px_var(--primary-glow)]
              "
            >
              Visit Live Site

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
        </div>

        {/* ===================================================
            MAIN SCREENSHOT
        ==================================================== */}

        <div
          className="
            case-main-preview
            mt-9
            overflow-hidden
            rounded-[1.7rem]
            border
            border-border
            bg-background-secondary
            shadow-2xl
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
                project.liveUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
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

          <a
            href={
              project.liveUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              relative
              block
              aspect-[16/7.2]
              overflow-hidden
              bg-background-secondary
            "
          >
            <Image
              src={
                project.mainImage
              }
              alt={
                project.mainImageAlt
              }
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 95vw, 1200px"
              className="
                object-cover
                object-top
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.012]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-background/0
                opacity-0
                transition-all
                duration-300
                group-hover:bg-background/20
                group-hover:opacity-100
              "
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-border
                  bg-background/75
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-foreground
                  backdrop-blur-xl
                "
              >
                Open Live Project

                <ExternalLink
                  size={13}
                  className="text-primary"
                />
              </span>
            </div>
          </a>
        </div>

        {/* ===================================================
            CAPABILITIES
        ==================================================== */}

        <div
          className="
            case-hero-reveal
            mt-5
            flex
            flex-wrap
            gap-2
          "
        >
          {project.capabilities.map(
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
      </section>

      {/* =====================================================
          STORY
      ====================================================== */}

      <section
        className="
          relative
          z-10
          border-y
          border-border/60
        "
      >
        <div className="container-custom">
          {project.sections.map(
            (
              section,
              index
            ) => (
              <article
                key={
                  section.label
                }
                className="
                  case-section
                  grid
                  gap-6
                  border-b
                  border-border/60
                  py-12
                  last:border-b-0
                  lg:grid-cols-[220px_minmax(0,1fr)]
                  lg:gap-12
                  lg:py-14
                "
              >
                <div>
                  <p
                    className="
                      case-section-reveal
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-primary
                    "
                  >
                    {
                      section.label
                    }
                  </p>

                  <div
                    className="
                      case-section-reveal
                      mt-4
                      h-px
                      w-12
                      [background:linear-gradient(90deg,var(--primary),transparent)]
                    "
                  />
                </div>

                <div>
                  <h2
                    className="
                      case-section-reveal
                      max-w-3xl
                      text-2xl
                      font-bold
                      leading-[1.08]
                      tracking-[-0.04em]
                      text-foreground
                      sm:text-3xl
                      lg:text-[2rem]
                    "
                  >
                    {
                      section.title
                    }
                  </h2>

                  <p
                    className="
                      case-section-reveal
                      mt-4
                      max-w-3xl
                      text-sm
                      leading-7
                      text-muted
                    "
                  >
                    {
                      section.description
                    }
                  </p>

                  {index === 1 && (
                    <div
                      className="
                        case-section-reveal
                        mt-7
                        flex
                        items-center
                        gap-3
                        border-t
                        border-border/60
                        pt-5
                      "
                    >
                      <span
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-primary
                          shadow-[0_0_8px_var(--primary)]
                        "
                      />

                      <span
                        className="
                          font-mono
                          text-[7px]
                          uppercase
                          tracking-[0.14em]
                          text-muted
                        "
                      >
                        Design → Development → Result
                      </span>
                    </div>
                  )}
                </div>
              </article>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section
        className="
          container-custom
          relative
          z-10
          py-14
          lg:py-16
        "
      >
        <div
          className="
            overflow-hidden
            rounded-[1.6rem]
            border
            border-border
            bg-surface/30
            backdrop-blur-xl
          "
        >
          <div
            className="
              grid
              gap-7
              p-6
              sm:p-7
              lg:grid-cols-[1fr_auto]
              lg:items-center
              lg:p-8
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Check
                  size={14}
                  className="text-primary"
                />

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    text-primary
                  "
                >
                  Case Study Complete
                </span>
              </div>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-[-0.04em]
                  text-foreground
                  sm:text-3xl
                "
              >
                Have a project in mind?
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-7
                  text-muted
                "
              >
                Share your requirements and I&apos;ll review the
                scope before discussing the next steps with you.
              </p>
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >
              <a
                href={
                  project.liveUrl
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
                  text-sm
                  font-medium
                  text-foreground
                  transition-all
                  hover:border-primary/35
                  hover:text-primary
                "
              >
                Live Website

                <ExternalLink
                  size={14}
                  className="
                    transition-transform
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </a>

              <Link
                href="/order"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_0_20px_var(--primary-glow)]
                "
              >
                Start a Project

                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-border
              px-6
              py-3
              sm:px-7
              lg:px-8
            "
          >
            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.14em]
                text-muted
              "
            >
              {project.title}
            </span>

            <Link
              href="/projects"
              className="
                group
                inline-flex
                items-center
                gap-2
                font-mono
                text-[7px]
                uppercase
                tracking-[0.14em]
                text-primary
              "
            >
              Explore Work

              <ArrowRight
                size={11}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}