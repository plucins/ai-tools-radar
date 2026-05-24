# Refact.ai

```yaml
name: "Refact.ai"
description: >
  Refact.ai is an open-source, local-first AI coding assistant delivered primarily through VS Code and JetBrains plugins backed by a local Rust engine (`refact-lsp`). It supports chat, autonomous agent workflows, code completion, browser and database tools, and BYOK or local model routing instead of a bundled Refact inference service.
category: ide
logo: https://img.logo.dev/refact.ai?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Open Source
```

## Tool Identification

**Last update:** 24-05-2026 21:24

| Field | Value |
|-------|-------|
| Name | Refact.ai |
| Alternative names | Refact; Codify (marketplace slug); VS Code extension ID `smallcloud.codify`; JetBrains plugin ID `com.smallcloud.codify` |
| Vendor / Organization | smallcloudai / Small Magellanic Cloud AI |
| Homepage | https://refact.ai |
| Documentation | https://docs.refact.ai |
| Changelog | https://github.com/smallcloudai/refact/releases |
| Repository | https://github.com/smallcloudai/refact |
| VS Code Marketplace | https://marketplace.visualstudio.com/items?itemName=smallcloud.codify |
| JetBrains Marketplace | https://plugins.jetbrains.com/plugin/20647-codify |
| First release date | 2023-10-06 (earliest public GitHub release found: `v1.0.0`) |
| Current status | Active open-source local-first project. Refact Cloud retirement was announced on 2026-04-30; final shutdown date is [NEEDS UPDATE]. |
| Current version | 8.0.4 |
| Last updated | 2026-05-14 (GitHub release `release/v8.0.4`) |
| License | BSD-3-Clause |
| Minimum VS Code version | `^1.69.0` |
| JetBrains build range | `251` to `261.*` |

---

## Classification

- **Primary category:** IDE extension
- **Secondary categories:** Coding agent; local-first BYOK/self-hosted developer tool
- **Tool type:** Open-source IDE plugins backed by a local engine (`refact-lsp`)
- **Problem domain:** AI-assisted software development inside the editor
- **User interaction type:** IDE sidebar/tool window chat, inline completion, command palette/actions, agent workflows, local HTTP/LSP engine
- **Automation type:** Assistive and semi-autonomous; actual autonomy depends on mode, configured tools, and confirmation rules

---

## Summary

- **One-sentence description:** Refact.ai is an IDE-native coding assistant that runs a local engine and connects only to the providers, runtimes, and integrations the user configures.
- **Extended description:** Official documentation describes Refact as open-source, local-first, and BYOK. The current architecture centers on a local Rust engine, IDE plugins for VS Code and JetBrains, configurable hosted or local model providers, and tool-enabled agent workflows for code, shell, browser, and integration tasks.
- **Core value proposition:** Users can run agentic coding workflows without depending on a Refact-hosted inference service.
- **Primary problem solved:** Reducing context switching between IDE work, model selection, codebase search, code editing, browser debugging, and external tool usage.
- **Key differentiator:** The current product is documented as local-first, with project state, indexes, task data, and credentials stored locally and model access delegated to user-configured providers or local runtimes.
- **Target users:** Individual developers and engineering teams using VS Code or JetBrains IDEs.
- **Primary usage context:** Day-to-day software development inside a local workspace, with optional external integrations.

---

## Use Cases

### Primary use cases
- Generate or refactor code from a feature request or implementation plan.
- Explain unfamiliar modules, functions, errors, and stack traces.
- Debug failing tests, runtime issues, browser flows, or integration behavior.
- Run project checks, builds, linters, and diagnostics from the agent workflow.
- Review code changes and inspect or restore checkpoints.

### Secondary use cases
- Use BYOK providers or local runtimes for chat, completion, reasoning, and embeddings.
- Query GitHub, GitLab, Bitbucket, PostgreSQL, MySQL, and MCP-connected systems from the IDE.
- Use Chrome automation for screenshots, form interaction, DOM inspection, and console-log capture.
- Reuse project knowledge, trajectories, tasks, and skills across longer-running agent workflows.

### Example workflows
- Configure a provider in **Provider Setup**, select defaults in **Default Models**, and use Agent mode to implement and verify a feature.
- Ask Refact to inspect a workspace, edit files, run tests, and report progress in the same thread.
- Attach browser or database tools to investigate UI or data issues without leaving the IDE.

### Anti-patterns
- Expecting Refact to work without configuring at least one provider or local runtime.
- Treating confirmation rules as a sandbox boundary; official shell docs explicitly describe cwd/workdir enforcement rather than an operating-system sandbox.
- Relying on retired Refact Cloud services for accounts, model credits, billing, or hosted workspaces.

---

## Features

### Core features

| Feature | Description | Requirements | Status | Source |
|---------|-------------|--------------|--------|--------|
| Local engine runtime | The IDE experience is backed by a local Rust engine, `refact-lsp`, which serves the UI, tracks workspaces, manages tasks, and exposes tool APIs. | Local plugin install | Documented | README |
| In-IDE chat and completion | Refact supports chat, code completion, and AI toolbox actions in VS Code and JetBrains. | Configured provider/runtime | Documented | Docs homepage; installation guides |
| Agent workflows | Agent mode can gather context, edit files, run checks, use browser tools, call integrations, and report progress in-thread. | Configured provider/runtime; compatible mode | Documented | Agent overview |
| Workspace understanding | Refact builds context from project files, selections, open editors, git state, AST indexes, and vector search. | Local workspace; AST/vector features enabled where applicable | Documented | README; agent tools |
| Browser automation | Built-in Chrome tooling supports navigation, element interaction, screenshots, DOM/accessibility inspection, JavaScript execution, and console logs. | Chrome/Chromium or CDP endpoint | Documented | Chrome integration docs |
| Integrations and MCP | Refact can connect to code hosting, databases, command tools, services, and MCP servers. | Per-integration configuration | Documented | README; integrations index |
| Rollback / checkpoints | Official docs describe preview and restore of workspace checkpoints when checkpointing is enabled. | Checkpointing enabled | Documented | Agent overview |

### Advanced features

| Feature | Description | Requirements | Status | Source |
|---------|-------------|--------------|--------|--------|
| Dynamic provider discovery | Refact discovers models from provider APIs, bundled templates, or custom entries and combines them with local capability metadata. | Provider configuration | Documented | BYOK docs; supported models |
| Local capability registry | Capability metadata describes context windows, tool support, vision support, reasoning, completion behavior, embeddings, and provider-specific routing details. | Provider configuration | Documented | Supported models |
| Lazy MCP discovery | Large MCP catalogs can be exposed through proxy tools instead of injecting every schema into context. | MCP server configuration | Documented | MCP docs |
| Knowledge, tasks, skills, trajectories | README documents reusable project knowledge, task boards, task agents, skills, and prior trajectory search. | Local engine and workspace data | Documented | README |

### Deprecated / retired features

| Feature | Description | Status | Source |
|---------|-------------|--------|--------|
| Refact Cloud | Hosted accounts, managed inference, subscriptions, credits, telemetry tied to Refact Cloud, and hosted workspaces are being retired. | Retired / shutdown in progress | Shutdown announcement; README |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| VS Code extension | Visual Studio Marketplace (`smallcloud.codify`) | Starts the local `refact-lsp` engine and exposes the Refact activity-bar view. |
| JetBrains plugin | JetBrains Marketplace (`20647-codify`) | Starts the local `refact-lsp` engine and exposes the Refact tool window. |
| Local engine | `refact-lsp` over HTTP/LSP on localhost | Drives UI, model/tool APIs, and task state. |

### Selected IDE actions and shortcuts

**VS Code**
- Commands: `refactaicmd.activateToolbox`, `refactaicmd.callChat`, `refactaicmd.completionManual`, `refactaicmd.openSettings`, `refactaicmd.attachFile`
- Shortcuts: `Alt+Space` manual completion; `F1` chat

**JetBrains**
- Actions: `ActivateRefactChatToolWindow`, `ForceCompletionAction`, `InsertInlineCompletionAction`, `CancelPressedAction`, `RefactAI.GenerateCommitMessage`
- Shortcuts: `F1` open chat; `Alt+/` manual completion; `Tab` accept inline completion; `Escape` cancel inline completion

---

## Operating Modes

Official docs explicitly describe **Agent** and the local/BYOK deployment model. The README also names **Ask**, **Explore**, **Debug**, **Review**, **Plan**, and task workflows, but it does not publish a complete per-mode capability matrix.

| Mode | Description | When to use | Autonomy level | Limitations |
|------|-------------|-------------|----------------|-------------|
| Agent | Multi-step workflow that can gather context, edit files, run commands, use browser tools, call integrations, and report progress. | Features, bug fixes, verification, code review, integration debugging | Semi-autonomous | Depends on provider capabilities, selected mode, and confirmation rules |
| Ask / Explore / Debug / Review / Plan | Named workflow or chat modes that change available tools and context sources. | Investigation, review, planning, or targeted assistance | Varies | Public docs do not publish a detailed capability matrix for each named mode [UNVERIFIED] |
| Local / BYOK | Local engine plus user-configured provider or runtime; no hosted Refact account required in the normal setup path. | Default current deployment model | Varies by chat mode | Requires provider/runtime setup |
| Self-hosted | Use local runtimes such as Ollama, LM Studio, or vLLM, or self-hosted OpenAI-compatible endpoints. | Local control or internal infrastructure workflows | Varies by chat mode | Model availability and capability depend on the configured runtime |
| Refact Cloud | Legacy hosted service layer. | Legacy only | N/A | Retirement announced 2026-04-30; final shutdown date [NEEDS UPDATE] |

---

## Architecture & Mechanisms

- **Local-first runtime:** Refact starts a local Rust engine (`refact-lsp`) from the IDE.
- **Transport:** The IDE plugins communicate with the engine over localhost using HTTP/LSP.
- **Session handling:** The engine runs persistent chat threads with command queues, SSE streaming, pause/confirmation states, retries, regeneration, and trajectory storage.
- **Context construction:** Official sources describe context from project files, selected code, open editors, git state, AST symbols, semantic/vector search, project knowledge, and prior trajectories.
- **Retrieval/indexing:** Refact uses AST indexes and vector search when enabled.
- **Model routing:** Refact discovers models from configured providers or runtimes and adds local capability metadata for chat, reasoning, completion, embeddings, tools, and multimodal support.
- **Tool invocation:** Agent workflows alternate between reasoning, tool calls, and responses; tool outputs appear in chat.
- **Edit visibility:** File edits are shown as patches or diffs before acceptance, and rollback/checkpoint flows are documented.
- **Deployment model:** No bundled Refact inference endpoint or Refact-issued API key is required for local/BYOK usage.

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Control mechanism |
|-----------|-------------|-------|------------|-------------------|
| File reading | Project tree, file listings, file/image reads, regex search, vector search, and AST symbol lookup are documented. | Local workspace | Low | Mode selection and privacy settings |
| File editing | Create files, update files by exact text/line/range/regex/anchors, apply patches, move/remove files, and undo recent edits. | Local workspace | Medium | Mode selection, diff visibility, confirmations |
| Shell command execution | Run one-off commands for tests, builds, linters, formatters, and diagnostics. | Local machine | High | Allow / ask / deny confirmation rules |
| Browser automation | Open tabs, navigate, click/fill/select elements, wait, capture screenshots, extract DOM data, run JavaScript, and inspect console logs. | Browser and reachable web apps | Medium to High | Current mode and confirmation settings |
| Code hosting actions | GitHub and GitLab integrations run CLI commands; Bitbucket uses the Bitbucket Cloud API. | External repositories/services | Medium to High | Token scopes, secrets, confirmation rules |
| Database queries | PostgreSQL and MySQL integrations run one query per tool call and truncate large results. | External databases | High | Credentials, timeouts, confirmation rules |
| MCP tool usage | MCP servers can expose external APIs, docs search, local utilities, or organization-specific workflows. | Local or remote MCP servers | Medium to High | Server configuration, auth, confirmation rules |
| Long-running services | Refact can manage configured command-line services as part of agent workflows. | Local machine / dev services | High | Integration configuration and confirmation rules |
| Sandbox availability | Shell docs explicitly describe workdir enforcement and path policy, not an operating-system sandbox. | N/A | High if misconfigured | Confirmation rules and environment policy |

---

## Agent Tool Primitives

Official docs group many built-in file/search/edit primitives by capability rather than publishing a full public name list. The following named tools are explicitly documented.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `github` | Runs `gh` commands in the relevant project directory. | Confirmation-rule dependent | Configured integration |
| `gitlab` | Runs `glab` commands in the relevant project directory. | Confirmation-rule dependent | Configured integration |
| `bitbucket` | Uses the Bitbucket Cloud API for repository and pull-request operations. | Confirmation-rule dependent | Configured integration |
| `postgres` | Runs one PostgreSQL query per tool call through `psql`. | Confirmation-rule dependent | Configured integration |
| `mysql` | Runs one MySQL query per tool call through `mysql`. | Confirmation-rule dependent | Configured integration |
| `Chrome` | Built-in browser automation and page-inspection tool. | Mode/settings dependent | Built-in |
| `shell` | Built-in one-off shell command tool with output filtering. | Confirmation-rule dependent | Built-in |
| `mcp_tool_search` | Searches available MCP tools by name or description and returns matching schemas. | Confirmation-rule dependent | Used in lazy MCP mode |
| `mcp_call` | Executes a selected MCP tool by exact name with arguments. | Confirmation-rule dependent | Used in lazy MCP mode |

---

## Integrations

| Integration | Type | What it enables | Requirements / limitations |
|-------------|------|-----------------|----------------------------|
| GitHub | Native integration via GitHub CLI | Issues, pull requests, repo metadata, and other `gh` commands | Requires GitHub token and optional `gh` path |
| GitLab | Native integration via GitLab CLI | Issues, merge requests, metadata, and other `glab` commands | Requires GitLab token and optional `glab` path |
| Bitbucket | Native integration via Bitbucket Cloud API | Repository and pull-request operations | Requires username, workspace, and app password |
| PostgreSQL | Database integration | One SQL query per tool call through `psql` | Requires connection settings; large results truncated |
| MySQL | Database integration | One SQL query per tool call through `mysql` | Requires connection settings; large results truncated |
| Chrome / browser | Built-in runtime tool | Navigation, element actions, screenshots, DOM extraction, console logs | Chrome/Chromium or CDP endpoint |
| Shell commands | Built-in runtime tool | One-off local commands for checks and diagnostics | Controlled by allow / ask / deny rules |
| MCP Server | MCP integration | Local stdio or remote HTTP/SSE MCP servers, including lazy tool discovery | Requires command or URL, auth/headers, timeouts |
| Command-line tool / service | Configured local integrations | Structured repeated commands or long-running processes | Documented in integrations index; per-tool setup required |

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models publicly disclosed | Partially |
| User model selection | Yes |
| Model access model | BYOK or local runtime; Refact does not bundle model access |
| External provider families documented | Anthropic, OpenAI, OpenAI Responses, OpenAI Codex, OpenRouter, Groq, DeepSeek, Doubao, xAI, Gemini, Qwen, Kimi, Zhipu, MiniMax, GitHub Copilot, Claude Code, and custom OpenAI-compatible endpoints |
| Local models / runtimes | Ollama, LM Studio, vLLM |
| Embeddings support | Yes |
| Multimodal support | Capability registry can include vision or multimodal support |
| Context window disclosure | Model-dependent; stored in local capability metadata or custom provider settings |
| Pricing / quotas for models | Controlled by the configured provider or runtime, not by Refact |

---

## Permissions & Security

- Refact documents **tool confirmations** with configurable allow, ask, and deny rules.
- Shell, database, and external service tools are explicitly called out as operations that should keep strict confirmation rules.
- GitHub, GitLab, Bitbucket, PostgreSQL, and MySQL docs recommend least-privilege credentials and storing secrets in variables/secrets instead of prompts or integration files.
- MCP docs recommend reviewing exposed tool descriptions and keeping confirmation rules strict until each server is understood.
- Browser docs warn that screenshots, DOM content, console logs, and form input values can become model context.
- The normal setup path does **not** require a hosted Refact login, Refact-issued model key, or Refact-operated model relay.

---

## Privacy & Data Processing

- Refact documents a **local-first** architecture.
- Operational data stored locally includes provider settings and credentials, chat trajectories, task metadata, project knowledge, local indexes, usage summaries, model-selection settings, and integration configuration files.
- Network requests are created only for providers, local endpoints, and integrations that the user configures or enables.
- Prompts can include code context, selected files, tool results, and workflow instructions sent to the configured provider/runtime.
- Docs homepage states: **"We never store your code on the server side."**
- Official docs also state Refact can restrict access to particular files or projects.
- For local-only workflows, docs recommend local runtimes and avoiding external integrations.

---

## Pricing

| Item | Official status |
|------|------------------|
| Local / open-source usage | Active. Official docs state that no hosted Refact login, Refact-issued model key, or product credit balance is required for the normal setup path. |
| Model costs | Refact does not sell model access; actual billing, quotas, and retention policies are controlled by the configured provider or runtime. |
| Hosted Refact Cloud | Retirement announced on 2026-04-30. Official blog states there will be no managed Refact Cloud service, no hosted Refact accounts, no Refact-issued model credits, and no paid cloud subscription layer going forward. |
| Legacy pricing copy | The homepage still contains Free / Pro / Enterprise pricing and usage text [CONFLICTING SOURCES][NEEDS UPDATE]. The dedicated `/pricing` page returned 404 at the time of this update. |
| Refunds | The shutdown announcement states invoices paid in the last 30 days before shutdown will be refunded. |

---

## Limitations & Risks

- Refact does not work as documented until at least one provider or local runtime is configured.
- Model availability, context size, pricing, rate limits, and data policies depend on the configured provider/runtime rather than a single Refact-managed service.
- Database, shell, browser, CLI, and MCP integrations can modify external systems if confirmation rules or credentials are overly permissive.
- Official shell docs do not present a product-level OS sandbox guarantee.
- Official sources still contain legacy cloud/enterprise/pricing references that conflict with the newer cloud-shutdown announcement; verify current commercial/support status before adoption.
- The shutdown announcement says the **final shutdown date** will be published separately; that date was not found in the official sources reviewed here.

---

## Sources

- https://refact.ai
- https://refact.ai/blog/2026/refact-cloud-is-shutting-down/
- https://docs.refact.ai
- https://docs.refact.ai/installation/vs-code/
- https://docs.refact.ai/installation/jetbrains/
- https://docs.refact.ai/byok/
- https://docs.refact.ai/supported-models/
- https://docs.refact.ai/features/autonomous-agent/overview/
- https://docs.refact.ai/features/autonomous-agent/tools/
- https://docs.refact.ai/features/autonomous-agent/integrations/
- https://docs.refact.ai/features/autonomous-agent/integrations/github/
- https://docs.refact.ai/features/autonomous-agent/integrations/gitlab/
- https://docs.refact.ai/features/autonomous-agent/integrations/bitbucket/
- https://docs.refact.ai/features/autonomous-agent/integrations/postgresql/
- https://docs.refact.ai/features/autonomous-agent/integrations/mysql/
- https://docs.refact.ai/features/autonomous-agent/integrations/chrome/
- https://docs.refact.ai/features/autonomous-agent/integrations/mcp/
- https://docs.refact.ai/features/autonomous-agent/integrations/shell-commands/
- https://github.com/smallcloudai/refact
- https://github.com/smallcloudai/refact/releases
- https://marketplace.visualstudio.com/items?itemName=smallcloud.codify
- https://plugins.jetbrains.com/plugin/20647-codify
- https://refact.ai/pricing (returned 404 at review time)
