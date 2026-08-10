import '../styles/team.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-box">
              <img src="/logo.png" alt="SISTec Digital Pass Logo" />
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.7, maxWidth: '300px' }}>SISTec Digital Gate Pass System is a unified platform simplifying and securing campus access with digital workflows.</p>
          </div>
          <div>
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><a href="#showcase">Student App</a></li>
              <li><a href="#showcase">Admin Dashboard</a></li>
              <li><a href="#tech-specs">Security Features</a></li>
              <li><a href="#download">Download APK</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="https://sistec.ac.in" target="_blank" rel="noopener noreferrer">Avensoft</a></li>
              <li><a href="#developers">Team Avensoft</a></li>
              <li><a href="mailto:contact@sistecpass.in">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Our Network</h4>
            <ul className="footer-links">
              <li><a href="https://deepakkumar7388.github.io/Chaudhary_Health_Care-Center-Koraon-Pryagraj/" target="_blank" rel="noopener noreferrer">Chaudhary Health Care</a></li>
              <li><a href="https://spic-college.netlify.app/" target="_blank" rel="noopener noreferrer">SPIC College Web</a></li>
              <li>
                <a href="https://deepak-portfolioc.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Deepak's Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} SISTec Digital Pass. All rights reserved.</span>
          <span>Developed by <a href="https://deepak-portfolioc.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 800 }}>Deepak</a> & Team Avensoft</span>
        </div>
      </div>
    </footer>
  );
}
