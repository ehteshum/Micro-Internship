import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Briefcase } from 'lucide-react'
import { internships } from '../data/internships'
import { addApplication, applications } from '../data/applications'
import { getApplicationLimit, getUserPlan } from '../data/user'

function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const internship = internships.find((item) => item.id === id)
  const isLoggedIn = localStorage.getItem('auth_token') === 'true'

  const handleApply = () => {
    if (!isLoggedIn) {
      window.alert('Please login first to apply for this internship.')
      navigate('/login')
      return
    }

    const limit = getApplicationLimit()
    if (getUserPlan() === 'free' && applications.length >= limit) {
      window.alert('Free plan allows up to 3 applications. Upgrade to Pro to apply more.')
      navigate('/pricing')
      return
    }

    addApplication(internship)
    window.alert('Applied successfully! Redirecting to dashboard.')
    navigate('/dashboard')
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-6 shadow-lg max-w-md dark:bg-slate-900/70 dark:border-slate-800/70">
          <h1 className="mb-2 font-['Outfit'] text-2xl font-semibold text-gray-900 dark:text-slate-100">Internship not found</h1>
          <p className="text-gray-600 dark:text-slate-400">This internship may have been removed or the link is incorrect.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-primary hover:text-sky-600 transition-colors font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </button>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all dark:bg-slate-900/70 dark:border-slate-800/70">
          {/* Company Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="text-primary w-5 h-5" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{internship.company}</p>
          </div>

          {/* Main Title */}
              <h1 className="mb-4 font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100">{internship.title}</h1>

          {/* Meta Information */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <MapPin className="text-gray-400 w-5 h-5" />
              <div>
                <p className="text-xs text-gray-500 uppercase dark:text-slate-400">Location</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{internship.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-400 w-5 h-5" />
              <div>
                <p className="text-xs text-gray-500 uppercase dark:text-slate-400">Deadline</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{internship.deadline}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 dark:text-slate-100">About this opportunity</h2>
            <p className="text-gray-700 leading-relaxed dark:text-slate-300">{internship.description}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleApply}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
            >
              {isLoggedIn ? 'Apply Now' : 'Login to Apply'}
            </button>
            <Link to="/internships" className="flex-1">
              <button className="w-full border border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 font-semibold dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                Back to Listings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
