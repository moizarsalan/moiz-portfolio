"use client";

import type {
  ReactNode,
} from "react";

import {
  usePathname,
} from "next/navigation";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

import DesktopMessenger from "@/components/messaging/DesktopMessenger";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({
  children,
}: SiteShellProps) {
  const pathname =
    usePathname();

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith(
      "/admin/"
    );

  /*
   * Admin routes are intentionally isolated
   * from the public portfolio interface.
   */
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <SmoothScrollProvider>
      <Navbar />

      <div className="pt-20">
        {children}
      </div>

      <Footer />

      <DesktopMessenger />

      <div
        className="
          h-16
          lg:hidden
        "
        aria-hidden="true"
      />

      <MobileNav />
    </SmoothScrollProvider>
  );
}