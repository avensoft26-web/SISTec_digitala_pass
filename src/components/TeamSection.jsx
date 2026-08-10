import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/team.css';

const base = import.meta.env.BASE_URL;

const team = [
  { name: 'Yogesh Saini', role: 'Lead Developer', desc: 'CSE Student. Managed Android application development, database design, and architecture.', photo: `${base}yogesh.jpeg`, linkedin: 'https://www.linkedin.com/in/yogesh-saini-ab24182bb/', github: 'https://github.com/yogeshsaini7172' },
  { name: 'Sandeep Kumar Maurya', role: 'UI/UX Designer', desc: 'CSE Student. Designed user workflows, interface prototypes, and visual assets.', photo: `${base}sandeep.jpeg`, linkedin: 'https://www.linkedin.com/in/sandeep-kumar-maurya-63a66130a/', github: 'https://github.com/SandeepMaurya7247' },
  { name: 'Deepak Kumar', role: 'Backend Developer', desc: 'CSE Student. Worked on server APIs, verification logic, and database schemas.', photo: `${base}deepak.jpeg`, portfolio: 'https://deepak-portfolioc.netlify.app/', linkedin: 'https://www.linkedin.com/in/deepak-kumar-84599b308/', github: 'https://github.com/deepakkumar7388' },
  { name: 'Utkarsh Mani Mishra', role: 'System Tester', desc: 'CSE Student. Handled QA testing, pilot runs, security audits, and deployment documentation.', photo: `${base}utkarsh.jpeg`, linkedin: 'https://www.linkedin.com/in/utkarsh-mani-mishra-98818128a/', github: '#' },
];

export default function TeamSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="developers" className="team-section" ref={ref}>
      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '60px' }}>
          <span className="section-tag" style={{ background:'var(--grad)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Avensoft</span>
          <h2 className="section-title">Developed by Team Avensoft</h2>
          <p className="section-desc">Meet the talented engineers and designers of Team Avensoft who built the SISTec DIGITAL PASS ecosystem.</p>
        </div>

        <div className="developer-grid">
          {team.map((member, i) => (
            <motion.div className="developer-card" key={i}
              onClick={() => setSelectedMember(member)}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <div className="developer-card-img-wrapper" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                <img
                  src={member.photo}
                  alt={member.name}
                  className="developer-card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="developer-card-fallback">👨‍💻</div>';
                  }}
                />
              </div>
              <div className="developer-card-overlay">
                <div className="developer-card-info">
                  <h3 className="developer-card-name">{member.name}</h3>
                  <span className="developer-card-role">{member.role}</span>
                  <div className="developer-socials" onClick={(e) => e.stopPropagation()}>
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-icon github">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <div className="team-modal-backdrop" onClick={() => setSelectedMember(null)}>
            <motion.div 
              className="team-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            >
              <div className="team-modal-image-col">
                <img src={selectedMember.photo} alt={selectedMember.name} 
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<div class="developer-card-fallback">👨‍💻</div>'; }}
                />
              </div>
              <div className="team-modal-info-col">
                <button className="team-modal-close" onClick={() => setSelectedMember(null)}>×</button>
                <div className="team-modal-details">
                  <h2>{selectedMember.name}</h2>
                  <span className="team-modal-role">{selectedMember.role}</span>
                  <p>{selectedMember.desc}</p>
                  
                  {selectedMember.portfolio && (
                    <a href={selectedMember.portfolio} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--grad)', color: '#fff', padding: '12px 24px', borderRadius: '100px', marginTop: '24px', fontSize: '13px', fontWeight: '800', textDecoration: 'none', letterSpacing: '0.05em', boxShadow: '0 10px 20px -5px rgba(192, 112, 40, 0.4)' }}>
                      🌐 VIEW PORTFOLIO
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
