import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, ShieldCheck, AlertCircle, PackageSearch,
  TrendingUp, Bell, CheckCircle2, Clock, ChevronRight,
  BarChart3, UserCheck, UserX, Settings
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import FloatingBlobs from '../components/shared/FloatingBlobs'
import { useAuth } from '../context/AuthContext'
import { ANNOUNCEMENTS, ADMIN_STATS, COLLEGE_STATS } from '../data/mockData'

const container = { animate: { transition: { staggerChildren: 0.08 } } }
const item = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } }

// Mock recent complaints
const MOCK_COMPLAINTS = [
  { id: 1, title: 'Canteen food quality issue',       from: 'Anonymous',         time: '1h ago',  status: 'pending',  priority: 'high'   },
  { id: 2, title: 'Projector broken in Room A-201',   from: 'Rohan Patil',       time: '3h ago',  status: 'resolved', priority: 'medium' },
  { id: 3, title: 'Parking lot lights not working',   from: 'Anonymous',         time: '5h ago',  status: 'pending',  priority: 'low'    },
  { id: 4, title: 'Wi-Fi dead zone in Block C',       from: 'Sara Kapoor',       time: '1d ago',  status: 'pending',  priority: 'high'   },
  { id: 5, title: 'Library noise complaint',           from: 'Anonymous',         time: '2d ago',  status: 'resolved', priority: 'low'    },
]

// Mock recent users
const MOCK_USERS = [
  { name: 'Alex Johnson',   role: 'student', college: 'MIT', status: 'active',   joined: 'Today'     },
  { name: 'Priya Sharma',   role: 'faculty', college: 'MIT', status: 'active',   joined: 'Yesterday' },
  { name: 'Sara Kapoor',    role: 'student', college: 'MIT', status: 'active',   joined: '2d ago'    },
  { name: 'Rohan Patil',    role: 'student', college: 'MIT', status: 'inactive', joined: '1w ago'    },
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const college       = user?.college
  const adminStats    = ADMIN_STATS[college?.id]    || ADMIN_STATS['mit']
  const collegeStats  = COLLEGE_STATS[college?.id]  || COLLEGE_STATS['mit']
  const announcements = (ANNOUNCEMENTS[college?.id] || []).slice(0, 3)
  const [activeTab, setActiveTab] = useState('complaints')

  const statsCards = [
    { icon: Users,        label: 'Total Users',   value: adminStats.totalUsers.toLocaleString(), color: 'from-violet-600 to-indigo-500', sub: '+12 today'       },
    { icon: AlertCircle,  label: 'Complaints',    value: adminStats.complaints.toString(),        color: 'from-pink-500 to-rose-500',     sub: `${adminStats.pending} pending`  },
    { icon: PackageSearch,label: 'Lost Items',    value: adminStats.lostItems.toString(),          color: 'from-amber-500 to-orange-400',  sub: 'Needs review'   },
    { icon: TrendingUp,   label: 'Resolution %',  value: `${adminStats.resolved}%`,               color: 'from-emerald-500 to-teal-400',  sub: 'This month'     },
  ]

  return (
    <div className="relative flex-1 overflow-auto p-6 lg:p-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><FloatingBlobs count={2} /></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">

        {/* ── Admin Hero ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="glass rounded-4xl p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
          style={{ border: '1px solid rgba(236,72,153,0.3)', boxShadow: '0 0 40px rgba(236,72,153,0.1)' }}>
          <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
          <div className="absolute -right-10 -top-10 w-56 h-56 bg-gradient-to-br from-pink-500/20 to-rose-400/10 rounded-full blur-2xl" />

          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
              <ShieldCheck size={30} className="text-white" />
            </div>
            <div>
              <p className="text-[var(--color-muted)] font-inter text-sm mb-1">Administrator Portal 🛡️</p>
              <h1 className="font-outfit font-bold text-3xl text-gradient">{user?.name || 'Admin'}</h1>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="pink">Super Admin</Badge>
                {college && <Badge variant="purple">{college.name}</Badge>}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-end gap-2">
            <div className="glass rounded-2xl px-4 py-2 text-right">
              <p className="text-xs text-[var(--color-muted)] font-inter">New signups today</p>
              <p className="text-2xl font-outfit font-bold text-pink-400">{adminStats.newToday}</p>
            </div>
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.95 }}
                className="glass w-10 h-10 rounded-2xl flex items-center justify-center text-pink-400 relative">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">5</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className="glass w-10 h-10 rounded-2xl flex items-center justify-center text-violet-400">
                <Settings size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div variants={container} initial="initial" animate="animate" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map(({ icon: Icon, label, value, color, sub }) => (
            <motion.div key={label} variants={item}>
              <div className="glass rounded-3xl p-5 flex flex-col gap-3 group hover:bg-white/5 transition-all duration-300 cursor-pointer">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-outfit font-bold text-2xl text-[var(--color-text)]">{value}</p>
                  <p className="text-xs text-[var(--color-muted)] font-inter">{label}</p>
                  <p className="text-xs text-primary-400 font-outfit mt-0.5">{sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Analytics Bar Chart (visual only) ── */}
        <GlassCard glow="none">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
              <BarChart3 size={15} className="text-white" />
            </div>
            <h2 className="font-outfit font-bold text-lg text-[var(--color-text)]">Weekly Activity — {college?.short}</h2>
          </div>
          <div className="flex items-end gap-3 h-36">
            {[
              { day: 'Mon', complaints: 4, users: 8,  lost: 2 },
              { day: 'Tue', complaints: 7, users: 14, lost: 3 },
              { day: 'Wed', complaints: 3, users: 11, lost: 1 },
              { day: 'Thu', complaints: 9, users: 19, lost: 5 },
              { day: 'Fri', complaints: 5, users: 16, lost: 2 },
              { day: 'Sat', complaints: 2, users: 6,  lost: 1 },
              { day: 'Sun', complaints: 1, users: 3,  lost: 0 },
            ].map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end h-28">
                  {[
                    { val: d.users,      max: 20, color: 'bg-gradient-to-t from-violet-600 to-indigo-400' },
                    { val: d.complaints, max: 10, color: 'bg-gradient-to-t from-pink-500 to-rose-400'     },
                    { val: d.lost,       max: 6,  color: 'bg-gradient-to-t from-amber-500 to-orange-400'  },
                  ].map((b, j) => (
                    <motion.div key={j} className={`flex-1 rounded-t-lg ${b.color} opacity-80 hover:opacity-100 transition-opacity`}
                      initial={{ height: 0 }}
                      animate={{ height: `${(b.val / b.max) * 100}%` }}
                      transition={{ delay: i * 0.04 + j * 0.02, duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-[var(--color-muted)] font-outfit">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs font-outfit text-[var(--color-muted)]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gradient-to-r from-violet-600 to-indigo-400 inline-block" />Users</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gradient-to-r from-pink-500 to-rose-400 inline-block" />Complaints</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gradient-to-r from-amber-500 to-orange-400 inline-block" />Lost Items</span>
          </div>
        </GlassCard>

        {/* ── Tabs: Complaints / Users ── */}
        <div>
          <div className="flex gap-2 mb-4">
            {[
              { id: 'complaints', label: 'Recent Complaints', icon: AlertCircle },
              { id: 'users',      label: 'Recent Users',      icon: Users       },
            ].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-outfit font-semibold transition-all duration-300
                  ${activeTab === t.id ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-glow-purple' : 'glass text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}>
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>

          <GlassCard glow="none">
            <AnimatePresence mode="wait">
              {activeTab === 'complaints' && (
                <motion.div key="complaints" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-2">
                  {MOCK_COMPLAINTS.map((c, i) => (
                    <motion.div key={c.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group">
                      <div className={`w-2 h-10 rounded-full shrink-0 ${c.priority === 'high' ? 'bg-red-500' : c.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-inter text-[var(--color-text)] group-hover:text-primary-300 transition-colors truncate">{c.title}</p>
                        <p className="text-xs text-[var(--color-muted)] mt-0.5">From: {c.from} · {c.time}</p>
                      </div>
                      <Badge variant={c.status === 'resolved' ? 'green' : 'orange'}>{c.status}</Badge>
                      <ChevronRight size={14} className="text-[var(--color-muted)] shrink-0" />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-2">
                  {MOCK_USERS.map((u, i) => (
                    <motion.div key={u.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group">
                      <Avatar name={u.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-outfit font-semibold text-[var(--color-text)] truncate">{u.name}</p>
                        <p className="text-xs text-[var(--color-muted)] font-inter mt-0.5 flex items-center gap-2">
                          <Clock size={10} /> Joined {u.joined}
                        </p>
                      </div>
                      <Badge variant={u.role === 'faculty' ? 'cyan' : u.role === 'admin' ? 'pink' : 'purple'}>{u.role}</Badge>
                      {u.status === 'active'
                        ? <UserCheck size={16} className="text-emerald-400 shrink-0" />
                        : <UserX size={16} className="text-red-400 shrink-0" />}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

      </div>
    </div>
  )
}
