"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

import ThemeToggle from "@/components/ui/ThemeToggle";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Services",
    href: "/#services",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Reviews",
    href: "/#reviews",
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">

          {/* =====================================================
              LOGO / PERSONAL BRAND
          ====================================================== */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                border border-primary/30
                bg-primary/10
                text-sm font-bold text-primary
                transition-all duration-300
                group-hover:border-primary/70
                group-hover:shadow-[0_0_25px_var(--primary-glow)]
              "
            >
              AM
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-none text-foreground">
                Abdul Moiz
              </p>

              <p className="mt-1 text-xs text-muted">
                Full-Stack Developer
              </p>
            </div>
          </Link>


          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  rounded-lg
                  px-4 py-2
                  text-sm font-medium
                  text-foreground-secondary
                  transition-all duration-200
                  hover:bg-surface
                  hover:text-primary
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>


          {/* =====================================================
              DESKTOP ACTIONS
          ====================================================== */}
          <div className="hidden items-center gap-3 lg:flex">

            <ThemeToggle />

            <Link
              href="/order"
              className="
                group
                flex items-center gap-2
                rounded-xl
                [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                px-5 py-2.5
                text-sm font-semibold
                text-white
                shadow-[0_0_18px_var(--primary-glow)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_0_32px_var(--primary-glow)]
              "
            >
              Order a Website

              <ArrowUpRight
                size={16}
                className="
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>


          {/* =====================================================
              MOBILE HEADER ACTIONS
          ====================================================== */}
          <div className="flex items-center gap-2 lg:hidden">

            <ThemeToggle />

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((previousState) => !previousState)
              }
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                border border-border
                bg-surface
                text-foreground
                transition-all duration-200
                hover:border-primary/50
                hover:text-primary
              "
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </div>


      {/* =========================================================
          MOBILE DROPDOWN MENU
      ========================================================== */}
      {mobileMenuOpen && (
        <div
          className="
            border-t border-border
            bg-background/95
            backdrop-blur-xl
            lg:hidden
          "
        >
          <nav className="container-custom flex flex-col py-4">

            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="
                  rounded-xl
                  px-4 py-3
                  text-sm font-medium
                  text-foreground-secondary
                  transition-all duration-200
                  hover:bg-surface
                  hover:text-primary
                "
              >
                {item.label}
              </Link>
            ))}


            {/* Divider */}
            <div className="my-3 h-px bg-border" />


            {/* Mobile Order CTA */}
            <Link
              href="/order"
              onClick={closeMenu}
              className="
                flex items-center justify-between
                rounded-xl
                [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                px-4 py-3
                text-sm font-semibold
                text-white
                shadow-[0_0_18px_var(--primary-glow)]
                transition-all duration-300
                hover:shadow-[0_0_28px_var(--primary-glow)]
              "
            >
              Order a Website

              <ArrowUpRight size={17} />
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}