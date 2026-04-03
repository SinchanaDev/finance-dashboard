import { useApp } from '../../context/AppContext'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Zap } from 'lucide-react'
import { monthlyData } from '../../data/mockData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'

const categoryColors = {
  Food: '#f97316',
  Entertainment: '#a855f7',
  Utilities: '#3b82f6',
  Housing: '#ef4444',
  Health: '#10b981',
  Shopping: '#f59e0b',
  Transport: '#06b6d4',
}

function predictNextMonth(transactions) {
  
  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  
  const predictions = Object.entries(categoryTotals).map(([category, total]) => {
    const growthFactors = {
      Food: 1.05,
      Entertainment: 0.95,
      Utilities: 1.02,
      Housing: 1.0,
      Health: 1.08,
      Shopping: 0.9,
      Transport: 1.03,
    }
    const factor = growthFactors[category] || 1.02
    const predicted = Math.round(total * factor)
    const change = predicted - total
    const changePct = ((change / total) * 100).toFixed(1)
    return { category, current: total, predicted, change, changePct }
  })

  return predictions.sort((a, b) => b.predicted - a.predicted)
}

function predictMonthlyTrend() {
  
  const last3 = monthlyData.slice(-3)
  const avgIncomeGrowth = (last3[2].income - last3[0].income) / 2
  const avgExpenseGrowth = (last3[2].expenses - last3[0].expenses) / 2

  const nextIncome = Math.round(last3[2].income + avgIncomeGrowth * 0.5)
  const nextExpenses = Math.round(last3[2].expenses + avgExpenseGrowth * 0.5)

  return {
    month: 'Apr (Forecast)',
    income: nextIncome,
    expenses: nextExpenses,
    isForecast: true,
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.75rem 1rem' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
          {label} {label === 'Apr (Forecast)' ? '🔮' : ''}
        </div>
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

export default function SpendingForecast() {
  const { transactions } = useApp()
  const predictions = predictNextMonth(transactions)
  const forecastMonth = predictMonthlyTrend()
  const chartData = [...monthlyData, forecastMonth]

  const totalCurrentExpenses = predictions.reduce((s, p) => s + p.current, 0)
  const totalForecastExpenses = predictions.reduce((s, p) => s + p.predicted, 0)
  const totalChange = totalForecastExpenses - totalCurrentExpenses
  const totalChangePct = ((totalChange / totalCurrentExpenses) * 100).toFixed(1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={18} color='#4d79ff' />
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Spending Forecast</div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Predicted expenses for next month</div>
        </div>

    
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#4d79ff' }}>
            ₹{totalForecastExpenses.toLocaleString('en-IN')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}>
            {totalChange > 0
              ? <TrendingUp size={12} color='#ff4d6d' />
              : totalChange < 0
              ? <TrendingDown size={12} color='#00e5a0' />
              : <Minus size={12} color='#7070a0' />
            }
            <span style={{ fontSize: '0.72rem', color: totalChange > 0 ? '#ff4d6d' : totalChange < 0 ? '#00e5a0' : '#7070a0', fontWeight: 600 }}>
              {totalChange > 0 ? '+' : ''}{totalChangePct}% vs current
            </span>
          </div>
        </div>
      </div>

      
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>6 Month Trend + Forecast</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={({ x, y, payload }) => (
              <text x={x} y={y + 10} textAnchor="middle" fontSize={11} fill={payload.value === 'Apr (Forecast)' ? '#4d79ff' : '#7070a0'} fontWeight={payload.value === 'Apr (Forecast)' ? 700 : 400}>
                {payload.value}
              </text>
            )} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#7070a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" name="Income" radius={[4, 4, 0, 0]}
              fill="#00e5a0"
            />
            <Bar dataKey="expenses" name="Expenses" radius={[4, 4, 0, 0]}
              fill="#ff4d6d"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>


      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Category Breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {predictions.map(({ category, current, predicted, change, changePct }) => {
            const color = categoryColors[category] || '#4d79ff'
            const isUp = change > 0
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.75rem', background: 'var(--bg-elevated)', borderRadius: '10px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>{category}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ₹{current.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>→</span>
                  <span style={{ fontSize: '0.82rem', color: '#4d79ff', fontWeight: 700 }}>
                    ₹{predicted.toLocaleString('en-IN')}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', minWidth: '52px', justifyContent: 'flex-end' }}>
                    {isUp
                      ? <TrendingUp size={11} color='#ff4d6d' />
                      : <TrendingDown size={11} color='#00e5a0' />
                    }
                    <span style={{ fontSize: '0.72rem', color: isUp ? '#ff4d6d' : '#00e5a0', fontWeight: 600 }}>
                      {isUp ? '+' : ''}{changePct}%
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Forecast note */}
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', padding: '0.5rem', background: 'rgba(77,121,255,0.05)', borderRadius: '8px', border: '1px solid rgba(77,121,255,0.1)' }}>
        🔮 Forecast is based on current spending trends and category growth patterns
      </div>
    </motion.div>
  )
}