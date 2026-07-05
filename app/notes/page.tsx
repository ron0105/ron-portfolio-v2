import Nav from '@/components/sections/Nav'
import ThinkingHero from '@/components/sections/thinking/ThinkingHero'
import NotesList from '@/components/sections/notes/NotesList'
import Footer from '@/components/sections/Footer'
import { getNotes } from '@/lib/content'

export const metadata = {
  title: 'Notes — Rohan Tiwarekar',
  description: 'How I build, what I get wrong, and what I figure out along the way. Not advice. Just notes.',
}

export default function NotesPage() {
  const notes = getNotes()
  return (
    <main>
      <Nav />
      <ThinkingHero />
      <NotesList notes={notes} />
      <Footer />
    </main>
  )
}
