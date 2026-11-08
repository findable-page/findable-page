import { expect, test } from "bun:test";
import worker from "../src/index";

const get = (path: string) => worker.fetch(new Request(`https://findable.page${path}`));

test("WordPress page promotes current plugin through public route", async () => {
  const response = await get("/wordpress");
  const html = await response.text();
  expect(response.status).toBe(200);
  for (const text of [
    "editor sidebar",
    "site dashboard",
    "bulk",
    "Settings",
    "prefers-reduced-motion:reduce",
    'href="#install"',
    'aria-current="page"',
    'href="#content"',
    'loading="lazy"',
    "https://github.com/findable-page/findable-wp",
    'property="og:url" content="https://findable.page/wordpress"',
  ])
    expect(html).toContain(text);
  expect(html).not.toContain("Fix All prints");
  expect(html).toContain("does not inject head tags");
  expect(html).toContain("10 scans per minute per IP");
  expect(html).toContain("No packaged release is published yet.");
  expect(html).toContain("npm run build");
  expect(html.match(/<h1\b/g)).toHaveLength(1);
  expect(html).not.toContain("<script src=");
  expect(await (await get("/wordpress/")).text()).toBe(html);
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))
    expect(() => JSON.parse(block[1] ?? "")).not.toThrow();
});

test("WordPress promo is linked from home and indexed once", async () => {
  const home = await (await get("/")).text();
  expect(home).toContain('class="nav-link wp-nav" href="/wordpress"');
  expect(home).toContain("Meet Findable for WordPress");
  expect(home).not.toContain("Fix All");
  expect(
    (await (await get("/sitemap.xml")).text()).match(/<loc>https:\/\/findable.page\/wordpress<\/loc>/g),
  ).toHaveLength(1);
});
