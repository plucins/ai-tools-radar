import { Injectable, NotFoundException } from '@nestjs/common';

export interface Tool {
  id: string;
  name: string;
  description: string;
}

@Injectable()
export class ToolsService {
  private readonly tools: Tool[] = [];

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
}
