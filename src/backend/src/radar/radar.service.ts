import { Injectable } from '@nestjs/common';
import {
  RadarResponseDto,
  RadarRingDto,
  RadarQuadrantDto,
  RadarToolPointDto,
} from './dto/radar-response.dto';

@Injectable()
export class RadarService {
  getRadarData(): RadarResponseDto {
    const rings = this.buildRings();
    return {
      rings,
      quadrants: this.buildQuadrants(),
      tools: this.buildTools().map((tool) => this.clampToolToRing(tool, rings)),
    };
  }

  /**
   * Clamps a tool's (x, y) so its Euclidean distance from origin stays within
   * the ring radius. The jitter formula can push the diagonal magnitude up to
   * √(8²+8²) ≈ 11.3, so axis-aligned coords alone don't guarantee radial containment.
   */
  private clampToolToRing(
    tool: RadarToolPointDto,
    rings: RadarRingDto[],
  ): RadarToolPointDto {
    const ring = rings.find((r) => r.id === tool.ring);
    if (!ring) return tool;
    const dist = Math.sqrt(tool.x * tool.x + tool.y * tool.y);
    if (dist <= ring.radius) return tool;
    const scale = (ring.radius * 0.98) / dist;
    return {
      ...tool,
      x: Math.round(tool.x * scale * 100) / 100,
      y: Math.round(tool.y * scale * 100) / 100,
    };
  }

  private buildRings(): RadarRingDto[] {
    return [
      {
        id: 'core',
        label: 'CORE',
        radius: 25,
        color: '#A855F7',
        description: 'Essential tools in daily use across the team',
      },
      {
        id: 'adopt',
        label: 'ADOPT',
        radius: 50,
        color: '#22C55E',
        description: 'Ready for production use — recommended for new projects',
      },
      {
        id: 'trial',
        label: 'TRIAL',
        radius: 75,
        color: '#3B82F6',
        description: 'Worth exploring in low-risk contexts',
      },
      {
        id: 'watch',
        label: 'WATCH',
        radius: 100,
        color: '#9CA3AF',
        description: 'Emerging — keep an eye on this space',
      },
    ];
  }

  private buildQuadrants(): RadarQuadrantDto[] {
    return [
      {
        id: 'engineering',
        label: 'Coding & Engineering',
        startAngle: 0,
        endAngle: 90,
      },
      {
        id: 'research',
        label: 'Research & Discovery',
        startAngle: 90,
        endAngle: 180,
      },
      {
        id: 'automation',
        label: 'Automation & Agents',
        startAngle: 180,
        endAngle: 270,
      },
      {
        id: 'design',
        label: 'Design & Creative',
        startAngle: 270,
        endAngle: 360,
      },
    ];
  }

  // Coordinates are pre-calculated using:
  //   x = radius × cos(θ_mid_rad) + jitter_x
  //   y = radius × sin(θ_mid_rad) + jitter_y
  // Convention: 0° = East (3 o'clock), CCW positive (standard Cartesian math)
  // θ_mid: engineering=45°, research=135°, automation=225°, design=315°
  // Jitter: deterministic, seeded by tool index — jitter_x = (index*7+3)%17-8, jitter_y = (index*11+5)%17-8
  private buildTools(): RadarToolPointDto[] {
    return [
      // Index 0 — engineering, adopt (r=50), θ=45°, base=(35.36,35.36), jitter=(-5,-3)
      {
        id: 'github-copilot',
        name: 'GitHub Copilot',
        description: 'AI pair programmer integrated into VS Code and JetBrains',
        x: 30.36,
        y: 32.36,
        ring: 'adopt',
        quadrant: 'engineering',
        color: '#22C55E',
      },
      // Index 1 — engineering, core (r=25), θ=45°, base=(17.68,17.68), jitter=(2,8)
      {
        id: 'cursor',
        name: 'Cursor',
        description:
          'AI-first code editor built on VS Code with deep LLM integration',
        x: 19.68,
        y: 25.68,
        ring: 'core',
        quadrant: 'engineering',
        color: '#A855F7',
      },
      // Index 2 — research, adopt (r=50), θ=135°, base=(-35.36,35.36), jitter=(-8,2)
      {
        id: 'claude',
        name: 'Claude',
        description:
          'Anthropic conversational AI for analysis, coding, and writing',
        x: -43.36,
        y: 37.36,
        ring: 'adopt',
        quadrant: 'research',
        color: '#22C55E',
      },
      // Index 3 — research, trial (r=75), θ=135°, base=(-53.03,53.03), jitter=(-1,-4)
      {
        id: 'perplexity',
        name: 'Perplexity AI',
        description: 'AI-powered search engine with cited real-time answers',
        x: -54.03,
        y: 49.03,
        ring: 'trial',
        quadrant: 'research',
        color: '#3B82F6',
      },
      // Index 4 — automation, trial (r=75), θ=225°, base=(-53.03,-53.03), jitter=(6,7)
      {
        id: 'langchain',
        name: 'LangChain',
        description:
          'Framework for building LLM-powered applications and pipelines',
        x: -47.03,
        y: -46.03,
        ring: 'trial',
        quadrant: 'automation',
        color: '#3B82F6',
      },
      // Index 5 — automation, watch (r=100), θ=225°, base=(-70.71,-70.71), jitter=(-4,1)
      {
        id: 'autogpt',
        name: 'AutoGPT',
        description:
          'Autonomous AI agent that decomposes and executes multi-step tasks',
        x: -74.71,
        y: -69.71,
        ring: 'watch',
        quadrant: 'automation',
        color: '#9CA3AF',
      },
      // Index 6 — design, trial (r=75), θ=315°, base=(53.03,-53.03), jitter=(3,-5)
      {
        id: 'midjourney',
        name: 'Midjourney',
        description:
          'Text-to-image AI generating photorealistic and artistic visuals',
        x: 56.03,
        y: -58.03,
        ring: 'trial',
        quadrant: 'design',
        color: '#3B82F6',
      },
      // Index 7 — design, adopt (r=50), θ=315°, base=(35.36,-35.36), jitter=(-7,6)
      {
        id: 'figma-ai',
        name: 'Figma AI',
        description:
          'AI-assisted design features inside the Figma design platform',
        x: 28.36,
        y: -29.36,
        ring: 'adopt',
        quadrant: 'design',
        color: '#22C55E',
      },
      // Index 8 — engineering, watch (r=100), θ=45°, base=(70.71,70.71), jitter=(0,0)
      {
        id: 'copilot-chat',
        name: 'Copilot Chat',
        description:
          'Conversational AI interface within GitHub Copilot for code Q&A',
        x: 70.71,
        y: 70.71,
        ring: 'watch',
        quadrant: 'engineering',
        color: '#9CA3AF',
      },
      // Index 9 — automation, core (r=25), θ=225°, base=(-17.68,-17.68), jitter=(7,-6)
      {
        id: 'ollama',
        name: 'Ollama',
        description:
          'Local LLM runner enabling offline inference with open-source models',
        x: -10.68,
        y: -23.68,
        ring: 'core',
        quadrant: 'automation',
        color: '#A855F7',
      },
      // Index 10 — engineering, trial (r=75), θ=45°, base=(53.03,53.03), jitter=(-3,5)
      {
        id: 'tabnine',
        name: 'Tabnine',
        description:
          'AI code completion tool supporting 30+ languages with privacy modes',
        x: 50.03,
        y: 58.03,
        ring: 'trial',
        quadrant: 'engineering',
        color: '#3B82F6',
      },
      // Index 11 — research, core (r=25), θ=135°, base=(-17.68,17.68), jitter=(4,-1)
      {
        id: 'chatgpt',
        name: 'ChatGPT',
        description:
          'OpenAI conversational assistant for coding, research, and creative tasks',
        x: -13.68,
        y: 16.68,
        ring: 'core',
        quadrant: 'research',
        color: '#A855F7',
      },
      // Index 12 — automation, adopt (r=50), θ=225°, base=(-35.36,-35.36), jitter=(-6,-7)
      {
        id: 'zapier-ai',
        name: 'Zapier AI',
        description:
          'AI-powered workflow automation connecting apps without code',
        x: -41.36,
        y: -42.36,
        ring: 'adopt',
        quadrant: 'automation',
        color: '#22C55E',
      },
      // Index 13 — design, watch (r=100), θ=315°, base=(70.71,-70.71), jitter=(1,4)
      {
        id: 'adobe-firefly',
        name: 'Adobe Firefly',
        description:
          'Adobe generative AI for images, vectors, and design content',
        x: 71.71,
        y: -66.71,
        ring: 'watch',
        quadrant: 'design',
        color: '#9CA3AF',
      },
      // Index 14 — research, watch (r=100), θ=135°, base=(-70.71,70.71), jitter=(8,-2)
      {
        id: 'codeium',
        name: 'Codeium',
        description:
          'Free AI code acceleration toolkit with autocomplete and search',
        x: -62.71,
        y: 68.71,
        ring: 'watch',
        quadrant: 'research',
        color: '#9CA3AF',
      },
      // Index 15 — design, core (r=25), θ=315°, base=(17.68,-17.68), jitter=(-2,-8)
      {
        id: 'v0-by-vercel',
        name: 'v0 by Vercel',
        description:
          'Generative UI tool producing React components from text prompts',
        x: 15.68,
        y: -25.68,
        ring: 'core',
        quadrant: 'design',
        color: '#A855F7',
      },
    ];
  }
}
