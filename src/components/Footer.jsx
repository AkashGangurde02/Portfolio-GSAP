import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import workspaceImage from '../images/profile/footer-workspace.png'
import resumePDF from '../images/Akash_Gangurde.pdf'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

const Footer = ({ variant = 'home' }) => {
  const footerRef = useRef(null)
  const bigTextRef = useRef(null)

  const isInner = variant === 'inner'

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth <= 768) return

      // Brand + heading
      gsap.from('.footer-brand', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })

      // Link columns
      gsap.from('.footer-link-col', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all',
      })

    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className={`footer ${isInner ? 'footer-inner' : ''}`}>
      {/* Top Section */}
      <div className="footer-top">
        {/* Left Column: Brand + Description */}
        <div className="footer-brand">
          <h3 className="footer-brand-name">Akash Gangurde</h3>
          <p className="footer-brand-desc">
            Crafting intuitive digital experiences through thoughtful UX and pixel-perfect design.
          </p>
        </div>

        {/* Right Column: Links Grid (EXPLORE & CONNECT) */}
        <div className="footer-links-grid">
          <div className="footer-link-col">
            <h4 className="footer-col-heading">EXPLORE</h4>
            <ul className="footer-col-list">
              <li><Link to="/about" className="footer-col-link">About Me</Link></li>
              <li><Link to="/work" className="footer-col-link">Selected Work</Link></li>
              <li><a href="/#experience" className="footer-col-link">Experience</a></li>
              <li><Link to="/services" className="footer-col-link">Services</Link></li>
            </ul>
          </div>

          <div className="footer-link-col">
            <h4 className="footer-col-heading">CONNECT</h4>
            <ul className="footer-col-list">
              <li><a href="https://www.linkedin.com/in/akash-gangurde-0794aa258" target="_blank" rel="noopener noreferrer" className="footer-col-link">LinkedIn</a></li>
              <li><a href="mailto:akashgangurde0204@gmail.com" className="footer-col-link">Email</a></li>
              <li><a href={resumePDF} target="_blank" rel="noopener noreferrer" className="footer-col-link">Resume</a></li>
              <li><Link to="/contact" className="footer-col-link">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Visual THANK YOU Section — Home Page Variant Only */}
      {!isInner && (
        <div
          className="footer-visual-section"
          ref={bigTextRef}
          style={{ '--footer-img': `url(${workspaceImage})` }}
        >
          <div className="footer-text-band">
            <span className="footer-big-text">THANK YOU</span>
          </div>

          <div className="footer-photo-reveal">
            <img
              src={workspaceImage}
              alt="Akash's creative workspace"
              className="footer-reveal-img"
            />
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
