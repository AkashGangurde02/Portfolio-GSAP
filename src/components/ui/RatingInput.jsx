import React, { useState } from 'react'
import { Star } from 'lucide-react'
import './RatingInput.css'

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
}

export default function RatingInput({ value = 0, onChange, error, disabled = false }) {
  const [hoverValue, setHoverValue] = useState(0)

  const activeRating = hoverValue || value

  const handleKeyDown = (e, rating) => {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onChange(rating)
    }
  }

  return (
    <div className="rating-input-container">
      <div 
        className={`rating-stars-wrapper ${error ? 'rating-input--error' : ''}`}
        role="radiogroup"
        aria-label="Rating out of 5 stars"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= activeRating
          return (
            <button
              key={star}
              type="button"
              disabled={disabled}
              className={`rating-star-btn ${isFilled ? 'rating-star-btn--filled' : ''}`}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoverValue(star)}
              onMouseLeave={() => setHoverValue(0)}
              onKeyDown={(e) => handleKeyDown(e, star)}
              aria-label={`${star} Star${star > 1 ? 's' : ''} (${RATING_LABELS[star]})`}
              aria-checked={value === star}
              role="radio"
            >
              <Star 
                size={26} 
                className={`rating-star-icon ${isFilled ? 'fill-current' : ''}`} 
              />
            </button>
          )
        })}
      </div>

      <div className="rating-meta">
        <span className="rating-text">
          {activeRating > 0 ? `${activeRating} of 5 — ${RATING_LABELS[activeRating]}` : 'Select a rating'}
        </span>
        {error && <span className="rating-error-msg">{error}</span>}
      </div>
    </div>
  )
}
