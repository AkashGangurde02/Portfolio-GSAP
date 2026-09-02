import { useEffect, useState, useRef, useCallback } from 'react'
import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/ui/Button'
import '../components/HomeSubNavbar.css'
import './CaseStudyGrubwala.css'
import grubwalaImage from '../images/case-studies/case-study-3/grubwala-cover.jpg'
import otpMockup from '../images/case-studies/case-study-3/otp-mockup.png'
import signupMockup from '../images/case-studies/case-study-3/signup-mockup.png'
import loginMockup from '../images/case-studies/case-study-3/login-mockup.png'
import redesignLoginMockup from '../images/case-studies/case-study-3/redesign-login.png'
import redesignOtpMockup from '../images/case-studies/case-study-3/redesign-otp.png'
import edgeCartEmpty from '../images/case-studies/case-study-3/edge-cart-empty.png'
import edgeKitchenClosed from '../images/case-studies/case-study-3/edge-kitchen-closed.png'
import edgeNoMeals from '../images/case-studies/case-study-3/edge-no-meals.png'
import edgeSubscriptionExpired from '../images/case-studies/case-study-3/edge-subscription-expired.png'
import edgeCases from '../images/case-studies/case-study-3/edge-cases.png'
import Footer from '../components/Footer'

// Tool Icons
import dribbbleIcon from '../images/icons/tool_dribbble.svg'
import pinterestIcon from '../images/icons/tool_pinterest.svg'
import figmaIcon from '../images/icons/tool_figma.svg'
import uxpilotIcon from '../images/icons/tool_ux.svg'
import chatgptIcon from '../images/icons/tool_chatgpt.svg'
import geminiIcon from '../images/icons/tool_gemini.svg'
import slackIcon from '../images/icons/tool_slack.svg'
import trelloIcon from '../images/icons/tool_trello.svg'
import mediumIcon from '../images/icons/tool_medium.svg'
import notionIcon from '../images/icons/tool_notion.svg'

gsap.registerPlugin(ScrollTrigger)

const FLOWS = [
  { id: 'onboarding', label: 'Onboarding Redesign' },
  { id: 'ordering', label: 'Home Page Redesign' },
  { id: 'edgecases', label: 'Edge Case UI Design' },
]

const TOC_DATA = {
  onboarding: ['Onboarding Flow', 'Tools used', 'Existing Authentication problem', 'Design Goals', 'UX Thinking', 'Redesigned UI', 'Final Outcome'],
  ordering: ['Intro', 'Existing Experience Audit', 'Research & Benchmarking', 'Design Goals', 'UX Thinking', 'Redesigned UI', 'Key Improvements', 'Final Outcome'],
  edgecases: ['Problem Context', 'Why Edge Cases Matter', 'UX Gaps & User Frustrations', 'Recovery UX Strategy', 'Designed Screens', 'CTA & Visual Design Thinking', 'Product Impact', 'Learnings']
}

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-')

// ── MODERN MONOCHROME ICON COMPONENTS ────────────────────────────────────
const LightningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
)

const SmartphoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
)

const RocketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 5l-7.5 7.5L3 17l4.5-1.5L15 8M19 5l-5 5M9 14l5-5" />
    <path d="M13.5 6.5l4-4c1-1 2.5-.5 3 0s1 2 0 3l-4 4" />
    <path d="M19 9c1.5 2 1.5 5.5 0 8.5" />
  </svg>
)

const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const TrendingDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
)

const MessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const LightbulbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
  </svg>
)

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const PaletteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03345 19.1749 5.0999 19.4326 5.02704 19.6687L4.70836 20.7011C4.54924 21.2166 4.93282 21.75 5.47214 21.75H12V22Z" />
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
  </svg>
)

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const PencilIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
)

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const WifiOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.5" />
    <path d="M5 12.5a10.94 10.94 0 0 1 5.17-2.39" />
    <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
)

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const PackageXIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
    <line x1="17" y1="17" x2="22" y2="22" />
    <line x1="22" y1="17" x2="17" y2="22" />
  </svg>
)

const AlertTriangleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)


const FlowSection = ({ title, children }) => (
  <section id={slugify(title)} className="gw-flow-section">
    <h3 className="gw-flow-section-title">{title}</h3>
    <div className="gw-flow-section-content">
      {children}
    </div>
  </section>
)

const ThreeMockups = ({ mockups }) => (
  <div className="gw-three-mockups">
    {mockups.map((m, i) => (
      <div key={i} className="gw-mockup-col">
        <div className="gw-mockup-device">
          <div className={`gw-mockup-screen ${m.image ? 'has-image' : ''}`}>
            {m.image && <img src={m.image} alt={m.caption} className="gw-mockup-img" />}
          </div>
        </div>
        <p className="gw-mockup-caption">{m.caption}</p>
      </div>
    ))}
  </div>
)

const TwoMockups = ({ mockups }) => (
  <div className="gw-two-mockups">
    {mockups.map((m, i) => (
      <div key={i} className="gw-mockup-col">
        <div className="gw-mockup-device">
          <div className={`gw-mockup-screen ${m.image ? 'has-image' : ''}`}>
            {m.image && <img src={m.image} alt={m.caption} className="gw-mockup-img" />}
          </div>
        </div>
        <p className="gw-mockup-caption">{m.caption}</p>
      </div>
    ))}
  </div>
)

const EdgeMockups = ({ mockups }) => (
  <div className="gw-edge-mockups">
    {mockups.map((m, i) => (
      <div key={i} className="gw-mockup-col">
        <div className="gw-mockup-device">
          <div className={`gw-mockup-screen ${m.image ? 'has-image' : ''}`}>
            {m.image && <img src={m.image} alt={m.caption} className="gw-mockup-img" />}
          </div>
        </div>
        <p className="gw-mockup-caption">{m.caption}</p>
      </div>
    ))}
  </div>
)

const AuditProblemCard = ({ number, title, description, tag }) => (
  <div className="ord-audit-card">
    <div className="ord-audit-card-top">
      <span className="ord-audit-number">{number}</span>
      <span className="ord-audit-tag">{tag}</span>
    </div>
    <h4 className="ord-audit-title">{title}</h4>
    <p className="ord-audit-desc">{description}</p>
  </div>
)

const CompetitorCard = ({ name, category, insights }) => (
  <div className="ord-competitor-card">
    <div className="ord-competitor-header">
      <span className="ord-competitor-name">{name}</span>
      <span className="ord-competitor-category">{category}</span>
    </div>
    <ul className="ord-competitor-insights">
      {insights.map((ins, i) => <li key={i}>{ins}</li>)}
    </ul>
  </div>
)

const GoalCard = ({ icon, title, description }) => (
  <div className="ord-goal-card">
    <div className="ord-goal-icon">{icon}</div>
    <h4 className="ord-goal-title">{title}</h4>
    <p className="ord-goal-desc">{description}</p>
  </div>
)

const InsightCard = ({ question, answer }) => (
  <div className="ord-insight-card">
    <p className="ord-insight-q">{question}</p>
    <p className="ord-insight-a">{answer}</p>
  </div>
)

const ImprovementCard = ({ icon, title, description }) => (
  <div className="ord-improvement-card">
    <span className="ord-improvement-icon">{icon}</span>
    <div>
      <h5 className="ord-improvement-title">{title}</h5>
      <p className="ord-improvement-desc">{description}</p>
    </div>
  </div>
)

const OnboardingFlow = () => (
  <div className="gw-flow-wrapper">
    <FlowSection title="Onboarding Flow">
      <p className="gw-body">The previous Grubwala onboarding experience relied on traditional username and password authentication, creating unnecessary friction during sign-up and login. The process felt time-consuming for mobile-first users and increased the effort required to access the platform. Multiple input fields, slower authentication flow, and lack of streamlined interaction negatively impacted the overall first-time user experience.</p>
    </FlowSection>

    <FlowSection title="Tools used">
      <div className="gw-tools-used-grid">
        <div className="gw-tool-used-card">
          <img src={dribbbleIcon} alt="Dribbble" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">Dribbble</span>
        </div>
        <div className="gw-tool-used-card">
          <img src={pinterestIcon} alt="Pinterest" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">Pinterest</span>
        </div>
        <div className="gw-tool-used-card">
          <img src={figmaIcon} alt="Figma" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">Figma</span>
        </div>
        <div className="gw-tool-used-card">
          <img src={uxpilotIcon} alt="UX Pilot" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">UX Pilot</span>
        </div>
        <div className="gw-tool-used-card">
          <img src={chatgptIcon} alt="ChatGPT" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">ChatGPT</span>
        </div>
        <div className="gw-tool-used-card">
          <img src={geminiIcon} alt="Google Gemini" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">Google Gemini</span>
        </div>
        <div className="gw-tool-used-card">
          <img src={slackIcon} alt="Slack" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">Slack</span>
        </div>
        <div className="gw-tool-used-card">
          <img src={trelloIcon} alt="Trello" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">Trello</span>
        </div>
        <div className="gw-tool-used-card">
          <img src={mediumIcon} alt="Medium" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">Medium</span>
        </div>
        <div className="gw-tool-used-card">
          <img src={notionIcon} alt="Notion" className="gw-tool-used-icon" />
          <span className="gw-tool-used-name">Notion</span>
        </div>
      </div>
    </FlowSection>

    <FlowSection title="Existing Authentication problem">
      <p className="gw-body" style={{ marginBottom: '2.5rem' }}>The previous Grubwala onboarding experience relied on traditional username and password authentication, creating unnecessary friction during sign-up and login. The process felt time-consuming for mobile-first users and increased the effort required to access the platform. Multiple input fields, slower authentication flow, and lack of streamlined interaction negatively impacted the overall first-time user experience.</p>

      <ThreeMockups mockups={[
        { caption: 'Sign Up', image: signupMockup },
        { caption: 'Login', image: loginMockup },
        { caption: 'OTP Verification', image: otpMockup }
      ]} />

      <h5 className="gw-sub-heading" style={{ marginTop: '3.5rem', marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 700 }}>Problems Identified</h5>
      <div className="ord-audit-grid">
        <AuditProblemCard number="01" tag="Friction" title="Excessive Fields" description="Too many input fields during registration significantly increased interaction effort and session drop-offs." />
        <AuditProblemCard number="02" tag="Latency" title="Traditional Passwords" description="Username and password login authentication slowed down the access speed for returning users." />
        <AuditProblemCard number="03" tag="Hierarchy" title="Weak Scan Path" description="Low typographic contrast and poor input styling made the layout hard to read and scan quickly." />
        <AuditProblemCard number="04" tag="Context" title="Sub-optimal Mobile UX" description="Tap targets and verification fields were not comfortably optimized for single-handed mobile usage." />
      </div>
    </FlowSection>

    <FlowSection title="Design Goals">
      <div className="ord-goals-grid">
        <GoalCard icon={<LightningIcon />} title="Reduce Friction" description="Minimize user input actions to make sign-up and login near-instantaneous." />
        <GoalCard icon={<KeyIcon />} title="Simplify Auth" description="Introduce a secure OTP-based mobile authentication flow as the primary login." />
        <GoalCard icon={<SmartphoneIcon />} title="Mobile Usability" description="Optimize layout contrast, typography, and interactive targets for mobile viewports." />
        <GoalCard icon={<RocketIcon />} title="Faster Access" description="Ensure users bypass unnecessary steps to access homechef content in seconds." />
      </div>
    </FlowSection>

    <FlowSection title="UX Thinking">
      <p className="gw-body">The redesign focused on aligning the onboarding experience with mobile-first user behavior. Since most users prefer quick authentication methods, the onboarding flow was simplified using mobile number + OTP verification instead of traditional username/password login.</p>
      <p className="gw-body" style={{ marginBottom: '2.5rem' }}>The interface hierarchy was redesigned to reduce cognitive load and improve readability. Minimal input fields, clearer CTA visibility, and simplified interaction patterns helped create a faster and more accessible onboarding journey.</p>
      <h5 className="gw-sub-heading" style={{ marginTop: '2.5rem', marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 700 }}>Key UX Decisions</h5>
      <div className="ord-goals-grid">
        <GoalCard icon={<SmartphoneIcon />} title="Phone-First Login" description="Increases convenience and bypasses legacy username creation." />
        <GoalCard icon={<KeyIcon />} title="One-Time Passcode" description="Secures the account while removing password creation/recovery friction." />
        <GoalCard icon={<LayersIcon />} title="Minimal Interface" description="Hides tertiary options during auth to keep cognitive load low." />
        <GoalCard icon={<TrendingUpIcon />} title="Clear Progressions" description="Shows inline hints and clear button states for sequential focus." />
      </div>
    </FlowSection>

    <FlowSection title="Redesigned UI">
      <p className="gw-body" style={{ marginBottom: '2.5rem' }}>The redesigned onboarding flow focused on simplicity, speed, and usability. The new experience introduced OTP-based authentication, cleaner layouts, and reduced interaction complexity for faster onboarding.</p>
      <h5 className="gw-sub-heading" style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 700 }}>Redesigned Features</h5>
      <div className="ord-improvements-grid" style={{ marginBottom: '3rem' }}>
        <ImprovementCard icon={<SparklesIcon />} title="OTP Authentication" description="Bypass passwords entirely with high-speed verification." />
        <ImprovementCard icon={<DocumentIcon />} title="Single-Action Screens" description="Focused entry inputs that prevent visual cognitive load." />
        <ImprovementCard icon={<PencilIcon />} title="Refined Typography" description="Improved font weight hierarchy and clearer text styling." />
        <ImprovementCard icon={<TargetIcon />} title="Minimal Inputs" description="Fewer form fields resulting in immediate focus and action." />
      </div>

      <TwoMockups mockups={[
        { caption: 'Log in or sign up', image: redesignLoginMockup },
        { caption: 'OTP Verification', image: redesignOtpMockup }
      ]} />

      <h5 className="gw-sub-heading" style={{ marginTop: '3.5rem', marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 700 }}>Key Improvements</h5>
      <div className="ord-improvements-grid">
        <ImprovementCard icon={<CheckIcon />} title="Reduced Friction" description="Minimized sign-up fields resulting in fewer user drop-offs." />
        <ImprovementCard icon={<CheckIcon />} title="Faster Sign-in" description="Users get verified and enter the main platform in under 10 seconds." />
        <ImprovementCard icon={<CheckIcon />} title="Clear Visual Path" description="Sleek, modern aesthetic with high contrast and predictable flow." />
        <ImprovementCard icon={<CheckIcon />} title="Simplified Steps" description="No secondary password confirmations or complex validations." />
      </div>
    </FlowSection>

    <FlowSection title="Final Outcome">
      <p className="gw-body">The redesigned onboarding experience created a faster and more seamless authentication flow optimized for mobile-first users.</p>
    </FlowSection>
  </div>
)

// ── ORDERING FLOW — PREMIUM REDESIGN ──────────────────────────────────────

const AUDIT_BUGS = [
  { tag: "Personalization", title: "No Personalized Recommendations", description: "Users saw the same generic content regardless of order history or preferences. No contextual relevance meant lower engagement, lower time-on-screen, and fewer completed orders." },
  { tag: "Retention", title: "Missing Order Again Experience", description: "Returning customers had no quick way to reorder. A key retention behavior was completely absent from the UI — forcing users to manually search for previously ordered items every time." },
  { tag: "Trust", title: "Dish Cards Missing Trust Indicators", description: "Cards showed no ratings, reviews, or delivery times — the three signals users rely on most before placing an order. Without them, confidence in the platform was significantly reduced." },
  { tag: "Fatigue", title: "Long Vertical Scrolling Experience", description: "All content stacked vertically created infinite scroll fatigue with no visual breaks or section grouping, making the experience feel overwhelming and unstructured." },
  { tag: "Discovery", title: "Missing Filters & Search Refinement", description: "No filtering by cuisine type, price range, or dietary preference made food discovery slow and frustrating, forcing users to scroll through irrelevant content to find what they wanted." },
  { tag: "Consistency", title: "Inconsistent Image Presentation & Slow Loading", description: "The Grubwala logo appeared in place of home chef images across several sections. Different image ratios and mismatched visual styles degraded the overall browsing experience and reduced interface reliability." },
  { tag: "Usability", title: "Sticky Header Overlapping Content", description: "The sticky header covered top-of-page content while scrolling, causing accidental misclicks and hiding important information that users needed to make ordering decisions." }
];

const DURATION = 7000;

// ── ACCORDION ITEM: GSAP height animation (replaces AnimatePresence height: auto) ──
const AccordionItem = ({ bug, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (tweenRef.current) tweenRef.current.kill();
    if (isOpen) {
      gsap.set(el, { height: 'auto', opacity: 1 });
      const fullH = el.scrollHeight;
      gsap.set(el, { height: 0, opacity: 0 });
      tweenRef.current = gsap.to(el, {
        height: fullH,
        opacity: 1,
        duration: 0.32,
        ease: 'power2.inOut',
        onComplete: () => gsap.set(el, { height: 'auto' }),
      });
    } else {
      tweenRef.current = gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: 'power2.inOut',
      });
    }
    return () => { if (tweenRef.current) tweenRef.current.kill(); };
  }, [isOpen]);

  return (
    <div className={`aud-accordion-item ${isOpen ? 'open' : ''}`}>
      <button
        className="aud-accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="aud-accordion-title">{bug.title}</span>
        <span className="aud-accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div ref={contentRef} className="aud-accordion-content" style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="aud-accordion-inner">
          <p className="aud-accordion-desc">{bug.description}</p>
        </div>
      </div>
    </div>
  );
};

const InteractiveAuditSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const intervalRef = useRef(null);
  const hoveredRef = useRef(false);
  // GSAP refs for progress bar and content panel
  const progressRef = useRef(null);
  const contentRef = useRef(null);
  const progressTweenRef = useRef(null);

  const goToNext = useCallback(() => {
    if (!hoveredRef.current) {
      setActiveIndex(prev => (prev + 1) % AUDIT_BUGS.length);
      setProgressKey(k => k + 1);
    }
  }, []);

  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(goToNext, DURATION);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, goToNext, activeIndex]);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 860) {
        setIsPaused(true);
      } else if (!hoveredRef.current) {
        setIsPaused(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP progress bar: replaces motion.div scaleX: 0→1
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    if (progressTweenRef.current) progressTweenRef.current.kill();
    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
    if (!isPaused) {
      progressTweenRef.current = gsap.to(el, {
        scaleX: 1,
        duration: DURATION / 1000,
        ease: 'none',
      });
    }
    return () => { if (progressTweenRef.current) progressTweenRef.current.kill(); };
  }, [progressKey, isPaused]);

  // GSAP content swap: replaces AnimatePresence mode="wait" content transition
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
      gsap.fromTo(el.querySelector('.aud-tag'),
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: 0.1 }
      );
      gsap.fromTo(el.querySelector('.aud-content-title'),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.15 }
      );
      gsap.fromTo(el.querySelector('.aud-content-desc'),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.22 }
      );
    }, el);
    return () => ctx.revert();
  }, [activeIndex]);

  const handleHoverIn = (index) => {
    hoveredRef.current = true;
    setIsPaused(true);
    setActiveIndex(index);
    setProgressKey(k => k + 1);
  };

  const handleHoverOut = () => {
    if (window.innerWidth <= 860) return;
    hoveredRef.current = false;
    setIsPaused(false);
    setProgressKey(k => k + 1);
  };

  return (
    <div className="aud-root">
      {/* DESKTOP TIMER SLIDER (Hidden on mobile) */}
      <div className="aud-desktop-layout">
        {/* LEFT — Menu list */}
        <div className="aud-left">
          {AUDIT_BUGS.map((bug, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className="aud-item"
                onMouseEnter={() => handleHoverIn(index)}
                onMouseLeave={handleHoverOut}
              >
                <span className={`aud-item-title ${isActive ? 'aud-active' : 'aud-inactive'}`}>
                  {bug.title}
                </span>
                {/* Track line — plain div, GSAP animates scaleX */}
                <div className="aud-track">
                  {isActive && (
                    <div
                      ref={progressRef}
                      className="aud-progress"
                      style={{ transformOrigin: 'left center', scaleX: 0 }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — Content panel — plain div, GSAP animates on activeIndex change */}
        <div className="aud-right">
          <div ref={contentRef} className="aud-content">
            <span className="aud-tag">{AUDIT_BUGS[activeIndex]?.tag}</span>
            <h4 className="aud-content-title">{AUDIT_BUGS[activeIndex]?.title}</h4>
            <p className="aud-content-desc">{AUDIT_BUGS[activeIndex]?.description}</p>
          </div>
        </div>
      </div>

      {/* MOBILE ACCORDION LAYOUT (Visible only on mobile/tablet) */}
      <div className="aud-mobile-accordion">
        {AUDIT_BUGS.map((bug, index) => (
          <AccordionItem
            key={index}
            bug={bug}
            isOpen={index === activeIndex}
            onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}

const OrderingFlow = () => (
  <div className="gw-flow-wrapper ord-premium-wrapper">

    {/* ── SECTION 1: INTRO / CONTEXT ── */}
    <section id="intro" className="gw-flow-section ord-intro-section">
      <div className="ord-intro-eyebrow">Homepage Redesign</div>
      <h3 className="ord-intro-headline">Improving Trust &amp;<br />Ordering Experience</h3>
      <p className="ord-intro-sub">
        Grubwala had strong download numbers — but customers weren't placing enough orders.
        After completing the onboarding redesign, an audit of the homepage experience
        revealed friction points that were eroding trust and slowing down ordering behavior.
      </p>

      <div className="ord-context-cards">
        <div className="ord-context-card">
          <span className="ord-context-card-icon"><TrendingDownIcon /></span>
          <div>
            <strong>Low Order Conversion</strong>
            <p>The app had significant downloads, but ordering rates were lower than expected.</p>
          </div>
        </div>
        <div className="ord-context-card">
          <span className="ord-context-card-icon"><MessageIcon /></span>
          <div>
            <strong>Client Insight</strong>
            <p>Client flagged trust, usability, and homepage experience as the primary concerns.</p>
          </div>
        </div>
        <div className="ord-context-card">
          <span className="ord-context-card-icon"><EyeIcon /></span>
          <div>
            <strong>Audit Scope</strong>
            <p>Started after the onboarding redesign. Focus: improve trust signals and discoverability.</p>
          </div>
        </div>
      </div>
    </section>

    {/* ── SECTION 2: EXISTING EXPERIENCE AUDIT ── */}
    <section id="existing-experience-audit" className="gw-flow-section ord-audit-section">
      <h3 className="ord-section-headline">Existing Experience Audit</h3>
      <p className="ord-section-sub">
        A systematic review of the existing homepage revealed 7 key UX problems
        affecting customer confidence and ordering behavior. Each problem was mapped
        to its impact on the user journey.
      </p>
      <InteractiveAuditSection />
    </section>

    {/* ── SECTION 3: RESEARCH & BENCHMARKING ── */}
    <section id="research-benchmarking" className="gw-flow-section ord-research-section">
      <h3 className="ord-section-headline">Research &amp; Benchmarking</h3>
      <p className="ord-section-sub">
        To ground design decisions in proven patterns, I analyzed six apps across
        food delivery and quick-commerce. Direct competitors were analyzed for ordering patterns.
        Non-direct competitors (Blinkit, Zepto) were studied for their world-class
        ecommerce trust and discoverability UX.
      </p>

      <div className="ord-research-note">
        <span className="ord-research-note-icon"><LightbulbIcon /></span>
        <p>Although <strong>Blinkit</strong> and <strong>Zepto</strong> are not direct food delivery competitors, they were analyzed for their exceptional ecommerce UX — specifically around <strong>trust signals</strong>, <strong>fast decision-making</strong>, <strong>discoverability</strong>, and <strong>customer satisfaction</strong> patterns.</p>
      </div>

      <div className="ord-competitor-grid">
        <CompetitorCard name="Cookr" category="Direct Competitor" insights={["Home-chef trust storytelling", "Meal plan personalization", "Clear dietary filter chips", "Chef profile cards for trust"]} />
        <CompetitorCard name="Mealawe" category="Direct Competitor" insights={["Minimal, editorial card design", "Curated collection grouping", "Strong typography hierarchy", "Clean horizontal browsing"]} />
        <CompetitorCard name="Swiggy" category="Food Delivery Reference" insights={["Category chip filters above fold", "Personalized 'Order Again' rail", "Star ratings on every card", "Delivery time as primary trust signal"]} />
        <CompetitorCard name="Zomato" category="Food Delivery Reference" insights={["Horizontal category carousels", "Pro badge trust system", "Consistent card grid system", "Search + Filter always accessible"]} />
        <CompetitorCard name="Blinkit" category="UX Reference" insights={["Near-instant delivery trust badge", "Category grid with strong icons", "Promotional banners with clear CTA", "Offer tags on every product card"]} />
        <CompetitorCard name="Zepto" category="UX Reference" insights={["10-minute delivery as trust anchor", "Inventory confidence indicators", "Smart category surfacing", "Order again prominent placement"]} />
      </div>
    </section>

    {/* ── SECTION 4: DESIGN GOALS ── */}
    <section id="design-goals" className="gw-flow-section ord-goals-section">
      <h3 className="ord-section-headline">Design Goals</h3>
      <p className="ord-section-sub">
        Based on the audit and research, five design goals were defined to guide
        every UI and UX decision in the redesign.
      </p>
      <div className="ord-goals-grid">
        <GoalCard icon={<ShieldIcon />} title="Improve Trust Signals" description="Surface ratings, delivery times, and reviews prominently on every dish card to build ordering confidence." />
        <GoalCard icon={<SparklesIcon />} title="Increase Personalization" description="Introduce contextual sections like 'Order Again' and 'Recommended for You' based on user behavior." />
        <GoalCard icon={<SearchIcon />} title="Simplify Food Discovery" description="Add horizontal carousels and filter chips to reduce scrolling and improve category navigation." />
        <GoalCard icon={<LightningIcon />} title="Reduce Scrolling Fatigue" description="Break long vertical lists into scannable horizontal sections with clear visual grouping." />
        <GoalCard icon={<PaletteIcon />} title="Improve UI Consistency" description="Define a unified card system with consistent spacing, type scale, and visual hierarchy across all modules." />
      </div>
    </section>

    {/* ── SECTION 5: UX THINKING ── */}
    <section id="ux-thinking" className="gw-flow-section ord-thinking-section">
      <h3 className="ord-section-headline">UX Thinking</h3>
      <p className="ord-section-sub">
        Every design decision was grounded in user behavior research and competitive analysis.
        Here's the strategic rationale behind the key changes.
      </p>
      <div className="ord-insights-grid">
        <InsightCard question="Why personalized recommendations?" answer="Users convert faster when they see relevant content. Personalization reduces decision fatigue and improves repeat ordering behavior by surfacing what users already know they like." />
        <InsightCard question="Why ratings &amp; delivery time?" answer="Trust is built before the tap. Displaying star ratings and delivery ETAs on every card gives users the two signals they look for before committing to an order." />
        <InsightCard question="Why horizontal carousels?" answer="Vertical scroll is infinite and exhausting. Horizontal carousels create bounded, scannable sections that improve content discoverability without increasing perceived page length." />
        <InsightCard question="Why an 'Order Again' section?" answer="Returning users are the highest-converting segment. A dedicated reorder section removes the effort of rediscovery and makes familiar choices instantly accessible." />
        <InsightCard question="Why filters?" answer="Food choice is preference-driven. Filter chips for cuisine type, price, and dietary needs reduce the search friction and help users reach a decision 3x faster." />
        <InsightCard question="Why a consistent card system?" answer="Inconsistency signals unprofessionalism. A unified card grid creates a predictable, trustworthy visual language across the entire homepage — improving scannability and confidence." />
      </div>
    </section>

    {/* ── SECTION 6: REDESIGNED EXPERIENCE ── */}
    <section id="redesigned-ui" className="gw-flow-section ord-redesign-section">
      <h3 className="ord-section-headline">Redesigned Experience</h3>
      <p className="ord-section-sub">
        The redesigned homepage introduced a more personalized, trust-driven, and
        visually consistent experience — structured around how users actually discover and order food.
      </p>

      <div className="ord-ba-grid">
        <div className="ord-ba-panel ord-ba-before">
          <div className="ord-ba-label ord-ba-label-before">Before</div>
          <ul className="ord-ba-list">
            <li>Generic content with no personalization</li>
            <li>No ratings or delivery time on cards</li>
            <li>Infinite vertical scroll, no filters</li>
            <li>No 'Order Again' for returning users</li>
            <li>Inconsistent card sizes and spacing</li>
            <li>Sticky header covering content</li>
          </ul>
        </div>
        <div className="ord-ba-panel ord-ba-after">
          <div className="ord-ba-label ord-ba-label-after">After</div>
          <ul className="ord-ba-list">
            <li>Personalized 'Recommended for You' section</li>
            <li>Star ratings + delivery ETA on every card</li>
            <li>Horizontal carousels + filter chips above fold</li>
            <li>Prominent 'Order Again' rail for returning users</li>
            <li>Unified card system with consistent hierarchy</li>
            <li>Fixed sticky header with proper safe-zone offset</li>
          </ul>
        </div>
      </div>

      <div className="ord-redesign-features">
        <div className="ord-feature-row">
          <div className="ord-feature-text">
            <span className="ord-feature-number">01</span>
            <h4>Personalized Recommendations</h4>
            <p>A dedicated "Recommended for You" section surfaces dishes based on order history and user preferences — right at the top of the homepage.</p>
          </div>
          <div className="ord-feature-visual ord-feature-visual--personalized">
            <div className="ord-mock-card"><div className="ord-mock-img" /><div className="ord-mock-info"><div className="ord-mock-title" /><div className="ord-mock-meta"><span className="ord-mock-star">★ 4.8</span><span className="ord-mock-time">25 min</span></div></div></div>
            <div className="ord-mock-card ord-mock-card--active"><div className="ord-mock-img ord-mock-img--2" /><div className="ord-mock-info"><div className="ord-mock-title" /><div className="ord-mock-meta"><span className="ord-mock-star">★ 4.6</span><span className="ord-mock-time">18 min</span></div></div></div>
            <div className="ord-mock-card"><div className="ord-mock-img ord-mock-img--3" /><div className="ord-mock-info"><div className="ord-mock-title" /><div className="ord-mock-meta"><span className="ord-mock-star">★ 4.9</span><span className="ord-mock-time">30 min</span></div></div></div>
          </div>
        </div>

        <div className="ord-feature-row">
          <div className="ord-feature-text">
            <span className="ord-feature-number">02</span>
            <h4>Order Again Carousel</h4>
            <p>Returning customers see their previous orders in a horizontal carousel — reducing the friction of rediscovery and accelerating repeat ordering behavior.</p>
          </div>
          <div className="ord-feature-visual ord-feature-visual--reorder">
            <div className="ord-reorder-section">
              <div className="ord-reorder-label">Order Again</div>
              <div className="ord-reorder-chips">
                <span className="ord-reorder-chip">🍕 Pepperoni Pizza</span>
                <span className="ord-reorder-chip ord-reorder-chip--active">🍔 Chicken Burger</span>
                <span className="ord-reorder-chip">🥗 Caesar Salad</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ord-feature-row">
          <div className="ord-feature-text">
            <span className="ord-feature-number">03</span>
            <h4>Trust-Infused Dish Cards</h4>
            <p>Every dish card now displays star rating, delivery ETA, and price — the three signals users rely on most before placing an order.</p>
          </div>
          <div className="ord-feature-visual ord-feature-visual--trust">
            <div className="ord-trust-card">
              <div className="ord-trust-img" />
              <div className="ord-trust-info">
                <div className="ord-trust-name">Grilled Chicken Bowl</div>
                <div className="ord-trust-signals">
                  <span className="ord-trust-rating">★ 4.8 (320)</span>
                  <span className="ord-trust-dot">·</span>
                  <span className="ord-trust-time">🕐 22 min</span>
                  <span className="ord-trust-dot">·</span>
                  <span className="ord-trust-price">₹249</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ord-feature-row">
          <div className="ord-feature-text">
            <span className="ord-feature-number">04</span>
            <h4>Filter Chips + Category Navigation</h4>
            <p>A row of filter chips above the fold lets users quickly narrow by cuisine type, dietary preference, or price — making food discovery 3× faster.</p>
          </div>
          <div className="ord-feature-visual ord-feature-visual--filters">
            <div className="ord-filter-row">
              <span className="ord-filter-chip ord-filter-chip--active">All</span>
              <span className="ord-filter-chip">🍕 Pizza</span>
              <span className="ord-filter-chip">🍔 Burgers</span>
              <span className="ord-filter-chip">🥗 Healthy</span>
              <span className="ord-filter-chip">🍜 Asian</span>
              <span className="ord-filter-chip">🌮 Mexican</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── SECTION 7: KEY IMPROVEMENTS ── */}
    <section id="key-improvements" className="gw-flow-section ord-improvements-section">
      <h3 className="ord-section-headline">Key Improvements</h3>
      <div className="ord-improvements-grid">
        <ImprovementCard icon={<CheckIcon />} title="Better Personalization" description="Contextual sections surface relevant content based on user history and preferences." />
        <ImprovementCard icon={<CheckIcon />} title="Improved Trust Signals" description="Ratings, delivery times, and reviews now appear on every dish card — building ordering confidence." />
        <ImprovementCard icon={<CheckIcon />} title="Faster Food Discovery" description="Horizontal carousels and filter chips reduce scroll depth and accelerate browsing decisions." />
        <ImprovementCard icon={<CheckIcon />} title="Reduced Cognitive Load" description="A unified card system and clear visual grouping eliminate unnecessary decision fatigue." />
        <ImprovementCard icon={<CheckIcon />} title="Improved Visual Hierarchy" description="Clear typographic scale and content structure guide the eye naturally through the page." />
        <ImprovementCard icon={<CheckIcon />} title="Cleaner UI Consistency" description="A unified design language across all modules creates a trustworthy, premium-feeling interface." />
      </div>
    </section>

    {/* ── SECTION 8: FINAL OUTCOME ── */}
    <section id="final-outcome" className="gw-flow-section ord-outcome-section">
      <h3 className="ord-outcome-headline">A More Trustworthy,<br />Discoverable Experience</h3>
      <p className="ord-outcome-body">
        The homepage redesign focused on improving trust, discoverability, and usability
        through a cleaner and more personalized experience. By simplifying navigation,
        introducing stronger trust indicators, and creating a more organized visual hierarchy,
        the redesign created a more engaging and confidence-driven ordering journey.
      </p>
      <div className="ord-outcome-tags">
        <span className="ord-outcome-tag">Trust-First Design</span>
        <span className="ord-outcome-tag">Personalized Experience</span>
        <span className="ord-outcome-tag">Reduced Friction</span>
        <span className="ord-outcome-tag">Improved Discoverability</span>
      </div>
    </section>

  </div>
)


const EdgeCaseCard = ({ icon, title, problem, solution }) => (
  <div className="gw-info-card edge-case-card">
    <div className="edge-case-header">
      <span className="edge-case-icon">{icon}</span>
      <h4>{title}</h4>
    </div>
    <div className="edge-case-body">
      <p><strong>Problem:</strong> {problem}</p>
      <p><strong>Solution:</strong> {solution}</p>
    </div>
  </div>
)

const EdgeCaseFlow = () => (
  <div className="gw-flow-wrapper ord-premium-wrapper">

    {/* ── SECTION 1: PROBLEM CONTEXT ── */}
    <section id="problem-context" className="gw-flow-section ord-intro-section">
      <div className="ord-intro-eyebrow">Edge Case UX Design</div>
      <h3 className="ord-intro-headline">Designing Recovery<br />Experiences That Retain</h3>
      <p className="ord-intro-sub">
        Users don't abandon apps because of bugs. They abandon apps because dead-end screens offer no guidance, no clarity, and no next step. For Grubwala — a home-chef food delivery platform — I designed recovery experiences for six critical inactive states where users were silently dropping off.
      </p>

      <div className="ord-context-cards">
        <div className="ord-context-card">
          <span className="ord-context-card-icon"><TrendingDownIcon /></span>
          <div>
            <strong>Silent Drop-offs</strong>
            <p>Users hitting empty carts, closed kitchens, and expired subscriptions were leaving without any recovery prompt.</p>
          </div>
        </div>
        <div className="ord-context-card">
          <span className="ord-context-card-icon"><MessageIcon /></span>
          <div>
            <strong>Product Gap</strong>
            <p>The existing app had no designed states for inactive, empty, or expired scenarios — every edge case was a dead end.</p>
          </div>
        </div>
        <div className="ord-context-card">
          <span className="ord-context-card-icon"><EyeIcon /></span>
          <div>
            <strong>Design Scope</strong>
            <p>Six edge-case screens: Empty Cart, Kitchen Closed, No Active Orders, No Meals Scheduled, Subscription Expired, No Active Subscription.</p>
          </div>
        </div>
      </div>
    </section>

    {/* ── SECTION 2: WHY EDGE CASES MATTER ── */}
    <FlowSection title="Why Edge Cases Matter">
      <p className="gw-body" style={{ marginBottom: '2rem' }}>
        Most design portfolios show the happy path. But the moments that define product quality — and retention — are the ones where something goes wrong. A user opening an empty cart is not a design failure. Showing them a blank screen with no direction <em>is</em>.
      </p>

      <div className="ord-insights-grid">
        <InsightCard question="Why do inactive states matter?" answer="Every empty or error screen is a fork in the road. Without guidance, users close the app. With a clear recovery action, they stay. These moments directly impact session depth, return rates, and lifetime value." />
        <InsightCard question="Why not just show default screens?" answer="Default empty states feel impersonal and broken. Designed states with illustrations, context, and CTAs reframe the moment from 'something went wrong' to 'here's what you can do next' — preserving trust instead of eroding it." />
        <InsightCard question="What's the retention risk?" answer="On food delivery platforms, a single bad experience during a high-intent moment (ordering, subscribing) can permanently shift a user to a competitor. Edge cases are retention-critical touchpoints." />
        <InsightCard question="How do edge cases affect business metrics?" answer="Undesigned dead ends increase support tickets, lower NPS, reduce repeat orders, and inflate churn. Thoughtful recovery UX turns these into re-engagement opportunities instead." />
      </div>
    </FlowSection>

    {/* ── SECTION 3: UX GAPS & USER FRUSTRATIONS ── */}
    <FlowSection title="UX Gaps & User Frustrations">
      <p className="gw-body" style={{ marginBottom: '1rem' }}>
        I audited six key surfaces in the Grubwala app where users encounter inactive or empty states. In every case, the existing experience was either a blank screen or a generic system message with no actionable guidance.
      </p>
      <p className="ord-section-sub" style={{ marginBottom: '2.5rem' }}>
        Below are the six scenarios I identified, mapped against the user's emotional state and the product risk each one carries:
      </p>

      <div className="edge-case-grid">
        <EdgeCaseCard
          icon={<SmartphoneIcon />}
          title="Empty Cart"
          problem="User taps the Cart tab with nothing added. Sees a blank white screen. No guidance, no warmth, no reason to keep browsing."
          solution="A friendly illustration + conversational copy ('Your cart is empty — let's add something homemade and delicious!') with a single Explore CTA to reduce the distance back to browsing."
        />
        <EdgeCaseCard
          icon={<AlertTriangleIcon />}
          title="Kitchen Closed"
          problem="User finds a home chef they want to order from — but the kitchen is closed. No timing info, no alternative, no next step."
          solution="Clear status messaging with exact reopening time ('Opens again at 7:00 AM'), two contextual CTAs: Schedule for later, or Notify Me when open — turning a dead end into a deferred conversion."
        />
        <EdgeCaseCard
          icon={<LayersIcon />}
          title="No Meals Scheduled"
          problem="User opens the Schedule tab for the first time. Empty state with zero guidance reduces the chance they'll explore subscription plans."
          solution="Warm illustration with onboarding-style copy ('No meals scheduled yet. Choose your meals to start your plan.') + direct Browse Plans CTA — framing emptiness as an invitation, not a failure."
        />
        <EdgeCaseCard
          icon={<RocketIcon />}
          title="Subscription Expired"
          problem="Returning subscriber lands on the Subscription page to find their plan is gone. No renewal prompt, no context — just emptiness."
          solution="Empathetic copy ('Your plan has expired. Renew to continue enjoying fresh homemade meals.') with a single Browse Plans CTA — making renewal the obvious and frictionless next step."
        />
      </div>
    </FlowSection>

    {/* ── SECTION 4: RECOVERY UX STRATEGY ── */}
    <FlowSection title="Recovery UX Strategy">
      <p className="gw-body" style={{ marginBottom: '0.75rem' }}>
        Every recovery screen was designed around a framework I call <strong>Acknowledge → Orient → Act</strong>:
      </p>
      <p className="gw-body" style={{ marginBottom: '2rem' }}>
        <strong>Acknowledge</strong> what happened (honest, plain-language messaging). <strong>Orient</strong> the user emotionally (warm illustration, no alarm). <strong>Act</strong> on a single clear next step (one primary CTA per screen).
      </p>

      <div className="ord-goals-grid">
        <GoalCard icon={<ShieldIcon />} title="Honest Communication" description="No vague 'Something went wrong.' Every screen tells the user exactly what state they're in and why — building trust through transparency." />
        <GoalCard icon={<SparklesIcon />} title="Emotional Warmth" description="Custom illustrations replace cold error layouts. The visual tone says 'this is normal' instead of 'this is broken' — reducing frustration at the subconscious level." />
        <GoalCard icon={<LightningIcon />} title="Single Recovery Action" description="One primary CTA per screen. No decision paralysis at a frustrating moment. Explore, Browse Plans, Notify Me — each guides the user's next behavior." />
        <GoalCard icon={<SearchIcon />} title="Contextual Alternatives" description="Kitchen Closed doesn't just say 'come back later.' It shows the exact reopening time and offers Schedule + Notify Me — converting dead ends into deferred intent." />
        <GoalCard icon={<PaletteIcon />} title="Visual Continuity" description="All edge-case screens maintain the bottom tab bar, consistent type hierarchy, and brand styling — so users never feel like they've left the product experience." />
        <GoalCard icon={<TargetIcon />} title="Retention-First Design" description="Every empty state is treated as a re-engagement surface, not a termination point. The goal is always: keep the user in the product funnel." />
      </div>
    </FlowSection>

    {/* ── SECTION 5: DESIGNED SCREENS ── */}
    <FlowSection title="Designed Screens">
      <p className="gw-body" style={{ marginBottom: '2.5rem' }}>Six purpose-built screens — each one a recovery moment designed to maintain trust, reduce uncertainty, and guide users toward their next action.</p>

      <EdgeMockups mockups={[
        { caption: 'Empty Cart', image: edgeCartEmpty },
        { caption: 'Kitchen Closed', image: edgeKitchenClosed },
        { caption: 'No Meals Scheduled', image: edgeNoMeals },
        { caption: 'Subscription Expired', image: edgeSubscriptionExpired },
        { caption: 'Kitchen Status', image: edgeCases },
      ]} />

      <h5 className="gw-sub-heading" style={{ marginTop: '3.5rem', marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 700 }}>Screen-by-Screen Rationale</h5>
      <div className="ord-improvements-grid">
        <ImprovementCard icon={<CheckIcon />} title="Empty Cart → Explore" description="Sad cart illustration + encouraging copy reframes emptiness as opportunity. Single 'Explore' CTA reduces distance back to browsing by eliminating navigation choices." />
        <ImprovementCard icon={<CheckIcon />} title="Kitchen Closed → Schedule / Notify" description="Dual CTA strategy: Schedule captures committed intent, Notify Me captures passive interest. Reopening time ('7:00 AM') adds precision that builds trust." />
        <ImprovementCard icon={<CheckIcon />} title="No Meals → Browse Plans" description="Onboarding-style framing guides first-time subscribers into the meal plan funnel. CTA language matches their intent stage — exploration, not commitment." />
        <ImprovementCard icon={<CheckIcon />} title="Subscription Expired → Renew" description="Empathetic tone avoids blame. 'Renew to continue enjoying...' frames renewal as continuity, not re-purchase — reducing psychological friction for lapsed subscribers." />
      </div>
    </FlowSection>

    {/* ── SECTION 6: CTA & VISUAL DESIGN THINKING ── */}
    <FlowSection title="CTA & Visual Design Thinking">
      <p className="gw-body" style={{ marginBottom: '2rem' }}>
        Every visual and interaction decision in these screens was driven by a specific behavioral goal. Nothing is decorative.
      </p>

      <div className="ord-insights-grid">
        <InsightCard question="Why soft illustrations instead of icons?" answer="Illustrations humanize failure states. A sad cart character creates empathy. A kitchen scene with a 'CLOSED' sign provides context instantly. Icons feel systemic and cold — illustrations feel personal and warm." />
        <InsightCard question="Why action-oriented CTA labels?" answer="'Explore' is better than 'Go Back.' 'Browse Plans' is better than 'View Subscriptions.' Every label was written from the user's intent perspective, not the system's — reducing cognitive translation effort." />
        <InsightCard question="Why minimal layouts?" answer="At a frustrating moment, visual complexity increases cognitive load. These screens use maximum whitespace, a single illustration, one message, and one CTA — the user's attention is never split." />
        <InsightCard question="Why preserve bottom navigation?" answer="Removing the tab bar during an edge case traps users in a dead end. Keeping Home, Cart, Track, Subscribe, and Profile always visible ensures users can always self-recover, even without the primary CTA." />
        <InsightCard question="Why show exact timing?" answer="'Opens again at 7:00 AM' is measurably more effective than 'Currently unavailable.' Specificity reduces uncertainty — and uncertainty is the primary driver of app abandonment during inactive states." />
        <InsightCard question="Why single CTA per screen?" answer="Hick's Law: more choices = slower decisions. At a frustrating moment, decision paralysis is the enemy. One CTA per screen means zero decision cost for the user — they either tap it or pivot via the tab bar." />
      </div>
    </FlowSection>

    {/* ── SECTION 7: PRODUCT IMPACT ── */}
    <section id="product-impact" className="gw-flow-section ord-outcome-section">
      <h3 className="ord-outcome-headline">Turning Dead Ends<br />Into Re-engagement</h3>
      <p className="ord-outcome-body">
        These screens aren't just better empty states — they're retention surfaces. Each one transforms a moment where users would silently leave into an opportunity to guide them back into the product. The result: fewer drop-offs, fewer support tickets, and higher session continuity across every edge case.
      </p>
      <div className="ord-outcome-tags">
        <span className="ord-outcome-tag">Recovery-First UX</span>
        <span className="ord-outcome-tag">Retention Design</span>
        <span className="ord-outcome-tag">Emotional Intelligence</span>
        <span className="ord-outcome-tag">Zero Dead Ends</span>
        <span className="ord-outcome-tag">CTA Optimization</span>
      </div>
    </section>

    {/* ── SECTION 8: LEARNINGS ── */}
    <FlowSection title="Learnings">
      <div className="ord-improvements-grid">
        <ImprovementCard icon={<CheckIcon />} title="Edge cases are product moments" description="Every inactive state is a micro-interaction that shapes how users perceive product quality. Ignoring them signals carelessness. Designing them signals craft." />
        <ImprovementCard icon={<CheckIcon />} title="Empty ≠ broken" description="The biggest shift was reframing empty states from 'nothing to show' to 'here's what to do next.' That single perspective change drove every design decision." />
        <ImprovementCard icon={<CheckIcon />} title="Retention starts at the edges" description="Core flows get the most design attention, but edge cases are where trust is won or lost. A user who hits a dead end once may never return. A user who's guided back will." />
        <ImprovementCard icon={<CheckIcon />} title="One CTA > three options" description="At moments of frustration, simplicity is kindness. Reducing choices to a single recovery action consistently outperforms multi-option layouts in conversion and satisfaction." />
      </div>
    </FlowSection>

  </div>
)

export default function CaseStudyGrubwala({ initialFlow = 'onboarding' }) {
  useSEO({
    title: 'Grubwala UX Case Study',
    description: 'How I redesigned Grubwala’s onboarding and homepage to improve trust signals, ordering conversion, and the mobile food-ordering experience.',
    canonical: '/case-study/grubwala',
    ogImage: '/og/og-grubwala.png',
  })
  const [activeFlow, setActiveFlow] = useState(initialFlow)
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (initialFlow) {
      setActiveFlow(initialFlow)
    }
  }, [initialFlow])

  const navContainerRef = useRef(null)
  const indicatorRef = useRef(null)
  const itemRefs = useRef({})
  const tocListRef = useRef(null)
  const tocIndicatorRef = useRef(null)
  const tocItemRefs = useRef({})

  useEffect(() => {
    const activeButton = itemRefs.current[activeFlow]
    const container = navContainerRef.current
    const indicator = indicatorRef.current

    if (activeButton && container && indicator) {
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()

      // Calculate scrolling offset of container just in case
      const scrollLeft = container.scrollLeft

      const left = buttonRect.left - containerRect.left + scrollLeft
      const width = buttonRect.width

      indicator.style.left = `${left}px`
      indicator.style.width = `${width}px`
      indicator.style.opacity = '1'
    }
  }, [activeFlow])

  // Slide the TOC indicator to the active item
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
  }, [activeSection, activeFlow])

  useEffect(() => {
    const handleResize = () => {
      const activeButton = itemRefs.current[activeFlow]
      const container = navContainerRef.current
      const indicator = indicatorRef.current

      if (activeButton && container && indicator) {
        const containerRect = container.getBoundingClientRect()
        const buttonRect = activeButton.getBoundingClientRect()
        const scrollLeft = container.scrollLeft

        indicator.style.left = `${buttonRect.left - containerRect.left + scrollLeft}px`
        indicator.style.width = `${buttonRect.width}px`
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeFlow])

  useEffect(() => {
    const handleScroll = () => {
      // Show sub-navbar after scrolling past the hero section
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.gw-hero-tag', '.gw-hero-title', '.gw-hero-sub', '.gw-meta-row'], {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1
      })
      gsap.from('.gw-hero-visual', { y: 70, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.gw-flow-section')
      let current = ''
      sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top
        if (top < 300) {
          current = sec.getAttribute('id')
        }
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeFlow])

  const renderActiveFlow = () => {
    switch (activeFlow) {
      case 'onboarding': return <OnboardingFlow />
      case 'ordering': return <OrderingFlow />
      case 'edgecases': return <EdgeCaseFlow />
      default: return <OnboardingFlow />
    }
  }

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 150
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="gw-page">



      {/* ── HERO ── */}
      <section className="gw-hero">
        <div className="gw-hero-content">
          <span className="gw-hero-tag">Mobile App · Food Delivery · End-to-End UX Redesign</span>
          <h1 className="gw-hero-title">Redesigning Grubwala's<br /><span className="gw-accent">Food Ordering</span><br />Experience</h1>
          <p className="gw-hero-sub">Simplifying onboarding, ordering, and edge cases through a mobile-first UX redesign that removes friction at every touchpoint.</p>
          <div className="gw-meta-row">
            {[['Role', 'UI/UX Designer'], ['Platform', 'iOS & Android'], ['Focus', 'End-to-End Redesign']].map(([l, v], i) => (
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
            <img src={grubwalaImage} alt="Grubwala Redesign" className="gw-hero-img" />
          </div>
        </div>
      </section>



      {/* ── MAIN CONTENT ── */}
      <div className="gw-main-content">

        <aside className="gw-toc-area">
          <div className="gw-toc-sticky">
            <h4 className="gw-toc-title">Table of Contents</h4>
            <ul className="gw-toc-list" ref={tocListRef}>
              {/* Sliding indicator bar */}
              <span className="gw-toc-indicator" ref={tocIndicatorRef} />
              {TOC_DATA[activeFlow].map((item, i) => {
                const id = slugify(item)
                return (
                  <li
                    key={i}
                    ref={el => (tocItemRefs.current[id] = el)}
                    className={`gw-toc-item ${activeSection === id ? 'active' : ''}`}
                  >
                    <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>{item}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        <div className="gw-flow-area">
          {renderActiveFlow()}
        </div>

      </div>

      {/* CTA */}
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

