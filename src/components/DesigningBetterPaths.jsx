import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import './DesigningBetterPaths.css'

gsap.registerPlugin(ScrollTrigger)

export default function DesigningBetterPaths() {
  const sectionRef = useRef(null)
  const leftLabelRef = useRef(null)
  const rightTextRef = useRef(null)

  const playedRef = useRef(false)

  useEffect(() => {
    const splits = []

    const ctx = gsap.context(() => {
      // Left Label entrance animation
      gsap.from(leftLabelRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 25,
        duration: 0.9,
        ease: 'power3.out',
      })

      // SplitType word-by-word scroll reveal animation from grey to white
      const lineElems = rightTextRef.current.querySelectorAll('.dbp-quote-line')
      let allWords = []

      lineElems.forEach((line) => {
        const split = new SplitType(line, { types: 'words' })
        splits.push(split)
        if (split.words) {
          allWords = [...allWords, ...split.words]
        }
      })

      if (allWords.length > 0) {
        if (playedRef.current) {
          // Already played in this session — keep all words permanently white
          gsap.set(allWords, { color: '#ffffff' })
        } else {
          // Initial muted state
          gsap.set(allWords, { color: 'rgba(255, 255, 255, 0.22)' })

          let maxProgress = 0

          // One-way word-by-word reveal to white (never reverses on upward scroll)
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 52%',
            onUpdate: (self) => {
              if (playedRef.current) return

              if (self.progress > maxProgress) {
                maxProgress = self.progress
                const total = allWords.length
                const countToHighlight = Math.floor(maxProgress * total)

                for (let i = 0; i < total; i++) {
                  if (i <= countToHighlight) {
                    gsap.set(allWords[i], { color: '#ffffff' })
                  }
                }

                if (maxProgress >= 0.98) {
                  playedRef.current = true
                  gsap.set(allWords, { color: '#ffffff' })
                }
              }
            },
            onLeave: () => {
              playedRef.current = true
              gsap.set(allWords, { color: '#ffffff' })
            },
          })
        }
      }
    }, sectionRef)

    return () => {
      splits.forEach((s) => s.revert && s.revert())
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="dbp-section" aria-label="Designing Better Paths Quote">
      <div className="dbp-container">
        {/* Left Label */}
        <div ref={leftLabelRef} className="dbp-left">
          <span className="dbp-label">Designing Better Paths</span>
        </div>

        {/* Right Quote Heading */}
        <div ref={rightTextRef} className="dbp-right">
          <h2 className="dbp-quote">
            <span className="dbp-quote-line dbp-quote-line-1">Users focus on walking,</span>
            <span className="dbp-quote-line dbp-quote-line-2">I focus on designing better</span>
            <span className="dbp-quote-line dbp-quote-line-3">paths.</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
