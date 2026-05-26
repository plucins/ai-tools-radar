# JetBrains Junie
```yaml
name: "JetBrains Junie"
description: >
  Junie is an LLM-agnostic autonomous coding agent by JetBrains, available as an IDE plugin integrated into JetBrains IDEs and as a standalone CLI tool. It supports Bring Your Own Key (BYOK) from major providers and locally running models via Ollama, and can plan and execute multi-step development tasks including file edits, terminal command execution, and test runs.
category: ide
logo: https://img.logo.dev/jetbrains.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Multi-model
```

## Tool Identification

**Last update:** 24-05-2026 21:19

| Field | Description |
|-------|-------------|
| Name | JetBrains Junie |
| Alternative names | Junie; Junie CLI |
| Vendor / Organization | JetBrains s.r.o. |
| Product owner | [NO OFFICIAL DATA] |
| Homepage | https://www.jetbrains.com/junie/ |
| Dedicated product site | https://junie.jetbrains.com/ |
| Documentation | https://junie.jetbrains.com/docs/ |
| Changelog | [NO OFFICIAL DATA] — version history available via GitHub install scripts |
| Repository | https://github.com/JetBrains/junie (install scripts, version registry, release manifests) |
| First release date | [NO OFFICIAL DATA] — CLI Beta announced March 2026; IDE Plugin reached GA status [UNVERIFIED GA date] |
| Current status | IDE Plugin: Generally Available (GA); CLI: Beta (as of March 2026) |
| Current version | CLI: `1668.54` (Homebrew formula, `JetBrains/homebrew-junie`); IDE Plugin: [UNVERIFIED — marketplace page parsing unavailable] |
| Plugin ID | `26104` (JetBrains Marketplace: https://plugins.jetbrains.com/plugin/26104-jetbrains-junie) |
| Last documentation update | 20 May 2026 (footer on junie.jetbrains.com/docs pages) |

---

## Classification

- **Primary category:** IDE
- **Secondary categories:** CLI tool; CI/CD agent; agentic coding assistant
- **Tool type:** Proprietary coding agent; cloud-backed AI service with BYOK and local model support
- **Problem domain:** Autonomous multi-step code generation, file editing, terminal command execution, test execution, and CI/CD-integrated development task automation
- **User interaction type:** IDE tool window (AI Chat), interactive CLI, headless/CI mode, GitHub Action, GitLab CI/CD pipeline
- **Automation type:** Semi-autonomous (user approval required by default for sensitive actions); fully autonomous available via Brave mode or Action Allowlist

---

## Summary

- **One-sentence description:** Junie is JetBrains' LLM-agnostic autonomous coding agent that delegates multi-step development tasks within JetBrains IDEs and from the terminal.
- **Extended description:** Junie can plan and execute complex tasks including creating and editing files, running terminal commands and tests, and reporting progress — all within a JetBrains IDE or via a standalone CLI. It supports any major LLM provider through BYOK (Anthropic, OpenAI, Google, xAI, OpenRouter, GitHub Copilot) and locally running models via Ollama, or JetBrains-managed AI service subscriptions.
- **Core value proposition:** LLM-agnostic autonomous coding agent that integrates deeply with JetBrains IDEs, works in terminal/CI environments, and requires no vendor lock-in.
- **Primary problem solved:** Reducing manual effort for complex, multi-step development tasks that span multiple files, require running commands or tests, or need to respond to CI/CD events.
- **Key differentiator:** Model-agnostic architecture (BYOK or JetBrains AI subscription), CI/CD-native headless mode, GitHub and GitLab integration, and deep JetBrains IDE integration.
- **Target users:** Developers using JetBrains IDEs or terminal-based workflows who want to delegate complex tasks to an agent; teams using GitHub or GitLab CI/CD pipelines.
- **Anti-target users:** Teams requiring a fully offline-only agent without cloud API calls; users who need browser automation or web search primitives (not officially documented).
- **Primary usage context:** Day-to-day software development inside JetBrains IDEs; CI/CD pipeline automation; terminal-based agentic workflows.

---

## Use Cases

### Primary use cases
- Delegate complex, multi-file implementation tasks to an autonomous agent within a JetBrains IDE.
- Run Junie from the terminal (CLI) to execute coding tasks without an open IDE.
- Use Junie in **Ask mode** to explore a codebase, analyze code, or brainstorm solutions without modifying files.
- Automate responses to GitHub issues, pull requests, and CI failures via the GitHub Action integration.
- Use GitLab CI/CD integration for automated coding tasks in pipeline stages.
- Run headless/non-interactive tasks in CI/CD pipelines.

### Secondary use cases
- Use **Advanced Plan mode** (CLI) to let Junie write a structured plan before making code changes, with user approval before implementation.
- Control which files Junie can access using `.aiignore`.
- Store persistent agent instructions in `.junie/AGENTS.md` for consistent behavior across tasks.
- Extend Junie's capabilities with MCP-compatible servers.

### Example workflows
1. Open AI Chat in a JetBrains IDE, switch to Junie, select **Code** mode, describe a feature, review the proposed plan, then approve execution.
2. Run `junie` in the terminal, enter a task description, approve the generated plan, and let Junie implement, test, and verify the changes.
3. Install the GitHub Action with `/install-github-action` inside the agent; Junie then responds automatically to new issues and failed CI runs.
4. Configure `headless` mode in CI/CD YAML to trigger Junie on pipeline events without interactive approval.

### Fully automated tasks
- GitHub issue and PR responses via GitHub Action (non-interactive).
- Headless CI/CD pipeline tasks with no interactive approval.

### Partially automated tasks
- Multi-step code implementation with user approval per terminal command, file operation, or MCP tool call (default).
- Advanced Plan mode: plan proposed by Junie, user approves before code changes begin.

### Anti-patterns
- Enabling **Brave mode** in untrusted or production environments (auto-approves all actions).
- Expecting web search or browser automation as agent primitives — these are not officially documented.
- Assuming the same feature set across BYOK providers: unsupported provider models may not support all Junie capabilities.

---

## Features

### Core features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Autonomous task execution (Code mode) | Creates/edits files, runs terminal commands, executes tests, and verifies changes in a loop | Supported IDE or CLI with model access | Sensitive actions require user approval by default | JetBrains AI subscription or BYOK | Stable (IDE Plugin GA) | [junie-ide-plugin docs] |
| Read-only exploration (Ask mode) | Explores files, analyzes code, answers questions, proposes solutions without modifying files | Supported IDE or CLI with model access | Cannot modify code or project files | JetBrains AI subscription or BYOK | Stable | [junie-ide-plugin docs] |
| Auto mode | Junie selects Code or Ask mode automatically based on task nature | Supported IDE or CLI with model access | Behavior depends on model interpretation of task | JetBrains AI subscription or BYOK | Stable | [junie-ide-plugin docs] |
| Advanced Plan mode (CLI) | Writes a structured plan before making any code changes; user approves plan before implementation begins | Junie CLI | CLI-only feature | JetBrains AI subscription or BYOK | Beta | [junie-cli docs] |
| Live Prompting | User can provide real-time guidance or corrections while Junie is executing a task | Supported IDE or CLI | Task execution must be in progress | JetBrains AI subscription or BYOK | Stable (IDE Plugin) | [junie-ide-plugin docs] |
| BYOK (Bring Your Own Key) | Uses API keys from Anthropic, OpenAI, Google, xAI, OpenRouter, or GitHub Copilot directly | Valid API key or OAuth token | Feature availability depends on provider model capabilities | Free (BYOK tier) | Stable | [byok docs] |
| Local model support via Ollama | Uses locally running models through Ollama | Ollama installed and model configured | Feature availability depends on local model capabilities | Free (BYOK tier, local) | Stable | [junie.jetbrains.com pricing section] |

### Advanced features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| GitHub Action integration | Responds to GitHub issues, PRs, and CI failures automatically | GitHub Action setup via `/install-github-action` command | Requires GitHub repository with Actions enabled | JetBrains AI subscription or BYOK | Stable | [junie-on-github docs] |
| GitLab CI/CD integration | Integrates Junie into GitLab CI/CD pipeline stages | GitLab CI/CD configuration | Requires GitLab CI/CD setup | JetBrains AI subscription or BYOK | [UNVERIFIED status] | [junie-gitlab-ci-cd docs] |
| Headless/non-interactive mode | Runs Junie in CI/CD pipelines without interactive prompts | Junie CLI with `headless` parameter | No interactive approval flow; requires careful configuration | JetBrains AI subscription or BYOK | Beta | [junie-headless docs] |
| MCP server integration | Extends Junie's capabilities with any MCP-compatible server | MCP server configuration in Junie config | MCP security tokens not supported; workaround required via Docker `.env` file | JetBrains AI subscription or BYOK | Stable | [junie-ide-plugin docs] |
| Brave mode | Auto-approves all sensitive actions (terminal commands, file operations, MCP tool calls) without prompting | Supported IDE or CLI | Higher operational risk; not recommended for general use | All tiers | Stable | [junie-ide-plugin docs] |
| Action Allowlist | Defines exact commands or regex patterns that are auto-approved without future prompts | Action Allowlist configuration | Requires explicit configuration by user | All tiers | Stable | [action-allowlist docs] |
| `.aiignore` file | Restricts Junie from reading or modifying specific files or folders | `.aiignore` file in project root (follows `.gitignore` syntax) | Does not prevent access unless file is configured | All tiers | Stable | [junie-ide-plugin docs] |
| Agent guidelines | Persistent instructions stored in `.junie/AGENTS.md` (or project-root `AGENTS.md`) applied to every Junie task in the project | `AGENTS.md` file in project | Instructions must be manually maintained | All tiers | Stable | [junie-ide-plugin docs] |
| Rollback | Reverts individual files, all changed files, or restores to a prior checkpoint in the conversation | Supported IDE | IDE-only feature explicitly documented; CLI rollback behavior [UNVERIFIED] | All tiers | Stable | [junie-ide-plugin docs] |
| Semantic indexing | Codebase indexing based on embeddings for semantic meaning and context to improve task-relevant file discovery | Supported IDE with semantic indexing enabled | Optional; requires IDE-side configuration | JetBrains AI subscription | Stable | [jetbrains-ai-assistant docs, architecture section] |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| JetBrains IDE plugin (AI Chat) | All supported JetBrains IDEs | Primary IDE surface; Junie is accessed via the AI Chat tool window |
| Junie CLI | macOS, Linux, Windows (PowerShell) | Standalone terminal interface; Beta as of March 2026 |
| GitHub Action | GitHub | Installed via `/install-github-action` command; responds to issues, PRs, CI failures |
| GitLab CI/CD | GitLab | Documented integration at junie.jetbrains.com/docs/junie-gitlab-ci-cd.html |
| Headless (CI/CD) mode | Any CI/CD environment | Non-interactive CLI usage for pipeline automation |
| No web UI | — | No browser-based interface documented |

### Supported JetBrains IDEs (from JetBrains AI data collection policy, version `2025.3.1`)

| IDE | Notes |
|-----|-------|
| IntelliJ IDEA | Community edition: AI data collection unavailable |
| PyCharm | Community edition: AI data collection unavailable |
| CLion | |
| DataGrip | Junie is not available in DataGrip per AI Assistant docs [NEEDS VERIFICATION for standalone Junie] |
| DataSpell | |
| GoLand | |
| PhpStorm | |
| Rider | |
| RubyMine | |
| RustRover | |
| WebStorm | |
| Android Studio | Officially supported; Google-maintained IDE based on IntelliJ IDEA |

### CLI installation methods

```bash
# curl (macOS/Linux)
curl -fsSL https://junie.jetbrains.com/install.sh | bash

# Homebrew (macOS)
brew tap jetbrains/junie && brew install junie

# npm
npm install -g @jetbrains/junie

# PowerShell (Windows)
# Install script available at https://junie.jetbrains.com (PowerShell variant)
```

### CLI release channels
Available channels: `stable`, `eap`, `experimental`, `nightly`
— Source: install scripts in `JetBrains/junie` repository (`install.sh`, `install-eap.sh`, `install-experimental.sh`, `install-nightly.sh`)

### Slash commands (official)
- `/install-github-action` — Sets up the Junie GitHub Action integration from inside the agent

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Interface |
|------|-------------|-------------|----------------|-------------|-----------|
| Code mode | Autonomous: executes terminal commands, creates/edits files, runs tests, verifies changes | Complex implementation tasks | High (approvals requested by default) | Sensitive actions require explicit user approval unless Brave mode or Action Allowlist is active | IDE, CLI |
| Ask mode | Read-only: explores files, analyzes code, answers questions without modifying files | Codebase exploration, analysis, planning | Low | Cannot modify code or project files | IDE, CLI |
| Auto mode | Junie selects Code or Ask automatically based on task description | Mixed tasks where mode is ambiguous | Variable | Behavior depends on model's interpretation | IDE, CLI |
| Advanced Plan mode | Writes a structured plan before touching code; user approves before implementation | Tasks where plan review is important | Medium (plan approval gate) | CLI only | CLI |
| Brave mode | Auto-approves all terminal commands, file operations, and MCP calls without prompting | Trusted, controlled environments | Highest | Not recommended; higher operational risk | IDE, CLI |
| Headless mode | Non-interactive CLI for CI/CD pipelines; no approval prompts | CI/CD automation | Highest | Requires careful env-var configuration; no interactive control | CLI (CI/CD) |

### Pricing tiers and AI Credits
Source: https://junie.jetbrains.com/ (pricing section)

| Tier | Monthly price (annual billing) | AI Credits per 30 days | Top-up | Trial |
|------|-------------------------------|------------------------|--------|-------|
| Free (BYOK) | $0 | 0 (BYOK only) | No | — |
| AI Pro | $8.33/user | 35 | Available | 30-day trial |
| AI Ultimate | $25.00/user | 35 | Available | — |

Additional pricing notes:
- AI Pro annual: ≈€100/year (personal), ≈€200/year (commercial)
- AI Ultimate annual: ≈€300/year (personal), ≈€600/year (commercial)
- **JetBrains IDE Services On-Premises** product exists (`IDESPR-AIU`, ≈€720/year commercial); whether this covers Junie is [UNVERIFIED]
- Anytime credit top-ups available for paid tiers
- CLI license references `https://jb.gg/junie-tos-eap` in Homebrew formula, indicating CLI may still operate under EAP terms despite being called "Beta"

---

## Architecture & Mechanisms

### System flow
1. User submits a task (IDE AI Chat or CLI prompt).
2. Junie reads project context, relevant files, and guidelines from `.junie/AGENTS.md`.
3. Junie formulates a plan and requests user approval (in default mode) or proceeds directly (Brave mode / Action Allowlist).
4. Junie executes actions: file reads/writes, terminal commands, test runs, MCP tool calls.
5. Junie reports results; user can review, adjust via Live Prompting, or roll back changes.

### Model routing
- **JetBrains AI subscription:** Models managed by JetBrains AI platform; all listed top models available.
- **BYOK:** User API key sent directly to the configured provider (OpenAI, Anthropic, Google, xAI, OpenRouter, GitHub Copilot).
- **Ollama:** Requests routed to locally running model; no external API call.
- Model selection is user-controlled via BYOK configuration or JetBrains AI model picker.

### Context and retrieval
- Junie reads project files and directory structure relevant to the task.
- **Semantic indexing** (embeddings-based) available to find relevant files by meaning rather than keyword matching.
- `.aiignore` restricts file access; follows `.gitignore` syntax.
- `.junie/AGENTS.md` (or project-root `AGENTS.md`) provides persistent task-level instructions.

### Approval and rollback mechanisms
- **Default:** All terminal commands, code execution, and MCP tool executions require explicit user approval.
- **Action Allowlist:** Regex-based command whitelisting for auto-approval of specific patterns.
- **Brave mode:** All approvals bypassed.
- **Rollback:** Individual files, all changed files, or restore to a prior conversation checkpoint.

### CI/CD integration architecture
- Headless mode accepts task description and parameters via environment variables or command flags.
- GitHub Action responds to repository events (issues, PRs, CI failures) and invokes Junie non-interactively.
- GitLab CI/CD integration documented separately.

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Required permissions | Control mechanism |
|-----------|-------------|-------|------------|----------------------|-------------------|
| File reading | Reads project files and directory structure as task context | Current project (subject to `.aiignore`) | Medium | IDE/project read access | `.aiignore`, guidelines, `.junie/AGENTS.md` |
| File writing / creation | Creates and modifies files as part of task execution | Current project (subject to `.aiignore`) | Medium–High | IDE/project write access | User approval (default), Brave mode, Action Allowlist, rollback |
| Shell / terminal execution | Runs terminal commands and test suites | Local development environment | High | Terminal access; user approval by default | Approval prompts, Action Allowlist, Brave mode |
| Test execution | Runs test suites to verify implemented changes | Current project test runner | Medium | Test runner access | User approval (default), Brave mode |
| MCP tool execution | Invokes tools from configured MCP-compatible servers | MCP server scope | High | MCP server configuration and external system permissions | User approval by default; MCP security tokens not supported |
| GitHub Action automation | Responds to GitHub issues, PRs, and CI failures non-interactively | GitHub repository | High | GitHub repository with Actions configured | `/install-github-action` setup; GitHub Actions permissions |
| GitLab CI/CD automation | Executes tasks in GitLab pipeline stages | GitLab repository | High | GitLab CI/CD configuration | GitLab CI/CD YAML configuration |
| Semantic code indexing | Indexes codebase using embeddings to improve context retrieval | Current project | Low | Semantic indexing enabled in IDE settings | Optional setting |
| Live Prompting | Accepts user guidance mid-execution to redirect or clarify the task | Active task session | Low | None beyond task session | User-initiated during task |
| Rollback | Reverts file changes to a prior state or conversation checkpoint | Current project files | Low | IDE/project write access | User-initiated; IDE tool window |
| Web search | [UNVERIFIED — no official documentation found] | — | — | — | — |
| Browser control | [UNVERIFIED — no official documentation found] | — | — | — | — |

---

## Agent Tool Primitives

> JetBrains does not publish a named internal Junie tool-reference page listing individual primitive tool names (e.g., `Bash`, `Edit`, `Read`). The table below reflects documented Junie operation classes from official sources.

| Operation class | Description | Requires approval | Notes |
|----------------|-------------|-------------------|-------|
| `file-read` | Reads files and directory structure to build task context | No | Restricted by `.aiignore` |
| `file-write` | Creates and modifies files as part of task execution | Yes (default) | Auto-approved via Brave mode or Action Allowlist |
| `bash-commands` | Executes terminal commands and test runners | Yes (default) | Action Allowlist supports exact command and regex patterns |
| `mcp-tool-calls` | Invokes tools on configured MCP servers | Yes (default) | MCP security tokens not supported; Docker `.env` workaround documented |
| `rollback` | Reverts file changes or restores to a prior checkpoint | No (user-initiated) | IDE feature; CLI rollback behavior [UNVERIFIED] |
| `semantic-index` | Queries embeddings-based codebase index for relevant files | No | Optional; requires enabling in IDE settings |
| `guidelines-read` | Reads `.junie/AGENTS.md` or `AGENTS.md` for persistent task instructions | No | Preferred path: `.junie/AGENTS.md`; legacy paths deprecated |
| `live-prompt` | Accepts real-time user instruction during task execution | No | User-initiated; mid-task redirection |

---

## Integrations

| Integration | Type | Notes |
|-------------|------|-------|
| Git | Version control | `.aiignore` follows `.gitignore` syntax; guidelines stored in `.junie/AGENTS.md` are version-controllable |
| GitHub | CI/CD + issue tracking | Full GitHub Action integration; responds to issues, PRs, CI failures; installed via `/install-github-action` |
| GitLab | CI/CD | GitLab CI/CD pipeline integration documented at junie.jetbrains.com/docs/junie-gitlab-ci-cd.html |
| MCP servers | Tool extension | Any MCP-compatible server over STDIO or Streamable HTTP; GitHub MCP server example in docs |
| Ollama | Local models | Locally running models via Ollama; no external API key required |
| OpenAI | BYOK provider | Direct API key |
| Anthropic | BYOK provider | Direct API key |
| Google | BYOK provider | Direct API key |
| xAI | BYOK provider | Direct API key |
| OpenRouter | BYOK provider | Direct API key |
| GitHub Copilot | BYOK provider | OAuth token |
| YouTrack / Jira | Issue tracking | [UNVERIFIED — no official direct integration documented] |

---

## AI Models

| Provider | Model examples cited (official sources) | Access method |
|----------|----------------------------------------|---------------|
| Anthropic | Claude Opus 4.7, Claude Sonnet 4.6 | BYOK (API key) or JetBrains AI subscription |
| Google | Gemini 3.1 Pro | BYOK (API key) or JetBrains AI subscription |
| OpenAI | GPT-5.5 | BYOK (API key) or JetBrains AI subscription |
| xAI | Grok 4.3 | BYOK (API key) or JetBrains AI subscription |
| OpenRouter | Various (provider-dependent) | BYOK (API key) |
| GitHub Copilot | Provider-managed models | BYOK (OAuth token) |
| Ollama | Any locally supported model | Local (no API key) |
| Custom profiles | Any OpenAI-compatible endpoint | JSON config file |

> Model names cited from the junie.jetbrains.com pricing/homepage section as of research date. JetBrains states it integrates latest models as released.
> Source: https://blog.jetbrains.com/junie/2026/03/junie-cli-the-llm-agnostic-coding-agent-is-now-in-beta/

---

## Permissions & Security

- **Default action approval:** All terminal commands, code execution, and MCP tool executions require explicit user approval before Junie proceeds.
  — Source: https://junie.jetbrains.com/docs/junie-ide-plugin.html
- **Action Allowlist:** Users can whitelist exact commands or regex patterns for auto-approval without future prompting.
  — Source: https://junie.jetbrains.com/docs/action-allowlist.html
- **Brave mode:** Bypasses all approval prompts; not recommended outside controlled environments.
  — Source: https://junie.jetbrains.com/docs/junie-ide-plugin.html
- **`.aiignore`:** Restricts Junie from accessing specified files/folders without explicit instruction. Follows `.gitignore` syntax.
- **MCP security tokens:** Not supported in MCP server configs; workaround: load tokens from a Docker `.env` file.
  — Source: https://junie.jetbrains.com/docs/junie-ide-plugin.html
- **SOC 2 certification:** JetBrains holds SOC 2 certification (AICPA SOC badge displayed on junie.jetbrains.com).
- **Rollback controls:** Users can revert individual files, all changed files, or restore to a prior conversation checkpoint.

---

## Privacy & Data Processing

**Terms of Service:** JetBrains AI Service Terms, Version 2.1, effective September 30, 2025
— URL: https://www.jetbrains.com/legal/docs/terms/jetbrains-ai-service/

**Code sent to third parties:**
> "IF YOU USE JETBRAINS AI, WE WILL SEND YOUR INSTRUCTIONS AND SOME OTHER INFORMATION TO THIRD PARTIES PROVIDING LARGE LANGUAGE MODELS IN ORDER TO OBTAIN AN OUTPUT OR A SUGGESTION FOR YOU."
— Source: JetBrains AI Service Terms v2.1

**Training data commitment:**
> "We undertake that We will not use Your Inputs, Data, Outputs, and Suggestions to train any language models that generate code, text, or another type of data from which Your Inputs, Data, Outputs, or Suggestions could be extracted, unless You expressly agree to it."
— Source: JetBrains AI Service Terms v2.1, Section 5c

**Data collection policy** (v1.4, December 24, 2025):
— URL: https://www.jetbrains.com/help/ai/data-collection-and-use-policy.html

| Data type | Collection default | Opt-out |
|-----------|-------------------|---------|
| Detailed code-related data (full LLM inputs/outputs, source code) | Opt-in only (commercial users); may be collected by default for free/non-commercial users | Yes (user setting or admin control) |
| Behavioral data (anonymized, no source code) | Collected; used for product improvement and non-generative ML models | Follows standard JetBrains data policy |

- **Organizational licenses:** Detailed code-related data is **disallowed by default** and requires company admin to enable.
- **Community edition IDEs** (IntelliJ IDEA Community, PyCharm Community): AI data collection cannot be enabled.
- **Remote development mode:** IDE does not offer the data collection opt-in option.
- **Data storage region:** European Economic Area (EEA).
- **Retention period:** 1 year for detailed code-related data.
- **AI subcontractors:** JetBrains uses third-party LLM providers; list published at https://www.jetbrains.com/legal/docs/terms/jetbrains-ai/service-providers/

**BYOK privacy note:** When using BYOK, prompts and context are sent directly to the configured third-party provider, subject to that provider's privacy policy — not JetBrains' AI data policy.

**On-premise option:** JetBrains IDE Services On-Premises product exists; whether it includes Junie specifically is [UNVERIFIED].

---

## Limitations & Risks

| Limitation | Details | Source |
|-----------|---------|--------|
| MCP security tokens not supported | Junie cannot read security tokens from MCP server configs; workaround: load via Docker `.env` file | junie-ide-plugin docs |
| Junie CLI is Beta | CLI stability not production-guaranteed; licensed under EAP terms per Homebrew formula reference | CLI blog announcement; Homebrew formula |
| Community IDEs excluded | IntelliJ IDEA Community and PyCharm Community cannot enable AI data collection | Data collection policy |
| Remote development mode | IDE data collection opt-in unavailable in remote development mode | Data collection policy |
| DataGrip exclusion | Junie agent not available in DataGrip (per AI Assistant docs; standalone Junie availability [NEEDS VERIFICATION]) | JetBrains AI Assistant docs |
| Context window / token limit | No official documentation specifies context window size or RAG token limits | [NO OFFICIAL DATA] |
| Web search | No officially documented web search capability as an agent primitive | [NO OFFICIAL DATA] |
| Browser control | No officially documented browser automation as an agent primitive | [NO OFFICIAL DATA] |
| On-premise Junie | On-premise availability of Junie specifically is unconfirmed despite JetBrains IDE Services On-Premises product existing | [UNVERIFIED] |
| AI Credits depletion | Cloud-based features become unavailable when monthly AI Credit quota is exhausted (applies to JetBrains AI subscription tiers) | junie.jetbrains.com pricing |
| BYOK feature parity | Unsupported BYOK or local models may cause some Junie capabilities to be unavailable | byok docs |

---

## Alternatives

| Tool | Primary differentiator vs Junie |
|------|--------------------------------|
| JetBrains AI Assistant | Broader IDE assistant feature set (completion, VCS, explain); Junie is the agent component within AI Assistant |
| GitHub Copilot | Deep GitHub integration; VS Code / JetBrains plugin; agent mode available |
| Cursor | AI-first editor (fork of VS Code); strong multi-file editing focus |
| Windsurf | AI-first editor with Cascade agent; multi-file autonomous editing |
| Cline | VS Code extension; open source; MCP-native agentic coding |
| Continue | Open source; IDE extension for VS Code and JetBrains; BYOK-first |
| Claude Code | CLI-first coding agent by Anthropic; terminal-native; Anthropic models only |

---

## Sources

| Resource | URL |
|----------|-----|
| Main product page | https://www.jetbrains.com/junie/ |
| Dedicated Junie site | https://junie.jetbrains.com/ |
| Junie IDE plugin docs | https://junie.jetbrains.com/docs/junie-ide-plugin.html |
| Junie CLI docs | https://junie.jetbrains.com/docs/junie-cli.html |
| BYOK docs | https://junie.jetbrains.com/docs/byok.html |
| GitHub Action docs | https://junie.jetbrains.com/docs/junie-on-github.html |
| GitLab CI/CD docs | https://junie.jetbrains.com/docs/junie-gitlab-ci-cd.html |
| Headless mode docs | https://junie.jetbrains.com/docs/junie-headless.html |
| Action Allowlist docs | https://junie.jetbrains.com/docs/action-allowlist.html |
| Parameters / env vars | https://junie.jetbrains.com/docs/parameters.html |
| Plugin marketplace | https://plugins.jetbrains.com/plugin/26104-jetbrains-junie |
| GitHub repo (install scripts) | https://github.com/JetBrains/junie |
| Homebrew tap | https://github.com/JetBrains/homebrew-junie |
| CLI Beta blog announcement | https://blog.jetbrains.com/junie/2026/03/junie-cli-the-llm-agnostic-coding-agent-is-now-in-beta/ |
| JetBrains AI Service Terms v2.1 | https://www.jetbrains.com/legal/docs/terms/jetbrains-ai-service/ |
| Data collection policy v1.4 | https://www.jetbrains.com/help/ai/data-collection-and-use-policy.html |
| AI subcontractors list | https://www.jetbrains.com/legal/docs/terms/jetbrains-ai/service-providers/ |
| JetBrains AI pricing | https://www.jetbrains.com/ai-ides/buy/ |
| Discord community | https://jb.gg/junie-discord |
