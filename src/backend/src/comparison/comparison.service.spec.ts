import { Test, TestingModule } from '@nestjs/testing';
import { ComparisonService } from './comparison.service';
import { ToolsService } from '../tools/tools.service';
import { Tool } from '../tools/tools.service';
import { LlmService } from '../llm/llm.service';
import { PromptBuilderService } from './prompt.builder';

const TOOL_IDS = ['claude-code', 'github-copilot-cli'];

const makeToolMock = (id: string): Tool => ({
  id,
  name: id === 'claude-code' ? 'Claude Code' : 'GitHub Copilot CLI',
  description: 'A description',
  category: 'cli',
  tags: [],
});

const validLlmJson = (toolIds: string[]) =>
  JSON.stringify({
    summary: 'Test summary.',
    recommendation: 'Test recommendation.',
    toolSummaries: toolIds.map((id) => ({
      toolId: id,
      toolName: id,
      bestFor: 'something',
      notIdealFor: 'other',
      keyDifferentiators: [],
    })),
    sections: [
      {
        id: 'sec-1',
        title: 'Section 1',
        features: [
          {
            name: 'Feature A',
            values: toolIds.map((id) => ({
              toolId: id,
              available: true,
              description: 'yes',
            })),
          },
        ],
      },
    ],
  });

describe('ComparisonService', () => {
  let service: ComparisonService;
  let toolsService: jest.Mocked<Pick<ToolsService, 'findOne' | 'findAll'>>;
  let llmService: jest.Mocked<Pick<LlmService, 'complete'>>;
  let promptBuilder: jest.Mocked<Pick<PromptBuilderService, 'buildComparisonMessages'>>;

  beforeEach(async () => {
    const mockToolsService = {
      findOne: jest.fn(),
      findAll: jest.fn(),
    };

    const mockLlmService = {
      complete: jest.fn(),
    };

    const mockPromptBuilder = {
      buildComparisonMessages: jest.fn().mockReturnValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComparisonService,
        { provide: ToolsService, useValue: mockToolsService },
        { provide: LlmService, useValue: mockLlmService },
        { provide: PromptBuilderService, useValue: mockPromptBuilder },
      ],
    }).compile();

    service = module.get<ComparisonService>(ComparisonService);
    toolsService = module.get(ToolsService);
    llmService = module.get(LlmService);
    promptBuilder = module.get(PromptBuilderService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return result.tools equal to input toolIds when compare() is called', async () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation(makeToolMock);
    (llmService.complete as jest.Mock).mockResolvedValue({
      text: validLlmJson(TOOL_IDS),
      model: 'test-model',
    });
    const dto = { toolIds: TOOL_IDS };

    // Act
    const result = await service.compare(dto);

    // Assert
    expect(result.tools).toEqual(TOOL_IDS);
  });

  it('should set result.generatedAt as ISO 8601 string server-side when compare() is called', async () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation(makeToolMock);
    (llmService.complete as jest.Mock).mockResolvedValue({
      text: validLlmJson(TOOL_IDS),
      model: 'test-model',
    });

    // Act
    const result = await service.compare({ toolIds: TOOL_IDS });

    // Assert
    expect(typeof result.generatedAt).toBe('string');
    expect(new Date(result.generatedAt).toISOString()).toBe(result.generatedAt);
  });

  it('should return result.toolSummaries.length equal to toolIds.length when compare() is called', async () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation(makeToolMock);
    (llmService.complete as jest.Mock).mockResolvedValue({
      text: validLlmJson(TOOL_IDS),
      model: 'test-model',
    });

    // Act
    const result = await service.compare({ toolIds: TOOL_IDS });

    // Assert
    expect(result.toolSummaries.length).toBe(TOOL_IDS.length);
  });

  it('should return result.sections as [] when LLM returns malformed JSON', async () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation(makeToolMock);
    (llmService.complete as jest.Mock).mockResolvedValue({
      text: 'this is not json {{{',
      model: 'test-model',
    });

    // Act
    const result = await service.compare({ toolIds: TOOL_IDS });

    // Assert
    expect(result.sections).toEqual([]);
  });

  it('should not throw when LLM returns empty string', async () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation(makeToolMock);
    (llmService.complete as jest.Mock).mockResolvedValue({
      text: '',
      model: 'test-model',
    });

    // Act & Assert
    await expect(service.compare({ toolIds: TOOL_IDS })).resolves.not.toThrow();
  });

  it('should include all 4 static section IDs in result.sections when LLM returns valid JSON with 4 sections (N-2)', async () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation(makeToolMock);
    const staticSectionIds = ['features', 'pricing', 'integrations', 'limitations'];
    const llmJson = JSON.stringify({
      summary: 'Test summary.',
      recommendation: 'Test recommendation.',
      toolSummaries: TOOL_IDS.map((id) => ({
        toolId: id,
        toolName: id,
        bestFor: 'something',
        notIdealFor: 'other',
        keyDifferentiators: [],
      })),
      sections: staticSectionIds.map((sectionId) => ({
        id: sectionId,
        title: `Section ${sectionId}`,
        features: [
          {
            name: 'Feature A',
            values: TOOL_IDS.map((id) => ({
              toolId: id,
              available: true,
              description: 'yes',
            })),
          },
        ],
      })),
    });
    (llmService.complete as jest.Mock).mockResolvedValueOnce({
      text: llmJson,
      model: 'test-model',
    });

    // Act
    const result = await service.compare({ toolIds: TOOL_IDS });

    // Assert
    const sectionIds = result.sections.map((s) => s.id);
    expect(sectionIds).toContain('features');
    expect(sectionIds).toContain('pricing');
    expect(sectionIds).toContain('integrations');
    expect(sectionIds).toContain('limitations');
  });

  it('should set result.recommendation equal to LLM JSON value when compare() is called (N-5)', async () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation(makeToolMock);
    const customJson = JSON.stringify({
      summary: 'Some summary.',
      recommendation: 'Use tool-a for X.',
      toolSummaries: TOOL_IDS.map((id) => ({
        toolId: id,
        toolName: id,
        bestFor: '',
        notIdealFor: '',
        keyDifferentiators: [],
      })),
      sections: [],
    });
    (llmService.complete as jest.Mock).mockResolvedValueOnce({
      text: customJson,
      model: 'test-model',
    });

    // Act
    const result = await service.compare({ toolIds: TOOL_IDS });

    // Assert
    expect(result.recommendation).toBe('Use tool-a for X.');
  });

  it('should set result.summary equal to LLM JSON value when compare() is called (N-6)', async () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation(makeToolMock);
    const customJson = JSON.stringify({
      summary: 'Both tools are strong.',
      recommendation: 'Some recommendation.',
      toolSummaries: TOOL_IDS.map((id) => ({
        toolId: id,
        toolName: id,
        bestFor: '',
        notIdealFor: '',
        keyDifferentiators: [],
      })),
      sections: [],
    });
    (llmService.complete as jest.Mock).mockResolvedValueOnce({
      text: customJson,
      model: 'test-model',
    });

    // Act
    const result = await service.compare({ toolIds: TOOL_IDS });

    // Assert
    expect(result.summary).toBe('Both tools are strong.');
  });

  it('should use server-side toolId even when LLM injects a different toolId in toolSummaries (N-7)', async () => {
    // Arrange
    const REAL_ID = 'real-id';
    (toolsService.findOne as jest.Mock).mockReturnValue({
      id: REAL_ID,
      name: 'Real Tool',
      description: 'A description',
      category: 'cli',
      tags: [],
    });
    const injectedJson = JSON.stringify({
      summary: 'Some summary.',
      recommendation: 'Some recommendation.',
      toolSummaries: [
        {
          toolId: 'injected-bad-id',
          toolName: 'Injected Name',
          bestFor: '',
          notIdealFor: '',
          keyDifferentiators: [],
        },
      ],
      sections: [],
    });
    (llmService.complete as jest.Mock).mockResolvedValueOnce({
      text: injectedJson,
      model: 'test-model',
    });

    // Act
    const result = await service.compare({ toolIds: [REAL_ID] });

    // Assert
    expect(result.toolSummaries[0].toolId).toBe(REAL_ID);
  });

  it('should filter out phantom toolIds from feature values when LLM injects unknown toolId in values (N-8)', async () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation(makeToolMock);
    const phantomJson = JSON.stringify({
      summary: 'Test summary.',
      recommendation: 'Test recommendation.',
      toolSummaries: TOOL_IDS.map((id) => ({
        toolId: id,
        toolName: id,
        bestFor: '',
        notIdealFor: '',
        keyDifferentiators: [],
      })),
      sections: [
        {
          id: 'features',
          title: 'Features',
          features: [
            {
              name: 'Feature A',
              values: [
                ...TOOL_IDS.map((id) => ({
                  toolId: id,
                  available: true,
                  description: 'yes',
                })),
                {
                  toolId: 'phantom-tool',
                  available: true,
                  description: 'phantom entry',
                },
              ],
            },
          ],
        },
      ],
    });
    (llmService.complete as jest.Mock).mockResolvedValueOnce({
      text: phantomJson,
      model: 'test-model',
    });

    // Act
    const result = await service.compare({ toolIds: TOOL_IDS });

    // Assert
    const values = result.sections[0].features[0].values;
    expect(values.find((v) => v.toolId === 'phantom-tool')).toBeUndefined();
  });
});
