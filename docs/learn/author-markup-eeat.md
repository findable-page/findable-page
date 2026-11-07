---
title: "Author Markup and E-E-A-T: Show Engines Who Wrote Your Page"
description: "E-E-A-T lives in Google's rater guidelines, not its ranking code. See what author markup really does, what Google documents, and which findable checks test it."
slug: author-markup-eeat
date: 2026-11-07
updated: 2026-11-07
author: "findable team"
faq:
  - q: "Is E-E-A-T a ranking factor?"
    a: "No. Google says E-E-A-T itself is not a ranking factor, but its systems use many signals that identify content with good E-E-A-T. It weighs most on topics that affect money, health or safety."
  - q: "Does findable verify that my author is real?"
    a: "No. geo_author_schema only tests that Person author markup or an author name exists in schema. An audit can see the signal, not whether the credentials are true."
  - q: "Does author markup guarantee AI citations?"
    a: "No. The GEO paper found citations, statistics and quotations raised visibility in its benchmark. Author markup was not the headline finding. Treat it as plumbing, not a citation cheat code."
  - q: "Should the author be a Person or an Organization?"
    a: "Use Person when a human wrote the piece and Organization for company statements. findable passes geo_author_schema on a Person and geo_org_schema on an Organization type, so many sites do both."
  - q: "Does rel=author still work?"
    a: "No. Google ended Authorship support in web search in 2014. The documented path today is a visible byline plus Person author markup in JSON-LD."
---

# Author markup and E-E-A-T: show engines who wrote your page

Anonymous pages are hard to trust. A reader who sees a name, a bio and a date can judge who is talking. An engine tries to do the same thing in code. This post covers what Google actually documents about E-E-A-T and authors, what JSON-LD should carry, and which findable checks test it.

## What is E-E-A-T exactly?

E-E-A-T stands for Experience, Expertise, Authoritativeness and Trustworthiness. It is a framework defined in Google's [Search Quality Rater Guidelines](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t), the handbook human raters use to judge search results. The second E, Experience, was added in December 2022.

Two facts keep this honest. First, E-E-A-T is not a ranking factor. Google's [helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) says so directly: no single E-E-A-T score exists, but many signals help Google's automated systems find content with good E-E-A-T. Second, raters do not set rankings. Their ratings are feedback on whether the systems produce good results.

Trust is the most important member of the four. Google says the other three exist to build it, and it weighs most on topics that affect money, health or safety.

## What does Google document about authors?

Three things.

1. The "who": Google's [helpful content page](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) asks who created the content, and says to make that clear. It also warns that fabricated authorship, false credentials and fake AI personas make a page untrustworthy.
2. The markup: the [Article structured data docs](https://developers.google.com/search/docs/appearance/structured-data/article) tell you to mark up every author shown on the page as a `Person`, with a `name`, plus a `url` or `sameAs` that identifies that author, such as a bio page or profile.
3. The profile: if you link to an internal author page, Google documents [ProfilePage markup](https://developers.google.com/search/docs/appearance/structured-data/profile-page) for it, with a description and `sameAs` links to external profiles.

One dead end: the old `rel=author` Authorship program. Google ended it in 2014. It is not part of current guidance, and you should not wait for it to come back.

## What does an author look like in JSON-LD?

A `Person` with a name, a stable url and sameAs links:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Example headline",
  "author": {
    "@type": "Person",
    "name": "Jane Doe",
    "url": "https://example.com/authors/jane-doe",
    "sameAs": ["https://www.linkedin.com/in/janedoe"]
  }
}
```

The `sameAs` property is defined on [schema.org](https://schema.org/sameAs) as a URL of a reference page that unambiguously indicates the item's identity. In plain words: link profiles that are clearly the same person, and nothing else. A wrong match is worse than no match.

Google states the purpose of `author.url` and `sameAs` is to disambiguate authors. That is a modest, real benefit: it helps engines tell your Jane Doe apart from another Jane Doe. For the basics of JSON-LD blocks, see [JSON-LD schema basics](/learn/json-ld-schema-basics).

## Does authorship make AI engines cite you?

Not on its own, and it pays to be precise here.

The [GEO paper](https://arxiv.org/abs/2311.09735) by Aggarwal et al. tested what raises visibility in generative answers and reported gains of up to 40% in its benchmark. The winning moves were adding citations, statistics and quotations. Author markup was not the headline finding.

Google also says AI Overviews carry [no extra technical requirements](https://developers.google.com/search/docs/appearance/ai-features) beyond being indexed and eligible for a snippet in Search. Named authors are not a documented citation rule.

So the honest chain is indirect. Clear authorship builds trust with readers. Google documents author markup for disambiguation. And trust signals sit under E-E-A-T, which Google's systems approximate with many signals. Do it, but do not expect a byline to outrank facts worth quoting. For the wider picture, see [SEO vs AEO vs GEO](/learn/seo-vs-aeo-vs-geo).

## Which findable checks test authorship and trust?

Six checks in the GEO family, plus the shared JSON-LD checks. The full list lives in [every GEO check](/learn/geo-checks).

| Check id | What it checks | Fix in one line |
| --- | --- | --- |
| `geo_author_schema` | Person author markup or an author name in schema | Add author to your Article JSON-LD |
| `geo_author_credentials` | A visible "by" byline or an author in schema | Show a real byline near the title |
| `geo_org_schema` | An Organization or Business schema type | Declare Organization on the site |
| `geo_knowledge_graph` | At least one sameAs link in schema | Link your official profiles |
| `geo_trust` | Internal links to About and Contact | Link both from the page or footer |
| `geo_policy_links` | A link to a privacy or terms page | Link your legal pages |

Know the limit. These checks see whether a signal exists on the page. They cannot tell whether the credentials are true or the person is real. Only you can do that part, and Google's guidance is blunt that faking it is worse than skipping it.

## What is the quick fix list?

1. Put a real byline under the title, with a name a reader can search for.
2. Add the author to your article schema as a Person, with name and url.
3. Add sameAs links to profiles that are unambiguously yours.
4. Link About, Contact, privacy and terms pages so trust is one click away.
5. Keep the bio page consistent: same name, same facts, same links.

Then run findable and look for the six check ids above. A page that says who wrote it, when, and where to check them is a page engines can defend.
