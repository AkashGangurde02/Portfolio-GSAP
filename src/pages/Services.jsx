import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    id: 'ux-audit',
    num: '01',
    title: 'UX AUDIT',
    tagline: 'Find friction before you redesign.',
    offer: [
      'Heuristic evaluation',
      'UX friction mapping',
      'Information architecture review',
      'Accessibility checks',
      'Conversion opportunity analysis',
    ],
    deliverables: [
      'Annotated screen reports',
      'UX findings document',
      'Priority & severity matrix',
      'Recommended improvements',
    ],
    cta: 'GET AN AUDIT',
    href: '/contact',
  },
  {
    id: 'ui-design',
    num: '02',
    title: 'UI DESIGN',
    tagline: 'Screens that feel as good as they look.',
    offer: [
      'Mobile app UI',
      'Website UI',
      'SaaS dashboards',
      'E-commerce UI',
      'Landing pages',
    ],
    deliverables: [
      'High-fidelity Figma screens',
      'Interactive prototype',
      'Component annotations',
      'Responsive variants',
    ],
    cta: 'START A PROJECT',
    href: '/contact',
  },
  {
    id: 'design-systems',
    num: '03',
    title: 'DESIGN SYSTEMS',
    tagline: 'A single source of truth for your team.',
    offer: [
      'Design tokens',
      'Typography system',
      'Component library',
      'Variants & states',
      'Responsive systems',
    ],
    deliverables: [
      'Figma component library',
      'Token documentation',
      'Usage guidelines',
      'Developer handoff',
    ],
    cta: 'BUILD A SYSTEM',
    href: '/contact',
  },
  {
    id: 'figma-resources',
    num: '04',
    title: 'FIGMA RESOURCES',
    tagline: 'Ready-to-use Figma assets and kits.',
    offer: [
      'UI kits',
      'Component packs',
      'Page templates',
      'Design system starters',
      'AI UX prompt packs',
    ],
    deliverables: [
      'Fully editable Figma files',
      'Organized page structure',
      'Auto-layout components',
      'Documentation included',
    ],
    cta: 'EXPLORE RESOURCES',
    href: '/contact',
  },
]

export default function Services() {
  const pageRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const rowRefs = useRef([])
  const [openIndex, setOpenIndex] = useState(null)
  const accordionContentRefs = useRef([])

  // ── Accordion open/close ────────────────────────────────────────────────
  const toggleAccordion = useCallback((index) => {
    const isOpen = openIndex === index

    // Close currently open
    if (openIndex !== null) {
      const prevContent = accordionContentRefs.current[openIndex]
      const prevArrow = rowRefs.current[openIndex]?.querySelector('.srv-row-arrow')
      if (prevContent) {
        gsap.to(prevContent, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(prevContent, { display: 'none' }),
        })
      }
      if (prevArrow) gsap.to(prevArrow, { rotation: 0, duration: 0.3, ease: 'power2.out' })
    }

    if (!isOpen) {
      const content = accordionContentRefs.current[index]
      const arrow = rowRefs.current[index]?.querySelector('.srv-row-arrow')
      if (content) {
        gsap.set(content, { display: 'block', height: 'auto', opacity: 1 })
        const h = content.offsetHeight
        gsap.fromTo(
          content,
          { height: 0, opacity: 0 },
          { height: h, opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
      }
      if (arrow) gsap.to(arrow, { rotation: 45, duration: 0.3, ease: 'power2.out' })
      setOpenIndex(index)
    } else {
      setOpenIndex(null)
    }
  }, [openIndex])

  // ── Keyboard accessibility ──────────────────────────────────────────────
  const handleKeyDown = useCallback((e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleAccordion(index)
    }
  }, [toggleAccordion])

  const heroContainerRef = useRef(null)
  const heroTitleWrapRef = useRef(null)
  const heroLinesRef = useRef([])

  // GSAP quickTo setters for ultra-smooth 60fps cursor parallax
  const xTitle = useRef(null)
  const yTitle = useRef(null)

  useEffect(() => {
    if (!heroContainerRef.current) return

    xTitle.current = gsap.quickTo(heroTitleWrapRef.current, 'x', { duration: 0.8, ease: 'power3.out' })
    yTitle.current = gsap.quickTo(heroTitleWrapRef.current, 'y', { duration: 0.8, ease: 'power3.out' })
  }, [])

  const handleHeroMouseMove = (e) => {
    if (window.innerWidth < 768 || !heroContainerRef.current) return
    const rect = heroContainerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left - rect.width / 2
    const mouseY = e.clientY - rect.top - rect.height / 2

    xTitle.current?.(mouseX * 0.022)
    yTitle.current?.(mouseY * 0.022)
  }

  const handleHeroMouseLeave = () => {
    if (window.innerWidth < 768) return
    xTitle.current?.(0)
    yTitle.current?.(0)
  }

  // ── Scroll-linked animations ────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Hero headline staggered line entrance
      if (heroLinesRef.current.length > 0) {
        heroTl.fromTo(
          heroLinesRef.current.filter(Boolean),
          { y: '120%', opacity: 0, rotateX: -14 },
          {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            duration: 1.15,
            stagger: 0.14,
            delay: 0.1,
          }
        )
      }

      // Left column entrance
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })

      // Service rows reveal
      rowRefs.current.forEach((row, i) => {
        if (!row) return
        gsap.fromTo(
          row,
          { y: 24, opacity: 0 },
          {
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            delay: i * 0.05,
          }
        )
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])


  return (
    <div className="srv-page" ref={pageRef}>
      {/* ── PAGE HERO (Awwwards-Style Editorial UX Statement) ────────────── */}
      <section
        className="srv-hero-interactive"
        ref={heroContainerRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        aria-label="UX Philosophy Statement"
      >
        {/* Background Grid Crosshairs */}
        <div className="srv-hero-bg-grid" aria-hidden="true">
          <span className="srv-ch ch-tl">+</span>
          <span className="srv-ch ch-tr">+</span>
          <span className="srv-ch ch-bl">+</span>
          <span className="srv-ch ch-br">+</span>
        </div>

        {/* Main Editorial Headline */}
        <div className="srv-hero-title-wrap" ref={heroTitleWrapRef}>
          <h1 className="srv-hero-statement">
            <span className="srv-hero-mask">
              <span ref={el => heroLinesRef.current[0] = el} className="srv-hero-line">
                Every UX decision either creates value —
              </span>
            </span>

            <span className="srv-hero-mask">
              <span ref={el => heroLinesRef.current[1] = el} className="srv-hero-line">
                or creates friction.
              </span>
            </span>

            <span className="srv-hero-mask">
              <Link to="/contact" className="srv-hero-line-link">
                <span ref={el => heroLinesRef.current[2] = el} className="srv-hero-line srv-line-accent">
                  Do you know which side you're on?
                </span>
              </Link>
            </span>
          </h1>
        </div>
      </section>

      {/* ── TWO-COLUMN LAYOUT ────────────────────────────────────── */}
      <div className="srv-layout">

        {/* LEFT — sticky editorial column */}
        <aside className="srv-left" ref={leftRef} aria-label="Services introduction">
          <div className="srv-left-inner">
            <p className="srv-left-desc">
              Services
            </p>
          </div>
        </aside>

        {/* RIGHT — scrolling service list */}
        <main className="srv-right" ref={rightRef} aria-label="Service list">
          {SERVICES.map((service, i) => (
            <article
              key={service.id}
              className={`srv-row ${openIndex === i ? 'srv-row--open' : ''}`}
              ref={el => rowRefs.current[i] = el}
              id={`service-${service.id}`}
            >
              {/* Row header — click to expand */}
              <div
                className="srv-row-header"
                role="button"
                tabIndex={0}
                aria-expanded={openIndex === i}
                aria-controls={`service-body-${service.id}`}
                onClick={() => toggleAccordion(i)}
                onKeyDown={e => handleKeyDown(e, i)}
              >
                <div className="srv-row-meta">
                  <span className="srv-row-num">{service.num}</span>
                  <div className="srv-row-title-block">
                    <h2 className="srv-row-title">{service.title}</h2>
                  </div>
                </div>
                <span className="srv-row-arrow" aria-hidden="true">+</span>
              </div>

              {/* Expandable body */}
              <div
                id={`service-body-${service.id}`}
                className="srv-row-body"
                ref={el => accordionContentRefs.current[i] = el}
                style={{ display: 'none', overflow: 'hidden' }}
                aria-hidden={openIndex !== i}
              >
                <div className="srv-row-body-inner">
                  <div className="srv-body-col">
                    <h3 className="srv-body-heading">WHAT I OFFER</h3>
                    <ul className="srv-body-list">
                      {service.offer.map((item) => (
                        <li key={item} className="srv-body-item">
                          <span className="srv-body-bullet" aria-hidden="true">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="srv-body-col">
                    <h3 className="srv-body-heading">DELIVERABLES</h3>
                    <ul className="srv-body-list">
                      {service.deliverables.map((item) => (
                        <li key={item} className="srv-body-item">
                          <span className="srv-body-bullet" aria-hidden="true">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="srv-body-cta-col">
                    <Link
                      to={service.href}
                      className="srv-body-cta"
                      aria-label={`${service.cta} — ${service.title}`}
                    >
                      {service.cta} <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>

      {/* ── BOTTOM CTA — full-width section outside the grid ── */}
      <div className="srv-bottom-cta">
        <h2 className="srv-bottom-headline">
          Ready to build<br />something better?
        </h2>
        <div className="srv-bottom-actions">
          <Link to="/contact" className="srv-btn-primary">
            START A PROJECT <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <Footer variant="inner" />
    </div>
  )
}
