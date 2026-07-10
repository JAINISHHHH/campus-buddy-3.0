import { motion } from 'framer-motion'

export default function GradientButton({ children, onClick, className = '', variant = 'purple', size = 'md', type = 'button', disabled = false, ...props }) {
  const sizeMap = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  const variantMap = {
    purple: 'from-violet-600 via-purple-500 to-fuchsia-500',
    pink:   'from-pink-500 via-fuchsia-500 to-purple-600',
    cyan:   'from-cyan-500 via-indigo-500 to-purple-600',
    ghost:  '',
  }

  if (variant === 'ghost') {
    return (
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={`glass glow-border-purple rounded-2xl font-semibold font-outfit transition-all duration-300
          text-primary-500 dark:text-primary-300 ${sizeMap[size]} ${className}
          disabled:opacity-50 disabled:cursor-not-allowed`}
        {...props}
      >
        {children}
      </motion.button>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden bg-gradient-to-r ${variantMap[variant]}
        text-white font-semibold font-outfit rounded-2xl shadow-glow-purple
        transition-all duration-300 ${sizeMap[size]} ${className}
        disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
