import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { getCompanyApplicants } from '../../data/company'

export default function Applicants() {
  const navigate = useNavigate()
  const applicants = getCompanyApplicants()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-primary">Applicants</p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Review students who have applied</h1>
          <p className="max-w-2xl text-gray-600 dark:text-slate-400">See applicant skill sets, current status, and jump into reviewing the strongest submissions.</p>
        </div>

        <div className="grid gap-4">
          {applicants.length === 0 ? (
            <Card className="text-center">
              <p className="text-slate-500 dark:text-slate-400">No applicants yet. New student applications will appear here after they apply.</p>
            </Card>
          ) : (
            applicants.map((applicant) => (
              <Card key={applicant.id} className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{applicant.name}</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{applicant.project}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 sm:text-right">
                    <span>Applied: {applicant.appliedDate || 'N/A'}</span>
                    <span>{applicant.skills.slice(0, 3).join(', ')}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 items-start sm:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        applicant.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
                          : applicant.status === 'Interview'
                          ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-200'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200'
                      }`}
                    >
                      {applicant.status}
                    </span>
                    <Button variant="secondary" onClick={() => navigate('/company/review')}>
                      View Submission
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
