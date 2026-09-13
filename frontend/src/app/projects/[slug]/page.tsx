import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import ProjectCaseStudyClient from "@/components/projects/ProjectCaseStudyClient";

import {
  getProjectBySlug,
  projects,
} from "@/data/projects";

import {
  siteConfig,
} from "@/data/site";

/* =========================================================
   TYPES
========================================================= */

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   STATIC ROUTES
========================================================= */

export function generateStaticParams() {
  return projects.map(
    (project) => ({
      slug:
        project.slug,
    })
  );
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const {
    slug,
  } = await params;

  const project =
    getProjectBySlug(
      slug
    );

  if (!project) {
    return {
      title:
        "Project",
    };
  }

  const projectUrl =
    `${siteConfig.url}/projects/${project.slug}`;

  return {
    title:
      project.title,

    description:
      project.shortDescription,

    alternates: {
      canonical:
        `/projects/${project.slug}`,
    },

    openGraph: {
      type:
        "website",

      url:
        projectUrl,

      title:
        `${project.title} | Abdul Moiz Arsalan`,

      description:
        project.shortDescription,

      images: [
        {
          url:
            project.mainImage,

          alt:
            project.mainImageAlt,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        `${project.title} | Abdul Moiz Arsalan`,

      description:
        project.shortDescription,

      images: [
        project.mainImage,
      ],
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const {
    slug,
  } = await params;

  const project =
    getProjectBySlug(
      slug
    );

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-background">
      <ProjectCaseStudyClient
        project={
          project
        }
      />
    </main>
  );
}