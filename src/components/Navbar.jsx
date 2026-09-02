import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import Button from './ui/Button'
import './Navbar.css'
import resumePDF from '../images/Akash_Gangurde.pdf'

const Navbar = () => {
  const location = useLocation()
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const pillRef = useRef(null)
  const overlayRef = useRef(null)
  const overlayLinksRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const lastScrollY = useRef(0)

  // Track scroll position to adjust navbar background and autohide on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 30)

      // Keep navbar always visible on scroll
      setIsNavHidden(false)
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location])

  // Handle window resize to auto-close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 968) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // GSAP entrance animation for Navbar elements on page load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.8 } })

      tl.fromTo(logoRef.current, 
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1 }
      )
      .fromTo(pillRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=0.6'
      )
    }, navRef)

    return () => ctx.revert()
  }, [location])

  // GSAP animation for mobile menu overlay transition
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable scrolling when menu is open
      document.body.style.overflow = 'hidden'

      gsap.to(overlayRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power4.out'
      })

      if (overlayLinksRef.current) {
        gsap.fromTo(overlayLinksRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
        )
      }
    } else {
      document.body.style.overflow = ''
      
      gsap.to(overlayRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut'
      })
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav ref={navRef} className={`navbar ${isScrolled ? 'scrolled' : ''} ${isNavHidden ? 'nav-hidden' : ''}`}>
        <div className="navbar-container">
          {/* Floating Pill Navigation Container */}
          <div ref={pillRef} className="navbar-pill">
            <ul className="navbar-pill-links">
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
              <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Me</Link></li>
              {/* <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link></li> */}
              <li><Link to="/work" className={location.pathname === '/work' ? 'active' : ''}>Works</Link></li>
              <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
            </ul>

            <div className="navbar-contact-wrap">
              <Button variant="primary" size="sm" to="/contact">
                Contact
              </Button>
            </div>

            <button
              className={`navbar-hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Navigation Overlay */}
      <div ref={overlayRef} className="mobile-nav-overlay" style={{ transform: 'translateY(-100%)', opacity: 0 }}>
        <div className="mobile-overlay-container">
          <ul ref={overlayLinksRef} className="mobile-overlay-links">
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About Me
              </Link>
            </li>
            {/* <li>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
                Blog
              </Link>
            </li> */}
            <li>
              <Link to="/work" onClick={() => setIsMobileMenuOpen(false)}>
                Works
              </Link>
            </li>
            {/* <li>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>
                Services
              </Link>
            </li> */}
            <li>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <a href={resumePDF} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                Resume
              </a>
            </li>
            <li className="mobile-overlay-socials">
              <a href="https://www.linkedin.com/in/akash-gangurde-0794aa258" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <span className="social-sep">/</span>
              <a href="mailto:akash.gangurde.ux@gmail.com">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
