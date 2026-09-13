"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  Send,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";

import {
  ReviewApiError,
  submitReview,
} from "@/lib/api/reviews";

type ReviewFormPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function ReviewFormPanel({
  open,
  onClose,
}: ReviewFormPanelProps) {
  const [rating, setRating] =
    useState(5);

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] =
    useState<string | null>(
      null
    );

  const [
    submittedReviewId,
    setSubmittedReviewId,
  ] =
    useState<number | null>(
      null
    );

  useEffect(() => {
    if (!open) {
      setSubmitted(false);

      setSubmitting(false);

      setSubmitError(null);

      setSubmittedReviewId(
        null
      );
    }

    document.body.style.overflow =
      open ? "hidden" : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [open]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const form =
      event.currentTarget;

    const formData =
      new FormData(form);

    setSubmitError(null);

    setSubmitting(true);

    try {
      const response =
        await submitReview({
          name: String(
            formData.get("name") ??
              ""
          ),

          email: String(
            formData.get("email") ??
              ""
          ),

          role: String(
            formData.get("role") ??
              ""
          ),

          company: String(
            formData.get(
              "company"
            ) ?? ""
          ),

          rating,

          review: String(
            formData.get(
              "review"
            ) ?? ""
          ),

          permissionToPublish:
            formData.has(
              "publicConsent"
            ),
        });

      setSubmittedReviewId(
        response.data.id
      );

      form.reset();

      setRating(5);

      setSubmitted(true);
    } catch (error) {
      if (
        error instanceof
        ReviewApiError
      ) {
        setSubmitError(
          error.message
        );
      } else {
        setSubmitError(
          "Something went wrong while submitting your review. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  function closePanel() {
    if (submitting) {
      return;
    }

    onClose();
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close review panel"
        onClick={closePanel}
        className={`
          fixed
          inset-0
          z-[80]
          bg-black/55
          backdrop-blur-sm
          transition-opacity
          duration-300

          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      <aside
        className={`
          fixed
          bottom-0
          right-0
          top-0
          z-[90]
          w-full
          max-w-[520px]
          overflow-y-auto
          border-l
          border-border
          bg-background/95
          shadow-2xl
          backdrop-blur-2xl
          transition-transform
          duration-500
          ease-out

          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        <div className="relative min-h-full p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.14]" />

          <div
            className="
              pointer-events-none
              absolute
              -right-28
              top-12
              h-72
              w-72
              rounded-full
              bg-primary/8
              blur-[100px]
            "
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-primary
                  "
                >
                  Client Feedback
                </p>

                <h2
                  className="
                    mt-3
                    text-3xl
                    font-bold
                    tracking-[-0.045em]
                    text-foreground
                  "
                >
                  Leave a review.
                </h2>
              </div>

              <button
                type="button"
                onClick={closePanel}
                disabled={submitting}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-border
                  bg-surface/60
                  text-muted
                  transition-all
                  hover:border-primary/40
                  hover:text-primary
                  disabled:pointer-events-none
                  disabled:opacity-40
                "
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            {!submitted ? (
              <form
                onSubmit={
                  handleSubmit
                }
                className="mt-9"
              >
                <div className="grid gap-5">
                  <Field
                    label="Your name"
                    name="name"
                    placeholder="John Smith"
                    required
                  />

                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="Role"
                      name="role"
                      placeholder="Founder"
                    />

                    <Field
                      label="Company"
                      name="company"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label
                      className="
                        text-xs
                        font-medium
                        text-foreground-secondary
                      "
                    >
                      Your rating
                    </label>

                    <div className="mt-3 flex gap-2">
                      {[
                        1,
                        2,
                        3,
                        4,
                        5,
                      ].map(
                        (value) => (
                          <button
                            key={
                              value
                            }
                            type="button"
                            disabled={
                              submitting
                            }
                            onClick={() =>
                              setRating(
                                value
                              )
                            }
                            aria-label={`${value} star rating`}
                            className="
                              transition-transform
                              duration-200
                              hover:-translate-y-1
                              disabled:pointer-events-none
                            "
                          >
                            <Star
                              size={
                                23
                              }
                              className={
                                value <=
                                rating
                                  ? "fill-primary text-primary"
                                  : "text-border-strong"
                              }
                            />
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="review"
                      className="
                        text-xs
                        font-medium
                        text-foreground-secondary
                      "
                    >
                      Review
                    </label>

                    <textarea
                      id="review"
                      name="review"
                      required
                      minLength={20}
                      maxLength={3000}
                      rows={6}
                      placeholder="Tell me about your experience working together..."
                      className="
                        mt-2
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-border
                        bg-surface/50
                        px-4
                        py-3
                        text-sm
                        leading-6
                        text-foreground
                        outline-none
                        transition-all
                        placeholder:text-muted/60
                        focus:border-primary/50
                        focus:shadow-[0_0_18px_var(--primary-glow)]
                      "
                    />
                  </div>

                  <label
                    className="
                      flex
                      cursor-pointer
                      items-start
                      gap-3
                      rounded-xl
                      border
                      border-border
                      bg-surface/35
                      p-4
                    "
                  >
                    <input
                      type="checkbox"
                      name="publicConsent"
                      className="mt-1"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck
                          size={14}
                          className="text-primary"
                        />

                        <span
                          className="
                            text-xs
                            font-semibold
                            text-foreground
                          "
                        >
                          Allow public display
                        </span>
                      </div>

                      <p
                        className="
                          mt-2
                          text-xs
                          leading-5
                          text-muted
                        "
                      >
                        Check this if
                        you agree that
                        your review may
                        appear publicly
                        on the portfolio
                        after approval.
                        You may still
                        submit feedback
                        without granting
                        public-display
                        permission.
                      </p>
                    </div>
                  </label>

                  {submitError && (
                    <div
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
                      role="alert"
                    >
                      <AlertTriangle
                        size={16}
                        className="
                          mt-0.5
                          shrink-0
                          text-red-400
                        "
                      />

                      <div>
                        <p
                          className="
                            text-xs
                            font-semibold
                            text-red-400
                          "
                        >
                          Unable to submit review
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            leading-5
                            text-muted
                          "
                        >
                          {
                            submitError
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      submitting
                    }
                    className="
                      group
                      mt-2
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
                    {submitting ? (
                      <>
                        Submitting

                        <LoaderCircle
                          size={15}
                          className="animate-spin"
                        />
                      </>
                    ) : (
                      <>
                        Submit Review

                        <Send
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
            ) : (
              <div
                className="
                  mt-16
                  rounded-[1.7rem]
                  border
                  border-primary/20
                  bg-primary/5
                  p-7
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
                    border-primary/30
                    bg-primary/10
                    text-primary
                  "
                >
                  <CheckCircle2
                    size={21}
                  />
                </div>

                <h3
                  className="
                    mt-6
                    text-2xl
                    font-bold
                    tracking-[-0.035em]
                    text-foreground
                  "
                >
                  Review received.
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-muted
                  "
                >
                  Your feedback has
                  been stored
                  successfully and is
                  now waiting for
                  approval. It will
                  only appear publicly
                  if public-display
                  permission was
                  granted and the
                  review is approved.
                </p>

                {submittedReviewId && (
                  <div
                    className="
                      mt-5
                      inline-flex
                      rounded-full
                      border
                      border-primary/20
                      bg-primary/5
                      px-3
                      py-2
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.14em]
                        text-primary
                      "
                    >
                      Review #
                      {
                        submittedReviewId
                      }
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={
                    closePanel
                  }
                  className="
                    mt-7
                    rounded-xl
                    border
                    border-border
                    bg-surface/50
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-foreground
                    transition-all
                    hover:border-primary/30
                    hover:text-primary
                  "
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          text-xs
          font-medium
          text-foreground-secondary
        "
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="
          mt-2
          w-full
          rounded-xl
          border
          border-border
          bg-surface/50
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
      />
    </div>
  );
}