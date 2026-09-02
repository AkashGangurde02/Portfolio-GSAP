import { useEffect, useState, useRef } from 'react'
import { useSEO } from '../hooks/useSEO'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/ui/Button'
import '../components/HomeSubNavbar.css'
import './CaseStudySpotify.css'
import Footer from '../components/Footer'
import SpotifyPlayerPrototype from '../components/SpotifyPlayerPrototype'

// Images
import spotifyHero from '../images/case-studies/case-study-4/spotify-laptop-cover.jpg'
import spotifyResearch from '../images/case-studies/case-study-4/spotify-research.png'

// Player State Screenshots
import stateDefault from '../images/case-studies/case-study-4/state-1-default.png'
import stateHover from '../images/case-studies/case-study-4/state-2-hover.png'
import stateLyricsPeek from '../images/case-studies/case-study-4/state-3-lyrics-peek.png'
import stateLyricsMetadata from '../images/case-studies/case-study-4/state-4-lyrics-metadata.png'

// Tool Icons
import figmaIcon from '../images/icons/tool_figma.svg'

gsap.registerPlugin(ScrollTrigger)

// ── SVG ICONS ─────────────────────────────────────────────────────────────
const MusicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
)

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// ── RECRUITER-FIRST 6-SECTION TOC ITEMS ──────────────────────────────────
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

const TOC_ITEMS = [
  'Overview',
  'The Problem',
  'My Approach',
  'Key UX Decisions',
  'Final Experience',
  'Outcome',
]

export default function CaseStudySpotify() {
  useSEO({
    title: 'Spotify Desktop Mini Player Redesign',
    description: 'Recruiter-first case study: bringing live lyrics to Spotify Desktop Mini Player using progressive disclosure & hover interaction.',
    canonical: '/case-study/spotify',
    ogImage: '/og/og-spotify.png',
  })

  const [activeSection, setActiveSection] = useState('')
  const tocListRef = useRef(null)
  const tocIndicatorRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.sp-hero-tag', '.sp-hero-title', '.sp-hero-sub', '.sp-meta-row'], {
        y: 35, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.1
      })
      gsap.from('.sp-hero-visual', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
    })
    return () => ctx.revert()
  }, [])

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.sp-flow-section')
      let current = ''
      sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top
        if (top < 320) current = sec.getAttribute('id')
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // TOC indicator positioning
  useEffect(() => {
    const list = tocListRef.current
    const bar = tocIndicatorRef.current
    if (!list || !bar) return
    const activeItem = list.querySelector('.gw-toc-item.active')
    if (activeItem) {
      bar.style.transform = `translateY(${activeItem.offsetTop}px)`
      bar.style.height = `${activeItem.offsetHeight}px`
      bar.style.opacity = '1'
    } else {
      bar.style.opacity = '0'
    }
  }, [activeSection])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="gw-page sp-page">

      {/* ── HERO ── */}
      <section className="gw-hero">
        <div className="gw-hero-content">
          <span className="gw-hero-tag">UX Research · Interaction Design · Product Design</span>
          <h1 className="gw-hero-title">
            Spotify Desktop<br />
            <span className="gw-accent">Mini Player</span><br />
            Redesign
          </h1>
          <p className="gw-hero-sub">
            Making Spotify lyrics accessible without interrupting user workflow — bringing live lyrics directly into the Desktop Mini Player experience.
          </p>
          <div className="gw-meta-row">
            {[
              ['Role', 'UX/UI Designer'],
              ['Platform', 'Desktop'],
              ['Timeline', '3 Weeks'],
              ['Tools', 'Figma, Figma Make'],
            ].map(([l, v], i) => (
              <div key={i} className="gw-meta-item">
                <span className="gw-meta-label">{l}</span>
                <span className="gw-meta-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="gw-hero-visual">
          <div className="gw-hero-glow" />
          <div className="gw-hero-img-wrap">
            <img src={spotifyHero} alt="Spotify Mini Player Redesign Preview" className="gw-hero-img" />
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="gw-main-content">

        {/* ── SIDEBAR TOC (RECRUITER-FIRST 6 SECTIONS) ── */}
        <aside className="gw-toc-area">
          <div className="gw-toc-sticky">
            <h4 className="gw-toc-title">Table of Contents</h4>
            <ul className="gw-toc-list" ref={tocListRef}>
              <span className="gw-toc-indicator" ref={tocIndicatorRef} />
              {TOC_ITEMS.map((item, i) => {
                const id = slugify(item)
                return (
                  <li key={i} className={`gw-toc-item ${activeSection === id ? 'active' : ''}`}>
                    <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>
                      <span className="toc-num">0{i + 1}</span> {item}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* ── FLOW CONTENT ── */}
        <div className="gw-flow-area">

          {/* ── 01: OVERVIEW ── */}
          <section id="overview" className="gw-flow-section sp-ord-section">
            <div className="sp-section-num">01</div>
            <h3 className="sp-section-headline">Overview</h3>
            <p className="sp-section-sub">
              Spotify's Desktop Mini Player lets users listen to music without opening the full application. But accessing live lyrics forced users to switch back to the main app mid-workflow.
            </p>
            <p className="gw-body" style={{ marginBottom: '2rem' }}>
              This project explores how Spotify could bring live lyrics directly into the Desktop Mini Player experience using progressive disclosure and hover-based interaction — delivering lyrics on demand without disrupting user focus.
            </p>
            <div className="sp-context-cards">
              <div className="sp-context-card">
                <span className="sp-context-icon"><MusicIcon /></span>
                <div>
                  <strong>The Mini Player</strong>
                  <p>A compact Spotify window for listening without opening the full app — but it had no lyrics access.</p>
                </div>
              </div>
              <div className="sp-context-card">
                <span className="sp-context-icon"><RefreshIcon /></span>
                <div>
                  <strong>The Problem</strong>
                  <p>Users must switch back to the main Spotify window just to read lyrics, interrupting their workflow.</p>
                </div>
              </div>
              <div className="sp-context-card">
                <span className="sp-context-icon"><TargetIcon /></span>
                <div>
                  <strong>The Opportunity</strong>
                  <p>Design a lyrics experience native to the Mini Player using progressive disclosure and interaction design.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 02: THE PROBLEM ── */}
          <section id="the-problem" className="gw-flow-section sp-ord-section">
            <div className="sp-section-num">02</div>
            <h3 className="sp-section-headline">The Problem</h3>
            <p className="sp-section-sub">
              What wasn't working, who was affected, and why it mattered to desktop multitaskers.
            </p>

            <div className="sp-problem-statement-card">
              <span className="sp-ps-label">PROBLEM STATEMENT</span>
              <p className="sp-ps-text">
                "Users who listen via the Spotify Desktop Mini Player cannot access live lyrics without reopening the main Spotify application, causing constant context switching and breaking their concentration during deep work."
              </p>
            </div>

            <div className="sp-audit-grid" style={{ marginTop: '2rem' }}>
              <div className="sp-audit-card">
                <div className="sp-audit-card-top">
                  <span className="sp-audit-number">01</span>
                  <span className="sp-audit-tag">FEATURE GAP</span>
                </div>
                <h4 className="sp-audit-title">No Lyrics Inside Mini Player</h4>
                <p className="sp-audit-desc">Lyrics are entirely absent from the Mini Player. Users who multitask with Spotify minimized have no way to read lyrics without fully switching applications.</p>
              </div>

              <div className="sp-audit-card">
                <div className="sp-audit-card-top">
                  <span className="sp-audit-number">02</span>
                  <span className="sp-audit-tag">INTERRUPTION</span>
                </div>
                <h4 className="sp-audit-title">Workflow Interruption</h4>
                <p className="sp-audit-desc">Opening the full Spotify window breaks user focus during coding, writing, or design sessions. The Mini Player's core value — staying out of the way — is undermined.</p>
              </div>

              <div className="sp-audit-card">
                <div className="sp-audit-card-top">
                  <span className="sp-audit-number">03</span>
                  <span className="sp-audit-tag">FRICTION</span>
                </div>
                <h4 className="sp-audit-title">Repeated Context Switching</h4>
                <p className="sp-audit-desc">Users must toggle between their primary application and Spotify repeatedly during a session. This constant switching degrades productivity and listening flow.</p>
              </div>

              <div className="sp-audit-card">
                <div className="sp-audit-card-top">
                  <span className="sp-audit-number">04</span>
                  <span className="sp-audit-tag">WORKAROUNDS</span>
                </div>
                <h4 className="sp-audit-title">Unnecessary Workarounds</h4>
                <p className="sp-audit-desc">Users resort to opening Genius browser tabs or third-party lyric apps, creating desktop clutter and defeating Spotify's native convenience.</p>
              </div>
            </div>
          </section>

          {/* ── 03: MY APPROACH ── */}
          <section id="my-approach" className="gw-flow-section sp-ord-section">
            <div className="sp-section-num">03</div>
            <h3 className="sp-section-headline">My Approach</h3>
            <p className="sp-section-sub">
              Synthesizing community research insights directly into clear design directions — focusing on what was discovered rather than explaining generic process steps.
            </p>

            <img
              src={spotifyResearch}
              alt="Spotify Community and Reddit user feedback evidence"
              className="sp-research-img"
            />

            <div className="sp-approach-grid">
              <div className="sp-approach-card">
                <div className="sp-approach-header">
                  <span className="sp-approach-badge">RESEARCH FINDING</span>
                  <h4>Singing Along While Working</h4>
                </div>
                <p className="sp-approach-desc">
                  Users on Spotify Community threads expressed wanting to check lyrics briefly during coding or writing without opening a large window.
                </p>
                <div className="sp-approach-direction">
                  <strong>DESIGN DIRECTION:</strong> Keep lyrics compact and non-intrusive within the existing Mini Player footprint.
                </div>
              </div>

              <div className="sp-approach-card">
                <div className="sp-approach-header">
                  <span className="sp-approach-badge">RESEARCH FINDING</span>
                  <h4>Friction of Reopening App</h4>
                </div>
                <p className="sp-approach-desc">
                  Reopening the main Spotify window requires multiple clicks and window management, interrupting user flow.
                </p>
                <div className="sp-approach-direction">
                  <strong>DESIGN DIRECTION:</strong> Surface lyrics in 1 hover action using progressive disclosure so zero extra clicks are required.
                </div>
              </div>

              <div className="sp-approach-card">
                <div className="sp-approach-header">
                  <span className="sp-approach-badge">RESEARCH FINDING</span>
                  <h4>Uninterrupted Playback Controls</h4>
                </div>
                <p className="sp-approach-desc">
                  Multitaskers expect playback controls (play, pause, skip) to remain accessible at all times without overlay obstruction.
                </p>
                <div className="sp-approach-direction">
                  <strong>DESIGN DIRECTION:</strong> Ensure playback controls stay permanently visible in all states, even when lyrics are active.
                </div>
              </div>
            </div>
          </section>

          {/* ── 04: KEY UX DECISIONS (FEATURED CORE SECTION) ── */}
          <section id="key-ux-decisions" className="gw-flow-section sp-ord-section">
            <div className="sp-section-num">04</div>
            <h3 className="sp-section-headline">Key UX Decisions</h3>
            <p className="sp-section-sub">
              Four intentional interaction design choices that balance lyric accessibility with interface simplicity.
            </p>

            <div className="sp-decisions-stack">

              {/* Decision 1 */}
              <div className="sp-decision-card">
                <div className="sp-dc-header">
                  <span className="sp-dc-num">DECISION 01</span>
                  <h4 className="sp-dc-title">Lyrics Peek Mode (Progressive Disclosure)</h4>
                </div>
                <div className="sp-dc-body">
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-problem">Problem</span>
                    <p>Opening full Spotify or expanding Mini Player destroys compact desktop real estate.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-decision">Decision</span>
                    <p>Designed a hover-triggered overlay revealing 2–3 lines of synchronized lyrics below playback controls.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-why">Why</span>
                    <p>Progressive disclosure keeps default state minimal while granting instant lyric access when needed.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-result">Result</span>
                    <p>Zero desktop real estate wasted until the user explicitly requests lyrics.</p>
                  </div>
                </div>
              </div>

              {/* Decision 2 */}
              <div className="sp-decision-card">
                <div className="sp-dc-header">
                  <span className="sp-dc-num">DECISION 02</span>
                  <h4 className="sp-dc-title">Persistent Playback Controls</h4>
                </div>
                <div className="sp-dc-body">
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-problem">Problem</span>
                    <p>Overlays frequently hide primary controls, requiring users to close lyrics to pause or skip tracks.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-decision">Decision</span>
                    <p>Kept play, pause, track skip, and volume permanently visible across all 4 player states.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-why">Why</span>
                    <p>Users should never be forced to dismiss lyrics just to manage core music playback.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-result">Result</span>
                    <p>Zero friction control management while reading synchronized song lyrics.</p>
                  </div>
                </div>
              </div>

              {/* Decision 3 */}
              <div className="sp-decision-card">
                <div className="sp-dc-header">
                  <span className="sp-dc-num">DECISION 03</span>
                  <h4 className="sp-dc-title">Low-Effort Hover Trigger</h4>
                </div>
                <div className="sp-dc-body">
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-problem">Problem</span>
                    <p>Click triggers introduce extra interaction effort for quick lyric checks.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-decision">Decision</span>
                    <p>Leveraged desktop cursor hover intent to trigger the lyrics preview overlay.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-why">Why</span>
                    <p>Hover is the fastest, lowest-friction desktop interaction pattern (similar to tooltips).</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-result">Result</span>
                    <p>Glancing at lyrics takes less than 1 second with zero clicks required.</p>
                  </div>
                </div>
              </div>

              {/* Decision 4 */}
              <div className="sp-decision-card">
                <div className="sp-dc-header">
                  <span className="sp-dc-num">DECISION 04</span>
                  <h4 className="sp-dc-title">Native Spotify Design System Integration</h4>
                </div>
                <div className="sp-dc-body">
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-problem">Problem</span>
                    <p>Third-party lyric add-ons feel visual alien and disjointed from Spotify.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-decision">Decision</span>
                    <p>Utilized Spotify's exact dark theme, Inter typography, translucent overlays, and green highlight tokens.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-why">Why</span>
                    <p>Ensures the feature feels like an official native Spotify update rather than an afterthought.</p>
                  </div>
                  <div className="sp-dc-row">
                    <span className="sp-dc-label sp-dc-result">Result</span>
                    <p>High visual consistency and instant familiarity for existing Spotify users.</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ── 05: FINAL EXPERIENCE ── */}
          <section id="final-experience" className="gw-flow-section sp-ord-section">
            <div className="sp-section-num">05</div>
            <h3 className="sp-section-headline">Final Experience</h3>
            <p className="sp-section-sub">
              High-fidelity UI screens showing the complete 4-state Lyrics Peek Mode system, alongside an interactive live prototype.
            </p>

            {/* 4 State UI Showcase */}
            <div className="sp-player-showcase">
              <div className="sp-state-img-card">
                <div className="sp-state-img-wrap">
                  <img src={stateDefault} alt="State 1 — Default Mini Player" className="sp-state-img" />
                </div>
                <div className="sp-state-img-label">
                  <span className="sp-state-img-num">01</span>
                  <span className="sp-state-img-name">Default State</span>
                </div>
              </div>

              <div className="sp-state-img-card">
                <div className="sp-state-img-wrap">
                  <img src={stateHover} alt="State 2 — Hover State" className="sp-state-img" />
                </div>
                <div className="sp-state-img-label">
                  <span className="sp-state-img-num">02</span>
                  <span className="sp-state-img-name">Hover State</span>
                </div>
              </div>

              <div className="sp-state-img-card sp-state-img-card--selected">
                <div className="sp-state-img-wrap">
                  <img src={stateLyricsPeek} alt="State 3 — Lyrics Peek Mode" className="sp-state-img" />
                </div>
                <div className="sp-state-img-label">
                  <span className="sp-state-img-num">03</span>
                  <span className="sp-state-img-name">Lyrics Peek Mode</span>
                </div>
              </div>

              <div className="sp-state-img-card">
                <div className="sp-state-img-wrap">
                  <img src={stateLyricsMetadata} alt="State 4 — Lyrics + Metadata" className="sp-state-img" />
                </div>
                <div className="sp-state-img-label">
                  <span className="sp-state-img-num">04</span>
                  <span className="sp-state-img-name">Lyrics + Metadata</span>
                </div>
              </div>
            </div>

            {/* Live Interactive Prototype */}
            <div className="sp-proto-live-wrap" style={{ marginTop: '3rem' }}>
              <div className="sp-proto-live-label">
                <span className="sp-proto-live-dot" />
                Interactive Prototype Demo — Hover player & toggle lyrics
              </div>
              <SpotifyPlayerPrototype />
            </div>

            {/* Figma Links */}
            <div className="sp-prototype-cards" style={{ marginTop: '2.5rem' }}>
              <div className="sp-proto-card">
                <div className="sp-proto-icon">
                  <img src={figmaIcon} alt="Figma" style={{ width: 32, height: 32 }} />
                </div>
                <div className="sp-proto-info">
                  <h4>Figma Design File</h4>
                  <p>Explore complete high-fidelity UI screens and component variants.</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  href="https://www.figma.com/design/vM1YbJONNAlsayJCEJIt6y/Spotify-Case-study--PUBLIC?node-id=0-1&t=YerxVfUt2TrRVIR8-1"
                  target="_blank"
                  showArrow
                  arrowType="up-right"
                >
                  View Design
                </Button>
              </div>

              <div className="sp-proto-card">
                <div className="sp-proto-icon sp-proto-icon--make">
                  <img src={figmaIcon} alt="Figma Make" style={{ width: 32, height: 32, filter: 'hue-rotate(120deg)' }} />
                </div>
                <div className="sp-proto-info">
                  <h4>Figma Make Prototype</h4>
                  <p>Test live hover states and lyrics reveal inside Figma.</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  href="https://www.figma.com/make/ZUwGWcofp0lVANyUK3z7Yu/Spotify-Mini-Player-Prototype?t=m6eWMcqLwuSvKbyJ-20&fullscreen=1"
                  target="_blank"
                  showArrow
                  arrowType="up-right"
                >
                  View Prototype
                </Button>
              </div>
            </div>
          </section>

          {/* ── 06: OUTCOME ── */}
          <section id="outcome" className="gw-flow-section sp-ord-section sp-outcome-section">
            <div className="sp-section-num">06</div>
            <h3 className="sp-outcome-headline">Outcome & Learnings</h3>
            <p className="sp-outcome-body">
              This project demonstrated that impactful product improvements don't always require brand-new screens or complex navigation — they come from adding the right information to the right moment.
            </p>

            <div className="sp-impact-grid" style={{ margin: '2rem 0' }}>
              <div className="sp-impact-card">
                <div className="sp-impact-icon"><TrendingUpIcon /></div>
                <h4>Eliminated App Switching</h4>
                <p>Users no longer need to open the main Spotify window for lyrics — preserving their focus during deep work.</p>
              </div>

              <div className="sp-impact-card">
                <div className="sp-impact-icon"><ZapIcon /></div>
                <h4>Faster Lyric Access</h4>
                <p>Reduced lyric check effort from multiple clicks & app switches to a single 1-second hover intent.</p>
              </div>

              <div className="sp-impact-card">
                <div className="sp-impact-icon"><CheckIcon /></div>
                <h4>Preserved Mini Player Simplicity</h4>
                <p>Progressive disclosure ensured zero added visual noise or footprint expansion in the default listening state.</p>
              </div>
            </div>

            <div className="sp-learnings-box">
              <h4>Key Takeaway</h4>
              <p>
                "Designing within tight constraints forced extreme prioritization. Every pixel and state had to earn its place. Hover interaction + progressive disclosure allowed adding significant value without compromising minimalism."
              </p>
            </div>

          </section>

          {/* ── EXTERNAL FULL PROCESS CTA ── */}
          <section className="sp-external-cta">
            <div className="sp-ext-cta-content">
              <span className="sp-ext-cta-tag">WANT TO SEE THE FULL PROCESS?</span>
              <h3 className="sp-ext-cta-title">Explore the Complete Case Study on Notion</h3>
              <p className="sp-ext-cta-desc">
                Includes full interview transcripts, competitive analysis matrix, wireframes, user journeys, usability testing feedback, and complete design explorations.
              </p>
              <div className="sp-ext-cta-btn-wrap">
                <Button
                  variant="primary"
                  size="md"
                  href="https://notion.so"
                  target="_blank"
                  showArrow
                  arrowType="up-right"
                >
                  Read Full Case Study on Notion
                </Button>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="gw-cta">
        <h2>Want to see more of my work?</h2>
        <p>Explore other case studies or get in touch.</p>
        <div className="gw-cta-btns">
          <Button variant="secondary" size="md" to="/work">Back to Work</Button>
          <Button variant="primary" size="md" to="/contact" showArrow arrowType="right">Let's Talk</Button>
        </div>
      </section>

      <Footer variant="inner" />
    </div>
  )
}
