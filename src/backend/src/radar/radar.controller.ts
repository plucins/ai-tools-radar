import { Controller, Get } from '@nestjs/common';
import { RadarService } from './radar.service';

@Controller('radar')
export class RadarController {
  constructor(private readonly radarService: RadarService) {}

  @Get()
  getRadarData() {
    return this.radarService.getRadarData();
  }
}
