# Zed
```yaml
name: "Zed"
description: >
  Zed is an open-source code editor with native AI features, real-time collaboration, and a built-in agent interface. It is implemented in Rust, uses GPU-accelerated rendering, and supports both Zed-hosted models and bring-your-own-provider configurations.
category: ide
logo: https://img.logo.dev/zed.dev?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | Zed |
| Alternative names | None documented in official sources |
| Vendor / Organization | Zed Industries, Inc. |
| Homepage | https://zed.dev |
| Documentation | https://zed.dev/docs |
| Changelog | https://zed.dev/releases/stable ; https://github.com/zed-industries/zed/releases |
| Repository | https://github.com/zed-industries/zed |
| First release date | 2021-06-08 (`v0.1` GitHub release) |
| Current status | Publicly available; stable and preview release channels are published weekly |
| Current stable version | `v1.3.6` |
| Current preview version | `v1.4.1-pre` / `1.4.1` preview channel |
| Last stable release date | 2026-05-21 |
| Open-source status | Open-source editor and AI features; public repository on GitHub |
| Licensing | Repository currently includes `LICENSE-APACHE`, `LICENSE-GPL`, and `LICENSE-AGPL`; component-level scope is [UNVERIFIED] from top-level sources |

## Classification

- **Primary category:** IDE
- **Secondary categories:** AI-native code editor; collaborative editor; desktop development environment
- **Tool type:** Open-source desktop application with paid hosted AI services
- **Problem domain:** Code editing, AI-assisted refactoring/generation, real-time collaboration, remote development
- **User interaction type:** Desktop GUI, command palette, CLI (`zed`), agent chat panel, terminal threads
- **Automation type:** Assistive and semi-autonomous; tool execution can require per-action approval

## Summary

- **One-sentence description:** Zed is a native desktop code editor that combines standard editor workflows with built-in AI agents, real-time collaboration, and remote development.
- **Extended description:** Zed exposes AI through an Agent Panel, inline transformations, and edit predictions. It also supports external agents over ACP, MCP servers for tool extension, and hosted or self-managed model providers.
- **Core value proposition:** Combine editor responsiveness, AI-assisted code editing, and multiplayer collaboration in one native application.
- **Primary problem solved:** Reduces context switching between editor, AI assistant, terminal, and collaboration tooling.
- **Key differentiator:** Native Rust implementation with GPU rendering, built-in multiplayer collaboration, and multi-provider AI with both first-party and external agents.
- **Target users:** Individual developers, pair-programming teams, students, remote SSH/WSL users, and organizations adopting AI-assisted editing.
- **Anti-target users:** Teams that require a browser IDE, mobile client, fully offline collaboration service, or Windows as a remote server host.
- **Primary usage context:** Local desktop development with optional hosted AI, BYOK providers, or external CLI agents.

## Use Cases

### Primary use cases
- AI-assisted code generation, refactoring, debugging, and Q&A in the Agent Panel.
- Inline code transformation with the Inline Assistant.
- Low-latency edit prediction while typing.
- Real-time collaborative editing in shared projects and channels.
- Remote development over SSH with local UI and remote language servers/tasks/terminal.

### Secondary use cases
- Using external agents such as Gemini CLI, Claude Agent, Codex CLI, and GitHub Copilot through ACP.
- Extending agent capabilities with MCP servers and MCP server extensions.
- Using Zed as a Git editor via `zed --wait`.
- Multi-project and multi-worktree agent workflows with isolated threads.

### Example workflows
- Open a repository with `zed .`, start an agent thread, review diffs, and accept/reject hunks in the review UI.
- Open `zed ssh://user@host:~/project` to run language servers, tasks, and terminal remotely while keeping UI and model interactions local.
- Share a project in a channel so collaborators can edit files, search, and use language servers against code hosted on the sharer's machine.
- Configure a custom MCP server in `context_servers` and expose external tools directly in the Agent Panel.

### Anti-patterns
- Opening very large directories such as `/` or `~` on remote hosts with more than 100,000 files; the docs explicitly say this is not currently handled well.
- Treating external-agent behavior as identical to the first-party Zed agent; some thread-history and checkpoint features are unavailable.
- Assuming BYOK or external-agent traffic is governed by Zed's hosted-model data handling guarantees.

## Features

### Core features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| Native Rust editor | Zed is written in Rust and positioned as a native, GPU-accelerated editor rather than an Electron application. | All plans | Stable | https://zed.dev ; https://zed.dev/docs/ai/overview.html |
| Agent Panel | Built-in agent UI that can read, edit, and run code in the current project. | Free with BYOK/external agents; hosted models on Pro/Student/Business | Stable | https://zed.dev/docs/ai/agent-panel.html |
| Inline Assistant | In-place transformation of selected code or terminal commands. | Depends on configured model provider | Stable | https://zed.dev/docs/ai/overview.html |
| Edit Prediction | Per-keystroke code completion with Zeta or third-party providers. | Limited on Free; unlimited on Pro/Student/Business | Stable | https://zed.dev/docs/ai/edit-prediction.html ; https://zed.dev/docs/ai/plans-and-usage.html |
| Collaboration channels | Persistent rooms with shared projects, voice chat, and notes. | Requires sign-in; Business can control availability | Stable | https://zed.dev/docs/collaboration/overview.html ; https://zed.dev/docs/collaboration/channels.html |
| Remote development | Local UI with remote headless server over SSH; terminals, tasks, and language servers run remotely. | All plans | Stable | https://zed.dev/docs/remote-development.html |
| CLI | `zed` CLI opens files/projects, supports `--wait`, `--diff`, stdin, URL handling, and scripting integration. | All plans | Stable | https://zed.dev/docs/reference/cli.html |
| Extensions | Supports extension installation and development; docs list language, theme, debugger, snippet, agent-server, and MCP-server extension types. | All plans | Stable | https://zed.dev/docs/extensions |

### Advanced features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| Parallel agents | Multiple agent and terminal threads can run concurrently, each with its own context window and history. | Depends on configured agent/provider | Stable | https://zed.dev/docs/ai/parallel-agents.html |
| External agents over ACP | Zed can host Gemini CLI, Claude Agent, Codex CLI, GitHub Copilot, and custom ACP-compatible agents in the Agent Panel. | Depends on external agent/provider | Stable | https://zed.dev/docs/ai/external-agents.html |
| MCP support | Supports MCP Tools and Prompts, custom servers, extensions, and OAuth flows for remote MCP servers. | Depends on server/provider | Stable | https://zed.dev/docs/ai/mcp.html |
| Tool permissions | Per-tool allow/confirm/deny rules with regex matching and built-in destructive-command protections. | All plans | Stable | https://zed.dev/docs/ai/tool-permissions.html |
| Worktree trust / Restricted Mode | New worktrees start in restricted mode; project settings, language servers, and MCP servers are blocked until trusted. | All plans | Stable | https://zed.dev/docs/worktree-trust.html |
| Review Changes / checkpoints | Agent edits can be reviewed by hunk and restored from checkpoints. | First-party Zed agent | Stable | https://zed.dev/docs/ai/agent-panel.html |
| Local/self-hosted AI | Agent and edit prediction workflows can be configured against Ollama, LM Studio, or OpenAI-compatible endpoints. | All plans | Stable | https://zed.dev/docs/ai/llm-providers.html ; https://zed.dev/docs/ai/edit-prediction.html |

### Experimental / preview features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| Skills | Preview release `1.4.0` adds agent skills support. | Preview channel | Preview | https://zed.dev/releases/preview |
| Global `AGENTS.md` | Preview release `1.4.0` adds support for a global `AGENTS.md` file included in each project's system prompt. | Preview channel | Preview | https://zed.dev/releases/preview |
| MCP image output | Preview release `1.4.0` adds image output support from MCP tools. | Preview channel | Preview | https://zed.dev/releases/preview |
| Collaboration audio device selection | Audio device selectors appear under Collaboration > Experimental settings. | All plans | Experimental | https://zed.dev/docs/collaboration/overview.html |

## Interfaces

### Interface types
- Desktop application
- Command palette
- CLI (`zed`)
- Agent chat panel
- Terminal thread UI
- Collaboration panel
- MCP/ACP integration surface

### Supported platforms and operating systems

| Platform | Support details | Source |
|---|---|---|
| macOS | macOS 10.15.7 or later; Apple Silicon or Intel; Metal rendering; primary development platform | https://zed.dev/docs/macos.html |
| Linux | x86_64 and aarch64 builds; Vulkan-compatible GPU recommended; glibc requirements documented | https://zed.dev/docs/linux.html |
| Windows | Desktop client available; requires DirectX 11 compatible GPU | https://zed.dev/docs/windows.html |
| Remote server host | macOS Catalina+, Linux x86_64/arm64; Windows not supported as remote server | https://zed.dev/docs/remote-development.html |
| WSL | Windows client can open folders inside WSL natively | https://zed.dev/docs/remote-development.html |

### Commands and key entry points
- Command palette: `Cmd+Shift+P` / `Ctrl+Shift+P`
- Agent Panel: `Cmd+Shift+A` / `Ctrl+Shift+A` from getting-started docs; `agent: new thread` from agent docs
- Threads Sidebar: `Cmd+Alt+J` / `Ctrl+Alt+J`
- Collaboration Panel: `Cmd+Shift+C` / `Ctrl+Shift+C`
- CLI install (macOS): `cli: install cli binary`
- CLI usage: `zed [OPTIONS] [PATHS]...`

### CLI options documented officially
- `--wait`
- `--new`
- `--add`
- `--reuse`
- `--diff`
- `--foreground`
- `--user-data-dir`
- `--version`
- `--uninstall`
- `--zed`

## Operating Modes

| Mode | Description | Autonomy level | Notes / limitations |
|---|---|---|---|
| Interactive editing | Standard editor workflow with command palette, panels, language tooling, and manual editing. | Manual | Core mode of the desktop editor. |
| Agentic editing | Zed Agent reads, edits, and runs tools from the Agent Panel. | Semi-autonomous | Tool calls can require confirmation; longer tasks should be monitored. |
| Parallel agent threads | Multiple agent and terminal threads run independently with separate context windows. | Semi-autonomous | Useful for concurrent tasks; each thread retains separate history. |
| External-agent mode | ACP-hosted agents such as Gemini CLI, Claude Agent, and Codex run inside Zed's UI. | Depends on external agent | Some Zed thread features are unavailable for external agents. |
| Local / self-hosted AI mode | Models can be served by Ollama, LM Studio, or OpenAI-compatible endpoints. | Assistive / semi-autonomous | Data handling depends on local or third-party provider configuration. |
| Remote development mode | Zed UI runs locally while code, language servers, tasks, and terminals run remotely over SSH. | Manual + assistive | Requires SSH access and a compatible remote server. |
| CLI scripting mode | `zed --wait`, stdin input, and URL handling enable integration with Git and shell scripts. | Manual / batch-style integration | Not a standalone batch processor; it controls editor launch behavior. |

## Architecture & Mechanisms

- **Implementation language:** Rust.
- **Rendering:** GPU-accelerated native rendering; docs explicitly reference Metal on macOS, Vulkan on Linux, and DirectX 11 requirements on Windows.
- **Editor parsing/highlighting:** Tree-sitter is used locally for parsing and syntax highlighting in remote-development sessions.
- **Language tooling:** Language servers are installed and spawned by Zed or extensions; trust controls can block project-defined servers until approved.
- **AI execution model:** Zed offers first-party hosted models, bring-your-own provider keys, and external agents via ACP.
- **Context construction:** Each agent thread maintains its own context window; context window sizes depend on the selected model.
- **Tool calling:** Built-in agent tools cover file reads/searches, edits, terminal commands, web fetch/search, and subagent spawning; MCP extends this toolset.
- **Remote architecture:** In SSH remoting, the local machine runs UI, Tree-sitter, and model interactions; the remote host runs the Zed headless server, language servers, tasks, and terminals.
- **Credentials storage:** API keys entered in settings are stored in the operating system's secure credential storage rather than plaintext settings.
- **Approval logic:** `agent.tool_permissions.default` supports `confirm`, `allow`, and `deny`; per-tool regex rules and hardcoded destructive-command blocks apply.
- **Trust model:** All worktrees begin in Restricted Mode; project settings, language servers, and MCP servers remain disabled until trust is granted.
- **Context window range (hosted models):** Documented examples range from 128k (Grok 4 Fast) to 1M (Claude Opus 4.6/4.7, Claude Sonnet 4.6).

## Tool Capabilities

| Capability | Support | Notes | Risk / control |
|---|---|---|---|
| File reading | Yes | `read_file`, `find_path`, `list_directory`, `grep`, `diagnostics` | Read-only tools; no approval rules documented for these built-ins |
| File editing | Yes | `edit_file`, `write_file`, `move_path`, `copy_path`, `delete_path`, `create_directory` | Permission-gated through `agent.tool_permissions` |
| Command execution | Yes | `terminal` tool executes a fresh shell process per invocation | Permission-gated; built-in destructive `rm -rf` protections |
| Internet/document fetch | Yes | `fetch` returns URL content as Markdown | Permission-gated |
| Web search | Yes, plan-dependent | `search_web` available only to Zed Pro subscribers using the Zed provider | Permission-gated; unavailable on free/BYOK-first-party configurations |
| Subagent delegation | Yes | `spawn_agent` creates a subagent with its own context window | No explicit approval rule documented |
| Diagnostics access | Yes | `diagnostics` returns file/project errors and warnings | Read-only |
| MCP tool access | Yes | MCP Tools and Prompts supported; custom servers and extensions supported | Governed by tool permissions and worktree trust |
| API usage | Yes | Provider APIs for Anthropic, OpenAI, Google, xAI, Bedrock, etc.; MCP over HTTP/custom commands | Data handling depends on chosen provider / server |
| Pull request creation | Integration-dependent | Not a built-in primitive; possible through MCP servers such as GitHub | Depends on installed MCP tool and permission rules |
| Sandbox availability | [NO OFFICIAL DATA] | No dedicated sandbox for terminal/tool execution is documented | Approval and trust controls are the documented safeguards |
| User consent requirements | Yes | Tool permissions, worktree trust, collaboration trust warnings, external-agent authentication | Explicit approval paths documented |

## Agent Tool Primitives

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `diagnostics` | Read project or file diagnostics | No explicit approval gate documented | Built-in |
| `fetch` | Fetch URL content as Markdown | Yes | Built-in; permission-gated |
| `find_path` | Find files by glob pattern | No explicit approval gate documented | Built-in |
| `grep` | Search project contents with regex | No explicit approval gate documented | Built-in |
| `list_directory` | List files and directories | No explicit approval gate documented | Built-in |
| `read_file` | Read file contents | No explicit approval gate documented | Built-in |
| `search_web` | Web search with snippets and links | Yes | Built-in; Pro + Zed provider only |
| `copy_path` | Copy a file or directory recursively | Yes | Built-in; permission-gated |
| `create_directory` | Create a directory path | Yes | Built-in; permission-gated |
| `delete_path` | Delete a file or directory | Yes | Built-in; permission-gated |
| `edit_file` | Replace specific text within a file | Yes | Built-in; permission-gated |
| `move_path` | Move or rename a file/directory | Yes | Built-in; permission-gated |
| `write_file` | Create or overwrite a file | Yes | Built-in; permission-gated |
| `terminal` | Execute shell commands and return output | Yes | Built-in; permission-gated |
| `spawn_agent` | Launch a subagent with its own context window | No explicit approval gate documented | Built-in |

## Integrations

### Native integrations
- Git panel, branch history, diffs, and worktrees.
- Language servers and formatters.
- SSH remote development.
- WSL support on Windows.
- Dev Containers and Jupyter REPL are documented in the docs navigation.
- Vim Mode and Helix Mode for alternate editing workflows.

### AI provider integrations
- Zed-hosted models.
- Amazon Bedrock
- Anthropic
- ChatGPT Subscription
- DeepSeek
- GitHub Copilot Chat
- Google AI
- LM Studio
- Mistral
- Ollama
- OpenAI
- OpenAI API-compatible endpoints
- OpenCode
- OpenRouter
- Vercel AI Gateway
- xAI

### External-agent integrations (ACP)
- Gemini CLI
- Claude Agent
- Codex CLI
- GitHub Copilot
- Custom ACP-compatible agents

### MCP integrations
- Supports MCP Tools and Prompts.
- MCP servers can be installed as extensions or configured directly in `context_servers`.
- Official examples on the docs page include Context7, GitHub, Puppeteer, Gem, Brave Search, Framelink Figma, Resend, and Prisma.
- Remote MCP servers can use OAuth if no `Authorization` header is preconfigured.

### Collaboration integrations
- Real-time shared projects
- Voice chat
- Screen sharing
- Shared channel notes

### Migration / compatibility aids
- Official migration guides exist for VS Code, IntelliJ IDEA, PyCharm, WebStorm, and RustRover.

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | Zed-hosted chat/agent models from Anthropic, OpenAI, Google, and xAI; Zeta for edit prediction; external agents and BYOK providers are also supported |
| Models publicly disclosed | Yes |
| User model selection | Yes |
| Proprietary models | Yes — Zeta edit prediction model |
| External models | Claude Opus 4.5/4.6/4.7, Claude Sonnet 4.5/4.6, Claude Haiku 4.5, GPT-5.5/pro, GPT-5.4/pro, GPT-5.3-Codex, GPT-5.2, GPT-5.2-Codex, GPT-5 mini/nano, Gemini 3.1 Pro, Gemini 3 Flash, Grok 4 / Grok 4 Fast / Grok Code Fast 1, plus BYOK provider catalogs |
| Local models | Yes — Ollama, LM Studio, OpenAI-compatible servers, local/self-hosted edit prediction backends |
| Multimodal models | Yes — Bedrock vision support is documented for compatible models; preview release notes also mention image output from MCP tools |
| Context window | Hosted models documented from 128k to 1M, depending on model |
| Token limits | Examples documented: OpenAI hosted models 272k input / 400k total; Anthropic hosted models up to 1M context |
| Training on user data | Not by default; rating responses shares full threads, and Zeta training-data collection is opt-in and limited to eligible open-source projects |

### Documented hosted model families (May 2026)
- **Anthropic:** Claude Opus 4.5 / 4.6 / 4.7; Claude Sonnet 4.5 / 4.6; Claude Haiku 4.5
- **OpenAI:** GPT-5.5 pro, GPT-5.5, GPT-5.4 pro, GPT-5.4, GPT-5.3-Codex, GPT-5.2, GPT-5.2-Codex, GPT-5 mini, GPT-5 nano
- **Google:** Gemini 3.1 Pro, Gemini 3 Flash
- **xAI:** Grok 4, Grok 4 Fast, Grok 4 (Non-Reasoning), Grok Code Fast 1
- **Edit prediction default:** Zeta (fine-tuned from Qwen2.5-Coder-7B per AI improvement docs)

## Permissions & Security

- API keys added in the UI are stored in the operating system keychain / secure credential storage.
- Worktrees open in Restricted Mode by default; project settings, language servers, and MCP servers are blocked until trusted.
- Tool approvals are configurable globally and per tool using `allow`, `confirm`, and `deny` policies.
- Built-in terminal security rules block recursive deletion patterns such as `rm -rf /`, `rm -rf ~`, `rm -rf .`, and equivalents.
- Business administrators can centrally restrict hosted AI models, edit predictions, collaboration, and feedback/data-sharing behavior.
- Collaboration docs warn that sharing a project gives collaborators access to the local file system within that project and should only be used with trusted people.
- Zed states it is working toward SOC2 Type 1 certification.

## Privacy & Data Processing

### Data handling by mode

| Mode | What leaves the machine | Retention / processing statement | Source |
|---|---|---|---|
| Zed-hosted models | Prompts and code context sent to Zed's selected AI provider | Zed says prompts and code context are not stored by default; hosted providers are used under no-training and ZDR assurances documented by Zed | https://zed.dev/docs/ai/ai-improvement.html |
| Bring your own API key | Data goes directly to the configured provider | Zed does not control provider policies in this mode | https://zed.dev/docs/ai/ai-improvement.html ; https://zed.dev/subprocessors |
| External agents | Data handled by the external agent/provider | Zed states billing/legal/terms are directly between user and external agent provider; Zed's ZDR guarantees do not apply | https://zed.dev/docs/ai/external-agents.html |
| Edit predictions (default Zeta) | Limited cursor context, recent diffs, related open-file excerpts | Processed transiently for predictions and not retained afterward unless explicit training-data opt-in criteria are met | https://zed.dev/docs/ai/ai-improvement.html |
| Collaboration audio/video/screenshare | Collaboration session media is processed for live collaboration | Privacy policy states Zed processes but does not store audio, video, or screenshare | https://zed.dev/privacy-policy |

### Telemetry and retention controls
- Client-side telemetry covers usage metrics and crash reports and can be disabled in settings.
- Server-side telemetry is collected for hosted services such as AI and collaboration and is required for those features to function.
- Telemetry is sent every 5 minutes or when 50 events accumulate.
- Zed lists Sentry, Snowflake, Hex, and Amplitude in telemetry data flow documentation.
- If a user rates an AI response, Zed stores the full thread, metadata, and installation metadata for improvement workflows.

### Subprocessors officially listed
- Infrastructure/hosting: Cloudflare, AWS, DigitalOcean, Vercel
- Billing: Stripe, Orb
- Analytics/data: Amplitude, Axiom, Fivetran, Hex, Snowflake
- Collaboration: LiveKit
- AI-hosted mode: Anthropic, Baseten, Exa Labs, Google (Vertex), OpenAI, xAI

## Limitations & Risks

- No official web version is available; the README lists Web as a tracking issue rather than a supported platform.
- Windows is supported as a local client, but not as a remote-server host for SSH remoting.
- Linux requires compatible GPU/Vulkan support and documented glibc baselines for official binaries.
- External agents do not fully match first-party thread features; editing past messages, resuming from history, and checkpointing may be unavailable.
- Long-running agent tasks can enter unproductive loops; the models page advises monitoring longer-running tasks and interrupting when needed.
- Very large remote directories (>100,000 files) are explicitly called out as not currently handled well.
- Collaboration and screen sharing expose local project contents or full screen contents to collaborators; both are documented with warnings.
- When using BYOK providers, third-party edit-prediction providers, or external agents, data handling is governed by those providers rather than by Zed's hosted-model guarantees.

## Pricing

| Plan | Price | Included AI / usage | Notable limits / notes | Source |
|---|---:|---|---|---|
| Personal | `$0` forever | No Zed-hosted models; BYOK providers and external agents supported | Limited Edit Predictions | https://zed.dev/pricing ; https://zed.dev/docs/ai/plans-and-usage.html |
| Pro | `$10/month` | All hosted AI models, unlimited Edit Predictions, `$5` monthly token credit | Trial: 14 days with `$20` credit; Anthropic Opus excluded from trial | https://zed.dev/pricing ; https://zed.dev/docs/ai/plans-and-usage.html |
| Student | `$0` for 1 year (verified university students) | Pro features, unlimited Edit Predictions, `$10/month` token credits | Docs state hosted models except Claude Opus | https://zed.dev/education ; https://zed.dev/docs/ai/plans-and-usage.html |
| Business | `$30/seat/month` | Hosted models and unlimited Edit Predictions for members | Adds org-wide admin controls, roles, consolidated billing; no minimum seat count; AI usage billed at standard rates or via BYOK | https://zed.dev/pricing ; https://zed.dev/docs/business/overview.html |

## Alternatives

Official Zed documentation includes migration guides from these editors, making them the most directly acknowledged alternatives in Zed's own material:

| Alternative | When to choose it | Zed source |
|---|---|---|
| VS Code | When your team is standardized on existing VS Code workflows and settings | https://zed.dev/docs/migrate/vs-code.html |
| IntelliJ IDEA | When your workflow is centered on IntelliJ IDEA conventions | https://zed.dev/docs/migrate/intellij.html |
| PyCharm | When your workflow is centered on PyCharm conventions | https://zed.dev/docs/migrate/pycharm.html |
| WebStorm | When your workflow is centered on WebStorm conventions | https://zed.dev/docs/migrate/webstorm.html |
| RustRover | When your workflow is centered on RustRover conventions | https://zed.dev/docs/migrate/rustrover.html |

## Usage Examples

### Open a project or file from the CLI
```bash
zed .
zed src/main.rs:42:10
zed --wait COMMIT_EDITMSG
```

### Open a remote project over SSH
```bash
zed ssh://user@example.com:~/project
```

### Configure terminal tool approvals
```json
{
  "agent": {
    "tool_permissions": {
      "default": "confirm",
      "tools": {
        "terminal": {
          "default": "confirm",
          "always_allow": [
            { "pattern": "^cargo\\s+(build|test|check)" },
            { "pattern": "^npm\\s+(install|test|run)" }
          ]
        }
      }
    }
  }
}
```

### Configure a local Ollama model for the agent
```json
{
  "language_models": {
    "ollama": {
      "api_url": "http://localhost:11434"
    }
  }
}
```

### Configure a custom MCP server
```json
{
  "context_servers": {
    "local-mcp-server": {
      "command": "some-command",
      "args": ["arg-1", "arg-2"],
      "env": {}
    }
  }
}
```

### Configure edit predictions to use Zeta
```json
{
  "edit_predictions": {
    "provider": "zed"
  }
}
```

## Sources

- https://zed.dev
- https://zed.dev/docs
- https://zed.dev/docs/ai/overview.html
- https://zed.dev/docs/ai/agent-panel.html
- https://zed.dev/docs/ai/parallel-agents.html
- https://zed.dev/docs/ai/tools.html
- https://zed.dev/docs/ai/tool-permissions.html
- https://zed.dev/docs/ai/external-agents.html
- https://zed.dev/docs/ai/mcp.html
- https://zed.dev/docs/ai/models
- https://zed.dev/docs/ai/llm-providers.html
- https://zed.dev/docs/ai/edit-prediction.html
- https://zed.dev/docs/ai/plans-and-usage.html
- https://zed.dev/docs/ai/privacy-and-security.html
- https://zed.dev/docs/ai/ai-improvement.html
- https://zed.dev/docs/collaboration/overview.html
- https://zed.dev/docs/collaboration/channels.html
- https://zed.dev/docs/remote-development.html
- https://zed.dev/docs/reference/cli.html
- https://zed.dev/docs/macos.html
- https://zed.dev/docs/linux.html
- https://zed.dev/docs/windows.html
- https://zed.dev/docs/extensions
- https://zed.dev/docs/languages
- https://zed.dev/docs/worktree-trust.html
- https://zed.dev/docs/telemetry.html
- https://zed.dev/docs/business/overview.html
- https://zed.dev/docs/business/admin-controls.html
- https://zed.dev/docs/soc2.html
- https://zed.dev/pricing
- https://zed.dev/education
- https://zed.dev/releases/stable
- https://zed.dev/releases/preview
- https://zed.dev/stable-releases.rss
- https://github.com/zed-industries/zed
- https://github.com/zed-industries/zed/releases
- https://raw.githubusercontent.com/zed-industries/zed/main/README.md
- https://raw.githubusercontent.com/zed-industries/zed/main/LICENSE-APACHE
- https://raw.githubusercontent.com/zed-industries/zed/main/LICENSE-GPL
- https://zed.dev/privacy-policy
- https://zed.dev/subprocessors
- https://zed.dev/docs/migrate/vs-code.html
- https://zed.dev/docs/migrate/intellij.html
- https://zed.dev/docs/migrate/pycharm.html
- https://zed.dev/docs/migrate/webstorm.html
- https://zed.dev/docs/migrate/rustrover.html
