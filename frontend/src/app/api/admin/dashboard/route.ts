import {
  cookies,
} from "next/headers";

import {
  NextResponse,
} from "next/server";

const COOKIE_NAME =
  "portfolio_admin_token";

function getLaravelApiUrl() {
  const apiUrl =
    process.env.LARAVEL_API_URL ??
    process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      "Laravel API URL is not configured."
    );
  }

  return apiUrl.replace(/\/+$/, "");
}

async function adminFetch(
  path: string,
  token: string
) {
  return fetch(
    `${getLaravelApiUrl()}${path}`,
    {
      method: "GET",

      headers: {
        Accept: "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      cache: "no-store",
    }
  );
}

/* =========================================================
   PAGINATION HELPERS
========================================================= */

function getPaginatorTotal(
  value: unknown
) {
  if (
    typeof value === "object" &&
    value !== null &&
    "total" in value &&
    typeof value.total === "number"
  ) {
    return value.total;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    Array.isArray(
      value.data
    )
  ) {
    return value.data.length;
  }

  return 0;
}

function getPaginatorItems(
  value: unknown
): unknown[] {
  if (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    Array.isArray(
      value.data
    )
  ) {
    return value.data;
  }

  return [];
}

function getPublicReviewsCount(
  result: unknown
) {
  if (
    typeof result !==
      "object" ||
    result === null ||
    !("data" in result)
  ) {
    return 0;
  }

  const data =
    result.data;

  if (
    Array.isArray(data)
  ) {
    return data.length;
  }

  return getPaginatorTotal(
    data
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

export async function GET() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      COOKIE_NAME
    )?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Unauthenticated.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const [
      projectsResponse,
      pendingProjectsResponse,
      inProgressProjectsResponse,

      reviewsResponse,
      pendingReviewsResponse,
      publicReviewsResponse,

      messagesResponse,
      unreadMessagesResponse,
    ] = await Promise.all([
      /* PROJECTS */

      adminFetch(
        "/admin/project-requests",
        token
      ),

      adminFetch(
        "/admin/project-requests?status=pending",
        token
      ),

      adminFetch(
        "/admin/project-requests?status=in-progress",
        token
      ),

      /* REVIEWS */

      adminFetch(
        "/admin/reviews",
        token
      ),

      adminFetch(
        "/admin/reviews?status=pending",
        token
      ),

      fetch(
        `${getLaravelApiUrl()}/reviews`,
        {
          method: "GET",

          headers: {
            Accept:
              "application/json",
          },

          cache: "no-store",
        }
      ),

      /* MESSAGES */

      adminFetch(
        "/admin/messages",
        token
      ),

      adminFetch(
        "/admin/messages?status=unread",
        token
      ),
    ]);

    const responses = [
      projectsResponse,
      pendingProjectsResponse,
      inProgressProjectsResponse,

      reviewsResponse,
      pendingReviewsResponse,
      publicReviewsResponse,

      messagesResponse,
      unreadMessagesResponse,
    ];

    /* =====================================================
       SESSION EXPIRED
    ===================================================== */

    if (
      responses.some(
        (response) =>
          response.status ===
          401
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Your admin session has expired.",
        },
        {
          status: 401,
        }
      );
    }

    /* =====================================================
       API FAILURE
    ===================================================== */

    if (
      responses.some(
        (response) =>
          !response.ok
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Unable to load dashboard data.",
        },
        {
          status: 502,
        }
      );
    }

    const [
      projectsResult,
      pendingProjectsResult,
      inProgressProjectsResult,

      reviewsResult,
      pendingReviewsResult,
      publicReviewsResult,

      messagesResult,
      unreadMessagesResult,
    ] = await Promise.all(
      responses.map(
        (response) =>
          response.json()
      )
    );

    /* =====================================================
       PAGINATORS
    ===================================================== */

    const projectsPaginator =
      projectsResult.data;

    const pendingProjectsPaginator =
      pendingProjectsResult.data;

    const inProgressProjectsPaginator =
      inProgressProjectsResult.data;

    const reviewsPaginator =
      reviewsResult.data;

    const pendingReviewsPaginator =
      pendingReviewsResult.data;

    const messagesPaginator =
      messagesResult.data;

    const unreadMessagesPaginator =
      unreadMessagesResult.data;

    /* =====================================================
       RECENT DATA
    ===================================================== */

    const recentProjectRequests =
      getPaginatorItems(
        projectsPaginator
      ).slice(
        0,
        5
      );

    const recentReviews =
      getPaginatorItems(
        reviewsPaginator
      ).slice(
        0,
        5
      );

    const recentMessages =
      getPaginatorItems(
        messagesPaginator
      ).slice(
        0,
        5
      );

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json({
      success: true,

      data: {
        counts: {
          /* PROJECTS */

          total_project_requests:
            getPaginatorTotal(
              projectsPaginator
            ),

          pending_project_requests:
            getPaginatorTotal(
              pendingProjectsPaginator
            ),

          in_progress_project_requests:
            getPaginatorTotal(
              inProgressProjectsPaginator
            ),

          /* REVIEWS */

          total_reviews:
            getPaginatorTotal(
              reviewsPaginator
            ),

          pending_reviews:
            getPaginatorTotal(
              pendingReviewsPaginator
            ),

          published_reviews:
            getPublicReviewsCount(
              publicReviewsResult
            ),

          /* MESSAGES */

          total_messages:
            getPaginatorTotal(
              messagesPaginator
            ),

          unread_messages:
            getPaginatorTotal(
              unreadMessagesPaginator
            ),
        },

        recent_project_requests:
          recentProjectRequests,

        recent_reviews:
          recentReviews,

        recent_messages:
          recentMessages,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to load dashboard data.",
      },
      {
        status: 500,
      }
    );
  }
}