import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/download.css';

export default function DownloadApp() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const startDownload = () => {
    if (downloading || done) return;
    setDownloading(true);
    setProgress(0);

    // Simulate progress then trigger real download
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current);
        setProgress(100);
        setDone(true);
        setDownloading(false);
        // Trigger real download
        const link = document.createElement('a');
        link.href = '/app-release.apk';
        link.download = 'SISTec-Digital-Pass.apk';
        link.click();
      } else {
        setProgress(Math.floor(p));
      }
    }, 300);
  };

  return (
    <section id="download" className="download-section" ref={ref}>
      <div className="container">
        <motion.div className="glass-card download-card-split"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="download-info-side">
            <span className="section-tag" style={{ marginBottom: '16px' }}>App Installation</span>
            <h2 className="download-heading">Modern Outing Operations in Your Pocket</h2>
            <p className="download-paragraph">
              Get the SISTec Digital Gate Pass mobile application directly on your phone. Experience swift requests, review histories, and check out instantly at the gate.
            </p>
            <div className="app-tech-specs">
              <div className="app-spec-item"><span className="spec-label">Version</span><span className="spec-val">v2.1.4 (Latest)</span></div>
              <div className="app-spec-item"><span className="spec-label">Package Size</span><span className="spec-val">21.3 MB</span></div>
              <div className="app-spec-item"><span className="spec-label">Platform</span><span className="spec-val">Android 8.0+</span></div>
            </div>
            <div className="download-feature-checklist">
              <div className="checklist-item"><span className="check-icon">✓</span><span>10-Second Quick Outing Pass Creation</span></div>
              <div className="checklist-item"><span className="check-icon">✓</span><span>Face Profile Verification at Main Gate</span></div>
              <div className="checklist-item"><span className="check-icon">✓</span><span>Automatic Parent Notification Sync</span></div>
            </div>
          </div>

          <div className="download-action-side">
            <div className="installer-box">
              <div className="installer-app-info">
                <div className="installer-icon-wrapper">
                  <img src={`${import.meta.env.BASE_URL}app-logo.jpeg`} alt="SISTec Digital Pass Logo" loading="lazy" decoding="async" />
                </div>
                <div>
                  <strong className="installer-app-title">SISTec DIGITAL PASS</strong>
                  <div className="installer-app-meta">Sagar Group of Institutions</div>
                  <div className="installer-rating">⭐⭐⭐⭐⭐ 5.0 Rating</div>
                </div>
              </div>

              {!done ? (
                <button className="installer-btn" onClick={startDownload} disabled={downloading}>
                  <span className="btn-text">{downloading ? 'Downloading...' : 'Download APK File'}</span>
                  <span className="btn-subtext">Direct Download (21.3 MB)</span>
                </button>
              ) : (
                <button className="installer-btn" style={{ background: 'var(--gradient-green)' }}>
                  <span className="btn-text">✔ Download Complete</span>
                  <span className="btn-subtext">Check your downloads folder</span>
                </button>
              )}

              {(downloading || done) && (
                <div className="installer-progress-container">
                  <div className="progress-bar-status">
                    <span>{done ? 'Complete!' : `Downloading... ${progress}%`}</span>
                    {downloading && <span className="progress-spinner" />}
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="installer-security-info">
                <span>🔒 Verified Safe by Google Play Protect</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
