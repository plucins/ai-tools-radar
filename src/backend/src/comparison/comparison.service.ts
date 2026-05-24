import { Injectable } from '@nestjs/common';
import { CompareToolsDto } from './dto/compare-tools.dto';

export interface ComparisonResult {
  toolIds: string[];
  result: string;
}

@Injectable()
export class ComparisonService {
  compare(dto: CompareToolsDto): ComparisonResult {
    // Placeholder — real implementation delegates to LlmService
    return {
      toolIds: dto.toolIds,
      result: 'Comparison not yet implemented — LLM integration pending.',
    };
  }
}
