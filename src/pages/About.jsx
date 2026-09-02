import { useEffect, useRef, useState, useCallback } from 'react'
import { useSEO } from '../hooks/useSEO'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Button from '../components/ui/Button'
import './About.css'
import aboutProfile from '../images/profile/about-image.jpg'
import aboutImage2 from '../images/experience/somvanshi/images/Workplace_1.jpeg'
import dribbbleIcon from '../images/icons/Dribbble.svg'
import pinterestIcon from '../images/icons/Pinterest.svg'
import mediumIcon from '../images/icons/Medium.svg'
import chatgptIcon from '../images/icons/Chatgpt.svg'
import geminiIcon from '../images/icons/Gemini.svg'
import uxpilotIcon from '../images/icons/UXpilot.svg'
import slackIcon from '../images/icons/Slack.svg'
import trelloIcon from '../images/icons/Trello.svg'
import figmaIcon from '../images/icons/Figma.svg'
import Footer from '../components/Footer'
import ExperienceSection from '../components/ExperienceSection'

/* ─────────────────────────────────────────────────────────────
   ToolCard — defined OUTSIDE About so it's never recreated.
   Tooltip is a React portal rendered at document.body to fully
   escape every overflow / transform ancestor in the marquee.
───────────────────────────────────────────────────────────── */
const ToolCard = ({ tool, rowIndex, onMouseEnter, onMouseLeave }) => (
  <div
    className="tool-bubble-wrapper"
    onMouseEnter={(e) => onMouseEnter(e, tool, rowIndex)}
    onMouseLeave={onMouseLeave}
  >
    <div className="tool-card-square" aria-label={tool.name}>
      {tool.icon ? (
        <img src={tool.icon} alt={`${tool.name} icon`} className="tool-card-inline-img" />
      ) : (
        <span className="tool-card-placeholder">
          {tool.name.substring(0, 2).toUpperCase()}
        </span>
      )}
      <span className="tool-card-name">{tool.name}</span>
    </div>
  </div>
)

const About = () => {
  useSEO({
    title: 'About',
    description: 'Self-taught UX/UI Designer with a background in Computer Science Engineering (AI). Specialising in mobile-first products, interaction design, and scalable design systems.',
    canonical: '/about',
    ogImage: '/og/og-about.png',
  })
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const topSectionRef = useRef(null)
  const experienceRef = useRef(null)
  const toolsRef = useRef(null)
  const partnersRef = useRef(null)

  /* ── Portal tooltip state ── */
  const [tooltip, setTooltip] = useState({
    visible: false,
    name: '',
    desc: '',
    x: 0,
    y: 0,
    below: false,
  })

  const showTooltip = useCallback((e, tool, rowIndex) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const scrollY = window.scrollY || window.pageYOffset
    // Row 1 → always below the card; Row 2 → always above
    const below = rowIndex === 0
    setTooltip({
      visible: true,
      name: tool.name,
      desc: tool.description || '',
      x: rect.left + rect.width / 2,
      // For position:absolute on body, add scrollY to convert viewport coords → document coords
      y: below
        ? rect.bottom + scrollY + 10   // anchor to card bottom + gap
        : rect.top + scrollY - 10,    // anchor to card top   - gap (CSS shifts up via translateY(-100%))
      below,
    })
  }, [])

  const hideTooltip = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }, [])

  const toolsCategories = [
    {
      category: 'Design Inspiration',
      tools: [
        { name: 'Dribbble', description: 'Tracks evolving UI trends and fresh interface styles that influence visual direction.', icon: dribbbleIcon },
        { name: 'Pinterest', description: 'Moodboard hub for color systems, typography direction, and brand aesthetics.', icon: pinterestIcon }
      ]
    },
    {
      category: 'Design Tools',
      tools: [
        { name: 'Figma', description: 'Collaborative interface design tool for UI/UX designs and interactive prototypes.', icon: figmaIcon }
      ]
    },
    {
      category: 'AI & Productivity',
      tools: [
        { name: 'UX Pilot', description: 'AI-powered workspace for accelerating wireframes, ideation, and rapid UX exploration.', icon: uxpilotIcon },
        { name: 'ChatGPT', description: 'Creative partner for UX writing, structured thinking, and refining product concepts.', icon: chatgptIcon },
        { name: 'Google Gemini', description: 'Research companion that supports brainstorming and expands product perspectives.', icon: geminiIcon }
      ]
    },
    {
      category: 'Collaboration',
      tools: [
        { name: 'Slack', description: 'Powerful communication platform for team collaboration and project coordination.', icon: slackIcon },
        { name: 'Trello', description: 'Visual project management tool for organizing tasks and workflows.', icon: trelloIcon }
      ]
    },
    {
      category: 'Learning & Research',
      tools: [
        { name: 'Medium', description: 'Continuous stream of UX insights that keeps design decisions aligned with industry thinking.', icon: mediumIcon }
      ]
    }
  ]

  const allTools = toolsCategories.flatMap(cat => cat.tools)
  const midPoint = Math.ceil(allTools.length / 2)
  const row1ToolsBase = allTools.slice(0, midPoint)
  const row2ToolsBase = allTools.slice(midPoint)

  // Triple each row so it never snaps on large/4K screens
  const row1Tools = [...row1ToolsBase, ...row1ToolsBase, ...row1ToolsBase]
  const row2Tools = [...row2ToolsBase, ...row2ToolsBase, ...row2ToolsBase]

  const partners = [
    { name: 'Somvanshi Technologies Pvt Ltd', category: 'UI/UX & Branding', year: '2025' },
    { name: 'Grubwala', category: 'Product Design', year: '2023' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        clearProps: 'all'
      })
        .from(topSectionRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          clearProps: 'all'
        }, '-=0.5')
        .from([experienceRef.current, toolsRef.current, partnersRef.current].filter(Boolean), {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          clearProps: 'all'
        }, '-=0.4')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  /* ── Tooltip style: position:absolute on body + scrollY offset ──
     Why not fixed? html{overflow-x:clip} and body{overflow-x:hidden}
     trap fixed elements inside the document flow on some browsers.
     Absolute on body with scrollY added escapes all marquee ancestors
     while remaining unaffected by those overflow constraints. */
  const tooltipStyle = {
    position: 'absolute',
    left: `${tooltip.x}px`,
    top: `${tooltip.y}px`,
    transform: tooltip.below
      ? 'translateX(-50%)'                    // below: drop straight down
      : 'translateX(-50%) translateY(-100%)', // above: shift up by own height
    opacity: tooltip.visible ? 1 : 0,
    visibility: tooltip.visible ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s',
    zIndex: 99999,
    pointerEvents: 'none',
  }

  return (
    <>
      <div className="about-page">
        <section ref={heroRef} className="about-hero">
          <div className="about-page-container">
            <h1 ref={titleRef} className="about-page-title">
              <span className="title-light">About me,</span> my story and my experience
            </h1>

            <div ref={topSectionRef} className="about-top-wrapper">
              <div className="about-hero-2col">

                {/* ── LEFT: Profile Image ── */}
                <div className="about-hero-img-col">
                  <div className="about-hero-img-frame">
                    <img src={aboutProfile} alt="Akash Gangurde — UX/UI Designer" />
                  </div>
                </div>

                {/* ── RIGHT: Info Text ── */}
                <div className="about-hero-info-col">
                  <h2 className="about-hero-subheading">
                    UX/UI Designer
                  </h2>

                  <p className="about-hero-desc">
                    <strong>Self-taught UX/UI Designer</strong> focused on creating simple, intuitive, and{' '}
                    <strong>user-centered digital experiences</strong> that solve real-world problems.
                    With a background in <strong>Computer Science Engineering (AI)</strong>, I combine
                    technical understanding with <strong>product thinking</strong> to design scalable and
                    meaningful digital solutions.
                  </p>

                  <p className="about-hero-desc">
                    Previously worked as a <strong>UX/UI Design Intern at Somvanshi Technologies</strong>,
                    where I designed landing pages, responsive interfaces, and end-to-end user experiences in{' '}
                    <strong>Figma</strong>. I also led teams as the <strong>Non-Technical Head at VIIT Robotics Forum</strong>,
                    strengthening my <strong>collaboration, leadership, and problem-solving skills</strong>.
                  </p>

                  {/* Quick-stat chips removed */}

                  {/* CTA */}
                  <Button variant="primary" size="lg" to="/contact" showArrow arrowType="right">
                    Let's Talk
                  </Button>
                </div>

              </div>
            </div>

            {/* Experience Section */}
            <ExperienceSection ref={experienceRef} className="embedded" />

            {/* Tools Section — Animated Logo Cloud */}
            <div ref={toolsRef} className="tools-section">
              <h2 className="section-title">Tools I use to craft experiences</h2>

              {/* marquee-overflow-clip clips only horizontally, without clipping tooltip portals */}
              <div className="marquee-overflow-clip">
                <div className="marquee-container">
                  {/* Row 1 — tooltip always below (rowIndex=0) */}
                  <div className="marquee-track">
                    <div className="marquee-group">
                      {row1Tools.map((tool, index) => (
                        <ToolCard
                          key={`r1-a-${index}`}
                          tool={tool}
                          rowIndex={0}
                          onMouseEnter={showTooltip}
                          onMouseLeave={hideTooltip}
                        />
                      ))}
                    </div>
                    <div className="marquee-group" aria-hidden="true">
                      {row1Tools.map((tool, index) => (
                        <ToolCard
                          key={`r1-b-${index}`}
                          tool={tool}
                          rowIndex={0}
                          onMouseEnter={showTooltip}
                          onMouseLeave={hideTooltip}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Row 2 — tooltip always above (rowIndex=1) */}
                  <div className="marquee-track marquee-track--reverse">
                    <div className="marquee-group">
                      {row2Tools.map((tool, index) => (
                        <ToolCard
                          key={`r2-a-${index}`}
                          tool={tool}
                          rowIndex={1}
                          onMouseEnter={showTooltip}
                          onMouseLeave={hideTooltip}
                        />
                      ))}
                    </div>
                    <div className="marquee-group" aria-hidden="true">
                      {row2Tools.map((tool, index) => (
                        <ToolCard
                          key={`r2-b-${index}`}
                          tool={tool}
                          rowIndex={1}
                          onMouseEnter={showTooltip}
                          onMouseLeave={hideTooltip}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>{/* end marquee-overflow-clip */}
            </div>

            {/* Partners Section */}
            <div ref={partnersRef} className="partners-section">
              <h2 className="section-title">A visual partner for company</h2>
              <div className="partners-grid">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="partner-card"
                    data-index={String(index + 1).padStart(2, '0')}
                  >
                    <div className="partner-card-content">
                      <h3 className="partner-name">{partner.name}</h3>
                      <p className="partner-category">{partner.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer variant="inner" />
      </div>

      {/* ── Portal tooltip — rendered at document.body, escapes ALL overflow/transform ancestors ── */}
      {createPortal(
        <div
          className={`tool-tooltip-portal ${tooltip.below ? 'tip-below' : 'tip-above'}`}
          style={tooltipStyle}
        >
          <span className="tooltip-name">{tooltip.name}</span>
          <span className="tooltip-desc">{tooltip.desc}</span>
        </div>,
        document.body
      )}
    </>
  )
}

export default About
