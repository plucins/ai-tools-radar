# Kiro
```yaml
name: "Kiro"
description: >
  Kiro is an agentic IDE that helps you go from prototype to production with spec-driven development. Official Kiro materials describe Specs, Hooks, and agentic chat as core capabilities, and note that Kiro is built on Code OSS with support for importing VS Code settings and Open VSX-compatible plugins.
category: ide
logo: https://img.logo.dev/kiro.dev?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 21:08

| Field | Description |
|-------|-------------|
| Name | Kiro |
| Alternative names | [NO OFFICIAL DATA] |
| Vendor / Organization | Amazon Web Services (AWS) |
| Product owner | A small team within AWS |
| Homepage | https://kiro.dev |
| Documentation | https://kiro.dev/docs/ |
| Changelog | https://kiro.dev/changelog/ |
| Repository | https://github.com/kirodotdev/Kiro |
| First release date | 14-07-2025 (launch blog post; product described as free during preview) |
| Current status | Active commercial product; IDE and CLI are active, and Kiro Web is explicitly marked Preview |
| Current version | Surface-specific versions are documented independently: IDE `0.12`, CLI `2.4.0`, Web preview updated 19-05-2026 [NEEDS UPDATE for patch granularity] |
| Last updated | 20-05-2026 (latest retrieved changelog entry) |

---

## Classification

- **Primary category:** IDE
- **Secondary categories:** CLI; web coding agent; Code OSS-based code editor
- **Tool type:** Proprietary desktop IDE with related CLI and web surfaces
- **Problem domain:** Spec-driven software development, code generation, refactoring, debugging, and workflow automation
- **User interaction type:** Desktop editor UI, agent chat, task/spec UI, hooks, CLI, web agent
- **Automation type:** Assistive and semi-autonomous in the IDE; higher-autonomy workflows in hooks, parallel task execution, and Kiro Web autonomous mode

---

## Summary

- **One-sentence description:** Kiro is an AWS-built agentic development environment that combines editor workflows, specs, hooks, steering, MCP, and model routing.
- **Extended description:** Kiro turns prompts into structured requirements, design, and task artifacts before implementation. It also supports event-driven hooks, persistent steering files, MCP-based external tools, and multiple interfaces that share account usage and governance controls.
- **Core value proposition:** Move from prototype-oriented prompting to traceable implementation with explicit requirements, design artifacts, and execution tasks.
- **Primary problem solved:** Reducing ambiguity, undocumented decisions, and repetitive manual work in AI-assisted software delivery.
- **Key differentiator:** Official materials consistently position Specs and Hooks as the mechanism for adding structure and repeatable automation around agentic coding.
- **Target users:** Individual developers, software teams, and enterprise organizations adopting AI-assisted development.
- **Anti-target users:** Users seeking a minimal autocomplete-only editor or a fully offline/local-only toolchain with no cloud-connected account, model, or service controls.
- **Primary usage context:** Daily development in a desktop IDE, with optional CLI and browser-based continuation.

---

## Use Cases

### Primary use cases
- Turning a feature request into `requirements.md`, `design.md`, and executable tasks before code generation
- Refactoring or bug-fixing with explicit analysis, design, and regression-oriented tasking
- Running background automations such as test updates, documentation refreshes, and security checks through hooks
- Exploring and modifying a codebase with agent chat, MCP servers, steering files, and model selection

### Secondary use cases
- Enforcing workspace or organization conventions with `.kiro/steering/`, `~/.kiro/steering/`, and `AGENTS.md`
- Connecting external tools and APIs through MCP servers
- Delegating browser-based multi-repo work that ends in pull requests through Kiro Web
- Running terminal-centric workflows through Kiro CLI with built-in tools and subagents

### Example workflows
1. Prompt Kiro with `Add a review system for products`, review generated requirements, approve design, then execute linked implementation tasks.
2. Add a hook that updates tests or documentation when files are saved or created.
3. Store project conventions in `.kiro/steering/` so Kiro applies them at the start of each session.
4. In Kiro Web preview, select multiple repositories, let the agent work in an isolated sandbox, and open pull requests.

### Anti-patterns
- Treating supervised mode as a sandbox or security boundary; official docs say it is a review workflow, not an access-control mechanism.
- Assuming all models, interfaces, and features are available in all regions, plans, or authentication setups.
- Expecting preview web features to have full enterprise governance parity; official FAQ says MCP and other governance controls are not yet supported in Kiro Web preview.

---

## Features

### Core features

| Feature | Description | Status | Source |
|---|---|---|---|
| Specs | Structured spec workflow that breaks work into requirements, design, and tasks, with links between artifacts and execution tracking | Stable | https://kiro.dev/docs/specs/ |
| Hooks | Event-driven agent automations for file, tool, task, and manual triggers; actions include `Ask Kiro` and `Run Command` | Stable | https://kiro.dev/docs/hooks/ |
| Steering | Persistent workspace/global markdown context in `.kiro/steering/` and `~/.kiro/steering/`; `AGENTS.md` is also supported | Stable | https://kiro.dev/docs/steering/ |
| Agentic chat | Ad-hoc coding assistance with project context plus file, URL, and docs context providers | Stable | https://kiro.dev/blog/introducing-kiro/ |
| MCP support | Connects specialized servers that provide additional tools and context | Stable | https://kiro.dev/docs/mcp/ |
| Code OSS compatibility | Built on Code OSS; imports VS Code settings, themes, and Open VSX-compatible plugins | Stable | https://kiro.dev/blog/introducing-kiro/ ; https://kiro.dev/faq/ |

### Advanced features

| Feature | Description | Status | Source |
|---|---|---|---|
| Parallel task execution | `Run all Tasks` builds a dependency graph and runs independent task waves concurrently in isolated contexts | Stable | https://kiro.dev/changelog/ide/0-12/ ; https://kiro.dev/docs/specs/ |
| Quick Plan | Generates requirements, design, and tasks in one pass without approval gates | Stable | https://kiro.dev/changelog/ide/0-12/ |
| Analyze Requirements | Automated reasoning pass to catch ambiguities, conflicts, and gaps before design | Stable | https://kiro.dev/changelog/ide/0-12/ |
| Design-First and Bugfix Specs | Alternative spec workflows for architecture-first work and structured root-cause/fix planning | Stable | https://kiro.dev/changelog/ide/0-10/ ; https://kiro.dev/docs/specs/ |
| Document attachments | Chat supports PDF, CSV, DOC, DOCX, XLS, XLSX, HTML, TXT, and Markdown attachments; up to 5 documents per message | Stable | https://kiro.dev/changelog/ide/0-11/ |
| Enterprise MCP/model governance | IAM Identity Center admins can govern allowed MCP servers and approved model lists | Stable | https://kiro.dev/changelog/ide/0-11/ |

### Experimental / preview features

| Feature | Description | Status | Source |
|---|---|---|---|
| Kiro Web | Browser-based agent surface for multi-repo work, PR creation, and isolated cloud sandbox execution | Preview | https://kiro.dev/changelog/web/ |
| Knowledge tool | CLI built-in knowledge-base tool for cross-session storage/retrieval | Experimental | https://kiro.dev/docs/cli/reference/built-in-tools/ |
| Thinking tool | CLI built-in reasoning helper for breaking complex work into atomic actions | Experimental | https://kiro.dev/docs/cli/reference/built-in-tools/ |
| ToDo tool | CLI built-in task-tracking primitive for multi-step work | Experimental | https://kiro.dev/docs/cli/reference/built-in-tools/ |

---

## Interfaces

| Interface | Platform | Notes |
|---|---|---|
| Kiro IDE | macOS, Windows, Linux | Main editor product surface |
| Kiro CLI | macOS, Linux | Terminal interface with built-in tools and subagent support |
| Kiro Web | Browser | Preview surface at `app.kiro.dev` for Pro/Pro+/Power users |
| ACP-compatible IDEs | [NO OFFICIAL DATA on exact matrix in retrieved sources] | FAQ states Kiro subscriptions can also be used with ACP-compatible IDEs |

### Supported operating systems
- **IDE:** macOS, Windows, Linux
- **CLI:** macOS, Linux

### Notable commands / actions documented officially
- `Run all Tasks`
- `Quick Plan`
- `/rewind`
- `/effort`
- `/settings`
- Web review commands: `/kiro all`, `/kiro fix`

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Example |
|---|---|---|---|---|---|
| Interactive IDE chat | Conversational coding with project context | Day-to-day coding, exploration, edits | Medium | Subject to model choice and permissions | Ask Kiro to inspect code and propose a change |
| Specs workflow | Structured `requirements -> design -> tasks` flow | New features, refactors, bugfixes requiring traceability | Medium | Requires artifact review/approval unless using Quick Plan | Generate a feature spec before implementation |
| Hooks / background automation | Event-driven agent or command execution | Repetitive checks, docs/tests refresh, guardrails | Medium to High | Trigger-based; needs hook configuration | Run tests after a task or on file save |
| Autopilot mode | Changes are applied immediately while respecting trusted-command policy | Faster local execution in the IDE | Higher | No review step before applying file changes | Let the agent patch files directly |
| Supervised mode | Review diff hunks before accepting/rejecting changes | Higher-control editing and review | Medium | Not a sandbox or security control | Inspect and reject part of an agent-generated patch |
| Kiro Web collaborative mode | User drives the conversation and can request a PR when ready | Shared planning/coding in browser | Medium | Web preview only | Discuss approach, then ask for PR creation |
| Kiro Web autonomous mode | Agent asks clarifying questions, builds a plan, delegates, and opens a PR automatically | End-to-end browser-based tasks | High | Web preview only | Hand off a multi-repo change and wait for PR output |

---

## Architecture & Mechanisms

- **Spec-driven pipeline:** Kiro documents a three-artifact workflow: requirements/bug analysis, design, and executable tasks.
- **Task orchestration:** `Run all Tasks` builds a dependency graph and executes independent task waves concurrently; isolated contexts are explicitly documented.
- **Persistent context:** Steering files live in `.kiro/steering/` (workspace) or `~/.kiro/steering/` (global). `AGENTS.md` is supported and always included.
- **Hook engine:** Hooks are tied to file events, tool events, task execution events, agent turns, and manual triggers; actions are either agent prompts or shell commands.
- **External tool expansion:** MCP extends Kiro with specialized servers over `stdio`, SSE, and Streamable HTTP; OAuth configuration is documented for some HTTP servers.
- **Model routing:** `Auto` is described as a routing layer using a mix of frontier models and specialized models for intent detection, caching, and task specialization.
- **Editor base:** Kiro states that the IDE is built on Code OSS.
- **Web execution model:** Kiro Web runs each task in its own isolated sandbox, cloning selected repositories and tearing the environment down after completion.

---

## Tool Capabilities

| Capability | Official detail | Scope | Control mechanism |
|---|---|---|---|
| File reading | IDE and CLI agents can read project files; CLI `read` tool also reads folders and images | Local workspace and allowed paths | Path controls, steering, protected paths, tool settings |
| File editing | IDE agent and CLI `write` tool can create/edit files | Local workspace | Review flows, protected paths, path rules |
| Command execution | IDE agent can run commands under trusted-command policy; CLI `shell` tool executes bash commands | Local machine / workspace | Trusted commands, allowed/denied commands, supervised review |
| Web access | URL fetching and web search are documented; CLI exposes `web_search` and `web_fetch` | Public web only | Citations required for grounded output; page restrictions apply |
| External tools/APIs | MCP servers add tools and context | Systems exposed through configured MCP servers | MCP configuration, enterprise governance, auth policies |
| Background delegation | Hooks, CLI `delegate`, and subagents can offload work | IDE, CLI, Web | Hook config, background agent controls |
| Multi-repo PR work | Kiro Web can clone multiple repos, create branches/commits, and open PRs | GitHub-connected repositories | Sandbox settings, repo selection, preview feature scope |
| AWS operations | CLI `aws` tool performs AWS CLI service/operation calls | AWS accounts/regions in scope | Allowed/denied services, auth, region settings |

---

## Agent Tool Primitives

> Kiro publishes an official built-in tools reference for **Kiro CLI**. A separate IDE-only internal tool schema was not found in the retrieved official sources.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `read` | Reads files, folders, and images | Conditional | Stable; path access can be allowed/denied in tool settings |
| `glob` | Fast file discovery using glob patterns | Conditional | Stable; respects `.gitignore` |
| `grep` | Fast regex content search | Conditional | Stable; use instead of shell `grep`/`rg`/`ag` |
| `write` | Creates and edits files | Conditional | Stable; aliases `fs_write`, `fsWrite` |
| `shell` | Executes bash commands | Conditional | Stable; aliases `execute_bash`, `execute_cmd`; allowed/denied command rules supported |
| `aws` | Executes AWS CLI service operations | Conditional | Stable; aliases `use_aws`; allowed/denied services supported |
| `web_search` | Searches the public web | No explicit per-call prompt documented | Stable; part of web access section |
| `web_fetch` | Fetches content from a URL | No explicit per-call prompt documented | Stable; part of web access section |
| `introspect` | Answers questions about Kiro CLI using official built-in documentation | No | Stable; self-documentation tool |
| `code` | Symbol search, LSP integration, code search/rewriting | Conditional | Stable; no prompt inside current workspace, approval outside workspace |
| `tool_search` | Finds and loads MCP tools on demand | No | Stable; docs say it is automatically allowed because it is read-only |
| `delegate` | Sends work to background agents asynchronously | No explicit approval requirement documented | Stable |
| `report` | Opens a pre-filled GitHub issue/feature-request template | No explicit approval requirement documented | Stable |
| `knowledge` | Stores/retrieves information across sessions | [NO OFFICIAL DATA] | Experimental |
| `thinking` | Internal reasoning aid for breaking work into atomic actions | [NO OFFICIAL DATA] | Experimental |
| `todo` | Creates and manages ToDo lists | [NO OFFICIAL DATA] | Experimental |
| `session` | Temporarily overrides session-safe CLI settings | Yes for `set`/`reset` operations | Stable; overrides are in-memory only |
| `subagent` | Delegates parallel work to specialized subagents with isolated context | No explicit per-call prompt documented | Stable; custom agents must explicitly include it when needed |

---

## Integrations

### Native integrations
- **VS Code migration path:** imports VS Code settings and themes
- **Open VSX-compatible plugins:** supported because Kiro is built on Code OSS
- **CLI + IDE sharing:** Kiro CLI carries over steering files and MCP configurations from Kiro IDE

### MCP integrations
- **MCP servers:** official docs describe local (`stdio`) and remote (`SSE`, Streamable HTTP) server connectivity
- **HTTP MCP OAuth:** changelog documents `oauth.clientId` for HTTP MCP servers that do not support Dynamic Client Registration

### Git / platform integrations
- **GitHub in Kiro Web:** supports issue assignment by `kiro` label or `/kiro` comment, branch creation, commits, and PR opening
- **PR review loop in Web:** review comments can be addressed with `/kiro all` or `/kiro fix`

### Identity / enterprise integrations
- **Authentication surfaces:** GitHub, Google, AWS Builder ID, AWS IAM Identity Center
- **Enterprise identity:** IAM Identity Center, Okta, Microsoft Entra are documented for enterprise/GovCloud contexts

### Usage-scope integrations
- **ACP-compatible IDEs:** FAQ says subscriptions can be used with ACP-compatible IDEs
- **Automation in software development / CI-CD:** FAQ explicitly says subscriptions can be used for automation in software development such as reviews during CI/CD

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | `Auto`; Claude Opus 4.5/4.6/4.7; Claude Sonnet 4.0/4.5/4.6; Claude Haiku 4.5; DeepSeek 3.2; MiniMax M2.1/M2.5; GLM-5; Qwen3 Coder Next |
| Models publicly disclosed | Yes |
| User model selection | Yes |
| Proprietary models | `Auto` is a proprietary routing layer using a mix of frontier and specialized models |
| External models | Anthropic Claude family; DeepSeek; MiniMax; Zhipu GLM; Qwen |
| Local models | [NO OFFICIAL DATA] |
| Multimodal models | Yes; docs/changelog reference image and document handling plus model-specific vision support |
| Context window | 128K to 1M depending on model |
| Token limits | [NO OFFICIAL DATA beyond context-window values] |
| Latency | [NO OFFICIAL DATA] |
| Processing region | Retrieved model/docs sources reference us-east-1 and eu-central-1; enterprise docs also list GovCloud profile/console regions |
| Training on user data | Varies by auth/plan: certain Builder ID/social-login individual users may be used for service improvement; IAM Identity Center/external IdP Pro/Pro+/Power users are not |

**Information status:** partially confirmed; some pricing/free-tier model details conflict across official sources.

### Model-specific notes
- Official model docs list context windows and cost multipliers, including `1M` context for Claude Opus 4.7/4.6 and Claude Sonnet 4.6.
- FAQ says `Auto` uses a mix of frontier and specialized models for intent detection, caching, and related techniques.
- Pricing/FAQ conflict: pricing page structured data says Free includes open-weight models plus Claude Sonnet 4.5, while FAQ says Free includes open-weight models plus Claude Sonnet 4.6. Treat this as **[NEEDS UPDATE: conflicting official sources]**.

---

## Permissions & Security

- **Authentication methods:** GitHub, Google, AWS Builder ID, and AWS IAM Identity Center; GovCloud supports enterprise authentication via IAM Identity Center and external identity providers such as Okta and Microsoft Entra ID.
- **Local file access:** The agent can read and write files in both Autopilot and Supervised modes.
- **Command execution:** The agent can run commands in both Autopilot and Supervised modes, with trusted-command policy controls.
- **Protected paths:** Official privacy/security docs describe protected paths and trusted commands as the mechanism for restricting what the agent can access or modify.
- **Review flow:** Supervised mode adds a diff review/accept-reject step; Autopilot applies changes immediately.
- **Important limitation:** Official docs state that supervised mode is a code review workflow, **not** a sandbox, isolation boundary, or access-control mechanism.
- **Enterprise governance:** Retrieved sources document IAM Identity Center-based governance for MCP server allowlists and model availability.
- **Usage monitoring:** Enterprise admins can configure user activity reports; changelog notes model-specific message counts in daily user activity reports.
- **Infrastructure posture:** Enterprise page states Kiro is designed, built, and operated following the same security, governance, and encryption standards as AWS cloud infrastructure.
- **Region controls:** Enterprise docs describe supported regions and separate IAM Identity Center / Kiro profile region considerations.
- **Compliance validation:** Kiro docs point users to AWS Compliance Programs and AWS Artifact for third-party audit reports.

---

## Privacy & Data Processing

- **Privacy policy URL:** https://aws.amazon.com/privacy/
- **Terms / service terms:** https://aws.amazon.com/terms/ ; https://aws.amazon.com/service-terms/
- **What data may be processed:** Prompts, code/workspace context, attachments, and usage data associated with the chosen interface and account configuration.
- **Telemetry policy:** FAQ states Kiro does not collect telemetry from Pro/Pro+/Power users who access Kiro through AWS IAM Identity Center or an external identity provider; enterprise admins can still configure user activity reports.
- **Training / service-improvement policy:** FAQ states Kiro does not use content for service improvement for Pro/Pro+/Power users via IAM Identity Center/external IdP, or for Amazon Q Developer Pro users logging in with the same AWS credentials. Kiro may use certain content from Free-tier and individual subscribers using social login or AWS Builder ID for service improvement, with an opt-out mechanism documented officially.
- **Opt-out availability:** Yes; FAQ references an official opt-out mechanism in Kiro documentation.
- **Data storage / retention:** [NO OFFICIAL DATA specific to Kiro retention periods in retrieved sources]
- **Data deletion:** [NO OFFICIAL DATA]
- **Prompt logging visibility:** Enterprise admins can configure user activity reporting; retrieved sources do not publish a full prompt-log retention matrix.
- **Subprocessors / DPA:** [NO OFFICIAL DATA in retrieved sources]

---

## Limitations & Risks

- **Supervised mode is not a security boundary:** Official docs explicitly warn that it should not be treated as sandboxing or access control.
- **Plan and preview limits:** Kiro Web is preview-only for Pro/Pro+/Power users; free tier is not available in GovCloud and is not available in enterprise/GovCloud contexts.
- **Governance gaps in Web preview:** FAQ says MCP and other governance controls are not yet supported in Kiro Web preview.
- **Regional and provider constraints:** Model availability varies by country/region and by underlying model-provider requirements.
- **Pricing/model ambiguity:** Free-tier model details conflict between the pricing page structured data and FAQ (**[NEEDS UPDATE]**).
- **Version granularity:** Official sources retrieved expose surface-level versions and changelog waves, but not a complete unified product versioning scheme.
- **Web-access constraints:** Official CLI docs state web tools should not reproduce meaningful chunks of text and should not access paywalled or authenticated pages.
- **Organizational billing limitations:** FAQ says subscriptions and usage limits are per individual user; team billing and management features are described as coming soon.

---

## Alternatives

| Alternative | Alternative type | Advantage of Kiro | Advantage of alternative | When to choose alternative |
|---|---|---|---|---|
| VS Code | Direct editor alternative | Kiro adds Specs, Hooks, steering, agentic chat, and model/MCP workflows as first-class product features | Larger general editor ecosystem and neutral baseline editor workflow | Choose VS Code when AI-agent orchestration is not required or when standard editor workflows are preferred |
| Code OSS | Upstream editor base | Kiro adds AWS-operated agentic workflows, spec artifacts, hooks, and account-based model access | Simpler open editor base without Kiro-specific service coupling | Choose Code OSS when you want the underlying editor foundation without Kiro’s cloud-backed agent features |

---

## Usage Examples

### Example prompts / workflows

| Name | Purpose | Command / prompt | Expected output | Source |
|---|---|---|---|---|
| Feature spec generation | Turn a prompt into structured planning artifacts | `Add a review system for products` | Requirements with user stories and acceptance criteria, then design docs and linked tasks | https://kiro.dev/blog/introducing-kiro/ |
| Hook creation | Create a quality-control automation | `Anytime a component is added make sure it follow the single responsibility principle` | Kiro generates a hook configuration that monitors relevant folders and validates components | https://kiro.dev/blog/introducing-kiro/ |
| CLI installation | Install CLI from shell | `curl -fsSL https://cli.kiro.dev/install | bash` | Installs Kiro CLI | https://kiro.dev/downloads/ |
| Conversation rewind | Branch from an earlier CLI turn | `/rewind` | Lets the user pick an earlier prompt and continue in a new session | https://kiro.dev/changelog/ |
| Web review handling | Apply PR review feedback in Web | `/kiro all` or `/kiro fix` | Agent addresses review comments and pushes updates | https://kiro.dev/changelog/web/ |

### Best practices from official docs
- Use Specs when requirements are ambiguous, cross-cutting, or require traceability.
- Use Quick Plan when the scope is already well understood and you want a shorter approval loop.
- Use steering files for durable standards instead of repeating instructions in every chat.
- Use protected paths, trusted commands, workspace isolation, and credential scoping for security-sensitive work.

---

## Sources

- https://kiro.dev
- https://kiro.dev/about/
- https://kiro.dev/docs/
- https://kiro.dev/docs/specs/
- https://kiro.dev/docs/hooks/
- https://kiro.dev/docs/steering/
- https://kiro.dev/docs/mcp/
- https://kiro.dev/docs/models/
- https://kiro.dev/docs/privacy-and-security/
- https://kiro.dev/docs/privacy-and-security/compliance-validation/
- https://kiro.dev/docs/privacy-and-security/infrastructure-security/
- https://kiro.dev/docs/enterprise/supported-regions/
- https://kiro.dev/docs/cli/reference/built-in-tools/
- https://kiro.dev/pricing/
- https://kiro.dev/downloads/
- https://kiro.dev/faq/
- https://kiro.dev/changelog/
- https://kiro.dev/changelog/ide/0-12/
- https://kiro.dev/changelog/ide/0-11/
- https://kiro.dev/changelog/ide/0-10/
- https://kiro.dev/changelog/web/
- https://kiro.dev/blog/introducing-kiro/
- https://kiro.dev/enterprise/
- https://github.com/kirodotdev/Kiro
- https://aws.amazon.com/privacy/
- https://aws.amazon.com/terms/
- https://aws.amazon.com/service-terms/
