import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { getUserPlan, upgradePlan } from '../data/user'

function Feature({ text }) {
  return (
    <li className="flex items-center gap-2">
      <Check size={16} className="text-green-500" />
      {text}
    </li>
  )
}

export default function Pricing() {
  const navigate = useNavigate()
  const currentPlan = getUserPlan()

  const handleUpgrade = () => {
    upgradePlan()
    window.alert('Upgraded to Pro 🚀')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 px-6 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      {/* HEADER */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Freemium Subscription
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-100">Simple, Transparent Pricing</h1>
        <p className="mt-3 text-gray-500 dark:text-slate-400">Start free. Upgrade when you’re ready to unlock full potential.</p>
        <div className="mt-5 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
          Current Plan: {currentPlan.toUpperCase()}
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
        {/* FREE PLAN */}
        <div className="rounded-3xl border border-gray-100 bg-white/70 p-8 shadow-lg backdrop-blur-xl transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">Free</h2>
          <p className="mt-2 text-gray-500 dark:text-slate-400">Perfect for getting started</p>

          <h3 className="mt-6 text-3xl font-bold text-gray-900 dark:text-slate-100">$0</h3>

          <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-slate-300">
            <Feature text="3 Applications" />
            <Feature text="Basic Dashboard" />
            <Feature text="Limited Task Access" />
            <Feature text="No Mentor Support" />
          </ul>

          <button
            type="button"
            className="mt-8 w-full rounded-xl border border-gray-300 py-2 font-medium text-gray-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            disabled
          >
            Current Plan
          </button>
        </div>

        {/* PRO PLAN */}
        <div className="relative scale-105 rounded-3xl border border-primary bg-white/90 p-8 shadow-[0_20px_60px_rgba(14,165,233,0.3)] backdrop-blur-xl dark:bg-slate-900/90">
          <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs text-white">
            Most Popular
          </span>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">Pro</h2>
          <p className="mt-2 text-gray-500 dark:text-slate-400">For serious learners</p>

          <h3 className="mt-6 text-3xl font-bold text-primary">$9/mo</h3>

          <ul className="mt-6 space-y-3 text-sm text-gray-700 dark:text-slate-300">
            <Feature text="Unlimited Applications" />
            <Feature text="Full Dashboard Access" />
            <Feature text="Mentor Support" />
            <Feature text="Priority Selection" />
            <Feature text="Skill Verification Boost" />
          </ul>

          <button
            type="button"
            onClick={handleUpgrade}
            className="mt-8 w-full rounded-xl bg-primary py-2 font-medium text-white shadow transition hover:scale-105 hover:shadow-lg"
          >
            Upgrade Now
          </button>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <p className="mt-10 text-center text-sm text-gray-400 dark:text-slate-500">No credit card required. Cancel anytime.</p>
    </div>
  )
}
