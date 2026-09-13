"use client";

import {
  ThemeProvider as NextThemesProvider,
} from "@teispace/next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({
  children,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      storage="hybrid"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}