import { useState, useRef } from 'react'
import Button from './ui/Button'
import './ContactForm.css'

const ContactForm = () => {
  const formRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatusMessage({ type: '', message: '' })

    try {
      const formData = new FormData(formRef.current)

      const response = await fetch('https://formspree.io/f/mwvveqgb', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setStatusMessage({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        })
        formRef.current.reset()
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.'
      })
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Let's Talk</h1>
          <p className="contact-subtitle">
            Have a project in mind or just want to chat? I'd love to hear from you.
            Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8L10.89 13.26C11.23 13.47 11.61 13.59 12 13.59C12.39 13.59 12.77 13.47 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Email</h3>
              <p>akash.s.gangurde02@gmail.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <h3>WhatsApp</h3>
              <p>+91 9067935179</p>
            </div>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            {statusMessage.message && (
              <div className={`status-message ${statusMessage.type}`}>
                {statusMessage.message}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <h3 className="form-label">Name *</h3>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <h3 className="form-label">Email *</h3>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <h3 className="form-label">Subject</h3>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <h3 className="form-label">Message</h3>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell me about your project or inquiry..."
                disabled={isLoading}
              ></textarea>
            </div>

            <Button variant="primary" size="lg" type="submit" isLoading={isLoading} showArrow arrowType="right">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
