"use client";

import type {
  ReactNode,
} from "react";

import {
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  MessageSquareText,
  PanelLeft,
  X,
} from "lucide-react";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

type AdminPanelShellProps = {
  children: ReactNode;
};

const navigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    label: "Project Requests",
    href: "/admin/project-requests",
    icon: FileText,
  },

  {
    label: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquareQuote,
  },

  {
    label: "Messages",
    href: "/admin/messages",
    icon: MessageSquareText,
  },
];

export default function AdminPanelShell({
  children,
}: AdminPanelShellProps) {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const [
    mobileOpen,
    setMobileOpen,
  ] =
    useState(false);

  const [
    loggingOut,
    setLoggingOut,
  ] =
    useState(false);

  async function logout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );
    } finally {
      router.replace(
        "/admin/login"
      );

      router.refresh();
    }
  }

  function isActive(
    href: string
  ) {
    if (
      href === "/admin"
    ) {
      return (
        pathname ===
        href
      );
    }

    return pathname.startsWith(
      href
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-background
        text-foreground
      "
    >
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close admin navigation"
          onClick={() =>
            setMobileOpen(
              false
            )
          }
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          bottom-0
          left-0
          top-0
          z-50
          flex
          w-[280px]
          flex-col
          border-r
          border-border
          bg-surface/80
          backdrop-blur-2xl
          transition-transform
          duration-300
          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* SIDEBAR HEADER */}

        <div
          className="
            flex
            h-20
            items-center
            justify-between
            border-b
            border-border
            px-6
          "
        >
          <div>
            <p
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-primary
              "
            >
              Portfolio Control
            </p>

            <p
              className="
                mt-1
                text-lg
                font-bold
                tracking-[-0.035em]
              "
            >
              Admin Panel
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                false
              )
            }
            aria-label="Close navigation"
            className="
              text-muted
              transition-colors
              hover:text-foreground
              lg:hidden
            "
          >
            <X
              size={18}
            />
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav
          className="
            flex-1
            space-y-2
            p-4
          "
        >
          {navigation.map(
            ({
              label,
              href,
              icon: Icon,
            }) => {
              const active =
                isActive(
                  href
                );

              return (
                <Link
                  key={
                    href
                  }
                  href={
                    href
                  }
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all

                    ${
                      active
                        ? "border border-primary/20 bg-primary/10 text-primary"
                        : "text-muted hover:bg-background/60 hover:text-foreground"
                    }
                  `}
                >
                  <Icon
                    size={17}
                  />

                  {label}
                </Link>
              );
            }
          )}
        </nav>

        {/* =====================================================
            LOGOUT
        ===================================================== */}

        <div
          className="
            border-t
            border-border
            p-4
          "
        >
          <button
            type="button"
            disabled={
              loggingOut
            }
            onClick={
              logout
            }
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-muted
              transition-all
              hover:bg-red-500/5
              hover:text-red-400
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            <LogOut
              size={17}
            />

            {loggingOut
              ? "Signing out..."
              : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="lg:pl-[280px]">
        {/* =====================================================
            TOP HEADER
        ===================================================== */}

        <header
          className="
            sticky
            top-0
            z-30
            flex
            h-20
            items-center
            justify-between
            border-b
            border-border
            bg-background/80
            px-5
            backdrop-blur-xl
            sm:px-8
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <button
              type="button"
              onClick={() =>
                setMobileOpen(
                  true
                )
              }
              aria-label="Open admin navigation"
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
                transition-colors
                hover:border-primary/30
                hover:text-primary
                lg:hidden
              "
            >
              <PanelLeft
                size={18}
              />
            </button>

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
                Secure Administration
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-semibold
                "
              >
                Abdul Moiz Arsalan
              </p>
            </div>
          </div>

          <div
            className="
              rounded-full
              border
              border-success/20
              bg-success/5
              px-3
              py-2
            "
          >
            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.13em]
                text-success
              "
            >
              Authenticated
            </span>
          </div>
        </header>

        {/* =====================================================
            PAGE CONTENT
        ===================================================== */}

        <div
          className="
            px-5
            py-8
            sm:px-8
            lg:px-10
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}