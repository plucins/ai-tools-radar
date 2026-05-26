# Gemini CLI
```yaml
name: "Gemini CLI"
description: >
  Gemini CLI is an open-source AI agent from Google that runs in the terminal and connects Gemini models to local tools such as file access, shell execution, web retrieval, and MCP servers. It supports interactive and non-interactive workflows, configurable approval policies, sandboxing, IDE integration, and multiple Google authentication backends.
category: cli
logo: https://img.logo.dev/google.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | Gemini CLI |
| Alternative names | Gemini command-line interface; `gemini` command |
| Vendor / Organization | Google |
| Homepage | https://www.geminicli.com/ |
| Documentation | https://www.geminicli.com/docs/ |
| Changelog | https://www.geminicli.com/docs/changelogs |
| Repository | https://github.com/google-gemini/gemini-cli |
| License | Apache License 2.0 |
| First release date | 2025-06-24 (`early-access` GitHub release); public announcement published 2025-06-25 |
| Current status | Active. Stable, preview, and nightly release channels are published. Google announced that free/Google AI Pro/Google AI Ultra consumer access will stop serving requests on 2026-06-18, while enterprise access remains supported. |
| Current version | Stable: `v0.43.0`; latest preview at time of research: `v0.44.0-preview.0` |
| Last updated | 2026-05-22 |

## Classification

- **Primary category:** CLI
- **Secondary categories:** Coding agent; developer tool; IDE companion; GitHub automation
- **Tool type:** Open-source local CLI connected to Google-hosted AI services; optional enterprise-managed deployment
- **Problem domain:** Agentic coding, terminal automation, codebase analysis, debugging, local task execution
- **User interaction type:** Terminal chat, slash commands, headless CLI, JSON/JSONL output, IDE companion, MCP tool invocation
- **Automation type:** Semi-autonomous by default; read-only planning mode; higher-autonomy `auto_edit` and `yolo` approval modes

## Summary

- **One-sentence description:** Gemini CLI is a terminal-first Google AI agent that combines Gemini models with local file, shell, web, and MCP tools.
- **Extended description:** Google documents Gemini CLI as an open-source AI agent that uses a ReAct-style loop with built-in tools and local or remote MCP servers. It is designed for coding tasks, but Google also documents use cases in content generation, research, troubleshooting, and task management. Headless mode exposes structured JSON and JSONL output for automation.
- **Core value proposition:** Terminal-native access to Gemini with tool use, approval controls, and multiple Google authentication options.
- **Primary problem solved:** Reduces manual terminal and editor work for code understanding, file changes, command execution, and multi-step development tasks.
- **Key differentiator:** Google combines Gemini model access, built-in local tools, MCP extensibility, sandboxing, trusted-workspace controls, and Google account / API key / Vertex AI authentication in one CLI.
- **Target users:** Developers working in terminals; teams using Google authentication or Vertex AI; users automating coding workflows from scripts; organizations that need policy, sandboxing, and telemetry controls.
- **Anti-target users:** Users who need a purely offline tool; users who do not want cloud-backed inference; users handling confidential material under the individual Google-account flow without accepting the documented data-processing terms.
- **Primary usage context:** Local development environments, Cloud Shell, Cloud Workstations, CI/headless workflows, and IDE-assisted coding sessions.

## Use Cases

### Primary use cases

- **Codebase understanding and modification (stable):** query large codebases, read files, edit files, and run shell commands from a terminal session.
- **Debugging and troubleshooting (stable):** inspect files, run tests, search code, and iterate on fixes with approval prompts or sandboxing.
- **Workflow automation (stable):** run in non-interactive mode with `-p` and JSON/JSONL output for scripts and pipelines.
- **MCP-based extension (stable):** connect external tools, APIs, resources, and prompts through local or remote Model Context Protocol servers.

### Secondary use cases

- **Session recovery and rollback (stable):** automatic checkpoints before file modifications and `/restore`-based recovery.
- **IDE-assisted review and diff application (stable):** use the VS Code companion or ACP-based IDE integrations for context and native diff review.
- **GitHub workflow automation (stable):** use the official Gemini CLI GitHub Action for PR reviews, issue triage, and on-demand automation.
- **Observability and enterprise administration (stable):** export telemetry with OpenTelemetry and manage tool policies from system settings.

### Example workflows

- Start an interactive session in the current project and ask for code changes.
- Run headless analysis with `gemini -p ... --output-format json`.
- Configure MCP servers in `~/.gemini/settings.json` and call them from prompts.
- Enable checkpointing, make edits, and restore prior project state with `/restore`.
- Install the IDE companion, review diffs in-editor, and accept or reject changes.

### Anti-patterns

- **Confidential-data workflow on individual Google-account auth:** Google states that prompts, related code, generated output, edits, usage data, and feedback may be used to provide, improve, and develop products and machine-learning technologies for Gemini Code Assist for individuals; human reviewers may access de-identified copies retained up to 18 months unless the user opts out.
- **Unsupported access path:** Google states that directly accessing Gemini CLI-backed services with third-party software or tools is a violation of applicable terms and may lead to suspension or termination.
- **Assuming enterprise controls are a hard security boundary:** Google states enterprise settings patterns are not a foolproof boundary against a user with sufficient local privileges.

## Features

### Core features

| Feature | Description | Plan / availability | Status | Source |
|---------|-------------|---------------------|--------|--------|
| Terminal AI agent | Open-source terminal agent using a ReAct loop with built-in tools and MCP servers | All supported auth methods | Stable | Google Developers Gemini CLI page |
| File system tools | Read files, search with glob/grep, and edit files with `replace` and `write_file` | All supported auth methods | Stable | Tools reference; file-system docs |
| Shell execution | Execute shell commands, including interactive commands and background processes | All supported auth methods | Stable | Tools reference; shell docs |
| Web search and retrieval | Google Search grounding plus `web_fetch` URL retrieval | All supported auth methods | Stable | README; tools reference; web-fetch docs |
| Headless mode | Non-interactive execution with plain text, JSON, or streaming JSONL output | All supported auth methods | Stable | README; headless docs |
| Session checkpointing | Save project snapshots before file modifications and restore later | Requires `general.checkpointing.enabled` | Stable | Checkpointing docs |

### Advanced features

| Feature | Description | Plan / availability | Status | Source |
|---------|-------------|---------------------|--------|--------|
| MCP support | Connect stdio, SSE, or Streamable HTTP MCP servers; discover tools and resources | Requires MCP configuration | Stable | MCP docs |
| Trusted folders | Optional trust system for workspace configs, local `.env`, custom commands, hooks, skills, and MCP connections | Disabled by default; user or enterprise managed | Stable | Trusted folders docs |
| Sandboxing | Sandbox tool execution with macOS Seatbelt, Docker/Podman, Windows native sandbox, `runsc`, or experimental LXC | Provider-dependent | Stable; LXC experimental | Sandboxing docs |
| IDE integration | VS Code companion extension and ACP-based IDE integrations; in-editor diff review | Requires extension or ACP-compatible IDE | Stable | IDE integration docs |
| OpenTelemetry telemetry | Export logs, metrics, and traces to local OTLP targets or Google Cloud | Requires telemetry configuration | Stable | Telemetry docs |
| GitHub Action | PR review, issue triage, and on-demand workflow automation via `google-github-actions/run-gemini-cli` | GitHub Actions environment | Stable | README |

### Experimental features

| Feature | Description | Plan / availability | Status | Source |
|---------|-------------|---------------------|--------|--------|
| Task tracker | Persistent session-local task graph via `tracker_*` tools | Requires `experimental.taskTracker` | Experimental | Tools reference; tracker docs |
| Plan mode approval workflow | Read-only planning plus explicit plan approval tooling | Enabled by default; mode still documented as under development in CLI flags docs | Experimental / in development | Planning docs; configuration docs |

## Interfaces

- **Interface types:** CLI, slash commands, headless CLI, IDE companion extension, ACP agent, MCP client, GitHub Action
- **Supported platforms:** Local terminal, Cloud Shell, Cloud Workstations, supported VS Code-compatible editors, ACP-compatible IDEs
- **Supported operating systems:** macOS 15+, Windows 11 24H2+, Ubuntu 20.04+
- **Supported shells:** Bash, Zsh, PowerShell
- **Primary commands:**
  - `gemini`
  - `gemini -p "<prompt>"`
  - `gemini --output-format json`
  - `gemini --output-format stream-json`
  - `gemini -m <model>`
  - `gemini --include-directories <paths>`
  - `gemini -s` / `gemini --sandbox`
- **Documented slash commands:** `/agents`, `/auth`, `/chat`, `/commands`, `/directory`, `/docs`, `/extensions`, `/help`, `/ide`, `/mcp`, `/memory`, `/model`, `/permissions`, `/restore`, `/resume`, `/settings`, `/skills`, `/stats`, `/tools`, `/upgrade`
- **Manual prompt shorthands:**
  - `@path` for `read_many_files`
  - `!command` for `run_shell_command`

## Operating Modes

| Mode | Description | Autonomy level | Limitations |
|------|-------------|----------------|-------------|
| Interactive | Full terminal UI with tool use, approvals, slash commands, and session history | User-approved by default | Depends on network access and authentication |
| Headless / batch | Triggered in non-TTY mode or with `-p`; returns plain text, JSON, or JSONL events | Script-driven; can still use tools | Requires non-interactive auth setup if credentials are not already cached |
| Plan mode | Read-only planning mode using `enter_plan_mode` / `exit_plan_mode` | Read-only research and planning | Tool writes are blocked; plan approval is required to proceed |
| `auto_edit` | Automatically approves edit tools while prompting for other tools | Partial auto-approval | Shell and other mutating tools still prompt |
| `yolo` | Automatically approves all tool calls | Highest autonomy | Higher operational risk; Google documents that sandboxing is enabled by default with `--yolo` |
| Sandboxed execution | Run tool operations inside a sandbox provider | Same as parent approval mode, but isolated | Available sandbox providers vary by OS and setup |

## Architecture & Mechanisms

- **System architecture:** Open-source CLI package (`@google/gemini-cli`) with weekly stable releases, preview releases, and nightly builds.
- **Reasoning/execution loop:** Google documents a ReAct-style loop with built-in tools and local or remote MCP servers.
- **Authentication backends:** Google account login, Gemini API key, Vertex AI (ADC, service-account JSON key, or Google Cloud API key).
- **Tool calling:** Built-in tools are registered in the core tool system; MCP servers can add tools and resources discovered at runtime.
- **MCP transports:** stdio, SSE, Streamable HTTP.
- **File system scope:** File tools operate within a `rootDirectory` / workspace root.
- **Shell execution:** `powershell.exe -NoProfile -Command` on Windows; `bash -c` on other platforms.
- **Web retrieval:** `web_fetch` uses Gemini API `urlContext`; if API retrieval fails, the tool attempts raw local fetching.
- **Checkpointing:** Before `write_file` or `replace`, Gemini CLI can create a checkpoint in a shadow Git repository at `~/.gemini/history/<project_hash>` and store conversation/tool metadata under `~/.gemini/tmp/<project_hash>/checkpoints`.
- **Session handling:** Conversations are auto-saved and resumable with `/resume`; manual checkpoints are project-scoped. Shell history is stored in `~/.gemini/tmp/<project_hash>/shell_history`.
- **IDE context construction:** The VS Code companion can provide the 10 most recently accessed files, current cursor position, and selected text up to 16 KB.
- **Observability:** OpenTelemetry-based logs, metrics, and traces with local or Google Cloud export targets.

## Tool Capabilities

| Capability | Description | Scope | Risk level | Control mechanism |
|-----------|-------------|-------|------------|-------------------|
| File reading | Reads text, images, audio, and PDF files; supports glob/grep/listing | Workspace root / configured directories | Medium | Root-directory scoping; trusted folders |
| File editing | `replace` performs targeted edits; `write_file` creates or overwrites files | Workspace files | High | Manual confirmation; checkpointing; sandboxing |
| Command execution | Executes shell commands, including interactive and background commands | Host shell or sandbox | High | Manual confirmation by default; policy engine; sandboxing; `tools.core` allowlist |
| Web access | Google Search and `web_fetch` retrieve external content | Public web, and `web_fetch` can access local/private addresses | High | Confirmation prompts; Plan Mode extra confirmation for `web_fetch` |
| MCP/API usage | Connects to external MCP servers and resources | Depends on configured servers | High | Server allowlists, trust flags, env sanitization, per-server include/exclude tool lists |
| IDE context access | Receives editor context and renders diffs in supported IDEs | Recent files, cursor position, selection, diff review | Medium | Requires IDE companion or ACP integration; directory match checks |
| Session restore | Restores project files and conversation to a pre-edit checkpoint | Current project | Medium | Requires checkpointing to be enabled |
| Telemetry export | Exports logs, metrics, and traces | Local OTLP or Google Cloud | Medium | Disabled by default; configurable prompt logging; usage-stats opt-out |
| Approval logic | Supports `default`, `auto_edit`, `plan`, and `yolo` approval modes | Entire session | High if relaxed | CLI flags, settings, folder trust, system policy |

## Agent Tool Primitives

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `run_shell_command` | Execute shell commands, including interactive/background sessions | Yes | Stable |
| `glob` | Find files by glob pattern | No | Stable |
| `grep_search` | Search file contents with regex | No | Stable |
| `list_directory` | List files and subdirectories | No | Stable |
| `read_file` | Read one file; supports text, image, audio, PDF | No | Stable |
| `read_many_files` | Read multiple files, often via `@` syntax | No | Stable |
| `replace` | Precise in-file text replacement | Yes | Stable |
| `write_file` | Create or overwrite a file | Yes | Stable |
| `ask_user` | Ask the user for clarification or choices | Yes | Stable |
| `write_todos` | Maintain a session-local todo list | No | Stable |
| `tracker_create_task` | Create a tracker task | No | Experimental |
| `tracker_update_task` | Update tracker task state or dependencies | No | Experimental |
| `tracker_get_task` | Read tracker task details | No | Experimental |
| `tracker_list_tasks` | List tracked tasks | No | Experimental |
| `tracker_add_dependency` | Add task dependency edges | No | Experimental |
| `tracker_visualize` | Render task graph as ASCII | No | Experimental |
| `list_mcp_resources` | List MCP resources | Depends on MCP trust settings [UNVERIFIED] | Stable |
| `read_mcp_resource` | Read an MCP resource | Depends on MCP trust settings [UNVERIFIED] | Stable |
| `activate_skill` | Load a skill from `.gemini/skills` | No | Stable |
| `get_internal_docs` | Access Gemini CLI's own docs | No | Stable |
| `enter_plan_mode` | Switch to read-only planning mode | Yes | Stable tool; mode documented as under development in some CLI flag docs |
| `exit_plan_mode` | Present a plan and request approval to implement | Yes | Stable tool |
| `google_web_search` | Perform a Google Search query | [UNVERIFIED] | Stable |
| `web_fetch` | Retrieve and process specific URLs | Yes | Stable |
| `complete_task` | Finalize a subagent mission and return to parent agent | No user access | Internal system tool |
| `update_topic` | Update current topic and status in the UI | No user access | Internal system tool |

## Integrations

### Native integrations

- **Google account login:** Gemini Code Assist for individuals, Google AI Pro, Google AI Ultra, and organizational Google-account flows.
- **Gemini API key:** Authenticate with `GEMINI_API_KEY` from Google AI Studio.
- **Vertex AI:** Authenticate with ADC, service-account JSON key, or Google Cloud API key.
- **Cloud Shell / Cloud Workstations:** Gemini CLI is documented as pre-installed.

### MCP integrations

- Local or remote MCP servers configured in `settings.json`
- Supported transports: stdio, SSE, Streamable HTTP
- Resource discovery and `@server://resource/path` references

### IDE integrations

- **Gemini CLI Companion** extension for Antigravity, Visual Studio Code, and VS Code-compatible editors
- **ACP Agent Registry** compatibility for JetBrains IDEs, Zed, and other ACP-compatible IDEs

### Git integrations

- Official GitHub Action: `google-github-actions/run-gemini-cli`
- Git-aware file search behavior in workspace operations
- Checkpointing uses a shadow Git repository for snapshots

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | Gemini model family. README states “Gemini 3 models”; the launch announcement highlighted Gemini 2.5 Pro for the free Google-account flow; quota docs state requests may be routed across model families depending on plan/authentication. |
| Models publicly disclosed | Partially |
| User model selection | Yes; documented via `gemini -m <model>` and `/model set <model-name>` |
| Proprietary models | Yes |
| External models | None documented |
| Multimodal models | Yes; README documents generating apps from PDFs, images, or sketches, and file tools support images, audio, and PDF |
| Context window | 1,000,000 tokens documented for Gemini Code Assist local codebase awareness and highlighted in Google launch materials |
| Token limits | Session/model usage is exposed through `/stats model`; fixed per-model output-token limits were not documented specifically for Gemini CLI [NO OFFICIAL DATA] |
| Training on user data | Varies by authentication method; see Privacy & Data Processing |

## Permissions & Security

- **Mutating tools require approval by default:** Google documents manual confirmation for file-modifying tools and shell commands.
- **Trusted folders are optional and disabled by default:** when enabled, untrusted folders block workspace settings, project `.env` loading, extension management, MCP connection, custom commands, and local auto-accept behavior.
- **Sandbox providers:**
  - macOS Seatbelt (`sandbox-exec`)
  - Docker / Podman
  - Windows native sandbox
  - `runsc` / gVisor on Linux
  - LXC/LXD on Linux (experimental)
- **Sandbox expansion:** when a sandboxed command needs more permissions, Gemini CLI can present a per-command expansion request.
- **MCP environment sanitization:** sensitive inherited environment variables are redacted by default; variables passed explicitly in server config are trusted and forwarded.
- **Enterprise controls:** system settings files, tool allowlists, MCP allowlists, policy engine rules, enforced auth type, and telemetry settings can be centrally managed.
- **Security reporting:** Google directs vulnerability reports to `https://g.co/vulnz`.

## Privacy & Data Processing

### Authenticated with Google account: Gemini Code Assist for individuals

- Google states it collects prompts, related code, generated output, code edits, related feature-usage information, and feedback.
- Google states human reviewers may review, annotate, and process collected data after it is disassociated from the user account.
- Google states the disassociated copy may be stored for up to 18 months.
- Google states users can opt out of using this data to improve machine-learning models.

### Authenticated with Google account: Gemini Code Assist Standard / Enterprise

- Google states prompts, responses, and additional context are treated as Customer Data.
- Google states Gemini Code Assist Standard and Enterprise are stateless services and do not store prompts and responses in Google Cloud unless the customer configures Cloud Logging.
- Google states processing typically occurs at the data center closest to the request origin, but regionality is not guaranteed.
- Google states customer data is not used to train Google models without customer permission.
- Google documents encrypted TLS transport and Google Cloud encryption at rest for these services.

### Authenticated with Gemini API key / AI Studio

- Google documents that Gemini CLI can authenticate with `GEMINI_API_KEY` from Google AI Studio.
- The Gemini CLI plans page states: “Free tier data may be used to improve products.”
- Google’s Gemini CLI Terms & Privacy page states Gemini Developer API usage is governed by Gemini API terms and the Google Privacy Policy.

### Authenticated with Vertex AI

- Google documents Vertex AI authentication through ADC, service-account JSON keys, or Google Cloud API keys.
- Google’s Gemini CLI Terms & Privacy page states Vertex AI usage is governed by Google Cloud Platform terms and the Google Cloud Privacy Notice.

### Usage statistics and telemetry

- Gemini CLI usage statistics are enabled by default and can be disabled with `privacy.usageStatisticsEnabled: false`.
- Google documents anonymized usage statistics covering tool-call names, success/failure, duration, model used, request duration, and session configuration.
- Google documents that usage statistics do not include prompt/response content, file content, PII, or API keys.
- OpenTelemetry export is disabled by default. `telemetry.logPrompts` defaults to `true` when telemetry is enabled and should be considered separately from general usage-statistics collection.

## Limitations & Risks

- **Consumer transition announced:** Google announced that, on 2026-06-18, Gemini CLI and Gemini Code Assist IDE extensions will stop serving requests for free users and Google AI Pro/Ultra users. Enterprise access remains supported.
- **Network dependency:** Installation docs state an internet connection is required.
- **Quota differences by auth mode:**
  - Google account individual: 1,000 requests/day
  - Google AI Pro: 1,500 requests/day
  - Google AI Ultra: 2,000 requests/day
  - Gemini API key free tier: 250 requests/day, Flash model only
  - Code Assist Standard: 1,500 requests/day
  - Code Assist Enterprise: 2,000 requests/day
- **Tool risk:** shell execution, file writes, MCP servers, and `web_fetch` can change local state or reach sensitive endpoints; Google documents confirmation, folder trust, policy, and sandbox controls, but these must be configured and respected.
- **Enterprise security boundary warning:** Google explicitly states enterprise configuration patterns are not a foolproof security boundary against a determined user with local privileges.
- **Headless trust limitation:** if folder trust is enabled and the workspace is untrusted, headless mode exits unless `--skip-trust` or `GEMINI_CLI_TRUST_WORKSPACE=true` is used.
- **Pay-as-you-go cost variability:** Google documents that token/call-based usage can become expensive for many small calls.

## Usage Examples

### Interactive session

```bash
gemini
```

### Run in the current project with a specific model

```bash
gemini -m gemini-2.5-flash
```

### Include extra directories

```bash
gemini --include-directories ../lib,../docs
```

### Headless text response

```bash
gemini -p "Explain the architecture of this codebase"
```

### Headless structured JSON

```bash
gemini -p "Explain the architecture of this codebase" --output-format json
```

### Streaming JSONL events

```bash
gemini -p "Run tests and deploy" --output-format stream-json
```

### Enable sandboxing

```bash
gemini -s -p "analyze the code structure"
```

### Authenticate with Gemini API key

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
gemini
```

### Authenticate with Vertex AI

```bash
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="YOUR_PROJECT_LOCATION"
gemini
```

### Configure Docker sandboxing

```bash
export GEMINI_SANDBOX=docker
gemini -p "build the project"
```

### Configure an MCP server

```json
{
  "mcpServers": {
    "serverName": {
      "command": "path/to/server",
      "args": ["--arg1", "value1"],
      "timeout": 30000,
      "trust": false
    }
  }
}
```

## Sources

- https://github.com/google-gemini/gemini-cli
- https://github.com/google-gemini/gemini-cli/releases
- https://www.geminicli.com/docs/get-started/installation
- https://www.geminicli.com/docs/get-started/authentication
- https://www.geminicli.com/docs/reference/commands
- https://www.geminicli.com/docs/reference/tools
- https://www.geminicli.com/docs/tools/file-system
- https://www.geminicli.com/docs/tools/shell
- https://www.geminicli.com/docs/tools/web-fetch
- https://www.geminicli.com/docs/tools/mcp-server
- https://www.geminicli.com/docs/cli/headless
- https://www.geminicli.com/docs/cli/sandbox
- https://www.geminicli.com/docs/cli/trusted-folders
- https://www.geminicli.com/docs/ide-integration
- https://www.geminicli.com/docs/cli/telemetry
- https://www.geminicli.com/docs/cli/checkpointing
- https://www.geminicli.com/docs/cli/enterprise
- https://www.geminicli.com/docs/resources/quota-and-pricing
- https://www.geminicli.com/docs/resources/tos-privacy
- https://www.geminicli.com/docs/changelogs
- https://www.geminicli.com/docs/changelogs/latest
- https://www.geminicli.com/docs/changelogs/preview
- https://developers.google.com/gemini-code-assist/docs/gemini-cli
- https://developers.google.com/gemini-code-assist/resources/quotas
- https://developers.google.com/gemini-code-assist/resources/privacy-notice-gemini-code-assist-individuals
- https://docs.cloud.google.com/gemini/docs/codeassist/security-privacy-compliance
- https://ai.google.dev/gemini-api/docs
- https://ai.google.dev/gemini-api/docs/rate-limits
- https://aistudio.google.com/
- https://www.geminicli.com/plans/
- https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/
- https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli
- https://g.co/vulnz
