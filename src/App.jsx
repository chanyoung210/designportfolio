import { GlitterBackground } from './components/Hero/GlitterBackground.jsx'
import { Hero } from './components/Hero/Hero.jsx'
import { Nav } from './components/Nav/Nav.jsx'
import { About } from './components/About/About.jsx'
import { FocusList } from './components/FocusList/FocusList.jsx'
import { Portfolio } from './components/Portfolio/Portfolio.jsx'
import { Review } from './components/Review/Review.jsx'
import { Goal } from './components/Goal/Goal.jsx'
import { Footer } from './components/Footer/Footer.jsx'

export default function App() {
  return (
    <div data-testid="app-placeholder">
      <GlitterBackground />
      <Nav />
      <Hero />
      <About />
      <FocusList />
      <Portfolio />
      <Review />
      <Goal />
      <Footer />
    </div>
  )
}
