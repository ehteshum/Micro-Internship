import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="min-h-screen bg-pattern text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main className="w-full px-6 py-6 md:px-8 md:py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
