# Project Vision

## Pitch

AI Tools Radar is a full-stack web application that helps developers and engineering managers discover and compare AI developer tools by providing structured, LLM-generated analyses based on curated Markdown profiles.

## Problem Statement

The AI developer tooling landscape is evolving rapidly. New coding assistants, CLI agents, and IDE integrations emerge constantly, each with different strengths, workflows, and pricing models. Developers and engineering managers struggle to objectively evaluate and compare these tools — vendor marketing is noisy, and hands-on evaluation takes significant time.

AI Tools Radar solves this by maintaining a curated catalog of tool profiles (backed by evidence-based Markdown files) and enabling on-demand, structured comparisons powered by a local LLM — keeping data private and inference free.

## Target Users

**Developers** who want to:
- Quickly understand the tradeoffs between AI coding tools before adopting one
- Get a structured breakdown of tool capabilities without reading marketing pages
- Compare tools across dimensions relevant to their workflow (CLI, IDE integration, context window, offline support, etc.)

**Engineering Managers** who want to:
- Make informed tool adoption decisions for their teams
- Understand cost/capability tradeoffs across tools
- Track the evolving AI tooling landscape without spending hours on research

## Key Features

- **Tool Catalog** — Browse AI developer tools organized by category (`cli/`, `ide/`, `agent/`, etc.), each backed by a structured Markdown profile
- **Multi-Tool Comparison** — Select 2+ tools and trigger a structured LLM-generated comparison
- **Local LLM Analysis** — Comparisons run via Ollama (local model server) — no data leaves your machine
- **Mock Mode** — Development and evaluation work without Ollama installed (`LLM_MODE=mock`)
- **Extensible Data Model** — Add new tools by dropping a Markdown file in the correct category directory

## Success Criteria

- A developer can browse the tool catalog, select tools, and receive a useful comparison in under 30 seconds
- Adding a new tool requires only creating a Markdown profile — no backend code changes
- The comparison output is structured, evidence-based, and meaningfully different from marketing copy
- The application runs fully locally — no cloud dependencies for core functionality

## Differentiators

- **Local-first**: Comparisons run on Ollama — no API keys, no data sent to third parties
- **Markdown-driven data**: Tool profiles are version-controlled, human-readable, and easy to extend
- **Evidence-based**: Profiles follow a structured format that prioritizes technical detail over marketing language
- **Developer-owned**: Self-hosted, no SaaS lock-in

---
*Created: 2026-05-24*
