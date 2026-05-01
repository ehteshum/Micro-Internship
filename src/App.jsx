import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Details from './pages/Details'
import Home from './pages/Home'
import Internships from './pages/Internships'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import DetailsList from './pages/DetailsList'
import Profile from './pages/Profile'
import Applications from './pages/Applications'
import Workspace from './pages/Workspace'
import Pricing from './pages/Pricing'
import Chatbot from './components/Chatbot'
import { ThemeProvider } from './components/ThemeProvider'

// PrivateRoute: protect dashboard from unauthenticated users
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('auth_token') === 'true'
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          <Route
            path="/internships"
            element={
              <PrivateRoute>
                <Internships />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/details/:id"
            element={
              <PrivateRoute>
                <Details />
              </PrivateRoute>
            }
          />
          <Route
            path="/details"
            element={
              <PrivateRoute>
                <DetailsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
           <Route
             path="/profile"
             element={
               <PrivateRoute>
                 <Profile />
               </PrivateRoute>
             }
           />
           <Route
             path="/applications"
             element={
               <PrivateRoute>
                 <Applications />
               </PrivateRoute>
             }
           />
           <Route
             path="/workspace"
             element={
               <PrivateRoute>
                 <Workspace />
               </PrivateRoute>
             }
           />
          </Route>
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
