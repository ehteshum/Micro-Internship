import { CheckCircle, Clock, AlertCircle, Trash2, Inbox } from 'lucide-react'
import { applications, removeApplication } from '../data/applications'

const statusStyles = {
  Open: 'bg-emerald-100 text-emerald-700',
  'Closing Soon': 'bg-amber-100 text-amber-700',
  Completed: 'bg-slate-200 text-slate-700',
}

export default function Applications() {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5" />
      case 'Closing Soon':
        return <Clock className="w-5 h-5" />
      default:
        return <AlertCircle className="w-5 h-5" />
    }
  }

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === 'Open').length,
    inProgress: applications.filter((a) => a.status === 'Closing Soon').length,
    completed: applications.filter(a => a.status === 'Completed').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">My Applications</h1>
          <p className="text-gray-500 mt-1 dark:text-slate-400">Track all your micro internship applications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total', count: stats.total, color: 'from-blue-400 to-blue-600' },
            { label: 'Open', count: stats.applied, color: 'from-emerald-400 to-emerald-600' },
            { label: 'Closing Soon', count: stats.inProgress, color: 'from-amber-400 to-amber-600' },
            { label: 'Completed', count: stats.completed, color: 'from-green-400 to-green-600' }
          ].map((stat, i) => (
            <div
              key={i}
              className="backdrop-blur-xl bg-white/70 border border-white/40 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform dark:bg-slate-900/70 dark:border-slate-800/70"
            >
              <p className="text-gray-500 text-sm dark:text-slate-400">{stat.label}</p>
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mt-1`}>
                {stat.count}
              </h3>
            </div>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-8 rounded-2xl shadow-lg text-center dark:bg-slate-900/70 dark:border-slate-800/70">
              <Inbox className="mx-auto mb-3 w-10 h-10 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">No applications yet</h2>
              <p className="text-gray-500 mt-2 dark:text-slate-400">Apply to an internship to see it here.</p>
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="backdrop-blur-xl bg-white/70 border border-white/40 p-5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all dark:bg-slate-900/70 dark:border-slate-800/70"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">{app.title}</h2>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusStyles[app.status] || statusStyles.Open}`}>
                        {getStatusIcon(app.status)}
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 dark:text-slate-400">{app.company}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-slate-400">
                      <span>📅 Applied: {app.appliedDate}</span>
                      {app.deadline && <span>⏰ Deadline: {app.deadline}</span>}
                      {app.completedDate && <span>✅ Completed: {app.completedDate}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-white/50 rounded-lg">
                      💬
                    </button>
                    <button
                      type="button"
                      onClick={() => removeApplication(app.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-white/50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
