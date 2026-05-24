# Google Antigravity CLI

```yaml
name: "Google Antigravity CLI"
description: >
  Google Antigravity CLI is the terminal product surface of the Google Antigravity platform, providing a lightweight, high-velocity command-line interface for agent-first development without a graphical user interface. Built in Go, it replaces Gemini CLI and shares the same Antigravity agent harness as the Antigravity 2.0 desktop application, ensuring consistent multi-agent capabilities across surfaces. It supports asynchronous multi-agent workflows, MCP integration, and the Antigravity Skills/plugin system.
category: cli
logo: https://img.logo.dev/antigravity.google?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 21:31

| Field | Value |
|-------|-------|
| Name | Google Antigravity CLI |
| Alternative names | Antigravity CLI |
| Predecessor | Gemini CLI (officially sunsetted for non-enterprise users on June 18, 2026) |
| Vendor / Organization | Google LLC |
| Product owner | Google DeepMind / Google (joint) |
| Homepage | https://antigravity.google/product/antigravity-cli |
| Download | https://antigravity.google/download |
| Documentation | https://antigravity.google/docs/ |
| Migration guide (from Gemini CLI) | https://antigravity.google/docs/gcli-migration |
| Repository | https://github.com/google-antigravity/antigravity-cli |
| Community forum | https://github.com/google-antigravity/antigravity-cli (issues/discussions) |
| First release date | May 19, 2026 (Google I/O 2026 public launch) |
| Current status | GA (Generally Available) |
| Current version | [NO OFFICIAL DATA] |
| Last updated | May 19, 2026 (Google I/O 2026 launch) |

---

## Classification

- **Primary category:** Coding Agent / CLI-based agent development tool
- **Secondary categories:** Part of the Google Antigravity platform (see also: Antigravity 2.0 desktop app at `tools/ide/google-antigravity.md`)
- **Tool type:** SaaS (subscription-based; cloud-processed agent harness)
- **Problem domain:** Software development, AI-assisted coding, multi-agent terminal workflows
- **User interaction type:** CLI (terminal)
- **Automation type:** Autonomous, Semi-autonomous, Asynchronous background agents

---

## Summary

- **One-sentence description:** Google Antigravity CLI is Google's terminal agent development tool, succeeding Gemini CLI with multi-agent asynchronous workflows and a unified agent harness shared with the Antigravity 2.0 desktop application.
- **Extended description:** Announced at Google I/O 2026 on May 19, 2026, Antigravity CLI replaces Gemini CLI for all non-enterprise users (Gemini CLI stops serving requests June 18, 2026). Built in Go for improved performance, it provides a lightweight, graphical-UI-free product surface for developers who prefer to stay in the terminal. Antigravity CLI shares the same Antigravity agent harness as the desktop application, ensuring all future harness improvements apply automatically.
- **Core value proposition:** High-velocity terminal agent workflows with asynchronous multi-agent execution, without requiring a graphical interface.
- **Primary problem solved:** Terminal-based agentic development with multi-agent parallelism and background task execution; migration path for Gemini CLI users.
- **Key differentiator:** Built in Go (snappier execution); asynchronous background workflows without locking the terminal session; unified harness with Antigravity 2.0 desktop; explicit Gemini CLI migration support.
- **Target users:** Software developers preferring terminal workflows; former Gemini CLI users migrating to the Antigravity platform.
- **Anti-target users:** Users who prefer a GUI (use Antigravity 2.0 desktop instead); users requiring fully on-premises or air-gapped deployments.
- **Primary usage context:** Terminal / command-line development environment, with cloud-side agent execution.

---

## Use Cases

### Primary Use Cases

- **Terminal-based agentic code generation:** Develop features, fix bugs, and scaffold applications using multi-step AI agents from the command line.
- **Asynchronous multi-agent workflows:** Run large-scale refactors or research tasks across multiple agents in the background without locking the terminal session.
- **Gemini CLI migration:** Drop-in replacement for Gemini CLI, retaining core features (Agent Skills, Hooks, Subagents, Extensions/plugins).
- **Project context management:** Maintain project-level agent context using GEMINI.md files.

### Secondary Use Cases

- **Google Cloud provisioning:** Provision cloud infrastructure via agent-driven CLI workflows.
- **CI/CD agent tasks:** Use Antigravity CLI in scripts or pipelines where a GUI is unavailable.
- **Custom plugin usage:** Extend agent capabilities with domain-specific plugins (e.g., DeepMind Science Skills).

### Anti-patterns (when NOT to use)

- Workflows requiring a graphical interface or GUI-based agent orchestration (use Antigravity 2.0 desktop instead).
- Tasks requiring no AI assistance (raw script execution, simple file management).
- Environments where cloud data transmission to Google infrastructure is prohibited.

---

## Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Lightweight terminal interface** | High-velocity CLI surface; no GUI required | Stable (GA) |
| **Built in Go** | Rewritten in Go for improved snappiness and responsiveness compared to Gemini CLI | Stable (GA) |
| **Asynchronous workflows** | Orchestrates multiple agents for complex tasks in the background; terminal session is not blocked | Stable (GA) |
| **Unified agent harness** | Shares the same Antigravity agent harness as Antigravity 2.0 desktop; all future harness improvements apply automatically | Stable (GA) |
| **GEMINI.md context files** | Project-specific context files providing persistent, project-scoped instructions to agents | Stable (GA) |
| **MCP support** | Model Context Protocol server configuration | Stable (GA) |

### Features Retained from Gemini CLI

| Feature | Description | Status |
|---------|-------------|--------|
| **Agent Skills** | Curated skill packs extending agent capabilities | Stable (GA) |
| **Hooks** | Custom event-triggered behaviors | Stable (GA) |
| **Subagents** | Spawn sub-tasks within a workflow | Stable (GA) |
| **Plugins** | Extensions system (formerly "Extensions" in Gemini CLI, now "Antigravity plugins") | Stable (GA) |

### Plan-restricted Features

| Feature | Plan Required |
|---------|--------------|
| Standard usage | Google AI Pro |
| 5× higher usage limit | Google AI Ultra ($100/month) |

### Deprecated / Migrated Features

| Feature | Status | Notes |
|---------|--------|-------|
| Gemini CLI | Deprecated (non-enterprise) | Stops serving requests June 18, 2026 for Google AI Pro/Ultra and free individual users |
| Gemini Code Assist IDE extensions | Deprecated (non-enterprise) | Same June 18, 2026 sunset for non-enterprise; no new GitHub organization installs after June 18, 2026 |
| Gemini Code Assist for GitHub | Deprecated (non-enterprise) | No new installs on GitHub organizations after June 18, 2026 |

---

## Interfaces

- **Primary interface:** CLI (terminal)
- **Implementation language:** Go
- **Download:** https://antigravity.google/download
- **Repository:** https://github.com/google-antigravity/antigravity-cli
- **Related surfaces (same platform):**
  - Antigravity 2.0 desktop application — `tools/ide/google-antigravity.md`
  - Antigravity SDK — programmatic agent authoring
  - Managed Agents API — server-side agents via Gemini API
  - Gemini Enterprise Agent Platform — enterprise Google Cloud deployment
- **MCP:** Model Context Protocol integration
- **Skills install:** `npx skills add <repo>`

---

## Operating Modes

| Mode | Description | Autonomy Level |
|------|-------------|----------------|
| **Interactive (CLI)** | Developer interacts with agents via terminal; reviews and approves steps | Semi-autonomous |
| **Asynchronous background** | Agents execute complex tasks (e.g., large refactors, multi-topic research) without locking the terminal | Autonomous |
| **Enterprise (Google Cloud)** | Use with Google Cloud project credentials for enterprise agent workloads | Configurable |

---

## Architecture & Mechanisms

- **Agent harness:** Proprietary "Antigravity agent harness" — the same harness used by Antigravity 2.0 desktop and Google's internal AI developer tools. All future harness improvements automatically apply to the CLI.
- **Implementation language:** Go (rewritten from Gemini CLI for performance improvement).
- **Underlying model:** Gemini 3.5 Flash, co-optimized with the Antigravity harness.
- **Context mechanism:** GEMINI.md project context files provide persistent, project-scoped instructions to agents.
- **Asynchronous execution:** Multiple agents run in the background for complex tasks without blocking the active terminal session.
- **Plugin/Skills layer:** Antigravity plugins (formerly "Extensions" in Gemini CLI) and Agent Skills extend agent capabilities.
- **MCP integration:** Native support for Model Context Protocol server configuration.
- **Internal harness scale:** Google's internal AI developer tools (using the same harness) processed 3 trillion tokens/day by May 2026 (source: Sundar Pichai keynote, Google I/O 2026).

---

## Integrations

| Integration | Type | What It Enables |
|-------------|------|-----------------|
| Google Cloud / Gemini Enterprise Agent Platform | Native | Use Antigravity CLI with Google Cloud project credentials for enterprise agent workloads |
| Model Context Protocol (MCP) | MCP | Configure external MCP servers to extend agent capabilities |
| Skills / plugins | Marketplace (npx) | Install domain-specific skill packs via `npx skills add <repo>` |
| DeepMind Science Skills | Plugin (Build with Google) | Access 30+ life science databases (AlphaGenome, ClinVar, OpenAlex, genomics, structural biology, cheminformatics) |
| Antigravity 2.0 (desktop) | Related product (same harness) | Shared agent harness — improvements to the harness apply to both CLI and desktop surfaces |
| Gemini CLI (migration) | Migration path | Explicit migration docs at `https://antigravity.google/docs/gcli-migration`; Gemini CLI sunsets June 18, 2026 for non-enterprise |

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models used | Gemini 3.5 Flash (Antigravity-optimized variant) |
| Models publicly disclosed | Partially (model family disclosed; specific checkpoint details not published) |
| User model selection | [NO OFFICIAL DATA] |
| Proprietary models | Yes (Google Gemini) |
| External models | [NO OFFICIAL DATA] |
| Local models | [NO OFFICIAL DATA] |
| Multimodal models | [NO OFFICIAL DATA — Gemini is multimodal; Antigravity-specific modal support not documented in fetched sources] |
| Context window | [NO OFFICIAL DATA] |
| Speed claim | 12× faster than other frontier models (Antigravity-optimized Flash variant) [UNVERIFIED — claim from official blog, independent benchmarks not available] |
| Processing region | Google infrastructure (cloud-side) |
| Training on user data | [NO OFFICIAL DATA — privacy policy at antigravity.google not fetched due to SPA rendering] [NEEDS UPDATE] |

*Information status: partially confirmed (model family confirmed from official blog; model-level specs not documented)*

---

## Permissions & Security

- **Data processing:** Cloud-side (Google infrastructure)
- **Internal scale confirmed:** 3 trillion tokens/day processed via Google's internal AI developer tools ecosystem by May 2026
- **Certifications / compliance:** [NO OFFICIAL DATA — security policy not accessible due to SPA rendering] [NEEDS UPDATE]
- **Enterprise access:** Available via Google Cloud / Gemini Enterprise Agent Platform
- **SSO / RBAC / SCIM:** [NO OFFICIAL DATA] [NEEDS UPDATE]
- **Audit logs:** [NO OFFICIAL DATA] [NEEDS UPDATE]

---

## Privacy & Data Processing

- **Data transmission:** Code, prompts, and project context are transmitted to Google infrastructure for processing [UNVERIFIED — inferred from cloud architecture; official privacy policy not fetched]
- **Privacy policy:** https://antigravity.google/ (SPA — specific privacy policy URL not resolved from available sources) [NEEDS UPDATE]
- **Training opt-out:** [NO OFFICIAL DATA] [NEEDS UPDATE]
- **Prompt logging:** [NO OFFICIAL DATA] [NEEDS UPDATE]
- **Data retention:** [NO OFFICIAL DATA] [NEEDS UPDATE]

---

## Limitations & Risks

| Limitation / Risk | Description | Risk Level |
|-------------------|-------------|------------|
| **SPA documentation opacity** | The official `antigravity.google` website is a JavaScript SPA; specific page content (docs, blog posts, pricing details) requires browser JS rendering and is not accessible via static fetch | Low (operational) |
| **No public source code** | No public GitHub repository exists; the agent harness is proprietary and closed-source | Medium (vendor lock-in) |
| **Cloud-only processing** | All agent execution is cloud-side on Google infrastructure; no local/offline mode documented | Medium (data risk, compliance) |
| **Gemini CLI deprecation** | Users of Gemini CLI must actively migrate to Antigravity CLI; Gemini CLI is being sunset | Low (migration effort) |
| **Privacy policy inaccessible** | Specific privacy and data handling terms for Antigravity were not publicly resolvable in available sources | Medium (data risk) [NEEDS UPDATE] |
| **Model speed claim unverified** | The "12× faster than frontier models" claim for Gemini 3.5 Flash in the Antigravity harness has no published independent benchmark | Low (quality risk) |
| **Vendor lock-in** | Deep integration with Google Cloud, Firebase, Android, and Gemini models creates strong platform dependency | Medium (organizational risk) |

---

## Alternatives

| Alternative | Type | Antigravity CLI Advantage | Alternative Advantage | When to Choose Alternative |
|-------------|------|--------------------------|----------------------|---------------------------|
| Antigravity 2.0 (desktop) | Same ecosystem (different surface) | Lightweight, faster Go execution, no GUI required | GUI, scheduled tasks, easier onboarding, Android/Firebase native | GUI workflow preferred |
| Claude Code (Anthropic) | Direct (CLI coding agent) | Google ecosystem integration, Gemini model, asynchronous background agents | Anthropic model family; strong non-Google ecosystem | Non-Google stack; Anthropic model preference |
| Gemini CLI | Direct (predecessor, deprecated) | Go performance, async workflows, unified harness — Gemini CLI is being sunset | None — migrate to Antigravity CLI | Not recommended — Gemini CLI sunsets June 18, 2026 |
| Aider | Indirect (CLI coding agent) | Google ecosystem, managed agents, unified harness | Open source, local models, no vendor lock-in | Open-source / local-model preference |
| GitHub Copilot CLI | Indirect (CLI coding assistant) | Multi-agent async workflows, Google ecosystem | GitHub/VS Code native integration, multi-model | GitHub-centric teams |

---

## Changelog

### [2026-05-24] Profile split and CLI-specific update
- Original profile covered entire Antigravity platform (desktop + CLI + SDK)
- Profile split into two separate files:
  - `tools/cli/google-antigravity.md` (this file) — Antigravity CLI only
  - `tools/ide/google-antigravity.md` — Antigravity 2.0 desktop application
- Added CLI-specific facts from official sources: Go implementation, asynchronous workflows, features retained from Gemini CLI (Skills, Hooks, Subagents, plugins), GitHub repo URL, Gemini CLI sunset date (June 18 2026), enterprise exceptions, download URL
- Sources: Google I/O 2026 Developer Highlights blog post; Gemini CLI → Antigravity CLI migration notice (developers.googleblog.com)

---

## Sources

1. **Google I/O 2026 Developer Highlights (official blog)** — https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights *(Antigravity ecosystem description, CLI product surface, pricing)*
2. **Gemini CLI → Antigravity CLI migration notice (official developers blog)** — https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli *(CLI built in Go, asynchronous workflows, features retained, GitHub repo, Gemini CLI sunset June 18 2026, enterprise exceptions)*
3. **Official product site** — https://antigravity.google/ *(HTML meta tags; JS-rendered content not fetched)*
4. **Official product page (CLI)** — https://antigravity.google/product/antigravity-cli *(URL confirmed; JS SPA — content not fetched)*
5. **Google I/O 2026 Keynote — Sundar Pichai (official blog)** — https://blog.google/innovation-and-ai/sundar-pichai-io-2026/ *(Token volume, Gemini 3.5 Flash claims)*
6. **DeepMind Science Skills README** — https://github.com/google-deepmind/science-skills *(Science plugin, 30+ life science databases)*
7. **google-deepmind/concordia docs** — https://github.com/google-deepmind/concordia *(Antigravity alongside Claude Code as agentic coding tool)*
8. **Gemini CLI → Antigravity CLI migration docs** — https://antigravity.google/docs/gcli-migration *(URL confirmed; SPA content)*
9. **Antigravity CLI community forum / repository** — https://github.com/google-antigravity/antigravity-cli
