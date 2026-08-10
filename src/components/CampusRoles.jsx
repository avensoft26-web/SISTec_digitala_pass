import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/roles.css';

const roles = [
  {
    id: 'student', label: 'Students',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>,
    title: 'Hassle-Free Student Outings',
    desc: 'Apply for gate passes and outings directly from the mobile app. Skip the long lines, signature hunting, and manual logs.',
    benefits: [
      { bold: '⚡ Outing request in 10s:', text: 'Simple input form with reason, date, and duration fields.' },
      { bold: '📱 Live Tracking:', text: 'Real-time status updates on Warden and HOD approval progress.' },
      { bold: '🔑 Digital Pass Profile:', text: 'Approved pass displays student profile and outing details instantly for gate check.' },
    ],
    screen: (
      <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg-alt)' }}>
        <div style={{ background:'var(--bg-card)', padding:'16px', textAlign:'center', borderBottom:'1px solid var(--border)', zIndex:10 }}>
          <span style={{ fontWeight:800, fontSize:'15px', background:'var(--grad)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'0.02em' }}>SISTec Student Pass</span>
        </div>
        <div style={{ flex:1, padding:'20px 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:'var(--bg-card)', padding:'28px 20px', borderRadius:'24px', width:'100%', textAlign:'center', boxShadow:'var(--shadow-card)', border:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'var(--accent)' }}></div>
            
            <div style={{ display:'inline-block', padding:'6px 16px', background:'rgba(16,185,129,0.1)', color:'var(--accent-green)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'100px', fontSize:'10px', fontWeight:800, letterSpacing:'0.1em', marginBottom:'20px' }}>APPROVED</div>
            
            <strong style={{ fontSize:'18px', display:'block', color:'var(--text)', marginBottom:'4px' }}>Rahul Sharma</strong>
            <span style={{ fontSize:'12px', color:'var(--text-2)', display:'block', marginBottom:'24px' }}>Outing Pass | CSE Dept</span>
            
            <div style={{ width:'80px', height:'80px', margin:'0 auto 24px', borderRadius:'50%', background:'var(--bg)', border:'2px solid var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'36px', boxShadow:'0 10px 20px -5px rgba(192,112,40,0.2)' }}>
              👨‍🎓
            </div>
            
            <span style={{ fontSize:'11px', fontWeight:700, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'0.05em' }}>Show to Guard at Gate</span>
          </div>
        </div>
        <div style={{ display:'flex', background:'var(--bg-card)', padding:'16px 12px', fontSize:'10px', color:'var(--text-3)', textAlign:'center', justifyContent:'space-around', borderTop:'1px solid var(--border)' }}>
          <span style={{ color:'var(--accent)', fontWeight:800 }}>🏠 Home</span>
          <span style={{ fontWeight:600 }}>📋 Passes</span>
          <span style={{ fontWeight:600 }}>👤 Profile</span>
        </div>
      </div>
    ),
    headerText: 'SISTec Student App',
  },
  {
    id: 'faculty', label: 'Faculty & HODs',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="12" rx="2" ry="2"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/><path d="M12 11h.01"/></svg>,
    title: 'One-Click Faculty Dashboard',
    desc: 'Faculty members and HODs get a unified approval workspace to verify and approve student leaves instantly.',
    benefits: [
      { bold: '📊 Bulk Actions:', text: 'View and approve multiple leave applications in one batch.' },
      { bold: '🛡️ Authenticated Sessions:', text: 'High-security JWT authorization prevents unauthorized approvals.' },
      { bold: '💬 Parental Sync:', text: 'Automatic approval log updates and SMS alerts sent to parents.' },
    ],
    screen: (
      <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg-alt)' }}>
        <div style={{ background:'var(--bg-card)', padding:'16px', textAlign:'center', borderBottom:'1px solid var(--border)', zIndex:10 }}>
          <span style={{ fontWeight:800, fontSize:'15px', background:'var(--grad)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'0.02em' }}>Faculty Approval Desk</span>
        </div>
        <div style={{ flex:1, padding:'16px', overflowY:'auto' }}>
          {[{name:'Sandeep Kumar',reason:'Hostel Outing'},{name:'Rohit Mehra',reason:'Medical Outing'}].map((s,i)=>(
            <div key={i} style={{ background:'var(--bg-card)', padding:'16px', borderRadius:'16px', marginBottom:'16px', boxShadow:'var(--shadow-sm)', border:'1px solid var(--border)' }}>
              <strong style={{ fontSize:'14px', display:'block', color:'var(--text)', marginBottom:'6px' }}>{s.name}</strong>
              <span style={{ fontSize:'12px', color:'var(--text-2)', display:'block', marginBottom:'16px' }}>Reason: {s.reason}</span>
              <div style={{ display:'flex', gap:'12px' }}>
                <div style={{ flex:1, background:'rgba(16,185,129,0.1)', color:'var(--accent-green)', padding:'10px', borderRadius:'10px', textAlign:'center', fontSize:'11px', fontWeight:800, border:'1px solid rgba(16,185,129,0.2)' }}>APPROVE</div>
                <div style={{ flex:1, background:'rgba(239,68,68,0.1)', color:'var(--accent-red)', padding:'10px', borderRadius:'10px', textAlign:'center', fontSize:'11px', fontWeight:800, border:'1px solid rgba(239,68,68,0.2)' }}>REJECT</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', background:'var(--bg-card)', padding:'16px 12px', fontSize:'10px', color:'var(--text-3)', textAlign:'center', justifyContent:'space-around', borderTop:'1px solid var(--border)' }}>
          <span style={{ color:'var(--accent)', fontWeight:800 }}>📥 Pending</span>
          <span style={{ fontWeight:600 }}>✔ Approved</span>
          <span style={{ fontWeight:600 }}>📊 Stats</span>
        </div>
      </div>
    ),
    headerText: 'Faculty Approval Portal',
  },
  {
    id: 'parent', label: 'Parents',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Real-Time Parent Assurance',
    desc: 'Parents stay informed about their children\'s campus exits and entry timings with automatic, secure notifications.',
    benefits: [
      { bold: '✉️ SMS Notifications:', text: 'Instant alert on exit approval and when the student checks out at the gate.' },
      { bold: '🔒 Verification Checks:', text: 'Secure confirmation loops for long out-of-station leave requests.' },
      { bold: '📈 History Log:', text: 'Full transparency of all applied outings and travel logs.' },
    ],
    screen: (
      <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg-alt)', position:'relative' }}>
        <div style={{ background:'var(--bg-card)', padding:'16px', textAlign:'center', borderBottom:'1px solid var(--border)', zIndex:10, display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
          <span>🔔</span>
          <span style={{ fontWeight:800, fontSize:'15px', background:'var(--grad)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'0.02em' }}>SISTec Alerts</span>
        </div>
        <div style={{ flex:1, padding:'20px 24px 20px 16px', overflowY:'auto' }}>
          <div style={{ background:'var(--bg-card)', padding:'16px', borderRadius:'16px', borderBottomLeftRadius:'4px', marginBottom:'16px', position:'relative', border:'1px solid var(--border)', boxShadow:'var(--shadow-sm)' }}>
            <strong style={{ fontSize:'12px', color:'var(--accent)', display:'block', marginBottom:'6px' }}>Gate Pass Info</strong>
            <p style={{ fontSize:'13px', color:'var(--text)', margin:0, lineHeight:1.5 }}>Dear Parent, Sandeep Kumar's hostel outing request has been approved by HOD.</p>
            <span style={{ fontSize:'10px', color:'var(--text-3)', display:'block', textAlign:'right', marginTop:'8px', fontWeight:600 }}>10:15 AM</span>
          </div>
          <div style={{ background:'var(--bg-card)', padding:'16px', borderRadius:'16px', borderBottomLeftRadius:'4px', marginBottom:'16px', position:'relative', border:'1px solid var(--border)', boxShadow:'var(--shadow-sm)' }}>
            <strong style={{ fontSize:'12px', color:'var(--accent)', display:'block', marginBottom:'6px' }}>Checkout Alert</strong>
            <p style={{ fontSize:'13px', color:'var(--text)', margin:0, lineHeight:1.5 }}>Sandeep Kumar has safely checked out at the Main Gate at 10:42 AM.</p>
            <span style={{ fontSize:'10px', color:'var(--text-3)', display:'block', textAlign:'right', marginTop:'8px', fontWeight:600 }}>10:43 AM</span>
          </div>
        </div>
        {/* Mock Scrollbar */}
        <div style={{ position:'absolute', right:'6px', top:'70px', bottom:'70px', width:'4px', background:'var(--accent)', borderRadius:'2px', opacity:0.3 }}>
          <div style={{ position:'absolute', top:'0', left:'0', width:'4px', height:'40px', background:'var(--accent)', borderRadius:'2px', opacity:1 }}></div>
        </div>
        <div style={{ background:'var(--bg-card)', padding:'16px', borderTop:'1px solid var(--border)' }}>
          <div style={{ background:'var(--bg)', padding:'12px 16px', borderRadius:'100px', fontSize:'12px', color:'var(--text-3)', border:'1px solid var(--border)' }}>Reply to alert...</div>
        </div>
      </div>
    ),
    headerText: '💬 SISTec Alerts',
    headerStyle: { background: '#e2e8f0', color: '#475569' },
  },
  {
    id: 'security', label: 'Security Guards',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Instant Gate Verification',
    desc: 'Security guards verify student profiles directly on their gate terminal, keeping campus flows fast, safe, and fully audited.',
    benefits: [
      { bold: '📸 Profile Matcher:', text: 'High-res student photo fetched instantly from ERP database for face verification.' },
      { bold: '📍 Geofenced Logs:', text: 'Automatically checks coordinates to verify logs occur inside designated gate areas.' },
      { bold: '🔄 Auto Sync:', text: 'Logs exit timing and syncs immediately to the admin control desk.' },
    ],
    screen: (
      <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg-alt)' }}>
        <div style={{ background:'var(--bg-card)', padding:'16px', textAlign:'center', borderBottom:'1px solid var(--border)', zIndex:10 }}>
          <span style={{ fontWeight:800, fontSize:'15px', background:'var(--grad)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'0.02em' }}>Gate Guard Console</span>
        </div>
        <div style={{ flex:1, padding:'20px 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:'var(--bg-card)', padding:'28px 20px', borderRadius:'24px', width:'100%', textAlign:'center', boxShadow:'var(--shadow-card)', border:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'var(--accent-green)' }}></div>
            
            <div style={{ width:'80px', height:'80px', margin:'0 auto 20px', borderRadius:'50%', background:'var(--bg)', border:'2px solid var(--accent-green)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'36px', boxShadow:'0 10px 20px -5px rgba(16,185,129,0.2)' }}>
              👨‍🎓
            </div>
            
            <strong style={{ fontSize:'18px', display:'block', color:'var(--text)', marginBottom:'4px' }}>Rahul Sharma</strong>
            <span style={{ fontSize:'11px', fontWeight:800, color:'var(--accent-green)', display:'block', marginBottom:'28px', letterSpacing:'0.05em' }}>HOD APPROVED</span>
            
            <div style={{ background:'linear-gradient(135deg, #10b981, #059669)', color:'#fff', padding:'14px', borderRadius:'12px', textAlign:'center', fontSize:'13px', fontWeight:800, letterSpacing:'0.05em', boxShadow:'0 10px 20px -5px rgba(16,185,129,0.4)' }}>
              ALLOW EXIT
            </div>
          </div>
        </div>
        <div style={{ display:'flex', background:'var(--bg-card)', padding:'16px 12px', fontSize:'10px', color:'var(--text-3)', textAlign:'center', justifyContent:'space-around', borderTop:'1px solid var(--border)' }}>
          <span style={{ color:'var(--text)', fontWeight:800 }}>🚪 Gate scan</span>
          <span style={{ fontWeight:600 }}>📋 Check Logs</span>
        </div>
      </div>
    ),
    headerText: 'Guard Console App',
  },
];

export default function CampusRoles() {
  const [activeRole, setActiveRole] = useState('student');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const role = roles.find(r => r.id === activeRole);

  return (
    <section id="tech-specs" className="roles-section" ref={ref}>
      <div className="roles-glow-bg" data-role={activeRole}></div>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-tag">Campus Roles</span>
          <h2 className="section-title">Designed for Everyone on Campus</h2>
          <p className="section-desc">SISTec DIGITAL PASS connects students, parents, faculty, and security guards in a single safe, paperless network.</p>
        </div>

        <motion.div className="role-tabs-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {roles.map(r => (
            <button key={r.id} className={`role-tab-btn ${activeRole === r.id ? 'active' : ''}`} onClick={() => setActiveRole(r.id)} title={r.label}>
              <div className="role-tab-icon">{r.icon}</div>
              <span className="role-tab-label">{r.label}</span>
            </button>
          ))}
        </motion.div>

        <div className="role-details-container">
          <div className="role-panel active" key={activeRole}>
            <motion.div className="role-panel-info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="role-panel-title">{role.title}</h3>
              <p className="role-panel-desc">{role.desc}</p>
              <ul className="role-benefit-list">
                {role.benefits.map((b, i) => (
                  <li key={i}>
                    <div style={{ color: 'var(--accent)', marginTop: '2px' }}>✨</div>
                    <div>
                      <strong>{b.bold}</strong>
                      {b.text}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="role-panel-preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="phone-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: '12px', fontWeight: 600 }}>
                    <span>10:30</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span style={{ fontSize: '10px' }}>📶</span>
                      <span style={{ fontSize: '10px' }}>🔋</span>
                    </div>
                  </div>
                  {role.screen}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
