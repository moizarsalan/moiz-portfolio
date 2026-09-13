export type MessagePayload = {
  name: string;

  email: string;

  subject?: string;

  message: string;

  /*
   * Invisible anti-bot field.
   */
  company_website?: string;
};

export type MessageResponse = {
  success: boolean;

  message: string;

  data?: {
    message_id:
      | number
      | null;
  };
};

export type MessageValidationErrors =
  Record<
    string,
    string[]
  >;

export class MessageApiError extends Error {
  errors?:
    MessageValidationErrors;

  status?: number;

  constructor(
    message: string,
    options?: {
      errors?:
        MessageValidationErrors;

      status?: number;
    }
  ) {
    super(
      message
    );

    this.name =
      "MessageApiError";

    this.errors =
      options?.errors;

    this.status =
      options?.status;
  }
}

function getApiUrl() {
  const apiUrl =
    process.env
      .NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new MessageApiError(
      "The messaging service is not configured."
    );
  }

  return apiUrl.replace(
    /\/+$/,
    ""
  );
}

export async function sendMessage(
  payload:
    MessagePayload
): Promise<MessageResponse> {
  let response:
    Response;

  try {
    response =
      await fetch(
        `${getApiUrl()}/messages`,
        {
          method:
            "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              name:
                payload.name.trim(),

              email:
                payload.email
                  .trim()
                  .toLowerCase(),

              subject:
                payload.subject
                  ?.trim() ||
                null,

              message:
                payload.message.trim(),

              company_website:
                payload
                  .company_website
                  ?.trim() ||
                "",
            }),
        }
      );
  } catch {
    throw new MessageApiError(
      "Unable to connect to the messaging service. Please try again."
    );
  }

  const contentType =
    response.headers.get(
      "content-type"
    );

  if (
    !contentType?.includes(
      "application/json"
    )
  ) {
    throw new MessageApiError(
      "The messaging service returned an unexpected response.",
      {
        status:
          response.status,
      }
    );
  }

  const result =
    await response.json();

  if (!response.ok) {
    /*
     * Laravel validation
     */
    if (
      response.status ===
      422
    ) {
      throw new MessageApiError(
        result.message ??
          "Please check the information you entered.",
        {
          status: 422,

          errors:
            result.errors,
        }
      );
    }

    /*
     * Rate limiter
     */
    if (
      response.status ===
      429
    ) {
      throw new MessageApiError(
        "Too many messages were sent. Please wait a few minutes and try again.",
        {
          status: 429,
        }
      );
    }

    throw new MessageApiError(
      result.message ??
        "Your message could not be sent.",
      {
        status:
          response.status,
      }
    );
  }

  return result as MessageResponse;
}