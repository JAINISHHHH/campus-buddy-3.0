import { useTilt } from '../../hooks/useTilt'

export default function TiltCard({ children, className = '', max = 12 }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(max)

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`card-3d ${className}`}
    >
      {children}
    </div>
  )
}
