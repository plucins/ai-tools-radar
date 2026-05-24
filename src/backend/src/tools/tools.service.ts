import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { Injectable, Logger, NotFoundException, Optional, Inject } from '@nestjs/common';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  profilePath?: string;
}

export const TOOLS_ROOT = 'TOOLS_ROOT';

@Injectable()
export class ToolsService {
  private readonly logger = new Logger(ToolsService.name);
  private readonly tools: Tool[];

  constructor(@Optional() @Inject(TOOLS_ROOT) toolsRoot?: string) {
    const root =
      toolsRoot ?? path.join(__dirname, '..', '..', '..', '..', 'tools');
    this.tools = this.loadTools(root);
  }

  findAll(): Tool[] {
    return this.tools;
  }

  findOne(id: string): Tool {
    const tool = this.tools.find((t) => t.id === id);
    if (!tool) {
      throw new NotFoundException(`Tool with id "${id}" not found`);
    }
    return tool;
  }

  private loadTools(toolsRoot: string): Tool[] {
    const tools: Tool[] = [];
    const repoRoot = path.join(__dirname, '..', '..', '..', '..');
    const yamlRegex = /```yaml\n([\s\S]*?)```/;

    let subdirs: string[];
    try {
      subdirs = fs.readdirSync(toolsRoot);
    } catch {
      this.logger.warn(`Could not read tools directory: ${toolsRoot}`);
      return tools;
    }

    for (const subdir of subdirs) {
      const subdirPath = path.join(toolsRoot, subdir);
      let stat: fs.Stats;
      try {
        stat = fs.statSync(subdirPath);
      } catch {
        continue;
      }
      if (!stat.isDirectory()) continue;

      let files: string[];
      try {
        files = fs.readdirSync(subdirPath);
      } catch {
        this.logger.warn(`Could not read subdirectory: ${subdirPath}`);
        continue;
      }

      for (const file of files) {
        if (!file.endsWith('.md')) continue;
        const fullFilePath = path.join(subdirPath, file);
        try {
          const content = fs.readFileSync(fullFilePath, 'utf-8');
          const match = yamlRegex.exec(content);
          if (!match) {
            this.logger.warn(`No YAML block found in ${file}`);
            continue;
          }

          const parsed = yaml.load(match[1]) as Record<string, unknown>;
          if (
            !parsed ||
            typeof parsed !== 'object' ||
            typeof parsed['name'] !== 'string' ||
            typeof parsed['description'] !== 'string' ||
            typeof parsed['category'] !== 'string'
          ) {
            this.logger.warn(`Missing required fields in ${file}`);
            continue;
          }

          const id = path.basename(file, '.md');
          const profilePath = path.relative(repoRoot, fullFilePath);

          tools.push({
            id,
            name: parsed['name'] as string,
            description: parsed['description'] as string,
            category: parsed['category'] as string,
            tags: Array.isArray(parsed['tags'])
              ? (parsed['tags'] as string[])
              : [],
            profilePath,
          });
        } catch (err) {
          this.logger.warn(
            `Error processing ${file}: ${(err as Error).message}`,
          );
        }
      }
    }

    return tools;
  }
}
