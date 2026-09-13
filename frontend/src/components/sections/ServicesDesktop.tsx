"use client";

import {
  PointerEvent,
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
  Sparkles,
} from "lucide-react";

import {
  services,
  Service,
} from "@/data/services";

export default function ServicesDesktop() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const blueprintRef =
    useRef<HTMLDivElement>(null);

  const detailRef =
    useRef<HTMLDivElement>(null);

  const firstRender =
    useRef(true);

  const previousIndex =
    useRef(0);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const service =
    services[activeIndex];

  /* =========================================================
     SECTION ENTRANCE
  ========================================================= */

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section =
      sectionRef.current;

    if (!section) return;

    if (
      !window.matchMedia(
        "(min-width: 1024px)"
      ).matches
    ) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const context = gsap.context(() => {
      if (reducedMotion) {
        return;
      }

      gsap.from(".service-studio-heading", {
        opacity: 0,
        y: 55,
        duration: 0.9,
        ease: "power3.out",

        scrollTrigger: {
          trigger:
            ".service-studio-heading",
          start: "top 84%",
          toggleActions:
            "play none none reverse",
        },
      });

      gsap.from(
        ".service-selector-item",
        {
          opacity: 0,
          x: -40,
          stagger: 0.08,
          duration: 0.65,
          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".service-selector",
            start: "top 82%",
            toggleActions:
              "play none none reverse",
          },
        }
      );

      gsap.from(".service-blueprint-shell", {
        opacity: 0,
        x: 60,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",

        scrollTrigger: {
          trigger:
            ".service-blueprint-shell",
          start: "top 84%",
          toggleActions:
            "play none none reverse",
        },
      });

      gsap.to(
        ".service-background-word",
        {
          xPercent: -10,

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    }, section);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, []);

  /* =========================================================
     SERVICE CHANGE
  ========================================================= */

  useEffect(() => {
    const blueprint =
      blueprintRef.current;

    const detail =
      detailRef.current;

    if (!blueprint || !detail) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (firstRender.current) {
      firstRender.current = false;

      animateBlueprint(
        blueprint,
        reducedMotion
      );

      previousIndex.current =
        activeIndex;

      return;
    }

    const direction =
      activeIndex >
      previousIndex.current
        ? 1
        : -1;

    if (reducedMotion) {
      gsap.set(
        blueprint.querySelectorAll(
          ".blueprint-node, .blueprint-edge"
        ),
        {
          opacity: 1,
        }
      );

      previousIndex.current =
        activeIndex;

      return;
    }

    /* copy */

    const detailItems =
      detail.querySelectorAll(
        ".service-detail-item"
      );

    gsap.fromTo(
      detailItems,
      {
        opacity: 0,
        y: 22,
        x: -10 * direction,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        stagger: 0.045,
        duration: 0.4,
        ease: "power3.out",
      }
    );

    /* blueprint */

    gsap.fromTo(
      blueprint,
      {
        opacity: 0.65,
        scale: 0.975,
        rotateY:
          direction === 1 ? 2 : -2,
      },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.55,
        ease: "power3.out",
      }
    );

    animateBlueprint(
      blueprint,
      false
    );

    previousIndex.current =
      activeIndex;
  }, [activeIndex]);

  function animateBlueprint(
    blueprint: HTMLDivElement,
    reducedMotion: boolean
  ) {
    if (reducedMotion) {
      return;
    }

    const edges =
      blueprint.querySelectorAll(
        ".blueprint-edge"
      );

    const nodes =
      blueprint.querySelectorAll(
        ".blueprint-node"
      );

    const labels =
      blueprint.querySelectorAll(
        ".blueprint-node-label"
      );

    gsap.killTweensOf([
      edges,
      nodes,
      labels,
    ]);

    gsap.fromTo(
      edges,
      {
        strokeDashoffset: 1,
        opacity: 0.15,
      },
      {
        strokeDashoffset: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.65,
        ease: "power2.inOut",
      }
    );

    gsap.fromTo(
      nodes,
      {
        opacity: 0,
        scale: 0.55,
        y: 12,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.065,
        duration: 0.48,
        ease: "back.out(1.7)",
        delay: 0.12,
      }
    );

    gsap.fromTo(
      labels,
      {
        opacity: 0,
        y: 8,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.35,
        delay: 0.28,
      }
    );

    const pulses =
      blueprint.querySelectorAll(
        ".blueprint-pulse"
      );

    gsap.fromTo(
      pulses,
      {
        scale: 0.4,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out",
      }
    );
  }

  /* =========================================================
     SUBTLE BLUEPRINT DEPTH
  ========================================================= */

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (!blueprintRef.current) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    const rotateY =
      (x - 0.5) * 3;

    const rotateX =
      (0.5 - y) * 3;

    gsap.to(
      blueprintRef.current,
      {
        rotateX,
        rotateY,
        transformPerspective: 1200,
        duration: 0.4,
        ease: "power2.out",
      }
    );
  }

  function handlePointerLeave() {
    if (!blueprintRef.current) {
      return;
    }

    gsap.to(
      blueprintRef.current,
      {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }

  return (
    <div
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        py-28
        xl:py-32
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.13]" />

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          top-[5%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-primary/6
          blur-[165px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-56
          bottom-[-80px]
          h-[540px]
          w-[540px]
          rounded-full
          bg-secondary/7
          blur-[175px]
        "
      />

      <div
        className="
          service-background-word
          pointer-events-none
          absolute
          right-[-8%]
          top-8
          whitespace-nowrap
          text-[12rem]
          font-black
          leading-none
          tracking-[-0.09em]
          text-foreground
          opacity-[0.017]
        "
      >
        BUILD
      </div>

      <div className="container-custom relative z-10">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            service-studio-heading
            flex
            items-end
            justify-between
            gap-16
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
                Service Studio
              </span>

            </div>

            <h2
              className="
                mt-5
                max-w-4xl
                text-5xl
                font-bold
                leading-[0.97]
                tracking-[-0.055em]
                text-foreground
                xl:text-6xl
              "
            >
              Ideas become

              <span className="block text-gradient">
                working products.
              </span>
            </h2>

          </div>

          <div className="max-w-sm">

            <p
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.17em]
                text-primary
              "
            >
              04 capabilities
            </p>

            <p
              className="
                mt-3
                text-sm
                leading-7
                text-muted
              "
            >
              Select a service and watch how its development
              architecture comes together.
            </p>

          </div>

        </div>

        {/* =====================================================
            STUDIO
        ====================================================== */}

        <div
          className="
            mt-14
            grid
            grid-cols-[0.72fr_1.28fr]
            gap-14
            xl:gap-20
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div>

            {/* Selector */}

            <div className="service-selector border-t border-border">

              {services.map(
                (item, index) => {
                  const active =
                    index === activeIndex;

                  return (
                    <button
                      key={item.number}
                      type="button"
                      onClick={() =>
                        setActiveIndex(index)
                      }
                      className="
                        service-selector-item
                        group
                        relative
                        block
                        w-full
                        border-b
                        border-border
                        py-5
                        text-left
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-5
                        "
                      >
                        <span
                          className={`
                            font-mono
                            text-[10px]
                            tracking-[0.16em]
                            transition-colors
                            duration-300

                            ${
                              active
                                ? "text-primary"
                                : "text-muted"
                            }
                          `}
                        >
                          {item.number}
                        </span>

                        <div className="min-w-0 flex-1">

                          <p
                            className={`
                              text-xl
                              font-semibold
                              tracking-[-0.025em]
                              transition-all
                              duration-300

                              ${
                                active
                                  ? "translate-x-2 text-foreground"
                                  : "text-muted group-hover:translate-x-1 group-hover:text-foreground-secondary"
                              }
                            `}
                          >
                            {item.title}
                          </p>

                          <p
                            className={`
                              mt-1
                              font-mono
                              text-[8px]
                              uppercase
                              tracking-[0.15em]
                              transition-all
                              duration-300

                              ${
                                active
                                  ? "translate-x-2 text-primary"
                                  : "text-muted/60"
                              }
                            `}
                          >
                            {item.label}
                          </p>

                        </div>

                        <ArrowRight
                          size={16}
                          className={`
                            transition-all
                            duration-300

                            ${
                              active
                                ? "translate-x-0 text-primary opacity-100"
                                : "-translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }
                          `}
                        />

                      </div>

                      {/* active line */}

                      <span
                        className={`
                          absolute
                          bottom-[-1px]
                          left-0
                          h-[2px]
                          [background:linear-gradient(90deg,var(--primary),var(--secondary))]
                          transition-all
                          duration-500

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

            {/* Active detail */}

            <div
              ref={detailRef}
              key={service.number}
              className="mt-9"
            >
              <p
                className="
                  service-detail-item
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-primary
                "
              >
                ACTIVE SERVICE / {service.number}
              </p>

              <h3
                className="
                  service-detail-item
                  mt-4
                  text-3xl
                  font-bold
                  leading-[1.02]
                  tracking-[-0.045em]
                  text-foreground
                "
              >
                {service.statement}
              </h3>

              <p
                className="
                  service-detail-item
                  mt-5
                  max-w-xl
                  text-sm
                  leading-7
                  text-muted
                "
              >
                {service.description}
              </p>

              <div
                className="
                  service-detail-item
                  mt-6
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {service.deliverables.map(
                  (item) => (
                    <span
                      key={item}
                      className="
                        rounded-lg
                        border
                        border-border
                        bg-surface/50
                        px-3
                        py-2
                        text-[10px]
                        font-medium
                        text-foreground-secondary
                        backdrop-blur-md
                      "
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

              <Link
                href="/order"
                className="
                  service-detail-item
                  group
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-foreground
                  transition-colors
                  duration-300
                  hover:text-primary
                "
              >
                Start this project

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

          {/* =================================================
              BLUEPRINT
          ================================================== */}

          <div
            className="
              service-blueprint-shell
              relative
            "
            onPointerMove={
              handlePointerMove
            }
            onPointerLeave={
              handlePointerLeave
            }
          >
            {/* Meta */}

            <div
              className="
                mb-4
                flex
                items-center
                justify-between
              "
            >
              <div>

                <p
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-muted
                  "
                >
                  Interactive Blueprint
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    text-foreground-secondary
                  "
                >
                  {service.title}
                </p>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-success
                    shadow-[0_0_9px_var(--success)]
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
                  architecture online
                </span>
              </div>

            </div>

            <div
              ref={blueprintRef}
              key={service.number}
              className="
                relative
                aspect-[1.35/1]
                overflow-hidden
                rounded-[2rem]
                border
                border-border
                bg-surface/35
                shadow-2xl
                backdrop-blur-xl
                [transform-style:preserve-3d]
              "
            >
              {/* Grid */}

              <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.33]" />

              {/* center glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-[360px]
                  w-[360px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-primary/5
                  blur-[100px]
                "
              />

              {/* HUD */}

              <div
                className="
                  absolute
                  left-5
                  right-5
                  top-5
                  z-20
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    text-primary
                  "
                >
                  {service.number} / SYSTEM MAP
                </span>

                <span
                  className="
                    font-mono
                    text-[8px]
                    text-muted
                  "
                >
                  x:{activeIndex + 1} y:{services.length}
                </span>
              </div>

              <Blueprint service={service} />

              {/* bottom HUD */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  z-20
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    text-muted
                  "
                >
                  concept → architecture → product
                </span>

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    text-primary
                  "
                >
                  LIVE
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div
          className="
            mt-16
            flex
            items-center
            justify-between
            border-t
            border-border
            pt-8
          "
        >
          <div>

            <p
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-primary
              "
            >
              Need something different?
            </p>

            <p
              className="
                mt-2
                text-lg
                font-semibold
                tracking-[-0.025em]
                text-foreground
              "
            >
              We can define the scope around your actual idea.
            </p>

          </div>

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
              py-3
              text-sm
              font-semibold
              text-white
              shadow-[0_0_22px_var(--primary-glow)]
            "
          >
            Start a Project

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
  );
}

/* =========================================================
   BLUEPRINT
========================================================= */

function Blueprint({
  service,
}: {
  service: Service;
}) {
  const getNode = (
    id: string
  ) =>
    service.nodes.find(
      (node) => node.id === id
    );

  return (
    <div className="absolute inset-0">

      {/* SVG connections */}

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
        "
      >
        <defs>
          <linearGradient
            id={`service-gradient-${service.number}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--primary)"
            />

            <stop
              offset="100%"
              stopColor="var(--secondary)"
            />
          </linearGradient>
        </defs>

        {service.edges.map(
          (edge, index) => {
            const from =
              getNode(edge.from);

            const to =
              getNode(edge.to);

            if (!from || !to) {
              return null;
            }

            return (
              <line
                key={`${edge.from}-${edge.to}`}
                className="blueprint-edge"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                pathLength={1}
                stroke={`url(#service-gradient-${service.number})`}
                strokeWidth="0.22"
                strokeDasharray="1"
                strokeDashoffset="1"
                vectorEffect="non-scaling-stroke"
                opacity="0.7"
              />
            );
          }
        )}

        {/* faint architecture frame */}

        <rect
          x="7"
          y="8"
          width="86"
          height="84"
          rx="4"
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.16"
          strokeDasharray="1.5 1.5"
          vectorEffect="non-scaling-stroke"
          opacity="0.45"
        />
      </svg>

      {/* Nodes */}

      {service.nodes.map(
        (node, index) => (
          <div
            key={node.id}
            className="
              blueprint-node
              absolute
              z-10
              -translate-x-1/2
              -translate-y-1/2
            "
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
          >
            {/* Pulse */}

            {node.primary && (
              <div
                className="
                  blueprint-pulse
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-20
                  w-20
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-primary/10
                  shadow-[0_0_35px_var(--primary-glow)]
                "
              />
            )}

            <div
              className={`
                relative
                min-w-[92px]
                rounded-xl
                border
                px-3
                py-2.5
                text-center
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1

                ${
                  node.primary
                    ? "border-primary/35 bg-primary/10 shadow-[0_0_22px_var(--primary-glow)]"
                    : "border-border bg-background/80 hover:border-primary/30"
                }
              `}
            >
              <p
                className="
                  blueprint-node-label
                  text-xs
                  font-semibold
                  tracking-[-0.015em]
                  text-foreground
                "
              >
                {node.label}
              </p>

              {node.sublabel && (
                <p
                  className="
                    blueprint-node-label
                    mt-1
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.14em]
                    text-muted
                  "
                >
                  {node.sublabel}
                </p>
              )}

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-2
                  w-2
                  rounded-full
                  bg-primary
                  shadow-[0_0_10px_var(--primary)]
                "
              />
            </div>

          </div>
        )
      )}

      {/* central decorative rings */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-32
          w-32
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-primary/5
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-48
          w-48
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-secondary/5
        "
      />

    </div>
  );
}