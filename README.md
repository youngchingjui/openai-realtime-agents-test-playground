# Realtime Agents (Very Short Readme)

A tiny Next.js app that demos OpenAI Realtime Agents. The main UI and logic live in src/app/App.tsx: it connects to an ephemeral Realtime session (/api/session), lets you pick a scenario/agent, streams assistant speech/text, shows tool calls as breadcrumbs, and provides push‑to‑talk and logs.

Quick start
- Copy .env.sample to .env and set OPENAI_API_KEY
- npm ci
- npm run dev
- Open http://localhost:3000 and use the Scenario and Agent dropdowns

