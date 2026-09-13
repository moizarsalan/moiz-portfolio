"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";

import {
  CheckCheck,
  LoaderCircle,
  MessageSquareText,
  Minimize2,
  X,
} from "lucide-react";

import {
  MessageApiError,
  sendMessage as submitMessage,
} from "@/lib/api/messages";

import MessageComposer from "./MessageComposer";

/* =========================================================
   TYPES
========================================================= */

type ChatMessage = {
  id: string;

  text: string;

  sender: "visitor";

  time: string;

  serverId?: number;
};

type VisitorProfile = {
  name: string;

  email: string;

  subject: string;
};

/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY =
  "ama-portfolio-messages";

const PROFILE_STORAGE_KEY =
  "ama-portfolio-message-profile";

/* =========================================================
   TIME
========================================================= */

function getTime() {
  return new Intl.DateTimeFormat(
    undefined,
    {
      hour: "2-digit",

      minute: "2-digit",
    }
  ).format(
    new Date()
  );
}

/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(
  value: string
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}

/* =========================================================
   HONEYPOT
========================================================= */

function getHoneypotValue() {
  const fields =
    document.querySelectorAll<HTMLInputElement>(
      'input[name="company_website"]'
    );

  for (
    const field of fields
  ) {
    const value =
      field.value.trim();

    if (value) {
      return value;
    }
  }

  return "";
}

/* =========================================================
   API ERROR
========================================================= */

function getMessageError(
  error: unknown
) {
  if (
    error instanceof
    MessageApiError
  ) {
    if (
      error.errors
    ) {
      const firstError =
        Object.values(
          error.errors
        )
          .flat()
          .find(Boolean);

      if (
        firstError
      ) {
        return firstError;
      }
    }

    return error.message;
  }

  if (
    error instanceof
    Error
  ) {
    return error.message;
  }

  return "Your message could not be sent. Please try again.";
}

/* =========================================================
   MESSENGER
========================================================= */

export default function DesktopMessenger() {
  const desktopPanelRef =
    useRef<HTMLDivElement>(
      null
    );

  const messagesEndRef =
    useRef<HTMLDivElement>(
      null
    );

  const initialized =
    useRef(false);

  const [
    open,
    setOpen,
  ] =
    useState(false);

  const [
    ready,
    setReady,
  ] =
    useState(false);

  const [
    messages,
    setMessages,
  ] =
    useState<
      ChatMessage[]
    >([]);

  const [
    visitorName,
    setVisitorName,
  ] =
    useState("");

  const [
    visitorEmail,
    setVisitorEmail,
  ] =
    useState("");

  const [
    subject,
    setSubject,
  ] =
    useState("");

  const [
    sending,
    setSending,
  ] =
    useState(false);

  const [
    sendError,
    setSendError,
  ] =
    useState<string | null>(
      null
    );

  const [
    successMessage,
    setSuccessMessage,
  ] =
    useState<string | null>(
      null
    );

  /* =========================================================
     RESTORE MESSAGES + PROFILE
  ========================================================= */

  useEffect(() => {
    const storedMessages =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (
      storedMessages
    ) {
      try {
        const parsed =
          JSON.parse(
            storedMessages
          );

        if (
          Array.isArray(
            parsed
          )
        ) {
          setMessages(
            parsed
          );
        }
      } catch {
        // Ignore invalid local storage.
      }
    }

    const storedProfile =
      window.localStorage.getItem(
        PROFILE_STORAGE_KEY
      );

    if (
      storedProfile
    ) {
      try {
        const parsedProfile =
          JSON.parse(
            storedProfile
          ) as Partial<VisitorProfile>;

        if (
          typeof
            parsedProfile.name ===
          "string"
        ) {
          setVisitorName(
            parsedProfile.name
          );
        }

        if (
          typeof
            parsedProfile.email ===
          "string"
        ) {
          setVisitorEmail(
            parsedProfile.email
          );
        }

        if (
          typeof
            parsedProfile.subject ===
          "string"
        ) {
          setSubject(
            parsedProfile.subject
          );
        }
      } catch {
        // Ignore invalid stored profile.
      }
    }

    setReady(true);
  }, []);

  /* =========================================================
     SAVE MESSAGES
  ========================================================= */

  useEffect(() => {
    if (
      !ready
    ) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        messages
      )
    );

    requestAnimationFrame(
      () => {
        messagesEndRef.current?.scrollIntoView(
          {
            behavior:
              "smooth",
          }
        );
      }
    );
  }, [
    messages,
    ready,
  ]);

  /* =========================================================
     SAVE VISITOR PROFILE
  ========================================================= */

  useEffect(() => {
    if (
      !ready
    ) {
      return;
    }

    window.localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({
        name:
          visitorName,

        email:
          visitorEmail,

        subject,
      })
    );
  }, [
    visitorName,
    visitorEmail,
    subject,
    ready,
  ]);

  /* =========================================================
     RECEIVE GLOBAL INBOX COMMANDS
  ========================================================= */

  useEffect(() => {
    function toggleInbox() {
      setOpen(
        (current) =>
          !current
      );
    }

    function closeInbox() {
      setOpen(
        false
      );
    }

    window.addEventListener(
      "portfolio:toggle-inbox",
      toggleInbox
    );

    window.addEventListener(
      "portfolio:close-inbox",
      closeInbox
    );

    return () => {
      window.removeEventListener(
        "portfolio:toggle-inbox",
        toggleInbox
      );

      window.removeEventListener(
        "portfolio:close-inbox",
        closeInbox
      );
    };
  }, []);

  /* =========================================================
     BROADCAST INBOX STATE
  ========================================================= */

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "portfolio:inbox-state",
        {
          detail: {
            open,
          },
        }
      )
    );
  }, [
    open,
  ]);

  /* =========================================================
     DESKTOP INITIAL STATE
  ========================================================= */

  useEffect(() => {
    const panel =
      desktopPanelRef.current;

    if (
      !panel
    ) {
      return;
    }

    gsap.set(
      panel,
      {
        opacity: 0,

        scale: 0.9,

        y: 22,

        pointerEvents:
          "none",

        transformOrigin:
          "bottom right",
      }
    );

    initialized.current =
      true;
  }, []);

  /* =========================================================
     DESKTOP OPEN / CLOSE
  ========================================================= */

  useEffect(() => {
    if (
      !initialized.current
    ) {
      return;
    }

    const panel =
      desktopPanelRef.current;

    if (
      !panel
    ) {
      return;
    }

    if (
      open
    ) {
      gsap.set(
        panel,
        {
          pointerEvents:
            "auto",
        }
      );

      gsap.to(
        panel,
        {
          opacity: 1,

          scale: 1,

          y: 0,

          duration: 0.42,

          ease:
            "back.out(1.25)",
        }
      );
    } else {
      gsap.to(
        panel,
        {
          opacity: 0,

          scale: 0.9,

          y: 22,

          duration: 0.26,

          ease:
            "power2.in",

          onComplete:
            () => {
              gsap.set(
                panel,
                {
                  pointerEvents:
                    "none",
                }
              );
            },
        }
      );
    }
  }, [
    open,
  ]);

  /* =========================================================
     MOBILE BODY LOCK
  ========================================================= */

  useEffect(() => {
    if (
      window.innerWidth >=
      1024
    ) {
      return;
    }

    if (
      open
    ) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    open,
  ]);

  /* =========================================================
     SEND LIVE MESSAGE
  ========================================================= */

  async function sendMessage(
    text: string
  ) {
    if (
      sending
    ) {
      return;
    }

    setSendError(
      null
    );

    setSuccessMessage(
      null
    );

    const cleanName =
      visitorName.trim();

    const cleanEmail =
      visitorEmail
        .trim()
        .toLowerCase();

    const cleanSubject =
      subject.trim();

    const cleanMessage =
      text.trim();

    /* ---------------------------------------------------------
       CLIENT VALIDATION
    --------------------------------------------------------- */

    if (
      cleanName.length <
      2
    ) {
      setSendError(
        "Please enter your name before sending a message."
      );

      return;
    }

    if (
      !isValidEmail(
        cleanEmail
      )
    ) {
      setSendError(
        "Please enter a valid email address before sending."
      );

      return;
    }

    if (
      cleanMessage.length <
      5
    ) {
      setSendError(
        "Your message must contain at least 5 characters."
      );

      return;
    }

    setSending(
      true
    );

    try {
      const result =
        await submitMessage({
          name:
            cleanName,

          email:
            cleanEmail,

          subject:
            cleanSubject ||
            undefined,

          message:
            cleanMessage,

          /*
           * Spam honeypot.
           *
           * Real visitors leave this empty.
           */
          company_website:
            getHoneypotValue(),
        });

      const newMessage:
        ChatMessage = {
        id:
          crypto.randomUUID(),

        text:
          cleanMessage,

        sender:
          "visitor",

        time:
          getTime(),

        serverId:
          result.data
            ?.message_id ??
          undefined,
      };

      setMessages(
        (current) => [
          ...current,
          newMessage,
        ]
      );

      if (
        result.data
          ?.message_id
      ) {
        setSuccessMessage(
          `${result.message} Reference #${result.data.message_id}.`
        );
      } else {
        setSuccessMessage(
          result.message
        );
      }
    } catch (
      error
    ) {
      setSendError(
        getMessageError(
          error
        )
      );
    } finally {
      setSending(
        false
      );
    }
  }

  return (
    <>
      {/* =====================================================
          MOBILE INBOX
      ====================================================== */}

      <div
        className={`
          fixed
          left-0
          right-0
          top-20
          bottom-16
          z-[80]
          flex
          flex-col
          overflow-hidden
          bg-background
          transition-all
          duration-300
          lg:hidden

          ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-6 opacity-0"
          }
        `}
      >
        {/* BACKGROUND */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            hero-grid
            opacity-[0.12]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-0
            h-80
            w-80
            rounded-full
            bg-primary/8
            blur-[120px]
          "
        />

        {/* =================================================
            MOBILE HEADER
        ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-border
            bg-background/80
            px-4
            py-4
            backdrop-blur-xl
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
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                font-bold
                text-white
                shadow-[0_0_18px_var(--primary-glow)]
              "
            >
              AM

              <span
                className="
                  absolute
                  -bottom-0.5
                  -right-0.5
                  h-3
                  w-3
                  rounded-full
                  border-2
                  border-background
                  bg-success
                "
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
                Abdul Moiz Arsalan
              </p>

              <div
                className="
                  mt-1
                  flex
                  items-center
                  gap-2
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

                <span
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.13em]
                    text-muted
                  "
                >
                  Project inbox
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpen(
                false
              )
            }
            aria-label="Close inbox"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-border
              bg-surface/40
              text-muted
              transition-all
              hover:text-foreground
            "
          >
            <X
              size={17}
            />
          </button>
        </div>

        {/* =================================================
            MOBILE MESSAGES AREA
        ================================================== */}

        <div
          className="
            relative
            z-10
            flex-1
            overflow-y-auto
            px-4
            py-5
          "
        >
          <div
            className="
              mx-auto
              max-w-2xl
            "
          >
            {/* INTRO */}

            <div
              className="
                mx-auto
                mb-6
                max-w-xs
                text-center
              "
            >
              <p
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.16em]
                  text-primary
                "
              >
                Direct Project Channel
              </p>

              <h2
                className="
                  mt-3
                  text-xl
                  font-bold
                  tracking-[-0.035em]
                  text-foreground
                "
              >
                Send me a message.
              </h2>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-muted
                "
              >
                Ask a quick question or tell me briefly about
                what you&apos;re planning to build.
              </p>
            </div>

            {/* CONTACT DETAILS */}

            <ContactDetails
              name={
                visitorName
              }
              email={
                visitorEmail
              }
              subject={
                subject
              }
              onNameChange={
                setVisitorName
              }
              onEmailChange={
                setVisitorEmail
              }
              onSubjectChange={
                setSubject
              }
            />

            {/* DELIVERY STATE */}

            <DeliveryStatus
              sending={
                sending
              }
              error={
                sendError
              }
              success={
                successMessage
              }
            />

            {/* EMPTY STATE */}

            {messages.length ===
            0 ? (
              <div
                className="
                  flex
                  min-h-[230px]
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-border
                      bg-surface/45
                      text-primary
                      shadow-[0_0_20px_var(--primary-glow)]
                    "
                  >
                    <MessageSquareText
                      size={21}
                    />
                  </div>

                  <p
                    className="
                      mt-4
                      text-sm
                      font-semibold
                      text-foreground
                    "
                  >
                    Start a conversation.
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      text-muted
                    "
                  >
                    Your delivered messages will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="
                  space-y-4
                "
              >
                {messages.map(
                  (
                    message
                  ) => (
                    <MessageBubble
                      key={
                        message.id
                      }
                      message={
                        message
                      }
                    />
                  )
                )}
              </div>
            )}

            <div
              ref={
                messagesEndRef
              }
            />
          </div>
        </div>

        {/* MOBILE COMPOSER */}

        <div
          className="
            relative
            z-20
            shrink-0
          "
        >
          <MessageComposer
            onSend={
              sendMessage
            }
          />
        </div>
      </div>

      {/* =====================================================
          DESKTOP MESSENGER
      ====================================================== */}

      <div
        className="
          fixed
          bottom-6
          right-6
          z-[70]
          hidden
          lg:block
        "
      >
        {/* DESKTOP PANEL */}

        <div
          ref={
            desktopPanelRef
          }
          className="
            pointer-events-none
            absolute
            bottom-[76px]
            right-0
            flex
            h-[570px]
            w-[390px]
            flex-col
            overflow-hidden
            rounded-[2rem]
            border
            border-border
            bg-background/95
            opacity-0
            shadow-2xl
            backdrop-blur-2xl
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              hero-grid
              opacity-[0.12]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-20
              h-64
              w-64
              rounded-full
              bg-primary/8
              blur-[90px]
            "
          />

          {/* =================================================
              DESKTOP HEADER
          ================================================== */}

          <div
            className="
              relative
              z-10
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-border
              bg-surface/35
              px-5
              py-4
              backdrop-blur-xl
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
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                  font-bold
                  text-white
                  shadow-[0_0_18px_var(--primary-glow)]
                "
              >
                AM

                <span
                  className="
                    absolute
                    -bottom-0.5
                    -right-0.5
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-background
                    bg-success
                  "
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
                  Abdul Moiz Arsalan
                </p>

                <p
                  className="
                    mt-0.5
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.13em]
                    text-muted
                  "
                >
                  Project inbox
                </p>
              </div>
            </div>

            <div
              className="
                flex
                gap-1
              "
            >
              <button
                type="button"
                onClick={() =>
                  setOpen(
                    false
                  )
                }
                aria-label="Minimize inbox"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-muted
                  transition-colors
                  hover:bg-surface-hover
                  hover:text-foreground
                "
              >
                <Minimize2
                  size={15}
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  setOpen(
                    false
                  )
                }
                aria-label="Close inbox"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-muted
                  transition-colors
                  hover:bg-surface-hover
                  hover:text-foreground
                "
              >
                <X
                  size={16}
                />
              </button>
            </div>
          </div>

          {/* =================================================
              DESKTOP MESSAGES
          ================================================== */}

          <div
            className="
              relative
              z-10
              flex-1
              overflow-y-auto
              px-4
              py-5
            "
          >
            <div
              className="
                mx-auto
                mb-6
                max-w-[275px]
                text-center
              "
            >
              <p
                className="
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.16em]
                  text-primary
                "
              >
                Direct Project Channel
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-muted
                "
              >
                Have a quick question? Leave a message here.
              </p>
            </div>

            {/* CONTACT DETAILS */}

            <ContactDetails
              name={
                visitorName
              }
              email={
                visitorEmail
              }
              subject={
                subject
              }
              onNameChange={
                setVisitorName
              }
              onEmailChange={
                setVisitorEmail
              }
              onSubjectChange={
                setSubject
              }
              compact
            />

            {/* DELIVERY STATE */}

            <DeliveryStatus
              sending={
                sending
              }
              error={
                sendError
              }
              success={
                successMessage
              }
              compact
            />

            {/* EMPTY / MESSAGES */}

            {messages.length ===
            0 ? (
              <div
                className="
                  flex
                  min-h-[155px]
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-border
                      bg-surface/45
                      text-primary
                    "
                  >
                    <MessageSquareText
                      size={19}
                    />
                  </div>

                  <p
                    className="
                      mt-4
                      text-sm
                      font-semibold
                      text-foreground
                    "
                  >
                    Start a conversation.
                  </p>

                  <p
                    className="
                      mx-auto
                      mt-2
                      max-w-[230px]
                      text-xs
                      leading-5
                      text-muted
                    "
                  >
                    Tell me briefly what you would like to
                    discuss.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="
                  space-y-4
                "
              >
                {messages.map(
                  (
                    message
                  ) => (
                    <MessageBubble
                      key={
                        message.id
                      }
                      message={
                        message
                      }
                    />
                  )
                )}
              </div>
            )}

            <div
              ref={
                messagesEndRef
              }
            />
          </div>

          {/* COMPOSER */}

          <div
            className="
              relative
              z-10
            "
          >
            <MessageComposer
              onSend={
                sendMessage
              }
              compact
            />
          </div>
        </div>

        {/* =================================================
            DESKTOP FLOATING TRIGGER
        ================================================== */}

        <button
          type="button"
          onClick={() =>
            setOpen(
              (current) =>
                !current
            )
          }
          aria-label={
            open
              ? "Close inbox"
              : "Open inbox"
          }
          className="
            group
            relative
            flex
            h-14
            items-center
            gap-3
            overflow-hidden
            rounded-2xl
            border
            border-primary/20
            bg-background/90
            px-4
            text-foreground
            shadow-xl
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-primary/40
            hover:shadow-[0_0_28px_var(--primary-glow)]
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              [background:linear-gradient(135deg,var(--primary),var(--secondary))]
              text-white
            "
          >
            {open ? (
              <X
                size={17}
              />
            ) : (
              <MessageSquareText
                size={17}
              />
            )}
          </div>

          <div
            className="
              pr-1
              text-left
            "
          >
            <p
              className="
                text-xs
                font-semibold
              "
            >
              Message Me
            </p>

            <p
              className="
                mt-0.5
                font-mono
                text-[7px]
                uppercase
                tracking-[0.12em]
                text-muted
              "
            >
              Project inbox
            </p>
          </div>

          {!open && (
            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-success
                shadow-[0_0_10px_var(--success)]
              "
            />
          )}
        </button>
      </div>
    </>
  );
}

/* =========================================================
   CONTACT DETAILS
========================================================= */

function ContactDetails({
  name,
  email,
  subject,
  onNameChange,
  onEmailChange,
  onSubjectChange,
  compact = false,
}: {
  name: string;

  email: string;

  subject: string;

  onNameChange:
    (value: string) => void;

  onEmailChange:
    (value: string) => void;

  onSubjectChange:
    (value: string) => void;

  compact?: boolean;
}) {
  return (
    <div
      className={`
        relative
        rounded-xl
        border
        border-primary/15
        bg-primary/5

        ${
          compact
            ? "mb-4 p-3"
            : "mb-6 p-4"
        }
      `}
    >
      {/* =====================================================
          HONEYPOT

          Hidden visually but kept as a real text input so
          simple form bots may populate it.

          Normal visitors never interact with this field.
      ====================================================== */}

      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[10000px]
          -top-[10000px]
          h-px
          w-px
          opacity-0
        "
      />

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <p
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.14em]
            text-primary
          "
        >
          Contact details
        </p>

        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.12em]
            text-muted
          "
        >
          Live
        </span>
      </div>

      <p
        className="
          mt-2
          text-[10px]
          leading-5
          text-muted
        "
      >
        Add your details so I can identify and respond to your
        message.
      </p>

      <div
        className={`
          mt-3
          grid
          gap-2

          ${
            compact
              ? "grid-cols-1"
              : "sm:grid-cols-2"
          }
        `}
      >
        {/* NAME */}

        <input
          type="text"
          value={
            name
          }
          onChange={(
            event
          ) =>
            onNameChange(
              event.target.value
            )
          }
          placeholder="Your name"
          autoComplete="name"
          maxLength={120}
          className="
            min-w-0
            rounded-lg
            border
            border-border
            bg-background/70
            px-3
            py-2.5
            text-xs
            text-foreground
            outline-none
            transition-colors
            placeholder:text-muted/60
            focus:border-primary/40
          "
        />

        {/* EMAIL */}

        <input
          type="email"
          value={
            email
          }
          onChange={(
            event
          ) =>
            onEmailChange(
              event.target.value
            )
          }
          placeholder="Email address"
          autoComplete="email"
          maxLength={190}
          className="
            min-w-0
            rounded-lg
            border
            border-border
            bg-background/70
            px-3
            py-2.5
            text-xs
            text-foreground
            outline-none
            transition-colors
            placeholder:text-muted/60
            focus:border-primary/40
          "
        />
      </div>

      {/* SUBJECT */}

      <input
        type="text"
        value={
          subject
        }
        onChange={(
          event
        ) =>
          onSubjectChange(
            event.target.value
          )
        }
        placeholder="Subject (optional)"
        maxLength={200}
        className="
          mt-2
          w-full
          rounded-lg
          border
          border-border
          bg-background/70
          px-3
          py-2.5
          text-xs
          text-foreground
          outline-none
          transition-colors
          placeholder:text-muted/60
          focus:border-primary/40
        "
      />
    </div>
  );
}

/* =========================================================
   DELIVERY STATUS
========================================================= */

function DeliveryStatus({
  sending,
  error,
  success,
  compact = false,
}: {
  sending: boolean;

  error:
    | string
    | null;

  success:
    | string
    | null;

  compact?: boolean;
}) {
  if (
    !sending &&
    !error &&
    !success
  ) {
    return null;
  }

  return (
    <div
      className={`
        rounded-xl
        border
        px-3
        py-3
        text-[10px]
        leading-5

        ${
          compact
            ? "mb-4"
            : "mb-6"
        }

        ${
          error
            ? "border-red-500/20 bg-red-500/5 text-red-300"
            : success
              ? "border-success/20 bg-success/5 text-success"
              : "border-primary/15 bg-primary/5 text-muted"
        }
      `}
    >
      {sending ? (
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <LoaderCircle
            size={13}
            className="
              animate-spin
              text-primary
            "
          />

          Sending your message...
        </div>
      ) : error ? (
        error
      ) : (
        success
      )}
    </div>
  );
}

/* =========================================================
   MESSAGE BUBBLE
========================================================= */

function MessageBubble({
  message,
}: {
  message:
    ChatMessage;
}) {
  return (
    <div
      className="
        flex
        justify-end
      "
    >
      <div
        className="
          max-w-[82%]
        "
      >
        <div
          className="
            rounded-[1.25rem]
            rounded-br-sm
            [background:linear-gradient(135deg,var(--primary),var(--secondary))]
            px-4
            py-3
            text-sm
            leading-6
            text-white
            shadow-[0_0_15px_var(--primary-glow)]
          "
        >
          {
            message.text
          }
        </div>

        <div
          className="
            mt-1.5
            flex
            items-center
            justify-end
            gap-1.5
          "
        >
          {message.serverId && (
            <span
              className="
                font-mono
                text-[7px]
                text-muted
              "
            >
              #
              {
                message.serverId
              }
            </span>
          )}

          <span
            className="
              font-mono
              text-[7px]
              text-muted
            "
          >
            {
              message.time
            }
          </span>

          <CheckCheck
            size={11}
            className="text-primary"
          />
        </div>
      </div>
    </div>
  );
}