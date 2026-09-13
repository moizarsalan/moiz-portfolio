"use client";

import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Code2,
  DatabaseZap,
  Globe2,
  Layers3,
  LoaderCircle,
  Save,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import type {
  ProjectBudget,
  ProjectOrderData,
  ProjectTimeline,
  ProjectType,
} from "@/types/order";

import {
  ProjectRequestApiError,
  submitProjectRequest,
} from "@/lib/api/projectRequests";

const STORAGE_KEY =
  "ama-project-order-draft";

const steps = [
  {
    number: "01",
    short: "Project",
    title: "What are we building?",
  },
  {
    number: "02",
    short: "Requirements",
    title: "What should it do?",
  },
  {
    number: "03",
    short: "Scope",
    title: "Define the project scope.",
  },
  {
    number: "04",
    short: "Contact",
    title: "How can I reach you?",
  },
  {
    number: "05",
    short: "Review",
    title: "Review your brief.",
  },
];

const projectTypes = [
  {
    value: "website" as const,
    title: "Business Website",
    description:
      "A modern website for a business, service, personal brand or organization.",
    icon: Globe2,
  },
  {
    value: "web-app" as const,
    title: "Web Application",
    description:
      "A functional web product with application logic, workflows and dynamic data.",
    icon: Layers3,
  },
  {
    value: "ecommerce" as const,
    title: "E-Commerce",
    description:
      "An online store with product discovery, cart, checkout and customer flows.",
    icon: ShoppingBag,
  },
  {
    value: "integration" as const,
    title: "API / Integration",
    description:
      "Connect an existing website or application with APIs, databases or services.",
    icon: DatabaseZap,
  },
];

const featureOptions = [
  "Responsive Design",
  "Animations",
  "Authentication",
  "Admin Dashboard",
  "Contact Forms",
  "Booking System",
  "Payment Flow",
  "Search / Filtering",
  "User Accounts",
  "Database",
  "REST API",
  "Third-Party Integration",
];

const budgetOptions: {
  value: ProjectBudget;
  label: string;
}[] = [
  {
    value: "under-500",
    label: "Under $500",
  },
  {
    value: "500-1000",
    label: "$500 – $1,000",
  },
  {
    value: "1000-2500",
    label: "$1,000 – $2,500",
  },
  {
    value: "2500-plus",
    label: "$2,500+",
  },
  {
    value: "not-sure",
    label: "Not sure yet",
  },
];

const timelineOptions: {
  value: ProjectTimeline;
  label: string;
}[] = [
  {
    value: "asap",
    label: "As soon as possible",
  },
  {
    value: "2-4-weeks",
    label: "2 – 4 weeks",
  },
  {
    value: "1-2-months",
    label: "1 – 2 months",
  },
  {
    value: "flexible",
    label: "Flexible",
  },
];

const initialData: ProjectOrderData = {
  projectType: "",

  projectName: "",
  projectDescription: "",

  features: [],
  customFeature: "",

  pages: "",
  hasExistingWebsite: false,
  existingWebsiteUrl: "",

  budget: "",
  timeline: "",

  name: "",
  email: "",
  company: "",

  additionalNotes: "",
};

export default function ProjectOrderForm() {
  const contentRef =
    useRef<HTMLDivElement>(null);

  const firstRender =
    useRef(true);

  const [step, setStep] =
    useState(0);

  const [data, setData] =
    useState<ProjectOrderData>(
      initialData
    );

  const [ready, setReady] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [
    submitError,
    setSubmitError,
  ] =
    useState<string | null>(
      null
    );

  const [
    submittedRequestId,
    setSubmittedRequestId,
  ] =
    useState<number | null>(
      null
    );

  useEffect(() => {
    const stored =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (stored) {
      try {
        const parsed =
          JSON.parse(stored);

        if (parsed?.data) {
          setData({
            ...initialData,
            ...parsed.data,
          });
        }

        if (
          typeof parsed?.step ===
          "number"
        ) {
          setStep(
            Math.min(
              parsed.step,
              steps.length - 1
            )
          );
        }

        /*
         * Do not restore old Phase-1
         * completed drafts unless they
         * have a real Laravel request ID.
         */
        if (
          parsed?.completed === true &&
          typeof parsed?.requestId ===
            "number"
        ) {
          setCompleted(true);

          setSubmittedRequestId(
            parsed.requestId
          );
        }
      } catch {
        // Ignore invalid saved draft.
      }
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        step,
        data,
        completed,
        requestId:
          submittedRequestId,
      })
    );
  }, [
    data,
    step,
    completed,
    ready,
    submittedRequestId,
  ]);

  useEffect(() => {
    if (
      firstRender.current
    ) {
      firstRender.current =
        false;

      return;
    }

    if (!contentRef.current) {
      return;
    }

    const elements =
      contentRef.current.querySelectorAll(
        ".order-step-reveal"
      );

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.045,
        duration: 0.45,
        ease: "power3.out",
      }
    );
  }, [
    step,
    completed,
  ]);

  function updateField<
    K extends keyof ProjectOrderData
  >(
    key: K,
    value: ProjectOrderData[K]
  ) {
    setData(
      (current) => ({
        ...current,
        [key]: value,
      })
    );

    setSubmitError(null);
  }

  function toggleFeature(
    feature: string
  ) {
    setData(
      (current) => ({
        ...current,

        features:
          current.features.includes(
            feature
          )
            ? current.features.filter(
                (item) =>
                  item !== feature
              )
            : [
                ...current.features,
                feature,
              ],
      })
    );

    setSubmitError(null);
  }

  function nextStep() {
    setSubmitError(null);

    if (
      step <
      steps.length - 1
    ) {
      setStep(
        (current) =>
          current + 1
      );

      return;
    }

    void finishBrief();
  }

  function previousStep() {
    if (
      step > 0 &&
      !submitting
    ) {
      setSubmitError(null);

      setStep(
        (current) =>
          current - 1
      );
    }
  }

  async function finishBrief() {
    if (submitting) {
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    try {
      const response =
        await submitProjectRequest(
          data
        );

      const requestId =
        response.data.id;

      setSubmittedRequestId(
        requestId
      );

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step,
          data,
          completed: true,
          requestId,
        })
      );

      setCompleted(true);
    } catch (error) {
      if (
        error instanceof
        ProjectRequestApiError
      ) {
        setSubmitError(
          error.message
        );
      } else {
        setSubmitError(
          "Something went wrong while submitting your project request. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  function startNewBrief() {
    window.localStorage.removeItem(
      STORAGE_KEY
    );

    setData(initialData);

    setStep(0);

    setCompleted(false);

    setSubmittedRequestId(
      null
    );

    setSubmitError(null);

    setSubmitting(false);
  }

  const progress =
    ((step + 1) /
      steps.length) *
    100;

  if (!ready) {
    return (
      <div
        className="
          flex
          min-h-[calc(100vh-5rem)]
          items-center
          justify-center
          bg-background
        "
      >
        <div
          className="
            h-7
            w-7
            animate-spin
            rounded-full
            border-2
            border-border
            border-t-primary
          "
        />
      </div>
    );
  }

  return (
    <div
      className="
        relative
        min-h-[calc(100vh-5rem)]
        overflow-hidden
        bg-background
        py-10
        lg:py-14
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          hero-grid
          opacity-[0.12]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          top-[5%]
          h-[480px]
          w-[480px]
          rounded-full
          bg-primary/6
          blur-[160px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-52
          bottom-[5%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-secondary/6
          blur-[170px]
        "
      />

      <div
        className="
          container-custom
          relative
          z-10
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Sparkles
                size={15}
                className="text-primary"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-primary
                  lg:text-xs
                "
              >
                Project Intake
              </span>
            </div>

            <h1
              className="
                mt-4
                text-4xl
                font-black
                leading-[0.96]
                tracking-[-0.055em]
                text-foreground
                sm:text-5xl
                lg:text-6xl
              "
            >
              Build the brief.

              <span
                className="
                  block
                  text-gradient
                "
              >
                I&apos;ll build the
                product.
              </span>
            </h1>
          </div>

          <div
            className="
              max-w-sm
              lg:text-right
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-muted
              "
            >
              Tell me what you&apos;re
              planning. Your answers
              create a structured project
              brief without requiring an
              account.
            </p>

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                lg:justify-end
              "
            >
              <Save
                size={12}
                className="text-success"
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
                Draft saved automatically
              </span>
            </div>
          </div>
        </div>

        <div
          className="
            mt-10
            overflow-hidden
            rounded-[2rem]
            border
            border-border
            bg-surface/30
            shadow-2xl
            backdrop-blur-xl
            lg:grid
            lg:min-h-[650px]
            lg:grid-cols-[280px_minmax(0,1fr)]
          "
        >
          <aside
            className="
              hidden
              border-r
              border-border
              bg-background/35
              p-6
              lg:flex
              lg:flex-col
            "
          >
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
                Project Brief
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-muted
                "
              >
                Complete the five stages.
              </p>
            </div>

            <div
              className="
                mt-8
                flex-1
              "
            >
              {steps.map(
                (
                  item,
                  index
                ) => {
                  const active =
                    index === step;

                  const complete =
                    index < step;

                  return (
                    <button
                      key={
                        item.number
                      }
                      type="button"
                      disabled={
                        submitting
                      }
                      onClick={() => {
                        if (
                          index <= step &&
                          !submitting
                        ) {
                          setSubmitError(
                            null
                          );

                          setStep(
                            index
                          );
                        }
                      }}
                      className="
                        relative
                        flex
                        w-full
                        items-center
                        gap-4
                        py-4
                        text-left
                        disabled:pointer-events-none
                      "
                    >
                      {index !==
                        steps.length -
                          1 && (
                        <div
                          className="
                            absolute
                            left-[17px]
                            top-[47px]
                            h-[34px]
                            w-px
                            bg-border
                          "
                        />
                      )}

                      <div
                        className={`
                          relative
                          z-10
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          font-mono
                          text-[8px]
                          transition-all
                          duration-300

                          ${
                            active
                              ? "border-primary/40 bg-primary/10 text-primary shadow-[0_0_18px_var(--primary-glow)]"
                              : complete
                                ? "border-success/30 bg-success/10 text-success"
                                : "border-border bg-background text-muted"
                          }
                        `}
                      >
                        {complete ? (
                          <Check
                            size={13}
                          />
                        ) : (
                          item.number
                        )}
                      </div>

                      <div>
                        <p
                          className={`
                            text-xs
                            font-semibold
                            transition-colors

                            ${
                              active
                                ? "text-foreground"
                                : "text-muted"
                            }
                          `}
                        >
                          {item.short}
                        </p>

                        <p
                          className="
                            mt-0.5
                            font-mono
                            text-[7px]
                            uppercase
                            tracking-[0.11em]
                            text-muted/60
                          "
                        >
                          Stage{" "}
                          {item.number}
                        </p>
                      </div>
                    </button>
                  );
                }
              )}
            </div>

            <div>
              <div
                className="
                  flex
                  items-center
                  justify-between
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.13em]
                "
              >
                <span className="text-muted">
                  Completion
                </span>

                <span className="text-primary">
                  {Math.round(
                    progress
                  )}
                  %
                </span>
              </div>

              <div
                className="
                  mt-3
                  h-px
                  overflow-hidden
                  bg-border
                "
              >
                <div
                  className="
                    h-full
                    transition-all
                    duration-500
                    [background:linear-gradient(90deg,var(--primary),var(--secondary))]
                  "
                  style={{
                    width:
                      `${progress}%`,
                  }}
                />
              </div>
            </div>
          </aside>

          <div
            className="
              border-b
              border-border
              px-5
              py-4
              lg:hidden
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.14em]
                    text-primary
                  "
                >
                  {
                    steps[step]
                      .number
                  }{" "}
                  / 0
                  {steps.length}
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-semibold
                    text-foreground
                  "
                >
                  {
                    steps[step]
                      .short
                  }
                </p>
              </div>

              <span
                className="
                  font-mono
                  text-[9px]
                  text-muted
                "
              >
                {Math.round(
                  progress
                )}
                %
              </span>
            </div>

            <div
              className="
                mt-3
                h-px
                overflow-hidden
                bg-border
              "
            >
              <div
                className="
                  h-full
                  transition-all
                  duration-500
                  [background:linear-gradient(90deg,var(--primary),var(--secondary))]
                "
                style={{
                  width:
                    `${progress}%`,
                }}
              />
            </div>
          </div>

          <div
            className="
              flex
              min-w-0
              flex-col
            "
          >
            <div
              ref={contentRef}
              className="
                flex-1
                px-5
                py-7
                sm:px-7
                lg:px-10
                lg:py-9
                xl:px-12
              "
            >
              {!completed ? (
                <>
                  <div
                    className="
                      order-step-reveal
                    "
                  >
                    <p
                      className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.17em]
                        text-primary
                      "
                    >
                      Stage{" "}
                      {
                        steps[step]
                          .number
                      }
                    </p>

                    <h2
                      className="
                        mt-3
                        text-3xl
                        font-bold
                        leading-[1]
                        tracking-[-0.045em]
                        text-foreground
                        lg:text-4xl
                      "
                    >
                      {
                        steps[step]
                          .title
                      }
                    </h2>
                  </div>

                  {step === 0 && (
                    <StepProject
                      data={data}
                      updateField={
                        updateField
                      }
                    />
                  )}

                  {step === 1 && (
                    <StepRequirements
                      data={data}
                      updateField={
                        updateField
                      }
                      toggleFeature={
                        toggleFeature
                      }
                    />
                  )}

                  {step === 2 && (
                    <StepScope
                      data={data}
                      updateField={
                        updateField
                      }
                    />
                  )}

                  {step === 3 && (
                    <StepContact
                      data={data}
                      updateField={
                        updateField
                      }
                    />
                  )}

                  {step === 4 && (
                    <StepReview
                      data={data}
                    />
                  )}
                </>
              ) : (
                <CompletedBrief
                  data={data}
                  requestId={
                    submittedRequestId
                  }
                  onReset={
                    startNewBrief
                  }
                />
              )}

              {submitError &&
                !completed && (
                  <div
                    className="
                      order-step-reveal
                      mt-6
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
                        Unable to submit brief
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-muted
                        "
                      >
                        {submitError}
                      </p>
                    </div>
                  </div>
                )}
            </div>

            {!completed && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-t
                  border-border
                  bg-background/35
                  px-5
                  py-4
                  sm:px-7
                  lg:px-10
                  xl:px-12
                "
              >
                <button
                  type="button"
                  onClick={
                    previousStep
                  }
                  disabled={
                    step === 0 ||
                    submitting
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-border
                    bg-surface/45
                    px-4
                    py-2.5
                    text-xs
                    font-medium
                    text-foreground
                    transition-all
                    hover:border-primary/30
                    hover:text-primary
                    disabled:pointer-events-none
                    disabled:opacity-30
                  "
                >
                  <ArrowLeft
                    size={14}
                  />

                  Back
                </button>

                <div
                  className="
                    hidden
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.13em]
                    text-muted
                    sm:block
                  "
                >
                  Changes saved automatically
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={submitting}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    [background:linear-gradient(135deg,var(--primary),var(--secondary))]
                    px-5
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    shadow-[0_0_20px_var(--primary-glow)]
                    disabled:pointer-events-none
                    disabled:opacity-60
                  "
                >
                  {submitting ? (
                    <>
                      Submitting

                      <LoaderCircle
                        size={14}
                        className="
                          animate-spin
                        "
                      />
                    </>
                  ) : (
                    <>
                      {step ===
                      steps.length -
                        1
                        ? "Finish Brief"
                        : "Continue"}

                      {step ===
                      steps.length -
                        1 ? (
                        <Check
                          size={14}
                        />
                      ) : (
                        <ArrowRight
                          size={14}
                          className="
                            transition-transform
                            group-hover:translate-x-1
                          "
                        />
                      )}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepProject({
  data,
  updateField,
}: {
  data: ProjectOrderData;

  updateField: <
    K extends keyof ProjectOrderData
  >(
    key: K,
    value: ProjectOrderData[K]
  ) => void;
}) {
  return (
    <div className="mt-8">
      <p
        className="
          order-step-reveal
          max-w-xl
          text-sm
          leading-7
          text-muted
        "
      >
        Select the option closest
        to your project. We can
        refine the exact technical
        scope later.
      </p>

      <div
        className="
          order-step-reveal
          mt-7
          grid
          gap-3
          sm:grid-cols-2
        "
      >
        {projectTypes.map(
          (type) => {
            const Icon =
              type.icon;

            const active =
              data.projectType ===
              type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  updateField(
                    "projectType",
                    type.value
                  )
                }
                className={`
                  group
                  relative
                  min-h-[155px]
                  rounded-[1.4rem]
                  border
                  p-5
                  text-left
                  transition-all
                  duration-300

                  ${
                    active
                      ? "border-primary/45 bg-primary/7 shadow-[0_0_24px_var(--primary-glow)]"
                      : "border-border bg-surface/35 hover:border-primary/25 hover:bg-surface/55"
                  }
                `}
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border

                      ${
                        active
                          ? "border-primary/35 bg-primary/10 text-primary"
                          : "border-border bg-background text-muted"
                      }
                    `}
                  >
                    <Icon
                      size={17}
                    />
                  </div>

                  <div
                    className={`
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      border

                      ${
                        active
                          ? "border-primary bg-primary text-background"
                          : "border-border"
                      }
                    `}
                  >
                    {active && (
                      <Check
                        size={11}
                      />
                    )}
                  </div>
                </div>

                <p
                  className="
                    mt-5
                    text-base
                    font-semibold
                    text-foreground
                  "
                >
                  {type.title}
                </p>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-5
                    text-muted
                  "
                >
                  {
                    type.description
                  }
                </p>
              </button>
            );
          }
        )}
      </div>

      <div
        className="
          order-step-reveal
          mt-7
          grid
          gap-5
        "
      >
        <FormField
          label="Project name"
          value={
            data.projectName
          }
          placeholder="e.g. Northstar Business Website"
          onChange={(value) =>
            updateField(
              "projectName",
              value
            )
          }
        />

        <TextAreaField
          label="Briefly describe the idea"
          value={
            data.projectDescription
          }
          placeholder="What are you trying to build and what should it achieve?"
          onChange={(value) =>
            updateField(
              "projectDescription",
              value
            )
          }
        />
      </div>
    </div>
  );
}

function StepRequirements({
  data,
  updateField,
  toggleFeature,
}: {
  data: ProjectOrderData;

  updateField: <
    K extends keyof ProjectOrderData
  >(
    key: K,
    value: ProjectOrderData[K]
  ) => void;

  toggleFeature: (
    feature: string
  ) => void;
}) {
  return (
    <div className="mt-8">
      <p
        className="
          order-step-reveal
          max-w-xl
          text-sm
          leading-7
          text-muted
        "
      >
        Select the functionality
        you already know the project
        needs. Nothing here
        permanently locks the scope.
      </p>

      <div
        className="
          order-step-reveal
          mt-7
          flex
          flex-wrap
          gap-2
        "
      >
        {featureOptions.map(
          (feature) => {
            const active =
              data.features.includes(
                feature
              );

            return (
              <button
                key={feature}
                type="button"
                onClick={() =>
                  toggleFeature(
                    feature
                  )
                }
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-3.5
                  py-2.5
                  text-xs
                  transition-all

                  ${
                    active
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-surface/40 text-foreground-secondary hover:border-primary/25"
                  }
                `}
              >
                {active && (
                  <Check
                    size={12}
                  />
                )}

                {feature}
              </button>
            );
          }
        )}
      </div>

      <div
        className="
          order-step-reveal
          mt-8
        "
      >
        <FormField
          label="Something else?"
          value={
            data.customFeature
          }
          placeholder="Add any functionality not listed above"
          onChange={(value) =>
            updateField(
              "customFeature",
              value
            )
          }
        />
      </div>
    </div>
  );
}

function StepScope({
  data,
  updateField,
}: {
  data: ProjectOrderData;

  updateField: <
    K extends keyof ProjectOrderData
  >(
    key: K,
    value: ProjectOrderData[K]
  ) => void;
}) {
  return (
    <div
      className="
        mt-8
        space-y-8
      "
    >
      <div
        className="
          order-step-reveal
          grid
          gap-5
          sm:grid-cols-2
        "
      >
        <FormField
          label="Estimated pages / screens"
          value={data.pages}
          placeholder="e.g. 5–8"
          onChange={(value) =>
            updateField(
              "pages",
              value
            )
          }
        />

        <div>
          <p
            className="
              text-xs
              font-medium
              text-foreground-secondary
            "
          >
            Existing website?
          </p>

          <div
            className="
              mt-2
              grid
              grid-cols-2
              gap-2
            "
          >
            {[
              {
                value: true,
                label: "Yes",
              },
              {
                value: false,
                label: "No",
              },
            ].map(
              (option) => (
                <button
                  key={
                    option.label
                  }
                  type="button"
                  onClick={() =>
                    updateField(
                      "hasExistingWebsite",
                      option.value
                    )
                  }
                  className={`
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-xs
                    font-medium
                    transition-all

                    ${
                      data.hasExistingWebsite ===
                      option.value
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border bg-surface/40 text-muted"
                    }
                  `}
                >
                  {option.label}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {data.hasExistingWebsite && (
        <div
          className="
            order-step-reveal
          "
        >
          <FormField
            label="Current website URL"
            value={
              data.existingWebsiteUrl
            }
            placeholder="https://example.com"
            type="url"
            onChange={(value) =>
              updateField(
                "existingWebsiteUrl",
                value
              )
            }
          />
        </div>
      )}

      <div
        className="
          order-step-reveal
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <CircleDollarSign
            size={14}
            className="text-primary"
          />

          <p
            className="
              text-xs
              font-medium
              text-foreground-secondary
            "
          >
            Approximate budget
          </p>
        </div>

        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-2
          "
        >
          {budgetOptions.map(
            (option) => (
              <button
                key={
                  option.value
                }
                type="button"
                onClick={() =>
                  updateField(
                    "budget",
                    option.value
                  )
                }
                className={`
                  rounded-xl
                  border
                  px-4
                  py-2.5
                  text-xs
                  transition-all

                  ${
                    data.budget ===
                    option.value
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-surface/40 text-muted hover:text-foreground"
                  }
                `}
              >
                {
                  option.label
                }
              </button>
            )
          )}
        </div>
      </div>

      <div
        className="
          order-step-reveal
        "
      >
        <p
          className="
            text-xs
            font-medium
            text-foreground-secondary
          "
        >
          Preferred timeline
        </p>

        <div
          className="
            mt-3
            grid
            gap-2
            sm:grid-cols-2
          "
        >
          {timelineOptions.map(
            (option) => (
              <button
                key={
                  option.value
                }
                type="button"
                onClick={() =>
                  updateField(
                    "timeline",
                    option.value
                  )
                }
                className={`
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-left
                  text-xs
                  transition-all

                  ${
                    data.timeline ===
                    option.value
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-surface/40 text-muted"
                  }
                `}
              >
                {option.label}

                <ChevronRight
                  size={13}
                />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function StepContact({
  data,
  updateField,
}: {
  data: ProjectOrderData;

  updateField: <
    K extends keyof ProjectOrderData
  >(
    key: K,
    value: ProjectOrderData[K]
  ) => void;
}) {
  return (
    <div
      className="
        mt-8
        grid
        gap-6
      "
    >
      <div
        className="
          order-step-reveal
          grid
          gap-5
          sm:grid-cols-2
        "
      >
        <FormField
          label="Your name"
          value={data.name}
          placeholder="Full name"
          onChange={(value) =>
            updateField(
              "name",
              value
            )
          }
        />

        <FormField
          label="Email"
          value={data.email}
          type="email"
          placeholder="you@example.com"
          onChange={(value) =>
            updateField(
              "email",
              value
            )
          }
        />
      </div>

      <div
        className="
          order-step-reveal
        "
      >
        <FormField
          label="Company / Brand"
          value={data.company}
          placeholder="Optional"
          onChange={(value) =>
            updateField(
              "company",
              value
            )
          }
        />
      </div>

      <div
        className="
          order-step-reveal
          rounded-[1.3rem]
          border
          border-primary/15
          bg-primary/5
          p-5
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-primary
              shadow-[0_0_8px_var(--primary)]
            "
          />

          <p
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.15em]
              text-primary
            "
          >
            Project Follow-Up
          </p>
        </div>

        <p
          className="
            mt-3
            max-w-xl
            text-xs
            leading-6
            text-muted
          "
        >
          After reviewing your
          project request, I&apos;ll
          contact you using the email
          address provided above.
        </p>
      </div>

      <div
        className="
          order-step-reveal
        "
      >
        <TextAreaField
          label="Anything else I should know?"
          value={
            data.additionalNotes
          }
          placeholder="References, technical requirements, ideas, questions or anything else..."
          onChange={(value) =>
            updateField(
              "additionalNotes",
              value
            )
          }
        />
      </div>
    </div>
  );
}

function StepReview({
  data,
}: {
  data: ProjectOrderData;
}) {
  const type =
    projectTypes.find(
      (item) =>
        item.value ===
        data.projectType
    )?.title ||
    "Not selected";

  const budget =
    budgetOptions.find(
      (item) =>
        item.value ===
        data.budget
    )?.label ||
    "Not specified";

  const timeline =
    timelineOptions.find(
      (item) =>
        item.value ===
        data.timeline
    )?.label ||
    "Not specified";

  return (
    <div className="mt-8">
      <div
        className="
          order-step-reveal
          rounded-[1.5rem]
          border
          border-primary/15
          bg-primary/5
          p-5
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <Code2
            size={15}
            className="text-primary"
          />

          <span
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.15em]
              text-primary
            "
          >
            Generated Project Brief
          </span>
        </div>

        <h3
          className="
            mt-4
            text-2xl
            font-bold
            tracking-[-0.035em]
            text-foreground
          "
        >
          {data.projectName ||
            "Untitled Project"}
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-muted
          "
        >
          {type}
        </p>
      </div>

      <div
        className="
          order-step-reveal
          mt-5
          grid
          gap-3
          sm:grid-cols-3
        "
      >
        <SummaryMetric
          label="Budget"
          value={budget}
        />

        <SummaryMetric
          label="Timeline"
          value={timeline}
        />

        <SummaryMetric
          label="Pages"
          value={
            data.pages ||
            "Not specified"
          }
        />
      </div>

      <div
        className="
          order-step-reveal
          mt-5
          grid
          gap-4
          lg:grid-cols-2
        "
      >
        <SummaryBlock
          label="Project"
          value={
            data.projectDescription ||
            "No project description provided."
          }
        />

        <SummaryBlock
          label="Client"
          value={
            data.name
              ? `${data.name}${
                  data.company
                    ? ` — ${data.company}`
                    : ""
                }`
              : "Contact details not provided."
          }
        />

        <SummaryBlock
          label="Features"
          value={
            [
              ...data.features,
              data.customFeature,
            ]
              .filter(Boolean)
              .join(", ") ||
            "No specific features selected."
          }
        />

        <SummaryBlock
          label="Contact"
          value={
            data.email
              ? `${data.email} · Email`
              : "No email provided."
          }
        />
      </div>

      <div
        className="
          order-step-reveal
          mt-6
          flex
          items-start
          gap-3
          rounded-xl
          border
          border-border
          bg-surface/35
          p-4
        "
      >
        <Save
          size={15}
          className="
            mt-0.5
            shrink-0
            text-primary
          "
        />

        <p
          className="
            text-xs
            leading-6
            text-muted
          "
        >
          Your draft is saved locally
          while you complete the form.
          When you finish the brief,
          it will be submitted securely
          to the Laravel backend and
          stored in the project database.
        </p>
      </div>
    </div>
  );
}

function CompletedBrief({
  data,
  requestId,
  onReset,
}: {
  data: ProjectOrderData;

  requestId:
    number | null;

  onReset: () => void;
}) {
  return (
    <div
      className="
        flex
        min-h-[520px]
        items-center
        justify-center
      "
    >
      <div
        className="
          max-w-xl
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[1.4rem]
            border
            border-primary/30
            bg-primary/10
            text-primary
            shadow-[0_0_30px_var(--primary-glow)]
          "
        >
          <CheckCircle2
            size={25}
          />
        </div>

        <p
          className="
            mt-7
            font-mono
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-primary
          "
        >
          Project Brief Ready
        </p>

        <h2
          className="
            mt-4
            text-4xl
            font-bold
            leading-[1]
            tracking-[-0.05em]
            text-foreground
          "
        >
          {data.projectName ||
            "Your project"}{" "}

          <span
            className="
              text-gradient
            "
          >
            is mapped out.
          </span>
        </h2>

        <p
          className="
            mx-auto
            mt-5
            max-w-lg
            text-sm
            leading-7
            text-muted
          "
        >
          Your project brief has been
          submitted successfully.
          I&apos;ll review the details
          and contact you using the
          email address you provided.
        </p>

        {requestId && (
          <div
            className="
              mx-auto
              mt-5
              inline-flex
              items-center
              rounded-full
              border
              border-primary/20
              bg-primary/5
              px-4
              py-2
            "
          >
            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-primary
              "
            >
              Request #{requestId}
            </span>
          </div>
        )}

        <div
          className="
            mt-8
            flex
            justify-center
          "
        >
          <button
            type="button"
            onClick={onReset}
            className="
              rounded-xl
              border
              border-border
              bg-surface/45
              px-5
              py-3
              text-sm
              font-medium
              text-foreground
              transition-all
              hover:border-primary/30
              hover:text-primary
            "
          >
            Start Another Brief
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;

  onChange: (
    value: string
  ) => void;
}) {
  return (
    <label
      className="
        block
      "
    >
      <span
        className="
          text-xs
          font-medium
          text-foreground-secondary
        "
      >
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(
          event: ChangeEvent<HTMLInputElement>
        ) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        className="
          mt-2
          w-full
          rounded-xl
          border
          border-border
          bg-surface/45
          px-4
          py-3
          text-sm
          text-foreground
          outline-none
          transition-all
          placeholder:text-muted/55
          focus:border-primary/45
          focus:shadow-[0_0_18px_var(--primary-glow)]
        "
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;

  onChange: (
    value: string
  ) => void;
}) {
  return (
    <label
      className="
        block
      "
    >
      <span
        className="
          text-xs
          font-medium
          text-foreground-secondary
        "
      >
        {label}
      </span>

      <textarea
        rows={4}
        value={value}
        onChange={(
          event: ChangeEvent<HTMLTextAreaElement>
        ) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        className="
          mt-2
          w-full
          resize-none
          rounded-xl
          border
          border-border
          bg-surface/45
          px-4
          py-3
          text-sm
          leading-6
          text-foreground
          outline-none
          transition-all
          placeholder:text-muted/55
          focus:border-primary/45
          focus:shadow-[0_0_18px_var(--primary-glow)]
        "
      />
    </label>
  );
}

function SummaryMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-border
        bg-surface/35
        p-4
      "
    >
      <p
        className="
          font-mono
          text-[7px]
          uppercase
          tracking-[0.14em]
          text-muted
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-sm
          font-semibold
          text-foreground
        "
      >
        {value}
      </p>
    </div>
  );
}

function SummaryBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-[1.3rem]
        border
        border-border
        bg-surface/35
        p-5
      "
    >
      <p
        className="
          font-mono
          text-[8px]
          uppercase
          tracking-[0.15em]
          text-primary
        "
      >
        {label}
      </p>

      <p
        className="
          mt-3
          text-sm
          leading-6
          text-foreground-secondary
        "
      >
        {value}
      </p>
    </div>
  );
}