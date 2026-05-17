import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
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
import CompanyLogin from './pages/company/CompanyLogin'
import CompanyDashboard from './pages/company/CompanyDashboard'
import PostInternship from './pages/company/PostInternship'
import CompanyApplicants from './pages/company/Applicants'
import ReviewSubmission from './pages/company/ReviewSubmission'
import Chatbot from './components/Chatbot'
import { ThemeProvider } from './components/ThemeProvider'

// PrivateRoute: protect dashboard from unauthenticated users and company-only routes
function PrivateRoute({ children }) {
  const location = useLocation()
  const isLoggedIn = localStorage.getItem('auth_token') === 'true'
  const userRole = localStorage.getItem('user_role')
  const isCompanyPage = location.pathname.startsWith('/company')

  if (!isLoggedIn) {
    return <Navigate to={isCompanyPage ? '/company/login' : '/login'} replace />
  }

  if (isCompanyPage && userRole !== 'company') {
    return <Navigate to="/company/login" replace />
  }

  return children
}

// ChatbotWrapper: hide chatbot on company routes
function ChatbotWrapper() {
  const location = useLocation()
  const isCompanyRoute = location.pathname.startsWith('/company')
  
  if (isCompanyRoute) return null
  return <Chatbot />
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
           <Route path="/company/login" element={<CompanyLogin />} />
           <Route
             path="/company/dashboard"
             element={
               <PrivateRoute>
                 <CompanyDashboard />
               </PrivateRoute>
             }
           />
           <Route
             path="/company/post"
             element={
               <PrivateRoute>
                 <PostInternship />
               </PrivateRoute>
             }
           />
           <Route
             path="/company/applicants"
             element={
               <PrivateRoute>
                 <CompanyApplicants />
               </PrivateRoute>
             }
           />
           <Route
             path="/company/reviews"
             element={
               <PrivateRoute>
                 <ReviewSubmission />
               </PrivateRoute>
             }
           />
           <Route
             path="/company/review"
             element={
               <PrivateRoute>
                 <ReviewSubmission />
               </PrivateRoute>
             }
           />
          </Route>
        </Routes>
        <ChatbotWrapper />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
