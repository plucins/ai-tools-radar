import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ComparisonResultPage } from './routes/ComparisonResultPage'
import { ToolsPage } from './routes/ToolsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ToolsPage />} />
          <Route path="compare" element={<ComparisonResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
