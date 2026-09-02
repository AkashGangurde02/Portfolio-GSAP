import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Services from './pages/Services'
import Contact from './pages/Contact'
import CaseStudyContactForm from './pages/CaseStudyContactForm'
import CaseStudyHempHop from './pages/CaseStudyHempHop'
import CaseStudyGrubwala from './pages/CaseStudyGrubwala'
import GrubwalaHub from './pages/GrubwalaHub'
import CaseStudySpotify from './pages/CaseStudySpotify'
import ExperienceRobotics from './pages/ExperienceRobotics'
import ExperienceNonTechnical from './pages/ExperienceNonTechnical'
import ExperienceSomvanshi from './pages/ExperienceSomvanshi'
import DinoGame from './pages/DinoGame'

import CursorFollower from './components/CursorFollower'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import { useLenis } from './hooks/useLenis'

// import WhatsAppFloat from './components/WhatsAppFloat'
// import IntroOverlay from './components/IntroOverlay'
import './App.css'
import './mobile-enhancements.css'
import './mobile-polish.css'
import './responsive.css'

function App() {
  useLenis()

  return (
    <Router>
      <ScrollToTop />
      {/* <IntroOverlay /> */}
      <CursorFollower />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/work" element={<Work />} />
          <Route path="/work/grubwala" element={<GrubwalaHub />} />
          <Route path="/work/grubwala/homepage" element={<CaseStudyGrubwala initialFlow="ordering" />} />
          <Route path="/work/grubwala/onboarding" element={<CaseStudyGrubwala initialFlow="onboarding" />} />
          <Route path="/work/grubwala/edge-cases" element={<CaseStudyGrubwala initialFlow="edgecases" />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-study" element={<CaseStudyContactForm />} />
          <Route path="/case-study/hemp-hop" element={<CaseStudyHempHop />} />
          <Route path="/case-study/grubwala" element={<CaseStudyGrubwala />} />
          <Route path="/case-study/spotify" element={<CaseStudySpotify />} />
          <Route path="/experience/robotics" element={<ExperienceRobotics />} />
          <Route path="/experience/non-technical" element={<ExperienceNonTechnical />} />
          <Route path="/experience/somvanshi" element={<ExperienceSomvanshi />} />
          <Route path="/dino-game" element={<DinoGame />} />
        </Routes>
        {/* <WhatsAppFloat /> */}
        <ScrollToTopButton />
      </div>
    </Router>
  )
}

export default App
