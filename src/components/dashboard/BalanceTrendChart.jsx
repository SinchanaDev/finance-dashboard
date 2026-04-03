import { useApp } from '../../context/AppContext'
import { monthlyData } from '../../data/mockData'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '10px', padding: '0.75rem 1rem' }}>
        <div style={{ color: '#7070a0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{label}</div>
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

export default function BalanceTrendChart() {
  return (
    <div style={{ background: '#111118', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#f0f0f5' }}>Balance Trend</div>
        <div style={{ fontSize: '0.75rem', color: '#7070a0', marginTop: '2px' }}>Last 6 months</div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={monthlyData}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00e5a0" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#00e5a0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4d6d" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ff4d6d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#7070a0', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#7070a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="income" name="Income" stroke="#00e5a0" strokeWidth={2} fill="url(#incomeGrad)" />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ff4d6d" strokeWidth={2} fill="url(#expenseGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}