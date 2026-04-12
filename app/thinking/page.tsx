import Nav from '@/components/sections/Nav'
import ThinkingHero from '@/components/sections/thinking/ThinkingHero'
import PostList from '@/components/sections/thinking/PostList'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Thinking : Rohan',
  description: 'Short ideas and notes from building things.',
}

export default function ThinkingPage() {
  return (
    <main>
      <Nav />
      <ThinkingHero />
      <PostList />
      <Footer />
    </main>
  )
}
