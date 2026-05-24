export interface ComparisonRequest {
  toolIds: string[]
}

export interface ComparisonResult {
  tools: string[]
  summary: string
  generatedAt: string
}
