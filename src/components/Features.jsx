import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/features.css';

const featuresList = [
  { icon: '🔐', title: 'Role-Based Authentication (RBAC)', chips: ['JWT / SHA-256', 'Token Session'], desc: 'Secure cryptographically signed token sessions separating student accounts, faculty tutors, HODs, reception, and gate guards.', target: 'web' },
  { icon: '📍', title: 'GPS Geofence Boundaries', chips: ['GPS Coordinate', 'Radius Lock'], desc: 'Verifies security terminal coordinates dynamically to check that guards verify student outings strictly inside the designated gate area.', target: 'phone' },
  { icon: '⚡', title: 'Sub-Second Sync Engine', chips: ['Flask / WebSockets', 'Latency <280ms'], desc: 'Propagates approval updates instantaneously across all devices and guard consoles using high-speed socket notifications.', target: 'web' },
  { icon: '✉️', title: 'Automatic Parents SMS Alert', chips: ['SMS Gateway', 'Auto Broadcast'], desc: 'Triggers immediate security SMS notifications directly to parents\' registered numbers upon student gate checkout and entry logs.', target: 'phone' },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="features-section" ref={ref}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-tag">High Performance</span>
          <h2 className="section-title">Core System Features</h2>
          <p className="section-desc">Designed with high-quality parameters and complete security layers.</p>
        </div>

        <div className="features-split-layout">
          <div className="features-list-panel">
            {featuresList.map((f, i) => (
              <motion.div
                key={i}
                className="feature-item-card"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="f-icon">{f.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0 }}>{f.title}</h3>
                    {f.chips.map((chip, j) => (
                      <span className="tech-chip" key={j}>{chip}</span>
                    ))}
                  </div>
                  <p>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="features-device-panel"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="device-scene">
              <div className="device-web-browser">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot-red" />
                    <span className="dot-yellow" />
                    <span className="dot-green" />
                  </div>
                  <div className="browser-url-bar" />
                </div>
                <div className="browser-body" style={{ flexDirection: 'row', padding: 0 }}>
                  <div className="dash-sidebar" style={{ width: '160px', background: 'var(--bg-alt)', padding: '16px', borderRight: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, marginBottom: '20px', color: 'var(--text)' }}>SISTec Pass</div>
                    <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, padding: '8px 0' }}>🔔 Outing Requests</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-3)', padding: '8px 0' }}>🎓 Students Directory</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-3)', padding: '8px 0' }}>📊 Reports & Logs</div>
                  </div>
                  <div className="dash-content" style={{ flex: 1, padding: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '16px', color: 'var(--text)' }}>HOD Pending Approvals</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '11px', fontWeight: 600 }}><span>Amit Kumar (CS-3B)</span><span style={{ color: 'var(--status-pending)' }}>PENDING</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(16,185,129,0.05)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)', fontSize: '11px', fontWeight: 600 }}><span>Priya Singh (EC-2A)</span><span style={{ color: '#10b981' }}>APPROVED</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '11px', fontWeight: 600 }}><span>Rohan Gupta (ME-4C)</span><span style={{ color: 'var(--status-pending)' }}>PENDING</span></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="device-mobile-phone">
                <div className="phone-screen" style={{ padding: '48px 16px 24px 16px' }}>
                  <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 900, marginBottom: '16px', color: 'var(--text)' }}>Gate Pass</div>
                  <div style={{ background: 'linear-gradient(135deg, var(--accent), #e6761b)', padding: '20px', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 20px -5px rgba(192,112,40,0.3)' }}>
                    <div style={{ fontSize: '11px', opacity: 0.9, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Approved Outing</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '12px' }}>ACTIVE PASS</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>Valid: Today till 5:30 PM</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, marginTop: '16px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px', display: 'inline-block' }}>👨‍🎓 Rahul Sharma</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
                    <div style={{ height: '36px', background: 'var(--bg-alt)', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>📍 GPS Coordinates Synced</div>
                    <div style={{ height: '36px', background: 'rgba(16,185,129,0.1)', color: '#10b981', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>✓ Guard Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
