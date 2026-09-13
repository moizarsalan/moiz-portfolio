import {
  cookies,
} from "next/headers";

import {
  NextRequest,
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

  return apiUrl.replace(
    /\/+$/,
    ""
  );
}

export async function GET(
  request: NextRequest
) {
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
        message: "Unauthenticated.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const incomingParams =
      request.nextUrl.searchParams;

    const params =
      new URLSearchParams();

    const status =
      incomingParams.get(
        "status"
      );

    const search =
      incomingParams.get(
        "search"
      );

    const page =
      incomingParams.get(
        "page"
      );

    if (status) {
      params.set(
        "status",
        status
      );
    }

    if (search) {
      params.set(
        "search",
        search
      );
    }

    if (page) {
      params.set(
        "page",
        page
      );
    }

    const queryString =
      params.toString();

    const url =
      `${getLaravelApiUrl()}/admin/project-requests${
        queryString
          ? `?${queryString}`
          : ""
      }`;

    const response =
      await fetch(
        url,
        {
          method: "GET",

          headers: {
            Accept:
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          cache:
            "no-store",
        }
      );

    const contentType =
      response.headers.get(
        "content-type"
      );

    if (
      !contentType?.includes(
        "application/json"
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            `Laravel returned an unexpected response with status ${response.status}.`,
        },
        {
          status:
            response.status ||
            500,
        }
      );
    }

    const data =
      await response.json();

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      }
    );
  } catch (
    error
  ) {
    console.error(
      "Admin project requests proxy error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to load project requests.",
      },
      {
        status: 500,
      }
    );
  }
}