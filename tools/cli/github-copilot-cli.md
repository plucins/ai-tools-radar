# GitHub Copilot CLI

```yaml
name: GitHub Copilot CLI
description: >
  Terminal-based AI coding agent that autonomously creates and modifies files, executes shell
  commands, and interacts with GitHub.com on behalf of the user. Provides both interactive chat
  and programmatic single-prompt modes without requiring an IDE.
category: cli
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification| Field | Value |
|-------|-------|
| Name | GitHub Copilot CLI |
| Alternative names | Copilot CLI, `copilot` (binary name) |
| Vendor / Organization | GitHub (Microsoft) |
| Homepage | https://github.com/features/copilot |
| Documentation | https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli |
| Changelog | https://github.com/github/copilot-cli/releases |
| Repository | https://github.com/github/copilot-cli |
| Current status | GA |
| Current stable version | 1.0.51 |
| Last stable release date | 2026-05-20 |
| Latest prerelease version | 1.0.52-4 |

---

## Classification

- **Primary category**: Coding Agent
- **Secondary categories**: CLI Tool, AI Assistant
- **Tool type**: SaaS with local execution (closed-source binary, cloud-hosted LLM)
- **Problem domain**: Software development, code generation, terminal task automation
- **User interaction type**: CLI (interactive chat + programmatic single-prompt)
- **Automation type**: Semi-autonomous to Autonomous (configurable via permission system)

---

## Summary

- **One-sentence description**: A terminal-based AI coding agent that can autonomously create and modify files, execute commands, and interact with GitHub.com on behalf of the user.
- **Extended description**: GitHub Copilot CLI provides an interactive chat interface and a programmatic mode directly in the terminal. It can reason about tasks, modify code, run shell commands, create pull requests, and manage GitHub resources. It replaces the retired GitHub CLI Copilot extension (`gh copilot`).
- **Core value proposition**: AI-powered development workflow directly in the terminal without requiring an IDE.
- **Primary problem solved**: Automating coding tasks, code modifications, command discovery, and GitHub operations from the command line.
- **Key differentiator**: Deep integration with GitHub.com (issues, PRs, Actions, code search) and built-in agent delegation capabilities.
- **Target users**: Developers who work primarily in the terminal, CI/CD automation pipelines, users of GitHub-hosted repositories.
- **Anti-target users**: Users without a GitHub Copilot subscription; users who require fully offline operation without BYOK configuration.
- **Primary usage context**: Local development terminal sessions; headless/automated CI pipelines.

---

## Use Cases

### Primary use cases

- Code modifications within a project (bug fixes, feature implementation, refactoring)
- Command discovery and explanation
- Git operations (commits, reverts, branch management)
- Pull request creation, review, and management
- Issue creation and management on GitHub.com
- GitHub Actions workflow creation
- Prototyping new applications from scratch

### Secondary use cases

- Documentation generation and maintenance
- Test coverage improvement
- Environment setup and configuration
- Codebase maintenance (dependency upgrades, security fixes)
- Deep research across codebase and web sources (`/research`)
- Code review (`/review`, `/security-review`)

### Anti-patterns (when NOT to use)

- Highly sensitive environments where no data should leave the local machine (unless BYOK + offline mode configured)
- Tasks requiring persistent long-running background processes
- Production deployment automation without human review gates

---

## Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| Interactive chat | Conversational interface with multi-turn context | Stable |
| Programmatic mode | Single-prompt execution via `-p` flag for scripting | Stable |
| Plan mode | Structured implementation planning before coding | Stable |
| Autopilot mode | Fully autonomous task completion without approval prompts | Stable |
| File operations | Create, edit, view files with syntax-aware patching | Stable |
| Shell execution | Run commands in local terminal environment | Stable |
| Session management | Persist, resume, and switch between sessions | Stable |
| Auto-compaction | Automatic context compression at 95% token limit | Stable |
| Custom instructions | Project-specific guidance via `.github/copilot-instructions.md` | Stable |
| MCP server support | Connect external tools via Model Context Protocol | Stable |
| Custom agents | Specialized AI agents defined in Markdown files | Stable |
| Skills | Markdown-based task-specific instruction injection | Stable |
| Hooks | Custom shell commands at key execution points | Stable |
| Copilot Memory | Persistent memory of coding conventions and preferences | Stable |
| `/delegate` | Hand off to GitHub cloud agent for PR creation | Stable |
| `/fleet` | Parallel subagent execution | Stable |
| `/research` | Deep research using GitHub search and web sources | Stable |
| BYOK (Bring Your Own Key) | Use custom model providers (OpenAI-compatible, Azure, Anthropic) | Stable |
| ACP server | Agent Client Protocol for third-party tool integration | Stable |
| OpenTelemetry monitoring | Export traces and metrics for observability | Stable |
| Plugins | Installable plugin system with marketplace support | Stable |
| Tab completion | Shell completion for bash, zsh, fish | Stable |

### Experimental Features

| Feature | Description | Status |
|---------|-------------|--------|
| `/security-review` | Review code changes for security vulnerabilities | Experimental |
| `/chronicle` | Session history tools and insights | Experimental |
| `/rubber-duck` | Independent critique from complementary model | Experimental |
| `/mcp search` | Search and install MCP servers from registry | Experimental |
| Tool search with deferred loading | Lazy tool loading for large tool sets | Experimental |

### Built-in Agents

| Agent | Default Model | Purpose |
|-------|---------------|---------|
| code-review | Claude Sonnet 4.5 | High signal-to-noise code review |
| explore | Claude Haiku 4.5 | Fast codebase exploration |
| general-purpose | Claude Sonnet 4.5 | Complex multi-step tasks |
| research | Claude Sonnet 4.6 | Deep research with web and code search |
| rubber-duck | Complementary model | Constructive critique of proposals |
| task | Claude Haiku 4.5 | Command execution (tests, builds, lints) |

### Built-in MCP Servers

| Server | Purpose |
|--------|---------|
| github-mcp-server | GitHub API: issues, PRs, commits, code search, Actions |
| playwright | Browser automation |
| fetch | HTTP requests |
| time | Time utilities |

---

## Interfaces

- **Interface type**: CLI (terminal application)
- **Supported platforms**: Linux (glibc and musl/Alpine), macOS (arm64, x64), Windows (arm64, x64)
- **Supported operating systems**: Linux, macOS, Windows (PowerShell v6+ and WSL)
- **Operating modes**: Interactive, Programmatic (`-p`), Plan, Autopilot
- **Binary name**: `copilot`

### Installation Methods

| Method | Command | Platform |
|--------|---------|----------|
| npm | `npm install -g @github/copilot` | All (requires Node.js 22+) |
| Homebrew | `brew install copilot-cli` | macOS, Linux |
| WinGet | `winget install GitHub.Copilot` | Windows |
| Install script | `curl -fsSL https://gh.io/copilot-install \| bash` | macOS, Linux |
| Direct download | From GitHub releases | All |

---

## Operating Modes

| Mode | Description | Autonomy Level |
|------|-------------|---------------|
| Interactive (default) | Conversational multi-turn chat with tool approval prompts | Semi-autonomous |
| Plan | Builds structured implementation plan before writing code | Semi-autonomous |
| Autopilot | Completes tasks autonomously without approval prompts | Autonomous |
| Programmatic | Single prompt, exits after completion (`-p` flag) | Configurable |

Mode switching: Use `Shift+Tab` to cycle between standard, plan, and autopilot in interactive sessions.

---

## Architecture & Mechanisms

- **AI models**: User-selectable; defaults available via `/model` slash command. Premium requests consume monthly quota based on model multiplier (e.g., Claude Sonnet 4.5 at 1x).
- **Model routing**: Supports `--model auto` for server-side model selection.
- **Context management**: Auto-compaction at 95% token limit; manual via `/compact`. Context window tiers: default ~200K tokens vs 1M tokens.
- **Tool calling**: Native function calling support required from model. Built-in tools: shell execution, file operations, agent delegation, web fetch, grep, glob.
- **Subagent system**: Max depth of 6, max concurrent 32 (configurable via environment variables).
- **BYOK providers**: OpenAI-compatible (including Ollama, vLLM), Azure OpenAI, Anthropic. Configured via `COPILOT_PROVIDER_*` environment variables.
- **Offline mode**: `COPILOT_OFFLINE=true` disables all telemetry and limits features to local model provider only.
- **Session persistence**: Sessions stored locally; can resume via `--continue` or `/resume`.
- **Safety mechanisms**: Tool approval system (per-request, per-session, or persistent per-directory), trusted directory verification, `--deny-tool` for explicit restrictions.

---

## Tool Capabilities

### Permission Patterns

```
shell(COMMAND)    # Allow/deny specific shell commands
write             # Allow/deny file modifications
read              # Allow/deny file reads
url(DOMAIN)       # Allow/deny URL access
MCP_SERVER(tool)  # Allow/deny MCP server tools
```

---

## Agent Tool Primitives

**Note**: GitHub does not publish a named tool primitives reference for Copilot CLI. The permission system operates at the category level — individual tool names (shell commands) are not pre-enumerated by the vendor.

Source: https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli (permission categories only)

### Permission categories (official)

| Category | Specifier format | What it covers |
|----------|-----------------|----------------|
| Shell | `shell(COMMAND)` | Any shell command execution; `git` and `gh` support first-level subcommand granularity (e.g., `shell(git push)`) |
| File write | `write` | All non-shell file modifications (create, edit, patch) |
| MCP server | `MCP_SERVER_NAME(tool)` | Tools from a specific MCP server; omit tool name to allow/deny all tools from the server |

Used with `--allow-tool`, `--deny-tool`, and `--allow-all-tools` flags, or with `/allow-all` / `/yolo` slash commands in interactive mode.

### Built-in custom agents

Copilot CLI includes specialized agents the model can delegate tasks to automatically:

| Agent | Purpose |
|-------|---------|
| Explore | Quick codebase analysis; questions without affecting main context |
| Task | Execute commands (tests, builds); brief summary on success, full output on failure |
| General purpose | Complex multi-step tasks; runs in a separate context |
| Code review | Reviews changes; focuses on genuine issues, minimizes noise |
| Research | Deep research across codebase, repositories, and web; produces report with citations |
| Rubber duck | Constructive critic; consulted automatically by Copilot, not invoked directly |

Source: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli

### Built-in tool names (community-sourced)

The following tool names have been observed in the wild via GitHub issue reports and community discussions. They are not part of official documentation but are supported by reproducible user reports.

**Confirmed real tool names** — observed in `copilot init` "Disabled tools" output (issue [#1722](https://github.com/github/copilot-cli/issues/1722), versions 0.0.419 and 1.0.31) and in debug API logs (community discussion [#189107](https://github.com/orgs/community/discussions/189107)):

| Tool name | Evidence |
|-----------|----------|
| `bash` | Named explicitly in multiple bug reports ("bash tool fails…", "bash tool sync mode does not return stdout output" — issues [#2850](https://github.com/github/copilot-cli/issues/2850), [#2402](https://github.com/github/copilot-cli/issues/2402)) |
| `powershell` | Listed in `copilot init` disabled tools output on Windows |
| `list_bash` | Inferred from `list_powershell` in disabled tools list (cross-platform naming parity) |
| `read_bash` | Inferred from `read_powershell` in disabled tools list |
| `stop_bash` | Inferred from `stop_powershell` in disabled tools list |
| `write_bash` | Inferred from `write_powershell` in disabled tools list |
| `list_powershell` | Disabled tools output, issue #1722 |
| `read_powershell` | Disabled tools output, issue #1722 |
| `stop_powershell` | Disabled tools output, issue #1722 |
| `write_powershell` | Disabled tools output, issue #1722 |
| `apply_patch` | Disabled tools output, issue #1722; confirmed as primary file-write tool — issue [#3315](https://github.com/github/copilot-cli/issues/3315) |
| `list_agents` | Disabled tools output, issue #1722 |
| `read_agent` | Disabled tools output, issue #1722 |
| `task` | Disabled tools output, issue #1722 |
| `skill` | Disabled tools output, issue #1722 |
| `web_fetch` | Disabled tools output, issue #1722; confirmed in API debug logs (discussion #189107); officially named in [GitHub changelog, Jan 14 2026](https://github.blog/changelog/2026-01-14-github-copilot-cli-enhanced-agents-context-management-and-new-ways-to-install/#web-access-controls) |
| `web_search` | Disabled tools output, issue #1722 (second report, v1.0.31) |
| `report_intent` | Disabled tools output, issue #1722; also visible in API debug log in discussion #189107 |
| `rg` | Disabled tools output, issue #1722 (ripgrep-based code search) |
| `sql` | Disabled tools output, issue #1722 |
| `store_memory` | Disabled tools output, issue #1722 (note: name is `store_memory`, not `memory`) |
| `fetch_copilot_cli_documentation` | Disabled tools output, issue #1722 |

**Confirmed NOT valid tool names** — flagged as "Unknown tool name" by the CLI (issue #1722):

| Tool name | Status |
|-----------|--------|
| `grep` | Not a valid tool; `rg` (ripgrep) appears to be the actual search tool |
| `edit` | Not a valid tool name |
| `create` | Not a valid tool name; confirmed again in issue [#3315](https://github.com/github/copilot-cli/issues/3315) — model hallucinated this name, expected tool is `apply_patch` |

**Status unknown from earlier profile version:**

`ask_user`, `glob`, `view`, `memory` — these names have not appeared in any observed disabled tools list or debug output. Their validity cannot be confirmed or denied from available community sources.

Sources: GitHub issue [#1722](https://github.com/github/copilot-cli/issues/1722), issue [#3315](https://github.com/github/copilot-cli/issues/3315), issue [#2850](https://github.com/github/copilot-cli/issues/2850), issue [#2402](https://github.com/github/copilot-cli/issues/2402), community discussion [#189107](https://github.com/orgs/community/discussions/189107)

---

## Integrations

- **GitHub.com**: Native integration — issues, PRs, code search, Actions, Discussions
- **MCP Protocol**: Full support for stdio, HTTP, and SSE transport types
- **IDE integration**: `/ide` command to connect to VS Code workspace
- **ACP (Agent Client Protocol)**: Expose CLI as an agent to third-party tools
- **Remote steering**: Control CLI sessions from GitHub.com or GitHub Mobile
- **Git**: Deep git integration for commits, branches, diffs, PR workflows
- **OpenTelemetry**: Full OTLP export for traces, metrics, and span events

---

## Security & Privacy

- **Authentication**: OAuth device flow (default), fine-grained PAT with "Copilot Requests" permission, or environment variable tokens (`COPILOT_GITHUB_TOKEN`, `GH_TOKEN`, `GITHUB_TOKEN`)
- **Token storage**: System credential store (preferred); falls back to plaintext `~/.copilot/` config
- **Trusted directories**: Prompted on first launch; scopes file access to launch directory and below
- **Tool approval**: Three-option prompt (once, session, deny) with persistent per-location approvals
- **Enterprise controls**: Organization-level policy to enable/disable Copilot CLI; enterprise MCP allowlist enforcement
- **Secret redaction**: `GITHUB_TOKEN` and `COPILOT_GITHUB_TOKEN` values redacted from output by default; additional variables via `--secret-env-vars`
- **Secret scanning**: Commit messages and PR descriptions scanned for secrets before publishing
- **Data handling (BYOK)**: Prompts and code sent directly to configured provider, not routed through GitHub
- **Telemetry**: Usage metadata sent to GitHub (no prompts or code); fully disabled in offline mode
- **Data residency**: Supports GitHub Enterprise Cloud data residency via `--host` option

---

## Pricing & Plans

GitHub Copilot CLI is available with all Copilot plans:

| Plan | Price | Key Copilot CLI Details |
|------|-------|------------------------|
| Free | $0/month | 50 agent mode or chat requests per month; Copilot CLI included |
| Pro | $10/user/month | 300 premium requests; unlimited agent mode with GPT-5 mini |
| Pro+ | $39/user/month | 5× premium requests of Pro; access to all models including Claude Opus 4.7 |
| Business | Per organization | Organization-level policy controls |
| Enterprise | Per enterprise | Enterprise MCP allowlist, SAML SSO, advanced policy management |

Each prompt submission reduces the monthly premium request quota by 1× the model's multiplier.

---

## Limitations

- **Language support**: English is the primary supported language for natural language interaction.
- **Scope**: May not handle certain code structures or obscure programming languages well; quality varies by language training data volume.
- **File access**: Limited to files in/below the launch directory by default; access to external directories requires explicit permission.
- **MCP policy gaps**: Cannot enforce organization-level "MCP servers in Copilot" or "MCP Registry URL" policies.
- **Public code matching**: May generate code matching public repositories even when "Suggestions matching public code" policy is set to "Block."
- **Rate limiting**: Response times may vary during high usage periods; requests may be subject to rate limiting.

---

## Command Reference

### Key Commands

| Command | Purpose |
|---------|---------|
| `copilot` | Launch interactive session |
| `copilot -p "PROMPT"` | Execute single prompt programmatically |
| `copilot --continue` | Resume most recent session |
| `copilot init` | Initialize project custom instructions |
| `copilot login` | Authenticate with GitHub |
| `copilot mcp` | Manage MCP server configurations |
| `copilot plugin` | Manage plugins |
| `copilot update` | Update to latest version |
| `copilot version` | Show version info |
| `copilot completion SHELL` | Generate shell completions |

### Key Slash Commands

| Command | Purpose |
|---------|---------|
| `/model` | Select AI model |
| `/compact` | Compress conversation context |
| `/context` | Show token usage breakdown |
| `/delegate` | Hand off to cloud agent for PR |
| `/fleet` | Parallel subagent execution |
| `/research` | Deep research investigation |
| `/review` | Code review agent |
| `/plan` | Create implementation plan |
| `/mcp` | Manage MCP servers |
| `/skills` | Manage skills |
| `/agent` | Browse/select agents |
| `/undo` | Revert last turn and file changes |
| `/diff` | Review changes in current directory |
| `/pr` | Manage pull requests |
| `/init` | Initialize custom instructions |
| `/share` | Export session to file, HTML, or gist |

---

## Configuration

- **Config directory**: `~/.copilot/` (override via `COPILOT_HOME`)
- **Settings file**: `~/.copilot/settings.json`
- **MCP config**: `~/.copilot/mcp-config.json`
- **Project MCP**: `.mcp.json` or `.github/mcp.json`
- **Custom instructions**: `.github/copilot-instructions.md`
- **Skills location**: `.github/skills/`, `~/.copilot/skills/`, plugin directories
- **Agent location**: `.github/agents/`, `.claude/agents/`, `~/.copilot/agents/`
- **Logs**: `~/.copilot/logs/` (override via `--log-dir`)

---

## Sources

- GitHub Docs — About GitHub Copilot CLI: https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli
- GitHub Docs — Installing GitHub Copilot CLI: https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli
- GitHub Docs — CLI Command Reference: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
- GitHub Docs — Responsible use of GitHub Copilot CLI: https://docs.github.com/en/copilot/responsible-use/copilot-cli
- GitHub Copilot Plans: https://github.com/features/copilot/plans
- GitHub Copilot CLI Releases: https://github.com/github/copilot-cli/releases

---

*Profile created: 2026-05-23*
