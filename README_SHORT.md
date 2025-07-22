# OpenAI Realtime Agents – Short README

This repository is a **minimal demo** showing how to build voice-first agents with the
OpenAI Realtime API and the OpenAI Agents SDK, wrapped in a simple Next.js UI.

Key points:
1. Single-page app (`src/app/App.tsx`) that connects to the Realtime API, streams audio/text and renders a transcript & event log.
2. Multiple ready-to-run agent scenarios (e.g. *chat-supervisor*, *customer-service retail*, *simple handoff*); pick one from the Scenario dropdown.
3. Works completely in the browser – no server code beyond an `/api/session` helper that issues an ephemeral token.

Quick start
-----------
```
# 1. install deps
npm install

# 2. add your OpenAI key
cp .env.sample .env           # then edit .env => OPENAI_API_KEY=...

# 3. run the dev server
npm run dev                   # http://localhost:3000
```

That’s it!  Open the page, choose a scenario and start talking.

For full documentation, see the comprehensive `README.md` in the root of the repo.
