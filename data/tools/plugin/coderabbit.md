# CodeRabbit

```yaml
name: "CodeRabbit"
description: >
  CodeRabbit is a cloud-hosted AI code review platform that integrates with pull request and merge request workflows on GitHub, GitLab, Azure DevOps, and Bitbucket. It automates review comments, summaries, pre-merge checks, and follow-up code changes, and can be configured through repository YAML, web settings, and connected context sources such as issue trackers and MCP servers.
category: plugin
logo: https://img.logo.dev/coderabbit.ai?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Code Review
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 21:23

| Field | Value |
|---|---|
| Name | CodeRabbit |
| Alternative names | [NO OFFICIAL DATA] |
| Vendor / Organization | CodeRabbit, Inc. |
| Product owner | [NO OFFICIAL DATA] |
| Homepage | https://coderabbit.ai |
| Documentation | https://docs.coderabbit.ai |
| Changelog | https://docs.coderabbit.ai/changelog |
| Repository | https://github.com/coderabbitai |
| First release date | [NO OFFICIAL DATA] |
| Current status | Commercially available; no GA/Beta label found in reviewed sources |
| Current version | Not publicly versioned for the hosted PR review platform |
| Last updated | 2026-05-22 (latest changelog entry retrieved) |

## Classification

- **Primary category:** plugin
- **Secondary categories:** CLI, IDE extension, Slack agent
- **Tool type:** Cloud-hosted SaaS; enterprise features; self-hosted connectivity option for GitHub Enterprise Server via Reverse Tunnel
- **Problem domain:** Automated pull request / merge request review, issue planning, review workflow automation
- **User interaction type:** Pull request comments, merge request comments, web dashboard, YAML configuration, chat commands, review UI
- **Automation type:** Semi-automatic and automatic review workflows with optional agentic post-review actions

## Summary

- **One-sentence description:** CodeRabbit reviews pull requests and merge requests using AI plus integrated analysis tools, then posts findings and workflow actions back into the source control platform.
- **Core value proposition:** Move review feedback, summaries, issue validation, and selected code modifications into the PR/MR workflow.
- **Primary problem solved:** Reduces manual triage work in code review by combining AI review, repository-specific rules, external context, and scanner output.
- **Key differentiators:** Native PR/MR workflow focus, repository YAML configuration, knowledge-base context sources, 50+ integrated tools, and post-review finishing actions.
- **Target users:** Software teams using GitHub, GitLab, Azure DevOps, or Bitbucket for code review.
- **Primary usage context:** Reviewing proposed code changes before merge.

## Use Cases

- **Primary use cases**
  - Automatic review on new pull requests or merge requests.
  - Incremental review when new commits are pushed.
  - Interactive discussion in PR/MR comments using `@coderabbitai` commands.
  - Requirement validation against linked GitHub, GitLab, Jira, or Linear issues.
- **Secondary use cases**
  - Cross-repository impact analysis through linked repositories.
  - Custom pre-merge checks defined in natural language.
  - Issue creation from review discussions to GitHub, GitLab, Jira, or Linear.
  - Issue planning that turns issues into Coding Plans.
- **Example workflows**
  - Install CodeRabbit on a repository, open a PR, receive an automatic full review, then use `@coderabbitai review` for incremental passes.
  - Link a Jira or Linear issue in the PR description so CodeRabbit validates whether the PR addresses the issue requirements.
  - Trigger `@coderabbitai autofix` or `@coderabbitai generate unit tests` after review completion.
- **Fully automated tasks**
  - Automatic review on PR/MR creation and on new commits.
  - Automatic tool selection for relevant languages and file types.
  - Optional slop detection on public GitHub repositories.
- **Partially automated tasks**
  - Autofix, docstring generation, unit test generation, simplify, and custom finishing-touch recipes require an explicit command or checkbox.
  - MCP, linked repository analysis, and issue-tracker context require configuration.
- **Anti-patterns**
  - Running build-dependent validation inside custom checks; official docs state custom checks do not install dependencies or run the test suite.
  - Using cross-platform linked repositories; linked repositories must be on the same Git platform as the PR under review.

## Features

### Core features

- **Automated PR/MR review**
  - Reviews new pull requests fully and new commits incrementally.
  - Review types: potential issue, refactor suggestion, nitpick.
  - Severity levels: Critical, Major, Minor, Trivial, Info.
- **Review summaries and walkthroughs**
  - High-level summaries, changed-file summaries, review effort estimates, sequence diagrams, linked-issue assessment, related PR/issue hints, and suggested labels/reviewers are configurable in `.coderabbit.yaml`.
- **Interactive review chat and commands**
  - Official commands include `@coderabbitai review`, `@coderabbitai full review`, `@coderabbitai pause`, `@coderabbitai resume`, `@coderabbitai summary`, `@coderabbitai resolve`, `@coderabbitai configuration`, `@coderabbitai help`, and content-generation commands.
- **Repository configuration**
  - Uses a repository-root `.coderabbit.yaml` file.
  - Supports review profiles (`chill`, `assertive`), auto-review controls, path filters, path instructions, tool configuration, knowledge-base settings, and finishing-touch settings.
- **Knowledge-base context**
  - Context sources documented by CodeRabbit: learnings, code-guideline files, web search, issues, past pull requests, linked repositories, Jira, Linear, and MCP servers.

### Advanced features

- **Change Stack review UI**
  - Reorganizes a PR into cohorts and ordered layers with range summaries and inline diagrams.
  - Supports unified, split, and semantic diff views, keyboard navigation, Code Peek, inline comments, and snapshot switching after new commits.
- **Custom pre-merge checks**
  - Natural-language checks run in a secure read-only environment with changed files, snippets, git history, ast-grep/ripgrep search, sandboxed shell inspection, web lookups, and connected MCP tools.
- **Tool integrations**
  - Docs state 50+ third-party linters, security analyzers, and CI/CD tools are supported.
  - Tools are selected automatically based on repository contents and can be configured with `reviews.tools.<tool>` settings.
- **Multi-repo analysis**
  - Detects cross-repository breaking changes, API mismatches, and dependency issues when linked repositories are configured.
- **Issue planning**
  - Generates Coding Plans from Jira, Linear, GitHub, and GitLab issues; docs state plan generation typically takes 5 to 10 minutes.

### Post-review actions

- **Finishing Touches**
  - Available actions: Autofix, Generate docstrings, Resolve merge conflicts, Generate unit tests, Simplify code, and custom recipes.
  - Runs in a sandboxed environment and returns output as a commit or follow-up PR depending on action and platform.
- **Autofix**
  - Works on unresolved CodeRabbit review findings.
  - Can apply fixes on the current branch or open a stacked PR.
  - Limited to pull-request events; skips when merge conflicts exist or when there are no valid unresolved instructions.

## Interfaces

- **PR/MR comment interface**
  - Main interaction surface for review output, inline comments, and `@coderabbitai` commands.
- **Web application**
  - Dashboard for repositories, configuration, billing, reports, learnings, audit logs, and integrations at https://app.coderabbit.ai.
- **Review UI**
  - Change Stack web interface for layered review navigation.
- **Configuration interface**
  - `.coderabbit.yaml` in repository root, plus organization/repository settings in the web UI.
- **API**
  - Official API reference pages exist for audit logs, metrics data, user roles, seats, and related management endpoints.

## Operating Modes

| Mode | Description | When to use | Limitations |
|---|---|---|---|
| Automatic review | Reviews run automatically on new PRs/MRs and new commits by default | Standard repository workflow | Can be paused, ignored, or filtered by config |
| Manual review | Trigger review with `@coderabbitai review` or `@coderabbitai full review` | Re-run after pause or after CI completion | Requires explicit PR/MR command |
| Interactive chat | Ask questions or request actions in review comments | Clarifications, issue creation, content generation | Availability depends on platform and config |
| Agentic finishing touches | CodeRabbit makes follow-up code changes such as Autofix or unit-test generation | Post-review remediation or documentation tasks | Feature/platform/plan dependent |
| Knowledge-base assisted review | Review incorporates learnings, issues, MCP, web search, and linked repos | Repositories needing broader context | Some sources require setup or are disabled for public repos |
| Enterprise private-network mode | Reverse Tunnel connects CodeRabbit to private GHES over outbound WSS | Private GHES without inbound access | Official docs say currently GHES-only |

## Architecture & Mechanisms

- CodeRabbit documents a multi-layered review pipeline combining AI analysis with integrated tools and contextual data sources.
- During PR review, CodeRabbit can use:
  - repository diff and git history,
  - learnings stored from prior chat interactions,
  - coding-guideline files such as `AGENTS.md`, `.cursorrules`, `CLAUDE.md`, `.github/copilot-instructions.md`, and related patterns,
  - linked issues and past pull requests,
  - linked repositories on the same platform,
  - MCP servers,
  - web search,
  - integrated linters, scanners, and CI/CD signals.
- Tool execution is documented as running in secure sandboxed environments.
- GitHub Checks integration waits for CI/CD results and can analyze failure logs before posting remediation suggestions.
- Review caching is available to accelerate reviews; docs state cached code/dependencies are encrypted (except OSS projects), never used for training, and expire after at most one week.
- Custom checks run in a secure read-only environment and cannot execute arbitrary repository code, run test suites, or access build artifacts.

## Integrations

### Native Git platform integrations

- **GitHub.com**
  - GitHub App installation flow with repository-scoped access.
  - Docs list read-only access to Actions, Checks, Discussions, Members, and Metadata; read-write access to Code, Commit statuses, Issues, and Pull requests.
- **GitHub Enterprise Server**
  - Supported directly and via CodeRabbit Reverse Tunnel for private-network deployments.
- **GitLab.com**
  - Supports personal access tokens and group access tokens; project Owners and Maintainers can install on individual projects.
- **Self-managed GitLab**
  - Officially supported in docs.
- **Azure DevOps**
  - Uses personal access tokens for API access and PR review posting.
- **Bitbucket Cloud / Bitbucket Data Center**
  - Listed in platform overview as officially supported.

### Issue tracker integrations

- **Jira Cloud / Jira Data Center**
  - Brings issue context into reviews, validates requirements, creates Jira issues from chat, and supports Coding Plans.
  - Jira Cloud docs require a CodeRabbit Pro plan.
- **Linear**
  - Adds issue context, requirement validation, issue creation from chat, and Coding Plans.
  - Docs require a CodeRabbit Pro plan.

### MCP and context integrations

- **MCP servers**
  - CodeRabbit acts as an MCP client and can use MCP servers as knowledge sources during reviews and chat.
  - Supported guidance examples in docs include Notion, custom in-house servers, Jenkins, SonarQube, and Azure DevOps.
- **Web search**
  - Enabled by default; can be disabled in `knowledge_base.web_search.enabled`.
- **Linked repositories**
  - Supports same-platform cross-repository context.

### Tooling integrations

- **50+ tool catalog**
  - Includes linters, security analyzers, CI/CD integrations, and language-specific tools.
  - Official catalog examples include ast-grep, OpenGrep, Semgrep, Betterleaks, TruffleHog, Presidio, OSV-Scanner, ESLint, Ruff, ShellCheck, Checkov, Trivy, GitHub Checks, CircleCI, and LanguageTool.

## AI Models

| Field | Value |
|---|---|
| Uses LLM | Yes |
| Models used | OpenAI and Anthropic are named in the privacy policy for performing code reviews |
| Models publicly disclosed | Partially |
| User model selection | [NO OFFICIAL DATA] for the PR review platform |
| Proprietary models | [NO OFFICIAL DATA] |
| External models | OpenAI, Anthropic |
| Local models | No official local-model option documented for the PR review platform |
| Multimodal models | [NO OFFICIAL DATA] |
| Context window | [NO OFFICIAL DATA] |
| Token limits | [NO OFFICIAL DATA] |
| Latency | Reviews are described as returning feedback within minutes; no fixed SLA published in reviewed sources |
| Processing region | Privacy policy says servers are located in the United States |
| Training on user data | Privacy policy says personal information collected as part of code review is not used by CodeRabbit, OpenAI, or Anthropic to train models; this representation does not apply to OSS, which CodeRabbit says it uses to train its systems |
| Information status | Partially confirmed |

## Permissions & Security

- **GitHub permissions**
  - OAuth sign-in requests read-only access to organizations/teams and email addresses.
  - GitHub App install requests read-only access to Actions, Checks, Discussions, Members, and Metadata; read-write access to Code, Commit statuses, Issues, and Pull requests.
- **GitLab permissions**
  - GitLab personal or group access token is required; docs recommend a dedicated service account with at least Developer access.
- **Azure DevOps permissions**
  - Personal access token is required to interact with the Azure DevOps API.
- **Data handling and controls**
  - GitHub platform docs state CodeRabbit does not retain source code after review except when review caching is enabled.
  - Review cache is encrypted (except OSS projects), never used for training, and expires within one week.
- **Security controls**
  - Homepage states SSL-encrypted data and SOC 2 Type II certification.
  - Enterprise docs cover SAML SSO with Okta and Keycloak.
  - Enterprise audit logs are available in the UI and via API.
  - Enterprise custom roles are documented.
- **Private-network deployment support**
  - Reverse Tunnel uses an outbound WSS connection from a customer-hosted connector to reach private GHES without opening inbound ports.

## Privacy & Data Processing

- Privacy policy URL: https://www.coderabbit.ai/privacy-policy
- CodeRabbit says it collects account information such as name and email, usage/device information, and integration-related data needed to connect Git platforms.
- Privacy policy says payment data is processed by service providers and not stored directly by CodeRabbit.
- Named service providers/integrations in the privacy policy include Stripe, Chargebee, Mailchimp, GitHub, GitLab, Jira, Linear, OpenAI, and Anthropic.
- Privacy policy says servers are located in the United States.
- Privacy policy states users can access, update, or delete personal information through account settings or by contacting support.
- Privacy policy states data is retained for the period necessary for the documented purposes unless a longer period is legally required or permitted.
- Privacy policy states CodeRabbit stores certain data, primarily vector embeddings, to improve and personalize reviews, and that users can opt out of data storage.
- Docs provide an explicit technical opt-out: `knowledge_base.opt_out: true` disables knowledge-base features that require data retention and removes stored knowledge-base data.
- Privacy policy states CodeRabbit does not sell personal information.
- Privacy policy states neither CodeRabbit nor OpenAI or Anthropic uses personal information collected as part of code review to train models; it also states this representation does not apply to open-source projects and that CodeRabbit uses OSS to train its systems.
- Caching docs state cached data is never used for training and expires after a maximum of one week.

## Pricing

| Plan / item | Price | Officially documented limits / notes |
|---|---|---|
| Free | $0/user/month | Pricing page says pull-request summarization and free reviews forever for public repositories; docs/plans lists per-developer review limits of PR `3*` (summary only), IDE `1`, CLI `3`, files/review `150`, chat `N/A` |
| Trial | [NO PUBLIC PRICE] | Docs/plans lists per-developer limits of PR `3`, IDE `3`, CLI `3`, files/review `150`, chat `50` |
| OSS | [NO PUBLIC PRICE] | Docs/plans lists per-developer limits of PR `1-8*`, IDE `1`, CLI `3`, files/review `150`, chat `25` |
| Pro | $24/user/month billed annually | Pricing page includes linters/SAST, Jira/Linear, agentic chat, analytics, reports, docstrings, Autofix, 5 MCP connections, 1 linked repository analysis, and 5 PR reviews/hour; docs/plans lists per-developer limits of PR `5`, IDE `5`, CLI `5`, files/review `300`, chat `50` |
| Pro Plus / Pro+ | $48/user/month billed annually | Pricing page uses **Pro Plus** while docs/plans uses **Pro+** [CONFLICTING SOURCES]; pricing page lists 15 MCP connections, 10 linked repository analyses, and 10 PR reviews/hour; docs/plans lists per-developer limits of PR `10`, IDE `10`, CLI `10`, files/review `300`, chat `100` |
| Enterprise | Contact sales | Pricing page lists custom MCP connections and linked repository analyses; docs/plans lists per-developer limits of PR `12`, IDE `12`, CLI `12`, files/review `300`, chat `100`; Enterprise docs add audit logs, SSO, custom roles, and Reverse Tunnel |
| Usage-based add-on | $1.00/credit | Docs say 1 credit covers 4 reviewed files at $0.25/file for eligible over-limit PR and CLI reviews |
| Slack Agent | $0.50 per agent minute | Pricing page lists pay-as-you-go pricing |

## Limitations & Risks

- **Hosted service without public platform versioning**
  - The PR review product is not publicly versioned as a single release artifact; changes are tracked through documentation changelog entries.
- **Public-repository training exception**
  - Privacy policy states the no-training representation for personal information does not apply to OSS and that CodeRabbit uses OSS to train its systems.
- **Custom-check execution limits**
  - Official docs state custom checks cannot run test suites, install dependencies, access build artifacts, execute arbitrary repository code, or modify CodeRabbit reviews.
- **Platform constraints on linked repositories**
  - Linked repositories must be on the same platform as the repository under review.
- **Plan and quota limits**
  - Reviews, files/review, chat, PR, IDE, CLI, MCP connections, linked repositories, and custom checks vary by plan.
  - Pro and Pro+ documentation also notes fair-usage adjustments during sustained high-volume PR activity.
- **Feature availability varies by platform**
  - Finishing Touches support differs across GitHub, GitLab, Azure DevOps, and Bitbucket.
- **Private-network option scope**
  - Reverse Tunnel documentation says the feature is currently available only for GitHub Enterprise Server.

## Sources

- https://coderabbit.ai
- https://coderabbit.ai/pricing
- https://docs.coderabbit.ai
- https://docs.coderabbit.ai/changelog
- https://docs.coderabbit.ai/guides/code-review-overview
- https://docs.coderabbit.ai/guides/commands
- https://docs.coderabbit.ai/reference/review-commands
- https://docs.coderabbit.ai/getting-started/yaml-configuration
- https://docs.coderabbit.ai/reference/configuration
- https://docs.coderabbit.ai/knowledge-base/index
- https://docs.coderabbit.ai/knowledge-base/code-guidelines
- https://docs.coderabbit.ai/knowledge-base/learnings
- https://docs.coderabbit.ai/knowledge-base/multi-repo-analysis
- https://docs.coderabbit.ai/knowledge-base/web-search
- https://docs.coderabbit.ai/integrations/mcp-servers
- https://docs.coderabbit.ai/integrations/issue-trackers
- https://docs.coderabbit.ai/integrations/jira
- https://docs.coderabbit.ai/integrations/linear
- https://docs.coderabbit.ai/issues/creation
- https://docs.coderabbit.ai/issues/planner/index
- https://docs.coderabbit.ai/pr-reviews/change-stack
- https://docs.coderabbit.ai/pr-reviews/custom-checks
- https://docs.coderabbit.ai/pr-reviews/slop-detection
- https://docs.coderabbit.ai/finishing-touches/index
- https://docs.coderabbit.ai/finishing-touches/autofix
- https://docs.coderabbit.ai/tools
- https://docs.coderabbit.ai/tools/list
- https://docs.coderabbit.ai/tools/github-checks
- https://docs.coderabbit.ai/platforms/overview
- https://docs.coderabbit.ai/platforms/github-com
- https://docs.coderabbit.ai/platforms/gitlab-com
- https://docs.coderabbit.ai/platforms/azure-devops
- https://docs.coderabbit.ai/management/plans
- https://docs.coderabbit.ai/management/usage-based-addon
- https://docs.coderabbit.ai/management/audit-logs
- https://docs.coderabbit.ai/management/sso/index
- https://docs.coderabbit.ai/self-hosted/coderabbit-reverse-tunnel
- https://docs.coderabbit.ai/reference/caching
- https://www.coderabbit.ai/privacy-policy
- https://github.com/coderabbitai
