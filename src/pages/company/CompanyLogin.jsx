import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Card from '../../components/Card'

export default function CompanyLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const parseNameFromEmail = (email) => {
    const identity = email.split('@')[0].replace(/[._]/g, ' ')
    return identity
      .split(' ')
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(' ')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }

    const isCompanyLogin = email.toLowerCase().includes('@company')
    if (!isCompanyLogin) {
      setError('Please use your company email to access the hiring portal.')
      return
    }

    const userName = parseNameFromEmail(email)
    localStorage.setItem('auth_token', 'true')
    localStorage.setItem('user_email', email)
    localStorage.setItem('user_name', userName)
    localStorage.setItem('user_role', 'company')
    window.alert(`Welcome, ${userName}! You are now in company mode.`)
    navigate('/company/dashboard')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-4 sm:px-6 sm:py-6">
      <Card className="p-6 sm:p-8">
        <h1 className="mb-2 font-['Outfit'] text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">
          Company Access Portal
        </h1>
        <p className="mb-6 text-gray-500 dark:text-slate-400">
          Log in with your company email to post internships, review applicants, and manage submissions.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}

          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Company Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-sky-900/40"
              placeholder="name@company.com"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-sky-900/40"
              placeholder="••••••••"
            />
          </label>

          <Button type="submit" className="mt-2 w-full">
            Access Company Dashboard
          </Button>
        </form>

        <div className="mt-6 border-t border-slate-100 pt-4 text-center dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Need the student view?{' '}
            <Link to="/login" className="font-semibold text-primary hover:text-sky-600">
              Login here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
