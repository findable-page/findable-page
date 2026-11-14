---
title: "Internal Links and Anchor Text: How Pages Get Found"
description: "A page no other page links to stays invisible. See what Google documents about internal links and anchor text, plus the findable checks that test them."
slug: internal-links-anchor-text
date: 2026-11-14
updated: 2026-11-14
author: "findable team"
faq:
  - q: "How many internal links should a page have?"
    a: "Google names no ideal number. Its advice is practical: if you think a page has too many links, it probably does. findable uses a heuristic ceiling of 200 links per page in the links_count check, and wants at least 2 internal links in internal_links."
  - q: "Does rel=nofollow stop Google from crawling my internal pages?"
    a: "No. Since 2020 Google treats nofollow as a hint for crawling and indexing, not an instruction. To stop crawling use robots.txt. To keep a page out of the index use noindex."
  - q: "Do AI crawlers follow internal links?"
    a: "They can. OpenAI documents URL discovery through links, and Cloudflare describes hyperlink traversal as normal crawler behavior. Keep important links in the HTML so every crawler sees them, and see the separate robots.txt rules for each bot."
  - q: "Does a link to my own subdomain count as internal?"
    a: "No. findable compares hosts, so a link from example.com to shop.example.com counts as external. The external_links check wants at least one external link, so a subdomain link can satisfy it."
  - q: "Does anchor text affect my ranking?"
    a: "It is one signal. Anchor text tells Google what the linked page is about, and Google's spam policies call stuffing keywords into anchors a violation. Write anchors that describe the destination and stop there."
---

# Internal links and anchor text: how pages get found

A crawler lands on your home page and follows the links it finds. Every internal link is a path to another page on your site. A page that no other page links to, an orphan, waits to be found and often never is. This guide covers what Google documents about links, what AI crawlers do with them, and which findable checks test yours.

## Why do internal links matter so much?

Google states that it finds new pages mainly by following links from pages it already knows, as its [how search works](https://developers.google.com/search/docs/fundamentals/how-search-works) guide explains. Sitemaps help too, but links are the main road. Google's [link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) are explicit: every page you care about should be linked from at least one other page on your site.

Links also teach. The anchor text and the text around a link tell Google what the destination page is about. Good structure pays twice: pages get discovered, and Google learns what each page is. Site structure also feeds [sitelinks](https://developers.google.com/search/docs/appearance/sitelinks), the shortcuts Google sometimes shows under a result. You cannot pick sitelinks, but clear architecture and descriptive anchors help Google choose useful ones.

## What makes good anchor text?

Anchor text is the visible text inside the link. Google's guidance is simple: make it descriptive, reasonably concise and relevant to both pages. A good test comes straight from the docs: read the anchor on its own. If it tells you what the destination is, it is good.

Google's own example compares "list of cheese types" with "click here". The first describes the destination. The second could point anywhere. Google lists vague labels like "click here", "read more" and "website" as things to avoid.

Two more rules from the same page:

- For a linked image, the alt text is the anchor. See [image alt text](/learn/image-alt-and-lazy-loading).
- Do not stuff keywords into anchors. Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) name excessive keyword-rich anchors as a violation.

findable's `generic_anchor_text` check fails on anchors like "click here", "learn more", "here" and "this". Replace them with a few words that name the destination, such as "[FAQ schema guide](/learn/faq-schema-answer-engines)" instead of "learn more".

## How many links should a page have?

Google publishes no ideal number. The link best practices page gives a rule of thumb: if you think a page has too many links, it probably does. What matters is context, so each link should sit in text that earns it.

findable turns this into two checks. `links_count` wants 200 or fewer links on a page. `internal_links` wants at least 2 internal links, so a page that links nowhere on its own site reads as a dead end. `external_links` wants at least 1 external link, because a page that cites no source is weaker on trust too. The `geo_citations` check in the [GEO family](/learn/geo-checks) reads the same signal.

## What breaks a link for a crawler?

Three patterns stop a crawler from using a link, and all three have a findable check.

First, a `javascript:` href. Google states it can generally only crawl a link that is an `<a>` element with a real `href` URL. Buttons wired to script events, `span` tags and framework router attributes often do not count. The `javascript_hrefs` check fails these. Prefer plain `<a href="/pricing">` markup in the served HTML, not links injected only after scripts run.

Second, `rel="nofollow"` on your own links. Since 2020 Google treats nofollow as a hint for crawling and indexing, so it does not fence anything off. It is meant for links you cannot vouch for, as Google's [qualify outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) guide says. The `nofollow_internal` check fails any internal link marked nofollow, because a site should vouch for its own pages.

Third, a link with nothing to read. An empty href, or an anchor with no text, no label and no image, gives a crawler and a screen reader nothing to work with. `empty_hrefs` and `empty_anchor_text` fail these.

## Do AI crawlers use internal links too?

Yes, links are a discovery path for them as well. OpenAI's [bot documentation](https://platform.openai.com/docs/bots) describes finding URLs by crawling links, and separates `GPTBot`, which collects training data, from `OAI-SearchBot`, which fetches pages for search. Cloudflare's [guide to detecting AI crawlers](https://www.cloudflare.com/learning/ai/how-to-detect-which-ai-bots-crawl/) also describes hyperlink traversal as core crawler behavior. Whether a bot may fetch your pages at all is a robots.txt question, covered in [robots.txt and AI crawlers](/learn/robots-txt-ai-crawlers).

The practical lesson is the same for every crawler: keep the links that matter in the HTML you serve. Google can render JavaScript, but you should not assume every AI crawler does. View the source of your page and check that the navigation and contextual links are present without scripts. For Google's AI features, no special link markup exists; ordinary discoverability is what counts.

## Which findable checks cover links?

Nine checks in the [SEO family](/learn/seo-checks) look at links on the page.

| Check id | What it checks | Fix in one line |
| --- | --- | --- |
| `internal_links` | 2 or more internal links | Link related pages on your site |
| `external_links` | 1 or more external link | Cite a source outside your host |
| `links_count` | 200 or fewer links | Trim link-heavy footers and menus |
| `generic_anchor_text` | No "click here" style anchors | Name the destination in the anchor |
| `empty_anchor_text` | No links without text, label or image | Add text or an aria-label |
| `empty_hrefs` | No empty href attributes | Give every anchor a real URL |
| `javascript_hrefs` | No `javascript:` hrefs | Use real URL hrefs |
| `nofollow_internal` | No internal link marked nofollow | Remove nofollow from your own links |
| `link_noopener` | Every `target="_blank"` link has `rel="noopener"` | Add rel="noopener" |

Note that findable compares hosts, so a link to your own subdomain counts as external. Keep internal links pointed at one consistent URL form, as the [canonical tags guide](/learn/canonical-and-duplicate-content) explains.

## How do you fix an orphan page?

1. List the pages that matter in your sitemap.
2. For each one, check whether any other page on your site links to it. Search your own site for the URL.
3. Where a page has no incoming internal link, add one from the most relevant page, in the body text, not a buried footer.
4. Write an anchor that names the destination.
5. Keep the sitemap current as a second route, then rerun the audit. See [get findable in 15 minutes](/learn/findable-in-15-minutes).

## Key takeaways

- Google finds pages mainly by following links, and wants every page you care about linked from at least one other page.
- Anchor text should read well out of context. Never "click here".
- No link limits are official. findable's heuristic is 2 or more internal links, at least 1 external, 200 or fewer total.
- Serve real `<a href>` links in the HTML, keep nofollow off internal links, and let AI crawlers reach them with robots.txt rules you chose on purpose.
