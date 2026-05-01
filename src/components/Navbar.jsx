import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import heroLogo from '../assets/internx-logo.svg'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Internships', to: '/internships' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Pricing', to: '/pricing' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const isLoggedIn = localStorage.getItem('auth_token') === 'true'
  const visibleNavItems = isLoggedIn
    ? navItems
    : [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
      ]
  const location = useLocation()
  const isWorkspaceRoute =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/internships') ||
    location.pathname.startsWith('/details') ||
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/applications') ||
    location.pathname.startsWith('/workspace')

  const workspaceCenterNav = [
    { label: 'Internships', to: '/internships' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Applications', to: '/applications' },
    { label: 'Workspace', to: '/workspace' },
    { label: 'Pricing', to: '/pricing' },
  ]

  const userMenuNav = [
    { label: 'Workspace', to: '/workspace' },
    { label: 'Applications', to: '/applications' },
    { label: 'Profile', to: '/profile' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/75">
      <div className="flex w-full items-center px-6 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-primary shadow-sm shadow-sky-500/20">
            <img src={heroLogo} alt="InternX logo" className="h-full w-full object-cover" />
          </div>
          <p className="font-['Outfit'] text-lg font-semibold text-slate-900 dark:text-slate-100">InternX</p>
        </Link>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-6">
          {(isWorkspaceRoute ? workspaceCenterNav : visibleNavItems).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-50 text-primary dark:bg-sky-500/15'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          className="mr-3 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:scale-[1.02] hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 md:flex"
          aria-label="Toggle dark mode"
        >
          {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>

        {isWorkspaceRoute ? (
          <div className="hidden items-center gap-4 md:flex relative">
            <button type="button" className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              <span aria-hidden>🔔</span>
            </button>
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-white">M</div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Mehek</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-12 z-50 w-40 rounded-lg border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                {userMenuNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-lg px-4 py-2 text-sm text-slate-700 transition-all hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {item.label}
                  </Link>
                ))}
                <hr className="my-2 border-slate-200 dark:border-slate-700" />
                <button
                  type="button"
                  onClick={() => {
                    handleLogout()
                    setProfileOpen(false)
                  }}
                  className="w-full text-left block rounded-lg px-4 py-2 text-sm text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-600 hover:shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}

        <button
          type="button"
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-2">
            {(isWorkspaceRoute ? workspaceCenterNav : visibleNavItems).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? 'bg-sky-50 text-primary dark:bg-sky-500/15'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {isWorkspaceRoute && (
              <>
                <hr className="my-2" />
                {userMenuNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-600 transition-all hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
              >
                Logout
              </button>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
