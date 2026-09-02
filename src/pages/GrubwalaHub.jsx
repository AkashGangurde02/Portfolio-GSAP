import { useEffect, useRef, useState } from 'react'
import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import './GrubwalaHub.css'

import grubwalaImage from '../images/case-studies/case-study-3/grubwala-cover.jpg'
import onboardingCover from '../images/case-studies/case-study-3/grubwala-onboarding-cover.jpg'
import edgeCases from '../images/case-studies/case-study-3/edge-cases.png'

gsap.registerPlugin(ScrollTrigger)

const CASE_STUDIES = [
  {
    id: 'homepage',
    title: 'Home Page redesign',
    description: 'Improving food discovery, visual hierarchy, navigation, and menu exploration.',
    image: grubwalaImage,
    link: '/work/grubwala/homepage',
    tags: ['FOOD EXPLORATION', 'DISCOVERY', 'NAVIGATION'],
    category: 'Home Page'
  },
  {
    id: 'onboarding',
    title: 'Onboarding redesign',
    description: 'Creating a clearer, frictionless, and engaging first-time user authentication experience.',
    image: onboardingCover,
    link: '/work/grubwala/onboarding',
    tags: ['AUTHENTICATION', 'ONBOARDING', 'FIRST-TIME UX'],
    category: 'Onboarding'
  },
  {
    id: 'edgecases',
    title: 'Edge Case UI design',
    description: 'Designing thoughtful UI states and recovery paths for uncommon and unexpected scenarios.',
    image: edgeCases,
    link: '/work/grubwala/edge-cases',
    tags: ['STATE MANAGEMENT', 'RECOVERY UX', 'EDGE CASES'],
    category: 'Edge Case UI'
  }
]

const CATEGORIES = ['All', 'Home Page', 'Onboarding', 'Edge Case UI']

const GrubwalaHub = () => {
  useSEO({
    title: 'Grubwala Case Studies',
    description: 'A collection of UX/UI explorations for Grubwala including Home Page Redesign, Onboarding Redesign, and Edge Case UI.',
    canonical: '/work/grubwala',
    ogImage: '/og/og-grubwala.png',
  })

  const [activeCategory, setActiveCategory] = useState('All')
  const heroRef = useRef(null)
  const cardsRef = useRef(null)

  const filteredStudies = activeCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(s => s.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'all'
        })
      }

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          },
          y: 32,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'all'
        })
      }
    })

    const timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [activeCategory])

  return (
    <div className="work-page">
      <div className="lyniq-container">
        {/* ── TOP NAV ── */}
        <div className="grubwala-hub-top-nav">
          <Link to="/work" className="grubwala-back-btn">
            <span className="back-arrow">←</span>
            <span>ALL WORK</span>
          </Link>
        </div>

        {/* ── HEADER SECTION ── */}
        <div className="lyniq-header" ref={heroRef}>
          <h1 className="lyniq-headline">Grubwala</h1>
          <p className="lyniq-header-sub">
            A collection of UX/UI explorations focused on improving the food ordering experience across key user journeys.
          </p>
        </div>

        {/* ── CATEGORY FILTER BAR ── */}
        <div className="lyniq-filter-bar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`lyniq-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── 2-COLUMN CASE STUDIES GRID ── */}
        <section className="lyniq-projects-section">
          <div className="lyniq-grid" ref={cardsRef}>
            {filteredStudies.map(study => (
              <Link key={study.id} to={study.link} className="lyniq-card">
                <div className="lyniq-card-media-wrap">
                  <img src={study.image} alt={study.title} className="lyniq-card-image" />
                  <span className="lyniq-card-arrow-badge">↗</span>
                </div>
                <div className="lyniq-card-info">
                  <h3 className="lyniq-card-title">{study.title}</h3>
                  <p className="lyniq-card-desc">{study.description}</p>
                  <div className="lyniq-card-tags">
                    {study.tags.map((tag, idx) => (
                      <span key={idx} className="lyniq-tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer variant="inner" />
    </div>
  )
}

export default GrubwalaHub
