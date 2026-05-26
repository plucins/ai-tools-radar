import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { ComparisonSection, ToolSummary } from '@/types/comparison'

interface FeatureTableProps {
  section: ComparisonSection
  toolSummaries: ToolSummary[]
}

export function FeatureTable({ section, toolSummaries }: FeatureTableProps) {
  if (section.features.length === 0) {
    return (
      <p className="text-muted-foreground text-sm py-4">
        No feature data available for this section.
      </p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Feature</TableHead>
          {toolSummaries.map((tool) => (
            <TableHead key={tool.toolId}>{tool.toolName}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {section.features.map((feature) => (
          <TableRow key={feature.name}>
            <TableCell className="font-medium">
              <div>
                <span>{feature.name}</span>
                {feature.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                )}
              </div>
            </TableCell>
            {toolSummaries.map((tool) => {
              const value = feature.values.find((v) => v.toolId === tool.toolId)
              return (
                <TableCell key={tool.toolId} className="align-top">
                  {value ? (
                    <div className="flex flex-col items-start gap-1">
                      {value.available ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 shadow-[0_0_6px_#10B981] mb-1" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground mb-1" />
                      )}
                      <span className="text-xs text-muted-foreground">{value.description}</span>
                    </div>
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
