import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import type { ComparisonResult } from './comparison.service';
import type { SavedComparisonMeta } from './dto/saved-comparison-meta.dto';

@Injectable()
export class ComparisonStorageService implements OnModuleInit {
  private readonly logger = new Logger(ComparisonStorageService.name);
  private readonly storageDir: string;

  constructor(private readonly configService: ConfigService) {
    this.storageDir = path.resolve(
      this.configService.get<string>('COMPARISONS_DIR') ?? '../../data/comparisons',
    );
  }

  async onModuleInit(): Promise<void> {
    await fs.mkdir(this.storageDir, { recursive: true });
    this.logger.log(`Comparison storage directory: ${this.storageDir}`);
  }

  /**
   * Saves a ComparisonResult to disk.
   * Returns the file ID (filename without `.json`).
   */
  async save(result: ComparisonResult, model: string): Promise<string> {
    const toolsSlug = result.tools.map((t) => this.slugify(t)).join('-');
    const modelSlug = this.slugify(model || 'default-model');
    const timestamp = this.formatTimestamp(new Date(result.generatedAt));
    const id = `${toolsSlug}--${modelSlug}--${timestamp}`;
    const filePath = path.join(this.storageDir, `${id}.json`);

    await fs.writeFile(filePath, JSON.stringify(result, null, 2), {
      flag: 'wx',
    });
    this.logger.log(`Saved comparison: ${id}`);
    return id;
  }

  /**
   * Returns metadata for all saved comparisons, newest first.
   * Unreadable or malformed files are skipped with a warning.
   */
  async findAll(): Promise<SavedComparisonMeta[]> {
    let files: string[];
    try {
      files = await fs.readdir(this.storageDir);
    } catch {
      return [];
    }

    const jsonFiles = files.filter((f) => f.endsWith('.json'));
    const results: SavedComparisonMeta[] = [];

    for (const file of jsonFiles) {
      const id = file.slice(0, -5);
      const filePath = path.join(this.storageDir, file);
      try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const parsed = JSON.parse(raw) as ComparisonResult;
        results.push({
          id,
          tools: Array.isArray(parsed.tools) ? parsed.tools : [],
          model: this.extractModelFromId(id),
          generatedAt: parsed.generatedAt ?? '',
          summary:
            typeof parsed.summary === 'string'
              ? parsed.summary.slice(0, 200)
              : '',
        });
      } catch (err) {
        this.logger.warn(`Skipping unreadable comparison file: ${file}`, err);
      }
    }

    return results.sort((a, b) => {
      return (
        new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
      );
    });
  }

  /**
   * Loads a single ComparisonResult by ID.
   * Throws NotFoundException if the file does not exist.
   */
  async findOne(id: string): Promise<ComparisonResult> {
    const filePath = path.join(this.storageDir, `${id}.json`);

    // Path traversal guard
    const resolved = path.resolve(filePath);
    if (
      !resolved.startsWith(this.storageDir + path.sep) &&
      resolved !== this.storageDir
    ) {
      throw new NotFoundException(`Comparison not found`);
    }

    try {
      const raw = await fs.readFile(resolved, 'utf-8');
      return JSON.parse(raw) as ComparisonResult;
    } catch {
      throw new NotFoundException(`Comparison '${id}' not found`);
    }
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 30);
  }

  private formatTimestamp(date: Date): string {
    const pad = (n: number, len = 2) => String(n).padStart(len, '0');
    return (
      `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
      `-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}${pad(date.getMilliseconds(), 3)}`
    );
  }

  /** Extracts the model slug from the middle section of a file ID. */
  private extractModelFromId(id: string): string {
    const parts = id.split('--');
    return parts.length >= 2 ? (parts[1] ?? '') : '';
  }
}
