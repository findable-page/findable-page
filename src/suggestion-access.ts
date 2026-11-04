import { createLongplay, type LongplayOptions } from "@tinkerlandai/longplay-sdk";

export interface SuggestionBillingEnv {
  LONGPLAY_SUGGEST_FEATURE_ID?: string;
  LONGPLAY_BASE_URL?: string;
  LONGPLAY_APP_ID?: string;
  LONGPLAY_ENVIRONMENT?: string;
}
interface AccessClient {
  identify(token: string): void;
  checkEntitlement(input: {
    requirement: { internal_feature_id: string; quantity: string; properties: Record<string, never> };
  }): Promise<{ check: { kind: string; allowed: boolean } }>;
  destroy(): void;
}

/** Same-origin AI endpoint admission. Free scans, reports and watch signups stay independent. */
export async function suggestionAccess(
  request: Request,
  env: SuggestionBillingEnv,
  createClient: (options: LongplayOptions) => AccessClient = createLongplay,
): Promise<Response | null> {
  if (!env.LONGPLAY_SUGGEST_FEATURE_ID) return null;
  const json = (status: number, error: string) =>
    new Response(JSON.stringify({ error }), {
      status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store", Vary: "Authorization" },
    });
  const token = /^Bearer (gg_ct_[A-Za-z0-9_-]{32,128})$/.exec(request.headers.get("authorization") ?? "")?.[1];
  if (!token) return json(401, "a customer session is required for AI suggestions");
  let client: AccessClient | undefined;
  try {
    if (
      !env.LONGPLAY_BASE_URL ||
      !env.LONGPLAY_APP_ID ||
      (env.LONGPLAY_ENVIRONMENT !== "sandbox" && env.LONGPLAY_ENVIRONMENT !== "live")
    )
      return json(503, "billing is not configured");
    client = createClient({
      baseUrl: env.LONGPLAY_BASE_URL,
      scope: { projectId: env.LONGPLAY_APP_ID, environment: env.LONGPLAY_ENVIRONMENT },
      timeoutMs: 5000,
    });
    client.identify(token);
    const { check } = await client.checkEntitlement({
      requirement: {
        internal_feature_id: env.LONGPLAY_SUGGEST_FEATURE_ID,
        quantity: "1",
        properties: {},
      },
    });
    if (check.kind !== "access") return json(503, "AI suggestions require an access Feature");
    return check.allowed ? null : json(402, "your plan does not include AI suggestions");
  } catch (error) {
    if (typeof error === "object" && error !== null && "status" in error && error.status === 401)
      return json(401, "the customer session has expired");
    return json(503, "could not verify AI suggestion access");
  } finally {
    client?.destroy();
  }
}
