import Nav from '@/components/sections/Nav'
import WorkHero from '@/components/sections/work/WorkHero'
import CurrentlyExploring from '@/components/sections/work/CurrentlyExploring'
import ProjectGrid from '@/components/sections/work/ProjectGrid'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Work — Rohan',
  description: 'Things I built, why I built them, and what I learned.',
}

export default function WorkPage() {
  return (
    <main>
      <Nav />
      <WorkHero />
      <CurrentlyExploring />
      <ProjectGrid />
      <Footer />
    </main>
  )
}
