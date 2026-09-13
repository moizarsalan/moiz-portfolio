"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  AlertTriangle,
  ArrowRight,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

export default function AdminLoginPage() {
  const router =
    useRouter();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    const form =
      event.currentTarget;

    const formData =
      new FormData(form);

    const email =
      String(
        formData.get("email") ?? ""
      ).trim();

    const password =
      String(
        formData.get("password") ?? ""
      );

    setError(null);
    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/admin/session",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ??
            "Unable to sign in."
        );
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-background
        px-5
        py-16
      "
    >
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.14]" />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/7
          blur-[150px]
        "
      />

      <section
        className="
          relative
          z-10
          w-full
          max-w-md
          overflow-hidden
          rounded-[2rem]
          border
          border-border
          bg-surface/45
          p-7
          shadow-2xl
          backdrop-blur-2xl
          sm:p-9
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-primary/25
            bg-primary/10
            text-primary
          "
        >
          <LockKeyhole
            size={20}
          />
        </div>

        <p
          className="
            mt-7
            font-mono
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-primary
          "
        >
          Private Administration
        </p>

        <h1
          className="
            mt-3
            text-3xl
            font-bold
            tracking-[-0.045em]
            text-foreground
          "
        >
          Admin access.
        </h1>

        <p
          className="
            mt-3
            text-sm
            leading-7
            text-muted
          "
        >
          Sign in to manage
          project requests, client
          feedback and portfolio
          operations.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >
          <div className="grid gap-5">
            <div>
              <label
                htmlFor="email"
                className="
                  text-xs
                  font-medium
                  text-foreground-secondary
                "
              >
                Admin email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background/50
                  px-4
                  py-3
                  text-sm
                  text-foreground
                  outline-none
                  transition-all
                  placeholder:text-muted/60
                  focus:border-primary/50
                  focus:shadow-[0_0_18px_var(--primary-glow)]
                "
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="
                  text-xs
                  font-medium
                  text-foreground-secondary
                "
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background/50
                  px-4
                  py-3
                  text-sm
                  text-foreground
                  outline-none
                  transition-all
                  placeholder:text-muted/60
                  focus:border-primary/50
                  focus:shadow-[0_0_18px_var(--primary-glow)]
                "
                placeholder="••••••••••••"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-red-500/25
                  bg-red-500/5
                  p-4
                "
              >
                <AlertTriangle
                  size={16}
                  className="
                    mt-0.5
                    shrink-0
                    text-red-400
                  "
                />

                <p
                  className="
                    text-xs
                    leading-5
                    text-red-300
                  "
                >
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                group
                mt-1
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_0_22px_var(--primary-glow)]
                disabled:pointer-events-none
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  Signing in

                  <LoaderCircle
                    size={15}
                    className="animate-spin"
                  />
                </>
              ) : (
                <>
                  Sign In

                  <ArrowRight
                    size={15}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </>
              )}
            </button>
          </div>
        </form>

        <p
          className="
            mt-6
            text-center
            font-mono
            text-[8px]
            uppercase
            tracking-[0.12em]
            text-muted
          "
        >
          Authorized access only
        </p>
      </section>
    </main>
  );
}