# Pieces for Developers

```yaml
name: "Pieces for Developers"
description: >
  Pieces for Developers is a local-first developer memory platform built around PiecesOS, a desktop app, and integrations for editors, browsers, terminals, and MCP clients. It captures workflow context on-device, stores it locally by default, and exposes that context through Long-Term Memory, Timeline, Conversational Search, and cross-tool AI integrations.
category: plugin
logo: https://img.logo.dev/pieces.app?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Developer Tools
  - Local Models
```

## Tool Identification

**Last update:** 24-05-2026 21:23

| Field | Value |
|-------|-------|
| Name | Pieces for Developers |
| Alternative names | Pieces |
| Vendor / Organization | Mesh Intelligent Technologies, Inc. / Pieces.app |
| Homepage | https://pieces.app |
| Documentation | https://docs.pieces.app |
| Changelog | https://pieces.app/changelog |
| Repository | https://github.com/pieces-app |
| First release date | [UNVERIFIED] Official product first-release date was not stated in the reviewed docs; the public GitHub organization was created on 2022-03-21 |
| Current status | Active [ESTIMATED] |
| Last updated | Documentation sitemap last modified on 2026-05-20; public `docs-content` repository updated on 2026-05-20 |

---

## Classification

- **Primary category:** Plugin / cross-tool extension platform
- **Secondary categories:** Desktop app; MCP server; CLI; IDE extensions; browser extension
- **Tool type:** Hybrid local software with optional cloud services and public SDK/repository surface
- **Problem domain:** Cross-environment workflow memory, context retrieval, snippet reuse, and AI-assisted recall
- **User interaction type:** Desktop UI, IDE/editor plugins, browser extension, terminal CLI, MCP-backed AI clients
- **Automation type:** Assistive by default; semi-automatic and agentic when Conversational Search or MCP clients retrieve context across memories and tools

---

## Summary

- **One-sentence description:** Pieces for Developers captures workflow context locally and makes it retrievable from a desktop app, editor/browser plugins, terminal workflows, and MCP-connected AI tools.
- **Extended description:** The core runtime is PiecesOS, a background service that stores Long-Term Memory (LTM-2.7), manages local or cloud model access, and exposes context to the Pieces Desktop App, MCP clients, and CLI. Official docs position MCP and Long-Term Memory as the main way to bring personal workflow history into tools such as Cursor, GitHub Copilot, Claude Code, and JetBrains IDEs.
- **Core value proposition:** Reuse personal workflow history and captured context across tools without manually reconstructing prior work.
- **Primary problem solved:** Loss of development context across IDEs, browser research, terminal work, chats, and time.
- **Key differentiator:** Pieces combines local-first workflow capture (LTM-2.7) with a cross-tool runtime (PiecesOS) and MCP distribution layer rather than shipping only a single-editor coding assistant.
- **Target users:** Developers who work across browsers, editors, IDEs, terminal tools, and AI assistants and want persistent personal context.
- **Anti-target users:** Users who need a single-purpose inline code-completion product with no desktop runtime or background memory capture.
- **Primary usage context:** Day-to-day local development with optional cloud models and optional cloud backup.

---

## Use Cases

### Primary use cases
- Retrieve past workflow context through **Conversational Search** and **Timeline**.
- Bring Long-Term Memory into AI tools through **MCP** integrations.
- Save, enrich, search, reuse, and share snippets across editors and the browser.
- Generate standups, recaps, and other summaries from captured activity.

### Secondary use cases
- Query browser history, bookmarks, local files, and calendar data from the Pieces agent.
- Run terminal-based workflows through the Pieces CLI.
- Connect external services such as Google Calendar for richer context and action-taking.

### Example workflows
1. Use the web extension to save code found during research, then reopen it later in VS Code or JetBrains with preserved context.
2. Ask Cursor or GitHub Copilot, via Pieces MCP, for prior implementations or earlier debugging decisions stored in LTM-2.7.
3. Let Conversational Search answer questions scoped by app, time, or modality using captured workflow events.
4. Use Single-Click Summaries after initial memory formation to create standup updates or day recaps.

### Fully automated tasks
- Background capture of workflow context by LTM-2.7 when enabled.
- Automatic enrichment of saved materials with titles, tags, descriptions, Git context, and related metadata.
- One-click MCP client configuration for supported tools from Pieces Desktop.

### Partially automated tasks
- Conversational Search and MCP-backed retrieval, which depend on model selection, memory scope, and host-client behavior.
- Calendar operations through connectors, which require authorization and the relevant connector.

### Anti-patterns
- Assuming Pieces works without **PiecesOS**; official docs describe it as a required dependency for Desktop, MCP, and plugin workflows.
- Assuming cloud transfer never occurs; official docs state cloud and blended processing modes send data to selected cloud providers.
- Assuming every integration has the same feature set; official docs separate plugin features, desktop features, MCP setup guides, and connector availability.

---

## Features

### Core features

| Feature | Description | Requirements | Limitations | Status | Source |
|---------|-------------|--------------|-------------|--------|--------|
| Long-Term Memory (LTM-2.7) | Captures workflow context such as copied code, viewed screens, and audio; stores it locally and powers retrieval features | PiecesOS running; LTM enabled | Can be paused or disabled; capture scope depends on permissions and source controls | Documented | `docs.pieces.app/products/core-dependencies/pieces-os/long-term-memory` |
| Pieces Timeline | Chronological view of captured workflow events, summaries, and conversational searches | Pieces Desktop App; LTM-2.7 data | Depends on memory formation and captured events | Documented | `docs.pieces.app/products/desktop/timeline` |
| Conversational Search | Chat interface over captured memories with filtering by app, time, and modality | Pieces Desktop App; LTM-2.7 | Retrieval depth depends on available memories, selected models, and plan/model access | Documented | `docs.pieces.app/products/desktop/conversational-search` |
| MCP server | Exposes Pieces memory to compatible AI clients through MCP endpoints | PiecesOS running; LTM enabled | Client compatibility depends on supported schema/transport and host tooling | Documented | `docs.pieces.app/products/mcp`, `docs.pieces.app/products/desktop/configuration/mcp` |
| Plugin and extension suite | Adds saving, search, sharing, and AI workflows to IDEs, editors, browser, Raycast, and Obsidian | PiecesOS required for listed plugins | Feature parity varies by integration | Documented | `pieces.app/plugins` and per-plugin pages |
| Model management | Lets users choose cloud, local, or blended processing and enable/disable available models | Pieces Desktop App; optional Ollama for local runtime | Plan gates apply to premium cloud models | Documented | `docs.pieces.app/products/desktop/configuration/models` |
| Connectors | Links external services into Conversational Search and action-taking flows | Connector authorization | Most listed connectors are still marked coming soon | Documented | `docs.pieces.app/products/desktop/connectors` |
| Pieces Drive (legacy) | Legacy material manager for saved snippets in CLI and older workflows | Pieces CLI or older snippet workflows | Docs say new workflows should rely on LTM and Timeline instead | Legacy | `docs.pieces.app/products/integrations-overview` |

### Advanced features

| Feature | Description | Requirements | Limitations | Status | Source |
|---------|-------------|--------------|-------------|--------|--------|
| Agentic LTM | Multi-turn reasoning across summaries, conversations, events, people, browser data, local files, and other sources | LTM-2.7; PiecesOS | Capability use depends on question and enabled connectors/permissions | Documented | `docs.pieces.app/products/core-dependencies/pieces-os/long-term-memory` |
| Reflection Mode | Lets the agent reflect on its own reasoning and self-correct during Conversational Search | Conversational Search | Docs state it activates dynamically based on prompt complexity | Documented | `docs.pieces.app/products/desktop/conversational-search` |
| One-click MCP Connections | Desktop writes MCP config for supported clients and can manage connected state | Pieces Desktop App; target client installed | Some clients still require restart or separate docs/manual setup | Documented | `docs.pieces.app/products/desktop/configuration/mcp` |
| LTM Access Control | Per-application allow/disable controls for capture sources | PiecesOS Quick Menu | Only controls new capture; prior captured data remains retained unless separately removed | Documented | `docs.pieces.app/products/core-dependencies/pieces-os/long-term-memory` |

### Plan-restricted features

| Feature | Description | Free | Pro | Source |
|---------|-------------|------|-----|--------|
| Cloud / premium AI models | Access to premium cloud-hosted models | Limited usage | Unlimited usage | `docs.pieces.app/products/paid-plans` |
| Long-term memory retention | Depth of retrievable memory history | Rolling window / time-bound | Unlimited long-term memory with up to 9 months of context in reviewed FAQ text | `docs.pieces.app/products/paid-plans` |
| Cloud backup | Backup capability | Limited | Full | `docs.pieces.app/products/paid-plans` |
| Support tier | Support channel | Community | Priority | `docs.pieces.app/products/paid-plans` |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| Pieces Desktop App | macOS, Windows, Linux | Main UI for Timeline, Conversational Search, summaries, settings, connectors, and MCP management |
| PiecesOS | Background service on local machine | Required runtime for Desktop, MCP, CLI, and plugin workflows |
| VS Code extension | VS Code | Save snippets, search materials, share, and use Pieces Copilot workflows |
| JetBrains plugin | JetBrains IDEs | Save, enrich, share, search, and run Pieces Copilot workflows |
| Visual Studio extension | Visual Studio | Snippet workflows and AI assistance inside Visual Studio |
| JupyterLab extension | JupyterLab | Notebook-oriented snippet and AI workflows |
| Sublime Text plugin | Sublime Text | Snippet management and Copilot actions |
| Neovim plugin | Neovim | Command-based snippet management and Copilot access |
| Web Extension | Chrome, Edge, Firefox, Brave, Opera | Browser capture, snippet discovery, and Copilot chat continuation |
| Raycast extension | Raycast | Keyboard-driven access to saved snippets |
| Obsidian extension | Obsidian | Save, enrich, reuse, share, and ask questions about code inside notes |
| CLI | Terminal | Terminal workflows, TUI, legacy Drive commands, and MCP setup |
| MCP server | Compatible AI tools and editors | Local MCP endpoint exposed by PiecesOS |

### Supported operating systems
- **macOS:** macOS 13.0 or higher; Apple Silicon or Intel.
- **Windows:** Windows 10 (1809) or higher; 64-bit processor.
- **Linux:** Ubuntu 22+ or equivalent modern distribution; X11 is primarily supported, with Wayland requiring manual steps.

### Supported browsers
- **Web Extension:** Chrome, Edge, Firefox, Brave, and Opera.

### Commands / actions explicitly documented
- `pieces mcp setup` — CLI flow to configure supported MCP clients.
- `pieces tui` — launch terminal UI.
- `:PiecesCopilot` — open Pieces Copilot in Neovim.
- `:PiecesConversations` — manage Copilot chats in Neovim.
- `:PiecesCreateSnippet` — save selected text as a snippet in Neovim.
- `:PiecesSnippets` — browse, edit, or delete snippets in Neovim.

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Example |
|------|-------------|-------------|----------------|-------------|---------|
| Local | Processing happens locally; data stays on device by default | Privacy-sensitive workflows and on-device memory management | Low to Medium | May require local runtime and downloaded models | Use Ollama-backed local models in Pieces Desktop |
| Cloud | Data is sent to selected cloud providers for processing | When faster or premium cloud reasoning is preferred | Low to Medium | Sends data to cloud providers per selected mode/provider | Use cloud model access in Conversational Search |
| Blended | Mixes local and cloud resources | Balance privacy and speed | Low to Medium | Still involves cloud transfer | Set processing mode to Blended in Models settings |
| Offline-first | Pieces can function fully offline with local storage and local models | Air-gapped or disconnected environments | Low | Cloud-backed features and external connectors are unavailable | Use PiecesOS and local models without cloud sync |
| MCP-backed | PiecesOS serves memory to external AI clients through MCP | Context-rich workflows in tools like Cursor or GitHub Copilot | Host-dependent | Requires client setup, host support, and PiecesOS availability | Connect Cursor to `http://localhost:39300/model_context_protocol/2025-03-26/mcp` |

---

## Architecture & Mechanisms

### Core architecture
- **PiecesOS** is the local background service that orchestrates data processing, manages models, and bridges the Pieces Desktop App, MCP integrations, and CLI.
- **Pieces Desktop App** is the main user-facing application for onboarding, Timeline, Conversational Search, model settings, connectors, and MCP configuration.
- **Plugins and extensions** rely on PiecesOS to power saving, reuse, and AI workflows in external tools.

### Memory and context pipeline
- **LTM-2.7** continuously captures workflow context such as copied code, viewed screens, and audio.
- Captured data is processed and stored **locally** by default.
- Timeline, Conversational Search, Single-Click Summaries, and MCP retrieval are built on top of this memory layer.

### Retrieval and agent behavior
- Official LTM docs state the agent can search memories across summaries, events, people, and captured sources.
- The same docs state the agent can also search the web with citations (powered by **Perplexity**), read and modify Google Calendar events through the Google Calendar connector, search local files by path, grep file contents, read local files, look up browser history/bookmarks, reference a user persona, and compute natural-language time ranges.

### Model and inference architecture
- Pieces supports **Cloud**, **Local**, and **Blended** processing modes.
- Local model runtime is managed through **Ollama**.
- Official docs disclose support for cloud providers including **OpenAI**, **Anthropic**, **Google**, and **Perplexity**, and local model families including **Gemma / Code Gemma**, **Granite**, **LLaMA / CodeLLaMA**, **Mistral / Mixtral**, **Phi**, **QwQ / Coder**, and **StarCoder**.
- Pieces security documentation also states that proprietary on-device **nanomodels** handle memory formation, summarization, and retrieval locally.

### MCP transport and endpoints
- Official MCP docs show a streamable HTTP endpoint such as `http://localhost:39300/model_context_protocol/2025-03-26/mcp`.
- Official GitHub Copilot docs show an SSE endpoint such as `http://localhost:39300/model_context_protocol/2024-11-05/sse`.
- Docs note the active PiecesOS port can vary and that older schemas may be needed for compatibility with some clients.

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Required permissions / controls | Example |
|-----------|-------------|-------|------------|----------------------------------|---------|
| Memory search | Search captured memories across summaries, events, people, and sources | Local Pieces memory store | Medium | PiecesOS running; LTM enabled | Ask Conversational Search what you worked on yesterday |
| Local file search and read | Search by path, grep file contents, and read files from the machine | Local filesystem | High | Agent use inside Pieces features; local machine access | Ask the agent to find a relevant config file |
| Web search | Search the web with citations via Perplexity | External web sources | Medium | Internet access; provider-backed query | Ask for current external information during a memory-backed chat |
| Browser history and bookmarks lookup | Retrieve recent browser activity and bookmarks | Local browser data | High | Relevant browser capture/availability | Ask what documentation pages were opened earlier |
| Calendar read/write | Read, create, update, or delete events | Connected Google Calendar account | High | Google Calendar connector authorization | Create or reschedule an event from Conversational Search |
| Context capture controls | Per-app enable/disable of capture sources | Capture source list in Quick Menu | Medium | LTM Access Control settings | Disable capture for a password manager or private app |
| MCP context serving | Provide Pieces memory to external AI clients | MCP-compatible hosts | High | PiecesOS; host-client configuration; host approval behavior | Use Pieces from Cursor Agent mode |

---

## Agent Tool Primitives

Official Pieces MCP setup guides explicitly name one MCP tool: `ask_pieces_ltm`. A full vendor-published tool reference was not found in the reviewed documentation.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `ask_pieces_ltm` | MCP tool used by supported host clients to query Pieces Long-Term Memory | Host-dependent | Officially documented in Cursor and GitHub Copilot MCP setup guides; used automatically in Agent mode |

**Notes**
- Cursor docs state Agent mode should automatically utilize `ask_pieces_ltm`.
- GitHub Copilot docs state Agent mode will automatically utilize `ask_pieces_ltm`, and also mention invoking Pieces via `@pieces` in chat.
- Official docs do not publish a broader primitive list beyond this named tool in the reviewed MCP guides.

---

## Integrations

### IDE and editor integrations
- **VS Code**
- **JetBrains**
- **Visual Studio**
- **JupyterLab**
- **Sublime Text**
- **Neovim**
- **Obsidian**
- **Raycast**
- **CLI**

### Browser integration
- **Web Extension** for Chrome, Edge, Firefox, Brave, and Opera.

### MCP integrations
- **Cursor**
- **VS Code**
- **Claude Desktop**
- **Claude Code**
- **Claude Cowork**
- **GitHub Copilot**
- **JetBrains IDEs**
- **Windsurf**
- **Cline**
- **Continue.dev**
- **Zed**
- **Goose**
- **Raycast**
- **Amazon Q Developer**
- **OpenAI Codex CLI**
- **Google Gemini CLI**
- **Antigravity**
- **Rovo Dev CLI**
- **ChatGPT Developer Mode**
- **OpenClaw**
- **mcp-remote** bridge and **ngrok** setup docs are published for remote or compatibility scenarios.

### Connectors
- **Google Calendar** — available; supports reading and managing events from Conversational Search.
- **GitHub** — coming soon.
- **Slack** — coming soon.
- **Google Drive** — coming soon.
- **Microsoft Teams** — coming soon.

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models publicly disclosed | Yes, partially by provider and family |
| User model selection | Yes |
| Proprietary models | Yes — on-device “nanomodels” for memory formation, summarization, and retrieval |
| External cloud providers | OpenAI, Anthropic, Google, Perplexity |
| Local model runtime | Ollama |
| Local model families disclosed | Gemma / Code Gemma, Granite, LLaMA / CodeLLaMA, Mistral / Mixtral, Phi, QwQ / Coder, StarCoder |
| Cloud model examples disclosed | GPT-5 / GPT-4.1 / GPT-4o families; Claude 4.6 / 4.5 / 4 / 3.7 / 3.5 families; Gemini 3.1 / 3 / 2.5 / 2 families; Perplexity Sonar family |
| Processing modes | Local, Cloud, Blended |
| Plan gating | Free plan includes local models with no limits and limited cloud usage; Pro adds unlimited premium cloud model usage |

---

## Permissions & Security

### Security controls documented officially
- **SOC 2 Type II** certification is stated in the on-device storage documentation.
- Security page states Pieces maintains **SOC 2 compliance** and performs **continuous security auditing**.
- LTM Access Control allows disabling capture for individual apps.
- PiecesOS applies on-device ML to filter out sensitive information and secrets.

### Authentication
- **[CONFLICTING OFFICIAL SOURCES]** The security page states authentication is handled through **Auth0** with MFA support, while the `pieces-mcp` changelog states Pieces replaced its old authentication system and moved to **Descope**.

### Operating-system permissions
- macOS installation docs state PiecesOS requests **Screen & System Audio Recording** and **Microphone** permissions for Long-Term Memory features.
- LTM Audio requires system audio capture and microphone access.

### Telemetry and support data
- Onboarding docs present an optional **anonymous crash data** setting.
- Security page states Pieces has **no passive telemetry** in the offline-first experience.

---

## Privacy & Data Processing

- Pieces docs describe the platform as **local-first** and **on-device by default**.
- Official storage docs state code snippets, LTM-2.7 memory, user settings, Conversational Search history, and diagnostic logs stay local unless the user enables **Personal Cloud** or uses a **cloud-based model provider**.
- Official privacy and security docs state user data is **never used to train models**.
- Security docs state cloud transfer is scoped to the minimum required context and does not send full memory logs or raw archives to third-party model providers.
- Official privacy policy states connected Google user data is not used for advertising, resale, general marketing, or model training, and that disconnecting a Google account triggers deletion of retained Google user data within **30 days**, except where legal retention is required.

### Local storage locations

| Platform | Default storage path |
|----------|----------------------|
| macOS | `/Users/<username>/Library/com.pieces.os/` |
| Windows | `C:/Users/<username>/Documents/com.pieces.os/` |
| Linux | `/home/<username>/.local/share/com.pieces.os/` |

---

## Pricing

| Plan | Price | Officially documented inclusions |
|------|-------|----------------------------------|
| Free Forever | Free | Basic AI features, local storage only, community support, limited cloud backup, full access to local models, limited usage of select cloud models |
| Pieces Pro (monthly) | $18.99/month | Full access to Pro features, unlimited premium cloud model usage, longer memory retention, advanced code generation/search, priority support |
| Pieces Pro (yearly) | $169.99/year | Same Pro feature set with annual billing; docs state this is equivalent to $14.17/month |

**Plan notes**
- Free plan memory access is described as a **rolling window / time-bound** history.
- Pro plan docs describe **unlimited long-term memory with up to 9 months of context** in the reviewed FAQ text.
- Model availability may vary by plan and region.

---

## Limitations & Risks

- **PiecesOS dependency:** Official plugin and MCP docs require PiecesOS; plugins and MCP flows do not operate as documented without it.
- **Cloud transfer in some modes:** Cloud and Blended processing send data to selected cloud providers.
- **Host-dependent MCP behavior:** Approval prompts, tool invocation, and configuration behavior vary by host client.
- **Linux support caveat:** Official docs say Linux is primarily supported on **X11** and that **Wayland** requires manual steps.
- **Connector maturity:** Only Google Calendar is documented as available; GitHub, Slack, Google Drive, and Microsoft Teams are listed as coming soon.
- **Feature unlock timing:** Onboarding docs state some summary features remain locked until LTM forms an initial set of 30 memories, which typically requires 10–15 minutes of normal activity.
- **Version visibility:** Official docs do not publish a single product-wide current version for the full Pieces suite in the reviewed sources.

---

## Sources

- https://pieces.app
- https://pieces.app/plugins
- https://pieces.app/plugins/vs-code
- https://pieces.app/plugins/jetbrains
- https://pieces.app/plugins/neovim
- https://pieces.app/plugins/web-extension
- https://pieces.app/pricing
- https://pieces.app/privacy
- https://pieces.app/legal/security
- https://pieces.app/changelog
- https://pieces.app/changelog/pieces-mcp
- https://pieces.app/changelog/enhanced-control-and-new-features-across-pieces-plugins-for-jetbrains-visual-studio-visual-studio-code-and-sublime-text
- https://pieces.app/changelog/live-context-all-around-the-web-pieces-for-developers-web-extension-2-9-9
- https://pieces.app/news/pieces-for-developers-achieves-soc-2-compliance
- https://docs.pieces.app
- https://docs.pieces.app/products/desktop/onboarding
- https://docs.pieces.app/products/desktop/timeline
- https://docs.pieces.app/products/desktop/conversational-search
- https://docs.pieces.app/products/desktop/conversational-search/models
- https://docs.pieces.app/products/desktop/connectors
- https://docs.pieces.app/products/desktop/configuration/mcp
- https://docs.pieces.app/products/desktop/configuration/models
- https://docs.pieces.app/products/core-dependencies/pieces-os
- https://docs.pieces.app/products/core-dependencies/pieces-os/long-term-memory
- https://docs.pieces.app/products/core-dependencies/on-device-storage
- https://docs.pieces.app/products/integrations-overview
- https://docs.pieces.app/products/mcp
- https://docs.pieces.app/products/mcp/cursor
- https://docs.pieces.app/products/mcp/github-copilot
- https://docs.pieces.app/products/mcp/claude-code
- https://docs.pieces.app/products/large-language-models
- https://docs.pieces.app/products/paid-plans
- https://docs.pieces.app/products/meet-pieces/macos-installation-guide
- https://docs.pieces.app/products/meet-pieces/windows-installation-guide
- https://docs.pieces.app/products/meet-pieces/linux-installation-guide
- https://github.com/pieces-app
- https://github.com/pieces-app/docs-content
- https://github.com/pieces-app/support
