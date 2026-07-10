import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  LayoutDashboard, Map, PackageSearch, MessageSquare,
  AlertCircle, Users, LogOut, ChevronLeft, ChevronRight,
  GraduationCap, ShieldCheck, BookOpen, BarChart3,
  Calendar, UserCheck, Settings
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import { useAuth } from '../../context/AuthContext'

// ─── Nav items per role ──────────────────────────────────────────────────────
const NAV_ITEMS = {
  student: [
    { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard'    },
    { to: '/virtual-tour', icon: Map,              label: 'Virtual Tour' },
    { to: '/lost-found',   icon: PackageSearch,    label: 'Lost & Found' },
    { to: '/chatbot',      icon: MessageSquare,    label: 'Chatbot'      },
    { to: '/complaint',    icon: AlertCircle,      label: 'Complaints'   },
    { to: '/faculty',      icon: Users,            label: 'Faculty'      },
  ],
  faculty: [
    { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard'    },
    { to: '/faculty',      icon: Users,            label: 'Faculty Dir.' },
    { to: '/lost-found',   icon: PackageSearch,    label: 'Lost & Found' },
    { to: '/chatbot',      icon: MessageSquare,    label: 'Chatbot'      },
    { to: '/complaint',    icon: AlertCircle,      label: 'Complaints'   },
  ],
  admin: [
    { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard'    },
    { to: '/faculty',      icon: Users,            label: 'Users'        },
    { to: '/complaint',    icon: AlertCircle,      label: 'Complaints'   },
    { to: '/lost-found',   icon: PackageSearch,    label: 'Lost & Found' },
    { to: '/chatbot',      icon: MessageSquare,    label: 'Chatbot'      },
    { to: '/virtual-tour', icon: BarChart3,        label: 'Analytics'    },
  ],
}

const ROLE_COLORS = {
  student: 'from-violet-600 to-indigo-500',
  faculty: 'from-cyan-500 to-teal-500',
  admin:   'from-pink-500 to-rose-500',
}

const ROLE_BADGES = {
  student: 'purple',
  faculty: 'cyan',
  admin:   'pink',
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const role      = user?.role || 'student'
  const college   = user?.college
  const navItems  = NAV_ITEMS[role] || NAV_ITEMS.student

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="glass glow-border-purple relative z-50 flex flex-col h-screen sticky top-0 shrink-0 overflow-hidden"
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className={`w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-br ${ROLE_COLORS[role]} flex items-center justify-center shadow-glow-purple`}>
          {role === 'admin'   ? <ShieldCheck size={20} className="text-white" />   :
           role === 'faculty' ? <BookOpen size={20} className="text-white" />      :
           <GraduationCap size={20} className="text-white" />}
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              <p className="font-outfit font-bold text-base text-gradient whitespace-nowrap leading-tight">Campus Buddy</p>
              {college && (
                <p className="text-[10px] text-[var(--color-muted)] font-inter whitespace-nowrap truncate max-w-[140px]">{college.short} · {college.city}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Nav items ── */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group
              ${isActive
                ? `bg-gradient-to-r ${ROLE_COLORS[role].replace('from-', 'from-').replace('to-', 'to-')}/20 border border-white/10 text-primary-300`
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-primary-400' : ''}`} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                      className="text-sm font-medium font-outfit whitespace-nowrap">
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── User info + bottom actions ── */}
      <div className="px-2 py-4 border-t border-white/10 space-y-2">
        {/* User card */}
        {!collapsed && user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass rounded-2xl p-3 mb-2 flex items-center gap-3">
            <Avatar name={user.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-outfit font-semibold text-[var(--color-text)] truncate">{user.name}</p>
              <Badge variant={ROLE_BADGES[role]} className="mt-0.5 text-[10px] px-1.5 py-0.5">{role}</Badge>
            </div>
          </motion.div>
        )}

        <ThemeToggle collapsed={collapsed} />

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-2xl w-full text-left
            text-[var(--color-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
        >
          <LogOut size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-sm font-outfit">
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Collapse toggle ── */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-pink-500
          flex items-center justify-center shadow-glow-purple border border-white/20 hover:scale-110 transition-transform"
      >
        {collapsed ? <ChevronRight size={12} className="text-white" /> : <ChevronLeft size={12} className="text-white" />}
      </button>
    </motion.aside>
  )
}
