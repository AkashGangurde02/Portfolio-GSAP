import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ServicesPopup.css'

gsap.registerPlugin(ScrollTrigger)

// Module-level in-memory state:
// Resets automatically on full page refresh; persists across client-side route transitions.
let sessionDismissed = false

export default function ServicesPopup() {
  const popupRef = useRef(null)
  const triggerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const popup = popupRef.current
    if (!popup || sessionDismissed) return

    // Identify the Hero section boundary (desktop or mobile)
    const heroEl = document.querySelector('.hero-section-standalone') || document.querySelector('.mobile-hero')
    if (!heroEl) return

    // Initial hidden state
    gsap.set(popup, { opacity: 0, y: 30, scale: 0.96, pointerEvents: 'none' })

    const showPopup = () => {
      if (sessionDismissed) return
      gsap.to(popup, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        onStart: () => {
          popup.style.pointerEvents = 'auto'
        },
      })
    }

    const hidePopup = () => {
      if (sessionDismissed) return
      gsap.to(popup, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          popup.style.pointerEvents = 'none'
        },
      })
    }

    // Trigger popup when bottom of Hero section clears top of viewport
    const st = ScrollTrigger.create({
      trigger: heroEl,
      start: 'bottom top',
      onEnter: showPopup,
      onLeaveBack: hidePopup,
    })

    triggerRef.current = st

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill()
        triggerRef.current = null
      }
    }
  }, [])

  const dismissPopup = (onComplete) => {
    sessionDismissed = true
    if (triggerRef.current) {
      triggerRef.current.kill()
      triggerRef.current = null
    }

    const popup = popupRef.current
    if (popup) {
      gsap.to(popup, {
        opacity: 0,
        y: 20,
        scale: 0.96,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          popup.style.pointerEvents = 'none'
          if (onComplete) onComplete()
        },
      })
    } else if (onComplete) {
      onComplete()
    }
  }

  const handleClose = (e) => {
    e.stopPropagation()
    dismissPopup()
  }

  const handleCardClick = () => {
    dismissPopup(() => {
      navigate('/services')
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick()
    }
  }

  return (
    <div
      ref={popupRef}
      className="services-popup"
      role="button"
      tabIndex={0}
      aria-label="Explore services"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      <button
        className="services-popup__close"
        onClick={handleClose}
        aria-label="Dismiss"
      >
        ×
      </button>
      <h3 className="services-popup__title">Need a UX/UI Designer?</h3>
      <p className="services-popup__body">
        UX audits, product UI, and thoughtful digital experiences.
      </p>
      <span className="services-popup__cta">
        Explore services <span className="services-popup__arrow">↗</span>
      </span>
    </div>
  )
}
