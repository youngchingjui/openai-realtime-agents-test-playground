# Realtime API Agents – Quick Overview

This repository is a **Next.js (TypeScript) demo app** that showcases how to build multi-agent voice assistants with the **OpenAI Realtime API** and the **OpenAI Agents SDK**. The UI lets you speak to an agent in real time, inspect events, and experiment with different agent configurations.

## Getting started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file (see `.env.sample`) and set your `OPENAI_API_KEY`.
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser and choose a scenario from the drop-down.

That’s it – you can now talk to the demo agents and see streaming transcripts, tool calls, and hand-offs in action.

## What’s inside?

• `src/app/App.tsx` – the main React component that connects to the Realtime API, renders the transcript and event log, and handles Push-to-Talk, guardrails, and audio playback.
• `src/app/agentConfigs/` – ready-made agent configurations illustrating patterns such as Chat-Supervisor and Sequential Handoffs.

Feel free to fork the project and plug in your own agents or tools.

## License

MIT

