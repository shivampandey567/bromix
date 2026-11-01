export async function responseError(response: Response, fallback: string) {
  const payload = await response.json().catch(() => ({})) as {
    message?: string;
    error?: string;
    errors?: Record<string, string>;
  };
  return payload.message || payload.error || (payload.errors ? Object.values(payload.errors)[0] : undefined) || fallback;
}
