/**
 * Request body for POST /comparison.
 */
export interface ComparisonRequest {
  toolIds: string[]
  model?: string
}

/**
 * Per-tool support status for a single feature row.
 */
export interface FeatureValue {
  toolId: string
  available: boolean
  description: string
}

/**
 * A single feature row in the comparison grid.
 */
export interface FeatureRow {
  name: string
  description?: string
  values: FeatureValue[]
}

/**
 * One tab section in the comparison result.
 * Static section IDs: "features" | "pricing" | "integrations" | "limitations".
 */
export interface ComparisonSection {
  id: string
  title: string
  summary?: string
  features: FeatureRow[]
}

/**
 * Prose summary card for a single compared tool.
 */
export interface ToolSummary {
  toolId: string
  toolName: string
  bestFor: string
  notIdealFor: string
  keyDifferentiators: string[]
}

/**
 * The full comparison result returned by POST /comparison.
 */
export interface ComparisonResult {
  tools: string[]
  summary: string
  recommendation: string
  generatedAt: string
  toolSummaries: ToolSummary[]
  sections: ComparisonSection[]
}

/**
 * A single SSE event from the streaming comparison endpoint.
 */
export type ComparisonStreamEvent =
  | { type: 'token'; text: string }
  | { type: 'done'; result: ComparisonResult }
  | { type: 'error'; message: string }
