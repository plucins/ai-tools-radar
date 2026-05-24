# Claude Code

```yaml
name: Claude Code
description: >
  Agentic coding assistant with full codebase understanding, autonomous multi-step execution,
  and deep tool integration — available in terminal, IDEs, desktop, and web.
category: cli
logo: https://img.logo.dev/anthropic.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 18:30

| Field | Description |
|-------|-------------|
| Name | Claude Code |
| Alternative names | — |
| Vendor / Organization | Anthropic PBC |
| Homepage | https://claude.com/product/claude-code |
| Documentation | https://code.claude.com/docs/en/overview |
| Changelog | https://code.claude.com/docs/en/changelog |
| Repository | https://github.com/anthropics/claude-code (npm: `@anthropic-ai/claude-code`) |
| First release date | 2025 (initial public release) |
| Current status | GA (some features in Beta/Research Preview) |
| Last updated | May 2026 (weekly releases; auto-updates) |

---

## Classification

- **Primary category**: Coding Agent
- **Secondary categories**: CLI Tool, IDE Assistant, Automation Platform
- **Tool type**: SaaS (cloud-backed AI with local execution)
- **Problem domain**: Software development automation — code understanding, editing, testing, deployment
- **User interaction type**: CLI, IDE panel, Desktop app, Web UI, Mobile, Slack
- **Automation type**: Agentic (autonomous multi-step task execution with human-in-the-loop approval)

---

## Summary

- **One-sentence description**: Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools — available in your terminal, IDE, desktop app, and browser.
- **Core value proposition**: Full-codebase understanding with autonomous multi-step task execution, no manual context selection required.
- **Primary problem solved**: Automating complex, multi-file software development tasks that require deep codebase understanding.
- **Key differentiator**: Runs locally in the developer's terminal with direct filesystem and tool access; operates through an agentic loop that chains dozens of actions without manual intervention.
- **Target users**: Software engineers, development teams, engineering organizations deploying AI-assisted coding at scale.
- **Anti-target users**: Users without a code project or terminal; non-technical users looking for general-purpose chat.
- **Primary usage context**: Terminal-based development workflow — building features, fixing bugs, refactoring code, creating PRs, running tests.

---

## Use Cases

### Primary Use Cases
- Exploring and understanding unfamiliar codebases
- Building features across multiple files
- Fixing bugs with test-driven verification
- Refactoring and code modernization
- Creating commits and pull requests
- Writing and running tests
- Code review and quality analysis

### Secondary Use Cases
- Automated PR review (GitHub Actions, GitLab CI/CD)
- Issue triage from Slack
- Scheduled recurring tasks (routines)
- Running agent teams (parallel sessions)
- Onboarding developers to codebases
- Documentation generation

### Automated Tasks
- Read project structure and dependencies
- Multi-file coordinated edits
- Git operations (branch, commit, push, PR)
- Test execution and verification
- Shell command execution

### Anti-patterns
- Tasks requiring persistent GUI interaction (limited computer use in research preview)
- Work on codebases the user has no access to
- Production database modifications without explicit safety controls

---

## Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| Agentic loop | Multi-step reasoning: gather context → take action → verify results | Stable |
| File operations | Read, edit, create, rename, reorganize files | Stable |
| Shell execution | Run any terminal command (build tools, git, package managers) | Stable |
| Web search & fetch | Search the web, fetch documentation, look up errors | Stable |
| Code intelligence | Type errors/warnings after edits, jump to definitions, find references | Stable (requires plugins) |
| Git integration | Branch, commit, push, PR creation, merge conflict resolution | Stable |
| CLAUDE.md memory | Persistent project-specific instructions loaded every session | Stable |
| Auto memory | Automatic learning accumulation across sessions (MEMORY.md) | Stable |
| Session management | Resume, fork, branch sessions; local JSONL transcript storage | Stable |
| Checkpointing | Snapshot files before edits; rewind to previous state | Stable |
| Permission modes | Default, Accept Edits, Plan Mode, Auto Mode | Stable (Auto Mode: Research Preview) |
| Context compaction | Automatic summarization when context window fills | Stable |
| MCP support | Connect to external tools via Model Context Protocol | Stable |
| Skills | Extensible task-specific instructions loaded on demand | Stable |
| Subagents | Delegate tasks to isolated context sub-sessions | Stable |
| Hooks | Run shell commands on file edit, task finish, or input events | Stable |
| Plugins | Create/install extensions with skills, agents, hooks, MCP servers | Stable |
| Voice dictation | Hold-to-record or tap-to-record voice input in CLI | Stable |
| Fast mode | 2.5x faster Opus responses at higher cost | Research Preview |

### Advanced Features

| Feature | Description | Status |
|---------|-------------|--------|
| Agent teams | Orchestrate multiple Claude Code instances with shared tasks and messaging | Stable |
| Agent view | Manage many sessions from one screen | Stable |
| Worktrees | Isolated parallel sessions in separate git worktrees | Stable |
| Routines | Scheduled tasks on Anthropic-managed cloud infrastructure | Stable |
| Remote Control | Continue local sessions from phone/tablet/browser | Stable |
| Channels | Push webhooks, alerts, chat messages into a running session | Stable |
| Ultraplan | Cloud-based planning with multi-agent analysis | Stable |
| Ultrareview | Deep multi-agent code review in the cloud | Research Preview |
| Computer use | Open apps, click, type, see screen (macOS) | Research Preview |
| Claude Code on the web | Cloud-executed sessions in Anthropic-managed VMs | Stable |
| Deep links | Open sessions from URLs (`claude-cli://`) | Stable |
| Chrome integration | Test web apps, debug with console logs, automate forms | Beta |
| Slack integration | Delegate coding tasks from Slack workspace | Stable |
| GitHub Actions | Automated PR reviews and issue triage in CI/CD | Stable |
| GitLab CI/CD | Integration with GitLab pipelines | Stable |
| Agent SDK | Build production AI agents with Claude Code as a library (Python & TypeScript) | Stable |
| Sandbox (Bash) | Filesystem and network isolation for Bash commands | Stable |
| Dev containers | Run inside dev containers for isolation | Stable |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| CLI (Terminal) | macOS, Linux, Windows | Primary interface; full feature set |
| VS Code extension | macOS, Linux, Windows | Inline diffs, @-mentions, plan review |
| JetBrains plugin | IntelliJ, PyCharm, WebStorm, etc. | Beta |
| Desktop app | macOS, Windows | Parallel sessions, visual diffs, PR monitoring |
| Web (claude.ai/code) | Browser | Cloud-executed sessions, no local setup |
| Mobile (iOS app) | iPhone/iPad | Route tasks to desktop; Remote Control |
| Slack | Any | Delegate coding tasks from Slack |
| Chrome extension | Browser | Debug live web applications |
| GitHub Actions | CI/CD | Automated code review on PRs |
| GitLab CI/CD | CI/CD | Pipeline integration |
| API / SDK | Python, TypeScript | Programmatic agent execution |

### Supported Operating Systems
- macOS 13.0+
- Windows 10 1809+ / Windows Server 2019+
- Ubuntu 20.04+
- Debian 10+
- Alpine Linux 3.19+

### System Requirements
- 4 GB+ RAM
- x64 or ARM64 processor
- Internet connection required
- Shell: Bash, Zsh, PowerShell, or CMD

### Installation Methods
- Native installer (recommended; auto-updates): `curl -fsSL https://claude.ai/install.sh | bash`
- Homebrew: `brew install --cask claude-code`
- WinGet: `winget install Anthropic.ClaudeCode`
- Linux package managers: apt, dnf, apk
- npm: `npm install -g @anthropic-ai/claude-code`

---

## Operating Modes

| Mode | Description | Autonomy Level |
|------|-------------|----------------|
| Interactive (Default) | Claude asks before file edits and shell commands | Low — human approves each action |
| Accept Edits | Auto-approves file edits and common filesystem commands (`mkdir`, `touch`, `rm`, `mv`, `cp`, `sed`) | Medium — still asks for other commands |
| Plan Mode | Read-only tools only; creates a plan for approval before execution | Lowest — observation only |
| Auto Mode | Background safety checks evaluate all actions autonomously | High — research preview |
| Headless (`-p` flag) | Non-interactive single prompt execution | High — no approval prompts |
| One-shot (`claude "task"`) | Run a single task, then return to shell | Varies by permission mode |
| Background (Routines) | Scheduled or event-triggered execution on cloud infrastructure | Autonomous |

### Execution Environments

| Environment | Description |
|-------------|-------------|
| Local | Default. Full access to files, tools, environment on user's machine |
| Cloud | Anthropic-managed VMs for web sessions |
| Remote Control | Local execution, controlled from a browser/mobile |

---

## Architecture & Mechanisms

### Agentic Loop
Claude Code operates through a three-phase agentic loop:
1. **Gather context** — search files, read code, understand dependencies
2. **Take action** — edit files, run commands, create branches
3. **Verify results** — run tests, check outputs, iterate

The loop adapts dynamically: simple questions may only need context gathering; bug fixes cycle through all phases repeatedly. Claude chains dozens of actions together and course-corrects based on tool outputs.

### Context Window
- Holds conversation history, file contents, command outputs, CLAUDE.md, auto memory, loaded skills, and system instructions
- Automatic compaction when context fills (clears older tool outputs first, then summarizes)
- Persistent instructions should be placed in CLAUDE.md rather than relying on conversation history
- `/context` command shows current usage; `/compact` triggers manual compaction

### Session Storage
- Sessions saved as plaintext JSONL under `~/.claude/projects/`
- Enables rewinding, resuming, and forking
- File snapshots taken before each edit for revert capability
- Sessions are independent — each new session starts with fresh context

### Data Flow
- Claude Code runs locally; sends prompts and receives responses via Anthropic API over TLS 1.2+
- No backend server or remote code index required for local execution
- Encryption at rest: AES-256 (infrastructure-level disk encryption)
- Compatible with VPNs and LLM proxies

---

## Tool Capabilities

| Capability | Scope | Control Mechanism |
|------------|-------|-------------------|
| File reading | Project directory and subdirectories; can read outside working directory | Always allowed |
| File editing | Working directory and subdirectories only | Permission mode (approve or auto-accept) |
| Command execution | Any shell command available to the user | Permission prompt; allowlist in settings |
| Internet access | Web search and URL fetching | WebFetch tool with domain safety check |
| Git operations | Full git workflow | Permission prompt |
| MCP tool usage | External services configured by user | Per-server permission configuration |
| Subagent spawning | Isolated context sub-sessions | Automatic |
| Computer use (macOS) | Screen interaction, app control | Research preview; requires opt-in |

### Safety Controls
- Write access restricted to working directory and subdirectories
- Command blocklist: `curl`, `wget` blocked by default
- Sandboxed Bash tool available (`/sandbox`) for filesystem and network isolation
- Allowlists configurable per-user, per-codebase, or per-organization
- Fail-closed: unmatched commands default to requiring approval
- Command injection detection: suspicious commands require manual approval even if allowlisted

---

## Agent Tool Primitives

Source: https://code.claude.com/docs/en/tools-reference

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `Agent` | Spawns a subagent with its own context window to handle a task | No | Stable |
| `AskUserQuestion` | Asks multiple-choice questions to gather requirements or clarify ambiguity | No | Stable |
| `Bash` | Executes shell commands in your environment | Yes | Stable |
| `CronCreate` | Schedules a recurring or one-shot prompt within the current session | No | Stable; session-scoped, restored on `--resume`/`--continue` |
| `CronDelete` | Cancels a scheduled task by ID | No | Stable |
| `CronList` | Lists all scheduled tasks in the session | No | Stable |
| `Edit` | Makes targeted edits to specific files via exact string replacement | Yes | Stable |
| `EnterPlanMode` | Switches to plan mode (read-only); designs an approach before coding | No | Stable |
| `EnterWorktree` | Creates an isolated git worktree and switches into it | No | Stable; not available to subagents |
| `ExitPlanMode` | Presents a plan for approval and exits plan mode | Yes | Stable |
| `ExitWorktree` | Exits a worktree session and returns to the original directory | No | Stable; not available to subagents |
| `Glob` | Finds files based on pattern matching | No | Stable |
| `Grep` | Searches for patterns in file contents (ripgrep) | No | Stable |
| `ListMcpResourcesTool` | Lists resources exposed by connected MCP servers | No | Stable |
| `LSP` | Code intelligence: jump to definition, find references, type errors/warnings | No | Stable; requires code intelligence plugin |
| `Monitor` | Runs a command in the background and feeds each output line back to Claude | Yes | Stable; requires v2.1.98+; unavailable on Bedrock/Vertex/Foundry or when telemetry disabled |
| `NotebookEdit` | Modifies Jupyter notebook cells | Yes | Stable |
| `PowerShell` | Executes PowerShell commands natively | Yes | Preview; opt-in via `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` |
| `PushNotification` | Sends a desktop/phone push notification | No | Stable; unavailable on Bedrock/Vertex/Foundry |
| `Read` | Reads file contents with line numbers; supports images and PDFs | No | Stable |
| `ReadMcpResourceTool` | Reads a specific MCP resource by URI | No | Stable |
| `RemoteTrigger` | Creates, updates, runs, and lists Routines on claude.ai | No | Stable; unavailable on Bedrock/Vertex/Foundry; requires Pro/Max/Team/Enterprise |
| `ScheduleWakeup` | Reschedules the next iteration of a self-paced `/loop` | No | Stable; unavailable on Bedrock/Vertex/Foundry |
| `SendMessage` | Sends a message to an agent team teammate or resumes a subagent by ID | No | Stable; requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` |
| `ShareOnboardingGuide` | Uploads ONBOARDING.md and returns a share link | Yes | Stable; requires Pro/Max/Team/Enterprise |
| `Skill` | Executes a skill within the main conversation | Yes | Stable |
| `TaskCreate` | Creates a new task in the session task list | No | Stable; supersedes `TodoWrite` since v2.1.142 |
| `TaskGet` | Retrieves full details for a specific task | No | Stable |
| `TaskList` | Lists all tasks with their current status | No | Stable |
| `TaskOutput` | Retrieves output from a background task | No | **Deprecated** — prefer `Read` on the task's output file path |
| `TaskStop` | Kills a running background task by ID | No | Stable |
| `TaskUpdate` | Updates task status, dependencies, details, or deletes tasks | No | Stable |
| `TeamCreate` | Creates an agent team with multiple teammates | No | Stable; requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` |
| `TeamDelete` | Disbands an agent team and cleans up teammate processes | No | Stable; requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` |
| `TodoWrite` | Manages the session task checklist | No | **Deprecated** in v2.1.142; superseded by `TaskCreate`/`TaskGet`/`TaskList`/`TaskUpdate`; re-enable via `CLAUDE_CODE_ENABLE_TASKS=0` |
| `ToolSearch` | Searches for and loads deferred MCP tools on demand | No | Stable |
| `WaitForMcpServers` | Waits for MCP servers still connecting in the background | No | Stable; only appears when tool search is disabled |
| `WebFetch` | Fetches content from a URL, converts HTML to Markdown | Yes | Stable |
| `WebSearch` | Performs web searches via Anthropic's search backend | Yes | Stable; unavailable on Amazon Bedrock |
| `Write` | Creates or overwrites files with full content | Yes | Stable |

---

## Integrations

### Native Integrations

| Integration | Type | What it enables |
|-------------|------|-----------------|
| GitHub | Native | PR creation, code review, issue triage, Actions |
| GitLab | Native | CI/CD pipelines, MR workflows |
| VS Code | IDE Extension | Inline diffs, @-mentions, plan review, shortcuts |
| JetBrains IDEs | IDE Plugin | IntelliJ, PyCharm, WebStorm integration |
| Slack | Messaging | Route coding tasks from channels/DMs |
| Chrome | Browser Extension | Debug web apps, console logs, form automation |
| Amazon Bedrock | Cloud Provider | Use Claude models via AWS infrastructure |
| Google Vertex AI | Cloud Provider | Use Claude models via GCP |
| Microsoft Foundry | Cloud Provider | Use Claude models via Azure |

### Protocol Support
- **MCP (Model Context Protocol)**: Full support for connecting external tools and services
- **OpenTelemetry**: Metrics export for usage monitoring and auditing
- **Webhooks/Channels**: Push events into sessions from external systems

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models used | Claude Opus 4.6, Claude Opus 4.7, Claude Sonnet 4.6, Claude Haiku 4.5 |
| Models publicly disclosed | Yes |
| User model selection | Yes — switch with `/model` command or `--model` flag |
| Proprietary models | Yes (Anthropic's Claude family) |
| External models | No (Claude models only; but accessible via Bedrock, Vertex, Foundry) |
| Local models | No |
| Multimodal | Yes (image input for screenshots/design comparison) |
| Processing region | Anthropic cloud; optionally via AWS/GCP/Azure regions |
| Training on user data | Commercial users: No (unless opted into Developer Partner Program). Consumer users: opt-in/opt-out in privacy settings |

### Fast Mode
- Available for Opus 4.6
- 2.5x faster responses
- Higher cost per token: $30 input / $150 output per million tokens
- Available on consumption-based plans and via usage credits on subscription plans
- Status: Research Preview

---

## Permissions & Security

### Authentication
- Claude Pro, Max, Team, or Enterprise subscription
- Anthropic Console (API with pre-paid credits)
- Third-party providers: Amazon Bedrock, Google Vertex AI, Microsoft Foundry
- OAuth browser-based login; credentials stored locally

### Security Architecture
- **Permission-based**: Strict read-only by default; explicit approval for writes and commands
- **Write restriction**: Cannot modify files in parent directories without permission
- **Sandboxing**: Optional Bash sandbox with filesystem and network isolation
- **Prompt injection protection**: Context-aware analysis, input sanitization, command blocklist
- **Trust verification**: Required for first-time codebase runs and new MCP servers
- **Checkpointing**: Every file edit reversible via snapshots

### Enterprise Security
- SSO (SAML, OIDC)
- SCIM provisioning
- RBAC (role-based access)
- Audit logs
- Managed settings (organization-wide policy enforcement)
- Usage analytics
- Server-managed settings (centralized configuration without device management)
- Compliance API
- HIPAA-ready offering
- Custom data retention controls

### Certifications
- SOC 2 Type 2
- ISO 27001
- Available at [Anthropic Trust Center](https://trust.anthropic.com/)

---

## Privacy & Data Processing

| Aspect | Consumer (Free/Pro/Max) | Commercial (Team/Enterprise/API) |
|--------|------------------------|----------------------------------|
| Data training | Opt-in/opt-out in privacy settings | Not used for training (unless Developer Partner Program) |
| Retention (training opted in) | 5 years | N/A |
| Retention (training opted out) | 30 days | 30 days (standard) |
| Zero Data Retention | N/A | Available for Enterprise |
| Local session storage | 30 days (configurable via `cleanupPeriodDays`) | 30 days (configurable) |

### Data Flow
- Prompts and outputs encrypted in transit via TLS 1.2+
- Encryption at rest: AES-256 (infrastructure-level)
- Telemetry: operational metrics (latency, reliability); does not include code or file paths
- Error reporting: via Sentry (encrypted TLS + AES-256 at rest)
- Both telemetry and error reporting opt-out available (`DISABLE_TELEMETRY`, `DISABLE_ERROR_REPORTING`)
- All non-essential traffic disabled with `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`

### Cloud Execution (Web Sessions)
- Isolated virtual machines per session
- Network access limited by default; configurable per domain
- GitHub credentials handled via secure proxy (never enter sandbox)
- Git push restricted to current working branch
- All operations logged for compliance/audit
- Automatic cleanup after session completion

---

## Limitations & Risks

| Limitation | Description | Impact |
|------------|-------------|--------|
| Internet required | No offline mode; requires API connectivity | Cannot work in air-gapped environments |
| Context window limits | Long sessions lose early context during compaction | Instructions may be lost; use CLAUDE.md for persistence |
| No local models | Cannot run without cloud API access | Latency dependent on network; cost per token |
| Write scope | Cannot write outside working directory without explicit permission | May require manual file moves for cross-project work |
| Hallucination risk | May generate incorrect code or misunderstand codebase | Requires human review of all changes |
| Cost accumulation | Token usage can be significant for complex tasks | Requires monitoring; spend controls recommended |
| Windows native limitations | Sandbox not supported on native Windows (requires WSL 2) | Reduced isolation on Windows without WSL |
| Remote actions irreversible | Commands affecting databases, APIs, deployments cannot be checkpointed | User responsible for reviewing commands with external side effects |

---

## Pricing

### Subscription Plans (Individual)

| Plan | Price | Claude Code Access | Notes |
|------|-------|-------------------|-------|
| Free | $0/month | Not included | — |
| Pro | $17/month (annual) / $20/month (monthly) | Included | Short coding sprints; Sonnet 4.6 + Opus 4.7 |
| Max 5x | $100/month | Included | 5x more usage than Pro |
| Max 20x | $200/month | Included | 20x more usage than Pro; power users |

### Team & Enterprise
- **Team**: Central billing, admin controls, SSO
- **Enterprise**: Full security suite (SCIM, audit logs, HIPAA, custom retention, zero data retention, compliance API)
- Contact sales for Enterprise pricing

### API (Console)
- Pay-per-token at standard Anthropic API pricing
- Auto-created "Claude Code" workspace for cost tracking on first login

### Fast Mode Pricing
- $30 / million input tokens
- $150 / million output tokens
- Available on consumption-based plans and via usage credits

Usage limits apply to all subscription plans.

---

## Usage Examples

### Installation
```bash
curl -fsSL https://claude.ai/install.sh | bash
cd your-project
claude
```

### Common Prompts
```
what does this project do?
fix the failing tests
add input validation to the user registration form
refactor the authentication module to use async/await
write unit tests for the calculator functions
commit my changes with a descriptive message
create a PR for this feature
```

### One-shot Query
```bash
claude -p "explain the folder structure"
```

### Continue Previous Session
```bash
claude -c    # continue most recent
claude -r    # resume picker
```

### Non-interactive (Headless)
```bash
claude -p "fix the build error in src/main.ts"
```

### Essential Commands

| Command | Purpose |
|---------|---------|
| `claude` | Start interactive mode |
| `claude "task"` | Run a one-time task |
| `claude -p "query"` | One-off query, then exit |
| `claude -c` | Continue most recent conversation |
| `claude -r` | Resume a previous conversation |
| `/model` | Switch model mid-session |
| `/clear` | Clear conversation history |
| `/compact` | Manually compact context |
| `/context` | Show context window usage |
| `/permissions` | Audit permission settings |
| `/help` | Show available commands |
| `Shift+Tab` | Cycle permission modes |
| `Esc` | Interrupt current action |

---

## Sources

All information sourced from official Anthropic documentation and product pages:

1. Claude Code Overview — https://code.claude.com/docs/en/overview
2. Claude Code Security — https://code.claude.com/docs/en/security
3. Claude Code Product Page — https://claude.com/product/claude-code
4. Claude Code How It Works — https://code.claude.com/docs/en/how-claude-code-works
5. Claude Code Data Usage — https://code.claude.com/docs/en/data-usage
6. Claude Code Advanced Setup — https://code.claude.com/docs/en/setup
7. Claude Code Quickstart — https://code.claude.com/docs/en/quickstart
8. Claude Pricing — https://claude.com/pricing
9. Claude Code Documentation Index — https://code.claude.com/docs/llms.txt
10. Anthropic Trust Center — https://trust.anthropic.com/

---

## Changelog

### [2025-05-23] Initial profile creation
- Created comprehensive profile from official documentation
- All data sourced from code.claude.com/docs, claude.com/product/claude-code, and claude.com/pricing
- Tool version as of May 2026 weekly release cycle
