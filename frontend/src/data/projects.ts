/* =========================================================
   PROJECT TYPES
========================================================= */

export type ProjectSection = {
  label: string;
  title: string;
  description: string;
};

export type Project = {
  slug: string;

  number: string;

  title: string;

  category: string;

  /*
    Used by the homepage cinematic project showcase.
  */
  headline: string;

  /*
    Deployment / project state used by homepage UI.
  */
  status: string;

  shortDescription: string;

  description: string;

  /*
    Existing homepage ProjectsDesktop / ProjectsMobile.
  */
  technologies: string[];

  /*
    /projects + case studies.
  */
  capabilities: string[];

  /*
    Project screenshot.
  */
  mainImage: string;

  mainImageAlt: string;

  /*
    Public deployed website.
  */
  liveUrl: string;

  sections: ProjectSection[];
};

/* =========================================================
   PROJECT DATA
========================================================= */

export const projects: Project[] = [
  /* =======================================================
     SAFAR PAKISTAN
  ======================================================= */

  {
    slug: "safar-pakistan",

    number: "01",

    title: "Safar Pakistan",

    category: "Travel Web Experience",

    headline:
      "Discover Pakistan through an interactive travel experience.",

    status: "Live",

    shortDescription:
      "An interactive travel website designed around discovering destinations across Pakistan.",

    description:
      "Safar Pakistan is an interactive travel-focused website created to present destinations through a modern, responsive and visually engaging web experience.",

    technologies: [
      "Frontend Development",
      "Responsive Design",
      "Interactive UI",
    ],

    capabilities: [
      "Frontend Development",
      "Responsive Design",
      "Interactive UI",
      "Travel Experience",
    ],

    mainImage:
      "/images/projects/safar-pakistan-main.webp",

    mainImageAlt:
      "Safar Pakistan interactive travel website",

    liveUrl:
      "https://moizarsalan.github.io/safar-pakistan/",

    sections: [
      {
        label: "01 / Direction",

        title:
          "Turning travel discovery into a visual web experience.",

        description:
          "Safar Pakistan was designed around exploration. The interface uses large visual sections, strong typography and destination-focused navigation to make discovering places across Pakistan feel more immersive.",
      },

      {
        label: "02 / Development",

        title:
          "Building the interface around exploration.",

        description:
          "The frontend was structured around responsive layouts, reusable interface elements and interactive navigation so the experience remains consistent across different screen sizes.",
      },

      {
        label: "03 / Outcome",

        title:
          "A focused digital experience for exploring Pakistan.",

        description:
          "The finished project combines travel content and visual storytelling within a modern web interface while providing a foundation that can continue to expand with more destinations and features.",
      },
    ],
  },

  /* =======================================================
     FINANCIAL DASHBOARD
  ======================================================= */

  {
    slug: "financial-dashboard",

    number: "02",

    title: "Financial Dashboard",

    category: "Data Interface",

    headline:
      "Financial data transformed into a clearer digital workspace.",

    status: "Live",

    shortDescription:
      "A financial dashboard designed to present revenue, expenses, projections and business performance through a structured interface.",

    description:
      "The Financial Dashboard is a data-focused web application built around presenting business and financial information through clear metrics, charts and structured navigation.",

    technologies: [
      "Dashboard UI",
      "Data Visualization",
      "Database Integration",
    ],

    capabilities: [
      "Dashboard Development",
      "Data Visualization",
      "Responsive Interface",
      "Database Integration",
    ],

    mainImage:
      "/images/projects/financial-dashboard-main.webp",

    mainImageAlt:
      "Financial performance dashboard displaying revenue expenses profit and business charts",

    liveUrl:
      "https://financial-dashboard-eight-teal.vercel.app/",

    sections: [
      {
        label: "01 / Direction",

        title:
          "Making financial information easier to understand.",

        description:
          "The interface was designed to keep important financial metrics immediately visible while separating revenue, expenses, projections and records into clear areas of the application.",
      },

      {
        label: "02 / Development",

        title:
          "Designing around information density.",

        description:
          "Financial information can quickly become difficult to scan, so the dashboard uses a structured hierarchy of summary cards, charts, navigation and detailed records to keep the experience readable.",
      },

      {
        label: "03 / Outcome",

        title:
          "A cleaner interface for data-driven workflows.",

        description:
          "The result is a dashboard experience that brings financial metrics, visualizations and business records into one consistent interface while remaining suitable for future expansion.",
      },
    ],
  },

  /* =======================================================
     LUMORA HILLS RESORT
  ======================================================= */

  {
    slug: "hill-resort-website",

    number: "03",

    title: "Lumora Hills Resort",

    category: "Hospitality Web Experience",

    headline:
      "A modern hospitality experience built around discovery and booking.",

    status: "Live",

    shortDescription:
      "A modern resort website combining visual presentation with accommodation discovery and a booking-oriented user journey.",

    description:
      "Lumora Hills Resort is a hospitality-focused website designed around presenting the resort, facilities and accommodation while providing visitors with a clear path toward booking their stay.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],

    capabilities: [
      "Frontend Development",
      "Responsive Design",
      "Booking Experience",
      "Hospitality Website",
    ],

    mainImage:
      "/images/projects/hill-resort-main.webp",

    mainImageAlt:
      "Lumora Hills Resort website homepage",

    liveUrl:
      "https://resort-site-flax.vercel.app/",

    sections: [
      {
        label: "01 / Direction",

        title:
          "Creating a digital experience around the stay.",

        description:
          "The visual direction was designed to communicate a calm resort experience while giving visitors immediate access to important information about the property.",
      },

      {
        label: "02 / Development",

        title:
          "Connecting presentation with booking intent.",

        description:
          "The website combines responsive content sections, facilities, gallery content and accommodation information with a booking-oriented flow so users can naturally move from discovery toward reservation.",
      },

      {
        label: "03 / Outcome",

        title:
          "A complete hospitality-focused frontend experience.",

        description:
          "The completed frontend provides a cohesive resort experience across desktop and mobile while creating a foundation for booking requests and additional backend functionality.",
      },
    ],
  },
];

/* =========================================================
   GET PROJECT BY SLUG
========================================================= */

export function getProjectBySlug(
  slug: string
) {
  return projects.find(
    (project) =>
      project.slug === slug
  );
}