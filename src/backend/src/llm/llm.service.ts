import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { LlmCompletionRequest, LlmCompletionResponse } from './dto/llm.dto';

interface OpenAIChatResponse {
  choices: Array<{ message: { content: string } }>;
  model: string;
}

interface OpenAIStreamChunk {
  choices: Array<{ delta: { content?: string } }>;
}

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);
  private readonly mode: string;
  private readonly baseUrl: string;
  private readonly model: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;
  private readonly FIXED_SEED = 999;
  private readonly FIXED_MAX_TOKENS = 10000;

  constructor(private readonly configService: ConfigService) {
    this.mode = this.configService.get<string>('ollama.mode') ?? 'mock';
    this.baseUrl =
      this.configService.get<string>('ollama.baseUrl') ??
      'http://localhost:11434';
    this.model = this.configService.get<string>('ollama.model') ?? 'llama3';
    this.apiKey = this.configService.get<string>('ollama.apiKey') ?? '';
    this.timeoutMs =
      this.configService.get<number>('ollama.timeoutMs') ?? 120000;
  }

  async complete(
    request: LlmCompletionRequest,
  ): Promise<LlmCompletionResponse> {
    if (this.mode === 'mock') {
      return this.mockComplete(request);
    }
    return this.chatComplete(request);
  }

  async *streamComplete(request: LlmCompletionRequest): AsyncGenerator<string> {
    if (this.mode === 'mock') {
      yield* this.mockStream();
      return;
    }
    yield* this.chatStream(request);
  }

  private mockComplete(request: LlmCompletionRequest): LlmCompletionResponse {
    this.logger.log('LLM mock mode: returning placeholder response');
    return {
      text: JSON.stringify({
        summary:
          'Mock comparison summary: both tools offer strong AI coding assistance with different workflow integrations.',
        recommendation:
          'Use tool-a for autonomous workflows; use tool-b for interactive pair-programming.',
        toolSummaries: [
          {
            toolId: 'tool-a',
            bestFor: 'Teams wanting autonomous multi-step coding agents.',
            notIdealFor: 'Developers who prefer tight inline suggestion UX.',
            keyDifferentiators: [
              'Agentic task execution',
              'MCP tool support',
              'Approval-based auto-run',
            ],
          },
          {
            toolId: 'tool-b',
            bestFor: 'Developers wanting deep codebase-aware completions.',
            notIdealFor: 'Teams requiring server-side enterprise controls.',
            keyDifferentiators: [
              'Codebase indexing',
              'Composer multi-file editing',
              'Claude backend',
            ],
          },
        ],
        sections: [
          {
            id: 'features',
            title: 'Core Features',
            summary: 'Both tools provide strong inline completion and chat.',
            features: [
              {
                name: 'Inline completion',
                description: 'Real-time code completion as you type.',
                values: [
                  {
                    toolId: 'tool-a',
                    available: true,
                    description: 'Provides inline completions via IDE plugin.',
                  },
                  {
                    toolId: 'tool-b',
                    available: true,
                    description:
                      'Ghost-text inline completions powered by Claude.',
                  },
                ],
              },
              {
                name: 'MCP support',
                description: 'Model Context Protocol tool integration.',
                values: [
                  {
                    toolId: 'tool-a',
                    available: true,
                    description:
                      'Full MCP server integration with approval flow.',
                  },
                  {
                    toolId: 'tool-b',
                    available: false,
                    description: 'Not supported.',
                  },
                ],
              },
            ],
          },
          {
            id: 'pricing',
            title: 'Pricing',
            summary:
              'Pricing models differ significantly between the two tools.',
            features: [
              {
                name: 'Free tier',
                description: 'Whether a free usage tier is available.',
                values: [
                  {
                    toolId: 'tool-a',
                    available: true,
                    description: 'Free tier available with limited requests.',
                  },
                  {
                    toolId: 'tool-b',
                    available: false,
                    description: 'Paid plans only starting at $20/month.',
                  },
                ],
              },
            ],
          },
          {
            id: 'integrations',
            title: 'Integrations',
            summary: 'Integration breadth varies across platforms.',
            features: [
              {
                name: 'VS Code support',
                description: 'Extension available for VS Code.',
                values: [
                  {
                    toolId: 'tool-a',
                    available: true,
                    description: 'VS Code extension available.',
                  },
                  {
                    toolId: 'tool-b',
                    available: true,
                    description: 'Native VS Code fork with deep integration.',
                  },
                ],
              },
            ],
          },
          {
            id: 'limitations',
            title: 'Limitations',
            summary:
              'Each tool has meaningful limitations for certain workflows.',
            features: [
              {
                name: 'Offline support',
                description: 'Ability to run without internet.',
                values: [
                  {
                    toolId: 'tool-a',
                    available: false,
                    description: 'Requires cloud connectivity.',
                  },
                  {
                    toolId: 'tool-b',
                    available: false,
                    description: 'Cloud-dependent; no offline mode.',
                  },
                ],
              },
            ],
          },
        ],
      }),
      model: request.model ?? this.model,
    };
  }

  private async *mockStream(): AsyncGenerator<string> {
    const fullText = this.mockComplete({ messages: [], model: undefined }).text;
    const chunkSize = 12;
    for (let i = 0; i < fullText.length; i += chunkSize) {
      yield fullText.slice(i, i + chunkSize);
      await new Promise<void>((r) => setTimeout(r, 18));
    }
  }

  private async chatComplete(
    request: LlmCompletionRequest,
  ): Promise<LlmCompletionResponse> {
    const model = request.model ?? this.model;
    const url = `${this.baseUrl}/v1/chat/completions`;

    this.logger.log(`Calling LLM at ${url} with model ${model}`);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const response = await axios.post<OpenAIChatResponse>(
      url,
      {
        model,
        messages: request.messages,
        seed: this.FIXED_SEED,
        max_tokens: this.FIXED_MAX_TOKENS,
        ...(request.temperature !== undefined && { temperature: request.temperature }),
        ...(request.top_p !== undefined && { top_p: request.top_p }),
        ...(request.frequency_penalty !== undefined && { frequency_penalty: request.frequency_penalty }),
        ...(request.presence_penalty !== undefined && { presence_penalty: request.presence_penalty }),
      },
      { headers, timeout: this.timeoutMs },
    );

    const content = response.data.choices[0]?.message?.content ?? '';
    return {
      text: content,
      model: response.data.model ?? model,
    };
  }

  private async *chatStream(
    request: LlmCompletionRequest,
  ): AsyncGenerator<string> {
    const model = request.model ?? this.model;
    const url = `${this.baseUrl}/v1/chat/completions`;

    this.logger.log(`Streaming LLM at ${url} with model ${model}`);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const response = await axios.post<NodeJS.ReadableStream>(
      url,
      {
        model,
        messages: request.messages,
        stream: true,
        seed: this.FIXED_SEED,
        max_tokens: this.FIXED_MAX_TOKENS,
        ...(request.temperature !== undefined && { temperature: request.temperature }),
        ...(request.top_p !== undefined && { top_p: request.top_p }),
        ...(request.frequency_penalty !== undefined && { frequency_penalty: request.frequency_penalty }),
        ...(request.presence_penalty !== undefined && { presence_penalty: request.presence_penalty }),
      },
      { headers, timeout: this.timeoutMs, responseType: 'stream' },
    );

    let buffer = '';
    for await (const raw of response.data) {
      buffer += (raw as Buffer).toString();
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') return;
        try {
          const parsed = JSON.parse(data) as OpenAIStreamChunk;
          const content = parsed.choices[0]?.delta?.content;
          if (content) yield content;
        } catch {
          // skip malformed SSE lines
        }
      }
    }
  }
}
