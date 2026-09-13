"use client";

import type {
  ReactNode,
} from "react";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Check,
  CheckCircle2,
  EyeOff,
  LoaderCircle,
  Mail,
  MessageSquareQuote,
  RotateCcw,
  ShieldCheck,
  Star,
  User,
  X,
  XCircle,
} from "lucide-react";

type ReviewStatus =
  | "pending"
  | "approved"
  | "rejected";

type ReviewAction =
  | "approve"
  | "reject"
  | "unpublish"
  | "reset";

type AdminReview = {
  id: number;

  name: string;
  email: string;

  company: string | null;
  role: string | null;

  rating: number;

  review: string;

  permission_to_publish: boolean;

  status: ReviewStatus;

  published_at: string | null;

  created_at: string;
  updated_at: string;
};

type PaginatedResponse = {
  success: boolean;

  data: {
    data: AdminReview[];
  };
};

type ModerateResponse = {
  success: boolean;

  message?: string;

  data: {
    review: AdminReview;
  };
};

type Filter =
  | "all"
  | ReviewStatus;

const filters: {
  value: Filter;
  label: string;
}[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "approved",
    label: "Approved",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

export default function ReviewsAdminPanel() {
  const [
    reviews,
    setReviews,
  ] =
    useState<
      AdminReview[]
    >([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /*
   * IMPORTANT:
   *
   * Loading errors and moderation errors
   * are deliberately separate.
   */
  const [
    loadError,
    setLoadError,
  ] =
    useState<string | null>(
      null
    );

  const [
    actionError,
    setActionError,
  ] =
    useState<string | null>(
      null
    );

  const [
    actionMessage,
    setActionMessage,
  ] =
    useState<string | null>(
      null
    );

  const [
    filter,
    setFilter,
  ] =
    useState<Filter>(
      "all"
    );

  const [
    selected,
    setSelected,
  ] =
    useState<AdminReview | null>(
      null
    );

  const [
    updatingId,
    setUpdatingId,
  ] =
    useState<number | null>(
      null
    );

  /* =========================================================
     LOAD REVIEWS
  ========================================================= */

  const loadReviews =
    useCallback(async () => {
      setLoading(true);

      setLoadError(null);

      try {
        const response =
          await fetch(
            "/api/admin/reviews",
            {
              method: "GET",

              headers: {
                Accept:
                  "application/json",
              },

              cache:
                "no-store",
            }
          );

        const contentType =
          response.headers.get(
            "content-type"
          );

        if (
          !response.ok ||
          !contentType?.includes(
            "application/json"
          )
        ) {
          throw new Error(
            "Unable to load reviews."
          );
        }

        const result =
          (await response.json()) as PaginatedResponse;

        if (
          !result.success ||
          !result.data ||
          !Array.isArray(
            result.data.data
          )
        ) {
          throw new Error(
            "Invalid reviews response."
          );
        }

        setReviews(
          result.data.data
        );
      } catch {
        setLoadError(
          "Reviews could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  /* =========================================================
     FILTERING
  ========================================================= */

  const filteredReviews =
    useMemo(() => {
      if (
        filter === "all"
      ) {
        return reviews;
      }

      return reviews.filter(
        (review) =>
          review.status ===
          filter
      );
    }, [
      reviews,
      filter,
    ]);

  /* =========================================================
     MODERATION
  ========================================================= */

  async function moderateReview(
    reviewId: number,
    action: ReviewAction
  ) {
    if (
      updatingId !== null
    ) {
      return;
    }

    setUpdatingId(
      reviewId
    );

    /*
     * Clear only moderation messages.
     * Never touch loadError here.
     */
    setActionError(null);
    setActionMessage(null);

    try {
      const response =
        await fetch(
          `/api/admin/reviews/${reviewId}/moderate`,
          {
            method: "PATCH",

            headers: {
              Accept:
                "application/json",

              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                action,
              }),
          }
        );

      const contentType =
        response.headers.get(
          "content-type"
        );

      if (
        !contentType?.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "The server returned an unexpected response."
        );
      }

      const result =
        (await response.json()) as ModerateResponse;

      if (
        !response.ok
      ) {
        throw new Error(
          result.message ??
            "Unable to update the review."
        );
      }

      const updated =
        result?.data
          ?.review;

      if (!updated) {
        throw new Error(
          "Updated review data was not returned."
        );
      }

      /*
       * Update the review locally.
       *
       * No full reload is required.
       */
      setReviews(
        (current) =>
          current.map(
            (review) =>
              review.id ===
              updated.id
                ? updated
                : review
          )
      );

      /*
       * Keep the details panel synchronized.
       */
      setSelected(
        (current) =>
          current?.id ===
          updated.id
            ? updated
            : current
      );

      setActionMessage(
        result.message ??
          "Review updated successfully."
      );
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "The review could not be updated."
      );
    } finally {
      setUpdatingId(
        null
      );
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[380px]
          items-center
          justify-center
          rounded-[1.7rem]
          border
          border-border
          bg-surface/35
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            gap-3
          "
        >
          <LoaderCircle
            size={22}
            className="
              animate-spin
              text-primary
            "
          />

          <p
            className="
              text-xs
              text-muted
            "
          >
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <>
      <div
        className="
          overflow-hidden
          rounded-[1.7rem]
          border
          border-border
          bg-surface/35
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            gap-5
            border-b
            border-border
            px-6
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-sm
                font-semibold
                text-foreground
              "
            >
              Client Reviews
            </p>

            <p
              className="
                mt-1
                text-xs
                text-muted
              "
            >
              {loadError
                ? "Review data unavailable"
                : `${reviews.length} ${
                    reviews.length ===
                    1
                      ? "review"
                      : "reviews"
                  }`}
            </p>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {filters.map(
              (item) => (
                <button
                  key={
                    item.value
                  }
                  type="button"
                  onClick={() =>
                    setFilter(
                      item.value
                    )
                  }
                  className={`
                    rounded-lg
                    border
                    px-3
                    py-2
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    transition-all

                    ${
                      filter ===
                      item.value
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-background/50 text-muted hover:text-foreground"
                    }
                  `}
                >
                  {
                    item.label
                  }
                </button>
              )
            )}

            <button
              type="button"
              onClick={() =>
                void loadReviews()
              }
              className="
                rounded-lg
                border
                border-border
                bg-background/50
                px-3
                py-2
                font-mono
                text-[8px]
                uppercase
                tracking-[0.12em]
                text-muted
                transition-all
                hover:border-primary/30
                hover:text-primary
              "
            >
              Refresh
            </button>
          </div>
        </div>

        {/* LOAD ERROR */}

        {loadError ? (
          <div
            className="
              flex
              min-h-[260px]
              items-center
              justify-center
              px-6
              py-16
              text-center
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-foreground
                "
              >
                Reviews could not
                be loaded.
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  text-muted
                "
              >
                Your stored reviews
                have not been
                removed.
              </p>

              <button
                type="button"
                onClick={() =>
                  void loadReviews()
                }
                className="
                  mt-5
                  rounded-xl
                  border
                  border-primary/25
                  bg-primary/5
                  px-4
                  py-2.5
                  text-xs
                  font-medium
                  text-primary
                "
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredReviews.length ===
          0 ? (
          /* EMPTY FILTER */

          <div
            className="
              flex
              min-h-[260px]
              items-center
              justify-center
              px-6
              py-16
              text-center
            "
          >
            <div>
              <MessageSquareQuote
                size={22}
                className="
                  mx-auto
                  text-muted
                "
              />

              <p
                className="
                  mt-4
                  text-sm
                  font-medium
                  text-foreground-secondary
                "
              >
                No reviews in this
                category.
              </p>
            </div>
          </div>
        ) : (
          /* REVIEWS */

          <div className="divide-y divide-border">
            {filteredReviews.map(
              (review) => (
                <button
                  key={
                    review.id
                  }
                  type="button"
                  onClick={() => {
                    setSelected(
                      review
                    );

                    setActionError(
                      null
                    );

                    setActionMessage(
                      null
                    );
                  }}
                  className="
                    grid
                    w-full
                    gap-4
                    px-6
                    py-5
                    text-left
                    transition-colors
                    hover:bg-background/40
                    md:grid-cols-[0.9fr_1.4fr_0.5fr_auto]
                    md:items-center
                  "
                >
                  <div>
                    <p
                      className="
                        font-semibold
                        text-foreground
                      "
                    >
                      {
                        review.name
                      }
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        text-xs
                        text-muted
                      "
                    >
                      {
                        review.email
                      }
                    </p>
                  </div>

                  <p
                    className="
                      line-clamp-2
                      text-sm
                      leading-6
                      text-foreground-secondary
                    "
                  >
                    {
                      review.review
                    }
                  </p>

                  <StatusBadge
                    review={
                      review
                    }
                  />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.12em]
                      text-muted
                    "
                  >
                    View
                  </span>
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          REVIEW DETAILS
      ===================================================== */}

      {selected && (
        <>
          <button
            type="button"
            aria-label="Close review details"
            onClick={() => {
              setSelected(null);

              setActionError(null);

              setActionMessage(null);
            }}
            className="
              fixed
              inset-0
              z-[70]
              bg-black/60
              backdrop-blur-sm
            "
          />

          <aside
            className="
              fixed
              bottom-0
              right-0
              top-0
              z-[80]
              w-full
              max-w-[620px]
              overflow-y-auto
              border-l
              border-border
              bg-background
              p-6
              shadow-2xl
              sm:p-8
            "
          >
            {/* HEADER */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-5
              "
            >
              <div>
                <p
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.16em]
                    text-primary
                  "
                >
                  Review #
                  {
                    selected.id
                  }
                </p>

                <h2
                  className="
                    mt-3
                    text-2xl
                    font-bold
                    tracking-[-0.04em]
                    text-foreground
                  "
                >
                  {
                    selected.name
                  }
                </h2>

                <div className="mt-3">
                  <StatusBadge
                    review={
                      selected
                    }
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelected(
                    null
                  );

                  setActionError(
                    null
                  );

                  setActionMessage(
                    null
                  );
                }}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-border
                  bg-surface/40
                  text-muted
                  transition-colors
                  hover:border-primary/30
                  hover:text-primary
                "
              >
                <X
                  size={17}
                />
              </button>
            </div>

            {/* INFO */}

            <div
              className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              <InfoCard
                icon={
                  <User
                    size={15}
                  />
                }
                label="Client"
                value={
                  selected.name
                }
              />

              <InfoCard
                icon={
                  <Mail
                    size={15}
                  />
                }
                label="Email"
                value={
                  selected.email
                }
              />

              <InfoCard
                icon={
                  <ShieldCheck
                    size={15}
                  />
                }
                label="Public Consent"
                value={
                  selected.permission_to_publish
                    ? "Granted"
                    : "Not granted"
                }
              />

              <InfoCard
                icon={
                  <MessageSquareQuote
                    size={15}
                  />
                }
                label="Published"
                value={
                  selected.published_at
                    ? formatDate(
                        selected.published_at
                      )
                    : "Not published"
                }
              />
            </div>

            {/* REVIEW */}

            <section
              className="
                mt-8
                rounded-[1.4rem]
                border
                border-border
                bg-surface/35
                p-5
              "
            >
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
                      key={
                        value
                      }
                      size={16}
                      className={
                        value <=
                        selected.rating
                          ? "fill-primary text-primary"
                          : "text-border-strong"
                      }
                    />
                  )
                )}
              </div>

              <p
                className="
                  mt-5
                  whitespace-pre-wrap
                  text-sm
                  leading-7
                  text-foreground-secondary
                "
              >
                &ldquo;
                {
                  selected.review
                }
                &rdquo;
              </p>
            </section>

            {/* REVIEWER */}

            <section
              className="
                mt-5
                rounded-[1.4rem]
                border
                border-border
                bg-surface/35
                p-5
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  text-foreground
                "
              >
                Reviewer Details
              </p>

              <div
                className="
                  mt-5
                  grid
                  gap-5
                "
              >
                <DetailRow
                  label="Role"
                  value={
                    selected.role ??
                    "Not specified"
                  }
                />

                <DetailRow
                  label="Company"
                  value={
                    selected.company ??
                    "Not specified"
                  }
                />

                <DetailRow
                  label="Submitted"
                  value={formatDate(
                    selected.created_at
                  )}
                />
              </div>
            </section>

            {/* MODERATION */}

            <section
              className="
                mt-5
                rounded-[1.4rem]
                border
                border-border
                bg-surface/35
                p-5
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  text-foreground
                "
              >
                Moderation
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-muted
                "
              >
                Public display
                requires both client
                consent and admin
                approval.
              </p>

              {/* ACTION ERROR */}

              {actionError && (
                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/5
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      leading-5
                      text-red-300
                    "
                  >
                    {
                      actionError
                    }
                  </p>
                </div>
              )}

              {/* ACTION SUCCESS */}

              {actionMessage && (
                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-success/20
                    bg-success/5
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      leading-5
                      text-success
                    "
                  >
                    {
                      actionMessage
                    }
                  </p>
                </div>
              )}

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {selected.status !==
                  "approved" && (
                  <ActionButton
                    label="Approve"
                    icon={
                      <CheckCircle2
                        size={14}
                      />
                    }
                    disabled={
                      updatingId ===
                      selected.id
                    }
                    onClick={() =>
                      void moderateReview(
                        selected.id,
                        "approve"
                      )
                    }
                  />
                )}

                {selected.status !==
                  "rejected" && (
                  <ActionButton
                    label="Reject"
                    icon={
                      <XCircle
                        size={14}
                      />
                    }
                    disabled={
                      updatingId ===
                      selected.id
                    }
                    onClick={() =>
                      void moderateReview(
                        selected.id,
                        "reject"
                      )
                    }
                  />
                )}

                {selected.status ===
                  "approved" &&
                  selected.published_at && (
                    <ActionButton
                      label="Unpublish"
                      icon={
                        <EyeOff
                          size={14}
                        />
                      }
                      disabled={
                        updatingId ===
                        selected.id
                      }
                      onClick={() =>
                        void moderateReview(
                          selected.id,
                          "unpublish"
                        )
                      }
                    />
                  )}

                {selected.status ===
                  "approved" &&
                  !selected.published_at &&
                  selected.permission_to_publish && (
                    <ActionButton
                      label="Publish Again"
                      icon={
                        <Check
                          size={14}
                        />
                      }
                      disabled={
                        updatingId ===
                        selected.id
                      }
                      onClick={() =>
                        void moderateReview(
                          selected.id,
                          "approve"
                        )
                      }
                    />
                  )}

                {selected.status !==
                  "pending" && (
                  <ActionButton
                    label="Reset to Pending"
                    icon={
                      <RotateCcw
                        size={14}
                      />
                    }
                    disabled={
                      updatingId ===
                      selected.id
                    }
                    onClick={() =>
                      void moderateReview(
                        selected.id,
                        "reset"
                      )
                    }
                  )}
              </div>

              {updatingId ===
                selected.id && (
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-muted
                  "
                >
                  <LoaderCircle
                    size={13}
                    className="animate-spin"
                  />

                  Updating review...
                </div>
              )}

              {!selected
                .permission_to_publish && (
                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-border
                    bg-background/50
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      leading-5
                      text-muted
                    "
                  >
                    This client did
                    not grant public
                    display consent.
                    The review may be
                    approved
                    internally, but
                    it cannot be
                    published
                    publicly.
                  </p>
                </div>
              )}
            </section>
          </aside>
        </>
      )}
    </>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  review,
}: {
  review: AdminReview;
}) {
  const label =
    review.status ===
    "pending"
      ? "Pending"
      : review.status ===
          "rejected"
        ? "Rejected"
        : review.published_at
          ? "Published"
          : "Approved";

  return (
    <span
      className="
        inline-flex
        w-fit
        rounded-full
        border
        border-border
        bg-background/60
        px-3
        py-1.5
        font-mono
        text-[8px]
        uppercase
        tracking-[0.12em]
        text-muted
      "
    >
      {label}
    </span>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-border
        bg-surface/35
        p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-primary
        "
      >
        {icon}

        <span
          className="
            font-mono
            text-[8px]
            uppercase
            tracking-[0.13em]
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-3
          break-words
          text-sm
          font-medium
          text-foreground
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="
          font-mono
          text-[8px]
          uppercase
          tracking-[0.12em]
          text-muted
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5
          text-sm
          leading-6
          text-foreground-secondary
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-border
        bg-background/60
        px-4
        py-2.5
        text-xs
        font-medium
        text-foreground-secondary
        transition-all
        hover:border-primary/30
        hover:text-primary
        disabled:pointer-events-none
        disabled:opacity-50
      "
    >
      {icon}

      {label}
    </button>
  );
}

/* =========================================================
   DATE
========================================================= */

function formatDate(
  value: string
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      dateStyle:
        "medium",

      timeStyle:
        "short",
    }
  ).format(date);
}