import { Controller, Get } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelListResponse } from './dto/model.dto';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  async list(): Promise<ModelListResponse> {
    return this.modelsService.listModels();
  }
}
