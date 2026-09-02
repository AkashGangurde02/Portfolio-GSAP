import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useLenis — initialises a Lenis smooth-scroll instance for the whole page.
 * The instance is synchronized with GSAP ScrollTrigger and ticker updates.
 * 
 * Configuration:
 * - lerp: 0.08 → lower = smoother, higher = snappier (default Lenis is 0.1)
 * - syncTouch: false → preserves native momentum scrolling on touch devices
 * - smoothWheel: true → Lenis takes over wheel events on desktop
 */
export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis
    window.lenis = lenis

    // Synchronize Lenis scrolling updates with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to control the RAF loop for perfect sync
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      window.lenis = null
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
