import { Injectable, Logger } from '@nestjs/common';
import { CompareToolsDto } from './dto/compare-tools.dto';
import { ToolsService } from '../tools/tools.service';
import { LlmService } from '../llm/llm.service';
import { PromptBuilderService } from './prompt.builder';

export interface FeatureValue {
  toolId: string;
  available: boolean;
  description: string;
}

export interface FeatureRow {
  name: string;
  description?: string;
  values: FeatureValue[];
}

export interface ComparisonSection {
  id: string;
  title: string;
  summary?: string;
  features: FeatureRow[];
}

export interface ToolSummary {
  toolId: string;
  toolName: string;
  bestFor: string;
  notIdealFor: string;
  keyDifferentiators: string[];
}

export interface ComparisonResult {
  tools: string[];
  summary: string;
  recommendation: string;
  generatedAt: string;
  toolSummaries: ToolSummary[];
  sections: ComparisonSection[];
}

export type StreamEvent =
  | { type: 'token'; text: string }
  | { type: 'done'; result: ComparisonResult }
  | { type: 'error'; message: string };

@Injectable()
export class ComparisonService {
  private readonly logger = new Logger(ComparisonService.name);

  constructor(
    private readonly toolsService: ToolsService,
    private readonly llmService: LlmService,
    private readonly promptBuilder: PromptBuilderService,
  ) {}

  async compare(dto: CompareToolsDto): Promise<ComparisonResult> {
    const { toolIds } = dto;

    const tools = toolIds.map((id) => this.toolsService.findOne(id));

    const toolMeta = new Map<string, { id: string; name: string }>(
      tools.map((t) => [t.id, { id: t.id, name: t.name }]),
    );

    const messages = this.promptBuilder.buildComparisonMessages(tools);
    const llmResponse = await this.llmService.complete({
      messages,
      model: dto.model || undefined,
    });

    return this.parseAndValidateLlmResponse(
      llmResponse.text,
      toolMeta,
      toolIds,
    );
  }

  async *compareStream(dto: CompareToolsDto): AsyncGenerator<StreamEvent> {
    const { toolIds } = dto;

    const tools = toolIds.map((id) => this.toolsService.findOne(id));
    const toolMeta = new Map<string, { id: string; name: string }>(
      tools.map((t) => [t.id, { id: t.id, name: t.name }]),
    );
    const messages = this.promptBuilder.buildComparisonMessages(tools);

    let accumulated = '';
    for await (const chunk of this.llmService.streamComplete({
      messages,
      model: dto.model,
    })) {
      accumulated += chunk;
      yield { type: 'token', text: chunk };
    }

    const result = this.parseAndValidateLlmResponse(
      accumulated,
      toolMeta,
      toolIds,
    );
    yield { type: 'done', result };
  }

  private parseAndValidateLlmResponse(
    raw: string,
    toolMeta: Map<string, { id: string; name: string }>,
    toolIds: string[],
  ): ComparisonResult {
    // Strip markdown code fences if present
    const stripped = raw
      .replace(/^```(?:json)?\s*/m, '')
      .replace(/\s*```\s*$/m, '')
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(stripped);
    } catch {
      this.logger.error(
        'LLM response is not valid JSON',
        stripped.slice(0, 200),
      );
      return this.buildFallback(raw, toolIds, toolMeta);
    }

    if (!parsed || typeof parsed !== 'object') {
      return this.buildFallback(raw, toolIds, toolMeta);
    }

    const obj = parsed as Record<string, unknown>;

    if (
      typeof obj['summary'] !== 'string' ||
      typeof obj['recommendation'] !== 'string'
    ) {
      return this.buildFallback(raw, toolIds, toolMeta);
    }

    // Map toolSummaries — server overrides toolId/toolName from toolMeta
    const toolSummaries: ToolSummary[] = toolIds.map((id) => {
      const meta = toolMeta.get(id);
      const fromLlm = Array.isArray(obj['toolSummaries'])
        ? (obj['toolSummaries'] as Record<string, unknown>[]).find(
            (s) => s['toolId'] === id,
          )
        : undefined;

      return {
        toolId: meta?.id ?? id,
        toolName: meta?.name ?? id,
        bestFor:
          typeof fromLlm?.['bestFor'] === 'string' ? fromLlm['bestFor'] : '',
        notIdealFor:
          typeof fromLlm?.['notIdealFor'] === 'string'
            ? fromLlm['notIdealFor']
            : '',
        keyDifferentiators: Array.isArray(fromLlm?.['keyDifferentiators'])
          ? (fromLlm['keyDifferentiators'] as unknown[]).filter(
              (s): s is string => typeof s === 'string',
            )
          : [],
      };
    });

    // Map sections → features → values; filter values to server-known toolIds only
    const sections: ComparisonSection[] = Array.isArray(obj['sections'])
      ? (obj['sections'] as Record<string, unknown>[])
          .filter(
            (s) =>
              typeof s['id'] === 'string' && typeof s['title'] === 'string',
          )
          .map((s) => ({
            id: s['id'] as string,
            title: s['title'] as string,
            summary:
              typeof s['summary'] === 'string' ? s['summary'] : undefined,
            features: Array.isArray(s['features'])
              ? (s['features'] as Record<string, unknown>[]).map((f) => ({
                  name: typeof f['name'] === 'string' ? f['name'] : '',
                  description:
                    typeof f['description'] === 'string'
                      ? f['description']
                      : undefined,
                  values: Array.isArray(f['values'])
                    ? (f['values'] as Record<string, unknown>[])
                        .filter((v) => toolIds.includes(v['toolId'] as string))
                        .map((v) => ({
                          toolId: v['toolId'] as string,
                          available:
                            typeof v['available'] === 'boolean'
                              ? v['available']
                              : false,
                          description:
                            typeof v['description'] === 'string'
                              ? v['description']
                              : '',
                        }))
                    : [],
                }))
              : [],
          }))
      : [];

    return {
      tools: toolIds,
      summary: obj['summary'],
      recommendation: obj['recommendation'],
      generatedAt: new Date().toISOString(),
      toolSummaries,
      sections,
    };
  }

  private buildFallback(
    rawText: string,
    toolIds: string[],
    toolMeta: Map<string, { id: string; name: string }>,
  ): ComparisonResult {
    this.logger.warn(
      'Using fallback comparison result due to unparseable LLM output',
    );
    return {
      tools: toolIds,
      summary: rawText.slice(0, 500),
      recommendation: 'Could not extract structured recommendation.',
      generatedAt: new Date().toISOString(),
      toolSummaries: toolIds.map((id) => ({
        toolId: toolMeta.get(id)?.id ?? id,
        toolName: toolMeta.get(id)?.name ?? id,
        bestFor: '',
        notIdealFor: '',
        keyDifferentiators: [],
      })),
      sections: [],
    };
  }
}
