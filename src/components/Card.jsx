import { motion } from 'framer-motion'

function Card({ className = '', children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 dark:bg-slate-900/70 dark:border-slate-800/70 ${className}`.trim()}
    >
      {children}
    </motion.article>
  )
}

export default Card
