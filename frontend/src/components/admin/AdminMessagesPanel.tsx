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
  Archive,
  ArchiveRestore,
  CheckCheck,
  Clock3,
  LoaderCircle,
  Mail,
  MailOpen,
  MessageSquareText,
  RefreshCw,
  Reply,
  Search,
  User,
  X,
} from "lucide-react";

type MessageStatus =
  | "unread"
  | "read"
  | "replied"
  | "archived";

type MessageAction =
  | "read"
  | "unread"
  | "replied"
  | "archive"
  | "restore";

type AdminMessage = {
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

  updated_at: string;
};

type MessagesResponse = {
  success: boolean;

  message?: string;

  data: {
    data:
      AdminMessage[];

    total: number;
  };
};

type MessageDetailResponse = {
  success: boolean;

  message?: string;

  data: {
    message:
      AdminMessage;
  };
};

type Filter =
  | "all"
  | MessageStatus;

const filters: {
  value: Filter;
  label: string;
}[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "unread",
    label: "Unread",
  },
  {
    value: "read",
    label: "Read",
  },
  {
    value: "replied",
    label: "Replied",
  },
  {
    value: "archived",
    label: "Archived",
  },
];

export default function AdminMessagesPanel() {
  const [
    messages,
    setMessages,
  ] =
    useState<
      AdminMessage[]
    >([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

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
    search,
    setSearch,
  ] =
    useState("");

  const [
    selected,
    setSelected,
  ] =
    useState<AdminMessage | null>(
      null
    );

  const [
    openingId,
    setOpeningId,
  ] =
    useState<number | null>(
      null
    );

  const [
    updatingId,
    setUpdatingId,
  ] =
    useState<number | null>(
      null
    );

  const [
    total,
    setTotal,
  ] =
    useState(0);

  /* =========================================================
     LOAD
  ========================================================= */

  const loadMessages =
    useCallback(
      async () => {
        setLoading(true);
        setLoadError(null);

        try {
          const params =
            new URLSearchParams();

          if (
            filter !==
            "all"
          ) {
            params.set(
              "status",
              filter
            );
          }

          const cleanSearch =
            search.trim();

          if (
            cleanSearch
          ) {
            params.set(
              "search",
              cleanSearch
            );
          }

          const query =
            params.toString();

          const response =
            await fetch(
              `/api/admin/messages${
                query
                  ? `?${query}`
                  : ""
              }`,
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
              "Unexpected server response."
            );
          }

          const result =
            (await response.json()) as MessagesResponse;

          if (
            !response.ok ||
            !result.success ||
            !result.data ||
            !Array.isArray(
              result.data.data
            )
          ) {
            throw new Error(
              result.message ??
                "Unable to load messages."
            );
          }

          setMessages(
            result.data.data
          );

          setTotal(
            result.data.total ??
              result.data.data.length
          );
        } catch (
          error
        ) {
          setLoadError(
            error instanceof
              Error
              ? error.message
              : "Unable to load messages."
          );
        } finally {
          setLoading(false);
        }
      },
      [
        filter,
        search,
      ]
    );

  useEffect(() => {
    const timeout =
      window.setTimeout(
        () => {
          void loadMessages();
        },
        search
          ? 300
          : 0
      );

    return () =>
      window.clearTimeout(
        timeout
      );
  }, [
    loadMessages,
    search,
  ]);

  /* =========================================================
     OPEN + AUTO READ
  ========================================================= */

  async function openMessage(
    message: AdminMessage
  ) {
    setOpeningId(
      message.id
    );

    setActionError(null);
    setActionMessage(null);

    try {
      const response =
        await fetch(
          `/api/admin/messages/${message.id}`,
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
        !contentType?.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "Unable to open message."
        );
      }

      const result =
        (await response.json()) as MessageDetailResponse;

      if (
        !response.ok ||
        !result.success ||
        !result.data?.message
      ) {
        throw new Error(
          result.message ??
            "Unable to open message."
        );
      }

      const updated =
        result.data.message;

      setSelected(
        updated
      );

      setMessages(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              updated.id
                ? updated
                : item
          )
      );
    } catch (
      error
    ) {
      setActionError(
        error instanceof
          Error
          ? error.message
          : "Unable to open message."
      );

      setSelected(
        message
      );
    } finally {
      setOpeningId(
        null
      );
    }
  }

  /* =========================================================
     STATUS ACTION
  ========================================================= */

  async function updateStatus(
    action:
      MessageAction
  ) {
    if (
      !selected ||
      updatingId !== null
    ) {
      return;
    }

    setUpdatingId(
      selected.id
    );

    setActionError(null);
    setActionMessage(null);

    try {
      const response =
        await fetch(
          `/api/admin/messages/${selected.id}/status`,
          {
            method:
              "PATCH",

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
          "Unexpected server response."
        );
      }

      const result =
        (await response.json()) as MessageDetailResponse;

      if (
        !response.ok ||
        !result.success ||
        !result.data?.message
      ) {
        throw new Error(
          result.message ??
            "Unable to update message."
        );
      }

      const updated =
        result.data.message;

      setSelected(
        updated
      );

      setMessages(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              updated.id
                ? updated
                : item
          )
      );

      setActionMessage(
        result.message ??
          "Message updated successfully."
      );

      /*
       * Refresh because the current filter
       * may no longer match the updated status.
       */
      await loadMessages();
    } catch (
      error
    ) {
      setActionError(
        error instanceof
          Error
          ? error.message
          : "Unable to update message."
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

  if (
    loading &&
    messages.length ===
      0
  ) {
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
        <LoaderCircle
          size={22}
          className="
            animate-spin
            text-primary
          "
        />
      </div>
    );
  }

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
            border-b
            border-border
            px-6
            py-5
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              xl:flex-row
              xl:items-center
              xl:justify-between
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
                Portfolio Inbox
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-muted
                "
              >
                {loadError
                  ? "Message data unavailable"
                  : `${total} ${
                      total ===
                      1
                        ? "message"
                        : "messages"
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
                (
                  item
                ) => (
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

                      ${
                        filter ===
                        item.value
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border bg-background/50 text-muted"
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
                  void loadMessages()
                }
                className="
                  inline-flex
                  items-center
                  gap-2
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
                "
              >
                <RefreshCw
                  size={11}
                />

                Refresh
              </button>
            </div>
          </div>

          <div
            className="
              relative
              mt-5
              max-w-xl
            "
          >
            <Search
              size={14}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-muted
              "
            />

            <input
              type="search"
              value={
                search
              }
              onChange={(
                event
              ) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search messages..."
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-background/60
                py-3
                pl-10
                pr-4
                text-xs
                text-foreground
                outline-none
                focus:border-primary/40
              "
            />
          </div>
        </div>

        {loadError ? (
          <div
            className="
              flex
              min-h-[260px]
              items-center
              justify-center
              p-8
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
                Messages could not
                be loaded.
              </p>

              <button
                type="button"
                onClick={() =>
                  void loadMessages()
                }
                className="
                  mt-5
                  text-xs
                  font-medium
                  text-primary
                "
              >
                Try Again
              </button>
            </div>
          </div>
        ) : messages.length ===
          0 ? (
          <div
            className="
              flex
              min-h-[280px]
              items-center
              justify-center
              text-center
            "
          >
            <div>
              <MessageSquareText
                size={24}
                className="
                  mx-auto
                  text-muted
                "
              />

              <p
                className="
                  mt-4
                  text-sm
                  font-semibold
                  text-foreground
                "
              >
                No messages found.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {messages.map(
              (
                message
              ) => (
                <button
                  key={
                    message.id
                  }
                  type="button"
                  disabled={
                    openingId ===
                    message.id
                  }
                  onClick={() =>
                    void openMessage(
                      message
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
                    disabled:opacity-60
                    md:grid-cols-[0.9fr_1.4fr_0.55fr_auto]
                    md:items-center
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
                      "unread" ? (
                        <Mail
                          size={13}
                          className="text-primary"
                        />
                      ) : (
                        <MailOpen
                          size={13}
                          className="text-muted"
                        />
                      )}

                      <p
                        className={`
                          truncate
                          text-sm

                          ${
                            message.status ===
                            "unread"
                              ? "font-bold text-foreground"
                              : "font-medium text-foreground-secondary"
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
                      {
                        message.email
                      }
                    </p>
                  </div>

                  <div
                    className="
                      min-w-0
                    "
                  >
                    <p
                      className="
                        truncate
                        text-sm
                        font-medium
                        text-foreground
                      "
                    >
                      {message.subject ??
                        "No subject"}
                    </p>

                    <p
                      className="
                        mt-1
                        line-clamp-1
                        text-xs
                        text-muted
                      "
                    >
                      {
                        message.message
                      }
                    </p>
                  </div>

                  <StatusBadge
                    status={
                      message.status
                    }
                  />

                  <p
                    className="
                      font-mono
                      text-[7px]
                      text-muted
                    "
                  >
                    {formatDate(
                      message.created_at
                    )}
                  </p>
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* DETAILS */}

      {selected && (
        <>
          <button
            type="button"
            aria-label="Close message"
            onClick={() =>
              setSelected(
                null
              )
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
                  Message #
                  {
                    selected.id
                  }
                </p>

                <h2
                  className="
                    mt-3
                    text-2xl
                    font-bold
                    text-foreground
                  "
                >
                  {selected.subject ??
                    "Portfolio Message"}
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
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-border
                  text-muted
                "
              >
                <X
                  size={17}
                />
              </button>
            </div>

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
                label="Sender"
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
                label="Received"
                value={formatFullDate(
                  selected.created_at
                )}
              />

              <InfoCard
                icon={
                  <CheckCheck
                    size={15}
                  />
                }
                label="Status"
                value={
                  selected.status
                }
              />
            </div>

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
                Message
              </p>

              <p
                className="
                  mt-4
                  whitespace-pre-wrap
                  break-words
                  text-sm
                  leading-7
                  text-foreground-secondary
                "
              >
                {
                  selected.message
                }
              </p>
            </section>

            {actionError && (
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/5
                  p-4
                  text-xs
                  text-red-300
                "
              >
                {
                  actionError
                }
              </div>
            )}

            {actionMessage && (
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-success/20
                  bg-success/5
                  p-4
                  text-xs
                  text-success
                "
              >
                {
                  actionMessage
                }
              </div>
            )}

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
                Message Actions
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {selected.status !==
                  "unread" &&
                  selected.status !==
                    "archived" && (
                    <ActionButton
                      icon={
                        <Mail
                          size={14}
                        />
                      }
                      label="Mark Unread"
                      disabled={
                        updatingId !==
                        null
                      }
                      onClick={() =>
                        void updateStatus(
                          "unread"
                        )
                      }
                    />
                  )}

                {selected.status !==
                  "replied" &&
                  selected.status !==
                    "archived" && (
                    <ActionButton
                      icon={
                        <Reply
                          size={14}
                        />
                      }
                      label="Mark Replied"
                      disabled={
                        updatingId !==
                        null
                      }
                      onClick={() =>
                        void updateStatus(
                          "replied"
                        )
                      }
                    />
                  )}

                {selected.status !==
                "archived" ? (
                  <ActionButton
                    icon={
                      <Archive
                        size={14}
                      />
                    }
                    label="Archive"
                    disabled={
                      updatingId !==
                      null
                    }
                    onClick={() =>
                      void updateStatus(
                        "archive"
                      )
                    }
                  />
                ) : (
                  <ActionButton
                    icon={
                      <ArchiveRestore
                        size={14}
                      />
                    }
                    label="Restore"
                    disabled={
                      updatingId !==
                      null
                    }
                    onClick={() =>
                      void updateStatus(
                        "restore"
                      )
                    }
                  />
                )}
              </div>

              {updatingId !==
                null && (
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

                  Updating...
                </div>
              )}
            </section>

            <a
              href={`mailto:${encodeURIComponent(
                selected.email
              )}?subject=${encodeURIComponent(
                selected.subject
                  ? `Re: ${selected.subject}`
                  : "Re: Your portfolio message"
              )}`}
              className="
                mt-5
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-primary/25
                bg-primary/5
                px-4
                py-3
                text-xs
                font-semibold
                text-primary
                transition-colors
                hover:bg-primary/10
              "
            >
              <Reply
                size={14}
              />

              Reply by Email
            </a>
          </aside>
        </>
      )}
    </>
  );
}

/* ========================================================= */

function StatusBadge({
  status,
}: {
  status:
    MessageStatus;
}) {
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
      {status}
    </span>
  );
}

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

function ActionButton({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={
        disabled
      }
      onClick={
        onClick
      }
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
        disabled:opacity-50
      "
    >
      {icon}
      {label}
    </button>
  );
}

function formatDate(
  value: string
) {
  const date =
    new Date(value);

  return Number.isNaN(
    date.getTime()
  )
    ? "Unknown"
    : new Intl.DateTimeFormat(
        "en",
        {
          month:
            "short",

          day:
            "numeric",
        }
      ).format(date);
}

function formatFullDate(
  value: string
) {
  const date =
    new Date(value);

  return Number.isNaN(
    date.getTime()
  )
    ? "Unknown"
    : new Intl.DateTimeFormat(
        "en",
        {
          dateStyle:
            "medium",

          timeStyle:
            "short",
        }
      ).format(date);
}