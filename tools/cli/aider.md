# Aider

```yaml
name: "Aider"
description: >
  Open-source AI pair programming tool for the terminal that edits local files in a git repository
  using user-selected LLM APIs or local models. It provides chat modes, repository mapping,
  automatic git commits, scripting, and optional browser, voice, and editor-adjacent workflows.
category: cli
logo: https://img.logo.dev/placeholder?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | Aider |
| Alternative names | `aider` (CLI command), `aider-chat` (Python package) |
| Vendor / Organization | Aider AI LLC |
| Product owner | Aider AI LLC |
| Homepage | https://aider.chat |
| Documentation | https://aider.chat/docs/ |
| Changelog | https://aider.chat/HISTORY.html |
| Repository | https://github.com/Aider-AI/aider |
| First release date | 2023-06-07 (earliest tagged release found in the official repository: `v0.5.0`) |
| Current status | Beta (`Development Status :: 4 - Beta` in package metadata) |
| Current version | `v0.86.2` (latest stable Git tag); main branch package version is `0.86.3.dev` |
| Last updated | 2026-02-12 (`v0.86.2` tag date) |
| License | Apache-2.0 |

---

## Classification

- **Primary category:** Coding Agent
- **Secondary categories:** CLI Tool, Terminal pair-programming tool
- **Tool type:** Open-source local CLI with external-model connectivity
- **Problem domain:** AI-assisted code editing, repository navigation, git-based software development
- **User interaction type:** CLI chat, one-shot CLI execution, browser UI, file-watching editor workflow, Python scripting API
- **Automation type:** Semi-autonomous by default; can run one-shot automated tasks with CLI flags such as `--message` and `--yes-always`

---

## Summary

- **One-sentence description:** Aider is a terminal-first coding agent that edits local repositories with user-selected LLMs and git-integrated change tracking.
- **Extended description:** Aider operates on files in a local git repository, sends repository context and selected files to the configured model, applies edits, and records changes with git-aware workflows. It also supports dedicated ask/help/architect modes, scripting, optional browser GUI, URL and image context, and optional voice input.
- **Core value proposition:** Combine local-repository editing, model/provider choice, repository mapping, and automatic git bookkeeping in a single terminal workflow.
- **Primary problem solved:** Coordinating multi-file code changes and codebase reasoning from a terminal session without manually copying full context into a model chat.
- **Key differentiator:** Aider combines a repository map, explicit chat modes, automatic git commits, and separate main/editor/weak model roles in one CLI.
- **Target users:** Developers who work in git repositories and are comfortable using a terminal or terminal-adjacent workflow.
- **Primary usage context:** Local development on an existing or new project, including feature work, refactoring, bug fixing, code discussion, and scripted batch changes.

---

## Use Cases

### Primary use cases
- Implementing or refactoring code in a local git repository.
- Asking questions about a codebase without editing files by using `ask` mode.
- Running architect/editor workflows where one model proposes changes and another translates them into edits.
- Reviewing or discussing recent git changes by adding diff output to the chat.

### Secondary use cases
- Running one-shot scripted edits with `--message` or `--message-file`.
- Using local models through Ollama or other OpenAI-compatible endpoints.
- Using `--watch-files` to drive edits from comments placed in files inside an IDE or text editor.
- Combining a web-chat LLM with Aider's local editing workflow through `/copy-context`, `/paste`, or `--copy-paste`.
- Voice-driven prompting with `/voice` when optional dependencies are installed.

### Example workflows
- **Ask/code workflow:** discuss an approach in `/ask`, then switch to `/code` and execute the agreed change.
- **Architect/editor workflow:** run `/architect` or `--architect` so the main model proposes a solution and the editor model produces file edits.
- **Editor-integrated workflow:** run `aider --watch-files`, add `AI!` or `AI?` comments in source files, and let Aider react to those instructions.
- **Batch workflow:** run `aider --message "..." <files>` so Aider performs one task and exits.

### Anti-patterns and documented constraints
- Adding all files to the chat is discouraged because it can confuse the model and increase token cost.
- Very large repositories are supported but are not optimized for quick performance.
- Aider currently works with one repository at a time.
- Less capable models may return code instead of valid edit instructions and may work poorly.

---

## Features

### Core features

| Feature | Description | Plan availability | Status | Source |
|---------|-------------|-------------------|--------|--------|
| Git-integrated editing | Aider can create a git repo if needed, auto-commit its own edits, make separate dirty-file commits, and provide `/diff`, `/undo`, `/commit`, and `/git` workflows. | All installations | Stable | https://aider.chat/docs/git.html |
| Chat modes | Supports `code`, `ask`, `architect`, and `help` modes, with `code` as the default. | All installations | Stable | https://aider.chat/docs/usage/modes.html |
| Repository map | Sends a compact repository map with important symbols and signatures; default map budget is 1k tokens and can be adjusted with `--map-tokens`. | All installations | Stable | https://aider.chat/docs/repomap.html and https://aider.chat/docs/config/options.html |
| Multi-provider model support | Connects to OpenAI, Anthropic, Gemini, DeepSeek, OpenRouter, Ollama, GitHub Copilot, Vertex AI, Bedrock, and other OpenAI-compatible APIs. | All installations | Stable | https://aider.chat/docs/llms.html |
| CLI scripting | `--message` and `--message-file` run a single instruction and exit; Python scripting is also available through `Coder.create()`. | All installations | Stable | https://aider.chat/docs/scripting.html |
| Lint/test repair loop | Can lint edited files, run configured tests, and attempt to fix failures; built-in linting exists for many popular languages. | All installations | Stable | https://aider.chat/docs/usage/lint-test.html and https://aider.chat/docs/config/options.html |
| Config system | Options can be set through CLI flags, `.aider.conf.yml`, environment variables, or `.env` files. | All installations | Stable | https://aider.chat/docs/config.html |
| Read-only context | Supports read-only files via `--read` or `/read-only`, so reference files can be included without being edited. | All installations | Stable | https://aider.chat/docs/config/options.html and https://aider.chat/docs/usage/commands.html |

### Advanced and configuration-dependent features

| Feature | Description | Plan availability | Status | Source |
|---------|-------------|-------------------|--------|--------|
| Architect/editor mode | Main model acts as architect; editor model turns the proposal into concrete edits. `--editor-model` and `--editor-edit-format` are configurable. | All installations | Stable | https://aider.chat/docs/usage/modes.html and https://aider.chat/docs/config/options.html |
| Browser UI | `--gui` / `--browser` runs Aider in a browser. | All installations; browser dependencies included in `paulgauthier/aider-full` image | Stable | https://aider.chat/docs/config/options.html and https://aider.chat/docs/install/docker.html |
| Copy/paste web-chat workflow | `/copy-context`, `/paste`, and `--copy-paste` support manual collaboration with an external web-chat LLM. | All installations | Stable | https://aider.chat/docs/usage/copypaste.html |
| URL and image context | Supports adding image files and scraping URLs into chat context; `python -m aider.scrape` exposes scraping on the command line. | All installations; Playwright improves page coverage | Stable | https://aider.chat/docs/usage/images-urls.html and https://aider.chat/docs/install/optional.html |
| Voice input | `/voice` records audio and transcribes it into a chat instruction. | Optional dependency (PortAudio/related setup) | Stable | https://aider.chat/docs/usage/voice.html and https://aider.chat/docs/install/optional.html |
| File-watching editor workflow | `--watch-files` scans files for `AI`, `AI!`, and `AI?` comments and can execute edit or question workflows from source comments. | All installations | Stable | https://aider.chat/docs/usage/watch.html and https://aider.chat/docs/config/options.html |
| Prompt caching | Prompt caching can be enabled with `--cache-prompts`; keepalive pings are configurable. | Provider/model dependent | Stable | https://aider.chat/docs/config/options.html |
| History and replay files | Supports input history, markdown chat history, LLM history logs, and restoring previous chat history. | All installations | Stable | https://aider.chat/docs/config/options.html |

### Recently documented changes

| Release stream | Documented changes | Source |
|---------------|--------------------|--------|
| `main` branch release notes | Adds support for Claude 4.5/4.6 aliases, Gemini 3 preview models, DeepSeek Reasoner, GPT-5.1/5.2 and GPT-5.3/5.4 variants, and `/ok` shortcut behavior. | https://aider.chat/HISTORY.html |
| `v0.86.1` | Adds `reasoning_effort` setting for GPT-5 models and disables temperature by default for GPT-5 family. | https://aider.chat/HISTORY.html |
| `v0.86.0` | Expands GPT-5 family support across OpenAI, Azure, and OpenRouter. | https://aider.chat/HISTORY.html |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| Terminal CLI | macOS, Linux, Windows | Primary interface; launched via the `aider` command. |
| Browser UI | Browser on local machine | Enabled with `--gui` / `--browser`. |
| Python API | Python | Available through `aider.coders.Coder` and related classes; explicitly not guaranteed to be backwards compatible. |
| Editor/IDE workflow | Any editor or IDE that can edit files | `--watch-files` monitors repository files for `AI` comments. |
| Docker image | Container runtime | Official images: `paulgauthier/aider` and `paulgauthier/aider-full`. |

### Supported platforms and operating systems
- **Operating systems:** macOS, Linux, Windows. Source: install guide and one-liner installers at https://aider.chat/docs/install.html
- **Python runtime:** package metadata requires Python `>=3.10,<3.15`. Source: https://github.com/Aider-AI/aider/blob/main/pyproject.toml
- **Installer bootstrap range:** `aider-install` works when Python 3.8-3.13 is already installed and can install a separate Python 3.12 if needed. Source: https://aider.chat/docs/install.html
- **Alternative environments:** Docker, GitHub Codespaces, and Replit are documented install paths. Source: https://aider.chat/docs/install.html

### Commands and slash commands

#### Representative CLI commands
```bash
python -m pip install aider-install
aider-install

aider --model sonnet --api-key anthropic=<key>
aider --architect
aider --message "make a script that prints hello" hello.js
aider --watch-files
aider --model ollama_chat/<model>
```

#### Documented in-chat slash commands
- File/context: `/add`, `/drop`, `/ls`, `/read-only`, `/map`, `/map-refresh`, `/tokens`, `/reset`
- Mode/model control: `/code`, `/ask`, `/architect`, `/chat-mode`, `/model`, `/models`, `/weak-model`, `/editor-model`, `/reasoning-effort`, `/think-tokens`
- Git and editing: `/diff`, `/undo`, `/commit`, `/git`, `/ok`
- Execution and repair: `/run`, `/lint`, `/test`, `/load`
- Input/output helpers: `/editor`, `/copy`, `/copy-context`, `/paste`, `/voice`, `/web`, `/settings`, `/help`, `/report`, `/exit`

Primary source: https://aider.chat/docs/usage/commands.html

---

## Operating Modes

| Mode | Description | Autonomy level | Limitations |
|------|-------------|----------------|-------------|
| `code` | Default mode; Aider makes code changes to satisfy the request. | Semi-autonomous | Quality depends on selected model and available file context. |
| `ask` | Discusses the codebase and answers questions without editing files. | Assistive | Does not apply edits. |
| `architect` | Uses two model requests: a main architect model proposes a solution and an editor model turns it into file edits. | Semi-autonomous | Higher latency and cost because it uses two model calls. |
| `help` | Answers questions about using Aider itself. | Assistive | Intended for Aider usage/configuration questions. |
| One-shot / batch | `--message` or `--message-file` performs one task and exits. | High | Non-interactive flow; user must choose safe flags and file scope. |
| Browser UI | `--gui` runs Aider in the browser instead of terminal chat. | Same editing autonomy as configured session | Requires browser-capable setup. |
| Copy/paste mode | `--copy-paste` automates clipboard exchange with an external web-chat workflow while leaving the web-chat copy/paste steps manual. | Semi-autonomous | Intended to remain within third-party web-chat terms of service. |
| Watch-files mode | `--watch-files` listens for `AI`, `AI!`, and `AI?` comments in files and reacts when comments trigger an action. | Semi-autonomous | Only watches documented one-line comment styles and skips some large files / ignored patterns. |

Primary sources: https://aider.chat/docs/usage/modes.html, https://aider.chat/docs/config/options.html, https://aider.chat/docs/usage/watch.html, https://aider.chat/docs/usage/copypaste.html

---

## Architecture & Mechanisms

### System architecture
- Aider is packaged as a Python console application with the entry point `aider = aider.main:main`. Source: https://github.com/Aider-AI/aider/blob/main/pyproject.toml
- The package currently requires Python `>=3.10,<3.15`. Source: https://github.com/Aider-AI/aider/blob/main/pyproject.toml
- The repository's main branch reports development version `0.86.3.dev`. Source: https://github.com/Aider-AI/aider/blob/main/aider/__init__.py

### Context construction
- Aider sends a repository map plus the current user request to the LLM. The map contains filenames plus selected definitions, signatures, and symbol context from the repo. Source: https://aider.chat/docs/repomap.html
- The repository map is optimized with a graph ranking algorithm over file dependencies and defaults to a 1k-token budget via `--map-tokens`; `--map-multiplier-no-files` defaults to `2`. Source: https://aider.chat/docs/repomap.html and https://aider.chat/docs/config/options.html
- Added files, read-only files, pasted URLs, and images can all become part of chat context. Source: https://aider.chat/docs/usage/images-urls.html and https://aider.chat/docs/usage/copypaste.html

### Model roles and routing
- `--model` selects the main chat model. Source: https://aider.chat/docs/config/options.html
- `--weak-model` is used for commit messages and chat history summarization. Source: https://aider.chat/docs/config/options.html and https://aider.chat/docs/git.html
- `--editor-model` and `--editor-edit-format` are used for architect/editor workflows. Source: https://aider.chat/docs/usage/modes.html and https://aider.chat/docs/config/options.html

### File editing mechanism
- Aider uses model-specific edit formats such as whole-file, diff, unified diff, patch, `editor-diff`, and `editor-whole`; the selected format depends on the model and mode. Source: https://aider.chat/docs/faq.html, https://aider.chat/docs/usage/modes.html, and https://aider.chat/HISTORY.html
- When Aider edits files in a git repo, it normally commits those changes automatically with generated commit messages. Source: https://aider.chat/docs/git.html

### Code and command execution
- `/run` can execute shell commands and optionally add the output to the chat. Source: https://aider.chat/docs/usage/lint-test.html and https://aider.chat/docs/usage/commands.html
- `/test` and configured `--test-cmd` / `--auto-test` integrate project test execution into the edit loop. Source: https://aider.chat/docs/usage/lint-test.html and https://aider.chat/docs/config/options.html
- `/lint`, `--lint-cmd`, and `--auto-lint` integrate linting and optional repair. Source: https://aider.chat/docs/usage/lint-test.html and https://aider.chat/docs/config/options.html

### Memory and session artifacts
- Input history defaults to `.aider.input.history`, markdown chat history defaults to `.aider.chat.history.md`, and full LLM traffic can be logged with `--llm-history-file`. Source: https://aider.chat/docs/config/options.html
- `--restore-chat-history` can restore previous chat history into a new session. Source: https://aider.chat/docs/config/options.html

### Approval and safety mechanisms
- `--yes-always` accepts every confirmation automatically. Source: https://aider.chat/docs/config/options.html
- `--auto-accept-architect` is enabled by default and can be turned off. Source: https://aider.chat/docs/config/options.html
- URL detection can prompt to add pasted URLs to the chat; this behavior is controlled by `--detect-urls`. Source: https://aider.chat/docs/config/options.html
- Analytics are opt-in and require confirmation the first time they are enabled. Source: https://aider.chat/docs/more/analytics.html

### Sandboxing
- **Default local installation:** no dedicated sandbox or isolation boundary is documented for file edits or shell commands. [NO OFFICIAL DATA]
- **Docker mode:** shell commands run inside the container rather than the host environment. Source: https://aider.chat/docs/install/docker.html

---

## Tool Capabilities

| Capability | Description | Scope | Risk level | Control mechanism |
|-----------|-------------|-------|------------|-------------------|
| File reading | Reads files added to the chat and can include repo-map context from the wider repository. | Local git repository; latest filesystem copy is read when a message is sent. | Medium | User chooses files via CLI arguments, `/add`, `/read-only`, `.aiderignore`, `.gitignore`, and `--subtree-only`. |
| File editing | Applies code changes to editable files and can react to `AI!` comments in watched files. | Files in the working repository / selected chat context. | High | File selection by user, git commits, `/undo`, `--dry-run`, read-only mode for reference files. |
| Command execution | Executes shell commands through `/run`, `/git`, `/lint`, `/test`, and configured lint/test commands. | Local shell or Docker container shell. | High | Explicit slash commands, confirmations, and `--yes-always` override. |
| Code execution | Runs application, build, test, or script commands supplied by the user. | Same as command execution. | High | User-specified commands and optional chat inclusion of output. |
| Internet access | Connects to external LLM APIs and can fetch web pages for `/web` or URL ingestion. | Configured providers and requested URLs. | Medium | Provider keys/configuration, `--verify-ssl`, `--detect-urls`, optional `--disable-playwright`. |
| API usage | Works with provider-specific keys and endpoints via CLI flags, env vars, `.env`, and config files. | OpenAI-family and documented provider endpoints. | Medium | `--api-key`, `--set-env`, provider-specific env vars, model selection. |
| Approval logic | Confirmation prompts exist for session actions; can be bypassed globally. | Session-wide. | Medium | `--yes-always`, `--auto-accept-architect`, analytics opt-in. |
| Sandbox availability | No general-purpose sandbox is documented for default installs; Docker provides container isolation if chosen. | Optional Docker environment only. | Medium | Choose Docker workflow; otherwise rely on local environment controls. |

---

## Integrations

### Native and provider integrations
- **LLM providers and gateways:** OpenAI, Anthropic, Gemini, GROQ, LM Studio, xAI, Azure, Cohere, DeepSeek, Ollama, OpenAI-compatible APIs, OpenRouter, GitHub Copilot, Vertex AI, Amazon Bedrock, and other documented LLMs. Source: https://aider.chat/docs/llms.html
- **Git integration:** repository creation prompts, auto-commits, dirty-file commits, commit attribution controls, and git slash commands. Source: https://aider.chat/docs/git.html
- **Web scraping integration:** optional Playwright support improves scraping coverage for `/web` and GUI scraping. Source: https://aider.chat/docs/install/optional.html and https://aider.chat/HISTORY.html

### IDE and editor integration
- **Generic editor workflow:** `--watch-files` works with any IDE or editor by scanning repository files for `AI` comments. Source: https://aider.chat/docs/usage/watch.html and https://aider.chat/docs/install/optional.html
- **Third-party plugins noted by official docs:** the install docs explicitly mention third-party NeoVim and VS Code plugins, but they are not presented as official Aider integrations. Source: https://aider.chat/docs/install/optional.html

### Environment and packaging integrations
- **Docker:** official images `paulgauthier/aider` and `paulgauthier/aider-full`. Source: https://aider.chat/docs/install/docker.html
- **Codespaces / Replit:** documented install environments. Source: https://aider.chat/docs/install.html

### MCP support
- **Model Context Protocol:** [NO OFFICIAL DATA] in the checked Aider sources.

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | User-selected external models through documented providers such as OpenAI, Anthropic, Gemini, DeepSeek, xAI, OpenRouter, Azure, GitHub Copilot, Bedrock, Vertex AI, Ollama, LM Studio, and other OpenAI-compatible APIs |
| Models publicly disclosed | Yes |
| User model selection | Yes — `--model`, `/model`, aliases, provider-specific config, and model metadata files |
| Proprietary Aider model | No official Aider-owned model disclosed |
| External models | Yes |
| Local models | Yes — Ollama and local OpenAI-compatible APIs |
| Multimodal models | Yes, when using vision-capable models for image inputs |
| Context window | Varies by selected model; Aider stores model metadata and allows overrides via `.aider.model.metadata.json` / model settings files |
| Token limits | Vary by selected model; repo-map token budget defaults to 1k and can be changed with `--map-tokens`; chat history summarization starts after `--max-chat-history-tokens` soft limit |
| Latency | [NO OFFICIAL DATA] |
| Processing region | Aider Services privacy policy states hosting in the United States; model-provider processing region depends on the selected provider [NO OFFICIAL DATA] |
| Training on user data | Aider states its analytics never collect code, chat messages, keys, or personal info; no blanket upstream training policy for all supported model providers is disclosed in Aider docs |
| Information status | Partially confirmed |

Primary sources: https://aider.chat/docs/llms.html, https://aider.chat/docs/usage/images-urls.html, https://aider.chat/docs/config/options.html, https://aider.chat/docs/llms/ollama.html, https://aider.chat/docs/more/analytics.html

---

## Permissions & Security

- **Required permissions:** local filesystem access to the repository, git access for normal workflows, outbound network access to the chosen LLM/API provider, and optional microphone/browser dependencies for voice or Playwright-based workflows.
- **Local file access:** Aider reads the latest filesystem copy of files when a message is sent; editable and read-only files are distinguished through CLI flags and slash commands.
- **Repository scope controls:** `.aiderignore`, `.gitignore`, `--subtree-only`, and `--add-gitignore-files` influence file visibility and editing scope.
- **Internet access:** SSL verification is enabled by default with `--verify-ssl`; URLs can be detected and offered for addition to chat.
- **Approval flows:** `--yes-always` accepts confirmations automatically; architect auto-accept is configurable; analytics require explicit opt-in confirmation.
- **Sandboxing:** no general sandbox is documented for the default installation; Docker provides container isolation when chosen.
- **RBAC / SSO / SCIM / audit logs:** [NO OFFICIAL DATA]
- **Encryption claims:** the privacy policy says Aider uses "physical and electronic safeguards" but does not publish specific encryption algorithms or certifications in the checked sources.
- **Data region:** privacy policy says Services are hosted in the United States.
- **Data retention:** [NO OFFICIAL DATA]
- **Certifications / regulatory claims:** [NO OFFICIAL DATA]

Primary sources: https://aider.chat/docs/config/options.html, https://aider.chat/docs/faq.html, https://aider.chat/docs/legal/privacy.html, https://aider.chat/docs/more/analytics.html, https://aider.chat/docs/install/docker.html

---

## Privacy & Data Processing

- **What data is transmitted:** Aider sends change requests and repository context such as repo-map content and added files to the selected LLM as part of normal operation; optional analytics can send anonymous usage/error/model-format data, but Aider states these analytics do not include code, chat messages, keys, or personal info.
- **Where data is processed:** Aider Services are hosted in the United States according to the privacy policy; model prompts are processed by the user-selected provider or local model runtime.
- **Whether data is stored:** chat input history, markdown chat history, and optional LLM history files can be stored locally; analytics logging can also be written locally with `--analytics-log`.
- **Retention period:** [NO OFFICIAL DATA]
- **Training opt-out:** analytics can be disabled permanently with `aider --analytics-disable`.
- **Data deletion:** [NO OFFICIAL DATA]
- **Prompt logging:** optional via `--llm-history-file`.
- **Admin visibility / subprocessors / DPA availability:** [NO OFFICIAL DATA] in the checked documentation.
- **Privacy policy URL:** https://aider.chat/docs/legal/privacy.html

Primary sources: https://aider.chat/docs/repomap.html, https://aider.chat/docs/more/analytics.html, https://aider.chat/docs/config/options.html, https://aider.chat/docs/legal/privacy.html

---

## Limitations & Risks

| Limitation / Risk | Description | Impact | Risk level | Mitigation |
|-------------------|-------------|--------|------------|------------|
| Weak-model edit failures | Less capable models may return code instead of valid edit instructions, causing poor editing behavior. | Incorrect or unusable edits. | Medium | Use models recommended in the LLM docs / leaderboards. |
| Large-repo responsiveness | Aider works in large repositories but is not optimized for quick performance and response time in very large repos. | Slower interaction and more context management overhead. | Medium | Use `--subtree-only`, `.aiderignore`, and selective file addition. |
| Single-repo scope | Aider currently works with one repository at a time. | Cross-repo coordinated work requires manual workarounds. | Medium | Use repo maps, read-only files, or documentation files from the second repo. |
| Overloading chat context | Adding many or all files is discouraged and may distract the model while increasing token cost. | Lower answer quality and higher token spend. | Medium | Add only files relevant to the task and rely on the repo map for broader context. |
| Ollama context loss risk | Ollama defaults to a 2k context window and may silently discard excess context; Aider compensates by setting a larger request-dependent context unless overridden. | Missing context can degrade edits. | High | Use Aider's default Ollama behavior or configure `num_ctx` explicitly. |
| Docker environment mismatch | In Docker mode, `/run` executes inside the container, not the host environment. | Tests and tools may not match the host setup. | Medium | Configure the container carefully or use a native install for host-based workflows. |
| Voice in Docker | `/voice` may not work unless the container has access to the host audio device. | Voice workflow unavailable. | Low | Use native install or provide device access to the container. |
| Web-chat TOS compliance | The copy/paste workflow is designed to keep the web-chat copy/paste steps manual; users must still comply with the third-party web chat's terms of service. | Account/policy risk if misused. | Medium | Use the documented manual steps or avoid `--copy-paste` where policy is unclear. |

Primary sources: https://aider.chat/docs/llms.html, https://aider.chat/docs/faq.html, https://aider.chat/docs/llms/ollama.html, https://aider.chat/docs/install/docker.html, https://aider.chat/docs/usage/copypaste.html

---

## Usage Examples

### Install and start
```bash
python -m pip install aider-install
aider-install
cd /to/your/project
aider --model sonnet --api-key anthropic=<key>
```
**Purpose:** Install Aider and start a terminal session against a project.  
**Source:** https://aider.chat/docs/install.html

### Use architect mode
```bash
aider --architect
```
**Purpose:** Start the two-model architect/editor workflow.  
**Source:** https://aider.chat/docs/usage/modes.html and https://aider.chat/docs/config/options.html

### Run a one-shot scripted change
```bash
aider --message "make a script that prints hello" hello.js
```
**Purpose:** Perform one change and exit, suitable for shell scripting.  
**Source:** https://aider.chat/docs/scripting.html

### Work with local Ollama models
```bash
export OLLAMA_API_BASE=http://127.0.0.1:11434
ollama pull <model>
OLLAMA_CONTEXT_LENGTH=8192 ollama serve
cd /to/your/project
aider --model ollama_chat/<model>
```
**Purpose:** Connect Aider to a local Ollama runtime.  
**Source:** https://aider.chat/docs/llms/ollama.html

### Trigger changes from editor comments
```bash
aider --watch-files
```
Then place comments such as:
```js
// add factorial() ai!
```
**Purpose:** Let Aider watch repository files for `AI!` / `AI?` instructions.  
**Source:** https://aider.chat/docs/usage/watch.html

### Add a webpage to chat context
```text
/web https://aider.chat/docs/usage/tips.html
```
or:
```bash
python -m aider.scrape https://aider.chat/docs/usage/tips.html
```
**Purpose:** Import documentation or other web content into the session.  
**Source:** https://aider.chat/docs/usage/images-urls.html

---

## Sources

- https://aider.chat
- https://aider.chat/docs/
- https://aider.chat/docs/install.html
- https://aider.chat/docs/install/optional.html
- https://aider.chat/docs/install/docker.html
- https://aider.chat/docs/config.html
- https://aider.chat/docs/config/options.html
- https://aider.chat/docs/llms.html
- https://aider.chat/docs/llms/ollama.html
- https://aider.chat/docs/git.html
- https://aider.chat/docs/faq.html
- https://aider.chat/docs/usage/commands.html
- https://aider.chat/docs/usage/modes.html
- https://aider.chat/docs/usage/watch.html
- https://aider.chat/docs/usage/lint-test.html
- https://aider.chat/docs/usage/images-urls.html
- https://aider.chat/docs/usage/copypaste.html
- https://aider.chat/docs/usage/voice.html
- https://aider.chat/docs/usage/conventions.html
- https://aider.chat/docs/scripting.html
- https://aider.chat/docs/repomap.html
- https://aider.chat/docs/more/analytics.html
- https://aider.chat/docs/legal/privacy.html
- https://aider.chat/HISTORY.html
- https://github.com/Aider-AI/aider
- https://github.com/Aider-AI/aider/blob/main/README.md
- https://github.com/Aider-AI/aider/blob/main/pyproject.toml
- https://github.com/Aider-AI/aider/blob/main/aider/__init__.py
- https://github.com/Aider-AI/aider/tags
