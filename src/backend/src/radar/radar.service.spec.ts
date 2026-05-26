import { RadarService } from './radar.service';

describe('RadarService', () => {
  let service: RadarService;

  beforeEach(() => {
    service = new RadarService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getRadarData()', () => {
    it('returns an object with tools, rings, and quadrants arrays', () => {
      // Arrange — service is already constructed

      // Act
      const result = service.getRadarData();

      // Assert
      expect(Array.isArray(result.tools)).toBe(true);
      expect(Array.isArray(result.rings)).toBe(true);
      expect(Array.isArray(result.quadrants)).toBe(true);
    });

    it('returns exactly 4 rings with radii [25, 50, 75, 100]', () => {
      // Arrange — service is already constructed

      // Act
      const result = service.getRadarData();

      // Assert
      expect(result.rings).toHaveLength(4);
      const radii = result.rings.map((r) => r.radius).sort((a, b) => a - b);
      expect(radii).toEqual([25, 50, 75, 100]);
    });

    it('returns exactly 4 quadrants with non-overlapping angle ranges', () => {
      // Arrange — service is already constructed

      // Act
      const result = service.getRadarData();

      // Assert
      expect(result.quadrants).toHaveLength(4);
      for (let i = 0; i < result.quadrants.length; i++) {
        for (let j = i + 1; j < result.quadrants.length; j++) {
          const a = result.quadrants[i];
          const b = result.quadrants[j];
          const aStart = Math.min(a.startAngle, a.endAngle);
          const aEnd = Math.max(a.startAngle, a.endAngle);
          const bStart = Math.min(b.startAngle, b.endAngle);
          const bEnd = Math.max(b.startAngle, b.endAngle);
          const overlaps = aStart < bEnd && bStart < aEnd;
          expect(overlaps).toBe(false);
        }
      }
    });

    it('returns all tool coordinate values within −100 to +100 on both x and y', () => {
      // Arrange — service is already constructed

      // Act
      const result = service.getRadarData();

      // Assert
      expect(result.tools.length).toBeGreaterThanOrEqual(12);
      expect(result.tools.length).toBeLessThanOrEqual(20);
      for (const tool of result.tools) {
        expect(tool.x).toBeGreaterThanOrEqual(-100);
        expect(tool.x).toBeLessThanOrEqual(100);
        expect(tool.y).toBeGreaterThanOrEqual(-100);
        expect(tool.y).toBeLessThanOrEqual(100);
      }
    });

    it('returns tools with valid slug ids (lowercase, hyphen-separated)', () => {
      // Arrange — service is already constructed

      // Act
      const result = service.getRadarData();

      // Assert
      const slugRegex = /^[a-z][a-z0-9-]*$/;
      for (const tool of result.tools) {
        expect(tool.id).toMatch(slugRegex);
      }
    });

    it('places each tool within its ring radius (Euclidean distance)', () => {
      // Arrange — service is already constructed

      // Act
      const result = service.getRadarData();

      // Build a lookup map: ring id → radius
      const ringRadius = new Map<string, number>(
        result.rings.map((r) => [r.id, r.radius]),
      );

      // Assert: Euclidean distance from origin must not exceed the ring radius.
      // Diagonal jitter magnitude is √(8²+8²) ≈ 11.3 — axis-aligned bounds alone
      // are insufficient; only a radial check catches overflow into neighbouring rings.
      for (const tool of result.tools) {
        const radius = ringRadius.get(tool.ring);
        expect(radius).toBeDefined();
        const dist = Math.sqrt(tool.x ** 2 + tool.y ** 2);
        expect(dist).toBeLessThanOrEqual(radius! + 0.01); // 0.01 for float rounding
        expect(dist).toBeGreaterThan(0);
      }
    });
  });
});
