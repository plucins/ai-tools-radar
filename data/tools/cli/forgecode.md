# ForgeCode

```yaml
name: "ForgeCode"
description: >
  ForgeCode is a CLI-based coding harness for the terminal with first-class support for many AI
  providers. It works with cloud models, open-weight models, and models running locally, and can
  integrate directly into Zsh so prompts are sent from the shell prompt with `:` commands.
category: cli
logo: https://img.logo.dev/forgecode.dev?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Open Source
```

## Tool Identification

**Last update:** 24-05-2026 21:08

| Field | Description |
|-------|-------------|
| Name | ForgeCode |
| Alternative names | Forge |
| Vendor / Organization | tailcallhq |
| Product owner | [NO OFFICIAL DATA] |
| Homepage | https://forgecode.dev |
| Documentation | https://forgecode.dev/docs |
| Changelog | https://github.com/tailcallhq/forgecode/releases |
| Repository | https://github.com/tailcallhq/forgecode |
| License | Apache-2.0 |
| GitHub stars | 7,348 on 2026-05-24 |
| First release date | 2025-01-30 (`v0.1.0`) |
| Current status | Active; official GA/Beta label not found [UNVERIFIED] |
| Current version | `v2.12.16` |
| Last updated | 2026-05-20 |

---

## Classification

- **Primary category**: Coding Agent
- **Secondary categories**: CLI Tool, Developer Tool, Open-source terminal agent
- **Tool type**: Open-source CLI with local execution and optional ForgeCode-hosted indexing services
- **Problem domain**: Code understanding, planning, implementation, command execution, terminal workflow automation
- **User interaction type**: CLI/TUI, one-shot CLI, Zsh prompt commands, sub-agent delegation
- **Automation type**: Semi-autonomous to agentic; access level depends on selected agent and restricted-mode policy

---

## Summary

- **One-sentence description**: ForgeCode is a terminal coding harness that can read and edit files, run commands, switch between planning and implementation agents, and work with multiple LLM providers.
- **Extended description**: Official documentation presents ForgeCode as a CLI-based coding harness that runs in the terminal and supports cloud, open-weight, and locally hosted models. It offers an interactive terminal UI, a one-shot prompt mode, and a Zsh integration that sends prompts from the shell prompt without leaving the current terminal workflow.
- **Core value proposition**: Keep AI-assisted coding inside the terminal while preserving shell-native workflows and provider/model choice.
- **Primary problem solved**: Coordinating codebase analysis, planning, code changes, and shell tasks from a single terminal agent.
- **Key differentiator**: Multi-provider model support plus a Zsh `:` command layer and an optional ForgeCode Services context engine for semantic search and tool-call correction.
- **Target users**: Developers who primarily work in a terminal and want AI assistance for planning, implementation, and codebase exploration.
- **Anti-target users**: Users who require a GUI-first workflow only; users who cannot use Zsh but specifically want the `:` shell integration; users who require a fully offline semantic indexing system with no remote file sync.
- **Primary usage context**: Local development sessions in a terminal, optionally augmented with semantic search and custom agents/skills.

---

## Use Cases

### Primary use cases
- Explaining codebases and tracing implementations
- Planning refactors or feature work with `muse`
- Implementing code changes with `forge`
- Running shell commands, tests, and Git workflows from the agent
- Suggesting shell commands from natural language
- Creating AI-generated commit messages

### Secondary use cases
- Code review and architecture analysis
- Semantic search over indexed repositories
- Custom team workflows via `AGENTS.md`, skills, custom agents, and custom commands
- Integrating external tools and services through MCP servers

### Example workflows
- `:muse` to plan a change, then `:forge` to implement it
- `forge -p "Explain the purpose of src/main.rs"` for single-prompt analysis
- `:sync` to index a workspace, then semantic search against the indexed codebase

### Fully automated tasks
- Multi-file code edits by the `forge` agent
- Command execution and command suggestion
- Commit message generation via `forge commit`
- Conversation export, retry, compact, clone, and rename actions

### Partially automated tasks
- Restricted-mode execution when `permissions.yaml` requires confirmation
- Semantic indexing, which requires explicit `:sync`
- MCP integrations, which require configuration and server setup

### Anti-patterns
- Using the Zsh prompt workflow without Zsh configured
- Assuming restricted mode is safe without reviewing the generated `permissions.yaml`
- Treating ForgeCode Services as fully local when `:sync` uploads file chunks and embeddings to ForgeCode servers

---

## Features

### Core features

| Feature | Description | Status |
|---------|-------------|--------|
| Interactive terminal UI | Running `forge` starts a persistent interactive session | Stable |
| One-shot CLI mode | `forge -p` runs a single prompt and exits | Stable |
| Zsh plugin mode | `forge setup` installs `:` commands for sending prompts from the shell prompt | Stable |
| Built-in agents | `forge`, `muse`, and `sage` separate implementation, planning, and research roles | Stable |
| File tagging | `@` file references with fuzzy selection and optional line ranges | Stable |
| Conversation management | Start, resume, clone, rename, retry, compact, export, and inspect conversations | Stable |
| Git integration | AI-assisted commit message generation and shell-based Git workflows | Stable |
| Provider login | Interactive provider credential management via `forge provider login` | Stable |
| Model selection | Session and persistent model switching via `:model` and config commands | Stable |
| Semantic search | `:sync` / `forge workspace sync` index a repository for semantic retrieval | Stable |

### Advanced features

| Feature | Description | Status |
|---------|-------------|--------|
| ForgeCode Services | Context engine, tool-call guardrails, and skill engine running as a background service layer | Stable |
| MCP support | Configure external servers through `.mcp.json` or CLI commands such as `forge mcp list` and `forge mcp import` | Stable |
| Custom agents | Markdown-defined agents in `.forge/agents/` or `~/forge/agents/` | Stable |
| Custom skills | `SKILL.md`-based workflows with project-local and global precedence | Stable |
| Custom commands | YAML-defined `:` commands in `.forge/commands/` or `forge.yaml` | Stable |
| Sandbox sessions | `--sandbox <name>` creates an isolated git worktree and branch before starting | Stable |
| Restricted mode | `permissions.yaml` policy file gates built-in tools when `restricted = true` | Stable |
| Semantic workspace operations | Workspace init, sync, status, info, and query commands | Stable |

### Experimental features
- [NO OFFICIAL DATA] The reviewed product pages and docs did not label any feature as experimental, preview, or beta.

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| CLI / TUI | macOS, Linux, Android, Windows via WSL or Git Bash | Primary interface |
| One-shot CLI | Same as CLI | `forge -p` processes one prompt and exits |
| Zsh prompt integration | Zsh environments | `forge setup` adds `:` prefixed shell commands |
| MCP client | Any supported ForgeCode runtime | Connects external MCP servers defined in `.mcp.json` |

### Supported operating systems
- macOS
- Linux
- Android
- Windows via WSL or Git Bash

### Installation methods
- Install script: `curl -fsSL https://forgecode.dev/cli | sh`
- Nix: `nix run github:tailcallhq/forgecode`

### Command surfaces
- Binary name: `forge`
- Prompt-prefix commands: `:agent`, `:model`, `:login`, `:tools`, `:skill`, `:sync`, `:commit`, `:suggest`

---

## Operating Modes

| Mode | Description | When to use | Autonomy level |
|------|-------------|-------------|----------------|
| Interactive TUI | Persistent terminal session started with `forge` | Multi-step coding sessions | Semi-autonomous |
| One-shot CLI | Single prompt via `forge -p` or piped stdin | Scripting and quick tasks | Semi-autonomous |
| Zsh plugin mode | `:` commands at the shell prompt | Day-to-day terminal workflow without leaving Zsh | Semi-autonomous |
| Planning mode (`muse`) | Planning and analysis agent; official docs disagree on whether it is read-only or read+write [NEEDS UPDATE] | Scope definition, refactor planning, critical systems | Low |
| Implementation mode (`forge`) | Read-write implementation agent | Code changes, fixes, and feature work | High |
| Research mode (`sage`) | Read-only research agent used automatically by other agents | Codebase investigation and architecture tracing | Low |
| Restricted mode | Policy-enforced execution via `permissions.yaml` | When tool actions need explicit governance | Variable |

---

## Architecture & Mechanisms

### Multi-agent structure
- `forge`: read-write implementation agent
- `muse`: read-write in the operating-agents page, but the plan-and-act guide describes it as read-only planning mode; this access labeling is inconsistent across official pages [NEEDS UPDATE]
- `sage`: read-only research agent used internally by `forge` and `muse`

### Context and retrieval
- ForgeCode Services adds a context engine, tool-call guardrails, and a skill engine.
- `:sync` indexes a project and enables `sem_search`.
- The indexing pipeline is documented as chunking → embedding → storage.
- ForgeCode states that stored data is used exclusively for `sem_search`.

### Data flow
- LLM provider traffic is configured by the user and sent directly from the user device to the chosen provider.
- Prompts, completions, and conversation context do not pass through ForgeCode infrastructure when using normal provider calls.
- When `:sync` is used, file chunks and embeddings are stored on ForgeCode servers.

### Configuration and runtime controls
- Global configuration is stored in `~/.forge/.forge.toml` by default, or under `FORGE_CONFIG`.
- Official schema/docs expose runtime limits including `max_tokens`, `tool_timeout_secs`, `max_requests_per_turn`, file-read limits, and update frequency.
- `subagents = true` enables the `task` tool and removes the standalone `sage` research tool from the tool list.
- Context compaction settings are configurable; docs show defaults including `token_threshold = 100000` and `retention_window = 6`.

### Ignore and context boundary rules
- ForgeCode respects `.gitignore`, `.ignore`, global gitignore, and `.git/info/exclude`.
- `.ignore` has highest precedence.
- Hidden files in subdirectories and binary files are excluded from selection/search unless explicitly surfaced through ignore rules.

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Required permissions | Control mechanism |
|------------|-------------|-------|------------|----------------------|-------------------|
| File reading | Reads local files and file ranges | Local filesystem; reads are allowed anywhere by policy model | Medium | `read` rules in restricted mode | `permissions.yaml` when restricted mode is enabled |
| File editing | Writes, patches, and multi-patches files | Local filesystem | High | `write` rules in restricted mode | Prior-read enforcement for overwrite/patch operations plus `permissions.yaml` |
| File deletion | Removes files and supports undo | Local filesystem | High | `write` rules in restricted mode | `remove` + `undo`; policy-gated in restricted mode |
| Code search | Regex and semantic search over code | Local filesystem and synced workspace | Medium | `read` rules for `fs_search`; `sem_search` exempt from policy file | `fs_search`, `sem_search`, ignore rules |
| Command execution | Runs shell commands in configured working directory | Local shell | High | `command` rules in restricted mode | `shell` tool plus policy confirmation/allow/deny |
| Internet access | Fetches web content and remote APIs | HTTP/HTTPS text resources | Medium | `url` rules in restricted mode | `fetch`; cannot access authenticated/private resources |
| Agent delegation | Launches sub-agents for research/debugging | Internal agent runtime | Medium | Exempt from `permissions.yaml` | `task` tool |
| Skill loading | Loads skill instructions | Local/project skill registry | Low | [UNVERIFIED] No explicit policy mapping documented | `skill` tool |
| Semantic indexing | Uploads code chunks and embeddings for retrieval | ForgeCode Services workspace | High | User-triggered `:sync`; not described as governed by `permissions.yaml` | Workspace commands |
| MCP tool access | Connects external tools and services | External MCP servers | High | Outside `permissions.yaml` scope | `.mcp.json` plus MCP server configuration |

---

## Agent Tool Primitives

No separate public ForgeCode “tools reference” page was found in the reviewed docs. The table below is based on the official repository tool registry/tool descriptions plus the official `permissions.yaml` page.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `read` | Read a local file or file range | Restricted-mode dependent | Mapped to `read` policy operations |
| `write` | Write or overwrite a file | Restricted-mode dependent | Existing-file overwrite requires prior `read` |
| `fs_search` | Regex/text search over files | Restricted-mode dependent | Mapped to `read` policy operations |
| `sem_search` | Semantic code search over synced workspace | No | Explicitly exempt from `permissions.yaml` |
| `remove` | Delete a file | Restricted-mode dependent | Mapped to `write`; undoable |
| `patch` | Exact string replacement in a file | Restricted-mode dependent | Requires prior `read` |
| `multi_patch` | Atomic multi-edit operation for a single file | Restricted-mode dependent | Mapped to `write`; sequential edits |
| `undo` | Revert the most recent file operation on a path | No | Explicitly exempt from `permissions.yaml` |
| `shell` | Execute shell commands | Restricted-mode dependent | Mapped to `command` policy operations |
| `fetch` | Retrieve URL content as markdown or raw text | Restricted-mode dependent | Mapped to `url`; text content only |
| `followup` | Ask the user for clarification or missing details | [UNVERIFIED] | No official approval mapping documented |
| `plan` | Create a plan file | No | Explicitly exempt from `permissions.yaml` |
| `skill` | Load skill definitions/instructions | [UNVERIFIED] | No official approval mapping documented |
| `todo_write` | Create/update session todo items | [UNVERIFIED] | Session-state tool |
| `todo_read` | Read the current session todo list | [UNVERIFIED] | Session-state tool |
| `task` | Launch sub-agents such as `debug` or `sage` | No | Explicitly exempt from `permissions.yaml`; requires agent selection |

### Permission rule syntax

```yaml
permissions:
  - permission: allow | deny | confirm
    rule:
      read: "docs/**/*"
      write: "src/**/*"
      command: "git *"
      url: "https://api.github.com/*"
```

Policy behavior documented by ForgeCode:
- `read`, `write`, `command`, and `url` are the built-in policy categories.
- No matching rule falls back to `confirm`.
- MCP tools bypass `permissions.yaml`.

---

## Integrations

### Native integrations

| Integration | Type | What it enables | Requirements |
|-------------|------|-----------------|--------------|
| Zsh | Native shell integration | `:` prompt commands, command completion, in-shell prompting | Zsh plus plugin setup |
| Git | Native workflow integration | AI commit messages and repository-aware workflows | Git repository recommended |
| ForgeCode Services | Native hosted service | Semantic search, context engine, tool-call guardrails, skill engine | Login to ForgeServices and run `:sync` |

### AI provider integrations

| Integration | Type | What it enables | Requirements |
|-------------|------|-----------------|--------------|
| OpenRouter | Native provider | Access to 300+ models from multiple vendors | Provider login or API key |
| OpenAI | Native provider | GPT and Codex-family model access | Provider login/API credentials |
| Anthropic | Native provider | Claude Sonnet and Opus family access | Provider login/API credentials |
| Google Vertex AI | Native provider | Gemini and Vertex-hosted Claude models | Google Cloud auth and provider setup |
| OpenAI-compatible endpoints | API-compatible provider | Custom hosted model endpoints | API base URL and credentials |
| Groq | OpenAI-compatible provider | Groq-hosted model access | OpenAI-compatible configuration |
| Amazon Bedrock gateway | OpenAI-compatible provider path | Access to Bedrock models through Bedrock Access Gateway | Gateway deployment and provider login |

### Extensibility integrations

| Integration | Type | What it enables | Requirements |
|-------------|------|-----------------|--------------|
| MCP servers | MCP | External tools and services through `.mcp.json` | MCP server config |
| `AGENTS.md` | Project instruction file | Persistent project-level guidance injected into sessions | `AGENTS.md` in project root or configured search path |
| Custom skills | Local workflow extension | Reusable task-specific workflows | `SKILL.md` files |
| Custom commands | Local command extension | Shortcut prompts exposed as `:` commands | YAML files or `forge.yaml` |

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | Official docs name Anthropic Claude Sonnet/Opus, GPT Codex series, Grok-4, GPT-4.1, O3, Deepseek-R1, Gemini 2.5 Pro / 2.0 Flash, GLM, Kimi, Minimax, and provider-specific open-weight models |
| Models publicly disclosed | Partially |
| User model selection | Yes |
| Proprietary models | Yes |
| External models | Yes; model access comes from user-configured providers |
| Local models | Yes; official docs say ForgeCode works with models running locally |
| Multimodal models | Yes [UNVERIFIED coverage by provider]; docs support image tagging with PNG/JPG/JPEG/SVG/WebP |
| Context window | [NO OFFICIAL DATA] |
| Token limits | Config docs show `max_tokens = 20480` by default and configurable up to 100,000 for generated output |
| Model switching | Available via `:model`, `:config-model`, and provider login flows |

---

## Permissions & Security

- `permissions.yaml` only applies when `restricted = true` in `.forge.toml`.
- The documented mental model is: allow reads anywhere, ask before writes, block `rm` — but only if the policy file actually contains those rules.
- If restricted mode is enabled and no policy file exists, ForgeCode creates a default allow-all policy; official docs explicitly warn that turning on restricted mode alone does not make the tool stricter.
- Built-in tools are mapped into four policy families: `read`, `write`, `command`, and `url`.
- A matching `allow` is not always final; later `deny` or `confirm` rules can still apply.
- No matching rule falls back to `confirm`.
- `SemSearch`, `Undo`, `Plan`, and `Task` are documented as exempt from the `permissions.yaml` policy system.
- MCP tools also bypass `permissions.yaml` entirely.
- Config/docs expose additional security-related controls such as TLS backend selection, certificate validation, redirect limits, and tool execution timeouts.

---

## Privacy & Data Processing

- Normal provider traffic is direct: ForgeCode states that prompts, completions, and conversation context go from the user machine to the chosen LLM provider and do not pass through ForgeCode infrastructure.
- When `:sync` is used, ForgeCode Services indexes the project on ForgeCode servers.
- The indexing pipeline stores source file chunks and their vector embeddings.
- ForgeCode states that stored files and embeddings are used exclusively to power `sem_search`.
- ForgeCode states it does not use synced code to train models, does not sell it, and does not share it with third parties.
- `:logout` signs the user out but does not delete synced workspace data; workspace commands must be used to inspect and delete indexed workspaces.
- Files excluded by `.ignore` / `.gitignore` are not sent during sync.

---

## Limitations & Risks

- The `:` prompt workflow requires Zsh; without it, users fall back to standard CLI/TUI usage.
- Official install docs list Windows support through WSL or Git Bash rather than a native Windows shell path.
- Semantic indexing is not local-only; `:sync` uploads file chunks and embeddings to ForgeCode servers.
- `permissions.yaml` does not govern MCP tools.
- Restricted mode can appear enabled while still allowing everything if the generated policy is not tightened.
- `fetch` only handles text-based content and cannot access private/authenticated resources.
- File tagging can fail on very large files; docs recommend narrower tags or line ranges.
- The reviewed official pricing URL (`https://forgecode.dev/pricing`) returned 404, so no official pricing data is included in this profile.
- Official docs contain an inconsistency around `muse` access: the operating-agents page lists read+write, while the plan-and-act guide describes Muse as read-only.

---

## Alternatives

Official ForgeCode materials explicitly reference or depict these alternatives/comparators:

- **Claude Code** — ForgeCode docs describe the product as “think Claude Code, but with first-class support for many AI providers.”
- **Open Code** — Included in the ForgeCode homepage TermBench 2.0 comparison graphic.
- **Warp** — Included in the ForgeCode homepage TermBench 2.0 comparison graphic.

---

## Usage Examples

### Install ForgeCode

```bash
curl -fsSL https://forgecode.dev/cli | sh
```

### Start an interactive session

```bash
forge
```

### Run a single prompt and exit

```bash
forge -p "Explain the purpose of src/main.rs"
```

### Configure an AI provider

```bash
forge provider login
forge list model
```

### Use the Zsh prompt integration

```zsh
: refactor the auth module
:muse create a migration plan
:commit
:suggest "find large log files"
```

### Enable semantic search

```zsh
:login
:sync
:workspace-status
```

### Manage MCP servers

```bash
forge mcp list
forge mcp import
forge mcp reload
```

---

## Sources

- https://forgecode.dev
- https://forgecode.dev/docs
- https://forgecode.dev/docs/zsh-support
- https://forgecode.dev/docs/operating-agents
- https://forgecode.dev/docs/model-selection-guide
- https://forgecode.dev/docs/forge-services
- https://forgecode.dev/docs/permissions
- https://forgecode.dev/docs/forgecode-config
- https://forgecode.dev/docs/custom-rules-guide
- https://forgecode.dev/docs/file-tagging
- https://forgecode.dev/docs/ignoring-files
- https://forgecode.dev/docs/plan-and-act-guide
- https://forgecode.dev/schema.json
- https://github.com/tailcallhq/forgecode
- https://raw.githubusercontent.com/tailcallhq/forgecode/main/README.md
- https://github.com/tailcallhq/forgecode/releases
- https://github.com/tailcallhq/forgecode/blob/main/crates/forge_app/src/tool_registry.rs
- https://github.com/tailcallhq/forgecode/blob/main/crates/forge_app/src/tool_executor.rs
