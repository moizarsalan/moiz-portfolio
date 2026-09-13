import type {
  MetadataRoute,
} from "next";

import {
  projects,
} from "@/data/projects";

import {
  siteConfig,
} from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/order",
  ];

  const staticPages:
    MetadataRoute.Sitemap =
    staticRoutes.map(
      (route) => ({
        url:
          `${siteConfig.url}${route}`,

        lastModified:
          new Date(),

        changeFrequency:
          route === ""
            ? "weekly"
            : "monthly",

        priority:
          route === ""
            ? 1
            : route ===
                "/projects"
              ? 0.9
              : 0.8,
      })
    );

  const projectPages:
    MetadataRoute.Sitemap =
    projects.map(
      (project) => ({
        url:
          `${siteConfig.url}/projects/${project.slug}`,

        lastModified:
          new Date(),

        changeFrequency:
          "monthly",

        priority:
          0.8,
      })
    );

  return [
    ...staticPages,
    ...projectPages,
  ];
}