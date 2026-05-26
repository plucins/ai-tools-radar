import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { LlmService } from './llm.service';
import { LlmCompletionRequest } from './dto/llm.dto';

const makeConfigMock = (overrides: Record<string, unknown> = {}) => ({
  get: jest.fn((key: string) => {
    const defaults: Record<string, unknown> = {
      'ollama.mode': 'mock',
      'ollama.baseUrl': 'http://localhost:11434',
      'ollama.model': 'llama3',
      'ollama.apiKey': '',
      'ollama.timeoutMs': 120000,
      ...overrides,
    };
    return defaults[key];
  }),
});

const sampleRequest: LlmCompletionRequest = {
  messages: [{ role: 'user', content: 'Compare tools' }],
};

describe('LlmService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('mock mode', () => {
    let service: LlmService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          LlmService,
          {
            provide: ConfigService,
            useValue: makeConfigMock({ 'ollama.mode': 'mock' }),
          },
        ],
      }).compile();

      service = module.get<LlmService>(LlmService);
    });

    it('should return text with sections and toolSummaries keys but no comparedTools key when mode is mock (L-1)', async () => {
      // Arrange — mock mode; no additional setup required

      // Act
      const result = await service.complete(sampleRequest);

      // Assert
      const parsed = JSON.parse(result.text);
      expect(parsed).toHaveProperty('sections');
      expect(parsed).toHaveProperty('toolSummaries');
      expect(parsed).not.toHaveProperty('comparedTools');
    });

    it('should return a string text without throwing for any messages input when mode is mock (L-2)', async () => {
      // Arrange
      const request: LlmCompletionRequest = {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Any arbitrary input here' },
        ],
      };

      // Act
      const result = await service.complete(request);

      // Assert
      expect(typeof result.text).toBe('string');
    });
  });

  describe('ollama mode', () => {
    const BASE_URL = 'http://my-ollama-host:11434';
    const API_KEY = 'test-api-key-abc123';

    let service: LlmService;
    let serviceWithKey: LlmService;

    beforeEach(async () => {
      const moduleNoKey: TestingModule = await Test.createTestingModule({
        providers: [
          LlmService,
          {
            provide: ConfigService,
            useValue: makeConfigMock({
              'ollama.mode': 'ollama',
              'ollama.baseUrl': BASE_URL,
              'ollama.apiKey': '',
            }),
          },
        ],
      }).compile();
      service = moduleNoKey.get<LlmService>(LlmService);

      const moduleWithKey: TestingModule = await Test.createTestingModule({
        providers: [
          LlmService,
          {
            provide: ConfigService,
            useValue: makeConfigMock({
              'ollama.mode': 'ollama',
              'ollama.baseUrl': BASE_URL,
              'ollama.apiKey': API_KEY,
            }),
          },
        ],
      }).compile();
      serviceWithKey = moduleWithKey.get<LlmService>(LlmService);
    });

    it('should call axios.post with a URL containing the configured OLLAMA_BASE_URL when mode is ollama (L-3)', async () => {
      // Arrange
      const axiosSpy = jest.spyOn(axios, 'post').mockResolvedValue({
        data: {
          choices: [{ message: { content: 'ok' } }],
          model: 'llama3',
        },
      });

      // Act
      await service.complete(sampleRequest);

      // Assert
      expect(axiosSpy).toHaveBeenCalledTimes(1);
      const calledUrl = axiosSpy.mock.calls[0][0] as string;
      expect(calledUrl).toContain(BASE_URL);
    });

    it('should include Authorization Bearer header when OLLAMA_API_KEY is configured (L-4)', async () => {
      // Arrange
      const axiosSpy = jest.spyOn(axios, 'post').mockResolvedValue({
        data: {
          choices: [{ message: { content: 'ok' } }],
          model: 'llama3',
        },
      });

      // Act
      await serviceWithKey.complete(sampleRequest);

      // Assert
      expect(axiosSpy).toHaveBeenCalledTimes(1);
      const calledConfig = axiosSpy.mock.calls[0][2] as { headers: Record<string, string> };
      expect(calledConfig.headers['Authorization']).toBe(`Bearer ${API_KEY}`);
    });

    it('should reject with the same error when axios.post rejects in ollama mode (L-5)', async () => {
      // Arrange
      const networkError = new Error('Network Error');
      jest.spyOn(axios, 'post').mockRejectedValue(networkError);

      // Act & Assert
      await expect(service.complete(sampleRequest)).rejects.toThrow(networkError);
    });
  });
});
