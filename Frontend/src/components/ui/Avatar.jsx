export default function Avatar({ src, name = 'U', size = 'md', glow = true, className = '' }) {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  }
  const initial = name.charAt(0).toUpperCase()

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      {glow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 blur-md opacity-60 -z-10 scale-110" />
      )}
      <div className={`${sizeMap[size]} rounded-full overflow-hidden ring-2 ring-primary-500/40`}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
            <span className="font-outfit font-bold text-white">{initial}</span>
          </div>
        )}
      </div>
    </div>
  )
}
