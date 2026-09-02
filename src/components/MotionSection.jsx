import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MotionSection.css'

gsap.registerPlugin(ScrollTrigger)

const CASE_STUDIES = [
  {
    num: '01',
    category: 'UX RESEARCH · UX/UI DESIGN',
    title: 'Reducing friction in lead capture workflows',
    link: '/case-study'
  },
  {
    num: '02',
    category: 'UX RESEARCH · INTERACTION DESIGN',
    title: 'Spotify Desktop Mini Player Redesign',
    link: '/case-study/spotify'
  },
  {
    num: '03',
    category: 'PRODUCT DESIGN · END-TO-END',
    title: 'Rebuilding a Trust-First Food Ordering Experience',
    link: '/case-study/grubwala'
  }
]

export default function MotionSection() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header text reveal animation
      gsap.from('.ms-headline-line-content', {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: '100%',
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })

      gsap.from('.ms-view-all', {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      })

      // Cards staggered scroll trigger reveal
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="motion" className="motion-section">
      <div className="ms-container">
        {/* ── Header ── */}
        <div ref={headerRef} className="ms-header">
          <div className="ms-header-left">
            <h2 className="ms-headline">
              <span className="ms-headline-line">
                <span className="ms-headline-line-content">Selected</span>
              </span>
              <span className="ms-headline-line">
                <span className="ms-headline-line-content">Case Studies</span>
              </span>
            </h2>
            <p className="ms-subtext">
              A selection of projects where research, strategy, and design come together to solve real user problems.
            </p>
          </div>
          <div className="ms-header-right">
            <Link to="/work" className="ms-view-all">
              <span>VIEW ALL PROJECTS</span>
              <span className="ms-view-all-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div ref={cardsRef} className="ms-grid">
          {CASE_STUDIES.map((card) => (
            <Link key={card.num} to={card.link} className="ms-card">
              <div className="ms-card-top">
                <span className="ms-card-num">{card.num}</span>
                <span className="ms-card-arrow">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
              <div className="ms-card-middle">
                <h3 className="ms-card-title">{card.title}</h3>
                <span className="ms-card-category">{card.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
