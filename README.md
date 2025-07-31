# Realtime API Agents – Quick&nbsp;Start

This repository is a **Next.js (TypeScript) demo app** that shows how to build low-latency, voice-first agents with the **OpenAI Realtime API** and **OpenAI Agents SDK**.

Highlights
• Real-time streaming audio & token-by-token text.
• Out-of-the-box agent scenarios: chat-supervisor, sequential hand-off, customer-service, and more.
• Examples of tool calling, agent transfers, guardrails, and event logging.

Getting started
1. `npm install`
2. Copy `.env.sample` → `.env` and add your `OPENAI_API_KEY`.
3. `npm run dev` then open http://localhost:3000 and pick a scenario.

Main points of interest
• `src/app/App.tsx` – top-level React component that connects to the Realtime API and manages UI / audio.
• `src/app/agentConfigs/` – reusable agent configurations you can modify or extend.

MIT © OpenAI
