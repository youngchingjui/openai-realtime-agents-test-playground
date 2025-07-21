# Realtime API Agents – Quick Start

This repo is a **minimal Next.js + TypeScript demo** that shows how to build voice & chat agents with the OpenAI **Realtime API** and **Agents SDK**.

👉  It ships with a few ready-to-run scenarios (chat-supervisor, sequential hand-off, customer-service, …) so you can explore different agentic patterns with almost no setup.

## 1. Setup

```bash
# install deps
npm install

# add your key
cp .env.sample .env      # then paste your OPENAI_API_KEY
```

## 2. Run the app

```bash
npm run dev          # starts Next.js on http://localhost:3000
```

Open the browser and pick a scenario from the “Scenario” dropdown.  Speak or type – the agent will answer in real time.

## 3. Folder tour  
• `src/app/App.tsx` – main React component that wires the Agents SDK to the UI  
• `src/app/agentConfigs/` – definitions for each demo scenario  
• `public/` – static assets / screenshots

That’s it.  Fork it, tweak the prompts or tools, and build your own realtime agent!

