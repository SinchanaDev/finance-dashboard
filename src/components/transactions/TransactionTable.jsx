import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { categoryColors } from '../../data/mockData'
import { Trash2, Pencil } from 'lucide-react'
import { motion } from 'framer-motion'
import EditTransactionModal from './EditTransactionModal'

function GroupHeader({ label }) {
  return (
    <div style={{ padding: '0.6rem 1.5rem', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>
      {label}
    </div>
  )
}

function TransactionRow({ t, role, deleteTransaction, isLast, onEdit }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'grid',
        gridTemplateColumns: role === 'admin' ? '1.5fr 1fr 1fr 1fr 80px' : '1.5fr 1fr 1fr 1fr',
        padding: '1rem 1.5rem',
        borderBottom: isLast ? 'none' : '1px solid var(--bg-elevated)',
        alignItems: 'center',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>{t.description}</div>
      <div>
        <span style={{ background: `${categoryColors[t.category] || '#4d79ff'}22`, color: categoryColors[t.category] || '#4d79ff', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
          {t.category}
        </span>
      </div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </div>
      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: t.type === 'income' ? '#00e5a0' : '#ff4d6d' }}>
        {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
      </div>
      {role === 'admin' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => onEdit(t)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '0.25rem' }}
            onMouseEnter={e => e.currentTarget.style.color = '#4d79ff'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => deleteTransaction(t.id)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '0.25rem' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ff4d6d'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default function TransactionTable() {
  const { transactions, searchQuery, filterType, filterCategory, filterDateFrom, filterDateTo, sortBy, groupBy, role, deleteTransaction } = useApp()
  const [editingTransaction, setEditingTransaction] = useState(null)

  let filtered = transactions
    .filter(t => {
      const matchSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchType = filterType === 'all' || t.type === filterType
      const matchCat = filterCategory === 'all' || t.category === filterCategory
      const matchFrom = !filterDateFrom || new Date(t.date) >= new Date(filterDateFrom)
      const matchTo = !filterDateTo || new Date(t.date) <= new Date(filterDateTo)
      return matchSearch && matchType && matchCat && matchFrom && matchTo
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date)
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date)
      if (sortBy === 'amount-desc') return b.amount - a.amount
      if (sortBy === 'amount-asc') return a.amount - b.amount
      return 0
    })

  if (filtered.length === 0) {
    return (
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        No transactions found.
      </div>
    )
  }

  let groups = []
  if (groupBy === 'none') {
    groups = [{ label: null, items: filtered }]
  } else if (groupBy === 'category') {
    const map = {}
    filtered.forEach(t => { if (!map[t.category]) map[t.category] = []; map[t.category].push(t) })
    groups = Object.entries(map).map(([label, items]) => ({ label, items }))
  } else if (groupBy === 'type') {
    const map = {}
    filtered.forEach(t => { if (!map[t.type]) map[t.type] = []; map[t.type].push(t) })
    groups = Object.entries(map).map(([label, items]) => ({ label: label.charAt(0).toUpperCase() + label.slice(1), items }))
  } else if (groupBy === 'month') {
    const map = {}
    filtered.forEach(t => {
      const key = new Date(t.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
      if (!map[key]) map[key] = []
      map[key].push(t)
    })
    groups = Object.entries(map).map(([label, items]) => ({ label, items }))
  }

  return (
    <>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
      
        <div style={{ display: 'grid', gridTemplateColumns: role === 'admin' ? '1.5fr 1fr 1fr 1fr 80px' : '1.5fr 1fr 1fr 1fr', padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <span>Description</span>
          <span>Category</span>
          <span>Date</span>
          <span>Amount</span>
          {role === 'admin' && <span>Actions</span>}
        </div>

        
        {groups.map(({ label, items }) => (
          <div key={label || 'all'}>
            {label && <GroupHeader label={label} />}
            {items.map((t, i) => (
              <TransactionRow
                key={t.id}
                t={t}
                role={role}
                deleteTransaction={deleteTransaction}
                isLast={i === items.length - 1}
                onEdit={setEditingTransaction}
              />
            ))}
          </div>
        ))}
      </div>

    
      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </>
  )
}

