import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { categoryColors, monthlyData } from '../data/mockData'
import { TrendingUp, TrendingDown, AlertCircle, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function InsightCard({ icon: Icon, label, value, sub, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
    >
      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{value}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{sub}</div>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.75rem 1rem' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontSize: '0.85rem', fontWeight: 600 }}>
            {p.name}: ₹{p.value.toLocaleString('en-IN')}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Insights() {
  const { transactions } = useApp()

  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc }, {})

  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]
  const lowestCategory = Object.entries(categoryTotals).sort((a, b) => a[1] - b[1])[0]

  const lastMonth = monthlyData[monthlyData.length - 2]
  const thisMonth = monthlyData[monthlyData.length - 1]
  const savingsRate = (((thisMonth.income - thisMonth.expenses) / thisMonth.income) * 100).toFixed(1)
  const expenseChange = (((thisMonth.expenses - lastMonth.expenses) / lastMonth.expenses) * 100).toFixed(1)

  const categoryBarData = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <InsightCard icon={Award} label="Highest Spending" value={highestCategory ? highestCategory[0] : '-'} sub={highestCategory ? `₹${highestCategory[1].toLocaleString('en-IN')} this month` : ''} color="#ff4d6d" delay={0} />
        <InsightCard icon={TrendingUp} label="Savings Rate" value={`${savingsRate}%`} sub={`₹${(thisMonth.income - thisMonth.expenses).toLocaleString('en-IN')} saved this month`} color="#00e5a0" delay={0.1} />
        <InsightCard icon={expenseChange > 0 ? TrendingUp : TrendingDown} label="Expense Change" value={`${expenseChange > 0 ? '+' : ''}${expenseChange}%`} sub={`Compared to ${lastMonth.month}`} color={expenseChange > 0 ? '#ff4d6d' : '#00e5a0'} delay={0.2} />
        <InsightCard icon={AlertCircle} label="Lowest Spending" value={lowestCategory ? lowestCategory[0] : '-'} sub={lowestCategory ? `₹${lowestCategory[1].toLocaleString('en-IN')} this month` : ''} color="#4d79ff" delay={0.3} />
      </div>

    
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Monthly Comparison</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Income vs Expenses over 6 months</div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthlyData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#7070a0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#7070a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" name="Income" fill="#00e5a0" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#ff4d6d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

    
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Spending by Category</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Where your money is going</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {categoryBarData.map(({ name, value }) => {
            const max = categoryBarData[0].value
            const pct = (value / max) * 100
            return (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '90px', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'right', flexShrink: 0 }}>{name}</div>
                <div style={{ flex: 1, height: '8px', background: 'var(--bg-elevated)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: categoryColors[name] || '#4d79ff', borderRadius: '99px', transition: 'width 0.6s ease' }} />
                </div>
                <div style={{ width: '80px', fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 600 }}>₹{value.toLocaleString('en-IN')}</div>
              </div>
            )
          })}
        </div>
      </motion.div>

    </motion.div>
  )
}