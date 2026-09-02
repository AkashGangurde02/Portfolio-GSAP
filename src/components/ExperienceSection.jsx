import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './ui/Button'
import resumePDF from '../images/Akash_Gangurde.pdf'
import './ExperienceSection.css'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCES = [
  {
    num: '01',
    date: 'SEP 2025 — MAR 2026',
    role: 'UX/UI Designer Intern',
    company: 'SOMVANSHI TECHNOLOGIES PVT. LTD., PUNE',
    desc: 'Working on end-to-end UX/UI design for AI-powered products and digital solutions. Involved in user research, wireframing, UI design, prototyping, and collaborating with developers to deliver meaningful user experiences.',
    link: '/experience/somvanshi'
  }
]

export default function ExperienceSection() {
  const containerRef = useRef(null)
  const leftColRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline text reveal animation (similar to case studies)
      // Header entrance animation
      gsap.from('.exp-headline-line-content', {
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: '100%',
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      })

      gsap.from('.exp-subtitle', {
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 0,
        y: 15,
        duration: 0.4,
        delay: 0.05,
        ease: 'power2.out',
      })

      // Timeline vertical progress line animation
      gsap.fromTo('.exp-timeline-line-progress', 
        { height: '0%' },
        {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: true,
          },
          height: '100%',
          ease: 'none'
        }
      )

      // Timeline items entrance animation
      const items = timelineRef.current.querySelectorAll('.exp-timeline-item')
      items.forEach((item) => {
        const num = item.querySelector('.exp-number')
        const details = item.querySelector('.exp-details')

        gsap.from([num, details].filter(Boolean), {
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none none',
            once: true,
          },
          opacity: 0,
          y: 20,
          stagger: 0.04,
          duration: 0.4,
          ease: 'power2.out',
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="experience" className="experience-section">
      <div className="exp-container">
        
        {/* ── Left Column ── */}
        <div ref={leftColRef} className="exp-left-col">
          <div>
            <h2 className="exp-headline">
              <span className="exp-headline-line">
                <span className="exp-headline-line-content">More Than Experience.</span>
              </span>
            </h2>
            <p className="exp-subtitle">
              A journey of mentorship, ownership, and collaboration that shaped my approach to product design.
            </p>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="exp-right-col">
          {/* ── Timeline Container ── */}
          <div ref={timelineRef} className="exp-timeline-container">
            {/* The vertical timeline track line */}
            <div className="exp-timeline-line">
              <div className="exp-timeline-line-progress" />
            </div>

            {/* Timeline Rows */}
            {EXPERIENCES.map((exp) => (
              <Link key={exp.num} to={exp.link} className="exp-timeline-item">
                <div className="exp-number">{exp.num}</div>
                <div className="exp-details">
                  <span className="exp-date">{exp.date}</span>
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-company">{exp.company}</span>
                  <p className="exp-description">{exp.desc}</p>
                  <div className="exp-divider" />
                </div>
              </Link>
            ))}
          </div>

          <div className="exp-right-footer">
            <Button variant="secondary" size="md" href={resumePDF} target="_blank" showArrow arrowType="up-right">
              VIEW RESUME
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
