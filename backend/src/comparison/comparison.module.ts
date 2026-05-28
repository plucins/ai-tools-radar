import { Module } from '@nestjs/common';
import { ComparisonController } from './comparison.controller';
import { ComparisonService } from './comparison.service';
import { ComparisonStorageService } from './comparison-storage.service';
import { ToolsModule } from '../tools/tools.module';
import { LlmModule } from '../llm/llm.module';
import { PromptBuilderService } from './prompt.builder';

@Module({
  imports: [ToolsModule, LlmModule],
  controllers: [ComparisonController],
  providers: [
    ComparisonService,
    ComparisonStorageService,
    PromptBuilderService,
  ],
})
export class ComparisonModule {}
