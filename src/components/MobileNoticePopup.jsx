import React, { useState, useEffect } from 'react'
import './MobileNoticePopup.css'

export default function MobileNoticePopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already dismissed the notice in this session
    const isDismissed = sessionStorage.getItem('dismissedMobileDesktopNotice')
    if (!isDismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem('dismissedMobileDesktopNotice', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="mobile-notice-popup" role="dialog" aria-label="Desktop Experience Notice">
      <div className="mobile-notice-content">
        <button
          className="mobile-notice-close"
          onClick={handleDismiss}
          aria-label="Close notification"
        >
          ✕
        </button>

        <div className="mobile-notice-body">
          <div className="mobile-notice-header">
            <span className="mobile-notice-wave">👋</span>
            <span className="mobile-notice-title">Desktop Best Experience</span>
          </div>
          <p className="mobile-notice-text">
            View on desktop Device for the best experience.
          </p>
        </div>

        <div className="mobile-notice-actions">
          <button className="mobile-notice-btn" onClick={handleDismiss}>
            Continue on Mobile
          </button>
        </div>
      </div>
    </div>
  )
}
