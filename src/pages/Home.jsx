import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { Briefcase, Zap, TrendingUp } from 'lucide-react'

const features = [
  {
    title: 'Real Projects',
    text: 'Work on actual company tasks instead of only theory-based exercises.',
  },
  {
    title: 'Skill Verification',
    text: 'Complete tasks and earn verified proof of what you can do.',
  },
  {
    title: 'Career Growth',
    text: 'Build momentum with a clean, trackable path from application to outcome.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Apply',
    desc: 'Choose a micro internship that matches your interest.',
  },
  {
    num: '02',
    title: 'Complete Task',
    desc: 'Work on a real project from a real company.',
  },
  {
    num: '03',
    title: 'Get Verified',
    desc: 'Show proof of your work and grow your profile.',
  },
]

function Home() {
  const isLoggedIn = localStorage.getItem('auth_token') === 'true'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-6 py-10 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 md:px-16">
      <section className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h1 className="max-w-2xl font-['Outfit'] text-4xl font-bold leading-tight text-gray-900 dark:text-slate-100 sm:text-5xl md:text-6xl lg:text-7xl">
            Gain Real Experience with Micro Internships
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gray-600 dark:text-slate-300 md:text-xl">
            Complete real-world micro internships, save applications, track progress, and submit work in one clean workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={isLoggedIn ? '/internships' : '/signup'}>
              <Button className="min-w-[150px]">Get Started</Button>
            </Link>

            <Link to={isLoggedIn ? '/internships' : '/signup'}>
              <Button
                variant="secondary"
                className="min-w-[150px] border-primary text-primary hover:bg-primary hover:text-white"
              >
                Browse Internships
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm dark:bg-slate-900 dark:text-slate-200">Google</span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm dark:bg-slate-900 dark:text-slate-200">Microsoft</span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm dark:bg-slate-900 dark:text-slate-200">StartupX</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-gray-600 dark:text-slate-300">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-primary">Apply in one click</span>
            <span className="rounded-full bg-accent/10 px-4 py-2 text-accent">Track in dashboard</span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200">Submit in workspace</span>
          </div>
        </div>

        <div className="relative h-[350px] sm:h-[450px] md:h-[480px]">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:block absolute left-6 top-0 w-60 rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 md:left-10"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">UI Design Task</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Google</p>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Deadline: 5 days</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:block absolute right-0 top-36 w-60 rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Progress</h3>
            <p className="mt-2 text-3xl font-bold text-primary">75%</p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Task completion rate</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:block absolute bottom-0 left-12 w-60 rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 md:left-20"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Applications</h3>
            <p className="mt-2 text-xl font-bold text-accent">5 Tasks</p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Active applications</p>
          </motion.div>
        </div>
      </section>

      <section className="mt-20 grid gap-6 text-center md:grid-cols-3">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] dark:bg-slate-900/70 dark:border-slate-800/70">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">500+</h2>
          <p className="text-gray-600 mt-2 font-semibold dark:text-slate-300">Students</p>
        </div>

        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] dark:bg-slate-900/70 dark:border-slate-800/70">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100+</h2>
          <p className="text-gray-600 mt-2 font-semibold dark:text-slate-300">Companies</p>
        </div>

        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] dark:bg-slate-900/70 dark:border-slate-800/70">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-accent to-green-500 bg-clip-text text-transparent">1000+</h2>
          <p className="text-gray-600 mt-2 font-semibold dark:text-slate-300">Tasks</p>
        </div>
      </section>

      <section className="mt-24">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Why Choose InternX</span>
          <h2 className="mt-3 text-center font-['Outfit'] text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100">Real Opportunities. Real Growth.</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => {
            const icons = [Briefcase, Zap, TrendingUp]
            const Icon = icons[idx]
            const gradients = ['from-blue-500 to-sky-500', 'from-orange-500 to-pink-500', 'from-green-500 to-emerald-500']
            return (
              <div
                key={feature.title}
                className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] dark:bg-slate-900/70 dark:border-slate-800/70"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradients[idx]} mb-4`}>
                  <Icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{feature.title}</h3>
                <p className="mt-3 text-gray-600 dark:text-slate-300">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-24">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Simple Process</span>
          <h2 className="mt-3 text-center font-['Outfit'] text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100">Get Started in 3 Steps</h2>
        </div>

        <div className="mt-12 grid gap-8 text-center md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all dark:bg-slate-900/70 dark:border-slate-800/70">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sky-500 text-white font-bold text-lg mb-4">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mt-3">{step.title}</h3>
              <p className="mt-3 text-gray-600 dark:text-slate-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 mb-12">
        <div className="backdrop-blur-xl bg-gradient-to-br from-primary/90 to-sky-600 rounded-3xl p-12 text-center text-white shadow-[0_20px_60px_rgba(14,165,233,0.3)] dark:from-sky-700 dark:to-emerald-700">
          <h2 className="font-['Outfit'] text-4xl md:text-5xl font-bold">Ready to Build Your Future?</h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">Join thousands of students getting real experience at top companies. Start your first microinternship today.</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {isLoggedIn ? (
              <Link to="/internships">
                <Button className="bg-white text-primary hover:bg-gray-100">Explore Opportunities</Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button className="bg-white text-primary hover:bg-gray-100">Get Started Free</Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" className="border-white text-white hover:bg-white/20">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
