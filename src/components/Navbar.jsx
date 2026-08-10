import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/navbar.css';

const NAV_LINKS = [
  { id: 'hero', label: 'Home', href: '#' },
  { id: 'showcase', label: 'App Tour', href: '#showcase' },
  { id: 'workflow', label: 'How It Works', href: '#workflow' },
  { id: 'video-guide', label: 'Video', href: '#video-guide' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'tech-specs', label: 'Roles', href: '#tech-specs' },
  { id: 'faq', label: 'FAQs', href: '#faq' },
];

/* Sun Icon */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

/* Moon Icon */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const pillRef = useRef(null);

  /* Scroll handler */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollProgress(pct || 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Intersection Observer for ScrollSpy */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -65% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Update pill indicator position */
  const updateIndicator = useCallback(() => {
    if (!pillRef.current) return;
    const pillEl = pillRef.current;
    const activeLink = pillEl.querySelector('.pill-link.active');
    if (activeLink) {
      const pillRect = pillEl.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - pillRect.left,
        width: linkRect.width,
      });
    }
  }, []);

  useEffect(() => {
    updateIndicator();
  }, [activeId, updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleLinkClick = (link) => {
    setActiveId(link.id);
    setMobileOpen(false);
    if (link.href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.querySelector(link.href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress */}
      <div id="scroll-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Navbar */}
      <motion.nav
        className={`nav-container ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <button className="nav-logo-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="nav-logo-img-wrapper">
            <img src={`${import.meta.env.BASE_URL}PhotoshopExtension_Image.png`} alt="SISTec Digital Pass" className="nav-logo-img" />
          </div>
        </button>

        {/* Floating Pill */}
        <div className="floating-pill" ref={pillRef}>
          {indicator.width > 0 && (
            <motion.div
              className="pill-indicator"
              layoutId="pill-indicator"
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`pill-link ${activeId === link.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="nav-actions">
          <motion.button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            whileTap={{ scale: 0.9 }}
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={dark ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {dark ? <MoonIcon /> : <SunIcon />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <a href="#download" className="btn-nav-cta hide-mobile">Download</a>

          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
          >
            <svg viewBox="0 0 24 24">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ x: 280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 280, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                className={`drawer-link ${activeId === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}
            <div className="drawer-bottom">
              <a href="#download" className="btn-nav-cta" onClick={() => setMobileOpen(false)}>
                Download App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
