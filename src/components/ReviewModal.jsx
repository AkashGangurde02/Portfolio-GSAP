import React, { useState, useEffect, useRef } from 'react'
import { X, MessageSquareHeart, AlertCircle } from 'lucide-react'
import Button from './ui/Button'
import './ReviewModal.css'

export default function ReviewModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const modalRef = useRef(null)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isSubmitting, onClose])

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }))
    }

    if (submitError) {
      setSubmitError('')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      message: ''
    })
    setErrors({})
    setSubmitError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_ID
        ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
        : 'https://formspree.io/f/mwvveqgb'

      const payload = new FormData()
      payload.append('_subject', `New Portfolio Feedback from ${formData.name}`)
      payload.append('Name', formData.name.trim())
      payload.append('Message', formData.message.trim())
      payload.append('Submission Time', new Date().toLocaleString())

      const response = await fetch(endpoint, {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json'
        }
      })

      if (response.ok) {
        resetForm()
        onClose()
        if (onSuccess) {
          onSuccess('Thank you! Your feedback has been submitted for review.')
        }
      } else {
        throw new Error('Submission failed')
      }
    } catch (err) {
      console.error('Review submission error:', err)
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="review-modal-overlay"
      onClick={() => !isSubmitting && onClose()}
      role="presentation"
    >
      <div
        className="review-modal-content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        {/* Header */}
        <div className="review-modal-header">
          <div className="review-modal-header-text">
            <div className="review-modal-badge">
              <MessageSquareHeart size={16} />
              <span>Share Feedback</span>
            </div>
            <h2 id="review-modal-title" className="review-modal-title">
              Write a Review
            </h2>
            <p className="review-modal-subtitle">
              Your feedback is appreciated! Submissions are reviewed prior to publication.
            </p>
          </div>
          <button
            type="button"
            className="review-modal-close-btn"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close review modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Global Error Alert */}
        {submitError && (
          <div className="review-modal-error-alert" role="alert">
            <AlertCircle size={18} />
            <span>{submitError}</span>
          </div>
        )}

        {/* Form */}
        <form className="review-modal-form" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="review-form-group">
            <label htmlFor="review-name" className="review-form-label">
              Name <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="review-name"
              className={`review-form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Alex Johnson"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={isSubmitting}
            />
            {errors.name && <span className="review-field-error">{errors.name}</span>}
          </div>

          {/* Message */}
          <div className="review-form-group">
            <label htmlFor="review-message" className="review-form-label">
              Message <span className="required-star">*</span>
            </label>
            <textarea
              id="review-message"
              className={`review-form-textarea ${errors.message ? 'input-error' : ''}`}
              rows={5}
              placeholder="Share your experience, collaboration feedback, or thoughts..."
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              disabled={isSubmitting}
            />
            {errors.message && <span className="review-field-error">{errors.message}</span>}
          </div>

          {/* Footer Actions */}
          <div className="review-modal-actions">
            <Button
              variant="tertiary"
              size="md"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              size="md"
              type="submit"
              isLoading={isSubmitting}
              showArrow
              arrowType="right"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
