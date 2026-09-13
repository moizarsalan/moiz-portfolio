"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  Check,
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import ReviewFormPanel from "@/components/reviews/ReviewFormPanel";

import type {
  PublishedReview,
} from "@/lib/api/reviews";

const pipeline = [
  {
    number: "01",
    title: "Submitted",
    subtitle: "Client feedback",
  },
  {
    number: "02",
    title: "Consent",
    subtitle: "Public permission",
  },
  {
    number: "03",
    title: "Reviewed",
    subtitle: "Owner approval",
  },
  {
    number: "04",
    title: "Published",
    subtitle: "Visible here",
  },
];

type ReviewsDesktopProps = {
  reviews: PublishedReview[];
  loading: boolean;
  error: string | null;
};

export default function ReviewsDesktop({
  reviews,
  loading,
  error,
}: ReviewsDesktopProps) {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(
      ScrollTrigger
    );

    const section =
      sectionRef.current;

    if (!section) return;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const context =
      gsap.context(() => {
        if (reducedMotion) {
          return;
        }

        gsap.from(
          ".reviews-heading-item",
          {
            opacity: 0,
            y: 45,
            stagger: 0.07,
            duration: 0.75,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".reviews-heading",

              start:
                "top 84%",

              toggleActions:
                "play none none reverse",
            },
          }
        );

        gsap.from(
          ".review-console",
          {
            opacity: 0,
            y: 65,
            scale: 0.975,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".review-console",

              start:
                "top 86%",

              toggleActions:
                "play none none reverse",
            },
          }
        );

        gsap.from(
          ".review-stage",
          {
            opacity: 0,
            y: 25,
            stagger: 0.08,
            duration: 0.55,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".review-pipeline",

              start:
                "top 82%",

              toggleActions:
                "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          ".review-signal",
          {
            left: "0%",
          },
          {
            left: "100%",
            duration: 5,
            repeat: -1,
            ease: "none",
          }
        );

        gsap.to(
          ".reviews-background-word",
          {
            xPercent: -10,

            scrollTrigger: {
              trigger: section,

              start:
                "top bottom",

              end:
                "bottom top",

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

  return (
    <>
      <div
        ref={sectionRef}
        className="
          relative
          overflow-hidden
          py-28
          xl:py-32
        "
      >
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.12]" />

        <div
          className="
            pointer-events-none
            absolute
            -left-48
            top-12
            h-[500px]
            w-[500px]
            rounded-full
            bg-primary/6
            blur-[170px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-48
            bottom-[-100px]
            h-[520px]
            w-[520px]
            rounded-full
            bg-secondary/6
            blur-[170px]
          "
        />

        <div
          className="
            reviews-background-word
            pointer-events-none
            absolute
            right-[-6%]
            top-12
            whitespace-nowrap
            text-[12rem]
            font-black
            leading-none
            tracking-[-0.09em]
            text-foreground
            opacity-[0.015]
          "
        >
          TRUST
        </div>

        <div className="container-custom relative z-10">
          <div
            className="
              reviews-heading
              grid
              grid-cols-[1.25fr_0.75fr]
              items-end
              gap-16
            "
          >
            <div>
              <div className="reviews-heading-item flex items-center gap-2">
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
                  Client Signal
                </span>
              </div>

              <h2
                className="
                  reviews-heading-item
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
                Feedback should be

                <span className="block text-gradient">
                  earned, not invented.
                </span>
              </h2>
            </div>

            <p
              className="
                reviews-heading-item
                text-sm
                leading-7
                text-muted
              "
            >
              Only genuine client
              feedback will appear
              here. Every review
              requires public-display
              consent and approval
              before publication.
            </p>
          </div>

          <div
            className="
              review-console
              relative
              mt-14
              overflow-hidden
              rounded-[2.2rem]
              border
              border-border
              bg-surface/35
              p-8
              backdrop-blur-xl
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[-220px]
                h-[370px]
                w-[720px]
                -translate-x-1/2
                rounded-full
                bg-primary/5
                blur-[110px]
              "
            />

            <div
              className="
                relative
                flex
                items-center
                justify-between
                border-b
                border-border
                pb-6
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-primary/20
                    bg-primary/5
                    text-primary
                  "
                >
                  <MessageSquareQuote
                    size={17}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-foreground
                    "
                  >
                    Review Channel
                  </p>

                  <p
                    className="
                      mt-1
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.14em]
                      text-muted
                    "
                  >
                    verified feedback pipeline
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-border
                  bg-background/50
                  px-3
                  py-2
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-success
                  "
                />

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    text-muted
                  "
                >
                  accepting feedback
                </span>
              </div>
            </div>

            <div
              className="
                review-pipeline
                relative
                mt-10
                grid
                grid-cols-4
              "
            >
              <div
                className="
                  absolute
                  left-[12.5%]
                  right-[12.5%]
                  top-[23px]
                  h-px
                  bg-border
                "
              />

              <div
                className="
                  absolute
                  left-[12.5%]
                  right-[12.5%]
                  top-[23px]
                  h-px
                  overflow-hidden
                "
              >
                <div
                  className="
                    review-signal
                    absolute
                    top-1/2
                    h-2.5
                    w-2.5
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-primary
                    shadow-[0_0_18px_var(--primary)]
                  "
                />
              </div>

              {pipeline.map(
                (stage) => (
                  <div
                    key={
                      stage.number
                    }
                    className="
                      review-stage
                      relative
                      text-center
                    "
                  >
                    <div
                      className="
                        relative
                        z-10
                        mx-auto
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-primary/25
                        bg-background
                        font-mono
                        text-[9px]
                        font-semibold
                        text-primary
                        shadow-[0_0_18px_var(--primary-glow)]
                      "
                    >
                      {
                        stage.number
                      }
                    </div>

                    <p
                      className="
                        mt-5
                        text-sm
                        font-semibold
                        text-foreground
                      "
                    >
                      {
                        stage.title
                      }
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-muted
                      "
                    >
                      {
                        stage.subtitle
                      }
                    </p>
                  </div>
                )
              )}
            </div>

            <div
              className="
                relative
                mt-12
                grid
                grid-cols-[0.7fr_1.3fr]
                gap-10
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
                    tracking-[0.17em]
                    text-primary
                  "
                >
                  Published Reviews
                </p>

                <div className="mt-4 flex items-end gap-4">
                  <span
                    className="
                      text-7xl
                      font-black
                      leading-none
                      tracking-[-0.07em]
                      text-foreground
                    "
                  >
                    {loading
                      ? "--"
                      : reviews.length
                          .toString()
                          .padStart(
                            2,
                            "0"
                          )}
                  </span>

                  <span
                    className="
                      mb-2
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.14em]
                      text-muted
                    "
                  >
                    verified
                  </span>
                </div>
              </div>

              {loading ? (
                <ReviewStatusCard
                  title="Loading verified reviews..."
                  description="Checking the published review channel."
                />
              ) : error ? (
                <ReviewStatusCard
                  title="Reviews temporarily unavailable."
                  description={
                    error
                  }
                />
              ) : reviews.length ===
                0 ? (
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-10
                    rounded-[1.5rem]
                    border
                    border-border
                    bg-background/45
                    p-6
                  "
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        size={
                          15
                        }
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
                        No fabricated testimonials
                      </span>
                    </div>

                    <h3
                      className="
                        mt-3
                        text-2xl
                        font-bold
                        tracking-[-0.035em]
                        text-foreground
                      "
                    >
                      The first genuine
                      review starts
                      here.
                    </h3>

                    <p
                      className="
                        mt-3
                        max-w-xl
                        text-sm
                        leading-7
                        text-muted
                      "
                    >
                      If we&apos;ve
                      worked together,
                      you can submit
                      your experience.
                      Reviews are not
                      published
                      automatically.
                    </p>
                  </div>

                  <ReviewButton
                    onClick={() =>
                      setFormOpen(
                        true
                      )
                    }
                  />
                </div>
              ) : (
                <div>
                  <div className="grid gap-4">
                    {reviews.map(
                      (
                        review
                      ) => (
                        <ReviewCard
                          key={
                            review.id
                          }
                          review={
                            review
                          }
                        />
                      )
                    )}
                  </div>

                  <div className="mt-5">
                    <ReviewButton
                      onClick={() =>
                        setFormOpen(
                          true
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              className="
                relative
                mt-7
                flex
                items-center
                gap-2
                font-mono
                text-[8px]
                uppercase
                tracking-[0.13em]
                text-muted
              "
            >
              <Check
                size={12}
                className="text-success"
              />

              Reviews require approval
              before public display
            </div>
          </div>
        </div>
      </div>

      <ReviewFormPanel
        open={formOpen}
        onClose={() =>
          setFormOpen(false)
        }
      />
    </>
  );
}

function ReviewButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        inline-flex
        shrink-0
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
      Leave a Review

      <ArrowUpRight
        size={15}
        className="
          transition-transform
          duration-300
          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
        "
      />
    </button>
  );
}

function ReviewStatusCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        rounded-[1.5rem]
        border
        border-border
        bg-background/45
        p-6
      "
    >
      <p
        className="
          text-sm
          font-semibold
          text-foreground
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2
          text-xs
          leading-6
          text-muted
        "
      >
        {description}
      </p>
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: PublishedReview;
}) {
  const reviewerInfo = [
    review.role,
    review.company,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className="
        rounded-[1.5rem]
        border
        border-border
        bg-background/45
        p-6
      "
    >
      <div className="flex items-center justify-between gap-5">
        <div className="flex gap-1">
          {[
            1,
            2,
            3,
            4,
            5,
          ].map(
            (value) => (
              <Star
                key={value}
                size={14}
                className={
                  value <=
                  review.rating
                    ? "fill-primary text-primary"
                    : "text-border-strong"
                }
              />
            )
          )}
        </div>

        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.12em]
            text-muted
          "
        >
          {formatReviewDate(
            review.published_at
          )}
        </span>
      </div>

      <p
        className="
          mt-5
          text-sm
          leading-7
          text-foreground-secondary
        "
      >
        &ldquo;{review.review}&rdquo;
      </p>

      <div
        className="
          mt-5
          border-t
          border-border
          pt-4
        "
      >
        <p
          className="
            text-sm
            font-semibold
            text-foreground
          "
        >
          {review.name}
        </p>

        <p
          className="
            mt-1
            text-xs
            text-muted
          "
        >
          {reviewerInfo ||
            "Client"}
        </p>
      </div>
    </article>
  );
}

function formatReviewDate(
  value: string
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      month: "short",
      year: "numeric",
    }
  ).format(date);
}