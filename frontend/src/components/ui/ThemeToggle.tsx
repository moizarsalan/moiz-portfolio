"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@teispace/next-themes";
import { useHydrated } from "@teispace/next-themes/hooks/use-hydrated";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div
        className="
          h-10 w-10
          rounded-xl
          border border-border
          bg-surface
        "
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        group
        flex h-10 w-10
        items-center justify-center
        rounded-xl
        border border-border
        bg-surface
        text-foreground
        transition-all duration-300
        hover:border-primary/60
        hover:bg-surface-hover
        hover:text-primary
        hover:shadow-[0_0_18px_var(--primary-glow)]
      "
      aria-label={
        isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
      title={
        isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
    >
      {isDark ? (
        <Sun
          size={18}
          className="
            transition-transform
            duration-300
            group-hover:rotate-12
            group-hover:scale-110
          "
        />
      ) : (
        <Moon
          size={18}
          className="
            transition-transform
            duration-300
            group-hover:-rotate-12
            group-hover:scale-110
          "
        />
      )}
    </button>
  );
}