import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Target } from 'lucide-react'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/insights', icon: Lightbulb, label: 'Insights' },
  { to: '/planning', icon: Target, label: 'Planning' },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: 'var(--bg-card)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1rem',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '2.5rem', paddingLeft: '0.75rem' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#00e5a0', letterSpacing: '-0.5px' }}>
          fin<span style={{ color: 'var(--text-primary)' }}>track</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '2px', textTransform: 'uppercase' }}>Finance Dashboard</div>
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              background: isActive ? 'rgba(0,229,160,0.08)' : 'transparent',
              color: isActive ? '#00e5a0' : 'var(--text-muted)',
              borderLeft: isActive ? '2px solid #00e5a0' : '2px solid transparent',
            })}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ fontSize: '0.7rem', color: 'var(--border)', paddingLeft: '0.75rem', letterSpacing: '1px' }}>
        v1.0.0
      </div>
    </aside>
  )
}