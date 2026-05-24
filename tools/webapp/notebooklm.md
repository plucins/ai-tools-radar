# NotebookLM

```yaml
name: "NotebookLM"
description: >
  NotebookLM is an AI-powered research and note-taking assistant developed by Google that grounds its responses exclusively in user-provided source documents. It supports uploading files, URLs, Google Drive content, and audio/video media, then enables chat, report generation, and multimedia output creation from those sources. It is available as a web application, mobile app, and as an embedded experience within Gemini Apps.
category: webapp
logo: https://img.logo.dev/notebooklm.google.com?token=pk_&format=png&theme=dark&retina=true&fallback=404
tags:
  - Enterprise
```

## Tool Identification

**Last update:** 24-05-2026 21:25

| Field | Description |
|-------|-------------|
| Name | NotebookLM |
| Alternative names | Project Tailwind (development codename); NotebookLM Plus (former paid-tier name, now superseded by plan-based naming) |
| Vendor / Organization | Google LLC |
| Product owner | Google Labs |
| Homepage | https://notebooklm.google.com |
| Documentation | https://support.google.com/notebooklm |
| Changelog | [NO OFFICIAL DATA] No public changelog page found in the support center |
| Repository | Not applicable — closed-source SaaS |
| First release date | [UNVERIFIED] Exact public launch date not stated in accessible official documentation (blog.google posts returned 404) |
| Current status | Generally Available (GA); mobile app described as "early version" |
| Current version | Not versioned publicly |
| Last updated | [UNVERIFIED] No public release notes page |

---

## Classification

- **Primary category:** AI-powered research and knowledge management web application
- **Secondary categories:** Document Q&A, multimedia content generation, study tool, enterprise knowledge base
- **Tool type:** SaaS (cloud-hosted, no self-hosted option)
- **Problem domain:** Research assistance, document comprehension, knowledge synthesis, content creation from sources
- **User interaction type:** Chat (web and mobile), Studio output generation (audio, video, visual artifacts)
- **Automation type:** Assistive (user-directed queries and output generation); Agentic for Deep Research feature only

---

## Summary

- **One-sentence description:** NotebookLM is a source-grounded AI assistant that lets users upload documents, media, and URLs and then query, summarize, and transform that content into various output formats.
- **Extended description:** Unlike general-purpose AI assistants, NotebookLM restricts its responses to user-provided sources; it does not draw on outside knowledge unless the Deep Research feature is explicitly invoked. Users organize content into notebooks, each containing up to 300–600 sources depending on plan, and can generate chat responses with inline citations, long-form reports, audio discussions, video presentations, mind maps, flashcards, infographics, and slide decks from those sources.
- **Core value proposition:** Grounded AI responses that cite specific passages from user-uploaded sources, reducing hallucination risk for in-context information retrieval.
- **Primary problem solved:** Synthesizing and extracting insight from large volumes of heterogeneous documents without leaving a single interface.
- **Key differentiator:** All chat and generated output is grounded exclusively in notebook sources (not general internet knowledge), with inline citations linking to exact source passages.
- **Target users:** Researchers, students, journalists, analysts, enterprise knowledge workers, educators.
- **Anti-target users:** Developers seeking API/programmatic integration; users requiring real-time web search as primary use case; users needing notebook-to-notebook cross-referencing.
- **Primary usage context:** Web browser at notebooklm.google.com; Android and iOS mobile apps.

---

## Use Cases

### Primary use cases
- **Document Q&A:** Chat with a collection of PDFs, Google Docs, web pages, or audio files to extract specific information with cited answers.
- **Research synthesis:** Combine multiple sources on a topic and generate briefing documents, study guides, or FAQs.
- **Audio learning:** Generate podcast-style Audio Overviews for passive consumption of source material.
- **Presentation creation:** Generate slide decks (Detailed or Presenter format) exportable as PDF or PPTX.
- **Study preparation:** Create flashcards and quizzes at configurable difficulty levels from source content.

### Secondary use cases
- **Visual summarization:** Generate mind maps and infographics from source material.
- **Data extraction:** Extract structured data from sources into Data Tables, exportable to Google Sheets.
- **Agentic deep research:** Use the Deep Research feature to auto-browse hundreds of web pages and generate multi-page research reports.
- **Shared knowledge bases:** Create shared notebooks for teams (enterprise use); view usage analytics for shared notebooks.

### Maturity level per use case
| Use Case | Status |
|----------|--------|
| Chat / Q&A | GA |
| Audio Overviews | GA |
| Interactive Audio Mode | Beta |
| Video Overviews (Explainer, Brief) | GA |
| Video Overviews (Cinematic) | GA (18+, English only) |
| Mind Maps | GA (web only) |
| Reports (FAQ, Study Guide, Briefing) | GA |
| Flashcards & Quizzes | GA |
| Infographics | GA (18+) |
| Slide Decks | GA (18+) |
| Deep Research | GA |
| Mobile app | Early version (per official docs) |

### Anti-patterns (when NOT to use)
- When cross-referencing multiple notebooks simultaneously is required (each notebook is independent).
- When programmatic or API-based integration is needed (no public API).
- When real-time or current-events web search is the primary need (Deep Research exists but is limited in daily quota).
- When copy-protected PDFs or paywalled web content must be used as sources.

---

## Features

### Core features

#### Notebook-Grounded Chat
- Responses generated exclusively from sources within the active notebook.
- Inline citations link responses to exact source passages.
- Notebook sharing does not change source limits for collaborators.
- Available on web and mobile.

#### Source Upload & Management
- Import sources from: Google Docs, Google Slides (≤100 slides), Google Sheets (≤100k tokens), PDFs, DOCX, TXT, MD, CSV, PPTX, ePub, web URLs, YouTube URLs (public + captioned), audio files, images, copied text, Gemini Chats.
- Per-source limit: 500,000 words or 200MB.
- Sources are a static snapshot; Google Drive sources require manual re-sync.
- Sources are private by default.

#### Audio Overviews
- Four formats: **Deep Dive** (two-host conversation), **The Brief** (single speaker, under 2 minutes), **The Critique** (constructive evaluation), **The Debate** (formal two-host debate).
- 80+ supported output languages.
- Customizable length (Shorter/Default/Longer — English only), custom steering prompt.
- Shareable via link, full notebook share, or downloadable audio file.
- **Interactive Mode (Beta):** User can ask questions mid-playback; hosts respond from sources, then resume. English only.

#### Reports
- Types: FAQ, Study Guide, Briefing Document, AI-suggested, custom user-defined.
- Exportable to Google Docs; embedded data tables exportable to Google Sheets.

#### Mind Maps
- Visual branching diagram of notebook topics.
- Interactive: zoom, expand/collapse branches, click nodes to trigger chat questions.
- Downloadable.
- Web only — not available in mobile app.

#### Flashcards & Quizzes
- Configurable difficulty (Easy/Medium/Hard) and quantity (Fewer/Standard/More).
- Progress tracking with "Got it!" / "Missed it!" marking.
- Flashcards downloadable as CSV.
- Custom steering prompts supported.

#### Notes
- User-written or AI-generated notes per notebook.
- Up to 1,000 notes per notebook.
- Exportable to Google Docs/Sheets.
- Deleted notes cannot be recovered.

### Advanced features

#### Video Overviews
- Three formats: **Cinematic** (rich immersive, 18+, English only), **Explainer** (structured comprehensive), **Brief** (bite-sized).
- Visual styles (18+): Classic, Whiteboard, Watercolor, Retro Print, Heritage, Paper-craft, Kawaii, Anime, Custom, Auto-select.
- 80+ languages (excluding Cinematic which is English only).
- Generation time: can exceed 30 minutes.
- Shareable via link or downloadable as video file.

#### Infographics
- Single-page visual summaries.
- Visual styles: Sketch Note, Kawaii, Professional, others; or auto-select.
- Orientation: Square, Portrait, Landscape.
- Detail level: Concise / Standard / Detailed (Detailed is Beta).
- Downloadable as PNG.
- 18+ restriction. Full customization on web only.

#### Slide Decks
- Two formats: **Detailed Deck** (full text), **Presenter Slides** (talking points).
- Configurable length: Short / Default / Long.
- Iterative slide-level revisions supported.
- Export: PDF or PPTX.
- Full-screen slideshow mode in-app.
- 18+ restriction.
- Watermark removal available on Ultra 20TB/30TB plans only.

#### Deep Research (Agentic)
- Automatically browses up to hundreds of websites, synthesizes findings, and creates multi-page reports.
- Uses the same Gemini Deep Research engine as Gemini Apps.
- Results imported as sources into the notebook.
- 18+ restriction.
- Quota: 10/month (Standard free), up to 200/day (Ultra 30TB).

#### Data Tables
- Structured data extracted from sources.
- Exportable to Google Sheets.
- Availability scales with plan (Limited → Highest).

#### Notebooks in Gemini Integration
- Notebooks created in NotebookLM automatically appear in Gemini's navigation.
- Notebooks can be viewed, edited, and chatted with from Gemini Apps.
- **Key distinction:** In NotebookLM, responses are grounded exclusively in notebook sources. In Gemini, responses combine notebook sources with web search and other tools.
- Studio artifacts (Audio/Video Overviews, Infographics, Slide Decks) are only available within NotebookLM, not via Gemini.

### Plan-restricted features

| Feature | Standard (Free) | Plus | Pro | Ultra 20TB | Ultra 30TB |
|---------|----------------|------|-----|-----------|-----------|
| Watermark removal (Infographics & Slides) | ❌ | ❌ | ❌ | ✅ | ✅ |
| Advanced Sharing | ❌ | ✅ | ✅ | ✅ | ✅ |
| Cinematic Video Overviews | ❌ | ❌ | 2/day | 10/day | 20/day |
| Earlier Feature Access | Standard | Early | Priority | Priority | Priority |

---

## Interfaces

- **Web application:** notebooklm.google.com — primary interface; full feature set available.
- **Android app:** Android 10+, available on Google Play Store. Package: `com.google.android.apps.labs.language.tailwind`. Described as "early version."
- **iOS app:** Available on App Store (iPhone and iPad). Described as "early version."
- **Gemini Apps integration:** Notebooks accessible within Gemini chat interface (limited to chat; no Studio artifacts).
- **API:** None. No public API or developer SDK documented.
- **Supported browsers:** [NO OFFICIAL DATA] Not explicitly listed; implied to be modern browsers supporting the web app.

### Mobile app feature gaps (features not available on mobile)
- Mind Maps
- Reports
- Data Tables
- Notes generation (AI-generated notes)
- Public/private notebook sharing
- Featured notebooks tab
- Chat configurations and analytics
- Source types: Google Drive import (Docs, Slides, Sheets), Images, ePub files are not supported on mobile
- Source types supported on mobile: PDF, Website, YouTube, Audio, Copied Text only

---

## Operating Modes

### Interactive (Chat)
- User submits a query; NotebookLM responds with a source-grounded answer and inline citations.
- Available on web and mobile.
- Session-based; chat history is not persistently stored by NotebookLM.

### Studio Output Generation
- User requests a specific output type (Audio Overview, Video Overview, Mind Map, Infographic, Slide Deck, Report, Flashcards, Quiz, Data Table).
- Asynchronous generation; some outputs (Video Overviews) can take more than 30 minutes.
- Outputs can be downloaded or shared.

### Agentic (Deep Research)
- User invokes Deep Research; the system autonomously browses hundreds of external websites, synthesizes findings, and returns results as notebook sources.
- Limited daily/monthly quota depending on plan.
- 18+ restriction.

### Shared Notebook / Collaborative
- Notebook owner shares with up to 50 users (personal accounts) or unlimited users/Google Groups (Workspace).
- Roles: Viewer (read-only) or Editor.
- Usage analytics available when shared with 4+ users and there is chat activity; metrics update ~every 24 hours.

---

## Architecture & Mechanisms

### AI Models
- NotebookLM uses **Gemini** models from Google. Official documentation does not disclose specific Gemini version numbers for NotebookLM.
- Plan tiers reference "Access to Gemini models" (Standard/Plus), "Higher access to Gemini models" (Pro), and "Highest access to Gemini models" (Ultra).
- Deep Research uses the same Gemini Deep Research engine as Gemini Apps.
- Audio and Video generation pipelines are not technically disclosed; specific TTS or video generation model names are not stated in official documentation.

### Source-Grounded Retrieval (RAG)
- All chat responses are grounded exclusively in the sources uploaded to the active notebook.
- Responses include inline citations linking to specific source passages.
- Sources are processed and indexed at upload time.
- Audio sources (and audio files) are transcribed at the time of upload.
- The system does not access external knowledge or the internet during a standard chat query (only during Deep Research).

### Cross-Notebook Access
- Each notebook is fully independent; NotebookLM cannot access information across multiple notebooks simultaneously.

### Context Construction
- Context is built from the active notebook's sources.
- Per-source limit: 500,000 words or 200MB.
- Google Sheets sources are capped at 100,000 tokens.
- Google Slides sources are capped at 100 slides.

### Memory / Sessions
- Chat history is session-scoped; not persistently stored by NotebookLM.
- Sources are persisted in the notebook until manually deleted.
- Notes persist indefinitely within the notebook (up to 1,000 notes/notebook).
- YouTube sources auto-deleted within 30 days if the source video is deleted or made private.

### Data Flow
- User uploads sources → sources are indexed and stored in the notebook.
- Chat queries are processed against the indexed notebook sources.
- Output generation (audio, video, reports, etc.) draws from indexed notebook content.
- Enterprise (Google Cloud) path: uploaded files remain within the user's GCP project; data regionalization is honored.

---

## Tool Capabilities

| Capability | Available | Scope | Notes |
|------------|-----------|-------|-------|
| File reading | ✅ | User-uploaded files only | PDF, DOCX, TXT, MD, CSV, PPTX, ePub, images, audio |
| Google Drive access | ✅ | Read-only | Google Docs, Slides, Sheets; static snapshot; manual sync only |
| Web URL scraping | ✅ | Text content only | Images, embedded video, paywalled content excluded |
| YouTube transcript import | ✅ | Public videos with captions only | 72-hour delay for newly uploaded videos |
| Audio transcription | ✅ | At upload time | 70+ languages |
| Image processing | ✅ | Static images as sources | avif, bmp, gif, heic, heif, ico, jp2, jpeg, jpg, png, tif, tiff, webp |
| Internet access (standard chat) | ❌ | — | No external web access during normal chat |
| Internet access (Deep Research) | ✅ | Agentic web browsing | Up to hundreds of websites; 18+ only; quota-limited |
| Export to Google Docs | ✅ | Reports, Notes | — |
| Export to Google Sheets | ✅ | Data Tables, Notes | — |
| Audio file output (download) | ✅ | Audio Overviews | — |
| Video file output (download) | ✅ | Video Overviews | — |
| PDF/PPTX export | ✅ | Slide Decks | — |
| CSV export | ✅ | Flashcards | — |
| PNG export | ✅ | Infographics | — |
| Code execution | ❌ | — | Not documented |
| Production data modification | ❌ | — | Read-only source imports |

---

## Integrations

### Native integrations
| Integration | Type | What it enables | Requirements | Limitations |
|-------------|------|----------------|--------------|-------------|
| Google Docs | Native source import | Add Docs as notebook sources | Google account; must have access to the Doc | Static snapshot; no automatic sync |
| Google Slides | Native source import | Add Slides as notebook sources | Google account | Up to 100 slides per source |
| Google Sheets | Native source import | Add Sheets as notebook sources | Google account | Up to 100,000 tokens per source |
| Google Drive (general) | Native source browsing | Browse and select files from Drive | Google account | Read-only; static import |
| Gemini Apps | Bidirectional | Notebooks appear in Gemini nav; chat with notebooks from Gemini | Google account | Studio artifacts (Audio/Video/Infographic/Slides) not available in Gemini |
| Google Docs (export) | Native export | Export reports and notes to Google Docs | Google account | — |
| Google Sheets (export) | Native export | Export data tables and notes to Google Sheets | Google account | — |
| Google Cloud (enterprise) | Enterprise platform | VPC-SC, IAM controls, data regionalization, GCP project isolation | Google Cloud account; NotebookLM for Enterprise license ($9/user/month) | — |
| Google Workspace | Organizational deployment | Admin-managed, core service integration, no training on Workspace data | Qualifying Workspace edition | Public notebook sharing disabled for Enterprise/Education |

---

## AI Models

| Field | Value |
|-------|-------|
| Uses LLM | Yes |
| Models used | Gemini (family); specific version numbers not publicly disclosed in NotebookLM documentation |
| Models publicly disclosed | Partially — family name (Gemini) confirmed; no version numbers stated |
| User model selection | No — model tier access scales with subscription plan |
| Proprietary models | Yes — Gemini (Google proprietary) |
| External models | No |
| Local models | No |
| Multimodal models | Yes — processes text, documents, audio, images, video transcripts |
| Context window | [UNVERIFIED] Not explicitly stated in NotebookLM documentation |
| Token limits | Per-source: up to 500,000 words or 200MB; Google Sheets: 100,000 tokens |
| Latency | Video Overviews: can exceed 30 minutes; other outputs: [NO OFFICIAL DATA] |
| Processing region | Personal accounts: [NO OFFICIAL DATA]; Enterprise (GCP): data regionalization honored within GCP project |
| Training on user data | Personal: Not used for training unless user provides thumbs feedback; Workspace: Never used for model training; Enterprise (GCP): Never reviewed or used for model training |

Information status: partially confirmed (model family confirmed; version numbers not disclosed)

---

## Permissions & Security

### Authentication
- Requires a Google Account (personal, Workspace, or Google Cloud).
- Workspace and Education accounts managed by organization administrator.
- Age verification required; certain features restricted to 18+ users.

### Data access scope
- User's uploaded files and imported Google Drive content.
- No access to other Google services or user data beyond what the user explicitly imports.

### Local file access
- User uploads files from their device; NotebookLM stores and processes them.
- No persistent access to local file system.

### Enterprise security features (Google Cloud path)
- **VPC Service Controls (VPC-SC):** Supported.
- **IAM controls:** Supported.
- **Data regionalization:** Honored within the user's GCP project.
- **No human review:** Uploaded files, chats, and model outputs not reviewed by human reviewers.
- **No model training:** Data not used to improve AI models.

### Workspace security features
- NotebookLM is a core Workspace service for qualifying editions.
- Data not used for model training (Workspace users).
- No human review of data when feedback is provided (Workspace users).
- Public sharing disabled for Enterprise and Education accounts.
- Google Groups supported for sharing (Workspace only).

### Data encryption
- [NO OFFICIAL DATA] NotebookLM-specific encryption documentation not found. Google's standard infrastructure encryption applies (implied but not explicitly documented in NotebookLM support pages).

### Certifications
- [NO OFFICIAL DATA] No NotebookLM-specific compliance certifications listed in accessible documentation. Google Cloud and Workspace carry broader certifications (SOC 2, ISO 27001, etc.) but applicability to NotebookLM specifically is not documented in NotebookLM help pages.

---

## Privacy & Data Processing

Source: https://support.google.com/notebooklm/answer/17004255

### Personal Google Account users
- Data is **not used to train NotebookLM unless the user provides feedback** (thumbs up/down).
- When feedback is provided:
  - Reviewed by specially trained teams.
  - Used consistent with the Google Privacy Policy to make NotebookLM safer.
  - **Retained for up to 3 years**, disconnected from the user's Google Account.
  - Includes Gemini chats added to notebook context, even if Gemini Apps Activity is turned off.

### Google Workspace users
- Uploads, queries, and model responses **not reviewed by human reviewers** even when feedback is provided.
- **Not used to train AI models.**

### Google Cloud / Enterprise users
- Uploaded files **remain within the user's GCP project.**
- Data regionalization honored.
- Files, chats, and model outputs **not reviewed by human reviewers and not used to improve generative AI models.**

### General data handling
- Sources are private by default unless explicitly shared.
- Google does not claim ownership over generated content.
- Chat Q&A history is not persistently stored by NotebookLM; can be cleared by user.
- Applicable Terms of Service varies by account type:
  - Personal: [Google Terms of Service](https://policies.google.com/terms)
  - Workspace: [Google Workspace ToS](https://workspace.google.com/terms/premier_terms/)
  - Education: [Google Workspace for Education ToS](https://workspace.google.com/terms/education_terms/)
  - Google Cloud: [Google Cloud Platform Terms](https://cloud.google.com/terms)

### Privacy policy
- https://policies.google.com/privacy (Google Privacy Policy, applies to personal accounts)
- Workspace and Cloud accounts governed by their respective terms.

---

## Limitations & Risks

### Functional limitations

| Limitation | Detail |
|------------|--------|
| No cross-notebook access | Each notebook is independent; content cannot be queried across multiple notebooks simultaneously |
| No notebook duplication | Officially documented as not yet supported |
| No note recovery | Deleted notes cannot be recovered (no undo/restore) |
| No automatic source sync | Google Drive sources require manual re-sync; other source types require delete + re-upload |
| No footnotes/comments import | Footnotes and comments in Google Docs/Slides are not imported |
| No paywalled web content | Web URL import does not access paywalled pages |
| No copy-protected PDF import | Copy-protected PDFs cannot be imported |
| YouTube: 72-hour upload delay | Videos uploaded less than 72 hours prior may not be importable |
| YouTube: captions required | Only public videos with auto or user-uploaded captions supported |
| Audio without speech | Audio files containing no speech are not supported |
| Cinematic Video: English only | Cinematic Video Overview format supports only English narration |
| Interactive Audio Mode: English only | The interactive mid-playback question feature is English only |
| Web URL: text only | Images embedded in web pages are not imported; only text is scraped |
| Mobile feature gaps | Mind maps, reports, data tables, notes generation, sharing, full source type range not available on mobile app |
| Public sharing (consumer only) | Public notebook sharing is disabled for Workspace Enterprise and Education accounts |
| Image extraction from web | Images embedded in web pages excluded from URL imports |

### Technical limitations
| Limitation | Detail |
|------------|--------|
| Source size cap | 500,000 words or 200MB per source |
| Google Sheets token cap | 100,000 tokens per Google Sheets source |
| Google Slides slide cap | 100 slides per Google Slides source |
| Notes per notebook cap | 1,000 notes per notebook |
| Notebook cap (free tier) | 100 notebooks per user |
| Chat history | Not persistently stored; session-scoped only |
| No API | No public API or SDK for programmatic integration |
| Video generation latency | Can exceed 30 minutes |

### Data risks
| Risk | Detail |
|------|--------|
| Feedback data retention | Personal account users who provide feedback: data retained up to 3 years disconnected from account; reviewed by humans |
| Gemini chat data in context | If Gemini chats are added as sources, these are included in the feedback data scope even if Gemini Apps Activity is turned off |

### Hallucination risk
- NotebookLM is designed to reduce hallucination by grounding responses in uploaded sources. However, AI-generated outputs (reports, summaries, overviews) may contain errors, misinterpretations, or omissions not caught by the grounding mechanism. Official documentation does not quantify hallucination rates.

---

## Alternatives

| Alternative | Type | Advantage of NotebookLM | Advantage of Alternative | When to choose alternative |
|-------------|------|------------------------|--------------------------|---------------------------|
| Google Gemini (standard) | Indirect — general AI assistant | Source-grounded responses with inline citations | Broader knowledge base; real-time web search; no source upload required | When general-purpose Q&A or current-events queries are needed |
| Microsoft Copilot (in Microsoft 365) | Indirect — enterprise productivity AI | Grounded Q&A; audio/video output; enterprise Workspace integration | Deep Office app integration (Word, Excel, Outlook, Teams); SharePoint source access | When primary workflow is in Microsoft 365 |
| Perplexity AI | Indirect — research assistant | Source-only grounding; richer multimedia outputs (audio, video, slides) | Real-time web search as primary mechanism; broader internet coverage | When live web research and current information retrieval is the core need |
| OpenAI ChatGPT (with file upload) | Indirect — general AI with document Q&A | Structured notebook organization; dedicated source management; audio/video studio outputs | More flexible general reasoning; DALL-E image generation; broader plugin ecosystem | When ad-hoc multi-modal generation or code execution is needed |
| Illumina / Elicit | Indirect — academic research | Broader media support (audio, video); enterprise integration | Specialized for scientific literature; structured extraction from research papers | When the primary use case is academic paper analysis |
| Obsidian + AI plugins | Indirect — local knowledge management | No setup required; hosted SaaS | Local-first; full programmatic access; open plugin ecosystem | When data residency, offline access, or custom automation is required |

---

## Sources

| Source | URL |
|--------|-----|
| NotebookLM Help Center — Overview | https://support.google.com/notebooklm/answer/16164461 |
| NotebookLM Help Center — Plans, pricing & limits | https://support.google.com/notebooklm/answer/16213268 |
| NotebookLM Help Center — Add or discover sources | https://support.google.com/notebooklm/answer/16215270 |
| NotebookLM Help Center — Audio Overviews | https://support.google.com/notebooklm/answer/16212820 |
| NotebookLM Help Center — Video Overviews | https://support.google.com/notebooklm/answer/16454555 |
| NotebookLM Help Center — Mind Maps | https://support.google.com/notebooklm/answer/16212283 |
| NotebookLM Help Center — Notes | https://support.google.com/notebooklm/answer/16262519 |
| NotebookLM Help Center — Chat | https://support.google.com/notebooklm/answer/16179559 |
| NotebookLM Help Center — Create a Notebook & outputs | https://support.google.com/notebooklm/answer/16206563 |
| NotebookLM Help Center — FAQs | https://support.google.com/notebooklm/answer/16269187 |
| NotebookLM Help Center — Privacy and Terms | https://support.google.com/notebooklm/answer/17004255 |
| NotebookLM Help Center — Work/School Accounts (Workspace) | https://support.google.com/notebooklm/answer/16337734 |
| NotebookLM Help Center — Mobile App | https://support.google.com/notebooklm/answer/16296687 |
| NotebookLM Help Center — Flashcards & Quizzes | https://support.google.com/notebooklm/answer/16958963 |
| NotebookLM Help Center — Infographics | https://support.google.com/notebooklm/answer/16758265 |
| NotebookLM Help Center — Slide Decks | https://support.google.com/notebooklm/answer/16757456 |
| NotebookLM Help Center — Notebooks in Gemini | https://support.google.com/notebooklm/answer/17003757 |
| NotebookLM Help Center — Output Language | https://support.google.com/notebooklm/answer/16261963 |
| NotebookLM Help Center — Public/Featured Notebooks | https://support.google.com/notebooklm/answer/16322204 |
| Google Cloud — NotebookLM for Enterprise | https://cloud.google.com/resources/notebooklm-enterprise |
| Google Workspace — NotebookLM product page | https://workspace.google.com/products/notebooklm/ |
| Google One — AI Plus info | https://support.google.com/googleone/answer/16548195 |
| Google One — AI Pro info | https://support.google.com/googleone/answer/16476811 |
| Google Privacy Policy | https://policies.google.com/privacy |
| Google Terms of Service | https://policies.google.com/terms |
| Google Workspace Terms | https://workspace.google.com/terms/premier_terms/ |
| Google Cloud Terms | https://cloud.google.com/terms |
