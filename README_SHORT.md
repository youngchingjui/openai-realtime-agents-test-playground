# Realtime API Agents – Quick README

This repo is a **minimal Next.js (TypeScript) front-end** that shows how to talk to the OpenAI **Realtime API** using a few pre-built multi-agent scenarios (chat-supervisor, sequential handoff, customer-service retail, etc.).  
The bulk of the logic lives in `src/app/App.tsx` which wires the UI to the Realtime client, streams audio/text, and lets you switch between agent configs at runtime.

## Run locally

```bash
# 1. Install
npm install

# 2. Add your OpenAI key (copy .env.sample to .env and fill in OPENAI_API_KEY)

# 3. Start the dev server
npm run dev
# then open http://localhost:3000
```

That’s it – the default scenario will spin up a voice agent you can speak to in your browser.  
For more detailed docs, screenshots and diagrams, see the full `README.md` in the repo.

