import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/team.css';

const team = [
  { name: 'Yogesh Saini', role: 'Lead Developer', desc: 'CSE Student. Managed Android application development, database design, and architecture.', photo: '/yogesh.jpeg' },
  { name: 'Sandeep Kumar Maurya', role: 'UI/UX Designer', desc: 'CSE Student. Designed user workflows, interface prototypes, and visual assets.', photo: '/sandeep.jpeg' },
  { name: 'Deepak Kumar', role: 'Backend Developer', desc: 'CSE Student. Worked on server APIs, verification logic, and database schemas.', photo: '/deepak.jpeg', portfolio: 'https://deepak-portfolioc.netlify.app/' },
  { name: 'Utkarsh Mani Mishra', role: 'System Tester', desc: 'CSE Student. Handled QA testing, pilot runs, security audits, and deployment documentation.', photo: '/utkarsh.jpeg' },
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
                  <p className="developer-card-desc">{member.desc}</p>
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
