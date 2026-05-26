export class RadarToolPointDto {
  id!: string;
  name!: string;
  description!: string;
  x!: number;
  y!: number;
  ring!: 'core' | 'adopt' | 'trial' | 'watch';
  quadrant!: 'engineering' | 'research' | 'automation' | 'design';
  color!: string;
}

export class RadarRingDto {
  id!: 'core' | 'adopt' | 'trial' | 'watch';
  label!: string;
  radius!: number;
  color!: string;
  description!: string;
}

export class RadarQuadrantDto {
  id!: 'engineering' | 'research' | 'automation' | 'design';
  label!: string;
  startAngle!: number;
  endAngle!: number;
}

export class RadarResponseDto {
  tools!: RadarToolPointDto[];
  rings!: RadarRingDto[];
  quadrants!: RadarQuadrantDto[];
}
