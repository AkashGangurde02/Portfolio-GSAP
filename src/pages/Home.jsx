import { useSEO } from '../hooks/useSEO'
import HeroSection from '../components/HeroSection'
import AboutMeSection from '../components/AboutMeSection'
import MarqueeStrip from '../components/MarqueeStrip'
import SpotifyCasePreview from '../components/SpotifyCasePreview'
import MotionSection from '../components/MotionSection'
import DesigningBetterPaths from '../components/DesigningBetterPaths'
import SkillsSection from '../components/SkillsSection'
import ProcessSection from '../components/ProcessSection'
import ExperienceSection from '../components/ExperienceSection'
import CompanyFeedback from '../components/CompanyFeedback'
import Footer from '../components/Footer'
import ImpactSection from '../components/ImpactSection'
import StickyScrollSection from '../components/StickyScrollSection'
import ServicesPopup from '../components/ServicesPopup'

const Home = () => {
  useSEO({
    title: 'Akash Gangurde – UX/UI Designer Portfolio',
    description: 'Award-winning UX/UI designer crafting mobile-first digital products. Explore case studies in product design, interaction design, food-tech, and music.',
    canonical: '/',
    ogImage: '/og/og-default.png',
  })
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <StickyScrollSection />
      <MarqueeStrip />
      <SpotifyCasePreview />
      <MotionSection />
      <DesigningBetterPaths />
      <ExperienceSection />
      <CompanyFeedback />
      <Footer variant="home" />
      <ServicesPopup />
    </>
  )
}

export default Home
