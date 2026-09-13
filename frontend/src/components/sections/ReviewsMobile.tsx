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
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import ReviewFormPanel from "@/components/reviews/ReviewFormPanel";

import type {
  PublishedReview,
} from "@/lib/api/reviews";

type ReviewsMobileProps = {
  reviews: PublishedReview[];
  loading: boolean;
  error: string | null;
};

export default function ReviewsMobile({
  reviews,
  loading,
  error,
}: ReviewsMobileProps) {
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

    if (reducedMotion) {
      return;
    }

    const context =
      gsap.context(() => {
        gsap.from(
          ".mobile-reviews-reveal",
          {
            opacity: 0,
            y: 40,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                section,

              start:
                "top 84%",

              toggleActions:
                "play none none reverse",
            },
          }
        );
      }, section);

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
          py-24
        "
      >
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.12]" />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-16
            h-80
            w-80
            rounded-full
            bg-secondary/7
            blur-[120px]
          "
        />

        <div className="container-custom relative z-10">
          <div className="mobile-reviews-reveal flex items-center gap-2">
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
              Client Signal
            </span>
          </div>

          <h2
            className="
              mobile-reviews-reveal
              mt-5
              text-[2.55rem]
              font-bold
              leading-[0.98]
              tracking-[-0.05em]
              text-foreground
            "
          >
            Feedback should be

            <span className="block text-gradient">
              earned.
            </span>
          </h2>

          <p
            className="
              mobile-reviews-reveal
              mt-5
              text-sm
              leading-7
              text-muted
            "
          >
            Only real client
            feedback will be shown.
            Reviews require consent
            and approval before
            publication.
          </p>

          <div
            className="
              mobile-reviews-reveal
              mt-9
              overflow-hidden
              rounded-[1.7rem]
              border
              border-border
              bg-surface/35
              p-5
              backdrop-blur-xl
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
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
                  size={18}
                />
              </div>

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-muted
                "
              >
                published
              </span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span
                className="
                  text-6xl
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
                  mb-1
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.13em]
                  text-muted
                "
              >
                verified reviews
              </span>
            </div>

            {loading ? (
              <MobileStatus
                title="Loading reviews..."
                description="Checking the published review channel."
              />
            ) : error ? (
              <MobileStatus
                title="Reviews temporarily unavailable."
                description={
                  error
                }
              />
            ) : reviews.length ===
              0 ? (
              <div
                className="
                  mt-7
                  border-t
                  border-border
                  pt-6
                "
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={14}
                    className="text-primary"
                  />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.14em]
                      text-primary
                    "
                  >
                    Genuine feedback only
                  </span>
                </div>

                <h3
                  className="
                    mt-3
                    text-xl
                    font-bold
                    tracking-[-0.03em]
                    text-foreground
                  "
                >
                  No fake testimonials
                  to fill the space.
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-muted
                  "
                >
                  If we&apos;ve worked
                  together, you can
                  submit your
                  experience for
                  review.
                </p>

                <ReviewButton
                  onClick={() =>
                    setFormOpen(
                      true
                    )
                  }
                />
              </div>
            ) : (
              <div
                className="
                  mt-7
                  border-t
                  border-border
                  pt-6
                "
              >
                <div className="grid gap-4">
                  {reviews.map(
                    (
                      review
                    ) => (
                      <MobileReviewCard
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

                <ReviewButton
                  onClick={() =>
                    setFormOpen(
                      true
                    )
                  }
                />
              </div>
            )}
          </div>

          <div
            className="
              mobile-reviews-reveal
              mt-5
              grid
              grid-cols-4
              gap-1
            "
          >
            {[
              "Submit",
              "Consent",
              "Approve",
              "Publish",
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={item}
                  className="
                    border-t
                    border-border
                    pt-3
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[7px]
                      text-primary
                    "
                  >
                    0
                    {index +
                      1}
                  </span>

                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-medium
                      text-foreground-secondary
                    "
                  >
                    {item}
                  </p>
                </div>
              )
            )}
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
        mt-6
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
      Leave a Review

      <ArrowUpRight
        size={14}
      />
    </button>
  );
}

function MobileStatus({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        mt-7
        border-t
        border-border
        pt-6
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

function MobileReviewCard({
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
        rounded-[1.3rem]
        border
        border-border
        bg-background/45
        p-4
      "
    >
      <div className="flex items-center justify-between gap-3">
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
                size={12}
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
            tracking-[0.11em]
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
          mt-4
          text-sm
          leading-7
          text-foreground-secondary
        "
      >
        &ldquo;{review.review}&rdquo;
      </p>

      <div
        className="
          mt-4
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