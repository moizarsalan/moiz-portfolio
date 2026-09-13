"use client";

import {
  useEffect,
  useRef,
} from "react";

import { usePathname } from "next/navigation";

import Lenis from "lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const lenisRef =
    useRef<Lenis | null>(null);

  const firstRouteRender =
    useRef(true);

  /* =========================================================
     DISABLE BROWSER SCROLL RESTORATION
  ========================================================= */

  useEffect(() => {
    if (
      !("scrollRestoration" in window.history)
    ) {
      return;
    }

    const previousValue =
      window.history.scrollRestoration;

    /*
      Prevent browser from restoring an old page
      scroll position when revisiting a route.
    */

    window.history.scrollRestoration =
      "manual";

    return () => {
      window.history.scrollRestoration =
        previousValue;
    };
  }, []);

  /* =========================================================
     INITIALIZE LENIS + GSAP
  ========================================================= */

  useEffect(() => {
    gsap.registerPlugin(
      ScrollTrigger
    );

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    /* ---------------------------------------------------------
       REDUCED MOTION
    --------------------------------------------------------- */

    if (prefersReducedMotion) {
      ScrollTrigger.refresh();

      return;
    }

    /* ---------------------------------------------------------
       LENIS

       0.78 keeps smooth scrolling but removes
       the heavier delayed feeling.
    --------------------------------------------------------- */

    const lenis =
      new Lenis({
        duration: 0.78,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      });

    lenisRef.current = lenis;

    /* ---------------------------------------------------------
       LENIS → SCROLLTRIGGER
    --------------------------------------------------------- */

    lenis.on(
      "scroll",
      ScrollTrigger.update
    );

    /* ---------------------------------------------------------
       GSAP TICKER → LENIS
    --------------------------------------------------------- */

    const updateLenis = (
      time: number
    ) => {
      lenis.raf(
        time * 1000
      );
    };

    gsap.ticker.add(
      updateLenis
    );

    gsap.ticker.lagSmoothing(
      0
    );

    /* ---------------------------------------------------------
       REFRESH ON RESIZE
    --------------------------------------------------------- */

    const handleResize =
      () => {
        ScrollTrigger.refresh();
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    requestAnimationFrame(
      () => {
        ScrollTrigger.refresh();
      }
    );

    /* ---------------------------------------------------------
       CLEANUP
    --------------------------------------------------------- */

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      gsap.ticker.remove(
        updateLenis
      );

      lenis.destroy();

      lenisRef.current =
        null;
    };
  }, []);

  /* =========================================================
     ROUTE SCROLL CONTROL
  ========================================================= */

  useEffect(() => {
    /*
      Skip the first render so we do not fight
      the browser during the initial application load.
    */

    if (
      firstRouteRender.current
    ) {
      firstRouteRender.current =
        false;

      return;
    }

    const hash =
      window.location.hash;

    /* =======================================================
       HASH NAVIGATION

       Examples:
       /#services
       /#reviews
    ======================================================= */

    if (hash) {
      const scrollToHash =
        () => {
          const id =
            decodeURIComponent(
              hash.replace(
                "#",
                ""
              )
            );

          const target =
            document.getElementById(
              id
            );

          if (!target) {
            return;
          }

          if (
            lenisRef.current
          ) {
            lenisRef.current.scrollTo(
              target,
              {
                offset: -80,
                immediate:
                  false,
              }
            );
          } else {
            target.scrollIntoView(
              {
                behavior:
                  "auto",
                block:
                  "start",
              }
            );
          }

          ScrollTrigger.refresh();
        };

      requestAnimationFrame(
        () => {
          requestAnimationFrame(
            scrollToHash
          );
        }
      );

      return;
    }

    /* =======================================================
       NORMAL ROUTES

       Always start at the top.
    ======================================================= */

    const resetToTop =
      () => {
        const html =
          document.documentElement;

        const previousBehavior =
          html.style
            .scrollBehavior;

        html.style.scrollBehavior =
          "auto";

        /* Browser scroll */

        window.scrollTo(
          0,
          0
        );

        /* Lenis scroll */

        if (
          lenisRef.current
        ) {
          lenisRef.current.scrollTo(
            0,
            {
              immediate:
                true,
            }
          );
        }

        html.style.scrollBehavior =
          previousBehavior;

        ScrollTrigger.update();
      };

    /* Immediate reset */

    resetToTop();

    /* After React route render */

    requestAnimationFrame(
      () => {
        resetToTop();

        requestAnimationFrame(
          () => {
            resetToTop();

            ScrollTrigger.refresh();
          }
        );
      }
    );

    /*
      Final safeguard against delayed browser
      or Next.js restoration.
    */

    const timeout =
      window.setTimeout(
        () => {
          resetToTop();

          ScrollTrigger.refresh();
        },
        80
      );

    return () => {
      window.clearTimeout(
        timeout
      );
    };
  }, [pathname]);

  return children;
}