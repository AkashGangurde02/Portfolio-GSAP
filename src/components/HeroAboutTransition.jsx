import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import Button from './ui/Button'
import './HeroAboutTransition.css'

import profileImage from '../images/profile/hero-profile.jpg'

gsap.registerPlugin(ScrollTrigger)

const HeroAboutTransition = () => {
  const [isMobile, setIsMobile] = useState(false)

  const wrapperRef = useRef(null)
  const stickyRef = useRef(null)
  const heroTextRef = useRef(null)
  const maskRef = useRef(null)
  const innerImgRef = useRef(null)
  const darkOverlayRef = useRef(null)
  const aboutOverlayRef = useRef(null)

  // Detect responsive state (tablet & desktop vs mobile)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse Parallax movement on profile image (Desktop only)
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e) => {
      if (!maskRef.current || !innerImgRef.current) return
      const { clientX, clientY } = e
      const moveX = (clientX - window.innerWidth / 2) * 0.015
      const moveY = (clientY - window.innerHeight / 2) * 0.015

      gsap.to(innerImgRef.current, {
        x: moveX,
        y: moveY,
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      if (!innerImgRef.current) return
      gsap.to(innerImgRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
    }

    const container = wrapperRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isMobile])

  // GSAP ScrollTrigger Transition timeline (Desktop/Tablet only)
  useEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      // SplitType instances — split by lines for premium masked line-reveal
      const titleSplit = new SplitType('.about-title', { types: 'lines' })
      const descSplit  = new SplitType('.about-description', { types: 'lines' })

      // Set initial overflow hidden on line wrappers (masking effect)
      ;[...titleSplit.lines, ...descSplit.lines].forEach((line) => {
        if (line.parentNode) {
          line.parentNode.style.overflow = 'hidden'
        }
      })

      // Create a separate time-based GSAP timeline for the About text reveal
      const aboutRevealTl = gsap.timeline({ paused: true })

      aboutRevealTl
        .fromTo('.about-header-label',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        )
        .fromTo(titleSplit.lines,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(descSplit.lines,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.about-work-btn',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.4'
        )

      // Main scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress >= 0.75) {
              document.body.classList.add('dark-nav-theme')
            } else {
              document.body.classList.remove('dark-nav-theme')
            }
          }
        }
      })

      // Phase 1 + 2 simultaneously: Hero text exits while mask expands from right grid column to full viewport
      tl.to(heroTextRef.current, {
        y: '-100vh',
        opacity: 0.2,
        duration: 1,
        ease: 'power2.inOut'
      })
      .fromTo(maskRef.current,
        {
          width: '32vw',
          height: '46vh',
          top: '25vh',
          left: '61vw',
          borderRadius: '8px'
        },
        {
          width: '100vw',
          height: '100vh',
          top: '0vh',
          left: '0vw',
          borderRadius: '0px',
          duration: 1,
          ease: 'power2.inOut'
        },
        '<'
      )

      // Phase 3: Exact moment image mask reaches full size (at timeline position 0.8), reveal About overlay & play text reveal
      tl.to(aboutOverlayRef.current, {
        autoAlpha: 1,
        duration: 0.2,
        onStart: () => {
          aboutRevealTl.play()
        },
        onReverseComplete: () => {
          aboutRevealTl.reverse()
        }
      }, 0.8)

      // Refresh ScrollTrigger on resize (important for SplitType line count changes)
      const handleResize = () => {
        titleSplit.revert()
        descSplit.revert()
        ScrollTrigger.refresh()
      }

      let resizeTimer = null
      const debouncedResize = () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(handleResize, 250)
      }
      window.addEventListener('resize', debouncedResize)

      return () => {
        window.removeEventListener('resize', debouncedResize)
        clearTimeout(resizeTimer)
        titleSplit.revert()
        descSplit.revert()
      }
    }, wrapperRef)

    return () => {
      ctx.revert()
      document.body.classList.remove('dark-nav-theme')
    }
  }, [isMobile])

  // GSAP Page Load Entrance animations for Hero elements
  useEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Reveal labels first
      tl.fromTo('.hero-editorial-label',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.1 }
      )
      // Hero title lines slide up from overflow hidden (mask reveal)
      .fromTo('.hero-title-line-content',
        { yPercent: 105 },
        { yPercent: 0, duration: 1.1, stagger: 0.14, ease: 'power4.out' },
        '-=0.5'
      )
      // Subtitle fades in from below
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      )
      // Profile image card subtle scale and entrance
      .fromTo(maskRef.current,
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.9'
      )
      // Key Impact Metrics entrance
      .fromTo('.hero-metric-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
        '-=0.8'
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [isMobile])

  /* ────────────────────────────────────────────────────────────
     MOBILE LAYOUT (FALLBACK) — Minimal Editorial Stack
     ──────────────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <div className="mobile-flow-container">
        {/* Mobile Hero section */}
        <section className="mobile-hero">
          <div className="mobile-hero-container">
            <div className="mobile-editorial-label">
              UX/UI DESIGNER
            </div>
            <h1 className="mobile-hero-title">
              Designing Scalable<br />UX systems for real world<br />products
            </h1>
            <p className="mobile-hero-subtitle">
              I design intuitive digital products through research, systems thinking and AI-powered workflows.
            </p>
            <div className="mobile-scroll-hint">
              <span className="mobile-hint-arrow">↓</span> SCROLL TO EXPLORE
            </div>
          </div>
        </section>

        {/* Mobile Portrait/Rectangular Image Card */}
        <div className="mobile-image-card">
          <div className="mobile-image-wrapper">
            <img src={profileImage} alt="Akash Gangurde — UX Designer" />
            <span className="mobile-image-tag">UI/UX DESIGNER</span>
          </div>
        </div>

        {/* Mobile About Section */}
        <section className="mobile-about">
          <div className="mobile-about-container">
            <span className="mobile-about-label">About me</span>
            <h2 className="mobile-about-title">
              It Started<br />With Curiosity.
            </h2>

            <div className="mobile-stats-container">
              <div className="mobile-stat-card">
                <span className="mobile-stat-num">2000+</span>
                <span className="mobile-stat-lbl">Users Impacted</span>
              </div>
              <div className="mobile-stat-card">
                <span className="mobile-stat-num">4</span>
                <span className="mobile-stat-lbl">Products Delivered</span>
              </div>
            </div>

            <p className="mobile-about-description">
              I started in Computer Science, but instead of asking how software works, I found myself asking why users struggle, what they expect, and how design can make technology feel effortless.
            </p>

            <Button variant="secondary" size="sm" to="/work" showArrow arrowType="right">
              Explore Work
            </Button>
          </div>
        </section>
      </div>
    )
  }

  /* ────────────────────────────────────────────────────────────
     DESKTOP EDITORIAL LAYOUT — 12-Column Grid Sticky Sequence
     ──────────────────────────────────────────────────────────── */
  return (
    <div ref={wrapperRef} className="scroll-transition-wrapper">
      <div ref={stickyRef} className="sticky-container">

        {/* HERO SECTION EDITORIAL VIEW (Scrolls up on scroll) */}
        <div ref={heroTextRef} className="hero-content-overlay">
          <div className="hero-content-inner">
            
            {/* Main 2-Column Split Grid (SYMBOLSTUDIO Composition) */}
            <div className="hero-editorial-grid">
              
              {/* Left Column: Top Role Statement, Headline, Subheadline, Bottom-Left Scroll Stack */}
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

        {/* TRANSITION IMAGE CONTAINER (Morphs from Col 8-12 card into 100vw x 100vh on scroll) */}
        <div ref={maskRef} className="transition-image-mask">
          <img ref={innerImgRef} src={profileImage} alt="Akash Gangurde — Portfolio" className="transition-img" />
          <div ref={darkOverlayRef} className="image-dark-overlay"></div>
          <div className="image-card-caption">
            <span className="caption-title">Akash Gangurde</span>
          </div>
        </div>

        {/* ABOUT SECTION VIEW (Overlays the full-screen image background) */}
        <div ref={aboutOverlayRef} className="about-content-overlay">
          <div className="about-content-inner">

            {/* Top-Left: Section Label */}
            <div className="about-header-label">About me</div>

            {/* Content Row: Left and Right Columns */}
            <div className="about-grid-layout">
              {/* Left Column: Huge Headline — SplitType targets .about-title */}
              <div className="about-col-left">
                <h2 className="about-title">
                  It Started<br />With Curiosity.
                </h2>
              </div>

              {/* Right Column: Stats + Subtitle + Button */}
              <div className="about-col-right">
                {/* 1. Stats Container */}
                <div className="about-stats-container">
                  <div className="about-stat-card">
                    <span className="stat-number">2000+</span>
                    <span className="stat-label">Users Impacted</span>
                  </div>
                  <div className="about-stat-card">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Products Delivered</span>
                  </div>
                </div>

                {/* 2. SplitType targets .about-description */}
                <p className="about-description">
                  I started in Computer Science, but instead of asking how software works, I found myself asking why users struggle, what they expect, and how design can make technology feel effortless.
                </p>

                {/* 3. Button */}
                <div className="about-right-bottom">
                  <Button variant="secondary" size="md" to="/work" showArrow arrowType="right" className="about-work-btn">
                    Explore Work
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroAboutTransition
