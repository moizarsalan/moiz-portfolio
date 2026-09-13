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
  Calendar,
  ChevronRight,
  Clock3,
  ExternalLink,
  LoaderCircle,
  Mail,
  User,
  X,
} from "lucide-react";

type ProjectRequestStatus =
  | "pending"
  | "contacted"
  | "in-progress"
  | "completed"
  | "rejected";

type ProjectRequest = {
  id: number;

  project_type: string;

  project_name: string;

  project_description: string;

  features:
    | string[]
    | null;

  custom_feature:
    | string
    | null;

  pages:
    | string
    | null;

  has_existing_website:
    boolean;

  existing_website_url:
    | string
    | null;

  budget:
    | string
    | null;

  timeline:
    | string
    | null;

  name: string;

  email: string;

  company:
    | string
    | null;

  additional_notes:
    | string
    | null;

  status:
    ProjectRequestStatus;

  created_at: string;

  updated_at: string;
};

type PaginatedResponse = {
  success: boolean;

  data: {
    data: ProjectRequest[];
  };
};

type UpdateResponse = {
  success: boolean;

  message?: string;

  data: {
    project_request:
      ProjectRequest;
  };
};

const statusOptions: {
  value:
    ProjectRequestStatus;

  label: string;
}[] = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "contacted",
    label: "Contacted",
  },
  {
    value: "in-progress",
    label: "In Progress",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

export default function ProjectRequestsPanel() {
  const [
    requests,
    setRequests,
  ] =
    useState<
      ProjectRequest[]
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

  const [
    selected,
    setSelected,
  ] =
    useState<ProjectRequest | null>(
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
     LOAD PROJECT REQUESTS
  ========================================================= */

  const loadRequests =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const response =
          await fetch(
            "/api/admin/project-requests",
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
            "Unable to load project requests."
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
            "Unable to load project requests."
          );
        }

        setRequests(
          result.data.data
        );
      } catch {
        setRequests([]);

        setError(
          "Project requests could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  async function updateStatus(
    requestId: number,
    status:
      ProjectRequestStatus
  ) {
    setUpdatingId(
      requestId
    );

    setError(null);

    try {
      const response =
        await fetch(
          `/api/admin/project-requests/${requestId}/status`,
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
                status,
              }),
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
          "Unable to update status."
        );
      }

      const result =
        (await response.json()) as UpdateResponse;

      const updated =
        result?.data
          ?.project_request;

      if (!updated) {
        throw new Error(
          "Unable to update status."
        );
      }

      setRequests(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              updated.id
                ? updated
                : item
          )
      );

      setSelected(
        (current) =>
          current?.id ===
          updated.id
            ? updated
            : current
      );
    } catch {
      setError(
        "The request status could not be updated."
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
            Loading project
            requests...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     UI
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
            items-center
            justify-between
            gap-4
            border-b
            border-border
            px-6
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
              Incoming Requests
            </p>

            <p
              className="
                mt-1
                text-xs
                text-muted
              "
            >
              {error
                ? "Request data unavailable"
                : `${requests.length} ${
                    requests.length ===
                    1
                      ? "project request"
                      : "project requests"
                  }`}
            </p>
          </div>

          {!error && (
            <button
              type="button"
              onClick={() =>
                void loadRequests()
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
                transition-colors
                hover:border-primary/30
                hover:text-primary
              "
            >
              Refresh
            </button>
          )}
        </div>

        {/* ERROR STATE */}

        {error ? (
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
            <div
              className="
                max-w-sm
              "
            >
              <p
                className="
                  text-sm
                  font-semibold
                  text-foreground
                "
              >
                Project requests
                could not be loaded.
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  leading-6
                  text-muted
                "
              >
                The request data is
                temporarily
                unavailable. Your
                existing submissions
                have not been
                removed.
              </p>

              <button
                type="button"
                onClick={() =>
                  void loadRequests()
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
                  transition-colors
                  hover:bg-primary/10
                "
              >
                Try Again
              </button>
            </div>
          </div>
        ) : requests.length ===
          0 ? (
          /* EMPTY STATE */

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
                  font-medium
                  text-foreground-secondary
                "
              >
                No project requests
                yet.
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  text-muted
                "
              >
                New client briefs
                will appear here.
              </p>
            </div>
          </div>
        ) : (
          /* REQUEST LIST */

          <div className="divide-y divide-border">
            {requests.map(
              (request) => (
                <button
                  key={
                    request.id
                  }
                  type="button"
                  onClick={() =>
                    setSelected(
                      request
                    )
                  }
                  className="
                    grid
                    w-full
                    gap-4
                    px-6
                    py-5
                    text-left
                    transition-colors
                    hover:bg-background/40
                    md:grid-cols-[1.2fr_0.9fr_0.55fr_auto]
                    md:items-center
                  "
                >
                  {/* PROJECT */}

                  <div>
                    <p
                      className="
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
                        text-xs
                        text-muted
                      "
                    >
                      Request #
                      {
                        request.id
                      }{" "}
                      ·{" "}
                      {
                        request.project_type
                      }
                    </p>
                  </div>

                  {/* CLIENT */}

                  <div>
                    <p
                      className="
                        text-sm
                        text-foreground-secondary
                      "
                    >
                      {
                        request.name
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
                        request.email
                      }
                    </p>
                  </div>

                  {/* STATUS */}

                  <StatusBadge
                    status={
                      request.status
                    }
                  />

                  <ChevronRight
                    size={17}
                    className="text-muted"
                  />
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          REQUEST DETAILS PANEL
      ===================================================== */}

      {selected && (
        <>
          <button
            type="button"
            aria-label="Close request details"
            onClick={() =>
              setSelected(null)
            }
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
            {/* PANEL HEADER */}

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
                  Request #
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
                    selected.project_name
                  }
                </h2>

                <div className="mt-3">
                  <StatusBadge
                    status={
                      selected.status
                    }
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelected(
                    null
                  )
                }
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
                aria-label="Close"
              >
                <X
                  size={17}
                />
              </button>
            </div>

            {/* CLIENT INFO */}

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
                  <Clock3
                    size={15}
                  />
                }
                label="Timeline"
                value={
                  selected.timeline ??
                  "Not specified"
                }
              />

              <InfoCard
                icon={
                  <Calendar
                    size={15}
                  />
                }
                label="Submitted"
                value={formatDate(
                  selected.created_at
                )}
              />
            </div>

            {/* PROJECT BRIEF */}

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
              <p
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-primary
                "
              >
                Project Brief
              </p>

              <p
                className="
                  mt-4
                  whitespace-pre-wrap
                  text-sm
                  leading-7
                  text-foreground-secondary
                "
              >
                {
                  selected.project_description
                }
              </p>
            </section>

            {/* REQUEST DETAILS */}

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
                Request Details
              </p>

              <div
                className="
                  mt-5
                  grid
                  gap-5
                "
              >
                <DetailRow
                  label="Project type"
                  value={
                    selected.project_type
                  }
                />

                <DetailRow
                  label="Budget"
                  value={
                    selected.budget ??
                    "Not specified"
                  }
                />

                <DetailRow
                  label="Pages"
                  value={
                    selected.pages ??
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
                  label="Existing website"
                  value={
                    selected.has_existing_website
                      ? "Yes"
                      : "No"
                  }
                />

                {selected.features &&
                  selected
                    .features
                    .length >
                    0 && (
                    <DetailRow
                      label="Features"
                      value={selected.features.join(
                        ", "
                      )}
                    />
                  )}

                {selected.custom_feature && (
                  <DetailRow
                    label="Custom feature"
                    value={
                      selected.custom_feature
                    }
                  />
                )}

                {selected.additional_notes && (
                  <DetailRow
                    label="Additional notes"
                    value={
                      selected.additional_notes
                    }
                  />
                )}

                {selected.existing_website_url && (
                  <a
                    href={
                      selected.existing_website_url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-primary
                    "
                  >
                    Open existing
                    website

                    <ExternalLink
                      size={14}
                    />
                  </a>
                )}
              </div>
            </section>

            {/* STATUS */}

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
                Request Status
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-muted
                "
              >
                Update the workflow
                stage as you process
                this client request.
              </p>

              <select
                value={
                  selected.status
                }
                disabled={
                  updatingId ===
                  selected.id
                }
                onChange={(
                  event
                ) =>
                  void updateStatus(
                    selected.id,
                    event.target
                      .value as ProjectRequestStatus
                  )
                }
                className="
                  mt-4
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  text-sm
                  text-foreground
                  outline-none
                  transition-colors
                  focus:border-primary/40
                  disabled:opacity-60
                "
              >
                {statusOptions.map(
                  (option) => (
                    <option
                      key={
                        option.value
                      }
                      value={
                        option.value
                      }
                    >
                      {
                        option.label
                      }
                    </option>
                  )
                )}
              </select>

              {updatingId ===
                selected.id && (
                <div
                  className="
                    mt-3
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

                  Updating status...
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
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status:
    ProjectRequestStatus;
}) {
  const labels:
    Record<
      ProjectRequestStatus,
      string
    > = {
    pending: "Pending",

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
    <span
      className="
        inline-flex
        w-fit
        items-center
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
      {labels[status]}
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
          whitespace-pre-wrap
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