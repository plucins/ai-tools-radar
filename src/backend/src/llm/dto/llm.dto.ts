export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LlmCompletionRequest {
  messages: ChatMessage[];
  model?: string;
}

export interface LlmCompletionResponse {
  text: string;
  model: string;
}
