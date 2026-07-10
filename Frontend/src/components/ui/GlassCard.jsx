import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', glow = 'purple', animate = true, ...props }) {
  const glowMap = {
    purple: 'glow-border-purple',
    pink:   'glow-border-pink',
    cyan:   'glow-border-cyan',
    none:   '',
  }

  const Comp = animate ? motion.div : 'div'
  const animProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  } : {}

  return (
    <Comp
      className={`glass rounded-3xl p-6 ${glowMap[glow]} ${className}`}
      {...animProps}
      {...props}
    >
      {children}
    </Comp>
  )
}
