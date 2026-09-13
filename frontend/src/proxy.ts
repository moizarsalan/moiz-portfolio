import type {
  NextRequest,
} from "next/server";

import {
  NextResponse,
} from "next/server";

const COOKIE_NAME =
  "portfolio_admin_token";

const LOGIN_PATH =
  "/admin/login";

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

/* =========================================================
   VERIFY ADMIN SESSION
========================================================= */

async function verifyAdminToken(
  token: string
) {
  try {
    const response =
      await fetch(
        `${getLaravelApiUrl()}/admin/me`,
        {
          method: "GET",

          headers: {
            Accept:
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.ok;
  } catch {
    return false;
  }
}

/* =========================================================
   CLEAR INVALID COOKIE
========================================================= */

function clearAdminCookie(
  response: NextResponse
) {
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

/* =========================================================
   ADMIN PROXY
========================================================= */

export async function proxy(
  request: NextRequest
) {
  const pathname =
    request.nextUrl.pathname;

  const token =
    request.cookies.get(
      COOKIE_NAME
    )?.value;

  /* ---------------------------------------------------------
     ADMIN LOGIN
  --------------------------------------------------------- */

  if (
    pathname ===
    LOGIN_PATH
  ) {
    /*
     * No existing session:
     * allow login page.
     */
    if (!token) {
      return NextResponse.next();
    }

    /*
     * Existing cookie:
     * verify it before redirecting.
     */
    const authenticated =
      await verifyAdminToken(
        token
      );

    if (authenticated) {
      return NextResponse.redirect(
        new URL(
          "/admin",
          request.url
        )
      );
    }

    /*
     * Invalid / expired cookie:
     * delete it and allow login.
     */
    const response =
      NextResponse.next();

    return clearAdminCookie(
      response
    );
  }

  /* ---------------------------------------------------------
     PROTECTED ADMIN ROUTES
  --------------------------------------------------------- */

  /*
   * No cookie at all.
   */
  if (!token) {
    const loginUrl =
      new URL(
        LOGIN_PATH,
        request.url
      );

    return NextResponse.redirect(
      loginUrl
    );
  }

  /*
   * Verify cookie against Laravel Sanctum.
   */
  const authenticated =
    await verifyAdminToken(
      token
    );

  if (!authenticated) {
    const loginUrl =
      new URL(
        LOGIN_PATH,
        request.url
      );

    const response =
      NextResponse.redirect(
        loginUrl
      );

    return clearAdminCookie(
      response
    );
  }

  return NextResponse.next();
}

/* =========================================================
   MATCHER
========================================================= */

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};