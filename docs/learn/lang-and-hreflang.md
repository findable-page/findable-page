---
title: "Multilingual Pages: lang and hreflang Done Right"
description: "One lang attribute and a reciprocal hreflang cluster tell engines which language version to serve. See what Google documents, what the spec says, and which findable checks test it."
slug: lang-and-hreflang
date: 2026-11-08
updated: 2026-11-08
author: "findable team"
faq:
  - q: "Does hreflang tell Google what language my page is in?"
    a: "No. Google states that hreflang does not determine the language of a page. It links equivalent pages, and Google detects the language with its own algorithms."
  - q: "Is x-default required?"
    a: "No. It is a reserved value for a fallback page, such as a language selector or an auto-redirecting homepage. You can leave it out."
  - q: "What happens if my page has no hreflang annotations?"
    a: "Nothing in findable. The hreflang checks skip themselves when there are no annotations. If you do use hreflang, the codes must be valid and the URLs absolute."
  - q: "Link tags, sitemap or HTTP headers: which should I use?"
    a: "Google treats all three methods the same and says using more than one adds no benefit. Pick the one that is easiest for you to keep correct."
  - q: "Can I use a region code alone, like US?"
    a: "No. Google warns that a country code by itself is invalid. The first code is always the language, and Google does not deduce language from a region."
---

# Multilingual pages: lang and hreflang done right

A page in German should say so, and its English twin should point at it. Two small pieces of markup do this job: the `lang` attribute on the `html` element, and `hreflang` annotations that link language versions together. Google documents both behaviors, screen readers depend on `lang`, and findable runs four checks that test them.

## What does lang do, and who reads it?

The `lang` attribute declares the page language as a [BCP 47](https://www.rfc-editor.org/rfc/rfc5646) tag such as `en` or `pt-BR`. The [HTML specification](https://html.spec.whatwg.org/multipage/dom.html) defines it, and it is not just for search engines:

- Screen readers use it to pick the right pronunciation. WCAG [requires](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page) a valid `lang` on the page language.
- Browsers use it for translation prompts and font and hyphenation choices.

```html
<html lang="en">
```

Keep it short and honest. `en` is fine when your page is plain English. A wrong value, such as `en` on a page written in Japanese, is worse than none, because tools trust the declaration.

## What is hreflang, and what does Google document?

hreflang is a set of annotations that connect equivalent pages in different languages or regions. Google's [localized versions guide](https://developers.google.com/search/docs/specialty/international/localized-versions) is the source for all of this:

1. Values are an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code, optionally plus an ISO 3166-1 Alpha 2 region code, such as `de`, `en-GB` or `es-MX`. Region alone is invalid.
2. Every version lists the full set of alternates, including itself, and every other version links back. These are two-way reciprocal links.
3. `x-default` is reserved for the page you want users whose language and region match nothing, such as a language selector. It takes no language code.
4. You can deliver the annotations as `link` elements in HTML, `Link` HTTP headers, or entries in an XML sitemap. Google treats the three methods the same, and using more than one adds no benefit.
5. hreflang does not determine the language of a page. Google detects language itself; the annotations only connect equivalents.

One more caution from the same guide: give each language version its own URL, and avoid forced redirects based on detected location, because they can block users and crawlers from reaching every version.

## Which findable checks test this?

Four checks, all in the SEO family. The hreflang checks skip themselves when a page has no annotations, so a single-language page is not punished.

| Check id | What it checks | Fix in one line |
| --- | --- | --- |
| `lang_attr` | The `html` element has a lang attribute | Add `lang="en"` or your language |
| `lang_valid` | The lang value looks like a language tag | Use BCP 47, such as `en` or `pt-BR` |
| `hreflang_valid` | hreflang codes match a known pattern | Use ISO 639-1 plus optional region |
| `hreflang_absolute` | hreflang URLs are absolute | Use full URLs, never relative |

See [every SEO check](/learn/seo-checks) for where these sit in the full list.

## How do the checks compare with Google's rules?

findable's `hreflang_valid` is looser than Google's documented support. The pattern in findable accepts a 2 or 3 letter language code, an optional 4 letter script subtag such as `Latn`, and a 2 letter or 3 digit region, so `sr-Latn-RS` and `es-419` both pass. Google's guide says it supports ISO 639-1 plus an optional ISO 3166-1 Alpha 2 region, and names `es-419` as not supported. A pass from findable shows the code is well-formed, not that every engine supports it. When in doubt, use the plain language code, or language plus a supported region.

The same logic applies to `lang_valid`. It checks the shape of the tag, not whether the language is real. `xx` passes, so a human still has to confirm the value is true.

## What does a correct cluster look like?

Three versions of one page, each listing all three, with absolute URLs. This is the German page's head; the English and Spanish pages carry the same three tags, pointing at the same set.

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/pricing" />
<link rel="alternate" hreflang="de" href="https://example.com/de/preise" />
<link rel="alternate" hreflang="es" href="https://example.com/es/precios" />
```

Common mistakes, all visible in Google's guide:

- Every version points at the language homepage instead of its own equivalent page.
- The cluster is one-way: page A lists B, but B does not list A.
- Relative URLs in `href`. Use absolute URLs; `hreflang_absolute` fails on anything that does not start with `http://` or `https://`.
- Annotations on a page whose content is a mix of languages. hreflang describes whole-page equivalents, not partial translations.

If each version also has a correct [canonical](/learn/canonical-and-duplicate-content) pointing at itself, the cluster stays clean. Canonicals and hreflang must agree: a canonical pointing at another language version fights the alternate set.

## What about AI crawlers?

hreflang is a Google Search feature, and no AI vendor documents using it. AI crawlers such as GPTBot and ClaudeBot simply fetch pages, so each language version still needs to be reachable on its own URL. See [robots.txt and AI crawlers](/learn/robots-txt-ai-crawlers) for how to check who may crawl yours. The `lang` attribute matters more broadly, because every browser, translator and screen reader reads it regardless of vendor.

## Key takeaways

- Set `lang` on the `html` element with a real BCP 47 tag. Screen readers need it and WCAG requires it.
- Use hreflang only for true whole-page equivalents, with absolute URLs and two-way links including self-reference.
- Plain language codes, or language plus region, are safest. Region alone is invalid.
- findable runs `lang_attr`, `lang_valid`, `hreflang_valid` and `hreflang_absolute`. The hreflang checks skip when there is nothing to validate.
- For the wider map of optimization families, see [SEO vs AEO vs GEO](/learn/seo-vs-aeo-vs-geo).
