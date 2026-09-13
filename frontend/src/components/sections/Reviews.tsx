"use client";

import {
  useEffect,
  useState,
} from "react";

import ReviewsDesktop from "./ReviewsDesktop";
import ReviewsMobile from "./ReviewsMobile";

import {
  getPublishedReviews,
  type PublishedReview,
} from "@/lib/api/reviews";

export default function Reviews() {
  const [
    reviews,
    setReviews,
  ] =
    useState<
      PublishedReview[]
    >([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      setLoading(true);

      setError(null);

      try {
        const result =
          await getPublishedReviews();

        if (!active) {
          return;
        }

        setReviews(result);
      } catch {
        if (!active) {
          return;
        }

        setError(
          "Client reviews are temporarily unavailable."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadReviews();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="reviews"
      className="
        relative
        overflow-hidden
        border-t
        border-border/50
        bg-background
      "
    >
      <div className="hidden lg:block">
        <ReviewsDesktop
          reviews={reviews}
          loading={loading}
          error={error}
        />
      </div>

      <div className="lg:hidden">
        <ReviewsMobile
          reviews={reviews}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
}