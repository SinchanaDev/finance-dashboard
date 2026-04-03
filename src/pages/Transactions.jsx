import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'
import { Plus, Download } from 'lucide-react'

function exportCSV(transactions) {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map(t => [t.date, t.description, t.category, t.type, t.amount])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'fintrack_transactions.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function exportJSON(transactions) {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'fintrack_transactions.json'
  a.click()
  URL.revokeObjectURL(url)
}

export default function Transactions() {
  const { role, transactions } = useApp()
  const [showModal, setShowModal] = useState(false)
  const [showExport, setShowExport] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
    
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>All Transactions</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>View and manage your financial activity</div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', position: 'relative' }}>

        
          <div style={{ position: 'relative' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowExport(!showExport)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem 1.1rem', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}
            >
              <Download size={15} /> Export
            </motion.button>

          
            {showExport && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                style={{ position: 'absolute', top: '110%', right: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', zIndex: 50, minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              >
                <button
                  onClick={() => { exportCSV(transactions); setShowExport(false) }}
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  📄 Export CSV
                </button>
                <button
                  onClick={() => { exportJSON(transactions); setShowExport(false) }}
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  📦 Export JSON
                </button>
              </motion.div>
            )}
          </div>

        
          {role === 'admin' && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-green)', color: '#0a0a0f', border: 'none', borderRadius: '10px', padding: '0.6rem 1.1rem', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}
            >
              <Plus size={16} /> Add Transaction
            </motion.button>
          )}
        </div>
      </div>

      <TransactionFilters />
      <TransactionTable />
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </motion.div>
  )
}