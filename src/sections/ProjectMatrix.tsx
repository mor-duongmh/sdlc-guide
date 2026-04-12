import { useState } from 'react'
import { SectionHeader } from './CorePipeline'
import { X, ChevronRight } from 'lucide-react'

type CellType = 'full' | 'extended' | 'none' | 'discovery'
const cellStyles: Record<CellType, string> = {
  full: 'bg-emerald/15 text-emerald',
  extended: 'bg-amber/15 text-amber',
  none: 'bg-surface-2 text-text-dim',
  discovery: 'bg-purple/15 text-purple',
}
const cellLabels: Record<CellType, string> = { full: 'Full Pipeline', extended: 'Extended', none: 'N/A', discovery: 'Discovery' }

type SkillStep = {
  skill: string
  input: string
  output: string
}

type Cell = {
  type: CellType
  summary: string
  steps: SkillStep[]
}

type Row = {
  project: string
  role: string
  initBase: Cell
  feature: Cell
  bugFix: Cell
  review: Cell
}

const rows: Row[] = [
  {
    project: 'Project base', role: 'Frontend',
    initBase: { type: 'full', summary: 'Scaffold + Config + CLAUDE.md',
      steps: [
        { skill: 'brainstorming', input: 'Tech stack, project requirements', output: 'specs/*-init-design.md' },
        { skill: 'writing-plans', input: 'Init design spec', output: 'plans/*-init.md' },
        { skill: 'executing-plans', input: 'Init plan', output: 'Project scaffold + CLAUDE.md + rules' },
        { skill: 'verification', input: 'Build + lint commands', output: 'Build pass, lint clean' },
      ] },
    feature: { type: 'full', summary: 'Brainstorm \u2192 Plan \u2192 TDD \u2192 Review',
      steps: [
        { skill: 'brainstorming', input: 'Feature requirements / task ticket', output: 'specs/*-design.md' },
        { skill: 'writing-plans', input: 'Approved design spec', output: 'plans/*-feature.md' },
        { skill: 'subagent-driven-dev', input: 'Plan file (full task text)', output: 'Code + tests + commits per task' },
        { skill: 'requesting-code-review', input: 'Git SHAs (base..head)', output: 'Review report: Critical/Important/Minor' },
        { skill: 'finishing-branch', input: 'All tests green', output: 'PR hoặc merged branch' },
      ] },
    bugFix: { type: 'full', summary: 'Debug 4 phase \u2192 TDD fix',
      steps: [
        { skill: 'systematic-debugging', input: 'Bug report / error logs', output: 'Root cause identified' },
        { skill: 'test-driven-dev', input: 'Root cause analysis', output: 'Failing test reproduce bug' },
        { skill: 'verification', input: 'Fix implementation', output: 'Bug test pass + all tests green' },
      ] },
    review: { type: 'full', summary: 'requesting + receiving review',
      steps: [
        { skill: 'requesting-code-review', input: 'Git diff (base..head)', output: 'Review report with issues' },
        { skill: 'receiving-code-review', input: 'Review feedback', output: 'Verified fixes + pushback if needed' },
      ] },
  },
  {
    project: 'Project base', role: 'Backend',
    initBase: { type: 'full', summary: 'API design + DB schema + Auth',
      steps: [
        { skill: 'brainstorming', input: 'API requirements, DB needs', output: 'specs/*-backend-design.md' },
        { skill: 'writing-plans', input: 'Backend design spec', output: 'plans/*-backend-init.md' },
        { skill: 'executing-plans', input: 'Init plan', output: 'Schema + modules + auth config' },
      ] },
    feature: { type: 'full', summary: 'Schema \u2192 Service \u2192 Controller',
      steps: [
        { skill: 'brainstorming', input: 'Feature ticket + API contract', output: 'specs/*-api-design.md' },
        { skill: 'writing-plans', input: 'API design spec', output: 'plans/*-feature.md (Schema\u2192Service\u2192Controller)' },
        { skill: 'subagent-driven-dev', input: 'Plan tasks (TDD)', output: 'Code + unit tests + e2e tests' },
        { skill: 'requesting-code-review', input: 'Git SHAs', output: 'Review: SQL perf, security, API contract' },
      ] },
    bugFix: { type: 'full', summary: '+ Log analysis, DB state, rollback',
      steps: [
        { skill: 'systematic-debugging', input: 'Bug + production logs', output: 'Root cause + DB state analysis' },
        { skill: 'test-driven-dev', input: 'Root cause', output: 'Failing test + fix + migration rollback plan' },
      ] },
    review: { type: 'full', summary: '+ SQL perf, security, API contract',
      steps: [
        { skill: 'requesting-code-review', input: 'Git diff + API spec', output: 'Review: query perf, injection, auth' },
        { skill: 'receiving-code-review', input: 'Review feedback', output: 'Verified fixes' },
      ] },
  },
  {
    project: 'Maintenance', role: 'Frontend',
    initBase: { type: 'extended', summary: 'Document existing \u2192 AI config',
      steps: [
        { skill: '(manual exploration)', input: 'Existing codebase', output: 'Hiểu conventions hiện tại' },
        { skill: 'writing-plans', input: 'Existing patterns documented', output: 'plans/*-ai-setup.md' },
        { skill: 'executing-plans', input: 'Setup plan', output: 'CLAUDE.md + rules phản ánh existing code' },
      ] },
    feature: { type: 'extended', summary: '+ Impact analysis, regression',
      steps: [
        { skill: 'brainstorming', input: 'Feature req + existing codebase context', output: 'specs/*-design.md (+ impact analysis)' },
        { skill: 'writing-plans', input: 'Design spec + backward compat notes', output: 'plans/*-feature.md + regression tasks' },
        { skill: 'subagent-driven-dev', input: 'Plan (+ run FULL test suite)', output: 'Code + tests + regression pass' },
      ] },
    bugFix: { type: 'extended', summary: '+ Production logs, git blame',
      steps: [
        { skill: 'systematic-debugging', input: 'Bug + prod logs + git blame', output: 'Root cause + khi nào introduced' },
        { skill: 'test-driven-dev', input: 'Root cause', output: 'Fix + regression test cho affected area' },
      ] },
    review: { type: 'full', summary: '+ Regression awareness',
      steps: [
        { skill: 'requesting-code-review', input: 'Git diff', output: 'Review + regression check' },
      ] },
  },
  {
    project: 'Maintenance', role: 'Backend',
    initBase: { type: 'extended', summary: 'Scan codebase \u2192 Document',
      steps: [
        { skill: '(manual exploration)', input: 'Existing backend code', output: 'API patterns, DB conventions documented' },
        { skill: 'executing-plans', input: 'Documentation plan', output: 'CLAUDE.md phản ánh existing patterns' },
      ] },
    feature: { type: 'extended', summary: '+ Migration safety, backward compat',
      steps: [
        { skill: 'brainstorming', input: 'Feature req + migration impact', output: 'specs/*-design.md + migration notes' },
        { skill: 'writing-plans', input: 'Design + backward compat check', output: 'plans/* + migration + deploy notes' },
        { skill: 'subagent-driven-dev', input: 'Plan tasks', output: 'Code + tests + migration script' },
      ] },
    bugFix: { type: 'extended', summary: '+ Data corruption check, rollback',
      steps: [
        { skill: 'systematic-debugging', input: 'Bug + DB state + prod logs', output: 'Root cause + data impact assessment' },
        { skill: 'test-driven-dev', input: 'Root cause + rollback plan', output: 'Fix + rollback script if needed' },
      ] },
    review: { type: 'full', summary: '+ Migration safety, query perf',
      steps: [
        { skill: 'requesting-code-review', input: 'Git diff + migration files', output: 'Review: migration safety, query perf' },
      ] },
  },
  {
    project: 'Chưa có design', role: 'Any',
    initBase: { type: 'none', summary: 'N/A', steps: [] },
    feature: { type: 'discovery', summary: 'Extended brainstorming \u2192 standard flow',
      steps: [
        { skill: 'brainstorming (extended)', input: 'Raw requirements / meeting notes / tickets', output: 'specs/*-design.md (nhiều Q&A hơn)' },
        { skill: 'writing-plans', input: 'Approved spec (sau discovery)', output: 'plans/*-feature.md' },
        { skill: 'subagent-driven-dev', input: 'Plan tasks', output: 'Code + tests + commits' },
      ] },
    bugFix: { type: 'full', summary: 'Standard debug flow',
      steps: [
        { skill: 'systematic-debugging', input: 'Bug report', output: 'Root cause' },
        { skill: 'test-driven-dev', input: 'Root cause', output: 'Failing test + fix' },
      ] },
    review: { type: 'full', summary: 'Standard review flow',
      steps: [
        { skill: 'requesting-code-review', input: 'Git diff', output: 'Review report' },
      ] },
  },
]

const taskCols = ['initBase', 'feature', 'bugFix', 'review'] as const
const taskLabels = { initBase: 'Init Base', feature: 'Feature', bugFix: 'Bug Fix', review: 'Review' }

type DetailInfo = { project: string; role: string; task: string; cell: Cell }

function DetailModal({ info, onClose }: { info: DetailInfo | null; onClose: () => void }) {
  if (!info || info.cell.steps.length === 0) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-8 overflow-y-auto cursor-pointer" onClick={onClose}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />
      <div className="relative w-full max-w-2xl card my-8 cursor-default animate-[fadeInUp_200ms_ease-out]"
        style={{ animationFillMode: 'both' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-border">
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase">{info.project} / {info.role}</span>
            <h2 className="text-lg font-bold text-text mt-0.5 font-heading">{info.task} Workflow</h2>
            <p className="text-xs text-text-muted mt-1">{info.cell.summary}</p>
          </div>
          <button onClick={onClose} className="shrink-0 w-8 h-8 rounded-xl bg-surface-2 flex items-center justify-center text-text-dim hover:text-text cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 sm:p-6 space-y-3">
          {info.cell.steps.map((step, i) => (
            <div key={i} className="card-inset p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">{i + 1}</span>
                <code className="text-xs font-mono font-bold text-text">{step.skill}</code>
              </div>
              <div className="grid grid-cols-2 gap-3 ml-9">
                <div>
                  <span className="text-[9px] font-bold text-text-dim uppercase tracking-wider">Input</span>
                  <p className="text-[11px] text-text-muted mt-0.5">{step.input}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-primary uppercase tracking-wider">Output</span>
                  <p className="text-[11px] text-text-muted mt-0.5">{step.output}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectMatrix() {
  const [detail, setDetail] = useState<DetailInfo | null>(null)

  return (
    <section id="matrix" className="py-14">
      <SectionHeader badge="DECISION MATRIX" title="Project Type x Task Type"
        desc="Workflow nào apply dựa trên loại project, role, và loại task. Click vào cell để xem skill → input → output chi tiết." />

      <div className="mt-6 flex flex-wrap gap-2">
        {Object.entries(cellStyles).map(([key, style]) => (
          <span key={key} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold ${style}`}>
            <span className={`w-2 h-2 rounded-full ${style.split(' ')[1].replace('text-', 'bg-')}`} />
            {cellLabels[key as CellType]}
          </span>
        ))}
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden sm:block card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-2">
              <th className="text-left text-[10px] font-bold text-text-dim uppercase tracking-wider px-4 py-3">Project</th>
              <th className="text-left text-[10px] font-bold text-text-dim uppercase tracking-wider px-4 py-3">Role</th>
              {taskCols.map((col) => (
                <th key={col} className="text-left text-[10px] font-bold text-text-dim uppercase tracking-wider px-4 py-3">{taskLabels[col]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-border/50 hover:bg-surface-2/30 transition-colors">
                <td className="px-4 py-3 text-xs font-bold text-text">{row.project}</td>
                <td className="px-4 py-3 text-xs text-text-muted">{row.role}</td>
                {taskCols.map((col) => {
                  const cell = row[col]
                  const hasSteps = cell.steps.length > 0
                  return (
                    <td key={col} className="px-4 py-3">
                      {hasSteps ? (
                        <button
                          onClick={() => setDetail({ project: row.project, role: row.role, task: taskLabels[col], cell })}
                          className="text-left cursor-pointer group w-full"
                        >
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${cellStyles[cell.type]} mb-1`}>
                            {cellLabels[cell.type]}
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                          <p className="text-[10px] text-text-dim group-hover:text-text-muted transition-colors">{cell.summary}</p>
                          <p className="text-[9px] text-primary font-medium mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {cell.steps.length} skills → xem chi tiết
                          </p>
                        </button>
                      ) : (
                        <div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${cellStyles[cell.type]} mb-1`}>{cellLabels[cell.type]}</span>
                          <p className="text-[10px] text-text-dim">{cell.summary}</p>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden mt-6 space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-text">{row.project}</span>
              <span className="text-[10px] text-text-dim">{'\u2022'} {row.role}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {taskCols.map((col) => {
                const cell = row[col]
                const hasSteps = cell.steps.length > 0
                return hasSteps ? (
                  <button key={col} onClick={() => setDetail({ project: row.project, role: row.role, task: taskLabels[col], cell })}
                    className={`rounded-xl p-2.5 text-left cursor-pointer ${cellStyles[cell.type]}`}>
                    <span className="text-[10px] font-bold block mb-0.5">{taskLabels[col]}</span>
                    <span className="text-[9px] opacity-80">{cell.summary}</span>
                  </button>
                ) : (
                  <div key={col} className={`rounded-xl p-2.5 ${cellStyles[cell.type]}`}>
                    <span className="text-[10px] font-bold block mb-0.5">{taskLabels[col]}</span>
                    <span className="text-[9px] opacity-80">{cell.summary}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <DetailModal info={detail} onClose={() => setDetail(null)} />
    </section>
  )
}
