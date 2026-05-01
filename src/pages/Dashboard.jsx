import { Briefcase, CheckCircle, Clock, AlertCircle, ArrowRight, BadgeHelp, Star, X } from 'lucide-react'
import { applications, getApplicationStats } from '../data/applications'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { getUserPlan } from '../data/user'

export default function Dashboard() {
  const userName = localStorage.getItem('user_name') || 'Student'
  const navigate = useNavigate()
  const stats = getApplicationStats()
  const [mentor, setMentor] = useState(null)
  const [reply, setReply] = useState('')
  const [messages, setMessages] = useState([])
  const [showConversation, setShowConversation] = useState(true)
  const userPlan = getUserPlan()

  const mentorFeedback = 'Good work! Improve spacing and typography before the final submission.'

  const handleMentorHelp = () => {
    setMentor({
      name: 'John Doe',
      role: 'UI/UX Mentor',
      responseTime: 'Avg. response: 12 min',
      rating: '4.9/5',
      feedback: mentorFeedback
    })
    setMessages([{ sender: 'mentor', text: mentorFeedback }])
  }

  const handleReply = () => {
    const trimmedReply = reply.trim()
    if (!trimmedReply) return

    setMessages((currentMessages) => [
      ...currentMessages,
      { sender: 'user', text: trimmedReply },
      { sender: 'mentor', text: 'Good progress. Keep that change and share the updated version.' },
    ])
    setReply('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-12 gap-6">
        {/* 🧠 MAIN CONTENT */}
        <div className="col-span-8 space-y-6">
          
          {/* WELCOME HEADER */}
          <section>
            <div className="mb-3 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {userPlan.toUpperCase()} PLAN
            </div>
            <h1 className="font-['Outfit'] text-3xl font-bold text-gray-900 dark:text-slate-100 md:text-4xl">
              Welcome back, {userName}!
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-1">Track your applications and progress here.</p>
          </section>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard title="Applied" value={stats.total} icon={<Briefcase className="w-5 h-5" />} color="text-primary" />
            <StatCard title="Open" value={stats.open} icon={<CheckCircle className="w-5 h-5" />} color="text-emerald-500" />
            <StatCard title="Closing" value={stats.closing} icon={<AlertCircle className="w-5 h-5" />} color="text-amber-500" />
            <StatCard title="Completed" value={stats.completed} icon={<Clock className="w-5 h-5" />} color="text-gray-500" />
          </div>

          {/* RECENT APPLICATIONS */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg dark:bg-slate-900/70 dark:border dark:border-slate-800/70 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-['Outfit'] text-xl font-semibold text-gray-900 dark:text-slate-100">Recent Applications</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">Latest activity from your internship flow.</p>
              </div>
              <button
                onClick={() => navigate('/applications')}
                className="inline-flex items-center gap-2 text-primary hover:text-sky-600 font-medium text-sm transition-colors"
              >
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {applications.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <AppItem title={item.title} company={item.company} status={item.status} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 📊 RIGHT PANEL */}
        <div className="col-span-4 space-y-6">
          {/* FOCUS CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="p-6 rounded-2xl shadow-lg text-white bg-gradient-to-br from-primary to-accent dark:from-sky-600 dark:to-emerald-600"
          >
            <p className="text-xs uppercase tracking-widest font-semibold text-white/80">Focus Mode</p>
            <h2 className="font-['Outfit'] text-2xl font-bold mt-2">Apply, track, submit.</h2>
            <p className="text-sm text-white/90 mt-2">
              Your most important product loop is now visible on one screen.
            </p>
          </motion.div>

          {/* MENTOR SUPPORT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white/70 backdrop-blur-xl p-5 rounded-2xl shadow-lg dark:bg-slate-900/70 dark:border dark:border-slate-800/70 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <BadgeHelp className="w-5 h-5 text-primary" />
                  <h2 className="font-['Outfit'] font-semibold text-gray-900 dark:text-slate-100">Mentor Support</h2>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Request help and get demo feedback.</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <Star className="w-3.5 h-3.5" /> Active
              </span>
            </div>

            <button
              onClick={handleMentorHelp}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.01] hover:shadow-lg"
            >
              Request Mentor Help
            </button>

            {mentor && showConversation && (
              <div className="relative space-y-4 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                <button
                  onClick={() => setShowConversation(false)}
                  className="absolute right-3 top-3 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-red-500 dark:hover:bg-slate-800"
                  aria-label="Hide conversation"
                >
                  <X size={16} />
                </button>

                <div className="flex items-start justify-between gap-3 pr-8">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{mentor.name}</p>
                    <p className="text-xs text-gray-600 dark:text-slate-300">{mentor.role}</p>
                  </div>
                  <div className="text-right text-[11px] text-gray-600 dark:text-slate-300">
                    <p>{mentor.responseTime}</p>
                    <p>{mentor.rating}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.sender}-${index}`}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-2xl px-3 py-2 text-sm leading-6 ${
                          message.sender === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 rounded-2xl bg-white/70 p-4 dark:bg-slate-900/60">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-slate-100">Your Reply</h3>
                  <div className="flex gap-2">
                    <input
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                      placeholder="Reply to mentor..."
                      className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />

                    <button
                      onClick={handleReply}
                      className="rounded-xl bg-primary px-4 text-sm font-semibold text-white transition hover:scale-[1.01] hover:shadow-lg"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {mentor && !showConversation && (
              <button
                onClick={() => setShowConversation(true)}
                className="w-full rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Show Conversation
              </button>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  )
}

/* 🔹 COMPONENTS */

function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl shadow-lg dark:bg-slate-900/70 dark:border dark:border-slate-800/70 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400 font-semibold">{title}</p>
          <h3 className="font-['Outfit'] text-3xl font-bold text-gray-900 dark:text-slate-100 mt-1">{value}</h3>
        </div>
        <div className={`${color}`}>{icon}</div>
      </div>
    </motion.div>
  )
}

function AppItem({ title, company, status }) {
  const statusStyles = {
    Open: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    'Closing Soon': 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Completed: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  }

  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-white/50 border border-gray-200/50 dark:bg-slate-800/40 dark:border-slate-700/50 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-slate-100">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">{company}</p>
      </div>

      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyles[status] || statusStyles.Open}`}>
        {status}
      </span>
    </div>
  )
}

function MiniCard({ label, value }) {
  return (
    <div className="bg-gray-50 dark:bg-slate-800/60 p-4 rounded-lg border border-gray-100 dark:border-slate-700/50">
      <p className="text-gray-500 dark:text-slate-400 text-xs uppercase tracking-wide font-semibold">{label}</p>
      <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900 dark:text-slate-100 mt-1">{value}</h3>
    </div>
  )
}
