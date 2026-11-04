import { expect, test } from "bun:test";
import { suggestionAccess } from "../src/suggestion-access";

const token = `gg_ct_${"a".repeat(43)}`;
const env = {
  LONGPLAY_SUGGEST_FEATURE_ID: "11111111-1111-4111-8111-111111111111",
  LONGPLAY_BASE_URL: "https://billing.example",
  LONGPLAY_APP_ID: "app",
  LONGPLAY_ENVIRONMENT: "sandbox",
};
const request = () =>
  new Request("https://findable.page/api/suggest", { headers: { Authorization: `Bearer ${token}` } });
function fixture(allowed = true, kind = "access", failure = false) {
  const seen: unknown[] = [];
  return {
    seen,
    create: () => ({
      identify: (value: string) => {
        seen.push(value);
      },
      destroy: () => {
        seen.push("destroy");
      },
      checkEntitlement: async (input: unknown) => {
        seen.push(input);
        if (failure) throw new Error("secret");
        return { check: { allowed, kind } };
      },
    }),
  };
}
test("disabled deployments do not require credentials or initialize billing", async () => {
  const f = fixture();
  expect(await suggestionAccess(request(), {}, f.create)).toBeNull();
  expect(f.seen).toEqual([]);
});
test("requires a Customer token rather than a server credential or client-selected Customer ID", async () => {
  const f = fixture();
  const response = await suggestionAccess(
    new Request("https://findable.page/api/suggest", { headers: { Authorization: "Bearer gg_sk_example" } }),
    env,
    f.create,
  );
  expect(response?.status).toBe(401);
  expect(f.seen).toEqual([]);
});
test("checks the configured access Feature for the token identity and disposes credentials", async () => {
  const f = fixture();
  expect(await suggestionAccess(request(), env, f.create)).toBeNull();
  expect(f.seen).toEqual([
    token,
    { requirement: { internal_feature_id: env.LONGPLAY_SUGGEST_FEATURE_ID, quantity: "1", properties: {} } },
    "destroy",
  ]);
});
test("revoked access is payment-required without a public-cache response", async () => {
  const response = await suggestionAccess(request(), env, fixture(false).create);
  expect(response?.status).toBe(402);
  expect(response?.headers.get("cache-control")).toBe("no-store");
});
test("wrong Feature kind and service failure never grant access or expose details", async () => {
  for (const f of [fixture(true, "metered"), fixture(true, "access", true)]) {
    const response = await suggestionAccess(request(), env, f.create);
    expect(response?.status).toBe(503);
    expect(await response?.text()).not.toContain("secret");
    expect(f.seen.at(-1)).toBe("destroy");
  }
});
