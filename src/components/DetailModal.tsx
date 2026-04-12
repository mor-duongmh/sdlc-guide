import { useEffect, useRef } from 'react'
import { X, FileText, ListChecks, AlertTriangle, Lightbulb, Code2 } from 'lucide-react'
import type { SkillDetail } from '../data/skill-details'

type Props = {
  detail: SkillDetail | null
  onClose: () => void
}

export function DetailModal({ detail, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!detail) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [detail, onClose])

  if (!detail) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 cursor-pointer"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />

      {/* Panel — fixed height with internal scroll */}
      <div
        className="relative w-full max-w-3xl card flex flex-col cursor-default animate-[fadeInUp_200ms_ease-out]"
        style={{ animationFillMode: 'both', maxHeight: 'calc(100vh - 48px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-6 py-5 border-b border-border">
          <div className="min-w-0">
            <span className="text-[10px] font-extrabold tracking-[0.15em] text-indigo uppercase">{detail.subtitle}</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-text mt-0.5 font-heading">{detail.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-xl bg-surface-2 flex items-center justify-center text-text-dim hover:text-text hover:bg-surface-3 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body — custom scrollbar */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 modal-scroll">
          {/* Purpose */}
          <div>
            <SectionLabel icon={Lightbulb} label="Mục đích / Purpose" />
            <p className="text-sm text-text-muted leading-relaxed">{detail.purpose}</p>
          </div>

          {/* Steps */}
          <div>
            <SectionLabel icon={ListChecks} label="Steps Chi Tiết" />
            <div className="space-y-3 mt-2">
              {detail.steps.map((s, i) => (
                <div key={i} className="rounded-xl card-inset p-4">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-indigo/15 flex items-center justify-center text-[10px] font-extrabold text-indigo">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-text">{s.step}</h4>
                      <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">{s.description}</p>
                      {s.actions.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {s.actions.map((a, j) => (
                            <li key={j} className="text-[11px] text-text-muted flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Output */}
          <div>
            <SectionLabel icon={FileText} label="Output Required" />
            <div className="rounded-xl card-inset p-4 mt-2">
              {detail.output.file && (
                <div className="mb-2">
                  <span className="text-[10px] font-bold text-text-dim uppercase tracking-wider">File: </span>
                  <code className="text-[11px] font-mono text-indigo">{detail.output.file}</code>
                </div>
              )}
              <p className="text-[11px] text-text-muted mb-2">{detail.output.format}</p>
              <div className="flex flex-wrap gap-1.5">
                {detail.output.requiredSections.map((s) => (
                  <span key={s} className="text-[10px] px-2.5 py-1 rounded-lg bg-indigo/10 text-indigo font-bold">
                    {s}
                  </span>
                ))}
              </div>
              {detail.output.example && (
                <pre className="mt-3 rounded-xl card-inset p-3 overflow-x-auto">
                  <code className="text-[10px] leading-relaxed font-mono text-text-muted whitespace-pre">{detail.output.example}</code>
                </pre>
              )}
            </div>
          </div>

          {/* Example */}
          {detail.example && (
            <div>
              <SectionLabel icon={Code2} label="Example" />
              <pre className="mt-2 rounded-xl card-inset p-4 overflow-x-auto">
                <code className="text-[10px] sm:text-[11px] leading-relaxed font-mono text-text-muted whitespace-pre">{detail.example}</code>
              </pre>
            </div>
          )}

          {/* Tips */}
          {detail.tips && detail.tips.length > 0 && (
            <div>
              <SectionLabel icon={Lightbulb} label="Tips" color="text-amber" />
              <ul className="mt-2 space-y-1.5">
                {detail.tips.map((t, i) => (
                  <li key={i} className="text-[11px] text-text-muted flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Red Flags */}
          {detail.redFlags && detail.redFlags.length > 0 && (
            <div>
              <SectionLabel icon={AlertTriangle} label="Red Flags — NEVER" color="text-red" />
              <div className="mt-2 rounded-xl bg-red/8 p-4">
                <ul className="space-y-1.5">
                  {detail.redFlags.map((r, i) => (
                    <li key={i} className="text-[11px] text-text-muted flex items-start gap-2">
                      <span className="text-red text-[10px] mt-0.5 shrink-0">{'\u2718'}</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ icon: Icon, label, color = 'text-indigo' }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string; color?: string }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`w-4 h-4 ${color}`} strokeWidth={1.5} />
      <h3 className={`text-xs font-bold uppercase tracking-wider ${color}`}>{label}</h3>
    </div>
  )
}
