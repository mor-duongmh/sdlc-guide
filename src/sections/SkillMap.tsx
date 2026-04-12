import { ChevronRight } from 'lucide-react'
import { SectionHeader } from './CorePipeline'

type Props = { onOpenDetail: (id: string) => void }
type Skill = { name: string; ironLaw: string; trigger: string }
type Category = { label: string; color: string; dotColor: string; bg: string; skills: Skill[] }

const categories: Category[] = [
  { label: 'Process', color: 'text-amber', dotColor: 'bg-amber', bg: 'bg-amber/8',
    skills: [
      { name: 'brainstorming', ironLaw: 'HARD-GATE: Không code cho đến khi design được approve', trigger: 'Trước mọi creative work' },
      { name: 'systematic-debugging', ironLaw: 'Không fix khi chưa tìm ra root cause', trigger: 'Gặp bug, test fail, behavior bất thường' },
    ] },
  { label: 'Implementation', color: 'text-indigo', dotColor: 'bg-indigo', bg: 'bg-indigo/8',
    skills: [
      { name: 'writing-plans', ironLaw: 'Không placeholder. Mỗi task 2-5 phút, theo TDD.', trigger: 'Có spec, trước khi touch code' },
      { name: 'test-driven-development', ironLaw: 'Không code production khi chưa có failing test', trigger: 'Implement feature hoặc fix bug' },
      { name: 'subagent-driven-development', ironLaw: 'Fresh subagent mỗi task + 2-stage review', trigger: 'Execute plan (recommended)' },
      { name: 'executing-plans', ironLaw: 'Gặp blocker thì stop. Không guess.', trigger: 'Execute plan tuần tự (fallback)' },
    ] },
  { label: 'Quality', color: 'text-emerald', dotColor: 'bg-emerald', bg: 'bg-emerald/8',
    skills: [
      { name: 'requesting-code-review', ironLaw: 'Review sớm, review thường xuyên. Không skip.', trigger: 'Sau SDD task, feature lớn, trước merge' },
      { name: 'receiving-code-review', ironLaw: 'Verify trước khi implement feedback.', trigger: 'Nhận review feedback' },
      { name: 'verification-before-completion', ironLaw: 'Không claim "done" khi chưa có fresh evidence', trigger: 'Sắp claim complete' },
    ] },
  { label: 'Infrastructure', color: 'text-cyan', dotColor: 'bg-cyan', bg: 'bg-cyan/8',
    skills: [
      { name: 'using-git-worktrees', ironLaw: 'Verify .gitignore trước khi tạo worktree', trigger: 'Feature work cần isolation' },
      { name: 'finishing-a-development-branch', ironLaw: 'Verify ALL tests pass trước. 4 options.', trigger: 'Implementation done' },
      { name: 'dispatching-parallel-agents', ironLaw: 'Chỉ khi 2+ tasks không shared state', trigger: '2+ tasks độc lập' },
    ] },
  { label: 'Meta', color: 'text-purple', dotColor: 'bg-purple', bg: 'bg-purple/8',
    skills: [
      { name: 'using-superpowers', ironLaw: 'Invoke skill phù hợp TRƯỚC mọi response', trigger: 'Bắt đầu conversation' },
      { name: 'writing-skills', ironLaw: 'Không tạo skill khi chưa có failing test', trigger: 'Tạo, edit, verify skills' },
    ] },
]

export function SkillMap({ onOpenDetail }: Props) {
  return (
    <section id="skills" className="py-14">
      <SectionHeader badge="SKILL CATALOG" title="Bản Đồ Skills"
        desc="14 composable skills theo nhóm. Click vào card để xem steps chi tiết, output format, và examples." />
      <div className="mt-10 space-y-8">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-3 h-3 rounded-full ${cat.dotColor}`} />
              <h3 className={`text-sm font-bold ${cat.color} font-heading`}>{cat.label}</h3>
              <span className="text-xs text-text-dim">({cat.skills.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.skills.map((skill) => (
                <button key={skill.name} onClick={() => onOpenDetail(skill.name)}
                  className={`card p-5 text-left cursor-pointer ${cat.bg}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-xs font-bold font-mono text-text">{skill.name}</h4>
                    <ChevronRight className="w-4 h-4 text-text-dim shrink-0" />
                  </div>
                  <div className="mb-3 px-3 py-2 rounded-xl card-inset">
                    <p className="text-[10px] font-bold text-red leading-relaxed">{skill.ironLaw}</p>
                  </div>
                  <p className="text-[10px] text-text-muted leading-relaxed">
                    <span className="font-bold text-text-dim">Khi nào: </span>{skill.trigger}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
