import { Settings2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export interface ModelParams {
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
}

export const DEFAULT_MODEL_PARAMS: ModelParams = {
  temperature: 0.1,
  top_p: 0.9,
  frequency_penalty: 0,
  presence_penalty: 0,
}

interface SliderRowProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}

function SliderRow({ label, value, min, max, step, onChange }: SliderRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">{label}</span>
        <span className="min-w-[2.5rem] text-right text-xs tabular-nums text-primary">
          {value.toFixed(step < 1 ? 2 : 0)}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
        trackClassName="bg-primary/25"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

interface ModelParamsPopoverProps {
  params: ModelParams
  onChange: (params: ModelParams) => void
  disabled?: boolean
  /** Extra classes applied to the trigger button — use for button-group integration */
  triggerClassName?: string
}

export function ModelParamsPopover({ params, onChange, disabled, triggerClassName }: ModelParamsPopoverProps) {
  function set<K extends keyof ModelParams>(key: K, value: ModelParams[K]) {
    onChange({ ...params, [key]: value })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          aria-label="Configure model parameters"
          className={cn(
            'flex h-full w-14 items-center justify-center text-white/80 transition-colors',
            'hover:bg-white/10 hover:text-white',
            'focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-white/40',
            disabled && 'cursor-not-allowed',
            triggerClassName,
          )}
        >
          <Settings2 className="h-4 w-4" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="end"
        className="relative w-80 overflow-hidden rounded-2xl border border-primary/30 bg-card/80 p-0 shadow-[0_0_40px_hsl(var(--primary)/0.2)] backdrop-blur-xl"
      >
        {/* Radial glow overlay — mirrors the CTA panel aesthetic */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-5 py-4">
            <Settings2 className="h-4 w-4 text-primary" aria-hidden="true" />
            <p className="text-sm font-semibold text-foreground">Model Parameters</p>
          </div>

          <Separator className="bg-border/40" />

          {/* Sliders */}
          <div className="space-y-5 px-5 py-5">
            <SliderRow
              label="Temperature"
              value={params.temperature}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => set('temperature', v)}
            />
            <SliderRow
              label="Top P"
              value={params.top_p}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => set('top_p', v)}
            />
            <SliderRow
              label="Frequency Penalty"
              value={params.frequency_penalty}
              min={-2}
              max={2}
              step={0.01}
              onChange={(v) => set('frequency_penalty', v)}
            />
            <SliderRow
              label="Presence Penalty"
              value={params.presence_penalty}
              min={-2}
              max={2}
              step={0.01}
              onChange={(v) => set('presence_penalty', v)}
            />
          </div>

          <Separator className="bg-border/40" />

          {/* Footer — reset action */}
          <div className="flex items-center justify-end px-5 py-3">
            <button
              onClick={() => onChange(DEFAULT_MODEL_PARAMS)}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Reset to defaults
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
