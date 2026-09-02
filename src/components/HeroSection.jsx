import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import profileImage from '../images/profile/hero-profile.jpg'
import './HeroSection.css'

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  // Detect responsive state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse parallax on profile image (Desktop only)
  useEffect(() => {
    if (isMobile || !imageRef.current) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const moveX = (clientX - window.innerWidth / 2) * 0.015
      const moveY = (clientY - window.innerHeight / 2) * 0.015

      gsap.to(imageRef.current, {
        x: moveX,
        y: moveY,
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    const cardElement = imageRef.current.parentElement
    if (cardElement) {
      cardElement.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (cardElement) {
        cardElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isMobile])

  // GSAP entrance animation
  useEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.fromTo('.hero-editorial-label',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.1 }
      )
      .fromTo('.hero-title-line-content',
        { yPercent: 105 },
        { yPercent: 0, duration: 1.1, stagger: 0.14, ease: 'power4.out' },
        '-=0.5'
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo('.hero-image-card',
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.9'
      )
      .fromTo('.hero-metric-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
        '-=0.8'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  /* ── MOBILE — Exact Wireframe Layout (Headline -> Image -> Role & Bio -> CTAs -> Metrics) ── */
  if (isMobile) {
    return (
      <div className="mobile-flow-container">
        <section className="mobile-hero">
          <div className="mobile-hero-container">
            {/* 1. Main Headline */}
            <h1 className="mobile-hero-title">
              Designing Scalable UX<br />systems for Digital<br />products.
            </h1>

            {/* 2. Hero Image Box (positioned directly below headline) */}
            <div className="mobile-hero-image-wrap">
              <img src={profileImage} alt="Akash Gangurde — UX Designer" className="mobile-hero-image" />
            </div>

            {/* 3. Role Bullet & Bio */}
            <div className="mobile-role-label">
              <span className="mobile-role-dot">•</span> UI/UX Designer
            </div>
            <p className="mobile-hero-subtitle">
              I design intuitive digital products through research, systems thinking and AI-powered workflows.
            </p>

            {/* 4. Action Buttons */}
            <div className="mobile-hero-cta">
              <Link to="/contact" className="mobile-btn-hire">
                Hire Me
              </Link>
              <a href="#works" className="mobile-btn-work">
                View work
              </a>
            </div>

            {/* 5. Metrics / Stats Bar */}
            <div className="mobile-hero-metrics">
              <div className="mobile-metric-item">
                <span className="mobile-metric-number">2000+</span>
                <span className="mobile-metric-bar" />
                <span className="mobile-metric-label">USERS IMPACTED</span>
              </div>
              <div className="mobile-metric-item">
                <span className="mobile-metric-number">4+</span>
                <span className="mobile-metric-bar" />
                <span className="mobile-metric-label">PRODUCTS DELIVERED</span>
              </div>
              <div className="mobile-metric-item">
                <span className="mobile-metric-number">100%</span>
                <span className="mobile-metric-bar" />
                <span className="mobile-metric-label">END-TO-END UX</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  /* ── DESKTOP — Same layout as original HeroAboutTransition ── */
  return (
    <section ref={sectionRef} className="hero-section-standalone">
      {/* HERO TEXT LAYER */}
      <div className="hero-content-overlay">
        <div className="hero-content-inner">

          {/* Main 2-Column Split Grid */}
          <div className="hero-editorial-grid">
            <div className="hero-col-left">
              <div className="hero-editorial-label">
                <span className="label-dot" /> UX/UI DESIGNER
              </div>

              <h1 className="hero-title">
                <span className="hero-title-line-wrapper">
                  <span className="hero-title-line-content">Designing Scalable</span>
                </span>
                <span className="hero-title-line-wrapper">
                  <span className="hero-title-line-content">UX systems for real world</span>
                </span>
                <span className="hero-title-line-wrapper">
                  <span className="hero-title-line-content">products</span>
                </span>
              </h1>

              <p className="hero-subtitle">
                I design intuitive digital products through research, systems thinking and AI-powered workflows.
              </p>

              <div className="hero-cta-wrap">
                <Link to="/contact" className="hero-secondary-btn">
                  <span className="cta-text">HIRE ME</span>
                  <span className="cta-arrow">→</span>
                </Link>
                <a href="#works" className="hero-orange-btn">
                  <span className="cta-text">VIEW WORK</span>
                  <span className="cta-arrow">→</span>
                </a>
              </div>
            </div>

            {/* Right Column — Profile Image Card */}
            <div className="hero-col-right">
              <div className="hero-image-card">
                <img ref={imageRef} src={profileImage} alt="Akash Gangurde — Portfolio" className="hero-image-card-img" />
                <div className="hero-image-card-caption">
                  <span className="caption-title">Akash Gangurde</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Impact Metrics Bar Across Bottom */}
          <div className="hero-metrics-bar">
            <div className="hero-metric-item">
              <span className="hero-metric-number">2000+</span>
              <span className="hero-metric-label">Users Impacted</span>
            </div>
            <div className="hero-metric-item">
              <span className="hero-metric-number">4+</span>
              <span className="hero-metric-label">Projects Delivered</span>
            </div>
            <div className="hero-metric-item">
              <span className="hero-metric-number">100%</span>
              <span className="hero-metric-label">End-to-End UX</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default HeroSection
