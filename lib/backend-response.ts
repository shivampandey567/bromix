import { NextResponse } from "next/server";

export async function backendErrorResponse(response: Response, fallback: string) {
  const payload = await response.json().catch(() => ({})) as {
    message?: string;
    error?: string;
    errors?: Record<string, string>;
  };
  const fieldMessage = payload.errors ? Object.values(payload.errors)[0] : undefined;
  const message = payload.message || payload.error || fieldMessage || fallback;
  return NextResponse.json({ ...payload, message, error: message }, { status: response.status });
}

export function backendUnavailableResponse() {
  return NextResponse.json({ message: "Login service is unavailable. Please try again shortly.", error: "Login service is unavailable. Please try again shortly." }, { status: 503 });
}
