"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BriefcaseBusiness,
  FolderKanban,
  Home,
  MessageSquareText,
} from "lucide-react";

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },

  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },

  {
    label: "Order",
    href: "/order",
    icon: BriefcaseBusiness,
  },
];

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

export default function MobileNav() {
  const pathname = usePathname();

  const [inboxOpen, setInboxOpen] =
    useState(false);

  /* =========================================================
     LISTEN TO INBOX STATE
  ========================================================= */

  useEffect(() => {
    function handleInboxState(
      event: Event
    ) {
      const customEvent =
        event as CustomEvent<{
          open: boolean;
        }>;

      setInboxOpen(
        customEvent.detail.open
      );
    }

    window.addEventListener(
      "portfolio:inbox-state",
      handleInboxState
    );

    return () => {
      window.removeEventListener(
        "portfolio:inbox-state",
        handleInboxState
      );
    };
  }, []);

  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  function isActive(
    href: string
  ) {
    if (href === "/") {
      return (
        pathname === "/" &&
        !inboxOpen
      );
    }

    if (
      href === "/projects"
    ) {
      return (
        pathname.startsWith(
          "/projects"
        ) && !inboxOpen
      );
    }

    if (
      href === "/order"
    ) {
      return (
        pathname === "/order" &&
        !inboxOpen
      );
    }

    return false;
  }

  /* =========================================================
     OPEN / CLOSE INBOX
  ========================================================= */

  function toggleInbox() {
    window.dispatchEvent(
      new CustomEvent(
        "portfolio:toggle-inbox"
      )
    );
  }

  function closeInbox() {
    window.dispatchEvent(
      new CustomEvent(
        "portfolio:close-inbox"
      )
    );
  }

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-[100]
        border-t
        border-border
        bg-background/90
        backdrop-blur-2xl
        lg:hidden
      "
    >
      <div
        className="
          grid
          h-16
          grid-cols-4
          px-2
          pb-[env(safe-area-inset-bottom)]
        "
      >
        {/* NORMAL NAV ITEMS */}

        {navItems.map(
          (item) => {
            const Icon =
              item.icon;

            const active =
              isActive(
                item.href
              );

            return (
              <Link
                key={
                  item.label
                }
                href={
                  item.href
                }
                onClick={
                  closeInbox
                }
                className="
                  relative
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                "
              >
                {/* Active indicator */}

                <span
                  className={`
                    absolute
                    top-0
                    h-[2px]
                    rounded-full
                    bg-primary
                    shadow-[0_0_10px_var(--primary)]
                    transition-all
                    duration-300

                    ${
                      active
                        ? "w-8 opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />

                <Icon
                  size={18}
                  strokeWidth={
                    active
                      ? 2.3
                      : 1.7
                  }
                  className={`
                    transition-all
                    duration-300

                    ${
                      active
                        ? "text-primary"
                        : "text-muted"
                    }
                  `}
                />

                <span
                  className={`
                    text-[9px]
                    font-medium
                    transition-colors
                    duration-300

                    ${
                      active
                        ? "text-primary"
                        : "text-muted"
                    }
                  `}
                >
                  {
                    item.label
                  }
                </span>
              </Link>
            );
          }
        )}

        {/* =================================================
            INBOX BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={
            toggleInbox
          }
          className="
            relative
            flex
            flex-col
            items-center
            justify-center
            gap-1
          "
          aria-label={
            inboxOpen
              ? "Close inbox"
              : "Open inbox"
          }
        >
          {/* Active indicator */}

          <span
            className={`
              absolute
              top-0
              h-[2px]
              rounded-full
              bg-primary
              shadow-[0_0_10px_var(--primary)]
              transition-all
              duration-300

              ${
                inboxOpen
                  ? "w-8 opacity-100"
                  : "w-0 opacity-0"
              }
            `}
          />

          <div className="relative">

            <MessageSquareText
              size={18}
              strokeWidth={
                inboxOpen
                  ? 2.3
                  : 1.7
              }
              className={`
                transition-all
                duration-300

                ${
                  inboxOpen
                    ? "text-primary"
                    : "text-muted"
                }
              `}
            />

            {/* status dot */}

            {!inboxOpen && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-success
                  shadow-[0_0_7px_var(--success)]
                "
              />
            )}

          </div>

          <span
            className={`
              text-[9px]
              font-medium
              transition-colors
              duration-300

              ${
                inboxOpen
                  ? "text-primary"
                  : "text-muted"
              }
            `}
          >
            Inbox
          </span>
        </button>

      </div>
    </nav>
  );
}