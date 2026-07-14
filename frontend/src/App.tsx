import { useEffect, useRef, useState } from 'react';
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
          // Step 6: role=status + aria-live so screen readers announce loading state
          role="status"
          aria-live="polite"
          aria-label="Portfolio loading"
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

          {/* Step 2: spinner 32px (4×8pt) — was 34px which is off-grid */}
          <motion.div
            className="rounded-full mt-5"
            aria-hidden="true"
            style={{
              width: 32,
              height: 32,
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

// ── Progress indicator — Step 7: ref+DOM bypasses React reconciler on every scroll tick ──
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-px"
      style={{ background: 'rgba(240,240,240,0.04)' }}
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-0"
        style={{
          background: 'linear-gradient(to right, rgba(240,240,240,0.3), rgba(240,240,240,0.8))',
          // No React state, no reconciler — direct DOM mutation keeps this at 60fps
          willChange: 'width',
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
          className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
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
  // Step 7: reduced from 1200ms to 800ms — monogram reads in ~500ms; extra 300ms is buffer
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen done={loaded} />
      <ScrollProgress />

      {/* Step 6: skip link — appears on first Tab keypress, lets keyboard users skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:rounded-lg focus:font-mono focus:text-sm focus:text-ash-100 focus:outline focus:outline-2 focus:outline-white/40"
        style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' }}
      >
        Skip to main content
      </a>

      {/* Step 6: <header> semantics for the nav landmark */}
      <header>
        <Navbar />
      </header>

      <BackToTop />

      <main id="main-content">
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
