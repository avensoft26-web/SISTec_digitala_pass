import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/video.css';

export default function VideoGuide() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="video-guide" className="video-section" ref={ref}>
      <div className="container" style={{position:'relative',zIndex:2}}>
        <div className="video-guide-grid">
          <motion.div style={{textAlign:'left'}}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag" style={{marginBottom:'16px'}}>Workflow Video</span>
            <h2 className="section-title" style={{marginBottom:'20px',fontSize:'38px',fontWeight:800,fontFamily:'var(--font-display)',color:'var(--text-primary)',lineHeight:1.25,letterSpacing:'-0.015em'}}>Student App Video Walkthrough</h2>
            <p style={{maxWidth:'580px',margin:'0 0 28px 0',fontSize:'15px',color:'var(--text-muted)',lineHeight:1.65}}>
              Watch how simple it is for a student to apply, track approvals, and complete gate verification in this step-by-step video guide. This detailed walkthrough demonstrates the entire mobile interface operation, live status transitions, and final guard validation steps.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:'14px',maxWidth:'520px'}}>
              {[
                { icon: '📱', bg: 'rgba(29,78,216,0.06)', color: '#1D4ED8', title: 'Student Mobile Operations', desc: 'Learn how students create an outing pass request in less than 10 seconds.' },
                { icon: '⚡', bg: 'rgba(219,39,119,0.06)', color: '#db2777', title: 'Real-Time HOD Approvals', desc: 'Observe how Warden & HOD approval status propagates in real-time.' },
                { icon: '👮', bg: 'rgba(16,185,129,0.06)', color: '#10b981', title: 'Guard Verification Check', desc: 'See how the guard checks the photo profile at the gate and updates the exit log.' },
              ].map((item, i) => (
                <motion.div className="video-highlight-card" key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <span className="vh-icon" style={{background: item.bg, color: item.color}}>{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="video-box-wrapper"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="video-box-frame">
              <div className="video-window-header">
                <div className="video-window-dots">
                  <span className="dot-r" />
                  <span className="dot-y" />
                  <span className="dot-g" />
                </div>
                <div className="video-window-title">App Walkthrough</div>
                <div style={{width:'36px'}} />
              </div>
              <div className="video-viewport">
                <iframe
                  src="https://www.youtube.com/embed/NrBc7qjgI5Q?rel=0&modestbranding=1"
                  title="SISTec Digital Pass - App Demo by Team Avensoft"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{width:'100%',height:'100%',border:'none',position:'relative',zIndex:11}}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
