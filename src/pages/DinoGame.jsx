import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './DinoGame.css'
import Footer from '../components/Footer'

const DinoGame = () => {
    const iframeRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        // Try to focus on mount
        if (iframeRef.current) {
            iframeRef.current.focus()
        }
    }, [])

    const handleGameClick = () => {
        setIsFocused(true)
        if (iframeRef.current) {
            iframeRef.current.focus()
        }
    }

    return (
        <div className="dino-game-page">
            <div className="dino-container" style={{ maxWidth: '1000px', padding: '0.5rem', width: '95%' }}>
                <div className="game-header">
                    <h1 className="game-title">Connection Lost? Play Dino!</h1>
                    <p className="game-subtitle">The images are still uploading... run while you wait!</p>
                </div>

                <div className="game-wrapper" style={{ height: '250px', border: 'none', position: 'relative' }}>
                    {!isFocused && (
                        <div
                            onClick={handleGameClick}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.05)',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                borderRadius: '8px'
                            }}
                        >
                            <div style={{
                                background: 'white',
                                padding: '1rem 2rem',
                                borderRadius: '50px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                color: '#333'
                            }}>
                                👆 Click here to activate game
                            </div>
                        </div>
                    )}
                    <iframe
                        ref={iframeRef}
                        src="https://wayou.github.io/t-rex-runner/"
                        title="Chrome Dino Game"
                        width="100%"
                        height="140%"
                        style={{
                            border: 'none',
                            borderRadius: '8px',
                            position: 'absolute',
                            top: '60%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        scrolling="no"
                    />
                </div>

                <div className="game-controls-hint">
                    <p>Click the game area first, then press <strong>Space</strong> to jump!</p>
                </div>

                <Link to="/" className="back-home-link">
                    Return to Portfolio
                </Link>
            </div>
            <Footer variant="inner" />
        </div>
    )
}

export default DinoGame
