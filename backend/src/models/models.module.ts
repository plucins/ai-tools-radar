import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';

@Module({
  imports: [ConfigModule],
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
