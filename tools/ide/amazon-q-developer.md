# Amazon Q Developer
```yaml
name: "Amazon Q Developer"
description: >
  Amazon Q Developer is AWS's generative AI assistant for software development and AWS operations, delivered through IDE extensions, AWS surfaces, chat applications, and third-party integrations. It provides chat, inline code suggestions, code review, code transformation, and agentic coding workflows, and is built on Amazon Bedrock with AWS identity, logging, and encryption controls.
category: ide
logo: https://img.logo.dev/aws.amazon.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 20:41

| Field | Description |
|-------|-------------|
| Name | Amazon Q Developer |
| Alternative names | Amazon CodeWhisperer (features incorporated into Amazon Q Developer on 2024-04-30); Amazon Q Code Transformation (feature name); Amazon Q Developer for GitHub (preview integration) |
| Vendor / Organization | Amazon Web Services (AWS) |
| Product owner | AWS |
| Homepage | https://aws.amazon.com/q/developer |
| Documentation | https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/ |
| Changelog | https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/doc-history.html |
| Repository | Historical CLI repository: https://github.com/aws/amazon-q-developer-cli (README states the Q CLI is now Kiro CLI; the core IDE service is not published as a single open-source product) |
| First release date | 2023-11-28 preview announcement for Amazon Q; 2024-04-30 GA announcement for Amazon Q Developer |
| Current status | Generally available; some integrations remain Preview (for example Eclipse IDE support and Amazon Q Developer for GitHub) |
| Current version | [NO OFFICIAL DATA] — AWS does not publish a single product version for the service; extension/plugin versions vary by IDE |
| Last updated | 2026-05-21 in Amazon Q Developer User Guide document history; pricing page metadata shows 2026-05-13 |

## Classification

- **Primary category:** IDE
- **Secondary categories:** CLI assistant [NEEDS UPDATE], AWS console assistant, ChatOps assistant, GitHub app (Preview)
- **Tool type:** Proprietary SaaS with IDE extensions/plugins and AWS-hosted back-end services
- **Problem domain:** Code generation, code review, code transformation, AWS guidance, console troubleshooting, developer workflow automation
- **User interaction type:** Chat, inline completion, context-menu actions, natural-language task requests, GitHub slash commands
- **Automation type:** Assistive and semi-autonomous; agentic in IDE chat and GitHub workflows

## Summary

- **One-sentence description:** Amazon Q Developer is an AWS developer assistant that combines IDE coding help, AWS-aware chat, code review, and transformation workflows under Free and Pro service tiers.
- **Extended description:** In IDEs, Amazon Q supports chat about code, inline code completions, selected-code actions, code review, and code transformation. In AWS surfaces, it supports AWS Q&A, troubleshooting, and Console-to-Code workflows; in GitHub preview it supports development and review agents.
- **Core value proposition:** Reduce manual work across research, coding, testing, review, remediation, and modernization while keeping authentication, logging, and governance inside AWS control planes.
- **Primary problem solved:** Reduces time spent on repetitive software-development and AWS-operations tasks.
- **Key differentiator:** Official AWS integration depth: Amazon Q can use AWS identity, CloudTrail logging, IAM policies, AWS service context, Console-to-Code, and Amazon Bedrock-backed model serving.
- **Target users:** Application developers, platform engineers, cloud engineers, security reviewers, and teams standardizing on AWS IAM Identity Center.
- **Anti-target users:** Teams requiring a fully self-hosted coding assistant, teams avoiding cloud processing of prompts/code, or users needing one consistent local/offline model runtime.
- **Primary usage context:** IDE-centered development on AWS-oriented projects, with optional use in AWS console workflows and third-party GitHub/GitLab integrations.

## Use Cases

### Primary use cases

- **IDE chat and agentic coding (GA):** Ask questions about code or AWS, generate code, update files directly, and review diffs before keeping changes.
- **Inline code suggestions (GA):** Generate single-line, block, and full-function completions in supported IDEs and AWS coding environments.
- **Code review and remediation (GA):** Scan changed files, files, or repositories for security, secrets, IaC, quality, deployment risk, and SCA findings; generate explanations and in-place fixes.
- **Java modernization (GA):** Upgrade Maven-based Java applications across supported JDK targets and produce transformation summaries and diffs.

### Secondary use cases

- **.NET modernization (GA):** Port Windows-based .NET applications to Linux-compatible cross-platform .NET applications in Visual Studio.
- **Documentation and test generation (GA):** Generate READMEs, documentation updates, and unit tests from IDE chat or selected-code actions.
- **AWS console automation (GA):** Use Console-to-Code to record console actions and generate AWS CLI, CDK, or CloudFormation code.
- **GitHub workflow automation (Preview):** Create pull requests from issues and run automated or on-demand code reviews through the Amazon Q Developer GitHub app.

### Example workflows

- Ask Amazon Q to review changed code, inspect findings in the **Code Issues** tab, then apply an in-place fix.
- Ask Amazon Q to transform a Java project, review the transformation summary, and accept the diff.
- Use Console-to-Code to record EC2/VPC/RDS actions and generate CLI commands or IaC output.
- In GitHub preview, add `/q dev` in an issue or `/q review` in a pull request comment.

### Anti-patterns

- Using Java transformation on projects that do not build with Maven, require private-network resources during transformation, or take more than 55 minutes to build.
- Assuming all integrations have the same data residency or feature availability; AWS documents region- and tier-specific differences.
- Treating current IDE agentic workflows as still slash-command driven; AWS documentation states `/dev`, `/doc`, `/test`, and `/review` were replaced by agentic chat capabilities in IDEs on 2025-10-21.

## Features

### Core features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| IDE chat | Chat about code and AWS; supports follow-up questions, file context, insert-at-cursor, and up to 10 open chat tabs | Free, Pro | Stable | q-in-IDE-chat.md |
| Agentic coding | Updates files directly, shows diffs, supports undo, and may run low-risk shell commands automatically | Free, Pro | Stable | q-in-IDE-chat.md |
| Inline suggestions | Generates inline code suggestions ranging from snippets to full functions | Free, Pro | Stable | what-is.md, q-in-IDE.md, inline-suggestions docs |
| Code review | Reviews changed code, files, or repositories for SAST, secrets, IaC, quality, deployment risk, and SCA findings | Free, Pro; auto-reviews are Pro-only | Stable | code-reviews.md, start-review.md |
| Selected-code actions | For highlighted code, offers Explain, Refactor, Fix, Generate tests, Optimize, and Send to prompt | Free, Pro | Stable | explain-update-code.md |
| Java transformation | Upgrades supported Java versions and can upgrade dependencies/libraries; outputs summaries and diffs | Free, Pro | Stable | code-transformation.md, pricing page |

### Advanced features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| .NET transformation | Ports Windows-based .NET apps to Linux-compatible cross-platform .NET and upgrades outdated cross-platform .NET versions | Pro tier / Visual Studio workflow | Stable | transform-dotnet-IDE.md, quotas.md |
| MCP support | Supports MCP servers with per-tool permissions (`Ask`, `Always allow`, `Deny`) and local/global configuration files | Free, Pro | Stable | qdev-mcp-overview.md, mcp-ide.md |
| Model selection in IDE | Lets users select Claude Sonnet 3.7 or Claude Sonnet 4 (default), both with 200k context windows | Free, Pro [NEEDS UPDATE] | Stable | q-in-ides-chat-models.md |
| Memory bank | Generates `.amazonq/rules/memory-bank/` files (`product.md`, `structure.md`, `tech.md`, `guidelines.md`) for project context | Free, Pro | Stable | context-memory-bank.md |
| Conversation history export | Stores IDE conversations locally, supports view/search/delete, and exports to Markdown or HTML | Free, Pro | Stable | ide-chat-conversation.md |
| Console-to-Code | Records console actions and generates AWS CLI commands or IaC output (CDK Java/Python/TypeScript, CloudFormation JSON/YAML) | Free, Pro | Stable | console-to-code.md |
| Prompt logging | Admins can log IDE inline suggestions and chat prompts/responses to an S3 bucket in Pro environments | Pro | Stable | q-admin-prompt-logging.md |

### Preview or limited-availability features

| Feature | Description | Plan availability | Status | Source |
|---|---|---:|---|---|
| Eclipse IDE support | Amazon Q plugin for Eclipse IDEs | Free, Pro | Preview | what-is.md, product page, q-in-IDE-setup.md |
| Amazon Q Developer for GitHub | GitHub app with development and code review agents plus `/q` slash commands | Free with limited usage; AWS account registration increases limits | Preview | amazon-q-for-github.md, github-quickstart.md |
| GitHub code transformation | Deprecated for GitHub on 2025-12-15 | N/A | Deprecated | doc-history.md |

### Historical IDE quick-action names

| Historical name | Current documented state | Notes | Source |
|---|---|---|---|
| `/dev` | Replaced in IDE docs by agentic chat capabilities | Current docs say this capability used to be referred to as `/dev` | q-in-IDE-chat.md, doc-history.md |
| `/test` | Replaced in IDE docs by agentic chat capabilities | Current docs say unit test generation used to be referred to as `/test` | q-in-IDE-chat.md, doc-history.md |
| `/doc` | Replaced in IDE docs by agentic chat capabilities | Current docs say documentation generation used to be referred to as `/doc` | q-in-IDE-chat.md, doc-history.md |
| `/review` | Replaced in IDE docs by agentic chat capabilities | Current docs say code review used to be referred to as `/review` | q-in-IDE-chat.md, doc-history.md |
| `/transform` | Current IDE docs emphasize natural-language requests and IDE UI flows rather than the slash command | Official AWS blog posts documented `/transform` usage during earlier rollout | Amazon Q GA blog, code-transformation.md |
| `Fix` | Current IDE action for highlighted code and for review findings | Documented as a context-menu action and issue-remediation action, not as a current slash command | explain-update-code.md, address-issues-jetbrains-visualstudiocode.md |

## Interfaces

### Interface types

- IDE plugin / extension
- AWS Management Console panel
- AWS websites and AWS Documentation panel
- Chat applications (Slack, Microsoft Teams)
- GitHub App (Preview)
- GitLab integration
- Browser extensions (GitHub helper extension)
- CLI [NEEDS UPDATE] — current AWS docs state the Q CLI has become the Kiro CLI

### Supported IDEs and minimum versions

| IDE / environment | Support | Minimum version / notes | Source |
|---|---|---|---|
| Visual Studio Code | Yes | 1.85.0+ | q-in-IDE-setup.md |
| JetBrains IDEs | Yes | 2024.3+ | q-in-IDE-setup.md |
| Visual Studio | Yes | Visual Studio 2022 version 17.7+, Windows only | q-in-IDE-setup.md |
| Eclipse | Yes | 2024-06 (4.32)+ | q-in-IDE-setup.md |
| AWS coding environments | Inline suggestions supported | SageMaker AI Studio, JupyterLab, EMR Studio, AWS Glue Studio, AWS Lambda, others | q-language-ide-support.md, inline-suggestions docs |

### Supported operating systems

- **Visual Studio:** Windows only
- **VS Code / JetBrains / Eclipse:** Cross-platform use is implied by AWS documentation and documented keyboard shortcuts cover macOS, Windows, and Linux for VS Code chat actions
- **CLI historical repo:** installation instructions documented for macOS and Linux; current user guide redirects CLI users to Kiro CLI

### Commands and slash commands

| Command | Surface | Description | Source |
|---|---|---|---|
| `/clear` | IDE chat | Clears current conversation and context | q-in-IDE-chat.md |
| `/compact` | IDE chat | Compacts history when context approaches capacity; nudge appears around 80% of context window | q-in-IDE-chat.md, ide-chat-history-compaction.md |
| `/help` | IDE chat | Shows overview of capabilities, examples, and available features | q-in-IDE-chat.md |
| `/q dev` | GitHub issue comments | Starts development agent workflow and creates a PR with changes | amazon-q-for-github.md |
| `/q review` | GitHub pull request comments | Starts a new code review on the current PR state | amazon-q-for-github.md, github-code-reviews.md |
| `/q help` | GitHub comments | Shows help for GitHub integration | amazon-q-for-github.md |

## Operating Modes

| Mode | Description | When to use | Autonomy level | Limitations | Source |
|---|---|---|---|---|---|
| Interactive chat | Standard IDE or console chat with persistent session context | Q&A, explanation, code generation, AWS guidance | Assistive | Context does not carry across different conversations; max 10 open tabs in IDE chat | q-in-IDE-chat.md |
| Agentic IDE coding | Amazon Q edits files directly, shows diffs, and may execute low-risk shell commands | Multi-step coding changes, review remediation, documentation or test generation | Semi-autonomous | Behavior depends on IDE support and project context | q-in-IDE-chat.md |
| Review mode | File/project/repository review for findings and fixes | Security/quality review and remediation | Semi-autonomous | Language and size limits apply; auto-reviews are Pro-only | code-reviews.md, start-review.md |
| Transformation mode | Guided modernization workflow for Java or .NET | Upgrade or port applications | Semi-autonomous | Strict prerequisites for Java and .NET workflows | code-transformation.md, transform-dotnet-IDE.md |
| Console recording mode | Records AWS console actions and generates CLI/IaC output | Automating manual console steps | Assistive | Service coverage is limited to supported AWS services | console-to-code.md |
| GitHub agent mode | GitHub app performs feature development or reviews from issues/PRs | Team workflows in GitHub | Semi-autonomous | Preview; limited free usage; role requirements apply | amazon-q-for-github.md, github-code-reviews.md |

## Architecture & Mechanisms

- **Service architecture:** Amazon Q Developer is built on Amazon Bedrock. AWS documents automated abuse detection implemented in Bedrock for safety and responsible use.
- **Context construction:** In IDE chat, Amazon Q uses the current open file as context by default and can add files, folders, workspace context, project rules, and memory-bank files.
- **Conversation state:** Amazon Q maintains context within a single session/tab, but not across separate conversations.
- **Model routing:** AWS publicly documents selectable IDE chat models Claude Sonnet 3.7 and Claude Sonnet 4 (default), each with a 200k context window.
- **Code execution:** Java transformation performs builds and tests; .NET transformation creates a transformation plan and applies in-place changes after review; agentic IDE chat may execute low-risk shell commands.
- **Tool calling / extensibility:** Amazon Q supports MCP servers and per-tool permissions. Official CLI agent docs also document built-in tools and policy controls for tool access.
- **Safety mechanisms:** Automated abuse detection in Amazon Bedrock; IAM permissions; CloudTrail logging for Pro; MCP tool permission controls; KMS encryption options; diff review and undo for IDE edits.
- **Cross-region processing:** Amazon Q uses Bedrock cross-region inference within a geography. Requests may move outside the profile Region but stay within the documented geography set.

## Tool Capabilities

| Capability | Description | Scope | Risk level | Required permissions / control | Source |
|---|---|---|---|---|---|
| File reading | Reads current files, added context items, workspace context, and generated memory-bank files | IDE chat, transformations, reviews | Medium | IDE access plus Amazon Q sign-in; MCP/file permissions if configured | q-in-IDE-chat.md, context-memory-bank.md, mcp-ide.md |
| File editing | Inserts code at cursor, applies selected-code updates, performs in-place remediation, accepts diffs | IDE chat, review remediation, transformations | High | User review through diff/accept flows; undo available for IDE edits | q-in-IDE-chat.md, explain-update-code.md, start-review.md |
| Command execution | Agentic coding may run low-risk shell commands automatically; Console-to-Code can generate CLI commands; GitHub agent can propose or commit changes | IDE, GitHub, AWS console | High | Low-risk auto-run only is documented in IDE; CloudShell execution is user-triggered; GitHub actions require installation and repo permissions | q-in-IDE-chat.md, console-to-code.md, amazon-q-for-github.md |
| Code/build execution | Java transformations build and run unit tests; .NET transformations analyze, plan, and transform buildable code groups | IDE transformations | High | Maven/local JDK prerequisites for Java; Visual Studio workflow for .NET | code-transformation.md, transform-dotnet-IDE.md |
| AWS API usage | Amazon Q can make API calls on the user's behalf and supports forward access sessions (FAS) | AWS console and some features | High | IAM policies; can be denied with policy examples; logged by CloudTrail in Pro | security-iam-service-with-iam.md, cross-region-processing.md, logging-using-cloudtrail.md |
| Internet / external endpoint access | Uses AWS service endpoints and can connect to MCP HTTP endpoints; GitHub app accesses GitHub repositories; Slack/Teams and GitLab integrations require external service connectivity | Service integrations | Medium to High | Governed by IAM, installation scope, proxy settings, MCP permissions, GitHub/GitLab authorization | mcp-ide.md, amazon-q-for-github.md, gitlab-with-amazon-q.md, firewall.md |
| Approval logic | MCP tools support `Ask`, `Always allow`, `Deny`; CLI built-in tools can be allowlisted/denied; IDE edits present diffs/undo | MCP, CLI/Kiro CLI, IDE | Medium | Config files, per-tool policies, and explicit user review paths | mcp-ide.md, agent-format.md, built-in-tools.md |
| Local conversation storage | IDE conversations are stored locally in the user's home directory and can be exported | IDE | Medium | Local machine access controls | ide-chat-conversation.md |

## Agent Tool Primitives

> AWS publishes a named built-in tool reference for the historical Amazon Q CLI / current Kiro CLI agent configuration. AWS does **not** publish an equivalent low-level primitive list for IDE agentic chat internals in the user guide.

| Tool name | Description | Requires approval | Status / Notes |
|---|---|---:|---|
| `fs_read` | Read files, directories, and images | No by default | Built-in tool; trusted by default | 
| `fs_write` | Create and edit files | Yes by default | Built-in tool; can be scoped with `allowedPaths` / `deniedPaths` |
| `execute_bash` | Execute shell commands | Yes by default | Built-in tool; supports `allowedCommands`, `deniedCommands`, `autoAllowReadonly`, `denyByDefault` |
| `use_aws` | Make AWS CLI API calls | Yes by default | Built-in tool; supports service allow/deny lists and read-only auto-allow |
| `introspect` | Provide Q CLI capability and documentation information | [NO OFFICIAL DATA] | Built-in tool |
| `report_issue` | Open GitHub issue template | No by default | Built-in tool; trusted by default |
| `knowledge` | Store and retrieve information in a knowledge base | [NO OFFICIAL DATA] | Experimental |
| `thinking` | Internal reasoning mechanism | [NO OFFICIAL DATA] | Experimental |
| `todo_list` | Create and manage TODO lists stored locally | [NO OFFICIAL DATA] | Experimental |

## Integrations

### Native AWS integrations

- AWS Management Console and AWS Console Mobile Application
- AWS websites and AWS Documentation
- AWS Builder ID authentication for free IDE usage
- IAM Identity Center for Pro subscription access and profile-based administration
- AWS CloudTrail for Amazon Q Developer Pro API logging
- Amazon S3 for prompt logs and transformation artifacts
- AWS KMS for AWS-owned-key encryption by default and customer-managed-key encryption for selected Pro features
- CloudShell from Console-to-Code generated CLI commands

### IDE integrations

- Visual Studio Code
- JetBrains IDEs
- Visual Studio 2022
- Eclipse IDEs (Preview)

### Third-party integrations

- Microsoft Teams
- Slack
- GitHub / GitHub Enterprise Cloud (Preview)
- GitLab Duo with Amazon Q
- MCP servers (local STDIO and HTTP)
- Browser helper extensions for GitHub issue labeling (Chrome, Firefox, Edge)

### AWS service workflow integrations documented by AWS

- Console-to-Code currently records actions for Amazon DynamoDB, AWS IoT, Amazon Cognito, Amazon EC2, Amazon VPC, and Amazon RDS
- Inline suggestion support in AWS coding environments includes SageMaker AI Studio, JupyterLab, EMR Studio, AWS Glue Studio, and AWS Lambda
- Quotas documentation includes Amazon Q Developer agent for software development in Amazon CodeCatalyst

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes |
| Models used | Amazon Q Developer is built on Amazon Bedrock; IDE chat publicly discloses Claude Sonnet 3.7 and Claude Sonnet 4 (default) |
| Models publicly disclosed | Partially |
| User model selection | Yes, in IDE chat |
| Proprietary models | Yes — AWS states “the model that powers Amazon Q” is augmented with AWS content, but does not publish a full model inventory for every surface |
| External models | Claude Sonnet 3.7; Claude Sonnet 4 |
| Local models | No official local-model option documented |
| Multimodal models | [NO OFFICIAL DATA] for current generally available IDE model menu; separate image-context documentation exists in doc history but was not used here |
| Context window | 200k in IDE chat for Claude Sonnet 3.7 and Claude Sonnet 4 |
| Token limits | [NO OFFICIAL DATA] beyond the documented 200k context window |
| Latency | [NO OFFICIAL DATA] |
| Processing region | Stored and processed in profile Region for some Pro features; many Free-tier and some other feature flows use US Regions; Bedrock cross-region inference can route within documented geographies |
| Training on user data | Free tier may use some content for service improvement; Pro does not use content for service improvement |

**Information status:** partially confirmed

## Permissions & Security

- **Authentication methods:** AWS Builder ID, IAM Identity Center, IAM users/roles for console surfaces, GitHub app authorization, GitLab role integration.
- **IAM model:** Supports identity-based policies, policy actions, temporary credentials, forward access sessions, and service-linked roles. Does not support resource-based policies, ABAC, ACLs, or service-specific condition keys.
- **Managed policies:** `AmazonQFullAccess`, `AmazonQDeveloperAccess`, service-linked-role policies, and `GitLabDuoWithAmazonQPermissionsPolicy`.
- **Encryption in transit:** TLS 1.2 or higher.
- **Encryption at rest:** Default encryption using AWS-owned KMS keys over DynamoDB and S3 storage.
- **Customer-managed encryption:** Available for IAM Identity Center workforce users subscribed to Pro for chat in AWS console, diagnosing console errors, customizations, and agents in the IDE.
- **Audit logging:** CloudTrail logs all Amazon Q Developer actions for Pro; prompt logging can be enabled to S3 for IDE prompts, responses, and accepted/rejected inline suggestions.
- **Data isolation / controls:** Profile Region storage for some Pro features; SCP examples documented to block features that store/process in the US; opt-out controls for telemetry and Free-tier content sharing.
- **Compliance:** AWS directs customers to the AWS Services in Scope by Compliance Program page for Amazon Q compliance applicability rather than publishing a dedicated Amazon Q Developer certification list in the user guide.

## Privacy & Data Processing

- **What data is transmitted:** Questions, responses, additional context such as console metadata and code, and open-file/workspace context in the IDE.
- **Where data is processed and stored:**
  - For IAM Identity Center workforce users at Pro tier, content for chat in AWS console, diagnose-console-errors, IDEs, and command line is stored in the Region where the Amazon Q Developer profile was created.
  - For other Pro features, content may be stored and processed in a US Region.
  - For Free tier and other Amazon Q features/integrations, content is stored in the US; diagnose-console-error sessions are stored in us-west-2 and other data in us-east-1.
- **Cross-region inference:** Requests may be processed in other Regions within the same geography; AWS states data remains encrypted while transmitted across Amazon's network.
- **Retention / local storage:** IDE conversation history is stored locally on the user's computer, organized by workspace; full cloud retention periods are not centrally disclosed in the cited docs.
- **Training / service improvement:** Free tier may use prompts, responses, and generated code for service improvement and model training; Pro and Amazon Q Business do not use customer content for service improvement.
- **Opt-out:**
  - Free-tier IDE content sharing can be disabled in IDE settings.
  - Telemetry sharing can be disabled per IDE or command-line tool.
  - Console/chat-application/web opt-out uses AWS Organizations AI services opt-out policies.
- **GitHub preview note:** AWS states Amazon Q Developer for GitHub currently does not use content for service improvement and processes data in the United States.

## Limitations & Risks

- **Usage limits:** Free tier provides 50 agentic requests per month in IDE/agentic usage and 1,000 LOC/month for Java upgrades; Pro provides higher included limits and overage pricing for Java transformations.
- **Java transformation prerequisites:** Maven only; local source JDK required; project must build successfully and in 55 minutes or less; project must not depend on private-network resources during transformation.
- **Language support boundaries:** Code review languages and versions are explicitly limited; transformation languages are Java, embedded SQL conversion, and C#/.NET depending on IDE.
- **Region and residency complexity:** Feature behavior varies by sign-in method, Region, and tier. Some Free-tier and integrated experiences store/process data only in US Regions.
- **Platform fragmentation:** Visual Studio support is Windows only; Eclipse support is still preview.
- **CLI transition risk:** AWS user-guide docs state the Q CLI has become the Kiro CLI, while pricing and some docs still reference CLI usage. Operational behavior and branding should be rechecked before rollout.
- **Governance overhead:** Organizations using proxies, data perimeters, or SCP-based controls must configure allowlists, certificates, or deny policies for full functionality.
- **Third-party workflow dependence:** GitHub and GitLab features depend on separate product permissions, repository scopes, and service-specific requirements.

## Pricing

| Plan | Price | Included highlights | Limits / notes | Source |
|---|---:|---|---|---|
| Free Tier | $0 | IDE usage with Builder ID, latest Claude models, agentic requests, Java upgrades, AWS console/web/chat usage under Free limits | 50 agentic requests/month; 1,000 LOC/month for Java upgrades; free IDE limits only for Builder ID users | pricing page, quotas.md, q-tiers.md |
| Pro Tier | $19/month per user | Everything in Free plus higher limits, admin dashboards/controls, IAM Identity Center support, IP indemnity | 10,000 inference calls/month in IDE/CLI (roughly 1,000 user inputs); Java upgrades allocated 4,000 LOC/month per user pooled at account level; overage $0.003 per LOC submitted | pricing page, quotas.md |

### Pricing and plan notes

- Free tier is perpetual with monthly limits.
- Free tier availability varies by sign-in method: Builder ID supports IDE and command line; IAM Identity Center and IAM credentials support Free-tier use in AWS console/web surfaces.
- Pro tier is available to Builder ID personal accounts and IAM Identity Center users, but some enterprise administration and profile features require IAM Identity Center.
- AWS pricing documentation states account usage may be updated based on regional factors, payment history, fraudulent usage, or approved quota increases.

## Usage Examples

### IDE chat commands

```text
/clear
/compact
/help
```

### IDE natural-language review prompts

```text
Review my code changes
Run a code review on this entire file
Review this repository
Generate test cases for this function
```

### GitHub preview commands

```text
/q dev
/q review
/q help
/q explain the importance of this finding
```

### Selected-code actions in IDEs

```text
Explain
Refactor
Fix
Generate tests
Optimize
Send to prompt
```

### Console-to-Code example workflow

1. Open an integrated AWS console such as EC2, VPC, or RDS.
2. Start recording in Console-to-Code.
3. Perform console actions.
4. Stop recording.
5. Copy CLI output or generate CDK / CloudFormation code.

## Sources

- https://aws.amazon.com/q/developer
- https://aws.amazon.com/q/developer/pricing/
- https://aws.amazon.com/q/developer/faqs/
- https://aws.amazon.com/about-aws/whats-new/2024/04/amazon-q-developer-generally-available/
- https://aws.amazon.com/blogs/aws/amazon-q-brings-generative-ai-powered-assistance-to-it-pros-and-developers-preview/
- https://aws.amazon.com/blogs/aws/amazon-q-developer-now-generally-available-includes-new-capabilities-to-reimagine-developer-experience/
- https://aws.amazon.com/blogs/aws/upgrade-your-java-applications-with-amazon-q-code-transformation-preview/
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-tiers.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-in-IDE.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-in-IDE-setup.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-in-IDE-chat.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/explain-update-code.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/code-reviews.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/start-review.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/address-issues-jetbrains-visualstudiocode.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/transform-in-IDE.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/code-transformation.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/transform-dotnet-IDE.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/qdev-mcp-overview.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/mcp-ide.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line-mcp-security.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-in-ides-chat-models.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-in-ides-chat-shortcuts.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-language-ide-support.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/context-memory-bank.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/ide-chat-conversation.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/ide-chat-history-compaction.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/console-to-code.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/security.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/data-protection.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/data-storage.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/data-encryption.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/service-improvement.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/opt-out-IDE.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/cross-region-processing.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/security-iam.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/security-iam-service-with-iam.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/managed-policy.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/logging-using-cloudtrail.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-admin-prompt-logging.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/firewall.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/quotas.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/regions.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/amazon-q-for-github.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/github-quickstart.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/github-code-reviews.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/gitlab-with-amazon-q.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/service-rename.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/doc-history.html
- https://github.com/aws/amazon-q-developer-cli/blob/main/README.md
- https://github.com/aws/amazon-q-developer-cli/blob/main/docs/agent-format.md
- https://github.com/aws/amazon-q-developer-cli/blob/main/docs/built-in-tools.md
