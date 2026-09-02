import { useState, useRef, useCallback } from 'react'
import './SpotifyPlayerPrototype.css'
import albumArt from '../images/case-studies/case-study-4/state-1-default.png'

// ── SVG ICONS ──────────────────────────────────────────────────────────────────

const IconShuffle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
  </svg>
)

const IconPrev = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
  </svg>
)

const IconPause = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
)

const IconNext = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zm2-8.14 5.24 3.64L8 17.14V9.86zM16 6h2v12h-2z" />
  </svg>
)

const IconMic = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)

const IconMicOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)

const IconExpand = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

const IconClose = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconSpotify = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
)

const IconAdd = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
)

// ── LYRICS DATA ────────────────────────────────────────────────────────────────
const LYRICS_LINES = [
  { text: 'Kinna tang kardi\'an han-an-an', active: false },
  { text: 'Mathe te teodi ni jamma-aa', active: true },
  { text: 'Pata mainu dedenga tu jaan-an', active: false },
]

// ── STATE CONFIG ───────────────────────────────────────────────────────────────
// State is computed from: { isHovered, lyricsOn }
// State 1: !isHovered && !lyricsOn  → Default
// State 2: isHovered  && !lyricsOn  → Hover
// State 3: isHovered  && lyricsOn   → Lyrics + Hover
// State 4: !isHovered && lyricsOn   → Lyrics + Default

function getStateInfo(isHovered, lyricsOn) {
  if (!isHovered && !lyricsOn)  return { num: '01', label: 'Default State',       sub: 'Lyrics off and Default' }
  if (isHovered  && !lyricsOn)  return { num: '02', label: 'Hover State',         sub: 'Lyrics off and hover' }
  if (isHovered  && lyricsOn)   return { num: '03', label: 'Lyrics on',           sub: 'Lyrics on and hover' }
  /* !isHovered && lyricsOn */   return { num: '04', label: 'Lyrics on default',  sub: 'Lyrics on and Default' }
}

// ── THE PLAYER ─────────────────────────────────────────────────────────────────
function SpotifyMiniPlayer({ isHovered, lyricsOn, onToggleLyrics, onMouseEnter, onMouseLeave }) {
  const showArt        = true
  const dimArt         = lyricsOn           // darken art when lyrics on
  const showLyrics     = lyricsOn           // overlay lyrics text
  const showControls   = isHovered          // controls bar visible on hover
  const showMetadata   = !isHovered         // song title/artist below
  const lyricsIconActive = lyricsOn

  return (
    <div
      className="spp-player"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Window chrome ── */}
      <div className="spp-chrome">
        <div className="spp-chrome-left">
          <IconSpotify />
          <span className="spp-url">open.spotify.com</span>
        </div>
        <div className="spp-chrome-right">
          <button className="spp-chrome-btn" aria-label="Expand"><IconExpand /></button>
          <button className="spp-chrome-btn" aria-label="Close"><IconClose /></button>
        </div>
      </div>

      {/* ── Album art area ── */}
      <div className="spp-art-wrap">
        {/* Real album art */}
        <img
          src={albumArt}
          alt="For A Reason — Karan Aujla album art"
          className={`spp-art-img ${dimArt ? 'spp-art-img--dim' : ''}`}
          draggable={false}
        />

        {/* Lyrics overlay — only when lyricsOn */}
        <div className={`spp-lyrics-overlay ${showLyrics ? 'spp-lyrics-overlay--visible' : ''}`}>
          {LYRICS_LINES.map((line, i) => (
            <p
              key={i}
              className={`spp-lyric ${line.active ? 'spp-lyric--active' : 'spp-lyric--dim'}`}
            >{line.text}</p>
          ))}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="spp-progress-section">
        <span className="spp-time">2:39</span>
        <div className="spp-progress-track">
          <div className="spp-progress-fill" style={{ width: '62%' }} />
          <div className="spp-progress-thumb" style={{ left: '62%' }} />
        </div>
        <span className="spp-time">4:22</span>
      </div>

      {/* ── Controls row — visible ONLY on hover ── */}
      <div className={`spp-controls ${isHovered ? 'spp-controls--visible' : ''}`}>
        <button className="spp-ctrl spp-ctrl--icon" aria-label="Shuffle"><IconShuffle /></button>
        <button className="spp-ctrl spp-ctrl--icon" aria-label="Previous"><IconPrev /></button>
        <button className="spp-ctrl spp-ctrl--play" aria-label="Pause"><IconPause /></button>
        <button className="spp-ctrl spp-ctrl--icon" aria-label="Next"><IconNext /></button>
        <button
          className={`spp-ctrl spp-ctrl--icon spp-ctrl--lyrics ${lyricsIconActive ? 'spp-ctrl--lyrics-active' : ''}`}
          aria-label={lyricsOn ? 'Hide lyrics' : 'Show lyrics'}
          onClick={onToggleLyrics}
        >
          {lyricsOn ? <IconMicOff /> : <IconMic />}
        </button>
      </div>

      {/* ── Metadata row — visible when NOT hovering ── */}
      <div className={`spp-meta ${!isHovered ? 'spp-meta--visible' : ''}`}>
        <div className="spp-meta-info">
          <p className="spp-track-name">For A Reason</p>
          <p className="spp-track-artist">karan Aujla, Ikky</p>
        </div>
        <button className="spp-add-btn" aria-label="Add to library"><IconAdd /></button>
      </div>
    </div>
  )
}

// ── MAIN EXPORT ────────────────────────────────────────────────────────────────
export default function SpotifyPlayerPrototype({ showGuide = true }) {
  const [isHovered, setIsHovered] = useState(false)
  const [lyricsOn, setLyricsOn]   = useState(false)
  const hoverTimerRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    clearTimeout(hoverTimerRef.current)
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    // Small debounce so controls don't flicker when moving to a button
    hoverTimerRef.current = setTimeout(() => setIsHovered(false), 80)
  }, [])

  const handleToggleLyrics = useCallback((e) => {
    e.stopPropagation()
    setLyricsOn(prev => !prev)
  }, [])

  const stateInfo = getStateInfo(isHovered, lyricsOn)

  // All four states for the guide row beneath
  const allStates = [
    { num: '01', label: 'Default State',      sub: 'Lyrics off and Default',  active: !isHovered && !lyricsOn },
    { num: '02', label: 'Hover State',         sub: 'Lyrics off and hover',    active: isHovered  && !lyricsOn },
    { num: '03', label: 'Lyrics on',           sub: 'Lyrics on and hover',     active: isHovered  && lyricsOn  },
    { num: '04', label: 'Lyrics on default',   sub: 'Lyrics on and Default',   active: !isHovered && lyricsOn  },
  ]

  return (
    <div className={`spp-wrapper ${!showGuide ? 'spp-wrapper--no-guide' : ''}`}>

      {/* ── Player ── */}
      <div className={`spp-stage ${!showGuide ? 'spp-stage--no-guide' : ''}`}>
        <SpotifyMiniPlayer
          isHovered={isHovered}
          lyricsOn={lyricsOn}
          onToggleLyrics={handleToggleLyrics}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* ── Interactive Prototype label ── */}
      <div className="spp-proto-label">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 8 12 12 14.5 14.5" />
        </svg>
        Interactive Prototype
      </div>

      {showGuide && (
        <>
          {/* ── State guide pills ── */}
          <div className="spp-state-guide">
            {allStates.map((s) => (
              <div key={s.num} className={`spp-guide-pill ${s.active ? 'spp-guide-pill--active' : ''}`}>
                <span className="spp-guide-num">{s.num}</span>
                <span className="spp-guide-label">{s.sub}</span>
                {s.active && <span className="spp-guide-dot" />}
              </div>
            ))}
          </div>

          {/* ── Hint ── */}
          <p className="spp-hint">
            <span>Hover the player to reveal controls</span>
            <span className="spp-hint-sep">·</span>
            <span>Click <IconMic /> to toggle lyrics</span>
          </p>
        </>
      )}
    </div>
  )
}
