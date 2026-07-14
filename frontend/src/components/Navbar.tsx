import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Career',   href: '#career' },
  { label: 'Contact',  href: '#contact' },
];

/** Map from section id → navItem href so we can drive scroll-spy */
const SECTION_IDS = navItems.map((n) => n.href.slice(1)); // ['about','skills',…]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeHref,  setActiveHref]  = useState<string | null>(null);

  // ── Scroll-spy: mark active section via IntersectionObserver ──────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHref(`#${id}`);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Scrolled flag (background blur) ───────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Nav click: close menu then scroll ────────────────────────────────────
  const handleNav = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <motion.nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: 'clamp(44px, 3.5vw, 64px)',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(240,240,240,0.06)' : 'none',
        transition: 'background 0.4s, border-bottom 0.4s, backdrop-filter 0.4s',
      }}
    >
      {/* Logo / Name — Step 6: aria-label added */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="font-display text-xl tracking-widest text-ash-100 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/30 rounded-sm"
      >
        AC
      </button>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8" role="list">
        {navItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => handleNav(item.href)}
              aria-current={activeHref === item.href ? 'page' : undefined}
              className="font-mono text-[11px] tracking-[0.2em] text-ash-400 hover:text-ash-100 transition-colors uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/30 rounded-sm"
              style={{
                color: activeHref === item.href ? '#e0e0e0' : undefined,
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.2em] px-4 py-1.5 border border-ash-200/20 text-ash-200 hover:border-ash-100/50 hover:text-white rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
          >
            Résumé ↗
          </a>
        </li>
      </ul>

      {/* Mobile menu toggle — Step 5: wrapped in -m-2 p-2 for 44px+ tap target */}
      <button
        className="md:hidden -m-2 p-2 flex flex-col gap-1.5 w-10 h-10 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30 rounded-sm"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-dropdown"
      >
        <motion.span
          className="h-px w-6 bg-ash-100 block"
          animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className="h-px w-6 bg-ash-100 block"
          animate={{ opacity: menuOpen ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
        <motion.span
          className="h-px w-6 bg-ash-100 block"
          animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-ink-100/95 backdrop-blur-xl border-b border-white/5 py-4"
            style={{ top: 'clamp(44px, 3.5vw, 64px)' }}
          >
            <ul className="flex flex-col gap-1 px-6" role="list">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNav(item.href)}
                    aria-current={activeHref === item.href ? 'page' : undefined}
                    className="w-full text-left font-mono text-sm tracking-wider text-ash-300 hover:text-white py-3 border-b border-white/5 transition-colors uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-wider inline-block px-4 py-2 border border-ash-200/20 text-ash-200 hover:border-ash-100/50 hover:text-white rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                >
                  Download Résumé ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
