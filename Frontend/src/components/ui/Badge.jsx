export default function Badge({ children, variant = 'purple', className = '' }) {
  const map = {
    purple: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    pink:   'bg-pink-500/20 text-pink-300 border-pink-500/30',
    cyan:   'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    green:  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
      border font-outfit ${map[variant]} ${className}`}>
      {children}
    </span>
  )
}
