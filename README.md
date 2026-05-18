# QA Automation Portfolio — Manjula Reddy

TypeScript + Playwright framework for **Sample Portal** (sanitized e-commerce stand-in).  
Built using the same layout and habits as a multi-contributor externship repo: page objects, locator maps, role-based logins, and `.spec.ts` suites.

---

## Repository layout

```
src/
  locators/          # selectors kept out of specs (review-friendly)
  pages/             # POM — actions + assertions helpers
    common/
    catalog/
    checkout/
  test-data/         # static inputs (users, sort labels)
  utils/             # env readers
tests/
  ui/
    auth/
    catalog/
    checkout/
    session/
  api/
global-setup.ts      # saves shopper storage state once per run
```

---

## What reviewers can see quickly

| Topic | Where to look |
|-------|----------------|
| **POM** | `src/pages/**` — `LoginPage.loginAsUserType()`, `CatalogPage.applySortFilter()` |
| **Locators** | `src/locators/**` — data-test selectors, not scattered in tests |
| **Assertions** | Specs use `expect` + page methods like `productNamesAreSorted()`, `expectOrderComplete()` |
| **TypeScript** | Typed catalog slugs, user personas, shared test data modules |
| **Playwright** | Projects, `storageState`, `test.step`, `request` API, trace/screenshot on failure |

---

## Run locally

```bash
cp .env.example .env
npm install
npx playwright install chromium
npm test
```

Useful commands:

```bash
npm run test:ui
npm run test:api
npx playwright test --project=auth
npx playwright test --grep @smoke
npm run report
```

`global-setup` logs in once and writes `.auth/shopper.json` so catalog/checkout tests skip repetitive login (auth specs still run without that state).

---

## Environment

All hostnames and passwords live in `.env` only. Nothing proprietary is checked in.  
Default `.env.example` points at a **public** demo storefront so interviewers can execute the suite after clone.

---

## CI (GitHub Actions)

GitHub blocks pushing files under `.github/workflows/` unless your GitHub CLI token includes the **`workflow`** scope. This repo ships the same workflow as a **template** you can install after clone:

```bash
mkdir -p .github/workflows
cp ci/templates/playwright.yml .github/workflows/playwright.yml
git add .github/workflows/playwright.yml
git commit -m "Add Playwright CI workflow"
git push
```

Or refresh your token first, then add the workflow under `.github/workflows/` directly:

```bash
gh auth refresh -s workflow -h github.com
```

Then copy `ci/templates/playwright.yml` → `.github/workflows/playwright.yml` and push.

---

## Before making this repository public

The **tracked source** is intended to be safe for a public GitHub repo: no employer product names, no internal URLs, and no API tokens in files.

Do this once before you flip the repo to **Public**:

1. **Confirm Git will not publish secrets**
   - Run `git status` — you should **not** see `.env`, `.auth/`, `playwright-report/`, or `node_modules/` staged.
   - Run `git ls-files | grep -E '\.env$|\.pem$|shopper\.json'` — it should print **nothing**.

2. **Keep real credentials only locally**  
   Copy `cp .env.example .env` on your machine; edit `.env` if you use a different demo host — never commit that file.

3. **Optional scan** (from repo root):

   ```bash
   rg -i 'percruit|tripleten|ghp_|gho_|BEGIN RSA|AKIA|xoxb-' --glob '!node_modules'
   ```

4. **First push to a new public repo**  
   If this folder ever had a different history, use a **fresh** GitHub repo for your public portfolio so old commits cannot leak. Your current tree has only the initial commit plus uncommitted work — after you commit the latest layout, you are in good shape.

`package.json` sets `"private": true` for **npm** (avoids accidental `npm publish`). It does **not** control GitHub visibility.

---

## Note on scope

This is a **portfolio subset**: patterns come from production-style team automation work on a live platform that cannot be published. Sample Portal replaces that product in code and docs so the framework skills are visible without confidential names or URLs.
