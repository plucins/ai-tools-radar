import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ComparisonStorageService } from './comparison-storage.service';
import type { ComparisonResult } from './comparison.service';

jest.mock('fs/promises');

const mockFs = jest.mocked(fs);

const STORAGE_DIR = '/tmp/test-comparisons';

const makeResult = (
  overrides: Partial<ComparisonResult> = {},
): ComparisonResult => ({
  tools: ['tool-a', 'tool-b'],
  summary: 'A test summary',
  recommendation: 'Use tool-a',
  generatedAt: '2024-01-15T10:30:00.000Z',
  toolSummaries: [],
  sections: [],
  ...overrides,
});

describe('ComparisonStorageService', () => {
  let service: ComparisonStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComparisonStorageService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(STORAGE_DIR),
          },
        },
      ],
    }).compile();

    service = module.get<ComparisonStorageService>(ComparisonStorageService);
    jest.resetAllMocks();
  });

  describe('onModuleInit', () => {
    it('should create the storage directory', async () => {
      mockFs.mkdir.mockResolvedValue(undefined);

      await service.onModuleInit();

      expect(mockFs.mkdir).toHaveBeenCalledWith(path.resolve(STORAGE_DIR), {
        recursive: true,
      });
    });
  });

  describe('save', () => {
    it('should write the result as JSON and return an ID', async () => {
      mockFs.writeFile.mockResolvedValue(undefined);
      const result = makeResult();

      const id = await service.save(result, 'mistral');

      expect(mockFs.writeFile).toHaveBeenCalledTimes(1);
      const [filePath, content, options] = mockFs.writeFile.mock.calls[0] as [
        string,
        string,
        object,
      ];
      expect(filePath).toMatch(/tool-a-tool-b--mistral--\d{8}-\d{9}\.json$/);
      expect(JSON.parse(content)).toMatchObject({ summary: 'A test summary' });
      expect(options).toEqual({ flag: 'wx' });
      expect(id).not.toContain('.json');
    });

    it('should slugify tool IDs and model name', async () => {
      mockFs.writeFile.mockResolvedValue(undefined);
      const result = makeResult({ tools: ['My Tool!', 'Another/Tool'] });

      const id = await service.save(result, 'GPT-4 Turbo');

      expect(id).toMatch(/^my-tool-another-tool--gpt-4-turbo--/);
    });

    it('should use "default-model" when model is empty', async () => {
      mockFs.writeFile.mockResolvedValue(undefined);
      const result = makeResult();

      const id = await service.save(result, '');

      expect(id).toMatch(/--default-model--/);
    });
  });

  describe('findAll', () => {
    it('should return sorted metadata for all valid JSON files', async () => {
      mockFs.readdir.mockResolvedValue(['b.json', 'a.json']);
      const olderResult = makeResult({
        generatedAt: '2024-01-01T00:00:00.000Z',
        summary: 'Older',
      });
      const newerResult = makeResult({
        generatedAt: '2024-06-01T00:00:00.000Z',
        summary: 'Newer',
      });

      mockFs.readFile
        .mockResolvedValueOnce(JSON.stringify(olderResult))
        .mockResolvedValueOnce(JSON.stringify(newerResult));

      const results = await service.findAll();

      expect(results).toHaveLength(2);
      expect(results[0].summary).toBe('Newer');
      expect(results[1].summary).toBe('Older');
    });

    it('should skip unreadable files and return the rest', async () => {
      mockFs.readdir.mockResolvedValue(['good.json', 'bad.json']);
      mockFs.readFile
        .mockResolvedValueOnce(JSON.stringify(makeResult({ summary: 'Good' })))
        .mockRejectedValueOnce(new Error('ENOENT'));

      const results = await service.findAll();

      expect(results).toHaveLength(1);
      expect(results[0].summary).toBe('Good');
    });

    it('should return empty array when directory does not exist', async () => {
      mockFs.readdir.mockRejectedValue(new Error('ENOENT'));

      const results = await service.findAll();

      expect(results).toEqual([]);
    });

    it('should truncate summary to 200 characters', async () => {
      mockFs.readdir.mockResolvedValue(['x.json']);
      const longSummary = 'a'.repeat(300);
      mockFs.readFile.mockResolvedValue(
        JSON.stringify(makeResult({ summary: longSummary })),
      );

      const results = await service.findAll();

      expect(results[0].summary).toHaveLength(200);
    });
  });

  describe('findOne', () => {
    it('should return parsed ComparisonResult for a valid ID', async () => {
      const result = makeResult();
      mockFs.readFile.mockResolvedValue(JSON.stringify(result));

      const found = await service.findOne('some-valid-id');

      expect(found.summary).toBe('A test summary');
    });

    it('should throw NotFoundException when file does not exist', async () => {
      mockFs.readFile.mockRejectedValue(new Error('ENOENT'));

      await expect(service.findOne('missing-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException for path traversal attempts', async () => {
      await expect(service.findOne('../etc/passwd')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
