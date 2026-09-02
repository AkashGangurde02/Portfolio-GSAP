/**
 * gsap.js — Shared GSAP utilities for the portfolio.
 * 
 * Import pattern:
 *   import { revealLines, revealOnScroll, fadeIn } from '../utils/gsap'
 * 
 * All utilities return the GSAP tween/timeline so callers can kill() them
 * inside a cleanup function if needed.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

// ── MOTION LANGUAGE TOKENS ────────────────────────────────────────────────
export const EASE_PRIMARY  = 'power3.out'   // Snappy, editorial — most common
export const EASE_HERO     = 'power4.out'   // Hero-level entrances
export const EASE_SCRUB    = 'power2.inOut' // Scroll-linked transitions
export const EASE_SMOOTH   = 'power2.out'   // UI tweens, cards

export const DUR_TEXT = 0.9   // Line reveals
export const DUR_UI   = 0.45  // Cards, fades
export const STAGGER  = 0.08  // Default stagger between elements

// ── LINE SPLITTING ────────────────────────────────────────────────────────

/**
 * Splits text into lines with SplitType and reveals each line with a
 * yPercent: 100 → 0 animation (masked overflow effect).
 *
 * @param {string|Element} selector  - CSS selector or DOM element to split
 * @param {Element} triggerEl        - ScrollTrigger trigger element
 * @param {object} options           - Optional overrides
 * @returns {object} - { split, tween } — call split.revert() on cleanup
 */
export function revealLines(selector, triggerEl, options = {}) {
  const split = new SplitType(selector, { types: 'lines' })

  // Wrap each line in an overflow:hidden container so the slide-up is masked
  split.lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  const tween = gsap.fromTo(split.lines,
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: options.duration ?? DUR_TEXT,
      stagger: options.stagger ?? STAGGER,
      ease: options.ease ?? EASE_PRIMARY,
      scrollTrigger: triggerEl ? {
        trigger: triggerEl,
        start: options.start ?? 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      } : undefined,
      delay: options.delay ?? 0,
    }
  )

  return { split, tween }
}

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────

/**
 * Standard scroll reveal: fade + slide up from y offset.
 * Works on single elements or arrays/NodeLists.
 *
 * @param {Element|Element[]|NodeList|string} targets - Element(s) to reveal
 * @param {object} options - Optional overrides
 */
export function revealOnScroll(targets, options = {}) {
  const triggerEl = options.trigger ?? (Array.isArray(targets) ? targets[0] : targets)

  return gsap.fromTo(targets,
    { y: options.y ?? 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration ?? DUR_UI,
      stagger: options.stagger ?? STAGGER,
      ease: options.ease ?? EASE_PRIMARY,
      delay: options.delay ?? 0,
      scrollTrigger: {
        trigger: triggerEl,
        start: options.start ?? 'top 88%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }
  )
}

// ── SIMPLE FADE IN ────────────────────────────────────────────────────────

/**
 * Fade an element in on scroll (opacity only — no y transform).
 */
export function fadeIn(targets, options = {}) {
  const triggerEl = options.trigger ?? (Array.isArray(targets) ? targets[0] : targets)

  return gsap.fromTo(targets,
    { opacity: 0 },
    {
      opacity: 1,
      duration: options.duration ?? DUR_UI,
      ease: options.ease ?? EASE_SMOOTH,
      delay: options.delay ?? 0,
      scrollTrigger: {
        trigger: triggerEl,
        start: options.start ?? 'top 90%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }
  )
}

// ── STAGGER CARD REVEAL ───────────────────────────────────────────────────

/**
 * Staggered card reveal — ideal for grids, stats rows, tool grids.
 */
export function revealCards(selector, triggerEl, options = {}) {
  return gsap.fromTo(selector,
    { y: options.y ?? 30, opacity: 0, scale: options.scale ?? 0.97 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: options.duration ?? 0.6,
      stagger: options.stagger ?? 0.1,
      ease: EASE_PRIMARY,
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }
  )
}

// ── RESIZE UTILITY ────────────────────────────────────────────────────────

/**
 * Re-runs SplitType + ScrollTrigger.refresh() on window resize.
 * Call once and store the returned cleanup in useEffect return.
 *
 * @param {Function} splitFn - Function that runs SplitType + creates tweens
 * @param {number} debounce  - ms debounce delay (default 200)
 */
export function onResizeRefresh(splitFn, debounce = 200) {
  let timer = null
  const handler = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      splitFn()
      ScrollTrigger.refresh()
    }, debounce)
  }
  window.addEventListener('resize', handler)
  return () => {
    clearTimeout(timer)
    window.removeEventListener('resize', handler)
  }
}
