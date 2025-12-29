# 🍬 sweet

This repository is a minimal starter for a client-side React app deployed to
Firebase hosting using the Bun runtime and bundler. The project is
intentionally small and opinionated so you can use it as a base for web apps.

The frontend starts in [main.js]. The root of the React app is in [App.jsx].

## 🚀 Tech stack

- 🐰 [bun] (runtime and bundler)
- ⚛️ [react]
- ️⚒️ [rtk query]
- 🔥 [firebase] (Hosting, Firestore, App Check)
- 💅🏾 [styled-components]
- 🧭 [react-router]

## 🧰 Prerequisites

- [Bun] installed and on your PATH
- Firebase CLI (`firebase-tools`) installed globally (recommended via `bunx` or
  `npm`) and logged in:

```bash
bun install -g firebase-tools
bunx firebase login
```

## ⚡️ Quickstart

1. Clone this repository and install dependencies

```bash
git clone git@github.com:DatGreekChick/sweet.git
cd sweet
bun install
```

2. Copy the example env and populate your secrets:

```bash
mv .env.example .env
# then edit .env and fill in values
```

3. Run the development environment:

```bash
bun run start
```

4. Deploy to Firebase Hosting:

```bash
bun run deploy
```

## 📝 Note

- `.env` is ignored by the repo (already present in `.gitignore`). **Never**
  commit secret values.
- Add relevant environment variables as repository secrets (for example,
  GitHub: Settings → Secrets) so CI workflows (GitHub Actions) can access them
  for production tasks like automated deploys and preview environments.

## 🔑 Environment variables

Move the `.env.example` file to a `.env` file at the project root and set these
values.

### Required

- FIREBASE_API_KEY — Firebase web API key (used by `firebase-app/app.js`)
- FIREBASE_APP_ID — Firebase App ID
- FIREBASE_DATABASE_URL — Firestore / database URL
- FIREBASE_PROJECT_ID — Firebase project id

### Optional

- GITHUB_API_TOKEN — production-only token used by `api/github.js` to create
  and add issues to your GitHub repository's issues list (required if you want
  automated issue creation in production)
- RECAPTCHA_SITE_KEY — client ReCAPTCHA site key used by
  `main.js`/`GoogleReCaptchaProvider`
- ENTERPRISE_RECAPTCHA_SITE_KEY — enterprise site key used by App Check in
  production
- APP_CHECK_DEBUG_TOKEN — local debug token for Firebase App Check (used only
  in `development`)

## 🤖 CI

This boilerplate already includes CI that expects the same environment
variables as secrets. When setting up CI (for example GitHub Actions), create
secrets using the names above and map them into the workflow environment.

## 🗂 Project structure️

- `main.js` — app entrypoint and provider wiring
- `client/` — React source (App, components, styles)
- `api/` — RTK Query endpoints (Firestore + GitHub examples)
- `firebase-app/` — Firebase initialization and helpers
- `public/` — static assets and `index.html`
- `build.js`, `dev.js`, `firebase.json` — build/dev tooling and Firebase config

## 🛠 Development workflow notes️

- Formatting: Prettier is configured for the repo. Run `bun run prettier` to
  format files, or rely on the automatic formatting run by `lint-staged` on
  staged files.
- Pre-commit hooks: Husky + `lint-staged` are set up to run Prettier and ESLint
  autofix on staged files before committing. If hooks aren't active after
  cloning, enable them locally with:

```bash
bunx husky install
```

- To skip hooks for a single commit (not recommended):

```bash
git commit --no-verify
```

## 🙏 Credits

Inspired by [queerviolet/spark].

[App.jsx]: client/App.jsx
[bun]: https://bun.sh
[firebase]: https://firebase.google.com/
[main.js]: main.js
[queerviolet/spark]: https://github.com/queerviolet/spark
[react]: https://reactjs.org/
[react-router]: https://reactrouter.com/
[rtk query]: https://redux-toolkit.js.org/rtk-query/overview
[styled-components]: https://styled-components.com/
