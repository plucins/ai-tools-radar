export interface ModelInfo {
  id: string;
  object: string;
  created?: number;
  owned_by?: string;
}

export interface ModelListResponse {
  object: string;
  data: ModelInfo[];
}

export interface OllamaTagModel {
  name: string;
  modified_at?: string;
}

export interface OllamaTagsResponse {
  models: OllamaTagModel[];
}
