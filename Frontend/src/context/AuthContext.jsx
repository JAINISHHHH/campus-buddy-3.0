import { createContext, useContext, useState, useCallback } from 'react'
import { USERS_DB, COLLEGES, FACULTY_DB } from '../data/mockData'

const AuthContext = createContext(null)

// ─── Load / save helpers ─────────────────────────────────────────────────────
function loadSession() {
  try { return JSON.parse(localStorage.getItem('cb-session') || 'null') } catch { return null }
}

// Registered users are stored in localStorage so new signups persist across reloads
function loadRegistered() {
  try { return JSON.parse(localStorage.getItem('cb-registered') || '{}') } catch { return {} }
}
function saveRegistered(db) {
  localStorage.setItem('cb-registered', JSON.stringify(db))
}

// ─── Merge mock DB + registered users (registered take priority) ─────────────
function getFullDB() {
  return { ...USERS_DB, ...loadRegistered() }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession())

  // ── Login ────────────────────────────────────────────────────────────────
  const login = useCallback(({ email, password, role, collegeId }) => {
    const fullDB = getFullDB()
    const record = fullDB[email.toLowerCase().trim()]

    if (!record)
      return { ok: false, error: 'No account found with this email. Please sign up first.' }

    if (record.password !== password)
      return { ok: false, error: 'Incorrect password. Please try again.' }

    if (record.role !== role)
      return {
        ok: false,
        error: `Access denied. This email is registered as a "${record.role}" — not "${role}". Please select the correct role and try again.`,
        hint: record.role,
      }

    if (record.college !== collegeId)
      return {
        ok: false,
        error: 'This account does not belong to the selected college. Please select the correct institution.',
      }

    const college = COLLEGES.find(c => c.id === collegeId)
    let enriched = { ...record, college, email: email.toLowerCase().trim() }

    // For faculty: attach full faculty record (mock or newly registered)
    if (record.role === 'faculty') {
      const facultyList = FACULTY_DB[collegeId] || []
      const facultyRecord = facultyList.find(f => f.id === record.facultyId)
        || record.facultyRecord   // for newly signed-up faculty
      if (facultyRecord) enriched = { ...enriched, facultyRecord }
    }

    localStorage.setItem('cb-session', JSON.stringify(enriched))
    setUser(enriched)
    return { ok: true }
  }, [])

  // ── Sign Up ──────────────────────────────────────────────────────────────
  const signup = useCallback(({ name, email, password, role, collegeId, ...extra }) => {
    const key   = email.toLowerCase().trim()
    const fullDB = getFullDB()

    // Validation
    if (!name.trim())     return { ok: false, error: 'Full name is required.' }
    if (!email.trim())    return { ok: false, error: 'Email address is required.' }
    if (!password)        return { ok: false, error: 'Password is required.' }
    if (password.length < 6)
      return { ok: false, error: 'Password must be at least 6 characters.' }
    if (password !== extra.confirmPassword)
      return { ok: false, error: 'Passwords do not match.' }
    if (fullDB[key])
      return { ok: false, error: 'An account with this email already exists. Please sign in.' }

    // Role-specific validation
    if (role === 'student') {
      if (!extra.dept) return { ok: false, error: 'Please select your department.' }
      if (!extra.year) return { ok: false, error: 'Please select your year.' }
      if (!extra.roll?.trim()) return { ok: false, error: 'Roll number is required.' }
    }
    if (role === 'faculty') {
      if (!extra.dept) return { ok: false, error: 'Please select your department.' }
      if (!extra.designation?.trim()) return { ok: false, error: 'Designation is required.' }
      if (!extra.employeeId?.trim()) return { ok: false, error: 'Employee ID is required.' }
    }
    if (role === 'admin') {
      if (extra.adminCode !== 'ADMIN2026')
        return { ok: false, error: 'Invalid admin access code. Contact IT department.' }
    }

    // Build new record
    const registered = loadRegistered()
    const newRecord = {
      name,
      role,
      college: collegeId,
      password,
      ...(role === 'student' && { dept: extra.dept, year: extra.year, roll: extra.roll }),
      ...(role === 'faculty' && {
        dept: extra.dept,
        facultyId: null,
        facultyRecord: {
          id: Date.now(),
          name,
          dept: extra.dept,
          role: extra.designation,
          email: key,
          phone: extra.phone || 'Not provided',
          room: extra.room || 'TBA',
          hours: extra.hours || 'By appointment',
          emoji: '👤',
          color: 'from-violet-600 to-indigo-500',
          subjects: [],
          experience: 'New',
        },
      }),
    }

    registered[key] = newRecord
    saveRegistered(registered)

    // Auto-login after signup
    const college  = COLLEGES.find(c => c.id === collegeId)
    const enriched = { ...newRecord, college, email: key }
    localStorage.setItem('cb-session', JSON.stringify(enriched))
    setUser(enriched)
    return { ok: true }
  }, [])

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('cb-session')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
