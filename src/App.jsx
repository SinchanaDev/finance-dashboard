import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import Planning from './pages/Planning'

function ThemedApp() {
  const { theme } = useApp()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout title="Dashboard"><Dashboard /></Layout>} />
        <Route path="/transactions" element={<Layout title="Transactions"><Transactions /></Layout>} />
        <Route path="/insights" element={<Layout title="Insights"><Insights /></Layout>} />
        <Route path="/planning" element={<Layout title="Planning"><Planning /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

function Layout({ title, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <div style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} />
        <main style={{ flex: 1, padding: '2rem' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <ThemedApp />
    </AppProvider>
  )
}