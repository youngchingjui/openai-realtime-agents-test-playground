# Realtime API Agents Demo (Short Version)

A tiny Next.js + TypeScript web app that demonstrates how to build multi-agent voice experiences with the OpenAI Realtime API and the OpenAI Agents SDK.

Main ideas:
1. Stream live user audio to an agent and stream responses back.
2. Orchestrate multiple specialised agents (e.g. greet, supervisor, returns) and hand-off between them.
3. Show the full conversation, events log and audio in the browser UI (see `src/app/App.tsx`).

Quick start
-----------
1. `npm install`
2. Copy `.env.sample` ➜ `.env` and add your `OPENAI_API_KEY`.
3. `npm run dev` then open http://localhost:3000

That’s it — explore the different "Scenario" options in the top-right of the app to see the agent patterns in action.

