import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Career', href: '#career' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(240,240,240,0.06)' : 'none',
        transition: 'background 0.4s, border-bottom 0.4s, backdrop-filter 0.4s',
      }}
    >
      {/* Logo / Name */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-display text-xl tracking-widest text-ash-100 hover:text-white transition-colors"
      >
        AC
      </button>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => handleNav(item.href)}
              className="font-mono text-xs tracking-wider text-ash-400 hover:text-ash-100 transition-colors uppercase"
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
            className="font-mono text-xs tracking-wider px-4 py-1.5 border border-ash-200/20 text-ash-200 hover:border-ash-100/50 hover:text-white rounded-full transition-all"
          >
            Résumé ↗
          </a>
        </li>
      </ul>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden flex flex-col gap-1.5 w-6"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <motion.span
          className="h-px w-full bg-ash-100 block"
          animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className="h-px w-full bg-ash-100 block"
          animate={{ opacity: menuOpen ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
        <motion.span
          className="h-px w-full bg-ash-100 block"
          animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 left-0 right-0 bg-ink-100/95 backdrop-blur-xl border-b border-white/5 py-4"
          >
            <ul className="flex flex-col gap-1 px-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="w-full text-left font-mono text-sm tracking-wider text-ash-300 hover:text-white py-3 border-b border-white/5 transition-colors uppercase"
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
                  className="font-mono text-xs tracking-wider inline-block px-4 py-2 border border-ash-200/20 text-ash-200 hover:border-ash-100/50 hover:text-white rounded-full transition-all"
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
