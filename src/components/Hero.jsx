import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import '../styles/hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  })
};

function MetricItem({ end, suffix, label }) {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div className="metric-item" ref={ref}>
      <span className="metric-num">{count}{suffix}</span>
      <span className="metric-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Aurora Blobs */}
      <div className="hero-blobs">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      <div className="container">
        <div className="hero-grid">
          <motion.div className="hero-content"
            initial="hidden" animate="visible"
          >
            <motion.div className="hero-tagline" custom={0} variants={fadeUp}>
              <span></span> Next-Generation Campus Management
            </motion.div>

            <motion.h1 className="text-gradient" custom={1} variants={fadeUp}>
              SISTec DIGITAL PASS
            </motion.h1>

            <motion.h3 className="hero-subtitle" custom={2} variants={fadeUp}>
              One Platform for Secure Campus Access.
            </motion.h3>

            <motion.p className="hero-sub" custom={3} variants={fadeUp}>
              Simplify campus access with digital gate passes, visitor registration, profile-based verification, and real-time monitoring. Built to deliver a faster, safer, and smarter experience for everyone on campus.
            </motion.p>

            <motion.div className="hero-buttons" custom={4} variants={fadeUp}>
              <a href="#download" className="btn-store">
                <svg viewBox="0 0 24 24">
                  <path d="M5 2c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zm6 17c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm5-4H8V5h8z" />
                </svg>
                <div className="btn-store-text">
                  <span>Download App</span>
                  <strong>Android APK</strong>
                </div>
              </a>
              <a href="#video-guide" className="btn-secondary">
                <span>▶</span> Watch Video Guide
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-mockup-container"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-image-card">
              <img src={`${import.meta.env.BASE_URL}hero-mockup.png`} alt="SISTec Digital Gate Pass System Campus Mockup" decoding="async" />
            </div>
          </motion.div>
        </div>

        {/* Metrics Banner */}
        <motion.div className="metrics-banner"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <MetricItem end={500} suffix="+" label="Active Users" />
          <div className="metric-divider" />
          <MetricItem end={85} suffix="%" label="Queue Reduction" />
          <div className="metric-divider" />
          <MetricItem end={120} suffix="+ kg" label="Paper Saved" />
          <div className="metric-divider" />
          <MetricItem end={2} suffix="s" label="Gate Sync Time" />
        </motion.div>
      </div>
    </section>
  );
}
