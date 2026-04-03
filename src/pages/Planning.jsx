import { motion } from 'framer-motion'
import BudgetTracker from '../components/dashboard/BudgetTracker'
import SpendingForecast from '../components/dashboard/SpendingForecast'
import HealthScore from '../components/dashboard/HealthScore'

export default function Planning() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
    
      <HealthScore />

    
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <BudgetTracker />
        <SpendingForecast />
      </div>
    </motion.div>
  )
}