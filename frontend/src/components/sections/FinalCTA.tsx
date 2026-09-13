"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from(".final-cta-item", {
        opacity: 0,
        y: 45,
        stagger: 0.07,
        duration: 0.75,
        ease: "power3.out",

        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        ".final-cta-line",
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".final-cta-orbit-one", {
        rotate: 360,
        duration: 26,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".final-cta-orbit-two", {
        rotate: -360,
        duration: 34,
        repeat: -1,
        ease: "none",
      });
    }, section);

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
        border-t
        border-border/50
        bg-background
        py-24
        lg:py-32
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.11]" />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/7
          blur-[160px]
        "
      />

      <div className="container-custom relative z-10">

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-border
            bg-surface/35
            px-6
            py-16
            backdrop-blur-xl
            sm:px-10
            lg:rounded-[2.6rem]
            lg:px-16
            lg:py-20
          "
        >
          {/* Orbit system */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-110px]
              top-1/2
              hidden
              h-[420px]
              w-[420px]
              -translate-y-1/2
              lg:block
            "
          >
            <div
              className="
                final-cta-orbit-one
                absolute
                inset-0
                rounded-full
                border
                border-primary/10
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
                  shadow-[0_0_16px_var(--primary)]
                "
              />
            </div>

            <div
              className="
                final-cta-orbit-two
                absolute
                inset-[70px]
                rounded-full
                border
                border-secondary/10
              "
            >
              <span
                className="
                  absolute
                  bottom-[18%]
                  right-[-4px]
                  h-2
                  w-2
                  rounded-full
                  bg-secondary
                  shadow-[0_0_16px_var(--secondary)]
                "
              />
            </div>

            <div
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-28
                w-28
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-primary/20
                bg-background/70
                font-mono
                text-xs
                font-bold
                tracking-[0.16em]
                text-primary
                shadow-[0_0_45px_var(--primary-glow)]
                backdrop-blur-xl
              "
            >
              BUILD
            </div>
          </div>

          {/* Label */}

          <div className="final-cta-item flex items-center gap-2">

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
                lg:text-xs
              "
            >
              Start Something
            </span>

          </div>

          {/* Heading */}

          <h2
            className="
              final-cta-item
              mt-6
              max-w-4xl
              text-[2.7rem]
              font-black
              leading-[0.95]
              tracking-[-0.06em]
              text-foreground
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
            "
          >
            Have an idea?

            <span className="block text-gradient">
              Let&apos;s build it properly.
            </span>
          </h2>

          <p
            className="
              final-cta-item
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-muted
              sm:text-base
            "
          >
            Whether you need a business website, web application,
            e-commerce experience or a custom full-stack product,
            tell me what you&apos;re trying to build and we can
            define the right direction.
          </p>

          {/* Actions */}

          <div
            className="
              final-cta-item
              mt-9
              flex
              flex-wrap
              gap-3
            "
          >
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
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_0_24px_var(--primary-glow)]
              "
            >
              Start a Project

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              href="/projects"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-border
                bg-surface/50
                px-5
                py-3.5
                text-sm
                font-medium
                text-foreground
                transition-all
                duration-300
                hover:border-primary/40
                hover:text-primary
              "
            >
              Explore Projects

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>

          {/* Bottom signal */}

          <div
            className="
              final-cta-item
              mt-14
              max-w-2xl
            "
          >
            <div className="h-px overflow-hidden bg-border">

              <div
                className="
                  final-cta-line
                  h-full
                  w-full
                  origin-left
                  [background:linear-gradient(90deg,var(--primary),var(--secondary),transparent)]
                "
              />

            </div>

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
                font-mono
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-muted
              "
            >
              <span className="flex items-center gap-2">

                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-success
                  "
                />

                Available for projects
              </span>

              <span>Frontend</span>

              <span>Backend</span>

              <span>APIs</span>

              <span>Database</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}