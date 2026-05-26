# Cline
```yaml
name: "Cline"
description: >
  Cline is an open-source coding agent available as a VS Code extension and related surfaces built on a shared agent core. In the IDE, it can read and edit files, run terminal commands, fetch web content, use MCP tools, and manage multi-step tasks with user approvals, checkpoints, and configurable auto-approve policies.
category: ide
logo: https://img.logo.dev/cline.bot?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | Cline |
| Alternative names | Claude Dev; `claude-dev`; VS Code Marketplace identifier `saoudrizwan.claude-dev` |
| Vendor / Organization | Cline Bot Inc. |
| Homepage | https://cline.bot |
| Documentation | https://docs.cline.bot |
| Changelog | https://github.com/cline/cline/blob/main/CHANGELOG.md |
| Repository | https://github.com/cline/cline |
| VS Code Marketplace | https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev |
| First release date | 28-07-2024 (`v1.0.4` GitHub release) |
| Current status | Public release with ongoing updates; latest VS Code extension release observed: `v3.84.0` |
| Current version | 3.84.0 |
| Last updated | 19-05-2026 |
| License | Apache-2.0 |
| Minimum VS Code version | `^1.84.0` |

## Classification

- **Primary category:** IDE
- **Secondary categories:** Coding agent; VS Code extension; open-source developer tool
- **Tool type:** Open-source IDE extension with optional cloud and enterprise services
- **Problem domain:** Multi-step software development, code modification, repository exploration, and workflow automation
- **User interaction type:** Chat panel, diff approvals, slash commands, context mentions, command palette actions, notebook toolbar actions
- **Automation type:** Semi-autonomous by default; more autonomous when Auto Approve or YOLO mode is enabled; read-only parallel research via subagents

## Summary

- **One-sentence description:** Cline is a VS Code extension that runs an agentic coding workflow inside the editor with explicit control over file edits, terminal commands, browser actions, and external tools.
- **Extended description:** The extension shares its agent core with Cline CLI, the JetBrains plugin, Kanban, and the SDK. In the IDE, it combines chat-driven task execution, diff-based approvals, checkpoints, rules, skills, MCP integration, and configurable model/provider selection.
- **Core value proposition:** Multi-step coding assistance inside the editor without binding users to a single model provider.
- **Primary problem solved:** Coordinating file reads, edits, terminal work, web retrieval, and iterative planning inside one IDE workflow.
- **Key differentiator:** Shared agent core across IDE, CLI, JetBrains, and SDK surfaces, combined with per-tool approvals, checkpoints, and provider flexibility.
- **Target users:** Software engineers, technical leads, and teams that want an IDE-resident coding agent with controllable permissions.
- **Anti-target users:** Users who only want inline autocomplete, or users who do not want an IDE assistant to edit files and run terminal commands.
- **Primary usage context:** Working inside a local project folder in VS Code or compatible editors.

## Use Cases

### Primary use cases

- Implementing features across multiple files from a natural-language task
- Investigating and fixing build, test, runtime, or UI issues
- Reviewing and iterating on changes through diff approval and checkpoint restore
- Connecting external systems through MCP servers

### Secondary use cases

- Researching large codebases with read-only subagents
- Managing notebook cells in Jupyter notebooks
- Generating Git commit messages and explaining diffs in VS Code
- Applying reusable project guidance through rules and skills

### Example workflows

1. Start in **Plan** mode to inspect the codebase and discuss approach, then switch to **Act** mode to implement.
2. Ask Cline to run a dev server, continue while it runs, and inspect browser output for runtime issues.
3. Add `@file`, `@folder`, `@problems`, or `@url` context to reduce extra read steps.
4. Install or configure MCP servers so the agent can call external tools alongside built-in tools.

### Anti-patterns

- Using YOLO mode on repositories or machines where unrestricted edits and commands are unacceptable
- Expecting subagents to perform writes, browser actions, or MCP actions; the documented subagent scope is read-only
- Using deep planning for trivial edits where direct Act-mode work is sufficient

## Features

### Core features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| Plan & Act modes | Plan mode allows reading, searching, and discussion without file edits or command execution; Act mode enables implementation in the same conversation context. | All users | Stable | https://docs.cline.bot/core-workflows/plan-and-act |
| File creation and editing | Cline can create and edit files in the editor, show diffs for approval, and monitor linter/compiler issues while working. | All users | Stable | https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev |
| Terminal command execution | Cline can execute commands, monitor output, and continue while long-running processes remain active. | All users | Stable | https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev |
| Checkpoints | Each change step creates a restorable snapshot; restore can target files, task history, or both. | All users | Stable | https://docs.cline.bot/core-workflows/checkpoints |
| Context mentions | `@url`, `@problems`, `@file`, and `@folder` add context directly into the task. | All users | Stable | https://github.com/cline/cline/blob/main/README.marketplace.md |
| MCP integration | Cline can load MCP tools from local or remote servers and use them together with built-in tools. | All users | Stable | https://docs.cline.bot/mcp/mcp-overview |
| Slash commands | Built-in slash commands include `/newtask`, `/smol`, `/newrule`, `/deep-planning`, `/explain-changes`, and `/reportbug`. | All users | Stable | https://docs.cline.bot/core-workflows/using-commands |
| Model/provider selection | Users can authenticate with the Cline Provider or configure BYOK cloud/local providers, then select a model in settings. | All users | Stable | https://docs.cline.bot/getting-started/authorizing-with-cline |

### Advanced features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| Subagents | Parallel research agents with separate prompts and context windows; documented as read-only. | All users | Stable | https://docs.cline.bot/features/subagents |
| Rules | Persistent rule files can be loaded from `.clinerules/`, `.cursorrules`, `.windsurfrules`, or `AGENTS.md`. | All users | Stable | https://docs.cline.bot/customization/cline-rules |
| Skills | On-demand instruction bundles loaded with the `use_skill` tool or via slash-command activation. | All users | Stable | https://docs.cline.bot/customization/skills |
| Plugins | Plugins can add tools, lifecycle hooks, slash commands, and other capabilities from file URLs, git, npm, or local paths. | All users | Stable | https://docs.cline.bot/customization/plugins |
| Jupyter notebook actions | The extension contributes notebook toolbar and cell actions for generating, explaining, and improving Jupyter cells. | All users | Stable | https://github.com/cline/cline/blob/main/package.json |
| Enterprise governance and observability | Enterprise adds SSO, RBAC, remote configuration, OpenTelemetry export, prompt backup, private networking, and self-hosted/on-prem deployment options. | Enterprise | Stable | https://docs.cline.bot/enterprise-solutions/overview |

### Experimental features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| Background Edits | Experimental support for editing files in the background without opening the diff view. | All users | Experimental | https://github.com/cline/cline/blob/main/CHANGELOG.md |
| Lazy Teammate Mode | Experimental toggle added in `3.77.0`. | All users | Experimental | https://github.com/cline/cline/blob/main/CHANGELOG.md |
| Double-check completion | Experimental verification feature added in `3.58.0` to check work before marking tasks complete. | All users | Experimental | https://github.com/cline/cline/blob/main/CHANGELOG.md |

## Interfaces

- **Interface types:** IDE plugin, chat panel webview, diff view, terminal integration, notebook toolbar actions, command palette actions
- **Supported platforms:** VS Code, Cursor, Windsurf, VSCodium, Antigravity (IDE extension install path); JetBrains is a separate plugin; ACP is available through the CLI for other editors
- **Supported operating systems:** macOS, Windows, Linux
- **Key IDE actions / commands:**
  - `Cline: New Task`
  - `Cline: MCP Servers`
  - `Cline: History`
  - `Cline: Settings`
  - `Cline: Add to Cline`
  - `Cline: Generate Commit Message with Cline`
  - `Cline: Explain with Cline`
  - `Cline: Improve with Cline`
  - `Cline: Generate Jupyter Cell with Cline`
  - `Cline: Explain Jupyter Cell with Cline`
  - `Cline: Improve Jupyter Cell with Cline`
- **Documented slash commands:** `/newtask`, `/smol`, `/newrule`, `/deep-planning`, `/explain-changes`, `/reportbug`

## Operating Modes

| Mode | Description | Autonomy level | Limitations |
|---|---|---|---|
| Plan | Read/search/discuss mode for investigation and implementation planning. | Assistive | Cannot modify files or execute commands. |
| Act | Execution mode for file edits, command runs, and implementation steps. | Semi-autonomous | Approvals still apply unless Auto Approve or YOLO is enabled. |
| Auto Approve | Per-tool/category auto-approval for reads, edits, commands, browser use, and MCP access. | Higher autonomy, policy-bounded | Behavior depends on user settings and the command/tool category. |
| YOLO | Full auto-approval for file operations, commands, browser actions, MCP tools, and mode transitions. | Autonomous | Documented risk of destructive actions, installs, config overwrites, and network operations. |
| Subagent research | Parallel read-only research agents used for broad codebase discovery. | Semi-autonomous | No file writes, browser use, MCP use, or nested subagents. |

## Architecture & Mechanisms

- **Shared runtime:** The extension is one surface on top of the same agent core used by the CLI, JetBrains plugin, Kanban, and SDK.
- **Agent harness:** `ClineCore` is the full runtime wrapper and is built on the `Agent` / `AgentRuntime` primitive.
- **Built-in tools:** Official tool reference lists `bash`, `editor`, `read_files`, `apply_patch`, `search`, `fetch_web`, and `ask_question`.
- **Session persistence:** `ClineCore` stores session manifests and message files; enterprise prompt-storage docs identify local task history under `~/.cline/data/tasks/<taskId>/api_conversation_history.json`.
- **Checkpoint mechanism:** Checkpoints use a shadow Git repository separate from the project’s main Git history.
- **Context construction:** The extension can analyze project structure, run searches, read targeted files, and ingest explicit context mentions such as `@file`, `@folder`, `@problems`, and `@url`.
- **Model routing:** Cline can authenticate through the Cline Provider or BYOK providers and local runtimes, with model choice exposed in settings.
- **Tool approval:** Approval is controlled per tool or per category, with auto-approve and YOLO as higher-autonomy options.
- **MCP support:** MCP servers can be local (STDIO) or remote (HTTP/SSE) and are configured either in CLI config or the extension’s MCP settings JSON.
- **Subagent mechanism:** Subagents run with separate prompts, context windows, and token budgets, then return reports to the main agent.
- **Sandboxing:** Official extension materials emphasize human approval, tool policies, and checkpoints rather than a documented mandatory sandbox boundary.

## Tool Capabilities

| Capability | Description | Scope | Control mechanism |
|---|---|---|---|
| File reading | Reads files directly or in batches; search and list operations are part of the core workflow. | Workspace and, if enabled, files outside the workspace | Approval / Auto Approve settings for read operations |
| File editing | Creates and edits files with diff review; `apply_patch` is also a built-in runtime tool. | Workspace and, if enabled, files outside the workspace | Approval / Auto Approve / YOLO |
| Command execution | Runs shell commands and monitors output; long-running commands can continue while the task proceeds. | Local terminal / dev environment | Approval / Auto Approve / YOLO |
| Browser and web access | Fetches web content and can use a browser for interactive debugging and testing. | External web content and sites reachable from the host environment | Approval / Auto Approve / YOLO |
| MCP/API usage | Calls MCP tools discovered from configured local or remote MCP servers. | Any system exposed through configured MCP servers | Approval / Auto Approve / MCP server configuration |
| Parallel codebase research | Spawns subagents for focused read-only investigation. | Repository discovery and read-only commands | Approval follows read-project-files behavior |
| Git-adjacent actions | Provides commit-message generation and explain-changes flows in VS Code. | Local Git repository workflows | Command execution and IDE action approval settings |
| Sandbox availability | No product-level sandbox guarantee is documented for the VS Code extension. | N/A | Safety is documented through approvals, policies, and checkpoints |

## Agent Tool Primitives

### Main runtime built-ins

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `bash` | Execute shell commands | Policy-dependent; typically higher risk than read/search tools | Current built-in tool |
| `editor` | View and edit files | Policy-dependent | Current built-in tool |
| `read_files` | Batch-read multiple files | Policy-dependent; often suitable for auto-approval | Current built-in tool |
| `apply_patch` | Apply unified diffs to files | Policy-dependent | Current built-in tool |
| `search` | Ripgrep-powered codebase search | Policy-dependent; often suitable for auto-approval | Current built-in tool |
| `fetch_web` | HTTP fetch with HTML-to-markdown conversion | Policy-dependent | Current built-in tool |
| `ask_question` | Request user input | Yes | Current built-in tool |

### Read-only subagent tools

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `read_file` | Read file contents | Follows read-project-files approval behavior | Subagent-only, read-only |
| `list_files` | List directory contents | Follows read-project-files approval behavior | Subagent-only, read-only |
| `search_files` | Regex search across files | Follows read-project-files approval behavior | Subagent-only, read-only |
| `list_code_definition_names` | List top-level classes, functions, and methods | Follows read-project-files approval behavior | Subagent-only, read-only |
| `execute_command` | Run read-only shell commands | Follows read-project-files approval behavior | Subagent-only, read-only |
| `use_skill` | Activate a skill during subagent work | Follows read-project-files approval behavior | Subagent-only, read-only |

> Official tool docs note that some older documents reference legacy XML-style names such as `read_file`, `replace_in_file`, or `execute_command`; the current ClineCore runtime exposes the built-in tool names in the first table above.

## Integrations

### Native integrations

- **Model providers:** Cline Provider, Anthropic, OpenAI, Google Gemini, OpenRouter, AWS Bedrock, Azure / GCP Vertex, Cerebras, Groq, OpenAI-compatible endpoints, Ollama, LM Studio, and additional providers documented on the “Other 30+ Providers” page
- **VS Code platform features:** Activity bar panel, command palette, editor context menu, terminal context menu, SCM title actions, notebook toolbar and cell actions
- **Observability:** OpenTelemetry OTLP export for logs and metrics
- **Prompt backup:** AWS S3 or Cloudflare R2 prompt storage

### MCP support

- Local STDIO MCP servers
- Remote HTTP/SSE MCP servers
- MCP Marketplace discovery and installation flow
- Per-server enable/disable, restart, timeout, headers, and `autoApprove` configuration

### IDE and editor integrations

- Direct IDE extension install path for VS Code, Cursor, Windsurf, VSCodium, and Antigravity
- Separate JetBrains plugin for IntelliJ-family IDEs
- ACP-based CLI integration path for JetBrains AI Assistant, Neovim, Zed, and other ACP-compatible editors

### Git integrations

- Git commit message generation command in the extension
- `/explain-changes` slash command documented as VS Code-only
- Checkpoints stored outside the user’s main Git history via a shadow repository

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | User-selected models from the configured provider; official examples include `anthropic/claude-sonnet-4-6`, `openai/gpt-4o`, `google/gemini-2.5-pro`, and `minimax/minimax-m2.5` |
| Models publicly disclosed | Partially |
| User model selection | Yes |
| Proprietary models | Yes |
| External models | Anthropic, OpenAI, Google, OpenRouter, AWS Bedrock, Azure / GCP Vertex, Cerebras, Groq, and additional provider integrations |
| Local models | Yes — Ollama and LM Studio |
| Multimodal models | Yes, when the selected provider/model supports images |
| Context window | Model-dependent; official docs give examples such as Gemini 2.5 Pro with 1M context |
| Token limits | Model-dependent; no single extension-wide token limit is documented |
| Processing region | Depends on the selected provider, local runtime, or enterprise deployment architecture |
| Training on user data | Enterprise docs state “no uploads, no indexing, no training on your data” for the enterprise/local-infrastructure path; non-enterprise provider handling depends on the selected provider |
| Information status | Partially confirmed |

## Permissions & Security

- **Default approval model:** By default, every action requires explicit user approval.
- **Auto Approve categories:** Documented categories include reading project files, reading all files, editing project files, editing all files, executing safe commands, executing all commands, browser use, MCP server use, and notifications.
- **YOLO mode:** Auto-approves all file operations, commands, browser actions, MCP tools, and mode transitions.
- **Command approval logic:** Cline does not use a fixed allowlist for “safe” commands; the model marks commands with a `requires_approval` flag based on command and arguments.
- **Checkpoints:** A rollback mechanism is available after each tool use.
- **Enterprise identity/security controls:** SSO through WorkOS AuthKit; documented role hierarchy of Member, Admin, and Owner; remote configuration for organization-wide settings.
- **Observability and audit support:** Enterprise docs mention usage tracking, selective audit logging for administrative operations, and OpenTelemetry export.
- **Private deployment options:** Official enterprise materials mention private networking, self-hosted, and on-prem deployment options.
- **Encryption details:** Prompt-storage docs specify HTTPS/TLS in transit and recommend S3 SSE-S3/SSE-KMS or note R2 encryption by default for cloud backups.

## Privacy & Data Processing

- **Model processing path:** Cline connects to a configured provider or local runtime. The product does not impose a single inference backend.
- **Local storage:** Conversation history is stored locally; enterprise prompt-storage docs identify `~/.cline/data/tasks/<taskId>/api_conversation_history.json` as the local file path for task conversations.
- **Optional cloud backup:** If prompt storage is enabled, Cline uploads `api_conversation_history.json` plus task metadata to AWS S3 or Cloudflare R2.
- **Telemetry contents:** When telemetry is enabled, Cline collects anonymous usage events such as features used, task completion rates, error occurrences, and performance metrics.
- **Telemetry exclusions:** Official telemetry docs state that telemetry does not include code or file contents, file paths or names, command arguments, conversation content, personal information, API keys, or credentials.
- **Retention model:** Prompt storage retention is user-configurable through bucket lifecycle policies; the docs do not define a single mandatory retention period for all deployments.
- **Training controls:** Enterprise docs state that code stays in the customer environment and is not used for training in that deployment model.

## Limitations & Risks

- **No documented hard sandbox:** Official extension materials emphasize approvals and rollback rather than a guaranteed sandbox boundary.
- **High-autonomy risk in YOLO mode:** Official docs warn that YOLO mode can delete files, overwrite configuration, install packages, make network requests, and commit/push changes.
- **Provider/model variability:** Cost, latency, context window, reasoning support, and multimodal behavior depend on the selected provider and model.
- **Local model hardware constraints:** Official local-model guidance lists rough RAM bands of 16–32 GB, 32–64 GB, and 64 GB+ depending on model size and context needs.
- **Subagent scope limits:** Subagents are documented as read-only and cannot edit files, use the browser, access MCP servers, or spawn nested subagents.
- **Command classification variability:** Safe-command handling is not a fixed allowlist; approval behavior depends on model-generated `requires_approval` flags and user settings.
- **Optional telemetry and prompt backup:** These features add operational visibility, but they also introduce additional data-handling paths that must be configured intentionally.

## Alternatives

| Alternative | Type | Advantage of Cline VS Code extension | Advantage of alternative | When to choose alternative |
|---|---|---|---|---|
| Cline CLI | Official sibling product | Native editor UI, diff review, notebook actions, activity bar integration | Interactive terminal UI, headless mode, CI/CD, ACP editor integrations | Choose CLI for terminal-first workflows, automation, CI/CD, or ACP-based editor use |
| JetBrains Plugin | Official sibling product | Native VS Code-family extension workflow | Native JetBrains tool window and plugin distribution | Choose JetBrains plugin when IntelliJ-family IDEs are the primary environment |
| Cline Kanban | Official sibling product | Best for single-editor task execution with direct file visibility | Web-based task board with many agents in parallel, isolated worktrees, dependency chains | Choose Kanban for multi-agent project boards rather than single-task IDE work |

## Usage Examples

### Example 1: Build a single-file todo app

**Purpose:** First-run IDE workflow

```text
Build a todo app in a single HTML file. Include:
- Input field to add new tasks
- List that displays all tasks
- Checkbox to mark tasks complete (with strikethrough styling)
- Button to delete individual tasks
- Clean, modern design with CSS
- All JavaScript inline in the same file
```

**Expected behavior:** Cline proposes file changes for approval in the IDE and writes the file after approval.

**Source:** https://docs.cline.bot/usage/ide

### Example 2: Iterate on an existing task

**Purpose:** Modify prior output in the same conversation

```text
Add local storage so tasks persist when I refresh the page
```

**Expected behavior:** Cline reads the existing file, proposes a diff, and waits for approval before applying it.

**Source:** https://docs.cline.bot/usage/ide

### Example 3: Use deep planning

**Purpose:** Force a structured investigation before implementation

```text
/deep-planning
```

**Expected behavior:** Cline investigates the codebase, asks clarifying questions, creates a detailed implementation plan, and starts a new implementation task.

**Source:** https://docs.cline.bot/core-workflows/using-commands

### Example 4: Add explicit context

**Purpose:** Reduce extra context-gathering steps

```text
@url https://docs.cline.bot/getting-started/authorizing-with-cline
@problems
@file src/app.ts
@folder src/components
```

**Expected behavior:** Cline ingests the referenced URL, Problems panel issues, file content, or folder contents into task context.

**Source:** https://github.com/cline/cline/blob/main/README.marketplace.md

## Sources

- https://github.com/cline/cline
- https://github.com/cline/cline/blob/main/README.md
- https://github.com/cline/cline/blob/main/README.marketplace.md
- https://github.com/cline/cline/blob/main/CHANGELOG.md
- https://github.com/cline/cline/releases
- https://github.com/cline/cline/blob/main/package.json
- https://github.com/cline/cline/blob/main/LICENSE
- https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev
- https://cline.bot
- https://docs.cline.bot
- https://docs.cline.bot/cline-overview
- https://docs.cline.bot/getting-started/installing-cline
- https://docs.cline.bot/getting-started/authorizing-with-cline
- https://docs.cline.bot/usage/ide
- https://docs.cline.bot/core-workflows/plan-and-act
- https://docs.cline.bot/core-workflows/using-commands
- https://docs.cline.bot/core-workflows/checkpoints
- https://docs.cline.bot/features/auto-approve
- https://docs.cline.bot/features/subagents
- https://docs.cline.bot/mcp/mcp-overview
- https://docs.cline.bot/customization/cline-rules
- https://docs.cline.bot/customization/skills
- https://docs.cline.bot/customization/plugins
- https://docs.cline.bot/tools-reference/all-cline-tools
- https://docs.cline.bot/running-models-locally/overview
- https://docs.cline.bot/provider-config/other-30-plus-providers
- https://docs.cline.bot/enterprise-solutions/overview
- https://docs.cline.bot/enterprise-solutions/sso-setup
- https://docs.cline.bot/enterprise-solutions/team-management/managing-members
- https://docs.cline.bot/enterprise-solutions/monitoring/telemetry
- https://docs.cline.bot/enterprise-solutions/monitoring/opentelemetry
- https://docs.cline.bot/enterprise-solutions/monitoring/prompt-storage
- https://docs.cline.bot/sdk/clinecore
- https://docs.cline.bot/sdk/guides/permission-handling
- https://docs.cline.bot/api/overview
- https://docs.cline.bot/api/models
- https://docs.cline.bot/cli/acp-editor-integrations
