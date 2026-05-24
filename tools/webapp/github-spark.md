# GitHub Spark

```yaml
name: "GitHub Spark"
description: >
  GitHub Spark is an AI-powered agent within GitHub Copilot that builds full
  web, Python, and Node.js applications from natural language prompts. It runs
  entirely in a GitHub-hosted sandboxed environment and provides built-in
  deployment, real-time rendering, and automated Playwright testing without
  requiring local setup.
category: webapp
logo: https://img.logo.dev/github.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Coding Agent
  - Developer Tools
```

## Tool Identification

**Last update:** 24-05-2026 21:26

| Field | Description |
|-------|-------------|
| Name | GitHub Spark |
| Alternative names | GitHub Copilot Spark; "Spark" (product shorthand) |
| Vendor / Organization | GitHub, Inc. (subsidiary of Microsoft) |
| Product owner | GitHub Next research team (original); GitHub Copilot product team (current) |
| Homepage | https://github.com/features/spark |
| Research project page | https://githubnext.com/projects/github-spark |
| Documentation | https://docs.github.com/en/copilot/concepts/spark |
| Changelog | https://gh.io/spark-changelog |
| FAQ | https://gh.io/spark-faq |
| Repository | N/A — proprietary, no public source repository |
| First release date | October 2024 (limited beta at GitHub Universe 2024) |
| GA release date | November 13, 2024 (all GitHub Copilot subscribers) |
| Current status | Generally Available (for GitHub Copilot Pro / Team / Enterprise) |
| Current version | [UNVERIFIED — no public version number disclosed] |
| Last updated | [UNVERIFIED — changelog page content is sparse] |

---

## Classification

- **Primary category:** Web Application (browser-based app builder; accessed via `github.com/copilot/spark`)
- **Secondary categories:** CLI Tool (`copilot spark` subcommands); Coding Agent (AI builds and deploys the generated app)
- **Tool type:** SaaS — fully managed, GitHub-hosted
- **Problem domain:** Rapid application prototyping; AI-assisted code generation
- **User interaction type:** Web UI (chat-style prompt), CLI
- **Automation type:** Autonomous (Spark independently generates, tests, and deploys code from a single prompt)

---

## Summary

- **One-sentence description:** GitHub Spark is an AI agent that generates, tests, and deploys full applications from natural language descriptions, running entirely within GitHub's cloud infrastructure.
- **Extended description:** Users describe an application they want to build in a text prompt; Spark generates working code, renders a live preview, and runs automated tests — all without requiring any local development environment. Code can be downloaded, deployed to GitHub's cloud, or shared via link.
- **Core value proposition:** Zero-setup path from idea to running application for GitHub Copilot subscribers.
- **Primary problem solved:** Eliminating the configuration, framework, and deployment overhead required to produce a working prototype.
- **Key differentiator:** Tight integration with GitHub Copilot subscriptions and GitHub's managed runtime; built-in Playwright test generation for web applications.
- **Target users:** Developers at any experience level who want to prototype quickly; GitHub Copilot Pro / Team / Enterprise subscribers.
- **Anti-target users:** Teams requiring production-grade authentication, user data persistence, or private-dependency access; projects requiring >2 weeks of development scope.
- **Primary usage context:** Proof-of-concept and prototype applications; personal tooling; learning and exploration of new frameworks.

---

## Use Cases

### Primary use cases
- Generating working web applications (React, Vue, Next.js, Svelte, HTML/CSS/JS, Tailwind CSS) from a text prompt
- Generating Python applications (Flask, FastAPI, Streamlit)
- Generating Node.js CLI tools and libraries
- Rapid prototyping to validate an idea before committing to a full project

### Secondary use cases
- Personal micro-tools (described on the GitHub Next page as "sparks" — single-purpose apps built for oneself)
- Learning a new framework by generating a starter project
- Generating boilerplate libraries with example code

### Example workflows
1. Navigate to `github.com/copilot/spark` → enter a prompt → Spark generates a React app → review live preview → run Playwright tests → deploy or download code
2. Use `copilot spark create` in the CLI → describe the app → iterate with follow-up prompts → deploy with `copilot spark deploy <spark-id>`

### Anti-patterns (when NOT to use)
- Applications requiring user authentication (not implemented by default)
- Applications that process sensitive or personal user data
- Projects requiring private npm packages
- Production systems requiring security hardening, input validation, or extensive performance optimization
- Applications exceeding two weeks of estimated development scope (documented limitation)

---

## Features

### Core features

| Feature | Description | Status |
|---------|-------------|--------|
| Prompt-to-application generation | Generates a complete working application from a natural language prompt | GA |
| Real-time preview rendering | Web applications are rendered live in the preview pane as code is generated | GA (web apps only) |
| Automated Playwright testing | Spark auto-generates Playwright tests for web applications on creation | GA (web apps only) |
| Built-in deployment | Applications can be deployed directly to GitHub's cloud infrastructure from the UI or CLI | GA |
| Code download | Generated code can be downloaded in standard formats for local use | GA |
| Share link | A shareable URL for the running Spark application can be generated | GA |
| Iterative refinement | Users can ask Spark to add features, fix bugs, or change styling after initial generation | GA |
| Log viewer | Application logs are accessible in the Spark UI | GA |
| Test runner | "Run tests" button triggers the auto-generated Playwright test suite | GA (web apps only) |

### CLI features

| CLI command | Description |
|-------------|-------------|
| `copilot spark create` | Prompts for description and configuration; creates a Spark application |
| `copilot spark list` | Lists all Spark applications for the authenticated user |
| `copilot spark view <spark-id>` | Views a specific Spark application |
| `copilot spark delete <spark-id>` | Deletes a Spark application |
| `copilot spark deploy <spark-id>` | Deploys a Spark application to a specified target |

### Plan-restricted features

- All Spark features require a **GitHub Copilot Individual** or **GitHub Copilot Enterprise** subscription (Pro, Team, or Enterprise plan)
- Not available on the GitHub Copilot Free tier

### Announced / experimental features (from GitHub Next research page)

The GitHub Next project page describes features from the original beta that may or may not reflect current GA status:

| Feature | Description | Status |
|---------|-------------|--------|
| Multi-model selection | Choose between multiple AI models per session (Claude Sonnet 3.5, GPT-4o, o1-preview, o1-mini documented on GitHub Next page) | [NEEDS UPDATE — current model availability not confirmed in GA docs] |
| Revision variants | Generate and compare multiple variants of an application revision | [NEEDS UPDATE] |
| Automatic history | Automatic history of application revisions | [NEEDS UPDATE] |
| Themable design system | Built-in design system that supports theming | [NEEDS UPDATE] |
| Persistent data storage | Managed persistent data store per application | [NEEDS UPDATE] |
| Integrated model prompting | Ability to call AI models from within the Spark runtime | [NEEDS UPDATE] |
| PWA dashboard | Progressive Web App dashboard to manage and launch sparks | [NEEDS UPDATE] |
| Read-only / read-write sharing | Share sparks with configurable permission levels | [NEEDS UPDATE] |

---

## Interfaces

- **Web UI:** Browser-based interface at `github.com/copilot/spark` — prompt input, live preview pane, code editor (read-only during build), test results panel, log viewer, deploy and download buttons
- **CLI:** GitHub Copilot CLI subcommands (`copilot spark create`, `list`, `view`, `delete`, `deploy`)
- **No desktop app, no IDE plugin, no API or SDK** (not documented in official sources)
- **Supported platforms:** Any modern browser; CLI requires GitHub Copilot CLI installation
- **Supported operating systems:** Cross-platform via browser; CLI platform support follows GitHub Copilot CLI requirements

---

## Operating Modes

### Cloud / Managed (primary mode)

- **Description:** All code generation, execution, testing, and deployment runs in GitHub's managed cloud infrastructure; no local compute required
- **When to use:** Default mode for all Spark usage
- **Autonomy level:** Autonomous — Spark decides architecture, framework choice, and implementation details based on the prompt
- **Limitations:** No offline use; requires active Copilot subscription; code is read-only during the build process

### CLI mode (secondary)

- **Description:** `copilot spark` subcommands enable creating, managing, and deploying Spark applications from a terminal
- **When to use:** When browser access is not preferred or for scripting deployment steps
- **Autonomy level:** Same as web UI; generation is still fully autonomous

---

## Architecture & Mechanisms

- **Deployment model:** Fully managed SaaS; all execution occurs in GitHub-hosted sandboxed environments
- **Sandboxing:** Code and data run in a sandboxed environment isolated from other users' applications and data
- **AI agent:** Spark operates as a GitHub Copilot agent; it uses AI to interpret prompts, generate code, make implementation decisions, and handle iteration
- **Testing mechanism:** Playwright tests are automatically generated for web applications; tests run in the sandbox
- **AI models used:** [NEEDS UPDATE] — The GitHub Next research page lists Claude Sonnet 3.5, GPT-4o, o1-preview, and o1-mini as available model choices; the current GA documentation does not explicitly list supported models
- **Model selection:** [NEEDS UPDATE] — User-selectable model was a feature described on the GitHub Next page for the beta; current GA status not confirmed in official docs
- **Context construction:** User prompt + iterative follow-up messages form the context for each generation
- **Code execution:** Executed in GitHub-hosted sandbox; not on user device
- **Memory / sessions:** Each Spark application persists; users can return and iterate; no cross-application memory
- **No RAG or embeddings** disclosed in official documentation
- **No MCP integration** documented

---

## Tool Capabilities

| Capability | Description | Scope | Risk Level | Notes |
|-----------|-------------|-------|------------|-------|
| Code generation | Generates complete application code from prompts | Full project | Low (sandboxed) | Code is read-only during build |
| File creation | Creates all source files for the generated application | Application scope | Low | Within GitHub sandbox |
| Command execution | Runs build, test, and server processes in the sandbox | Sandbox only | Low | Isolated from user device |
| Test execution | Runs auto-generated Playwright tests | Web apps only | Low | Tests run in sandbox |
| Deployment | Deploys application to GitHub's cloud infrastructure | GitHub hosting | Low | User-initiated action |
| Internet access | [NO OFFICIAL DATA] — sandbox network access policy not documented publicly | — | — | — |
| External API usage | Applications can call external APIs if coded to do so [UNVERIFIED] | Application code | Medium | Not explicitly documented |
| Production data modification | Not supported — no database or persistent user data by default | N/A | N/A | — |

---

## Integrations

### Native integrations

| Integration | Type | What it enables | Requirements |
|------------|------|-----------------|--------------|
| GitHub Copilot | Native (Spark is a Copilot agent) | Access to Spark via Copilot subscription billing and authentication | GitHub Copilot Pro / Team / Enterprise |
| GitHub authentication | Native | User identity; no separate login required | GitHub account |
| GitHub Copilot CLI | Native | `copilot spark` subcommands for creating, managing, deploying | GitHub Copilot CLI installed |
| GitHub Pages | Deployment target (mentioned in enterprise docs) [UNVERIFIED] | Hosting Spark-generated static web apps | GitHub Pages availability |

### Framework support (as dependency, not integration)

**Web:** React, Vue, Next.js, Svelte, HTML/CSS/JavaScript, Tailwind CSS  
**Python:** Flask, FastAPI, Streamlit  
**Node.js:** CLI applications and libraries (JavaScript)

### Package registry

- **npm:** Public packages only — private npm dependencies are not supported

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models used | Claude Sonnet 3.5, GPT-4o, o1-preview, o1-mini [from GitHub Next beta page — NEEDS UPDATE for current GA] |
| Models publicly disclosed | Partially (beta-era disclosure on GitHub Next; GA docs do not list specific models) |
| User model selection | [NEEDS UPDATE] — was available in beta per GitHub Next page |
| Proprietary models | No — models from Anthropic and OpenAI |
| External models | Claude Sonnet 3.5 (Anthropic), GPT-4o / o1-preview / o1-mini (OpenAI) [NEEDS UPDATE] |
| Local models | No — cloud-only |
| Multimodal models | [NO OFFICIAL DATA] |
| Context window | [NO OFFICIAL DATA] |
| Token limits | [NO OFFICIAL DATA] |
| Processing region | GitHub's cloud infrastructure (specific region not disclosed in public docs) |
| Training on user data | Prompts and generated applications are processed by GitHub "to provide the Spark service, improve GitHub Copilot products, and for security and moderation purposes" (per responsible use docs) |

*Information status: model list partially confirmed (GitHub Next beta page); GA model details unconfirmed.*

---

## Permissions & Security

- **Authentication:** GitHub account authentication; GitHub Copilot subscription required
- **Authorization:** Spark availability controlled by Copilot subscription tier (Pro / Team / Enterprise)
- **RBAC (Enterprise):** Enterprise admins can enable/disable Spark per enterprise or organization; restrict to specific users or roles; configure allowed frameworks; control deployment settings
- **Data access scope:** User's own prompts and generated applications; no access to other users' data or repositories
- **Sandbox isolation:** Code and data isolated from other users' environments at the GitHub infrastructure level
- **Audit logging (Enterprise):** Audit logging for Spark activity is available for GitHub Enterprise Cloud
- **Network restrictions (Enterprise):** Enterprise admins can restrict Spark to specific networks
- **SSO:** Follows GitHub Enterprise SSO (SAML/OIDC) via GitHub account; no Spark-specific SSO documentation
- **SCIM:** Follows GitHub Enterprise SCIM provisioning
- **Encryption:** [NO OFFICIAL DATA specific to Spark] — GitHub platform infrastructure uses standard encryption
- **Data region:** [NO OFFICIAL DATA] — GitHub's cloud infrastructure; specific geographic region not documented
- **Staff visibility:** During development, prompts and the generated application are visible to GitHub staff for moderation and safety purposes (documented in responsible use page)
- **Certifications:** Covered by GitHub/Microsoft enterprise compliance programs [UNVERIFIED for Spark specifically]

---

## Privacy & Data Processing

- **Data transmitted:** User prompts, iterative messages, and generated application code are transmitted to GitHub's cloud
- **Where processed:** GitHub-hosted sandboxed environment (cloud)
- **Data stored:** GitHub retains prompts and generated applications "for a limited time" to improve the Spark service and for security purposes
- **Retention period:** "Limited time" — exact duration not specified in public documentation
- **Staff visibility:** GitHub staff can view prompts and generated applications during the build phase for moderation and safety
- **Post-download privacy:** After code is downloaded, only the user has access to it
- **Training opt-out:** [NO OFFICIAL DATA specific to Spark] — GitHub Copilot general training opt-out policies apply
- **Data deletion:** Users can request deletion of their data by contacting GitHub Support
- **Applicable policies:** GitHub Terms of Service; GitHub Copilot Additional Terms; GitHub Copilot Privacy Statement
- **Privacy policy URL:** https://docs.github.com/en/site-policy/privacy-policies/github-copilot-business-privacy-statement

---

## Limitations & Risks

### Functional limitations

| Limitation | Description | Impact |
|-----------|-------------|--------|
| No authentication by default | Generated applications do not include user authentication or session management | High — apps must not handle personal/private data without manual additions |
| No user data persistence | No database or persistent storage for user data implemented by default | High — limits application types |
| No private dependencies | Cannot use private npm packages or internal registries | Medium — restricts enterprise package usage |
| No version control during development | No Git history or branching during the Spark build phase | Medium — no rollback within Spark |
| No debugging tools | No breakpoints, step debugger, or interactive debugging during development | Medium |
| Code read-only during build | Source code cannot be manually edited while Spark is generating | Medium |
| No offline use | Spark requires internet access and GitHub cloud connectivity | Medium |
| Scope limit | Cannot build applications estimated to require >2 weeks of development | Medium |
| Mobile apps not supported | Mobile app generation not supported; per FAQ, mobile support is being developed | Low–Medium |

### Security limitations

| Limitation | Description | Risk Level |
|-----------|-------------|------------|
| Staff visibility of prompts | GitHub staff can view prompts and generated code during development for moderation | Medium — avoid including secrets or sensitive data in prompts |
| Data retention by GitHub | Prompts and apps retained for unspecified period for service improvement | Low–Medium |
| No production hardening | Generated code is not production-ready without additional security review | High if deployed to production without review |

### Vendor lock-in risk

- Deployment targets GitHub's infrastructure; code is downloadable, reducing lock-in risk for the generated application itself
- Tool access is tied to GitHub Copilot subscription; cancellation removes access to Spark

### Cost risk

- Each Spark generation costs $0.02 USD; charged against GitHub Copilot usage metrics
- Iterative prompts each count toward usage; complex applications with many iterations accumulate cost

---

## Alternatives

| Alternative | Type | Advantage of Spark | Advantage of Alternative |
|------------|------|-------------------|--------------------------|
| Bolt.new (StackBlitz) | Direct — AI-powered web app builder | GitHub Copilot integration; GitHub-hosted sandbox | No Copilot subscription required; supports more frameworks |
| Replit AI | Direct — AI-assisted IDE and hosting | Tighter GitHub integration | More mature runtime; full debugging tools; wider language support |
| Lovable | Direct — AI web app generator | GitHub-native; Copilot billing | More UI-focused; exports to Supabase/Vercel natively |
| v0 (Vercel) | Indirect — UI component generator | Full application (not just UI) | Superior UI output; integrates with Vercel deployment pipeline |
| GitHub Copilot Chat + Codespaces | Within-platform indirect | Zero additional cost; full dev environment | Requires developer to handle architecture, setup, and deployment manually |

---

## Usage Examples

### Create a web application via browser

```
Prompt: "Create a web application that shows a todo list. Users should be able to
add, edit, and delete todos. The app should allow users to toggle todos as complete."

Steps:
1. Navigate to github.com/copilot/spark
2. Enter the prompt
3. Click "Create Spark"
4. Review the rendered live preview
5. Click "Run tests" to execute auto-generated Playwright tests
6. Iterate: "Add a search feature to find todos"
7. Click "Deploy" or "Download"
```

*Source: docs.github.com/en/copilot/tutorials/spark/your-first-spark*

### Create and deploy via CLI

```bash
# Create a new Spark (interactive prompts follow)
copilot spark create

# List existing Sparks
copilot spark list

# View a specific Spark
copilot spark view <spark-id>

# Deploy a Spark
copilot spark deploy <spark-id>

# Delete a Spark
copilot spark delete <spark-id>
```

*Source: docs.github.com/en/copilot/tutorials/spark/deploy-from-cli*

### Python Flask REST API

```
Prompt: "Create a Python Flask application that serves a REST API for a blogging
platform. Users should be able to create, read, update, and delete blog posts."
```

*Source: docs.github.com/en/copilot/tutorials/spark/build-apps-with-spark*

---

## Sources

| Source | URL |
|--------|-----|
| GitHub Spark product page | https://github.com/features/spark |
| GitHub Next research project page | https://githubnext.com/projects/github-spark |
| Official documentation — About GitHub Spark | https://docs.github.com/en/copilot/concepts/spark |
| Official documentation — Your first Spark | https://docs.github.com/en/copilot/tutorials/spark/your-first-spark |
| Official documentation — Build apps with Spark | https://docs.github.com/en/copilot/tutorials/spark/build-apps-with-spark |
| Official documentation — Prompt tips | https://docs.github.com/en/copilot/tutorials/spark/prompt-tips |
| Official documentation — Deploy from CLI | https://docs.github.com/en/copilot/tutorials/spark/deploy-from-cli |
| Official documentation — Responsible use of Spark | https://docs.github.com/en/copilot/responsible-use/spark |
| Official documentation — Manage Spark for enterprise | https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-spark |
| Official documentation — Troubleshoot Spark | https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-spark |
| GitHub blog — GA announcement | https://github.blog/2024-10-29-github-spark/ |
| GitHub Copilot changelog — Nov 13, 2024 | https://github.blog/changelog/2024-11-13-github-spark-is-now-available-for-all-github-copilot-users/ |
| GitHub Spark changelog | https://gh.io/spark-changelog |
| GitHub Spark FAQ | https://gh.io/spark-faq |
| GitHub Copilot privacy statement | https://docs.github.com/en/site-policy/privacy-policies/github-copilot-business-privacy-statement |
