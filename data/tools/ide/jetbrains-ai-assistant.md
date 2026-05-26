# JetBrains AI Assistant
```yaml
name: "JetBrains AI Assistant"
description: >
  JetBrains AI Assistant is a collection of AI-powered features and coding agents integrated into JetBrains IDEs. It helps developers work with code in AI Chat, directly in the editor, and through coding agents that can handle multi-step development tasks.
category: ide
logo: https://img.logo.dev/jetbrains.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - IDE Extension
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 21:08

| Field | Description |
|-------|-------------|
| Name | JetBrains AI Assistant |
| Alternative names | AI Assistant; JetBrains AI |
| Vendor / Organization | JetBrains s.r.o. |
| Product owner | [NO OFFICIAL DATA] |
| Homepage | https://www.jetbrains.com/ai/ |
| Documentation | https://www.jetbrains.com/help/ai-assistant/ |
| Changelog | [NO OFFICIAL DATA] |
| Repository | [NO OFFICIAL DATA] |
| First release date | [NO OFFICIAL DATA] |
| Current status | Active commercial product; feature maturity varies by feature and agent |
| Current version | [NO OFFICIAL DATA] for a standalone AI Assistant version; retrieved documentation targets JetBrains IDE help `2026.1` |
| Last updated | 31 March 2026 (main AI Assistant help page) |

---

## Classification

- **Primary category:** IDE
- **Secondary categories:** IDE assistant; coding agent surface; code completion system; VCS assistance
- **Tool type:** Proprietary IDE plugin and cloud-backed AI service with optional third-party and local model connections
- **Problem domain:** Code generation, code understanding, editor assistance, multi-file task execution, VCS assistance, and AI model access inside JetBrains IDEs
- **User interaction type:** AI Chat tool window, in-editor actions, inline completion, agent mode, VCS actions, settings UI, MCP/ACP connections
- **Automation type:** Assistive by default; semi-autonomous and agentic with Junie and other integrated agents

---

## Summary

- **One-sentence description:** JetBrains AI Assistant adds chat, in-editor generation, code completion, code understanding, routine automation, and agent workflows to JetBrains IDEs.
- **Extended description:** Official documentation describes AI Assistant as a collection of AI-powered features and coding agents integrated into JetBrains IDEs. It uses context such as the current file, selected code, project structure, and recent changes, then sends the request to an AI model and returns suggestions or changes to the IDE.
- **Core value proposition:** Keep AI-assisted coding, explanation, editing, review, and agent execution inside the IDE.
- **Primary problem solved:** Reducing manual work required to understand code, generate or edit code, review changes, and perform repetitive development tasks.
- **Key differentiator:** JetBrains positions AI Assistant as deeply integrated with IDE context and able to run both assistive features and agent workflows in one surface.
- **Target users:** Developers using JetBrains IDEs, Android Studio, or ReSharper with Visual Studio.
- **Anti-target users:** Teams that cannot share prompts or code context with external providers, or users who require a fully documented offline-only feature set without configuring local models.
- **Primary usage context:** Day-to-day software development inside JetBrains IDEs.

---

## Use Cases

### Primary use cases
- Ask project-aware questions in **AI Chat**.
- Generate or update code in the editor from natural-language prompts.
- Use **cloud code completion** and **next edit suggestions** while typing.
- Explain code, runtime errors, commits, SQL problems, and regular expressions.
- Generate documentation, unit tests, commit messages, PR/MR titles, and PR summaries.
- Delegate multi-step work to **Junie** or other integrated agents.

### Secondary use cases
- Resolve Git conflicts with AI.
- Perform self-review before committing changes.
- Convert pasted code to another language.
- Connect external tools and data sources through **MCP**.
- Use BYOK providers or local models instead of JetBrains-managed cloud models.

### Example workflows
1. Open **AI Chat**, select a model, attach files or symbols, and ask a project question.
2. Trigger in-editor code generation from a prompt, then review and apply the suggested changes.
3. Switch AI Chat to **Junie**, choose **Code** mode, let it plan and execute a multi-file task, then keep or roll back the changes.
4. Configure an MCP server, then invoke its commands from AI Chat or let AI Assistant call them automatically.

### Fully automated tasks
- **None by default.** Official docs state that Junie requests approval for bash commands, file operations, and external tools by default.
- Higher autonomy is available through **Brave mode** and the **Action Allowlist**.

### Partially automated tasks
- Chat-based code generation and explanation with manual review.
- Junie code changes with approval and rollback controls.
- VCS summaries, commit messages, and PR/MR text generation.

### Anti-patterns
- Treating AI output as verified without review; JetBrains states that users are responsible for evaluating correctness and suitability.
- Expecting all features to work with every BYOK or local model; unsupported features become unavailable.
- Assuming quota-free cloud usage; cloud features consume AI Credits under JetBrains AI license tiers.

---

## Features

### Core features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| AI Chat | Main entry point for conversations with models and agents, with model picker, attachments, and history | AI Assistant plugin and supported activation method | Chat mode does not apply changes automatically | JetBrains AI, BYOK, local models, or supported agent auth depending on setup | Stable | AI Chat docs |
| Cloud code completion | Autocompletes single lines, blocks, or whole functions from project context | Supported IDE and model access | Depends on available completion model | JetBrains AI or compatible configured provider/model | Stable | Feature set; custom models docs |
| Next edit suggestions | Suggests likely next code changes during editing | Supported IDE and model access | Feature availability depends on configured models | JetBrains AI or compatible configured provider/model | Stable | Feature set |
| In-editor code generation | Generates code in the editor from natural-language prompts | Supported IDE and model access | Generated code requires user review | JetBrains AI or compatible configured provider/model | Stable | AI Assistant overview; feature set |
| Code insights | Explains code, suggests improvements, helps with refactoring, and identifies potential issues | Supported IDE and model access | Output quality depends on model and provided context | JetBrains AI or compatible configured provider/model | Stable | AI Assistant overview; feature set |
| Routine automation | Generates documentation, unit tests, commit messages, PR/MR titles, PR summaries, and shelf titles | Supported IDE and model access | Generation assistance only; users must review results | JetBrains AI or compatible configured provider/model | Stable | AI Assistant overview; feature set |

### Advanced features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Junie agent | JetBrains-developed coding agent that can plan and execute complex multi-step actions, edit files, run tests, and report progress | Supported IDE, agent installation, and supported authentication | Not available in DataGrip; approvals are requested by default | JetBrains AI subscription or API key depending on configuration | Stable | Junie docs; activate agents docs |
| Integrated third-party agents | AI Assistant integrates Claude Agent and Codex in AI Chat | Agent installation and supported authentication | Other AI Assistant features may be unavailable depending on activation method | Authentication-method dependent | Stable | AI Chat; activate agents |
| MCP integration | Connects AI Assistant to external tools and data sources through MCP servers over STDIO or Streamable HTTP | MCP server configuration | Capability depends on server setup and tool definitions | Available in AI Assistant; enterprise controls depend on environment | Stable | MCP docs |
| BYOK providers | Connects Anthropic, Gemini, Google Vertex AI, OpenAI, OpenAI-compatible endpoints, and others using user-provided credentials | API key or provider credentials | Only features supported by provider models remain available | No JetBrains AI subscription required for supported scenarios | Stable | BYOK docs; custom models docs |
| Local model support | Supports locally hosted models via Ollama and LM Studio | Local provider setup and compatible models | Locally hosted models must be assigned manually for feature groups; unsupported features remain unavailable | Available with local setup | Stable | Supported LLMs; custom models docs |
| AI in version control | Generates commit messages, PR/MR text, incoming PR summaries, self-review, commit explanations, and Git conflict resolution | Supported IDE and model access | Output requires human review | JetBrains AI or compatible configured provider/model | Stable | Feature set |
| Access control files | Supports `.aiignore` to restrict files/folders and `.noai` to disable AI Assistant for a project | Local project configuration | `.noai` disables all AI Assistant features for the project | Available in supported IDEs | Stable | Disable AI Assistant docs |

### Experimental features

- **Terminal natural-language detection in the New Terminal:** Official docs describe this as part of the **New Terminal**, which was an **experimental terminal engine** in IDEs of version `2024.*` and deprecated later. It can interpret natural language and convert it into commands; the behavior can be disabled. Source: Disable AI Assistant docs.
- **Explicitly labeled experimental AI Assistant features beyond this:** [NO OFFICIAL DATA] in the retrieved official sources.

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| JetBrains IDE plugin | CLion, DataGrip, DataSpell, GoLand, IntelliJ IDEA, PhpStorm, PyCharm, Rider, RubyMine, RustRover, WebStorm | Main AI Assistant surface |
| AI Chat tool window | JetBrains IDEs | Primary UI for chat and agent interactions |
| In-editor actions | JetBrains IDEs | Used for generation, explanation, refactoring help, and problem finding |
| Android Studio integration | Android Studio | Officially supported environment; some license-tier limitations apply |
| ReSharper integration | ReSharper with Visual Studio | Available as a separate product alongside ReSharper |
| MCP client | JetBrains IDEs | Connects AI Assistant to external MCP servers |
| IDE as MCP server | JetBrains IDEs starting with `2025.2` | Lets external clients such as Claude Desktop, Cursor, Codex, and VS Code use IDE-exposed tools |

### Supported operating systems
- **[NO OFFICIAL DATA]** for a single AI Assistant OS matrix in the retrieved sources; support follows the host IDEs and supported environments documented by JetBrains.

### Commands / slash commands / UI actions documented officially
- Type `/` in AI Chat to add an MCP command.
- Use the AI Chat **model picker** to select a model.
- Use the AI Chat **mode/agent selector** to switch between Chat and supported agents.
- Use Search Everywhere action **Open AI Assistant Requests Log in Editor** to inspect the local requests log when request logging is enabled.

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Example |
|------|-------------|-------------|----------------|-------------|---------|
| Chat mode | General and project-related questions, explanations, and code snippets | Quick assistance and code understanding | Low | Does not apply changes automatically | Ask AI Assistant to explain a selected method |
| Agent mode | Uses integrated agents for complex multi-step tasks | Broader development tasks across files | Medium to High | Depends on selected agent and auth method | Switch AI Chat to Junie for a multi-file task |
| Junie Code mode | Plans and executes a task, can run commands, edit files, run tests, and verify changes | Complex implementation work | High | Approvals requested by default; DataGrip unsupported | Ask Junie to implement a feature and run tests |
| Junie Ask mode | Read-only exploration and analysis | Codebase understanding, planning, brainstorming | Low | Cannot modify code or project files | Ask Junie to explain a module and propose a plan |
| Junie Auto mode | Lets Junie determine which mode to use | Mixed tasks where the appropriate mode is unclear | Variable | Behavior depends on Junie's decision | Submit a task without manually picking Code or Ask |
| Brave mode | Allows Junie to execute commands or modify files without asking for confirmation | Trusted environments where fewer interruptions are desired | Higher than default | Higher operational risk | Enable Brave mode for rapid task execution |
| JetBrains AI service mode | Uses JetBrains-managed cloud models and all supported features | Full-featured AI Assistant setup | Medium | Cloud features consume AI Credits | Start with JetBrains AI subscription |
| BYOK mode | Uses supported third-party providers with user API keys | Control provider choice or billing | Medium | Unsupported features become unavailable | Configure OpenAI or Anthropic in settings |
| Local model mode | Uses local models through Ollama or LM Studio | Local data handling or experimentation | Low to Medium | Manual assignment required for some feature groups; unsupported features unavailable | Assign a local model for core features |

### License tiers and AI Credits

| Tier | Price | Included credits | Top-up allowed | Notes |
|------|-------|------------------|----------------|-------|
| AI Trial | Free | 10 or 20 AI Credits per trial period (docs show two pricing tables) | Yes | Official pricing page shows two tables; [NEEDS UPDATE] on exact applicability |
| AI Free | Free | 3 AI Credits per 30 days | No | Available starting with IDEs `2025.1`; not available in Android Studio or free Community editions of IntelliJ IDEA and PyCharm |
| AI Pro | $10 USD or $20 USD (docs show two pricing tables) | 10 or 20 AI Credits per 30 days | Yes | Included for free with some subscriptions such as All Products Pack and dotUltimate; DataSpell includes AI Pro |
| AI Ultimate | $30 USD or $60 USD (docs show two pricing tables) | 35 or 70 AI Credits per 30 days | Yes | Available starting with IDEs `2024.2.1` |
| AI Enterprise | $60 USD in retrieved pricing table | On par with AI Ultimate quota, or higher | No in retrieved pricing table | Managed through organizational setup |

Additional official credit details:
- AI Credits regulate access to cloud-model features.
- Top-up AI Credits remain valid for **12 months**.
- If included monthly quota is exhausted, cloud-based features become unavailable until quota renews or Top-up AI Credits are used.

---

## Architecture & Mechanisms

### System flow
- AI Assistant gathers context from the current file, selected code, open project structure, attached files/folders/images/symbols, and recent changes.
- The request and context are sent either to the **JetBrains AI service**, directly to a **BYOK provider**, directly to an **agent provider**, or to an **ACP agent provider**, depending on activation setup.
- The model response returns to the IDE as chat output, code suggestions, edit proposals, or agent actions.

### Model assignment and routing
- AI Assistant uses assigned model groups for **core features**, **instant helpers**, and **completion**.
- If assigned models are unavailable, some features use documented **fallback models**.
- For local models and OpenAI-compatible endpoints, users can manually assign models to **core features**, **instant helpers**, and **completion model** roles.

### Retrieval, indexing, and context
- AI Chat supports explicit context attachments such as files, folders, images, symbols, commits, and other items.
- Junie can use **semantic indexing**, described by JetBrains as codebase indexing based on embeddings focused on semantic meaning and context rather than keyword matching.
- Junie respects `.aiignore` restrictions.

### Tool and protocol integration
- MCP client transport types: **STDIO** and **Streamable HTTP**.
- ACP support allows installation of external/custom agents; the IDE can automatically download and manage required Node.js or Python runtimes for ACP-compatible agents.
- Starting with IDE version `2025.2`, JetBrains IDEs can also expose an integrated **MCP server** for external clients.

### Approval and rollback mechanisms
- Junie requests approval for bash commands, file operations, and external tools by default.
- **Action Allowlist** can permit specific commands or regex patterns without future approval.
- **Brave mode** removes per-action confirmation prompts.
- Junie supports rollback of individual files, all files, or to a prior checkpoint in the conversation.

### Data-handling behavior by activation mode
- With **JetBrains AI service**, JetBrains says the service coordinates the request but does **not** store or process the data unless **Send detailed code-related data** is enabled.
- With **BYOK**, prompts and context are sent directly to the configured provider.
- With **provider-account** agent activation, prompts and context are sent directly to the agent provider.
- With **ACP agents**, prompts and context are sent directly to the ACP provider.

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Required permissions | Control mechanism | Example |
|-----------|-------------|-------|------------|----------------------|-------------------|---------|
| File reading | AI Assistant uses project context, attachments, and selected files; Junie Ask mode explores files and project structure | Current project and attached items | Medium | IDE/project access | `.aiignore`, `.noai`, project disable, guidelines, project path restrictions | Ask AI Chat to explain a selected file |
| File editing | In-editor actions and Junie can propose or perform edits across one or multiple files | Current project and allowed paths | Medium to High | IDE/project write access | User review, Junie approval flow, rollback, Brave mode, project path restrictions | Generate code in editor from a prompt |
| Command execution | Junie Code mode can run terminal commands and tests; AI Assistant can also generate terminal commands | Local development environment | High | Terminal access and user approval by default | Approval prompts, Action Allowlist, Brave mode | Let Junie run tests after an implementation |
| External tool usage | MCP servers expose tools that AI Assistant can trigger automatically or manually via chat commands | Whatever the configured MCP server permits | High | MCP server configuration and external system permissions | MCP settings, per-server enable/disable, user approval for Junie by default | Call an MCP filesystem or remote tool |
| Agent execution | Junie, Claude Agent, Codex, and ACP agents can process multi-step tasks in AI Chat | Agent-specific | Medium to High | Agent installation and authentication | Agent selector, auth method, rollback/review controls | Switch from Chat to Junie for a larger task |
| VCS assistance | AI Assistant can summarize commits, generate PR/MR descriptions, review changes, and resolve conflicts | IDE VCS context | Medium | Repository/VCS access within IDE | User review before commit/PR actions | Generate a commit message or PR description |
| Local request logging | AI Assistant can log prompts sent to providers into `ai-assistant-requests.md` for the current session when enabled | Local IDE session | Medium | Registry key enablement | `llm.requests.logging.mode`, cleanup actions | Review outgoing prompt structure |
| Internet access | [NO OFFICIAL DATA] for a general web-browsing capability built into AI Assistant itself; official docs document external network access through configured providers and MCP servers | Provider-dependent / MCP-dependent | Variable | Provider or MCP connectivity | Provider configuration, network policy | Connect a remote MCP server over HTTP |
| Pull request creation | [NO OFFICIAL DATA] for direct PR creation; official docs document generation of PR/MR titles, descriptions, and summaries | N/A | N/A | N/A | N/A | N/A |
| Sandbox availability | [NO OFFICIAL DATA] for a documented built-in sandbox comparable to a dedicated command sandbox; approvals and allowlists are the documented control model | N/A | N/A | N/A | Approval flow, Action Allowlist | N/A |

---

## Agent Tool Primitives

> JetBrains does **not** publish a named internal Junie tool-reference page in the retrieved AI Assistant documentation. The table below lists the Junie operation classes that are explicitly documented.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `file-operations` | Junie can create, modify, and revert files while executing tasks | Yes by default | Documented in Junie docs; can be auto-approved in Brave mode |
| `bash-commands` | Junie can run suggested bash commands and terminal commands, including tests | Yes by default | Documented in Junie docs; Action Allowlist can approve exact or regex-matched commands |
| `external-tools` | Junie can use tools exposed by configured MCP servers | Yes by default | Documented in Junie docs and MCP docs |
| `rollback` | Users can revert specific files, all changed files, or restore to a prior checkpoint | No separate approval noted; user-initiated control | Documented user control for agent changes |
| `semantic-indexing` | Junie can use semantic indexing to find relevant data faster via embeddings-based search | No approval requirement documented | Optional setting in Junie configuration |
| `guidelines` | Junie reads persistent instructions from `.junie/AGENTS.md`, project-root `AGENTS.md`, or configured path | No approval requirement documented | Preferred location is `.junie/AGENTS.md`; legacy guideline paths are deprecated |

Additional officially documented Junie controls:
- **Action Allowlist** supports exact-command entries and generated regex rules.
- **Brave mode** allows execution without asking for confirmation.
- **Project path** restricts where Junie may make changes without extra confirmation.

---

## Integrations

### Native integrations
- JetBrains IDEs: CLion, DataGrip, DataSpell, GoLand, IntelliJ IDEA, PhpStorm, PyCharm, Rider, RubyMine, RustRover, WebStorm.
- Android Studio.
- ReSharper with Visual Studio.

### Agent integrations
- **Junie by JetBrains**
- **Claude Agent**
- **Codex**
- **ACP-compatible external/custom agents**

### AI provider integrations
- Anthropic
- Gemini
- Google Vertex AI
- OpenAI
- OpenAI-compatible endpoints
- Ollama
- LM Studio

### Protocol and tool integrations
- **MCP client** support over STDIO and Streamable HTTP.
- **IDE as MCP server** for external clients starting with version `2025.2`.

### Enterprise / organization integrations
- AI Enterprise provider options in IDE Services: JetBrains AI, OpenAI Platform, Azure OpenAI, Google Vertex AI, and Amazon Bedrock.

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | JetBrains publishes a broad model list including **Mellum**, **Claude 4.6/4.5/4.x/3.7/3.5**, **Gemini 3.1/3/2.5/2.0**, **GPT-5.4/5.3 Codex/5.2 Codex/5.2/5.1 Codex family/5/4.1/4o**, **o1/o3/o4-mini**, **Grok-4.1 Fast / Grok-4 / Grok Code Fast 1**, and **Qwen Max** for Mainland China in specific feature mappings |
| Models publicly disclosed | Yes |
| User model selection | Yes; users can select models in AI Chat and Junie settings |
| Proprietary models | Yes; JetBrains lists **Mellum** as a JetBrains-trained model |
| External models | Anthropic, Google, OpenAI, xAI, Alibaba (Mainland China-only feature mappings), AWS Bedrock-hosted models in service-provider disclosures |
| Local models | Yes; official docs support **Ollama** and **LM Studio** |
| Multimodal models | Yes; supported-model tables mark some models as supporting images |
| Context window | Published per model; examples include **128k** (GPT-4o), **200k** (many Claude and o-series models), **400k** (many GPT-5 family models), **1M** (Gemini 3.1 Pro, Gemini 3 Flash, GPT-5.4, GPT-4.1 family), and **2M** (Grok-4.1 Fast variants) |
| Token limits | Local-model context window default is **64,000** tokens when configured manually; broader per-feature output token limits are [NO OFFICIAL DATA] |
| Latency | [NO OFFICIAL DATA] |
| Processing region | Provider-dependent. Official third-party list names OpenAI (**US**), Google (**EU, US, and Asia**), Anthropic (**US**), xAI (**US**), Baseten (**US, UK**), and Tavily (**US**) |
| Training on user data | By default, JetBrains says JetBrains AI service requests are not stored or processed by JetBrains unless **Send detailed code-related data** is enabled. If enabled, prompts and responses may be collected and used for product improvement and training JetBrains models; detailed code-related data retention is **1 year** |
| Information status | Confirmed from official help, legal, and service-provider pages |

### Feature-specific model assignment examples
- **In-editor code generation:** Claude 4.5 Sonnet, Gemini 2.5 Pro, GPT-4o, Qwen Max (Mainland China only).
- **Generate documentation / tests:** Gemini 2.5 Pro, GPT-4o, Qwen Max (Mainland China only).
- **Self-review:** Claude 3.7 Sonnet, GPT-4o, GPT-4o mini.
- **Completion model:** Mellum by default; AI Enterprise can use alternative provider models for completion.

---

## Permissions & Security

- **Authentication / access:** AI Assistant can be activated through a JetBrains AI subscription, BYOK API keys, provider account OAuth (for supported agents), or ACP-compatible agents.
- **Default approval model:** Junie requests permission before bash commands, file operations, and external tool use.
- **Higher-autonomy controls:** Brave mode removes confirmation prompts; Action Allowlist can approve exact commands or regex-style similar commands.
- **Path restrictions:** Junie has a configurable **Project path**; it requests confirmation to edit outside that directory.
- **File/folder restrictions:** `.aiignore` blocks AI Assistant from processing matching files/folders; `.noai` disables all AI Assistant features for a project.
- **Plugin/project disablement:** Users can disable AI Assistant for the current project or disable/uninstall the plugin entirely.
- **Network blocking:** JetBrains documents blocking `https://api.jetbrains.ai/` (or `https://api.ai.jetbrains.com.cn/` for Mainland China) and `https://api.app.prod.grazie.aws.intellij.net/` to restrict AI Assistant on the network level.
- **Enterprise provider controls:** AI Enterprise can route usage through JetBrains AI, OpenAI Platform, Azure OpenAI, Google Vertex AI, or Amazon Bedrock via IDE Services profiles.
- **Encryption, audit logs, SSO, SCIM, RBAC:** [NO OFFICIAL DATA] specific to AI Assistant in the retrieved official sources.
- **Certifications / compliance mapping:** JetBrains points to the **Trust Center**, but an AI Assistant-specific certification matrix is [NO OFFICIAL DATA] in the retrieved sources.

---

## Privacy & Data Processing

- **What data is transmitted:** Prompts, pieces of code, file types, frameworks used, and other context needed for the request. JetBrains AI Terms define `Data` broadly to include source code, information derived from source code, and usage-related information submitted with inputs or observed after outputs.
- **Where data is processed:**
  - JetBrains AI service path: request coordinated by JetBrains AI service, then forwarded to LLM provider.
  - BYOK path: sent directly to the configured provider.
  - Provider-account agent path: sent directly to the agent provider.
  - ACP path: sent directly to the ACP agent provider.
  - Detailed code-related data collected by JetBrains is stored within the **EEA**.
- **Whether data is stored:** JetBrains says JetBrains AI service requests are not stored or processed by JetBrains unless **Send detailed code-related data** is enabled. A local requests log can also be written to `ai-assistant-requests.md` for the current session when request logging is enabled.
- **Retention period:** Detailed code-related data is retained for **1 year**. Local AI Assistant request logs are stored for the **current AI Assistant session**.
- **Training opt-in / opt-out:** Detailed code-related data collection is controlled by opt-in mechanisms and disabled by default in the IDE settings. For commercial users and organizations, explicit informed consent is required; company-level permission gates organizational collection.
- **Training on user data:** If detailed code-related data collection is enabled, prompts and responses may be used for product improvement and training JetBrains models. Behavioral data is not used for training models that generate code or text.
- **Data deletion:** JetBrains Privacy Notice says users may request personal-data removal via JetBrains Account or `privacy@jetbrains.com`.
- **Admin visibility:** [NO OFFICIAL DATA] in the retrieved AI Assistant sources.
- **Subprocessors / AI subprocessors:** Official pages identify OpenAI, Google, Anthropic, xAI, Baseten, and Tavily for AI-related processing, plus a broader third-party subprocessor list.
- **Privacy policy URL:** https://www.jetbrains.com/legal/docs/privacy/privacy/
- **DPA availability:** https://www.jetbrains.com/legal/dpa/

---

## Limitations & Risks

### Functional limitations
- **Model compatibility:** With BYOK or local models, unsupported features become unavailable.
- **IDE-specific availability:** Junie is **not available in DataGrip**.
- **License-tier availability:** AI Free is unavailable in Android Studio and in free Community editions of IntelliJ IDEA and PyCharm; some tiers require newer IDE versions.

### Technical limitations
- **Feature dependence on model assignment:** Features rely on assigned or fallback models; if no compatible model is available, the feature is unavailable.
- **Completion-model requirement:** Local completion works only with **Fill-in-the-Middle (FIM)** models.
- **No documented general built-in sandbox:** The retrieved official docs describe approvals, allowlists, and path restrictions, but do not publish a dedicated built-in command sandbox for AI Assistant.

### Licensing and cost limitations
- **Quota exhaustion:** Cloud-based features become unavailable after AI Credits are exhausted unless quota renews or Top-up AI Credits are available.
- **Pricing-table ambiguity:** Retrieved licensing docs show two pricing tables for several tiers; exact applicability is **[NEEDS UPDATE]**.

### Data and privacy risks
- **Sensitive data exposure risk:** JetBrains AI Terms state that users are responsible for selecting files and inputs shared with JetBrains AI and for any sensitive or protected information contained in them.
- **Provider-dependent processing:** Depending on configuration, prompts and context may be sent to third-party providers or agent providers.

### Quality and correctness risks
- **Output accuracy:** JetBrains AI Terms state that users are responsible for evaluating whether outputs and suggestions are correct and fit for their purpose.
- **Agent action risk:** Brave mode reduces approval prompts and increases operational risk if used in a trusted environment without careful review.

---

## Alternatives

> Official JetBrains sources do not provide a competitor comparison page for AI Assistant. The alternatives below are official alternative agent paths or configurations documented by JetBrains.

| Alternative | Type | Advantage of JetBrains AI Assistant | Advantage of alternative | When to choose alternative |
|------------|------|-------------------------------------|--------------------------|----------------------------|
| Junie | Integrated JetBrains agent | AI Assistant includes chat, in-editor features, VCS features, model selection, and agent access in one product surface | More autonomous multi-step execution for complex tasks | Choose Junie when you want delegated multi-file task execution |
| Claude Agent | Integrated third-party agent | AI Assistant offers broader JetBrains-native feature coverage outside a single agent workflow | Uses Claude Agent as a dedicated agent path and supports provider-specific activation flows | Choose Claude Agent when you specifically want the Claude agent workflow in AI Chat |
| Codex | Integrated third-party agent | AI Assistant provides broader JetBrains-native editor and VCS assistance alongside agent access | Supports OpenAI account OAuth and OpenAI-based agent flow | Choose Codex when your organization standardizes on OpenAI/Codex access |
| ACP-compatible external agents | External/custom agent path | AI Assistant provides built-in JetBrains features without requiring custom agent installation | Lets teams connect custom or external agents not bundled by JetBrains | Choose ACP agents when you need a non-bundled agent provider |
| Local-model configuration (Ollama / LM Studio) | Local deployment option | JetBrains AI service enables full managed model access and broader feature compatibility | Keeps model execution local to the machine for supported scenarios | Choose local models when you want local hosting and can accept feature-compatibility limits |

---

## Usage Examples

### Example 1: Project-aware AI Chat
- **Purpose:** Understand code in the current project.
- **Input:** Selected method or attached file.
- **Prompt:** `Explain this code and identify potential issues.`
- **Expected output:** Explanation in AI Chat with suggested improvements.
- **Notes:** Chat mode provides responses and suggestions but does not apply changes automatically.
- **Source:** AI Chat docs; feature set.

### Example 2: In-editor code generation
- **Purpose:** Generate code from a prompt in the editor.
- **Input:** Cursor position plus natural-language instruction.
- **Prompt:** `Generate a function that validates this DTO and returns a structured error object.`
- **Expected output:** Generated code inserted into the editor for review.
- **Notes:** Uses in-editor code generation; generated code should be reviewed before acceptance.
- **Source:** AI Assistant overview; feature set.

### Example 3: Junie Code mode task
- **Purpose:** Delegate a multi-step implementation.
- **Input:** Task description in AI Chat with Junie selected.
- **Prompt:** `Implement this change across the project, run the relevant tests, and summarize the edits.`
- **Expected output:** Junie plan, proposed commands and file changes, test execution, and a summary with rollback options.
- **Notes:** Junie requests approval by default unless Brave mode or allowlist rules are used.
- **Source:** Junie docs.

### Example 4: MCP server configuration
- **Purpose:** Connect external tools to AI Assistant.
- **Input:** MCP JSON configuration.
- **Configuration:**
```json
{
  "mcpServers": {
    "yourServerName": {
      "url": "https://example.com/mcp"
    }
  }
}
```
- **Expected output:** The MCP server appears in settings, can be started, and its tools become available to AI Assistant.
- **Notes:** AI Assistant supports STDIO and Streamable HTTP MCP transports.
- **Source:** MCP docs.

### Example 5: Local request review
- **Purpose:** Inspect requests sent to an LLM provider.
- **Input:** Enable `llm.requests.logging.mode` and open the requests log.
- **Action:** Use **Open AI Assistant Requests Log in Editor**.
- **Expected output:** `ai-assistant-requests.md` opens with the current session's logged requests.
- **Notes:** Logging is session-scoped and must be explicitly enabled.
- **Source:** How we handle your code and data.

---

## Sources

- Official product page: https://www.jetbrains.com/ai/
- AI Assistant documentation index: https://www.jetbrains.com/help/ai-assistant/
- Feature availability: https://www.jetbrains.com/help/ai-assistant/feature-set.html
- AI Chat: https://www.jetbrains.com/help/ai-assistant/ai-chat.html
- Activation scenarios: https://www.jetbrains.com/help/ai-assistant/activation-scenarios.html
- Activate agents: https://www.jetbrains.com/help/ai-assistant/activate-agents.html
- Junie agent documentation: https://www.jetbrains.com/help/ai-assistant/junie-agent.html
- MCP documentation: https://www.jetbrains.com/help/ai-assistant/mcp.html
- Supported LLMs: https://www.jetbrains.com/help/ai-assistant/supported-llms.html
- Bring Your Own Key: https://www.jetbrains.com/help/ai-assistant/bring-your-own-key-byok.html
- Use custom models / local models: https://www.jetbrains.com/help/ai-assistant/use-custom-models.html
- Disable AI Assistant / `.aiignore` / `.noai`: https://www.jetbrains.com/help/ai-assistant/disable-ai-assistant.html
- Licensing and subscriptions: https://www.jetbrains.com/help/ai-assistant/licensing-and-subscriptions.html
- How AI Assistant handles code and data: https://www.jetbrains.com/help/ai-assistant/how-we-handle-your-code-and-data.html
- JetBrains AI service overview: https://www.jetbrains.com/help/ai/jetbrains-ai.html
- JetBrains AI Terms of Service: https://www.jetbrains.com/legal/docs/terms/jetbrains-ai-service/
- JetBrains AI service providers: https://www.jetbrains.com/legal/docs/terms/jetbrains-ai/service-providers/
- Product Data Collection and Usage Notice: https://www.jetbrains.com/help/ai/data-collection-and-use-policy.html
- JetBrains Privacy Notice: https://www.jetbrains.com/legal/docs/privacy/privacy/
- JetBrains third parties and affiliates: https://www.jetbrains.com/legal/docs/privacy/third-parties/
- Data Processing Addendum: https://www.jetbrains.com/legal/dpa/
- AI Enterprise / IDE Services management: https://www.jetbrains.com/help/ide-services/manage-aie.html
