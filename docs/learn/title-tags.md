---
title: "How to Write a Title Tag That Passes findable"
description: "Write one title tag per page, 30 to 60 characters, with your keyphrase early. See the checks title_exists, title_length, title_single and keyphrase_in_title."
slug: title-tags
date: 2026-11-11
updated: 2026-11-11
author: "findable team"
faq:
  - q: "Is 60 characters a hard limit for title tags?"
    a: "No. Google sets no fixed length limit and cuts titles to fit the device width. The 30 to 60 character range is a rule of thumb that findable scores, chosen because longer titles are usually cut in results."
  - q: "Why did Google change my title in search results?"
    a: "Google builds the headline it shows, called a title link, from your title tag and other signals. It rewrites titles that are half empty, out of date, inaccurate or boilerplate. Give every page a full, accurate title and Google has less reason to change it."
  - q: "Should my title tag and h1 say the same thing?"
    a: "They do not have to match word for word, but they should describe the same page. Google looks at both when it builds the title link, so a title about pricing and an h1 about shipping invite a rewrite."
  - q: "Do AI answer engines read my title tag?"
    a: "Often, yes. Perplexity documents a page title field in its search results that it returns as the source provided it. Treat your title as the likely label on a citation, but no engine promises to show it word for word."
  - q: "Can I add a second title tag for AI crawlers?"
    a: "No. The HTML standard allows exactly one title element per document. If you want a different title for sharing, use og:title, which is separate metadata, not a second title element."
---

# How to write a title tag that passes findable

The title tag is the headline of your page. It is usually the first thing a person reads in a search result, it sits in the browser tab, and it is the label most tools show when your page is cited. findable runs four checks on it.

## What does findable check about title tags?

| Check id | What it tests | Passes when |
| --- | --- | --- |
| `title_exists` | A title tag is present | The tag exists and has text |
| `title_length` | The length in characters | 30 to 60 characters |
| `title_single` | How many title tags there are | Zero or one, never two |
| `keyphrase_in_title` | Your focus keyphrase | The keyphrase appears in the title |

Three of these run on every audit. `keyphrase_in_title` only runs when you pass a keyphrase with `-k`, because without one there is nothing to look for.

## What does a good title tag look like?

One tag, inside `<head>`, naming the page and usually the site:

```html
<title>Title Tags: How Long, Where, and What to Avoid | Example Co</title>
```

Lead with what the page is about. Add a short brand at the end if it helps. The [HTML standard](https://html.spec.whatwg.org/multipage/semantics.html#the-title-element) is strict on one point: a document may contain at most one `title` element. A second one is invalid HTML, not a bonus signal.

## How long should a title be?

Short enough to survive the results page. Google [says](https://developers.google.com/search/docs/appearance/title-link) there is no fixed length limit, and that it shortens titles to fit the device width. So the cutoff is pixels, not characters, and it differs per screen.

The 30 to 60 range findable scores is a rule of thumb, like the 120 to 160 range for [meta descriptions](/learn/meta-descriptions). Most titles inside it fit. Under 30 usually wastes space. Way over 60 and your ending is the first thing cut.

Do not pad a short title to reach 30 characters. "Pricing" is a bad title because it says nothing about the site, not because of its length. "Pricing | Example Co" fixes both.

## Where does the title show up?

More places than the results page:

- The title link in a search result.
- The browser tab and saved bookmarks.
- Link previews in chat apps. These usually read `og:title` instead, so keep the two in sync. See [Open Graph and Twitter Cards](/learn/open-graph-share-cards).
- Citations in AI answer engines. Perplexity's [web search tool](https://docs.perplexity.ai/docs/agent-api/tools/web-search) returns a page title for each source, described as the title the source gave. No engine promises to show it verbatim, but a vague title makes a vague citation.

## Why does Google rewrite titles?

The headline in results is generated, and your `title` tag is the main input, not a command. The same [title link doc](https://developers.google.com/search/docs/appearance/title-link) lists when Google steps in:

- Half-empty titles, such as "Home" or "Profile".
- Out of date titles with an old year or an old product name.
- Inaccurate titles that do not match the page.
- Boilerplate repeated across many pages.
- Site names duplicated elsewhere in the result.

When Google rewrites, it may pull from your h1, `og:title` or prominent page text. The fix is the same either way: write a title that matches the page. That also means your h1 and title should agree on what the page is about, which is covered in [heading structure for answer engines](/learn/heading-structure-for-answer-engines).

## How do you get the keyphrase in?

Say the phrase people search for, once, near the front:

```sh
findable -k "ceramic mugs" https://example.com/mugs
```

If the phrase is missing, `keyphrase_in_title` fails. Do not chase it with stuffing. Google's guidance names keyword stuffing as a problem, and a title like "Mugs, Ceramic Mugs, Best Mugs, Cheap Mugs" reads as spam to people too. One clear mention is enough.

## Key takeaways

- One title tag per page, in the head. The HTML standard allows no more.
- 30 to 60 characters is the target findable scores. Google applies a pixel limit, not a character limit.
- Match the title to the h1 and the page, or expect a rewrite.
- Keep `og:title` in sync for chat previews.
- Put your keyphrase in once, early, and pass it with `-k` to test it.
