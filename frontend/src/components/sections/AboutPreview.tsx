"use client";

import {
  useEffect,
  useRef,
} from "react";

import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function AboutPreview() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section =
      sectionRef.current;

    if (!section) return;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from(".about-preview-item", {
        opacity: 0,
        y: 45,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out",

        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions:
            "play none none reverse",
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-preview"
      className="
        relative
        overflow-hidden
        border-t
        border-border/50
        bg-background
      "
    >
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.1]" />

      <div className="container-custom relative z-10 py-20 lg:py-24">

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[0.65fr_1.35fr]
            lg:items-end
            lg:gap-20
          "
        >
          <div>

            <div className="about-preview-item flex items-center gap-2">

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
                About
              </span>

            </div>

            <p
              className="
                about-preview-item
                mt-5
                font-mono
                text-[9px]
                uppercase
                tracking-[0.17em]
                text-muted
              "
            >
              Abdul Moiz Arsalan
            </p>

          </div>

          <div>

            <h2
              className="
                about-preview-item
                max-w-4xl
                text-4xl
                font-bold
                leading-[1]
                tracking-[-0.05em]
                text-foreground
                lg:text-5xl
              "
            >
              I build beyond

              <span className="block text-gradient">
                the interface.
              </span>
            </h2>

            <p
              className="
                about-preview-item
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-muted
                lg:text-base
              "
            >
              I&apos;m Abdul Moiz Arsalan, a Full-Stack Web
              Developer working across frontend development,
              backend functionality, API integration and
              databases.
            </p>

            <div
              className="
                about-preview-item
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-2
              "
            >
              {[
                "FRONTEND",
                "BACKEND",
                "APIs",
                "DATABASES",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.15em]
                      text-foreground-secondary
                    "
                  >
                    {item}
                  </span>

                  {index !== 3 && (
                    <span className="text-primary">
                      /
                    </span>
                  )}
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="
                about-preview-item
                group
                mt-8
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-foreground
                transition-colors
                hover:text-primary
              "
            >
              More About Me

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

        </div>

      </div>
    </section>
  );
}