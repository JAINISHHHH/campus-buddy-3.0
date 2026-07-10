import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Map, PackageSearch, MessageSquare, AlertCircle, Users,
  Bell, TrendingUp, Star, Zap, BookOpen, Award
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import TiltCard from '../components/shared/TiltCard'
import FloatingBlobs from '../components/shared/FloatingBlobs'
import { useAuth } from '../context/AuthContext'
import { ANNOUNCEMENTS, COLLEGE_STATS } from '../data/mockData'

const features = [
  { to: '/virtual-tour', icon: Map,           label: 'Virtual Tour',  desc: 'Explore campus in 360°',  color: 'from-violet-600 to-indigo-500', glow: 'purple', badge: 'New',  bVariant: 'purple', delay: 0.1 },
  { to: '/lost-found',   icon: PackageSearch, label: 'Lost & Found',  desc: '12 items reported today', color: 'from-pink-500 to-rose-500',     glow: 'pink',   badge: '12',   bVariant: 'pink',   delay: 0.2 },
  { to: '/complaint',    icon: AlertCircle,   label: 'Complaint Box', desc: 'Anonymous & secure',       color: 'from-amber-500 to-orange-500',  glow: 'none',   badge: null,   bVariant: 'orange', delay: 0.3 },
  { to: '/chatbot',      icon: MessageSquare, label: 'Chatbot',       desc: 'Ask anything, anytime',   color: 'from-cyan-500 to-teal-500',     glow: 'cyan',   badge: 'AI',   bVariant: 'cyan',   delay: 0.4 },
  { to: '/faculty',      icon: Users,         label: 'Faculty Info',  desc: 'Meet your educators',     color: 'from-emerald-500 to-cyan-500',  glow: 'cyan',   badge: null,   bVariant: 'green',  delay: 0.5 },
]

const container = { animate: { transition: { staggerChildren: 0.1 } } }
const item = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

export default function StudentDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const college     = user?.college
  const stats       = COLLEGE_STATS[college?.id] || {}
  const announcements = ANNOUNCEMENTS[college?.id] || []

  const statCards = [
    { icon: TrendingUp, label: 'Courses',   value: '24',         color: 'text-primary-400' },
    { icon: Star,       label: 'Events',    value: '8',          color: 'text-pink-400'    },
    { icon: Award,      label: 'Credits',   value: '92',         color: 'text-cyan-400'    },
    { icon: BookOpen,   label: 'Resources', value: '47',         color: 'text-emerald-400' },
  ]

  return (
    <div className="relative flex-1 overflow-auto p-6 lg:p-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><FloatingBlobs count={2} /></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">

        {/* ── Welcome Hero ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="glass glow-border-purple rounded-4xl p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-gradient-to-br from-violet-600/20 to-pink-500/10 rounded-full blur-2xl" />

          <div className="flex items-center gap-5 relative z-10">
            <Avatar name={user?.name || 'S'} size="xl" />
            <div>
              <p className="text-[var(--color-muted)] font-inter text-sm mb-1">Welcome back 👋</p>
              <h1 className="font-outfit font-bold text-3xl text-gradient">{user?.name || 'Student'}</h1>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="purple">{user?.dept} — {user?.year}</Badge>
                <Badge variant="cyan">Roll: {user?.roll}</Badge>
                {college && <Badge variant="green">{college.short}</Badge>}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.95 }}
              className="glass glow-border-purple w-11 h-11 rounded-2xl flex items-center justify-center text-primary-400 relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">3</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              className="glass glow-border-cyan w-11 h-11 rounded-2xl flex items-center justify-center text-cyan-400">
              <Zap size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── College Stats ── */}
        <motion.div variants={container} initial="initial" animate="animate" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ icon: Icon, label, value, color }) => (
            <motion.div key={label} variants={item}>
              <div className="glass glow-border-purple rounded-3xl p-5 flex items-center gap-4 group hover:bg-white/5 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                  color === 'text-primary-400' ? 'from-violet-600/30 to-purple-500/20' :
                  color === 'text-pink-400'    ? 'from-pink-500/30 to-rose-500/20'     :
                  color === 'text-cyan-400'    ? 'from-cyan-500/30 to-teal-500/20'     :
                  'from-emerald-500/30 to-teal-500/20'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <p className="font-outfit font-bold text-2xl text-[var(--color-text)]">{value}</p>
                  <p className="text-xs text-[var(--color-muted)] font-inter">{label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Quick Access ── */}
        <div className="flex items-center gap-4">
          <h2 className="font-outfit font-bold text-2xl text-[var(--color-text)]">Quick Access</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary-500/40 to-transparent" />
        </div>

        <motion.div variants={container} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ to, icon: Icon, label, desc, color, glow, badge, bVariant, delay }) => (
            <motion.div key={to} variants={item} custom={delay}>
              <TiltCard className={`glass glow-border-${glow} rounded-4xl p-6 cursor-pointer group`} onClick={() => navigate(to)}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  {badge && <Badge variant={bVariant}>{badge}</Badge>}
                </div>
                <h3 className="font-outfit font-bold text-xl text-[var(--color-text)] mb-1 group-hover:text-gradient transition-all">{label}</h3>
                <p className="text-sm text-[var(--color-muted)] font-inter">{desc}</p>
                <div className="mt-4 flex items-center gap-2 text-primary-400 text-sm font-outfit font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Open <span>→</span></div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Announcements ── */}
        <GlassCard glow="none" className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Bell size={18} className="text-primary-400" />
            <h2 className="font-outfit font-bold text-lg text-[var(--color-text)]">
              {college?.name || 'Campus'} Announcements
            </h2>
          </div>
          {announcements.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.5 }}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer group">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${
                a.color === 'purple' ? 'from-violet-500 to-purple-400' :
                a.color === 'pink'   ? 'from-pink-500 to-rose-400'     :
                a.color === 'green'  ? 'from-emerald-500 to-teal-400'  :
                'from-cyan-500 to-teal-400'} shrink-0`} />
              <div className="flex-1">
                <p className="text-sm font-inter text-[var(--color-text)] group-hover:text-primary-300 transition-colors">{a.title}</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">{a.time}</p>
              </div>
              <Badge variant={a.color}>{a.tag}</Badge>
            </motion.div>
          ))}
        </GlassCard>

      </div>
    </div>
  )
}
