import Marquee from '@/components/ui/Marquee'
import Reveal from '@/components/ui/Reveal'
import { marqueeSkills } from '@/data/site'

/** Two counter-rotating rows so the strip reads as motion, not a conveyor. */
export default function SkillsMarquee() {
  const half = Math.ceil(marqueeSkills.length / 2)

  return (
    <section className="border-y border-base-600 py-12">
      <div className="shell mb-8">
        <Reveal>
          <p className="label">Tooling · hover to pause</p>
        </Reveal>
      </div>
      <div className="flex flex-col gap-3">
        <Marquee items={marqueeSkills.slice(0, half)} />
        <Marquee items={marqueeSkills.slice(half)} reverse />
      </div>
    </section>
  )
}
