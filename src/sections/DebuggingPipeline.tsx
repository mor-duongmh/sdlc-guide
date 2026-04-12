import { ChevronRight, Search, BarChart3, FlaskConical, Wrench } from 'lucide-react'
import { SectionHeader } from './CorePipeline'

type Props = { onOpenDetail: (id: string) => void }

const phases = [
  { num: 1, detailId: 'debug-phase-1', title: 'Root Cause Investigation', icon: Search, dotColor: 'bg-red', bg: 'bg-red/8',
    steps: ['Đọc error message CHÍNH XÁC', 'Reproduce bug ổn định', 'Check git log/diff', 'Thêm logging tại MỖI boundary', 'Trace data flow end-to-end'],
    footer: 'Tìm nơi bug phát sinh, không phải nơi biểu hiện' },
  { num: 2, detailId: 'debug-phase-2', title: 'Pattern Analysis', icon: BarChart3, dotColor: 'bg-amber', bg: 'bg-amber/8',
    steps: ['Tìm WORKING code tương tự', 'So sánh working vs broken (ĐỌC HẾT)', 'Xác định TẤT CẢ differences', 'Map dependency chain'],
    footer: 'Hiểu working code sẽ thấy broken code thiếu gì' },
  { num: 3, detailId: 'debug-phase-3', title: 'Hypothesis & Testing', icon: FlaskConical, dotColor: 'bg-blue', bg: 'bg-blue/8',
    steps: ['MỘT hypothesis duy nhất', 'Test MỘT variable', 'Verify trước khi continue', '"Chưa biết" khi chưa rõ'],
    footer: '3+ fixes fail \u2192 STOP \u2192 Question architecture', critical: true },
  { num: 4, detailId: 'debug-phase-4', title: 'Implementation', icon: Wrench, dotColor: 'bg-emerald', bg: 'bg-emerald/8',
    steps: ['Failing test reproduce bug TRƯỚC', 'MỘT fix duy nhất', 'Verify fix + all tests pass', 'Defense in depth: validate MỖI layer'],
    footer: 'Fix bao gồm cả test chứng minh nó work' },
]

const techniques = [
  { name: 'Root Cause Tracing', desc: 'Trace ngược từ error đến source gốc. Fix tại nguồn.', bg: 'bg-red/8' },
  { name: 'Defense in Depth', desc: 'Validate ở MỖI layer: Entry \u2192 Business Logic \u2192 Environment \u2192 Debug', bg: 'bg-amber/8' },
  { name: 'Condition-Based Waiting', desc: 'Wait theo condition thực tế, không setTimeout/sleep tuỳ ý.', bg: 'bg-cyan/8' },
]

export function DebuggingPipeline({ onOpenDetail }: Props) {
  return (
    <section id="debug" className="py-14">
      <SectionHeader badge="DEBUGGING" title="Systematic Debug 4 Phase"
        desc="Iron Law: KHÔNG FIX KHI CHƯA TÌM RA ROOT CAUSE. Hoàn thành mỗi phase trước." />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {phases.map((p) => (
          <button key={p.title} onClick={() => onOpenDetail(p.detailId)}
            className={`card p-5 text-left cursor-pointer flex flex-col h-full ${p.bg}`}>
            {/* Header: icon + phase + title cùng hàng */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-2xl ${p.dotColor}/15 flex items-center justify-center shrink-0`}>
                  <p.icon className="w-5 h-5 text-text" strokeWidth={1.5} />
                </span>
                <div>
                  <span className="text-[10px] font-bold text-text-dim">Phase {p.num}</span>
                  <h4 className="text-sm font-bold text-text font-heading leading-tight">{p.title}</h4>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-dim shrink-0" />
            </div>

            {/* Steps */}
            <ul className="space-y-2 mb-4 flex-1">
              {p.steps.map((s) => (
                <li key={s} className="text-[11px] text-text-muted flex items-start gap-2">
                  <span className={`mt-1 w-1.5 h-1.5 rounded-full ${p.dotColor} shrink-0`} />{s}
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className={`px-3 py-2 rounded-xl ${p.critical ? 'bg-red/10' : 'card-inset'}`}>
              <p className={`text-[10px] font-bold ${p.critical ? 'text-red' : 'text-text-dim'}`}>{p.footer}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <div className="card-sm px-5 py-2.5 flex items-center gap-2.5">
          {phases.map((p, i) => (
            <div key={p.num} className="flex items-center gap-2.5">
              <span className={`w-6 h-6 rounded-lg ${p.dotColor}/20 flex items-center justify-center text-[10px] font-black text-text`}>{p.num}</span>
              {i < phases.length - 1 && <span className="text-text-dim text-xs font-bold">{'\u2192'}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {techniques.map((t) => (
          <div key={t.name} className={`card-sm p-4 ${t.bg}`}>
            <h4 className="text-xs font-bold text-text mb-1 font-heading">{t.name}</h4>
            <p className="text-[10px] text-text-muted leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card p-5">
        <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest mb-3 font-heading">Pressure Resistance</h3>
        <p className="text-[11px] text-text-muted mb-3">Skill systematic-debugging rèn khả năng chống lại:</p>
        <div className="flex flex-wrap gap-2">
          {['Time pressure ($15k/min)','Sunk cost (debug 4 tiếng)','Authority ("fix nhanh đi")','Economic pressure','Kiệt sức','Social conformity','Pragmatic shortcuts'].map((p) => (
            <span key={p} className="text-[10px] px-3 py-1.5 rounded-xl bg-surface-2 text-text-muted font-medium">{p}</span>
          ))}
        </div>
      </div>

      <div className="mt-14 text-center">
        <div className="inline-flex items-center gap-2 card-sm px-6 py-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold text-text-muted">
            AI-Assisted SDLC {'\u2014'} Powered by Superpowers v5.0.7
          </span>
        </div>
      </div>
    </section>
  )
}
