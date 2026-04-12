import { useState, useCallback } from 'react'
import { Hero } from './sections/Hero'
import { CorePipeline } from './sections/CorePipeline'
import { SkillMap } from './sections/SkillMap'
import { TDDCycle } from './sections/TDDCycle'
import { ProjectMatrix } from './sections/ProjectMatrix'
import { SDDFlow } from './sections/SDDFlow'
import { ConfigArchitecture } from './sections/ConfigArchitecture'
import { DebuggingPipeline } from './sections/DebuggingPipeline'
import { Nav } from './sections/Nav'
import { DetailModal } from './components/DetailModal'
import { getSkillDetail } from './data/skill-details'
import type { SkillDetail } from './data/skill-details'

const sections = [
  { id: 'hero', label: 'Tổng quan' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'skills', label: 'Skills' },
  { id: 'tdd', label: 'TDD' },
  { id: 'matrix', label: 'Matrix' },
  { id: 'sdd', label: 'SDD' },
  { id: 'config', label: 'Config' },
  { id: 'debug', label: 'Debug' },
]

export default function App() {
  const [activeDetail, setActiveDetail] = useState<SkillDetail | null>(null)
  const openDetail = useCallback((id: string) => {
    const detail = getSkillDetail(id)
    if (detail) setActiveDetail(detail)
  }, [])
  const closeDetail = useCallback(() => setActiveDetail(null), [])

  return (
    <div className="min-h-screen bg-bg">
      <Nav sections={sections} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <Hero />
        <CorePipeline onOpenDetail={openDetail} />
        <SkillMap onOpenDetail={openDetail} />
        <TDDCycle onOpenDetail={openDetail} />
        <ProjectMatrix />
        <SDDFlow onOpenDetail={openDetail} />
        <ConfigArchitecture />
        <DebuggingPipeline onOpenDetail={openDetail} />
      </main>
      <DetailModal detail={activeDetail} onClose={closeDetail} />
    </div>
  )
}
