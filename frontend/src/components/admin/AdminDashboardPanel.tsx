"use client";

import type {
  ReactNode,
} from "react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  FolderKanban,
  LoaderCircle,
  Mail,
  MessageSquareQuote,
  MessageSquareText,
  RefreshCw,
  Send,
  Star,
} from "lucide-react";

import Link from "next/link";

/* =========================================================
   TYPES
========================================================= */

type ProjectStatus =
  | "pending"
  | "contacted"
  | "in-progress"
  | "completed"
  | "rejected";

type ReviewStatus =
  | "pending"
  | "approved"
  | "rejected";

type MessageStatus =
  | "unread"
  | "read"
  | "replied"
  | "archived";

type RecentProjectRequest = {
  id: number;

  project_name: string;

  project_type: string;

  name: string;

  email: string;

  status:
    ProjectStatus;

  created_at: string;
};

type RecentReview = {
  id: number;

  name: string;

  email: string;

  rating: number;

  review: string;

  status:
    ReviewStatus;

  permission_to_publish:
    boolean;

  published_at:
    | string
    | null;

  created_at: string;
};

type RecentMessage = {
  id: number;

  name: string;

  email: string;

  subject:
    | string
    | null;

  message: string;

  status:
    MessageStatus;

  read_at:
    | string
    | null;

  replied_at:
    | string
    | null;

  archived_at:
    | string
    | null;

  created_at: string;
};

type DashboardData = {
  counts: {
    total_project_requests:
      number;

    pending_project_requests:
      number;

    in_progress_project_requests:
      number;

    total_reviews:
      number;

    pending_reviews:
      number;

    published_reviews:
      number;

    total_messages:
      number;

    unread_messages:
      number;
  };

  recent_project_requests:
    RecentProjectRequest[];

  recent_reviews:
    RecentReview[];

  recent_messages:
    RecentMessage[];
};

type DashboardResponse = {
  success: boolean;

  message?: string;

  data: DashboardData;
};

/* =========================================================
   DASHBOARD
========================================================= */

export default function AdminDashboardPanel() {
  const [
    data,
    setData,
  ] =
    useState<DashboardData | null>(
      null
    );

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

  /* =========================================================
     LOAD
  ========================================================= */

  const loadDashboard =
    useCallback(async () => {
      setLoading(true);

      setError(null);

      try {
        const response =
          await fetch(
            "/api/admin/dashboard",
            {
              method:
                "GET",

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
          !contentType?.includes(
            "application/json"
          )
        ) {
          throw new Error(
            "The dashboard returned an unexpected response."
          );
        }

        const result =
          (await response.json()) as DashboardResponse;

        if (
          !response.ok ||
          !result.success ||
          !result.data
        ) {
          throw new Error(
            result.message ??
              "Unable to load dashboard."
          );
        }

        setData(
          result.data
        );
      } catch (
        error
      ) {
        setError(
          error instanceof
            Error
            ? error.message
            : "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadDashboard();
  }, [
    loadDashboard,
  ]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[420px]
          items-center
          justify-center
          rounded-[1.7rem]
          border
          border-border
          bg-surface/30
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
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (
    error ||
    !data
  ) {
    return (
      <div
        className="
          flex
          min-h-[360px]
          items-center
          justify-center
          rounded-[1.7rem]
          border
          border-border
          bg-surface/30
          px-6
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
            Dashboard data could
            not be loaded.
          </p>

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-muted
            "
          >
            {error ??
              "Please try again."}
          </p>

          <button
            type="button"
            onClick={() =>
              void loadDashboard()
            }
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-primary/25
              bg-primary/5
              px-4
              py-2.5
              text-xs
              font-medium
              text-primary
              transition-colors
              hover:bg-primary/10
            "
          >
            <RefreshCw
              size={13}
            />

            Try Again
          </button>
        </div>
      </div>
    );
  }

  const {
    counts,
    recent_project_requests,
    recent_reviews,
    recent_messages,
  } = data;

  const attentionCount =
    counts.pending_project_requests +
    counts.pending_reviews +
    counts.unread_messages;

  return (
    <div>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-end
          sm:justify-between
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
            Portfolio Control
          </p>

          <h1
            className="
              mt-3
              text-3xl
              font-bold
              tracking-[-0.045em]
              text-foreground
              sm:text-4xl
            "
          >
            Dashboard
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-7
              text-muted
            "
          >
            Monitor incoming work,
            project activity,
            portfolio messages and
            client feedback from
            one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            void loadDashboard()
          }
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-xl
            border
            border-border
            bg-surface/40
            px-4
            py-2.5
            text-xs
            font-medium
            text-muted
            transition-all
            hover:border-primary/30
            hover:text-primary
          "
        >
          <RefreshCw
            size={14}
          />

          Refresh
        </button>
      </div>

      {/* =====================================================
          NEEDS ATTENTION
      ===================================================== */}

      {attentionCount >
        0 && (
        <div
          className="
            mt-8
            flex
            flex-col
            gap-4
            rounded-[1.4rem]
            border
            border-primary/20
            bg-primary/5
            p-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-primary/20
                bg-primary/10
                text-primary
              "
            >
              <Clock3
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
                {
                  attentionCount
                }{" "}
                {attentionCount ===
                1
                  ? "item"
                  : "items"}{" "}
                need attention
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-muted
                "
              >
                {
                  counts.pending_project_requests
                }{" "}
                pending project
                requests ·{" "}
                {
                  counts.pending_reviews
                }{" "}
                pending reviews ·{" "}
                {
                  counts.unread_messages
                }{" "}
                unread messages
              </p>
            </div>
          </div>

          {counts.unread_messages >
            0 && (
            <Link
              href="/admin/messages"
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-xl
                border
                border-primary/20
                bg-background/50
                px-4
                py-2.5
                text-xs
                font-medium
                text-primary
                transition-colors
                hover:bg-primary/10
              "
            >
              Open Inbox

              <ArrowRight
                size={13}
              />
            </Link>
          )}
        </div>
      )}

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div
        className="
          mt-8
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          icon={
            <FolderKanban
              size={18}
            />
          }
          value={
            counts.total_project_requests
          }
          label="Total Requests"
          description="All project briefs received"
        />

        <StatCard
          icon={
            <Clock3
              size={18}
            />
          }
          value={
            counts.pending_project_requests
          }
          label="Pending Requests"
          description="Waiting for initial action"
        />

        <StatCard
          icon={
            <Send
              size={18}
            />
          }
          value={
            counts.in_progress_project_requests
          }
          label="In Progress"
          description="Active project workflows"
        />

        <StatCard
          icon={
            <MessageSquareQuote
              size={18}
            />
          }
          value={
            counts.total_reviews
          }
          label="Total Reviews"
          description="All submitted feedback"
        />

        <StatCard
          icon={
            <Clock3
              size={18}
            />
          }
          value={
            counts.pending_reviews
          }
          label="Pending Reviews"
          description="Waiting for moderation"
        />

        <StatCard
          icon={
            <CheckCircle2
              size={18}
            />
          }
          value={
            counts.published_reviews
          }
          label="Published Reviews"
          description="Visible on the portfolio"
        />

        <StatCard
          icon={
            <MessageSquareText
              size={18}
            />
          }
          value={
            counts.total_messages
          }
          label="Total Messages"
          description="Portfolio inbox messages"
        />

        <StatCard
          icon={
            <Mail
              size={18}
            />
          }
          value={
            counts.unread_messages
          }
          label="Unread Messages"
          description="Waiting to be reviewed"
          href="/admin/messages"
        />
      </div>

      {/* =====================================================
          RECENT ACTIVITY
      ===================================================== */}

      <div
        className="
          mt-8
          grid
          gap-6
          xl:grid-cols-3
        "
      >
        {/* =================================================
            PROJECT REQUESTS
        ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-[1.7rem]
            border
            border-border
            bg-surface/35
          "
        >
          <SectionHeader
            title="Recent Project Requests"
            description="Latest incoming client briefs"
            href="/admin/project-requests"
          />

          {recent_project_requests.length ===
          0 ? (
            <EmptyState
              icon={
                <FileText
                  size={20}
                />
              }
              text="No project requests yet."
            />
          ) : (
            <div className="divide-y divide-border">
              {recent_project_requests.map(
                (
                  request
                ) => (
                  <Link
                    key={
                      request.id
                    }
                    href="/admin/project-requests"
                    className="
                      block
                      px-5
                      py-5
                      transition-colors
                      hover:bg-background/40
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div
                        className="
                          min-w-0
                        "
                      >
                        <p
                          className="
                            truncate
                            text-sm
                            font-semibold
                            text-foreground
                          "
                        >
                          {
                            request.project_name
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
                            request.name
                          }
                        </p>
                      </div>

                      <ProjectStatusBadge
                        status={
                          request.status
                        }
                      />
                    </div>

                    <ActivityDate
                      value={
                        request.created_at
                      }
                    />
                  </Link>
                )
              )}
            </div>
          )}
        </section>

        {/* =================================================
            REVIEWS
        ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-[1.7rem]
            border
            border-border
            bg-surface/35
          "
        >
          <SectionHeader
            title="Recent Reviews"
            description="Latest client feedback"
            href="/admin/reviews"
          />

          {recent_reviews.length ===
          0 ? (
            <EmptyState
              icon={
                <MessageSquareQuote
                  size={20}
                />
              }
              text="No reviews yet."
            />
          ) : (
            <div className="divide-y divide-border">
              {recent_reviews.map(
                (
                  review
                ) => (
                  <Link
                    key={
                      review.id
                    }
                    href="/admin/reviews"
                    className="
                      block
                      px-5
                      py-5
                      transition-colors
                      hover:bg-background/40
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div
                        className="
                          min-w-0
                        "
                      >
                        <p
                          className="
                            truncate
                            text-sm
                            font-semibold
                            text-foreground
                          "
                        >
                          {
                            review.name
                          }
                        </p>

                        <div
                          className="
                            mt-2
                            flex
                            gap-0.5
                          "
                        >
                          {[
                            1,
                            2,
                            3,
                            4,
                            5,
                          ].map(
                            (
                              value
                            ) => (
                              <Star
                                key={
                                  value
                                }
                                size={
                                  11
                                }
                                className={
                                  value <=
                                  review.rating
                                    ? "fill-primary text-primary"
                                    : "text-border"
                                }
                              />
                            )
                          )}
                        </div>
                      </div>

                      <ReviewStatusBadge
                        review={
                          review
                        }
                      />
                    </div>

                    <p
                      className="
                        mt-3
                        line-clamp-2
                        text-xs
                        leading-5
                        text-muted
                      "
                    >
                      {
                        review.review
                      }
                    </p>
                  </Link>
                )
              )}
            </div>
          )}
        </section>

        {/* =================================================
            MESSAGES
        ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-[1.7rem]
            border
            border-border
            bg-surface/35
          "
        >
          <SectionHeader
            title="Recent Messages"
            description="Latest portfolio enquiries"
            href="/admin/messages"
          />

          {recent_messages.length ===
          0 ? (
            <EmptyState
              icon={
                <MessageSquareText
                  size={20}
                />
              }
              text="No messages yet."
            />
          ) : (
            <div className="divide-y divide-border">
              {recent_messages.map(
                (
                  message
                ) => (
                  <Link
                    key={
                      message.id
                    }
                    href="/admin/messages"
                    className="
                      block
                      px-5
                      py-5
                      transition-colors
                      hover:bg-background/40
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div
                        className="
                          min-w-0
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          {message.status ===
                          "unread" && (
                            <span
                              className="
                                h-2
                                w-2
                                shrink-0
                                rounded-full
                                bg-primary
                                shadow-[0_0_8px_var(--primary-glow)]
                              "
                            />
                          )}

                          <p
                            className={`
                              truncate
                              text-sm
                              text-foreground

                              ${
                                message.status ===
                                "unread"
                                  ? "font-bold"
                                  : "font-semibold"
                              }
                            `}
                          >
                            {
                              message.name
                            }
                          </p>
                        </div>

                        <p
                          className="
                            mt-1
                            truncate
                            text-xs
                            text-muted
                          "
                        >
                          {message.subject ??
                            "No subject"}
                        </p>
                      </div>

                      <MessageStatusBadge
                        status={
                          message.status
                        }
                      />
                    </div>

                    <p
                      className="
                        mt-3
                        line-clamp-2
                        text-xs
                        leading-5
                        text-muted
                      "
                    >
                      {
                        message.message
                      }
                    </p>

                    <ActivityDate
                      value={
                        message.created_at
                      }
                    />
                  </Link>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
  description,
  href,
}: {
  icon: ReactNode;

  value: number;

  label: string;

  description: string;

  href?: string;
}) {
  const content = (
    <>
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
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
          {icon}
        </div>

        <span
          className="
            text-4xl
            font-black
            tracking-[-0.06em]
            text-foreground
          "
        >
          {value
            .toString()
            .padStart(
              2,
              "0"
            )}
        </span>
      </div>

      <p
        className="
          mt-6
          text-sm
          font-semibold
          text-foreground
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-xs
          leading-5
          text-muted
        "
      >
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <Link
        href={
          href
        }
        className="
          rounded-[1.5rem]
          border
          border-border
          bg-surface/35
          p-6
          transition-all
          hover:-translate-y-0.5
          hover:border-primary/30
          hover:bg-surface/50
        "
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className="
        rounded-[1.5rem]
        border
        border-border
        bg-surface/35
        p-6
      "
    >
      {content}
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  description,
  href,
}: {
  title: string;

  description: string;

  href: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        border-b
        border-border
        px-5
        py-5
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
          {title}
        </p>

        <p
          className="
            mt-1
            text-xs
            text-muted
          "
        >
          {description}
        </p>
      </div>

      <Link
        href={
          href
        }
        className="
          inline-flex
          shrink-0
          items-center
          gap-1.5
          text-xs
          font-medium
          text-primary
        "
      >
        View All

        <ArrowRight
          size={13}
        />
      </Link>
    </div>
  );
}

/* =========================================================
   PROJECT STATUS
========================================================= */

function ProjectStatusBadge({
  status,
}: {
  status:
    ProjectStatus;
}) {
  const labels:
    Record<
      ProjectStatus,
      string
    > = {
    pending:
      "Pending",

    contacted:
      "Contacted",

    "in-progress":
      "In Progress",

    completed:
      "Completed",

    rejected:
      "Rejected",
  };

  return (
    <Badge>
      {labels[status]}
    </Badge>
  );
}

/* =========================================================
   REVIEW STATUS
========================================================= */

function ReviewStatusBadge({
  review,
}: {
  review:
    RecentReview;
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
    <Badge>
      {label}
    </Badge>
  );
}

/* =========================================================
   MESSAGE STATUS
========================================================= */

function MessageStatusBadge({
  status,
}: {
  status:
    MessageStatus;
}) {
  return (
    <Badge>
      {status}
    </Badge>
  );
}

/* =========================================================
   BADGE
========================================================= */

function Badge({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <span
      className="
        inline-flex
        w-fit
        shrink-0
        rounded-full
        border
        border-border
        bg-background/60
        px-2.5
        py-1.5
        font-mono
        text-[7px]
        uppercase
        tracking-[0.1em]
        text-muted
      "
    >
      {children}
    </span>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
  icon,
  text,
}: {
  icon: ReactNode;

  text: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[220px]
        flex-col
        items-center
        justify-center
        px-6
        text-center
        text-muted
      "
    >
      {icon}

      <p
        className="
          mt-4
          text-xs
        "
      >
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   ACTIVITY DATE
========================================================= */

function ActivityDate({
  value,
}: {
  value: string;
}) {
  return (
    <p
      className="
        mt-3
        font-mono
        text-[7px]
        uppercase
        tracking-[0.11em]
        text-muted
      "
    >
      {formatDate(
        value
      )}
    </p>
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