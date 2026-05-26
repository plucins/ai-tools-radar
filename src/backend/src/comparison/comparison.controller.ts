import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ComparisonService, ComparisonResult } from './comparison.service';
import { CompareToolsDto } from './dto/compare-tools.dto';

@Controller('comparison')
export class ComparisonController {
  constructor(private readonly comparisonService: ComparisonService) {}

  @Post()
  async compare(@Body() dto: CompareToolsDto): Promise<ComparisonResult> {
    return this.comparisonService.compare(dto);
  }

  @Post('stream')
  async compareStream(
    @Body() dto: CompareToolsDto,
    @Res() res: Response,
  ): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    try {
      for await (const event of this.comparisonService.compareStream(dto)) {
        res.write(`data: ${JSON.stringify(event)}\n\n`);
      }
    } catch (err) {
      res.write(
        `data: ${JSON.stringify({ type: 'error', message: err instanceof Error ? err.message : 'Comparison failed' })}\n\n`,
      );
    } finally {
      res.end();
    }
  }
}
