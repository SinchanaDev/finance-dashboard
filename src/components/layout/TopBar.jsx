import { useApp } from '../../context/AppContext'
import { Bell, Shield, Eye, Sun, Moon } from 'lucide-react'

export default function TopBar({ title }) {
  const { role, setRole, theme, setTheme } = useApp()

  return (
    <header style={{
      height: '64px',
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 99,
    }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        {title}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {theme === 'dark' ? <Sun size={16} color='#7070a0' /> : <Moon size={16} color='#7070a0' />}
        </button>

        {/* Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-elevated)', borderRadius: '8px', padding: '0.35rem 0.75rem', border: '1px solid var(--border)' }}>
          {role === 'admin' ? <Shield size={14} color='var(--accent-green)' /> : <Eye size={14} color='var(--text-muted)' />}
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: role === 'admin' ? 'var(--accent-green)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
          >
            <option value="viewer" style={{ background: 'var(--bg-elevated)' }}>Viewer</option>
            <option value="admin" style={{ background: 'var(--bg-elevated)' }}>Admin</option>
          </select>
        </div>

        {/* Bell */}
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Bell size={16} color='var(--text-muted)' />
        </div>

        {/* Avatar */}
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #00e5a0, #4d79ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#0a0a0f' }}>
          S
        </div>
      </div>
    </header>
  )
}