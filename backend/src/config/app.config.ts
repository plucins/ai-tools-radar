import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
}));

export const ollamaConfig = registerAs('ollama', () => ({
  baseUrl: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
  model: process.env.OLLAMA_MODEL ?? 'llama3',
  apiKey: process.env.OLLAMA_API_KEY ?? '',
  timeoutMs: parseInt(process.env.OLLAMA_TIMEOUT_MS ?? '120000', 10),
  mode: process.env.LLM_MODE ?? 'mock',
}));
