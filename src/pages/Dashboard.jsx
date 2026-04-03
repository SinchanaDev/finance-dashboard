import { motion } from 'framer-motion'
import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart'
import SpendingBreakdownChart from '../components/dashboard/SpendingBreakdownChart'

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SummaryCards />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <BalanceTrendChart />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
          <SpendingBreakdownChart />
        </motion.div>
      </div>
    </div>
  )
}