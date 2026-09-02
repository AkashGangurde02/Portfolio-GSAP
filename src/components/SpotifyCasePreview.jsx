import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SpotifyCasePreview.css'

gsap.registerPlugin(ScrollTrigger)

export default function SpotifyCasePreview() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const leftRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const isMobile = window.innerWidth <= 768

    // Set initial card state before GSAP context so it applies on both paths
    const card1 = cardsRef.current.querySelector('.scp-card-1')
    const card2 = cardsRef.current.querySelector('.scp-card-2')
    const card3 = cardsRef.current.querySelector('.scp-card-3')
    gsap.set([card1, card2, card3], { y: 60, opacity: 0 })

    const ctx = gsap.context(() => {

      // ── SCROLL TRIGGER A: Left column entrance (always) ──────────────────
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      })

      if (!isMobile) {

        // ── Timeline: overlapping sequential stagger ──────────────────────────
        // Cards start 0.5s apart (via '-=0.7' on a 1.2s tween) but overlap,
        // giving a premium editorial stagger feel. Total duration ≈ 2.2s.
        const tl = gsap.timeline({ paused: true })
          .to(card1, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' })
          .to(card2, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.7')
          .to(card3, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.7')

        // ── One-way inertia scrub ─────────────────────────────────────────────
        // maxProgress ensures the timeline ONLY advances, never reverses.
        // gsap.to(tl, { progress, duration: 1.2 }) is the inertia layer:
        //   each scroll tick pushes maxProgress ahead,
        //   GSAP then smoothly catches the timeline up over 1.2s with
        //   power3.out deceleration — giving the "settles into place" feel.
        let maxProgress = 0

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=220vh',
          // Pin the INNER wrapper, not the <section> React manages.
          // If we pin the <section> itself, GSAP inserts a pin-spacer above it
          // which breaks React's removeChild on unmount → white screen on navigate.
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > maxProgress) {
              maxProgress = self.progress
              gsap.to(tl, {
                progress: maxProgress,
                duration: 1.2,
                ease: 'power3.out',
                overwrite: true,
              })
            }
          },
          onLeave: (self) => {
            // All cards are now visible. Kill the trigger so the section
            // does not re-pin when the user scrolls back up.
            gsap.set([card1, card2, card3], { y: 0, opacity: 1 })
            self.kill()
          },
        })

      } else {

        // ── MOBILE: Simple staggered entrance, no pin ─────────────────────────
        ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to([card1, card2, card3], {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            })
          },
        })

      }

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="spotify-case-preview"
      className="scp-editorial-section"
      aria-label="Spotify Case Study Preview"
    >
      {/* Inner wrapper — GSAP pins this element, not the outer <section> */}
      <div ref={pinRef} className="scp-pin-inner">
        <div className="scp-container">
        {/* ── LEFT COLUMN ── */}
        <div ref={leftRef} className="scp-left-col">
          <div className="scp-label">SPOTIFY CASE STUDY</div>

          <h2 className="scp-main-headline">
            Spotify Desktop Mini<br />
            Player Redesign
          </h2>

          <div className="scp-cta-wrapper">
            <Link to="/case-study/spotify" className="scp-orange-btn">
              <span className="cta-text">View Full case study</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>

          <p className="scp-left-description">
            Whether listening while coding, designing, or working, accessing live lyrics should never break your flow. <strong>I diagnosed the friction, researched user habits, and built a progressive disclosure solution.</strong>
          </p>
        </div>

        {/* ── RIGHT COLUMN: PROCESS CARDS WITH CORNER CROSSHAIRS ── */}
        <div ref={cardsRef} className="scp-right-col">

          {/* CARD 001: THE PROBLEM */}
          <div className="scp-process-card scp-card-1">
            {/* Corner Crosshairs */}
            <span className="scp-crosshair ch-tl">+</span>
            <span className="scp-crosshair ch-tr">+</span>
            <span className="scp-crosshair ch-bl">+</span>
            <span className="scp-crosshair ch-br">+</span>

            <div className="scp-card-header">
              <span className="scp-card-tag">THE PROBLEM</span>
            </div>

            <h3 className="scp-card-title">Lyrics break the flow</h3>

            <p className="scp-card-body">
              Users had to leave the Mini Player to access lyrics, creating unnecessary context switching.
            </p>
          </div>

          {/* CARD 002: THE RESEARCH */}
          <div className="scp-process-card scp-card-2">
            {/* Corner Crosshairs */}
            <span className="scp-crosshair ch-tl">+</span>
            <span className="scp-crosshair ch-tr">+</span>
            <span className="scp-crosshair ch-bl">+</span>
            <span className="scp-crosshair ch-br">+</span>

            <div className="scp-card-header">
              <span className="scp-card-tag">THE RESEARCH</span>
            </div>

            <h3 className="scp-card-title">Users wanted lyrics in context</h3>

            <p className="scp-card-body">
              Community discussions revealed demand for quick lyric access without opening new windows.
            </p>
          </div>

          {/* CARD 003: THE SOLUTION */}
          <div className="scp-process-card scp-card-3">
            {/* Corner Crosshairs */}
            <span className="scp-crosshair ch-tl">+</span>
            <span className="scp-crosshair ch-tr">+</span>
            <span className="scp-crosshair ch-bl">+</span>
            <span className="scp-crosshair ch-br">+</span>

            <div className="scp-card-header">
              <span className="scp-card-tag">THE SOLUTION</span>
            </div>

            <h3 className="scp-card-title">Lyrics without leaving the player</h3>

            <p className="scp-card-body">
              A hover-based lyrics experience keeps users in context while they listen.
            </p>
          </div>

        </div>{/* end scp-right-col */}
        </div>{/* end scp-container */}
      </div>{/* end scp-pin-inner */}
    </section>
  )
}

