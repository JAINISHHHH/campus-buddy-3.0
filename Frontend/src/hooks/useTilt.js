import { useRef, useCallback } from 'react'

export function useTilt(max = 12) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -max
    const rotateY = ((x - cx) / cx) * max
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
  }, [max])

  const onMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
