export default function FloatingBlobs({ count = 3 }) {
  const blobs = [
    { color: 'from-violet-600/30 to-purple-800/20', size: 'w-96 h-96', pos: '-top-20 -left-20', delay: '0s',  dur: '8s'  },
    { color: 'from-pink-500/20 to-fuchsia-600/20',  size: 'w-72 h-72', pos: 'top-1/2 -right-16', delay: '2s',  dur: '10s' },
    { color: 'from-cyan-500/20 to-indigo-600/20',   size: 'w-64 h-64', pos: 'bottom-10 left-1/3', delay: '4s',  dur: '12s' },
  ]

  return (
    <>
      {blobs.slice(0, count).map((b, i) => (
        <div
          key={i}
          className={`absolute ${b.pos} ${b.size} bg-gradient-to-br ${b.color}
            blur-3xl rounded-full animate-blob pointer-events-none`}
          style={{ animationDelay: b.delay, animationDuration: b.dur }}
        />
      ))}
    </>
  )
}
