import { useCallback, useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    loadSlim(window.tsParticles || {}).then(() => setInit(true)).catch(() => setInit(true))
  }, [])

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background:   { color: { value: 'transparent' } },
        fpsLimit:     60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: {
            repulse: { distance: 80,  duration: 0.4 },
            push:    { quantity: 4 },
          },
        },
        particles: {
          color: { value: ['#8b5cf6', '#ec4899', '#06b6d4', '#a78bfa'] },
          links: {
            color:     '#8b5cf6',
            distance:  120,
            enable:    true,
            opacity:   0.2,
            width:     1,
          },
          move: {
            direction: 'none',
            enable:    true,
            outModes:  { default: 'bounce' },
            random:    true,
            speed:     0.8,
            straight:  false,
          },
          number: { density: { enable: true, area: 900 }, value: 60 },
          opacity: { value: { min: 0.2, max: 0.6 } },
          shape:   { type: 'circle' },
          size:    { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  )
}
