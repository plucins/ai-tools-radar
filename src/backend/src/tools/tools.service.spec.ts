import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';
import { ToolsService } from './tools.service';

describe('ToolsService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll()', () => {
    it('returns parsed tools from markdown files', () => {
      // Arrange
      const service = new ToolsService();

      // Act
      const tools = service.findAll();

      // Assert
      expect(tools.length).toBeGreaterThan(0);
      for (const tool of tools) {
        expect(tool.id).toBeDefined();
        expect(tool.name).toBeDefined();
        expect(tool.category).toBeDefined();
        expect(tool.tags).toBeDefined();
      }
    });

    it('generates id from filename slug', () => {
      // Arrange
      const service = new ToolsService();

      // Act
      const tools = service.findAll();

      // Assert
      const claudeCode = tools.find((t) => t.id === 'claude-code');
      expect(claudeCode).toBeDefined();
      expect(claudeCode!.id).toBe('claude-code');
    });

    it('resolves js-yaml block scalar description', () => {
      // Arrange
      const service = new ToolsService();

      // Act
      const tools = service.findAll();

      // Assert — block scalar > should collapse multi-line to single line (no leading \n)
      const claudeCode = tools.find((t) => t.id === 'claude-code');
      expect(claudeCode).toBeDefined();
      expect(typeof claudeCode!.description).toBe('string');
      expect(claudeCode!.description).not.toMatch(/^\n/);
    });

    it('skips files with missing required fields', () => {
      // Arrange — temp dir with a fixture that has no "name" field
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tools-test-'));
      const subDir = path.join(tmpDir, 'cli');
      fs.mkdirSync(subDir);
      fs.writeFileSync(
        path.join(subDir, 'no-name.md'),
        '# No Name\n\n```yaml\ndescription: Some description\ncategory: cli\ntags: []\n```\n',
      );
      const service = new ToolsService(tmpDir);

      // Act & Assert — must not throw; invalid file is skipped
      expect(() => service.findAll()).not.toThrow();
      expect(service.findAll()).toEqual([]);

      // Cleanup
      fs.rmSync(tmpDir, { recursive: true });
    });

    it('skips files with invalid yaml', () => {
      // Arrange — temp dir with a fixture containing broken YAML
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tools-test-'));
      const subDir = path.join(tmpDir, 'cli');
      fs.mkdirSync(subDir);
      fs.writeFileSync(
        path.join(subDir, 'broken-yaml.md'),
        '# Broken\n\n```yaml\nname: [\n  unclosed bracket\n```\n',
      );
      const service = new ToolsService(tmpDir);

      // Act & Assert — must not throw; broken file is skipped gracefully
      expect(() => service.findAll()).not.toThrow();
      expect(service.findAll()).toEqual([]);

      // Cleanup
      fs.rmSync(tmpDir, { recursive: true });
    });
  });

  describe('findOne()', () => {
    it('returns correct tool by id', () => {
      // Arrange
      const service = new ToolsService();

      // Act
      const tool = service.findOne('claude-code');

      // Assert
      expect(tool.name).toBe('Claude Code');
    });

    it('throws NotFoundException for unknown id', () => {
      // Arrange
      const service = new ToolsService();

      // Act & Assert
      expect(() => service.findOne('nonexistent')).toThrow(NotFoundException);
    });
  });

  describe('loadTools() error-handling branches', () => {
    it('returns empty array when toolsRoot does not exist (lines 49-50)', () => {
      // Arrange — non-existent path triggers readdirSync catch block
      const service = new ToolsService('/nonexistent/path/that/does/not/exist');

      // Act & Assert
      expect(service.findAll()).toEqual([]);
    });

    it('skips markdown files with no YAML fenced block (lines 78-79)', () => {
      // Arrange
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tools-test-'));
      const subDir = path.join(tmpDir, 'cli');
      fs.mkdirSync(subDir);
      fs.writeFileSync(
        path.join(subDir, 'no-yaml.md'),
        '# No YAML\nJust plain text, no fenced code block at all.\n',
      );
      const service = new ToolsService(tmpDir);

      // Act & Assert
      expect(() => service.findAll()).not.toThrow();
      expect(service.findAll()).toEqual([]);

      // Cleanup
      fs.rmSync(tmpDir, { recursive: true });
    });

    it('skips markdown files with an empty YAML block (!parsed branch)', () => {
      // Arrange — yaml.load('') returns undefined, triggering the !parsed guard
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tools-test-'));
      const subDir = path.join(tmpDir, 'cli');
      fs.mkdirSync(subDir);
      fs.writeFileSync(
        path.join(subDir, 'empty-yaml.md'),
        '# Empty\n\n```yaml\n\n```\n',
      );
      const service = new ToolsService(tmpDir);

      // Act & Assert
      expect(() => service.findAll()).not.toThrow();
      expect(service.findAll()).toEqual([]);

      // Cleanup
      fs.rmSync(tmpDir, { recursive: true });
    });

    it('loads tool with empty tags array when tags is a non-array value (line 102-104 branch)', () => {
      // Arrange — tags is a plain string, not an array; Array.isArray returns false
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tools-test-'));
      const subDir = path.join(tmpDir, 'cli');
      fs.mkdirSync(subDir);
      fs.writeFileSync(
        path.join(subDir, 'string-tags.md'),
        '# String Tags\n\n```yaml\nname: My Tool\ndescription: A tool\ncategory: cli\ntags: "single-string-tag"\n```\n',
      );
      const service = new ToolsService(tmpDir);

      // Act
      const tools = service.findAll();

      // Assert — tool is loaded but tags falls back to []
      expect(tools).toHaveLength(1);
      expect(tools[0].tags).toEqual([]);

      // Cleanup
      fs.rmSync(tmpDir, { recursive: true });
    });

    it('skips subdir entry gracefully when statSync throws (line 59)', () => {
      // Arrange — broken symlink: readdirSync returns its name but statSync throws ENOENT
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tools-test-'));
      fs.symlinkSync('/nonexistent/target/that/does/not/exist', path.join(tmpDir, 'broken-link'));
      const service = new ToolsService(tmpDir);

      // Act & Assert — broken symlink is skipped, no crash
      expect(service.findAll()).toEqual([]);

      // Cleanup
      fs.rmSync(tmpDir, { recursive: true });
    });

    it('skips subdir gracefully when readdirSync throws for it (lines 67-68)', () => {
      // Skip when running as root (permissions have no effect for root)
      if (process.getuid && process.getuid() === 0) return;

      // Arrange — directory with no read permission triggers readdirSync EACCES
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tools-test-'));
      const subDir = path.join(tmpDir, 'locked-cli');
      fs.mkdirSync(subDir, { mode: 0o000 });
      const service = new ToolsService(tmpDir);

      // Act & Assert — locked subdir is skipped gracefully
      expect(service.findAll()).toEqual([]);

      // Cleanup — restore permissions before deletion
      fs.chmodSync(subDir, 0o755);
      fs.rmSync(tmpDir, { recursive: true });
    });
  });
});
