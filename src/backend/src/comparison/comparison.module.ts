import { Module } from '@nestjs/common';
import { ComparisonController } from './comparison.controller';
import { ComparisonService } from './comparison.service';
import { ToolsModule } from '../tools/tools.module';
import { LlmModule } from '../llm/llm.module';
import { PromptBuilderService } from './prompt.builder';

@Module({
  imports: [ToolsModule, LlmModule],
  controllers: [ComparisonController],
  providers: [ComparisonService, PromptBuilderService],
})
export class ComparisonModule {}
