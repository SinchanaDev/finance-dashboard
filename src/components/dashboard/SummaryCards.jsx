import { useApp } from '../../context/AppContext'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'

function Card({ label, amount, icon: Icon, color, bg, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: bg, borderRadius: '0 16px 0 80px', opacity: 0.15 }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.9 }}>
          <Icon size={18} color={color} />
        </div>
      </div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
        ₹{amount.toLocaleString('en-IN')}
      </div>
    </motion.div>
  )
}

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useApp()
  return (
    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
      <Card label="Total Balance" amount={totalBalance} icon={Wallet} color="#00e5a0" bg="rgba(0,229,160,0.2)" delay={0} />
      <Card label="Total Income" amount={totalIncome} icon={TrendingUp} color="#4d79ff" bg="rgba(77,121,255,0.2)" delay={0.1} />
      <Card label="Total Expenses" amount={totalExpenses} icon={TrendingDown} color="#ff4d6d" bg="rgba(255,77,109,0.2)" delay={0.2} />
    </div>
  )
}