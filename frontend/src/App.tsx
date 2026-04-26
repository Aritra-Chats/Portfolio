import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './sections/Hero';
import ProjectsSection from './sections/Projects';
import CareerSection from './sections/Career';
import ContactSection from './sections/Contact';

// ── Loading screen ─────────────────────────────────────────────────────────
function LoadingScreen({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0a0a0a' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="font-display text-4xl tracking-widest text-ash-200"
              style={{ lineHeight: 1 }}
            >
              AC
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-mono text-[10px] tracking-[0.4em] text-ash-600 uppercase mt-8"
          >
            Loading
          </motion.p>

          {/* Spinner sits under Loading text */}
          <motion.div
            className="rounded-full mt-5"
            style={{
              width: 34,
              height: 34,
              border: '1px solid rgba(240,240,240,0.16)',
              borderTop: '1px solid rgba(240,240,240,0.62)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Progress indicator ─────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setProgress(window.scrollY / scrollHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-px"
      style={{ background: 'rgba(240,240,240,0.04)' }}
    >
      <motion.div
        className="h-full"
        style={{
          background: 'linear-gradient(to right, rgba(240,240,240,0.3), rgba(240,240,240,0.8))',
          width: `${progress * 100}%`,
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
}

// ── Back to top button ─────────────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm transition-all"
          style={{
            background: 'rgba(20,20,20,0.9)',
            border: '1px solid rgba(240,240,240,0.15)',
            color: '#888',
            backdropFilter: 'blur(8px)',
          }}
          whileHover={{ scale: 1.1, borderColor: 'rgba(240,240,240,0.35)', color: '#f0f0f0' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen done={loaded} />
      <ScrollProgress />

      <Navbar />
      <BackToTop />

      <main>
        {/* Section 1: Hero (orbital sun + avatar/about + tech stack reveal) */}
        <HeroSection />

        {/* Section 4: Projects (iris open + filter grid) */}
        <ProjectsSection />

        {/* Section 5: Career (dossier split-screen) */}
        <CareerSection />

        {/* Section 6: Contact (network graph + form) */}
        <ContactSection />
      </main>
    </>
  );
}
