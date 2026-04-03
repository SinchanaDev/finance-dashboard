import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Edit3, Check, X } from 'lucide-react'

const categoryColors = {
  Food: '#f97316',
  Entertainment: '#a855f7',
  Utilities: '#3b82f6',
  Housing: '#ef4444',
  Health: '#10b981',
  Shopping: '#f59e0b',
  Transport: '#06b6d4',
}

export default function BudgetTracker() {
  const { transactions, budgets, setBudgets } = useApp()
  const [editingCategory, setEditingCategory] = useState(null)
  const [editValue, setEditValue] = useState('')

  // Calculate actual spending per category
  const spending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const startEdit = (category, current) => {
    setEditingCategory(category)
    setEditValue(current.toString())
  }

  const saveEdit = (category) => {
    const val = parseFloat(editValue)
    if (!isNaN(val) && val > 0) {
      setBudgets(prev => ({ ...prev, [category]: val }))
    }
    setEditingCategory(null)
  }

  const categories = Object.keys(budgets)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={18} color='#00e5a0' />
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Budget Goals</div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Click the edit icon to set your monthly budget per category</div>
      </div>

      {/* Budget Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {categories.map(category => {
          const budget = budgets[category] || 0
          const spent = spending[category] || 0
          const pct = Math.min(100, (spent / budget) * 100)
          const isOver = spent > budget
          const isWarning = pct >= 80 && !isOver
          const color = isOver ? '#ff4d6d' : isWarning ? '#f59e0b' : categoryColors[category] || '#4d79ff'
          const isEditing = editingCategory === category

          return (
            <div key={category}>
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>{category}</span>
                  {isOver && (
                    <span style={{ fontSize: '0.65rem', background: 'rgba(255,77,109,0.15)', color: '#ff4d6d', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                      OVER BUDGET
                    </span>
                  )}
                  {isWarning && (
                    <span style={{ fontSize: '0.65rem', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                      NEAR LIMIT
                    </span>
                  )}
                </div>

                {/* Edit budget */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {isEditing ? (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <input
                          type="number"
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && saveEdit(category)}
                          autoFocus
                          style={{ width: '80px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)', padding: '0.2rem 0.4rem', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif', outline: 'none' }}
                        />
                        <button onClick={() => saveEdit(category)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#00e5a0', display: 'flex' }}>
                          <Check size={14} />
                        </button>
                        <button onClick={() => setEditingCategory(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ff4d6d', display: 'flex' }}>
                          <X size={14} />
                        </button>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        ₹{spent.toLocaleString('en-IN')} / ₹{budget.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => startEdit(category, budget)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 0 }}
                        onMouseEnter={e => e.currentTarget.style.color = '#00e5a0'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <Edit3 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ height: '7px', background: 'var(--bg-elevated)', borderRadius: '99px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', background: color, borderRadius: '99px' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}