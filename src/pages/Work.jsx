import { useEffect, useRef, useState } from 'react'
import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import './Work.css'

import contactFormImage from '../images/case-studies/case-study-1/contact-redesign.jpg'
import grubwalaCardImage from '../images/case-studies/case-study-3/grubwala-work-card-cover.jpg'
import spotifyImage from '../images/case-studies/case-study-4/spotify-laptop-cover.jpg'
import hempHopImage from '../images/case-studies/case-study-2/hemp-hop-cover.png'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 'grubwala',
    title: 'Grubwala food ordering',
    description: 'Redesigned the ordering journey to make decisions feel clearer, build trust, and remove checkout friction.',
    image: grubwalaCardImage,
    link: '/work/grubwala',
    tags: ['PRODUCT DESIGN', 'UX RESEARCH', 'MOBILE APP'],
    category: 'Product Design'
  },
  {
    id: 'spotify',
    title: 'Spotify Desktop Mini Player redesign',
    description: 'A focused lyrics experience designed to reduce context switching and elevate continuous music playback.',
    image: spotifyImage,
    link: '/case-study/spotify',
    tags: ['UX RESEARCH', 'INTERACTION DESIGN', 'DESKTOP APP'],
    category: 'Interaction Design'
  },
  {
    id: 'somvanshi',
    title: 'Somvanshi lead capture workflow',
    description: 'Simplified a complex multi-step contact form flow to reduce drop-off and boost lead completion rates.',
    image: contactFormImage,
    link: '/case-study',
    tags: ['UX RESEARCH', 'UI DESIGN', 'WEB APP'],
    category: 'UX Research'
  },
  {
    id: 'hemp-hop',
    title: 'HempHop e-commerce experience',
    description: 'A modern e-commerce web platform crafted with intuitive product discovery and seamless checkout.',
    image: hempHopImage,
    link: '/case-study/hemp-hop',
    tags: ['UI DESIGN', 'WEB DESIGN', 'E-COMMERCE'],
    category: 'UI Design'
  }
]

const CATEGORIES = ['All', 'UI/UX Design', 'Interaction Design', 'Product Design']

const Work = () => {
  useSEO({
    title: 'Projects',
    description: 'Browse selected UX case studies by Akash Gangurde — Spotify Mini Player redesign, Grubwala food ordering experience, Somvanshi lead capture, and HempHop e-commerce.',
    canonical: '/work',
    ogImage: '/og/og-work.png',
  })

  const [activeCategory, setActiveCategory] = useState('All')
  const heroRef = useRef(null)
  const gridRef = useRef(null)

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => {
        if (activeCategory === 'UI/UX Design') {
          return p.category === 'UI/UX Design' || p.category === 'UX Research' || p.category === 'UI Design' || p.tags.includes('UI DESIGN') || p.tags.includes('UX RESEARCH')
        }
        if (activeCategory === 'Interaction Design') {
          return p.category === 'Interaction Design' || p.tags.includes('INTERACTION DESIGN')
        }
        if (activeCategory === 'Product Design') {
          return p.category === 'Product Design' || p.tags.includes('PRODUCT DESIGN')
        }
        return p.category === activeCategory
      })

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

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: {
            trigger: gridRef.current,
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
        {/* ── HEADER SECTION ── */}
        <div className="lyniq-header" ref={heroRef}>
          <h1 className="lyniq-headline">Projects</h1>
          <p className="lyniq-header-sub">
            Every project I deliver is a reflection of my commitment to quality, designed to inspire and drive success.
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

        {/* ── 2-COLUMN PROJECTS GRID ── */}
        <section className="lyniq-projects-section">
          <div className="lyniq-grid" ref={gridRef}>
            {filteredProjects.map(project => (
              <Link key={project.id} to={project.link} className="lyniq-card">
                <div className="lyniq-card-media-wrap">
                  <img src={project.image} alt={project.title} className="lyniq-card-image" />
                  <span className="lyniq-card-arrow-badge">↗</span>
                </div>
                <div className="lyniq-card-info">
                  <h3 className="lyniq-card-title">{project.title}</h3>
                  <p className="lyniq-card-desc">{project.description}</p>
                  <div className="lyniq-card-tags">
                    {project.tags.map((tag, idx) => (
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

export default Work
