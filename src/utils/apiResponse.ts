import { NextResponse } from "next/server";

// Expanded dictionary to include new status codes
const statusMessages: Record<number, string> = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Server Error",
};

export const apiResponse = (statusCode: number, data: any) => {
  const message = statusMessages[statusCode] || "Error";

  const body = {
    message: statusCode >= 400 ? "Error" : message,
    ...(typeof data === "object" ? data : { detail: data }),
  };

  return NextResponse.json(body, { status: statusCode });
};
