import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/portfolio';

const CATEGORY_COLORS: Record<string, string> = {
  Languages:   'rgba(240,240,240,0.06)',
  Frameworks:  'rgba(240,240,240,0.04)',
  Databases:   'rgba(240,240,240,0.04)',
  Tools:       'rgba(240,240,240,0.03)',
  'AI / LLM':  'rgba(240,240,240,0.05)',
};

const CATEGORY_ACCENT: Record<string, string> = {
  Languages:   'rgba(240,240,240,0.22)',
  Frameworks:  'rgba(240,240,240,0.16)',
  Databases:   'rgba(240,240,240,0.14)',
  Tools:       'rgba(240,240,240,0.12)',
  'AI / LLM':  'rgba(240,240,240,0.18)',
};

function SkillBadge({
  name,
  level,
  index,
}: {
  name: string;
  level?: string;
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        className="px-3.5 py-2 rounded-lg font-mono text-xs tracking-wide cursor-default transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(240,240,240,0.09)',
          color: '#aaa',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)';
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(240,240,240,0.22)';
          (e.currentTarget as HTMLDivElement).style.color = '#f0f0f0';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(240,240,240,0.09)';
          (e.currentTarget as HTMLDivElement).style.color = '#aaa';
        }}
      >
        {name}
        {level === 'proficient' && (
          <span
            className="ml-2 inline-block w-1 h-1 rounded-full align-middle"
            style={{ background: '#f0f0f0', opacity: 0.6 }}
          />
        )}
      </div>
    </motion.div>
  );
}

function CategorySwimlane({
  category,
  items,
  index,
}: {
  category: string;
  items: { name: string; level?: string }[];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10"
    >
      {/* Lane header */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="h-px flex-1"
          style={{ background: `linear-gradient(to right, ${CATEGORY_ACCENT[category]}, transparent)` }}
        />
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-ash-400">
          {category}
        </span>
        <span
          className="font-mono text-[10px] px-2 py-0.5 rounded-full"
          style={{
            background: CATEGORY_COLORS[category],
            border: `1px solid ${CATEGORY_ACCENT[category]}`,
            color: '#666',
          }}
        >
          {items.length}
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <SkillBadge key={skill.name} name={skill.name} level={skill.level} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 0.3'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const headerY = useTransform(smooth, [0, 1], [40, 0]);
  const headerOpacity = useTransform(smooth, [0, 0.6], [0, 1]);

  const categories = Object.entries(skills);

  return (
    <section id="skills" ref={containerRef} className="relative py-24 md:py-36 px-6 md:px-16 lg:px-24">
      {/* Subtle top gradient border */}
      <div
        className="absolute top-0 left-24 right-24 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(240,240,240,0.08), transparent)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-16">
          <div className="flex items-baseline gap-4 mb-3">
            <span className="section-index">04</span>
            <div className="h-px w-8" style={{ background: 'rgba(240,240,240,0.15)' }} />
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-ash-100 mb-4">
            TECH STACK
          </h2>
          <p className="font-mono text-xs tracking-widest text-ash-500 uppercase max-w-lg">
            Languages · Frameworks · Databases · Tools · AI / LLM
          </p>
        </motion.div>

        {/* Swimlanes */}
        <div>
          {categories.map(([category, items], i) => (
            <CategorySwimlane key={category} category={category} items={items} index={i} />
          ))}
        </div>

        {/* Concepts row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 pt-10"
          style={{ borderTop: '1px solid rgba(240,240,240,0.06)' }}
        >
          <p className="font-mono text-[10px] tracking-widest text-ash-500 uppercase mb-4">
            Core Concepts
          </p>
          <p
            className="font-mono text-xs leading-relaxed"
            style={{ color: '#555' }}
          >
            REST API Design · JWT Authentication · RBAC · Offline-First Architecture ·
            State Machine Design · Client-Server Networking · Multiplayer Concurrency Control ·
            RAG Pipelines · Multi-model LLM Routing · Sensor-based Navigation · OOP · SOLID
          </p>
        </motion.div>
      </div>
    </section>
  );
}
