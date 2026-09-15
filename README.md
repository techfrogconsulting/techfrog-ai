# TechFrog.AI

A dependency-free, static business-information chatbot for Tech Frog Consulting.

## What this is

This is deliberately not a generative-AI chatbot. It matches a visitor’s question against the approved answers in `knowledge.json` and refuses questions outside that scope.

- No API key
- No login or authorization popup
- No external JavaScript, fonts, analytics, or AI service
- No per-message cost
- No links or redirects to another website

That control has a tradeoff: the chatbot cannot invent new answers, reason beyond the stored information, or reliably handle every unusual phrasing. For this use case, that limitation is the safety feature.

## Files

- `index.html` — interface and matching logic
- `knowledge.json` — approved business questions and answers
- `assets/techfrog-ai.jpg` — supplied brand artwork
- `CNAME` — custom domain declaration for branch-based GitHub Pages

## Update an answer

Edit the relevant entry in `knowledge.json`. Each entry contains:

- `aliases`: common ways visitors ask the question
- `keywords`: words used to recognize less exact phrasing
- `answer`: the only response the chatbot may return for that topic

Everything in `knowledge.json` is publicly downloadable by site visitors. Never place passwords, private client information, API keys, internal notes, or nonpublic claims in it. Keep the JSON syntax valid; a missing quote or trailing comma will prevent the knowledge file from loading.

## Test locally

Run a small local web server from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly from the filesystem will not reliably load `knowledge.json` because browsers restrict local file requests.

## Publish with GitHub Pages

1. Create an empty public GitHub repository.
2. Push the contents of this folder to the repository root.
3. In the repository, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main`, select `/ (root)`, and save.
5. Verify the temporary GitHub Pages address works before changing DNS.
6. In **Settings → Pages → Custom domain**, enter `techfrog.ai` and save. The included `CNAME` file does not replace this settings step.
7. At the DNS provider, replace the current apex `A` records with GitHub Pages’ records:

```text
@  A  185.199.108.153
@  A  185.199.109.153
@  A  185.199.110.153
@  A  185.199.111.153
```

8. After GitHub finishes its DNS check and certificate provisioning, enable **Enforce HTTPS**.

Do not switch the DNS records until the site works at its temporary GitHub Pages address. That avoids turning a controlled migration into preventable downtime.
