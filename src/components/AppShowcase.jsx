import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/showcase.css';

const features = [
  { id: 'scr-student-dash', num: '01', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>, title: 'Powerful Admin Dashboard', desc: 'Manage users, batches, gate pass approvals, visitor records, and real-time campus activity through a secure web dashboard.' },
  { id: 'scr-apply-pass', num: '02', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, title: 'Student Mobile App', desc: 'Students can apply for gate passes, track approval status, receive instant notifications, and access their digital passes.' },
  { id: 'scr-active-pass', num: '03', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: 'Digital Approval Workflow', desc: 'Faculty and HODs can review and approve requests quickly, while approved passes become instantly available for gate verification.' },
  { id: 'scr-visitor-reg', num: '04', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Visitor Management', desc: 'Register visitors, capture essential information, assign hosts, and maintain a secure digital log of every campus entry and exit.' },
  { id: 'scr-monitor', num: '05', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, title: 'Real-Time Monitoring', desc: 'Monitor gate activities, verify entries, and track live records through synchronized web and mobile platforms.' },
];

function AdminScreen() {
  return (
    <div className="screen-content">
      <div className="app-bar"><h4>SISTec Digital Pass</h4><span style={{ fontSize: '14px' }}>👤</span></div>
      <p style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>QUICK ACTIONS</p>
      <div className="quick-actions">
        <div className="action-tile"><div className="action-tile-icon" style={{ color: 'var(--primary)' }}>✚</div>Add User</div>
        <div className="action-tile"><div className="action-tile-icon" style={{ color: 'var(--accent-gold)' }}>📁</div>Batches</div>
        <div className="action-tile"><div className="action-tile-icon" style={{ color: '#0284c7' }}>⚙</div>UM</div>
      </div>
      <div className="mock-search-bar" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>🔍 Search passes...</div>
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '12px' }}>
        <span style={{ flexGrow: 1, textAlign: 'center', padding: '6px', fontSize: '11px', fontWeight: 700, borderBottom: '2px solid var(--primary)', color: 'var(--primary)' }}>Visitors</span>
        <span style={{ flexGrow: 1, textAlign: 'center', padding: '6px', fontSize: '11px', color: '#64748b' }}>GatePass</span>
      </div>
      {[
        { name: 'Sandeep Kumar', type: 'Hostel Outing', badge: 'Pending', cls: 'native-badge-pending', icon: '👤' },
        { name: 'Yogesh Sharma', type: 'Local Visit', badge: 'Meet', cls: 'native-badge-meet', icon: '👨‍💼' },
        { name: 'Rohini Verma', type: 'Emergency Leave', badge: 'Exit', cls: 'native-badge-exit', icon: '👩‍🎓' },
      ].map((item, i) => (
        <div className="native-list-item" key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#F1F2F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>{item.icon}</div>
            <div>
              <div className="native-student-name">{item.name}</div>
              <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 500 }}>{item.type}</div>
            </div>
          </div>
          <span className={`native-badge ${item.cls}`}>{item.badge}</span>
        </div>
      ))}
      <div className="native-fab">+</div>
    </div>
  );
}

function ApplyPassScreen() {
  return (
    <div className="screen-content">
      <div className="app-bar"><span style={{ cursor: 'pointer' }}>←</span><h4>My Gate Passes</h4><span></span></div>
      <div className="native-details-box" style={{ marginTop: '24px' }}>
        <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Remark</h4>
        <div className="native-form-group" style={{ textAlign: 'left' }}>
          <label>Reason for gate pass</label>
          <textarea className="native-input" rows="3" readOnly style={{ resize: 'none', height: 'auto' }}></textarea>
        </div>
        <button className="native-btn">Apply</button>
      </div>
      <button className="native-btn native-btn-secondary" style={{ marginTop: 'auto' }}>✚ Apply New Pass</button>
    </div>
  );
}

function ActivePassScreen() {
  return (
    <div className="screen-content">
      <div className="app-bar"><span>←</span><h4>Gate Pass Details</h4><span>📝</span></div>
      <div className="native-details-box" style={{ marginTop: '16px', padding: '16px' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#F1F2F6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', border: '2px solid var(--primary)', fontSize: '28px', overflow: 'hidden', boxShadow: 'var(--shadow-pressed)' }}>👨‍🎓</div>
        <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Yogesh Saini</h4>
        <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '12px' }}>CSE Department</p>
        <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '10px', marginBottom: '16px' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-green)', display: 'block', marginBottom: '4px' }}>STATUS: APPROVED</span>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Show profile to security guard at the gate for face verification.</span>
        </div>
        <div style={{ textAlign: 'left', fontSize: '10px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
          <div><strong>Pass ID:</strong> SISTEC-2026-77</div>
          <div><strong>Outing Reason:</strong> Library Research Trip</div>
          <div><strong>Authorized Exit:</strong> 10:30 AM onwards</div>
        </div>
      </div>
    </div>
  );
}

function VisitorRegScreen() {
  return (
    <div className="screen-content">
      <div className="app-bar"><span>←</span><h4>Visitor Registration</h4><span></span></div>
      <div className="native-list-item" style={{ flexDirection: 'column', textAlign: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#F1F2F6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', border: '1.5px dashed var(--primary)', boxShadow: 'var(--shadow-pressed)' }}>📷</div>
        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-primary)' }}>Tap to capture photo</span>
      </div>
      <div className="native-form-group"><label>Full Name</label><input type="text" className="native-input" defaultValue="Yogesh Saini" readOnly /></div>
      <div className="native-form-group"><label>Phone Number</label><input type="text" className="native-input" defaultValue="9244208213" readOnly /></div>
      <div className="native-form-group"><label>No. of Visitors</label><input type="text" className="native-input" defaultValue="5" readOnly /></div>
      <div className="native-form-group"><label>Department to Meet</label><input type="text" className="native-input" defaultValue="CSE" readOnly /></div>
      <button className="native-btn" style={{ marginTop: 'auto' }}>Enter Visitor</button>
    </div>
  );
}

const screens = {
  'scr-student-dash': AdminScreen,
  'scr-apply-pass': ApplyPassScreen,
  'scr-active-pass': ActivePassScreen,
  'scr-visitor-reg': VisitorRegScreen,
  'scr-monitor': AdminScreen,
};

export default function AppShowcase() {
  const [activeScreen, setActiveScreen] = useState('scr-student-dash');
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [userInteracted, setUserInteracted] = useState(false);
  const timeoutRef = useRef(null);

  // Detect manual user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setUserInteracted(false);
      }, 5000);
    };

    window.addEventListener('wheel', handleInteraction, { passive: true });
    window.addEventListener('touchmove', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Auto-switch features
  useEffect(() => {
    if (userInteracted || !inView) return;

    const interval = setInterval(() => {
      setActiveScreen(prev => {
        const currIdx = features.findIndex(f => f.id === prev);
        const nextIdx = (currIdx + 1) % features.length;
        return features[nextIdx].id;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [userInteracted, inView]);
  const ActiveScreenComponent = screens[activeScreen];

  return (
    <section id="showcase" className="showcase-section" ref={ref}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-tag">Complete Ecosystem</span>
          <h2 className="section-title">One Platform. Two Powerful Experiences.</h2>
          <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto' }}>SISTec Digital Pass combines a feature-rich Android application with a powerful web dashboard, enabling students, faculty, administrators, and security staff to manage campus access seamlessly from anywhere.</p>
        </div>

        <div className="showcase-grid">
          {/* ─── Mobile Icon Nav (Top) ─── */}
          <div className="mobile-icon-nav mobile-only">
            {features.map((f) => (
              <button 
                key={f.id}
                className={`mobile-icon-btn ${activeScreen === f.id ? 'active' : ''}`}
                onClick={() => setActiveScreen(f.id)}
                title={f.title}
              >
                {f.icon}
              </button>
            ))}
          </div>

          {/* ─── Desktop Menu (Left) ─── */}
          <div className="showcase-menu desktop-only">
            <div className="showcase-watermark" key={activeScreen}>
              {features.find(f => f.id === activeScreen)?.icon}
            </div>
            <div className="timeline-track" />
            
            {features.map((f, i) => (
              <motion.div className="showcase-feature-row" key={f.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6, type: 'spring' }}
              >
                <button
                  className={`showcase-item-btn ${activeScreen === f.id ? 'active' : ''}`}
                  onClick={() => setActiveScreen(f.id)}
                >
                  <div className="timeline-dot" />
                  <div className="showcase-icon-box">{f.icon}</div>
                  <div className="showcase-txt">
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div className="phone-mockup-wrapper"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="phone-header">
                  <span>10:30</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ fontSize: '8px' }}>📶</span>
                    <span style={{ fontSize: '8px' }}>🔋</span>
                  </div>
                </div>
                <ActiveScreenComponent />
              </div>
            </div>
          </motion.div>

          {/* ─── Mobile Feature Details (Bottom) ─── */}
          <div className="mobile-feature-details mobile-only">
            {features.map((f) => (
               f.id === activeScreen && (
                 <motion.div key={f.id} className="mobile-feature-card"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                 >
                   <h3>{f.title}</h3>
                   <p>{f.desc}</p>
                 </motion.div>
               )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
