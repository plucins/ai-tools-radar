import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { MainContent } from '@/components/layout/MainContent'
import type { AppOutletContext } from '@/components/layout/OutletContext'
import { useModels } from '@/hooks/useModels'

export function MainLayout() {
  const { models, loading } = useModels()
  const [selectedModel, setSelectedModel] = useState('')

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        models={models}
        loading={loading}
      />
      <MainContent>
        <Outlet context={{ selectedModel, onModelChange: setSelectedModel } satisfies AppOutletContext} />
      </MainContent>
    </div>
  )
}
