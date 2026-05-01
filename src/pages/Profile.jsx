import { User, Mail, Award, Bookmark, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const user = {
    name: 'Mehek Khan',
    email: 'mehek@internx.com',
    skills: ['React', 'UI Design', 'JavaScript', 'Tailwind CSS', 'Web Development'],
    internshipsCompleted: 3,
    appliedJobs: 5,
    profileCompletion: 85
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">My Profile</h1>
          <p className="text-gray-500 mt-1 dark:text-slate-400">Manage your profile and track your progress</p>
        </div>

        {/* Main Profile Card */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-8 rounded-2xl shadow-xl dark:bg-slate-900/70 dark:border-slate-800/70">
          <div className="flex justify-between items-start">
            <div className="space-y-6 flex-1">
              {/* Name & Email */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <User className="text-white w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100">{user.name}</h2>
                    <p className="text-gray-500 flex items-center gap-2 mt-1 dark:text-slate-400">
                      <Mail className="w-4 h-4" /> {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/50 p-4 rounded-xl dark:bg-slate-800/50">
                  <p className="text-gray-500 text-sm dark:text-slate-400">Internships Completed</p>
                  <h3 className="text-2xl font-bold text-primary mt-1">{user.internshipsCompleted}</h3>
                </div>
                <div className="bg-white/50 p-4 rounded-xl dark:bg-slate-800/50">
                  <p className="text-gray-500 text-sm dark:text-slate-400">Jobs Applied</p>
                  <h3 className="text-2xl font-bold text-accent mt-1">{user.appliedJobs}</h3>
                </div>
                <div className="bg-white/50 p-4 rounded-xl dark:bg-slate-800/50">
                  <p className="text-gray-500 text-sm dark:text-slate-400">Profile Completion</p>
                  <h3 className="text-2xl font-bold text-green-600 mt-1">{user.profileCompletion}%</h3>
                </div>
              </div>

              {/* Profile Completion Bar */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Profile Completion</p>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-slate-700">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${user.profileCompletion}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-600 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/60"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-xl dark:bg-slate-900/70 dark:border-slate-800/70">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4 dark:text-slate-100">
            <Award className="w-5 h-5 text-primary" />
            Skills & Expertise
          </h2>
          <div className="flex gap-2 flex-wrap">
            {user.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Saved Internships */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-xl dark:bg-slate-900/70 dark:border-slate-800/70">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4 dark:text-slate-100">
            <Bookmark className="w-5 h-5 text-primary" />
            Saved Internships
          </h2>
          <p className="text-gray-500 dark:text-slate-400">You haven't saved any internships yet.</p>
          <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all">
            Explore Internships
          </button>
        </div>

      </div>
    </div>
  )
}
