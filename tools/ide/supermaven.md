# Supermaven
```yaml
name: "Supermaven"
description: >
  Supermaven is a proprietary AI code-completion extension for VS Code, JetBrains IDEs, and Neovim. Official 2024 materials describe inline completions plus an in-editor chat workflow, while a later official sunset announcement says chat/agent conversations ended and free autocomplete remains available for existing customers.
category: ide
logo: https://img.logo.dev/supermaven.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - IDE Extension
  - Code Completion
```

## Tool Identification

**Last update:** 24-05-2026 21:23

| Field | Value |
|-------|-------|
| Name | Supermaven |
| Alternative names | [NO OFFICIAL DATA] |
| Vendor / Organization | Supermaven, Inc.; official blog announced that Supermaven joined Cursor on 12-11-2024 |
| Product owner | [NO OFFICIAL DATA] |
| Homepage | https://supermaven.com |
| Documentation | No standalone docs portal was identified in retrieved sources; official usage material is spread across product pages, blog posts, and the official Neovim repository README |
| Changelog | No dedicated changelog page identified; official release/status posts are published on https://supermaven.com/blog |
| Repository | https://github.com/supermaven-inc/supermaven-nvim |
| First release date | 2024-02-15 (VS Code Marketplace published date retrieved); public launch blog post dated 2024-02-22 |
| Current status | Sunsetting. Official post dated 2025-11-21 says existing customers keep free autocomplete inference for the foreseeable future, existing subscriptions are refunded, and agent conversations are no longer supported. |
| Current version | VS Code Marketplace version `1.1.12`; official blog also announced a product milestone named "Supermaven 1.0" on 2024-07-02 |
| Last updated | 2025-11-21 (latest official product-status announcement retrieved); VS Code Marketplace listing shows last updated `2024-09-18T17:50:03.98Z` |

---

## Classification

- **Primary category:** IDE
- **Secondary categories:** AI code-completion assistant; editor extension; in-editor chat surface (historical 2024 feature set)
- **Tool type:** Proprietary cloud-backed IDE extension with an official Neovim plugin
- **Problem domain:** Inline code completion, repository-aware suggestions, and editor-based code editing assistance
- **User interaction type:** Inline completions, IDE/plugin UI, hotkeys, JetBrains/VS Code extension flows, Neovim commands
- **Automation type:** Assistive and semi-automatic

---

## Summary

- **One-sentence description:** Supermaven is an editor extension that provides repository-aware inline code completions and, in 2024-era official materials, chat-driven code edits from inside the editor.
- **Extended description:** Official launch materials describe a completion system optimized for long-context repository understanding, low-latency suggestions, and awareness of edit history rather than isolated files. Later official status posts indicate the product is being sunset, with existing customers retaining autocomplete while chat/agent conversations are discontinued.
- **Core value proposition:** Keep code completion and code-edit assistance inside the editor while using repository context beyond the active file.
- **Primary problem solved:** Reducing manual typing and improving suggestion relevance in larger or project-specific codebases.
- **Key differentiator:** Official materials emphasize long-context completion (`300,000` tokens at launch, `1,000,000` tokens for Pro/Babble in July 2024) and repository processing before completion generation.
- **Target users:** Individual developers, teams using VS Code or JetBrains IDEs, and Neovim users installing the official plugin.
- **Anti-target users:** Users requiring a fully local/offline completion system, or users expecting current chat/agent functionality despite the 2025 sunset announcement.
- **Primary usage context:** Daily coding inside VS Code, JetBrains IDEs, or Neovim.

---

## Use Cases

### Primary use cases
- Inline code completion in VS Code, JetBrains IDEs, and Neovim
- Repository-aware suggestions for larger codebases
- Faster completion on project-specific APIs after repository processing/indexing

### Secondary use cases
- Team-managed subscription and billing workflows
- Neovim integration with built-in commands and Lua API
- In-editor chat-based edits, diffs, and file attachment workflows in 2024-era product materials

### Example workflows
1. Install the VS Code extension, activate a paid account or choose the free tier, wait for repository indexing, then accept inline suggestions in the editor.
2. In JetBrains IDEs, enable the plugin and use the same completion features plus per-language or global toggling described in the JetBrains launch post.
3. In Neovim, install `supermaven-inc/supermaven-nvim`, run `setup({})`, then start/stop or switch tiers with `:Supermaven*` commands.
4. In 2024 chat flows, attach recently edited files or compiler diagnostics, request an edit, inspect the diff, and apply the change from the editor.

### Partially automated tasks
- Inline suggestion generation while the user remains in control of acceptance
- Chat-driven edit proposals with diff review before apply (officially documented in 2024 materials)

### Anti-patterns
- Treating Supermaven as an offline-only product; official policies describe code being sent to Supermaven servers
- Relying on current availability of chat/agent features without checking the 2025 sunset notice

---

## Features

### Core features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Inline code suggestions | Provides inline code suggestions in editor integrations | Official extension/plugin | Suggestion acceptance remains user-driven | Free, Pro, Team | Stable | Homepage; VS Code Marketplace |
| Large-codebase support | Official pages state that Supermaven works with large codebases | Indexed/processed repository | Free tier does not include the full 1M-token context window | Free, Pro, Team | Stable | Homepage; Pricing |
| Repository-aware context | Official launch post says Supermaven processes a repository for `10-20` seconds, then becomes familiar with project APIs and conventions | Repository access through official extension | Repository processing details beyond this summary are not fully documented | Free/Pro behavior differs by tier | Stable | Introducing Supermaven |
| Long-context completion | Launch materials describe `300,000` tokens at launch; July 2024 materials announce `1,000,000` tokens with Babble/Pro | Pro for 1M-token mode | Free tier excludes the 1M-token window | Launch: all users at 300k; 1M-token window: Pro/Team | Stable in 2024 materials | Introducing Supermaven; Supermaven 1.0; Pricing |
| Coding-style adaptation | Official pricing page says Supermaven can adapt to the user's coding style | Paid plan | Not included in Free tier | Pro, Team | Stable | Pricing |
| 70+ language support | VS Code Marketplace listing says the extension supports `70+` programming languages | VS Code extension | Marketplace page does not publish the complete list in retrieved content | VS Code extension users | Stable | VS Code Marketplace |
| JetBrains IDE support | Official JetBrains launch post says support covers IntelliJ, WebStorm, PyCharm, RubyMine, CLion, PhpStorm, Rider, GoLand, ReSharper, Android Studio, and RustRover | JetBrains plugin | Public plugin metadata beyond the listing URL was not fully retrievable from official APIs during this run | Supported JetBrains IDEs | Stable | JetBrains launch blog |
| Neovim plugin | Official GitHub repository provides a Neovim plugin with setup options, commands, and a Lua API | Neovim and plugin manager | Repository documents Neovim only, not other Vim-family editors | Neovim users | Stable | supermaven-nvim README |

### Historical / later-discontinued features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Supermaven Chat | In-editor chat using OpenAI/Anthropic models with file upload, diff display, and apply flow | VS Code `0.2.10+` or JetBrains `1.30+` in 2024 materials | Official sunset post says agent conversations are no longer supported as of 2025-11-21 | Free with own API key; Pro included credits; Team per-user credits | Discontinued / sunset notice conflicts with older product pages | Supermaven Chat blog; VS Code Marketplace; Sunsetting Supermaven |
| Compiler-diagnostic upload | Chat workflow could upload code together with compiler diagnostics in one click | Chat-enabled editor workflow | Chat has been discontinued per official sunset post | Chat-enabled plans/workflows | Discontinued with chat | Homepage; VS Code Marketplace; Sunsetting Supermaven |
| Commit-message generation | VS Code Marketplace listing says chat could generate commit messages | Chat-enabled VS Code workflow | Chat has been discontinued per official sunset post | Chat-enabled workflows | Discontinued with chat | VS Code Marketplace; Sunsetting Supermaven |

### Plan-restricted features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| `1,000,000` token context window | Pro/Team plan feature for larger repositories and the Babble completion model rollout | Paid subscription | Not available in Free tier | Pro, Team | Stable in 2024 materials | Pricing; Supermaven 1.0 |
| Largest completion model | Pricing page refers to the "largest, most intelligent model" as a paid-only feature | Paid subscription | Model name is not specified on pricing page | Pro, Team | Stable in 2024 materials | Pricing |
| Chat credits | Official pricing gives `$5/month` in Supermaven Chat credits, or `$5/month` per user on Team | Paid subscription | Chat later discontinued in sunset post | Pro, Team | Historical / [NEEDS UPDATE] | Pricing; Supermaven Chat; Sunsetting Supermaven |
| Centralized user management and billing | Team plan adds centralized user management and billing | Team subscription | Not part of Free or individual Pro plan | Team | Stable in 2024 materials | Pricing |
| 30-day free trial | Official pricing page advertises a `30-day` free trial for Pro | Pro signup | Current availability after sunset is unclear | Pro | [NEEDS UPDATE] | Pricing; Sunsetting Supermaven |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| VS Code extension | VS Code | Official Marketplace listing `supermaven.supermaven` |
| JetBrains plugin | JetBrains IDEs | Official plugin URL referenced by Supermaven is `https://plugins.jetbrains.com/plugin/23893-supermaven` |
| Neovim plugin | Neovim | Official GitHub repository `supermaven-inc/supermaven-nvim` |
| In-editor chat surface | VS Code and JetBrains (2024 materials) | Historical feature; official sunset post later says agent conversations are no longer supported |

### Supported platforms
- **VS Code**
- **JetBrains IDEs:** IntelliJ, WebStorm, PyCharm, RubyMine, CLion, PhpStorm, Rider, GoLand, ReSharper, Android Studio, RustRover
- **Neovim**

### Commands / shortcuts / UI actions documented officially
- VS Code install flow includes **Activate** or **Use free version** after installation
- Chat materials describe hotkeys to view diffs, apply changes, start conversations, and switch models
- Neovim commands:
  - `:SupermavenStart`
  - `:SupermavenStop`
  - `:SupermavenRestart`
  - `:SupermavenToggle`
  - `:SupermavenStatus`
  - `:SupermavenUseFree`
  - `:SupermavenUsePro`
  - `:SupermavenLogout`
  - `:SupermavenShowLog`
  - `:SupermavenClearLog`

### Neovim Lua API documented officially
- `api.start()`
- `api.stop()`
- `api.restart()`
- `api.toggle()`
- `api.is_running()`
- `api.use_free_version()`
- `api.use_pro()`
- `api.logout()`
- `api.show_log()`
- `api.clear_log()`

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Example |
|------|-------------|-------------|----------------|-------------|---------|
| Free tier autocomplete | Inline completion without the paid long-context and style-adaptation features | Trial and individual usage | Low | No 1M-token context, no coding-style adaptation, no included chat credits | Install extension and choose "Use free version" |
| Pro autocomplete | Paid completion mode with coding-style adaptation and the `1,000,000`-token context window | Larger repositories or paid individual use | Low | Paid plan; current availability after sunset is unclear | Use Pro after account activation |
| Team managed mode | Team plan with centralized user management and billing | Company/team deployment | Low to Medium | Requires Team billing setup | Manage multiple users under one billing account |
| Chat editing mode | Editor chat with OpenAI/Anthropic models, file attach, diffs, and apply flow | Ad hoc code edits and question-answering in 2024 workflows | Medium | Official sunset post says agent conversations are no longer supported | Upload a file, request a change, and apply the diff |
| Existing-customer sunset mode | Official post says existing customers keep free autocomplete inference for the foreseeable future | Current post-sunset usage | Low | Existing-customer scope only; no agent conversations | Continue using autocomplete after refund processing |

---

## Architecture & Mechanisms

### Completion model design
- Official launch materials say Supermaven developed a neural-network architecture "more efficient than a Transformer" for long-context integration.
- The launch model was described with a `300,000`-token context window.
- The July 2024 "Supermaven 1.0" announcement introduced **Babble**, described as `2.5x` larger than the previous model and expanded to a `1,000,000`-token context window.

### Repository processing and context construction
- The launch post says Supermaven spends `10-20` seconds processing a repository so it can learn project APIs and conventions.
- Free-tier materials later say the free tier can still see recently opened files even without the 1M-token context window.
- Official homepage text says Supermaven can find definitions elsewhere in the codebase and use them to improve suggestions.

### Prompt/context strategy
- The launch post says Supermaven sees the sequence of edits made to the codebase, similar to `git diff`, rather than treating code only as independent files.
- Chat materials say recently edited files can be attached to messages, and code responses are linked back to the original code to display diffs and apply changes.
- Chat materials also say compiler diagnostic messages can be uploaded together with code in one click.

### Performance claims published officially
- The launch blog reports a latency benchmark of `250 ms` for Supermaven in the vendor's test setup, compared with `783 ms` for Copilot, `883 ms` for Codeium, `833 ms` for Tabnine, and `1,883 ms` for Cursor.
- The long-context benchmark post reports near-`100%` needle-in-a-haystack recall across `50,000` to `300,000` tokens in Supermaven's test setup.
- The same post reports dense-retrieval accuracy dipping to around `75%` at mid-sequence separation, with random guessing at `4%`.

### Serving/infrastructure notes
- Official materials state that Supermaven built custom infrastructure to keep latency low with long prompts.
- The Code Policy states that Supermaven's internal systems run on Amazon Web Services and that code data is stored using Amazon-managed systems.

---

## Integrations

### IDE integrations
- **VS Code Marketplace** — official extension listing `supermaven.supermaven`
- **JetBrains Marketplace** — official plugin listing `23893-supermaven`
- **Neovim** — official plugin repository `supermaven-inc/supermaven-nvim`

### Model/provider integrations
- **OpenAI** — chat mode can use OpenAI models; free-tier chat users could bring their own OpenAI API key
- **Anthropic** — chat mode can use Anthropic models; free-tier chat users could bring their own Anthropic API key

### Editor/workflow integrations
- **nvim-cmp** — official README documents a `supermaven` completion source
- **lspkind** — official README documents adding a `Supermaven` symbol map entry
- **Compiler diagnostics** — official chat materials describe one-click upload of compiler diagnostic messages together with code

### Infrastructure dependencies documented officially
- **Amazon Web Services (AWS)** — code data is stored on Amazon-managed systems according to the Code Policy

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models used | Proprietary Supermaven completion model; **Babble** for the July 2024 completion update; chat models from OpenAI and Anthropic |
| Models publicly disclosed | Partially |
| User model selection | Yes for historical chat workflows; official homepage/marketplace mention switching models in chat |
| Proprietary models | Yes |
| External models | OpenAI and Anthropic; official examples include GPT-4o, Claude 3.5 Sonnet, GPT-4, and `o1` |
| Local models | No official local-model option identified |
| Multimodal models | [NO OFFICIAL DATA] |
| Context window | `300,000` tokens at launch; `1,000,000` tokens for Pro/Babble in July 2024 |
| Token limits | No separate output-token limit identified in retrieved official sources |
| Latency | `250 ms` in the official launch benchmark setup |
| Processing region | [NO OFFICIAL DATA] |
| Training on user data | Code Policy says Supermaven does **not** use Code Data to develop its products and services |
| Information status | Confirmed in part; several current-state details are affected by the 2025 sunset announcement |

---

## Permissions & Security

- Official editor extensions send **Code Data** to Supermaven servers; the Code Policy applies only to official extensions linked from `supermaven.com`.
- All Code Data uploaded to Supermaven servers is subject to a **7-day retention policy**.
- The Code Policy says Supermaven does **not** use Code Data to develop its products and services.
- The Code Policy says Supermaven does **not** share Code Data with third parties except as required by law or as necessary to provide its products and services.
- Supermaven states that its internal systems run on **Amazon Web Services** and code data is stored using Amazon-managed systems.
- If Supermaven Chat is used, uploaded code is sent to a third-party model provider such as **OpenAI** or **Anthropic** based on the selected model.
- A list of third-party infrastructure providers able to access Code Data is available to customers **upon request**.
- Certifications, encryption specifics, RBAC, SSO, SCIM, audit logs, and sandboxing details were **not** identified in retrieved official sources.

---

## Privacy & Data Processing

| Topic | Officially documented detail |
|-------|-------------------------------|
| What data is transmitted | Code uploaded by official editor extensions; in chat workflows, uploaded code may also be sent to OpenAI or Anthropic depending on selected model |
| Where data is processed | Supermaven servers; AWS-backed infrastructure; chat data may also go to selected third-party model providers |
| Whether data is stored | Yes |
| Retention period | Code Data is deleted from Supermaven internal systems within **7 days** of upload |
| Training on user code | Code Policy says Code Data is **not** used to develop Supermaven products and services |
| Data sharing | Not shared except as required by law or as necessary to provide services |
| Subprocessors | AWS is named; broader infrastructure-provider list is available on request |
| Privacy policy URL | https://supermaven.com/privacy |
| Privacy policy status | Retrieved `/privacy` page did not expose substantive policy text and rendered placeholder list items (`Item 1`, `Item 2`, `Item 3`) at retrieval time **[NEEDS UPDATE]** |
| DPA availability | [NO OFFICIAL DATA] |
| Prompt logging | [NO OFFICIAL DATA] |
| Admin usage visibility | [NO OFFICIAL DATA] |

---

## Pricing

> Official pricing information below reflects the live pricing page retrieved during this run. A later official sunset post says existing subscriptions were refunded and the product is being sunset, so plan availability should be treated as **historical / [NEEDS UPDATE]**.

| Plan | Price | Officially listed inclusions | Officially listed exclusions / notes |
|------|-------|------------------------------|--------------------------------------|
| Free Tier | `$0/month` | Fast code suggestions; works with large codebases; `7-day` data retention limit | No coding-style adaptation; no `1,000,000`-token context window; no largest model; no included chat credits |
| Pro | `$10/month` | Fast code suggestions; works with large codebases; coding-style adaptation; `1,000,000`-token context window; largest model; `$5/month` in chat credits; `30-day` free trial | Centralized user management and billing marked Team-only |
| Team | `$10/month per user` | Unlimited users per team; all Pro features; `$5/month` in chat credits per user; centralized user management and billing | Sunset post indicates subscriptions were refunded for existing customers |

---

## Limitations & Risks

- **Cloud processing of code:** Official policies say code is sent to Supermaven servers and retained for up to `7` days.
- **Third-party model exposure in chat:** Chat uploads can be sent to OpenAI or Anthropic under those providers' policies.
- **Product-status inconsistency across official pages:** Older homepage, marketplace, and pricing pages still describe chat and paid plans, while the 2025 sunset post says agent conversations ended and subscriptions were refunded.
- **Current availability ambiguity:** The sunset post explicitly addresses existing customers; availability for new customers is **[UNVERIFIED]** from retrieved official sources.
- **Plan-gated functionality:** The 1M-token context window, coding-style adaptation, and chat credits were not part of the Free tier.
- **Documentation fragmentation:** No centralized official docs portal was identified in retrieved sources; operational details are spread across product pages, blog posts, marketplace listings, and the Neovim repository.

---

## Sources

- Official product page: https://supermaven.com
- Official pricing page: https://supermaven.com/pricing
- Official download page: https://supermaven.com/download
- Official about page: https://supermaven.com/about
- Official code policy: https://supermaven.com/code-policy
- Official terms of service: https://supermaven.com/terms-of-service
- Official privacy page: https://supermaven.com/privacy
- Official launch post: https://supermaven.com/blog/introducing-supermaven
- Official long-context benchmark post: https://supermaven.com/blog/benchmarking-long-context
- Official JetBrains support announcement: https://supermaven.com/blog/jetbrains
- Official chat announcement: https://supermaven.com/blog/supermaven-chat
- Official free-tier announcement: https://supermaven.com/blog/free-tier
- Official Supermaven 1.0 announcement: https://supermaven.com/blog/announcing-supermaven-1.0
- Official acquisition/joining Cursor announcement: https://supermaven.com/blog/cursor-announcement
- Official sunset announcement: https://supermaven.com/blog/sunsetting-supermaven
- Official VS Code Marketplace listing: https://marketplace.visualstudio.com/items?itemName=supermaven.supermaven
- Official JetBrains Marketplace listing referenced by Supermaven: https://plugins.jetbrains.com/plugin/23893-supermaven
- Official Neovim repository: https://github.com/supermaven-inc/supermaven-nvim
