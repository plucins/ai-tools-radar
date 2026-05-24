# Bito AI
```yaml
name: "Bito AI"
description: >
  Bito AI is an IDE extension and code review product for VS Code and JetBrains IDEs that provides codebase-aware AI code reviews inside the editor and in Git-based review workflows. Official current positioning centers on AI Code Reviews and AI Architect, a knowledge-graph-based context layer that adds repository, issue, documentation, and operational context to reviews and coding agents.
category: ide
logo: https://img.logo.dev/bito.ai?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - IDE Extension
  - Code Review
```

## Tool Identification

**Last update:** 24-05-2026 21:23

| Field | Value |
|-------|-------|
| Name | Bito AI |
| Alternative names | Bito; Bito AI Code Reviews; AI Code Review Agent |
| Vendor / Organization | Bito Inc. |
| Homepage | https://bito.ai |
| Documentation | https://docs.bito.ai |
| Changelog | https://docs.bito.ai/whats-new |
| Repository | https://github.com/gitbito/bitoai ; https://github.com/gitbito/ai-architect |
| First release date | 2023-01-13 (VS Code Marketplace published date for the extension) |
| Current status | Publicly listed on VS Code Marketplace and JetBrains Marketplace; pricing/docs describe commercial Team, Professional, and Enterprise plans |
| Current version | 1.6.8 (VS Code Marketplace and JetBrains Marketplace) |
| Marketplace installs / downloads | VS Code install statistic: **939,340**; JetBrains marketplace downloads: **858,742** |
| Last updated | 2026-04-29 (VS Code Marketplace and JetBrains Marketplace) |

---

## Classification

- **Primary category:** IDE
- **Secondary categories:** AI code review tool; Git review agent; knowledge-graph context layer for coding agents
- **Tool type:** Proprietary SaaS with IDE extensions and optional self-hosted/on-prem deployment for some products
- **Problem domain:** Pre-PR code review, PR/MR review automation, architecture/context retrieval for planning and coding
- **User interaction type:** IDE panel/chat, context-menu actions, PR comments/commands, web workspace, MCP server integrations
- **Automation type:** Assistive in IDE; semi-automatic to automatic in pull-request and issue-tracker workflows

---

## Summary

- **One-sentence description:** Bito AI combines in-IDE AI code review with a separate AI Architect context layer that supplies repository and system context to reviews and coding agents.
- **Extended description:** Official current sources emphasize two product surfaces: **AI Code Reviews** and **AI Architect**. The IDE extension is positioned for instant pre-PR reviews inside VS Code, Cursor, Windsurf, and JetBrains IDEs, while AI Architect builds a knowledge graph from code, commits, issue trackers, documentation, and team knowledge to support planning, coding, and review workflows.
- **Core value proposition:** Catch review issues earlier in the IDE and add broader system context to coding and review decisions.
- **Primary problem solved:** Reducing manual code review effort and missing context across repositories, tickets, and design history.
- **Key differentiator:** Official materials describe AI Architect as a knowledge graph rather than a retrieval-only embeddings layer, and Bito uses that context in code reviews and coding-agent integrations.
- **Target users:** Individual developers, engineering teams, and enterprises using VS Code, JetBrains IDEs, or Git-based review workflows.
- **Anti-target users:** Teams that require a fully local/offline workflow with no Bito or third-party LLM processing, or teams outside the supported IDE/VCS/integration set.
- **Primary usage context:** Reviewing local changes before a pull request, reviewing pull/merge requests in Git platforms, and supplying system context to coding agents.
- **Current positioning note:** Official homepage and docs now center on **AI Code Reviews** and **AI Architect**. Some installation pages still reference older assistant/chat language, which appears to be legacy documentation **[NEEDS UPDATE]**.

---

## Use Cases

### Primary use cases
- Review local, staged, uncommitted, path-based, or commit-based changes inside the IDE before opening a pull request.
- Run automated or on-demand pull/merge-request reviews on GitHub, GitLab, and Bitbucket.
- Apply AI-generated line-level fixes from the IDE review panel.
- Use AI Architect to provide grounded context for feature planning, cross-repo impact analysis, onboarding, and issue triage.

### Secondary use cases
- Validate pull requests against Jira tickets and Confluence documentation.
- Surface architecture and repository context in Claude Code, Cursor, Windsurf, GitHub Copilot/VS Code, Junie, and JetBrains AI Assistant through MCP.
- Ask follow-up questions on review feedback directly in pull requests.
- View review analytics and repository-level review behavior.

### Example workflows
1. Install the IDE extension, sign into a Bito workspace, run `@codereview`, choose `localchanges` or `commitId`, then select **Essential** or **Comprehensive** review mode.
2. In GitHub, GitLab, or Bitbucket, trigger a review with `/review` or a scoped command such as `/review security` and inspect inline comments.
3. Connect AI Architect through MCP, then query repositories, dependencies, affected services, or ask it to plan a feature using the indexed knowledge graph.

### Fully automated tasks
- Automatic PR/MR review workflows in Git providers.
- Automatic or on-demand analysis of Jira and Linear issues through AI Architect.
- Daily sync of AI Architect skills/guidelines after MCP installer setup.

### Partially automated tasks
- IDE reviews with manual target selection and manual application of generated fixes.
- Pull-request reviews with optional manual command scoping.
- MCP-assisted coding workflows where the coding agent still executes the final implementation steps.

### Anti-patterns
- Using Bito when code and prompts cannot leave the local environment even ephemerally.
- Expecting all IDE review scopes to work on non-Git version-control systems.
- Assuming the free plan includes line-level code suggestions.

---

## Features

### Core features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| IDE AI code reviews | Reviews `localchanges`, `stagedchanges`, `uncommittedchanges`, `path`, or `commitId` targets from the IDE | Supported IDE, supported VCS, Bito workspace login | Non-Git VCS supports only `uncommittedchanges` and `path` | Team Plan required for IDE reviews | Current | AI Code Reviews in IDE docs |
| Review modes | **Essential** posts critical issues; **Comprehensive** adds minor suggestions and nitpicks | Start an IDE review session | Scope differs by selected mode | Same as IDE reviews | Current | AI Code Reviews in IDE docs |
| Context-menu invocation | Runs review actions from the editor context menu under **Bito Code Review Agent** | Supported IDE extension installed | UI-driven action, not a standalone CLI | Same as IDE reviews | Current | AI Code Reviews in IDE docs |
| Apply suggested fixes | Review results include an **Apply** button that opens a diff view for accept/undo | Completed IDE review with code suggestion | User still confirms final change | Same as IDE reviews | Current | AI Code Reviews in IDE docs |
| Session history | Stores and reopens prior code review sessions from the Bito panel | IDE extension installed | Applies to review sessions shown in the extension UI | Same as IDE reviews | Current | AI Code Reviews in IDE docs |
| PR/MR review agent | Posts summaries, comments, suggestions, and follow-up chat in Git-based review workflows | Git provider integration | Feature set depends on connected platform and plan | Free plan includes PR summaries; paid plans add deeper review features | Current | AI Code Reviews overview; product page |

### Advanced features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| AI Architect knowledge graph | Builds a graph from code, commits, issue trackers, docs, observability data, Slack, and custom instructions | AI Architect deployment and connected data sources | Observability integration is custom-built per organization | Free for self-managed personal/team use up to 5 developers; enterprise beyond that | Current | AI Architect overview; Knowledge graph docs; ai-architect repo |
| Cross-repo impact analysis | Maps services, APIs, and dependencies touched by a change across repositories | AI Architect indexed environment | Depends on indexed repositories and connected context sources | AI Architect-dependent | Current | Homepage; AI Code Review product page; Knowledge graph docs |
| MCP integrations for coding agents | Exposes AI Architect to coding agents and IDE MCP clients through Bito MCP | Supported MCP client, workspace ID, access token or SSO/OAuth | Requires client setup and minimum client/tool versions in some cases | AI Architect-dependent | Current | MCP integration docs |
| Static analysis and security tooling | Incorporates tools such as Facebook Infer, ESLint, golangci-lint, Ruff, Mypy, OWASP Dependency Check, Snyk, detect-secrets, and Whispers | Supported language/tool combination | Coverage varies by language and tool | Plan/integration dependent | Current | Supported languages and tools docs; product page |
| Jira and Confluence-aware review context | Validates PRs against Jira requirements and linked Confluence material | Connected integrations | Integration setup required | Jira integration is listed on the Professional plan; Confluence plan availability is [NO OFFICIAL DATA] | Current | Product page; changelog; pricing page |

### Plan-restricted features

| Feature | Description | Requirements | Limitations | Plan availability | Status | Source |
|---------|-------------|--------------|-------------|-------------------|--------|--------|
| Free plan PR summaries | Free plan provides AI-generated pull-request summaries | Git review workflow | No line-level code suggestions documented on free plan | Free | Current | AI Code Reviews overview |
| Team plan IDE reviews | Team plan includes code review agents, line-by-line PR feedback, AI code suggestions, and codebase-aware reviews | Paid subscription | Up to 25 seats per team according to changelog entry | Team | Current | Pricing page; changelog |
| Professional plan extras | Adds custom review guidelines, Jira integration, and review analytics; includes 14-day trial | Paid subscription | Pricing page does not publish seat minimums | Professional | Current | Pricing page |
| Enterprise deployment | Custom pricing, custom usage limits, enterprise-grade security, and larger/team-wide AI Architect usage | Contact Bito sales/support | Pricing is not self-serve | Enterprise | Current | Pricing page; ai-architect repo |

---

## Interfaces

| Interface | Platform | Notes |
|-----------|----------|-------|
| IDE extension | VS Code | Marketplace listing version 1.6.8; docs state VS Code 1.72+ is required |
| IDE extension | JetBrains IDEs | JetBrains Marketplace plugin `Bito AI Code Reviews`; current marketplace compatibility is 2022.2+ |
| IDE extension | Cursor and Windsurf | OpenVSX links are listed from Bito's IDE-review docs |
| IDE panel/chat | IDE UI | Primary entry point for `@codereview` actions and session history |
| Context menu | IDE editor UI | Review actions are also exposed from the editor context menu |
| Pull-request comments | GitHub, GitLab, Bitbucket | `/review`, scoped review commands, and workflow control commands |
| MCP server | Claude Code, Cursor, Windsurf, VS Code (GitHub Copilot), Junie, JetBrains AI Assistant, Google Antigravity | AI Architect context service for coding agents and chat agents |
| Web workspace | alpha.bito.ai | Account, workspace, advanced settings, and integration setup surfaces referenced by docs |
| Slack | Slack channels and DMs | AI Architect / Bito AI Assistant integration for architecture questions and triage |

### Supported editors, platforms, and version constraints
- **VS Code:** Bito docs state support from **VS Code 1.72+**.
- **JetBrains:** The installation guide says Bito version 1.3.4+ supports **JetBrains 2021.2.4+**, while current JetBrains Marketplace metadata for version 1.6.8 lists compatibility as **2022.2+** across IntelliJ-platform IDEs and Android Studio Flamingo 2022.2.1+.
- **Version control systems for IDE review:** **Git**, **Perforce**, and **SVN** are documented; non-Git VCS supports fewer review scopes.

### Commands and UI actions documented officially
- `@codereview`
- `localchanges`
- `stagedchanges`
- `uncommittedchanges`
- `path`
- `commitId`
- `/review`
- `/review security`
- `/review performance`
- `/review scalability`
- `/review codeorg`
- `/review codeoptimize`
- `/pause`
- `/resume`
- `/resolve`
- `/abort`

---

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Example |
|------|-------------|-------------|----------------|-------------|---------|
| IDE interactive review | User-triggered code review inside the editor, with selectable target and review depth | Before committing or before opening a PR | Medium | Requires supported IDE, VCS, and workspace plan | Run `@codereview localchanges` and inspect issues in the Bito panel |
| IDE essential review | Critical issues only | Fast pre-commit or pre-PR check | Medium | Less exhaustive than comprehensive mode | Review only blocking issues before a commit |
| IDE comprehensive review | Includes critical issues plus minor suggestions/nitpicks | Broader cleanup pass | Medium | More review output to inspect | Run a full pass on all uncommitted changes |
| Git workflow review | Reviews pull/merge requests in Git providers, automatically or from commands | Team PR/MR review workflows | Medium to High | Depends on provider integration and review settings | Use `/review security` in a PR comment |
| AI Architect Bito-hosted | Fully managed AI Architect deployment | Teams that want managed context infrastructure | High | Commercial/enterprise packaging applies | Connect coding agents to Bito-hosted MCP |
| AI Architect self-hosted | Run AI Architect in customer infrastructure | Teams needing infrastructure control | High | Setup, sizing, and maintenance are customer responsibilities | Deploy AI Architect with Docker or Kubernetes |
| MCP context mode | AI Architect serves context to other coding agents over MCP | Grounded code generation, onboarding, triage | Medium to High | Requires supported client and MCP setup | Ask Claude Code which repos depend on a service |

---

## Architecture & Mechanisms

### Context construction
- Bito's **AI Architect** builds a **knowledge graph** from repositories, modules, APIs, commit history, issue trackers, documentation, observability inputs, Slack conversations, and custom instructions.
- The knowledge graph is presented as the context engine behind planning, grounded code generation, code review, onboarding, and production triage.

### Code understanding pipeline
- For AI code review, Bito states it uses **Symbol Indexing**, **Abstract Syntax Trees (AST)**, and **Embeddings** to understand changed code and broader repository context.
- Official docs distinguish this from retrieval-only approaches by claiming the knowledge graph models relationships across services, APIs, incidents, and prior decisions.

### Data flow for code reviews
- In both self-hosted and Bito-cloud code review modes, Bito ephemerally checks out the diff and clones the repository to perform static analysis and determine relevant context.
- The context and diff are sent through Bito's system to a third-party LLM, the response is processed/formatted by Bito, and the diff and checked-out repository are deleted after review completion.

### MCP and agent connectivity
- Bito MCP supports token-based access and OAuth 2.1 discovery with PKCE and Dynamic Client Registration for modern clients.
- The MCP installer can automatically configure supported tools and can auto-sync skills and guidelines daily.

### Deployment mechanisms
- **AI Code Reviews:** Bito Cloud or self-hosted service.
- **AI Architect:** personal local deployment, shared team deployment, or enterprise deployment; Docker Compose and Kubernetes are documented deployment modes.

### Safety and control mechanisms
- Requests are transmitted over **HTTPS**.
- Interactions are auto-moderated for toxicity and harmful inputs/outputs.
- Enterprises can route data through their own LLM accounts or VPC-connected deployments.

---

## Integrations

| Integration | Type | What it enables | Requirements | Limitations |
|-------------|------|-----------------|--------------|-------------|
| VS Code Marketplace | IDE marketplace | Install Bito extension in VS Code | VS Code 1.72+ | IDE feature set still depends on plan/workspace |
| JetBrains Marketplace | IDE marketplace | Install Bito extension in IntelliJ-platform IDEs | Compatible JetBrains IDE version | Compatibility varies by IDE family/version |
| Cursor / Windsurf / OpenVSX | IDE marketplace | Use Bito IDE extension in OpenVSX-based editors | Compatible editor | Same review feature constraints as IDE extension |
| GitHub / GitHub Self-Managed | Git integration | PR reviews, comments, summaries, commands | Bito integration/app setup | Self-managed support has version constraints in docs |
| GitLab / GitLab Self-Managed | Git integration | MR reviews, comments, commands | Bito integration/app setup | Self-managed support has version constraints in docs |
| Bitbucket / Bitbucket Enterprise | Git integration | PR reviews and commands | Bito integration/app setup | Setup differs between cloud and enterprise |
| Jira | Issue tracker | PR validation and AI Architect planning comments | Connected Jira workspace | Feature availability depends on plan/product |
| Linear | Issue tracker | AI Architect feasibility/design analysis in comments | Connected Linear workspace | Current feature is recent and may require workspace enablement |
| Confluence | Documentation integration | Adds requirement/design context to reviews | Connected Confluence workspace | Review enrichment depends on linked docs |
| Slack | Messaging integration | Architecture questions, triage, and Bito AI Assistant interactions | Slack integration | Scope depends on connected workspace |
| Coding agents via MCP | MCP/native integration | Supplies AI Architect context to coding agents and chat agents | Bito MCP setup | Client support/version requirements vary |
| Portkey | Proxy integration | Custom proxy configuration for AI Architect | Self-managed AI Architect | Documented for AI Architect only |
| Lint/SAST/security tools | Tool integrations | Adds language- and security-specific findings to reviews | Supported language and tool chain | Coverage varies by language/tool |

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models used | Current marketplace and `gitbito/bitoai` repository materials state **Claude Sonnet 4** for code reviews; AI Architect documentation states **Claude Haiku** is used to index codebases and that an optional **OpenAI** API key can also be provided for self-managed deployments |
| Models publicly disclosed | Partially |
| User model selection | **Yes** for self-managed AI Architect deployments (mandatory Anthropic API key, optional OpenAI API key); **enterprise** deployments can connect private OpenAI, Google Cloud, Anthropic, AWS Bedrock, or Azure OpenAI accounts |
| Proprietary models | No proprietary foundation model is disclosed; Bito describes a proprietary prompt framework |
| External models | Anthropic, OpenAI, Google; enterprise BYO options include AWS Bedrock and Azure OpenAI |
| Local models | [NO OFFICIAL DATA] |
| Multimodal models | [NO OFFICIAL DATA] |
| Training on user data | Bito states that none of customer code or AI requests are used for model training |
| Information status | Partially confirmed |

**Model disclosure note:** Official sources are not fully consistent. Current marketplace and `gitbito/bitoai` materials cite **Claude Sonnet 4** for code reviews, while the older `gitbito/CodeReviewAgent` repository page still mentions **Claude Sonnet 3.5** **[NEEDS UPDATE]**.

---

## Permissions & Security

- **Required access:** The IDE extension needs access to the open project and VCS changes being reviewed. AI Architect requires repository access tokens for GitHub, GitLab, or Bitbucket indexing.
- **Repository access tokens documented officially:** GitHub classic token with `repo` scope; GitLab token with `api` scope; Bitbucket API/HTTP access token depending on deployment.
- **Data access scope:** Bito may access code diffs, checked-out repositories, issue tracker data, documentation, commit history, Slack context, and observability data if those integrations are connected.
- **Local file access:** Yes. IDE reviews operate on local/staged/uncommitted changes, paths, and commits inside the opened project.
- **Repository access:** Yes. AI Architect indexes repositories; Code Review Agent clones repositories ephemerally for analysis.
- **Internet/service access:** Yes. Requests are processed by Bito services and forwarded to third-party LLM APIs.
- **SSO / auth:** AI Architect MCP supports SSO and OAuth 2.1 discovery; Bito also documents password-less login for its own account system.
- **Encryption:** All requests are transmitted over HTTPS and are fully encrypted.
- **Data isolation options:** Self-hosted AI Code Review Agent and self-hosted/on-prem AI Architect are documented. Enterprise deployments can use customer-owned LLM accounts and VPC-based routing.
- **Certifications:** SOC 2 Type II.
- **Compliance references:** Privacy policy explicitly references GDPR legal bases for processing where applicable.

---

## Privacy & Data Processing

- **Privacy policy URL:** https://bito.ai/privacy-policy/
- **What data is transmitted:** AI requests, including code snippets and code-review context, are sent to Bito servers for processing; connected integrations can add Jira, Confluence, Slack, and related context.
- **Where data is processed:** Bito processes requests and forwards prompts to third-party LLM providers such as OpenAI, Anthropic, and Google. Enterprise customers can route through their own OpenAI, Google Cloud, Anthropic, AWS Bedrock, or Azure OpenAI accounts.
- **Whether data is stored:** Bito states it does not store code, code snippets, indexes, or embedding vectors on its servers unless the customer expressly allows it. IDE AI Assistant response history is stored locally on the user's machine for UI history.
- **Retention policy:**
  - Relationship and usage metadata are retained indefinitely.
  - Bito business data is terminated 90 days after the end of the business relationship.
  - Confidential customer business data is stored on-prem/locally or, if in the cloud, terminated at the end of the business relationship.
  - AI requests are neither retained nor viewed by Bito.
- **Training policy:** Bito states customer code and AI requests are not used for AI model training, and Bito's AI partners do not store that information.
- **Ephemeral review data handling:** For code review, diffs and checked-out repositories are deleted after the review completes.
- **Prompt logging and moderation:** Interactions are auto-moderated for toxicity and harmful inputs/outputs; the original AI request is not retained.
- **Data deletion visibility:** Users can clear locally stored IDE response history from the Bito UI.
- **Subprocessors / third-party services listed officially:** Amazon AWS, Anthropic, Clearbit, GitHub, Google Analytics, Google Cloud, HelpScout, Hubspot, Microsoft Azure, Mixpanel, OpenAI, SendGrid, SiteGround, and Slack.

---

## Pricing

### AI Code Reviews pricing

| Plan | Price | Included usage / notes |
|------|-------|------------------------|
| Free | [NO OFFICIAL PRICE DATA] | AI-generated pull-request summaries are documented on the free plan |
| Team | **$12/seat/month** billed annually or **$15/seat/month** billed monthly | Includes **5K lines of code reviewed per seat/month**; additional usage is **$5 per extra 1K lines**; changelog states up to 25 seats/team |
| Professional | **$20/seat/month** billed annually or **$25/seat/month** billed monthly | Includes **5K lines of code reviewed per seat/month**; additional usage is **$5 per extra 1K lines**; includes custom review guidelines, Jira integration, review analytics, and a **14-day free trial** |
| Enterprise | Custom pricing | Custom usage limits |

### AI Architect pricing and deployment notes

- **Personal deployment:** Free with customer-provided LLM key.
- **Team deployment:** Free with customer-provided LLM key for up to **5 users**.
- **Enterprise deployment:** Required for teams with more than five developers, or when powering Bito Code Review Agent with AI Architect.
- **LLM key requirements for self-managed AI Architect:** Anthropic API key required; OpenAI API key optional.
- **Indexing cost guidance:** AI Architect documentation estimates **$1.00-$1.50 per MB** of indexable code when using an Anthropic API key for indexing.

---

## Limitations & Risks

| Category | Limitation / risk | Impact | Mitigation |
|----------|-------------------|--------|------------|
| Functional | IDE review requires a supported IDE, workspace login, and supported VCS | Some teams cannot use the feature in unsupported environments | Validate IDE/version/VCS support before rollout |
| Functional | Non-Git VCS supports only `uncommittedchanges` and `path` review scopes | Reduced review granularity in Perforce/SVN environments | Use supported scopes or move commit-based workflows to Git |
| Pricing | Free plan only documents PR summaries, not full line-level suggestions | Teams may need a paid plan sooner than expected | Compare free vs Team/Professional features before adoption |
| Deployment | Self-hosted AI Code Review Agent and AI Architect require customer setup, sizing, and maintenance | Operational overhead shifts to the customer | Use Bito-hosted deployment if managed service is preferred |
| Privacy / data flow | Bito processes requests and forwards them to third-party LLM APIs | Some organizations may require tighter isolation controls | Use self-hosted/on-prem deployments or customer-owned LLM accounts |
| Bito Cloud handling | Bito Cloud documentation states PR diffs are temporarily stored on Bito servers for analysis | Temporary server-side handling may be unacceptable in some environments | Use self-hosted deployment where stricter control is required |
| AI Architect scope | Free self-managed AI Architect use is limited to teams of up to five developers | Larger teams need enterprise packaging | Budget for enterprise deployment when scaling |
| Documentation consistency | Official sources still contain mixed naming and some outdated model/plugin references **[NEEDS UPDATE]** | Feature/model expectations may be unclear if teams rely on older pages | Prefer current homepage, marketplace listings, and current docs pages |

---

## Sources

- https://bito.ai
- https://bito.ai/pricing
- https://bito.ai/product/ai-code-review-agent/
- https://bito.ai/product/ai-architect/
- https://bito.ai/privacy-policy/
- https://docs.bito.ai
- https://docs.bito.ai/ai-code-review-agent/ai-code-reviews-in-ide
- https://docs.bito.ai/ai-code-reviews-in-git/overview
- https://docs.bito.ai/ai-code-reviews-in-git/available-commands
- https://docs.bito.ai/ai-code-reviews-in-git/supported-programming-languages-and-tools
- https://docs.bito.ai/ai-architect/overview
- https://docs.bito.ai/ai-architect/knowledge-graph
- https://docs.bito.ai/ai-architect/quick-mcp-integration-with-ai-coding-agents
- https://docs.bito.ai/getting-started/installing-on-visual-studio-code
- https://docs.bito.ai/getting-started/installing-on-jetbrain-ides
- https://docs.bito.ai/help/billing-and-plans
- https://docs.bito.ai/privacy-and-security
- https://docs.bito.ai/whats-new
- https://marketplace.visualstudio.com/items?itemName=Bito.Bito
- Official VS Code Marketplace API response for `Bito.Bito` via `https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery`
- https://plugins.jetbrains.com/api/plugins/18289
- https://plugins.jetbrains.com/api/plugins/18289/updates
- https://github.com/gitbito/bitoai
- https://github.com/gitbito/ai-architect
- https://github.com/gitbito/CodeReviewAgent
