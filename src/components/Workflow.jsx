import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/workflow.css';

const steps = [
  {
    id: 'req',
    num: 1, title: 'Request',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    headerClass: 'flow-card-header-1',
    barTitle: 'GATE PASS REQUEST',
    fields: [['Purpose', 'Outing'], ['Date', '20 May 2024'], ['Time', '10:00 AM'], ['Location', 'Library Visit']],
    btnText: 'SUBMIT REQUEST', btnClass: 'mini-btn-submit',
    desc: 'User (Student/Staff) requests gate pass details via their mobile application.',
    badge: '⌛ Pending', showDual: false
  },
  {
    id: 'l1',
    num: 2, title: 'Level 1 Approval',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
    headerClass: 'flow-card-header-2',
    barTitle: 'GATE PASS REQUEST',
    fields: [['User', 'Rahul Sharma'], ['Purpose', 'Library Visit'], ['Date', '20 May 2024'], ['Time', '10:00 AM']],
    btnText: '', btnClass: '',
    desc: 'Goes directly to Level 1 (Tutor Guardian). TG verifies and signs off digitally.',
    badge: '⚡ Approving', showDual: true
  },
  {
    id: 'l2',
    num: 3, title: 'Level 2 Approval',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    headerClass: 'flow-card-header-3',
    barTitle: 'FOR FINAL APPROVAL',
    fields: [['User', 'Rahul Sharma'], ['Purpose', 'Library Visit'], ['Level 1', 'Approved ✔']],
    btnText: 'APPROVE', btnClass: 'mini-btn-approve',
    desc: 'Goes to Level 2 (e.g. HOD). HOD grants final clearance, syncing the approved pass to the gate console.',
    badge: '✔ Approved', showDual: false
  },
  {
    id: 'guard',
    num: 4, title: 'Guard Verification',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    headerClass: 'flow-card-header-4',
    barTitle: 'GATE VERIFICATION',
    desc: 'Security guard verifies student face using the database profile photo on the gate terminal and logs exit.',
    badge: '🚪 Exit Sync', isGuardCard: true, showDual: false
  },
];

export default function Workflow() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [userInteracted, setUserInteracted] = useState(false);
  const timeoutRef = useRef(null);
  const hasTicked = useRef(false);

  // Detect manual user scrolling/interaction
  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // Resume auto-scroll after 1.5 seconds of inactivity
      timeoutRef.current = setTimeout(() => {
        setUserInteracted(false);
      }, 1500);
    };

    window.addEventListener('wheel', handleInteraction, { passive: true });
    window.addEventListener('touchmove', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Auto-advance active step when idle
  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      hasTicked.current = true;
      setActiveIdx((p) => (p + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [userInteracted]);

  // Execute scroll when active step changes (only if idle)
  useEffect(() => {
    if (!userInteracted && inView && window.innerWidth > 900 && hasTicked.current) {
      const row = document.getElementById(`wf-row-${activeIdx}`);
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeIdx, inView, userInteracted]);

  const activeStep = steps[activeIdx];

  // Logic for Mobile Stacked Deck
  const getCardProps = (index) => {
    const diff = index - activeIdx;
    if (diff < 0) return { x: -400, opacity: 0, scale: 0.8, rotate: -20, zIndex: 0 };
    if (diff === 0) return { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, zIndex: 10 };
    const tilt = diff % 2 === 0 ? 2 : -2;
    return {
      x: 0, y: diff * 28, opacity: 1 - diff * 0.15, scale: 1 - diff * 0.05, rotate: tilt, zIndex: 10 - diff,
    };
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    } else if (info.offset.x > swipeThreshold) {
      setActiveIdx((prev) => (prev - 1 + steps.length) % steps.length);
    }
  };

  // Reusable Mock Content for the phone screen
  const MockContent = ({ step }) => (
    <div className="mini-phone-body">
      {step.isGuardCard ? (
        <div className="guard-view">
          <div className="guard-student-name">Rahul Sharma</div>
          <div className="guard-photo-circle">👨‍🎓</div>
          <div className="guard-status-text">MATCHED ✓</div>
        </div>
      ) : (
        <div className="mini-fields-container">
          {step.fields?.map(([label, value], j) => (
            <div className="mini-field" key={j}>
              <span>{label}</span>
              <span>{value}</span>
            </div>
          ))}
          <div className="mini-actions-wrapper">
            {step.showDual ? (
              <div className="dual-btn-row">
                <div className="mini-btn mini-btn-approve">APPROVE</div>
                <div className="mini-btn mini-btn-reject">REJECT</div>
              </div>
            ) : step.btnText ? (
              <div className={`mini-btn ${step.btnClass}`}>{step.btnText}</div>
            ) : null}
          </div>
        </div>
      )}
      <div className="flow-status-badge">{step.badge}</div>
    </div>
  );

  return (
    <section id="workflow" className="workflow-section" ref={ref}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-tag">Digital Journey</span>
          <h2 className="section-title">Internal Student Gate Pass Process</h2>
          <p className="section-desc">From initial digital request to final security checkout — fully automated and trackable.</p>
        </div>

        {/* ─── DESKTOP: Zig-Zag Infographic Roadmap ─── */}
        <div className="wf-roadmap desktop-only">

          {/* S-Curve Spine */}
          <div className="wf-spine-wrapper">
            <svg width="100%" height="100%" viewBox="0 0 200 1000" preserveAspectRatio="none" overflow="visible">
              <defs>
                <linearGradient id="spineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#c07028" />
                  <stop offset="33%"  stopColor="#7c3aed" />
                  <stop offset="66%"  stopColor="#059669" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <path d="M100 0 C180 80,180 170,100 250 C20 330,20 420,100 500 C180 580,180 670,100 750 C20 830,20 920,100 1000"
                stroke="rgba(192,112,40,0.12)" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke"/>
              <motion.path
                d="M100 0 C180 80,180 170,100 250 C20 330,20 420,100 500 C180 580,180 670,100 750 C20 830,20 920,100 1000"
                stroke="url(#spineGrad)" strokeWidth="5" fill="none"
                vectorEffect="non-scaling-stroke" filter="url(#glow2)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.2 }}
              />
              {/* Traveling Glowing Dot keeps flowing infinitely on the drawn path */}
              <circle r="8" fill="#fff" filter="url(#glow2)">
                <animateMotion 
                  dur="4s" 
                  repeatCount="indefinite" 
                  path="M100 0 C180 80,180 170,100 250 C20 330,20 420,100 500 C180 580,180 670,100 750 C20 830,20 920,100 1000"
                />
              </circle>
            </svg>
          </div>

          {/* Step Rows */}
          <div className="wf-rows">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const phoneEl = (
                <div className="wf-phone-col">
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <div className="premium-phone-frame zigzag-phone">
                      <div className="phone-notch"></div>
                      <div className="phone-inner-screen">
                        <div className="phone-screen-content">
                          <div className="mini-phone-bar">{step.barTitle}</div>
                          <MockContent step={step} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
              const textEl = (
                <div className={`wf-text-col ${isLeft ? 'text-left-side' : 'text-right-side'}`}>
                  <motion.div className="wf-text-inner"
                    initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <div className="wf-tag-pill">
                      <span className="wf-tag-dot" style={{ background: step.color }}></span>
                      <span style={{ color: step.color, fontWeight: 700 }}>{step.tag}</span>
                    </div>
                    <div className="wf-step-icon" style={{ background: step.color + '18', borderColor: step.color + '40' }}>
                      <span style={{ color: step.color, display: 'flex' }}>{step.icon}</span>
                    </div>
                    <h3 className="wf-step-title">
                      <span className="wf-step-num" style={{ color: step.color }}>0{step.num} —</span>&nbsp;{step.title}
                    </h3>
                    <p className="wf-step-desc">{step.desc}</p>
                  </motion.div>
                </div>
              );
              return (
                <div key={step.id} id={`wf-row-${i}`} className={`wf-row ${activeIdx === i && !userInteracted ? 'is-active-row' : ''}`}>
                  {isLeft ? phoneEl : textEl}
                  <div className="wf-center-col">
                    <motion.div className="wf-node"
                      style={{ borderColor: step.color, boxShadow: `0 0 0 8px ${step.color}14, 0 0 28px ${step.color}28` }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                      transition={{ duration: 0.5, delay: 0.3, type: 'spring', bounce: 0.4 }}
                    >
                      <span className="wf-node-label">STEP</span>
                      <span className="wf-node-num" style={{ color: step.color }}>0{step.num}</span>
                    </motion.div>
                    <motion.div
                      className={`wf-connector ${isLeft ? 'conn-right' : 'conn-left'}`}
                      style={{ borderColor: step.color + '80' }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                      transition={{ duration: 0.5, delay: 0.45 }}
                    >
                      <div className="wf-conn-dot" style={{ background: step.color }}></div>
                    </motion.div>
                  </div>
                  {isLeft ? textEl : phoneEl}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================
            MOBILE VIEW: 3D Stacked Deck
            ========================================= */}
        <div className="workflow-deck-container mobile-only">
          <div className="deck-glow-orb" />
          
          <div className="deck-stack">
            {steps.map((step, i) => {
              const isActive = activeIdx === i;
              return (
                <motion.div
                  key={step.id}
                  className={`deck-card ${isActive ? 'is-active' : ''}`}
                  initial={false}
                  animate={inView ? getCardProps(i) : { opacity: 0, y: 100 }}
                  transition={{ duration: 0.35, type: 'spring', bounce: 0.2 }} // Much faster animation
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={handleDragEnd}
                  style={isActive ? { cursor: 'grab' } : {}}
                  whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
                >
                  {isActive && <div className="deck-glass-shimmer" />}
                  
                  {/* Card Header */}
                  <div className={`deck-card-header ${step.headerClass}`}>
                    <div className="d-flex align-items-center" style={{ gap: '12px' }}>
                      <div className="deck-icon">{step.icon}</div>
                      <div className="deck-title-group">
                        <span className="deck-step-num">STEP 0{step.num}</span>
                        <h3 className="deck-title">{step.title}</h3>
                      </div>
                    </div>
                    {isActive && <div className="deck-active-ping" />}
                  </div>

                  {/* Card Body */}
                  <div className="deck-card-body">
                    <p className="deck-desc">{step.desc}</p>
                    <div className="deck-mock-ui">
                      <div className="mock-bar">{step.barTitle}</div>
                      <MockContent step={step} />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="deck-progress-track">
                    {isActive && (
                      <motion.div 
                        className="deck-progress-fill"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.5, ease: "linear" }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
