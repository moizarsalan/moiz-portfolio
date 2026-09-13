import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";

export const metadata: Metadata = {
  title: "Admin",

  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,

    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}