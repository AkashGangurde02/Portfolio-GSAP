import { useEffect, useRef, useState } from 'react'
import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CaseStudyHempHop.css'
import hempHopImage from '../images/case-studies/case-study-2/hemp-hop-cover.png'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
    { num: '01', label: 'Observe', desc: 'Evaluated the existing experience and recognized that users scan before they read, especially in wellness e-commerce.' },
    { num: '02', label: 'Diagnose', desc: 'Identified that benefits and trust signals were buried, increasing cognitive load on the PLP and PDP.' },
    { num: '03', label: 'Strategize', desc: 'Decided to prioritize clarity over complexity, focusing on modular, system-driven constraints without changing product catalogs.' },
    { num: '04', label: 'Restructure', desc: 'Redesigned information hierarchy to surface what the product is, why it matters, and if it is right for the user quickly.' },
]

const solutions = [
    { title: 'Scannable PLPs', text: 'Redesigned the Product Listing Page to surface essential information like pricing and benefits at a glance.' },
    { title: 'Structured PDPs', text: 'Segmented Product Detail Pages logically to support both skimmers and detail-oriented shoppers.' },
    { title: 'Integrated Trust', text: 'Built confidence naturally into the flow with restrained typography and spacing instead of isolated badges.' },
    { title: 'Scalable System', text: 'Created reusable components ensuring predictability and faster developer handoff as the catalog grows.' },
]

const HEMP_HOP_PROBLEMS = [
    { number: '01', title: 'Hidden Benefits', description: 'Crucial information like usage guidance and benefits were buried deep within layouts, forcing users to actively search.' },
    { number: '02', title: 'Poor Comparisons', description: 'The Product Listing Pages (PLP) lacked scannability, making it hard to efficiently compare different wellness items.' },
    { number: '03', title: 'Weak Trust Signals', description: 'Reassurance at key conversion moments was presented inconsistently, failing to mitigate hesitation.' }
]

// GSAP accordion item — replaces AnimatePresence height: 0 → auto
const AccordionItem = ({ prob, isOpen, onToggle }) => {
  const contentRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    if (tweenRef.current) tweenRef.current.kill()
    if (isOpen) {
      gsap.set(el, { height: 'auto', opacity: 1 })
      const fullH = el.scrollHeight
      gsap.set(el, { height: 0, opacity: 0 })
      tweenRef.current = gsap.to(el, {
        height: fullH,
        opacity: 1,
        duration: 0.32,
        ease: 'power2.inOut',
        onComplete: () => gsap.set(el, { height: 'auto' }),
      })
    } else {
      tweenRef.current = gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: 'power2.inOut',
      })
    }
    return () => { if (tweenRef.current) tweenRef.current.kill() }
  }, [isOpen])

  return (
    <div className={`cs2-accordion-item ${isOpen ? 'open' : ''}`}>
      <button
        className="cs2-accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="cs2-accordion-title">
          <span className="cs2-accordion-num">{prob.number}</span>
          {prob.title}
        </span>
        <span className="cs2-accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div ref={contentRef} className="cs2-accordion-content" style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="cs2-accordion-inner">
          <p className="cs2-accordion-desc">{prob.description}</p>
        </div>
      </div>
    </div>
  )
}

const CaseStudyHempHop = () => {
    useSEO({
      title: 'Hemp Hop UX Case Study',
      description: 'UX case study: redesigning the Hemp Hop D2C wellness e-commerce experience to improve product discovery, trust signals, and purchase confidence.',
      canonical: '/case-study/hemp-hop',
      ogImage: '/og/og-hemp-hop.png',
    })
    const heroRef = useRef(null)
    const sectionsRef = useRef([])
    const [activeProblemIndex, setActiveProblemIndex] = useState(0)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero stagger entrance
            gsap.from('.cs2-hero-tag, .cs2-hero-title, .cs2-hero-sub, .cs2-meta-row', {
                y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1,
            })
            gsap.from('.cs2-hero-image', {
                y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.3,
            })

            // Scroll sections
            sectionsRef.current.forEach((el) => {
                if (!el) return
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
                    y: 50, opacity: 0, duration: 0.85, ease: 'power3.out',
                })
            })

            // Process cards staggered
            gsap.from('.cs2-step', {
                scrollTrigger: { trigger: '.cs2-steps', start: 'top 85%' },
                y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            })

            // Solution cards staggered
            gsap.from('.cs2-sol-card', {
                scrollTrigger: { trigger: '.cs2-sol-grid', start: 'top 85%' },
                y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            })
        })

        return () => ctx.revert()
    }, [])

    const addSection = (el) => { if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el) }

    return (
        <div className="cs2-page">



            {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
            <section ref={heroRef} className="cs2-hero">
                <div className="cs2-hero-inner">

                    <div className="cs2-hero-left">
                        <span className="cs2-hero-tag">E-Commerce UX</span>
                        <h1 className="cs2-hero-title">
                            Improving<br />Product Discovery<br />&amp; Trust
                        </h1>
                        <p className="cs2-hero-sub">
                            Hemp Hop — Redesigning the D2C wellness e-commerce experience to help users discover products effortlessly and feel confident completing a purchase.
                        </p>

                        <div className="cs2-meta-row">
                            <div className="cs2-meta-item">
                                <span className="cs2-meta-label">Role</span>
                                <span className="cs2-meta-val">UI/UX Designer</span>
                            </div>
                            <div className="cs2-meta-item">
                                <span className="cs2-meta-label">Domain</span>
                                <span className="cs2-meta-val">Wellness D2C</span>
                            </div>
                            <div className="cs2-meta-item">
                                <span className="cs2-meta-label">Constraints</span>
                                <span className="cs2-meta-val">Fixed Catalog</span>
                            </div>
                            <div className="cs2-meta-item">
                                <span className="cs2-meta-label">Platform</span>
                                <span className="cs2-meta-val">Web (Responsive)</span>
                            </div>
                        </div>
                    </div>

                    <div className="cs2-hero-right">
                        <div className="cs2-hero-image">
                            <img src={hempHopImage} alt="Hemp Hop E-commerce UX" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
          DARK STAT BAND
      ══════════════════════════════════ */}
            <section ref={addSection} className="cs2-stat-band">
                <div className="cs2-stat-inner">
                    <div className="cs2-stat-item">
                        <span className="cs2-stat-num">3</span>
                        <span className="cs2-stat-label">Core Decision Priorities</span>
                    </div>
                    <div className="cs2-stat-divider" />
                    <div className="cs2-stat-item">
                        <span className="cs2-stat-num">1</span>
                        <span className="cs2-stat-label">Scalable Design System</span>
                    </div>
                    <div className="cs2-stat-divider" />
                    <div className="cs2-stat-item">
                        <span className="cs2-stat-num">0</span>
                        <span className="cs2-stat-label">Catalog Distortions</span>
                    </div>
                    <div className="cs2-stat-divider" />
                    <div className="cs2-stat-item">
                        <span className="cs2-stat-num">100%</span>
                        <span className="cs2-stat-label">Modular Architecture</span>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
          OVERVIEW — two col
      ══════════════════════════════════ */}
            <section ref={addSection} className="cs2-section cs2-overview">
                <div className="cs2-container cs2-two-col">
                    <div className="cs2-overview-left">
                        <h2 className="cs2-heading">Building trust without visual clutter</h2>
                        <p className="cs2-body">
                            Hemp Hop operates in a wellness category where trust, clarity, and credibility are critical to purchase intent. Users often arrive with uncertainty around ingredients, safety, and legitimacy. The classic fallback behavior in this industry is adding more content.
                        </p>
                        <p className="cs2-body">
                            However, I found that an over-abundance of text compromised scannability. Information hierarchy and product presentation needed to shift towards structured clarity—answering "What is it?", "Why does it matter?", and "Is it right for me?" immediately.
                        </p>
                    </div>
                    <div className="cs2-overview-right">
                        <div className="cs2-image-stack" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="cs2-img-card" style={{ transform: 'none', position: 'relative', width: '100%' }}>
                                <img src={hempHopImage} alt="Hemp Hop Clean Interface" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
          PROBLEM — full-width dark
      ══════════════════════════════════ */}
            <section ref={addSection} className="cs2-section cs2-problem-band">
                <div className="cs2-container">
                    <h2 className="cs2-heading cs2-heading--light cs2-heading--center">
                        The friction of<br />information overload
                    </h2>
                    
                    {/* DESKTOP LAYOUT (Hidden on mobile) */}
                    <div className="cs2-problem-grid cs2-desktop-layout">
                        {HEMP_HOP_PROBLEMS.map((prob, index) => (
                            <div key={index} className="cs2-problem-card">
                                <span className="cs2-problem-num">{prob.number}</span>
                                <h3>{prob.title}</h3>
                                <p>{prob.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* MOBILE ACCORDION LAYOUT (Visible only on mobile/tablet) */}
                    <div className="cs2-problem-accordion">
                        {HEMP_HOP_PROBLEMS.map((prob, index) => (
                            <AccordionItem
                                key={index}
                                prob={prob}
                                isOpen={index === activeProblemIndex}
                                onToggle={() => setActiveProblemIndex(activeProblemIndex === index ? null : index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
          DESIGN PROCESS
      ══════════════════════════════════ */}
            <section ref={addSection} className="cs2-section cs2-process">
                <div className="cs2-container">
                    <h2 className="cs2-heading cs2-center">How I approached the problem</h2>

                    <div className="cs2-steps">
                        {processSteps.map((step, i) => (
                            <div key={i} className="cs2-step">
                                <div className="cs2-step-top">
                                    <span className="cs2-step-num">{step.num}</span>
                                    {i < processSteps.length - 1 && <div className="cs2-step-connector" />}
                                </div>
                                <h3 className="cs2-step-label">{step.label}</h3>
                                <p className="cs2-step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
          SOLUTION HIGHLIGHTS
      ══════════════════════════════════ */}
            <section ref={addSection} className="cs2-section cs2-solutions">
                <div className="cs2-container">
                    <h2 className="cs2-heading cs2-center">Solution Highlights</h2>

                    <div className="cs2-sol-grid">
                        {solutions.map((s, i) => (
                            <div key={i} className="cs2-sol-card">
                                <div className="cs2-sol-icon-wrap">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="cs2-sol-title">{s.title}</h3>
                                <p className="cs2-sol-text">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
          IMPACT — dark band
      ══════════════════════════════════ */}
            <section ref={addSection} className="cs2-section cs2-impact-band">
                <div className="cs2-container">
                    <h2 className="cs2-heading cs2-heading--light cs2-center">Impact &amp; Reflection</h2>

                    <div className="cs2-impact-grid">
                        <div className="cs2-impact-card">
                            <span className="cs2-impact-icon">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M9 14l3.5 3.5L19 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <h3>Clarity Improved</h3>
                            <p>Stronger visual hierarchy directly translated into more effortless product scanning across the platform.</p>
                        </div>
                        <div className="cs2-impact-card">
                            <span className="cs2-impact-icon">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </span>
                            <h3>Frictionless Handoff</h3>
                            <p>The scalable design system supported tight development timelines and easy onboarding of future products.</p>
                        </div>
                        <div className="cs2-impact-card">
                            <span className="cs2-impact-icon">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M10 17c0-3 8-3 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <circle cx="11" cy="12" r="1.5" fill="currentColor" />
                                    <circle cx="17" cy="12" r="1.5" fill="currentColor" />
                                </svg>
                            </span>
                            <h3>Trust Perception</h3>
                            <p>Intentional restraint over aesthetic noise fostered a calmer, more confident e-commerce environment.</p>
                        </div>
                    </div>

                    <blockquote className="cs2-reflection">
                        "Good design reduces doubt. Great UX builds confidence. Thoughtful hierarchy and system-driven design are far more effective than adding complexity."
                    </blockquote>
                </div>
            </section >

            {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
            < section ref={addSection} className="cs2-section cs2-cta" >
                <div className="cs2-container cs2-cta-inner">
                    <h2 className="cs2-cta-heading">Want to see more of my work?</h2>
                    <p className="cs2-cta-sub">Back to the primary case studies or drop me an email.</p>
                    <div className="cs2-cta-actions">
                        <Link to="/work" className="cs2-btn cs2-btn-ghost">← Back to Work</Link>
                        <Link to="/contact" className="cs2-btn cs2-btn-primary">
                            Let's Talk →
                        </Link>
                    </div>
                </div>
            </section >

            <Footer variant="inner" />
        </div >
    )
}

export default CaseStudyHempHop
