import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { RadarController } from './radar.controller';
import { RadarService } from './radar.service';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { RadarResponseDto } from './dto/radar-response.dto';

const mockRadarResponse: RadarResponseDto = {
  tools: [
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      description: 'AI pair programmer',
      x: 30.36,
      y: 32.36,
      ring: 'adopt',
      quadrant: 'engineering',
      color: '#22C55E',
    },
  ],
  rings: [
    { id: 'core', label: 'CORE', radius: 25, color: '#A855F7', description: 'Essential tools in daily use' },
    { id: 'adopt', label: 'ADOPT', radius: 50, color: '#22C55E', description: 'Ready for production use' },
    { id: 'trial', label: 'TRIAL', radius: 75, color: '#3B82F6', description: 'Worth exploring in projects' },
    { id: 'watch', label: 'WATCH', radius: 100, color: '#9CA3AF', description: 'Keep an eye on this space' },
  ],
  quadrants: [
    { id: 'engineering', label: 'Coding & Engineering', startAngle: 0, endAngle: 90 },
    { id: 'research', label: 'Research & Discovery', startAngle: 90, endAngle: 180 },
    { id: 'automation', label: 'Automation & Agents', startAngle: 180, endAngle: 270 },
    { id: 'design', label: 'Design & Creative', startAngle: 270, endAngle: 360 },
  ],
};

describe('RadarController', () => {
  let app: INestApplication;
  let radarService: jest.Mocked<Pick<RadarService, 'getRadarData'>>;

  beforeEach(async () => {
    const mockRadarService = {
      getRadarData: jest.fn().mockReturnValue(mockRadarResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadarController],
      providers: [{ provide: RadarService, useValue: mockRadarService }],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();

    radarService = module.get(RadarService);
  });

  afterEach(async () => {
    await app.close();
    jest.resetAllMocks();
  });

  it('GET /radar returns HTTP 200 with envelope shape { data: {...}, timestamp: string }', async () => {
    // Arrange — mocked service returns mockRadarResponse

    // Act
    const response = await request(app.getHttpServer()).get('/radar').expect(200);

    // Assert
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('timestamp');
    expect(typeof response.body.timestamp).toBe('string');
    expect(new Date(response.body.timestamp).toISOString()).toBe(response.body.timestamp);
    expect(response.body.data).toMatchObject({
      tools: expect.any(Array),
      rings: expect.any(Array),
      quadrants: expect.any(Array),
    });
  });

  it('GET /radar delegates to RadarService.getRadarData()', async () => {
    // Arrange — mocked service tracks calls

    // Act
    await request(app.getHttpServer()).get('/radar').expect(200);

    // Assert
    expect((radarService as jest.Mocked<RadarService>).getRadarData).toHaveBeenCalledTimes(1);
  });
});
