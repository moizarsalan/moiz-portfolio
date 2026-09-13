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
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  ServerCog,
  Sparkles,
} from "lucide-react";

import {
  aboutCapabilities,
  aboutProjects,
} from "@/data/about";

const capabilityIcons = [
  Code2,
  ServerCog,
  Database,
  Braces,
];

/* =========================================================
   ABOUT MOBILE
========================================================= */

export default function AboutMobile() {
  const pageRef =
    useRef<HTMLDivElement>(null);

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
        const blocks =
          gsap.utils.toArray<HTMLElement>(
            ".about-mobile-block"
          );

        blocks.forEach(
          (block) => {
            gsap.fromTo(
              block.querySelectorAll(
                ".about-mobile-reveal"
              ),
              {
                opacity: 0,
                y: 24,
              },
              {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.6,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: block,
                  start: "top 88%",
                  toggleActions:
                    "play none none reverse",
                },
              }
            );
          }
        );
      }, page);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="
        relative
        overflow-hidden
        bg-background
        lg:hidden
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          hero-grid
          opacity-[0.07]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-44
          top-0
          h-[360px]
          w-[360px]
          rounded-full
          bg-primary/6
          blur-[130px]
        "
      />

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section
        className="
          about-mobile-block
          container-custom
          relative
          z-10
          pb-12
          pt-10
        "
      >
        <div
          className="
            about-mobile-reveal
            flex
            items-center
            gap-2
          "
        >
          <Sparkles
            size={13}
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
            About / 001
          </span>
        </div>

        <h1
          className="
            about-mobile-reveal
            mt-4
            text-[2.6rem]
            font-black
            leading-[0.96]
            tracking-[-0.055em]
            text-foreground
            sm:text-5xl
          "
        >
          Building across the

          <span
            className="
              block
              text-gradient
            "
          >
            full web stack.
          </span>
        </h1>

        {/* ===================================================
            PORTRAIT
        ==================================================== */}

        <div
          className="
            about-mobile-reveal
            relative
            mt-8
            overflow-hidden
            rounded-[1.7rem]
            border
            border-border
            bg-surface/30
            p-2
            shadow-xl
          "
        >
          <div
            className="
              relative
              aspect-[4/5]
              overflow-hidden
              rounded-[1.35rem]
              bg-background-secondary
            "
          >
            <Image
              src="/images/profile/abdul-moiz-profile.webp"
              alt="Abdul Moiz Arsalan"
              fill
              priority
              sizes="(max-width: 1023px) 100vw"
              className="
                object-cover
                object-center
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-background/30
                via-transparent
                to-background/5
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                profile-grid
                opacity-[0.08]
              "
            />

            <div
              className="
                about-scan-line
                pointer-events-none
                absolute
                left-0
                h-px
                w-full
              "
            />

            <div
              className="
                absolute
                left-4
                right-4
                top-4
                z-10
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  rounded-md
                  bg-background/55
                  px-2
                  py-1
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.13em]
                  text-primary
                  backdrop-blur-md
                "
              >
                Profile / AMA
              </span>

              <span
                className="
                  rounded-md
                  bg-background/55
                  px-2
                  py-1
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.12em]
                  text-foreground-secondary
                  backdrop-blur-md
                "
              >
                Full-Stack
              </span>
            </div>
          </div>
        </div>

        <p
          className="
            about-mobile-reveal
            mt-7
            text-sm
            leading-7
            text-foreground-secondary
          "
        >
          I&apos;m Abdul Moiz Arsalan, a Full-Stack Web
          Developer with hands-on experience developing
          frontend interfaces, designing and integrating
          databases, connecting APIs and building the
          application logic that ties those layers together.
        </p>

        <p
          className="
            about-mobile-reveal
            mt-3
            text-xs
            leading-6
            text-muted
          "
        >
          My work focuses on modern responsive web experiences
          that combine interface design with the technical
          structure required behind the product.
        </p>

        <div
          className="
            about-mobile-reveal
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >
          <Link
            href="/projects"
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
              shadow-[0_0_18px_var(--primary-glow)]
            "
          >
            Projects

            <ArrowRight
              size={13}
            />
          </Link>

          <Link
            href="/order"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-border
              bg-surface/35
              px-4
              py-2.5
              text-xs
              font-medium
              text-foreground
            "
          >
            Start a Project

            <ArrowUpRight
              size={13}
            />
          </Link>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE
      ====================================================== */}

      <section
        className="
          about-mobile-block
          relative
          z-10
          border-y
          border-border/60
        "
      >
        <div
          className="
            container-custom
            py-11
          "
        >
          <p
            className="
              about-mobile-reveal
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-primary
            "
          >
            Experience / 002
          </p>

          <h2
            className="
              about-mobile-reveal
              mt-4
              text-2xl
              font-bold
              tracking-[-0.04em]
              text-foreground
            "
          >
            Full-Stack Web Development
          </h2>

          <p
            className="
              about-mobile-reveal
              mt-2
              font-mono
              text-[7px]
              uppercase
              tracking-[0.13em]
              text-primary
            "
          >
            Freelance &amp; Personal Projects
          </p>

          <p
            className="
              about-mobile-reveal
              mt-4
              text-xs
              leading-6
              text-muted
            "
          >
            Practical development work across responsive
            frontend interfaces, application logic, API
            integration and database connectivity.
          </p>
        </div>
      </section>

      {/* =====================================================
          TECHNICAL SCOPE
      ====================================================== */}

      <section
        className="
          about-mobile-block
          container-custom
          relative
          z-10
          py-12
        "
      >
        <p
          className="
            about-mobile-reveal
            font-mono
            text-[8px]
            uppercase
            tracking-[0.16em]
            text-primary
          "
        >
          Technical Scope / 003
        </p>

        <h2
          className="
            about-mobile-reveal
            mt-3
            text-3xl
            font-bold
            tracking-[-0.045em]
            text-foreground
          "
        >
          Across every layer.
        </h2>

        <div
          className="
            mt-7
            overflow-hidden
            rounded-[1.4rem]
            border
            border-border
            bg-surface/25
          "
        >
          {aboutCapabilities.map(
            (
              capability,
              index
            ) => {
              const Icon =
                capabilityIcons[
                  index
                ];

              return (
                <div
                  key={
                    capability.title
                  }
                  className="
                    about-mobile-reveal
                    border-b
                    border-border
                    p-5
                    last:border-b-0
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-primary/20
                          bg-primary/5
                          text-primary
                        "
                      >
                        <Icon
                          size={15}
                        />
                      </div>

                      <h3
                        className="
                          text-sm
                          font-semibold
                          text-foreground
                        "
                      >
                        {
                          capability.title
                        }
                      </h3>
                    </div>

                    <span
                      className="
                        font-mono
                        text-[7px]
                        text-muted
                      "
                    >
                      {
                        capability.number
                      }
                    </span>
                  </div>

                  <p
                    className="
                      mt-4
                      text-xs
                      leading-6
                      text-muted
                    "
                  >
                    {
                      capability.description
                    }
                  </p>

                  <p
                    className="
                      mt-3
                      font-mono
                      text-[7px]
                      uppercase
                      leading-5
                      tracking-[0.1em]
                      text-primary
                    "
                  >
                    {
                      capability.tools
                    }
                  </p>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ====================================================== */}

      <section
        className="
          about-mobile-block
          relative
          z-10
          border-t
          border-border/60
        "
      >
        <div
          className="
            container-custom
            py-12
          "
        >
          <p
            className="
              about-mobile-reveal
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-primary
            "
          >
            Built in Practice / 004
          </p>

          <h2
            className="
              about-mobile-reveal
              mt-3
              text-3xl
              font-bold
              tracking-[-0.045em]
              text-foreground
            "
          >
            Projects that shaped the work.
          </h2>

          <div
            className="
              mt-7
              space-y-3
            "
          >
            {aboutProjects.map(
              (
                project
              ) => (
                <Link
                  key={
                    project.title
                  }
                  href={
                    project.href
                  }
                  className="
                    about-mobile-reveal
                    group
                    block
                    rounded-[1.3rem]
                    border
                    border-border
                    bg-surface/30
                    p-5
                    transition-colors
                    hover:border-primary/30
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-[7px]
                        text-primary
                      "
                    >
                      {
                        project.number
                      }
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="
                        text-muted
                        transition-colors
                        group-hover:text-primary
                      "
                    />
                  </div>

                  <p
                    className="
                      mt-5
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.12em]
                      text-muted
                    "
                  >
                    {
                      project.type
                    }
                  </p>

                  <h3
                    className="
                      mt-2
                      text-lg
                      font-bold
                      tracking-[-0.03em]
                      text-foreground
                    "
                  >
                    {
                      project.title
                    }
                  </h3>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-6
                      text-muted
                    "
                  >
                    {
                      project.description
                    }
                  </p>
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}