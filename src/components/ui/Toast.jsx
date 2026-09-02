import React, { useEffect } from 'react'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'
import './Toast.css'

export default function Toast({ message, type = 'success', onClose, duration = 5000 }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [message, duration, onClose])

  if (!message) return null

  const isSuccess = type === 'success'

  return (
    <div className={`toast-notification toast-notification--${type}`} role="alert">
      <div className="toast-icon">
        {isSuccess ? (
          <CheckCircle2 size={20} className="toast-icon-svg text-success" />
        ) : (
          <AlertCircle size={20} className="toast-icon-svg text-error" />
        )}
      </div>

      <div className="toast-content">
        <p className="toast-message">{message}</p>
      </div>

      <button
        type="button"
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}
