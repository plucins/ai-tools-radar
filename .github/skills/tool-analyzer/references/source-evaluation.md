# Source Evaluation Criteria

Rules for determining whether a source is acceptable for use in tool profiles.

---

## Accepted Sources (in priority order)

| Priority | Source Type | Example |
|----------|------------|---------|
| 1 | Official changelogs | github.com/vendor/tool/releases |
| 2 | Official documentation | docs.vendor.com |
| 3 | Official pricing pages | vendor.com/pricing |
| 4 | Official repositories | github.com/vendor/tool |
| 5 | Official security policies | vendor.com/security |
| 6 | Official API references | api.vendor.com/docs |
| 7 | Official blog (technical content) | vendor.com/blog (factual posts only) |

---

## Rejected Sources

| Source Type | Reason |
|-------------|--------|
| Social media posts | Unverified, often speculative |
| Third-party comparison blogs | May contain bias or outdated info |
| Community forums | Anecdotal, not authoritative |
| Marketing landing pages (hype-only) | No technical substance |
| Unsourced articles | Cannot be verified |
| Analyst reports (Gartner, etc.) | Paywalled, may contain subjective ratings |
| YouTube videos | Cannot be precisely cited, may be outdated |
| Reddit/HackerNews comments | Anecdotal, unverified |

---

## Source Validation Rules

1. **URL must resolve** — Dead links are not valid sources
2. **Content must be current** — Check publication/update date
3. **Attribution must be clear** — Source must be identifiable as official vendor content
4. **Claims must be specific** — Vague marketing copy is not a valid source for technical claims
5. **Version must match** — Documentation for deprecated versions is not valid for current-state profiles (but valid for historical sections)

---

## Uncertainty Markers

When source quality is uncertain, use these markers in the profile:

| Marker | Meaning | Usage |
|--------|---------|-------|
| `[UNVERIFIED]` | Claim not yet confirmed against official sources | Use when information comes from a borderline source |
| `[NEEDS UPDATE]` | Section likely stale, requires re-check | Use when source is older than 6 months |
| `[ESTIMATED]` | Pricing or capability inferred, not officially confirmed | Use when exact data point is unavailable |
| `[NO OFFICIAL DATA]` | Official sources do not cover this topic | Use when a section has no backing source |
| `[CONFLICTING SOURCES]` | Multiple official sources disagree | Include both data points with citations |
