# Continue

```yaml
name: "Continue"
description: >
  Continue is an open-source AI coding assistant delivered primarily as IDE extensions for VS Code and JetBrains, with related CLI and cloud-managed configuration workflows in the same product family. It supports chat, plan, agent, edit, and autocomplete workflows, and lets users bring their own model providers or run local models through providers such as Ollama.
category: ide
logo: https://img.logo.dev/continue.dev?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | Continue |
| Alternative names | Continue extension; "Continue - open-source AI code agent" (VS Code extension display name) |
| Vendor / Organization | Continue Dev, Inc. |
| Homepage | https://continue.dev |
| Documentation | https://docs.continue.dev |
| Changelog | https://changelog.continue.dev |
| Repository | https://github.com/continuedev/continue |
| First release date | 2024-03-15 (earliest public GitHub release found: `v0.0.38-jetbrains`) |
| Current status | Active open-source project with public IDE releases |
| Current version | VS Code stable release: `v1.2.22-vscode` (2026-03-27); VS Code manifest on `main`: `1.3.39` [CONFLICTING SOURCES] |
| Last updated | 2026-03-27 (latest stable VS Code GitHub release); repository pushed 2026-05-24 |
| License | Apache-2.0 |

---

## Classification

- **Primary category**: IDE assistant
- **Secondary categories**: Coding agent, CLI tool, CI/automation platform
- **Tool type**: Open-source IDE extension with optional cloud-managed configuration and related CLI tooling
- **Problem domain**: AI-assisted software development inside the editor
- **User interaction type**: IDE sidebar chat, inline edit, inline autocomplete, agent mode, slash commands, local configuration
- **Automation type**: Assistive and semi-autonomous; Agent mode executes tools with approval, Plan mode is read-only

---

## Summary

- **One-sentence description**: Continue is an IDE-native AI coding assistant that combines chat, plan, agent, edit, and autocomplete workflows with configurable model, context, and tool integrations.
- **Extended description**: Continue can be configured locally with `~/.continue/config.yaml` or through cloud-managed Mission Control configs. Official docs position it as model-provider-agnostic, with support for local and hosted models, MCP servers, rules, prompts, documentation indexing, and IDE context providers.
- **Core value proposition**: Users can bring their own models and tools instead of depending on a single hosted model vendor.
- **Primary problem solved**: Reducing context switching and manual codebase navigation while performing code explanation, editing, planning, and multi-step implementation work in the IDE.
- **Key differentiator**: Official docs emphasize broad model-provider support, local configuration, local-model workflows with Ollama, and MCP-based tool extensibility.
- **Target users**: Software engineers and teams using VS Code or JetBrains who want configurable AI assistance in-editor.
- **Primary usage context**: Day-to-day coding inside an IDE, with optional local/offline use when configured with local models.

---

## Use Cases

### Primary Use Cases
- Conversational code explanation and debugging in Chat mode
- Targeted inline refactoring or code generation in Edit mode
- Multi-step implementation and test-writing in Agent mode
- Safe codebase exploration and implementation planning in Plan mode
- Inline code completion with autocomplete models

### Secondary Use Cases
- Local-model coding assistance with Ollama
- Reusable slash-command workflows via prompts
- External tool and data access via MCP servers
- Documentation and codebase awareness through rules, indexed docs, and context providers

### Example Workflows
- Generate unit tests for an existing file from Agent mode
- Highlight code and ask Chat mode to explain or optimize it
- Select code and use Edit mode to refactor or add comments
- Configure `.continue/mcpServers/*.yaml` and query external systems from Agent mode
- Use `model: AUTODETECT` with Ollama to discover locally installed models

### Anti-patterns
- Using deprecated `config.json` for new setups when `config.yaml` is available and preferred
- Expecting JetBrains parity for features that official docs mark as limited or unavailable (for example, Next Edit)
- Assuming Plan mode is fully non-mutating when MCP tools are attached; official docs warn MCP tools are not filtered to read-only behavior in Plan mode

---

## Features

### Core Features

| Feature | Description | Plan availability | Status | Source |
|---------|-------------|-------------------|--------|--------|
| Chat mode | Sidebar conversation with selected code, `@` context, and session history | Open-source | Documented | Chat docs |
| Plan mode | Read-only exploration and implementation planning with built-in tools | Open-source | Documented | Plan docs |
| Agent mode | Full tool-enabled execution for file changes and terminal commands | Open-source | Documented | Agent docs |
| Edit | Inline diff-based code modification from natural-language instructions | Open-source | Documented | Edit docs |
| Autocomplete | Inline code suggestions with debounce, caching, and post-processing | Open-source | Documented | Autocomplete docs |
| Context providers | `@File`, `@Code`, `@Git Diff`, `@Terminal`, `@Open`, `@Clipboard`, `@Tree`, `@Problems`, `@Debugger`, `@Repository Map`, `@Operating System`, `@HTTP`, MCP | Open-source | Documented | Context provider docs |
| Rules | Markdown rules included in system messages for Chat, Agent, and Edit | Open-source | Documented | `config.yaml` reference |
| Prompts / slash commands | Markdown prompts become `/` commands when `invokable: true` | Open-source | Documented | Prompts docs |
| BYOM / multi-provider configuration | Users choose models/providers per role in `config.yaml` or hub configs | Open-source / Mission Control | Documented | Model/provider docs |
| Local and hub configs | Local `config.yaml` and cloud-managed Mission Control configs are both supported | Open-source / Mission Control | Documented | Config guide |

### Advanced Features

| Feature | Description | Plan availability | Status | Source |
|---------|-------------|-------------------|--------|--------|
| System message tools | Continue can encode tools as XML in the system message for model-agnostic tool use | Open-source | Documented | Agent model setup |
| MCP support | Continue supports any MCP server with the MCP context provider | Open-source / Mission Control | Documented | MCP docs |
| Documentation indexing | `docs:` entries let Continue index documentation sites | Open-source | Documented | `config.yaml` reference |
| Data destinations | Development data can be written locally or POSTed to HTTP endpoints with schema `0.1.0` or `0.2.0` | Open-source | Documented | Development data + `config.yaml` reference |
| Ollama autodetect | `model: AUTODETECT` can scan local Ollama models | Open-source | Documented | Ollama guide |
| Enterprise license key action | IDE actions include enterprise license entry and org-policy support appears in changelog | Enterprise | Documented | VS Code package / changelog |

### Experimental Features

| Feature | Description | Plan availability | Status | Source |
|---------|-------------|-------------------|--------|--------|
| Next Edit | Predicts the next code change using specialized models such as Instinct or Mercury Coder | Model-dependent | Experimental | Next Edit docs |

### Deprecated Features

| Feature | Description | Status | Source |
|---------|-------------|--------|--------|
| `config.json` | Deprecated in favor of `config.yaml` | Deprecated | YAML migration guide |
| Deprecated context providers | `@Codebase`, `@Folder`, `@Docs`, and several legacy providers are deprecated; docs recommend newer codebase/doc-awareness approaches and MCP | Deprecated | Context provider docs |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| VS Code extension | VS Code (`engines.vscode: ^1.70.0`) | Primary documented IDE extension |
| JetBrains plugin | JetBrains IDEs | Official docs describe it as community supported for autocomplete and multi-file edits |
| Local configuration | `~/.continue/config.yaml` on macOS/Linux; `%USERPROFILE%\.continue\config.yaml` on Windows | Preferred current config format |
| Hub / Mission Control config | Web-managed config synced to IDEs | Requires sign-in |
| Slash commands | Chat, Plan, Agent; also CLI | Backed by prompt blocks with `invokable: true` |

### Selected IDE Commands and Actions
- `continue.applyCodeFromChat`
- `continue.acceptDiff` / `continue.rejectDiff`
- `continue.focusEdit`
- `continue.toggleTabAutocompleteEnabled`
- `continue.forceAutocomplete`
- `continue.newSession`
- `continue.viewHistory`
- `continue.generateRule`
- `continue.enterEnterpriseLicenseKey`
- `continue.toggleNextEditEnabled`

### Common Shortcuts from Official Docs
- `Cmd/Ctrl + L`: start a new chat or send selected code to chat in VS Code
- `Cmd/Ctrl + J`: send selected code to chat in JetBrains
- `Cmd/Ctrl + I`: open Edit
- `Cmd/Ctrl + .`: cycle Chat / Plan / Agent modes
- `Tab` / `Esc`: accept or reject autocomplete and Next Edit suggestions

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations |
|------|-------------|-------------|----------------|-------------|
| Chat | Conversational assistance without tool calls | Explanations, debugging help, iteration | Low | No built-in tools included |
| Plan | Read-only built-in tools for exploration and planning | Codebase understanding, planning, investigation | Low | No built-in write tools; MCP behavior is a documented exception |
| Agent | Full built-in tool access for edits and commands | Implementing features, fixing bugs, running tests | Medium | Tool-capable model/provider required, or system-message tools fallback |
| Edit | Inline scoped modifications with diff review | Small targeted changes | Low | Best for smaller changes, not multi-step workflows |
| Autocomplete | Inline completion while typing | Fast code completion | Low | Quality depends on model choice |
| Local config | Configuration stored on the user's machine | Privacy-sensitive or offline/local-model workflows | N/A | Internet-free use depends on local models |
| Hub config | Cloud-managed configuration synchronized across IDEs | Shared/team configs and simpler setup | N/A | Requires Mission Control account |

---

## Architecture & Mechanisms

### Configuration Architecture
- Official reference defines Continue agents through `config.yaml`.
- Agents are composed of **models**, **rules**, and **tools (MCP servers)**.
- Top-level YAML sections include `models`, `context`, `rules`, `prompts`, `docs`, `mcpServers`, and `data`.

### Model Roles
Continue documents explicit model roles:
- `chat`
- `autocomplete`
- `edit`
- `apply`
- `embed`
- `rerank`

### Tool Invocation Mechanism
- In Agent mode, tools are sent with the request.
- The model may emit a tool call.
- Continue requests permission by default, unless the tool policy is set to automatic.
- Continue executes the tool and feeds the result back into the model.

### System Message Tools
Continue documents a model-agnostic tool layer called **system message tools**:
- tools are converted to XML in the system message
- the model emits structured XML tool calls
- Continue parses and executes them

### Context Construction
Documented context sources include:
- selected code
- current file
- prior conversation history
- `@` providers
- repository map / code search / documentation entries
- rules inserted into the system message

### Retrieval / Indexing
- Embedding and reranking roles are documented for vector search.
- `docs:` can crawl and index documentation sites.
- `@Repository Map` can include top-level signatures when indexing is enabled.
- Deprecated `@Codebase` / `@Docs` workflows are being replaced by newer code/document-awareness guidance and MCP-based approaches.

### Context Window and Token Controls
- Context length is model-dependent and configurable via `defaultCompletionOptions.contextLength`.
- Official examples document values such as `2048`, `8192`, and `128000`, depending on provider/model configuration.
- Output/token generation is model-dependent and configurable with `maxTokens`.

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Control mechanism |
|-----------|-------------|-------|------------|-------------------|
| File reading | Built-in tools can read files, current file, directories, repo map, diffs, and search results | Plan and Agent | Low | Tool approval / mode restrictions |
| File editing | Agent mode can create new files and edit existing files | Agent | Medium | Approval by default; tool policies can change behavior |
| Command execution | `run_terminal_command` runs commands from the workspace root | Agent | High | Approval by default |
| Web access | `fetch_url_content` and `search_web` are documented built-in tools | Plan and Agent | Medium | Tool approval / model prompt flow |
| API / HTTP usage | `@HTTP` context provider POSTs to configured URLs; MCP servers can call external systems | Config-dependent | Medium to High | User-managed configuration |
| Documentation search | Continue can index docs via `docs:` and also use Continue Docs MCP | Config-dependent | Low to Medium | User-managed configuration |
| Codebase search | Built-in search tools and repository map provide code navigation | Plan and Agent | Low | Mode restrictions |
| External tool actions | MCP servers can expose tools and data from databases or external systems | Config-dependent | High | MCP server config and tool policies |
| Sandbox / isolation | [NO OFFICIAL DATA] | [NO OFFICIAL DATA] | [NO OFFICIAL DATA] | [NO OFFICIAL DATA] |
| User consent requirements | Agent mode asks permission for tool use by default; specific tools can be excluded or made automatic via policy | Agent | N/A | Tool policies |

---

## Agent Tool Primitives

Continue does not publish a separate per-tool approval matrix. The table below reflects the named built-in tools documented in official Agent/Plan docs and default Agent-mode approval behavior.

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `read_file` | Read any file in the project | Yes (default in Agent mode) | Available in Plan and Agent |
| `read_currently_open_file` | Read the active file | Yes (default in Agent mode) | Available in Plan and Agent |
| `ls` | List files and directories | Yes (default in Agent mode) | Available in Plan and Agent |
| `glob_search` | Search for files by pattern | Yes (default in Agent mode) | Available in Plan and Agent |
| `grep_search` | Search file contents with regex | Yes (default in Agent mode) | Available in Plan and Agent |
| `fetch_url_content` | Retrieve web page content | Yes (default in Agent mode) | Available in Plan and Agent |
| `search_web` | Perform web search | Yes (default in Agent mode) | Available in Plan and Agent |
| `view_diff` | Show current git diff | Yes (default in Agent mode) | Available in Plan and Agent |
| `view_repo_map` | Show repository structure / map | Yes (default in Agent mode) | Available in Plan and Agent |
| `view_subdirectory` | Show a detailed subdirectory view | Yes (default in Agent mode) | Available in Plan and Agent |
| `codebase_tool` | Advanced codebase analysis | Yes (default in Agent mode) | Available in Plan and Agent |
| `create_new_file` | Create a file in the project | Yes (default in Agent mode) | Agent-only write tool |
| `edit_existing_file` | Modify an existing file | Yes (default in Agent mode) | Agent-only write tool |
| `run_terminal_command` | Run a terminal command from workspace root | Yes (default in Agent mode) | Agent-only execute tool |
| `create_rule_block` | Create a rule block under `.continue/rules` | Yes (default in Agent mode) | Agent-only write tool |

---

## Integrations

### IDE Integrations
- VS Code Marketplace extension
- JetBrains plugin repository distribution

### Model / Runtime Integrations
- Anthropic
- OpenAI
- Azure
- Amazon Bedrock
- Ollama
- Google Gemini
- DeepSeek
- Mistral
- xAI
- Vertex AI
- Inception
- Hugging Face Inference
- Additional hosted and local providers documented in the model provider overview

### MCP Integrations
- Continue supports any MCP server with the MCP context provider.
- Official examples include Playwright MCP, SQLite MCP, GitHub MCP, Continue Docs MCP, DeepWiki MCP, Context7 MCP, and other cookbook integrations.
- Official docs contain a conflict: one MCP page says MCP can only be used in Agent mode, while Plan-mode docs say Plan also supports all MCP tools. Treat Plan-mode MCP support as [CONFLICTING SOURCES].

### Other Official Product Integrations in the Continue ecosystem
- GitHub
- Slack
- Sentry
- Snyk
- Atlassian
- Netlify
- PostHog
- Sanity
- Supabase

### Git-related Integrations
- `@Git Diff` context provider
- `view_diff` built-in tool
- Rules can direct Agent mode to use `gh` or `glab` CLIs for repository access

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | User-selected; Continue documents support for many provider/model combinations rather than a single built-in model |
| Models publicly disclosed | Partially |
| User model selection | Yes |
| External models | Anthropic, OpenAI, Azure OpenAI, Bedrock, Ollama, Gemini, Mistral, DeepSeek, xAI, Vertex AI, Hugging Face, OpenRouter, Groq, Together AI, DeepInfra, and more |
| Local models | Yes; official docs cover Ollama, LM Studio, llama.cpp, llamafile, LlamaStack, and other local/self-hosted options |
| Multimodal models | Supported when a model exposes `image_input` capability |
| Context window | Model-dependent; configurable per model via `contextLength` |
| Token limits | Model-dependent; configurable via `maxTokens` and related completion options |
| Model roles | `chat`, `autocomplete`, `edit`, `apply`, `embed`, `rerank` |
| Local model autodetect | Yes for Ollama via `model: AUTODETECT` |
| Training on user data | [NO OFFICIAL DATA] |

### Officially documented model examples and recommendations
- **Agent / Plan / Chat / Edit**: Claude Opus 4.1, Claude Sonnet 4.6, GPT-5, Gemini 2.5 Pro, Qwen3 Coder, Devstral, Kimi K2
- **Autocomplete**: QwenCoder2.5 (1.5B, 7B), Codestral, Mercury Coder
- **Next Edit**: Instinct, Mercury Coder / `mercury-coder-nextedit`
- **Embeddings**: Nomic Embed Text, Voyage Code 3, Morph Embeddings
- **Reranking**: zerank-1, zerank-1-small, Voyage Rerank 2.5, Morph Rerank

---

## Permissions & Security

- Agent mode requests permission before tool execution by default.
- Tool policies can exclude tools or mark them automatic.
- Plan mode restricts built-in tools to read-only operations.
- Official docs warn that MCP tools are **not** filtered by Plan mode and may still have write capability.
- Mission Control user secrets are documented as **encrypted and never exposed**.
- Local-config guidance recommends environment variables instead of hardcoded secrets.
- `requestOptions` supports TLS-relevant fields such as `verifySsl`, `caBundlePath`, proxy configuration, and client certificates.

---

## Privacy & Data Processing

- Continue's privacy notice states that no personal data is required to use the open-source software.
- The same notice states that some automatic data collection may occur from open-source offerings unless the user opts out of such data sharing.
- Official development-data docs state that, by default, development data is stored locally at `.continue/dev_data`.
- `data` destinations can be configured to send event JSON blobs to local files or HTTP endpoints.
- `data.level: noCode` excludes data such as file contents, prompts, and completions.
- Local configs keep configuration on the user's machine; docs describe this path as suitable for air-gapped or strict-data-policy environments.
- The privacy notice says personal data is retained no longer than reasonably necessary, subject to legal and operational requirements.
- Training-opt-out details for model providers are not documented centrally by Continue; provider-specific terms may apply. [NO OFFICIAL DATA]

---

## Limitations & Risks

- Some Ollama models may advertise tool support but still fail to work correctly in Agent mode; official docs call this a known limitation.
- Next Edit is experimental and not available for JetBrains at the time of the current docs.
- Local offline use depends on local-model availability; cloud providers still require network access and API credentials.
- `config.json` is deprecated; new functionality is centered on `config.yaml`.
- Deprecated context providers are no longer the recommended approach for codebase/docs retrieval.
- Plan mode read-only guarantees do not extend to attached MCP tools.
- Current official sources conflict on whether MCP is Agent-only or also available in Plan mode.

---

## Pricing

> Official pricing on `continue.dev/pricing` applies to Continue's cloud-managed offerings. It is not presented as a separate price list for the Apache-2.0 open-source IDE extension itself.

| Offering | Official price | Notes |
|----------|----------------|-------|
| Open-source software / repository | No license fee stated; Apache-2.0 license | Local configs and self-managed model/provider usage remain possible |
| Starter | $3 / million tokens | "Create and run AI agents"; pay as you go |
| Team | $20 / seat / month | Includes $10 in credits per seat |
| Company | Custom pricing | Adds SAML/OIDC SSO, BYOK, invoicing, SLA |

---

## Usage Examples

### Local `config.yaml` with OpenAI-compatible provider
```yaml
name: My Config
version: 0.0.1
schema: v1

models:
  - name: gpt-5
    provider: openai
    model: gpt-5
    useResponsesApi: false
```

### Local `config.yaml` with Ollama
```yaml
name: My Local Config
version: 0.0.1
schema: v1

models:
  - name: Qwen2.5-Coder 1.5B
    provider: ollama
    model: qwen2.5-coder:1.5b
    roles:
      - autocomplete
```

### Ollama autodetect
```yaml
models:
  - name: Autodetect
    provider: ollama
    model: AUTODETECT
    roles:
      - chat
      - edit
      - apply
      - rerank
      - autocomplete
```

### MCP server block
```yaml
name: Playwright mcpServer
version: 0.0.1
schema: v1
mcpServers:
  - name: Browser search
    command: npx
    args:
      - "@playwright/mcp@latest"
```

### Prompt-backed slash command
```md
---
name: Explain invokable
description: Explains what happens when you set invokable to true
invokable: true
---

Explain that when `invokable` is set to `true`, a slash command becomes available in the IDE extensions and CLI
```

### Deprecated `config.json` example
```json
{
  "tabAutocompleteModel": {
    "title": "My Starcoder",
    "provider": "ollama",
    "model": "starcoder2:3b"
  },
  "tabAutocompleteOptions": {
    "debounceDelay": 500,
    "maxPromptTokens": 1500,
    "disableInFiles": ["*.md"]
  }
}
```

---

## Sources

- https://continue.dev
- https://continue.dev/pricing
- https://continue.dev/privacy
- https://docs.continue.dev
- https://docs.continue.dev/ide-extensions/quick-start
- https://docs.continue.dev/ide-extensions/agent/quick-start
- https://docs.continue.dev/ide-extensions/agent/how-it-works
- https://docs.continue.dev/ide-extensions/agent/model-setup
- https://docs.continue.dev/ide-extensions/plan/how-it-works
- https://docs.continue.dev/ide-extensions/chat/quick-start
- https://docs.continue.dev/ide-extensions/chat/how-it-works
- https://docs.continue.dev/ide-extensions/chat/context-selection
- https://docs.continue.dev/ide-extensions/edit/quick-start
- https://docs.continue.dev/ide-extensions/edit/model-setup
- https://docs.continue.dev/ide-extensions/autocomplete/quick-start
- https://docs.continue.dev/ide-extensions/autocomplete/how-it-works
- https://docs.continue.dev/ide-extensions/autocomplete/model-setup
- https://docs.continue.dev/ide-extensions/autocomplete/next-edit
- https://docs.continue.dev/customize/deep-dives/custom-providers
- https://docs.continue.dev/customize/deep-dives/prompts
- https://docs.continue.dev/customize/deep-dives/mcp
- https://docs.continue.dev/customize/mcp-tools
- https://docs.continue.dev/customize/model-providers/overview
- https://docs.continue.dev/customize/model-providers/top-level/openai
- https://docs.continue.dev/customize/model-providers/top-level/ollama
- https://docs.continue.dev/guides/understanding-configs
- https://docs.continue.dev/guides/ollama-guide
- https://docs.continue.dev/guides/codebase-documentation-awareness
- https://docs.continue.dev/reference
- https://docs.continue.dev/reference/json-reference
- https://docs.continue.dev/reference/yaml-migration
- https://docs.continue.dev/reference/continue-mcp
- https://docs.continue.dev/customize/deep-dives/development-data
- https://changelog.continue.dev
- https://github.com/continuedev/continue
- https://github.com/continuedev/continue/releases
- https://github.com/continuedev/continue/blob/main/README.md
- https://github.com/continuedev/continue/blob/main/docs/overview.mdx
- https://github.com/continuedev/continue/blob/main/extensions/vscode/README.md
- https://github.com/continuedev/continue/blob/main/extensions/vscode/package.json
- https://github.com/continuedev/continue/blob/main/extensions/intellij/src/main/resources/META-INF/plugin.xml
