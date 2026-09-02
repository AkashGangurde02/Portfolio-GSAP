import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import workImage from '../images/profile/aboutme-work.jpg'
import selfieImage from '../images/profile/aboutme-selfie.jpg'
import './AboutMeSection.css'

gsap.registerPlugin(ScrollTrigger)

const AboutMeSection = () => {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const card1Ref = useRef(null)
  const card3Ref = useRef(null)
  const headingRef = useRef(null)
  const ctaRef = useRef(null)
  const descRef = useRef(null)

  const playedRef = useRef(false)

  useEffect(() => {
    let splitDesc = null

    const ctx = gsap.context(() => {
      // ── LAYER 1: Background Parallax Lag ──
      gsap.to(bgRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Watermark split character entrance reveal
      gsap.from('.aboutme-watermark-char', {
        scrollTrigger: {
          trigger: '.aboutme-watermark',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: '100%',
        opacity: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Watermark sticky pinning
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: '.aboutme-watermark',
        start: 'top top',
        end: 'bottom 40%',
        pinSpacing: false,
      })

      // ── LAYER 2: Foreground Content Layer Parallax ──
      gsap.fromTo('.aboutme-content',
        { y: 60 },
        {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // Card 1 Parallax (Left-center, indented)
      gsap.fromTo(card1Ref.current,
        { y: 40 },
        {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // Card 3 Parallax (Right-center, lower offset)
      gsap.fromTo(card3Ref.current,
        { y: 50 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // ── SEQUENCED ENTRANCE: IMAGES FIRST -> HEADING & CTA RIGHT AFTER ──
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      })

      // Step 1: Images reveal fully first
      entranceTl.from([card1Ref.current, card3Ref.current], {
        opacity: 0,
        scale: 0.92,
        y: 40,
        duration: 0.9,
        stagger: 0.16,
        ease: 'power3.out',
      })

      // Step 2: Heading & CTA button trigger right after images finish
      .from(headingRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.2')
      .from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.3')

      // ── WORD-BY-WORD SCROLL HIGHLIGHT ANIMATION ──
      if (descRef.current) {
        splitDesc = new SplitType(descRef.current, { types: 'words' })
        if (splitDesc.words && splitDesc.words.length > 0) {
          if (playedRef.current) {
            // Already played in this page session — preserve completed dark state
            gsap.set(splitDesc.words, { color: '#111111' })
          } else {
            // Set initial light grey muted color on every word
            gsap.set(splitDesc.words, { color: 'rgba(17, 17, 17, 0.22)' })

            let maxProgress = 0

            // One-way word darkening on scroll (runs once, never reverses)
            ScrollTrigger.create({
              trigger: descRef.current,
              start: 'top 82%',
              end: 'bottom 42%',
              onUpdate: (self) => {
                if (playedRef.current) return

                if (self.progress > maxProgress) {
                  maxProgress = self.progress
                  const total = splitDesc.words.length
                  const countToHighlight = Math.floor(maxProgress * total)

                  // Darken words up to the max progress reached
                  for (let i = 0; i < total; i++) {
                    if (i <= countToHighlight) {
                      gsap.set(splitDesc.words[i], { color: '#111111' })
                    }
                  }

                  if (maxProgress >= 0.98) {
                    playedRef.current = true
                    gsap.set(splitDesc.words, { color: '#111111' })
                  }
                }
              },
              onLeave: () => {
                playedRef.current = true
                gsap.set(splitDesc.words, { color: '#111111' })
              },
            })
          }
        }
      }

    }, sectionRef)

    return () => {
      if (splitDesc && splitDesc.revert) splitDesc.revert()
      ctx.revert()
    }
  }, [])

  const watermarkText = "ABOUT ME"

  return (
    <section ref={sectionRef} className="aboutme-section" id="about">
      {/* ── LAYER 1: Background & Watermark Backdrop ── */}
      <div ref={bgRef} className="aboutme-bg" aria-hidden="true" />
      <div className="aboutme-watermark" aria-hidden="true">
        {watermarkText.split('').map((char, index) => (
          <span key={index} className="aboutme-watermark-char">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* ── LAYER 2: Foreground Content Layer ── */}
      <div className="aboutme-content">
        <div className="aboutme-inner">
          {/* Scattered Editorial Images Stage */}
          <div className="aboutme-scatter-stage">
            {/* Card 1: Work (Indented Left) */}
            <div ref={card1Ref} className="aboutme-card aboutme-card-1">
              <img src={workImage} alt="Akash Gangurde working at desk" />
            </div>

            {/* Card 3: Mirror Selfie (Indented Right, Lower) */}
            <div ref={card3Ref} className="aboutme-card aboutme-card-3">
              <img src={selfieImage} alt="Akash Gangurde office selfie" />
            </div>
          </div>

          {/* Text Content */}
          <div className="aboutme-text-block">
            <h2 ref={headingRef} className="aboutme-heading">
              It Started With Curiosity.
            </h2>

            <div className="aboutme-desc-row">
              <p ref={descRef} className="aboutme-description">
                I started in Computer Science, but instead of asking how software works,
                I found myself asking why users struggle, what they expect, and how design
                can make technology feel effortless.
              </p>

              <div ref={ctaRef} className="aboutme-cta-wrap">
                <Link to="/about" className="aboutme-cta-btn">
                  <span className="cta-text">KNOW MORE</span>
                  <span className="cta-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMeSection
