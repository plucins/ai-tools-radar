import { Controller, Post, Body } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { CompareToolsDto } from './dto/compare-tools.dto';

@Controller('comparison')
export class ComparisonController {
  constructor(private readonly comparisonService: ComparisonService) {}

  @Post()
  compare(@Body() dto: CompareToolsDto) {
    return this.comparisonService.compare(dto);
  }
}
