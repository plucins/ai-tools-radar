import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ComparisonResultPage } from './routes/ComparisonResultPage'
import { ToolsPage } from './routes/ToolsPage'
import { CatalogPage } from './routes/CatalogPage'
import { ToolProfilePage } from './routes/ToolProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ToolsPage />} />
          <Route path="compare" element={<ComparisonResultPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<ToolProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
