import { cookies } from "next/headers";

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

  return apiUrl.replace(/\/+$/, "");
}

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await context.params;

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
    const body =
      await request.json();

    const response =
      await fetch(
        `${getLaravelApiUrl()}/admin/messages/${id}/status`,
        {
          method: "PATCH",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body:
            JSON.stringify(
              body
            ),

          cache: "no-store",
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
  } catch {
    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to update message.",
      },
      {
        status: 500,
      }
    );
  }
}