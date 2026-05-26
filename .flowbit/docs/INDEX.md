# AI Tools Radar — Documentation Index

> Managed by Flowbit. Edit individual standard files; do not hand-edit this index — it is regenerated automatically.

## Overview

This repository is a **full-stack monorepo** containing a NestJS backend and a React frontend.
The application lets users browse AI developer tool profiles, select tools, and generate LLM-powered
comparison reports using a locally-served Ollama model.

---

## Standards

### 🌐 Global
Core conventions that apply across the entire codebase.

| File | Description |
|---|---|
| [`standards/global/coding-standards.md`](standards/global/coding-standards.md) | TypeScript conventions, environment config, Git hygiene, error handling, naming, prohibited patterns |

---

### 🖥️ Frontend
React + Vite + Tailwind CSS standards.

| File | Description |
|---|---|
| [`standards/frontend/frontend-standards.md`](standards/frontend/frontend-standards.md) | Component structure (shadcn/ui-first rule), Tailwind CSS variable token system, glassmorphic dark UI aesthetic (color palette, corner radius, backgrounds, glow/shadow patterns, border conventions, CTA button pattern, nav item pattern, badge/status patterns), Framer Motion animation conventions, async state (normalize errors with instanceof check, dismissible Alert messages — always include an X close button), type safety, accessibility, performance |

---

### ⚙️ Backend
NestJS API and LLM integration standards.

| File | Description |
|---|---|
| [`standards/backend/backend-standards.md`](standards/backend/backend-standards.md) | Module structure, API design, LLM service abstraction, CORS, error handling, security |

---

### 🧪 Testing
Test philosophy, tooling, and coverage requirements.

| File | Description |
|---|---|
| [`standards/testing/testing-standards.md`](standards/testing/testing-standards.md) | Test types, naming (unit `.spec.ts` in `src/`, e2e in `test/`), AAA structure, mocking rules, CI requirements, LLM mock strategy |

---

### 🛠️ Tools
Standards for authoring and maintaining AI tool profiles.

| File | Description |
|---|---|
| [`standards/tools/tool-profile-standards.md`](standards/tools/tool-profile-standards.md) | Source attribution, community-sourced labelling, content style (workflow focus, append-only updates, evidence over assertion), directory structure |

---

## Project Documentation

Core documents describing the purpose, design, and technical choices of AI Tools Radar.

| File | Description |
|---|---|
| [`project/vision.md`](project/vision.md) | Problem statement, target users, key features, success criteria, and differentiators |
| [`project/tech-stack.md`](project/tech-stack.md) | All technology choices with versions and rationale — frontend, backend, LLM integration, tooling |
| [`project/architecture.md`](project/architecture.md) | System structure, C4 context diagram, data flows (catalog + comparison), API contract, configuration |

---

## Quick Reference

### Key environment variables

| Variable | Where | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | Frontend `.env` | Backend base URL |
| `LLM_MODE` | Backend `.env` | `mock` or `ollama` |
| `OLLAMA_BASE_URL` | Backend `.env` | Ollama server URL |
| `OLLAMA_MODEL` | Backend `.env` | Model identifier (e.g. `mistral:latest`) |
| `OLLAMA_TIMEOUT_MS` | Backend `.env` | Request timeout in milliseconds |
| `CORS_ORIGIN` | Backend `.env` | Allowed frontend origin |

### Directory layout

```
ai-tools-radar/
├── src/
│   ├── backend/          # NestJS application
│   └── frontend/         # React + Vite application
├── tools/                # Markdown AI tool profiles (data source)
│   └── cli/
├── docs/                 # Legacy / design docs
└── .flowbit/
    └── docs/
        ├── INDEX.md      # ← you are here
        ├── standards/
        │   ├── global/
        │   ├── frontend/
        │   ├── backend/
        │   ├── testing/
        │   └── tools/
        └── project/      # Generated project docs (pending)
```

---

*Last updated: 2025-07-14*
