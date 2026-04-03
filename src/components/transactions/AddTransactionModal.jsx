import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { X } from 'lucide-react'

const categories = ['Food', 'Entertainment', 'Utilities', 'Housing', 'Health', 'Shopping', 'Transport', 'Salary', 'Freelance', 'Investment']

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useApp()
  const [form, setForm] = useState({ description: '', amount: '', type: 'expense', category: 'Food', date: new Date().toISOString().split('T')[0] })

  const handleSubmit = () => {
    if (!form.description || !form.amount) return
    addTransaction({ ...form, amount: parseFloat(form.amount) })
    onClose()
  }

  const inputStyle = {
    background: '#1a1a24',
    border: '1px solid #2a2a3a',
    borderRadius: '10px',
    color: '#f0f0f5',
    padding: '0.65rem 0.75rem',
    fontSize: '0.85rem',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    width: '100%',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#111118', border: '1px solid #2a2a3a', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '440px' }}>
        
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#f0f0f5' }}>Add Transaction</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#7070a0' }}><X size={20} /></button>
        </div>

  
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#7070a0', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Description</label>
            <input style={inputStyle} placeholder="e.g. Swiggy Order" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#7070a0', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Amount (₹)</label>
            <input style={inputStyle} type="number" placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#7070a0', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Type</label>
              <select style={inputStyle} value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#7070a0', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Category</label>
              <select style={inputStyle} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                {categories.map(c => <option key={c} value={c} style={{ background: '#1a1a24' }}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#7070a0', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</label>
            <input style={inputStyle} type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          </div>
          <button onClick={handleSubmit} style={{ background: '#00e5a0', color: '#0a0a0f', border: 'none', borderRadius: '10px', padding: '0.75rem', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', marginTop: '0.5rem' }}>
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  )
}