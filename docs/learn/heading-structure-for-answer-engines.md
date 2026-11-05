---
title: "Heading Structure for AI Answer Engines"
description: "Write headings that AI answer engines can cite. Learn what aeo_question_headings, aeo_answer_after_question, aeo_section_length and five related checks test, and how to fix each one."
slug: heading-structure-for-answer-engines
date: 2026-11-05
updated: 2026-11-05
author: "findable team"
faq:
  - q: "What makes a heading AI-friendly?"
    a: "An AI-friendly heading is a question the reader would type, kept under 100 characters. The paragraph directly below it answers that question in 20 to 80 words."
  - q: "What does aeo_question_headings check?"
    a: "It looks for h2 or h3 text that starts with What, How, Why, When, Where, Who, or ends with a question mark. At least one such heading must be present to pass."
  - q: "What does aeo_answer_after_question check?"
    a: "Every question heading must be followed directly by a paragraph, not another heading or a list. If any question heading has no paragraph under it, the check fails."
  - q: "My section has 500 words. Does that hurt my score?"
    a: "Yes. aeo_section_length passes when the average across all sections is 350 words or fewer. Long sections are hard for a model to attribute to one heading. Break them up."
  - q: "Do h2 and h3 headings need id attributes?"
    a: "aeo_heading_anchors passes when at least half of your h2 and h3 elements have an id. The id lets AI tools link directly to the section instead of to the whole page."
---

# Heading structure for AI answer engines

A heading tells a search engine what the section is about. For an AI answer engine it does something more: it tells the model which question the next paragraph answers. If your heading is vague, the model cannot match the section to a user query. If your answer paragraph is too long, the model may skip it or truncate it badly.

findable runs seven checks on headings. This article explains each one, shows the passing bar, and gives a fix.

## Why headings matter more for AI than for search

A search engine reads the whole page and ranks it. An AI answer engine reads the whole page and then picks a passage to quote. The passage it picks is usually a short paragraph under a heading that matches the user's question.

That is why a question-shaped heading followed by a short answer paragraph is so valuable. The model can lift that unit out cleanly. A vague heading like "More information" does not match any query, so the paragraph under it is unlikely to be cited.

## aeo_question_headings

**What it checks:** At least one h2 or h3 on the page starts with What, How, Why, When, Where, or Who, or ends with a question mark.

**Why it matters:** Question headings directly match user queries. A heading that reads "How do I export a report?" is easy for a model to link to the query "how to export a report."

**How to fix it:** Rewrite at least one section heading as a genuine question. Keep it specific. "How do I X?" beats "Learn about X."

```html
<!-- Before -->
<h2>Export options</h2>

<!-- After -->
<h2>How do I export a report?</h2>
```

## aeo_answer_after_question

**What it checks:** Every question heading is followed directly by a `<p>` element. If any question heading has a subheading, another heading, or nothing at all as its next sibling, the check fails.

**Why it matters:** A question heading with no immediate paragraph leaves the model with nothing to quote. It has to skip to the next paragraph, which may be under a different topic.

**How to fix it:** Put a short, direct answer paragraph right after each question heading. Put lists, examples, and extra detail after that paragraph.

```html
<h2>How do I export a report?</h2>
<p>Open the report, click Export in the top right, choose a format and save.
The file downloads to your default folder.</p>
<ol>
  <li>Open the report.</li>
  <li>Click <strong>Export</strong>.</li>
  <li>Choose CSV or PDF.</li>
</ol>
```

## aeo_answer_length_ideal

**What it checks:** At least half of the answer paragraphs under question headings are between 20 and 80 words.

**Why it matters:** A paragraph under 20 words is too thin to quote on its own. A paragraph over 80 words may be trimmed or attributed to the wrong topic.

**How to fix it:** Aim for 40 to 70 words in the first paragraph under each question heading. That is two or three sentences that fully answer the question. Put longer explanation in a second paragraph or a list.

## aeo_section_length

**What it checks:** The average word count per section (text between two headings) is 350 words or fewer.

**Why it matters:** A very long section gives the model a large block of text with one label. It becomes hard to cite any part of it precisely. Shorter sections with specific headings let a model lift one clean passage per topic.

**How to fix it:** Split long sections. If a section runs to 600 words, find the natural break and add a new h3 for each sub-topic.

| Section length | Citability |
|---|---|
| Under 150 words | Easy to lift as a single quote |
| 150 to 350 words | Usually citable with the heading as context |
| Over 350 words | Model may cut mid-argument or skip |

## aeo_heading_length

**What it checks:** No h2 or h3 is longer than 100 characters.

**Why it matters:** A very long heading does not make a good anchor label. AI tools and search engines show headings as links or citations. At 120 characters a heading is already truncated in most displays.

**How to fix it:** Keep headings to one specific question or topic. If the heading needs two clauses to say what you mean, it may be two sections.

## aeo_heading_anchors

**What it checks:** At least half of your h2 and h3 elements have an `id` attribute.

**Why it matters:** An `id` creates a deep-link target. AI tools and search engines can cite `https://example.com/page#how-to-export` instead of just `https://example.com/page`. That direct link is more useful to the reader and shows the model exactly where the answer lives.

**How to fix it:** Add an `id` to every h2 and h3. Use the heading text, lowercased and hyphenated. Many static site generators do this automatically.

```html
<h2 id="how-do-i-export-a-report">How do I export a report?</h2>
```

## aeo_unique_headings

**What it checks:** No two headings on the page share the same text (requires at least two headings to run).

**Why it matters:** Duplicate heading text confuses both readers and models. If two sections are both called "Overview," neither one has a clear identity.

**How to fix it:** Give each section its own distinct heading. If two sections genuinely have the same label, merge them or be more specific.

## geo_intent_clarity

**What it checks:** At least two words from the page title (longer than three letters) appear in the first h1.

**Why it matters:** This is a GEO check, not an AEO check, but it completes the picture. The title is what a model indexes. The h1 is what a reader sees. When they share keywords, the model can be confident the h1 matches the title's claim.

**How to fix it:** Write the h1 as a natural restatement of the title. They do not need to be identical, but the main keywords should appear in both.

## How the checks work together

The checks are designed to be used together. A page that passes `aeo_question_headings` but fails `aeo_answer_after_question` has questions with no answers. A page that passes both but fails `aeo_section_length` has the right structure in a wall of text.

The ideal pattern for a citable section:

1. An h2 or h3 that asks a real question (passes `aeo_question_headings`).
2. A `<p>` element of 40 to 70 words directly after it (passes `aeo_answer_after_question` and `aeo_answer_length_ideal`).
3. Supporting lists or examples after the paragraph.
4. An `id` on the heading (passes `aeo_heading_anchors`).
5. The section staying under 350 words total (passes `aeo_section_length`).

Apply this pattern to every answer section and you give a model a clean, labeled, linkable passage for each topic on the page.

## Related checks in findable

- `aeo_toc_links`: pages over 800 words should have three or more in-page anchor links as a table of contents.
- `aeo_paragraph_length`: no paragraph should exceed 150 words.
- `aeo_list_after_heading`: a heading followed by a list (not a paragraph) passes this check separately.

See [every AEO check](/learn/aeo-checks) for the complete list.
