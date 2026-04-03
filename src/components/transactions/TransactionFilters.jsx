import { useApp } from '../../context/AppContext'
import { Search, X } from 'lucide-react'

const categories = ['all', 'Food', 'Entertainment', 'Utilities', 'Housing', 'Health', 'Shopping', 'Transport', 'Salary', 'Freelance', 'Investment']

export default function TransactionFilters() {
  const {
    searchQuery, setSearchQuery,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    filterDateFrom, setFilterDateFrom,
    filterDateTo, setFilterDateTo,
    sortBy, setSortBy,
    groupBy, setGroupBy,
  } = useApp()

  const hasActiveFilters = searchQuery || filterType !== 'all' || filterCategory !== 'all' || filterDateFrom || filterDateTo || groupBy !== 'none'

  const clearAll = () => {
    setSearchQuery('')
    setFilterType('all')
    setFilterCategory('all')
    setFilterDateFrom('')
    setFilterDateTo('')
    setSortBy('date-desc')
    setGroupBy('none')
  }

  const selectStyle = {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    padding: '0.5rem 0.75rem',
    fontSize: '0.85rem',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    cursor: 'pointer',
  }

  const dateStyle = {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    padding: '0.5rem 0.75rem',
    fontSize: '0.85rem',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    cursor: 'pointer',
    colorScheme: 'dark',
  }

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

    
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>

      
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.5rem 0.75rem', flex: 1, minWidth: '200px' }}>
          <Search size={15} color='#7070a0' />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif', width: '100%' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#7070a0', padding: 0, display: 'flex' }}>
              <X size={14} />
            </button>
          )}
        </div>

        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={selectStyle}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={selectStyle}>
          {categories.map(c => (
            <option key={c} value={c} style={{ background: 'var(--bg-elevated)' }}>{c === 'all' ? 'All Categories' : c}</option>
          ))}
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

    
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>From</span>
          <input
            type="date"
            value={filterDateFrom}
            onChange={e => setFilterDateFrom(e.target.value)}
            style={dateStyle}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>To</span>
          <input
            type="date"
            value={filterDateTo}
            onChange={e => setFilterDateTo(e.target.value)}
            style={dateStyle}
          />
        </div>

        <select value={groupBy} onChange={e => setGroupBy(e.target.value)} style={selectStyle}>
          <option value="none">No Grouping</option>
          <option value="category">Group by Category</option>
          <option value="type">Group by Type</option>
          <option value="month">Group by Month</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.3)', borderRadius: '10px', color: '#ff4d6d', padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', fontWeight: 600 }}
          >
            <X size={13} /> Clear All
          </button>
        )}
      </div>
    </div>
  )
}

