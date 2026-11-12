---
title: "Internal Links and Anchor Text: Help Google and AI Engines Find Your Pages"
description: "Links are how crawlers find pages and what anchor text tells them. See what Google documents about crawlable links, orphan pages and nofollow, and which findable checks test them."
slug: internal-links-anchor-text
date: 2026-11-12
updated: 2026-11-12
author: "findable team"
faq:
  - q: "Is there an ideal number of internal links per page?"
    a: "No. Google says there is no magical number of links. Link what helps the reader, and keep the page under about 200 links, which is where findable's links_count check draws its heuristic line."
  - q: "Does putting a page in the sitemap count as linking it?"
    a: "No. A sitemap lists URLs. It does not create a clickable path through your site. Google says that when pages are properly linked, crawlers can usually discover most of a site without one. Link every important page in your HTML too."
  - q: "Should I add rel=nofollow to internal links to control crawl budget?"
    a: "No. Google has treated nofollow as a hint, not a command, since March 2020, and its older guidance already discouraged nofollow for internal PageRank sculpting. Reserve nofollow for external links you do not endorse."
  - q: "Will AI crawlers follow my JavaScript menu?"
    a: "Do not count on it. Google can render JavaScript, but studies of AI crawlers in 2024 and 2026 found they fetch scripts without running them, so links that only exist after rendering stay invisible. Put important links in the served HTML."
  - q: "What is an orphan page?"
    a: "A page with no internal links pointing to it from the rest of your site. It may still be indexed through a sitemap or old external links, but it is hard for crawlers and readers to reach. Link it from a relevant, reachable page."
---

# Internal Links and Anchor Text: Help Google and AI Engines Find Your Pages

You wrote the page. Now the crawlers have to find it. Links are still how that happens, for Google and for the AI crawlers behind answer engines. This post covers what is actually documented: crawlable links, anchor text, orphan pages, nofollow and what AI crawlers do with your links. Then it maps each idea to a findable check id.

## Why do links still matter so much?

Search engines discover pages by following links. Google's [sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) says it plainly: if your pages are properly linked, Google's crawlers can usually discover most of your site. A sitemap helps, but it supplements links, it does not replace them.

Google's [link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) add a rule people skip: make sure every page you care about is reachable from at least one other page. A page nothing links to is an orphan. It exists, but crawlers and readers have no path to it.

Links also carry meaning. The anchor text and the words around it tell both readers and crawlers what the destination page is about. See [SEO vs AEO vs GEO](/learn/seo-vs-aeo-vs-geo) for where this sits in the bigger picture.

## What makes a link crawlable?

A crawlable link is a plain anchor element with a real href. Google says it cannot reliably follow links built any other way.

```html
<a href="/learn/seo-checks">Every findable SEO check</a>
```

Three things break this, and findable checks all three:

- An anchor with an empty href fails `empty_hrefs`. It renders as a link and goes nowhere.
- A `javascript:` href fails `javascript_hrefs`. It may work in a browser, but crawlers do not run it.
- A link with no text, no aria-label and no image fails `empty_anchor_text`. Screen readers and crawlers both get nothing.

What about links JavaScript inserts after load? Google can render JavaScript, so it may find them. AI crawlers are a different story, covered below. The safe rule: important links belong in the HTML you serve. If robots and AI access are your next question, read [why AI answer engines skip your site](/learn/why-ai-answer-engines-skip-your-site) and [robots.txt for AI crawlers](/learn/robots-txt-ai-crawlers).

## What does good anchor text look like?

Google asks for anchor text that is descriptive, reasonably concise, and relevant to both the page linking and the page being linked. The words around the link count too. They give context before and after.

Compare these two:

```html
<p>To see all 98 checks, <a href="/learn/seo-checks">click here</a>.</p>
<p>To see all 98 checks, read <a href="/learn/seo-checks">every findable SEO check</a>.</p>
```

The second names the destination. That helps a person decide whether to click and helps a crawler classify the target page. The findable check `generic_anchor_text` fails on a short list of filler anchors: "click here", "here", "read more", "more", "learn more", "link", "this", "this link" and "click". It is an exact match on the whole anchor, so "read the full checklist" passes. The check is a nudge, not a judge.

Two more documented details. For an image link, Google uses the `alt` text as the anchor, so write a real alt attribute; see [image alt text and lazy loading](/learn/image-alt-and-lazy-loading). And if an anchor has no text at all, Google may fall back to its `title` attribute, but that is a fallback, not a plan.

Do not stuff anchors with keywords either. Google's spam policies call keyword stuffing a violation. Describe the page, then stop.

## What about orphan pages?

An orphan page has no internal links pointing to it. It may sit in your sitemap, it may even rank from old external links, but within your own site it is unreachable. New sites accumulate orphans by accident: a blog post published, linked from nothing, forgotten.

The fix is boring and effective. Every important page gets at least one link from a relevant, reachable page. Publish a post, link it from the related posts and the topic page. Add a page, link it from your navigation or a hub page. Then point those links at the URL you want indexed, which should be your canonical URL. See [canonical and duplicate content](/learn/canonical-and-duplicate-content).

findable runs on one page at a time, so it cannot see your whole site graph. It cannot name your orphans. What it can do is keep the links on each page real, crawlable and described, which is the raw material a site graph needs.

## Should internal links ever be nofollow?

Almost never. Google treats `nofollow`, `sponsored` and `ugc` as hints, not directives, a change it announced in 2019 and applied from March 2020. Its link guidance reserves these attributes for links you do not want to endorse, such as paid or user-generated external links. Google's own blog argued years ago against using nofollow on internal links to sculpt ranking, and that position has not walked back.

The findable check `nofollow_internal` fails when any internal link carries `rel=nofollow`. If you find one, the fix is to remove the attribute. If you genuinely do not want a page found, use `noindex` or robots.txt, not nofollow on your own links.

## How do AI crawlers treat links?

Here is what is documented, and what is not.

OpenAI runs separate crawlers: `OAI-SearchBot` surfaces sites in ChatGPT search results, while `GPTBot` collects content for model training. Perplexity documents `PerplexityBot` as the crawler that surfaces and links websites in Perplexity search results. You can allow the search crawlers and still block the training ones. What none of them publish is a traversal formula. Nobody outside those companies can promise "follow links to depth N and cite what you find."

The observational evidence points one way on JavaScript. A [Vercel and MERJ study](https://vercel.com/blog/the-rise-of-the-ai-crawler) from December 2024 measured AI crawlers fetching JavaScript files without executing them. A later [single-site experiment reported in August 2026](https://searchengineland.com/javascript-links-pages-invisible-ai-search-485228) found GPTBot discovering pages behind plain HTML links but not pages only reachable through JavaScript links, and after the site switched those links to HTML, hundreds of pages were crawled within days. One site, one period, no vendor guarantee. But it matches the boring advice: serve your links in HTML.

Google's [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) needs no special AI markup for its AI Overviews. It reads your pages with normal Search crawling. Good links feed that pipeline like they always have.

## How many links should a page have?

Google says there is no ideal number. That is the honest answer, and it is worth keeping, because link-count folklore is everywhere.

findable still draws a line. The `links_count` check warns above 200 links on a page. That is a heuristic about usability and crawl efficiency, not a documented threshold. A long directory page may legitimately carry more.

Two neighbouring checks set floors instead. `internal_links` wants at least 2 internal links, so a page connects to the rest of the site. `external_links` wants at least 1, and the GEO family builds on the same idea: `geo_citations` rewards external sources and `geo_source_diversity` wants 3 or more distinct external domains on articles. Never link out for the check alone. Link because the source backs a claim. See [every GEO check](/learn/geo-checks).

## Which findable checks test links?

| Check id | What it checks | Fix in one line |
| --- | --- | --- |
| `internal_links` | 2 or more internal links | Link related pages |
| `external_links` | 1 or more external link | Cite a source |
| `links_count` | 200 or fewer links | Trim link farms |
| `generic_anchor_text` | No "click here" style anchors | Name the destination |
| `empty_anchor_text` | Every link has text, label or image | Write the anchor |
| `empty_hrefs` | No empty href attributes | Give every link a target |
| `javascript_hrefs` | No javascript: hrefs | Use real URL hrefs |
| `nofollow_internal` | No internal rel=nofollow | Drop the attribute |
| `link_noopener` | External target="_blank" links carry rel="noopener" | Add the attribute |

All of these are pattern matches on one page's HTML. They cannot measure your site architecture, your click depth or whether anyone clicks. They keep the page honest so the architecture can work.

## Key takeaways

- Links are how crawlers find pages. Every page you care about needs at least one internal link pointing to it.
- A crawlable link is an anchor with a real href and real text. No javascript: hrefs, no empty anchors.
- Anchor text should name the destination. Replace "click here" with a description.
- Do not put nofollow on internal links. It is a hint, and Google never endorsed internal sculpting.
- AI crawlers do not reliably execute JavaScript, so serve important links in the HTML.
- A sitemap supplements links. It does not replace them.
