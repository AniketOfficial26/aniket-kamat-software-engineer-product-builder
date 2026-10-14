import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { CurrentlyExploring } from './components/CurrentlyExploring';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ConfigGuideModal } from './components/ConfigGuideModal';
import { CustomCursor } from './components/CustomCursor';
import { Analytics } from '@vercel/analytics/react';

// Lazy-load the persistent 3D background environment for zero initial blocking
const Persistent3DEnvironment = lazy(() =>
  import('./components/Persistent3DEnvironment').then((m) => ({
    default: m.Persistent3DEnvironment,
  }))
);

export default function App() {
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#EDEDED] relative selection:bg-[#BEF264] selection:text-[#090A0F] bg-grid-pattern">
      {/* Official Vercel Web Analytics tracker for real traffic measurement */}
      <Analytics />

      {/* Desktop fine-pointer custom cursor */}
      <CustomCursor />

      {/* Persistent, continuously animated 3D spatial environment behind content */}
      <Suspense fallback={null}>
        <Persistent3DEnvironment />
      </Suspense>

      {/* Top Navigation */}
      <Navbar onOpenGuide={() => setGuideModalOpen(true)} />

      {/* Main Content Landmark */}
      <main id="main-content" className="relative z-10">
        <Hero onOpenGuide={() => setGuideModalOpen(true)} />
        <About />
        <Skills />
        <Projects onOpenGuide={() => setGuideModalOpen(true)} />
        <CurrentlyExploring />
        <Contact onOpenGuide={() => setGuideModalOpen(true)} />
      </main>

      {/* Footer Landmark */}
      <Footer onOpenGuide={() => setGuideModalOpen(true)} />

      {/* Portfolio Configuration & Deployment Guide Modal */}
      <ConfigGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </div>
  );
}
