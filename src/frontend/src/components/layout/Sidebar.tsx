import { useState, useEffect } from 'react'
import { SidebarLogo } from '@/components/layout/SidebarLogo'
import { SidebarNav } from '@/components/layout/SidebarNav'
import { SidebarModelStatus } from '@/components/layout/SidebarModelStatus'
import { Separator } from '@/components/ui/separator'
import { useModels } from '@/hooks/useModels'

export function Sidebar() {
  const { models, loading } = useModels()
  const [selectedModel, setSelectedModel] = useState('')

  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0].id)
    }
  }, [models, selectedModel])

  return (
    <aside
      className="flex h-screen w-[260px] shrink-0 flex-col gap-6 border-r border-border/50 bg-background/80 p-6 backdrop-blur-sm"
      aria-label="Application sidebar"
    >
      <SidebarLogo />
      <Separator className="bg-border/50" />
      <SidebarNav />
      <SidebarModelStatus
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        models={models}
        loading={loading}
        isOnline={!loading && models.length > 0}
      />
    </aside>
  )
}
