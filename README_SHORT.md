# Realtime API Agents – TL;DR

This repository is a **minimal demonstration** of how to build browser-based,
voice-first agents on top of the OpenAI **Realtime API** and **Agents SDK** using
Next.js + React.

What you get out-of-the-box:

• A single–page React application (`src/app/App.tsx`) that:
  – obtains an ephemeral session token from `/api/session`
  – connects to the Realtime API via a lightweight SDK client
  – streams user speech → text and assistant text → speech in real-time
  – supports push-to-talk, guardrail-aware transcript UI and event logging

• A few sample multi-agent configurations (Chat-Supervisor, Sequential
  Handoff, Customer-Service) located in `src/app/agentConfigs/` that you can
  switch between with the *Scenario* dropdown in the UI.

Quick start
-----------
1. `npm install`
2. Copy `.env.sample` → `.env` and add your `OPENAI_API_KEY`.
3. `npm run dev` then open http://localhost:3000

That’s it – speak to the agent and watch the transcript, events and audio
stream in real-time.

For full documentation, implementation details and advanced patterns, refer to
`README.md`.
