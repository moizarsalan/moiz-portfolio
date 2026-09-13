export type PublishedReview = {
  id: number;
  name: string;
  company: string | null;
  role: string | null;
  rating: number;
  review: string;
  published_at: string;
};

export type SubmitReviewData = {
  name: string;
  email: string;
  company: string;
  role: string;
  rating: number;
  review: string;
  permissionToPublish: boolean;
};

export type SubmitReviewResponse = {
  success: boolean;

  message: string;

  data: {
    id: number;
    status: string;
    created_at: string;
  };
};

type ReviewsResponse = {
  success: boolean;
  data: PublishedReview[];
};

type LaravelValidationErrors =
  Record<string, string[]>;

type ErrorResponse = {
  message?: string;
  errors?: LaravelValidationErrors;
};

export class ReviewApiError extends Error {
  status: number;

  errors?: LaravelValidationErrors;

  constructor(
    message: string,
    status: number,
    errors?: LaravelValidationErrors
  ) {
    super(message);

    this.name = "ReviewApiError";

    this.status = status;

    this.errors = errors;
  }
}

function getApiBaseUrl() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new ReviewApiError(
      "The portfolio API URL is not configured.",
      0
    );
  }

  return apiUrl.replace(
    /\/+$/,
    ""
  );
}

export async function submitReview(
  data: SubmitReviewData
): Promise<SubmitReviewResponse> {
  const apiBaseUrl =
    getApiBaseUrl();

  let response: Response;

  try {
    response = await fetch(
      `${apiBaseUrl}/reviews`,
      {
        method: "POST",

        headers: {
          Accept: "application/json",

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name: data.name.trim(),

          email: data.email.trim(),

          company:
            data.company.trim() ||
            null,

          role:
            data.role.trim() ||
            null,

          rating: data.rating,

          review:
            data.review.trim(),

          permission_to_publish:
            data.permissionToPublish,
        }),
      }
    );
  } catch {
    throw new ReviewApiError(
      "Unable to connect to the server. Please check your connection and try again.",
      0
    );
  }

  let result:
    | SubmitReviewResponse
    | ErrorResponse;

  try {
    result =
      await response.json();
  } catch {
    throw new ReviewApiError(
      "The server returned an invalid response.",
      response.status
    );
  }

  if (!response.ok) {
    const errorResult =
      result as ErrorResponse;

    let message =
      errorResult.message ||
      "Unable to submit your review.";

    if (errorResult.errors) {
      const firstError =
        Object.values(
          errorResult.errors
        )[0]?.[0];

      if (firstError) {
        message = firstError;
      }
    }

    throw new ReviewApiError(
      message,
      response.status,
      errorResult.errors
    );
  }

  return result as SubmitReviewResponse;
}

export async function getPublishedReviews(): Promise<
  PublishedReview[]
> {
  const apiBaseUrl =
    getApiBaseUrl();

  let response: Response;

  try {
    response = await fetch(
      `${apiBaseUrl}/reviews`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",
        },

        cache: "no-store",
      }
    );
  } catch {
    throw new ReviewApiError(
      "Unable to load client reviews.",
      0
    );
  }

  let result:
    | ReviewsResponse
    | ErrorResponse;

  try {
    result =
      await response.json();
  } catch {
    throw new ReviewApiError(
      "The server returned an invalid response.",
      response.status
    );
  }

  if (!response.ok) {
    const errorResult =
      result as ErrorResponse;

    throw new ReviewApiError(
      errorResult.message ||
        "Unable to load client reviews.",
      response.status,
      errorResult.errors
    );
  }

  return (
    result as ReviewsResponse
  ).data;
}