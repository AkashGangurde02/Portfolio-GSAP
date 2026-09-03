import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StickyScrollSection.css'

gsap.registerPlugin(ScrollTrigger)

const PHRASES = [
  'before,',
  'during,',
  'while waiting,',
  'when things go wrong,',
  'after',
]

const StickyScrollSection = () => {
  const containerRef = useRef(null)
  const listRef      = useRef(null)
  const stageRef     = useRef(null)
  const itemRefs     = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const list      = listRef.current
    const stage     = stageRef.current
    if (!container || !list || !stage) return

    const els = itemRefs.current.filter(Boolean)
    const n   = els.length
    if (n === 0) return

    const mm = gsap.matchMedia()

    // ── DESKTOP & TABLET (≥ 768px) ──
    mm.add('(min-width: 768px)', () => {
      const itemHeight  = 80
      const stageHeight = 240
      const initialY    = stageHeight / 2 - itemHeight / 2 // 80px (centers item 0)
      const finalY      = initialY - (n - 1) * itemHeight   // -240px (centers item 4)

      // Set initial positions & styles
      gsap.set(list, { y: initialY })
      els.forEach((el, i) => {
        const d = Math.abs(i - 0)
        gsap.set(el, {
          opacity: d === 0 ? 1 : d === 1 ? 0.35 : 0.06,
          scale  : d === 0 ? 1 : d === 1 ? 0.78 : 0.6,
          color  : d === 0 ? '#1B1B1A' : '#8E8E93',
          filter : d === 0 ? 'blur(0px)' : d === 1 ? 'blur(0.5px)' : 'blur(1.5px)',
          transformOrigin: 'left center',
        })
      })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      // Animate vertical wheel movement
      tl.to(list, { y: finalY, duration: n - 1 }, 0)

      // Keyframe each item's focus/unfocus states across timeline
      for (let step = 1; step <= n - 1; step++) {
        for (let i = 0; i < n; i++) {
          const d = Math.abs(i - step)
          const targetProps = {
            opacity : d === 0 ? 1 : d === 1 ? 0.35 : d === 2 ? 0.06 : 0,
            scale   : d === 0 ? 1 : d === 1 ? 0.78 : 0.6,
            color   : d === 0 ? '#1B1B1A' : '#8E8E93',
            filter  : d === 0 ? 'blur(0px)' : d === 1 ? 'blur(0.5px)' : 'blur(1.5px)',
            duration: 1,
            ease    : 'none',
          }
          tl.to(elForIndex(els, i), targetProps, step - 1)
        }
      }

      const trigger = ScrollTrigger.create({
        trigger             : container,
        start               : 'top top',
        end                 : '+=300%',
        pin                 : true,
        pinSpacing          : true,
        scrub               : 0.8,
        animation           : tl,
        invalidateOnRefresh : true,
      })

      return () => {
        trigger.kill()
        tl.kill()
      }
    })

    // ── MOBILE (< 768px) ──
    mm.add('(max-width: 767px)', () => {
      const itemHeight  = 56
      const stageHeight = 168
      const initialY    = stageHeight / 2 - itemHeight / 2
      const finalY      = initialY - (n - 1) * itemHeight

      gsap.set(list, { y: initialY })
      els.forEach((el, i) => {
        const d = Math.abs(i - 0)
        gsap.set(el, {
          opacity: d === 0 ? 1 : d === 1 ? 0.35 : 0.06,
          scale  : d === 0 ? 1 : d === 1 ? 0.8 : 0.65,
          color  : d === 0 ? '#1B1B1A' : '#8E8E93',
          filter : d === 0 ? 'blur(0px)' : 'blur(1px)',
          transformOrigin: 'left center',
        })
      })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })
      tl.to(list, { y: finalY, duration: n - 1 }, 0)

      for (let step = 1; step <= n - 1; step++) {
        for (let i = 0; i < n; i++) {
          const d = Math.abs(i - step)
          tl.to(
            elForIndex(els, i),
            {
              opacity : d === 0 ? 1 : d === 1 ? 0.35 : d === 2 ? 0.06 : 0,
              scale   : d === 0 ? 1 : d === 1 ? 0.8 : 0.65,
              color   : d === 0 ? '#1B1B1A' : '#8E8E93',
              filter  : d === 0 ? 'blur(0px)' : 'blur(1px)',
              duration: 1,
              ease    : 'none',
            },
            step - 1
          )
        }
      }

      const trigger = ScrollTrigger.create({
        trigger             : container,
        start               : 'top top',
        end                 : '+=220%',
        pin                 : true,
        pinSpacing          : true,
        scrub               : 0.8,
        animation           : tl,
        invalidateOnRefresh : true,
      })

      return () => {
        trigger.kill()
        tl.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="sss-section" aria-label="Design philosophy">
      <div className="sss-container" ref={containerRef}>
        
        {/* ── TOP CENTER SCROLL HINT ── */}
        <div className="sss-top-scroll-hint">
          <div className="sss-top-hint-icon" aria-hidden="true">
            <svg width="22" height="32" viewBox="0 0 24 36" fill="none">
              <rect x="4" y="2" width="16" height="24" rx="8" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="7" x2="12" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="9" y1="17" x2="15" y2="17" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9" y1="19.5" x2="15" y2="19.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="12,34 6,27 18,27" fill="currentColor" />
            </svg>
          </div>
          <span className="sss-top-hint-text">SCROLL TO EXPLORE</span>
        </div>

        <div className="sss-layout">

          {/* ── LEFT: FIXED STICKY STATEMENT ── */}
          <div className="sss-left">
            <h2 className="sss-statement">
              We Should design for what users do —
            </h2>
          </div>

          {/* ── RIGHT: ROTARY WHEEL SELECTOR ── */}
          <div className="sss-right" aria-live="polite">
            <div className="sss-wheel-stage" ref={stageRef}>
              <div className="sss-wheel-list" ref={listRef}>
                {PHRASES.map((phrase, i) => (
                  <div
                    key={phrase}
                    ref={(el) => (itemRefs.current[i] = el)}
                    className="sss-wheel-item"
                  >
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// Helper to safely reference element in timeline
function elForIndex(array, index) {
  return array[index] || {}
}

export default StickyScrollSection
