# QA Automation Portfolio

**Manjula Reddy** · Mid–Senior QA Automation Engineer  
**Stack:** TypeScript · Playwright · Page Object Model · API testing · GitHub Actions

---

## Profile summary

- **Software development background** with recent, hands-on QA automation experience from a **live externship** on a production-style web platform (confidential employer app — not included here).
- **TypeScript + Playwright** UI automation using **Page Object Model**, custom fixtures, and `.spec.ts` suites (no Cucumber layer in this repo).
- **AI-assisted testing workflow:** using AI tools to accelerate test ideation, locator exploration, and refactors while keeping **human ownership** of assertions, risk coverage, and review.
- **API coverage** via Playwright’s built-in `request` fixture (contract-style checks on a public sandbox API).
- Returning to industry after a career gap — focused on **modern automation practices**, CI-friendly design, and clear reporting.

> This repository is a **sanitized portfolio**: patterns mirror real externship work; tests run against **public demo applications** only. No confidential URLs, credentials, or product names are committed.

---

## What’s inside

| Area | Location | Highlights |
|------|----------|------------|
| **UI — Login** | `tests/ui/login.spec.ts` | Valid login, locked user, negative path |
| **UI — Inventory** | `tests/ui/inventory.spec.ts` | Cart badge, fixture-based authenticated setup |
| **UI — Checkout** | `tests/ui/checkout.spec.ts` | Multi-step E2E purchase flow |
| **API** | `tests/api/jsonplaceholder.spec.ts` | GET contract, list checks, POST create |
| **Page objects** | `src/pages/` | `BasePage`, `LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage` |
| **Fixtures** | `src/fixtures/authenticated.ts` | Reusable logged-in state |
| **CI** | `.github/workflows/playwright.yml` | Chromium run on push/PR |

---

## Quick start

```bash
git clone <your-private-repo-url>
cd qa-automation-portfolio
cp .env.example .env
npm install
npx playwright install
npm test
```

Run subsets:

```bash
npm run test:ui
npm run test:api
npm run test:headed
npm run report
```

---

## Design choices (interview talking points)

1. **Page Object Model** — UI selectors and actions live in `src/pages/`; specs stay readable and scenario-focused (same structure used on a large externship codebase).
2. **Fixtures over copy-paste `beforeEach`** — `authenticated` fixture shows scalable setup for logged-in flows.
3. **Environment-driven config** — `BASE_URL` and credentials via `.env` (see `.env.example`); nothing secret in source control.
4. **Cross-browser projects** — Chromium, Firefox, and WebKit configured in `playwright.config.ts` (CI runs Chromium for speed).
5. **Failure artifacts** — traces on retry, screenshots and video on failure for debugging.
6. **API without a second framework** — Playwright `request` keeps UI + API in one toolchain.

---

## Externship context (sanitized)

Hands-on work was performed in the [TripleTen QA externship Playwright framework](https://github.com/tripleten-externships/qa-percruit) — multi-role UI coverage, admin flows, and team CI practices.  
This portfolio **does not** publish that application or its URLs; it demonstrates the **same engineering patterns** on public targets reviewers can run locally.

---

## Granting access (private repo)

For interviewers: add their GitHub username under **Settings → Collaborators** on this private repository, or share a short screen recording of `npm test` + HTML report if access is not possible.

---

## License

Portfolio sample code — free to review for hiring purposes.
