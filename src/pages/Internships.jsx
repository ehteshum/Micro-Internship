import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import InternshipCard from '../components/InternshipCard'
import { internships } from '../data/internships'
import { addApplication, applications } from '../data/applications'
import { getApplicationLimit, getUserPlan } from '../data/user'
import { getCompanyPosts, addCompanyApplicant } from '../data/company'

function Internships() {
  const navigate = useNavigate()
  const companyPosts = getCompanyPosts()
  const internshipFeed = [...companyPosts, ...internships]
  const studentName = localStorage.getItem('user_name') || localStorage.getItem('user_email')?.split('@')[0] || 'Student'

  const handleApply = (job) => {
    const limit = getApplicationLimit()
    if (getUserPlan() === 'free' && applications.length >= limit) {
      window.alert('Free plan allows up to 3 applications. Upgrade to Pro to apply more.')
      navigate('/pricing')
      return
    }

    addApplication(job)
    addCompanyApplicant({
      name: studentName,
      skills: job.skills || ['Frontend', 'Communication'],
      project: job.title,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    })
    navigate('/applications')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 md:px-8">
        {/* Premium Header */}
        <header className="mb-2 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold uppercase text-primary tracking-wide">Student Internship Feed</span>
          </div>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 leading-tight">
            Internship Listings
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl dark:text-slate-300">Browse curated company roles and student-friendly internship challenges in one place.</p>
        </header>

        {/* Cards Grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {internshipFeed.map((internship) => (
            <InternshipCard key={internship.id} {...internship} onApply={handleApply} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Internships
