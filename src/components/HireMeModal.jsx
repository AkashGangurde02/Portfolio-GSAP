import { useState, useRef, useEffect } from 'react'
import Button from './ui/Button'
import './HireMeModal.css'

const HireMeModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: `Hi Akash,

I came across your portfolio and would like to discuss an opportunity for you to join our team as a [Job Role].

We are looking for someone who can help with [Short description of responsibility].

Looking forward to connecting.

Best,
[Name]`
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const formRef = useRef(null)

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
    }, [isOpen])

    const validate = () => {
        const newErrors = {}
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setIsSubmitting(true)

        try {
            const formBody = new FormData()
            Object.keys(formData).forEach(key => formBody.append(key, formData[key]))
            formBody.append('subject', `New Hire Inquiry from ${formData.fullName}`) // Add subject for Formspree

            const response = await fetch('https://formspree.io/f/mwvveqgb', {
                method: 'POST',
                body: formBody,
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.ok) {
                setIsSuccess(true)
            } else {
                throw new Error('Form submission failed')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            alert('Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="hire-me-modal-overlay" onClick={onClose}>
            <div className="hire-me-modal-content" onClick={e => e.stopPropagation()}>
                <button className="hire-me-close-btn" onClick={onClose} aria-label="Close">
                    &times;
                </button>

                {!isSuccess ? (
                    <>
                        <h2 className="hire-me-modal-title">Hire Me</h2>
                        <form className="hire-me-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && <span className="error-text" style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.fullName}</span>}
                            </div>



                            <div className="form-group">
                                <label htmlFor="email">Work Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter work email"
                                />
                                {errors.email && <span className="error-text" style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="8"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.message && <span className="error-text" style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
                            </div>

                            <Button variant="primary" size="lg" type="submit" isLoading={isSubmitting} showArrow arrowType="right">
                                Send Message
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="success-message">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                        <h3>Thank you for reaching out!</h3>
                        <p>I’ll get back to you within 24 hours.</p>
                        <Button variant="secondary" size="md" onClick={onClose} style={{ marginTop: '2rem' }}>
                            Close
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HireMeModal
