# Sourcegraph Cody
```yaml
name: "Sourcegraph Cody"
description: >
  Sourcegraph Cody is an AI coding assistant that uses large language models and Sourcegraph's code search and context retrieval to help users understand, write, and fix code faster. It is available through IDE extensions and the Sourcegraph web app, and it can use local and remote codebase context, prompts, and agentic context-fetching tools.
category: ide
logo: https://img.logo.dev/sourcegraph.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - IDE Extension
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 21:08

| Field | Description |
|-------|-------------|
| Name | Sourcegraph Cody |
| Alternative names | Cody; Sourcegraph Cody; Cody Enterprise / Enterprise AI (historical naming in Sourcegraph terms) |
| Vendor / Organization | Sourcegraph, Inc. |
| Product owner | [NO OFFICIAL DATA] |
| Homepage | https://sourcegraph.com/cody |
| Documentation | https://sourcegraph.com/docs/cody |
| Changelog | Public snapshot releases: https://github.com/sourcegraph/cody-public-snapshot/releases ; Visual Studio releases: https://github.com/sourcegraph/cody-vs/releases |
| Repository | https://github.com/sourcegraph/cody (**404 as of 24-05-2026**); public snapshot: https://github.com/sourcegraph/cody-public-snapshot ; Visual Studio client: https://github.com/sourcegraph/cody-vs |
| First release date | [UNVERIFIED] Official product release date was not stated in the reviewed docs; public snapshot repository was created on 2023-07-10 |
| Current status | Active enterprise AI coding assistant; Visual Studio client is labeled **Experimental**; Cody Free, Pro, and Enterprise Starter were sunset on 2025-07-23 according to the FAQ |
| Current version | No single product-wide version is published in the reviewed docs. Recent public client releases reviewed: VS Code `1.116.0`, JetBrains `7.116.0` (both 2025-07-30, public snapshot releases), Visual Studio `0.22.0` (2025-11-25) |
| Last updated | Public artifacts reviewed were updated through 2026-05-22 (`cody-vs` repository push date); pricing/plan FAQ reviewed includes changes effective 2025-07-23 |
| License | `cody-public-snapshot`: Apache-2.0; the live `sourcegraph/cody` repository is private/unavailable publicly |

---

## Classification

- **Primary category:** IDE assistant / IDE extension
- **Secondary categories:** Web app; CLI; enterprise coding assistant
- **Tool type:** Commercial Sourcegraph product with IDE clients, web access, CLI access, and public snapshot/client repositories
- **Problem domain:** Context-aware code understanding, editing, autocomplete, debugging, and codebase retrieval
- **User interaction type:** IDE sidebar chat, inline edit, autocomplete, prompt library, web chat, CLI chat, agentic context fetching
- **Automation type:** Assistive by default; semi-autonomous during agentic context fetching and tool use

---

## Summary

- **One-sentence description:** Sourcegraph Cody is an AI coding assistant that combines LLMs with Sourcegraph search-based context retrieval to answer questions, edit code, autocomplete code, and help debug repositories.
- **Extended description:** Official docs describe Cody as available in VS Code, JetBrains, Visual Studio, the Sourcegraph web app, and the CLI. Its main mechanism is to retrieve repository context from Sourcegraph search, keyword search, and code graph relationships before sending prompts to a model.
- **Core value proposition:** Add repository-aware context to coding assistance instead of relying on general-model knowledge alone.
- **Primary problem solved:** Reducing the manual work needed to understand codebases, make edits, generate code, and fix errors across multiple files.
- **Key differentiator:** Sourcegraph positions Cody around codebase context retrieval through Sourcegraph search APIs and repository-aware `@` mentions.
- **Target users:** Developers and engineering teams already using Sourcegraph Enterprise or Sourcegraph-connected IDE workflows.
- **Anti-target users:** Users who need a fully offline coding assistant with no external model/service connectivity, or users who need a public Cody API.
- **Primary usage context:** Daily software development inside an IDE, with optional web and CLI access.

---

## Use Cases

### Primary use cases
- Context-aware chat about a repository, file, symbol, or remote repository
- Inline code editing with Quick Edit (`Alt+K` / `Opt+K`) or Chat Panel Edit mode
- Single-line and multi-line autocomplete, plus auto-edit suggestions
- Debugging code, fixing errors, and detecting code smells
- Running reusable prompts such as `document-code`, `explain-code`, `find-code-smells`, and `generate-unit-tests`

### Secondary use cases
- Multi-repository context retrieval in supported clients
- Prompt sharing through the Prompt Library in Sourcegraph Enterprise
- Web-based code chat from Sourcegraph search results or the Chat tab
- Agentic context fetching with search, file retrieval, terminal, web, MCP, and OpenCtx tools
- Enterprise model administration with Sourcegraph-provided models, BYOK, and custom model providers

### Example workflows
1. Ask Cody in VS Code or JetBrains to explain a selected function with current-file and repository context chips.
2. Select code, press `Alt+K`, describe a change, then review the inline diff with **Accept**, **Undo**, **Retry**, or **Show Diff**.
3. Use Prompt Library to run `generate-unit-tests` or `find-code-smells` on a code selection.
4. Enable agentic context fetching so Cody can gather extra repository, terminal, web, or MCP context before answering.

### Fully automated tasks
- Auto-edit suggestions based on recent edits and cursor movement
- Agentic context gathering before a final model query

### Partially automated tasks
- Inline edits that still require human review/acceptance
- Terminal command execution that pauses for user consent
- MCP/OpenCtx retrieval that depends on enabled servers and provided credentials

### Anti-patterns
- Expecting Cody to expose a public API; the FAQ says there is no public-facing Cody API
- Assuming self-hosted Sourcegraph implies fully local inference; the FAQ states Cody still sends snippets to third-party cloud services by default
- Assuming all features have parity across VS Code, JetBrains, Visual Studio, Web, and CLI clients

---

## Features

### Core features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Chat | Repository-aware chat in IDEs, web, and CLI | Sourcegraph-connected client | Feature parity varies by client | Enterprise-focused in current docs | Documented | `/docs/cody/capabilities/chat`, `/docs/cody/clients/feature-reference` |
| Quick Edit / Chat Panel Edit | Two edit modes for inline code changes with diff review | VS Code or JetBrains client | Client support is documented for VS Code and JetBrains | Enterprise-focused in current docs | Documented | `/docs/cody/capabilities/edit-modes` |
| Autocomplete | Single-line and multi-line code completion | Supported IDE client | Quality/model depends on configuration | Enterprise-focused in current docs | Documented | `/docs/cody/clients/feature-reference`, install docs |
| Auto-edit | Suggests contextual code changes from cursor movement and recent edits | VS Code or JetBrains; Enterprise defaults with model-provider access | Visual Studio support is documented on auto-edit page, but client parity docs only mark VS Code and JetBrains for auto-edit [CONFLICTING SOURCES] | Enterprise | Documented | `/docs/cody/capabilities/auto-edit`, `/docs/cody/clients/feature-reference` |
| Prompts | Built-in and custom prompts in Prompt Library | Sourcegraph Enterprise account and Cody IDE extension | Edit-code prompts run only from the IDE editor | Enterprise | Documented | `/docs/cody/capabilities/prompts` |
| Debug code / Ask Cody to fix | Chat-based debugging, code smell detection, and code actions | VS Code or JetBrains for code-fix workflows | Accuracy is not guaranteed; outputs must be reviewed | Enterprise-focused in current docs | Documented | `/docs/cody/capabilities/debug-code`, AI Terms |
| Context retrieval | Uses Sourcegraph Search, keyword search, and code graph context | Connected Sourcegraph instance | Token/context-window limits apply | Enterprise-focused in current docs | Documented | `/docs/cody/core-concepts/context`, `/docs/cody/core-concepts/token-limits` |

### Advanced features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Agentic context fetching | Mini-agent that proactively gathers and reviews context before answering | Supported client; `cody.agenticContext` enabled (default) | Adds extra processing steps; tool availability varies | Enterprise-focused in current docs | Documented | `/docs/cody/capabilities/agentic-context-fetching` |
| Smart Apply | Inserts suggested code into the right place in an open file | Supported client | Client availability is inconsistent across official docs [CONFLICTING SOURCES] | Enterprise-focused in current docs | Documented | `/docs/cody/capabilities/chat`, install docs, feature parity page |
| Execute terminal suggestion | Executes a terminal command suggested in chat | Trusted workspace and valid shell; user approval | Terminal access can expose terminal-visible data to the LLM | Enterprise-focused in current docs | Experimental / restricted | `/docs/cody/capabilities/agentic-context-fetching` |
| Context Filters | Admin RE2 include/exclude rules for repository context usage | Sourcegraph `>=5.4.0`, feature flag enabled, supported client version | Some prompt features are disabled when exclude rules are defined | Enterprise | Documented | `/docs/cody/capabilities/ignore-context` |
| Model configuration | Configure Sourcegraph-provided models, BYOK, provider overrides, model overrides, and defaults | Sourcegraph Enterprise site config | Admin-managed; model behavior depends on provider config | Enterprise | Documented | `/docs/cody/enterprise/model-configuration`, `/docs/model-provider` |
| Image upload in chat | Vision-capable chat with screenshots, diagrams, and UI images | Vision-capable model and supported client | Availability varies by client | Enterprise-focused in current docs | Documented | `/docs/cody/capabilities/chat`, supported models page |

### Experimental features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Visual Studio client | Cody client for Visual Studio | Visual Studio 17.8+ | Listed as **Experimental** on the clients page | Enterprise-focused in current docs | Experimental | `/docs/cody/clients`, `/docs/cody/clients/install-visual-studio` |
| Terminal tool in agentic context fetching | Shell-command tool for context gathering | Trusted workspace, valid shell, approval, enterprise feature flag | Disabled by default for Enterprise users; avoid destructive commands | Enterprise | Experimental | `/docs/cody/capabilities/agentic-context-fetching` |
| MCP support | Model Context Protocol tool access through agentic context fetching | `agentic-context-mcp-enabled` feature flag; local MCP server config | Only local MCP servers; only MCP Tools are supported; no broad write restriction across all tools | Enterprise | Experimental / gated | `/docs/cody/capabilities/agentic-context-fetching` |

### Deprecated / discontinued items

| Item | Description | Status | Source |
|------|-------------|--------|--------|
| Guardrails | Feature parity page labels Guardrails as deprecated | Deprecated | `/docs/cody/clients/feature-reference` |
| Cody Free / Pro / Enterprise Starter plans | FAQ states these plans were sunset on 2025-07-23 | Discontinued | `/docs/cody/faq` |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| VS Code extension | VS Code on macOS, Windows, Linux | Primary IDE extension; install from VS Code Marketplace |
| JetBrains plugin | JetBrains IDEs | Supports IntelliJ IDEA, PyCharm, WebStorm, GoLand, CLion, Rider, RubyMine, DataGrip, Android Studio, AppCode, PhpStorm |
| Visual Studio extension | Visual Studio on Windows | Marked **Experimental** |
| Web app | Sourcegraph web interface | Chat from Code Search results or top Chat tab |
| CLI | Terminal | Feature parity page lists CLI support for chat and agentic context fetching; FAQ documents `cody chat --model ...` |

### Supported platforms and operating systems
- **VS Code / JetBrains:** local-machine workflows on macOS, Windows, and Linux are documented via installation pages and shortcuts
- **Visual Studio:** Visual Studio `17.8+` is required
- **Cloud IDEs:** official FAQ names `vscode.dev`, GitHub Codespaces, Open VSX-compatible editors including Gitpod, Coder, and `code-server`

### Supported browsers
- **[NO OFFICIAL DATA]** A browser support matrix was not found in the reviewed Cody docs.

### Commands / shortcuts / UI actions documented officially
- `Opt+L` / `Alt+L` — toggle chat in VS Code
- `Shift+Opt+L` / `Shift+Alt+L` — start a new chat in VS Code
- `Opt+K` / `Alt+K` — open Quick Edit / Edit Code
- `Opt+C` / `Alt+C` — open Cody Commands Menu in VS Code
- `Cmd+.` / `Ctrl+.` — quick fix / mode cycling depending on client context
- `@-file` — add a file as context
- `@#` — add a symbol as context (where supported)

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Example |
|------|-------------|-------------|----------------|-------------|---------|
| Interactive chat | Ask questions and iterate on code with repository context | Code understanding, explanation, generation | Low | Depends on retrieved context and selected model | Ask Cody to explain a component with `@-file` context |
| Quick Edit | Focused inline edit dialog | Small targeted code changes | Low | Best for selected or nearby code | Select code, press `Alt+K`, describe change |
| Chat Panel Edit | Edit through chat with a conversation record | When you want diff preview plus history | Low | Requires supported IDE client | Switch chat mode to **Edit** and submit instruction |
| Autocomplete / Auto-edit | Inline suggestion mode while typing | Fast code writing and repetitive updates | Low to Medium | Behavior varies by client and config | Accept grayed autocomplete text with `Tab` |
| Agentic context fetching | Gathers extra context with tools before final answer | Complex questions needing more context | Medium | Tool access, latency, and feature flags can limit behavior | Let Cody inspect codebase, terminal, or MCP sources before answering |
| Web mode | Use Cody from Sourcegraph search results or Chat tab | Repository questions without local IDE | Low | No local-file context outside web-connected context sources | Open Sourcegraph search results and click **Cody** |
| CLI mode | Chat from a terminal | Quick model-driven interaction outside the IDE | Low | Feature parity differs from IDE clients | `cody chat --model 'claude-3.5-sonnet' -m 'Hi Cody!'` |
| Enterprise self-hosted/cloud mode | Run Cody against Sourcegraph Enterprise infrastructure | Centralized governance and model administration | Policy-bounded | Self-hosted still needs external LLM connectivity by default | Configure `modelConfiguration` in site config |

---

## Architecture & Mechanisms

### Context construction and retrieval
- Cody uses **Sourcegraph Search**, **keyword search**, and **code graph** relationships as context sources.
- A typical Cody prompt is documented as **prefix + user input + context**.
- `@` mentions can add files, symbols, repositories, directories, line ranges, web URLs, remote files/directories, and OpenCtx sources depending on client.
- Cody defaults to current-file and current-repository context chips in supported IDE clients.

### Search and retrieval mechanics
- The docs state that Cody relies on Sourcegraph search as a primary context provider.
- The FAQ says embeddings were removed on Enterprise after v5.3 in favor of Sourcegraph Search.
- Repository context can be single-repo or multi-repo depending on client support.

### Agentic mechanism
- Agentic context fetching performs proactive context gathering, reflection, and iterative review loops before the final answer.
- The review step defaults to **Gemini 2.5 Flash** and falls back to **Claude Haiku** or **GPT-4.1 mini** if Flash is unavailable.
- Agentic context fetching is enabled by default and can be disabled with `cody.agenticContext`.

### Edit and apply mechanism
- Quick Edit and Chat Panel Edit use the same underlying edit system once triggered.
- Proposed changes are shown with inline decorations and code lenses such as **Accept**, **Undo**, **Retry**, and **Show Diff**.
- Smart Apply uses a targeted **Qwen 2.5 Coder** model for low-latency apply behavior when using Cody Gateway; non-Gateway enterprise setups use a Claude Sonnet-based model for Smart Apply.

### Model routing and provider architecture
- Sourcegraph Model Provider (Cody Gateway) is the default model provider for Cody and is hosted at `cody-gateway.sourcegraph.com`.
- Enterprise admins can use `modelConfiguration` to enable Sourcegraph-provided models, BYOK, provider overrides, model overrides, self-hosted models, and per-feature defaults.
- Supported provider types in official model configuration docs include `sourcegraph`, `openaicompatible`, `awsBedrock`, `azureOpenAI`, `anthropic`, `fireworks`, `google`, `openai`, and `huggingface-tgi`.

### Token and context limits
- Default output is documented as up to **4,000 tokens** for many models, with higher limits for some newer models.
- Example documented limits include **Claude Haiku 4.5** with **132,000** conversation tokens, **18,000** `@`-mention tokens, and **8,192** output tokens.
- The `enhanced-context-window` feature flag for Enterprise can expand input windows up to **150k** tokens for Anthropic and Google models.

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Required permissions / controls | Example |
|-----------|-------------|-------|------------|----------------------------------|---------|
| File and code retrieval | Cody can retrieve repository context through Search, code graph, and `@` mentions | Current repo, remote repos, files, directories, symbols, URLs | Medium | User access to repository; context filters; token limits | `@-file path/to/file.ts` |
| File editing | Inline edit, Quick Edit, Chat Panel Edit, Smart Apply, Ask Cody to fix | Open file / selected code | Medium | User reviews diff; accept/undo/show diff controls | Select code and press `Alt+K` |
| Command execution | Terminal suggestions and agentic CLI tool can execute shell commands | Trusted workspace terminal | High | Explicit user consent each time; enterprise feature flag for terminal tool | Click **Execute** on a suggested terminal command |
| Web/document retrieval | Web URLs can be added as context; agentic tool can search the web | URL-based external context | Medium | Model/tool availability; potential data sharing to LLM | Add `https://sourcegraph.com` via `@` mention |
| MCP tool use | Agentic context fetching can invoke local MCP tools | Local MCP servers only | High | `agentic-context-mcp-enabled`; provided tokens determine downstream access | Configure `cody.mcpServers` |
| OpenCtx provider use | Agentic context can use OpenCtx providers | Provider-dependent | Medium to High | Provider configuration | Use issue-tracker or external context via OpenCtx |
| Repository policy enforcement | Context filters restrict which repositories can be used for third-party LLM requests | Enterprise repositories | Medium | Site-admin RE2 include/exclude rules | Exclude repositories matching `.*secret.*` |
| Pull request creation | [NO OFFICIAL DATA] No public Cody API was found, and reviewed docs did not document native PR creation by Cody itself | [NO OFFICIAL DATA] | [NO OFFICIAL DATA] | [NO OFFICIAL DATA] | [NO OFFICIAL DATA] |

---

## Agent Tool Primitives

The public Cody docs do not expose a separate low-level tool reference page in the reviewed sources, but the **agentic context fetching** docs enumerate the tool types available to Cody in that mode.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `Code Search` | Performs code searches for relevant context | Not stated | Documented on agentic context fetching page |
| `Codebase File` | Retrieves full file content from the codebase | Not stated | Documented on agentic context fetching page |
| `Terminal` | Executes shell commands in the user's terminal to gather context | Yes | Requires trusted workspace and valid shell; disabled by default for Enterprise users |
| `Web Browser` | Searches the web for live context | Not stated | Documented on agentic context fetching page |
| `MCP` | Calls configured MCP server tools and injects returned context | Not stated | Disabled by default; local servers only; Tools only |
| `OpenCtx` | Uses OpenCtx providers as external context sources | Not stated | Provider-dependent |

---

## Integrations

### Native integrations
- **Sourcegraph Code Search:** Cody can be opened from Sourcegraph search results and uses Sourcegraph search as a context provider.
- **IDE clients:** VS Code, JetBrains, Visual Studio, and Sourcegraph Web.
- **CLI:** feature parity page lists CLI support for chat and agentic context fetching.

### Code host and identity integrations
- **GitHub** and **GitLab** sign-in / connection flows are referenced on the product and docs pages.
- **Self-hosted auth options:** SAML, OAuth, HTTP Proxy auth, and OpenID Connect are documented on Sourcegraph security pages for self-hosted deployments.

### Marketplace / environment integrations
- **VS Code Marketplace** and **Open VSX Registry** for VS Code-family installs.
- **JetBrains Marketplace** for JetBrains plugin install.
- **Cloud IDEs:** `vscode.dev`, GitHub Codespaces, Gitpod, Coder, and `code-server` are named in the FAQ.

### Context and tool integrations
- **OpenCtx** providers for external context.
- **MCP** local servers through `cody.mcpServers`.
- **Web URLs** as explicit context sources.

### Model-provider integrations
- Via `modelConfiguration`, official provider types include Sourcegraph Model Provider, OpenAI-compatible endpoints, AWS Bedrock, Azure OpenAI, Anthropic, Fireworks, Google/Vertex, OpenAI, and Hugging Face TGI.

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | Official supported-model docs list Anthropic Claude Opus 4.7/4.6/4.5, Claude Sonnet 4.6/4.5, Claude Haiku 4.5; Google Gemini 2.5 Flash/Pro, Gemini 3 Flash, Gemini 3.1 Flash Lite, Gemini 3.1 Pro (beta); OpenAI GPT-5.4 family, GPT-5.2/5.1/5, GPT-4o/4.1 families, `o3`, and `o4-mini`; Fireworks-hosted models for autocomplete and Smart Apply |
| Models publicly disclosed | Yes |
| User model selection | Yes in IDE/web on supported enterprise configurations; the FAQ also documents CLI `--model` usage [CONFLICTING SOURCES with feature parity page for CLI] |
| Proprietary models | Partially. Sourcegraph documents Fireworks-hosted fine-tuned models for autocomplete/auto-edit and Smart Apply; core chat models are third-party provider models |
| External models | Anthropic, Google, OpenAI, Fireworks AI |
| Local models | Yes on Enterprise through `selfHostedModels`, `modelOverrides`, or OpenAI-compatible/self-hosted provider configuration |
| Multimodal models | Yes. Vision-capable chat models are documented, including Claude Sonnet/Opus variants and GPT-4o/GPT-4o-mini |
| Context window | Model-dependent. Example documented limits range from shared **7,000** token contexts on some older models to **132,000 + 18,000** split limits on Claude Haiku 4.5, with enhanced Enterprise contexts up to **150k** input tokens |
| Token limits | Many models default to **4,000** output tokens; newer models can exceed this in the official token-limits table |
| Latency | [NO OFFICIAL DATA] No general product-wide latency figure was published in the reviewed docs; Smart Apply specifically uses a targeted model for lower latency |
| Processing region | United States is stated in privacy/subprocessor materials for stored personal information and listed subprocessors |
| Training on user data | Sourcegraph partner LLMs do not retain enterprise inputs/outputs beyond response generation and do not train on Enterprise code; Sourcegraph may finetune with customer data only if the feature is enabled. For individuals using Cody via Sourcegraph.com, Sourcegraph may use prompts/responses to enhance user experience, but docs say it does not use the data to train models |
| Information status | Confirmed, with some client/version details only partially confirmed from public snapshot repositories |

---

## Permissions & Security

- **Repository access scope:** The FAQ states Sourcegraph enforces read permissions when retrieving snippets for Cody responses.
- **Terminal access:** Agentic terminal commands require explicit approval each time, require a trusted workspace and valid shell, and may expose terminal-accessible information to the LLM.
- **Context allow/deny controls:** Admins can define `cody.contextFilters.include` and `exclude` rules using RE2 regex patterns.
- **Cloud deployment security:** Sourcegraph security docs state cloud infrastructure is on GCP, storage is encrypted at rest, transport is encrypted in transit, and customer instances are segregated.
- **Cloud logs:** Security docs state logs are retained for up to **365 days** and access is restricted to limited personnel.
- **Self-hosted security:** Sourcegraph states self-hosted instances do not send customer code to other servers, but the Cody FAQ separately states Cody sends snippets to third-party cloud services by default for inference; these statements describe different layers and should be read together.
- **Auth / SSO:** Self-hosted Sourcegraph documents SAML, OAuth, HTTP Proxy auth, and OpenID Connect support.
- **Employee access:** Security docs say only restricted employees can access customer cloud instances for support/maintenance, with access logged and monitored.
- **Encryption:** Cloud storage encrypted at rest; data encrypted in transit. Self-hosted encryption at rest/in transit is configurable and recommended.
- **Certifications:** [NO OFFICIAL DATA] No certification list (for example SOC 2 / ISO 27001) was found in the reviewed Cody-specific sources.
- **Regulatory/privacy rights:** Privacy policy documents GDPR-style rights including access, correction, restriction, portability, objection, and erasure.

---

## Privacy & Data Processing

- **What data is transmitted:** AI Terms say Sourcegraph collects inputs, outputs, candidate context, and chat transcripts solely to provide the service; docs also mention usage data and feedback.
- **Where data is processed:** Privacy policy states Sourcegraph stores and processes collected information in the **United States**.
- **Whether data is stored:** Sourcegraph may store or persist inputs/outputs to enable AI tool functionality even though partner LLMs operate under zero-retention terms.
- **Retention period:** Privacy policy states personal information is retained while the account is active or as needed for legal, fraud-prevention, tax, accounting, or audit obligations; security page says logs may be retained up to **365 days**.
- **Training policy:** Partner LLMs do not train on Enterprise customer code; Sourcegraph may finetune only if the product feature is enabled. Sourcegraph.com individual usage may be used to enhance the user experience, but docs say not to train models.
- **Deletion:** Users can update or delete personal information by updating profile settings or deleting the account.
- **Prompt logging / history:** Cody chat history is stored and can be exported to JSON or deleted in supported clients; AI Terms also list chat transcripts as collected customer content.
- **Subprocessors:** Official subprocessors page lists Anthropic AI, Fireworks AI, Google (LLM), OpenAI (embeddings when enabled), Cloudflare, Google Cloud, Sentry, and Sparkpost.
- **Privacy policy URL:** https://sourcegraph.com/terms/privacy
- **DPA availability:** [NO OFFICIAL DATA] A separate DPA URL was not identified in the reviewed Cody sources.
- **Admin usage visibility:** [NO OFFICIAL DATA] The reviewed Cody docs do not describe a Cody-specific admin transcript visibility feature.

---

## Limitations & Risks

- **No public API:** The FAQ states there is no public-facing Cody API.
- **Output accuracy risk:** AI Terms state Sourcegraph does not guarantee accuracy and requires users to review and validate outputs before use.
- **External inference dependency:** The FAQ states self-hosted Cody still sends snippets of code (up to **28 KB per request**) to third-party cloud services by default.
- **Terminal data exposure:** Agentic terminal use may share any terminal-accessible information with the LLM.
- **MCP write-risk:** Cody currently supports only MCP Tools, only for local servers, and official docs state there is no broad way to limit write access across all MCP tools.
- **Client parity gaps:** Official install docs and feature parity docs do not fully agree on Smart Apply / Execute coverage across clients [CONFLICTING SOURCES].
- **Plan discontinuity:** Cody Free, Pro, and Enterprise Starter were sunset on 2025-07-23, so older pricing references may no longer reflect current availability.
- **Token/context limits:** Large file mentions and large chats can hit context-window limits and produce `File too large` or related errors.

---

## Alternatives

Sourcegraph's current pricing page says Sourcegraph works with **Claude Code, Cursor, Codex, Amp, and more**, but the reviewed Cody materials do not include an official comparative matrix. The table below therefore lists adjacent tools explicitly named by Sourcegraph without adding unsourced comparative claims.

| Alternative | Type | Official basis | Notes |
|-------------|------|----------------|-------|
| Claude Code | Adjacent coding tool | Sourcegraph pricing page | [NO OFFICIAL DATA] No official Cody-vs-Claude-Code comparison in reviewed sources |
| Cursor | Adjacent coding tool / IDE | Sourcegraph pricing page | [NO OFFICIAL DATA] No official Cody-vs-Cursor comparison in reviewed sources |
| Codex | Adjacent coding tool | Sourcegraph pricing page | [NO OFFICIAL DATA] No official Cody-vs-Codex comparison in reviewed sources |
| Amp | Adjacent coding tool | Sourcegraph pricing page and FAQ (migration messaging after Cody Free/Pro sunset) | FAQ directs former Cody Free/Pro users to Amp credits after sunset |

---

## Usage Examples

### 1. CLI chat with explicit model

**Purpose:** Start a Cody CLI chat with a chosen model.

```bash
cody chat --model 'claude-3.5-sonnet' -m 'Hi Cody!'
```

**Expected output:** A model-generated chat response in the terminal.

**Source:** `/docs/cody/faq`

### 2. Quick Edit in the IDE

**Purpose:** Request a targeted inline code change.

1. Select code in VS Code or JetBrains.
2. Press `Opt+K` / `Alt+K`.
3. Describe the change.
4. Review the inline diff and choose **Accept**, **Undo**, **Retry**, or **Show Diff**.

**Source:** `/docs/cody/capabilities/edit-modes`

### 3. Repository context filter configuration

**Purpose:** Restrict which repositories Cody may use as context for third-party LLM requests.

```json
{
  "cody.contextFilters": {
    "include": [
      { "repoNamePattern": "^github\\.com/sourcegraph/.+" }
    ],
    "exclude": [
      { "repoNamePattern": ".*secret.*" }
    ]
  }
}
```

**Expected output:** Cody only uses repository context that matches `include` and does not match `exclude`.

**Source:** `/docs/cody/capabilities/ignore-context`

### 4. Minimal Enterprise model configuration

**Purpose:** Enable Sourcegraph-provided models through Cody Gateway.

```json
{
  "cody.enabled": true,
  "modelConfiguration": {
    "sourcegraph": {}
  }
}
```

**Expected output:** Sourcegraph-provided models become available and requests route through Cody Gateway.

**Source:** `/docs/cody/enterprise/model-configuration`, `/docs/model-provider`

### 5. MCP server configuration in an editor extension

**Purpose:** Register a local MCP server for agentic context fetching.

```json
"cody.mcpServers": {
  "<server_name>": {
    "command": "...",
    "args": ["..."],
    "env": {
      "KEY": "VALUE"
    },
    "disabledTools": []
  }
}
```

**Expected output:** Cody can decide whether to invoke tools from the configured MCP server during agentic context fetching.

**Source:** `/docs/cody/capabilities/agentic-context-fetching`

---

## Sources

- https://sourcegraph.com/cody
- https://sourcegraph.com/docs/cody
- https://sourcegraph.com/pricing
- https://sourcegraph.com/docs/cody/capabilities
- https://sourcegraph.com/docs/cody/capabilities/chat
- https://sourcegraph.com/docs/cody/capabilities/edit-modes
- https://sourcegraph.com/docs/cody/capabilities/prompts
- https://sourcegraph.com/docs/cody/capabilities/auto-edit
- https://sourcegraph.com/docs/cody/capabilities/debug-code
- https://sourcegraph.com/docs/cody/capabilities/ignore-context
- https://sourcegraph.com/docs/cody/capabilities/agentic-context-fetching
- https://sourcegraph.com/docs/cody/capabilities/supported-models
- https://sourcegraph.com/docs/cody/core-concepts/context
- https://sourcegraph.com/docs/cody/core-concepts/token-limits
- https://sourcegraph.com/docs/cody/clients
- https://sourcegraph.com/docs/cody/clients/feature-reference
- https://sourcegraph.com/docs/cody/clients/install-vscode
- https://sourcegraph.com/docs/cody/clients/install-jetbrains
- https://sourcegraph.com/docs/cody/clients/install-visual-studio
- https://sourcegraph.com/docs/cody/clients/cody-with-sourcegraph
- https://sourcegraph.com/docs/cody/enterprise/model-configuration
- https://sourcegraph.com/docs/model-provider
- https://sourcegraph.com/docs/cody/faq
- https://sourcegraph.com/security
- https://sourcegraph.com/terms/ai-terms
- https://sourcegraph.com/terms/privacy
- https://sourcegraph.com/terms/subprocessors
- https://github.com/sourcegraph/cody-public-snapshot
- https://github.com/sourcegraph/cody-public-snapshot/releases
- https://github.com/sourcegraph/cody-vs
- https://github.com/sourcegraph/cody-vs/releases
