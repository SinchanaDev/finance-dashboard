import { useApp } from '../../context/AppContext'
import { motion } from 'framer-motion'

function getScoreDetails(score) {
  if (score >= 80) return { label: 'Excellent', color: '#00e5a0', tip: 'You are managing your finances really well!' }
  if (score >= 60) return { label: 'Good', color: '#4d79ff', tip: 'Good habits, but some room to improve.' }
  if (score >= 40) return { label: 'Fair', color: '#f59e0b', tip: 'Watch your spending in a few categories.' }
  return { label: 'Poor', color: '#ff4d6d', tip: 'Your expenses are too close to your income.' }
}

export default function HealthScore() {
  const { totalIncome, totalExpenses, transactions } = useApp()

  
  const savingsRate = totalIncome > 0 ? (totalIncome - totalExpenses) / totalIncome : 0
  const savingsScore = Math.min(40, Math.round(savingsRate * 100))

  
  const uniqueCategories = new Set(transactions.filter(t => t.type === 'expense').map(t => t.category)).size
  const diversityScore = Math.min(30, uniqueCategories * 4)

  
  const incomeCount = transactions.filter(t => t.type === 'income').length
  const consistencyScore = Math.min(30, incomeCount * 6)

  const totalScore = savingsScore + diversityScore + consistencyScore
  const { label, color, tip } = getScoreDetails(totalScore)

  
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (totalScore / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      
      <div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Financial Health Score</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Based on savings, diversity & income</div>
      </div>

    
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>

      
        <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
          <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
          
            <circle cx="65" cy="65" r={radius} fill="none" stroke="var(--bg-elevated)" strokeWidth="10" />
          
            <motion.circle
              cx="65" cy="65" r={radius}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            />
          </svg>
          
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: color, lineHeight: 1 }}
            >
              {totalScore}
            </motion.div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>/ 100</div>
          </div>
        </div>

        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span style={{ background: `${color}22`, color, padding: '0.3rem 0.8rem', borderRadius: '99px', fontSize: '0.82rem', fontWeight: 700 }}>
              {label}
            </span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{tip}</div>

        
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Savings Rate', score: savingsScore, max: 40 },
              { label: 'Expense Diversity', score: diversityScore, max: 30 },
              { label: 'Income Consistency', score: consistencyScore, max: 30 },
            ].map(({ label, score, max }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '110px', fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0 }}>{label}</div>
                <div style={{ flex: 1, height: '6px', background: 'var(--bg-elevated)', borderRadius: '99px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / max) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    style={{ height: '100%', background: color, borderRadius: '99px' }}
                  />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-primary)', fontWeight: 600, width: '32px', textAlign: 'right' }}>{score}/{max}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}