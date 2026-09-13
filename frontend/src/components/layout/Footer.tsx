import Link from "next/link";

import {
  ArrowUpRight,
  Code2,
} from "lucide-react";

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
  {
    label: "Start a Project",
    href: "/order",
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/moizarsalan",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdul-moiz-arsalan-80913742b/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/alpha_aura.7?igsi=dDl4bG9kejVyMWhu",
  },
];

export default function Footer() {
  const year =
    new Date().getFullYear();

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-border
        bg-background
      "
    >
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.08]" />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          left-1/2
          h-96
          w-96
          -translate-x-1/2
          rounded-full
          bg-primary/5
          blur-[130px]
        "
      />

      <div className="container-custom relative z-10">

        {/* Main footer */}

        <div
          className="
            grid
            gap-12
            py-14
            lg:grid-cols-[1.15fr_0.55fr_0.55fr]
            lg:gap-20
            lg:py-16
          "
        >
          {/* Brand */}

          <div>

            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                  font-bold
                  text-white
                  shadow-[0_0_20px_var(--primary-glow)]
                "
              >
                AM
              </div>

              <div>

                <p
                  className="
                    text-sm
                    font-bold
                    tracking-[-0.02em]
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
                    tracking-[0.15em]
                    text-primary
                  "
                >
                  Full-Stack Web Developer
                </p>

              </div>
            </Link>

            <p
              className="
                mt-6
                max-w-md
                text-sm
                leading-7
                text-muted
              "
            >
              Building modern web products across frontend,
              backend, APIs and database integration.
            </p>

            <div
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-border
                bg-surface/40
                px-3
                py-2
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-success
                  shadow-[0_0_8px_var(--success)]
                "
              />

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-muted
                "
              >
                Available for remote projects
              </span>
            </div>

          </div>

          {/* Navigation */}

          <div>

            <p
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.17em]
                text-primary
              "
            >
              Navigate
            </p>

            <nav className="mt-5 space-y-3">

              {navigation.map(
                (item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="
                      group
                      flex
                      w-fit
                      items-center
                      gap-2
                      text-sm
                      text-muted
                      transition-colors
                      duration-300
                      hover:text-foreground
                    "
                  >
                    {item.label}

                    <ArrowUpRight
                      size={12}
                      className="
                        -translate-x-1
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    />
                  </Link>
                )
              )}

            </nav>

          </div>

          {/* Social */}

          <div>

            <p
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.17em]
                text-primary
              "
            >
              Connect
            </p>

            <div className="mt-5 space-y-3">

              {socials.map(
                (social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      group
                      flex
                      w-fit
                      items-center
                      gap-2
                      text-sm
                      text-muted
                      transition-colors
                      duration-300
                      hover:text-primary
                    "
                  >
                    {social.label}

                    <ArrowUpRight
                      size={12}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </a>
                )
              )}

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-border
            py-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-xs
              text-muted
            "
          >
            © {year} Abdul Moiz Arsalan. All rights reserved.
          </p>

          <div
            className="
              flex
              items-center
              gap-2
              font-mono
              text-[8px]
              uppercase
              tracking-[0.14em]
              text-muted
            "
          >
            <Code2
              size={12}
              className="text-primary"
            />

            Built with Next.js
          </div>

        </div>

      </div>
    </footer>
  );
}