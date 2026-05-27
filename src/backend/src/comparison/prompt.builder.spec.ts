import { PromptBuilderService } from './prompt.builder';
import { Tool } from '../tools/tools.service';

describe('PromptBuilderService', () => {
  let service: PromptBuilderService;

  beforeEach(() => {
    service = new PromptBuilderService();
  });

  const makeTool = (overrides: Partial<Tool> = {}): Tool => ({
    id: 'tool-a',
    name: 'Tool A',
    description: 'A test tool.',
    category: 'coding',
    tags: [],
    content: 'Some content about Tool A.',
    ...overrides,
  });

  it('should return exactly 2 messages with roles system and user when given any tools (P-1)', () => {
    // Arrange
    const tools: Tool[] = [
      makeTool({ id: 'tool-a', name: 'Tool A' }),
      makeTool({ id: 'tool-b', name: 'Tool B' }),
    ];

    // Act
    const messages = service.buildComparisonMessages(tools);

    // Assert
    expect(messages).toHaveLength(2);
    expect(messages[0].role).toBe('system');
    expect(messages[1].role).toBe('user');
  });

  it('should include each toolId in system message content when building comparison messages (P-2)', () => {
    // Arrange
    const tools: Tool[] = [
      makeTool({ id: 'tool-alpha', name: 'Tool Alpha' }),
      makeTool({ id: 'tool-beta', name: 'Tool Beta' }),
    ];

    // Act
    const messages = service.buildComparisonMessages(tools);
    const systemContent = messages[0].content;

    // Assert — new schema uses toolSummaries, not comparedTools
    expect(systemContent).toContain('tool-alpha');
    expect(systemContent).toContain('tool-beta');
    expect(systemContent).toContain('toolSummaries');
  });

  it('should include each tool name and id with toolId header format in user message when building comparison messages (P-3)', () => {
    // Arrange
    const tools: Tool[] = [
      makeTool({ id: 'tool-x', name: 'My Tool X' }),
      makeTool({ id: 'tool-y', name: 'My Tool Y' }),
    ];

    // Act
    const messages = service.buildComparisonMessages(tools);
    const userContent = messages[1].content;

    // Assert — new format uses (toolId: ...) not (id: ...)
    expect(userContent).toContain('My Tool X');
    expect(userContent).toContain('tool-x');
    expect(userContent).toContain('My Tool Y');
    expect(userContent).toContain('tool-y');
    expect(userContent).toContain('toolId:');
  });

  it('should truncate tool with 10000 char content so user message section for that tool is ≤3000 chars when building comparison messages (P-4)', () => {
    // Arrange
    const longContent = 'x'.repeat(10000);
    const tools: Tool[] = [
      makeTool({ id: 'tool-long', name: 'Long Tool', content: longContent }),
    ];

    // Act
    const messages = service.buildComparisonMessages(tools);
    const userContent = messages[1].content;

    // Assert — the 10,000 'x' chars must be truncated; count occurrences of 'x' in the full message
    const xCount = (userContent.match(/x/g) ?? []).length;
    expect(xCount).toBeLessThanOrEqual(3000);
  });

  it('should strip yaml frontmatter from tool content so output does not contain yaml values when building comparison messages (P-5)', () => {
    // Arrange
    const yamlTool = makeTool({
      id: 'tool-yaml',
      name: 'Yaml Tool',
      content:
        '```yaml\nname: "foo"\nversion: "1.0"\n```\n\nActual tool description here.',
    });

    // Act
    const messages = service.buildComparisonMessages([yamlTool]);
    const userContent = messages[1].content;

    // Assert
    expect(userContent).not.toContain('name: "foo"');
    expect(userContent).toContain('Actual tool description here.');
  });

  it('should not throw when tool has content undefined when building comparison messages (P-6)', () => {
    // Arrange
    const tool = makeTool({ content: undefined });

    // Act & Assert
    expect(() => service.buildComparisonMessages([tool])).not.toThrow();
  });
});
