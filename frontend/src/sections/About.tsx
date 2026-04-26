import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personal, metrics, images } from '../data/portfolio';

function MetricCard({ label, value, index }: { label: string; value: string; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl p-4 text-center group"
      style={{
        background: 'rgba(16,16,16,0.8)',
        border: '1px solid rgba(240,240,240,0.07)',
        transition: 'border-color 0.25s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(240,240,240,0.2)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(240,240,240,0.07)';
      }}
    >
      <p className="font-display text-3xl md:text-4xl tracking-wider text-ash-100 group-hover:text-white transition-colors">
        {value}
      </p>
      <p className="font-mono text-[10px] tracking-widest text-ash-500 uppercase mt-1 leading-tight">
        {label}
      </p>
    </motion.div>
  );
}

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const paragraphs = personal.bioLong.split('\n\n');

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-36 px-6 md:px-16 lg:px-24">
      {/* Top separator */}
      <div
        className="absolute top-0 left-24 right-24 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(240,240,240,0.08), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: bio */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="section-index">02</span>
                <div className="h-px w-8" style={{ background: 'rgba(240,240,240,0.15)' }} />
              </div>
              <h2 className="font-display text-5xl md:text-7xl tracking-wider text-ash-100 mb-2">
                ABOUT
              </h2>
            </motion.div>

            {/* Avatar (mobile only) */}
            <motion.div
              className="mb-8 flex lg:hidden"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <div
                className="w-20 h-20 rounded-full overflow-hidden"
                style={{
                  border: '1px solid rgba(240,240,240,0.2)',
                  boxShadow: '0 0 30px rgba(240,240,240,0.08)',
                }}
              >
                <img
                  src={images.avatar}
                  alt="Aritra Chatterjee"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(20%)' }}
                />
              </div>
            </motion.div>

            {/* Bio paragraphs */}
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                  className="font-body text-sm md:text-base leading-relaxed"
                  style={{ color: i === 0 ? '#d0d0d0' : '#888' }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Role chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {personal.seekingRoles.map((role) => (
                <span
                  key={role}
                  className="font-mono text-[10px] tracking-wider px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(240,240,240,0.04)',
                    border: '1px solid rgba(240,240,240,0.1)',
                    color: '#888',
                  }}
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Location + status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 flex items-center gap-4"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: '#f0f0f0', boxShadow: '0 0 8px rgba(240,240,240,0.5)' }}
                />
                <span className="font-mono text-xs text-ash-400">Open to Work</span>
              </div>
              <span className="font-mono text-xs text-ash-600">·</span>
              <span className="font-mono text-xs text-ash-500">{personal.location}</span>
            </motion.div>
          </div>

          {/* Right: metrics grid + portrait */}
          <div>
            {/* Portrait (desktop) */}
            <motion.div
              className="hidden lg:flex mb-10 justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: 240,
                  height: 280,
                  border: '1px solid rgba(240,240,240,0.12)',
                  boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 40px rgba(240,240,240,0.05)',
                }}
              >
                <img
                  src={images.avatarLarge}
                  alt="Aritra Chatterjee"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(10%)' }}
                />
                {/* overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)' }}
                />
                <div
                  className="absolute bottom-4 left-4 right-4"
                >
                  <p className="font-mono text-[10px] text-ash-300 tracking-wider">
                    KIIT CSE · Class of 2027
                  </p>
                  <p className="font-mono text-xs text-ash-100">9.15 CGPA</p>
                </div>
              </div>
            </motion.div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {metrics.map((m, i) => (
                <MetricCard key={m.label} label={m.label} value={m.value} index={i} />
              ))}
            </div>

            {/* Narrative quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8 pl-4"
              style={{ borderLeft: '2px solid rgba(240,240,240,0.15)' }}
            >
              <p className="font-body text-sm italic leading-relaxed" style={{ color: '#666' }}>
                "I build systems that work at scale — whether that's a REST API handling 1,000+ campus records,
                an offline Android app navigating by sensor, or a multiplayer game synchronising real-time player states.
                The common thread: clean architecture, real constraints, working software."
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
