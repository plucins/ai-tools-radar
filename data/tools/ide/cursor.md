# Cursor
```yaml
name: Cursor
description: >
  Cursor is a proprietary AI-first code editor and agent workspace delivered as a standalone desktop product for macOS, Windows, and Linux. It combines an IDE, agent chat, codebase indexing, terminal/browser tooling, cloud agents, automations, integrations, and model routing across Cursor and third-party foundation models.
category: ide
logo: https://img.logo.dev/cursor.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | Cursor |
| Alternative names | Cursor IDE; Cursor editor |
| Vendor / Organization | Anysphere, Inc. |
| Product owner | [NO OFFICIAL DATA] |
| Homepage | https://cursor.com |
| Documentation | https://cursor.com/docs |
| Changelog | https://cursor.com/changelog |
| Repository | [NO OFFICIAL DATA] |
| First release date | [NO OFFICIAL DATA] |
| Current status | Public commercial product; feature maturity varies by feature (stable, beta, public beta, preview all appear in official materials) |
| Current version | Cursor 3 workspace/interface is officially announced; precise desktop build/version number is [NO OFFICIAL DATA] |
| Last updated | 2026-05-20 (latest changelog entry retrieved) |

---

## Classification

- **Primary category:** IDE
- **Secondary categories:** Coding agent; desktop code editor; agent workspace; cloud automation surface
- **Tool type:** Proprietary desktop IDE with cloud-backed services and optional enterprise controls
- **Problem domain:** AI-assisted software development, codebase navigation, implementation, testing, review, and automation
- **User interaction type:** Desktop GUI, agent/chat panel, command palette, terminal tool, browser tool, web/cloud agents, integrations, TypeScript SDK
- **Automation type:** Assistive to semi-autonomous locally; more autonomous in cloud agents and automations

---

## Summary

- **One-sentence description:** Cursor is an AI-first IDE and agent workspace that can search a codebase, edit files, run shell commands, use browser/web tools, and hand work between local and cloud agents.
- **Extended description:** Official docs describe Agent as a system built from **instructions**, **tools**, and a **model**. Cursor 3 extends the original VS Code fork into a unified multi-agent workspace with local agents, cloud agents, automations, integrations, and a marketplace for MCPs, skills, hooks, and subagents.
- **Core value proposition:** One product surface for code editing, agent execution, codebase retrieval, approvals, and cloud continuation.
- **Primary problem solved:** Reducing the manual work required to understand a repository, make coordinated changes, run verification steps, and move tasks across developer tools.
- **Key differentiator:** Official materials emphasize the combination of IDE-native editing with semantic codebase indexing, sandboxed command execution, and local↔cloud agent handoff.
- **Target users:** Individual developers, engineering teams, and enterprises adopting AI-assisted coding and workflow automation.
- **Anti-target users:** Users who only need a minimal non-agent code editor, or teams unwilling to grant an IDE agent access to files, commands, or cloud services.
- **Primary usage context:** Daily software development inside a desktop IDE, with optional cloud execution for longer-running or background work.

---

## Use Cases

### Primary use cases
- Multi-file implementation and refactoring with Agent
- Codebase exploration using semantic search plus grep-style search
- Running tests, build commands, and local tooling from the IDE
- Reviewing, staging, committing, and managing PR-oriented work from the Cursor 3 workspace
- Moving longer-running work from local agents to cloud agents

### Secondary use cases
- Ticket-driven work from Jira via cloud agents
- Team workflows through Slack, Microsoft Teams, Linear, GitHub, and GitLab integrations
- Custom tool workflows through MCP, plugins, hooks, skills, and subagents
- Programmatic agent execution through the TypeScript SDK
- Enterprise identity/governance workflows via SSO, SCIM, audit logs, and admin controls

### Example workflows
1. Open a repository, let Cursor index it automatically, ask Agent to search, edit, and run commands, then review diffs in the unified workspace.
2. Start locally, then move the session to a cloud agent so it can keep running when the laptop is closed.
3. Mention `@Cursor` in Jira or assign a work item to Cursor to generate code changes and a pull request from the ticket context.
4. Install marketplace plugins or connect MCP servers to extend the agent with external tools and workflows.

### Fully automated tasks
- Background cloud-agent runs and automations after setup
- Multi-step repo work in environments configured for cloud agents
- Scheduled or event-driven automations in the Automations product surface

### Partially automated tasks
- Local editing and shell execution with approvals or allowlists
- Browser-driven verification inside the agent workflow
- Model-routed coding assistance using Auto or Premium routing

### Anti-patterns
- Treating the sandbox as a substitute for normal environment hardening and least-privilege controls
- Assuming all features are available on all plans, in all regions, or with all models
- Expecting a fixed single-model or offline-only workflow when Cursor emphasizes model routing and cloud-connected services

---

## Features

### Core features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Agent | Complex coding assistant that can use tools, edit code, and run commands | Desktop app and supported model access | Behavior depends on permissions, model choice, and environment | All plans with plan/model-dependent limits | Stable | Agent overview |
| Semantic search + Instant Grep | Combines embedding-based code search with custom grep-style search; Cursor reports 12.5% higher accuracy than grep alone on codebase questions | Indexed workspace | Semantic search depends on indexing; accuracy claim is vendor benchmark-based | All plans | Stable | Search docs; secure indexing blog |
| Automatic indexing | Workspace indexing starts automatically; semantic search becomes available at 80% completion; sync runs every 5 minutes | Open a workspace | Large repos still require background indexing | All plans | Stable | Search docs |
| Terminal tool | Agent runs shell commands directly and can operate inside a sandbox | Desktop app; supported OS | Network is blocked by default in sandbox unless configured; some commands still require approval | All plans | Stable | Terminal docs |
| Checkpoints | Agent checkpoints are stored locally and separately from Git | Desktop app | Not a Git history replacement | All plans | Stable | Agent overview |
| Queued messaging | `Enter` queues a message and `Cmd+Enter` sends immediately | Desktop app | Queue behavior applies inside agent workflow, not all external integrations | All plans | Stable | Agent overview |
| Cursor 3 workspace | Unified agent-first interface with multi-repo layout, local/cloud handoff, files, diffs, browsers, terminals, PRs | Cursor 3 interface | Precise app build/version is not published in retrieved sources | All plans | Stable | Cursor 3 blog |

### Advanced features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Cloud agents | Run agents in cloud environments and hand sessions between local and cloud | Cursor account; cloud-agent setup | Requires configured environments and cloud connectivity | Plan-dependent | Stable | Cloud agents blog; docs navigation; changelog |
| Automations | Create recurring or event-driven agent workflows, including multi-repo and no-repo automations | Agents Window or web automation setup | Requires cloud-agent/automation configuration | Plan-dependent | Stable | 2026-05-20 changelog |
| Marketplace plugins | Marketplace extends Cursor with MCPs, skills, subagents, hooks, and more | Marketplace access | Plugin quality and behavior depend on installed package | Plan-dependent | Stable | Cursor 3 blog; marketplace blog |
| TypeScript SDK | Public-beta SDK package `@cursor/sdk` for local, cloud, and self-hosted workers | Node/TypeScript environment | Public beta; worker deployment model matters | Plan-dependent | Public beta | TypeScript SDK blog |
| Secure index reuse | Reuses teammate indexes via Merkle trees and simhash while restricting results to code the client can prove it has | Team/user with similar repos | Server-side architecture is vendor-managed | Team/enterprise-relevant | Stable | Secure indexing blog |
| Agent sandboxing | Sandboxed execution on macOS, Linux, and Windows reduces interruptions; Cursor reports 40% fewer stops than unsandboxed agents | Supported OS; sandbox-capable setup | Windows sandbox uses WSL2; Linux has kernel/prerequisite constraints | All plans on supported platforms | Stable | Agent sandboxing blog; terminal docs |

### Plan-restricted and enterprise features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Premium routing / API pool | Cursor selects or uses specific premium models and bills from the API pool at model API rates | Paid usage pool | Costs depend on model choice and token consumption | Paid plans | Stable | Models & pricing docs |
| Teams admin controls | Pooled usage, team controls, and admin features for organizations | Teams or Enterprise plan | Not available on Hobby | Teams / Enterprise | Stable | Pricing help |
| SSO | Single sign-on with SAML 2.0 providers | Team/enterprise identity setup | Official retrieved source confirms capability but not full IdP matrix | Enterprise-oriented | Stable | SSO docs |
| SCIM | SCIM 2.0 user provisioning and sync | Enterprise identity setup | Enterprise-oriented feature | Enterprise | Stable | SCIM docs |
| Audit logs | Monitoring and traceability for admin actions and environment changes | Enterprise controls | Enterprise-oriented feature | Enterprise | Stable | Pricing help; compliance docs; changelog |

### Integration-dependent features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Jira cloud agents | Assign work items or mention `@Cursor` to trigger cloud-agent work from Jira | Cursor admin access; Jira Commercial Cloud with Rovo | Jira-specific prerequisites apply | Plan/integration-dependent | Stable | 2026-05-19 changelog; Jira docs |
| JetBrains support | Cursor agent available in JetBrains IDEs via ACP | JetBrains IDE and ACP path | ACP-based surface, not the standalone Cursor IDE | Integration-dependent | Stable | JetBrains docs |
| Xcode support | Cursor can connect to Xcode workflows through MCP for Swift/iOS tasks | MCP/Xcode setup | MCP configuration required | Integration-dependent | Stable | Xcode docs |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| Desktop IDE | macOS, Windows, Linux | Main product surface; download page lists all three OSes |
| Agent / chat panel | Desktop IDE | Primary interface for prompting, queuing, editing, and tool use |
| Agents Window | Desktop IDE | Cursor 3 unified multi-agent workspace |
| Web/cloud agent surfaces | Browser and connected services | Official blog references mobile, web, desktop, Slack, GitHub, and Linear-triggered agents |
| Integrations | Jira, Slack, Microsoft Teams, GitHub, GitLab, Linear, JetBrains, Xcode | Official docs list these integrations |
| Marketplace | Cursor marketplace | Installs plugins, automations, MCPs, skills, hooks, and subagents |
| TypeScript SDK | Node/TypeScript | Public-beta programmatic interface |

### Supported platforms and operating systems
- **macOS**
- **Windows**
- **Linux**

### Supported browsers
- Browser-based surfaces are documented, but a supported-browser matrix is **[NO OFFICIAL DATA]** in the retrieved sources.

### Commands / shortcuts / UI actions documented officially
- `Cmd+Shift+P -> Agents Window` — open the Cursor 3 agents workspace
- `Cmd+/` — cycle models
- `Enter` — queue message
- `Cmd+Enter` — send message immediately
- `Cmd/Ctrl+Shift+M` — toggle full-screen tabs in the Agents Window

### Operating characteristics
- Local agent execution in the desktop app
- Cloud-agent execution in managed development environments
- Model selection from the chat/agent panel
- Plan and permission controls through UI, admin policies, and `permissions.json`

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Example |
|------|-------------|-------------|----------------|-------------|---------|
| Interactive local agent | Agent reads, edits, and runs tools inside the desktop IDE | Day-to-day coding and debugging | Medium | Approval and permission policy can interrupt execution | Ask Cursor to inspect code, patch files, and run tests locally |
| Queued conversation | Queue several prompts before sending/processing | Multi-step instructions or batching ideas | Low | Queueing affects message flow, not the underlying permissions model | Press `Enter` to queue and `Cmd+Enter` to send |
| Allowlist autorun | Commands matching configured allowlists run automatically | Repetitive or low-risk local workflows | Medium | Depends on allowlists and settings precedence | Auto-run approved shell commands for test/build loops |
| Allowlist (with Sandbox) | Commands auto-run inside a restricted sandbox | Reduce approval fatigue while constraining access | Medium to High | Requires supported platform; network blocked by default unless configured | Let the agent iterate on local workspace changes without open internet access |
| Run Everything | Broad auto-run mode without the sandbox restriction model | Fast iteration in trusted environments | High | Highest operational risk | Let the agent execute commands without individual prompts |
| Cloud agent | Agent executes in a cloud development environment | Long-running tasks, remote continuation, background work | High | Requires cloud environment setup and connectivity | Move a local session to cloud before closing the laptop |
| Automations | Scheduled/event-driven agent workflows | Recurring tasks, monitoring, multi-repo workflows | Autonomous | Requires automation configuration and supported integrations | Create a weekly analytics or Slack digest automation |
| Enterprise-governed mode | Team admin policies, SSO, SCIM, audit logs, and controlled environments constrain usage | Regulated or centrally managed organizations | Policy-bounded | Enterprise plan/process overhead | Run cloud agents under centrally managed permissions and identity controls |

---

## Architecture & Mechanisms

### Agent structure
- Official overview defines Agent as three components: **instructions**, **tools**, and **model**.
- Cursor states there is **no limit on the number of tool calls** Agent can make during a task.

### Retrieval and indexing
- Cursor combines semantic search with Instant Grep.
- Indexing starts automatically when a workspace opens.
- Semantic search becomes available at **80%** indexing completion.
- Index sync runs every **5 minutes**.
- Cursor indexes all files except those excluded by `.gitignore` or `.cursorignore`.

### Search/privacy design
- Cursor states file paths are encrypted before being sent to Cursor servers during indexing.
- Code content is not stored in plaintext during indexing; it is held in memory and discarded.
- Embeddings are created without storing filenames or source code.
- Retrieved chunks are decrypted client-side during search.

### Secure index reuse
- Cursor uses a **Merkle tree** plus **simhash** to detect repo similarity and securely reuse indexes.
- Official benchmarks report time-to-first-query improvements from **7.87s → 525ms** for median repos, **2.82m → 1.87s** at p90, and **4.03h → 21s** at p99.
- Similar repo copies inside an organization average **92% similarity** according to Cursor's blog post.

### Execution and sandboxing
- Agent can run shell commands directly.
- Sandboxed execution is documented for **macOS**, **Linux**, and **Windows**.
- macOS sandboxing uses **Seatbelt / `sandbox-exec`**.
- Linux sandboxing uses **Landlock + seccomp**.
- Windows sandboxing runs the Linux sandbox inside **WSL2**.
- The `.cursor` directory remains protected regardless of allowlist settings.

### Context, memory, and sessioning
- Checkpoints are stored **locally** and separately from Git.
- Cursor 3 supports multiple local and cloud agents in parallel inside one workspace.
- Max Mode extends the context window to the maximum the selected model supports, but Cursor does not publish one single global context size for the product.

### Approval logic and controls
- `permissions.json` is a global per-user JSONC file at `~/.cursor/permissions.json`.
- Precedence is documented as: **team admin (dashboard) > permissions.json > IDE settings UI**.
- `permissions.json` entries override rather than merge with in-app allowlists when defined.
- CLI permissions are separate from desktop/IDE permissions.

### Environment architecture for cloud work
- Cloud agents and automations can use development environments with cloned repos, dependencies, credentials, and build tools.
- Multi-repo environments and Dockerfile-based environment configuration are officially documented.
- Build secrets are scoped to the build step and not passed into the running agent environment.

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Required permissions | Control mechanism | Example |
|-----------|-------------|-------|------------|----------------------|-------------------|---------|
| File reading | Agent can read files and search indexed codebases | Workspace and indexed files | Low | Default access/policy-dependent | Search tools, permissions, ignore files | Read implementation files before a refactor |
| File editing | Agent can modify files directly | Workspace write scope | Medium to High | Policy-dependent | IDE approvals, allowlists, checkpoints | Apply a coordinated patch across multiple files |
| Command execution | Agent can run shell commands directly | Local machine or cloud environment | High | Policy-dependent | Autorun modes, sandbox, approval prompts | Run tests or build commands |
| Internet / web access | Agent can use web and browser tools | External web content and browser sessions | Medium to High | Policy-dependent | Browser tool, sandbox network policy, approvals | Open and inspect a local website in the built-in browser |
| Documentation/code search | Agent can use semantic search, Instant Grep, and web search | Local repo plus external docs/web | Low to Medium | Default/policy-dependent | Search tools and indexing | Find relevant code or documentation quickly |
| API / MCP usage | Agent can connect to MCP-backed external tools and programmatic SDK workflows | External systems exposed through integrations or MCP | High | User/admin-configured | MCP allowlists, marketplace/plugins, SDK setup | Query an external service through an MCP plugin |
| External application actions | Cursor integrates with Jira, Slack, Teams, GitHub, GitLab, JetBrains, Xcode, and browser workflows | Connected third-party apps | Medium to High | Integration-specific | Integration auth, admin access, product configuration | Trigger a cloud agent from Jira |
| Pull request creation | Official Jira workflow says completed work includes a link to the pull request; Cursor 3 blog describes PR management in workspace | Git hosting workflows | Medium | Repo/integration access | Git integrations and cloud-agent workflow | Finish a ticket and review the PR in Jira/Cursor |
| Production data modification | Cursor can act on external systems through integrations/MCP, but a dedicated official production-data safety policy is **[NO OFFICIAL DATA]** | Depends on configured tools | High | Integration-specific | Admin controls, approvals, environment scoping | Depends on installed toolchain |
| Sandbox availability | Restricted sandbox exists for terminal execution on supported OSes | Shell command execution | Risk-reducing control | Sandbox-capable setup | Allowlist (with Sandbox), OS sandbox primitives | Run build/test loops without unrestricted host access |
| User consent requirements | Approval model varies by tool and autorun mode | Local and cloud actions | N/A | Policy-defined | Allowlists, admin overrides, empty allowlists, sandbox prompts | Require approval when the agent needs internet or non-allowlisted access |

---

## Agent Tool Primitives

> Cursor's official docs describe user-facing tool categories rather than a low-level RPC-style tools reference. The table below reflects the named tool categories exposed in the official Agent overview and related tool docs.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `semantic search` | Embedding-backed codebase retrieval | No explicit approval requirement documented | Stable |
| `search files / folders` | Fast file and content search across the workspace | No explicit approval requirement documented | Stable |
| `web` | Web retrieval/search from the agent | Policy-dependent | Stable |
| `fetch rules` | Retrieve configured rules/context used by the agent | No explicit approval requirement documented | Stable |
| `read files` | Read file contents from the project | No explicit approval requirement documented | Stable |
| `edit files` | Modify project files | Policy-dependent | Stable |
| `run shell commands` | Execute shell commands from the agent | Policy-dependent | Stable; sandbox/autorun behavior documented separately |
| `browser` | Open, navigate, and prompt against sites or local web apps | Policy-dependent | Stable |
| `image generation` | Generate images from the agent workflow | Policy-dependent | Stable |
| `ask questions` | Request clarification/input from the user | Yes | Stable |

Additional permission syntax documented officially:
- `mcpAllowlist` and `terminalAllowlist` in `~/.cursor/permissions.json`
- MCP allowlist format: `server:tool`
- Matching is case-insensitive; `*` wildcards are supported for server and tool names

---

## Integrations

### Native and documented integrations
- **GitHub** — repository workflows and connected cloud-agent surfaces
- **GitLab** — repository workflows and connected cloud-agent surfaces
- **Slack** — trigger and observe agent work from messaging workflows
- **Microsoft Teams** — messaging integration documented in the integrations section
- **Jira** — assign work items or mention `@Cursor` to trigger cloud agents; requires admin access and Jira Commercial Cloud with Rovo
- **Linear** — listed as an official integration and agent launch surface
- **JetBrains** — Cursor agent available in JetBrains IDEs via ACP
- **Xcode** — MCP-based Swift/iOS workflow integration

### MCP and extensibility integrations
- Official MCP support
- Marketplace support for **MCPs**, **skills**, **subagents**, **rules**, and **hooks**
- Team marketplace support for private plugins

### SDK and platform integrations
- **TypeScript SDK (`@cursor/sdk`)** with local, cloud, and self-hosted workers
- Cloud-agent development environments with Dockerfile-based setup and multi-repo configuration

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | Cursor Composer 2.5; Claude 4.6 Sonnet; Claude 4.7 Opus; Gemini 3.1 Pro; Gemini 3.5 Flash; GPT-5.3 Codex; GPT-5.5; Grok 4.3 |
| Models publicly disclosed | Yes |
| User model selection | Yes |
| Proprietary models | Yes — Cursor Composer family and Cursor routing modes |
| External models | Anthropic, OpenAI, Google, xAI |
| Local models | [NO OFFICIAL DATA] in retrieved official sources |
| Multimodal models | [NO OFFICIAL DATA] in retrieved official sources |
| Context window | Model-dependent; Max Mode uses each model's maximum supported context |
| Token limits | Model-dependent; pricing is per-token/per-million-token for model/API pool usage |
| Latency | [NO OFFICIAL DATA] |
| Processing region | Configurable regions are documented, but the retrieved sources did not provide a full region list |
| Training on user data | Privacy policy says Inputs/Suggestions are not used for training unless flagged for security review, explicitly reported as feedback, or the user explicitly opts in; Privacy Mode adds ZDR-style handling with named providers |
| Information status | Partially confirmed |

### Model pricing examples published officially
- **Claude 4.6 Sonnet:** $3 input / $3.75 cache write / $0.3 cache read / $15 output per 1M tokens
- **Claude 4.7 Opus:** $5 / $6.25 / $0.5 / $25
- **Composer 2.5:** $0.5 / — / $0.2 / $2.5
- **Gemini 3.1 Pro:** $2 / — / $0.2 / $12
- **Gemini 3.5 Flash:** $1.5 / — / $0.15 / $9
- **GPT-5.3 Codex:** $1.75 / — / $0.175 / $14
- **GPT-5.5:** $5 / — / $0.5 / $30
- **Grok 4.3:** $1.25 / — / $0.2 / $2.5

---

## Pricing

| Plan | Official price | Included usage / notes |
|------|----------------|------------------------|
| Hobby | Free | Limited included API usage |
| Pro | $20/mo | $20 included API usage |
| Pro+ | $60/mo | $70 included API usage |
| Ultra | $200/mo | $400 included API usage |
| Teams | $40/user/mo | $20/user included API usage |
| Enterprise | Contact sales | Pooled usage, SCIM, audit logs, admin controls, invoice billing |

### Usage and billing notes
- Usage resets monthly; unused usage does **not** roll over.
- On current individual plans, Max Mode is billed at the selected model's API rate.
- On legacy request-based plans, Max Mode adds a **20%** surcharge.
- Cursor says per-model pricing uses provider-published API rates with no markup.
- Official Auto pricing: **$1.25 / 1M** input + cache write, **$0.25 / 1M** cache read, **$6.00 / 1M** output.
- On Teams plans, non-Auto agent requests include a **$0.25 / 1M tokens** Cursor Token Rate on top of model API pricing.

---

## Permissions & Security

- **Global permissions file:** `~/.cursor/permissions.json` (JSONC), applied per user across workspaces.
- **Precedence:** `team admin (dashboard) > permissions.json > IDE settings UI`.
- **Allowlists:** `terminalAllowlist` and `mcpAllowlist`; wildcard `*` supported; `server:tool` syntax for MCP.
- **Override behavior:** When `permissions.json` defines an allowlist, it overrides rather than merges with in-app allowlists.
- **Sandbox modes:** `Allowlist`, `Allowlist (with Sandbox)`, and `Run Everything`.
- **Pre-3.5 naming:** `Run in Sandbox` maps to `Allowlist (with Sandbox)`; `Ask Every Time` is deprecated in favor of empty allowlists with `Allowlist`.
- **Sandbox defaults:** Filesystem read access is generally available; workspace directories are read/write; network is blocked by default unless configured; `.cursor` stays protected.
- **Linux prerequisites:** kernel **6.2+**, Landlock v3 support, and unprivileged user namespaces.
- **Enterprise identity:** SSO with **SAML 2.0** and SCIM **2.0** provisioning are officially documented.
- **Auditability:** Enterprise plan materials mention audit logs; changelog and compliance docs also reference audit visibility for environment actions.
- **Encryption:** Official privacy materials state encryption **at rest** and **in transit**.
- **Data regions:** Region selection is officially documented, but the exact list was not extracted from retrieved sources.
- **Data retention:** Privacy policy states retention varies by purpose and settings; no single fixed retention period is published.
- **Model training policy:** Privacy policy limits training use as described above; Privacy Mode says code is not stored by participating model providers or used for training.
- **Certifications:** **SOC 2 Type II** report available on request via the trust portal.
- **Testing:** Cursor states it performs at least **annual third-party penetration testing**.
- **Subprocessors:** Published via the trust portal.
- **China statement:** Cursor says it does not use or maintain infrastructure in China and does not use companies headquartered in China as subprocessors.

---

## Privacy & Data Processing

- **What data is transmitted:** Prompts, tool inputs/outputs, and indexed code/search metadata as required by the selected workflow; file paths are encrypted before indexing data is sent.
- **Where data is processed:** Cursor-hosted services and model-provider services; exact region choices are configurable but not fully enumerated in the retrieved sources.
- **Whether data is stored:** Cursor states code content is not stored in plaintext during indexing; embeddings are created without storing filenames or source code; retention for other account/product data varies by purpose/settings.
- **Retention period:** Variable by purpose/settings according to the privacy policy.
- **Training opt-out / policy:** Privacy policy says Inputs/Suggestions are not used for training unless security review, explicit feedback, or explicit opt-in applies.
- **Privacy Mode:** Available to anyone including free/Pro users; enabled by default for team members and enterprise teams per official help docs.
- **Provider-side handling in Privacy Mode:** Uses ZDR agreements with OpenAI, Anthropic, Google, and xAI; code is not stored by providers or used for training.
- **BYOK implication:** Official help states BYOK is supported; data handling for BYOK requests can differ from Cursor-managed Privacy Mode guarantees and depends on provider configuration.
- **Prompt logging / admin visibility:** Enterprise materials document admin controls and audit visibility, but a full prompt-log matrix is **[NO OFFICIAL DATA]** in retrieved sources.
- **Subprocessors:** Published on the trust portal.
- **Privacy policy URL:** https://cursor.com/privacy
- **DPA availability:** [NO OFFICIAL DATA] in retrieved official sources.

---

## Limitations & Risks

### Functional and quality risks

| Name | Description | Impact | Risk level | Mitigation |
|------|-------------|--------|------------|------------|
| Hallucination / incorrect action risk | Cursor publishes guidance on hallucinations and incorrect tool use; agentic workflows can still make wrong edits or choose wrong commands | Incorrect code changes or wasted review time | Medium to High | Use checkpoints, review diffs, keep approvals for sensitive actions, and validate with tests |
| Approval fatigue | Cursor's sandboxing blog explicitly calls out approval fatigue when many prompts accumulate across parallel agents | Users may stop inspecting approvals carefully | Medium | Use sandboxed allowlist modes and tighter policy scopes instead of blanket approvals |
| Region/model availability | Official help says some models may be hidden in certain regions | Feature/model inconsistency across teams | Medium | Use Auto routing or verify regional model availability before standardizing workflows |

### Security and environment risks

| Name | Description | Impact | Risk level | Mitigation |
|------|-------------|--------|------------|------------|
| Unsandboxed command execution | `Run Everything` and broad autorun modes can expose the host environment to destructive commands | High-consequence local damage or secret exposure | High | Prefer `Allowlist (with Sandbox)` and least-privilege allowlists |
| Platform-dependent sandbox behavior | Windows uses WSL2; Linux requires kernel and Landlock prerequisites | Sandboxing may be unavailable or behave differently across fleets | Medium | Verify OS prerequisites and standardize supported environments |
| External integration risk | MCP tools, browser actions, and integrations can extend Cursor into external systems | Expanded blast radius beyond the repo | High | Restrict integrations, use allowlists, and apply team-admin policy overrides |

### Cost and vendor risks

| Name | Description | Impact | Risk level | Mitigation |
|------|-------------|--------|------------|------------|
| Token-based cost escalation | Premium routing, API-pool usage, and Max Mode bill at model API rates; usage resets monthly and does not roll over | Budget unpredictability on heavy workflows | Medium to High | Monitor usage pools, pick lower-cost models where acceptable, and reserve Max Mode for hard tasks |
| Proprietary platform dependence | Cursor combines proprietary IDE behavior, proprietary routing, hosted indexing, and enterprise controls | Migration effort if a team later changes tooling | Medium | Keep prompts/rules portable where possible and evaluate MCP/SDK-based abstractions |

### Privacy and data risks

| Name | Description | Impact | Risk level | Mitigation |
|------|-------------|--------|------------|------------|
| Provider/data-policy variance | Privacy Mode guarantees differ from BYOK or custom integration paths | Inconsistent data handling across teams | Medium | Standardize approved model paths and enterprise privacy settings |
| Variable retention windows | Cursor does not publish one fixed retention period for all data classes | Harder compliance mapping | Medium | Confirm retention settings/policies through enterprise/privacy processes before rollout |

---

## Usage Examples

| Name | Purpose | Input | Command / prompt | Expected output | Notes | Source |
|------|---------|-------|------------------|-----------------|-------|--------|
| Open Agents Window | Enter the Cursor 3 workspace | Desktop app open | `Cmd+Shift+P -> Agents Window` | Opens the unified agents workspace | Official blog shortcut | Cursor 3 blog |
| Queue vs send | Batch prompts before immediate execution | Prompt text in agent input | `Enter` to queue, `Cmd+Enter` to send | Message is queued or sent immediately | Useful for multi-step instructions | Agent overview |
| Cycle models | Switch active model in chat/agent panel | Open chat/agent panel | `Cmd+/` | Active model changes | Selection persists across conversations per help docs | Available models help |
| Jira ticket handoff | Trigger a cloud agent from issue tracking | Jira work item or comment | Mention `@Cursor` or assign the work item to Cursor | Jira shows progress and links to the resulting pull request | Requires Cursor admin access and Jira Commercial Cloud with Rovo | 2026-05-19 changelog |
| Use full-screen tabs | Focus on a single artifact in the Agents Window | Open file/change/browser/tab in Agents Window | `Cmd/Ctrl+Shift+M` | Selected panel expands full-screen | Officially documented in the 3.4 changelog entry | 3.4 changelog |

---

## Sources

All information below was sourced from official Cursor / Anysphere materials.

- https://cursor.com
- https://cursor.com/docs
- https://cursor.com/docs/agent/overview
- https://cursor.com/docs/agent/tools/search
- https://cursor.com/docs/agent/tools/terminal
- https://cursor.com/docs/reference/permissions
- https://cursor.com/docs/models-and-pricing
- https://cursor.com/help/account-and-billing/pricing
- https://cursor.com/help/models-and-usage/available-models
- https://cursor.com/help/models-and-usage/usage-limits
- https://cursor.com/help/security-and-privacy/privacy
- https://cursor.com/docs/account/teams/sso
- https://cursor.com/docs/account/teams/scim
- https://cursor.com/docs/account/regions
- https://cursor.com/docs/enterprise/privacy-and-data-governance
- https://cursor.com/docs/enterprise/compliance-and-monitoring
- https://cursor.com/docs/integrations/jira
- https://cursor.com/docs/integrations/jetbrains
- https://cursor.com/docs/integrations/xcode
- https://cursor.com/changelog
- https://cursor.com/changelog/05-20-26
- https://cursor.com/changelog/05-19-26
- https://cursor.com/changelog/3-4
- https://cursor.com/blog/cursor-3
- https://cursor.com/blog/cloud-agents
- https://cursor.com/blog/automations
- https://cursor.com/blog/typescript-sdk
- https://cursor.com/blog/marketplace
- https://cursor.com/blog/agent-sandboxing
- https://cursor.com/blog/secure-codebase-indexing
- https://cursor.com/learn/hallucination-limitations
- https://cursor.com/security
- https://cursor.com/privacy
