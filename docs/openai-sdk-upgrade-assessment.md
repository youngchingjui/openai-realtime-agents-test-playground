Title: OpenAI Node SDK upgrade assessment

Last reviewed: 2026-01-13

Summary
- Current versions in this repo:
  - openai: ^4.77.3
  - @openai/agents: ^0.0.1
- Our app uses the newer Responses API (openai.responses.create / openai.responses.parse) and the zod helper (openai/helpers/zod), plus the Realtime API via the Agents SDK. These APIs have been stable in v4 of the Node SDK for a while.
- Based on the public changelog pattern and v4 SDK guarantees, upgrading within the major v4 line is expected to be safe. No breaking changes are expected for the specific APIs we use.

What changed in the v4 SDK line (context)
- Client: The v4 SDK uses the OpenAI class (new OpenAI({ apiKey })) instead of the legacy Configuration + OpenAIApi. We already use the v4 style.
- Responses API: Replaces most Chat Completions usage. We already call openai.responses.create and openai.responses.parse.
- Helpers: The zodTextFormat helper is exported from openai/helpers/zod to make schema-constrained parsing easier. We rely on this and the SDK continues to expose it in v4.
- Streaming: responses.create({ stream: true }) streams SSE events. We don’t stream in our code path (stream: false), so no change expected.
- Types: The SDK ships rich TypeScript types. Minor updates may tighten types around Responses output fields (e.g., output_text, output_parsed). Our code accesses output_parsed which is part of the parse helper’s result.
- Runtime: Official support targets Node 18+. Our Next.js version already requires modern Node, so compatibility is fine.

Potential breaking areas to be aware of (not observed in our usage)
- Legacy APIs: chat.completions, assistants v1 endpoints, or older audio/vision helpers sometimes saw deprecations/renames. We do not use these.
- Beta/preview namespaces: Some preview/beta namespaces may change between minors. We don’t depend on preview-specific namespaces directly.
- ESM/CJS: The SDK is ESM-first. Our Next.js app and current imports already align.

Repo code check against upgrade risk
- openai import: import OpenAI from 'openai' — compatible with v4.
- Responses API:
  - openai.responses.create({...}) — stable.
  - openai.responses.parse({...}) — stable, returns a response with output_parsed when using the zod helper; our API route forwards the full response JSON.
- Zod helper: import { zodTextFormat } from 'openai/helpers/zod' — expected to remain.
- Models: We pass model: 'gpt-4o-mini' and use Realtime API elsewhere. Model naming changes are server-side; the SDK forwards strings, so SDK upgrades won’t affect this.

Assessment
- Safe to upgrade the openai package to the latest 4.x release.
- No code changes expected. Keep an eye on type changes if we enable stricter TS settings.

Recommended plan
1) Pin and upgrade OpenAI SDK within major v4:
   - npm i openai@^4.latest  (or accept the latest minor/patch via existing ^4.77.3 range on the next install).
2) Smoke test locally:
   - Guardrail classifier (uses responses.parse + zodTextFormat).
   - Text responses proxy (uses responses.create).
   - Realtime flows (driven by @openai/agents) to ensure no side-effects from peer dependency changes.
3) Production watchpoints:
   - Any TypeScript errors around openai helpers or response fields.
   - Any 4xx errors from the API indicating parameter name changes (unlikely for Responses API).
4) Rollback plan:
   - If issues are found, revert to 4.77.3 quickly: npm i openai@4.77.3.

Notes on @openai/agents
- We currently use @openai/agents@^0.0.1. That package is versioned independently and may receive rapid improvements.
- Upgrading it is orthogonal to the openai SDK and may introduce API changes; do that in a separate PR if desired.

Conclusion
- Proceed with upgrading openai within v4. Expect no changes to our code.
- Keep the Agents SDK as-is for now; evaluate its upgrade separately.

