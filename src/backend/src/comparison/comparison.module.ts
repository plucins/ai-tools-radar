import { Module } from '@nestjs/common';
import { ComparisonController } from './comparison.controller';
import { ComparisonService } from './comparison.service';
import { ToolsModule } from '../tools/tools.module';

@Module({
  imports: [ToolsModule],
  controllers: [ComparisonController],
  providers: [ComparisonService],
})
export class ComparisonModule {}
