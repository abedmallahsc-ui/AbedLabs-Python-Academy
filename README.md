# ABED LABS — Python Interactive Academy

An organized, multi-file learning website with a Supabase-backed license service and admin-only device resets.

## Project structure

```text
abed-labs-python-academy/
├── index.html
├── admin/
│   └── index.html
├── api/
│   ├── _lib/supabase.js
│   ├── activate.js
│   ├── verify.js
│   ├── progress.js
│   └── admin/
│       ├── config.js
│       ├── licenses.js
│       └── reset-device.js
├── assets/
│   ├── css/styles.css
│   └── js/
│       ├── api.js
│       ├── app.js
│       ├── admin.js
│       ├── lessons.js
│       ├── advanced-lessons.js
│       ├── lesson-guides.js
│       ├── assessments.js
│       └── python-worker.js
├── supabase/schema.sql
├── .env.example
├── package.json
├── requirements.txt
├── tests/
└── vercel.json
```

## Before running

This project requires a Vercel deployment for its `/api` serverless functions. Opening `index.html` directly or using VS Code Live Server will show the frontend, but activation, database verification, and progress syncing will not work locally without a compatible API server.

### Python virtual environment

A Python virtual environment is optional for this JavaScript and Node.js
project. It is available locally at `.venv` for Python tooling and for future
Python development.

Activate it on macOS or Linux:

```bash
source .venv/bin/activate
```

The current project has no Python dependencies:

```bash
python -m pip install -r requirements.txt
```

### 1. Create the Supabase database

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Paste and run `supabase/schema.sql`.
4. In Project Settings → API, copy the Project URL, the **anon** key, and the **service_role** key. The anon key is public; the service-role key must remain server-only.
5. In Authentication settings, enable the email/password provider and disable public sign-ups. Invite each administrator from the Supabase dashboard. Copy each admin user's UUID from the Auth users list.

### 2. Configure Vercel

1. Push this folder to a private GitHub repository.
2. Import the repository into Vercel.
3. Add these environment variables in Vercel Project Settings → Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` — server-only; never add this to browser code.
   - `ADMIN_USER_IDS` — comma-separated UUIDs of authorized Supabase Auth users.
4. Redeploy after adding the variables.

No build command or framework preset is required; this is a static frontend plus Vercel Node.js functions.

### 3. Create and send a license

Visit `https://YOUR-DOMAIN/admin/` and sign in with an invited Supabase Auth administrator account. Add an optional customer label and create a license. Copy the activation code and send it privately to the customer. Admin API requests verify the access token with Supabase Auth and then check the user ID against `ADMIN_USER_IDS`.

The first successful activation binds that license to the browser's device token. Reusing the activation code on a second browser/device is rejected.

### 4. License management

The admin page lists licenses, lets administrators change a license between active, suspended, and revoked, and can reset a device binding. A suspended or revoked license cannot pass device verification. Resetting the device lets the customer activate again. Customers do not have a self-service transfer feature.

### 5. Local development

Use Vercel CLI on a computer that supports Node.js:

```bash
npm install -g vercel
vercel dev
```

Configure the same environment variables locally in a `.env` file (never commit it). Open the local URL printed by Vercel. The Python runner loads Pyodide 0.27.7 from jsDelivr.

Run the automated tests with Node.js 20 or newer:

```bash
npm test
```

## Current product scope

- 39 ordered university-level lessons with detailed explanations and worked examples.
- A chapter roadmap for each lesson, with learning objectives, every section preview, and chapter-specific common mistakes.
- Three progressively challenging programming tasks per lesson, with starter code, hints, and solutions.
- Ten multiple-choice questions and ten output-prediction problems per lesson.
- Line-by-line code explanations for worked examples, prediction problems, and solutions.
- A runnable example and challenge starter for the in-browser Python editor.
- Lesson navigation, knowledge checks, and versioned completion tracking.
- Server-side license activation and verification.
- Progress stored in Supabase.
- Supabase Auth-protected administration with a server-side administrator ID allowlist.
- Admin license creation, status changes, and device resets.
- Browser-side Python execution through Pyodide in a dedicated Web Worker.
- Responsive layout.

### Course syllabus

1. **Python foundations (lessons 1–6):** running Python, variables, numbers, strings (including slicing), input and validation, and decisions.
2. **Collections and reusable code (lessons 7–13):** loops (including nested-loop star patterns, checkerboards, loop controls, and loop `else`), lists and slicing, tuples and sets, dictionaries, functions, scope and recursion, and comprehensions.
3. **Reliable, professional programs (lessons 14–20):** exceptions, files, modules and packages, object-oriented programming, JSON, testing and debugging, and maintainable coding habits.
4. **Applied Python projects (lessons 21–24):** dates and time, HTTP/API concepts, a persistent command-line task manager, and a data-report capstone.
5. **Intermediate foundations (lessons 25–39):** slicing patterns, reverse steps, slice assignment, and boundary cases; enumerate, zip, and unpacking; sorting and searching; algorithm complexity; iterators and generators; lambda, map, and filter; regular expressions; CSV; SQLite; command-line interfaces; virtual environments and dependencies; context managers and decorators; type hints and dataclasses; practical HTTP APIs; and Python security.

The course contains **585 practice challenges, 585 MCQs, and 386 output-prediction problems**. Every lesson has 15 distinct hands-on challenges and 15 distinct knowledge-check questions, alongside its separate output-prediction practice. Code examples, worked examples, and prediction snippets can be loaded into the in-browser editor; the line-by-line explanation control offers an additional learning aid.

## Python runner safety and limitations

**This is a functional starter implementation, not a claim of unbreakable DRM.** The current browser device token is stored in localStorage. It prevents ordinary link sharing and activation-code reuse, but a technically capable user may copy browser storage or use developer tools. A website cannot reliably read a phone's unique hardware ID. Stronger protection requires a device-bound cryptographic key/passkey design and a carefully designed recovery flow.

Learner Python code runs in a dedicated browser Web Worker using Pyodide and is never sent to the application server. Runtime startup has a 90-second limit; execution is stopped after 30 seconds. Code is limited to 50,000 characters and captured output to 20,000 characters. CSP restricts the worker to jsDelivr for the pinned Pyodide runtime. This is a browser-level isolation boundary, **not** a hardened operating-system sandbox or a strict memory limit. It requires a modern browser and an internet connection to download Pyodide 0.27.7 on first use. Do not use it to run sensitive code or represent it as strong hostile-code containment.

The expanded course uses progress IDs prefixed with `v3-` so older saved lesson IDs are not mistaken for completion of the 39-lesson syllabus. Learners start the expanded curriculum with fresh course progress.

## Remaining production work

- Rate limiting and abuse monitoring on activation/admin endpoints.
- Audit logs for license creation, resets, suspension, and revocation.
- Tested database backup and restore procedures.
- A payment provider and order-to-license workflow, if selling access online.
- Terms of use, privacy notice, support contact, and a tested refund/device-replacement policy.

## Security rules

- Never put the Supabase `service_role` key in frontend files or public environment configuration.
- Keep `ADMIN_USER_IDS` server-side. The Supabase anon key may be exposed to the browser; it is not an authorization secret.
- Never commit `.env`.
- Keep the Supabase `licenses` table private; the schema enables RLS and grants no browser access.
- Use HTTPS in production. If using a custom Supabase Auth domain, update the `connect-src` allowlist in `vercel.json`.
