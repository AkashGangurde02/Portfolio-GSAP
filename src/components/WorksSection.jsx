import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './ui/Button'
import './WorksSection.css'
import contactFormImage from '../images/case-studies/case-study-1/contact-redesign.jpg'
import hempHopImage from '../images/case-studies/case-study-2/hemp-hop-cover.png'
import grubwalaImage from '../images/case-studies/case-study-3/grubwala-cover.jpg'
import spotifyImage from '../images/case-studies/case-study-4/spotify-laptop-cover.jpg'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Lead Capture Form Usability Redesign',
    category: 'UX Research · UX/UI Design',
    description: 'Users were abandoning a critical B2B contact form. Redesigned the end-to-end form experience resulting in a 40% increase in completion rates.',
    image: contactFormImage,
    link: '/case-study',
    date: 'Jan 2025',
  },
  {
    id: 4,
    title: 'Spotify Desktop Mini Player Redesign',
    category: 'UX Research · Interaction Design',
    description: 'Designed a lyrics-in-mini-player feature for Spotify Desktop using progressive disclosure and hover-based interaction — bringing live lyrics to users without disrupting their workflow.',
    image: spotifyImage,
    link: '/case-study/spotify',
    date: 'Jul 2025',
  },
  {
    id: 3,
    title: 'Rebuilding a Trust-First Food Ordering Experience',
    category: 'Product Design · End-to-End',
    description: 'Led the end-to-end UX redesign of a food delivery platform, improving usability, trust, and creating an emotionally engaging ordering experience.',
    image: grubwalaImage,
    link: '/case-study/grubwala',
    date: 'May 2025',
  },
]

const WorksSection = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-in
      gsap.from('.wsc-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })

      // Cards stagger
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'all',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const updateScrollButtons = () => {
    const el = cardsRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }

  const scrollCards = (dir) => {
    const el = cardsRef.current
    if (!el) return
    const firstCard = el.querySelector('.wsc-card')
    const scrollAmount = firstCard ? firstCard.clientWidth : 340
    el.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' })
    setTimeout(updateScrollButtons, 400)
  }

  useEffect(() => {
    const timer = setTimeout(updateScrollButtons, 100)
    window.addEventListener('resize', updateScrollButtons)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  return (
    <section ref={sectionRef} id="work" className="works-section">
      <div className="work-container">

        {/* ── Header row ── */}
        <div className="wsc-header">
          <div className="wsc-header-left">
            <h2 className="wsc-section-title">
              Every Product Solved<br />A Different Problem.
            </h2>
            <p className="wsc-section-desc">
              A selection of projects where research, strategy, and interface design came together to solve real user problems across web and mobile experiences.
            </p>
          </div>
          <Button variant="secondary" size="sm" to="/work" showArrow arrowType="right">
            View all works
          </Button>
        </div>

        {/* ── Cards grid ── */}
        <div
          ref={cardsRef}
          className="wsc-grid"
          onScroll={updateScrollButtons}
        >
          {projects.map((project) => (
            <Link key={project.id} to={project.link} className="wsc-card">
              {/* Thumbnail */}
              <div className="wsc-image-wrap">
                <img src={project.image} alt={project.title} className="wsc-image" />
              </div>

              {/* Info */}
              <div className="wsc-body">
                <h3 className="wsc-title">{project.title}</h3>
                <div className="wsc-meta">
                  <span className="wsc-date">{project.date}</span>
                  <span className="wsc-category">{project.category}</span>
                </div>
                <div className="wsc-cta-wrap">
                  <Button variant="tertiary" size="sm" showArrow arrowType="right">
                    View case study
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Scroll nav arrows (mobile) ── */}
        <div className="wsc-nav-arrows">
          <button
            className={`wsc-nav-btn ${!canScrollLeft ? 'wsc-nav-btn--disabled' : ''}`}
            onClick={() => scrollCards(-1)}
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className={`wsc-nav-btn ${!canScrollRight ? 'wsc-nav-btn--disabled' : ''}`}
            onClick={() => scrollCards(1)}
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}

export default WorksSection
