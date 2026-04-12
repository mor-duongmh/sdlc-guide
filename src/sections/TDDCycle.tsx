import { ChevronRight } from 'lucide-react'
import { SectionHeader } from './CorePipeline'

type Props = { onOpenDetail: (id: string) => void }

const phases = [
  {
    phase: 'RED', detailId: 'tdd-red', dotColor: 'bg-red', bg: 'bg-red/8',
    title: 'Viết Failing Test',
    steps: ['Viết MỘT failing test tối thiểu', 'Một behavior, tên rõ ràng, real code', 'Run test \u2192 CONFIRM fail đúng lý do'],
    code: `// \u274c RED: Viết failing test TRƯỚC
it('should extract hashtags', async () => {
  const post = await service.createPost(userId, {
    content: 'Job #react #typescript',
    visibility: PostVisibility.PUBLIC,
  });
  expect(post.hashtags).toEqual(['react', 'typescript']);
});
// Run \u2192 FAIL \u2713`,
  },
  {
    phase: 'GREEN', detailId: 'tdd-green', dotColor: 'bg-green', bg: 'bg-green/8',
    title: 'Code Tối Thiểu Để Pass',
    steps: ['Viết code ĐƠN GIẢN NHẤT để pass', 'Run test \u2192 CONFIRM pass', 'Run ALL tests \u2192 ALL pass', 'Output CLEAN'],
    code: `// \u2705 GREEN: Code tối thiểu
async createPost(userId, dto) {
  const hashtags = dto.content
    .match(/#(\\w+)/g)
    ?.map(t => t.slice(1)) ?? [];
  return this.prisma.communityPost.create({
    data: { authorId: userId, ...dto, hashtags },
  });
}
// ALL tests \u2192 PASS \u2713`,
  },
  {
    phase: 'REFACTOR', detailId: 'tdd-refactor', dotColor: 'bg-blue', bg: 'bg-blue/8',
    title: 'Clean Up Code',
    steps: ['Improve code quality, giữ tests GREEN', 'Extract CHỈ KHI cần (check YAGNI)', 'Run tests \u2192 vẫn green', 'COMMIT'],
    code: `// \ud83d\udd04 REFACTOR: Chỉ khi cần
// Extract regex? \u2192 YAGNI, 1 chỗ dùng
// \u2192 Skip, giữ simple
// \u2192 COMMIT: "feat(community):
//    createPost with hashtag extraction"`,
  },
]

const antiPatterns = [
  { pattern: 'Test Mock Behavior', fix: 'Assert REAL behavior, không phải mock calls' },
  { pattern: 'Test-Only Methods', fix: 'Cleanup logic vào test utilities' },
  { pattern: 'Mock Không Hiểu', fix: 'Chạy real implementation trước' },
  { pattern: 'Mock Thiếu', fix: 'Mock TOÀN BỘ API structure' },
  { pattern: 'Integration Test Để Sau', fix: 'TDD tự tạo integration tests' },
]

export function TDDCycle({ onOpenDetail }: Props) {
  return (
    <section id="tdd" className="py-14">
      <SectionHeader badge="CORE PHILOSOPHY" title="TDD: Red-Green-Refactor"
        desc="Trái tim của SDLC. Mọi skill, mọi task, mọi dòng code theo chu kỳ này. Click để xem chi tiết." />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {phases.map((p, i) => (
          <button key={p.phase} onClick={() => onOpenDetail(p.detailId)}
            className={`card p-5 text-left cursor-pointer flex flex-col h-full ${p.bg}`}>
            {/* Header: number + title cùng hàng */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl ${p.dotColor}/20 flex items-center justify-center text-sm font-black text-text shrink-0`}>{i + 1}</span>
                <div>
                  <h3 className="text-base font-black text-text font-heading leading-tight">{p.phase}</h3>
                  <p className="text-xs text-text-muted">{p.title}</p>
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

            {/* Code */}
            <pre className="rounded-xl card-inset p-3 overflow-x-auto">
              <code className="text-[10px] leading-relaxed font-mono text-text-muted whitespace-pre">{p.code}</code>
            </pre>
          </button>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <div className="card-sm px-5 py-2.5 flex items-center gap-2.5">
          <span className="w-3.5 h-3.5 rounded-full bg-red" />
          <span className="text-text-dim text-xs font-bold">{'\u2192'}</span>
          <span className="w-3.5 h-3.5 rounded-full bg-green" />
          <span className="text-text-dim text-xs font-bold">{'\u2192'}</span>
          <span className="w-3.5 h-3.5 rounded-full bg-blue" />
          <span className="text-text-dim text-xs font-bold">{'\u2192'}</span>
          <span className="text-xs font-mono font-bold text-text-muted">COMMIT {'\u2192'} LẶP LẠI</span>
        </div>
      </div>

      <div className="mt-8 card p-5">
        <h3 className="text-xs font-bold text-red uppercase tracking-widest mb-3 font-heading">Testing Anti-Patterns</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {antiPatterns.map((ap) => (
            <div key={ap.pattern} className="rounded-xl card-inset p-3">
              <p className="text-[10px] font-bold text-red mb-1">{ap.pattern}</p>
              <p className="text-[10px] text-emerald font-medium">{'\u2192'} {ap.fix}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
