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
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import {
  Service,
  services,
} from "@/data/services";

export default function ServicesMobile() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const blueprintRef =
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

  const service =
    services[activeIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section =
      sectionRef.current;

    if (!section) return;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const context = gsap.context(() => {
      if (reducedMotion) {
        return;
      }

      gsap.from(
        ".services-mobile-heading",
        {
          opacity: 0,
          y: 45,
          duration: 0.8,
          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".services-mobile-heading",
            start: "top 86%",
            toggleActions:
              "play none none reverse",
          },
        }
      );

      gsap.from(
        ".mobile-service-deck",
        {
          opacity: 0,
          y: 55,
          scale: 0.97,
          duration: 0.85,
          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".mobile-service-deck",
            start: "top 87%",
            toggleActions:
              "play none none reverse",
          },
        }
      );
    }, section);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    const blueprint =
      blueprintRef.current;

    const content =
      contentRef.current;

    if (
      !blueprint ||
      !content
    ) {
      return;
    }

    if (firstRender.current) {
      firstRender.current = false;

      animateMobileBlueprint(
        blueprint
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

    const elements =
      content.querySelectorAll(
        ".mobile-service-content-item"
      );

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        x: 22 * direction,
        y: 12,
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

    gsap.fromTo(
      blueprint,
      {
        opacity: 0.65,
        scale: 0.96,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      }
    );

    animateMobileBlueprint(
      blueprint
    );

    previousIndex.current =
      activeIndex;
  }, [activeIndex]);

  function animateMobileBlueprint(
    blueprint: HTMLDivElement
  ) {
    const edges =
      blueprint.querySelectorAll(
        ".mobile-blueprint-edge"
      );

    const nodes =
      blueprint.querySelectorAll(
        ".mobile-blueprint-node"
      );

    gsap.fromTo(
      edges,
      {
        strokeDashoffset: 1,
        opacity: 0.15,
      },
      {
        strokeDashoffset: 0,
        opacity: 1,
        stagger: 0.055,
        duration: 0.55,
        ease: "power2.inOut",
      }
    );

    gsap.fromTo(
      nodes,
      {
        opacity: 0,
        scale: 0.6,
        y: 10,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.055,
        duration: 0.42,
        delay: 0.1,
        ease: "back.out(1.6)",
      }
    );
  }

  function previousService() {
    setActiveIndex((current) =>
      current === 0
        ? services.length - 1
        : current - 1
    );
  }

  function nextService() {
    setActiveIndex((current) =>
      current ===
      services.length - 1
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
      touchStartX.current -
      endX;

    if (
      Math.abs(difference) > 45
    ) {
      if (difference > 0) {
        nextService();
      } else {
        previousService();
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
        py-24
      "
    >
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.13]" />

      <div
        className="
          pointer-events-none
          absolute
          -right-44
          top-20
          h-80
          w-80
          rounded-full
          bg-primary/7
          blur-[120px]
        "
      />

      <div className="container-custom relative z-10">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="services-mobile-heading">

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
              Service Studio
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
            Ideas become

            <span className="block text-gradient">
              working products.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-md
              text-sm
              leading-7
              text-muted
            "
          >
            Swipe through the services and explore how each
            product architecture comes together.
          </p>

        </div>

        {/* =====================================================
            MINI SELECTOR
        ====================================================== */}

        <div
          className="
            mt-8
            flex
            gap-2
            overflow-x-auto
            pb-2
          "
        >
          {services.map(
            (item, index) => (
              <button
                key={item.number}
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
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  transition-all
                  duration-300

                  ${
                    activeIndex === index
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-surface/40 text-muted"
                  }
                `}
              >
                {item.number}{" "}
                {item.shortTitle}
              </button>
            )
          )}
        </div>

        {/* =====================================================
            SERVICE DECK
        ====================================================== */}

        <div
          className="
            mobile-service-deck
            mt-5
            overflow-hidden
            rounded-[1.8rem]
            border
            border-border
            bg-surface/35
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
          {/* Blueprint */}

          <div
            ref={blueprintRef}
            key={`blueprint-${service.number}`}
            className="
              relative
              aspect-[1.1/1]
              overflow-hidden
              rounded-[1.45rem]
              border
              border-border
              bg-background/65
            "
          >
            <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.28]" />

            <div
              className="
                absolute
                left-4
                right-4
                top-4
                z-20
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.15em]
                  text-primary
                "
              >
                {service.number} / BLUEPRINT
              </span>

              <span
                className="
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.13em]
                  text-muted
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-success
                  "
                />

                LIVE
              </span>
            </div>

            <MobileBlueprint
              service={service}
            />

          </div>

          {/* =================================================
              COPY
          ================================================== */}

          <div
            ref={contentRef}
            key={`copy-${service.number}`}
            className="
              px-3
              pb-4
              pt-6
            "
          >
            <div
              className="
                mobile-service-content-item
                flex
                items-center
                justify-between
              "
            >
              <div>

                <p
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-primary
                  "
                >
                  {service.number} /{" "}
                  {service.label}
                </p>

              </div>

              <span
                className="
                  font-mono
                  text-[8px]
                  text-muted
                "
              >
                {activeIndex + 1} /{" "}
                {services.length}
              </span>

            </div>

            <h3
              className="
                mobile-service-content-item
                mt-4
                text-3xl
                font-bold
                leading-[0.98]
                tracking-[-0.045em]
                text-foreground
              "
            >
              {service.title}
            </h3>

            <p
              className="
                mobile-service-content-item
                mt-3
                text-lg
                font-semibold
                leading-6
                tracking-[-0.025em]
                text-foreground-secondary
              "
            >
              {service.statement}
            </p>

            <p
              className="
                mobile-service-content-item
                mt-4
                text-sm
                leading-7
                text-muted
              "
            >
              {service.description}
            </p>

            <div
              className="
                mobile-service-content-item
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
                      bg-background-secondary
                      px-3
                      py-2
                      text-[9px]
                      text-foreground-secondary
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
                mobile-service-content-item
                mt-7
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
              Start a Project

              <ArrowUpRight
                size={14}
              />
            </Link>

          </div>

          {/* =================================================
              NAVIGATION
          ================================================== */}

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
              onClick={
                previousService
              }
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
              aria-label="Previous service"
            >
              <ChevronLeft
                size={16}
              />
            </button>

            <div className="flex gap-2">

              {services.map(
                (item, index) => (
                  <button
                    key={item.number}
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
              onClick={
                nextService
              }
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
              aria-label="Next service"
            >
              <ChevronRight
                size={16}
              />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

function MobileBlueprint({
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
            id={`mobile-service-gradient-${service.number}`}
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
          (edge) => {
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
                className="mobile-blueprint-edge"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                pathLength={1}
                stroke={`url(#mobile-service-gradient-${service.number})`}
                strokeWidth="0.2"
                strokeDasharray="1"
                strokeDashoffset="1"
                vectorEffect="non-scaling-stroke"
                opacity="0.7"
              />
            );
          }
        )}
      </svg>

      {service.nodes.map(
        (node) => (
          <div
            key={node.id}
            className="
              mobile-blueprint-node
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
            <div
              className={`
                min-w-[66px]
                rounded-lg
                border
                px-2
                py-2
                text-center
                backdrop-blur-xl

                ${
                  node.primary
                    ? "border-primary/35 bg-primary/10 shadow-[0_0_18px_var(--primary-glow)]"
                    : "border-border bg-background/85"
                }
              `}
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  text-foreground
                "
              >
                {node.label}
              </p>

              {node.sublabel && (
                <p
                  className="
                    mt-0.5
                    font-mono
                    text-[6px]
                    uppercase
                    tracking-[0.11em]
                    text-muted
                  "
                >
                  {node.sublabel}
                </p>
              )}

            </div>
          </div>
        )
      )}

    </div>
  );
}