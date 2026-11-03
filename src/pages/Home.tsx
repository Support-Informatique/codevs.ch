import { MotionConfig } from 'framer-motion'
import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Clients from '@/components/sections/Clients'
import Services from '@/components/sections/Services'
import Work from '@/components/sections/Work'
import Products from '@/components/sections/Products'
import Security from '@/components/sections/Security'
import Team from '@/components/sections/Team'
import Process from '@/components/sections/Process'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

const Home: React.FC = () => (
  <MotionConfig reducedMotion='user'>
    <Nav />
    <main>
      <Hero />
      <Clients />
      <Services />
      <Team />
      <Work />
      <Security />
      <Products />
      <Process />
      <Contact />
    </main>
    <Footer />
  </MotionConfig>
)

export default Home
