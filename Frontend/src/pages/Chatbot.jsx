import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, RotateCcw } from 'lucide-react'
import GradientButton from '../components/ui/GradientButton'
import FloatingBlobs from '../components/shared/FloatingBlobs'

const INITIAL = [
  { id: 0, from: 'bot', text: "Hey there! 👋 I'm Buddy, your campus AI assistant. Ask me anything about courses, schedules, events, or campus life!" },
]

const SUGGESTIONS = [
  "What's the exam schedule?",
  "Where's the nearest ATM?",
  "Library timings?",
  "How to apply for leave?",
]

const RESPONSES = {
  exam:     "📅 Mid-term exams are scheduled from **May 12–18**. Check the notice board in Block A or the academic portal for your specific subject timetable.",
  atm:      "🏧 The nearest ATM is at the Main Gate (SBI) and one more inside the Admin Block (HDFC). Both are open 24/7!",
  library:  "📚 Library is open **Mon–Sat, 8 AM – 9 PM** and **Sunday 10 AM – 6 PM**. Extended hours during exam week!",
  leave:    "📋 To apply for leave: go to the Student Portal → Leave Application → Fill the form → Get HOD approval. Process takes 2–3 working days.",
  default:  "🤔 That's a great question! I'm still learning. Try asking about exams, library, ATMs, or leave applications.",
}

function getReply(text) {
  const t = text.toLowerCase()
  if (t.includes('exam') || t.includes('schedule') || t.includes('test')) return RESPONSES.exam
  if (t.includes('atm') || t.includes('bank') || t.includes('money')) return RESPONSES.atm
  if (t.includes('library') || t.includes('book')) return RESPONSES.library
  if (t.includes('leave') || t.includes('absent')) return RESPONSES.leave
  return RESPONSES.default
}

function BotAvatar() {
  return (
    <div className="relative shrink-0">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 blur-md opacity-60 scale-110" />
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-lg">
        🤖
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-4">
      <BotAvatar />
      <div className="glass glow-border-purple rounded-3xl rounded-bl-sm px-5 py-4 flex gap-2 items-center">
        {[0, 1, 2].map(i => (
          <div key={i} className="typing-dot" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [messages, setMessages] = useState(INITIAL)
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text) => {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: getReply(text) }])
    }, 1200 + Math.random() * 600)
  }

  const reset = () => setMessages(INITIAL)

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden" style={{ maxHeight: '100vh' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingBlobs count={2} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass border-b border-white/10 px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <BotAvatar />
          <div>
            <h1 className="font-outfit font-bold text-lg text-gradient">Buddy AI</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400 font-inter">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="glass px-3 py-1.5 rounded-full text-xs text-primary-300 font-outfit flex items-center gap-1.5">
            <Sparkles size={12} /> AI Powered
          </span>
          <button onClick={reset} className="glass w-9 h-9 rounded-2xl flex items-center justify-center text-[var(--color-muted)] hover:text-primary-400 transition-colors">
            <RotateCcw size={16} />
          </button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-2">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`flex items-end gap-3 mb-4 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.from === 'bot'
                ? <BotAvatar />
                : (
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 blur-md opacity-50 scale-110" />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white font-outfit font-bold text-sm">A</div>
                  </div>
                )
              }
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-5 py-4 rounded-3xl text-sm font-inter leading-relaxed
                ${msg.from === 'bot'
                  ? 'glass glow-border-purple rounded-bl-sm text-[var(--color-text)]'
                  : 'bg-gradient-to-br from-violet-600 to-pink-500 text-white rounded-br-sm shadow-glow-purple'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="relative z-10 px-6 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => send(s)}
            className="shrink-0 glass px-3 py-1.5 rounded-full text-xs font-outfit text-primary-300 hover:bg-primary-500/20 transition-all duration-300"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="relative z-10 glass border-t border-white/10 px-6 py-4">
        <div className="flex gap-3 items-center">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="Ask Buddy anything..."
            className="input-glass flex-1 rounded-2xl px-5 py-3.5 text-sm"
          />
          <GradientButton
            onClick={() => send(input)}
            className="w-12 h-12 !p-0 flex items-center justify-center rounded-2xl shrink-0"
            disabled={!input.trim()}
          >
            <Send size={18} />
          </GradientButton>
        </div>
      </div>
    </div>
  )
}
