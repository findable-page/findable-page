---
title: "Content Freshness: Show Google and AI Engines Your Page Is Current"
description: "Dates decide whether a page reads as current. See what Google documents about visible dates, datePublished and dateModified, and which findable checks test them."
slug: content-freshness
date: 2026-11-05
updated: 2026-11-05
author: "findable team"
faq:
  - q: "Does changing dateModified update my date in Google?"
    a: "Not by itself. Google estimates a page date from several signals and wants the visible date and the markup to match. It also does not promise to show any date."
  - q: "What does the geo_freshness check test?"
    a: "It passes when the page has a time element, a year from 2024 to 2029 in its text, or a schema dateModified. It is a pattern match that shows a signal exists, not that the date is true."
  - q: "Should every page show a visible date?"
    a: "Article-like pages should. Landing pages and evergreen product pages can skip them. The article date checks skip themselves when the page is not an article."
  - q: "Does sitemap lastmod help?"
    a: "Only when it is honest. Google says it uses lastmod when the value is consistently and verifiably accurate, and means a significant update, not a copyright-year bump."
  - q: "Do AI tools only cite fresh pages?"
    a: "No. In a large Ahrefs study the average cited page was still years old. Freshness is a relative advantage, strongest for time-sensitive topics."
---

# Content freshness: show Google and AI engines your page is current

A page with no date is a page an engine has to guess about. Google estimates when a page was published or updated, and may show that date in results. AI tools that cite pages also read dates as one signal of whether a page is still worth quoting. This post covers what is documented, what is folklore, and which findable checks test dates.

## Why do dates matter to search engines and AI tools?

Google's [publication dates guidance](https://developers.google.com/search/docs/appearance/publication-dates) says its systems use multiple factors to estimate a page date, because any single signal can be unreliable. When the estimate is useful, Google shows a date next to the result. A page that says "Updated March 2026" earns trust a dateless page cannot.

For AI citations, the evidence is thinner but points the same way. Ahrefs analyzed about 17 million cited URLs and [reported](https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/) that AI assistants cite somewhat fresher pages than Google's organic results, with the strongest recency preference in ChatGPT and little to none in AI Overviews. The same study found the average cited page was still years old. The lesson: dates help, stale facts hurt, and nothing here is a citation guarantee.

## What does Google actually document?

Three things, all in the [publication dates guide](https://developers.google.com/search/docs/appearance/publication-dates):

1. Show a prominent, clearly labeled visible date, such as "Published February 4, 2019" or "Last updated: Feb. 14, 2018".
2. Add structured data on a [CreativeWork](https://schema.org/CreativeWork) subtype such as Article or BlogPosting, with `datePublished` and `dateModified` in ISO format, ideally with a timezone.
3. Keep the visible date and the markup consistent, never use a future date, and date the page itself, not the event it describes.

Google also says it does not guarantee a date will appear, even when you follow all of this. See [JSON-LD schema basics](/learn/json-ld-schema-basics) for how to add the markup.

## Which date checks does findable run?

Six scored checks in the GEO family cover dates, plus one SEO schema check. The article checks skip themselves when the page is not an article, so a landing page is not punished for lacking a publish date.

| Check id | What it checks | Fix in one line |
| --- | --- | --- |
| `geo_freshness` | A time element, a recent year in text, or a schema dateModified | Show a real date somewhere |
| `geo_time_element` | A `<time>` tag is present | Wrap dates in `<time>` |
| `geo_date_published` | `datePublished` in schema or `article:published_time` | Declare the publish date |
| `geo_date_modified` | `dateModified` in schema or `article:modified_time` | Declare the modified date |
| `geo_modified_after_published` | Modified date is not earlier than publish date | Keep dates honest |
| `geo_visible_date` | A visible published or updated date in the text | Show the date to readers |
| `article_dates` | Article schema dates are valid ISO dates | Use ISO format in markup |

The full list with scores lives in [every GEO check](/learn/geo-checks).

## How should I mark dates in HTML?

Wrap visible dates in a `time` element with a machine-readable `datetime` attribute. It is valid HTML and makes the date unambiguous to any parser. Google does not document it as a date signal, but it does no harm and other readers use it.

```html
<p>Published <time datetime="2026-11-05">November 5, 2026</time></p>
```

In structured data, both properties together:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Example headline",
  "datePublished": "2026-11-05T08:00:00+06:00",
  "dateModified": "2026-11-05T09:20:00+06:00"
}
```

The meta tags `article:published_time` and `article:modified_time` count for findable too, and some platforms read them, but Google's [supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags) list does not include them. Schema markup is the documented path.

## Does bumping the date alone work?

No. Google's [sitemap docs](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) are blunt about `lastmod`: it is used when it is consistently and verifiably accurate, and it should reflect a significant update, not a trivial change like a copyright-year refresh. The same honesty applies to `dateModified`. Engines can compare claims against what actually changed, and a page that claims freshness it does not have is a trust problem, the same way a mismatched [canonical](/learn/canonical-and-duplicate-content) is.

Update the date when you update the facts. Then the signal and the page agree.

## What is the quick fix list?

1. Show a labeled visible date near the title, wrapped in `<time>`.
2. Add `datePublished` and `dateModified` in ISO format to your article schema.
3. Keep the visible date and the markup identical.
4. Update dates only with real changes, and fix what went stale while you are in there.

Then run findable and look for the checks above. For the wider picture of what makes a page worth citing, see [SEO vs AEO vs GEO](/learn/seo-vs-aeo-vs-geo).
