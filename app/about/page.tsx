import Nav from '@/components/sections/Nav'
import AboutHero from '@/components/sections/about/AboutHero'
import StorySection from '@/components/sections/about/StorySection'
import PrinciplesSection from '@/components/sections/about/PrinciplesSection'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'About — Rohan',
  description: "I build things before I fully know how. Here's who I am and what I care about.",
}

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <AboutHero />
      <StorySection />
      <PrinciplesSection />
      <Footer />
    </main>
  )
}
