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

export async function POST() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      COOKIE_NAME
    )?.value;

  if (token) {
    try {
      await fetch(
        `${getLaravelApiUrl()}/admin/logout`,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          cache: "no-store",
        }
      );
    } catch {
      // Local session is still cleared
      // even if Laravel is unavailable.
    }
  }

  const response =
    NextResponse.json({
      success: true,
    });

  response.cookies.set(
    COOKIE_NAME,
    "",
    {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    }
  );

  return response;
}