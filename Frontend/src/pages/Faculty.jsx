import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mail, Phone, MapPin, Clock, X, Star, Edit3 } from 'lucide-react'
import Badge from '../components/ui/Badge'
import GradientButton from '../components/ui/GradientButton'
import FloatingBlobs from '../components/shared/FloatingBlobs'
import { useAuth } from '../context/AuthContext'
import { FACULTY_DB } from '../data/mockData'

const DEPTS = ['All', 'CSE', 'ECE', 'Mech', 'Civil', 'IT']
const deptColor = { CSE: 'purple', ECE: 'cyan', Mech: 'orange', Civil: 'green', IT: 'pink' }

export default function Faculty() {
  const { user } = useAuth()
  const isFaculty = user?.role === 'faculty'

  // Load faculty list for user's college, fallback to original mock list
  const collegeId = user?.college?.id
  const rawFaculty = FACULTY_DB[collegeId] || Object.values(FACULTY_DB)[0] || []

  const [dept,     setDept]     = useState('All')
  const [query,    setQuery]    = useState('')
  const [selected, setSelected] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState(null)

  // When faculty views their own profile, auto-open edit modal
  const myRecord = isFaculty ? rawFaculty.find(f => f.id === user?.facultyId) : null

  const openMyProfile = () => {
    setEditData({ ...myRecord })
    setEditMode(true)
    setSelected(myRecord)
  }

  const filtered = rawFaculty.filter(f =>
    (dept === 'All' || f.dept === dept) &&
    f.name.toLowerCase().includes(query.toLowerCase())
  )

  // Separate my card vs others
  const myCard  = isFaculty ? filtered.find(f => f.id === user?.facultyId) : null
  const others  = isFaculty ? filtered.filter(f => f.id !== user?.facultyId) : filtered

  return (
    <div className="relative flex-1 overflow-auto p-6 lg:p-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><FloatingBlobs count={2} /></div>
      <div className="relative z-10 max-w-6xl mx-auto space-y-6">

        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-outfit font-bold text-3xl text-gradient mb-1">Faculty Directory</h1>
          <p className="text-[var(--color-muted)] font-inter text-sm">
            {user?.college?.name ? `${user.college.name} — ` : ''}Meet your amazing educators 🎓
          </p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search faculty..."
              className="input-glass w-full rounded-2xl py-3 pl-10 pr-4 text-sm" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {DEPTS.map(d => (
              <button key={d} onClick={() => setDept(d)}
                className={`px-4 py-3 rounded-2xl text-sm font-outfit font-semibold transition-all duration-300
                  ${dept === d ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-glow-purple' : 'glass text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}>
                {d}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── My Profile (faculty only) pinned at top ── */}
        {myCard && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-3">
              <Star size={15} className="text-amber-400" />
              <span className="text-sm font-outfit font-semibold text-amber-400">Your Profile</span>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-400/30 to-transparent" />
            </div>
            <div className="glass rounded-4xl overflow-hidden border border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
              <div className={`h-28 bg-gradient-to-br ${myCard.color} flex items-center justify-center relative`}>
                <div className="absolute inset-0 shimmer opacity-20" />
                <span className="text-5xl">{myCard.emoji}</span>
                <Badge variant={deptColor[myCard.dept] || 'purple'} className="absolute top-3 right-3">{myCard.dept}</Badge>
                <div className="absolute top-3 left-3 bg-amber-400/20 border border-amber-400/50 rounded-xl px-2 py-1">
                  <span className="text-amber-300 text-xs font-outfit font-bold">✦ My Profile</span>
                </div>
              </div>
              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-outfit font-bold text-lg text-[var(--color-text)]">{myCard.name}</h3>
                  <p className="text-sm text-[var(--color-muted)] font-inter">{myCard.role}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-muted)]">
                    <span className="flex items-center gap-1"><Mail size={11} />{myCard.email}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} />Room {myCard.room}</span>
                  </div>
                  {myCard.subjects && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {myCard.subjects.map(s => <Badge key={s} variant="cyan">{s}</Badge>)}
                    </div>
                  )}
                </div>
                <GradientButton size="sm" onClick={openMyProfile} className="flex items-center gap-2 shrink-0">
                  <Edit3 size={13} /> Edit My Profile
                </GradientButton>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Other Faculty Cards ── */}
        {others.length > 0 && (
          <>
            {myCard && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-outfit text-[var(--color-muted)]">Other Faculty</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            )}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence>
                {others.map((f, i) => (
                  <motion.div key={f.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.04 }}
                    onClick={() => { setSelected(f); setEditMode(false) }}
                    className="glass glow-border-purple rounded-3xl overflow-hidden cursor-pointer group hover:-translate-y-2 hover:shadow-glow-purple transition-all duration-300">
                    <div className={`h-28 bg-gradient-to-br ${f.color} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 shimmer opacity-20" />
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{f.emoji}</span>
                      <Badge variant={deptColor[f.dept] || 'purple'} className="absolute top-3 right-3">{f.dept}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-outfit font-bold text-sm text-[var(--color-text)] group-hover:text-gradient transition-all truncate">{f.name}</h3>
                      <p className="text-xs text-[var(--color-muted)] font-inter mt-0.5 truncate">{f.role}</p>
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-[var(--color-muted)]">
                        <Clock size={11} /><span className="truncate">{f.hours}</span>
                      </div>
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs text-primary-400 font-outfit">View Details →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--color-muted)] font-inter">
            <p className="text-4xl mb-3">🔍</p>
            <p>No faculty found matching your search.</p>
          </div>
        )}

      </div>

      {/* ── Detail / Edit Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setSelected(null); setEditMode(false) }}>
            <motion.div initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              onClick={e => e.stopPropagation()}
              className="glass glow-border-purple rounded-4xl overflow-hidden w-full max-w-sm">

              <div className={`h-36 bg-gradient-to-br ${selected.color} flex flex-col items-center justify-center gap-2 relative`}>
                <div className="absolute inset-0 shimmer opacity-20" />
                <span className="text-6xl">{selected.emoji}</span>
                <Badge variant={deptColor[selected.dept] || 'purple'}>{selected.dept}</Badge>
                <button onClick={() => { setSelected(null); setEditMode(false) }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                  <X size={14} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {editMode && isFaculty ? (
                  /* ── Edit mode (faculty editing own profile) ── */
                  <div className="space-y-3">
                    <h2 className="font-outfit font-bold text-lg text-gradient">Edit My Profile</h2>
                    {[
                      { key: 'phone', label: 'Phone',        icon: Phone   },
                      { key: 'room',  label: 'Office Room',  icon: MapPin  },
                      { key: 'hours', label: 'Office Hours', icon: Clock   },
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-primary-500/20 flex items-center justify-center shrink-0">
                          <Icon size={13} className="text-primary-400" />
                        </div>
                        <input
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-inter text-[var(--color-text)] focus:border-primary-500/50 outline-none transition-colors"
                          value={editData?.[key] || ''}
                          onChange={e => setEditData(d => ({ ...d, [key]: e.target.value }))}
                          placeholder={label}
                        />
                      </div>
                    ))}
                    <div className="flex gap-2 pt-2">
                      <GradientButton size="sm" className="flex-1" onClick={() => { setSelected(null); setEditMode(false) }}>
                        Save Changes
                      </GradientButton>
                      <GradientButton variant="ghost" size="sm" onClick={() => setEditMode(false)}>Cancel</GradientButton>
                    </div>
                  </div>
                ) : (
                  /* ── View mode ── */
                  <>
                    <div>
                      <h2 className="font-outfit font-bold text-xl text-gradient">{selected.name}</h2>
                      <p className="text-sm text-[var(--color-muted)] font-inter">{selected.role}</p>
                      {selected.experience && <p className="text-xs text-primary-400 font-outfit mt-0.5">{selected.experience} experience</p>}
                    </div>

                    {selected.subjects && (
                      <div className="flex flex-wrap gap-2">
                        {selected.subjects.map(s => <Badge key={s} variant="cyan">{s}</Badge>)}
                      </div>
                    )}

                    {[
                      { icon: Mail,   label: selected.email              },
                      { icon: Phone,  label: selected.phone              },
                      { icon: MapPin, label: `Room ${selected.room}`     },
                      { icon: Clock,  label: selected.hours              },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 text-sm text-[var(--color-text)]">
                        <div className="w-8 h-8 rounded-xl bg-primary-500/20 flex items-center justify-center shrink-0">
                          <Icon size={14} className="text-primary-400" />
                        </div>
                        <span className="font-inter text-sm">{label}</span>
                      </div>
                    ))}

                    <div className="flex gap-3 pt-2">
                      <GradientButton className="flex-1 text-sm flex items-center justify-center gap-2" size="sm">
                        <Mail size={14} /> Email
                      </GradientButton>
                      {isFaculty && selected.id === user?.facultyId && (
                        <GradientButton variant="ghost" size="sm" onClick={() => setEditMode(true)} className="flex items-center gap-1.5">
                          <Edit3 size={13} /> Edit
                        </GradientButton>
                      )}
                      <GradientButton variant="ghost" size="sm" className="text-sm" onClick={() => setSelected(null)}>
                        Close
                      </GradientButton>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
