import type {
  ProjectOrderData,
} from "@/types/order";

export type ProjectRequestResponse = {
  success: boolean;

  message: string;

  data: {
    id: number;
    status: string;
    created_at: string;
  };
};

type LaravelValidationErrors =
  Record<string, string[]>;

type ErrorResponse = {
  message?: string;
  errors?: LaravelValidationErrors;
};

export class ProjectRequestApiError extends Error {
  status: number;

  errors?: LaravelValidationErrors;

  constructor(
    message: string,
    status: number,
    errors?: LaravelValidationErrors
  ) {
    super(message);

    this.name =
      "ProjectRequestApiError";

    this.status =
      status;

    this.errors =
      errors;
  }
}

function getApiBaseUrl() {
  const url =
    process.env
      .NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new ProjectRequestApiError(
      "The portfolio API URL is not configured.",
      0
    );
  }

  return url.replace(
    /\/+$/,
    ""
  );
}

function createPayload(
  data: ProjectOrderData
) {
  return {
    project_type:
      data.projectType,

    project_name:
      data.projectName.trim(),

    project_description:
      data.projectDescription.trim(),

    features:
      data.features,

    custom_feature:
      data.customFeature.trim() ||
      null,

    pages:
      data.pages.trim() ||
      null,

    has_existing_website:
      data.hasExistingWebsite,

    existing_website_url:
      data.hasExistingWebsite
        ? data.existingWebsiteUrl.trim() ||
          null
        : null,

    budget:
      data.budget ||
      null,

    timeline:
      data.timeline ||
      null,

    name:
      data.name.trim(),

    email:
      data.email.trim(),

    company:
      data.company.trim() ||
      null,

    additional_notes:
      data.additionalNotes.trim() ||
      null,
  };
}

export async function submitProjectRequest(
  data: ProjectOrderData
): Promise<ProjectRequestResponse> {
  const apiBaseUrl =
    getApiBaseUrl();

  let response: Response;

  try {
    response =
      await fetch(
        `${apiBaseUrl}/project-requests`,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              createPayload(data)
            ),
        }
      );
  } catch {
    throw new ProjectRequestApiError(
      "Unable to connect to the server. Please check your connection and try again.",
      0
    );
  }

  let result:
    | ProjectRequestResponse
    | ErrorResponse;

  try {
    result =
      await response.json();
  } catch {
    throw new ProjectRequestApiError(
      "The server returned an invalid response.",
      response.status
    );
  }

  if (!response.ok) {
    const errorResult =
      result as ErrorResponse;

    let message =
      errorResult.message ||
      "Unable to submit the project request.";

    if (
      errorResult.errors
    ) {
      const firstError =
        Object.values(
          errorResult.errors
        )[0]?.[0];

      if (firstError) {
        message =
          firstError;
      }
    }

    throw new ProjectRequestApiError(
      message,
      response.status,
      errorResult.errors
    );
  }

  return result as ProjectRequestResponse;
}