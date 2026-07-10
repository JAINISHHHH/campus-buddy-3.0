import { useState } from 'react'

export default function FloatingInput({ label, type = 'text', value, onChange, icon: Icon, className = '', ...props }) {
  const [focused, setFocused] = useState(false)
  const active = focused || (value && value.length > 0)

  return (
    <div className={`relative ${className}`}>
      <div className={`relative flex items-center input-glass rounded-2xl transition-all duration-300 ${
        focused ? 'shadow-glow-purple' : ''
      }`}>
        {Icon && (
          <span className={`absolute left-4 transition-colors duration-300 ${
            focused ? 'text-primary-400' : 'text-[var(--color-muted)]'
          }`}>
            <Icon size={18} />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent py-4 ${Icon ? 'pl-11 pr-4' : 'px-4'} 
            text-[var(--color-text)] text-sm font-inter outline-none pt-6 pb-2`}
          {...props}
        />
        <label className={`absolute left-${Icon ? '11' : '4'} font-inter pointer-events-none transition-all duration-300 ${
          active
            ? `top-1.5 text-xs font-semibold ${focused ? 'text-primary-400' : 'text-[var(--color-muted)]'}`
            : 'top-1/2 -translate-y-1/2 text-sm text-[var(--color-muted)]'
        }`}
          style={{ left: Icon ? '2.75rem' : '1rem' }}
        >
          {label}
        </label>
      </div>
    </div>
  )
}
