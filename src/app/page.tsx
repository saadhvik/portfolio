import type { Metadata } from 'next'
import Hero from '@/components/hero/Hero'
import Stats from '@/components/sections/Stats'
import BentoWork from '@/components/sections/BentoWork'
import HorizontalGallery from '@/components/sections/HorizontalGallery'
import AboutTeaser from '@/components/sections/AboutTeaser'
import SkillsMarquee from '@/components/sections/SkillsMarquee'
import Credentials from '@/components/sections/Credentials'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <BentoWork />
      <HorizontalGallery />
      <AboutTeaser />
      <SkillsMarquee />
      <Credentials />
    </>
  )
}
