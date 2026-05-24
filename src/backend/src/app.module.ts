import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, ollamaConfig } from './config/app.config';
import { envValidationSchema } from './config/env.validation';
import { HealthModule } from './health/health.module';
import { ToolsModule } from './tools/tools.module';
import { ComparisonModule } from './comparison/comparison.module';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, ollamaConfig],
      validationSchema: envValidationSchema,
      validationOptions: { abortEarly: false },
    }),
    HealthModule,
    ToolsModule,
    ComparisonModule,
    LlmModule,
  ],
})
export class AppModule {}
