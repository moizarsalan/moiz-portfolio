/* =========================================================
   PROJECT TYPE
========================================================= */

export type ProjectType =
  | "website"
  | "web-app"
  | "ecommerce"
  | "integration"
  | "";

/* =========================================================
   PROJECT BUDGET
========================================================= */

export type ProjectBudget =
  | "under-500"
  | "500-1000"
  | "1000-2500"
  | "2500-plus"
  | "not-sure"
  | "";

/* =========================================================
   PROJECT TIMELINE
========================================================= */

export type ProjectTimeline =
  | "asap"
  | "2-4-weeks"
  | "1-2-months"
  | "flexible"
  | "";

/* =========================================================
   PROJECT ORDER DATA
========================================================= */

export type ProjectOrderData = {
  /* Project */

  projectType: ProjectType;

  projectName: string;

  projectDescription: string;

  /* Requirements */

  features: string[];

  customFeature: string;

  /* Scope */

  pages: string;

  hasExistingWebsite: boolean;

  existingWebsiteUrl: string;

  budget: ProjectBudget;

  timeline: ProjectTimeline;

  /* Contact */

  name: string;

  email: string;

  company: string;

  /* Additional Information */

  additionalNotes: string;
};