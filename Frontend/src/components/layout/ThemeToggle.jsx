import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

export default function ThemeToggle({ collapsed = false }) {
  const { dark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      id="theme-toggle"
      className="flex items-center gap-3 px-3 py-3 rounded-2xl w-full text-left
        text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white/5 transition-all duration-300 group"
    >
      <motion.div
        animate={{ rotate: dark ? 0 : 180 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="shrink-0"
      >
        {dark
          ? <Sun size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
          : <Moon size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
        }
      </motion.div>
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm font-outfit whitespace-nowrap"
          >
            {dark ? 'Light Mode' : 'Dark Mode'}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
