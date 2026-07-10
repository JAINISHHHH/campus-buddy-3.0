import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, Navigation, Map, Layers, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react'

export default function VirtualTour() {
  const [activeLayer, setActiveLayer] = useState('map')
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="relative flex-1 overflow-hidden" style={{ height: 'calc(100vh - 0px)' }}>

      {/* ── Map / 360 embed ── */}
      <div className="absolute inset-0">
        {activeLayer === 'map' ? (
          <iframe
            title="Campus Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.56,22.98,72.62,23.04&layer=mapnik"
            className="w-full h-full border-0"
            style={{ filter: 'hue-rotate(240deg) saturate(0.8) brightness(0.85)' }}
          />
        ) : (
          <iframe
            title="Campus Street View"
            src="https://www.google.com/maps/embed?pb=!4v1700000000000!6m8!1m7!1s0x0:0x0!2m2!1d23.0225!2d72.5714!3f0!4f0!5f0.7820865974627469"
            className="w-full h-full border-0"
          />
        )}
      </div>

      {/* Purple overlay gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface-dark/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-dark/60 to-transparent pointer-events-none" />

      {/* ── Top Controls ── */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass glow-border-purple rounded-full px-6 py-3 flex items-center gap-4 shadow-glass"
        >
          <Map size={16} className="text-primary-400" />
          <span className="font-outfit font-semibold text-sm text-[var(--color-text)]">Campus Virtual Tour</span>
          <div className="w-px h-4 bg-white/20" />
          {/* Layer toggle */}
          {[
            { id: 'map',     label: 'Map View'    },
            { id: 'street',  label: 'Street View' },
          ].map(l => (
            <button
              key={l.id}
              onClick={() => setActiveLayer(l.id)}
              className={`text-xs font-outfit px-3 py-1.5 rounded-full transition-all duration-300
                ${activeLayer === l.id
                  ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Left Floating Controls ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3"
      >
        {[
          { icon: ZoomIn,     tip: 'Zoom In'    },
          { icon: ZoomOut,    tip: 'Zoom Out'   },
          { icon: RotateCcw,  tip: 'Reset'      },
          { icon: Navigation, tip: 'Navigate'   },
          { icon: Layers,     tip: 'Layers'     },
          { icon: Maximize2,  tip: 'Fullscreen' },
        ].map(({ icon: Icon, tip }) => (
          <motion.button
            key={tip}
            whileHover={{ scale: 1.12, x: 4 }}
            whileTap={{ scale: 0.95 }}
            title={tip}
            className="glass glow-border-purple w-11 h-11 rounded-2xl flex items-center justify-center
              text-primary-400 hover:text-white hover:bg-primary-600/40 transition-all duration-300"
          >
            <Icon size={18} />
          </motion.button>
        ))}
      </motion.div>

      {/* ── Bottom Info Panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4"
      >
        <div className="glass glow-border-purple rounded-3xl p-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
              <Navigation size={18} className="text-white" />
            </div>
            <div>
              <p className="font-outfit font-semibold text-sm text-[var(--color-text)]">Main Campus — Block A</p>
              <p className="text-xs text-[var(--color-muted)]">Engineering & Technology Department</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['Library', 'Cafeteria', 'Labs', 'Hostel'].map(place => (
              <button
                key={place}
                className="text-xs glass px-3 py-1.5 rounded-full font-outfit text-primary-300
                  hover:bg-primary-600/20 transition-all duration-300"
              >
                {place}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowInfo(s => !s)}
            className="glass glow-border-purple w-10 h-10 rounded-2xl flex items-center justify-center text-primary-400 shrink-0"
          >
            <Info size={16} />
          </button>
        </div>
      </motion.div>

      {/* ── Info side panel ── */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: showInfo ? 1 : 0, x: showInfo ? 0 : 300 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-64 pointer-events-none"
        style={{ pointerEvents: showInfo ? 'all' : 'none' }}
      >
        <div className="glass glow-border-purple rounded-3xl p-5 space-y-3">
          <h3 className="font-outfit font-bold text-base text-gradient">Campus Info</h3>
          {[
            { label: 'Area',    value: '50 Acres'   },
            { label: 'Blocks',  value: '8 Buildings'},
            { label: 'Labs',    value: '24 Labs'    },
            { label: 'Hostels', value: '4 Hostels'  },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-[var(--color-muted)] font-inter">{label}</span>
              <span className="font-outfit font-semibold text-[var(--color-text)]">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
