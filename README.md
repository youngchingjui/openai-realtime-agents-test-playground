# Realtime API Agents Demo

A minimal Next.js app that showcases two practical patterns for building realtime voice/chat agents with the OpenAI Realtime API and the OpenAI Agents SDK.

What's inside
- Chat Supervisor: A fast realtime voice agent that defers hard tasks and tool calls to a stronger text model.
- Sequential handoffs: Specialist agents transfer the user between them based on intent.

Quick start
- Requirements: Node 18+ and npm
- Install: npm install
- Configure: copy .env.sample to .env and set OPENAI_API_KEY
- Run: npm run dev, then open http://localhost:3000
- Switch scenarios: use the Scenario dropdown in the UI

Project notes
- Examples live in src/app/agentConfigs
- Prefer gpt-4o-realtime-mini for low-latency voice; escalate tough tasks to stronger text models when needed.
- If you want this demo without the Agents SDK, see the branch "without-agents-sdk": https://github.com/openai/openai-realtime-agents/tree/without-agents-sdk

License
- MIT (see LICENSE)

