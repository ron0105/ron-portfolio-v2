import Nav from '@/components/sections/Nav'
import ContactHero from '@/components/sections/contact/ContactHero'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Contact : Rohan',
  description: "Let's talk. I read everything and reply to most things.",
}

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <ContactHero />
      <Footer />
    </main>
  )
}
