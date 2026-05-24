# Augment Code

```yaml
name: "Augment Code"
description: >
  Augment Code is an AI coding platform that combines IDE agents, a terminal agent
  (Auggie), and the Cosmos cloud agent platform around a shared Context Engine.
  It indexes codebases in Augment's cloud, supports native and MCP-based tool access,
  and adds organization-level memory, automation, and governance controls for teams.
category: ide
logo: https://img.logo.dev/augmentcode.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | Augment Code |
| Alternative names | Auggie (terminal agent / CLI), Cosmos (cloud agent platform) |
| Vendor / Organization | Augment Computing, Inc. |
| Homepage | https://augmentcode.com |
| Documentation | https://docs.augmentcode.com |
| Changelog | https://augmentcode.com/changelog |
| Repository | [UNVERIFIED] No official public source repository was identified in the vendor sources checked. |
| First release date | 2025 (the vendor states “When we launched Augment Code in 2025”). |
| Current status | Commercially available product with paid plans; several capabilities remain Public Beta, early access, or public preview. |
| Current version | [UNVERIFIED] Official documentation checked does not publish a single current product or extension version. |
| Last updated | [UNVERIFIED] The public changelog page checked exposes current entries but not a machine-readable release date for the latest release. |

---

## Classification

- **Primary category**: IDE Assistant
- **Secondary categories**: Coding Agent, CLI Tool, Automation Platform
- **Tool type**: Proprietary SaaS with local IDE/CLI clients and cloud or self-hosted agent execution options
- **Problem domain**: Software engineering assistance, codebase understanding, SDLC automation, code review
- **User interaction type**: IDE chat, IDE agent execution, terminal, web app, mobile, Slack, event triggers, MCP service
- **Automation type**: Assistive, agentic, and event-driven automation

---

## Summary

- **One-sentence description**: Augment Code is an IDE-first coding platform that combines codebase indexing, agentic editing, model selection, and cloud workflow automation.
- **Extended description**: In editor clients, Augment provides Chat, Agent, Agent Auto, workspace indexing, MCP access, and optional code completions. In Cosmos, it adds cloud sessions, reusable Experts, shared files, triggers, and integrations so teams can run agent workflows across pull requests, tickets, Slack, and schedules.
- **Core value proposition**: Shared codebase understanding and team context across IDE, CLI, and cloud agent surfaces.
- **Primary problem solved**: Reducing the amount of manual context gathering, repetitive implementation work, and cross-tool switching required for software delivery.
- **Key differentiator**: Augment exposes both local and remote Context Engine retrieval, plus organization-scoped files and cloud Experts that persist knowledge across sessions.
- **Target users**: Individual developers, small teams, and enterprise engineering organizations operating across multiple repositories and tools.
- **Primary usage context**: Feature implementation, issue-driven development, PR review, codebase exploration, and event-driven software workflow automation.

---

## Use Cases

### Primary Use Cases

| Use case | Description | Maturity |
|----------|-------------|----------|
| Multi-file implementation | Agent can create, edit, and delete code across a workspace and use terminal and MCP tools to complete a task. | GA |
| Codebase exploration | Chat and Quick Ask Mode support code understanding, debugging, and architectural questions using indexed workspace context. | GA |
| Issue-to-PR workflow | GitHub, Linear, and Jira integrations support issue lookup, implementation, and pull request creation from the IDE. | GA |
| Cloud SDLC automation | Cosmos can trigger Experts from GitHub, Slack, Linear, PagerDuty, webhooks, and cron schedules. | Public preview / GA by feature |

### Secondary Use Cases

| Use case | Description | Maturity |
|----------|-------------|----------|
| Code review | Augment Code Review comments on PRs; Enterprise adds analytics, user allowlists, MCP context, multi-org support, and unlimited seats/repos. | GA |
| Cross-repo understanding | Workspace Context and remote Context Engine retrieval support multiple repos and default-branch retrieval. | GA |
| Team knowledge handoff | Cosmos organization-scoped Files persist outputs for later sessions and other team members. | GA |
| Credit and adoption monitoring | Analytics dashboards and credit budgets expose team usage and model/activity breakdowns. | GA |

### Example Workflows

- “Implement Issue #123 and open up a pull request” (GitHub integration)
- “Fix TES-1” (Linear integration)
- “Create a PR to fix SOF-123” (Jira integration)
- “Find the latest failed pipeline on my branch and surface the failing tests.” (Easy MCP / CircleCI example)
- “Search Glean for past related incidents and how they were resolved” (enterprise early access Glean integration)

---

## Features

### Core Features

| Feature | Description | Plan availability | Status | Source |
|---------|-------------|-------------------|--------|--------|
| Agent | Executes end-to-end development tasks in the IDE, including file edits, terminal commands, and MCP/native integrations. | Paid plans | Stable | `using-augment/agent.md` |
| Chat | Conversational code exploration with workspace context and focused context attachment. | Paid plans | Stable | `using-augment/chat.md`, `using-augment/chat-context.md` |
| Workspace indexing | Automatically uploads the workspace to Augment's secure cloud for indexing; `.gitignore` and `.augmentignore` control scope. | Paid plans | Stable | `setup-augment/workspace-indexing.md` |
| Workspace Context | Adds additional folders or repositories to improve system-wide context. | VS Code, CLI, Vim/Neovim | Stable | `feature-availability.md`, `setup-augment/workspace-context-vscode.md` |
| Checkpoints | Automatic workspace snapshots during Agent execution with revert support. | IDE Agent | Stable | `using-augment/agent.md` |
| Rules & Guidelines | User, workspace, and hierarchical `AGENTS.md` / `CLAUDE.md` guidance files shape Agent and Chat behavior. | CLI, VS Code, JetBrains | Stable | `setup-augment/guidelines.md` |
| Model picker | Lets users select the active model per workspace in the IDE, or by slash command / flag in CLI. | Paid plans | Stable | `models/available-models.md` |
| Native integrations | GitHub, Linear, Jira, Confluence, Notion, Sentry, and Stripe can be connected from the editor. | Varies by integration | Stable / plan-limited | `setup-augment/agent-integrations.md` |
| Code Review | AI code review for GitHub pull requests; credits can be used for Code Review on all paid plans, with additional enterprise controls documented separately. | All paid plans | Stable | `augmentcode.com/pricing`, `docs.augmentcode.com/codereview/enterprise-features.md` |

### Advanced Features

| Feature | Description | Plan availability | Status | Source |
|---------|-------------|-------------------|--------|--------|
| Cosmos cloud sessions | Cloud agents launched and monitored from the web app, phone, or Slack. | Paid plans | Stable / preview by surface | `feature-availability.md`, `cosmos/getting-started.md`, `cosmos/open-sessions.md` |
| Experts and automations | Reusable cloud agent templates with triggers, capabilities, and environments. | Cosmos-enabled plans | Stable / preview by feature | `cosmos/getting-started.md`, `cosmos/automations.md` |
| Shared Files | User- and organization-scoped persistent files synchronized between sessions. | Cosmos | Stable | `cosmos/understanding-files.md` |
| Context Engine MCP | Exposes Augment retrieval to third-party agents through local stdio or remote HTTP MCP. | Paid plans | Stable | `context-services/mcp/overview.md` |
| Prism model routing | Routes each user turn across a model family with cache-aware switching. | Paid plans with supported models | Stable | `models/available-models.md`, Prism blog |
| Analytics and budgets | Credit dashboards, budgets, per-user usage views, and analytics APIs expose adoption and credit-consumption data. | Enterprise | Stable | `analytics/overview.md`, `analytics/credit-dashboard-and-quotas.md` |
| Secrets Manager | Stores and injects credentials into Cosmos VMs; secrets are encrypted on disk and stripped from logs. | Cosmos | Stable | `cosmos/config-secrets.md` |

### Beta / Early Access / Deprecated Features

| Feature | Description | Plan availability | Status | Source |
|---------|-------------|-------------------|--------|--------|
| Message Queue | Queue follow-up agent messages while the current request is still running. | VS Code 0.789.0+, JetBrains 0.428.8+ | Public Beta | `using-augment/message-queue.md` |
| Custom Commands | User-defined slash commands stored as Markdown files. | VS Code 0.789.0+, JetBrains 0.428.8+ | Public Beta | `using-augment/custom-commands.md`, `jetbrains/using-augment/custom-commands.md` |
| Skills | Reusable `SKILL.md` packages following agentskills.io. | VS Code 0.789.0+, JetBrains 0.428.8+, CLI | Public Beta in IDE; stable in CLI docs | `using-augment/skills.md`, `jetbrains/using-augment/skills.md`, `cli/skills.md` |
| Custom subagents | Feature matrix marks custom subagents as Beta in VS Code and JetBrains. | VS Code, JetBrains, CLI | Beta in IDEs | `feature-availability.md`, `cli/subagents.md` |
| Glean integration | Enterprise-only integration for internal search. | Enterprise | Early access | `setup-augment/agent-integrations.md` |
| Easy MCP | One-click setup for CircleCI, MongoDB, and Redis MCP integrations. | JetBrains extension | Available; launched July 30, 2025 | `jetbrains/setup-augment/mcp.md` |
| Code completions on non-enterprise plans | Completions and Next Edit were sunset on Mar 31, 2026 for Indie, Standard, Max, and Legacy plans. | Enterprise only after 2026-03-31 | Deprecated / plan-restricted | `feature-availability.md`, completions docs, changelog post |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| Visual Studio Code extension | VS Code | Agent, Chat, MCP, indexing, Workspace Context, Rules, optional beta features |
| JetBrains plugin | JetBrains IDEs | Requires JetBrains IDE version 2024.3 or above |
| Vim / Neovim integration | Vim and Neovim | Feature matrix documents Chat, codebase indexing, Workspace Context, and Enterprise completions; Agent is not available |
| Auggie CLI | Terminal | Interactive agent, print mode, MCP server mode, ACP mode, automation support |
| Cosmos web app | Browser | Start and monitor cloud sessions, manage Experts, environments, files, automations |
| Mobile access | Phone browser / mobile surface | Docs state Cosmos sessions are accessible from phone |
| Slack surface | Slack workspace | `@Augment` can trigger Experts and receive outputs in threads |
| Context Engine MCP | External MCP clients | Makes Augment retrieval available to external agents |

### Supported editor/platform notes

- **VS Code**: install from the Visual Studio Code Marketplace.
- **JetBrains**: compatible with JetBrains IDEs including WebStorm, PyCharm, and IntelliJ; requires version `2024.3+`.
- **OS references in docs**: Augment documents macOS and Windows/Linux keyboard shortcuts for editor features, but a standalone OS support matrix was not published in the sources checked.

### Commands and slash commands

| Command / pattern | Where | Purpose |
|-------------------|-------|---------|
| `/review` | IDE custom commands | Invoke a reusable slash command defined in `.augment/commands/` |
| `/fix-issue 123` | IDE custom commands | Pass arguments into a custom command |
| `/frontend:component` | IDE custom commands | Namespace commands by subdirectory |
| `/<skill-name>` | CLI | Invoke a loaded skill directly |
| `/skills` | CLI | Browse loaded skills |
| `/model` | CLI | Change models |
| `/agents` | CLI | Create and manage subagents |
| `auggie --print "…"` | CLI | One-shot non-interactive execution |
| `auggie --mcp` / `auggie --acp` | CLI | Run as MCP server or ACP agent |

---

## Operating Modes

| Mode | Description | When to use | Autonomy level |
|------|-------------|-------------|----------------|
| Chat | Conversational, read-heavy interaction with workspace context. | Code explanation, debugging, API/library questions | Low |
| Agent | IDE agent that can edit files but pauses before terminal commands or external integrations. | Day-to-day implementation with approval checkpoints | Medium |
| Agent Auto | Agent edits files, executes terminal commands, and uses tools automatically. | Faster end-to-end task execution when direct supervision is not required for each step | High |
| Quick Ask Mode | Read-only mode that restricts the AI to retrieval and information gathering. | Researching the codebase without modifying it | Low |
| Cosmos Session | Cloud session with an Environment and optionally an Expert. | Remote work, shared review, mobile or Slack access | High |
| Automation | Triggered execution from GitHub, Slack, Linear, PagerDuty, schedules, or webhooks. | Background SDLC workflows | Autonomous |
| Context Engine MCP — Local | Local stdio server over the working directory, indexed in real time. | Active development and local edits | Medium |
| Context Engine MCP — Remote | Augment-hosted HTTP server over selected default branches. | Cross-repo understanding, CI, server-side retrieval without a local tree | Medium |

---

## Architecture & Mechanisms

### Context Engine

Augment's Context Engine is documented as maintaining:

- semantic understanding rather than keyword-only search
- relationship awareness across files, repos, services, and architectures
- indexing beyond code, including commit history, codebase patterns, external sources, and organizational knowledge
- smart curation that retrieves only the slice of context needed for the task

### Local vs remote retrieval

| Aspect | Local | Remote |
|--------|-------|--------|
| Best for | Active development and making edits | Adding to or understanding an existing codebase; cross-repo context; CI/server environments |
| What is indexed | Working directory in real time | Selected repositories' default branches via the Augment GitHub App |
| Update behavior | Picks up local file changes immediately | Updates automatically when commits are pushed to the default branch |
| Setup | Run Auggie CLI locally as an MCP server | Configure Augment-hosted Context Engine via app.augmentcode.com |

### Workspace indexing behavior

- Opening a workspace with Augment enabled triggers automatic upload of the codebase to Augment's secure cloud.
- `.gitignore` and `.augmentignore` determine what is or is not indexed.
- `.augmentignore` can override `.gitignore` exclusions by prefixing patterns with `!`.
- The vendor states indexing usually takes less than a minute, with longer times possible for larger codebases.

### Shared team context and memory

Cosmos Files provides two persistent scopes:

| Scope | Visibility | Notes |
|-------|------------|-------|
| User | Private to the user | Session outputs remain available to the same user |
| Organization | Shared across the organization | Intended for team knowledge and agent handoff |

Additional documented mechanics:

- sync occurs automatically at turn boundaries
- every write creates an immutable version snapshot
- files are attributed to the agent that wrote them
- limits are **1 MB per file**, **10,000 files per filesystem**, and **100 MB total per filesystem**

### Agent environments

Cosmos supports both **Self-hosted** and **Cloud** execution. The cloud quickstart documents base environments such as **Ubuntu 24.04 with Python 3.12 and Node.js 22**, plus TypeScript 6.0, Go 1.24, PHP 8.4, Ruby 3.4, and Rust 1.95 images.

### Model routing with Prism

- **Prism (Claude + Gemini)** routes between **Claude Opus 4.7**, **Claude Sonnet 4.6**, and **Gemini 3.0 Flash**.
- **Prism (GPT + Kimi)** routes between **GPT-5.5**, **GPT-5.4**, and **Kimi K2.6**.
- Augment states Prism is designed to cost, on average, **20–30% less** than frontier model costs.
- In one week of production traffic cited by Augment, Prism's planner ran on about **4%** of chat-host turns, with **p50 2.6 s**, **p90 4.0 s**, and **p99 5.4 s** latency when it fired.

### Undisclosed technical details

- **Context window**: [UNVERIFIED] Not publicly disclosed in the official sources checked.
- **Input/output token limits**: [UNVERIFIED] Not publicly disclosed in the official sources checked.
- **Exact embedding/index implementation**: [UNVERIFIED] Public sources describe behavior, not implementation details.

---

## Tool Capabilities

| Capability | Available | Scope / notes | Control mechanism |
|------------|-----------|---------------|-------------------|
| File reading | Yes | Workspace files, added source folders, remote/default-branch retrieval via Context Engine, Cosmos Files | Workspace selection, indexing scope, Quick Ask Mode |
| File editing | Yes | Agent can create, edit, and delete code across the workspace | Diff review, checkpoints, Agent vs Agent Auto |
| Command execution | Yes | IDE Agent can use the terminal; Cosmos Experts run in environments/VMs; CLI supports process tools | Manual approval in Agent, automatic execution in Agent Auto, CLI `toolPermissions` |
| Code execution | Yes | Local shell execution and cloud VM execution are documented | Environment choice, tool permissions, sandboxed VMs |
| Internet / external system access | Yes | Native integrations, webhooks, Slack, GitHub API, MCP servers, CLI web tools | Capability toggles, integration auth, MCP config, approvals/policies |
| API usage | Yes | GitHub REST API wrapper, Slack methods, Linear/Jira/Confluence/Notion/Sentry/Stripe integrations | Connected integrations, capability assignment |
| Pull request creation | Yes | GitHub integration and PR Author workflow support issue-to-PR flows | GitHub App/OAuth authorization |
| Read-only research mode | Yes | Quick Ask Mode restricts the AI to read-only tools | User toggle in agent UI |
| Shared organizational memory | Yes | Cosmos organization Files are readable across the organization | File scope selection |

### Approval logic

- In **Agent**, Augment pauses before terminal commands and external integrations; the user reviews and resumes execution.
- In **Agent Auto**, file edits, terminal commands, and tools such as MCP servers execute automatically.
- In **Auggie CLI**, tool permissions can be set to `allow`, `deny`, or `ask-user`; non-interactive `ask-user` defaults to deny.

---

## Agent Tool Primitives

Source basis: Auggie CLI `Tool Permissions` reference and MCP Tool Search documentation.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `view` | Read file contents | Configurable | CLI permission name |
| `str-replace-editor` | Edit existing files with find/replace | Configurable | CLI permission name |
| `save-file` | Create or overwrite files | Configurable | CLI permission name |
| `remove-files` | Delete files from the filesystem | Configurable | CLI permission name |
| `codebase-retrieval` | Search the codebase with the Context Engine | Configurable | CLI permission name |
| `grep-search` | Regex file search | Configurable | CLI permission name |
| `launch-process` | Execute shell commands and scripts | Configurable | CLI permission name |
| `read-process` | Read output from running processes | Configurable | CLI permission name |
| `write-process` | Send input to running processes | Configurable | CLI permission name |
| `list-processes` | List active processes | Configurable | CLI permission name |
| `kill-process` | Terminate running processes | Configurable | CLI permission name |
| `github-api` | GitHub API operations | Configurable | CLI permission name; Cosmos also exposes `github-api` / `github-app-api` |
| `linear` | Linear issue tracking operations | Configurable | CLI permission name |
| `notion` | Notion workspace access | Configurable | CLI permission name; Notion integration is read-only in editor docs |
| `supabase` | Supabase database operations | Configurable | CLI permission name |
| `web-search` | Web search queries | Configurable | CLI permission name |
| `web-fetch` | Fetch web page content | Configurable | CLI permission name |
| `find-tool` | Search MCP tools without loading every schema into context | Automatic when enabled | Meta-tool for MCP Tool Search |
| `execute-tool` | Invoke the MCP tool selected by `find-tool` | Underlying tool permissions still apply | Meta-tool for MCP Tool Search |

**Note:** the CLI documentation explicitly states that `toolPermissions` configuration applies to Auggie CLI and not to the Augment code extension.

---

## Integrations

### Native integrations

| Integration | Type | What it enables | Notes |
|-------------|------|-----------------|-------|
| GitHub | Native | Issues, PRs, CI status, PR creation, GitHub triggers, GitHub API tool | Supports GitHub App and user OAuth modes in Cosmos |
| Linear | Native | Read/update/resolve issues and trigger workflows from issue events | Available in IDE and Cosmos |
| Jira | Native | Read/update issues and create tickets | IDE integration; Cosmos can also connect via webhook/MCP workflows |
| Confluence | Native | Query and update documentation pages | IDE integration |
| Notion | Native | Search and retrieve workspace knowledge | Documented as read-only |
| Sentry | Enhanced native integration | Search issues, errors, traces, logs, releases, RCAs, and AI-generated fixes with Seer integration | Introduced July 30, 2025 |
| Stripe | Enhanced native integration | Payment events, refunds, subscription metrics, tokenization | Available via remote and local MCP; OAuth MCP in public preview |
| Slack | Native | Slack bot surface, channel triggers, message posting, reactions, thread replies | Tenant-scoped bot token |
| Glean | Native | Internal enterprise search and knowledge retrieval | Enterprise-only early access |

### MCP integrations

| Integration path | Type | Notes |
|------------------|------|-------|
| Manual MCP server config | MCP | Supports stdio, SSE, and HTTP transports; configured in settings |
| Easy MCP | MCP convenience layer | One-click integrations for CircleCI, MongoDB, and Redis in JetBrains |
| Context Engine MCP | MCP service | Makes Augment retrieval available in third-party agents such as Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot, Kiro, Roo Code, and Zed |
| MCP Tool Search | MCP optimization | Hides full tool schemas and uses `find-tool` / `execute-tool` meta-tools |

### Automation / trigger integrations

| Source | Trigger support |
|--------|-----------------|
| GitHub | `pull_request`, `pull_request_review`, `issues`, `issue_comment`, `push`, `workflow_run`, and related events |
| Slack | `app_mention`, `message` |
| Linear | Issue and comment events |
| PagerDuty | Incident events |
| Scheduled | 5-field cron expressions |
| Webhook | Tenant-scoped custom webhook endpoints with JSONLogic filtering |

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | Claude Haiku 4.5, Claude Opus 4.5, 4.6, 4.7, Claude Sonnet 4, 4.5, 4.6, Gemini 3.1 Pro, GPT-5.1, GPT-5.2, GPT-5.4, GPT-5.5, Kimi K2.6, Prism (Claude + Gemini), Prism (GPT + Kimi) |
| Models publicly disclosed | Yes |
| User model selection | Yes — IDE model picker, CLI `/model`, or `--model` |
| Proprietary models | Partially — Prism uses an Augment routing layer with an undisclosed planner model [UNVERIFIED for planner model identity] |
| External models | Anthropic, Google, OpenAI, Moonshot AI (Kimi K2.6 hosted on Fireworks and Baseten) |
| Local models | [UNVERIFIED] No official local-model offering was documented in the sources checked. |
| Image inputs | Yes — IDE Agent supports image attachments and CLI supports `--image`; model-by-model multimodal support is not publicly enumerated. |
| Context window | [UNVERIFIED] Not publicly disclosed. |
| Token limits | [UNVERIFIED] Not publicly disclosed. |
| Latency | Prism planner: mean/p50 about 2.6 s, p90 4.0 s, p99 5.4 s on turns where it runs. |
| Processing region | Default service settings store and process personal information in the United States. |
| Training on user data | Customer Code and Output are never used to train models; paid plans state “No AI training allowed.” |

Information status: **partially confirmed**

---

## Permissions & Security

- **Customer code and output** are treated as customer confidential information under the enterprise and professional terms.
- **Model training policy**: customer code and output are never used to train models.
- **Access restriction**: the company states it may not review customer code or output except for feedback review or with express permission to provide support.
- **Authorization architecture**: Augment describes a **Proof-of-Possession API** intended to ensure completions operate only on locally possessed code.
- **Isolation / deployment controls**: homepage and security pages list **VPC deployment**, **single-tenant instances**, **on-prem deployment**, and **sandboxed agent execution**.
- **Key management**: homepage and security pages list **CMEK encryption** and **BYOK for models**.
- **Identity / admin controls**: homepage lists **SAML / OIDC / SCIM**, **granular RBAC**, and **audit logs + SIEM**.
- **Compliance claims on official pages**: **SOC 2 Type II**, **ISO/IEC 42001**, **GDPR**, **CCPA**, **HIPAA**, and **BAA available**.
- **Secrets handling**: Cosmos Secrets Manager stores values write-only, encrypts them on disk, strips them from logs, and can auto-export them into VMs.
- **Availability SLA**: official SLA states **99.5%** availability measured over a calendar month, with termination rights if breached in specified periods.

---

## Privacy & Data Processing

- **What data is transmitted**:
  - workspace code is uploaded to Augment's secure cloud when workspace indexing is enabled
  - customer code, user commands, and output are used to provide the solution
  - privacy policy lists contact data, account data, communications data, user-generated content data, device data, and online activity data
- **Where data is processed**: under default service settings, personal information and other information sent to the service are stored and processed in the **United States**
- **Third-party model providers**: if customer code or output is shared as context to third-party model providers, Augment states that use is subject to terms at least as protective as its own agreement terms
- **Retention**: personal data is retained only as long as necessary to provide the service, comply with legal obligations, resolve disputes, or enforce agreements, then deleted or anonymized
- **Training policy**: paid plans and contractual terms state no AI training on customer code/output
- **Deletion / rights**: privacy policy documents rights to correct, delete, port, stop processing, or object to processing personal information
- **Subprocessors / DPA**: the privacy policy says details about subprocessors or DPAs are available by contacting Augment
- **Privacy policy URL**: https://augmentcode.com/legal/privacy-policy

---

## Limitations & Risks

| Limitation / risk | Description | Impact |
|-------------------|-------------|--------|
| Cloud indexing requirement | Workspace indexing uploads the codebase to Augment's cloud. | Relevant for organizations with strict data-boundary requirements. |
| Remote indexing scope | Remote Context Engine indexes selected repositories' default branches and updates on pushes to the default branch. | Branch-specific or unpushed work is not represented in remote retrieval. |
| Feature gating by plan | Completions are Enterprise-only after 2026-03-31; some integrations and features are Enterprise-only or early access. | Teams may need higher tiers for legacy completions or enterprise integrations. |
| Beta / preview instability | Message Queue, custom commands, skills, custom subagents, Cosmos public-preview features, and early-access integrations are not documented as fully GA. | Behavior, UX, or availability may change. |
| MCP compatibility | JetBrains MCP docs state not all MCP servers are compatible with Augment's models. | Some external tool setups may require testing or fallback approaches. |
| Filesystem limits | Cosmos Files enforces 1 MB per file, 10,000 files per filesystem, and 100 MB total per filesystem. | Shared-memory patterns must stay within documented limits. |
| Usage-cost variability | Model cost varies by model, task complexity, context size, and response length; Context Engine MCP queries average 40–70 credits and Cosmos Sandboxes cost 300 credits/hour prorated. | Operating cost can rise quickly for high-volume or long-running workflows. |
| Trial / beta SLA exclusion | Trials and beta use are excluded from the SLA and support commitments. | Preview deployments carry reduced contractual guarantees. |
| Public spec gaps | Current extension version, context window size, and token limits were not publicly disclosed in the sources checked. | Capacity planning requires vendor confirmation. |

---

## Pricing

| Plan | Price | Included credits | Seat / user limit | Notable differences |
|------|-------|------------------|-------------------|---------------------|
| Indie | **$20/month** | **40,000** | Up to **1 user** | Cosmos, Context Engine, MCP & Native Tools, SOC 2 Type II, no AI training allowed |
| Standard | **$60/month per developer** | **130,000** | Up to **20 users** | Everything in Indie |
| Max | **$200/month per developer** | **450,000** | Up to **20 users** | Everything in Standard |
| Enterprise | Custom | Custom | Unlimited users | Custom pricing/credits, Slack integration, SSO/OIDC/SCIM, CMEK, ISO 42001, dedicated support |

### Pricing notes

- **Auto top-up**: **$15 / 24,000 credits** on Indie, Standard, and Max.
- **Credits are pooled at the team level**.
- **Top-up credits validity**: **12 months** from purchase.
- **Illustrative credit usage**:
  - a small task using **10 tool calls** costs around **300 credits**
  - a complex task using **60 tool calls** costs around **4,300 credits**
- **Support by plan**:
  - Indie and Standard: community + support portal
  - Max: Standard support plus email-based support
  - Enterprise: dedicated support with SLA coverage
- **Code Review** is available on all plans; Enterprise Code Review adds analytics, user allowlists, MCP configuration, multi-org support, and unlimited seats/repos.

---

## Usage Examples

### Example: issue-to-PR workflow from the IDE

```text
Implement Issue #123 and open up a pull request
```

Purpose: use the GitHub integration to read an issue, make code changes, and open a PR.

### Example: Linear-driven implementation

```text
Fix TES-1
```

Purpose: pull ticket context from Linear and execute the requested change.

### Example: custom slash command in the IDE

```markdown
---
description: Review code for bugs, security issues, and best practices
argument-hint: <file or description>
---

Review the following code carefully. Check for:
1. Bugs and logic errors
2. Security vulnerabilities
3. Performance issues
4. Adherence to project conventions

$ARGUMENTS
```

Usage:

```text
/review src/payment.ts
```

### Example: CLI one-shot execution with queued follow-ups

```bash
auggie --print --queue "Write tests" --queue "Summarize remaining risks" "Fix the bug"
```

Purpose: run a non-interactive agentic task with sequential follow-up instructions.

### Example: indexing scope control

```bash
# .augmentignore
!node_modules
.env
build
```

Purpose: include a normally `.gitignore`d dependency folder while excluding secrets and build artifacts from indexing.

---

## Sources

All information below was taken from official Augment vendor sources checked during profile creation.

1. Product homepage — https://augmentcode.com
2. Pricing — https://augmentcode.com/pricing
3. Security — https://augmentcode.com/security
4. Legal index — https://augmentcode.com/legal
5. Privacy Policy — https://augmentcode.com/legal/privacy-policy
6. Enterprise Terms of Service — https://augmentcode.com/legal/enterprise-terms-of-service
7. Professional Terms of Service — https://augmentcode.com/legal/professional-terms-of-service
8. SLA and Support Policy — https://augmentcode.com/legal/sla-and-support-policy
9. Changelog — https://augmentcode.com/changelog
10. Changelog: planned March 31 sunset for Next Edit and Completions — https://augmentcode.com/changelog/planned-march-31-sunset-for-next-edit-and-completions
11. Blog: Cosmos now in public preview — https://augmentcode.com/blog/cosmos-now-in-public-preview
12. Blog: Prism model routing — https://augmentcode.com/blog/augment-prism-model-routing-to-reduce-cost-and-maintain-quality
13. Blog: Auggie vs Claude Code benchmark — https://augmentcode.com/blog/auggie-beats-claude-code-on-cost-and-quality
14. Docs index — https://docs.augmentcode.com/llms.txt
15. Docs introduction — https://docs.augmentcode.com/introduction.md
16. Feature availability — https://docs.augmentcode.com/feature-availability.md
17. Available models — https://docs.augmentcode.com/models/available-models.md
18. Credit-based pricing — https://docs.augmentcode.com/models/credit-based-pricing.md
19. VS Code install — https://docs.augmentcode.com/setup-augment/install-visual-studio-code.md
20. Workspace indexing — https://docs.augmentcode.com/setup-augment/workspace-indexing.md
21. Workspace Context (VS Code) — https://docs.augmentcode.com/setup-augment/workspace-context-vscode.md
22. Agent integrations — https://docs.augmentcode.com/setup-augment/agent-integrations.md
23. Rules & Guidelines — https://docs.augmentcode.com/setup-augment/guidelines.md
24. IDE Agent — https://docs.augmentcode.com/using-augment/agent.md
25. IDE Chat — https://docs.augmentcode.com/using-augment/chat.md
26. IDE Chat Context — https://docs.augmentcode.com/using-augment/chat-context.md
27. IDE Custom Commands — https://docs.augmentcode.com/using-augment/custom-commands.md
28. IDE Tasklist — https://docs.augmentcode.com/using-augment/tasklist.md
29. Message Queue — https://docs.augmentcode.com/using-augment/message-queue.md
30. IDE Skills — https://docs.augmentcode.com/using-augment/skills.md
31. VS Code / JetBrains Completions — https://docs.augmentcode.com/using-augment/completions.md
32. JetBrains install — https://docs.augmentcode.com/jetbrains/setup-augment/install-jetbrains-ides.md
33. JetBrains MCP — https://docs.augmentcode.com/jetbrains/setup-augment/mcp.md
34. JetBrains Custom Commands — https://docs.augmentcode.com/jetbrains/using-augment/custom-commands.md
35. JetBrains Skills — https://docs.augmentcode.com/jetbrains/using-augment/skills.md
36. JetBrains Chat Context — https://docs.augmentcode.com/jetbrains/using-augment/chat-context.md
37. JetBrains Completions — https://docs.augmentcode.com/jetbrains/using-augment/completions.md
38. CLI integrations and MCP — https://docs.augmentcode.com/cli/integrations.md
39. CLI tool permissions — https://docs.augmentcode.com/cli/permissions.md
40. CLI skills — https://docs.augmentcode.com/cli/skills.md
41. CLI subagents — https://docs.augmentcode.com/cli/subagents.md
42. CLI reference — https://docs.augmentcode.com/cli/reference.md
43. Analytics overview — https://docs.augmentcode.com/analytics/overview.md
44. Credit dashboards & budgets — https://docs.augmentcode.com/analytics/credit-dashboard-and-quotas.md
45. Code Review Enterprise features — https://docs.augmentcode.com/codereview/enterprise-features.md
46. Context Engine MCP — https://docs.augmentcode.com/context-services/mcp/overview.md
47. Cosmos getting started — https://docs.augmentcode.com/cosmos/getting-started.md
48. Cosmos open sessions — https://docs.augmentcode.com/cosmos/open-sessions.md
49. Cosmos Files — https://docs.augmentcode.com/cosmos/understanding-files.md
50. Cosmos configuration — https://docs.augmentcode.com/cosmos/configuring-cosmos.md
51. Cosmos GitHub integration — https://docs.augmentcode.com/cosmos/config-github.md
52. Cosmos Slack integration — https://docs.augmentcode.com/cosmos/config-slack.md
53. Cosmos Secrets Manager — https://docs.augmentcode.com/cosmos/config-secrets.md
54. Cosmos automations — https://docs.augmentcode.com/cosmos/automations.md

---

## Changelog

### [2026-05-24] Initial profile creation
- Created initial Augment Code profile from official Augment product pages, documentation, changelog, legal pages, and official blog posts.
- Captured current paid-plan pricing, model list, Context Engine behavior, Cosmos automation features, and documented beta / deprecated feature states.
- Marked undisclosed version, context-window, and token-limit details as `[UNVERIFIED]` rather than inferring values.
