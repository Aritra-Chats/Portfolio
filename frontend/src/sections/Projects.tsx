import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects, type Project, type ProjectCategory } from '../data/portfolio';

const FILTER_TABS: ProjectCategory[] = ['All', 'Full-Stack', 'Android', 'Game Dev', 'AI / LLM'];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const h = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, [query]);
  return matches;
}

// Aperture / iris SVG overlay
function IrisOverlay({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20"
      initial={{ clipPath: 'circle(100% at 50% 50%)' }}
      animate={{ clipPath: isOpen ? 'circle(0% at 50% 50%)' : 'circle(100% at 50% 50%)' }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: '#0a0a0a' }}
      aria-hidden="true"
    />
  );
}

// Tech icon pill
function TechIcon({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,240,240,0.08)' }}
      title={label}
    >
      <img
        src={src}
        alt={label}
        className="w-3.5 h-3.5"
        style={{ filter: 'grayscale(100%) brightness(1.6)' }}
      />
      <span className="font-mono text-xs text-ash-400">{label}</span>
    </div>
  );
}

// Status badge — Step 1/index.css: pulse-dot class replaces broken inline animation ref
function StatusBadge({ status }: { status: Project['status'] }) {
  const label = status === 'active' ? 'Active' : status === 'completed' ? 'Done' : 'Archived';
  const color = status === 'active' ? 'rgba(240,240,240,0.7)' : '#555';
  return (
    <span
      className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
      style={{
        color,
        border: `1px solid ${color}`,
        background: status === 'active' ? 'rgba(240,240,240,0.04)' : 'transparent',
      }}
    >
      {status === 'active' && (
        // Step 1: use CSS class `pulse-dot` (defined in index.css) — the old inline
        // `animation: 'pulse 2s infinite'` referenced a non-existent keyframe and silently failed.
        <span
          className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle pulse-dot"
          style={{ background: color }}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}

// Featured hero card — Step 6: focus-within ring via CSS class, no JS needed
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      // Step 6: `project-card` class in index.css handles both hover and focus-within
      className="project-card group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(16,16,16,0.8)',
        border: '1px solid rgba(240,240,240,0.08)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Top bar */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(240,240,240,0.12), transparent)' }}
      />

      <div className="flex-1 p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <StatusBadge status={project.status} />
              <span className="font-mono text-[9px] text-ash-500 tracking-wider">{project.period}</span>
            </div>
            <h3 className="font-heading font-bold text-xl md:text-xl text-ash-100 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-ash-400 mt-0.5">{project.subtitle}</p>
          </div>
        </div>

        {/* Punch line */}
        <p className="font-body text-base md:text-sm text-ash-300 leading-relaxed mb-5 flex-1">
          {project.punch}
        </p>

        {/* Impact pills */}
        {project.impact.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.impact.map((item) => (
              <span
                key={item}
                className="font-mono text-[10px] px-2.5 py-1 rounded-full text-ash-300"
                style={{ background: 'rgba(240,240,240,0.04)', border: '1px solid rgba(240,240,240,0.1)' }}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Tech icons */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techIcons.slice(0, 4).map((src, i) => (
            <TechIcon key={i} src={src} label={project.techLabels[i] || ''} />
          ))}
          {project.techLabels.slice(project.techIcons.length).map((label) => (
            <span
              key={label}
              className="font-mono text-[10px] px-2.5 py-1 rounded-full text-ash-500"
              style={{ background: 'rgba(240,240,240,0.02)', border: '1px solid rgba(240,240,240,0.06)' }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
              style={{
                border: '1px solid rgba(240,240,240,0.15)',
                color: '#888',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(240,240,240,0.4)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(240,240,240,0.15)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#888';
              }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// Compact secondary card
function CompactCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="project-card group rounded-xl p-4 flex flex-col gap-2"
      style={{
        background: 'rgba(14,14,14,0.6)',
        border: '1px solid rgba(240,240,240,0.06)',
        transition: 'border-color 0.25s',
      }}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-heading font-semibold text-base md:text-sm text-ash-200 group-hover:text-white transition-colors">
          {project.title}
        </h4>
        <StatusBadge status={project.status} />
      </div>
      <p className="font-mono text-xs md:text-[11px] text-ash-500 leading-snug">{project.punch}</p>
      <div className="flex flex-wrap gap-1 mt-1">
        {project.techLabels.slice(0, 3).map((t) => (
          <span key={t} className="font-mono text-[9px] text-ash-500 px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,240,240,0.06)' }}>
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        {project.links.slice(0, 2).map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] text-ash-500 hover:text-ash-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30 rounded-sm"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Step 7: sentinel ref — IO-based sticky detection replaces getBoundingClientRect in scroll listener
  const filterSentinelRef = useRef<HTMLDivElement>(null);
  const [irisOpen, setIrisOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [filterSticky, setFilterSticky] = useState(false);
  const [showMobileFilterBar, setShowMobileFilterBar] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Trigger iris when section enters view
  const { ref: triggerRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  useEffect(() => {
    if (inView) setTimeout(() => setIrisOpen(true), 100);
  }, [inView]);

  // Mobile: show/hide the top filter bar based on section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileFilterBar(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Step 7: IO-based sticky detection — eliminates getBoundingClientRect layout-forcing call on every scroll tick
  useEffect(() => {
    if (isMobile) return;
    const sentinel = filterSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel (top of filter bar) exits the viewport from the top, go sticky
        setFilterSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: '-56px 0px 0px 0px' } // 56px = desktop nav height
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isMobile]);

  const featured   = projects.filter((p) => p.featured);
  const secondary  = projects.filter((p) => !p.featured);

  const filteredFeatured =
    activeFilter === 'All'
      ? featured
      : featured.filter((p) => p.categories.includes(activeFilter));

  const filteredSecondary =
    activeFilter === 'All'
      ? secondary
      : secondary.filter((p) => p.categories.includes(activeFilter));

  return (
    <section id="projects" ref={sectionRef} className="relative z-20 -mt-24 md:-mt-28 py-24 md:py-32 px-6 md:px-10 lg:px-16">
      {/* Iris trigger point */}
      <div ref={triggerRef} className="absolute top-0 left-0 right-0 h-1" aria-hidden="true" />

      {/* Iris overlay */}
      <IrisOverlay isOpen={irisOpen} />

      {/* ── Mobile-only sticky filter bar ── */}
      <AnimatePresence>
        {showMobileFilterBar && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 z-40 flex gap-2 overflow-x-auto px-4 py-2.5 md:hidden"
            role="toolbar"
            aria-label="Filter projects by category"
            style={{
              top: 'clamp(44px, 3.5vw, 64px)',
              background: 'rgba(10,10,10,0.92)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(240,240,240,0.08)',
              scrollbarWidth: 'none',
            }}
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                // Step 6: aria-pressed announces active filter to screen readers
                aria-pressed={activeFilter === tab}
                className="shrink-0 font-mono text-sm tracking-wider px-4 py-1.5 rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
                style={{
                  background: activeFilter === tab ? 'rgba(240,240,240,0.12)' : 'transparent',
                  border: `1px solid ${activeFilter === tab ? 'rgba(240,240,240,0.35)' : 'rgba(240,240,240,0.12)'}`,
                  color: activeFilter === tab ? '#f5f5f5' : '#909090',
                }}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section content — full width */}
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-baseline gap-4 mb-3">
            <span className="section-index">05</span>
            <div className="h-px w-8" style={{ background: 'rgba(240,240,240,0.15)' }} />
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-ash-100 mb-2">
            PROJECTS
          </h2>
          <p className="font-mono text-xs tracking-widest text-ash-500 uppercase">
            {projects.filter((p) => p.featured).length} featured · {projects.length} total
          </p>
        </motion.div>

        {/* Step 7: Sentinel div — IO watches this element to detect when filter bar should go sticky */}
        <div ref={filterSentinelRef} aria-hidden="true" />

        {/* Filter tabs — desktop only (mobile uses the sticky top bar above) */}
        <div className="mb-10 hidden md:block">
          <motion.div
            role="toolbar"
            aria-label="Filter projects by category"
            className={`flex flex-wrap gap-2 transition-all duration-300 ${
              filterSticky
                ? 'fixed top-14 left-0 right-0 z-30 px-6 md:px-10 lg:px-16 py-3'
                : ''
            }`}
            style={
              filterSticky
                ? { background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(240,240,240,0.06)' }
                : {}
            }
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                // Step 6: aria-pressed
                aria-pressed={activeFilter === tab}
                className="font-mono text-xs tracking-wider px-4 py-2 rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
                style={{
                  background: activeFilter === tab ? 'rgba(240,240,240,0.1)' : 'transparent',
                  border: `1px solid ${activeFilter === tab ? 'rgba(240,240,240,0.3)' : 'rgba(240,240,240,0.08)'}`,
                  color: activeFilter === tab ? '#f5f5f5' : '#909090',
                }}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Featured grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredFeatured.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
                {filteredFeatured.map((project, i) => (
                  <FeaturedCard key={project.id} project={project} index={i} />
                ))}
              </div>
            )}

            {/* Secondary row */}
            {filteredSecondary.length > 0 && (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1" style={{ background: 'rgba(240,240,240,0.06)' }} />
                  <span className="font-mono text-[10px] tracking-widest text-ash-500 uppercase">More Projects</span>
                  <div className="h-px flex-1" style={{ background: 'rgba(240,240,240,0.06)' }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredSecondary.map((project, i) => (
                    <CompactCard key={project.id} project={project} index={i} />
                  ))}
                </div>
              </>
            )}

            {filteredFeatured.length === 0 && filteredSecondary.length === 0 && (
              <div className="text-center py-16">
                <p className="font-mono text-sm text-ash-500">No projects in this category yet.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
