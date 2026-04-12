import React from 'react'
import { ChevronRight } from 'lucide-react'
import { SectionHeader } from './CorePipeline'

type Props = { onOpenDetail: (id: string) => void }

const statuses = [
  { status: 'DONE', color: 'bg-emerald/15 text-emerald', desc: 'Hoàn thành, chuyển sang spec review' },
  { status: 'DONE_WITH_CONCERNS', color: 'bg-amber/15 text-amber', desc: 'Xong nhưng có concerns' },
  { status: 'NEEDS_CONTEXT', color: 'bg-blue/15 text-blue', desc: 'Cần thêm context từ controller' },
  { status: 'BLOCKED', color: 'bg-red/15 text-red', desc: 'Không thể continue' },
]

const pipelineSteps = [
  { num: '1', detailId: 'sdd-controller', title: 'Controller', subtitle: 'Main Session', dotColor: 'bg-purple', bg: 'bg-purple/8',
    items: ['Đọc plan, tạo TodoWrite', 'Dispatch implementer mỗi task', 'Gửi full task text', 'Chọn model theo complexity'],
    footer: { type: 'note' as const, text: 'Cheap: 1-2 files | Standard: multi-file | Capable: architecture' } },
  { num: '2', detailId: 'sdd-implementer', title: 'Implementer', subtitle: 'Fresh Subagent', dotColor: 'bg-indigo', bg: 'bg-indigo/8',
    items: ['Hỏi questions TRƯỚC', 'TDD: Red \u2192 Green \u2192 Refactor', 'Self-review trước report', 'Commit + report status'] },
  { num: '3', detailId: 'sdd-spec-review', title: 'Spec Review', subtitle: 'Fresh Subagent', dotColor: 'bg-amber', bg: 'bg-amber/8',
    items: ['KHÔNG trust implementer report', 'Đọc ACTUAL code', 'Check thiếu / thừa / sai', '\u2705 Compliant hoặc \u274c Issues'],
    footer: { type: 'critical' as const, text: 'Phải pass TRƯỚC quality review' } },
  { num: '4', detailId: 'sdd-quality-review', title: 'Quality Review', subtitle: 'Fresh Subagent', dotColor: 'bg-emerald', bg: 'bg-emerald/8',
    items: ['Code quality + Architecture', 'Test coverage + anti-patterns', 'Production readiness', 'Critical / Important / Minor'],
    footer: { type: 'critical' as const, text: 'CHỈ SAU KHI spec pass' } },
]

export function SDDFlow({ onOpenDetail }: Props) {
  return (
    <section id="sdd" className="py-14">
      <SectionHeader badge="EXECUTION ENGINE" title="Subagent-Driven Development"
        desc="Fresh subagent mỗi task + 2-stage review. Click để xem full workflow." />

      {/* Desktop — grid with arrow columns */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-0 mt-10">
        {pipelineSteps.map((step, i) => (
          <React.Fragment key={step.title}>
            <button onClick={() => onOpenDetail(step.detailId)}
              className={`card p-5 text-left cursor-pointer flex flex-col ${step.bg}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl ${step.dotColor}/20 flex items-center justify-center text-sm font-black text-text shrink-0`}>{step.num}</span>
                  <div>
                    <h4 className="text-sm font-bold text-text font-heading leading-tight">{step.title}</h4>
                    <span className="text-[10px] text-text-dim">{step.subtitle}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-text-dim shrink-0" />
              </div>
              <ul className="space-y-2 flex-1">
                {step.items.map((item) => (
                  <li key={item} className="text-[11px] text-text-muted flex items-start gap-2">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full ${step.dotColor} shrink-0`} />{item}
                  </li>
                ))}
              </ul>
              {step.footer?.type === 'note' && (
                <div className="mt-3 rounded-xl card-inset px-3 py-2">
                  <p className="text-[9px] font-mono text-text-dim">{step.footer.text}</p>
                </div>
              )}
              {step.footer?.type === 'critical' && (
                <div className="mt-3 rounded-xl bg-red/10 px-3 py-2">
                  <p className="text-[10px] font-bold text-red">{step.footer.text}</p>
                </div>
              )}
            </button>
            {i < pipelineSteps.length - 1 && (
              <div className="flex items-center justify-center w-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-text-dim">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile/Tablet */}
      <div className="lg:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pipelineSteps.map((step) => (
          <button key={step.title} onClick={() => onOpenDetail(step.detailId)}
            className={`card p-5 text-left cursor-pointer flex flex-col ${step.bg}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl ${step.dotColor}/20 flex items-center justify-center text-sm font-black text-text shrink-0`}>{step.num}</span>
                <div>
                  <h4 className="text-sm font-bold text-text font-heading leading-tight">{step.title}</h4>
                  <span className="text-[10px] text-text-dim">{step.subtitle}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-dim shrink-0" />
            </div>
            <ul className="space-y-2 flex-1">
              {step.items.map((item) => (
                <li key={item} className="text-[11px] text-text-muted flex items-start gap-2">
                  <span className={`mt-1 w-1.5 h-1.5 rounded-full ${step.dotColor} shrink-0`} />{item}
                </li>
              ))}
            </ul>
            {step.footer?.type === 'note' && (
              <div className="mt-3 rounded-xl card-inset px-3 py-2">
                <p className="text-[9px] font-mono text-text-dim">{step.footer.text}</p>
              </div>
            )}
            {step.footer?.type === 'critical' && (
              <div className="mt-3 rounded-xl bg-red/10 px-3 py-2">
                <p className="text-[10px] font-bold text-red">{step.footer.text}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 card p-5">
        <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest mb-3 font-heading">Status Protocol</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {statuses.map((s) => (
            <div key={s.status} className={`rounded-xl px-4 py-2.5 ${s.color}`}>
              <code className="text-[11px] font-bold font-mono">{s.status}</code>
              <p className="text-[9px] mt-0.5 opacity-80">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 card p-4 bg-red/5">
        <h3 className="text-xs font-bold text-red mb-2 font-heading">Red Flags</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
          {['Skip review vì "đơn giản"','Continue khi còn Critical','Parallel nhiều implementer','Gửi link file (phải full text)','Quality review trước spec pass','Ignore BLOCKED/NEEDS_CONTEXT'].map((r) => (
            <div key={r} className="flex items-start gap-1.5">
              <span className="text-red text-[10px] mt-0.5 font-bold">{'\u2718'}</span>
              <span className="text-[10px] text-text-muted">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
