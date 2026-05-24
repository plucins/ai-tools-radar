export interface Tool {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  profilePath?: string
}

export interface ToolSummary {
  id: string
  name: string
  category: string
}
