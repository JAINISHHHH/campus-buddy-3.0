import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, GraduationCap, ArrowRight, ChevronLeft, Building2, ShieldCheck, BookOpen, AlertCircle, User, Hash, Briefcase, KeyRound } from 'lucide-react'
import FloatingInput from '../components/ui/FloatingInput'
import GradientButton from '../components/ui/GradientButton'
import FloatingBlobs from '../components/shared/FloatingBlobs'
import ParticleBackground from '../components/shared/ParticleBackground'
import { useAuth } from '../context/AuthContext'
import { COLLEGES } from '../data/mockData'

// ─── Role definitions ────────────────────────────────────────────────────────
const ROLES = [
  {
    id: 'student',
    label: 'Student',
    icon: GraduationCap,
    desc: 'Access courses, events, campus services & more',
    color: 'from-violet-600 to-indigo-500',
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.4)]',
    border: 'border-violet-500/50',
    emoji: '🎓',
  },
  {
    id: 'faculty',
    label: 'Faculty',
    icon: BookOpen,
    desc: 'Manage classes, attendance, student records',
    color: 'from-cyan-500 to-teal-500',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    border: 'border-cyan-500/50',
    emoji: '👨‍🏫',
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    desc: 'Full system access, analytics & management',
    color: 'from-pink-500 to-rose-500',
    glow: 'shadow-[0_0_30px_rgba(236,72,153,0.4)]',
    border: 'border-pink-500/50',
    emoji: '🛡️',
  },
]

// ─── Hint credentials per role ───────────────────────────────────────────────
const HINTS = {
  student: { email: 'alex@mit.edu',    college: 'mit',  label: 'Student (MIT)' },
  faculty: { email: 'priya.s@mit.edu', college: 'mit',  label: 'Faculty (MIT)' },
  admin:   { email: 'admin@mit.edu',   college: 'mit',  label: 'Admin (MIT)'   },
}

const stepVariants = {
  enter:  { opacity: 0, x: 60, scale: 0.96 },
  center: { opacity: 1, x: 0,  scale: 1    },
  exit:   { opacity: 0, x: -60, scale: 0.96 },
}

const DEPTS = ['CSE', 'ECE', 'IT', 'Mech', 'Civil']
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function Login() {
  const [step,      setStep]     = useState(0)
  const [tab,       setTab]      = useState('signin')  // 'signin' | 'signup'
  const [role,      setRole]     = useState(null)
  const [collegeId, setCollegeId]= useState(null)
  // sign-in fields
  const [email,     setEmail]    = useState('')
  const [password,  setPassword] = useState('')
  const [showPass,  setShowPass] = useState(false)
  const [wrongRole, setWrongRole]= useState(null)
  // sign-up extra fields
  const [suName,    setSuName]   = useState('')
  const [suEmail,   setSuEmail]  = useState('')
  const [suPass,    setSuPass]   = useState('')
  const [suPass2,   setSuPass2]  = useState('')
  const [suDept,    setSuDept]   = useState('')
  const [suYear,    setSuYear]   = useState('')
  const [suRoll,    setSuRoll]   = useState('')
  const [suDesig,   setSuDesig]  = useState('')
  const [suEmpId,   setSuEmpId]  = useState('')
  const [suCode,    setSuCode]   = useState('')
  const [showSuPass,setShowSuPass]= useState(false)
  // shared
  const [error,     setError]    = useState('')
  const [loading,   setLoading]  = useState(false)

  const { login, signup } = useAuth()
  const navigate  = useNavigate()

  const selectedRole    = ROLES.find(r => r.id === role)
  const selectedCollege = COLLEGES.find(c => c.id === collegeId)

  // ── Step handlers ──────────────────────────────────────────────────────────
  const pickRole = (r) => { setRole(r); setError(''); setWrongRole(null); setStep(1) }
  const pickCollege = (c) => { setCollegeId(c); setError(''); setStep(2) }
  const goBack = () => { setError(''); setWrongRole(null); setStep(s => s - 1) }

  // ── Switch to the correct role (called from error hint button) ─────────────
  const switchToCorrectRole = () => {
    setRole(wrongRole)
    setError('')
    setWrongRole(null)
    setStep(1)  // skip role step, go straight to college
  }

  const fillHint = () => {
    const h = HINTS[role]
    if (!h) return
    setEmail(h.email)
    setPassword('password123')
    setCollegeId(h.college)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setWrongRole(null)
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const result = login({ email, password, role, collegeId })
    setLoading(false)
    if (!result.ok) { setError(result.error); if (result.hint) setWrongRole(result.hint); return }
    navigate('/dashboard')
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const result = signup({
      name: suName, email: suEmail, password: suPass, confirmPassword: suPass2,
      role, collegeId,
      dept: suDept, year: suYear, roll: suRoll,
      designation: suDesig, employeeId: suEmpId,
      adminCode: suCode,
    })
    setLoading(false)
    if (!result.ok) { setError(result.error); return }
    navigate('/dashboard')
  }

  const resetForm = () => { setError(''); setWrongRole(null) }
  const stepLabel = ['Select Role', 'Select College', tab === 'signup' ? 'Sign Up' : 'Sign In']

  return (
    <div className="relative min-h-screen dark:bg-gradient-space bg-gradient-light flex items-center justify-center overflow-hidden px-4">
      <FloatingBlobs count={3} />
      <ParticleBackground />

      {/* Orbs */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/30 to-violet-600/20 blur-2xl animate-float" />
      <div className="absolute bottom-32 left-16 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-indigo-600/20 blur-2xl animate-float-slow" />

      <div className="relative z-10 w-full max-w-5xl flex items-center gap-12">

        {/* ── Left illustration ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hidden lg:flex flex-col items-center gap-8 flex-1"
        >
          <div className="relative">
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-violet-600/20 to-pink-500/20 blur-3xl absolute inset-0" />
            <svg viewBox="0 0 320 320" className="w-72 h-72 relative z-10" xmlns="http://www.w3.org/2000/svg">
              <circle cx="160" cy="160" r="150" fill="url(#bgGrad)" opacity="0.15" />
              <rect x="90" y="160" width="140" height="100" rx="8" fill="url(#buildGrad)" />
              <rect x="110" y="140" width="100" height="30" rx="6" fill="url(#roofGrad)" />
              <rect x="105" y="175" width="22" height="22" rx="4" fill="rgba(255,255,255,0.3)" />
              <rect x="140" y="175" width="22" height="22" rx="4" fill="rgba(255,255,255,0.3)" />
              <rect x="175" y="175" width="22" height="22" rx="4" fill="rgba(255,255,255,0.3)" />
              <rect x="105" y="210" width="22" height="22" rx="4" fill="rgba(255,255,255,0.3)" />
              <rect x="175" y="210" width="22" height="22" rx="4" fill="rgba(255,255,255,0.3)" />
              <rect x="145" y="220" width="30" height="40" rx="4" fill="rgba(255,255,255,0.5)" />
              <circle cx="80" cy="210" r="16" fill="url(#student1Grad)" />
              <ellipse cx="80" cy="238" rx="12" ry="16" fill="url(#student1Grad)" />
              <circle cx="240" cy="210" r="16" fill="url(#student2Grad)" />
              <ellipse cx="240" cy="238" rx="12" ry="16" fill="url(#student2Grad)" />
              <rect x="228" y="196" width="24" height="4" rx="2" fill="#7c3aed" />
              <polygon points="240,188 250,196 230,196" fill="#6d28d9" />
              <text x="50" y="90" fontSize="18" fill="#a78bfa" opacity="0.9">✦</text>
              <text x="255" y="100" fontSize="14" fill="#ec4899" opacity="0.9">✦</text>
              <text x="140" y="60" fontSize="22" fill="#06b6d4" opacity="0.8">✦</text>
              <ellipse cx="160" cy="270" rx="100" ry="12" fill="url(#groundGrad)" opacity="0.6" />
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></radialGradient>
                <linearGradient id="buildGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6d28d9" stopOpacity="0.8" /><stop offset="100%" stopColor="#4c1d95" stopOpacity="0.9" /></linearGradient>
                <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#ec4899" /></linearGradient>
                <linearGradient id="student1Grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#6366f1" /></linearGradient>
                <linearGradient id="student2Grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient>
                <linearGradient id="groundGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" /><stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" /></linearGradient>
              </defs>
            </svg>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-outfit font-bold text-gradient mb-3">Campus Buddy</h1>
            <p className="text-[var(--color-muted)] font-inter text-lg">Your magical campus companion ✨</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3">
            {stepLabel.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-outfit transition-all duration-300
                  ${i < step ? 'bg-gradient-to-br from-violet-600 to-pink-500 text-white' :
                    i === step ? 'border-2 border-violet-500 text-primary-400' :
                    'border border-white/20 text-[var(--color-muted)]'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-outfit ${i === step ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}`}>{s}</span>
                {i < stepLabel.length - 1 && <div className={`w-6 h-px ${i < step ? 'bg-violet-500' : 'bg-white/20'}`} />}
              </div>
            ))}
          </div>

          {/* Role pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {['Virtual Tours', 'Lost & Found', 'Chatbot Help', 'Faculty Info'].map(f => (
              <span key={f} className="glass px-4 py-2 rounded-full text-sm font-outfit text-primary-300 glow-border-purple">{f}</span>
            ))}
          </div>
        </motion.div>

        {/* ── Right form panel ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="w-full max-w-md mx-auto lg:mx-0 flex-shrink-0"
        >
          <div className="glass glow-border-purple rounded-4xl p-8 shadow-glass">
            {/* Logo mobile */}
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="font-outfit font-bold text-xl text-gradient">Campus Buddy</span>
            </div>

            {/* Back button */}
            {step > 0 && (
              <button onClick={goBack} className="flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-primary-400 transition-colors mb-6 font-outfit">
                <ChevronLeft size={16} /> Back
              </button>
            )}

            <AnimatePresence mode="wait">

              {/* ── STEP 0: Role selector ───────────────────────────────── */}
              {step === 0 && (
                <motion.div key="step-role" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>
                  <div className="mb-7">
                    <h2 className="font-outfit font-bold text-2xl text-[var(--color-text)] mb-1">Welcome back! 👋</h2>
                    <p className="text-sm text-[var(--color-muted)] font-inter">Select your role to continue</p>
                  </div>
                  <div className="space-y-3">
                    {ROLES.map(r => (
                      <motion.button
                        key={r.id}
                        id={`role-${r.id}`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => pickRole(r.id)}
                        className={`w-full glass border ${r.border} rounded-3xl p-4 flex items-center gap-4 text-left hover:${r.glow} transition-all duration-300 group`}
                      >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <r.icon size={22} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-outfit font-bold text-base text-[var(--color-text)]">{r.emoji} {r.label}</p>
                          <p className="text-xs text-[var(--color-muted)] font-inter mt-0.5">{r.desc}</p>
                        </div>
                        <ArrowRight size={16} className="text-[var(--color-muted)] group-hover:text-primary-400 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 1: College selector ─────────────────────────────── */}
              {step === 1 && (
                <motion.div key="step-college" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>
                  <div className="mb-7">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${selectedRole?.color} mb-3`}>
                      <span className="text-white text-xs font-outfit font-semibold">{selectedRole?.emoji} {selectedRole?.label}</span>
                    </div>
                    <h2 className="font-outfit font-bold text-2xl text-[var(--color-text)] mb-1">Select Your College</h2>
                    <p className="text-sm text-[var(--color-muted)] font-inter">Choose the institution you belong to</p>
                  </div>
                  <div className="space-y-3">
                    {COLLEGES.map(c => (
                      <motion.button
                        key={c.id}
                        id={`college-${c.id}`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => pickCollege(c.id)}
                        className="w-full glass border border-white/10 rounded-3xl p-4 flex items-center gap-4 text-left hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 group"
                      >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0 text-2xl group-hover:scale-110 transition-transform`}>
                          {c.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="font-outfit font-bold text-sm text-[var(--color-text)]">{c.name}</p>
                          <p className="text-xs text-[var(--color-muted)] font-inter mt-0.5 flex items-center gap-1">
                            <Building2 size={10} /> {c.city}
                          </p>
                        </div>
                        <ArrowRight size={16} className="text-[var(--color-muted)] group-hover:text-primary-400 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Sign In / Sign Up ──────────────────────────── */}
              {step === 2 && (
                <motion.div key="step-creds" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>

                  {/* Role + College pills */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r ${selectedRole?.color}`}>
                      <span className="text-white text-xs font-outfit font-semibold">{selectedRole?.emoji} {selectedRole?.label}</span>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r ${selectedCollege?.color}`}>
                      <span className="text-white text-xs font-outfit font-semibold">{selectedCollege?.short}</span>
                    </div>
                  </div>

                  {/* Tab switcher */}
                  <div className="relative flex glass rounded-2xl p-1 mb-6">
                    <motion.div className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500"
                      animate={{ left: tab === 'signin' ? '4px' : '50%', width: 'calc(50% - 4px)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }} />
                    {['signin','signup'].map(t => (
                      <button key={t} onClick={() => { setTab(t); resetForm() }}
                        className={`relative z-10 flex-1 py-2.5 text-sm font-semibold font-outfit capitalize rounded-xl transition-colors duration-300 ${tab === t ? 'text-white' : 'text-[var(--color-muted)]'}`}>
                        {t === 'signin' ? 'Sign In' : 'Sign Up'}
                      </button>
                    ))}
                  </div>

                  {/* Error box (shared) */}
                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="rounded-2xl bg-red-500/10 border border-red-500/30 overflow-hidden mb-4">
                        <div className="flex items-start gap-2 p-3 text-red-400 text-sm font-inter">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span>{error}</span>
                        </div>
                        {wrongRole && (
                          <button type="button" onClick={switchToCorrectRole}
                            className="w-full px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border-t border-red-500/20 text-xs font-outfit font-semibold text-red-300 hover:text-red-200 transition-colors flex items-center justify-center gap-1.5">
                            <ArrowRight size={12} /> Switch to {wrongRole.charAt(0).toUpperCase() + wrongRole.slice(1)} login instead
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {/* ── SIGN IN form ── */}
                    {tab === 'signin' && (
                      <motion.form key="signin" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-10 }}
                        onSubmit={handleSubmit} className="space-y-4">
                        <FloatingInput label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} icon={Mail} />
                        <div className="relative">
                          <FloatingInput label="Password" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} icon={Lock} />
                          <button type="button" onClick={() => setShowPass(s => !s)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-primary-400 transition-colors">
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <GradientButton type="submit" size="lg" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                          {loading ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : <>Sign In <ArrowRight size={18} /></>}
                        </GradientButton>
                        <button type="button" onClick={fillHint} className="w-full text-center text-xs text-[var(--color-muted)] hover:text-primary-400 transition-colors font-outfit py-1">
                          🎯 Use demo credentials for {selectedRole?.label}
                        </button>
                      </motion.form>
                    )}

                    {/* ── SIGN UP form ── */}
                    {tab === 'signup' && (
                      <motion.form key="signup" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-10 }}
                        onSubmit={handleSignup} className="space-y-3">
                        <FloatingInput label="Full Name" type="text" value={suName} onChange={e => setSuName(e.target.value)} icon={User} />
                        <FloatingInput label="Email Address" type="email" value={suEmail} onChange={e => setSuEmail(e.target.value)} icon={Mail} />
                        <div className="relative">
                          <FloatingInput label="Password" type={showSuPass ? 'text' : 'password'} value={suPass} onChange={e => setSuPass(e.target.value)} icon={Lock} />
                          <button type="button" onClick={() => setShowSuPass(s => !s)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-primary-400 transition-colors">
                            {showSuPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <FloatingInput label="Confirm Password" type="password" value={suPass2} onChange={e => setSuPass2(e.target.value)} icon={Lock} />

                        {/* Student-specific */}
                        {role === 'student' && (<>
                          <select value={suDept} onChange={e => setSuDept(e.target.value)}
                            className="input-glass w-full rounded-2xl py-3 px-4 text-sm text-[var(--color-text)] bg-transparent">
                            <option value="">Select Department</option>
                            {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <select value={suYear} onChange={e => setSuYear(e.target.value)}
                            className="input-glass w-full rounded-2xl py-3 px-4 text-sm text-[var(--color-text)] bg-transparent">
                            <option value="">Select Year</option>
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                          <FloatingInput label="Roll Number" type="text" value={suRoll} onChange={e => setSuRoll(e.target.value)} icon={Hash} />
                        </>)}

                        {/* Faculty-specific */}
                        {role === 'faculty' && (<>
                          <select value={suDept} onChange={e => setSuDept(e.target.value)}
                            className="input-glass w-full rounded-2xl py-3 px-4 text-sm text-[var(--color-text)] bg-transparent">
                            <option value="">Select Department</option>
                            {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <FloatingInput label="Designation (e.g. Asst. Professor)" type="text" value={suDesig} onChange={e => setSuDesig(e.target.value)} icon={Briefcase} />
                          <FloatingInput label="Employee ID" type="text" value={suEmpId} onChange={e => setSuEmpId(e.target.value)} icon={Hash} />
                        </>)}

                        {/* Admin-specific */}
                        {role === 'admin' && (
                          <div className="space-y-1">
                            <FloatingInput label="Admin Access Code" type="password" value={suCode} onChange={e => setSuCode(e.target.value)} icon={KeyRound} />
                            <p className="text-xs text-[var(--color-muted)] font-inter pl-1">Contact your IT department for the access code.</p>
                          </div>
                        )}

                        <GradientButton type="submit" size="lg" className="w-full flex items-center justify-center gap-2 !mt-4" disabled={loading}>
                          {loading ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : <>Create Account <ArrowRight size={18} /></>}
                        </GradientButton>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
