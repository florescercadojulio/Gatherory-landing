export type WaitlistRequest = {
  email: string;
  locale: "en" | "es";
  source: "landing_home" | "landing_iphone";
  consent: boolean;
  website: string;
  campaign?: string;
};
export class WaitlistRequestError extends Error {
  readonly kind: "invalid" | "rate" | "unavailable";
  constructor(kind: "invalid" | "rate" | "unavailable") { super(kind); this.kind = kind; }
}

/** No cookies, referrer URL, analytics identity, or email in the query string. */
export async function joinWaitlist(endpoint: string, input: WaitlistRequest, options: {
  fetcher?: typeof fetch;
  signal?: AbortSignal;
} = {}) {
  const response = await (options.fetcher ?? fetch)(endpoint, {
    method: "POST",
    credentials: "omit",
    referrerPolicy: "no-referrer",
    headers: { "Content-Type": "application/json", "Accept-Language": input.locale },
    body: JSON.stringify({ ...input, email: input.email.trim().toLowerCase() }),
    signal: options.signal,
  });
  if (!response.ok) throw new WaitlistRequestError(response.status === 429 ? "rate" : response.status === 400 ? "invalid" : "unavailable");
  let result: unknown;
  try { result = await response.json(); } catch { throw new WaitlistRequestError("unavailable"); }
  if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true ||
    !("data" in result) || !result.data || typeof result.data !== "object" ||
    !("accepted" in result.data) || result.data.accepted !== true) throw new WaitlistRequestError("unavailable");
}

export function waitlistCampaign(url: string) {
  const value = new URL(url).searchParams.get("utm_campaign") ?? "";
  return /^[a-zA-Z0-9._-]{1,80}$/.test(value) ? value : undefined;
}
