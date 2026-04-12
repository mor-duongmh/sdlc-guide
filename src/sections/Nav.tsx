import { useState, useEffect, useCallback } from 'react'
import { BookOpen, Sun, Moon } from 'lucide-react'

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggle = useCallback(() => setDark((d) => !d), [])
  return { dark, toggle }
}

export function Nav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState('hero')
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActive(e.target.id) } },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    for (const s of sections) { const el = document.getElementById(s.id); if (el) obs.observe(el) }
    return () => obs.disconnect()
  }, [sections])

  return (
    <nav className="sticky top-0 z-50 bg-nav border-b border-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-14 gap-1 overflow-x-auto">
        <div className="flex items-center gap-2 mr-6 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold text-text-inv tracking-wide font-heading">SDLC Guide</span>
        </div>
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 shrink-0 ${
              active === s.id
                ? 'bg-primary text-white'
                : 'text-text-inv/60 hover:text-text-inv hover:bg-white/10'
            }`}>
            {s.label}
          </a>
        ))}
        <div className="flex-1" />
        <button
          onClick={toggle}
          className="shrink-0 w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-text-inv/70 hover:text-text-inv transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="w-4 h-4" strokeWidth={2} /> : <Moon className="w-4 h-4" strokeWidth={2} />}
        </button>
      </div>
    </nav>
  )
}
