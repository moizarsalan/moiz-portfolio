export type ServiceNode = {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  primary?: boolean;
};

export type ServiceEdge = {
  from: string;
  to: string;
};

export type Service = {
  number: string;
  title: string;
  shortTitle: string;
  label: string;
  statement: string;
  description: string;
  deliverables: string[];
  nodes: ServiceNode[];
  edges: ServiceEdge[];
};

export const services: Service[] = [
  {
    number: "01",
    title: "Custom Websites",
    shortTitle: "Websites",
    label: "Frontend + Experience",
    statement: "Designed around your brand. Not a template.",
    description:
      "Modern responsive websites built around your content, identity and business goals with custom layouts, reusable components and intentional interaction design.",

    deliverables: [
      "Responsive UI",
      "Custom Components",
      "Motion",
      "Dynamic Routing",
      "Performance",
      "Modern UX",
    ],

    nodes: [
      {
        id: "idea",
        label: "Your Idea",
        sublabel: "01",
        x: 50,
        y: 12,
        primary: true,
      },
      {
        id: "layout",
        label: "Layout",
        sublabel: "structure",
        x: 23,
        y: 42,
      },
      {
        id: "components",
        label: "Components",
        sublabel: "reusable",
        x: 50,
        y: 42,
      },
      {
        id: "motion",
        label: "Motion",
        sublabel: "interaction",
        x: 77,
        y: 42,
      },
      {
        id: "responsive",
        label: "Responsive",
        sublabel: "all devices",
        x: 32,
        y: 76,
      },
      {
        id: "website",
        label: "Website",
        sublabel: "ready",
        x: 68,
        y: 76,
        primary: true,
      },
    ],

    edges: [
      { from: "idea", to: "layout" },
      { from: "idea", to: "components" },
      { from: "idea", to: "motion" },
      { from: "layout", to: "responsive" },
      { from: "components", to: "responsive" },
      { from: "components", to: "website" },
      { from: "motion", to: "website" },
      { from: "responsive", to: "website" },
    ],
  },

  {
    number: "02",
    title: "Full-Stack Web Apps",
    shortTitle: "Full-Stack",
    label: "Frontend + Backend + Data",
    statement: "The interface is only the beginning.",
    description:
      "Complete web applications where the frontend, server-side logic, APIs and persistent data work together as one maintainable product.",

    deliverables: [
      "Next.js",
      "Laravel / PHP",
      "REST APIs",
      "MySQL",
      "CRUD",
      "Server Logic",
    ],

    nodes: [
      {
        id: "browser",
        label: "Browser",
        sublabel: "client",
        x: 50,
        y: 10,
        primary: true,
      },
      {
        id: "next",
        label: "Next.js",
        sublabel: "frontend",
        x: 50,
        y: 31,
      },
      {
        id: "api",
        label: "REST API",
        sublabel: "request",
        x: 50,
        y: 52,
        primary: true,
      },
      {
        id: "laravel",
        label: "Laravel",
        sublabel: "backend",
        x: 28,
        y: 76,
      },
      {
        id: "mysql",
        label: "MySQL",
        sublabel: "database",
        x: 72,
        y: 76,
      },
    ],

    edges: [
      { from: "browser", to: "next" },
      { from: "next", to: "api" },
      { from: "api", to: "laravel" },
      { from: "api", to: "mysql" },
      { from: "laravel", to: "mysql" },
    ],
  },

  {
    number: "03",
    title: "E-Commerce",
    shortTitle: "Commerce",
    label: "Storefront + Customer Flow",
    statement: "From discovery to order.",
    description:
      "Online shopping experiences designed around product discovery, cart interaction, checkout flow and clear customer journeys across desktop and mobile.",

    deliverables: [
      "Product Pages",
      "Collections",
      "Cart",
      "Checkout UI",
      "Orders",
      "Responsive Store",
    ],

    nodes: [
      {
        id: "visitor",
        label: "Visitor",
        sublabel: "discover",
        x: 15,
        y: 50,
      },
      {
        id: "product",
        label: "Product",
        sublabel: "browse",
        x: 36,
        y: 28,
        primary: true,
      },
      {
        id: "cart",
        label: "Cart",
        sublabel: "review",
        x: 57,
        y: 50,
      },
      {
        id: "checkout",
        label: "Checkout",
        sublabel: "confirm",
        x: 78,
        y: 28,
      },
      {
        id: "order",
        label: "Order",
        sublabel: "complete",
        x: 84,
        y: 74,
        primary: true,
      },
      {
        id: "account",
        label: "Account",
        sublabel: "manage",
        x: 42,
        y: 76,
      },
    ],

    edges: [
      { from: "visitor", to: "product" },
      { from: "product", to: "cart" },
      { from: "cart", to: "checkout" },
      { from: "checkout", to: "order" },
      { from: "cart", to: "account" },
      { from: "account", to: "order" },
    ],
  },

  {
    number: "04",
    title: "API & System Integration",
    shortTitle: "Integration",
    label: "Connected Systems",
    statement: "Make every service communicate.",
    description:
      "Connecting websites and applications with APIs, databases and external services so information moves reliably across the complete system.",

    deliverables: [
      "API Integration",
      "Form Processing",
      "Data Exchange",
      "Authentication",
      "External Services",
      "Backend Connection",
    ],

    nodes: [
      {
        id: "core",
        label: "Core App",
        sublabel: "system",
        x: 50,
        y: 50,
        primary: true,
      },
      {
        id: "website",
        label: "Website",
        sublabel: "client",
        x: 16,
        y: 28,
      },
      {
        id: "api",
        label: "API",
        sublabel: "service",
        x: 84,
        y: 27,
      },
      {
        id: "database",
        label: "Database",
        sublabel: "data",
        x: 18,
        y: 76,
      },
      {
        id: "auth",
        label: "Auth",
        sublabel: "access",
        x: 82,
        y: 76,
      },
      {
        id: "external",
        label: "External",
        sublabel: "provider",
        x: 50,
        y: 12,
      },
    ],

    edges: [
      { from: "core", to: "website" },
      { from: "core", to: "api" },
      { from: "core", to: "database" },
      { from: "core", to: "auth" },
      { from: "core", to: "external" },
      { from: "api", to: "external" },
    ],
  },
];