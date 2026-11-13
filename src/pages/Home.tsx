import Contact from '@/components/home/Contact/Contact'
import Footer from '@/components/home/Footer/Footer'
import Hero from '@/components/home/Hero/Hero'
import Logos from '@/components/home/Logos/Logos'
import Nav from '@/components/home/Nav/Nav'
import Process from '@/components/home/Process/Process'
import Products from '@/components/home/Products/Products'
import Security from '@/components/home/Security/Security'
import Services from '@/components/home/Services/Services'
import Team from '@/components/home/Team/Team'
import Work from '@/components/home/Work/Work'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const Home = () => {
  useRevealOnScroll()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Services />
        <Work />
        <Team />
        <Security />
        {/* sections alternate white and tint: keep that when reordering */}
        <Process />
        <Products />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home
