# Realtime Agents (Next.js demo)

A tiny Next.js app that showcases OpenAI’s Realtime API using the OpenAI Agents SDK. The core client logic lives in src/app/App.tsx and:
- connects to the Realtime API with an ephemeral key (/api/session)
- streams assistant and user transcripts in real time
- supports scenario and agent switching, tool-call breadcrumbs, and handoffs
- offers push‑to‑talk or server VAD, and audio playback toggle

Quick start
- Requirements: Node 18+, an OpenAI API key
- Copy .env.sample to .env and set OPENAI_API_KEY
- Install and run: npm i && npm run dev
- Open http://localhost:3000 and choose a Scenario/Agent in the header

Main file
- src/app/App.tsx — UI state, RealtimeClient setup, streaming/guardrail handling, and controls

License
- MIT (see LICENSE)

