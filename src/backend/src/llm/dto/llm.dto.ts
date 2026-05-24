export interface LlmCompletionRequest {
  prompt: string;
  model?: string;
}

export interface LlmCompletionResponse {
  text: string;
  model: string;
}
