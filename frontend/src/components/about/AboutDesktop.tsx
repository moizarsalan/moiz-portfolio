"use client";

import {
  useEffect,
  useRef,
} from "react";

import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  Layers3,
  ServerCog,
  Sparkles,
} from "lucide-react";

import {
  aboutCapabilities,
  aboutProjects,
} from "@/data/about";

/* =========================================================
   ICONS
========================================================= */

const capabilityIcons = [
  Code2,
  ServerCog,
  Database,
  Braces,
];

/* =========================================================
   ABOUT DESKTOP
========================================================= */

export default function AboutDesktop() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  /* =========================================================
     GSAP
  ========================================================= */

  useEffect(() => {
    gsap.registerPlugin(
      ScrollTrigger
    );

    const section =
      sectionRef.current;

    if (!section) {
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
        /* INTRO */

        gsap.fromTo(
          ".about-desktop-reveal",
          {
            opacity: 0,
            y: 32,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.055,
            duration: 0.7,
            ease: "power3.out",
          }
        );

        /* SCROLL BLOCKS */

        const blocks =
          gsap.utils.toArray<HTMLElement>(
            ".about-scroll-block"
          );

        blocks.forEach(
          (block) => {
            gsap.fromTo(
              block.querySelectorAll(
                ".about-scroll-reveal"
              ),

              {
                opacity: 0,
                y: 28,
              },

              {
                opacity: 1,
                y: 0,
                stagger: 0.055,
                duration: 0.65,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: block,
                  start: "top 82%",
                  toggleActions:
                    "play none none reverse",
                },
              }
            );
          }
        );
      }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="
        relative
        hidden
        overflow-hidden
        bg-background
        lg:block
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
          -right-52
          top-8
          h-[480px]
          w-[480px]
          rounded-full
          bg-primary/6
          blur-[160px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          top-[48%]
          h-[480px]
          w-[480px]
          rounded-full
          bg-secondary/5
          blur-[170px]
        "
      />

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section
        className="
          container-custom
          relative
          z-10
          py-16
          xl:py-20
        "
      >
        <div
          className="
            grid
            grid-cols-[0.85fr_1.15fr]
            items-center
            gap-16
            xl:gap-20
          "
        >
          {/* =================================================
              PORTRAIT
          ================================================== */}

          <div
            className="
              about-desktop-reveal
              relative
              mx-auto
              w-full
              max-w-[430px]
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -inset-5
                rounded-[2.5rem]
                border
                border-primary/10
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-border
                bg-surface/30
                p-2.5
                shadow-2xl
                backdrop-blur-xl
              "
            >
              <div
                className="
                  relative
                  aspect-[0.82/1]
                  overflow-hidden
                  rounded-[1.55rem]
                  border
                  border-border
                  bg-background-secondary
                "
              >
                <Image
                  src="/images/profile/abdul-moiz-profile.webp"
                  alt="Abdul Moiz Arsalan"
                  fill
                  priority
                  sizes="430px"
                  className="
                    object-cover
                    object-center
                  "
                />

                {/* Overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-background/35
                    via-transparent
                    to-background/5
                  "
                />

                {/* Grid */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    profile-grid
                    opacity-[0.09]
                  "
                />

                {/* Scan */}

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

                {/* Top metadata */}

                <div
                  className="
                    absolute
                    left-5
                    right-5
                    top-5
                    z-10
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      rounded-lg
                      bg-background/55
                      px-2.5
                      py-1.5
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.15em]
                      text-primary
                      backdrop-blur-md
                    "
                  >
                    Profile / AMA
                  </span>

                  <span
                    className="
                      rounded-lg
                      bg-background/55
                      px-2.5
                      py-1.5
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.14em]
                      text-foreground-secondary
                      backdrop-blur-md
                    "
                  >
                    Full-Stack Developer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              INTRO COPY
          ================================================== */}

          <div>
            <div
              className="
                about-desktop-reveal
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
                  tracking-[0.18em]
                  text-primary
                "
              >
                About / 001
              </span>
            </div>

            <h1
              className="
                about-desktop-reveal
                mt-5
                max-w-3xl
                text-5xl
                font-black
                leading-[0.95]
                tracking-[-0.055em]
                text-foreground
                xl:text-6xl
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

            <p
              className="
                about-desktop-reveal
                mt-6
                max-w-2xl
                text-[15px]
                leading-8
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
                about-desktop-reveal
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-muted
              "
            >
              My work focuses on modern responsive web
              experiences that combine interface design with the
              technical structure required behind the product.
            </p>

            <div
              className="
                about-desktop-reveal
                mt-8
                flex
                flex-wrap
                gap-3
              "
            >
              <Link
                href="/projects"
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
                  shadow-[0_0_20px_var(--primary-glow)]
                "
              >
                Explore Projects

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                href="/order"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-border
                  bg-surface/35
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-foreground
                  transition-all
                  hover:border-primary/30
                  hover:text-primary
                "
              >
                Start a Project

                <ArrowUpRight
                  size={14}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE
      ====================================================== */}

      <section
        className="
          about-scroll-block
          relative
          z-10
          border-y
          border-border/60
        "
      >
        <div
          className="
            container-custom
            grid
            grid-cols-[0.55fr_1.45fr]
            gap-16
            py-14
          "
        >
          <div>
            <p
              className="
                about-scroll-reveal
                font-mono
                text-[8px]
                uppercase
                tracking-[0.17em]
                text-primary
              "
            >
              Experience / 002
            </p>

            <div
              className="
                about-scroll-reveal
                mt-4
                h-px
                w-14
                [background:linear-gradient(90deg,var(--primary),transparent)]
              "
            />
          </div>

          <div>
            <p
              className="
                about-scroll-reveal
                text-xs
                uppercase
                tracking-[0.12em]
                text-muted
              "
            >
              Current Development Experience
            </p>

            <h2
              className="
                about-scroll-reveal
                mt-3
                text-3xl
                font-bold
                tracking-[-0.045em]
                text-foreground
              "
            >
              Full-Stack Web Development
            </h2>

            <p
              className="
                about-scroll-reveal
                mt-2
                font-mono
                text-[8px]
                uppercase
                tracking-[0.14em]
                text-primary
              "
            >
              Freelance &amp; Personal Projects
            </p>

            <p
              className="
                about-scroll-reveal
                mt-5
                max-w-3xl
                text-sm
                leading-7
                text-muted
              "
            >
              My practical development work has focused on
              designing and building complete web experiences,
              working across responsive frontend interfaces,
              application logic, API integration and database
              connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNICAL SCOPE
      ====================================================== */}

      <section
        className="
          about-scroll-block
          container-custom
          relative
          z-10
          py-16
        "
      >
        <div
          className="
            flex
            items-end
            justify-between
            gap-10
          "
        >
          <div>
            <p
              className="
                about-scroll-reveal
                font-mono
                text-[8px]
                uppercase
                tracking-[0.17em]
                text-primary
              "
            >
              Technical Scope / 003
            </p>

            <h2
              className="
                about-scroll-reveal
                mt-4
                text-4xl
                font-bold
                tracking-[-0.05em]
                text-foreground
              "
            >
              Across every layer.
            </h2>
          </div>

          <Layers3
            size={26}
            className="
              about-scroll-reveal
              text-primary
            "
          />
        </div>

        <div
          className="
            mt-8
            grid
            grid-cols-4
            overflow-hidden
            rounded-[1.5rem]
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
                    about-scroll-reveal
                    border-r
                    border-border
                    p-6
                    last:border-r-0
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <Icon
                      size={18}
                      className="text-primary"
                    />

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

                  <h3
                    className="
                      mt-6
                      text-lg
                      font-semibold
                      text-foreground
                    "
                  >
                    {
                      capability.title
                    }
                  </h3>

                  <p
                    className="
                      mt-3
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
                      mt-5
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
          BUILT IN PRACTICE
      ====================================================== */}

      <section
        className="
          about-scroll-block
          relative
          z-10
          border-t
          border-border/60
        "
      >
        <div
          className="
            container-custom
            py-16
          "
        >
          <p
            className="
              about-scroll-reveal
              font-mono
              text-[8px]
              uppercase
              tracking-[0.17em]
              text-primary
            "
          >
            Built in Practice / 004
          </p>

          <h2
            className="
              about-scroll-reveal
              mt-4
              text-4xl
              font-bold
              tracking-[-0.05em]
              text-foreground
            "
          >
            Projects that shaped the work.
          </h2>

          <div
            className="
              mt-8
              grid
              grid-cols-3
              gap-3
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
                    about-scroll-reveal
                    group
                    relative
                    min-h-[235px]
                    overflow-hidden
                    rounded-[1.4rem]
                    border
                    border-border
                    bg-surface/30
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-primary/30
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[8px]
                      text-primary
                    "
                  >
                    {
                      project.number
                    }
                  </span>

                  <p
                    className="
                      mt-10
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.13em]
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
                      text-xl
                      font-bold
                      tracking-[-0.035em]
                      text-foreground
                    "
                  >
                    {
                      project.title
                    }
                  </h3>

                  <p
                    className="
                      mt-3
                      text-xs
                      leading-6
                      text-muted
                    "
                  >
                    {
                      project.description
                    }
                  </p>

                  <ArrowUpRight
                    size={16}
                    className="
                      absolute
                      right-5
                      top-5
                      text-muted
                      transition-all
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-primary
                    "
                  />
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}