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

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email and password are required.",
        },
        {
          status: 422,
        }
      );
    }

    const apiUrl =
      getLaravelApiUrl();

    const response = await fetch(
      `${apiUrl}/admin/login`,
      {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),

        cache: "no-store",
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,

          message:
            result.message ??
            "Unable to sign in.",
        },
        {
          status: response.status,
        }
      );
    }

    const token =
      result?.data?.token;

    if (
      typeof token !== "string" ||
      !token
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Authentication token was not returned by the server.",
        },
        {
          status: 500,
        }
      );
    }

    const nextResponse =
      NextResponse.json({
        success: true,

        data: {
          admin:
            result.data.admin,
        },
      });

    nextResponse.cookies.set(
      COOKIE_NAME,
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "strict",

        path: "/",

        maxAge: 60 * 60 * 12,
      }
    );

    return nextResponse;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to connect to the admin service.",
      },
      {
        status: 500,
      }
    );
  }
}