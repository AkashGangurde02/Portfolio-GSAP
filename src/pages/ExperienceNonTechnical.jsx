import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './ExperienceRobotics.css'
import Footer from '../components/Footer'

const ExperienceNonTechnical = () => {
    const heroRef = useRef(null)
    const contentRef = useRef(null)

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

    return (
        <div className="experience-story-page">
            <section className="experience-hero">
                <div className="experience-container">
                    <div ref={heroRef} className="experience-hero-content">
                        <div className="experience-meta">
                            <span className="meta-label">Role Focus:</span>
                            <span className="meta-tags">Leadership • Design • Documentation • Event Planning</span>
                        </div>

                        <h1 className="experience-hero-title">Non-Technical Head</h1>
                        <p className="experience-hero-subtitle">VIIT Robotics Club • 2024 – 2025</p>

                        <Link to="/about" className="back-link">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back to About
                        </Link>
                    </div>
                </div>
            </section>

            <section className="experience-content-section">
                <div className="experience-container">
                    <div ref={contentRef} className="experience-content">
                        <div className="content-block story">
                            <h2 className="content-title">The Journey</h2>
                            <p className="content-text">
                                After a year of working closely with the team as a Software Team Member, my dedication, consistency, and commitment were recognized by my seniors, who considered me fit to take on the role of Non-Technical Head at the VIIT Robotics Club. This transition marked a shift from individual contribution to leadership and ownership. I became responsible for leading non-technical operations that supported the club's technical vision, ensuring the team's work was communicated clearly and cohesively across platforms and audiences.
                            </p>
                            <p className="content-text">
                                In this role, I led design, documentation, and the video editing team, providing direction, structure, and creative leadership. I also assisted in event planning and presentations, helping represent the club's work effectively during reviews, competitions, and outreach activities. Alongside execution, I mentored junior members, supported overall team organization, and worked closely with technical teams to translate complex ideas into clear and engaging narratives. Being trusted with this position by my seniors was both an honor and a defining moment, reinforcing the value of responsibility, teamwork, and consistent effort within a collaborative environment.
                            </p>
                        </div>

                        <div className="content-block contributions">
                            <h2 className="content-title">🎯 Key Responsibilities</h2>
                            <ul className="contributions-list">
                                <li>Led non-technical operations including design, documentation, and communication</li>
                                <li>Provided leadership to the design and video editing team</li>
                                <li>Assisted in event planning and presentations</li>
                                <li>Mentored junior members and supported team organization</li>
                                <li>Coordinated closely with technical teams to align vision and execution</li>
                            </ul>
                        </div>

                        <div className="content-block highlight">
                            <h2 className="content-title">Leadership & Impact</h2>
                            <p className="content-text">
                                Taking on the role of Non-Technical Head taught me the importance of <strong>leadership through trust and responsibility</strong>. It wasn't just about managing tasks—it was about creating an environment where every team member felt supported, valued, and empowered to contribute their best work.
                            </p>
                            <p className="content-text">
                                I learned to bridge the gap between technical complexity and clear communication, ensuring that the club's work was presented in ways that resonated with different audiences. Whether coordinating presentations for competitions, managing documentation workflows, or leading creative direction for promotional content, I focused on consistency, clarity, and impact.
                            </p>
                            <p className="content-text">
                                This experience reinforced that great teams are built not just on technical excellence, but on shared vision, mutual respect, and consistent effort. The trust my seniors placed in me became a driving force to deliver results and support the team's growth at every level.
                            </p>
                        </div>

                        <div className="content-block impact">
                            <h2 className="content-title">Impact & Growth</h2>
                            <p className="content-text">
                                This role fundamentally shaped my understanding of leadership, collaboration, and organization. It taught me how to balance creative direction with operational execution, how to mentor others while continuing to learn, and how to translate technical work into compelling narratives that inspire and inform.
                            </p>
                            <p className="content-text">
                                The skills I developed—from team coordination to strategic communication—continue to influence how I approach projects and work with others today. Most importantly, this experience deepened my appreciation for the power of teamwork and the responsibility that comes with leading others toward a shared goal.
                            </p>
                        </div>

                        {/* Photo Gallery */}
                        <div className="content-block gallery">
                            <h2 className="content-title">Moments from the Journey</h2>
                            <div className="photo-gallery">
                                <div className="photo-item item-7">
                                    <div className="photo-placeholder">Team Leadership</div>
                                </div>
                                <div className="photo-item item-9">
                                    <div className="photo-placeholder">Event Planning</div>
                                </div>
                                <div className="photo-item item-10">
                                    <div className="photo-placeholder">Presentation</div>
                                </div>
                                <div className="photo-item item-3">
                                    <div className="photo-placeholder">Design Work</div>
                                </div>
                                <div className="photo-item item-8">
                                    <div className="photo-placeholder">Team Coordination</div>
                                </div>
                                <div className="photo-item item-1">
                                    <div className="photo-placeholder">Documentation</div>
                                </div>
                                <div className="photo-item item-2">
                                    <div className="photo-placeholder">Mentoring</div>
                                </div>
                                <div className="photo-item item-6">
                                    <div className="photo-placeholder">Club Activities</div>
                                </div>
                                <div className="photo-item item-5">
                                    <div className="photo-placeholder">Collaboration</div>
                                </div>
                                <div className="photo-item item-4">
                                    <div className="photo-placeholder">Impact</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer variant="inner" />
        </div>
    )
}

export default ExperienceNonTechnical
