import { useState, useCallback } from 'react'
import useSmoothScroll from './hooks/useSmoothScroll'
import TargetCursor from './components/TargetCursor'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  const onLoaded = useCallback(() => setReady(true), [])

  useSmoothScroll()

  return (
    <div className="grain">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        hoverDuration={0.3}
        cursorColor="#fff8f8"
        cursorColorOnTarget="#83713a"
      />
      <Preloader onDone={onLoaded} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
