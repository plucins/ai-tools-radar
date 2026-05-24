import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompareToolsDto } from './dto/compare-tools.dto';
import { ToolsService } from '../tools/tools.service';

export interface ComparisonResult {
  tools: string[];
  summary: string;
  generatedAt: string;
}

@Injectable()
export class ComparisonService {
  private readonly mode: string;

  constructor(
    private readonly toolsService: ToolsService,
    private readonly configService: ConfigService,
  ) {
    this.mode = this.configService.get<string>('ollama.mode') ?? 'mock';
  }

  compare(dto: CompareToolsDto): ComparisonResult {
    const toolNames = dto.toolIds.map((id) => {
      try {
        return this.toolsService.findOne(id).name;
      } catch (err) {
        if (err instanceof NotFoundException) {
          return id;
        }
        throw err;
      }
    });

    const summary = this.buildMockSummary(toolNames);

    return {
      tools: dto.toolIds,
      summary,
      generatedAt: new Date().toISOString(),
    };
  }

  private buildMockSummary(toolNames: string[]): string {
    if (toolNames.length <= 2) {
      return `Mock comparison of ${toolNames.join(' vs ')}. [Mock mode — LLM not running.]`;
    }
    const [first, second, ...rest] = toolNames;
    return `Mock comparison of ${first} vs ${second} (and ${rest.length} more). [Mock mode — LLM not running.]`;
  }
}
