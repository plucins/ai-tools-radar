# Windsurf
```yaml
name: "Windsurf"
description: >
  Windsurf is an AI-first IDE and IDE-plugin platform for code generation, editing, search, and agentic software-development tasks. Its Cascade agent combines codebase retrieval, tool calling, terminal execution, and optional web/MCP access inside the editor, with human-approval controls and enterprise deployment options.
category: ide
logo: https://img.logo.dev/codeium.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | Windsurf |
| Alternative names | Codeium; Codeium IDE; legacy documentation and changelog entries tie Cascade to the Codeium brand during the transition to Windsurf |
| Vendor / Organization | Exafunction, Inc. in the privacy policy; newer official pages and docs also reference Cognition AI, Inc. / Cognition in 2025-2026 materials [NEEDS UPDATE: official-source transition] |
| Homepage | https://windsurf.com ; legacy product URL https://codeium.com/windsurf |
| Documentation | https://docs.windsurf.com |
| Changelog | https://codeium.com/changelog |
| First release date | 13-11-2024 (`1.0.2`, changelog heading: "Windsurf Launch" / "Windsurf General Release!") |
| Current status | Active commercial product; stable release channel plus opt-in prerelease channel `Windsurf Next` |
| Current version | `2.3.9` (latest numbered Windsurf Editor changelog entry observed) |
| Last updated | 17-05-2026 |

## Classification

- **Primary category:** IDE
- **Secondary categories:** AI coding agent; IDE plugin platform; enterprise developer tooling
- **Tool type:** Proprietary desktop IDE plus proprietary plugins and enterprise deployment options
- **Problem domain:** Multi-file code generation, refactoring, debugging, codebase understanding, and agent-assisted software delivery
- **User interaction type:** Editor UI, chat/agent panel, inline editor actions, terminal actions, slash commands, Kanban-style agent dashboard
- **Automation type:** Collaborative agent by default; higher-autonomy local execution with configurable auto-execution; optional cloud autonomy through Devin

## Summary

- **One-sentence description:** Windsurf is an editor-centered coding agent platform that combines IDE context, retrieval, tool use, terminal execution, and optional cloud agents.
- **Extended description:** Cascade is the primary local agent inside Windsurf and operates in Code, Plan, and Ask modes. The platform adds MCP connectivity, persistent rules and memories, worktrees, hooks, workflows, app deploys, codemaps, and optional Devin cloud sessions.
- **Core value proposition:** Keep code search, planning, editing, command execution, and agent coordination inside one editor workflow.
- **Primary problem solved:** Reducing manual context gathering and multi-step coordination when implementing, debugging, or exploring software projects.
- **Key differentiator:** A collaborative local IDE agent (`Cascade`) is combined with retrieval systems such as Fast Context, configurable governance controls, and a separate cloud-agent path through Devin.
- **Target users:** Individual developers, software teams, enterprise engineering organizations, and regulated environments needing policy controls or non-default deployment options.
- **Anti-target users:** Users seeking only lightweight autocomplete, or teams requiring a fully offline/self-contained editor experience with the full Windsurf Editor and Cascade feature set.
- **Primary usage context:** Daily coding inside Windsurf Editor, with optional plugin usage in other IDEs and optional enterprise administration features.

## Use Cases

### Primary use cases

- Implementing multi-file features with code search, planning, edits, and terminal execution in one conversation
- Debugging build/test/runtime issues from stack traces, Problems panel items, or terminal selections
- Refactoring or updating existing code with approval-controlled file changes and checkpoints
- Exploring unfamiliar codebases with Fast Context, Codemaps, @mentions, and Ask mode

### Secondary use cases

- Running repeatable engineering procedures through slash-invoked Workflows
- Enforcing organization policies with Rules, AGENTS.md, Hooks, and admin controls
- Connecting external services and APIs through MCP servers
- Delegating longer-running tasks to Devin cloud sessions and managing them from the Agent Command Center
- Deploying JS web apps to Netlify for preview URLs through App Deploys (beta)

### Example workflows

1. Open Cascade with `Cmd/Ctrl+L`, switch to **Plan** mode, inspect the repo, then click **Implement** to move to **Code** mode.
2. Highlight a stack trace in the terminal, send it to Cascade, then let Cascade edit files and run commands with approval.
3. Invoke a saved workflow such as `/deployment` or a custom workflow from `.windsurf/workflows/*.md`.
4. Ask Cascade to use web/docs search with `@web`, `@docs`, or a pasted URL, then apply changes locally.
5. Start a worktree-backed session for parallel edits and later merge the result back into the main workspace.

### Anti-patterns

- Running simultaneous Cascades on the same files without worktrees; official docs warn that edits can race
- Expecting self-hosted deployments to provide the full Windsurf Editor or Cascade feature set; official security docs say the self-hosted tier does not support them
- Using App Deploys for sensitive production deployments; docs position it primarily for previews and public URLs

## Features

### Core features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| Cascade | Local agent inside Windsurf with Code/Chat behavior, tool calling, voice input, checkpoints, real-time awareness, and linter integration. | Included in Windsurf Editor docs; no separate restriction stated for the editor feature itself | Stable | https://docs.windsurf.com/windsurf/cascade/cascade.md |
| Cascade modes | `Code`, `Plan`, and `Ask` modes separate implementation, planning, and read-only exploration. | Included in Windsurf Editor docs | Stable | https://docs.windsurf.com/windsurf/cascade/modes.md |
| Windsurf Tab / Supercomplete / Tab to Jump | Passive predictive assistance for code completion and navigation; product pages describe Tab to Jump and Supercomplete as first-class editor capabilities. | Product-page feature; no separate restriction stated | Stable | https://codeium.com/windsurf ; https://docs.windsurf.com/tab/overview.md |
| Inline command and terminal command | `Cmd/Ctrl+I` supports natural-language code edits in the editor and natural-language CLI generation in the terminal. | Windsurf editor feature; no separate restriction stated | Stable | https://codeium.com/windsurf ; https://docs.windsurf.com/windsurf/terminal |
| Fast Context | Specialized retrieval subagent using `SWE-grep` / `SWE-grep-mini`; documented as up to 20x faster than traditional agentic search. | Product/docs feature; no separate restriction stated | Stable | https://docs.windsurf.com/context-awareness/fast-context.md |
| Context awareness | RAG-based indexing over local codebases, with remote indexing for Teams and Enterprise and Google Docs knowledge base for Teams/Enterprise. | Local indexing: default; remote indexing and Knowledge Base: Teams / Enterprise | Stable / Beta (Knowledge Base) | https://docs.windsurf.com/context-awareness/overview.md |
| MCP support | Cascade can connect to MCP servers over `stdio`, Streamable HTTP, or SSE, with optional OAuth and tool toggling. | Available in Windsurf; enterprise users must manually enable; Teams/Enterprise add admin controls | Stable | https://docs.windsurf.com/windsurf/cascade/mcp.md |
| Workflows | Reusable markdown workflows invoked by slash command, stored in workspace/global/system locations. | Included in Windsurf; enterprise adds system workflows | Stable | https://docs.windsurf.com/windsurf/cascade/workflows.md |

### Advanced features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| Agent Command Center | Kanban-style view in Windsurf 2.0 for managing local Cascade sessions and cloud Devin sessions. | Windsurf 2.0 feature; no separate restriction stated | Stable | https://docs.windsurf.com/windsurf/agent-command-center.md ; https://windsurf.com/blog/windsurf-2-0 |
| Spaces | Task-level grouping of agent sessions, PRs, files, and shared context. | Windsurf 2.0 feature; no separate restriction stated | Stable | https://docs.windsurf.com/windsurf/spaces |
| Devin integration | Cloud agent sessions inside Windsurf; each Devin session runs on its own VM and consumes shared Windsurf usage. | Self-serve `Pro`, `Max`, `Teams`; Enterprise requires admin enablement | Stable | https://docs.windsurf.com/windsurf/devin |
| Hooks | Pre/post shell hooks around read, write, command, MCP, prompt, and response events; supports blocking pre-hooks with exit code `2`. | Windsurf and enterprise/system deployment locations documented | Stable | https://docs.windsurf.com/windsurf/cascade/hooks.md |
| Rules, Memories, AGENTS.md, Skills | Persistent behavior and context controls across global/workspace/system scopes, including directory-scoped `AGENTS.md` and progressive-disclosure Skills. | Core feature set; enterprise adds system scopes | Stable | https://docs.windsurf.com/windsurf/cascade/memories.md ; https://docs.windsurf.com/windsurf/cascade/agents-md.md ; https://docs.windsurf.com/windsurf/cascade/skills.md |
| Worktrees | Per-session git worktree isolation for parallel tasks, with automatic cleanup and merge-back flow. | Windsurf feature; no separate restriction stated | Stable | https://docs.windsurf.com/windsurf/cascade/worktrees.md |
| Codemaps | Shareable hierarchical maps of code execution flow and component relationships, generated by a specialized agent. | Sharing for enterprise requires opt-in because codemaps must be stored on vendor servers | Stable | https://docs.windsurf.com/windsurf/codemaps.md |
| Adaptive | Model router that chooses the underlying model automatically per task, with fixed per-token pricing on self-serve plans. | Available through model picker; pricing varies by billing model | Stable | https://docs.windsurf.com/windsurf/adaptive.md |

### Experimental / beta features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| App Deploys | Deploy JS web apps to Netlify from Cascade; creates `windsurf_deployment.yaml`, uploads project files to vendor servers, and issues public URLs. | Free / Pro documented with explicit rate limits; Teams / Enterprise can connect Netlify team accounts | Beta | https://docs.windsurf.com/windsurf/cascade/app-deploys.md |
| Dedicated Cascade terminal | Separate `zsh` terminal on macOS for more reliable agent command execution. | macOS; opt-in in Wave 13 for Stable at announcement time | Beta | https://codeium.com/changelog ; https://docs.windsurf.com/windsurf/terminal |
| Custom app icons | Select alternate dock icons. | Paying users on macOS | Beta | https://docs.windsurf.com/windsurf |
| Windsurf Next | Opt-in prerelease channel for earlier access to new features. | Opt-in prerelease download | Preview / prerelease | https://docs.windsurf.com/windsurf |

## Interfaces

- **Interface types:** Desktop IDE, IDE plugins, chat/agent panel, inline editor actions, terminal integration, command palette actions, Kanban-style agent dashboard
- **Supported Windsurf Editor operating systems:**
  - macOS: OS X Yosemite minimum
  - Windows: Windows 10 minimum
  - Ubuntu: `>= 20.04` or `glibc >= 2.31`, `glibcxx >= 3.4.26`
  - Other Linux distributions: `glibc >= 2.28`, `glibcxx >= 3.4.25`
- **Supported plugin IDEs / minimum versions:**
  - VS Code `1.89+`
  - JetBrains `2023.3+`
  - JetBrains Remote Development `2025.1.3+`
  - Visual Studio `17.5.5+`
  - NeoVim `0.6+`
  - Vim `9.0.0185+`
  - Emacs (all versions compiled with `lbxml`)
  - Xcode (all versions)
  - Sublime Text `3+`
  - Eclipse `4.25+`
- **Editor migration/import paths:** start fresh, import from VS Code, or import from Cursor
- **Key shortcuts / commands:**
  - `Cmd/Ctrl+L` — open Cascade
  - `Cmd/Ctrl+I` — inline editor command / terminal command
  - `Cmd/Ctrl+.` — switch Cascade mode
  - `Cmd/Ctrl+T` — create a new session in the current Space
  - `Cmd/Ctrl+\` — split pane and create a new session in the same Space
  - `Check for Updates` — command palette action
  - `Reset Onboarding` — command palette action
- **Slash-command surface:** Workflows are invoked as `/[workflow-name]`; built-in workflows include `/plan`

## Operating Modes

| Mode | Description | Autonomy level | Limitations |
|---|---|---|---|
| Code | Default fully agentic local mode for edits, commands, dependency installation, and multi-step task execution. | Semi-autonomous collaborative agent | File edits still require review/acceptance; arbitrary command execution is approval-gated unless auto-execution settings allow otherwise. |
| Plan | Planning mode that explores the codebase, asks clarifying questions, and writes a detailed markdown plan. | Assistive | Intended to hand off into Code mode for implementation. |
| Ask | Read-only exploration mode. | Low | Can search and analyze, but cannot change files. |
| Worktree session | Starts a Cascade session in a git worktree for isolation and later merge-back. | Semi-autonomous | Must be selected at the start of a session; docs warn that relative-path builds and untracked files may break without hooks. |
| Cloud agent (Devin) | Runs work on a separate VM while remaining visible in Windsurf and Agent Command Center. | Higher autonomy | Consumes shared Windsurf usage; Enterprise admins must enable access. |

## Architecture & Mechanisms

- **Collaborative agent model:** Windsurf describes Cascade as a "collaborative agent" rather than an autonomous agent. The user remains in the loop, file changes require explicit review and acceptance, and terminal commands with side effects are approval-gated by default.
- **Context engine:** Windsurf documents a retrieval-augmented approach (`RAG`) to codebase understanding and references its `M-Query` techniques for prompt construction.
- **Indexing and embeddings:** Local codebases are indexed by default. For ahead-of-time personalization, codebase parsing happens on the client machine and individual snippets are sent for embedding computation rather than sending an entire codebase in one request.
- **Fast Context retrieval:** `SWE-grep` and `SWE-grep-mini` are specialized retrieval models. Official docs say they can execute up to 8 parallel tool calls per turn for up to 4 turns.
- **Tool-calling limits:** Cascade can make up to 20 tool calls per prompt; using `continue` after a stop counts as a new prompt credit / usage event.
- **Planning mechanism:** For longer tasks, docs state that a specialized planning agent continuously refines the long-term plan while the selected model handles short-term actions.
- **Session compression:** Official changelog/docs say Cascade periodically summarizes and checkpoints earlier conversation parts to mitigate context-window growth.
- **Model routing:** Users may pick explicit models or choose `Adaptive`, which routes each request to an underlying model automatically.
- **Terminal execution path:** Terminal commands run locally through the IDE terminal. On macOS, a dedicated `zsh`-based Cascade terminal was introduced in Wave 13.
- **Remote/cloud execution path:** Devin sessions run on separate VMs in the cloud and surface back into Windsurf.
- **Deployment architecture:** Official security docs describe Cloud, Enterprise Hybrid, and Enterprise Self-hosted deployment modes. Hybrid uses a customer-managed CPU/storage tenant plus Cloudflare Tunnel; Self-hosted can use Docker Compose or Helm/Kubernetes and private LLM endpoints.
- **Sandboxing:** No general-purpose mandatory sandbox boundary is documented for the Windsurf Editor. Isolation mechanisms described publicly are approval flows, worktrees, allow/deny controls, and deployment separation.

## Tool Capabilities

| Capability | Description | Scope | Control mechanism |
|---|---|---|---|
| File reading | Cascade can read files and directories, and `Fast Context` can retrieve relevant code automatically. `.codeiumignore` can exclude files from viewing, editing, or creation. | Local workspace; remote repositories for supported enterprise indexing features | `.codeiumignore`, Hooks (`pre_read_code`), Rules, admin policy |
| File editing | Cascade can create, edit, delete, and revert files; changes are shown for explicit user review and acceptance. | Local workspace or worktree | User review/acceptance, Hooks (`pre_write_code`), Rules |
| Command execution | Cascade can run safe constrained terminal commands automatically and can suggest arbitrary commands for user approval. Auto-execution has `Disabled`, `Allowlist Only`, `Auto`, and `Turbo` levels. | Local machine terminal / worktree | Per-user auto-execution level, allow/deny lists, team admin max level, Hooks (`pre_run_command`) |
| Code execution | Builds, tests, installs, and other executable workflows run through the terminal; App Deploys uploads project code to vendor servers for Netlify deployment. | Local terminal or vendor-managed deploy path | Terminal approvals, plan restrictions, App Deploys feature toggle |
| Web and documentation access | `@web`, `@docs`, pasted URLs, and page-reading are supported; web search is admin-controlled, while direct page reads happen locally on the user's machine. | Open web, documentation pages, pasted URLs | Web search setting, team admin control, Hooks / policies |
| External tool/API usage | MCP servers expose additional tools, resources, and prompts over `stdio`, Streamable HTTP, or SSE. | Any system reachable through configured MCP servers | MCP config, per-tool enable/disable, team whitelist/registry, Hooks (`pre_mcp_tool_use`) |
| Cloud-agent execution | Devin can execute end-to-end tasks on its own VM and report results back into Windsurf. | Vendor-managed VM | Plan entitlement, admin enablement |
| Governance and auditability | Hooks, rules, system-level policies, team command lists, MCP whitelists, RBAC, SSO/SCIM, audit logs (for some enterprise deployments) are documented. | User, team, or enterprise scope | Admin portal, local/system files, deployment choice |

## Agent Tool Primitives

> Windsurf does not publish a single complete internal tool-reference page. The table below lists tool/action primitives that are explicitly documented in Cascade docs, security docs, and hook-event documentation.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `Search` | High-level Cascade tool for searching the codebase. | Not separately documented as approval-gated | Mentioned in Cascade overview as a built-in tool category |
| `Analyze` | High-level Cascade tool for codebase analysis / understanding. | Not separately documented as approval-gated | Mentioned in Cascade overview as a built-in tool category |
| `read_code` | Reads a code file or directory; exposed in hook events as `pre_read_code` / `post_read_code`. | No explicit manual approval requirement documented; can be blocked by hooks | Documented action primitive |
| `write_code` | Writes or modifies files; exposed in hook events as `pre_write_code` / `post_write_code`. | Resulting file changes require explicit user review and acceptance | Documented action primitive |
| `run_command` | Executes terminal commands locally; hooks expose `pre_run_command` / `post_run_command`. | Yes for arbitrary commands by default; safer constrained commands may auto-run depending on settings | Documented action primitive |
| `web_search` | Performs open-web search and page retrieval for current information. | Teams/Enterprise admin control for open-web search; direct page reads from pasted URLs happen locally | Documented feature/tool |
| `mcp_tool_use` | Invokes MCP-provided tools; exposed in hook events as `pre_mcp_tool_use` / `post_mcp_tool_use`. | Policy-dependent; can be blocked by hooks and team whitelist/registry rules | Documented action primitive |

## Integrations

### Native integrations

- **Devin** cloud-agent integration inside Windsurf
- **Netlify** for App Deploys
- **Google Drive / Google Docs** for Knowledge Base (Teams / Enterprise)
- **Git worktrees** for parallel sessions
- **AI commit messages** inside Windsurf

### MCP support

- Transport support: `stdio`, Streamable HTTP, `SSE`
- OAuth support for each transport type
- Local config file: `~/.codeium/windsurf/mcp_config.json`
- Tool enable/disable per server
- Limit of **100 total enabled MCP tools** available to Cascade at one time
- Team admin controls: registry URLs, whitelists, regex-based config matching

### IDE integrations

- Windsurf Editor
- VS Code import path
- Cursor import path
- Plugin support across VS Code, JetBrains, Visual Studio, NeoVim, Vim, Emacs, Xcode, Sublime Text, Eclipse

### Git integrations

- Worktree creation and merge-back flow for Cascade sessions
- AI-generated commit messages
- PRs can be grouped into Spaces; GitHub MCP examples are documented for repository operations

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | Proprietary `SWE-1.6`, `SWE-1.6 Fast`, `SWE-1.5`, `SWE-1`, `SWE-1-mini`, `swe-grep`, `SWE-grep-mini`; `Adaptive` model router; official changelog also documents third-party model additions such as GPT-5.2 Codex, Claude Opus 4.7 (fast mode), and Gemini 3.1 Pro |
| Models publicly disclosed | Partially |
| User model selection | Yes |
| Proprietary models | Yes |
| External models | Anthropic, OpenAI, Google Vertex API, xAI, DeepSeek via Fireworks are explicitly mentioned in security/model materials; BYOK is documented for Claude 4 Sonnet / Opus variants |
| Local models | [UNVERIFIED] No on-device local model execution in Windsurf Editor is documented; Enterprise Self-hosted can connect private trusted LLM endpoints such as AWS Bedrock, Azure OpenAI, and Google Vertex AI |
| Multimodal models | Yes — Windsurf supports image drag-and-drop into Cascade |
| Context window | No fixed global size published; Windsurf exposes a context-window indicator and documents periodic summarization/checkpointing |
| Token limits | No single product-wide token cap published; usage is token-based and docs include a worked example totaling ~200k tokens for one Cascade trajectory |
| Processing region | Standard US deployment; EU deployment in Frankfurt, Germany; FedRAMP High deployment through AWS GovCloud / Palantir FedStart |
| Training on user data | Privacy policy states Windsurf may use Log and Usage Information and Prompts/Outputs to train, develop, and improve models/services; security docs add zero-data-retention defaults for Teams/Enterprise and optional ZDR for individual users |
| Information status | Partially confirmed |

## Permissions & Security

- **Approval model:** Windsurf documents a human-in-the-loop flow. File state changes require explicit review and acceptance; arbitrary terminal commands require explicit approval by default.
- **Auto-execution controls:** `Disabled`, `Allowlist Only`, `Auto`, `Turbo`; Teams and Enterprise admins can cap the maximum level.
- **Command policy controls:** User and team allowlists / denylists are supported; denylist takes precedence.
- **MCP controls:** Team admins can disable MCP entirely, point to custom registries, or whitelist exact/regex-matched MCP configurations.
- **Deployment options:** Cloud, Enterprise Hybrid, Enterprise Self-hosted.
- **Identity:** Enterprise supports SSO via SAML; docs also cover SCIM and RBAC configuration.
- **Encryption:** Official security docs state all data is encrypted via TLS between client and vendor servers.
- **Data regions:** US standard, Frankfurt EU, and FedRAMP High environments are documented.
- **Retention posture:** Teams and Enterprise cloud requests use zero-data-retention by default; individuals can opt into ZDR; some optional features require retention or non-ZDR subprocessors.
- **Certifications / compliance:** SOC 2 Type II; annual third-party penetration testing (last completed 13-02-2025); FedRAMP High availability; HIPAA compliance stance with BAA for significant implementations.
- **Audit / attribution logging:** Enterprise Hybrid and Self-hosted docs describe audit logging and attribution logging stored in the customer's private tenant.

## Privacy & Data Processing

- **Data sent by the client:** relevant code snippets, recent editor actions, conversation history when applicable, user-specified signals such as rules/memories/context pinning, plus usage metadata.
- **Whole-codebase handling:** Security docs state no single request contains an entire codebase or large contiguous code sections; codebase parsing for ahead-of-time personalization happens on the client.
- **What the privacy policy says is collected:** registration information, communications, log and usage data, prompts and outputs, and voice-command transcriptions. Voice audio is discarded after processing; text transcriptions are retained as log/usage information.
- **Where processed:** vendor-managed infrastructure on GCP for cloud paths; inference may run on Windsurf-managed infrastructure or subprocessors. Enterprise offerings add US / EU / FedRAMP variants.
- **Retention:** individual-plan logs may retain code snippets and user trajectories when ZDR is not enabled; Teams/Enterprise default to ZDR unless admins enable retention-dependent features.
- **Training opt-out / retention posture:** not framed as a universal global opt-out in the privacy policy; ZDR modes and enterprise deployment choices materially change retention and exposure.
- **Admin visibility:** privacy policy states enterprise/business administrators may be able to access certain account information including prompts and outputs.
- **Subprocessors explicitly named in security docs:** GCP, Crusoe, Modal, Oracle Cloud, Palantir, AWS, OpenAI, Anthropic, Google Vertex API, xAI, Fireworks, Bing API, Firebase, Stripe, Zendesk, and others.
- **Privacy policy URL:** https://codeium.com/privacy-policy

## Limitations & Risks

### Functional limitations

- **No extension marketplace in Windsurf Editor:** docs state incompatible extensions include other AI completion extensions and proprietary extensions, and that marketplace installs are not supported in Windsurf Editor.
- **Self-hosted feature gap:** Enterprise Self-hosted does not support major Windsurf products such as the Windsurf Editor or Cascade.
- **Web reading quality:** docs explicitly say not all pages can be parsed yet.
- **MCP tool ceiling:** Cascade can access at most **100** enabled MCP tools at a time.
- **Tool-call ceiling:** Cascade can make up to **20** tool calls per prompt before requiring `continue`.

### Operational limitations

- **Context-window pressure:** earlier context can be dropped as the window grows; Windsurf added an indicator to expose current usage.
- **Parallel-edit race risk:** official docs warn that simultaneous Cascades editing the same file can race.
- **Worktree setup gaps:** `.env` files and other untracked assets are not copied automatically into worktrees; relative-path build systems may break.
- **App Deploys are preview-oriented:** deployments are public by default, limited to Netlify in current docs, and unclaimed sites may be deleted after an unspecified period.

### Security / data risks

- **Open-web search exposure:** Bing API queries can be derived from prompts, conversation history, and potentially code data; Teams/Enterprise must explicitly enable this because Bing does not have a zero-data-retention agreement.
- **App Deploys upload code to vendor servers:** docs explicitly warn to deploy only code you are comfortable sharing publicly.
- **Prompt/output usage for model improvement:** privacy policy states prompts/outputs and usage data may be used to train and improve AI systems.
- **MCP risk surface:** vendor docs note MCP tool calls can invoke arbitrary server code and Windsurf does not assume liability for MCP tool failures.

## Pricing

| Plan | Official price | Usage model / notable notes |
|------|----------------|-----------------------------|
| Free | `$0/month` | Light quota; when depleted, usage waits for the next daily/weekly reset. |
| Pro | `$20/month` | Standard quota; can purchase extra usage billed at API list prices. |
| Max | `$200/month` | Heavy quota; can purchase extra usage billed at API list prices. |
| Teams | `$40/user/month` | Standard quota with centralized billing and admin analytics; docs note new Teams plans do not include SSO. |
| Enterprise | `Let's talk` / custom | Contracted pricing, deployment options, enterprise admin features, RBAC, SSO/access controls, volume discounts, and hybrid/self-hosted options per vendor materials. |

### Pricing notes

- Windsurf replaced its credit-based self-serve system with a **quota-based usage system** in **March 2026**.
- Quotas are measured as a daily and weekly budget; model cost varies by token usage and selected model.
- Extra usage is billed at API list prices for the chosen model.
- `Adaptive` self-serve introductory pricing is documented through **07-06-2026** at `$0.50 / 1M input tokens`, `$2.00 / 1M output tokens`, and `$0.10 / 1M cache-read tokens`.

## Usage Examples

| Example | Purpose | Command / prompt | Expected behavior | Source |
|---|---|---|---|---|
| Open Cascade | Start an agent session | `Cmd/Ctrl+L` | Opens Cascade and includes selected editor/terminal text automatically | https://docs.windsurf.com/windsurf/cascade/cascade.md |
| Switch mode | Move between planning and coding | `Cmd/Ctrl+.` | Toggles among `Code`, `Plan`, and `Ask` modes | https://docs.windsurf.com/windsurf/cascade/modes.md |
| Use terminal command mode | Generate CLI syntax from natural language | `Cmd/Ctrl+I` in terminal | Windsurf generates the corresponding terminal command | https://docs.windsurf.com/windsurf/terminal |
| Force web search | Ask for fresh internet context | `@web What's new in the latest version of React?` | Cascade may search the web and cite retrieved pages | https://docs.windsurf.com/windsurf/cascade/web-search.md |
| Query docs corpus | Ask Cascade to search documentation | `@docs how do I configure MCP?` | Cascade searches the documented docs-reading path | https://docs.windsurf.com/windsurf/cascade/web-search.md |
| Invoke a workflow | Run a saved repeatable process | `/deployment` | Cascade executes the named workflow from `.windsurf/workflows/*.md` or another workflow scope | https://docs.windsurf.com/windsurf/cascade/workflows.md |
| Deploy an app preview | Publish a JS app to Netlify via Cascade | `Deploy this project to Netlify` | Cascade uploads the project, creates a deployment, and returns a public URL | https://docs.windsurf.com/windsurf/cascade/app-deploys.md |
| Ask for a memory | Persist reusable context | `create a memory of ...` | Cascade stores a workspace-local memory in `~/.codeium/windsurf/memories/` | https://docs.windsurf.com/windsurf/cascade/memories.md |

## Sources

- https://codeium.com/windsurf
- https://windsurf.com
- https://docs.windsurf.com
- https://docs.windsurf.com/llms.txt
- https://docs.windsurf.com/windsurf
- https://docs.windsurf.com/windsurf/cascade/cascade.md
- https://docs.windsurf.com/windsurf/cascade/modes.md
- https://docs.windsurf.com/windsurf/cascade/mcp.md
- https://docs.windsurf.com/windsurf/cascade/web-search.md
- https://docs.windsurf.com/windsurf/cascade/workflows.md
- https://docs.windsurf.com/windsurf/cascade/worktrees.md
- https://docs.windsurf.com/windsurf/cascade/hooks.md
- https://docs.windsurf.com/windsurf/cascade/memories.md
- https://docs.windsurf.com/windsurf/cascade/agents-md.md
- https://docs.windsurf.com/windsurf/cascade/skills.md
- https://docs.windsurf.com/windsurf/terminal
- https://docs.windsurf.com/windsurf/models
- https://docs.windsurf.com/windsurf/adaptive.md
- https://docs.windsurf.com/windsurf/accounts/usage.md
- https://docs.windsurf.com/windsurf/accounts/quota.md
- https://docs.windsurf.com/windsurf/agent-command-center.md
- https://docs.windsurf.com/windsurf/spaces
- https://docs.windsurf.com/windsurf/devin
- https://docs.windsurf.com/windsurf/codemaps.md
- https://docs.windsurf.com/windsurf/cascade/app-deploys.md
- https://docs.windsurf.com/tab/overview.md
- https://docs.windsurf.com/context-awareness/overview.md
- https://docs.windsurf.com/context-awareness/fast-context.md
- https://docs.windsurf.com/plugins/compatibility.md
- https://codeium.com/changelog
- https://codeium.com/pricing
- https://codeium.com/security
- https://codeium.com/privacy-policy
- https://windsurf.com/blog/windsurf-2-0
- https://windsurf.com/blog/windsurf-rebrand-announcement
- https://windsurf.com/blog/windsurfs-next-chapter
- https://windsurf.com/blog/our-commitment-cognition-partnership
