import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Res,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { ComparisonService, ComparisonResult } from './comparison.service';
import { ComparisonStorageService } from './comparison-storage.service';
import { CompareToolsDto } from './dto/compare-tools.dto';
import type { SavedComparisonMeta } from './dto/saved-comparison-meta.dto';

@Controller('comparison')
export class ComparisonController {
  private readonly logger = new Logger(ComparisonController.name);

  constructor(
    private readonly comparisonService: ComparisonService,
    private readonly storageService: ComparisonStorageService,
  ) {}

  @Post()
  async compare(@Body() dto: CompareToolsDto): Promise<ComparisonResult> {
    const result = await this.comparisonService.compare(dto);
    try {
      await this.storageService.save(result, dto.model ?? '');
    } catch (err) {
      this.logger.error('Failed to save comparison', err);
    }
    return result;
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

    let doneResult: ComparisonResult | undefined;
    try {
      for await (const event of this.comparisonService.compareStream(dto)) {
        res.write(`data: ${JSON.stringify(event)}\n\n`);
        if (event.type === 'done') doneResult = event.result;
      }
    } catch (err) {
      res.write(
        `data: ${JSON.stringify({ type: 'error', message: err instanceof Error ? err.message : 'Comparison failed' })}\n\n`,
      );
    }

    if (doneResult) {
      try {
        await this.storageService.save(doneResult, dto.model ?? '');
      } catch (err) {
        this.logger.error('Failed to save comparison', err);
      }
    }

    res.end();
  }

  @Get('history')
  async listHistory(): Promise<SavedComparisonMeta[]> {
    return this.storageService.findAll();
  }

  @Get('history/:id')
  async getHistory(@Param('id') id: string): Promise<ComparisonResult> {
    return this.storageService.findOne(id);
  }
}
