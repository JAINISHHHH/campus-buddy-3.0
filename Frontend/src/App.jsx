import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './components/layout/Sidebar'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import FacultyDashboard from './pages/FacultyDashboard'
import AdminDashboard from './pages/AdminDashboard'
import VirtualTour from './pages/VirtualTour'
import LostFound from './pages/LostFound'
import Chatbot from './pages/Chatbot'
import ComplaintBox from './pages/ComplaintBox'
import Faculty from './pages/Faculty'
import PageTransition from './components/layout/PageTransition'
import { useAuth } from './context/AuthContext'

// ─── Role-based dashboard resolver ──────────────────────────────────────────
function RoleDashboard() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" replace />
  if (user.role === 'faculty') return <FacultyDashboard />
  if (user.role === 'admin')   return <AdminDashboard />
  return <StudentDashboard />
}

// ─── Guard: redirect to login if not authenticated ───────────────────────────
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" replace />
  return children
}

// ─── Guard: redirect to dashboard if already logged in ──────────────────────
function PublicRoute({ children }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

// ─── Layout wrapper for authenticated pages ──────────────────────────────────
function AppLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden dark:bg-surface-dark bg-surface-light">
      <Sidebar />
      <main className="flex-1 overflow-auto flex flex-col">
        {children}
      </main>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ── Public ── */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* ── Protected ── */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PageTransition>
                  <RoleDashboard />
                </PageTransition>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/virtual-tour"
          element={
            <ProtectedRoute>
              <AppLayout><PageTransition><VirtualTour /></PageTransition></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lost-found"
          element={
            <ProtectedRoute>
              <AppLayout><PageTransition><LostFound /></PageTransition></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <AppLayout><PageTransition><Chatbot /></PageTransition></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaint"
          element={
            <ProtectedRoute>
              <AppLayout><PageTransition><ComplaintBox /></PageTransition></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty"
          element={
            <ProtectedRoute>
              <AppLayout><PageTransition><Faculty /></PageTransition></AppLayout>
            </ProtectedRoute>
          }
        />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </AnimatePresence>
  )
}
