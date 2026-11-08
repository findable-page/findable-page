import { escapeHtml, faqLd, identityGraph, jsonLd, page } from "./learn";

export const wordpressEntry = {
  path: "/wordpress",
  title: "Findable for WordPress: SEO & AI search scores, right in your editor",
  description:
    "Meet your WordPress findability sidekick. Free SEO, AEO and GEO scores, editor fix advice, a site dashboard and background bulk scans. Open source, no account.",
};
const REPO = "https://github.com/findable-page/findable-wp";
const FAQ = [
  {
    q: "Is Findable really free?",
    a: "Yes. Every feature works without an account, payment or API key. The plugin is open source under GPLv2 or later. Requires WordPress 6.5 or newer and PHP 7.4 or newer.",
  },
  {
    q: "Does it change my content or head tags?",
    a: "No. Findable only reports scores and offers fix advice. You stay in charge of edits. Version 1.0 removed the prototype’s Fix All feature; it does not inject head tags or replace your existing SEO plugin.",
  },
  {
    q: "Can I scan drafts or a private staging site?",
    a: "The API fetches the live public permalink, not unsaved editor content. Publish or update first. Local sites, private networks and pages behind a login or bot challenge cannot be scanned by the hosted API.",
  },
  {
    q: "What data leaves WordPress?",
    a: "Scans send the public permalink, optional keyphrase and your site URL in the User-Agent to the configured API. Scans run when requested, during a bulk scan you started or with opt-in scan-on-publish. Connection tests and periodic translated check downloads also contact the API. Nothing is sent on activation; there is no telemetry or tracking.",
  },
  {
    q: "How does bulk scanning work?",
    a: "A WP-Cron background queue scans published posts, with progress, pause, resume and cancel. It paces requests and backs off on rate limits. The hosted API allows 10 scans per minute per IP, shared with other sites on the same server. WP-Cron needs site traffic or a real cron job to make progress.",
  },
  {
    q: "Can I use my own API endpoint?",
    a: "Yes. Run the Findable CLI with findable -serve and set its reachable URL in Findable Settings. See the plugin README for private-endpoint configuration. You can also choose post types, cache lifetime, bulk pace and opt-in scan-on-publish.",
  },
  {
    q: "Will a higher score guarantee rankings or AI citations?",
    a: "No. Findable checks signals in your page HTML. It does not query Google or AI products about your rankings or citations. Scores guide your next edit; they are not a promise of traffic.",
  },
];

const STYLE = `
:root{--bg:#fff;--text:#0F1222;--text-2:#3A3F5C;--accent:#4F2BFF;--accent-light:#EEEBFF;--amber:#FFB020;--ok:#0E7C4A;--border:#E6E8F0;--ink:#0F1222}
*{box-sizing:border-box}html{scroll-padding-top:2rem}body{max-width:none;margin:0;padding:0;color:var(--text);font:16px/1.6 ui-sans-serif,system-ui,sans-serif;background:var(--bg) radial-gradient(var(--border) 1px,transparent 1px) 0 0/24px 24px}
a{color:var(--accent)}:where(a,summary):focus-visible{outline:3px solid var(--accent);outline-offset:5px}h1,h2,h3,p{margin-top:0}h1{font-size:clamp(2.8rem,6.8vw,5.7rem);letter-spacing:-.055em;line-height:1.02;margin-bottom:1.5rem}h2{font-size:clamp(1.9rem,4vw,3rem);line-height:1.15;letter-spacing:-.035em}h3{font-size:1.3rem;line-height:1.3}p{color:var(--text-2)}nav,main,footer{width:min(1120px,100% - 2.5rem);margin:auto}nav{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;padding:1.25rem 0}nav a{margin:0;text-decoration:none;font-weight:700}nav div{display:flex;gap:1.25rem;flex-wrap:wrap}.brand{font-size:1.5rem;color:var(--text)}main>section{padding:4rem 0}.hero{display:grid;grid-template-columns:1.2fr 1fr;align-items:center;gap:3rem}.eyebrow{display:inline-block;background:var(--accent-light);color:var(--accent);font-size:.85rem;font-weight:800;padding:.35rem .8rem;border-radius:99px;margin-bottom:1rem}.lead{font-size:1.2rem;max-width:40rem}.actions{display:flex;flex-wrap:wrap;gap:1rem;margin:1.5rem 0}.button{display:inline-block;padding:.8rem 1.15rem;border:2px solid var(--ink);border-radius:10px;background:var(--accent);color:white;box-shadow:4px 4px 0 var(--ink);text-decoration:none;font-weight:750}.button.secondary{background:white;color:var(--text)}.button:hover{background:var(--accent-light);color:var(--accent)}.fine{font-size:.9rem}.editor{background:white;border:2px solid var(--ink);border-radius:16px;box-shadow:8px 8px 0 var(--ink);overflow:hidden;transform:rotate(1deg)}.editor-bar{padding:.75rem 1rem;background:var(--accent-light);border-bottom:2px solid var(--ink);display:flex;justify-content:space-between;font-weight:750}.editor-content{padding:1.5rem}.gauge{position:relative;width:180px;height:180px;margin:.5rem auto 1rem}.gauge svg{width:100%;height:100%;transform:rotate(-90deg)}.track,.score-ring{fill:none;stroke-width:10}.track{stroke:var(--accent-light)}.score-ring{stroke:var(--accent);stroke-linecap:round;stroke-dasharray:88 100;animation:score-in 1.4s ease-out both}.gauge strong{position:absolute;inset:0;display:grid;place-content:center;text-align:center;font-size:3rem;line-height:1.1}.gauge small{font-size:.85rem;color:var(--ok)}.families{display:flex;justify-content:space-around;gap:.5rem;border-block:1px solid var(--border);padding:.8rem 0;font-weight:700}.advice{background:#FFF1CC;border-radius:10px;padding:1rem;margin:1rem 0 0}.advice strong{color:#7A4300}.advice p{margin:.3rem 0 0;font-size:.9rem}.caption{font-size:.8rem;text-align:center;margin:.75rem 0 0}.ribbon{background:var(--amber);border:2px solid var(--ink);border-radius:12px;padding:1.1rem;text-align:center;font-weight:750}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem}.card{background:white;border:2px solid var(--ink);border-radius:16px;padding:1.5rem;box-shadow:4px 4px 0 var(--ink)}.card .number{color:var(--accent);font:700 .9rem ui-monospace,monospace;display:block;margin-bottom:1rem}.card p{margin-bottom:0}.gallery{margin-top:2rem}.gallery figure{margin:0;min-width:0}.gallery a{display:block}.gallery img{display:block;width:100%;height:auto;border:1px solid var(--border);border-radius:10px;background:white}.gallery figcaption{font-size:.9rem;padding:.75rem 0;color:var(--text-2)}ol.steps{padding-left:1.5rem;display:grid;gap:1.2rem}li::marker{color:var(--accent);font-weight:800}.steps li{padding-left:.5rem}.steps p{margin:.3rem 0}.faq{max-width:820px}.faq details{background:white;border:1px solid var(--border);border-radius:10px;padding:1rem 1.25rem;margin:1rem 0}.faq summary{font-weight:750;cursor:pointer}.faq details p{margin:1rem 0 0}.closing{background:var(--accent-light);border:2px solid var(--ink);border-radius:20px;text-align:center;padding:3rem 1.5rem;margin-bottom:3rem}.closing .actions{justify-content:center}footer{border-top:1px solid var(--border);padding:1.5rem 0}footer p{font-size:.9rem}.skip{position:absolute;top:-100px;left:1rem;background:white;padding:.75rem;z-index:10}.skip:focus{top:1rem}@keyframes score-in{from{stroke-dasharray:0 100}to{stroke-dasharray:88 100}}@media(prefers-reduced-motion:reduce){.score-ring{animation:none}.editor{transform:none}}@media(max-width:760px){.hero,.grid{grid-template-columns:1fr}.hero{gap:2rem}main>section{padding:2.5rem 0}.editor{max-width:440px;width:100%;margin:auto}nav{font-size:.9rem}.brand{font-size:1.3rem}nav div{gap:1rem}.closing{margin-top:1rem}}`;

export function renderWordpress(origin: string): string {
  const faq = FAQ.map(
    ({ q, a }) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`,
  ).join("");
  const screenshots = [
    [2, "Editor sidebar: overall score, family scores and fix advice", 750],
    [3, "Site dashboard: averages, score bands and posts needing attention", 750],
    [4, "Bulk scanning: progress, pause, resume and cancel", 739],
    [1, "Settings: endpoint, post types, cache lifetime and scan pace", 750],
  ]
    .map(
      ([n, alt, height]) =>
        `<figure><a href="/wordpress/screenshot-${n}.webp"><img src="/wordpress/screenshot-${n}.webp" width="1200" height="${height}" loading="lazy" decoding="async" alt="${alt}"></a><figcaption>${alt}. Open full-size screenshot.</figcaption></figure>`,
    )
    .join("");
  const html = page({
    ...wordpressEntry,
    origin,
    ogType: "website",
    structuredData: [
      identityGraph(origin),
      faqLd(FAQ),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Findable for WordPress",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "WordPress 6.5+, PHP 7.4+",
        url: `${origin}/wordpress`,
        downloadUrl: `${REPO}/releases`,
        license: "https://www.gnu.org/licenses/gpl-2.0.html",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }),
    ],
    body: `
<section class="hero" aria-labelledby="hero-title"><div><span class="eyebrow">Free &amp; open source · Made for WordPress</span><h1 id="hero-title">Great posts deserve to be found.</h1><p class="lead">Meet your editor’s new findability sidekick. Turn “will anyone find this?” into clear SEO, AEO and GEO scores, with advice for your next edit.</p><div class="actions"><a class="button" href="#install">Get Findable for WordPress</a><a class="button secondary" href="${REPO}">Explore GitHub</a></div><p class="fine">No account. No payment. No mystery rewrites.<br>WordPress 6.5+ · PHP 7.4+</p></div>
<div><div class="editor" role="img" aria-label="Illustrative editor sidebar: overall score 88 out of 100, good; SEO 92, AEO 84, GEO 84. Advice: add a clear meta description."><div class="editor-bar"><span>Findable</span><span>Published post</span></div><div class="editor-content"><div class="gauge" aria-hidden="true"><svg viewBox="0 0 120 120"><circle class="track" cx="60" cy="60" r="50"/><circle class="score-ring" cx="60" cy="60" r="50" pathLength="100"/></svg><strong>88<small>/ 100 · Good</small></strong></div><div class="families" aria-hidden="true"><span>SEO 92</span><span>AEO 84</span><span>GEO 84</span></div><div class="advice" aria-hidden="true"><strong>One small edit. A clearer signal.</strong><p>Add a clear meta description so searchers know what’s waiting on your page.</p></div></div></div><p class="caption">Illustrative scores, not a live scan. Your next edit is yours.</p></div></section>
<div class="ribbon">160 checks. Three lenses. One less guessing game.</div>
<section aria-labelledby="features"><span class="eyebrow">Small plugin. Big picture.</span><h2 id="features">From one post to your whole site.</h2><p>SEO helps search crawlers read your page. AEO shapes useful answers. GEO gives generative engines facts and sources to cite.</p><div class="grid">
<article class="card"><span class="number">01 / YOUR EDITOR SIDEKICK</span><h3>Less tab-hopping. More “aha”.</h3><p>Scan a published post in the block editor sidebar or classic editor meta box. See overall and SEO/AEO/GEO scores, per-check results and plain-language fix advice. Add an optional keyphrase for focus.</p></article>
<article class="card"><span class="number">02 / THE SITE DASHBOARD</span><h3>Find your next small win.</h3><p>See site averages, score bands, weakest posts and common failing checks. A sortable score column brings the picture into your posts list, too.</p></article>
<article class="card"><span class="number">03 / BACKGROUND BULK SCANS</span><h3>A queue, not a clicking marathon.</h3><p>Start a bulk scan, follow progress and pause, resume or cancel. WP-Cron does the work at a measured pace, with automatic rate-limit backoff.</p></article>
<article class="card"><span class="number">04 / SETTINGS THAT STAY YOURS</span><h3>Your site. Your setup.</h3><p>Choose post types, cache lifetime and bulk pace. Test the connection or point to your own API endpoint. Scan-on-publish is opt-in, not a surprise.</p></article></div>
<div class="grid gallery">${screenshots}</div><p class="fine">Real plugin screenshots from the public repository, captured with demo scan data. Check names and advice are also available in German, Spanish, Russian and Turkish.</p></section>
<section id="install" aria-labelledby="install-title"><span class="eyebrow">Three steps. Then the good stuff.</span><h2 id="install-title">Give your next post a sidekick.</h2><ol class="steps"><li><strong>Get the plugin.</strong><p>No packaged release is published yet. Check <a href="${REPO}/releases">GitHub Releases</a> for an installable ZIP when available. For now, clone the <a href="${REPO}">plugin repository</a>, run <code>npm ci</code> and <code>npm run build</code>, then copy the plugin folder as <code>findable</code> into <code>wp-content/plugins/</code>. See the <a href="${REPO}#local-setup">README</a> for setup details.</p></li><li><strong>Upload and activate.</strong><p>For a release ZIP, open Plugins → Add New Plugin → Upload Plugin in WordPress and install it. For a source build, open Plugins → Installed Plugins. Activate Findable.</p></li><li><strong>Publish. Scan. Pick a fix.</strong><p>Open a published post and the Findable editor sidebar (or classic meta box), then select Scan now. Visit the Findable dashboard for your site overview and bulk scan. Update your post before scanning new edits.</p></li></ol><p>Scans read your public URL through the free Findable API. No API key needed. Read our <a href="/privacy">privacy policy</a> and <a href="/terms">terms</a>.</p></section>
<section class="faq" aria-labelledby="faq-title"><h2 id="faq-title">Good questions. Straight answers.</h2>${faq}</section>
<section class="closing" aria-labelledby="source-title"><span class="eyebrow">Open source. Open invitation.</span><h2 id="source-title">Make the web a little more findable.</h2><p>Read the code, report a bug or help shape the next release.<br>No black box. Just a useful little sidekick.</p><div class="actions"><a class="button" href="${REPO}">Star, fork or say hello on GitHub</a><a class="button secondary" href="/">Try the web scanner</a></div></section>`,
  });
  return html
    .replace("</style>", `${STYLE}</style>`)
    .replace(
      '<body>\n<nav><a href="/">findable</a><a href="/learn">Learn</a></nav>\n<main>',
      '<body>\n<a class="skip" href="#content">Skip to content</a><nav aria-label="Main navigation"><a class="brand" href="/">findable<span aria-hidden="true">.</span></a><div><a href="/learn">Learn</a><a href="/wordpress" aria-current="page">WordPress</a><a href="' +
        REPO +
        '">GitHub</a></div></nav>\n<main id="content">',
    );
}
