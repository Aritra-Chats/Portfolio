import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects, type Project, type ProjectCategory } from '../data/portfolio';

const FILTER_TABS: ProjectCategory[] = ['All', 'Full-Stack', 'Android', 'Game Dev', 'AI / LLM'];

// Aperture / iris SVG overlay
function IrisOverlay({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20"
      initial={{ clipPath: 'circle(100% at 50% 50%)' }}
      animate={{ clipPath: isOpen ? 'circle(0% at 50% 50%)' : 'circle(100% at 50% 50%)' }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: '#0a0a0a' }}
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
      <span className="font-mono text-[10px] text-ash-400">{label}</span>
    </div>
  );
}

// Status badge
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
        <span
          className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
          style={{ background: color, animation: 'pulse 2s infinite' }}
        />
      )}
      {label}
    </span>
  );
}

// Featured hero card
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(16,16,16,0.8)',
        border: '1px solid rgba(240,240,240,0.08)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(240,240,240,0.2)';
        el.style.boxShadow = '0 0 40px rgba(240,240,240,0.05)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(240,240,240,0.08)';
        el.style.boxShadow = 'none';
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
            <h3 className="font-heading font-bold text-xl text-ash-100 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-ash-400 mt-0.5">{project.subtitle}</p>
          </div>
        </div>

        {/* Punch line */}
        <p className="font-body text-sm text-ash-300 leading-relaxed mb-5 flex-1">
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
              className="font-mono text-[10px] tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-200"
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
      className="group rounded-xl p-4 flex flex-col gap-2"
      style={{
        background: 'rgba(14,14,14,0.6)',
        border: '1px solid rgba(240,240,240,0.06)',
        transition: 'border-color 0.25s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,240,240,0.14)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,240,240,0.06)';
      }}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-heading font-semibold text-sm text-ash-200 group-hover:text-white transition-colors">
          {project.title}
        </h4>
        <StatusBadge status={project.status} />
      </div>
      <p className="font-mono text-[11px] text-ash-500 leading-snug">{project.punch}</p>
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
            className="font-mono text-[9px] text-ash-500 hover:text-ash-200 transition-colors"
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
  const [irisOpen, setIrisOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [filterSticky, setFilterSticky] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Trigger iris when section enters view
  const { ref: triggerRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  useEffect(() => {
    if (inView) setTimeout(() => setIrisOpen(true), 100);
  }, [inView]);

  // Sticky filter bar
  useEffect(() => {
    const onScroll = () => {
      if (filterBarRef.current && sectionRef.current) {
        const filterRect = filterBarRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const stickyTop = 56;
        const hasReachedStickyPoint = filterRect.top <= stickyTop;
        // Stop sticky mode when leaving the Projects section.
        const isWithinProjectsSection = sectionRect.bottom > stickyTop + 80;
        setFilterSticky(hasReachedStickyPoint && isWithinProjectsSection);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  const filteredFeatured =
    activeFilter === 'All'
      ? featured
      : featured.filter((p) => p.categories.includes(activeFilter));

  const filteredSecondary =
    activeFilter === 'All'
      ? secondary
      : secondary.filter((p) => p.categories.includes(activeFilter));

  return (
    <section id="projects" ref={sectionRef} className="relative z-20 -mt-24 md:-mt-28 py-24 md:py-32 px-6 md:px-16 lg:px-24">
      {/* Iris trigger point */}
      <div ref={triggerRef} className="absolute top-0 left-0 right-0 h-1" />

      {/* Iris overlay */}
      <IrisOverlay isOpen={irisOpen} />

      {/* Section header */}
      <div className="max-w-6xl mx-auto">
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

        {/* Filter tabs */}
        <div ref={filterBarRef} className="mb-10">
          <motion.div
            className={`flex flex-wrap gap-2 transition-all duration-300 ${
              filterSticky
                ? 'fixed top-14 left-0 right-0 z-30 px-6 md:px-16 lg:px-24 py-3'
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
                className="font-mono text-xs tracking-wider px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  background: activeFilter === tab ? 'rgba(240,240,240,0.1)' : 'transparent',
                  border: `1px solid ${activeFilter === tab ? 'rgba(240,240,240,0.3)' : 'rgba(240,240,240,0.08)'}`,
                  color: activeFilter === tab ? '#f0f0f0' : '#666',
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
