# Profile Template Sections

Standardized section structure for AI tool profiles. Only include sections where official data is available from vendor sources.

---

## Required File Header

Every tool profile **must begin** with this identification JSON block as the very first content after the `# Title` heading:

```yaml
name: "<Official product name>"
description: >
  <2–3 sentences on the essence of the tool. No more.>
category: <folder name under tools/ where this file lives, e.g. cli, ide, plugin>
logo: https://img.logo.dev/<vendor-domain>?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - <tag1>
  - <tag2>
```

**Rules:**
- Description is strictly 2–3 sentences. Do not exceed this.
- Category must exactly match the `tools/<category>/` folder where the file is placed.
- Logo must be a logo.dev URL in the format `https://img.logo.dev/<vendor-domain>?token=pk_&format=png&theme=dark&retina=true&fallback=404`. Use the vendor's primary domain. Set to `null` if no vendor domain is available.
- Tags: choose at most 2 from the approved list in `references/avaliable-tags.md`. Do not invent new tags.

---


**Last update:** DD-MM-YYYY HH:mm

> Populated by running `scripts/get_current_datetime.py` at the time of profile creation or update. Never hard-code or guess this value.


## Tool Identification

| Field | Description |
|-------|-------------|
| Name | Official product name |
| Alternative names | Previous names, abbreviations, common aliases |
| Vendor / Organization | Company or organization that develops the tool |
| Product owner | Team or individual responsible |
| Homepage | Official product URL |
| Documentation | Official docs URL |
| Changelog | Official changelog URL |
| Repository | GitHub/GitLab URL (if applicable) |
| First release date | Date of initial public release |
| Current status | GA / Beta / Preview / Deprecated / Sunset |
| Current version | Latest stable version |
| Last updated | Date of most recent release |

---

## Classification

- Primary category (e.g., Coding Agent, IDE Assistant, CLI Tool, Automation Platform)
- Secondary categories
- Tool type (e.g., SaaS, Open-source, Self-hosted, Hybrid)
- Problem domain
- User interaction type (e.g., Chat, CLI, Background agent, API)
- Automation type (e.g., Autonomous, Semi-autonomous, Assistive)

---

## Summary

- One-sentence description
- Extended description (2-3 sentences)
- Core value proposition
- Primary problem solved
- Key differentiator
- Target users
- Anti-target users (who should NOT use this)
- Primary usage context

---

## Use Cases

- Primary use cases
- Secondary use cases
- Example workflows
- Fully automated tasks
- Partially automated tasks
- Anti-patterns (when NOT to use)
- User roles per use case
- Maturity level per use case (GA / Beta / Experimental)

---

## Features

For each feature, document:
- Feature name
- Description
- Example usage
- Requirements
- Limitations
- Plan availability
- Status: stable / beta / preview / deprecated
- Source reference

Organize features into:
- Core features
- Advanced features
- Experimental features
- Plan-restricted features
- Deprecated features
- Announced/upcoming features
- Integration-dependent features
- Configuration-dependent features

---

## Interfaces

- Interface types: Web app, Desktop app, Mobile app, CLI, IDE plugin, Browser extension, API, Webhook, SDK, Chat, Embedded widget, Background agent
- Supported platforms
- Supported operating systems
- Supported browsers
- Operating modes
- Commands / Slash commands
- UI actions
- API endpoints
- SDK methods

---

## Operating Modes

For each mode, document:
- Mode name
- Description
- When to use
- Autonomy level
- Limitations
- Example

Possible modes:
- Interactive
- Single-query
- Agentic
- Autonomous
- Semi-automatic
- Batch
- Background
- Local
- Cloud
- Offline
- Self-hosted
- Enterprise

---

## Architecture & Mechanisms

- System architecture
- Data flow
- Prompt processing
- Context construction
- AI models used
- Model routing
- RAG / Retrieval-augmented generation
- Indexing
- Embeddings
- Tool calling / Function calling
- Code execution
- Sandboxing
- Multi-step planning
- Memory / sessions
- Action approval logic
- Safety mechanisms
- Context limitations

---

## Tool Capabilities

For each capability, document:
- Capability name
- Description
- Scope
- Risk level
- Required permissions
- Control mechanism
- Example

Capabilities to check:
- File reading
- File editing
- Command execution
- Code execution
- Internet access
- Documentation search
- API usage
- External application actions
- Pull request creation
- Production data modification
- Sandbox availability
- Allowlist / denylist
- User consent requirements

---

## Agent Tool Primitives

Check the official tools reference page for the complete list of named tools the model can invoke. These are implementation-level primitives — distinct from user-facing features and often documented separately under a "tools reference" or "tool-use" page.

For each tool, document:

| Tool name | Description | Requires approval | Status / Notes |
|-----------|-------------|-------------------|----------------|
| `ToolName` | What it does | Yes / No | Stable / Deprecated / Preview / Restricted |

Additional fields to note where relevant:
- Availability restrictions (platform, plan, environment variable flag)
- Superseded-by (if deprecated)
- Permission rule syntax (exact format used in allowlists/denylists/hooks)

---

## Integrations

For each integration, document:
- Integration name
- Integration type (native, API, marketplace, MCP, etc.)
- What it enables
- Requirements
- Limitations

Categories:
- Native integrations
- API integrations
- Marketplace integrations
- Zapier / Make / n8n integrations
- MCP integrations
- IDE integrations
- File system integrations
- Git integrations
- Database integrations
- Messaging integrations
- Cloud platform integrations

---

## AI Models

| Field | Description |
|-------|-------------|
| Uses LLM | Yes / No |
| Models used | List of specific models |
| Models publicly disclosed | Yes / Partially / No |
| User model selection | Yes / No / Plan-dependent |
| Proprietary models | Yes / No |
| External models | List |
| Local models | Yes / No / Which |
| Multimodal models | Yes / No |
| Context window | Size(s) |
| Token limits | Input / Output limits |
| Latency | Typical response time |
| Processing region | Geographic location(s) |
| Training on user data | Policy details |

Information status: confirmed / partially confirmed / inferred / unknown

---

## Permissions & Security

- Required permissions
- Data access scope
- Local file access
- Repository access
- External system access
- Internet access
- Secrets access
- User roles
- RBAC
- SSO (SAML, OIDC)
- SCIM
- Audit logs
- Allowlist / denylist
- Approval flows
- Sandbox
- Data isolation
- Encryption (at rest, in transit)
- Data region
- Data retention
- Model training policy
- Certifications (SOC 2, ISO 27001, etc.)
- Regulatory compliance (GDPR, HIPAA, etc.)

---

## Privacy & Data Processing

- What data is transmitted
- Where data is processed
- Whether data is stored
- Retention period
- Training opt-out available
- Data deletion available
- Prompt logging
- Admin usage visibility
- Subprocessors
- Privacy policy URL
- DPA availability

---

## Limitations & Risks

For each risk/limitation, document:
- Name
- Description
- Likelihood (if applicable)
- Impact
- Risk level
- Mitigation

Categories:
- Functional limitations
- Technical limitations
- Legal limitations
- Security limitations
- Licensing limitations
- Organizational limitations
- Vendor lock-in risk
- Cost risk
- Quality risk
- Data risk
- Production risk
- Hallucination risk
- Incorrect action risk

---

## Alternatives

For each alternative, document:
- Alternative name
- Alternative type (direct, indirect, open-source, enterprise)
- Advantage of analyzed tool
- Advantage of alternative
- When to choose alternative

---

## Usage Examples

- Example prompts
- Example commands
- Example workflows
- Example configurations
- Example API calls
- Best practices
- Anti-patterns

For each example:
- Name
- Purpose
- Input
- Command / prompt
- Expected output
- Notes
- Source (official docs or own testing)

---

## Sources

List all official sources used:
- Official product page
- Documentation
- Pricing page
- Changelog
- Release notes
- Repository
- Vendor blog
- Status page
- Privacy policy
- Terms of service
- Security documentation
