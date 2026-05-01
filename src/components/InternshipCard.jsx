import { Link } from 'react-router-dom'
import { Briefcase, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const statusStyles = {
  Open: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  'Closing Soon': 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Completed: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
}

function InternshipCard({ id, title, company, deadline, duration, status = 'Open', onApply }) {
  const handleApply = () => {
    if (onApply) {
      onApply({ id, title, company, deadline, duration, status })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-lg rounded-2xl p-6 text-slate-800 hover:shadow-2xl transition-all duration-300 dark:bg-slate-900/70 dark:border-slate-800/70 dark:text-slate-100"
    >
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 bg-primary/10 rounded-xl shrink-0">
            <Briefcase className="text-primary w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-800 leading-tight truncate dark:text-slate-100">{title}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{company}</p>
          </div>
        </div>

        <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${statusStyles[status] || statusStyles.Open}`}>
          {status}
        </span>
      </div>

      <div className="mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
        <Clock className="w-4 h-4" />
        <span>Deadline: {deadline}</span>
      </div>

      <div className="mb-4 flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500">
        <CheckCircle2 className="w-4 h-4" />
        <span>{duration} project window</span>
      </div>

      <div className="mb-4 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-slate-700"></div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleApply}
          className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow transition-all duration-300 hover:scale-105 hover:shadow-lg dark:shadow-sky-950/30"
        >
          Apply
        </button>
        <Link to={`/details/${id}`} className="flex-1">
          <button className="w-full border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            Details <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

export default InternshipCard
