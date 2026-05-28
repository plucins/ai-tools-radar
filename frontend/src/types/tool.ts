export interface Tool {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  logo?: string
  profilePath?: string
  content?: string
}

export interface ToolSummary {
  id: string
  name: string
  category: string
}
