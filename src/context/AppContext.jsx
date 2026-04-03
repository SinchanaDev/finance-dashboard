import { createContext, useContext, useState, useEffect } from 'react'
import { transactions as initialTransactions } from '../data/mockData'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem('fintrack_transactions')
      return stored ? JSON.parse(stored) : initialTransactions
    } catch { return initialTransactions }
  })

  const [role, setRole] = useState(() => localStorage.getItem('fintrack_role') || 'viewer')
  const [theme, setTheme] = useState(() => localStorage.getItem('fintrack_theme') || 'dark')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')
  const [groupBy, setGroupBy] = useState('none')

  const [budgets, setBudgets] = useState(() => {
    try {
      const stored = localStorage.getItem('fintrack_budgets')
      return stored ? JSON.parse(stored) : {
        Food: 3000,
        Entertainment: 2000,
        Utilities: 3000,
        Housing: 20000,
        Health: 2000,
        Shopping: 5000,
        Transport: 3000,
      }
    } catch { return {} }
  })

  useEffect(() => {
    localStorage.setItem('fintrack_budgets', JSON.stringify(budgets))
  }, [budgets])

  useEffect(() => {
    localStorage.setItem('fintrack_transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('fintrack_role', role)
  }, [role])

  useEffect(() => {
    localStorage.setItem('fintrack_theme', theme)
  }, [theme])

  const addTransaction = (tx) => {
    setTransactions(prev => [{ ...tx, id: Date.now() }, ...prev])
  }

  const editTransaction = (id, updated) => {
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, ...updated } : tx))
  }

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id))
  }

  const resetTransactions = () => {
    setTransactions(initialTransactions)
  }

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const totalBalance = totalIncome - totalExpenses

  return (
    <AppContext.Provider value={{
      transactions, role, setRole,
      theme, setTheme,
      searchQuery, setSearchQuery,
      filterType, setFilterType,
      filterCategory, setFilterCategory,
      filterDateFrom, setFilterDateFrom,
      filterDateTo, setFilterDateTo,
      sortBy, setSortBy,
      groupBy, setGroupBy,
      addTransaction, editTransaction, deleteTransaction, resetTransactions,budgets, setBudgets,
      totalIncome, totalExpenses, totalBalance
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)