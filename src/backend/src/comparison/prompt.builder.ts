import { Injectable } from '@nestjs/common';
import { Tool } from '../tools/tools.service';
import { ChatMessage } from '../llm/dto/llm.dto';

const MAX_TOOL_CONTENT_CHARS = 3000;

@Injectable()
export class PromptBuilderService {
  buildComparisonMessages(tools: Tool[]): ChatMessage[] {
    const toolIds = tools.map((t) => t.id);

    const toolSections = tools.map((tool) => {
      const content = this.extractRelevantContent(tool);
      return `### ${tool.name} (toolId: ${tool.id})\n\n${content}`;
    });

    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are an AI developer tool comparison expert. Your job is to compare tools based on their documentation.

You MUST respond with ONLY a valid JSON object. No prose, no markdown, no explanation outside the JSON.
Your entire response must be parseable by JSON.parse().

## OUTPUT SCHEMA

{
  "summary": string,              // 2-4 sentence overview comparing the tools at a high level
  "recommendation": string,       // 2-4 sentences: which tool for which use case / user profile
  "toolSummaries": [
    {
      "toolId": string,           // MUST be one of: ${toolIds.join(' | ')}
      "bestFor": string,          // 1-2 sentences: the ideal user or scenario
      "notIdealFor": string,      // 1-2 sentences: when you would avoid this tool
      "keyDifferentiators": [     // 2-4 short phrases (not full sentences) of unique value
        string
      ]
    }
  ],
  "sections": [
    {
      "id": string,               // one of: "features" | "pricing" | "integrations" | "limitations" | custom slug
      "title": string,            // human-readable tab label, e.g. "Core Features"
      "summary": string,          // 2-3 sentences summarising this section across all tools
      "features": [
        {
          "name": string,         // short feature name, e.g. "MCP support", "Free tier", "SSO"
          "description": string,  // one sentence: what this feature means or why it matters
          "values": [
            {
              "toolId": string,       // MUST be one of: ${toolIds.join(' | ')}
              "available": boolean,   // true = tool supports/offers this; false = does not
              "description": string   // how the tool implements this (1 sentence), or "Not supported"
            }
          ]
        }
      ]
    }
  ]
}

## RULES

1. toolSummaries[] MUST have exactly one entry per toolId: ${toolIds.join(', ')}
2. Every features[].values[] MUST have exactly one entry per toolId: ${toolIds.join(', ')}
3. Do NOT use numeric scores, ratings, or rankings anywhere.
4. Use available=false + description="Not supported" when a tool lacks a feature.
5. Include the 4 base sections: "features", "pricing", "integrations", "limitations".
   If the documentation provides strong evidence for an additional meaningful section
   (e.g. "security", "performance"), you may add it AFTER the 4 base sections. Maximum 7 sections total.
6. Include 5-10 feature rows per section. Choose the most meaningful comparison points from the documentation.
7. Feature descriptions (values[].description) must be ≤ 2 sentences. Do not exceed this.
8. toolSummaries[].keyDifferentiators: 2-4 items, each ≤ 10 words. Short phrases only.
9. toolId values in your response MUST exactly match: ${toolIds.join(', ')}
   The server will override toolId/toolName fields in toolSummaries — you may omit toolName.

IMPORTANT: Do not invent tool capabilities not present in the documentation provided.`,
    };

    const userMessage: ChatMessage = {
      role: 'user',
      content: `Compare these ${toolIds.length} AI developer tools:\n\n${toolSections.join('\n\n---\n\n')}\n\n---\nFocus your comparison on: Core Features, Pricing, Integrations, Limitations.\nBe specific and evidence-based. If a feature is not documented, mark available=false.`,
    };

    return [systemMessage, userMessage];
  }

  private extractRelevantContent(tool: Tool): string {
    const rawContent = tool.content ?? '';
    // Remove the YAML frontmatter block (```yaml ... ```)
    const withoutYaml = rawContent.replace(/^```yaml[\s\S]*?```\n?/m, '');
    const trimmed = withoutYaml.trim();
    if (trimmed.length <= MAX_TOOL_CONTENT_CHARS) {
      return trimmed;
    }
    return trimmed.slice(0, MAX_TOOL_CONTENT_CHARS) + '\n\n[... content truncated ...]';
  }
}
