import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Experiments from '@/components/sections/Experiments'
import Thinking from '@/components/sections/Thinking'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Experiments />
      <Thinking />
      <Footer />
    </main>
  )
}
