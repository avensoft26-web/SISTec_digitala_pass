import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppShowcase from './components/AppShowcase';
import Workflow from './components/Workflow';
import OutingSimulator from './components/OutingSimulator';
import VideoGuide from './components/VideoGuide';
import Features from './components/Features';
import CampusRoles from './components/CampusRoles';
import DownloadApp from './components/DownloadApp';
import TeamSection from './components/TeamSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('sdp-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('sdp-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <AppShowcase />
        <Workflow />
        <OutingSimulator />
        <VideoGuide />
        <Features />
        <CampusRoles />
        <DownloadApp />
        <TeamSection />
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
