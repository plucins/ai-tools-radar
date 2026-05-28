import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ModelListResponse, OllamaTagsResponse } from './dto/model.dto';

@Injectable()
export class ModelsService {
  private readonly logger = new Logger(ModelsService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl =
      this.configService.get<string>('ollama.baseUrl') ??
      'http://localhost:11434';
    this.apiKey = this.configService.get<string>('ollama.apiKey') ?? '';
    this.timeoutMs =
      this.configService.get<number>('ollama.timeoutMs') ?? 120000;
  }

  async listModels(): Promise<ModelListResponse> {
    try {
      const ollamaResponse = await this.listFromOllamaTags();
      if ((ollamaResponse.data?.length ?? 0) > 0) {
        return ollamaResponse;
      }

      return await this.listFromOpenAiModels();
    } catch (err) {
      this.logger.error('Failed to fetch models from backend provider', err);
      throw new ServiceUnavailableException(
        'Unable to fetch models from Ollama/LLM provider',
      );
    }
  }

  private async listFromOllamaTags(): Promise<ModelListResponse> {
    const url = `${this.baseUrl}/api/tags`;
    this.logger.log(`Fetching models from ${url}`);

    try {
      const response = await axios.get<OllamaTagsResponse>(url, {
        timeout: this.timeoutMs,
      });

      return {
        object: 'list',
        data: (response.data.models ?? []).map((model) => ({
          id: model.name,
          object: 'model',
        })),
      };
    } catch (err) {
      this.logger.warn(
        `Could not fetch models from Ollama tags endpoint (${url}), trying OpenAI-compatible endpoint`,
      );
      return { object: 'list', data: [] };
    }
  }

  private async listFromOpenAiModels(): Promise<ModelListResponse> {
    const url = `${this.baseUrl}/models`;
    this.logger.log(`Fetching models from ${url}`);

    const response = await axios.get<ModelListResponse>(url, {
      params: {
        return_wildcard_routes: false,
        include_model_access_groups: false,
        only_model_access_groups: false,
        include_metadata: false,
      },
      headers: {
        accept: 'application/json',
        'x-litellm-api-key': this.apiKey,
      },
      timeout: this.timeoutMs,
    });

    return {
      object: response.data.object ?? 'list',
      data: response.data.data ?? [],
    };
  }
}
