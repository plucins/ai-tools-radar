# Research Topics

Structured list of areas to investigate when analyzing an AI tool. Use official vendor sources only.

---

## Priority 1 — Core Identity

These must be established first:

- Official product name and any previous names
- Vendor/organization and ownership
- Current version and release date
- Product status (GA, Beta, Preview, Deprecated)
- Official homepage, docs, changelog, repository URLs
- One-line description from official sources
- Primary category and tool type

---

## Priority 2 — Capabilities & Features

- Complete feature list from official documentation
- Feature status (stable, beta, preview, deprecated)
- Feature availability per plan/tier
- Recently added features (last 3-6 months from changelog)
- Removed or deprecated features
- Announced but not yet released features
- **Internal agent tools / named tool primitives**: if the tool is an AI agent, check for an official tools reference page listing the exact named tools the model can invoke (e.g., `TaskList`, `Bash`, `Edit`, `WebFetch`). These are distinct from user-facing features and are often documented separately under a "tools reference" or "tool calling" section. Document: tool name, what it does, whether it requires user approval, and any deprecation notes.

---

## Priority 3 — Technical Architecture

- AI models used (specific model names and versions if disclosed)
- Context window sizes
- Token limits (input/output)
- Model selection options for users
- Tool calling / function calling capabilities
- Code execution capabilities
- Sandboxing mechanisms
- RAG / indexing / embeddings
- Multi-step planning
- Memory and session handling

---

## Priority 4 — Interfaces & Modes

- Available interfaces (CLI, IDE, Web, API, SDK)
- Supported platforms and operating systems
- Operating modes (interactive, agentic, batch, background)
- Commands and slash commands
- API endpoints and SDK methods

---

## Priority 5 — Integrations

- Native integrations list
- IDE integrations (which IDEs, which versions)
- Git platform integrations
- CI/CD integrations
- MCP (Model Context Protocol) support
- API/webhook integrations
- Third-party marketplace plugins

---

## Priority 6 — Security & Privacy

- Authentication methods
- Authorization model (RBAC, roles)
- SSO support (SAML, OIDC)
- SCIM provisioning
- Audit logging
- Data encryption (at rest, in transit)
- Data residency options
- Data retention policies
- Training opt-out policy
- Certifications (SOC 2, ISO 27001, HIPAA, GDPR)
- Privacy policy details
- DPA availability
- Subprocessor list

---

## Priority 7 — Pricing & Plans

- Available plans/tiers
- Pricing per plan
- Usage limits per plan
- Feature differences between plans
- Enterprise plan details
- Free tier limitations
- Trial availability

---

## Priority 8 — Limitations & Known Issues

- Official known limitations
- Documented constraints
- Rate limits
- Geographic restrictions
- Language/framework support boundaries
- Known bugs or issues (from official issue trackers)

---

## Priority 9 — Ecosystem & Alternatives

- Official comparison pages (if any)
- Migration guides from/to competitors
- Ecosystem partnerships
- Community size indicators (GitHub stars, marketplace installs)

---

## Evaluation Criteria

When assessing information quality:

| Criterion | Accept | Reject |
|-----------|--------|--------|
| Source | Official docs, changelog, repo, product page | Blog posts, social media, third-party reviews |
| Recency | Current version documentation | Outdated docs for previous major versions |
| Specificity | Concrete numbers, versions, dates | Vague claims ("fast", "powerful") |
| Verifiability | Can be confirmed from public official source | Requires insider knowledge |
| Attribution | Clearly attributed to vendor | Unsourced or crowd-sourced |

---

## Source Discovery Patterns

When researching a tool, check these URL patterns:

- `docs.<vendor>.com`
- `<vendor>.com/docs`
- `<vendor>.com/changelog`
- `<vendor>.com/pricing`
- `<vendor>.com/security`
- `<vendor>.com/privacy`
- `<vendor>.com/blog` (technical posts only)
- `github.com/<vendor>/<tool>`
- `github.com/<vendor>/<tool>/releases`
- `github.com/<vendor>/<tool>/blob/main/CHANGELOG.md`
- `status.<vendor>.com`
- `<docs>/tools-reference` or `<docs>/tool-use` — **agent tools reference page** listing all named tools available to the model; often separate from the main feature docs
