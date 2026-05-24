# Tabnine
```yaml
name: "Tabnine"
description: >
  Tabnine is an AI code assistant installed as a plugin in the IDE, combining code completions and coding-assistance chat for software development tasks. Tabnine also provides agentic workflows, a terminal CLI, and private deployment options for teams that need governance, model choice, and control over where code is processed.
category: ide
logo: https://img.logo.dev/tabnine.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - IDE Extension
  - Enterprise
```

## Tool Identification

**Last update:** 24-05-2026 21:08

| Field | Description |
|-------|-------------|
| Name | Tabnine |
| Alternative names | TabNine (legacy capitalization); Codota TabNine [historical vendor branding] |
| Vendor / Organization | Tabnine Ltd. (formerly Codota) |
| Product owner | [NO OFFICIAL DATA] |
| Homepage | https://www.tabnine.com |
| Documentation | https://docs.tabnine.com |
| Changelog | https://docs.tabnine.com/main/administering-tabnine/release-notes |
| Repository | https://github.com/codota/TabNine |
| First release date | [NO OFFICIAL DATA] |
| Current status | Generally available commercial product; some capabilities are beta or experimental |
| Current version | [CONFLICTING SOURCES] The official release-notes page lists technical info for `6.2.0` (May 12, 2026) and also later patch notes for `6.1.10` (May 20, 2026), so a single global current version is not clearly stated |
| Last updated | 2026-05-20 (latest dated release-notes entry retrieved) |

---

## Classification

- **Primary category:** IDE
- **Secondary categories:** Code completion tool; IDE chat assistant; agentic coding assistant; terminal CLI
- **Tool type:** Proprietary IDE plugin platform with optional CLI, admin console, REST APIs, and private/self-hosted deployment modes
- **Problem domain:** AI-assisted software development, code completion, code-centric chat, autonomous task execution, and enterprise governance
- **User interaction type:** Inline completions, IDE chat, IDE agent, terminal CLI, admin console, REST API
- **Automation type:** Assistive for completions/chat; semi-autonomous to autonomous for Agent and CLI workflows with optional user oversight

---

## Summary

- **One-sentence description:** Tabnine is an IDE-native AI coding platform that provides inline completions, code-centric chat, autonomous agent workflows, and enterprise controls around models, context, and deployment.
- **Extended description:** Official documentation describes Tabnine as an IDE plugin that combines code completions and chat, with additional agentic workflows through Tabnine Agent and Tabnine CLI. Enterprise editions add private deployment, context indexing across repositories and depots, admin governance, usage APIs, and model configuration.
- **Core value proposition:** Provide AI coding assistance inside supported IDEs while letting organizations control models, deployment location, data handling, and tool permissions.
- **Primary problem solved:** Reducing manual effort for code writing, code understanding, refactoring, test generation, and repository-scoped development tasks.
- **Key differentiator:** Tabnine combines IDE-native assistance with private deployment options, a context engine, configurable model endpoints, and governance controls for tools and MCP servers.
- **Target users:** Individual developers, engineering teams, enterprise admins, and managers operating in controlled software environments.
- **Anti-target users:** Users looking for a general-purpose knowledge chatbot or teams working primarily in unsupported/legacy editor integrations.
- **Primary usage context:** Day-to-day development inside a supported IDE, with optional terminal and self-hosted workflows for teams.

---

## Use Cases

### Primary use cases
- Inline code completion in supported IDEs, including whole-line, multiline/full-function, and comment-to-code suggestions.
- Code-centric IDE chat for explaining code, generating code, refactoring, and other code-related tasks.
- Autonomous project work with Tabnine Agent for codebase-wide refactoring, test generation, documentation synthesis, and policy validation.
- Terminal-native AI workflows with Tabnine CLI for code changes, refactoring, and pull-request-oriented work.

### Secondary use cases
- Enterprise model management and private endpoint routing for chat and agent usage.
- Organization-wide context through indexed repositories and Perforce depots.
- Usage reporting, audit-data retrieval, and team administration through the Tabnine APIs.
- Governance of CLI tools, MCP servers, and coaching guidelines in enterprise environments.

### Example workflows
1. Use inline completions while typing, accept the full suggestion with `Tab`, or accept parts of the completion line-by-line/word-by-word where supported.
2. Open Tabnine Chat in the IDE, ask a code-specific question, review the answer, and apply changes in the editor.
3. Ask Tabnine Agent to perform a multi-step task; the agent breaks work down, reacts to project state, and checks in when approval is needed.
4. Run Tabnine CLI in a terminal session, select a model with `/model`, inspect available tools with `/tools`, and let the agent edit files or run commands with approvals.

### Fully automated tasks
- Multi-step agent execution in Tabnine Agent when approvals and environment policies permit.
- CLI-based code edits, shell execution, and pull-request workflows when permitted by approval settings.
- Context indexing of connected repositories/depots for retrieval and organizational awareness.

### Partially automated tasks
- IDE chat and inline completions, where the developer reviews and applies suggestions.
- MCP-based access to external tools and services, subject to local configuration and admin governance.
- Team-level administration, model enablement, and usage reporting via admin console and APIs.

### Anti-patterns
- Using Tabnine Chat for general knowledge or emotion-oriented queries; official docs state it was designed mainly for code-related issues.
- Assuming legacy or unofficial editor plugins provide advanced completions, chat, or agent features.
- Treating approval-mode changes as equivalent to hard process isolation when CLI sandboxing is not enabled.

---

## Features

### Core features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Inline code completions | Provides current-line, multiline/full-function, and comment-to-code suggestions inside supported IDEs | Supported IDE plugin | Advanced capabilities depend on current supported plugins | Code Assistant Platform; Agentic Platform | Stable | Code Completions docs; Pricing |
| Partial completion acceptance | Accept completion output line-by-line in VS Code and JetBrains, and word-by-word in VS Code | VS Code or JetBrains plugin | Not documented for all IDEs | Code Assistant Platform; Agentic Platform | Stable | Code Completions docs |
| Tabnine Chat | IDE-based natural-language chat for code-related tasks; supports quick actions with predefined prompts | Supported IDE plugin | Official docs state it is designed mainly for code-related issues, not general knowledge | Code Assistant Platform; Agentic Platform | Stable | Chat docs; Pricing |
| Supported IDE coverage | Current supported IDEs are VS Code, JetBrains IDEs, Eclipse, Visual Studio 2022, and Visual Studio 2026 | Supported IDE/version range | Other plugins are legacy or unofficial and do not support advanced completions or chat | Platform-wide | Stable | Supported IDEs; System requirements |

### Advanced features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Tabnine Agent | Autonomous assistant for refactoring, test generation, documentation synthesis, and policy validation inside the developer environment | VS Code, Visual Studio 2022/2026, or JetBrains; team must have Agents enabled | Not available for Eclipse | Agentic Platform | Stable | Tabnine Agent docs; Pricing |
| Tabnine CLI | Terminal-native AI assistant that runs in local environments, remote sessions, and CI pipelines | Tabnine Agents enabled for the team | Uses the same permissions as the user unless constrained by approvals/sandboxing | Agentic Platform | Stable | CLI docs; Pricing |
| Context Engine | Uses hybrid graph + vector context, real-time organizational awareness, dependency/blast-radius analysis, and standards verification | Enterprise/private installation setup | Some context-engine features require connected sources and background indexing | Agentic Platform / Enterprise contexts | Stable | Enterprise Context Engine page; Data Sources; Pricing |
| MCP support | Agent can use MCP servers defined in `.tabnine/mcp_servers.json` or `~/.tabnine/mcp_servers.json`, supporting local STDIO, Streamable HTTP, and SSE transports | MCP server configuration | Governance and availability depend on admin settings and local config | Agentic Platform / Enterprise | Stable | MCP docs; MCP Governance |
| Admin and usage APIs | REST APIs return JSON for usage metrics, org/team/user data, license data, permissions, and audit-oriented administration | Personal Access Token | Some endpoints are legacy; v2 usage APIs replace v1 for current data | Enterprise SaaS and private installations | Stable | Tabnine APIs; Release notes |
| Model configuration | Admins can enable models and configure private endpoints for chat/agent use | Admin Console; supported provider or private endpoint | Code completions continue to use the Tabnine Universal model | Enterprise/private installations | Stable | Models docs |

### Experimental features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Coaching Guidelines | Team coding-guideline system that can import CSVs or use Tabnine defaults | Admin access | Official docs mark this feature as closed beta | Enterprise/private installations | Closed beta | Coaching Guidelines docs |
| CLI task tracker tools | Built-in tracker tools for tasks, dependencies, and ASCII task-graph visualization | `experimental.taskTracker` setting | Disabled by default | CLI | Experimental | Built-In Tools docs |
| Self-hosted chat code-awareness change | Official chat docs announce a targeted v6.3.0 change to remove Docker dependency and indexing wait times for self-hosted chat | Self-hosted deployment | Marked as upcoming, not yet released in retrieved docs | Self-hosted | [NEEDS UPDATE] | Chat docs |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| IDE plugin | VS Code, JetBrains IDEs, Eclipse, Visual Studio 2022, Visual Studio 2026 | Main product surface for completions and chat |
| IDE agent | VS Code, JetBrains IDEs, Visual Studio 2022/2026 | Agent is not available for Eclipse |
| Terminal CLI | macOS, Windows, Linux | Requires Agents to be enabled for the team |
| Admin Console | Web admin UI | Used for models, SSO, team management, MCP governance, and settings |
| REST API | HTTP JSON API | Uses Personal Access Tokens in `Authorization: Bearer <token>` |

### Supported platforms and operating systems
- **Windows:** Windows 10+, x86_64 or i686
- **Linux:** kernel 6.2+, x86_64
- **macOS:** macOS 13+, x86_64 or aarch64

### Supported IDE version ranges
- **VS Code:** 1.93.1 to 1.120
- **JetBrains IDEs:** 2023.3 to 2026.1
- **Eclipse:** 4.28 (2023-06) to 4.39 (2026-03)
- **Visual Studio 2022:** 17.8 to 17.14
- **Visual Studio 2026:** 18.1 to 18.5

### Commands and UI actions documented officially
- `/help`, `/about`, `/auth`, `/tools`, `/model`, `/settings`, `/hooks`, `/extensions`, `/mcp list`, `/docs`
- `@path` file/directory injection in CLI prompts
- `!command` shell execution in CLI
- `Tab` accepts inline completion suggestions in the IDE

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Example |
|------|-------------|-------------|----------------|-------------|---------|
| Inline completion | Suggests code while the user types in the IDE | Small edits, syntax completion, function scaffolding | Low | Requires manual acceptance | Accept a whole-line or full-function suggestion with `Tab` |
| IDE chat | Code-centric natural-language interaction inside the IDE | Explain, generate, or refactor code with user review | Low to Medium | Best results are code-related rather than general-knowledge queries | Ask Tabnine Chat to explain a selected code block |
| IDE agent | Autonomous, task-oriented assistant operating in the IDE | Multi-file changes, test generation, policy validation | Medium to High | Agent checks in for input/approval; not available in Eclipse | Ask Agent to refactor a module and generate tests |
| Terminal CLI | Terminal-native agent using built-in tools and slash commands | Local, remote, or CI workflows | Medium to High | Requires Agents enabled; permissions depend on approvals and sandbox config | Run `tabnine`, inspect `/tools`, then let the agent edit files |
| SaaS deployment | Tabnine-managed cloud service | Fastest setup for teams not requiring self-hosting | N/A | Data plane is vendor-managed | Connect IDE plugin to Tabnine SaaS |
| Private/self-hosted deployment | VPC, on-premises, or fully air-gapped installation | Security-sensitive or regulated environments | N/A | Requires enterprise deployment/admin work | Run Tabnine in VPC or on-premises |
| Air-gapped deployment | Fully disconnected private environment | Strictest network and data-boundary requirements | N/A | Requires dedicated deployment and local observability setup | Send metrics to Prometheus instead of Tabnine servers |

---

## Architecture & Mechanisms

### Client/server flow
- The Tabnine client runs as an IDE plugin/extension on the end user’s machine.
- As users code, the plugin sends requests to the Tabnine cluster for completions or, for chat, when the user asks a question.
- Official docs state that the request context may include chat history, lines of code, variables, type declarations, functions, objects, related imports, related files, and syntactic/semantic error reports.

### Context, retrieval, and indexing
- Tabnine’s personalization uses local code awareness and repository-connected global code awareness.
- The privacy documentation states that vector embeddings for the chat RAG index are computed on the server GPU.
- Context Engine documentation describes analyzers such as **Symbols** and **Summary & API**, plus source cards showing sync status and assigned teams.
- The enterprise Context Engine page describes a **hybrid graph + vector** design, real-time organizational awareness, dependency/blast-radius analysis, standards verification, and shared memory for multi-agent systems.

### Models and routing
- Code completions use the **Tabnine Universal code completions model**.
- Tabnine’s AI models page states that Tabnine provides proprietary models for code completions and chat.
- Chat and Agent can also use third-party or self-managed models, and admins can connect private endpoints.
- CLI model selection can be changed with `/model`, `/model set <model-name>`, a `--model` flag, `TABNINE_MODEL`, or `model.name` in settings, with documented precedence.

### Data handling mechanism
- Official privacy/security docs describe a **no-train-no-retain** policy and **ephemeral processing** for code context.
- For Tabnine models, no third-party APIs are used.
- For third-party chat/agent models, official docs explicitly warn that privacy protections may differ from Tabnine models.

### Execution and safety mechanisms
- Tabnine Agent breaks down complex work, responds to project state changes and dependencies, and can check in for user approval during workflows.
- Tabnine CLI provides OS-level sandboxing: `sandbox-exec` on macOS, container runtimes on Linux, and a native Windows sandboxing mechanism.
- CLI approval mode and sandbox mode are documented as separate controls: approval controls confirmation flow, while sandboxing enforces kernel/container boundaries.

---

## Tool Capabilities

| Capability | Official behavior | Scope | Risk level | Required permissions / controls | Example |
|-----------|-------------------|-------|------------|---------------------------------|---------|
| File reading | CLI tools `read_file` and `read_many_files` can read project files; IDE/agent features use project context in requests | Workspace files and supported file types | Low | Read-only tools run automatically by default | `> What files are in the src directory?` + file reads |
| File editing | CLI `write_file` and `replace` can create or modify files; Agent can edit project code | Workspace files | Medium | File-modifying tools require confirmation by default unless auto-approved | Agent updates multiple files in a refactor |
| Command execution | CLI `run_shell_command` executes terminal commands | Local shell with user permissions | High | Requires confirmation by default; sandboxing can constrain access | `!git status` |
| Internet / URL access | CLI `web_fetch` fetches URLs; MCP can connect to remote servers; sandbox profiles can proxy/block network | Web content and remote MCP endpoints | Medium | `web_fetch` disabled by default; network policy controlled by sandbox settings | Enable `enableWebFetchTool` and fetch a URL |
| Codebase/documentation search | `grep_search`, `glob`, `list_directory`, Remote Code Search, and Context Engine analyzers support local and indexed search | Local workspace and indexed org codebases | Low to Medium | Remote code search is controlled by settings; some enterprise features require indexing | Search local files or indexed org sources |
| API usage | Tabnine APIs expose usage, org, team, user, license, and permission endpoints | Enterprise administration and reporting | Medium | Personal Access Token required | Query `/api/v2/organization/usage` |
| External application actions | MCP servers connect Tabnine to external tools, services, and APIs | Depends on configured MCP servers | High | Controlled by local `mcp_servers.json` and admin MCP Governance policies | Connect Jira or Azure DevOps MCP servers |
| Pull request creation | Pricing page states the CLI can automate tasks such as pull requests | Terminal and CI workflows | Medium to High | Depends on shell/Git permissions and approval policy | Use CLI in a PR-oriented workflow |
| Production-data modification | Official pricing states MCP can connect to databases and APIs; capability depends on configured server | External systems exposed via MCP | High | Governed by MCP allow/block policy and the external system’s auth | Database/API actions through MCP |
| Sandbox availability | CLI supports OS-level sandboxing on macOS, Linux, and Windows | CLI process boundaries | Risk-reduction control | `--sandbox`, `TABNINE_SANDBOX`, or settings-based configuration | Restrict CLI file/network access during review |

---

## Agent Tool Primitives

Tabnine documents named CLI agent tools on its **Built-In Tools** page.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `read_file` | Read a file; supports text, images, audio, and PDFs; text can use line ranges | No | Stable |
| `read_many_files` | Bulk-read multiple files via glob patterns | No | Stable |
| `write_file` | Create or overwrite files | Yes | Stable |
| `replace` | Context-aware text replacement in existing files | Yes | Stable |
| `list_directory` | List files/subdirectories, respecting `.gitignore` and `.tabnineignore` | No | Stable |
| `glob` | Find files by glob pattern | No | Stable |
| `grep_search` | Regex search over file contents; older docs may call this `search_file_content` | No | Stable; legacy alias noted |
| `run_shell_command` | Execute shell commands, including background execution | Yes | Stable |
| `google_web_search` | Web search tool | No | Disabled by default via `tools.enableWebTools` |
| `web_fetch` | Fetch/process URL content, including localhost and up to 20 URLs | No | Disabled by default via `tools.enableWebFetchTool` |
| `save_memory` | Persist concise global user preferences/facts across sessions | [UNVERIFIED] | Stable |
| `write_todos` | Maintain subtask lists and statuses | [UNVERIFIED] | Stable |
| `enter_plan_mode` | Switch to plan mode with read-only tools | [UNVERIFIED] | Controlled by `experimental.plan` (enabled by default) |
| `exit_plan_mode` | Finalize plan and move to implementation after approval flow | [UNVERIFIED] | Controlled by `experimental.plan` |
| `ask_user` | Ask users clarifying questions | [UNVERIFIED] | Stable |
| `activate_skill` | Load a named agent skill | [UNVERIFIED] | Stable; available skills vary by installation |
| `get_internal_docs` | Access bundled Tabnine CLI documentation files | No | Stable |
| `tracker_create_task` | Create task/epic/bug records | [UNVERIFIED] | Experimental; gated by `experimental.taskTracker` |
| `tracker_update_task` | Update tracker records | [UNVERIFIED] | Experimental; gated by `experimental.taskTracker` |
| `tracker_get_task` | Retrieve a tracker task | No | Experimental; gated by `experimental.taskTracker` |
| `tracker_list_tasks` | List tracker tasks | No | Experimental; gated by `experimental.taskTracker` |
| `tracker_add_dependency` | Add task dependencies | [UNVERIFIED] | Experimental; gated by `experimental.taskTracker` |
| `tracker_visualize` | Render ASCII task graph | No | Experimental; gated by `experimental.taskTracker` |
| `Remote Code Search` | Built-in MCP server for searching indexed organizational codebases | No | Enabled by default via `tools.enableRemoteCodeSearch` |
| `Coaching Guidelines` | Built-in MCP server for team coding guidance | No | Enabled by default via `tools.enableCoaching` |

By default, the documentation states that tools that modify files or execute commands require confirmation, while read-only tools run automatically.

---

## Integrations

### IDE integrations
- **VS Code**
- **JetBrains IDEs** (representative list includes IntelliJ IDEA, PyCharm, WebStorm, PhpStorm, Android Studio, GoLand, CLion, Rider, DataGrip, RustRover, RubyMine, DataSpell, Aqua)
- **Eclipse**
- **Visual Studio 2022**
- **Visual Studio 2026**

### Repository and context integrations
- Official pricing and context-engine materials state that Tabnine Context Engine supports codebase connections for **GitHub**, **GitLab**, **Bitbucket**, and **Perforce P4 (Helix Core)**.
- Data Sources docs describe onboarding **Git repositories** and **Perforce depots** into Context Engine.
- Official pricing also states that Context Engine connects to **Jira**, **Confluence**, and more.

### Model/provider integrations
- **Amazon Bedrock**
- **Azure** private endpoints
- **OpenAI**
- **OpenAI-compatible** endpoints
- **Google Vertex AI**

### MCP integrations
- Local STDIO servers configured with `command`, optional `args`, `env`, and `cwd`
- Remote MCP servers over Streamable HTTP with `url` and `requestInit`
- SSE-based remote MCP servers with `transport: "sse"`
- Official examples include Azure, Azure DevOps, and Atlassian/Jira-oriented configurations

### Administrative/API integrations
- Usage and administration APIs for organization, team, user, license, and permission data
- Personal Access Tokens for API authentication

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | **Proprietary:** Tabnine Universal code completions model; Tabnine proprietary chat/completion models. **Publicly listed chat/agent models:** Claude 4.6 Sonnet, Claude 4.6 Opus, Claude 4.5 Sonnet, Claude 4.5 Opus, Claude 4.5 Haiku, Claude 4 Sonnet, GPT-5.4, GPT-5.3 Codex, GPT-5.2 Codex, GPT-5.2, GPT-5, GPT-4o, Gemini 3 Pro, Gemini 2.5 Pro, Gemini 2.5 Flash, Devstral-Small-2-24B-Instruct-2512, Devstral-2-123B-Instruct-2512, MiniMax-M2.7, GLM-4.7, Qwen-3-Coder-480B-A35B-Instruct, Qwen-3-30B (chat only) |
| Models publicly disclosed | Partially |
| User model selection | Yes for chat/agent/CLI; admins control available chat models and CLI users can switch with `/model` |
| Proprietary models | Yes |
| External models | Yes |
| Local models | Yes for private installations through self-managed/private endpoints |
| Multimodal models | Yes, model-dependent; release notes mention improved image/vision support when provided by the selected model |
| Context window | [NO OFFICIAL DATA] |
| Token limits | [NO OFFICIAL DATA] |
| Notable deprecations | After version 6.2.0, docs state Tabnine-protected, Gemma 3 or lower, and Qwen 2.5 or lower will no longer be supported |

---

## Permissions & Security

- **Authentication:**
  - Client-to-server requests are protected by JWT with a **1 hour** expiration period.
  - Cloud sign-in can use strong username/password or provider identity via GitHub, Google, or Microsoft OAuth2.
  - Self-hosted installations support built-in user/password auth and **SAML2 SSO**.
  - APIs authenticate with **Personal Access Tokens**.
- **Authorization / roles:**
  - Enterprise role model includes **Member**, **Team Lead**, **Manager**, **Admin**, plus **Installation Admin** in private installations.
- **SSO:**
  - Official SSO docs support either **SAML** or **OAuth 2.0 / OpenID Connect**, one protocol per organization at a time.
- **MCP / tool governance:**
  - Admins can set MCP governance to **Allow all**, **Allow only remote**, **Allow-list only**, or **Block all**.
  - Release notes document admin-level permissions control for CLI tools, MCP servers, and org-wide guidelines.
- **Encryption:**
  - HTTPS/TLS 1.2 for traffic between client and server.
  - Stored data encrypted at rest with **256-bit AES**.
  - Official security docs also describe end-to-end encryption for user/server communication.
- **Compliance claims published officially:**
  - Pricing and privacy/security pages explicitly mention **GDPR**, **SOC 2**, and **ISO 27001**.
- **Sandboxing:**
  - CLI sandboxing uses **macOS Seatbelt (`sandbox-exec`)**, container runtimes on Linux, and a native Windows mechanism.

---

## Privacy & Data Processing

- **No-train / no-retain:** Official privacy docs state that Tabnine has a **no-train-no-retain** policy and that code is ephemerally processed then immediately discarded.
- **Code privacy with Tabnine models:** Official site/docs state Tabnine does not retain code, does not train on user code, and does not share user code with third parties when using Tabnine models.
- **Context sent for inference:** The documented context window can include chat history, lines of code, variables, type declarations, functions, objects, related imports/files, and syntactic/semantic error reports.
- **Third-party model caveat:** The AI Models page states that privacy protections may differ when third-party models are selected.
- **No third-party APIs for Tabnine models:** Privacy docs explicitly state that no third-party APIs are used when using Tabnine’s own models.
- **Personalization/RAG processing:** Tabnine states that vector-embedding computation for the chat RAG index happens on server GPUs because doing so locally would stress user machines.
- **Operational metrics and logs:**
  - In self-hosted deployments, the Tabnine cluster sends operational metrics/logs to Tabnine servers for support; docs state no code or PII is sent.
  - Metrics/logs are retained for **one week** and include GPU/CPU utilization, memory, throughput, and latency.
  - Client telemetry can include plugin/binary config, machine details, one-way hashed email/hostname/IP, IDE details, and aggregated suggestion statistics.
- **Air-gapped observability:** In air-gapped deployments, metrics can be sent to **Prometheus** and logs to a customer log aggregator.

---

## Limitations & Risks

- **Chat scope:** Official docs say Tabnine Chat was designed mainly for code-related issues and was not designed for general-knowledge or emotion-oriented questions.
- **IDE support boundaries:** Official supported-IDE docs state that plugins for other IDEs are legacy or unofficial and do not support advanced completions or Tabnine Chat.
- **Agent availability:** Tabnine Agent is documented for VS Code, Visual Studio 2022/2026, and JetBrains IDEs, but **not** Eclipse.
- **Model volatility:** Official docs note that the model list changes frequently, and some models are deprecated after version 6.2.0.
- **Third-party model privacy differences:** When external chat/agent models are used, privacy terms may differ from Tabnine proprietary models.
- **Context propagation delay:** Context-engine settings may take **up to an hour** to reach users, and docs recommend restarting IDEs to apply changes immediately.
- **CLI execution risk:** Commands executed via Tabnine CLI run with the same system permissions as the user unless restricted by approval mode or sandboxing.
- **Experimental feature gating:** Web tools are disabled by default in CLI; tracker tools are experimental and disabled by default.

---

## Alternatives

Tabnine does not publish a formal alternatives matrix in the retrieved official sources. However, the official **Enterprise Context Engine** page explicitly states that its context layer can work with **Tabnine**, **Cursor**, **GitHub Copilot**, **Claude Code**, and **internal agents**. These are the adjacent developer-assistance tools explicitly named by Tabnine in retrieved official materials.

---

## Usage Examples

### CLI model selection

```bash
/model
/model set <model-name> --persist
```

### CLI file/context and shell usage

```text
> What files are in the src directory?
@src/index.ts Explain this code
!git status
```

### MCP server configuration

```json
{
  "mcpServers": {
    "server-name": {
      "command": "server-executable",
      "args": ["arg1", "arg2"],
      "env": {
        "API_KEY": "your-api-key",
        "BASE_URL": "https://api.example.com"
      }
    }
  }
}
```

### Comment-to-code workflow

Official code-completions docs describe a comment-to-code flow where the developer writes a natural-language comment and Tabnine suggests code for the next line.

---

## Sources

- https://www.tabnine.com
- https://www.tabnine.com/pricing
- https://www.tabnine.com/code-privacy
- https://www.tabnine.com/privacy-policy
- https://www.tabnine.com/enterprise-context-engine
- https://docs.tabnine.com
- https://docs.tabnine.com/main/administering-tabnine/release-notes
- https://docs.tabnine.com/main/getting-started/getting-the-most-from-tabnines-code-completion
- https://docs.tabnine.com/main/getting-started/getting-the-most-from-tabnine-chat
- https://docs.tabnine.com/main/getting-started/tabnine-agent
- https://docs.tabnine.com/main/getting-started/tabnine-agent/mcp-intro-and-setup
- https://docs.tabnine.com/main/getting-started/tabnine-cli
- https://docs.tabnine.com/main/getting-started/tabnine-cli/features/built-in-tools
- https://docs.tabnine.com/main/getting-started/tabnine-cli/features/commands
- https://docs.tabnine.com/main/getting-started/tabnine-cli/features/model-selection
- https://docs.tabnine.com/main/getting-started/tabnine-cli/features/sandboxing
- https://docs.tabnine.com/main/welcome/readme/ai-models
- https://docs.tabnine.com/main/welcome/readme/privacy
- https://docs.tabnine.com/main/welcome/readme/security
- https://docs.tabnine.com/main/welcome/readme/supported-ides
- https://docs.tabnine.com/main/welcome/readme/supported-languages
- https://docs.tabnine.com/main/welcome/readme/system-requirements/tabnine-client-and-deployment-requirements
- https://docs.tabnine.com/main/administering-tabnine/managing-your-team/context-engine/data-sources
- https://docs.tabnine.com/main/administering-tabnine/managing-your-team/context-engine/coaching-guidelines-v
- https://docs.tabnine.com/main/administering-tabnine/managing-your-team/settings/models-settings
- https://docs.tabnine.com/main/administering-tabnine/managing-your-team/settings/mcp-governance
- https://docs.tabnine.com/main/administering-tabnine/managing-your-team/settings/general-settings/single-sign-on-sso
- https://docs.tabnine.com/main/administering-tabnine/managing-your-team/team-management/roles-in-an-enterprise
- https://docs.tabnine.com/main/administering-tabnine/managing-your-team/tabnine-apis
- https://github.com/codota/TabNine
