import React from 'react'
import { Lightbulb, Map, Play, GitBranch, GitFork, FlaskConical, Search, CheckCircle, ChevronRight, ArrowDown } from 'lucide-react'

type Props = { onOpenDetail: (id: string) => void }

const steps = [
  { icon: Lightbulb, detailId: 'brainstorming', label: 'Design', num: '01',
    desc: 'Trao đổi requirements, propose giải pháp, tạo spec document.',
    output: 'specs/YYYY-MM-DD-*-design.md',
    color: 'bg-amber/10', iconColor: 'text-amber' },
  { icon: Map, detailId: 'writing-plans', label: 'Plan', num: '02',
    desc: 'Chia nhỏ thành TDD tasks (2-5 phút/task). Không placeholder.',
    output: 'plans/YYYY-MM-DD-*.md',
    color: 'bg-indigo/10', iconColor: 'text-indigo' },
  { icon: Play, detailId: 'subagent-driven-development', label: 'Execute', num: '03',
    desc: 'Subagent-Driven hoặc tuần tự. Red-Green-Refactor mỗi task.',
    output: 'Code + Tests + Commits',
    color: 'bg-primary/10', iconColor: 'text-primary' },
  { icon: GitBranch, detailId: 'finishing-a-development-branch', label: 'Finish', num: '04',
    desc: 'Verify tests pass, chọn: Merge / PR / Giữ lại / Discard',
    output: 'PR hoặc Merged branch',
    color: 'bg-purple/10', iconColor: 'text-purple' },
]

const supportSkills = [
  { icon: GitFork, detailId: 'using-git-worktrees', label: 'Worktree', color: 'text-cyan', bg: 'bg-cyan/10' },
  { icon: FlaskConical, detailId: 'test-driven-development', label: 'TDD Cycle', color: 'text-red', bg: 'bg-red/10' },
  { icon: Search, detailId: 'requesting-code-review', label: 'Code Review', color: 'text-blue', bg: 'bg-blue/10' },
  { icon: CheckCircle, detailId: 'verification-before-completion', label: 'Verify', color: 'text-emerald', bg: 'bg-emerald/10' },
]

export function CorePipeline({ onOpenDetail }: Props) {
  return (
    <section id="pipeline" className="py-14">
      <SectionHeader badge="CORE WORKFLOW" title="Pipeline Phát Triển"
        desc="Quy trình hoàn chỉnh từ ý tưởng đến production. Click vào step để xem chi tiết." />

      {/* Desktop — horizontal with proper arrows */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-0 mt-10">
        {steps.map((step, i) => (
          <React.Fragment key={step.detailId}>
            <button onClick={() => onOpenDetail(step.detailId)}
              className={`card p-5 flex flex-col text-left cursor-pointer ${step.color}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-2xl ${step.color} flex items-center justify-center`}>
                  <step.icon className={`w-5 h-5 ${step.iconColor}`} strokeWidth={1.5} />
                </div>
                <span className="text-2xl font-bold text-text/10 font-heading">{step.num}</span>
              </div>
              <h3 className="text-sm font-bold text-text mb-1 font-heading">{step.label}</h3>
              <p className="text-[11px] text-text-muted leading-relaxed flex-1">{step.desc}</p>
              <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between">
                <span className="text-[10px] font-mono text-text-dim">{step.output}</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-dim" />
              </div>
            </button>
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center w-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-text-dim">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile — vertical with arrows */}
      <div className="lg:hidden mt-8 space-y-2">
        {steps.map((step, i) => (
          <div key={step.detailId}>
            <button onClick={() => onOpenDetail(step.detailId)}
              className={`w-full card p-4 text-left cursor-pointer ${step.color}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${step.color} flex items-center justify-center shrink-0`}>
                  <step.icon className={`w-4 h-4 ${step.iconColor}`} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-text font-heading">{step.label}</h3>
                  <p className="text-[11px] text-text-muted truncate">{step.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-dim shrink-0" />
              </div>
            </button>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="w-4 h-4 text-text-dim" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Supporting skills */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {supportSkills.map((s) => (
          <button key={s.detailId} onClick={() => onOpenDetail(s.detailId)}
            className={`card-sm px-4 py-3 flex items-center gap-3 cursor-pointer ${s.bg}`}>
            <s.icon className={`w-4 h-4 ${s.color} shrink-0`} strokeWidth={1.5} />
            <div className="text-left min-w-0">
              <span className={`text-xs font-bold ${s.color} block`}>{s.label}</span>
              <p className="text-[9px] font-mono text-text-dim truncate">{s.detailId}</p>
            </div>
          </button>
        ))}
      </div>

    </section>
  )
}

export function SectionHeader({ badge, title, desc }: { badge: string; title: string; desc: string }) {
  return (
    <div>
      <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">{badge}</span>
      <h2 className="text-2xl sm:text-3xl font-bold text-text font-heading">{title}</h2>
      <p className="text-sm text-text-muted mt-1 max-w-2xl">{desc}</p>
    </div>
  )
}
