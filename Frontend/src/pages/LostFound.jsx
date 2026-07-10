import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Upload, X, Plus, MapPin, Clock, Tag, Image as ImgIcon } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import GradientButton from '../components/ui/GradientButton'
import Badge from '../components/ui/Badge'
import FloatingBlobs from '../components/shared/FloatingBlobs'

const ITEMS = [
  { id: 1, title: 'Blue Water Bottle',   category: 'Bottle',  status: 'lost',  location: 'Block A Canteen',    time: '2h ago',  img: null, color: 'from-blue-500 to-cyan-400'    },
  { id: 2, title: 'Black Wallet',        category: 'Wallet',  status: 'found', location: 'Library Floor 2',    time: '5h ago',  img: null, color: 'from-slate-600 to-gray-500'   },
  { id: 3, title: 'Airpods Pro Case',    category: 'Gadget',  status: 'lost',  location: 'Seminar Hall B',     time: '1d ago',  img: null, color: 'from-white/40 to-slate-300/40'},
  { id: 4, title: 'Purple Umbrella',     category: 'Other',   status: 'found', location: 'Parking Lot',        time: '3h ago',  img: null, color: 'from-violet-500 to-purple-400'},
  { id: 5, title: 'Student ID Card',     category: 'ID',      status: 'found', location: 'Admin Block',        time: '6h ago',  img: null, color: 'from-yellow-400 to-orange-400'},
  { id: 6, title: 'Scientific Calc',     category: 'Gadget',  status: 'lost',  location: 'Lab 3, CSE Block',   time: '2d ago',  img: null, color: 'from-emerald-500 to-teal-400' },
]

const icons = { Bottle: '🧴', Wallet: '👜', Gadget: '🎧', Other: '☂️', ID: '🪪' }

export default function LostFound() {
  const [filter, setFilter]       = useState('all')
  const [query, setQuery]         = useState('')
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview]     = useState(null)
  const fileRef = useRef()

  const filtered = ITEMS.filter(i => {
    const matchStatus = filter === 'all' || i.status === filter
    const matchQuery  = i.title.toLowerCase().includes(query.toLowerCase())
    return matchStatus && matchQuery
  })

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) setPreview(URL.createObjectURL(f))
  }

  return (
    <div className="relative flex-1 overflow-auto p-6 lg:p-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingBlobs count={2} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-outfit font-bold text-3xl text-gradient mb-1">Lost & Found</h1>
          <p className="text-[var(--color-muted)] font-inter text-sm">Help your campus mates recover their belongings ✨</p>
        </motion.div>

        {/* Search + Filter + Add */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search items..."
              className="input-glass w-full rounded-2xl py-3 pl-10 pr-4 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {['all','lost','found'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-3 rounded-2xl text-sm font-outfit font-semibold capitalize transition-all duration-300
                  ${filter === f
                    ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-glow-purple'
                    : 'glass text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
          <GradientButton onClick={() => setShowModal(true)} className="flex items-center gap-2 whitespace-nowrap">
            <Plus size={16} /> Report Item
          </GradientButton>
        </motion.div>

        {/* Items Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="glass glow-border-purple rounded-3xl overflow-hidden group hover:-translate-y-1 hover:shadow-glow-purple transition-all duration-300 cursor-pointer"
              >
                {/* Image strip */}
                <div className={`h-32 bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-5xl">{icons[item.category] || '📦'}</span>
                  <div className="absolute inset-0 shimmer opacity-20" />
                  <Badge
                    variant={item.status === 'lost' ? 'pink' : 'green'}
                    className="absolute top-3 right-3 capitalize"
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-outfit font-bold text-base text-[var(--color-text)] group-hover:text-gradient transition-all">{item.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                    <MapPin size={12} /><span>{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                      <Clock size={12} /><span>{item.time}</span>
                    </div>
                    <Badge variant="purple">{item.category}</Badge>
                  </div>
                  <GradientButton size="sm" variant="ghost" className="w-full mt-1 text-xs">
                    {item.status === 'lost' ? 'I Found This!' : 'This is Mine!'}
                  </GradientButton>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--color-muted)]">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-outfit text-lg">No items match your search</p>
          </div>
        )}
      </div>

      {/* ── Report Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              onClick={e => e.stopPropagation()}
              className="glass glow-border-purple rounded-4xl p-8 w-full max-w-md space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-outfit font-bold text-xl text-gradient">Report an Item</h2>
                <button onClick={() => setShowModal(false)} className="glass w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-muted)] hover:text-red-400 transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Image upload */}
              <div
                onClick={() => fileRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-primary-500/30 hover:border-primary-500/60 rounded-3xl h-40 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-primary-500/5 relative overflow-hidden"
              >
                {preview
                  ? <img src={preview} alt="preview" className="w-full h-full object-cover rounded-3xl" />
                  : <>
                      <ImgIcon size={28} className="text-primary-400" />
                      <p className="text-sm font-outfit text-[var(--color-muted)]">Click to upload image</p>
                    </>
                }
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </div>

              <input placeholder="Item name" className="input-glass w-full rounded-2xl px-4 py-3 text-sm" />
              <div className="flex gap-3">
                <select className="input-glass flex-1 rounded-2xl px-4 py-3 text-sm">
                  <option>Lost</option>
                  <option>Found</option>
                </select>
                <select className="input-glass flex-1 rounded-2xl px-4 py-3 text-sm">
                  <option>Category</option>
                  <option>Gadget</option>
                  <option>Wallet</option>
                  <option>ID</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="relative">
                <MapPin size={15} className="absolute left-4 top-4 text-[var(--color-muted)]" />
                <input placeholder="Location found / last seen" className="input-glass w-full rounded-2xl py-3 pl-10 pr-4 text-sm" />
              </div>
              <GradientButton className="w-full flex items-center justify-center gap-2" size="lg">
                <Upload size={16} /> Submit Report
              </GradientButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
