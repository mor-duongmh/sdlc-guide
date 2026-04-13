import { Shield, FlaskConical, Layers, FileCheck } from 'lucide-react'
import { SectionHeader } from './CorePipeline'

const principles = [
  { icon: FlaskConical, title: 'Test-Driven Development', desc: 'Không viết code production khi chưa có failing test trước', color: 'bg-red/10', iconColor: 'text-red' },
  { icon: Layers, title: 'Có Hệ Thống, Không Tuỳ Hứng', desc: 'Đi theo process, không dựa vào bản năng hay kinh nghiệm', color: 'bg-indigo/10', iconColor: 'text-indigo' },
  { icon: Shield, title: 'Giảm Complexity', desc: 'YAGNI (không build cái chưa cần), DRY (không lặp logic), mỗi task chỉ 2-5 phút', color: 'bg-emerald/10', iconColor: 'text-emerald' },
  { icon: FileCheck, title: 'Evidence > Claims', desc: 'Chạy command, đọc output, rồi mới claim kết quả', color: 'bg-amber/10', iconColor: 'text-amber' },
]

const ironLaws = [
  { text: 'KHÔNG VIẾT CODE KHI CHƯA CÓ FAILING TEST', color: 'text-red', bg: 'bg-red/8' },
  { text: 'KHÔNG FIX BUG KHI CHƯA TÌM RA ROOT CAUSE', color: 'text-amber', bg: 'bg-amber/8' },
  { text: 'KHÔNG CLAIM "DONE" KHI CHƯA CÓ VERIFICATION EVIDENCE', color: 'text-emerald', bg: 'bg-emerald/8' },
]

export function Hero() {
  return (
    <section id="hero" className="pt-8 pb-8">
      <SectionHeader
        badge="NGUYÊN TẮC CỐT LÕI"
        title="Core Principles"
        desc="4 Nguyên tắc nền tảng và 3 Quy Tắc Không Được Phá Vỡ xuyên suốt toàn bộ SDLC workflow"
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {principles.map((p) => (
          <div key={p.title} className={`card p-5 ${p.color}`}>
            <div className={`w-11 h-11 rounded-2xl ${p.color} flex items-center justify-center mb-3`}>
              <p.icon className={`w-5 h-5 ${p.iconColor}`} strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold text-text mb-1 font-heading">{p.title}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 card p-5">
        <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest mb-3 font-heading">Quy Tắc Không Được Phá Vỡ</h3>
        <div className="space-y-2">
          {ironLaws.map((law) => (
            <div key={law.text} className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl ${law.bg}`}>
              <span className={`w-2 h-2 rounded-full ${law.color.replace('text-', 'bg-')}`} />
              <code className={`text-xs font-mono font-bold ${law.color}`}>{law.text}</code>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
