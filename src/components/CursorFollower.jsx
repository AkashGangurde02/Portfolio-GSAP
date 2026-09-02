import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './CursorFollower.css'

const CursorFollower = () => {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const dotPos = useRef({ x: 0, y: 0 })
    const ringPos = useRef({ x: 0, y: 0 })
    const mousePos = useRef({ x: 0, y: 0 })
    const [isOnDark, setIsOnDark] = useState(false)

    // Scale state for the ring
    const ringScaleRef = useRef(1)
    const isTextRef = useRef(false)
    const rafIdRef = useRef(null)

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    useEffect(() => {
        if (isTouchDevice) return

        const updateCursorPosition = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }

            const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY)
            if (elementUnderCursor) {
                // Check for dark background
                const bgColor = window.getComputedStyle(elementUnderCursor).backgroundColor
                const isFooter = elementUnderCursor.closest('.footer')
                const isNavbar = elementUnderCursor.closest('.navbar')
                const isCtaBtn = elementUnderCursor.closest('.hero-cta-btn') || elementUnderCursor.closest('.work-cta-button')
                const isWorkCta = elementUnderCursor.closest('.work-cta-content')

                if (isFooter || isCtaBtn || isWorkCta || (bgColor && isDarkColor(bgColor))) {
                    setIsOnDark(true)
                } else {
                    setIsOnDark(false)
                }

                // Check if hovering over text
                const textTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'LI', 'BUTTON', 'LABEL', 'INPUT', 'TEXTAREA', 'STRONG', 'EM', 'B', 'I']
                const isTextTag = textTags.includes(elementUnderCursor.tagName)
                const isPointer = window.getComputedStyle(elementUnderCursor).cursor === 'pointer'

                isTextRef.current = isTextTag || isPointer
            }
        }

        const isDarkColor = (color) => {
            const rgb = color.match(/\d+/g)
            if (!rgb) return false
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
            return brightness < 128
        }

        const animateCursor = () => {
            // 1. Move the Dot (Fast / Instant)
            dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.2
            dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.2

            // 2. Move the Ring (Slow / Fluid)
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1

            // 3. Scale Animation for Ring
            const targetScale = isTextRef.current ? 1.5 : 1
            ringScaleRef.current += (targetScale - ringScaleRef.current) * 0.1

            // Apply transforms
            if (dotRef.current) {
                gsap.set(dotRef.current, {
                    x: dotPos.current.x,
                    y: dotPos.current.y
                })
            }
            if (ringRef.current) {
                gsap.set(ringRef.current, {
                    x: ringPos.current.x,
                    y: ringPos.current.y,
                    scale: ringScaleRef.current
                })
            }

            rafIdRef.current = requestAnimationFrame(animateCursor)
        }

        window.addEventListener('mousemove', updateCursorPosition)
        rafIdRef.current = requestAnimationFrame(animateCursor)

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition)
            cancelAnimationFrame(rafIdRef.current)
        }
    }, [isTouchDevice])

    if (isTouchDevice) return null

    return (
        <>
            <div
                ref={dotRef}
                className={`cursor-dot ${isOnDark ? 'cursor-on-dark' : ''}`}
            />
            <div
                ref={ringRef}
                className={`cursor-ring ${isOnDark ? 'cursor-on-dark' : ''}`}
            />
        </>
    )
}

export default CursorFollower
