import { Upload, CheckCircle, Clock, FileText } from 'lucide-react'
import { useState } from 'react'

export default function Workspace() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [mentor, setMentor] = useState(null)

  const task = {
    title: 'UI Design Task',
    company: 'StartupX',
    description: 'Design a mobile-first user interface for a food delivery application.',
    requirements: [
      'Create a clean and intuitive UI',
      'Focus on mobile responsiveness',
      'Follow modern design principles',
      'Include at least 5 screens',
      'Provide design mockups or figma file'
    ],
    deadline: 'May 10, 2026',
    status: 'Active',
    daysLeft: 10,
    resources: [
      { title: 'Design Brief', link: '#' },
      { title: 'Reference Materials', link: '#' }
    ]
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = () => {
    if (selectedFile) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setSelectedFile(null)
      }, 3000)
    }
  }

  const handleMentorRequest = () => {
    setMentor({
      name: 'John Doe',
      role: 'UI/UX Mentor',
      responseTime: 'Avg. response: 12 min',
      rating: '4.9/5',
      feedback: 'Good work! Improve spacing, hierarchy, and typography for a cleaner presentation.'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">Project Workspace</h1>
          <p className="text-gray-500 mt-1 dark:text-slate-400">Work on your micro internship task and submit when ready</p>
        </div>

        {/* Task Card */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-xl dark:bg-slate-900/70 dark:border-slate-800/70">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100">{task.title}</h2>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium dark:bg-sky-500/15 dark:text-sky-300">
                  {task.status}
                </span>
              </div>
              <p className="text-gray-500 dark:text-slate-400">{task.company}</p>
            </div>
            <div className="text-right">
              <Clock className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-xl font-bold text-accent">{task.daysLeft} days</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">until deadline</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Task Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-slate-700">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-1/3"></div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2 dark:text-slate-100">Task Description</h3>
            <p className="text-gray-600 dark:text-slate-300">{task.description}</p>
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 dark:text-slate-100">Requirements</h3>
            <div className="space-y-2">
              {task.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-slate-300">{req}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 dark:text-slate-100">Resources</h3>
            <div className="flex gap-3">
              {task.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.link}
                  className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-lg hover:bg-white/80 transition-all text-primary font-medium dark:bg-slate-800/60 dark:hover:bg-slate-800"
                >
                  <FileText className="w-4 h-4" />
                  {resource.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Submission Card */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-xl dark:bg-slate-900/70 dark:border-slate-800/70">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-slate-100">Submit Your Work</h2>

          {!submitted ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors dark:border-slate-700 dark:hover:border-sky-500">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2 dark:text-slate-300">Drag and drop your design file or click to browse</p>
                <p className="text-xs text-gray-500 mb-4 dark:text-slate-400">Supported: .zip, .figma, .psd, .xd, .pdf (Max 50MB)</p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".zip,.pdf,.psd,.xd*"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all cursor-pointer font-medium"
                >
                  Choose File
                </label>
              </div>

              {selectedFile && (
                <div className="bg-white/50 p-4 rounded-lg flex justify-between items-center dark:bg-slate-800/50">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-slate-100">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedFile}
                  className="flex-1 bg-primary text-white px-4 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Submit Project
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all font-medium dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                  Save as Draft
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Submitted Successfully!</h3>
              <p className="text-gray-500">Your project has been received. The team will review it shortly.</p>
            </div>
          )}
        </div>

        {/* Mentor Support */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-xl dark:bg-slate-900/70 dark:border-slate-800/70">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">Mentor Support</h2>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  Mentor Active
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                Need guidance? Request help from a mentor and get demo feedback instantly.
              </p>
            </div>

            <button
              onClick={handleMentorRequest}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
            >
              Request Mentor Help
            </button>
          </div>

          {mentor && (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-500/10">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Assigned Mentor
                </p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-slate-100">{mentor.name}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-300">{mentor.role}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600 dark:text-slate-300">
                    <p>{mentor.responseTime}</p>
                    <p>{mentor.rating}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/70 p-5 shadow-sm dark:bg-slate-800/60">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
                  Mentor Feedback
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-slate-300">
                  &quot;{mentor.feedback}&quot;
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-xl">
            <h3 className="font-semibold text-gray-800 mb-3 dark:text-slate-100">📝 Notes & Guidelines</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-300">
            <li>✓ Make sure your designs are clean and well-organized</li>
            <li>✓ Include all requested screens mentioned in the requirements</li>
            <li>✓ Add comments explaining your design decisions</li>
            <li>✓ Double check before submitting - no resubmissions allowed</li>
          </ul>
        </div>

      </div>
    </div>
  )
}
