import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { addCompanyPost } from '../../data/company'

export default function PostInternship() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [duration, setDuration] = useState('4 weeks')
  const [skillInput, setSkillInput] = useState('')
  const [skillTags, setSkillTags] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim()
    if (!trimmedSkill) return
    setSkillTags((current) => Array.from(new Set([...current, trimmedSkill])))
    setSkillInput('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !deadline.trim() || (!skillTags.length && !skillInput.trim())) {
      setError('Please complete all fields before posting the internship.')
      return
    }

    const skills = skillTags.length > 0 ? skillTags : skillInput.split(',').map((skill) => skill.trim()).filter(Boolean)

    addCompanyPost({
      title,
      description,
      deadline,
      duration,
      skills,
      summary: description,
    })

    window.alert('Internship posted successfully.')
    navigate('/company/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-3xl">
        <Card className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary">Post Internship</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">Create a new internship opportunity</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Use the same polished form language as the student experience.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </div>
            )}

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Internship Title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-sky-900/40"
                placeholder="e.g. Product Design Sprint"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-sky-900/40"
                placeholder="Describe what students should build and what success looks like."
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Deadline
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-sky-900/40"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Internship Duration
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-sky-900/40"
                  placeholder="e.g. 4 weeks"
                />
              </label>
            </div>

            <label className="flex flex-col gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Required Skills
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-sky-900/40"
                  placeholder="Add one skill and click Add Skill"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  + Add Skill
                </button>
              </div>
              {skillTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skillTags.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Ready to go live</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Students will see this post in the company dashboard feed.</p>
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Publish Internship
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
