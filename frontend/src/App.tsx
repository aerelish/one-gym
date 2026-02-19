import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthenticationPage from './pages/AuthenticationPage'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
