import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, Calendar, Users, BookOpen, Clock,
  CheckCircle2, XCircle, ChevronRight, Zap, TrendingUp
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import FloatingBlobs from '../components/shared/FloatingBlobs'
import { useAuth } from '../context/AuthContext'
import { ANNOUNCEMENTS, TIMETABLE } from '../data/mockData'

const DAY_COLOR = {
  Monday: 'from-violet-600 to-indigo-500',
  Tuesday: 'from-pink-500 to-rose-500',
  Wednesday: 'from-cyan-500 to-teal-500',
  Thursday: 'from-amber-500 to-orange-400',
  Friday: 'from-emerald-500 to-teal-400',
}

const container = { animate: { transition: { staggerChildren: 0.08 } } }
const item = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } }

// Mock student attendance data
const MOCK_STUDENTS = [
  { id: 1, name: 'Alex Johnson',   roll: '21CS047', dept: 'CSE', present: true  },
  { id: 2, name: 'Sara Kapoor',    roll: '21CS048', dept: 'CSE', present: true  },
  { id: 3, name: 'Rohan Patil',    roll: '21CS049', dept: 'CSE', present: false },
  { id: 4, name: 'Priya Desai',    roll: '21CS050', dept: 'CSE', present: true  },
  { id: 5, name: 'Kiran Mehta',    roll: '21CS051', dept: 'CSE', present: false },
  { id: 6, name: 'Ananya Singh',   roll: '21CS052', dept: 'CSE', present: true  },
]

export default function FacultyDashboard() {
  const { user } = useAuth()
  const college       = user?.college
  const faculty       = user?.facultyRecord
  const dept          = user?.dept || 'CSE'
  const timetable     = TIMETABLE[dept] || TIMETABLE['CSE']
  const announcements = (ANNOUNCEMENTS[college?.id] || []).slice(0, 3)

  const [attendance, setAttendance] = useState(
    Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, s.present]))
  )
  const presentCount = Object.values(attendance).filter(Boolean).length

  const toggle = (id) => setAttendance(a => ({ ...a, [id]: !a[id] }))

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const todayClasses = timetable.filter(c => c.day === today)

  const statsCards = [
    { icon: Users,       label: 'Total Students', value: '186',         color: 'from-violet-600 to-indigo-500' },
    { icon: BookOpen,    label: 'Subjects',        value: faculty?.subjects?.length?.toString() || '2', color: 'from-cyan-500 to-teal-500'    },
    { icon: Calendar,    label: "Today's Classes", value: todayClasses.length.toString(),               color: 'from-pink-500 to-rose-500'    },
    { icon: TrendingUp,  label: 'Avg Attendance',  value: '84%',         color: 'from-emerald-500 to-teal-400' },
  ]

  return (
    <div className="relative flex-1 overflow-auto p-6 lg:p-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><FloatingBlobs count={2} /></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">

        {/* ── Welcome Hero ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="glass glow-border-cyan rounded-4xl p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-teal-400/10 rounded-full blur-2xl" />

          <div className="flex items-center gap-5 relative z-10">
            <Avatar name={user?.name || 'F'} size="xl" />
            <div>
              <p className="text-[var(--color-muted)] font-inter text-sm mb-1">Good {getGreeting()} 🎓</p>
              <h1 className="font-outfit font-bold text-3xl text-gradient">{user?.name || 'Faculty'}</h1>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="cyan">{faculty?.role || 'Faculty'}</Badge>
                <Badge variant="purple">{dept}</Badge>
                {college && <Badge variant="green">{college.short}</Badge>}
              </div>
            </div>
          </div>

          <div className="relative z-10 text-right">
            <p className="text-xs text-[var(--color-muted)] font-inter">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <p className="text-sm font-outfit font-semibold text-cyan-400 mt-1 flex items-center gap-2 justify-end">
              <Clock size={14} /> {todayClasses.length} class{todayClasses.length !== 1 ? 'es' : ''} today
            </p>
            <div className="flex items-center gap-2 mt-2 justify-end">
              <motion.button whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.95 }}
                className="glass w-10 h-10 rounded-2xl flex items-center justify-center text-cyan-400 relative">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-pink-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">2</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className="glass w-10 h-10 rounded-2xl flex items-center justify-center text-violet-400">
                <Zap size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div variants={container} initial="initial" animate="animate" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map(({ icon: Icon, label, value, color }) => (
            <motion.div key={label} variants={item}>
              <div className="glass rounded-3xl p-5 flex items-center gap-4 group hover:bg-white/5 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-outfit font-bold text-2xl text-[var(--color-text)]">{value}</p>
                  <p className="text-xs text-[var(--color-muted)] font-inter">{label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Timetable ── */}
          <GlassCard glow="none" className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
                <Calendar size={15} className="text-white" />
              </div>
              <h2 className="font-outfit font-bold text-lg text-[var(--color-text)]">Weekly Timetable</h2>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {timetable.map((cls, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className={`flex items-center gap-3 p-3 rounded-2xl ${cls.day === today ? 'bg-white/10 border border-violet-500/30' : 'hover:bg-white/5'} transition-all duration-200`}>
                  <div className={`w-2 h-10 rounded-full bg-gradient-to-b ${DAY_COLOR[cls.day] || 'from-violet-600 to-indigo-500'} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-outfit font-semibold text-[var(--color-text)] truncate">{cls.subject}</p>
                    <p className="text-xs text-[var(--color-muted)] font-inter">{cls.day} · {cls.time}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-outfit text-primary-400">{cls.room}</p>
                    {cls.students > 0 && <p className="text-xs text-[var(--color-muted)]">{cls.students} students</p>}
                  </div>
                  {cls.day === today && <Badge variant="purple">Today</Badge>}
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* ── Quick Attendance ── */}
          <GlassCard glow="none">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                  <CheckCircle2 size={15} className="text-white" />
                </div>
                <h2 className="font-outfit font-bold text-lg text-[var(--color-text)]">Quick Attendance</h2>
              </div>
              <Badge variant="cyan">{presentCount}/{MOCK_STUDENTS.length}</Badge>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400"
                animate={{ width: `${(presentCount / MOCK_STUDENTS.length) * 100}%` }}
                transition={{ duration: 0.4 }}/>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              <AnimatePresence>
                {MOCK_STUDENTS.map(s => (
                  <motion.div key={s.id} layout
                    className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/5 transition-all duration-200 cursor-pointer"
                    onClick={() => toggle(s.id)}>
                    <Avatar name={s.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-outfit font-medium text-[var(--color-text)] truncate">{s.name}</p>
                      <p className="text-xs text-[var(--color-muted)] font-inter">{s.roll}</p>
                    </div>
                    <motion.div animate={{ scale: attendance[s.id] ? 1 : 0.9 }} transition={{ type: 'spring', stiffness: 300 }}>
                      {attendance[s.id]
                        ? <CheckCircle2 size={20} className="text-emerald-400" />
                        : <XCircle size={20} className="text-red-400" />}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>

        {/* ── Announcements ── */}
        <GlassCard glow="none" className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <Bell size={18} className="text-primary-400" />
            <h2 className="font-outfit font-bold text-lg text-[var(--color-text)]">{college?.name || 'Campus'} Notices</h2>
          </div>
          {announcements.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.4 }}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer group">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${
                a.color === 'purple' ? 'from-violet-500 to-purple-400' : a.color === 'pink' ? 'from-pink-500 to-rose-400' : 'from-cyan-500 to-teal-400'} shrink-0`} />
              <div className="flex-1">
                <p className="text-sm font-inter text-[var(--color-text)] group-hover:text-primary-300 transition-colors">{a.title}</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">{a.time}</p>
              </div>
              <ChevronRight size={14} className="text-[var(--color-muted)] group-hover:text-primary-400 transition-colors" />
            </motion.div>
          ))}
        </GlassCard>

      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Morning'
  if (h < 17) return 'Afternoon'
  return 'Evening'
}
