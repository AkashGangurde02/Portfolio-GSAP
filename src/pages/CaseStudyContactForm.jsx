import { useEffect, useState, useRef, useCallback } from 'react'
import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/ui/Button'
import '../components/HomeSubNavbar.css'
import './CaseStudyContactForm.css'
import contactFormImage from '../images/case-studies/case-study-1/contact-redesign.jpg'
import wireframeImage from '../images/case-studies/case-study-1/wireframe.jpg'
import beforeImage from '../images/case-studies/case-study-1/before.jpg'
import afterImage from '../images/case-studies/case-study-1/after.jpg'
import Footer from '../components/Footer'

// Tool Icons
import figmaIcon from '../images/icons/tool_figma.svg'
import uxpilotIcon from '../images/icons/tool_ux.svg'
import chatgptIcon from '../images/icons/tool_chatgpt.svg'
import geminiIcon from '../images/icons/tool_gemini.svg'
import notionIcon from '../images/icons/tool_notion.svg'

gsap.registerPlugin(ScrollTrigger)

const FLOWS = [
  { id: 'discovery', label: 'Discovery & Research' },
  { id: 'redesign', label: 'Structural & UI Redesign' },
  { id: 'refinement', label: 'UI Refinement & Outcomes' },
]

const TOC_DATA = {
  discovery: ['Project Goal', 'Challenges', 'Tools used', 'Audit problems', 'Discovery phases'],
  redesign: ['Design Goals', 'UX Thinking', 'The Split-Screen Approach', 'Wireframes & Flow'],
  refinement: ['UI Refinement & Polish', 'Before vs After', 'Outcomes', 'Outro Quote']
}

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')

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

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const AUDIT_BUGS = [
  { tag: "Interaction Mismatch", title: "Phone Number Stepper", description: "The phone number input field utilized a numeric up/down quantity stepper. This allowed users to input negative values and completely broke real-world mental models of typing phone numbers." },
  { tag: "Formatting Friction", title: "No Country Code Selector", description: "The form lacked a country code dropdown or fallback. This led to formatting confusion for international customers who didn't know whether to include their local dial code." },
  { tag: "Feedback Latency", title: "Post-Submission Errors", description: "Unstructured, generic error states only appeared after submitting the entire form. This forced users to repeatedly search and fix fields, increasing friction." },
  { tag: "Overwhelming Length", title: "Monotonous Single-Column Layout", description: "All fields were stacked vertically in a single column. Related items (First/Last name) took up unnecessary vertical space, making the form feel twice as long." }
];

const FlowSection = ({ title, children }) => (
  <section id={slugify(title)} className="cfu-flow-section">
    <h3 className="cfu-flow-section-title">{title}</h3>
    <div className="cfu-flow-section-content">
      {children}
    </div>
  </section>
)

const AuditProblemCard = ({ number, title, description, tag }) => (
  <div className="cfu-audit-card">
    <div className="cfu-audit-card-top">
      <span className="cfu-audit-number">{number}</span>
      <span className="cfu-audit-tag">{tag}</span>
    </div>
    <h4 className="cfu-audit-title">{title}</h4>
    <p className="cfu-audit-desc">{description}</p>
  </div>
)

const GoalCard = ({ icon, title, description }) => (
  <div className="cfu-goal-card">
    <div className="cfu-goal-icon">{icon}</div>
    <h4 className="cfu-goal-title">{title}</h4>
    <p className="cfu-goal-desc">{description}</p>
  </div>
)

const InsightCard = ({ question, answer }) => (
  <div className="cfu-insight-card">
    <p className="cfu-insight-q">{question}</p>
    <p className="cfu-insight-a">{answer}</p>
  </div>
)

const ImprovementCard = ({ icon, title, description }) => (
  <div className="cfu-improvement-card">
    <span className="cfu-improvement-icon">{icon}</span>
    <div>
      <h5 className="cfu-improvement-title">{title}</h5>
      <p className="cfu-improvement-desc">{description}</p>
    </div>
  </div>
)

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
    <div className={`cfu-aud-accordion-item ${isOpen ? 'open' : ''}`}>
      <button
        className="cfu-aud-accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="cfu-aud-accordion-title">{bug.title}</span>
        <span className="cfu-aud-accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div ref={contentRef} className="cfu-aud-accordion-content" style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="cfu-aud-accordion-inner">
          <p className="cfu-aud-accordion-desc">{bug.description}</p>
        </div>
      </div>
    </div>
  );
};

const InteractiveAuditSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const intervalRef = useRef(null)
  const hoveredRef = useRef(false)
  // GSAP refs for progress bar and content panel
  const progressRef = useRef(null)
  const contentRef = useRef(null)
  const progressTweenRef = useRef(null)

  const DURATION = 7000

  const goToNext = useCallback(() => {
    if (!hoveredRef.current) {
      setActiveIndex(prev => (prev + 1) % AUDIT_BUGS.length)
      setProgressKey(k => k + 1)
    }
  }, [])

  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(goToNext, DURATION)
    return () => clearInterval(intervalRef.current)
  }, [isPaused, goToNext, activeIndex])

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 860) {
        setIsPaused(true)
      } else if (!hoveredRef.current) {
        setIsPaused(false)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // GSAP progress bar: replaces motion.div scaleX: 0→1
  useEffect(() => {
    const el = progressRef.current
    if (!el) return
    if (progressTweenRef.current) progressTweenRef.current.kill()
    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' })
    if (!isPaused) {
      progressTweenRef.current = gsap.to(el, {
        scaleX: 1,
        duration: DURATION / 1000,
        ease: 'none',
      })
    }
    return () => { if (progressTweenRef.current) progressTweenRef.current.kill() }
  }, [progressKey, isPaused])

  // GSAP content swap: replaces AnimatePresence mode="wait" content transition
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
      gsap.fromTo(el.querySelector('.cfu-aud-tag'),
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: 0.1 }
      )
      gsap.fromTo(el.querySelector('.cfu-aud-content-title'),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.15 }
      )
      gsap.fromTo(el.querySelector('.cfu-aud-content-desc'),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.22 }
      )
    }, el)
    return () => ctx.revert()
  }, [activeIndex])

  const handleHoverIn = (index) => {
    hoveredRef.current = true
    setIsPaused(true)
    setActiveIndex(index)
    setProgressKey(k => k + 1)
  }

  const handleHoverOut = () => {
    if (window.innerWidth <= 860) return
    hoveredRef.current = false
    setIsPaused(false)
    setProgressKey(k => k + 1)
  }

  return (
    <div className="cfu-aud-root">
      {/* DESKTOP TIMER SLIDER (Hidden on mobile) */}
      <div className="cfu-aud-desktop-layout">
        {/* LEFT — Menu list */}
        <div className="cfu-aud-left">
          {AUDIT_BUGS.map((bug, index) => {
            const isActive = index === activeIndex
            return (
              <div
                key={index}
                className="cfu-aud-item"
                onMouseEnter={() => handleHoverIn(index)}
                onMouseLeave={handleHoverOut}
              >
                <span className={`cfu-aud-item-title ${isActive ? 'cfu-aud-active' : 'cfu-aud-inactive'}`}>
                  {bug.title}
                </span>
                {/* Track line — plain div, GSAP animates scaleX */}
                <div className="cfu-aud-track">
                  {isActive && (
                    <div
                      ref={progressRef}
                      className="cfu-aud-progress"
                      style={{ transformOrigin: 'left center' }}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT — Content panel — plain div, GSAP animates on activeIndex change */}
        <div className="cfu-aud-right">
          <div ref={contentRef} className="cfu-aud-content">
            <span className="cfu-aud-tag">{AUDIT_BUGS[activeIndex]?.tag}</span>
            <h4 className="cfu-aud-content-title">{AUDIT_BUGS[activeIndex]?.title}</h4>
            <p className="cfu-aud-content-desc">{AUDIT_BUGS[activeIndex]?.description}</p>
          </div>
        </div>
      </div>

      {/* MOBILE ACCORDION LAYOUT (Visible only on mobile/tablet) */}
      <div className="cfu-aud-mobile-accordion">
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
  )
}

const DiscoveryFlow = () => (
  <div className="cfu-flow-wrapper">
    <FlowSection title="Project Goal">
      <p className="cfu-body" style={{ marginBottom: '2rem' }}>
        The main objective of this quick-turnaround UX sprint was to optimize a high-friction B2B SaaS contact form. The existing layout was causing high drop-off rates and cognitive overload, frustrating high-intent potential clients before they could reach out.
      </p>
      <div className="cfu-goals-grid">
        <GoalCard icon={<LightningIcon />} title="Reduce Cognitive Load" description="Optimize single-column clutter and structural formatting to make fields readable." />
        <GoalCard icon={<KeyIcon />} title="Fix Input Patterns" description="Eliminate stepper behaviors from numeric fields and ensure standard input formatting." />
        <GoalCard icon={<ShieldIcon />} title="Maintain Branding" description="Work rigidly within the existing color guidelines and backend database keys." />
        <GoalCard icon={<RocketIcon />} title="Inject Trust Signals" description="Highlight physical locations, active hours, and support channels contextually." />
      </div>
    </FlowSection>

    <FlowSection title="Challenges">
      <p className="cfu-body" style={{ marginBottom: '2rem' }}>
        Redesigning under strict constraints meant we could not alter backend API fields or drop necessary questions. We had to focus purely on structural usability, styling visual weight, and interaction-level optimization.
      </p>
      <div className="cfu-audit-grid">
        <AuditProblemCard number="01" tag="Mismatch" title="Stepper Control on Phone" description="The phone input field used a quantity stepper, leading to negative values and visual confusion." />
        <AuditProblemCard number="02" tag="Friction" title="Lack of Dial Codes" description="No country code formatting options created input layout issues for foreign leads." />
        <AuditProblemCard number="03" tag="Overload" title="Vertical Monotony" description="Stacked vertical layout forced double the scrolling and increased subjective completion time." />
        <AuditProblemCard number="04" tag="Latency" title="Post-Submit Validation" description="Error flags only appeared after submit clicks, rather than using inline real-time feedback." />
      </div>
    </FlowSection>

    <FlowSection title="Tools used">
      <div className="cfu-tools-used-grid">
        <div className="cfu-tool-used-card">
          <img src={figmaIcon} alt="Figma" className="cfu-tool-used-icon" />
          <span className="cfu-tool-used-name">Figma</span>
        </div>
        <div className="cfu-tool-used-card">
          <img src={uxpilotIcon} alt="UX Pilot" className="cfu-tool-used-icon" />
          <span className="cfu-tool-used-name">UX Pilot</span>
        </div>
        <div className="cfu-tool-used-card">
          <img src={chatgptIcon} alt="ChatGPT" className="cfu-tool-used-icon" />
          <span className="cfu-tool-used-name">ChatGPT</span>
        </div>
        <div className="cfu-tool-used-card">
          <img src={geminiIcon} alt="Google Gemini" className="cfu-tool-used-icon" />
          <span className="cfu-tool-used-name">Google Gemini</span>
        </div>
        <div className="cfu-tool-used-card">
          <img src={notionIcon} alt="Notion" className="cfu-tool-used-icon" />
          <span className="cfu-tool-used-name">Notion</span>
        </div>
      </div>
    </FlowSection>

    <FlowSection title="Audit problems">
      <p className="cfu-body" style={{ marginBottom: '2rem' }}>
        Hover over the core issues identified in our detailed UX audit to see how each design pattern negatively impacted user behavior and form completion rates.
      </p>
      <InteractiveAuditSection />
    </FlowSection>

    <FlowSection title="Discovery phases">
      <p className="cfu-body" style={{ marginBottom: '2rem' }}>
        We conducted our UX optimization sprint in four structured phases, using standard heuristic evaluation methods.
      </p>
      <div className="cfu-goals-grid">
        <GoalCard icon={<SmartphoneIcon />} title="01. Empathize & Audit" description="Step into the user's shoes. Test current submission layouts on various screen widths." />
        <GoalCard icon={<LayersIcon />} title="02. Define the Friction" description="Document every broken interaction and mapping error (like numeric spinners)." />
        <GoalCard icon={<SparklesIcon />} title="03. Ideate Solutions" description="Develop alternative layouts like split-panes, inline validation, and custom input fields." />
        <GoalCard icon={<CheckIcon />} title="04. Design Constraints" description="Refine selected assets strictly within corporate token limits and back-end fields." />
      </div>
    </FlowSection>
  </div>
)

const RedesignFlow = () => (
  <div className="cfu-flow-wrapper">
    <FlowSection title="Design Goals">
      <p className="cfu-body" style={{ marginBottom: '2rem' }}>
        To guide the visual and structural changes, we defined four core design goals targeting layout, interaction patterns, typography hierarchy, and trust:
      </p>
      <div className="cfu-goals-grid">
        <GoalCard icon={<ShieldIcon />} title="Reduce Visual Length" description="Organize inputs into structured grids and side-by-side components to make the form feel less daunting." />
        <GoalCard icon={<SparklesIcon />} title="Inject Direct Validation" description="Provide immediate inline success/error feedback during input to prevent submission errors." />
        <GoalCard icon={<SmartphoneIcon />} title="Standardize Inputs" description="Remove quantity controls and add a clear country code dropdown for global dialing prefixes." />
        <GoalCard icon={<RocketIcon />} title="Build Contextual Trust" description="Place support details, office maps, and working hours directly beside the form container." />
      </div>
    </FlowSection>

    <FlowSection title="UX Thinking">
      <p className="cfu-body" style={{ marginBottom: '2.5rem' }}>
        Every design update was backed by usability best practices and heuristic research. Here is the rationale behind our layout decisions:
      </p>
      <div className="cfu-insights-grid">
        <InsightCard question="Why the Split-Screen Approach?" answer="By separating inputs from alternative contact methods, we let the form act as a focused card while surrounding it with clear trust signals (such as phone numbers and local timezone indicators)." />
        <InsightCard question="Why side-by-side name fields?" answer="Stacking First and Last name vertically adds unnecessary vertical scrolling height. Aligning them horizontally mimics standard reading patterns and cuts page length." />
        <InsightCard question="Why inline real-time validation?" answer="Waiting until post-submit to show errors causes high drop-offs. Real-time feedback guides the user step-by-step, validating fields as soon as they lose focus." />
        <InsightCard question="Why custom Country Code dropdowns?" answer="A clean dropdown selector prevents formatting errors, guarantees international inputs compile correctly, and eliminates visual confusion." />
      </div>
    </FlowSection>

    <FlowSection title="The Split-Screen Approach">
      <p className="cfu-body" style={{ marginBottom: '2rem' }}>
        The layout was split into a structured two-pane screen:
      </p>
      <div className="cfu-ba-grid">
        <div className="cfu-ba-panel cfu-ba-before">
          <div className="cfu-ba-label cfu-ba-label-before">Left Pane: Input Form</div>
          <ul className="cfu-ba-list">
            <li>Elevated card layout that keeps focus on typing</li>
            <li>Compact grid of side-by-side inputs</li>
            <li>Clean focus indicator ring for accessibility</li>
            <li>Full-width high-contrast submit button</li>
          </ul>
        </div>
        <div className="cfu-ba-panel cfu-ba-after">
          <div className="cfu-ba-label cfu-ba-label-after">Right Pane: Trust & Alternates</div>
          <ul className="cfu-ba-list">
            <li>Direct support telephone calls to bypass form</li>
            <li>Physical office map coordinates and address</li>
            <li>Hours of operation and timezone helper tags</li>
            <li>General email address links</li>
          </ul>
        </div>
      </div>
    </FlowSection>

    <FlowSection title="Wireframes & Flow">
      <p className="cfu-body" style={{ marginBottom: '2rem' }}>
        Below are the initial wireframes and flow designs showing the component anatomy and input interactions.
      </p>
      <div className="cfu-large-img-wrap">
        <img src={wireframeImage} alt="Contact Form Wireframes" className="cfu-flow-img" />
      </div>
    </FlowSection>
  </div>
)

const RefinementFlow = () => (
  <div className="cfu-flow-wrapper">
    <FlowSection title="UI Refinement & Polish">
      <p className="cfu-body" style={{ marginBottom: '2rem' }}>
        The final UI adjustments focused on optical alignment, line-height rhythms, and typography scale adjustments. We verified contrast ratios, optimized hover state transitions, and ensured responsive breakpoints scale smoothly.
      </p>
      <div className="cfu-improvements-grid">
        <ImprovementCard icon={<CheckIcon />} title="Contrast Checked" description="All color and text selections strictly exceed WCAG AAA readability standards." />
        <ImprovementCard icon={<CheckIcon />} title="Typographic Rhythm" description="Perfect vertical sizing values ensure a scan-friendly form flow." />
        <ImprovementCard icon={<CheckIcon />} title="Micro-Animations" description="Clean input transition borders guide visual focus effortlessly." />
        <ImprovementCard icon={<CheckIcon />} title="Safe-Zone Spacing" description="Mobile layouts maintain generous tap sizes for fields." />
      </div>
    </FlowSection>

    <FlowSection title="Before vs After">
      <p className="cfu-body" style={{ marginBottom: '2rem' }}>
        A direct feature comparison between the original single-column form and our new split-screen design.
      </p>
      <div className="cfu-ba-grid" style={{ marginBottom: '3rem' }}>
        <div className="cfu-ba-panel cfu-ba-before">
          <div className="cfu-ba-label cfu-ba-label-before">Before Redesign</div>
          <ul className="cfu-ba-list">
            <li>Monotonous single-column vertically stacked fields</li>
            <li>Phone stepper control allowing negative numbers</li>
            <li>No country codes or dial prefix helper selectors</li>
            <li>Generic unstructured errors shown post-submit</li>
            <li>Lack of supporting trust assets or alternate contact channels</li>
          </ul>
        </div>
        <div className="cfu-ba-panel cfu-ba-after">
          <div className="cfu-ba-label cfu-ba-label-after">After Redesign</div>
          <ul className="cfu-ba-list">
            <li>Sleek split screen with an elevated focused form card</li>
            <li>Standardized numeric input for phone field</li>
            <li>Integrated country code selection menu</li>
            <li>Contextual real-time inline input validation</li>
            <li>Alternate phone/map assets next to the form container</li>
          </ul>
        </div>
      </div>

      <h4 className="cfu-flow-section-title" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Visual Progression</h4>
      <div className="cfu-ba-grid" style={{ gap: '2rem' }}>
        <div>
          <p className="cfu-mockup-caption" style={{ marginBottom: '1rem' }}>Original Form Layout</p>
          <div className="cfu-large-img-wrap cfu-final-img">
            <img src={beforeImage} alt="Before Form Redesign" />
          </div>
        </div>
        <div>
          <p className="cfu-mockup-caption" style={{ marginBottom: '1rem' }}>Redesigned Usable Form</p>
          <div className="cfu-large-img-wrap cfu-final-img">
            <img src={afterImage} alt="After Form Redesign" />
          </div>
        </div>
      </div>
    </FlowSection>

    <FlowSection title="Outcomes">
      <div className="cfu-goals-grid" style={{ marginBottom: '3rem' }}>
        <div className="cfu-outcome-card">
          <h4 className="cfu-metric" style={{ color: '#22C55E' }}>↓ 45%</h4>
          <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>Friction Drop</strong>
          <p className="cfu-body" style={{ fontSize: '0.85rem', margin: 0 }}>Reduction in subjective completion time and cognitive load hurdles.</p>
        </div>
        <div className="cfu-outcome-card">
          <h4 className="cfu-metric" style={{ color: '#3B82F6' }}>100%</h4>
          <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>Standardized Data</strong>
          <p className="cfu-body" style={{ fontSize: '0.85rem', margin: 0 }}>Eliminated negative numbers and incorrect digit counts on submission.</p>
        </div>
        <div className="cfu-outcome-card">
          <h4 className="cfu-metric" style={{ color: '#A855F7' }}>↑ 35%</h4>
          <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>Conversion Rate</strong>
          <p className="cfu-body" style={{ fontSize: '0.85rem', margin: 0 }}>Estimated increase in high-intent lead completions due to trusted formatting.</p>
        </div>
      </div>

      <p className="cfu-body">
        Through disciplined alignment and usability heuristics, the form was transformed from a tedious task into a clean brand interaction.
      </p>
    </FlowSection>

    <FlowSection title="Outro Quote">
      <section className="cfu-footer-outro">
        <p className="cfu-outro-text">
          "Strong UX design is not always about reinventing the wheel. Sometimes, the most significant improvements in conversion rates come from subtle, disciplined refinements."
        </p>
      </section>
    </FlowSection>
  </div>
)

export default function CaseStudyContactForm() {
  useSEO({
    title: 'B2B Contact Form UX Case Study',
    description: 'How I reduced friction in a high-drop-off B2B SaaS contact form through layout restructuring, inline validation, and interaction-level improvements.',
    canonical: '/case-study',
    ogImage: '/og/og-contact-form.png',
  })
  const [activeFlow, setActiveFlow] = useState('discovery')
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const navContainerRef = useRef(null)
  const indicatorRef = useRef(null)
  const itemRefs = useRef({})
  const tocListRef = useRef(null)
  const tocIndicatorRef = useRef(null)
  const tocItemRefs = useRef({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const activeButton = itemRefs.current[activeFlow]
    const container = navContainerRef.current
    const indicator = indicatorRef.current

    if (activeButton && container && indicator) {
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      const scrollLeft = container.scrollLeft

      const left = buttonRect.left - containerRect.left + scrollLeft
      const width = buttonRect.width

      indicator.style.left = `${left}px`
      indicator.style.width = `${width}px`
      indicator.style.opacity = '1'
    }
  }, [activeFlow])

  useEffect(() => {
    const list = tocListRef.current
    const bar = tocIndicatorRef.current
    if (!list || !bar) return

    const activeItem = list.querySelector('.cfu-toc-item.active')
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
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.cfu-hero-tag', '.cfu-title', '.cfu-desc', '.cfu-meta-row'], {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1
      })
      gsap.from('.cfu-hero-visual', { y: 70, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.cfu-flow-section')
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
      case 'discovery': return <DiscoveryFlow />
      case 'redesign': return <RedesignFlow />
      case 'refinement': return <RefinementFlow />
      default: return <DiscoveryFlow />
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
    <div className="cfu-page">
      {/* ── HERO ── */}
      <section className="cfu-hero">
        <div className="cfu-hero-content">
          <span className="cfu-hero-tag">UX Audit · Interface Usability · Interaction Redesign</span>
          <h1 className="cfu-title">Improving Contact<br />Form <span className="cfu-accent">Usability</span></h1>
          <p className="cfu-desc">A focused audit and redesign of a SaaS contact form — fixing interaction mismatches and layout overload within existing brand guidelines to increase conversion rates.</p>
          <div className="cfu-meta-row">
            {[['Role', 'UI/UX Designer'], ['Timeline', '1–2 Days'], ['Tools', 'Figma']].map(([l, v], i) => (
              <div key={i} className="cfu-meta-item">
                <span className="cfu-meta-label">{l}</span>
                <span className="cfu-meta-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cfu-hero-visual">
          <div className="cfu-hero-glow" />
          <div className="cfu-hero-img-wrap">
            <img src={contactFormImage} alt="Contact Form Usability Redesign" className="cfu-hero-img" />
          </div>
        </div>
      </section>

      {/* ── FLOW NAV (SUB NAVBAR) ── */}
      <div className={`home-sub-navbar ${isVisible ? 'sub-nav-visible' : 'sub-nav-hidden'}`}>
        <div className="sub-nav-container" ref={navContainerRef}>
          {FLOWS.map(f => (
            <button
              key={f.id}
              ref={(el) => (itemRefs.current[f.id] = el)}
              onClick={() => {
                setActiveFlow(f.id)
                window.scrollTo({ top: document.querySelector('.cfu-main-content').offsetTop - 180, behavior: 'smooth' })
              }}
              className={`sub-nav-item ${activeFlow === f.id ? 'active' : ''}`}
            >
              {f.label}
            </button>
          ))}
          <div className="sub-nav-indicator" ref={indicatorRef}></div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="cfu-main-content">
        <aside className="cfu-toc-area">
          <div className="cfu-toc-sticky">
            <h4 className="cfu-toc-title">Table of Contents</h4>
            <ul className="cfu-toc-list" ref={tocListRef}>
              <span className="cfu-toc-indicator" ref={tocIndicatorRef} />
              {TOC_DATA[activeFlow].map((item, i) => {
                const id = slugify(item)
                return (
                  <li
                    key={i}
                    ref={el => (tocItemRefs.current[id] = el)}
                    className={`cfu-toc-item ${activeSection === id ? 'active' : ''}`}
                  >
                    <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>{item}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        <div className="cfu-flow-area">
          {renderActiveFlow()}
        </div>
      </div>

      {/* CTA */}
      <section className="cfu-cta">
        <h2>Want to see more of my work?</h2>
        <p>Explore other case studies or get in touch.</p>
        <div className="cfu-cta-btns">
          <Button variant="secondary" size="md" to="/work">Back to Work</Button>
          <Button variant="primary" size="md" to="/contact" showArrow arrowType="right">Let's Talk</Button>
        </div>
      </section>

      <Footer variant="inner" />
    </div>
  )
}
