Realtime API Agents (very short)

This is a tiny Next.js (TypeScript) demo that showcases voice/chat agents powered by the OpenAI Realtime API and the OpenAI Agents SDK. The main app logic lives in src/app/App.tsx:
- fetches an ephemeral token from /api/session
- creates a RealtimeClient and connects audio
- lets you pick a Scenario (simpleHandoff, customerServiceRetail, chatSupervisor)
- streams transcripts/events and applies lightweight guardrails

Quick start
- npm i
- copy .env.sample to .env and set OPENAI_API_KEY
- npm run dev, then open http://localhost:3000

License
MIT
