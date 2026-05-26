# OpenAI Codex CLI

```yaml
name: "OpenAI Codex CLI"
description: >
  OpenAI Codex CLI is an open-source coding agent that runs locally in a terminal and can read,
  edit, and execute code within a selected workspace. It supports interactive terminal use,
  non-interactive automation via `codex exec`, configurable approvals and sandboxing, MCP-based
  tool integration, and model selection across OpenAI and compatible providers.
category: cli
logo: https://img.logo.dev/openai.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | OpenAI Codex CLI |
| Alternative names | Codex CLI, Codex terminal client, npm package `@openai/codex` |
| Vendor / Organization | OpenAI |
| Homepage | https://developers.openai.com/codex/cli |
| Documentation | https://developers.openai.com/codex |
| Changelog | https://github.com/openai/codex/releases |
| Repository | https://github.com/openai/codex |
| First release date | 2025-04-30 (earliest public GitHub release tag in the official repository) |
| Current status | Active; stable and prerelease releases are both published |
| Current version | 0.133.0 (latest stable release); latest prerelease: 0.134.0-alpha.3 |
| Last updated | 2026-05-23 (latest prerelease) / 2026-05-21 (latest stable) |

---

## Classification

- **Primary category**: Coding Agent
- **Secondary categories**: CLI Tool, IDE Assistant, MCP Client/Server
- **Tool type**: Open-source local CLI with cloud-backed model inference
- **Problem domain**: Software development automation, code review, repository analysis, scripted coding workflows
- **User interaction type**: Terminal UI, one-shot CLI invocation, non-interactive batch execution, remote TUI over WebSocket
- **Automation type**: Agentic with configurable human approval policies

---

## Summary

- **One-sentence description**: OpenAI Codex CLI is a Rust-based terminal coding agent that operates on a local workspace, can read and modify files, run commands, and connect to external tools through MCP.
- **Extended description**: The CLI supports interactive terminal sessions, single-prompt local runs, and scripted automation through `codex exec`. It can authenticate with ChatGPT or API credentials, switch models, apply sandbox and approval policies, and optionally connect to remote app-server or Codex cloud workflows.
- **Core value proposition**: Local terminal execution with configurable approvals, OS-level sandboxing, model choice, and automation-friendly CLI surfaces.
- **Primary problem solved**: Reduces manual context gathering and repetitive terminal work for coding, review, and repo maintenance tasks.
- **Key differentiator**: Combines local workspace execution, non-interactive `exec` mode, MCP connectivity, and policy-controlled approvals in a single open-source CLI.
- **Target users**: Software engineers, platform teams, CI/CD operators, and organizations standardizing terminal-based coding-agent workflows.
- **Anti-target users**: Non-technical users, users without terminal access, or users expecting a fully offline local-model-only experience out of the box.
- **Primary usage context**: Local development in a repository, optionally extended to CI jobs, remote app-server sessions, or Codex cloud tasks.

---

## Use Cases

### Primary Use Cases
- Interactive coding assistance inside a repository (`codex`)
- Non-interactive automation in scripts and CI (`codex exec`)
- Local code review of working tree, base branch diffs, or specific commits (`/review`)
- Resume or fork previous sessions for multi-stage work (`codex resume`, `codex fork`)
- Connect external tools and documentation sources through MCP (`codex mcp`)

### Secondary Use Cases
- Remote terminal UI connected to an app server over WebSocket
- Cloud task submission and local diff application (`codex cloud`, `codex apply`)
- Image-assisted debugging and design review (`-i`, `--image`)
- Skill-based task acceleration and subagent delegation

### Example Workflows
- `codex "Explain this codebase to me"`
- `codex exec --json "summarize the repo structure" | jq`
- `codex cloud exec --env ENV_ID --attempts 3 "Summarize open bugs"`
- `codex mcp add context7 -- npx -y @upstash/context7-mcp`

### Anti-patterns
- Untrusted repositories with `--dangerously-bypass-approvals-and-sandbox`
- Unreviewed live-web or network-enabled runs in sensitive environments
- Public or untrusted automation runners using ChatGPT workspace access tokens

---

## Features

### Core Features

| Feature | Description | Plan / availability | Status | Source |
|---------|-------------|---------------------|--------|--------|
| Interactive terminal UI | Full-screen terminal UI that can read the repository, edit files, run commands, and show plans/diffs inline | All supported sign-in methods | Documented | CLI page; CLI features |
| One-shot local prompt | Run a single local task without entering the full TUI | All supported sign-in methods | Documented | CLI features |
| Non-interactive execution | `codex exec` runs Codex in scripts/CI, supports JSON Lines, schema-based output, and resume | All supported sign-in methods | Documented | Non-interactive mode; CLI reference |
| Session resume | Resume interactive and non-interactive runs from local transcript/session history | All supported sign-in methods | Documented | CLI features; Non-interactive mode |
| Approval modes | `Auto`, `Read-only`, and `Full Access` govern how much Codex can do without asking | All supported sign-in methods | Documented | CLI features |
| Model selection | Choose a default model in config, switch models with `/model`, or pass `--model` | Model catalog dependent | Documented | Models page; slash commands; CLI reference |
| Web search | First-party web search uses cached results by default; can switch to live or disabled | All supported sign-in methods | Documented | CLI features; agent approvals & security |
| MCP client support | Connect STDIO or streaming HTTP MCP servers; supports bearer token and OAuth auth flows | All supported sign-in methods | Documented | MCP docs |
| Local credential caching | Shares login state between CLI and IDE extension via `auth.json` or OS credential store | ChatGPT or API-key auth | Documented | Authentication |

### Advanced Features

| Feature | Description | Plan / availability | Status | Source |
|---------|-------------|---------------------|--------|--------|
| Local code review | `/review` opens review presets for base-branch, uncommitted, commit, or custom review instructions | Model-dependent; available in CLI | Documented | CLI features |
| Remote TUI via app server | Run `codex app-server` on one machine and connect from another with `--remote ws://...` or `wss://...` | All supported sign-in methods | Documented | CLI features |
| Skills | Local reusable workflows with progressive-disclosure loading; available in CLI, IDE extension, and Codex app | All supported sign-in methods | Documented | Skills docs |
| Subagents | Explicitly requested parallel agent workflows; consume additional tokens versus single-agent runs | All supported sign-in methods | Documented | CLI features; Skills/Subagents docs |
| MCP server mode | `codex mcp-server` runs Codex itself as an MCP server over stdio for another agent | All supported sign-in methods | Experimental | Repository README; CLI reference |
| Image input | Accepts PNG/JPEG and other common image formats via `-i` / `--image` | All supported sign-in methods | Documented | CLI features |
| Image generation | Natural-language or `$imagegen` image generation/editing using `gpt-image-2` | Not available on Free plan; API pricing applies with API key | Documented | CLI features; Codex pricing |
| Fast tier | `/fast` toggles a Fast service tier when the model catalog exposes one | ChatGPT sign-in only; model-catalog dependent | Documented | Slash commands; Authentication |
| Device-code login | `codex login --device-auth` for headless or callback-constrained environments | ChatGPT sign-in | Beta | Authentication |
| Codex cloud task launcher | `codex cloud` browses tasks; `codex cloud exec` submits tasks; `codex apply` applies diffs locally | ChatGPT sign-in required for Codex cloud | Documented | CLI features; CLI reference; Authentication |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| CLI / terminal UI | macOS, Linux, Windows | Primary interface |
| Non-interactive CLI | macOS, Linux, Windows | `codex exec` for scripts/CI |
| IDE integration | VS Code, Cursor, Windsurf | Repository README points users to IDE installation |
| Remote terminal UI | WebSocket-connected TUI | Uses `codex app-server` + `--remote` |
| MCP client/server | CLI and IDE extension | Client support documented; MCP server mode documented as experimental |

### Supported Operating Systems and Requirements
- macOS 12+
- Ubuntu 20.04+ / Debian 10+
- Windows support is documented in two ways: `docs/install.md` lists **Windows 11 via WSL2**, while the Codex CLI docs state Codex is available on **Windows with native PowerShell and the Windows sandbox**, or via WSL2. [OFFICIAL SOURCE CONFLICT]
- Git 2.23+ recommended for built-in PR helpers
- RAM: 4 GB minimum, 8 GB recommended

### Installation Methods
- Installer script (macOS/Linux): `curl -fsSL https://chatgpt.com/codex/install.sh | sh`
- Installer script (Windows): `powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"`
- npm: `npm install -g @openai/codex`
- Homebrew: `brew install --cask codex`
- GitHub release binaries for macOS and Linux archives

### Representative Commands
- `codex`
- `codex exec`
- `codex resume`
- `codex fork`
- `codex login`
- `codex logout`
- `codex mcp`
- `codex mcp-server`
- `codex cloud`
- `codex apply`
- `codex sandbox`
- `codex completion`
- `codex features`
- `codex app-server`

### Representative Slash Commands
- `/permissions`
- `/model`
- `/fast`
- `/plan`
- `/review`
- `/status`
- `/mcp`
- `/skills`
- `/memories`
- `/theme`
- `/copy`
- `/diff`
- `/resume`
- `/fork`
- `/side`
- `/approve`

---

## Operating Modes

| Mode | Description | Autonomy level | Limitations |
|------|-------------|----------------|-------------|
| Interactive | Full-screen TUI with inline plan/review/approval flow | Medium | Approval policy may interrupt actions |
| Single-prompt local run | `codex "task"` reads the working directory, plans, streams output, then exits | Medium | Shorter interaction surface than full TUI |
| Non-interactive / batch | `codex exec` for scripts, CI, JSON output, schema output, and resume | High | Requires explicit sandbox/approval settings; prompts/tool output may contain sensitive data |
| Remote TUI | TUI connects to a remote app server over `ws://` or `wss://` | Medium | Requires WebSocket auth/TLS for non-local use |
| Cloud task mode | `codex cloud` and `codex cloud exec` manage remote Codex cloud tasks | High | Requires ChatGPT sign-in |
| Read-only mode | Consultative mode; browse files but do not edit or run commands without approval | Low | No edits or commands until approved |
| Full-access mode | Local agent can work across the machine and use network without asking | Highest | High-risk; intended only for trusted repositories/tasks |

---

## Architecture & Mechanisms

- **Implementation**: Open-source CLI written in Rust; repository README states the Rust implementation is the maintained Codex CLI.
- **Execution model**: Runs locally in the selected directory and can read, change, and run code on the machine within the configured sandbox/approval policy.
- **Configuration**: Uses `config.toml`; CLI and IDE extension share the same auth cache and MCP configuration.
- **Session storage**: Interactive transcripts are stored locally; `codex resume` and `codex exec resume` use local session history under `~/.codex/sessions/`.
- **Sandboxing**: Default local operation uses an OS-enforced sandbox with network access off by default and write scope typically limited to the workspace. Official docs state macOS uses Seatbelt/sandbox-exec, Linux uses the Linux sandbox, and WSL2 uses Linux sandbox semantics.
- **Approvals**: Approval policy is distinct from sandbox mode. Docs describe `on-request`, `never`, `untrusted`, and granular approval policies, plus optional automatic approval review.
- **Web search**: Default local web search uses an OpenAI-maintained cached index of web results; live search can be enabled explicitly.
- **MCP**: Supports STDIO and streaming HTTP MCP servers, bearer token auth, OAuth login flows, per-tool approval modes, and plugin-provided MCP servers.
- **Skills context management**: Skills use progressive disclosure. Codex starts with skill name, description, and path; the initial skill list is capped at roughly 2% of the model’s context window, or 8,000 characters when the context window is unknown.
- **Model routing**: Official docs recommend `gpt-5.5` for most tasks; users can choose other supported OpenAI or compatible provider models.

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Control mechanism |
|------------|-------------|-------|------------|-------------------|
| File reading | Reads repository files and attached paths into context | Local workspace and configured readable roots | Low | Approval mode / sandbox configuration |
| File editing | Can modify files and apply diffs | Workspace by default; broader scopes require permission changes | Medium | `--sandbox`, `/permissions`, approval policy |
| Command execution | Runs model-generated shell commands | Local shell environment | High | Sandbox mode, approval policy, auto-review, execpolicy |
| Internet access | Default command network access is off; web search cache available separately | Network-disabled by default; live network can be enabled | High | `sandbox_workspace_write.network_access`, network proxy rules, `--search` |
| Web search | First-party web search tool with cached or live modes | Search results; cached index or live fetch | Medium | `web_search` config, approval/security settings |
| MCP tool usage | Calls third-party MCP tools and resources | User-configured servers and plugin-provided servers | Medium to High | Per-server tool allow/deny lists and approval modes |
| App / connector actions | Docs state Codex can request approval for app tool calls with side effects | Connector/app tools exposed to Codex | High | Destructive app/MCP tool calls require approval when marked destructive |
| API usage | Can authenticate with API key and use OpenAI-standard API billing | OpenAI Platform account or compatible providers | Medium | API key auth, provider config, org retention/data-sharing settings |
| Credential caching | Stores auth locally in `auth.json` or OS keyring | Local machine | Medium | `cli_auth_credentials_store = "file" | "keyring" | "auto"` |

---

## Integrations

### Native Integrations
- **IDE integration**: VS Code, Cursor, and Windsurf are explicitly referenced from the repository README.
- **Git / PR helpers**: Install docs recommend Git 2.23+ for built-in PR helpers.
- **Codex cloud**: CLI can browse tasks, submit tasks, and apply remote diffs locally.
- **Plugin marketplace**: CLI reference documents `codex plugin marketplace` commands.

### MCP Support
- **MCP client**: Supports STDIO and streamable HTTP servers.
- **Auth**: Bearer token and OAuth; `codex mcp login <server-name>` is documented for OAuth-capable streaming HTTP servers.
- **Per-tool policy**: Supports `enabled_tools`, `disabled_tools`, `default_tools_approval_mode`, and per-tool approval overrides.
- **MCP server**: `codex mcp-server` exposes Codex itself to another MCP client.

### Remote / Automation Integrations
- **App server**: `codex app-server` exposes stdio, WebSocket, or Unix-socket interfaces for local development and debugging.
- **IDE extension**: Shares config/auth/MCP setup with CLI.

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models publicly disclosed | Yes |
| Recommended default model | `gpt-5.5` |
| Other documented OpenAI models | `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.3-Codex`, `gpt-5.3-Codex-Spark` |
| Image model | `gpt-image-2` |
| User model selection | Yes — config `model = "..."`, `/model`, and `--model` |
| Proprietary models | Yes — OpenAI GPT family |
| External models | Yes — any model/provider supporting Chat Completions or Responses APIs |
| Local models | Yes — alternative providers can omit auth, which docs say is useful for local models |
| Multimodal | Yes — image input and image generation are documented |
| Context window | [NO OFFICIAL DATA] |
| Token limits | [NO OFFICIAL DATA] |
| Training on user data | Sign-in dependent: ChatGPT sign-in follows workspace policies; API-key sign-in follows API organization retention and data-sharing settings |

### Model Notes
- Docs recommend `gpt-5.5` for most tasks.
- `gpt-5.4-mini` is positioned as the faster, lower-cost option for lighter tasks or subagents.
- `gpt-5.3-Codex-Spark` is documented as a text-only research preview available to ChatGPT Pro users.
- Codex pricing docs state cloud tasks and code review run on `GPT-5.3-Codex`.

---

## Permissions & Security

### Authentication and Access Control
- ChatGPT sign-in for subscription access
- API key sign-in for usage-based access
- Codex access tokens for trusted enterprise automation
- Device-code login (`codex login --device-auth`) for headless/browser-constrained environments
- Admin-enforced login restrictions via `forced_login_method` and `forced_chatgpt_workspace_id`

### Local Credential Handling
- Cached credentials are reused across CLI and IDE extension sessions.
- Storage location is configurable: file (`~/.codex/auth.json` under `CODEX_HOME`), OS keyring, or auto.
- Official docs warn that `auth.json` contains access tokens and must be treated like a password.

### Sandbox and Approval Controls
- Default local behavior: network off, workspace-limited write access, approval policy layered on top.
- Official docs distinguish sandbox mode (“what can run technically”) from approval policy (“when Codex must ask”).
- `--dangerously-bypass-approvals-and-sandbox` / `--yolo` removes both protections and is explicitly described as dangerous.
- Automatic approval review can be enabled with `approvals_reviewer = "auto_review"`.

### Enterprise / Administrative Controls
- Authentication docs reference ChatGPT workspace permissions, RBAC, retention, and residency settings for ChatGPT-based use.
- Codex pricing lists enterprise controls including SCIM, EKM, audit logs, and usage monitoring via the Compliance API.
- Authentication docs require MFA for Codex cloud access in several account configurations and recommend MFA generally.

---

## Privacy & Data Processing

| Aspect | Officially documented behavior |
|--------|-------------------------------|
| Sign-in with ChatGPT | Usage follows ChatGPT workspace permissions, RBAC, and (for Enterprise) retention/residency settings |
| Sign-in with API key | Usage follows the API organization’s retention and data-sharing settings |
| Business plan training policy | Codex pricing states: “No training on your business data by default” |
| Local auth storage | Cached locally in `~/.codex/auth.json` or the OS credential store |
| Local session persistence | Interactive and exec sessions are stored locally for resume/fork workflows |
| Headless credential transfer | Official docs describe copying `auth.json` to trusted headless machines, SSH targets, or containers; they warn not to commit or share it |

**Note:** OpenAI’s general privacy-policy page was not directly retrievable in this environment because the site returned a Cloudflare challenge page rather than the policy text. This profile therefore relies on product-specific authentication, pricing, and Codex documentation for privacy statements.

---

## Limitations & Risks

| Limitation / risk | Officially documented detail |
|-------------------|------------------------------|
| Web result trust | Cached/live web results should still be treated as untrusted; enabling live web or network access increases prompt-injection exposure |
| Dangerous full access mode | `--yolo` / `--dangerously-bypass-approvals-and-sandbox` removes approvals and sandboxing |
| Token usage growth | Subagents consume more tokens than comparable single-agent runs |
| Git repository assumption | `codex exec` requires commands to run inside a Git repository unless `--skip-git-repo-check` is used |
| Windows support nuance | Install docs and CLI docs describe Windows support differently ([OFFICIAL SOURCE CONFLICT]) |
| Cloud auth restriction | Codex cloud requires ChatGPT sign-in |
| Image generation limits | Not available on the Free plan; image generations consume included limits faster than similar non-image turns |
| Fast mode availability | `/fast` is model-catalog dependent and available only when the current model exposes a Fast tier |

---

## Pricing

| Access path / plan | Official pricing notes |
|--------------------|------------------------|
| ChatGPT Free / Go / Plus / Pro / Business / Edu / Enterprise | The Codex pricing page states Codex is included in these plans |
| CLI docs plan list | CLI overview page specifically mentions Plus, Pro, Business, Edu, and Enterprise plans [OFFICIAL SOURCE CONFLICT vs pricing page] |
| Pro | Pricing page states Pro users can choose 5x or 20x higher rate limits than Plus; it also documents temporary usage promotions through 2026-05-31 |
| Business | Supports standard or usage-based Codex seats; pricing page states business data is not used for training by default |
| Enterprise / Edu | Pricing docs state these plans do not have fixed rate limits |
| API key usage | Billed at standard API rates; delayed access to new models like `GPT-5.3-Codex` and `GPT-5.3-Codex-Spark` is documented on the pricing page |
| Additional usage | Plus and Pro users can buy extra ChatGPT credits after included limits; API key usage can also extend local work |

### Pricing Notes
- Local messages and cloud tasks share a five-hour usage window; additional weekly limits may apply.
- Docs recommend switching to a smaller model to extend usage limits.
- Pricing docs state cloud tasks and code review run on `GPT-5.3-Codex`.

---

## Usage Examples

### Installation
```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
npm install -g @openai/codex
brew install --cask codex
```

### Interactive use
```bash
codex
codex "Explain this codebase to me"
```

### Non-interactive / CI
```bash
codex exec "fix the CI failure"
codex exec --json "summarize the repo structure" | jq
codex exec --output-schema ./schema.json -o ./project-metadata.json "Extract project metadata"
```

### Resume prior work
```bash
codex resume --last
codex exec resume --last "fix the race conditions you found"
```

### Remote app-server mode
```bash
codex app-server --listen ws://127.0.0.1:4500
codex --remote ws://127.0.0.1:4500
```

### MCP setup
```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
codex mcp login <server-name>
```

### Representative slash commands
```text
/model
/permissions
/review
/status
/mcp
/plan
```

---

## Sources

1. OpenAI Codex repository — https://github.com/openai/codex
2. OpenAI Codex repository README — https://github.com/openai/codex/blob/main/README.md
3. OpenAI Codex releases — https://github.com/openai/codex/releases
4. OpenAI Codex changelog pointer — https://github.com/openai/codex/blob/main/CHANGELOG.md
5. Codex CLI docs — https://developers.openai.com/codex/cli
6. Codex CLI features — https://developers.openai.com/codex/cli/features
7. Codex CLI reference — https://developers.openai.com/codex/cli/reference
8. Codex authentication docs — https://developers.openai.com/codex/auth
9. Codex models docs — https://developers.openai.com/codex/models
10. Codex MCP docs — https://developers.openai.com/codex/mcp
11. Codex skills docs — https://developers.openai.com/codex/skills
12. Codex non-interactive mode docs — https://developers.openai.com/codex/noninteractive
13. Codex slash commands docs — https://developers.openai.com/codex/cli/slash-commands
14. Codex agent approvals & security docs — https://developers.openai.com/codex/agent-approvals-security
15. Codex pricing — https://developers.openai.com/codex/pricing
16. Repository install docs — https://github.com/openai/codex/blob/main/docs/install.md
17. Rust CLI README — https://github.com/openai/codex/blob/main/codex-rs/README.md
