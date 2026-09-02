import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Button from '../components/ui/Button'
import './ExperienceSomvanshi.css'
import Footer from '../components/Footer'
import chess1Image from '../images/experience/somvanshi/images/Chess_1.jpeg'
import officeSpaceImage from '../images/experience/somvanshi/images/Office_Space.jpeg'
import team2Image from '../images/experience/somvanshi/images/Team_2.jpeg'
import bookGiftImage from '../images/experience/somvanshi/images/Book_gift.jpeg'
import scenic2Image from '../images/experience/somvanshi/images/Scenic_2.jpeg'
import team1Image from '../images/experience/somvanshi/images/Team_1.jpeg'
import workplace1Image from '../images/experience/somvanshi/images/Workplace_1.jpeg'
import workplace3Image from '../images/experience/somvanshi/images/Workplace_3.jpeg'
import team5Image from '../images/experience/somvanshi/images/Team_5.jpeg'
import team3Image from '../images/experience/somvanshi/images/Team_3.jpeg'

const ExperienceSomvanshi = () => {
    const heroRef = useRef(null)
    const contentRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)

    const handleImageClick = (imageSrc, altText) => {
        setSelectedImage({ src: imageSrc, alt: altText })
    }

    const closeModal = () => {
        setSelectedImage(null)
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.from(heroRef.current.children, {
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                delay: 0.3
            })
                .from(contentRef.current.children, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15
                }, '-=0.5')
        })

        return () => ctx.revert()
    }, [])

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && selectedImage) {
                closeModal()
            }
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [selectedImage])

    return (
        <div className="experience-story-page">
            <section className="experience-hero">
                <div className="experience-container">
                    <div ref={heroRef} className="experience-hero-content">
                        <div className="experience-meta">
                            <span className="meta-label">Role Focus:</span>
                            <span className="meta-tags">UX Research • Wireframing • Prototyping • Visual Design</span>
                        </div>

                        <h1 className="experience-hero-title">UX/UI Designer Intern</h1>
                        <p className="experience-hero-subtitle">Somvanshi Technologies • 2025 – Present</p>

                        <Button variant="secondary" size="sm" to="/about">
                            Back to About
                        </Button>
                    </div>
                </div>
            </section>

            <section className="experience-content-section">
                <div className="experience-container">
                    <div ref={contentRef} className="experience-content">
                        <div className="content-block story">
                            <h2 className="content-title">The Journey</h2>
                            <p className="content-text">
                                My journey into UX/UI design started from curiosity about how digital products shape everyday experiences. While my technical background gave me system-level thinking, I became increasingly drawn toward designing interfaces that are not just visually appealing, but intuitive and purposeful. I spent months learning design principles, experimenting with tools, and building projects that helped me understand usability, structure, and clarity.
                            </p>
                            <p className="content-text">
                                While preparing for my interview at Somvanshi Technologies, I treated the opportunity as a design challenge. I studied the company's website deeply and analyzed it from a usability perspective. During the interview, I presented key drawbacks I noticed and suggested improvements to enhance clarity and user experience. Instead of only describing my skills, I demonstrated how I approach real problems — and that conversation became the turning point that led to my selection.
                            </p>
                            <p className="content-text">
                                At Somvanshi Technologies, I applied my learning in real-world projects, designing user-centered web and product interfaces. My work involved UX research, wireframing, prototyping, and refining visual systems while collaborating closely with developers. Each project strengthened my ability to balance creativity with constraints, communicate design decisions clearly, and think holistically about the user journey.
                            </p>
                            <p className="content-text">
                                This internship transformed my mindset from learning design to practicing it professionally — turning curiosity into confidence and ideas into impact.
                            </p>
                        </div>

                        {/* Two Column Layout: Key Contributions & Impact */}
                        <div className="two-column-section">
                            <div className="column left-column">
                                <h2 className="content-title">🔧 Key Contributions</h2>
                                <ul className="contributions-list">
                                    <li>Conducted UX research to inform design decisions</li>
                                    <li>Created wireframes and interactive prototypes in Figma</li>
                                    <li>Designed intuitive user interfaces for live projects</li>
                                    <li>Collaborated with developers for smooth design handoff</li>
                                    <li>Improved visual consistency through design system thinking</li>
                                    <li>Identified usability gaps and proposed practical solutions</li>
                                    <li>Participated in iterative feedback and rapid refinements</li>
                                </ul>
                            </div>

                            <div className="column right-column">
                                <h2 className="content-title">📈 Impact</h2>
                                <ul className="contributions-list">
                                    <li>Strengthened clarity and usability across multiple screens</li>
                                    <li>Reduced friction in user flows through structured layouts</li>
                                    <li>Contributed to faster design-to-development handoff</li>
                                    <li>Helped translate business requirements into usable interfaces</li>
                                    <li>Demonstrated proactive problem-solving during hiring process</li>
                                </ul>
                            </div>
                        </div>

                        <div className="content-block impact">
                            <h2 className="content-title">Impact & Growth</h2>
                            <p className="content-text">
                                This internship marked the moment my preparation met opportunity — turning passion into practice and learning into real-world impact. It taught me that design is not just about making things look good, but about solving problems thoughtfully and creating experiences that users don't have to think about.
                            </p>
                            <p className="content-text">
                                The skills I developed — from conducting user research to translating complex requirements into clean interfaces — continue to shape how I approach every design challenge. Most importantly, this experience reinforced that the best way to demonstrate capability is through action, critical thinking, and a genuine commitment to understanding the problem before proposing solutions.
                            </p>
                        </div>

                        {/* Photo Gallery */}
                        <div className="content-block gallery">
                            <h2 className="content-title">Wall Of Memories</h2>
                            <div className="photo-gallery">
                                <div className="photo-item item-7" onClick={() => handleImageClick(chess1Image, "Design Process")}>
                                    {/* <span className="item-number">7</span> */}
                                    <img src={chess1Image} alt="Design Process" />
                                </div>
                                <div className="photo-item item-9" onClick={() => handleImageClick(officeSpaceImage, "Wireframing")}>
                                    {/* <span className="item-number">9</span> */}
                                    <img src={officeSpaceImage} alt="Wireframing" />
                                </div>
                                <div className="photo-item item-10" onClick={() => handleImageClick(team2Image, "Team Collaboration")}>
                                    {/* <span className="item-number">10</span> */}
                                    <img src={team2Image} alt="Team Collaboration" />
                                </div>
                                <div className="photo-item item-3" onClick={() => handleImageClick(bookGiftImage, "UX Research")}>
                                    {/* <span className="item-number">3</span> */}
                                    <img src={bookGiftImage} alt="UX Research" />
                                </div>
                                <div className="photo-item item-8" onClick={() => handleImageClick(scenic2Image, "Design Review")}>
                                    {/* <span className="item-number">8</span> */}
                                    <img src={scenic2Image} alt="Design Review" />
                                </div>
                                <div className="photo-item item-1" onClick={() => handleImageClick(team1Image, "Prototyping")}>
                                    {/* <span className="item-number">1</span> */}
                                    <img src={team1Image} alt="Prototyping" />
                                </div>
                                <div className="photo-item item-2" onClick={() => handleImageClick(workplace1Image, "Developer Handoff")}>
                                    {/* <span className="item-number">2</span> */}
                                    <img src={workplace1Image} alt="Developer Handoff" />
                                </div>
                                <div className="photo-item item-6" onClick={() => handleImageClick(workplace3Image, "Learning")}>
                                    {/* <span className="item-number">6</span> */}
                                    <img src={workplace3Image} alt="Learning" />
                                </div>
                                <div className="photo-item item-5" onClick={() => handleImageClick(team5Image, "Workplace")}>
                                    {/* <span className="item-number">5</span> */}
                                    <img src={team5Image} alt="Workplace" />
                                </div>
                                <div className="photo-item item-4" onClick={() => handleImageClick(team3Image, "Workplace")}>
                                    {/* <span className="item-number">4</span> */}
                                    <img src={team3Image} alt="Workplace" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Modal/Lightbox */}
            {selectedImage && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <img src={selectedImage.src} alt={selectedImage.alt} />
                    </div>
                </div>
            )}

            <Footer variant="inner" />
        </div>
    )
}

export default ExperienceSomvanshi
