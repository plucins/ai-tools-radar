# Tool Profile Standards

Standards for writing and maintaining AI tool profiles in `tools/<category>/<tool-name>.md`.

## Source Attribution

### Cite Official Sources Explicitly
When writing tool profiles, source claims from official documentation, product pages, and repositories. Include a `## Sources` section at the end of each profile listing every primary source used.
- **Evidence**: `tools/cli/claude-code.md`: "All information sourced from official Anthropic documentation and product pages"; `tools/cli/opencode.md`: "Full profile created from official documentation, GitHub repository, and product pages"
- **Confidence**: 86 (documentation)

### Label Community-Sourced Claims
When information is not from official documentation, label it explicitly as community-sourced and describe the supporting evidence. Do not present community-sourced claims at the same confidence level as official documentation.
- **Evidence**: `tools/cli/github-copilot-cli.md`: "### Built-in tool names (community-sourced)" — "They are not part of official documentation but are supported by reproducible user reports"
- **Example**:
  ```markdown
  ### Feature X (community-sourced)
  Not in official documentation. Supported by reproducible user reports across multiple sources.
  ```
- **Confidence**: 89 (documentation)

## Content Style

### Document Workflow Implications and Operational Impact
When describing a tool, prioritize how it affects developer workflow and what operational impact it has. Technical detail over marketing language.
- **Source**: `.github/copilot-instructions.md`: "When working on tool profiles (Markdown in `tools/`), prioritize: ... Workflow implications and operational impact"
- **Confidence**: 88 (documentation)

### Append-only Updates
When updating an existing tool profile, append new information or use dated sections. Do not silently replace previous assessments.
- **Source**: `.github/copilot-instructions.md`: "When updating a Markdown tool profile, append or extend — do not silently replace previous assessments. Use dated sections or changelog blocks to track changes over time."
- **Confidence**: 91 (documentation)

### Evidence Over Assertion
Describe what a tool does and how, not how impressive it is. No superlatives without evidence.
- **Source**: `.github/copilot-instructions.md`: "No superlatives without evidence. Describe what a tool *does* and *how*, not how impressive it is."
- **Confidence**: 91 (documentation)

## Directory Structure

Tool profiles are organized by category:
```
tools/
└── <category>/          # e.g. cli/, ide/, agent/
    └── <tool-name>.md   # one file per tool
```

Adding a new tool requires only creating a Markdown file in the correct category directory — no backend code changes.
