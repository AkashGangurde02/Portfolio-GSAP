import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './ui/Button'
import ReviewModal from './ReviewModal'
import Toast from './ui/Toast'
import ameyaAvatar from '../images/feedback/ameya.jpg'
import shraddhaAvatar from '../images/feedback/shraddha.jpg'
import anonymousAvatar from '../images/feedback/anonymous.jpg'
import './CompanyFeedback.css'

gsap.registerPlugin(ScrollTrigger)

const REVIEWERS = [
  {
    name: 'Ameya Somvanshi',
    company: 'CEO & Founder, Somvanshi Technologies',
    quote: 'Great initiatives! Your efforts are clearly visible.',
    avatar: ameyaAvatar,
  },
  {
    name: 'Shraddha Nagrani',
    company: 'HR, Somvanshi Technologies',
    quote: 'Akash demonstrated strong creativity, design thinking, and a user-centered approach, while being proactive and receptive to feedback. His dedication and problem-solving mindset make him a valuable UI/UX and digital product designer.',
    avatar: shraddhaAvatar,
  },
  {
    name: 'Company Leadership',
    company: 'Grubwala',
    quote: "Nice work Akash, UX-wise it’s really good, and I especially liked the idea you implemented for better clarity.",
    avatar: anonymousAvatar,
  },
]

export default function CompanyFeedback() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const handleReviewSuccess = (msg) => {
    setToast({ message: msg, type: 'success' })
  }

  /* ── GSAP: Scroll-triggered entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.cf-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          scale: 0.97,
          duration: 0.7,
          delay: i * 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── GSAP: Mouse parallax on desktop ── */
  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid || window.innerWidth < 900) return

    const cards = grid.querySelectorAll('.cf-card')
    const xTo = Array.from(cards).map(c => gsap.quickTo(c, 'x', { duration: 0.8, ease: 'power2.out' }))
    const yTo = Array.from(cards).map(c => gsap.quickTo(c, 'y', { duration: 0.8, ease: 'power2.out' }))

    const onMove = (e) => {
      const rect = grid.getBoundingClientRect()
      const cx = (e.clientX - rect.left) / rect.width - 0.5
      const cy = (e.clientY - rect.top) / rect.height - 0.5
      cards.forEach((_, i) => {
        const depth = ((i % 3) + 1) * 1.5
        xTo[i](cx * depth)
        yTo[i](cy * depth)
      })
    }

    const onLeave = () => {
      cards.forEach((_, i) => { xTo[i](0); yTo[i](0) })
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const [ceo, pm, dh] = REVIEWERS

  return (
    <section className="cf-section" id="feedback" ref={sectionRef}>

      {/* ── Header ── */}
      <div className="cf-header">
        <h2 className="cf-header-title">
          Kind Words,<br />
          <span className="cf-header-title-light">Real Impact.</span>
        </h2>
      </div>

      {/* ── Grid (4 Columns matching Figma wireframe) ── */}
      <div className="cf-grid" ref={gridRef}>

        {/* Column 1: Stats Card */}
        <div className="cf-card cf-card--stats">
          <div className="cf-stats-top">
            <div className="cf-stats-score">
              <span className="cf-stats-num">5</span>
              <span className="cf-stats-denom">/5</span>
            </div>
          </div>

          <div className="cf-card-rule" />

          <div className="cf-stats-bottom">
            <div className="cf-stats-trust">
              <div className="cf-avatar-stack">
                {REVIEWERS.map((r, i) => (
                  <img key={i} src={r.avatar} alt={r.name} className="cf-stack-img" />
                ))}
              </div>
              <div className="cf-trust-meta">
                <span className="cf-trust-stars">★★★★★</span>
                <span className="cf-trust-text">Rated by Senior & Mentors</span>
              </div>
            </div>

            <Button 
              variant="primary" 
              size="md" 
              onClick={() => setIsReviewModalOpen(true)} 
              className="cf-stats-cta-btn"
            >
              Leave a review
            </Button>
          </div>
        </div>

        {/* Column 2: Person Top, Quote Bottom */}
        <div className="cf-col">
          <div className="cf-card cf-card--person">
            <div className="cf-person-head">
              <img src={ceo.avatar} alt={ceo.name} className="cf-person-avatar" />
              <div className="cf-person-info">
                <span className="cf-person-name">{ceo.name}</span>
                <span className="cf-person-co">{ceo.company}</span>
              </div>
            </div>
          </div>

          <div className="cf-card cf-card--quote cf-card--flex-fill cf-card--quote-btm">
            <p className="cf-quote-text">{ceo.quote}</p>
          </div>
        </div>

        {/* Column 3: Quote Top, Person Bottom */}
        <div className="cf-col">
          <div className="cf-card cf-card--quote cf-card--flex-fill">
            <p className="cf-quote-text">{pm.quote}</p>
          </div>

          <div className="cf-card cf-card--person">
            <div className="cf-person-head">
              <img src={pm.avatar} alt={pm.name} className="cf-person-avatar" />
              <div className="cf-person-info">
                <span className="cf-person-name">{pm.name}</span>
                <span className="cf-person-co">{pm.company}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Person Top, Quote Bottom */}
        <div className="cf-col">
          <div className="cf-card cf-card--person">
            <div className="cf-person-head">
              <img src={dh.avatar} alt={dh.name} className="cf-person-avatar" />
              <div className="cf-person-info">
                <span className="cf-person-name">{dh.name}</span>
                <span className="cf-person-co">{dh.company}</span>
              </div>
            </div>
          </div>

          <div className="cf-card cf-card--quote cf-card--flex-fill cf-card--quote-btm">
            <p className="cf-quote-text">{dh.quote}</p>
          </div>
        </div>

      </div>

      {/* ── Mobile Carousel Navigation Buttons ── */}
      <div className="cf-carousel-controls">
        <button
          type="button"
          className="cf-carousel-arrow-btn"
          onClick={scrollLeft}
          aria-label="Previous testimonial"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <button
          type="button"
          className="cf-carousel-arrow-btn"
          onClick={scrollRight}
          aria-label="Next testimonial"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* ── Review Modal ── */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={handleReviewSuccess}
      />

      {/* ── Toast Notification ── */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </section>
  )
}
