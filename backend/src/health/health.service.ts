import { Injectable } from '@nestjs/common';
import { HealthStatus } from './dto/health-status.dto';

@Injectable()
export class HealthService {
  getStatus(): HealthStatus {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
