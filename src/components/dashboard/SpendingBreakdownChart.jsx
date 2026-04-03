import { useApp } from '../../context/AppContext'
import { categoryColors } from '../../data/mockData'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

export default function SpendingBreakdownChart() {
  const { transactions } = useApp()

  const data = Object.entries(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {})
  ).map(([name, value]) => ({ name, value }))

  return (
    <div style={{ background: '#111118', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#f0f0f5' }}>Spending Breakdown</div>
        <div style={{ fontSize: '0.75rem', color: '#7070a0', marginTop: '2px' }}>By category</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {data.map((entry, i) => (
                <Cell key={i} fill={categoryColors[entry.name] || '#4d79ff'} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} contentStyle={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: '10px', color: '#f0f0f5' }} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {data.map((entry, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: categoryColors[entry.name] || '#4d79ff' }} />
                <span style={{ color: '#7070a0' }}>{entry.name}</span>
              </div>
              <span style={{ color: '#f0f0f5', fontWeight: 600 }}>₹{entry.value.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}