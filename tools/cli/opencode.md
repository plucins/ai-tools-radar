# OpenCode

```yaml
name: OpenCode
description: >
  Open-source AI coding agent available as a terminal UI, desktop app, and IDE extension with
  support for 75+ LLM providers. Fully MIT-licensed with granular permission controls and no
  vendor lock-in.
category: cli
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

| Field | Value |
|-------|-------|
| Name | OpenCode |
| Alternative names | — |
| Vendor / Organization | Anomaly (anoma.ly) |
| Homepage | https://opencode.ai |
| Documentation | https://opencode.ai/docs |
| Changelog | https://opencode.ai/changelog |
| Repository | https://github.com/anomalyco/opencode |
| npm package | opencode-ai |
| Current status | GA (Desktop app in Beta) |
| Current version | v1.15.10 |
| Last updated | 2026-05-22 |
| License | MIT |

---

## Classification

- **Primary category**: Coding Agent
- **Secondary categories**: CLI Tool, IDE Extension, Desktop App
- **Tool type**: Open-source with optional paid model gateway (Zen/Go)
- **Problem domain**: AI-assisted software development
- **User interaction type**: TUI (Terminal User Interface), CLI, Desktop app, IDE extension
- **Automation type**: Semi-autonomous (agentic with permission controls)

---

## Summary

- **One-sentence description**: Open-source AI coding agent available as a terminal interface, desktop app, and IDE extension, supporting 75+ LLM providers.
- **Core value proposition**: Provider-agnostic AI coding agent with granular permission controls, multi-agent architecture, and no vendor lock-in.
- **Primary problem solved**: Bringing AI-assisted code generation, editing, and exploration directly into the developer's terminal workflow with full control over which models and providers are used.
- **Key differentiator**: Supports 75+ LLM providers through AI SDK and Models.dev; includes curated model gateway (Zen) with benchmarked provider configurations; fully open-source with MIT license.
- **Target users**: Software developers who prefer terminal-based workflows, teams needing provider flexibility, enterprises requiring data privacy guarantees.
- **Primary usage context**: Local development environment — project code exploration, feature implementation, debugging, code review.

---

## Use Cases

### Primary use cases
- Code generation and feature implementation
- Codebase exploration and analysis (Plan mode)
- Code refactoring and modifications
- Debugging and issue resolution
- Documentation generation

### Secondary use cases
- CI/CD scripting and automation (non-interactive mode)
- Code review (custom read-only agents)
- Dependency research (Scout subagent)
- Multi-step complex tasks via subagents

### Anti-patterns
- Not designed for production deployment pipelines without human oversight
- Not a replacement for IDE features like autocomplete or inline suggestions

---

## Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| Multi-provider support | 75+ LLM providers via AI SDK and Models.dev | Stable |
| Built-in agents | Build (full access) and Plan (read-only) primary agents | Stable |
| Subagents | General, Explore, and Scout for specialized tasks | Stable |
| Custom agents | Define agents via JSON config or Markdown files | Stable |
| Permission system | Granular allow/ask/deny per tool, per agent, with glob patterns | Stable |
| MCP support | Model Context Protocol for external tool integration (stdio and SSE) | Stable |
| LSP integration | Language Server Protocol for code intelligence | Stable (LSP tool experimental) |
| Session management | Multi-session support, session sharing via links | Stable |
| Custom commands | User and project-level predefined prompts with named arguments | Stable |
| Non-interactive mode | CLI `-p` flag for scripting and automation | Stable |
| Undo/Redo | Revert or reapply agent changes | Stable |
| Auto-compact | Automatic context summarization at 95% token usage | Stable |
| File change tracking | Track and visualize file changes during sessions | Stable |
| Code formatters | Configurable formatters for code output | Stable |
| Themes | Customizable TUI themes | Stable |
| Keybind customization | Configurable keyboard shortcuts | Stable |
| Plugins | Extensibility via plugin system | Stable |
| SDK | Programmatic access to OpenCode | Stable |
| Server mode | Run OpenCode as a server | Stable |
| ACP support | Agent Communication Protocol | Stable |
| Agent Skills | Loadable SKILL.md files for specialized workflows | Stable |
| Custom tools | User-defined tools callable by the LLM | Stable |
| Web search | Exa AI-powered web search (no API key required) | Stable |
| Image input | Drag-and-drop image support in prompts | Stable |

### Desktop App (Beta)

| Platform | Format |
|----------|--------|
| macOS (Apple Silicon) | .dmg (arm64) |
| macOS (Intel) | .dmg (x64) |
| Windows | .exe (x64) |
| Linux | .deb, .rpm, .AppImage |

### IDE Extension
- VS Code extension available (`sdks/vscode` in repo)

---

## Interfaces

| Interface | Platform | Description |
|-----------|----------|-------------|
| TUI | macOS, Linux, Windows (WSL recommended) | Primary terminal-based interface built with Ink (React for CLI) |
| CLI | macOS, Linux, Windows | Non-interactive mode via `-p` flag |
| Desktop App | macOS, Windows, Linux | Electron-based desktop application (Beta) |
| IDE Extension | VS Code | Extension for VS Code |
| Web | — | Web interface available |
| SDK | Node.js | Programmatic API |
| Server | — | Server mode for remote/headless use |

### Supported Operating Systems
- macOS (Apple Silicon, Intel)
- Linux (Arch, Ubuntu/Debian via .deb, Fedora/RHEL via .rpm, AppImage)
- Windows (native + WSL recommended for full compatibility)

### CLI Commands

| Command | Description |
|---------|-------------|
| `opencode` | Launch TUI |
| `opencode -p "prompt"` | Non-interactive single prompt |
| `opencode -p "prompt" -f json` | JSON output format |
| `opencode -p "prompt" -q` | Quiet mode (no spinner) |
| `opencode -d` | Debug mode |
| `opencode -c /path` | Set working directory |
| `opencode agent create` | Create a new agent interactively |
| `opencode auth list` | List configured credentials |
| `opencode models` | List available models |

### TUI Slash Commands

| Command | Description |
|---------|-------------|
| `/connect` | Add provider credentials |
| `/models` | Select model |
| `/init` | Initialize project (creates AGENTS.md) |
| `/share` | Share conversation link |
| `/undo` | Undo last changes |
| `/redo` | Redo undone changes |
| `/compact` | Manually compact session |

---

## Operating Modes

| Mode | Description | Autonomy Level |
|------|-------------|----------------|
| Build (primary) | Full development agent with all tools enabled | Semi-autonomous |
| Plan (primary) | Read-only agent for analysis; file edits and bash denied by default | Assistive |
| Non-interactive | Single prompt, auto-approve all permissions, exit after response | Autonomous |
| Subagent (General) | Full-access subagent for complex multi-step tasks | Semi-autonomous |
| Subagent (Explore) | Read-only codebase exploration | Assistive |
| Subagent (Scout) | Read-only external docs and dependency research | Assistive |

---

## Architecture & Mechanisms

- **Language**: TypeScript (65.8%), MDX (30.8%), CSS (2.9%)
- **Runtime**: Node.js / Bun
- **Build system**: Turborepo monorepo
- **AI SDK**: Vercel AI SDK for model abstraction
- **Model registry**: Models.dev for provider/model metadata
- **TUI framework**: Ink (React for CLI)
- **Desktop**: Electron
- **Search internals**: ripgrep (respects .gitignore)
- **Package manager**: Bun (primary), npm/pnpm/yarn supported
- **Infrastructure**: SST (Serverless Stack) for cloud services
- **Nix support**: Flake-based reproducible builds

### Context Construction
- LSP diagnostics integration for code intelligence
- File reading with line ranges
- Glob/grep for codebase search
- Auto-compact when approaching token limit (creates summary in new session)

### Multi-step Planning
- Primary agents delegate to subagents for complex tasks
- `@general` for parallel units of work
- `@explore` for fast read-only search
- `@scout` for external dependency research
- Max steps configurable per agent

### Safety Mechanisms
- Permission system (allow/ask/deny) per tool, per command pattern
- `.env` files denied by read permission by default
- Doom loop detection (same tool call repeated 3 times)
- External directory access requires explicit permission
- Agent-level permission overrides

---

## Tool Capabilities

### Extension Points
- Custom tools (defined in config, execute arbitrary code)
- MCP servers (stdio and SSE transports)
- Plugins (npm packages)

---

## Agent Tool Primitives

Source: https://opencode.ai/docs/tools/ (last updated: 2026-05-23)

| Tool name | Description | Permission key | Status / Notes |
|-----------|-------------|---------------|----------------|
| `bash` | Execute shell commands | `bash` | Stable |
| `edit` | Modify existing files using exact string replacements | `edit` | Stable |
| `write` | Create new files or overwrite existing | `edit` | Controlled by `edit` permission |
| `apply_patch` | Apply patch diffs to files | `edit` | Controlled by `edit` permission; paths embedded in patch marker lines |
| `read` | Read file contents; supports line ranges | `read` | Stable; `.env` files denied by default |
| `grep` | Search file contents using regular expressions | `grep` | Stable; uses ripgrep; respects `.gitignore` |
| `glob` | Find files by pattern matching | `glob` | Stable; uses ripgrep; results sorted by modification time |
| `webfetch` | Fetch web page content | `webfetch` | Stable |
| `websearch` | Search the web via Exa AI | `websearch` | Only available with OpenCode provider or `OPENCODE_ENABLE_EXA=1`; no API key required |
| `lsp` | Code intelligence: definitions, references, hover, call hierarchy, implementations | `lsp` | **Experimental**; requires `OPENCODE_EXPERIMENTAL_LSP_TOOL=true` or `OPENCODE_EXPERIMENTAL=true` |
| `skill` | Load a SKILL.md file and return its content in the conversation | `skill` | Stable |
| `todowrite` | Create and update task lists to track progress during complex operations | `todowrite` | Stable; disabled for subagents by default |
| `question` | Ask user questions during execution; supports multi-question navigation | `question` | Stable |

---

## Integrations

### Native Integrations

| Integration | Type | Description |
|-------------|------|-------------|
| GitHub | Native | GitHub workflow support (issues, PRs) |
| GitLab | Native + Plugin | GitLab Duo Agent Platform, MR reviews, pipelines |
| GitHub Copilot | Provider | Use Copilot subscription for model access |
| ChatGPT Plus/Pro | Provider (OAuth) | Use OpenAI subscription directly |

### Provider Integrations (75+ via AI SDK)

Major supported providers:
- OpenAI, Anthropic, Google (Gemini, Vertex AI), xAI (Grok)
- Amazon Bedrock, Azure OpenAI, Azure Cognitive Services
- GitHub Copilot, GitLab Duo
- OpenRouter, Vercel AI Gateway, Cloudflare AI Gateway, Helicone
- Groq, Cerebras, Fireworks AI, Together AI, Deep Infra, Baseten
- DeepSeek, Moonshot AI (Kimi), MiniMax, Z.AI (GLM)
- NVIDIA (build.nvidia.com + NIM), Hugging Face
- Ollama, Ollama Cloud, LM Studio, llama.cpp, Atomic Chat (local)
- DigitalOcean, SAP AI Core, Scaleway, OVHcloud, STACKIT, Nebius
- IO.NET, Venice AI, Cortecs, FrogBot, LLM Gateway, ZenMux, 302.AI

### MCP Support
- Stdio transport
- SSE (Server-Sent Events) transport
- Automatic tool discovery from MCP servers
- Permission system applies to MCP tools

### LSP Support
- Multi-language via configurable LSP servers
- Diagnostics exposed to AI
- Experimental: goToDefinition, findReferences, hover, documentSymbol, workspaceSymbol, goToImplementation, call hierarchy

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models used | Any model from 75+ providers |
| User model selection | Yes (per-agent configurable) |
| Proprietary models | Supported via providers |
| Local models | Yes (Ollama, LM Studio, llama.cpp, any OpenAI-compatible endpoint) |
| Multimodal | Yes (image input support) |
| Training on user data | No (OpenCode does not store code/context data) |

### OpenCode Zen Models (curated gateway)

Selected models available through Zen:
- GPT 5.5, 5.5 Pro, 5.4, 5.4 Pro/Mini/Nano, 5.3 Codex, 5.2, 5.1, 5
- Claude Opus 4.7/4.6/4.5/4.1, Sonnet 4.6/4.5/4, Haiku 4.5/3.5
- Gemini 3.5 Flash, 3.1 Pro, 3 Flash
- Qwen 3.6 Plus, 3.5 Plus
- MiniMax M2.7, M2.5
- GLM 5.1, 5
- Kimi K2.5, K2.6
- Grok Build 0.1
- DeepSeek V4 Flash Free, Nemotron 3 Super Free, Big Pickle (free tier)

### OpenCode Go Models (subscription)
- GLM 5, GLM 5.1
- Kimi K2.5, K2.6
- MiMo-V2.5, MiMo-V2.5-Pro
- MiniMax M2.5, M2.7
- Qwen3.5 Plus, Qwen3.6 Plus
- DeepSeek V4 Pro, DeepSeek V4 Flash

---

## Permissions & Security

### Permission Model
- Three actions: `allow`, `ask` (prompt for approval), `deny`
- Granular per-tool, per-command pattern with glob wildcards
- Per-agent permission overrides
- Defaults: most tools `allow`; `.env` files `deny`; `doom_loop` and `external_directory` → `ask`

### "Ask" Approval Options
- `once` — approve this request only
- `always` — approve matching pattern for session
- `reject` — deny the request

### Data Handling
- OpenCode does not store code or context data
- All processing happens locally or via direct API calls to user-chosen provider
- Optional `/share` feature sends conversation to CDN (can be disabled)
- No telemetry collection mentioned in official sources

### Enterprise Security
- SSO integration (via central config)
- Internal AI gateway enforcement
- Provider restriction (disable external providers)
- Self-hosting share pages (roadmap)
- Code ownership: user owns all code produced

---

## Privacy & Data Processing

| Aspect | Detail |
|--------|--------|
| Code storage | None — OpenCode does not store code or context |
| Data processing | Local + direct provider API calls |
| Prompt logging | None by OpenCode; provider policies apply |
| Share feature | Optional; can be disabled (`"share": "disabled"`) |
| Training opt-out | Not applicable (no training on user data) |

### Zen Privacy
- Models hosted in US
- Zero-retention policy from providers (exceptions: free models during trial periods, OpenAI 30-day retention, Anthropic 30-day retention)
- Free models (Big Pickle, DeepSeek V4 Flash Free, Nemotron 3 Super Free) may use collected data for improvement during free period

### Go Privacy
- Models hosted in US, EU, and Singapore
- Zero-retention policy; no training on user data

---

## Pricing & Plans

### OpenCode (Core)

| Aspect | Detail |
|--------|--------|
| Price | Free (MIT open-source) |
| Requirements | API keys from chosen LLM provider(s) |
| Limitations | None — full feature access |

### OpenCode Zen (Pay-as-you-go model gateway)

| Aspect | Detail |
|--------|--------|
| Entry cost | $20 initial balance (+$1.23 card processing fee) |
| Billing model | Pay per request (per 1M tokens pricing) |
| Auto-reload | $20 when balance < $5 (configurable, can disable) |
| Monthly limits | Configurable per workspace and per member |
| Free models | Big Pickle, DeepSeek V4 Flash Free, Nemotron 3 Super Free |
| Teams | Free during beta; roles (Admin, Member), model access control |
| Markup | None — sells at cost; card fees passed along (4.4% + $0.30/txn) |

#### Zen Pricing Examples (per 1M tokens)

| Model | Input | Output | Cached | Cache Write |
|-------|-------|--------|--------|-------------|
| Claude Opus 4.7 | $5.00 | $25.00 | $0.50 | $6.25 |
| Claude Sonnet 4.6 | $3.00 | $15.00 | $0.30 | $3.75 |
| Claude Haiku 4.5 | $1.00 | $5.00 | $0.10 | $1.25 |
| GPT 5.5 (≤272K) | $5.00 | $30.00 | $0.50 | — |
| GPT 5.4 (≤272K) | $2.50 | $15.00 | $0.25 | — |
| Gemini 3.5 Flash | $1.50 | $9.00 | $0.15 | — |
| Gemini 3 Flash | $0.50 | $3.00 | $0.05 | — |
| Qwen3.5 Plus | $0.20 | $1.20 | $0.02 | $0.25 |
| MiniMax M2.7 | $0.30 | $1.20 | $0.06 | $0.375 |
| GLM 5.1 | $1.40 | $4.40 | $0.26 | — |

### OpenCode Go (Subscription for open models)

| Aspect | Detail |
|--------|--------|
| Price | $5 first month, then $10/month |
| Usage limits | 5h: $12; Weekly: $30; Monthly: $60 |
| Models | 12 open models (GLM, Kimi, MiMo, MiniMax, Qwen, DeepSeek) |
| Target | International users needing low-cost reliable access |
| Overage | Falls back to Zen balance if enabled |

### Enterprise

| Aspect | Detail |
|--------|--------|
| Pricing model | Per-seat; no token charges if using own LLM gateway |
| Contact | contact@anoma.ly |
| Features | Central config, SSO, internal gateway enforcement, provider restriction |

---

## Limitations & Risks

| Limitation | Description |
|------------|-------------|
| Windows support | WSL recommended for full compatibility; native Windows support limited |
| Desktop app | Beta status — may have stability issues |
| LSP tool | Experimental; requires `OPENCODE_EXPERIMENTAL_LSP_TOOL=true` |
| Provider variability | Model quality varies by provider configuration (Zen aims to solve this) |
| Context limits | Subject to underlying model context windows; auto-compact mitigates |
| Anthropic integration | Claude Pro/Max subscription plugins no longer bundled (as of v1.3.0); Anthropic prohibits this |

---

## Community & Ecosystem

| Metric | Value |
|--------|-------|
| GitHub Stars | 164,000 |
| Forks | 19,500 |
| Contributors | 912 |
| Monthly developers | 7,500,000 (claimed) |
| Total releases | 811 |
| Open issues | 5,000+ |
| Open PRs | 943 |
| Discord | https://opencode.ai/discord |
| X/Twitter | https://x.com/opencode |

---

## Installation

```bash
# Install script (recommended)
curl -fsSL https://opencode.ai/install | bash

# npm
npm i -g opencode-ai@latest

# Homebrew (macOS/Linux)
brew install anomalyco/tap/opencode

# Arch Linux
sudo pacman -S opencode

# Scoop (Windows)
scoop install opencode

# Chocolatey (Windows)
choco install opencode

# Nix
nix run nixpkgs#opencode

# Docker
docker run -it --rm ghcr.io/anomalyco/opencode
```

---

## Configuration

Configuration file locations:
- Project-level: `./opencode.json`
- Global: `~/.config/opencode/opencode.json`

Credentials stored in: `~/.local/share/opencode/auth.json`

Schema: `https://opencode.ai/config.json`

### Example Configuration

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.anthropic.com/v1"
      }
    }
  },
  "agent": {
    "build": {
      "model": "anthropic/claude-sonnet-4-20250514",
      "permission": {
        "edit": "allow",
        "bash": "allow"
      }
    },
    "plan": {
      "model": "anthropic/claude-haiku-4-20250514",
      "permission": {
        "edit": "deny",
        "bash": "deny"
      }
    }
  },
  "permission": {
    "bash": {
      "*": "ask",
      "git *": "allow",
      "git push *": "deny"
    }
  },
  "share": "disabled"
}
```

---

## Historical Note

The current OpenCode project (anomalyco/opencode) is a TypeScript-based rewrite distinct from the earlier Go-based project at `opencode-ai/opencode` (12.7K stars, archived September 2025, continued as "Crush" by Charmbracelet). The current project shares some original contributors but is a fundamentally different codebase maintained by the Anomaly team.

---

## Sources

- Official homepage: https://opencode.ai
- Documentation: https://opencode.ai/docs
- GitHub repository: https://github.com/anomalyco/opencode
- Providers documentation: https://opencode.ai/docs/providers
- Tools documentation: https://opencode.ai/docs/tools
- Agents documentation: https://opencode.ai/docs/agents
- Permissions documentation: https://opencode.ai/docs/permissions
- Enterprise documentation: https://opencode.ai/docs/enterprise
- Zen documentation: https://opencode.ai/docs/zen
- Go documentation: https://opencode.ai/docs/go
- Zen product page: https://opencode.ai/zen
- Privacy policy: https://opencode.ai/legal/privacy-policy
- Terms of service: https://opencode.ai/legal/terms-of-service
- npm package: https://www.npmjs.com/package/opencode-ai
- Archived predecessor: https://github.com/opencode-ai/opencode

---

## Changelog

### [2026-05-23] Initial profile creation
- Full profile created from official documentation, GitHub repository, and product pages
- All information sourced from opencode.ai and github.com/anomalyco/opencode
- Current version: v1.15.10
