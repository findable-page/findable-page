---
title: "Page Weight: How Much HTML Is Too Much for Search and AI"
description: "Googlebot stops fetching a page at 2 MB, and AI crawlers read the raw HTML you send. Learn the real crawl limits and the five findable page weight checks."
slug: html-page-weight
date: 2026-11-06
updated: 2026-11-06
author: "findable team"
faq:
  - q: "What is the maximum HTML size for Google?"
    a: "Googlebot crawls the first 2 MB of a supported file type per URL, and 64 MB of a PDF. Bytes past the cutoff are not fetched or indexed. findable recommends 500,000 bytes or fewer, which leaves room for growth."
  - q: "Does gzip compression help?"
    a: "For the cutoff, no. Google applies the file size limit to the uncompressed data. Compression speeds up the transfer, but the uncompressed HTML still has to fit the budget."
  - q: "Do AI crawlers render JavaScript?"
    a: "Not reliably. The docs for GPTBot, ClaudeBot and PerplexityBot do not promise rendering, and a 2024 Vercel and MERJ study measured no JavaScript execution for them. Put your text in the raw HTML."
  - q: "Is a large DOM a crawl limit too?"
    a: "No crawler stops at a node count. The 1,500 element figure comes from old Lighthouse performance guidance. findable keeps it as its dom_size ceiling because a lean tree is cheaper for every reader, program or human."
---

# Page weight: how much HTML is too much for search and AI

Your page has two kinds of readers: people with browsers, and programs on a byte budget. The people will wait. The programs stop reading at a limit you cannot negotiate. This post covers the real limits, why raw HTML weight matters more than it used to, and the findable checks that keep a page inside them.

## What happens when a page is too big?

Googlebot stops fetching a URL at a fixed cutoff. The current [Googlebot documentation](https://developers.google.com/search/docs/crawling-indexing/googlebot) says it crawls the first 2 MB of a supported file type per URL, and the first 64 MB of a PDF. Once the limit is reached, Googlebot stops the fetch and only the already downloaded part goes to indexing. Anything after the cutoff is dropped: not fetched, not rendered, not indexed.

Three details are easy to miss:

- The limit applies to **uncompressed** bytes. Gzipping the transfer helps speed, not the cutoff.
- The limit counts the HTML you send. The [2022 announcement of the older 15 MB rule](https://developers.google.com/search/blog/2022/06/googlebot-15mb) confirms data URIs count toward file size, since they sit inside the HTML.
- Referenced resources like CSS and JavaScript are fetched separately, each with its own budget. Slim HTML does not require slim images, but inlining everything turns one budget into none.

Google's [Inside Googlebot post](https://developers.google.com/search/blog/2026/03/crawler-blog-post) notes the limit may change over time. The 15 MB figure still applies as the default for Google crawlers that do not set their own limit. The safe reading: stay far below every limit, because the floor moves.

## Why raw HTML weight matters more now

AI crawlers read what your server sends. The reference pages for [OpenAI's bots](https://developers.openai.com/api/docs/bots), [ClaudeBot](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) and [PerplexityBot](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) document identity and robots.txt controls, but none of them promise JavaScript rendering. A [Vercel and MERJ study](https://vercel.com/blog/the-rise-of-the-ai-crawler) measured crawler traffic and found GPTBot, OAI-SearchBot, ClaudeBot and PerplexityBot did not execute JavaScript.

That means two things for weight. First, if your text only appears after a script runs, these readers see nothing, which is the bigger problem covered in [why AI answer engines skip your site](/learn/why-ai-answer-engines-skip-your-site). Second, every byte of inlined CSS, base64 images and embedded JSON sits in the same document as your words. A reader that stops at a byte cutoff stops inside your markup bloat, not your content.

## What does findable check?

Five checks in the SEO family watch page weight. All run on the raw HTML of the page you scan.

- `html_weight` - the HTML document is 500,000 bytes or fewer. That is a quarter of Googlebot's current 2 MB cutoff, with room for the limit to move.
- `dom_size` - under 1,500 elements. The figure comes from the classic Lighthouse ceiling; current [DOM size guidance](https://developer.chrome.com/docs/lighthouse/performance/dom-size/) warns around 800 and fails around 1,400 nodes. No crawler truncates at a node count, but a flat tree is cheaper to parse for every reader.
- `inline_css_size` - 20,000 bytes of inline CSS or fewer. Inline CSS rides inside the HTML byte budget on every request and defeats caching.
- `text_html_ratio` - at least 15% of the document is visible text. A page that is 95% markup gives readers little to use.
- `resource_hints` - third-party scripts and stylesheets are covered by `preconnect`, `preload`, `dns-prefetch`, `prefetch` or `modulepreload`. Hints do not shrink the HTML, but they cut the wait for the resources it points to.

These are part of the full [findable SEO checks](/learn/seo-checks) list.

## How do you slim a page?

Move CSS and JavaScript into separate cached files. Every byte you inline is re-sent with every page and counts against the HTML cutoff.

Replace base64 and data URIs with real files. The 2022 Google post is explicit that data URIs count toward HTML file size. Lazy-load images below the fold instead, as covered in [image alt text and lazy loading](/learn/image-alt-and-lazy-loading).

Cut inlined JSON state. A hydration payload with your whole database embedded is the fastest way past 2 MB while saying nothing visible.

Split very long pages. If one URL needs a table of contents for ten screens of content, the content probably wants to be several pages, each with its own clear answer.

Server-render your text. A thin HTML shell with client-side rendering fails `text_html_ratio` and `word_count` even when the byte count passes, because the words are not in the HTML the crawlers fetch.

## Does robots.txt have a size limit too?

Yes, same theme, different file. Google's [robots.txt specification](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt) enforces a 500 KiB limit and ignores content past it. A rules file that grows for years can quietly lose its tail. See [robots.txt and AI crawlers](/learn/robots-txt-ai-crawlers) for the rules themselves.

## Key takeaways

- Googlebot fetches the first 2 MB of a URL and drops the rest. The limit applies to uncompressed bytes, and it can move.
- AI crawlers do not promise JavaScript rendering, so your raw HTML is the whole page to them.
- findable's weight checks: `html_weight` at 500,000 bytes, `dom_size` under 1,500, `inline_css_size` under 20,000, `text_html_ratio` at 15% or more, and `resource_hints` covering third-party origins.
- Uninline CSS, drop data URIs, cut embedded JSON, split long pages, and server-render the words.
