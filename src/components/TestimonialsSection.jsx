import { useState } from 'react'
import './TestimonialsSection.css'

const testimonials = [
  {
    id: 1,
    quote: "Really loved the Rinivish logo design. Great work!",
    detail: "The colors and font choices align well with our brand identity. The logo feels modern and professional.",
    author: 'Amrin',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    quote: "Exceptional UX thinking — every screen felt intentional and user-first.",
    detail: "The wireframes were clear, the flows were smooth, and the final designs exceeded our expectations.",
    author: 'Rohan',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 3,
    quote: "Delivered on time with incredible attention to detail.",
    detail: "From research to final handoff, the process was collaborative, transparent, and results-driven.",
    author: 'Priya',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
]

const StarRating = ({ count }) => (
  <div className="tf-stars" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="14" height="14" viewBox="0 0 24 24"
        fill={i < count ? '#000000' : '#e0e0e0'}
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0)
  const total = testimonials.length
  const t = testimonials[idx]

  const prev = () => setIdx((idx - 1 + total) % total)
  const next = () => setIdx((idx + 1) % total)

  return (
    <section className="tf-section" aria-label="Client Testimonials">
      <div className="tf-card">

        {/* ── Left Column ── */}
        <div className="tf-left">
          <div className="tf-left-top">
            <span className="tf-label">
              <span className="tf-label-dot" aria-hidden="true" />
              My Clients' Stories
            </span>
            <p className="tf-desc">
              Here's what people have to say about working together. Real moments, real experiences, real feedback.
            </p>
          </div>

          {/* Nav Arrows */}
          <div className="tf-nav" role="group" aria-label="Testimonial navigation">
            <button
              className="tf-nav-btn"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button
              className="tf-nav-btn"
              onClick={next}
              aria-label="Next testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="tf-divider" aria-hidden="true" />

        {/* ── Right Column ── */}
        <div className="tf-right">
          {/* Opening quote mark */}
          <div className="tf-quote-mark" aria-hidden="true">"</div>

          <blockquote className="tf-quote">{t.quote}</blockquote>

          <p className="tf-detail">{t.detail}</p>

          {/* Author row */}
          <div className="tf-author-row">
            <img
              src={t.avatar}
              alt={t.author}
              className="tf-avatar"
            />
            <div className="tf-author-info">
              <StarRating count={t.rating} />
              <span className="tf-author-name">{t.author}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
