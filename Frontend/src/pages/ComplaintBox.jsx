import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Lock, CheckCircle, ChevronDown, AlertTriangle } from 'lucide-react'
import GradientButton from '../components/ui/GradientButton'
import FloatingInput from '../components/ui/FloatingInput'
import FloatingBlobs from '../components/shared/FloatingBlobs'

const CATEGORIES = ['Academic Issue','Infrastructure','Ragging / Bullying','Faculty Misconduct','Food / Canteen','Hostel','Other']

export default function ComplaintBox() {
  const [category, setCategory]   = useState('')
  const [title, setTitle]         = useState('')
  const [desc, setDesc]           = useState('')
  const [anon, setAnon]           = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [descFocus, setDescFocus] = useState(false)
  const [catOpen, setCatOpen]     = useState(false)

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <div className="relative flex-1 overflow-auto p-6 lg:p-8 flex items-start justify-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><FloatingBlobs count={2} /></div>
      <div className="relative z-10 w-full max-w-2xl space-y-6">

        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-pink-500 shadow-glow-purple mx-auto mb-2 relative">
            <Shield size={36} className="text-white" />
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
              <Lock size={12} className="text-white" />
            </div>
          </div>
          <h1 className="font-outfit font-bold text-3xl text-gradient">Complaint Box</h1>
          <p className="text-[var(--color-muted)] font-inter text-sm max-w-md mx-auto">Your voice matters. All complaints are reviewed seriously and treated with full confidentiality.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[{ label:'End-to-End Encrypted',icon:Lock },{ label:'Anonymous Option',icon:Shield },{ label:'Reviewed in 48h',icon:CheckCircle }].map(({ label, icon: Icon }) => (
              <div key={label} className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-outfit text-emerald-300">
                <Icon size={12} className="text-emerald-400" />{label}
              </div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="glass glow-border-cyan rounded-4xl p-12 text-center space-y-5">
              <div className="text-7xl mx-auto">✅</div>
              <h2 className="font-outfit font-bold text-2xl text-gradient-cyan">Complaint Submitted!</h2>
              <p className="text-[var(--color-muted)] font-inter text-sm">Your complaint has been securely recorded. You'll receive an update within 48 hours.</p>
              <div className="glass px-4 py-2 rounded-2xl inline-block">
                <p className="text-xs font-outfit text-primary-400">Reference ID: <span className="font-bold">#CB{Math.random().toString(36).substr(2,6).toUpperCase()}</span></p>
              </div>
              <GradientButton onClick={() => { setSubmitted(false); setTitle(''); setDesc(''); setCategory('') }} variant="ghost">Submit Another</GradientButton>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              onSubmit={handleSubmit} className="glass glow-border-purple rounded-4xl p-8 space-y-5">
              {/* Anon toggle */}
              <div className="flex items-center justify-between p-4 glass rounded-2xl">
                <div>
                  <p className="font-outfit font-semibold text-sm text-[var(--color-text)]">Submit Anonymously</p>
                  <p className="text-xs text-[var(--color-muted)] font-inter mt-0.5">Your identity won't be shared</p>
                </div>
                <button type="button" onClick={() => setAnon(a => !a)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative ${anon ? 'bg-gradient-to-r from-violet-600 to-pink-500' : 'bg-white/10'}`}>
                  <motion.div animate={{ x: anon ? 24 : 2 }} transition={{ type:'spring', stiffness:400, damping:24 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>
              {/* Category */}
              <div className="relative">
                <button type="button" onClick={() => setCatOpen(o => !o)}
                  className={`input-glass w-full rounded-2xl px-4 py-4 text-sm text-left flex items-center justify-between ${catOpen ? 'shadow-glow-purple' : ''}`}>
                  <span className={category ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}>{category || 'Select Category'}</span>
                  <motion.div animate={{ rotate: catOpen ? 180 : 0 }}><ChevronDown size={16} className="text-[var(--color-muted)]" /></motion.div>
                </button>
                <AnimatePresence>
                  {catOpen && (
                    <motion.div initial={{ opacity:0,y:-8,scaleY:0.9 }} animate={{ opacity:1,y:0,scaleY:1 }} exit={{ opacity:0,y:-8,scaleY:0.9 }}
                      className="absolute top-full mt-2 left-0 right-0 glass-strong glow-border-purple rounded-2xl overflow-hidden z-50">
                      {CATEGORIES.map(c => (
                        <button key={c} type="button" onClick={() => { setCategory(c); setCatOpen(false) }}
                          className="w-full text-left px-4 py-3 text-sm font-inter text-[var(--color-text)] hover:bg-primary-500/15 transition-colors">{c}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <FloatingInput label="Complaint Title" value={title} onChange={e => setTitle(e.target.value)} icon={AlertTriangle} />
              {/* Textarea */}
              <div className={`relative input-glass rounded-2xl transition-all duration-300 ${descFocus ? 'shadow-glow-purple' : ''}`}>
                <label className={`absolute left-4 pointer-events-none font-inter transition-all duration-300 ${desc.length > 0 || descFocus ? 'top-2 text-xs text-primary-400' : 'top-4 text-sm text-[var(--color-muted)]'}`}>
                  Describe the issue in detail...
                </label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} onFocus={() => setDescFocus(true)} onBlur={() => setDescFocus(false)}
                  rows={5} className="w-full bg-transparent pt-8 pb-4 px-4 text-sm text-[var(--color-text)] resize-none outline-none" />
                <div className="px-4 pb-2 text-right text-xs text-[var(--color-muted)]">{desc.length}/500</div>
              </div>
              <GradientButton type="submit" size="lg" className="w-full flex items-center justify-center gap-2" disabled={!title || !desc || !category}>
                <Shield size={18} /> Submit Securely
              </GradientButton>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
