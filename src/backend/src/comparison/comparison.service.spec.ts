import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { ToolsService } from '../tools/tools.service';
import { Tool } from '../tools/tools.service';

describe('ComparisonService', () => {
  let service: ComparisonService;
  let toolsService: jest.Mocked<Pick<ToolsService, 'findOne' | 'findAll'>>;

  beforeEach(async () => {
    const mockToolsService = {
      findOne: jest.fn(),
      findAll: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn().mockReturnValue('mock'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComparisonService,
        { provide: ToolsService, useValue: mockToolsService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<ComparisonService>(ComparisonService);
    toolsService = module.get(ToolsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('compare() returns result with tools matching input toolIds', () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation((id: string): Tool => ({
      id,
      name: id === 'claude-code' ? 'Claude Code' : 'GitHub Copilot CLI',
      description: 'A description',
      category: 'cli',
      tags: [],
    }));
    const dto = { toolIds: ['claude-code', 'github-copilot-cli'] };

    // Act
    const result = service.compare(dto);

    // Assert
    expect(result.tools).toEqual(['claude-code', 'github-copilot-cli']);
  });

  it('compare() returns generatedAt as valid ISO 8601 string', () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation((id: string): Tool => ({
      id,
      name: 'Tool',
      description: 'A description',
      category: 'cli',
      tags: [],
    }));

    // Act
    const result = service.compare({ toolIds: ['claude-code', 'github-copilot-cli'] });

    // Assert
    expect(typeof result.generatedAt).toBe('string');
    expect(new Date(result.generatedAt).toISOString()).toBe(result.generatedAt);
  });

  it('compare() mock summary contains tool names', () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation((id: string): Tool => ({
      id,
      name: id === 'claude-code' ? 'Claude Code' : 'GitHub Copilot CLI',
      description: 'A description',
      category: 'cli',
      tags: [],
    }));

    // Act
    const result = service.compare({ toolIds: ['claude-code', 'github-copilot-cli'] });

    // Assert
    expect(result.summary).toContain('Claude Code');
    expect(result.summary).toContain('GitHub Copilot CLI');
  });

  it('compare() falls back to tool id as name when NotFoundException is thrown (lines 28-31)', () => {
    // Arrange — findOne throws NotFoundException for every id
    (toolsService.findOne as jest.Mock).mockImplementation((id: string) => {
      throw new NotFoundException(`Tool with id "${id}" not found`);
    });
    const dto = { toolIds: ['unknown-alpha', 'unknown-beta'] };

    // Act
    const result = service.compare(dto);

    // Assert — raw ids appear in summary as fallback names
    expect(result.summary).toContain('unknown-alpha');
    expect(result.summary).toContain('unknown-beta');
    expect(result.tools).toEqual(['unknown-alpha', 'unknown-beta']);
  });

  it('compare() summary uses "and N more" format for more than 2 tools (lines 48-49)', () => {
    // Arrange
    (toolsService.findOne as jest.Mock).mockImplementation((id: string): Tool => ({
      id,
      name: `Tool ${id}`,
      description: 'A description',
      category: 'cli',
      tags: [],
    }));
    const dto = { toolIds: ['a', 'b', 'c'] };

    // Act
    const result = service.compare(dto);

    // Assert — three tools triggers the >2 branch in buildMockSummary
    expect(result.summary).toContain('Tool a vs Tool b');
    expect(result.summary).toContain('and 1 more');
  });
});
