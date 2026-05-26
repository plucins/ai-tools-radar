# Google Antigravity 2.0

```yaml
name: "Google Antigravity 2.0"
description: >
  Google Antigravity 2.0 is a standalone desktop application and agent-first development platform that enables developers to orchestrate multiple AI agents in parallel to build production-ready applications. It is powered by the Antigravity agent harness co-optimized with Gemini 3.5 Flash and integrates natively with Google AI Studio, Android, and Firebase. The desktop application is the graphical product surface of the broader Google Antigravity ecosystem, which also includes Antigravity CLI, SDK, and enterprise deployment options.
category: ide
logo: https://img.logo.dev/antigravity.google?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 21:31

| Field | Value |
|-------|-------|
| Name | Google Antigravity 2.0 |
| Alternative names | Antigravity 2.0, Antigravity desktop app |
| Vendor / Organization | Google LLC |
| Product owner | Google DeepMind / Google (joint) |
| Homepage | https://antigravity.google/product/antigravity-2 |
| Documentation | https://antigravity.google/docs/ |
| Migration guide (from Gemini CLI) | https://antigravity.google/docs/gcli-migration |
| Changelog / Blog | https://antigravity.google/blog/introducing-google-antigravity-2-0 |
| Repository | [NO OFFICIAL DATA — no public GitHub repository] |
| First release date | [UNVERIFIED — internal v1.x pre-dates May 2026; exact public v1 date not officially stated] |
| Current status | GA (Generally Available) |
| Current version | 2.0 |
| Last updated | May 19, 2026 (Google I/O 2026) |
| Supported OS | macOS, Linux, Windows [NEEDS UPDATE — listed in ecosystem materials; OS-specific docs not fetched] |

---

## Classification

- **Primary category:** Coding Agent / Agent-first desktop development environment
- **Secondary categories:** CLI Tool (Antigravity CLI — separate product), SDK/Platform (Antigravity SDK), Enterprise (Gemini Enterprise Agent Platform)
- **Tool type:** SaaS (subscription-based; cloud-processed agent harness)
- **Problem domain:** Software development, AI-assisted coding, multi-agent workflow automation
- **User interaction type:** Desktop GUI, with ecosystem surfaces via CLI, SDK, and Managed Agents API
- **Automation type:** Autonomous, Semi-autonomous, Background (scheduled tasks)

---

## Summary

- **One-sentence description:** Google Antigravity 2.0 is Google's standalone desktop application for agent-first software development, enabling multi-agent parallel execution powered by the Antigravity harness and Gemini 3.5 Flash.
- **Extended description:** Announced at Google I/O 2026 on May 19, 2026, Antigravity 2.0 is the graphical desktop product surface of the Google Antigravity platform. It serves as the central home for agent interaction, allowing developers to orchestrate multiple agents executing tasks in parallel. The desktop app shares the same underlying agent harness as Antigravity CLI, ensuring consistent core agent behavior across product surfaces.
- **Core value proposition:** Agent-first desktop environment where developers describe intent and the platform orchestrates specialized subagents to implement, test, and deploy production-ready applications.
- **Primary problem solved:** Reducing the manual orchestration burden in multi-step development workflows; enabling parallel agent execution without terminal-based tooling.
- **Key differentiator:** Unified Antigravity agent harness shared across desktop, CLI, SDK, and Managed Agents API; deep native integration with Google AI Studio, Android, and Firebase; scheduled background task automation.
- **Target users:** Software developers building on the Google Cloud/Firebase/Android stack who prefer a graphical agent-orchestration environment.
- **Anti-target users:** Users requiring fully on-premises or air-gapped deployments; developers who prefer a pure terminal workflow (see Antigravity CLI); non-developers seeking a no-code tool.
- **Primary usage context:** Local desktop development environment with cloud-side agent execution via the Antigravity harness.

---

## Use Cases

### Primary Use Cases

- **Multi-agent parallel development:** Orchestrate multiple specialized subagents simultaneously (e.g., code generation, documentation, testing) for a single project.
- **Scheduled background automation:** Define triggers or schedules for agents to run recurring development tasks without manual invocation.
- **Full-stack app building:** Build and deploy Android apps, Firebase-backed services, and Google Cloud workloads directly from the agent interface.
- **Google AI Studio project continuation:** Import projects from Google AI Studio into Antigravity 2.0 for local development, including all project context.

### Secondary Use Cases

- **Enterprise agent deployment:** Connect Antigravity 2.0 to Google Cloud projects via the Gemini Enterprise Agent Platform for sandboxed enterprise workloads.
- **Custom agent authoring:** Define custom agent behaviors using GEMINI.md context files and the Antigravity SDK.
- **Managed Agents API usage:** Spin up server-side agents via the Gemini API Interactions API, powered by the same Antigravity harness.

### Anti-patterns (when NOT to use)

- Terminal-centric workflows with no need for a GUI (use Antigravity CLI instead).
- Environments where cloud data transmission to Google infrastructure is prohibited.
- Non-Google ecosystem workloads where deep Google Cloud/Firebase integration adds no value.

---

## Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Standalone desktop application** | Central GUI for all agent interaction; runs on macOS, Linux, Windows | Stable (GA) |
| **Multi-agent orchestration** | Coordinate multiple agents executing tasks in parallel within one session | Stable (GA) |
| **Dynamic subagents** | Spawn parallelized sub-tasks within a workflow; subagents adapt and verify each other | Stable (GA) |
| **Scheduled tasks** | Background automation triggered on a schedule without manual invocation per run | Stable (GA) |
| **GEMINI.md context files** | Project-specific context files that provide persistent, project-scoped instructions to agents (analogous to CLAUDE.md in Claude Code) | Stable (GA) |
| **Unified agent harness** | Shares the same Antigravity agent harness as Antigravity CLI; all future harness improvements apply automatically across surfaces | Stable (GA) |

### Advanced Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Google AI Studio export** | Import entire projects from Google AI Studio including project context with a single click | Stable (GA) |
| **Android app building** | Native integration to scaffold and build Android apps, including Google Play Console publishing via AI Studio | Stable (GA) |
| **Firebase integration** | Deploy and manage Firebase-backed projects from within Antigravity | Stable (GA) |
| **Gemini Enterprise Agent Platform** | Connect Antigravity 2.0 to Google Cloud projects for enterprise agent workloads in sandboxed environments | Stable (GA) |
| **Build with Google plugins (Skills)** | Install capability packs extending agent domain knowledge (e.g., DeepMind Science Skills for 30+ life science databases) | Stable (GA) |
| **MCP support** | Model Context Protocol server configuration for external tool integration | Stable (GA) |
| **Workspace API integration** | Agents can natively call Google Workspace APIs and embed them in applications | Stable (GA) |

### Plan-restricted Features

| Feature | Plan Required |
|---------|--------------|
| Standard usage | Google AI Pro |
| 5× higher usage limit | Google AI Ultra ($100/month) |
| Bonus $100 credits (limited-time offer, expires May 25, 2026) | Google AI Ultra (new/existing subscribers) |

---

## Interfaces

- **Primary interface:** Standalone desktop application (macOS, Linux, Windows)
- **Additional surfaces (same platform):**
  - Antigravity CLI — terminal product surface (separate profile: `tools/cli/google-antigravity.md`)
  - Antigravity SDK — programmatic agent authoring
  - Managed Agents API — server-side agents via Gemini API Interactions API
  - Gemini Enterprise Agent Platform — enterprise Google Cloud deployment
- **MCP:** Model Context Protocol integration via `https://antigravity.google/docs/mcp`
- **Skills install:** `npx skills add <repo>`

---

## Operating Modes

| Mode | Description | Autonomy Level |
|------|-------------|----------------|
| **Interactive (desktop)** | Developer interacts with agents via desktop GUI; reviews and approves steps | Semi-autonomous |
| **Background / Scheduled** | Agents execute tasks on a schedule or trigger without a human invocation per run | Autonomous |
| **Multi-agent parallel** | Multiple subagents run simultaneously within one orchestrated workflow | Autonomous |
| **Enterprise (sandboxed)** | Agents run in Google Cloud isolated environments via Gemini Enterprise Agent Platform | Configurable |

---

## Architecture & Mechanisms

- **Agent harness:** Proprietary "Antigravity agent harness" — the same harness that powers Google's internal AI developer tools and Antigravity CLI. Shared harness ensures all core agent improvements propagate to all surfaces automatically.
- **Underlying model:** Gemini 3.5 Flash, co-optimized with the Antigravity harness. The official blog states 3.5 Flash "outperforms Gemini 3.1 Pro across almost all benchmarks while running four times faster than other frontier models."
- **Context mechanism:** GEMINI.md project context files provide persistent, project-scoped instructions to agents.
- **Multi-agent architecture:** Dynamic subagents are spawned for parallelized task execution within a session; subagents can verify each other's output.
- **Persistent environments (Managed Agents):** Each Managed Agents API interaction creates an environment resumable in follow-up calls with all files and state intact, enabling multi-turn sessions.
- **Plugin/Skills layer:** "Build with Google" plugins install curated skill packs (e.g., DeepMind Science Skills — 30+ life science databases).
- **MCP integration:** Native support for Model Context Protocol server configuration.
- **Internal harness scale:** Google's internal AI developer tools (using the same harness) processed 3 trillion tokens/day by May 2026, up from 0.5 trillion/day in March 2026 (source: Sundar Pichai keynote, Google I/O 2026).

---

## Integrations

| Integration | Type | What It Enables |
|-------------|------|-----------------|
| Google AI Studio | Native | Export projects from AI Studio into Antigravity 2.0 with all context; mobile capture → desktop continuation |
| Firebase | Native | Build, deploy, and manage Firebase-backed projects |
| Android | Native | Scaffold Android apps; publish to Google Play Console test track via AI Studio |
| Google Workspace APIs | Native | Agents natively call Workspace APIs and embed them in applications |
| Google Cloud / Gemini Enterprise Agent Platform | Native | Connect to Google Cloud projects for enterprise sandboxed agent execution |
| Managed Agents (Gemini API) | API | Spin up server-side agents via the Interactions API; available in Google AI Studio Playground |
| Model Context Protocol (MCP) | MCP | Configure external MCP servers to extend agent capabilities |
| Skills / plugins | Marketplace (npx) | Install domain-specific skill packs via `npx skills add <repo>` |
| DeepMind Science Skills | Plugin (Build with Google) | Access 30+ life science databases (AlphaGenome, ClinVar, OpenAlex, genomics, structural biology, cheminformatics) |
| Antigravity CLI | Related product (same harness) | Shared agent harness — CLI and desktop surfaces interoperate; terminal users can use Antigravity CLI for same core agents |

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models used | Gemini 3.5 Flash (Antigravity-optimized variant) |
| Models publicly disclosed | Partially (model family and version confirmed; specific checkpoint details not published) |
| User model selection | [NO OFFICIAL DATA] |
| Proprietary models | Yes (Google Gemini) |
| External models | [NO OFFICIAL DATA] |
| Local models | [NO OFFICIAL DATA] |
| Multimodal models | [NO OFFICIAL DATA — Gemini 3.5 is multimodal; Antigravity-specific modality support not documented in fetched sources] |
| Context window | [NO OFFICIAL DATA] |
| Speed claim | 3.5 Flash "outperforms Gemini 3.1 Pro across almost all benchmarks while running four times faster than other frontier models" (official blog) |
| Processing region | Google infrastructure (cloud-side) |
| Training on user data | [NO OFFICIAL DATA — privacy policy at antigravity.google not resolvable via static fetch] [NEEDS UPDATE] |

*Information status: partially confirmed (model name/version from official blog; model-level specs not documented publicly)*

---

## Permissions & Security

- **Data processing:** Cloud-side (Google infrastructure)
- **Enterprise access:** Available via Gemini Enterprise Agent Platform (Google Cloud); sandboxed isolated environments
- **Certifications / compliance:** [NO OFFICIAL DATA — security policy not accessible due to SPA rendering] [NEEDS UPDATE]
- **SSO / RBAC / SCIM:** [NO OFFICIAL DATA] [NEEDS UPDATE]
- **Audit logs:** [NO OFFICIAL DATA] [NEEDS UPDATE]

---

## Privacy & Data Processing

- **Data transmission:** Code, prompts, and project context are transmitted to Google infrastructure for processing [UNVERIFIED — inferred from cloud architecture; official privacy policy not fetched due to SPA]
- **Privacy policy:** https://antigravity.google/ (SPA — specific privacy policy URL not resolved from available sources) [NEEDS UPDATE]
- **Training opt-out:** [NO OFFICIAL DATA] [NEEDS UPDATE]
- **Prompt logging:** [NO OFFICIAL DATA] [NEEDS UPDATE]
- **Data retention:** [NO OFFICIAL DATA] [NEEDS UPDATE]

---

## Limitations & Risks

| Limitation / Risk | Description | Risk Level |
|-------------------|-------------|------------|
| **Cloud-only processing** | All agent execution is cloud-side on Google infrastructure; no local/offline mode documented | Medium (data risk, compliance) |
| **No public source code** | No public GitHub repository; the agent harness is proprietary and closed-source | Medium (vendor lock-in) |
| **Privacy policy inaccessible** | Specific privacy and data handling terms were not publicly resolvable in available sources | Medium (data risk) [NEEDS UPDATE] |
| **SPA documentation opacity** | The official `antigravity.google` website is a JavaScript SPA; specific page content requires JS rendering | Low (operational) |
| **Vendor lock-in** | Deep integration with Google Cloud, Firebase, Android, and Gemini models creates strong platform dependency | Medium (organizational risk) |
| **Gemini Code Assist sunset** | Gemini CLI and Gemini Code Assist IDE extensions stop serving non-enterprise requests on June 18, 2026 — migration required | Low (migration effort) |

---

## Alternatives

| Alternative | Type | Antigravity 2.0 Advantage | Alternative Advantage | When to Choose Alternative |
|-------------|------|--------------------------|----------------------|---------------------------|
| Cursor | Direct (AI-first IDE) | Google ecosystem integration, shared CLI/SDK/API harness, Science plugin | Full IDE experience, multi-model selection, non-Google stack | IDE-centric workflow; non-Google stack preferred |
| Windsurf | Direct (AI-first IDE) | Google ecosystem, multi-agent orchestration, Android/Firebase native | Multi-model, no Google ecosystem dependency | Non-Google stack preference |
| Claude Code | Direct (CLI coding agent) | Desktop GUI, Google ecosystem integration, Firebase/Android | Anthropic model family; strong non-Google ecosystem | Non-Google stack; Anthropic model preference |
| GitHub Copilot (Agent mode) | Indirect (IDE + CLI) | Native Google ecosystem, Science plugin, SDK | GitHub/VS Code native, multi-model, GitHub Actions | GitHub-centric teams |
| Antigravity CLI | Same ecosystem (different surface) | GUI, scheduled tasks, easier onboarding | Lightweight, faster terminal execution, built in Go | Pure terminal workflow preferred |

---

## Sources

1. **Google I/O 2026 Developer Highlights (official blog)** — https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights *(Antigravity ecosystem description, desktop app features, Managed Agents, AI Studio integrations, pricing)*
2. **Gemini CLI → Antigravity CLI migration notice (official developers blog)** — https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli *(CLI vs desktop product split, shared harness, Gemini CLI sunset timeline June 18 2026, enterprise exceptions)*
3. **Official product site** — https://antigravity.google/ *(HTML meta tags, OG tags; JS-rendered content not fetched)*
4. **Official product page** — https://antigravity.google/product/antigravity-2 *(URL confirmed; JS SPA — content not fetched)*
5. **Google I/O 2026 Keynote — Sundar Pichai (official blog)** — https://blog.google/innovation-and-ai/sundar-pichai-io-2026/ *(Token volume: 3T/day internal; Gemini 3.5 Flash speed claims)*
6. **DeepMind Science Skills README** — https://github.com/google-deepmind/science-skills *(Science plugin, 30+ life science databases)*
7. **MCP documentation** — https://antigravity.google/docs/mcp *(URL confirmed live; SPA content)*
