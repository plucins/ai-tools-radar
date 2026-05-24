import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  LlmCompletionRequest,
  LlmCompletionResponse,
} from './dto/llm.dto';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);
  private readonly mode: string;
  private readonly baseUrl: string;
  private readonly model: string;
  private readonly timeoutMs: number;

  constructor(private readonly configService: ConfigService) {
    this.mode = this.configService.get<string>('ollama.mode') ?? 'mock';
    this.baseUrl =
      this.configService.get<string>('ollama.baseUrl') ??
      'http://localhost:11434';
    this.model =
      this.configService.get<string>('ollama.model') ?? 'llama3';
    this.timeoutMs =
      this.configService.get<number>('ollama.timeoutMs') ?? 120000;
  }

  async complete(
    request: LlmCompletionRequest,
  ): Promise<LlmCompletionResponse> {
    if (this.mode === 'mock') {
      return this.mockComplete(request);
    }
    return this.ollamaComplete(request);
  }

  private mockComplete(
    request: LlmCompletionRequest,
  ): LlmCompletionResponse {
    this.logger.log('LLM mock mode: returning placeholder response');
    return {
      text: `[MOCK] Response to: ${request.prompt.slice(0, 60)}...`,
      model: request.model ?? this.model,
    };
  }

  private async ollamaComplete(
    request: LlmCompletionRequest,
  ): Promise<LlmCompletionResponse> {
    const model = request.model ?? this.model;
    const url = `${this.baseUrl}/api/generate`;

    this.logger.log(`Calling Ollama at ${url} with model ${model}`);

    const response = await axios.post<{ response: string }>(
      url,
      { model, prompt: request.prompt, stream: false },
      { timeout: this.timeoutMs },
    );

    return {
      text: response.data.response,
      model,
    };
  }
}
