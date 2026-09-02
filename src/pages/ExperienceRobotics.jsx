import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './ExperienceRobotics.css'
import Footer from '../components/Footer'

const ExperienceRobotics = () => {
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
                            <span className="meta-tags">Software Development • Manual Robot (R1) • Robotics Systems</span>
                        </div>

                        <h1 className="experience-hero-title">Software Team Member</h1>
                        <p className="experience-hero-subtitle">VIIT Robotics Club • 2023 – 2024</p>

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
                                My time as a Software Team Member at the VIIT Robotics Club was driven entirely by curiosity and a deep passion for robotics. Working alongside technically skilled teammates, I was immersed in robotics and software-focused projects where logic, experimentation, and real-world problem solving were central to everything we built.
                            </p>
                            <p className="content-text">
                                This hands-on environment helped me understand how software interacts with hardware, how systems behave under real constraints, and how teamwork plays a crucial role in building reliable robotic solutions. The experience challenged me to think critically, adapt quickly, and stay committed through constant testing, iteration, and learning.
                            </p>
                        </div>

                        <div className="content-block highlight">
                            <h2 className="content-title">ABU Asia-Pacific Robocon</h2>
                            <p className="content-text">
                                One of the most defining chapters of this journey was representing the team at <strong>ABU Asia-Pacific Robocon</strong>, a global robotics competition that pushed both technical ability and teamwork to their limits. I played a crucial role in programming the manual robot (R1), taking complete ownership of its software behavior — from movement logic to real-time control during competition tasks.
                            </p>
                            <p className="content-text">
                                This involved ensuring the robot could reliably survey the rice field, transplant seedlings, and throw sacks under high-pressure conditions. Working at this level demanded precision, fast debugging, and a deep understanding of how sensors, actuators, and control systems function together.
                            </p>
                            <p className="content-text">
                                Beyond the technical challenge, the Robocon journey became deeply personal. Countless hours of building, testing, failing, and improving together transformed the team into more than collaborators — it felt like a second family. The trust placed in me to handle such a critical system strengthened my confidence and sense of responsibility, making this experience one of the most meaningful chapters of my journey in robotics.
                            </p>
                        </div>

                        <div className="content-block contributions">
                            <h2 className="content-title">🔧 Key Contributions</h2>
                            <ul className="contributions-list">
                                <li>Programmed the entire software logic for the Manual Robot (R1) used in ABU Asia-Pacific Robocon</li>
                                <li>Designed and implemented robot movement and control systems for precise field navigation</li>
                                <li>Integrated and tested sensors and actuators to ensure real-time responsiveness</li>
                                <li>Developed control logic for competition tasks, including:
                                    <ul className="sub-list">
                                        <li>Surveying the rice field</li>
                                        <li>Transplanting seedlings</li>
                                        <li>Throwing sacks</li>
                                    </ul>
                                </li>
                                <li>Performed rapid debugging and iterative improvements under time and performance constraints</li>
                                <li>Collaborated closely with hardware and software team members during development and testing</li>
                                <li>Supported team coordination and execution during practice runs and competition days</li>
                            </ul>
                        </div>

                        <div className="content-block impact">
                            <h2 className="content-title">Impact & Growth</h2>
                            <p className="content-text">
                                This experience fundamentally shaped my approach to problem-solving and collaboration. It taught me the value of precision in software development, the importance of testing under real-world conditions, and the power of trust within a team working toward a shared goal.
                            </p>
                            <p className="content-text">
                                The skills I developed — from real-time control systems to rapid debugging under pressure — continue to influence how I approach technical challenges today. Most importantly, it reinforced my belief that the best solutions emerge when passion, curiosity, and teamwork come together.
                            </p>

                            {/* Photo Gallery */}
                            <div className="content-block gallery">
                                <h2 className="content-title">Moments from the Journey</h2>
                                <div className="photo-gallery">
                                    <div className="photo-item item-7">
                                        <div className="photo-placeholder">Team Photo</div>
                                    </div>
                                    <div className="photo-item item-9">
                                        <div className="photo-placeholder">Robot Build</div>
                                    </div>
                                    <div className="photo-item item-10">
                                        <div className="photo-placeholder">Competition</div>
                                    </div>
                                    <div className="photo-item item-3">
                                        <div className="photo-placeholder">Workshop</div>
                                    </div>
                                    <div className="photo-item item-8">
                                        <div className="photo-placeholder">Testing</div>
                                    </div>
                                    <div className="photo-item item-1">
                                        <div className="photo-placeholder">Team Work</div>
                                    </div>
                                    <div className="photo-item item-2">
                                        <div className="photo-placeholder">Robocon</div>
                                    </div>
                                    <div className="photo-item item-6">
                                        <div className="photo-placeholder">Celebration</div>
                                    </div>
                                    <div className="photo-item item-5">
                                        <div className="photo-placeholder">Innovation</div>
                                    </div>
                                    <div className="photo-item item-4">
                                        <div className="photo-placeholder">Memories</div>
                                    </div>
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

export default ExperienceRobotics
