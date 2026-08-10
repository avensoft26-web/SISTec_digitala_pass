import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/team.css';

const faqs = [
  {
    q: 'How does the digital gate pass system differ from the paper system?',
    a: 'Unlike paper passes which require manual signatures from TG, Warden, and HOD, the digital system routes requests instantly through an online approval chain. It\'s faster, completely paperless, impossible to forge, and leaves a permanent digital audit trail.'
  },
  {
    q: 'What if a student\'s phone battery dies at the gate?',
    a: 'Security guards have access to the active pass list on their terminal. Even without their phone, a student can provide their ID or Roll Number, and the guard can verify their photo and active pass status directly from the system.'
  },
  {
    q: 'Is the system secure against spoofing?',
    a: 'Yes. Passes are dynamically generated with time-sensitive tokens and synchronized live with the gate terminal. Screenshots cannot be used because guards verify the active live state on their own console, and student photos are cross-referenced.'
  },
  {
    q: 'Do parents receive notifications for every outing?',
    a: 'Yes, parents receive automated SMS alerts at two crucial points: when the HOD finally approves the outing request, and exactly when the student checks out at the main gate terminal.'
  },
  {
    q: 'Can the system be used for Visitors?',
    a: 'Absolutely. The system features a dedicated Visitor Management Module that captures visitor photos, details, and host information, granting them temporary digital passes that are logged during entry and exit.'
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="faq-section" ref={ref}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-tag">Help Center</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={`faq-card ${openIdx === i ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <button className="faq-header" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                <span>{faq.q}</span>
                <svg viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="faq-body">
                <p>{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
