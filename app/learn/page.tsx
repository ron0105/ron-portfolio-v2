import Nav from '@/components/sections/Nav'
import LearnHero from '@/components/sections/learn/LearnHero'
import EpisodeList from '@/components/sections/learn/EpisodeList'
import Footer from '@/components/sections/Footer'
import { getEpisodes } from '@/lib/content'

export const metadata = {
  title: 'Learn With Ron — Rohan Tiwarekar',
  description: 'Live AI experiments on real problems. Every episode: a real question, a live test, an honest verdict.',
}

export default function LearnPage() {
  const episodes = getEpisodes()
  return (
    <main>
      <Nav />
      <LearnHero />
      <EpisodeList episodes={episodes} />
      <Footer />
    </main>
  )
}
