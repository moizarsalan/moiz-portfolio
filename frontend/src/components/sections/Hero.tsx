"use client";

import {
  useEffect,
  useRef,
} from "react";

import type {
  PointerEvent,
  ReactNode,
} from "react";

import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Sparkles,
} from "lucide-react";

/* =========================================================
   TECHNOLOGIES
========================================================= */

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Laravel",
  "MySQL",
];

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const profileRef =
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
        gsap.fromTo(
          ".hero-reveal",
          {
            opacity: 0,
            y: 34,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.065,
            duration: 0.75,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          ".hero-profile",
          {
            opacity: 0,
            x: 45,
            scale: 0.95,
            clipPath:
              "inset(8% 8% 8% 8% round 2rem)",
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            clipPath:
              "inset(0% 0% 0% 0% round 2rem)",
            duration: 0.95,
            delay: 0.15,
            ease: "power3.out",
          }
        );

        gsap.to(
          ".hero-orbit",
          {
            rotate: 360,
            duration: 28,
            repeat: -1,
            ease: "none",
          }
        );

        gsap.to(
          ".hero-copy",
          {
            y: -25,

            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
            },
          }
        );

        gsap.to(
          ".hero-profile",
          {
            y: -18,

            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.75,
            },
          }
        );
      }, section);

    return () => {
      context.revert();
    };
  }, []);

  /* =========================================================
     PROFILE TILT
  ========================================================= */

  function handleProfileMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (
      !profileRef.current ||
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
      profileRef.current,
      {
        rotateY:
          (x - 0.5) * 4,

        rotateX:
          (0.5 - y) * 4,

        x:
          (x - 0.5) * 5,

        y:
          (y - 0.5) * 5,

        transformPerspective:
          1000,

        duration: 0.35,

        ease:
          "power2.out",
      }
    );
  }

  function handleProfileLeave() {
    if (!profileRef.current) {
      return;
    }

    gsap.to(
      profileRef.current,
      {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      }
    );
  }

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        border-b
        border-border/50
        bg-background
        lg:min-h-[calc(100svh-5rem)]
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
          opacity-[0.14]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-48
          top-[-130px]
          h-[430px]
          w-[430px]
          rounded-full
          bg-primary/7
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-48
          bottom-[-160px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-secondary/7
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-2rem]
          left-1/2
          hidden
          -translate-x-1/2
          whitespace-nowrap
          text-[10rem]
          font-black
          leading-none
          tracking-[-0.08em]
          text-foreground
          opacity-[0.014]
          xl:block
        "
      >
        FULL STACK
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          container-custom
          relative
          z-10
          flex
          lg:min-h-[calc(100svh-5rem)]
          lg:items-center
        "
      >
        <div
          className="
            grid
            w-full
            gap-12
            py-14
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-center
            lg:gap-14
            lg:py-8
            xl:grid-cols-[1.2fr_0.8fr]
            xl:gap-20
          "
        >
          {/* =================================================
              LEFT
          ================================================== */}

          <div
            className="
              hero-copy
              min-w-0
            "
          >
            <div
              className="
                hero-reveal
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-border
                bg-surface/35
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
                  shadow-[0_0_8px_var(--success)]
                "
              />

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.16em]
                  text-muted
                "
              >
                Available for projects
              </span>
            </div>

            <div
              className="
                hero-reveal
                mt-7
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
                  tracking-[0.22em]
                  text-primary
                "
              >
                Abdul Moiz Arsalan
              </span>
            </div>

            <h1
              className="
                hero-reveal
                mt-4
                max-w-[760px]
                text-[3.25rem]
                font-black
                leading-[0.94]
                tracking-[-0.06em]
                text-foreground
                sm:text-[3.7rem]
                lg:text-[3.6rem]
                xl:text-[4.25rem]
              "
            >
              Full-Stack

              <span
                className="
                  block
                  text-gradient
                "
              >
                Web Developer.
              </span>
            </h1>

            <p
              className="
                hero-reveal
                mt-5
                max-w-[610px]
                text-sm
                leading-7
                text-foreground-secondary
                sm:text-[15px]
              "
            >
              I build modern, responsive and interactive web
              products across frontend development, backend
              functionality, APIs and database integration.
            </p>

            <p
              className="
                hero-reveal
                mt-2
                max-w-xl
                text-xs
                leading-6
                text-muted
              "
            >
              From the interface users interact with to the
              systems and data working behind it.
            </p>

            <div
              className="
                hero-reveal
                mt-7
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
                  shadow-[0_0_22px_var(--primary-glow)]
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                "
              >
                View Projects

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
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
                  bg-surface/40
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-foreground
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-primary/35
                  hover:text-primary
                "
              >
                Start a Project

                <ArrowUpRight
                  size={14}
                />
              </Link>
            </div>

            <div
              className="
                hero-reveal
                mt-7
                flex
                flex-wrap
                items-center
                gap-4
              "
            >
              <SocialLink
                href="https://github.com/moizarsalan"
                label="GitHub"
                icon={
                  <GitHubIcon />
                }
              />

              <SocialLink
                href="https://www.linkedin.com/in/abdul-moiz-arsalan-80913742b/"
                label="LinkedIn"
                icon={
                  <LinkedInIcon />
                }
              />

              <SocialLink
                href="https://www.instagram.com/alpha_aura.7?igsi=dDl4bG9kejVyMWhu"
                label="Instagram"
                icon={
                  <InstagramIcon />
                }
              />
            </div>

            <div
              className="
                hero-reveal
                mt-8
                border-t
                border-border/70
                pt-5
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-2
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Code2
                    size={13}
                    className="text-primary"
                  />

                  <span
                    className="
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.16em]
                      text-muted
                    "
                  >
                    Stack
                  </span>
                </div>

                {technologies.map(
                  (
                    technology,
                    index
                  ) => (
                    <div
                      key={
                        technology
                      }
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >
                      <span
                        className="
                          font-mono
                          text-[8px]
                          uppercase
                          tracking-[0.1em]
                          text-foreground-secondary
                        "
                      >
                        {
                          technology
                        }
                      </span>

                      {index !==
                        technologies.length -
                          1 && (
                        <span
                          className="
                            hidden
                            text-primary/40
                            sm:inline
                          "
                        >
                          /
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              PROFILE
          ================================================== */}

          <div
            className="
              hero-profile
              relative
              mx-auto
              w-full
              max-w-[390px]
              lg:mx-0
              lg:ml-auto
              lg:max-w-[350px]
              xl:max-w-[390px]
            "
            onPointerMove={
              handleProfileMove
            }
            onPointerLeave={
              handleProfileLeave
            }
          >
            <div
              className="
                hero-orbit
                pointer-events-none
                absolute
                -inset-5
                hidden
                rounded-[2.4rem]
                border
                border-primary/10
                lg:block
              "
            >
              <span
                className="
                  absolute
                  left-1/2
                  top-[-4px]
                  h-2
                  w-2
                  -translate-x-1/2
                  rounded-full
                  bg-primary
                  shadow-[0_0_15px_var(--primary)]
                "
              />
            </div>

            <div
              ref={profileRef}
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-border
                bg-surface/40
                p-2.5
                shadow-2xl
                backdrop-blur-xl
                [transform-style:preserve-3d]
              "
            >
              <div
                className="
                  relative
                  aspect-[0.88/1]
                  max-h-[440px]
                  overflow-hidden
                  rounded-[1.55rem]
                  border
                  border-border
                  bg-background-secondary
                  lg:max-h-[405px]
                  xl:max-h-[440px]
                "
              >
                <Image
                  src="/images/profile/abdul-moiz-profile.webp"
                  alt="Abdul Moiz Arsalan"
                  fill
                  priority
                  sizes="(max-width: 1023px) 390px, (max-width: 1279px) 350px, 390px"
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
                    from-background/25
                    via-transparent
                    to-background/10
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    profile-grid
                    opacity-[0.12]
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
                      tracking-[0.14em]
                      text-primary
                      backdrop-blur-md
                    "
                  >
                    Profile / AMA
                  </span>

                  <span
                    className="
                      flex
                      items-center
                      gap-2
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
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-success
                        shadow-[0_0_7px_var(--success)]
                      "
                    />

                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SOCIAL LINK
========================================================= */

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        inline-flex
        items-center
        gap-2
        text-xs
        text-muted
        transition-colors
        duration-300
        hover:text-primary
      "
    >
      <span
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-lg
          border
          border-border
          bg-surface/40
          transition-all
          duration-300
          group-hover:border-primary/30
          group-hover:bg-primary/5
        "
      >
        {icon}
      </span>

      <span
        className="
          hidden
          sm:inline
        "
      >
        {label}
      </span>
    </a>
  );
}

/* =========================================================
   ICONS
========================================================= */

function GitHubIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.74-1.55-2.57-.29-5.28-1.29-5.28-5.73 0-1.27.45-2.3 1.19-3.11-.12-.3-.52-1.48.11-3.07 0 0 .97-.31 3.16 1.19a10.9 10.9 0 0 1 5.76 0c2.2-1.5 3.16-1.19 3.16-1.19.63 1.59.23 2.77.11 3.07.74.81 1.19 1.84 1.19 3.11 0 4.45-2.71 5.43-5.29 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.34 7.91H1.78V22h3.56V7.91ZM3.56 1A2.06 2.06 0 1 0 3.56 5.12 2.06 2.06 0 0 0 3.56 1ZM22 13.92c0-4.24-2.26-6.21-5.28-6.21-2.43 0-3.52 1.34-4.13 2.28V7.91H9.03V22h3.56v-6.98c0-1.84.35-3.62 2.63-3.62 2.25 0 2.28 2.1 2.28 3.74V22H22v-8.08Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}