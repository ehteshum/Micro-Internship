import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }

    // Fake auth: accept any email/password combo
    localStorage.setItem('auth_token', 'true')
    localStorage.setItem('user_email', email)
    window.alert(`Welcome, ${email}! You're now logged in.`)
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-4 sm:px-6 sm:py-6">
      <Card className="p-6 sm:p-8">
        <h1 className="mb-2 font-['Outfit'] text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">Welcome Back</h1>
        <p className="mb-6 text-gray-500 dark:text-slate-400">Login to track applications and your progress.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</div>
          )}

          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-sky-900/40"
              placeholder="you@example.com"
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
            Sign In
          </Button>
        </form>

        <div className="mt-6 border-t border-slate-100 pt-4 text-center dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:text-sky-600">
              Sign up here
            </Link>
          </p>
        </div>

        {/* <div className="mt-4 rounded-lg bg-blue-50 p-3 text-center text-xs text-slate-600 dark:bg-sky-950/30 dark:text-sky-300">
          Demo: Use any email/password to login
        </div> */}
      </Card>
    </div>
  )
}

export default Login
