import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  findAll() {
    return this.toolsService.findAll();
  }

  @Get(':id/logo')
  async getLogo(@Param('id') id: string, @Res() res: Response) {
    const tool = this.toolsService.findOne(id);
    if (!tool.logo) throw new NotFoundException('No logo for this tool');

    const pk = process.env.LOGO_DEV_PK ?? '';
    if (!pk) throw new NotFoundException('Logo service not configured');

    const url = tool.logo.replace('pk_', pk);
    const upstream = await fetch(url);
    if (!upstream.ok) throw new NotFoundException('Logo not available');

    const contentType = upstream.headers.get('content-type') ?? 'image/png';
    const buffer = Buffer.from(await upstream.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(buffer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(id);
  }
}
