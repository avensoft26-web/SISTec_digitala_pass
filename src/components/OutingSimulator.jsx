import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/simulator.css';

export default function OutingSimulator() {
  const [studentName, setStudentName] = useState('Sandeep Kumar');
  const [outingType, setOutingType] = useState('Hostel Outing');
  const [reason, setReason] = useState('Buying essential books from market');
  const [simState, setSimState] = useState('idle');
  const [steps, setSteps] = useState([
    { status: 'idle', desc: 'Waiting for student to initiate the request.' },
    { status: 'locked', desc: 'Awaiting TG verification desk check.' },
    { status: 'locked', desc: 'Awaiting HOD dashboard signoff.' },
    { status: 'locked', desc: 'Student profile pending gate list sync.' },
  ]);
  const [cardStatus, setCardStatus] = useState('IDLE');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const updateStep = useCallback((index, updates) => {
    setSteps(prev => prev.map((s, i) => i === index ? { ...s, ...updates } : s));
  }, []);

  const runSimulation = () => {
    if (simState !== 'idle') return;
    setSimState('running');
    setCardStatus('PENDING');
    updateStep(0, { status: 'processing', desc: `${studentName} submitted "${outingType}" request.` });

    setTimeout(() => {
      updateStep(0, { status: 'completed', desc: `Request submitted by ${studentName}.` });
      updateStep(1, { status: 'processing', desc: 'TG reviewing the outing request...' });
      setCardStatus('UNDER REVIEW');
    }, 1500);
  };

  const approveTG = () => {
    updateStep(1, { status: 'completed', desc: 'TG has approved the request.' });
    updateStep(2, { status: 'processing', desc: 'HOD reviewing for final authorization...' });
    setCardStatus('TG APPROVED');
  };

  const approveHOD = () => {
    updateStep(2, { status: 'completed', desc: 'HOD has authorized the outing.' });
    updateStep(3, { status: 'processing', desc: 'Syncing to gate terminal...' });
    setCardStatus('HOD APPROVED');

    setTimeout(() => {
      updateStep(3, { status: 'completed', desc: 'Gate security verified and logged exit.' });
      setSimState('done');
      setCardStatus('EXIT VERIFIED ✓');
    }, 2000);
  };

  const resetSim = () => {
    setSimState('idle');
    setCardStatus('IDLE');
    setSteps([
      { status: 'idle', desc: 'Waiting for student to initiate the request.' },
      { status: 'locked', desc: 'Awaiting TG verification desk check.' },
      { status: 'locked', desc: 'Awaiting HOD dashboard signoff.' },
      { status: 'locked', desc: 'Student profile pending gate list sync.' },
    ]);
  };

  const stepLabels = ['Student Outing Application', 'Tutor Guardian Approval', 'HOD Final Authorization', 'Gate Security Verification'];

  return (
    <section id="outing-simulator" className="simulator-section" ref={ref}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-tag">Interactive Sandbox</span>
          <h2 className="section-title">Test the Outing Workflow Live</h2>
          <p className="section-desc" style={{maxWidth:'720px',margin:'0 auto'}}>Simulate a real student outing request. Experience how the approval steps propagate instantly through Tutor Guardians, HODs, and Gate Security consoles.</p>
        </div>

        <div className="simulator-panel-grid">
          <motion.div className="simulator-card-left" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="sim-card-title">1. Initiate Outing</h3>
              <p className="sim-card-subtitle">Fill in student request form details to start the simulation.</p>
              <div className="sim-form-group">
                <label className="sim-label">Student Name</label>
                <input type="text" className="sim-input" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
              </div>
              <div className="sim-form-group">
                <label className="sim-label">Outing Type</label>
                <select className="sim-select" value={outingType} onChange={(e) => setOutingType(e.target.value)}>
                  <option value="Hostel Outing">Going Out Of College for work</option>
                  <option value="Emergency Leave">Emergency Out-of-Station Leave</option>
                </select>
              </div>
              <div className="sim-form-group">
                <label className="sim-label">Outing Reason</label>
                <input type="text" className="sim-input" value={reason} onChange={(e) => setReason(e.target.value)} />
              </div>

              <div style={{ marginTop: '32px', marginBottom: '16px' }}>
                {simState === 'idle' ? (
                  <button className="sim-action-btn-trigger" onClick={runSimulation}>🚀 Initiate Outing Request</button>
                ) : simState === 'done' ? (
                  <button className="sim-action-btn-trigger" onClick={resetSim} style={{background:'var(--gradient-green)'}}>🔄 Reset Simulation</button>
                ) : (
                  <button className="sim-action-btn-trigger" disabled style={{opacity:0.6,cursor:'not-allowed'}}>⏳ Simulation Running...</button>
                )}
              </div>
            </div>

            <div>
              <div className="sim-id-card-preview">
                <div style={{position:'absolute',right:'-8px',top:'-8px',width:'48px',height:'48px',background:'rgba(29,78,216,0.06)',borderRadius:'50%',border:'1px solid rgba(29,78,216,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',color:'#1D4ED8',fontWeight:900}}>RFID</div>
                <div style={{width:'56px',height:'68px',background:'#ffffff',borderRadius:'10px',border:'1.5px solid rgba(29,78,216,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'30px',boxShadow:'var(--shadow-pressed)',flexShrink:0}}>👤</div>
                <div style={{flex:1,textAlign:'left'}}>
                  <div style={{fontSize:'8px',fontWeight:800,color:'var(--primary)',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'3px'}}>Sagar Institute (SISTec)</div>
                  <strong style={{fontSize:'14px',color:'var(--text-primary)',display:'block',fontFamily:'var(--font-display)',fontWeight:800}}>{studentName}</strong>
                  <span style={{fontSize:'10px',color:'var(--text-secondary)',display:'block',marginTop:'2px',fontWeight:600}}>Branch: CSE | Roll: 2026-07</span>
                  <span className={`sim-status-chip ${cardStatus === 'IDLE' ? '' : cardStatus.includes('VERIFIED') ? 'approved' : 'processing'}`} style={{marginTop:'8px',display:'inline-block'}}>{cardStatus}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="simulator-card-right"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="sim-card-title">2. Live Approval Stream</h3>
            <p className="sim-card-subtitle">Observe verification states and interactive console actions.</p>
            <div className="sim-steps-wrapper">
              {steps.map((step, i) => (
                <div className={`sim-step-state ${step.status === 'processing' ? 'active' : ''} ${step.status === 'completed' ? 'completed' : ''}`} key={i}>
                  <div className="sim-step-number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="sim-step-body">
                    <strong>{stepLabels[i]}</strong>
                    <p>{step.desc}</p>
                    <div className={`sim-status-chip ${step.status === 'processing' ? 'processing' : step.status === 'completed' ? 'approved' : step.status === 'idle' ? 'pending' : ''}`}>
                      {step.status === 'locked' ? 'LOCKED' : step.status === 'idle' ? 'IDLE' : step.status === 'processing' ? 'PROCESSING' : 'COMPLETED ✔'}
                    </div>
                    {i === 1 && step.status === 'processing' && (
                      <div className="sim-interactive-action">
                        <button className="sim-mini-btn" onClick={approveTG}>Approve as TG ✔</button>
                      </div>
                    )}
                    {i === 2 && step.status === 'processing' && (
                      <div className="sim-interactive-action">
                        <button className="sim-mini-btn btn-hod-approve" onClick={approveHOD}>Authorize as HOD ⚡</button>
                      </div>
                    )}
                    {i === 3 && step.status === 'completed' && (
                      <div className="sim-gate-card">
                        <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'#e0e7ff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',border:'1.5px solid #10b981',position:'relative',overflow:'hidden',flexShrink:0}}>
                          👨‍🎓
                          <div className="laser-scanner-line" />
                        </div>
                        <div>
                          <strong style={{fontSize:'12px',color:'var(--text-primary)',display:'block'}}>{studentName}</strong>
                          <span style={{fontSize:'9px',color:'#10b981',fontWeight:800,display:'block',textTransform:'uppercase'}}>✔ EXIT AUTHORIZED</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
