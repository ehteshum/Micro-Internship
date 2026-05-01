import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ListChecks, FolderKanban, UserRound, Settings, LogOut } from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: ListChecks, label: 'Applications', path: '/applications' },
  { icon: FolderKanban, label: 'Workspace', path: '/workspace' },
  { icon: UserRound, label: 'Profile', path: '/profile' },
]

function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_name')
    window.location.href = '/'
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col justify-between border-r border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur-md">
      {/* TOP SECTION */}
      <div>
        <h2 className="mb-6 font-['Outfit'] text-xl font-semibold text-slate-900">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 hover:bg-blue-50 hover:scale-[1.02] ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-600 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50 hover:text-slate-900"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition-all duration-300 hover:scale-[1.02] hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
