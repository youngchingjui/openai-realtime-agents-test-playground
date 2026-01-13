# OpenAI SDK upgrade assessment (as of January 13, 2026)

This note summarizes what changed in the OpenAI JavaScript/TypeScript SDK (npm: `openai`) since the version we currently pin, and whether it’s safe for this repo to upgrade.

Current versions in this repo
- openai: ^4.77.3
- @openai/agents: ^0.0.1

Latest upstream versions observed (January 13, 2026)
- openai: 6.16.0 (released January 9, 2026)
- @openai/agents: 0.3.7 (released December 19, 2025)

Key upstream changes since openai 4.x
- Major v5 and v6 releases shipped after 4.77.3. The SDK now centers on the Responses API (`client.responses.create` and `client.responses.parse`) and includes first‑class helpers for structured outputs with Zod (`openai/helpers/zod`).
- Structured Outputs: `zodTextFormat` and `responses.parse` are documented and supported in the latest SDK and docs.
- Node requirements: The SDK targets active LTS Node versions; current docs recommend Node 20+. If your runtime is Node 18, you may need to upgrade Node for v6.
- Ongoing additions in v6 include properties like `completed_at` on Responses, as well as assorted model/endpoint features.

Compatibility with this repo
- We use `responses.create({ …, stream: false })` and `responses.parse` in `src/app/api/responses/route.ts`, and `zodTextFormat` from `openai/helpers/zod` in `src/app/lib/callOai.ts`.
- These APIs are present and documented in current platform docs for Node, and are not marked deprecated.
- We do not rely on older Chat Completions APIs or streaming helpers that changed semantics across v5/v6.
- Our TypeScript (>=5) and Next.js setup are compatible with the current SDK.

Agents SDK note (@openai/agents)
- The Agents SDK has also iterated quickly. Recent releases indicate compatibility aligned with `openai` 6.x. Staying on `@openai/agents@0.0.1` while jumping `openai` to 6.x may work if there’s no strict peer range, but the safer path is to upgrade both together and smoke test the Realtime usage (`RealtimeAgent`, `RealtimeSession`, `OpenAIRealtimeWebRTC`).

Upgrade safety assessment
- Low risk for the `openai` SDK itself, provided our runtime is Node 20+. The code paths we use match the modern Responses API patterns.
- Potential risk if the deployment runtime is still Node 18. Confirm Node version before upgrading to v6.
- If upgrading `openai` to v6, consider upgrading `@openai/agents` to a recent 0.3.x to avoid any implicit coupling mismatches.

Recommended plan
1) Confirm runtime Node version (target Node 20 LTS).
2) In a follow‑up PR, bump dependencies:
   - `openai` to `^6.16.0` (or the then‑latest 6.x).
   - `@openai/agents` to `^0.3.7` (or latest 0.3.x).
3) Validate locally:
   - Structured output flow still returns `output_parsed` that matches our Zod schema.
   - Realtime voice flow connects and can send/receive audio and messages.
4) Roll out behind a small canary to watch for regressions.

Selected references
- OpenAI Node SDK releases (v6.16.0 and recent history) – official GitHub releases.
- Structured Outputs with `zodTextFormat` and `responses.parse` – official platform docs.
- Agents SDK releases – official GitHub releases.


