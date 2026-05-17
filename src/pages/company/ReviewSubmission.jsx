import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { getReviewSubmissions, approveSubmission, saveReviewFeedback } from '../../data/company'

export default function ReviewSubmission() {
  const navigate = useNavigate()
  const allReviews = useMemo(() => getReviewSubmissions(), [])
  const [reviews, setReviews] = useState(allReviews)
  const [selectedReviewId, setSelectedReviewId] = useState(reviews[0]?.id || null)
  const [feedback, setFeedback] = useState(reviews[0]?.feedback || '')
  const [uploadedFile, setUploadedFile] = useState(null)

  const selectedReview = reviews.find((review) => review.id === selectedReviewId)

  const refreshReviews = () => {
    const updated = getReviewSubmissions()
    setReviews(updated)
    const active = updated.find((item) => item.id === selectedReviewId) || updated[0]
    setSelectedReviewId(active?.id || null)
    setFeedback(active?.feedback || '')
  }

  const handleUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleApprove = () => {
    if (!selectedReviewId) return
    approveSubmission(selectedReviewId)
    window.alert('Submission approved.')
    refreshReviews()
  }

  const handleSaveFeedback = () => {
    if (!selectedReviewId) return
    saveReviewFeedback(selectedReviewId, feedback.trim())
    window.alert('Feedback saved.')
    refreshReviews()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-primary">Review Submission</p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Review student work and approve top submissions</h1>
          <p className="max-w-2xl text-gray-600 dark:text-slate-400">Use consistent feedback and an approval workflow to make the company view feel like a real platform.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_0.6fr]">
          <div className="space-y-4">
            <Card className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Submissions</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Choose a submission to review.</p>
                </div>
                <Button variant="secondary" onClick={() => navigate('/company/applicants')}>
                  Back to Applicants
                </Button>
              </div>

              <div className="grid gap-3">
                {reviews.map((review) => (
                  <button
                    type="button"
                    key={review.id}
                    onClick={() => {
                      setSelectedReviewId(review.id)
                      setFeedback(review.feedback || '')
                    }}
                    className={`rounded-3xl border p-4 text-left transition-all ${
                      review.id === selectedReviewId
                        ? 'border-primary bg-sky-50 dark:border-sky-500 dark:bg-slate-800/80'
                        : 'border-slate-200 bg-white/80 hover:border-slate-300 dark:border-slate-700/70 dark:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{review.studentName}</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{review.fileName}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        review.reviewed
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200'
                      }`}>
                        {review.reviewed ? 'Reviewed' : 'Pending'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {selectedReview ? (
              <Card className="space-y-5">
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{selectedReview.studentName}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{selectedReview.notes}</p>
                    </div>
                    <a
                      href={selectedReview.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
                    >
                      View Project
                    </a>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-900/80">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Submitted File</p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{selectedReview.fileName}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-900/80">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Project Preview</p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">A clean project preview helps you verify submissions quickly.</p>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-3xl bg-white/80 p-4 shadow-sm dark:bg-slate-900/80">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Upload Updated File</p>
                    <input type="file" onChange={handleUpload} className="w-full text-sm text-slate-700 dark:text-slate-200" />
                    {uploadedFile && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">Selected file: {uploadedFile.name}</p>
                    )}
                  </div>

                  <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-900/80">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Mentor Feedback</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{selectedReview.notes}</p>
                  </div>
                </div>

                <label className="flex flex-col gap-3">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Company Feedback</span>
                  <textarea
                    rows={5}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[160px] rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-sky-900/40"
                    placeholder="Good work. Improve responsiveness and reuse the same card style for the final flow."
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                  <Button onClick={handleSaveFeedback}>Save Feedback</Button>
                  <Button variant="success" onClick={handleApprove}>
                    Approve Skill
                  </Button>
                </div>
              </Card>
            ) : (
              <Card>
                <p className="text-sm text-slate-500 dark:text-slate-400">Select a submission to review from the list.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
