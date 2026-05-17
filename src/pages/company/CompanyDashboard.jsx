import { ArrowRight, Briefcase, Users, ClipboardList, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { getCompanyPosts, getCompanyApplicants, getCompanyStats } from '../../data/company'

export default function CompanyDashboard() {
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('user_email') || 'Company'
  const companyName = userEmail.split('@')[0] || 'Company'
  const posts = getCompanyPosts()
  const applicants = getCompanyApplicants()
  const stats = getCompanyStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Company Hub
              </span>
              <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
                Welcome back, {companyName}.
              </h1>
              <p className="max-w-2xl text-gray-600 dark:text-slate-400 mt-2">
                Your hiring dashboard is ready. Post new internships, track applicants, and review student work from one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate('/company/post')}>Post Internship</Button>
              <Button variant="secondary" onClick={() => navigate('/company/applicants')}>
                View Applicants
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Posts" value={stats.totalPosts} icon={<Briefcase className="w-5 h-5" />} />
            <StatCard title="Active Internships" value={stats.activeInternships} icon={<ClipboardList className="w-5 h-5" />} />
            <StatCard title="Applicants" value={stats.applicants} icon={<Users className="w-5 h-5" />} />
            <StatCard title="Reviews Pending" value={stats.reviewPending} icon={<Star className="w-5 h-5" />} />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Recent Internship Posts</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Live internship posts from your company view.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/company/post')}
                className="inline-flex items-center gap-2 text-primary font-medium text-sm transition-colors hover:text-sky-600"
              >
                New Post <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {posts.slice(0, 4).map((post) => (
                <div key={post.id} className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:shadow-lg dark:border-slate-700/70 dark:bg-slate-900/80">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{post.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{post.summary}</p>
                    </div>
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-200">
                      {post.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span>Deadline: {post.deadline}</span>
                    <span>Applicants: {post.applicants}</span>
                    <span className="flex flex-wrap gap-1">
                      {post.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Applicant Activity</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Latest students who have applied through your active posts.</p>
            </div>

            <div className="space-y-3">
              {applicants.slice(0, 4).map((applicant) => (
                <div key={applicant.id} className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/80">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{applicant.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{applicant.project}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      applicant.status === 'Pending'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200'
                        : applicant.status === 'Interview'
                        ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-200'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
                    }`}>
                      {applicant.status}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
                    {applicant.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:shadow-lg dark:border-slate-700/70 dark:bg-slate-900/80">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">{value}</h3>
        </div>
        <div className="text-primary">{icon}</div>
      </div>
    </div>
  )
}
