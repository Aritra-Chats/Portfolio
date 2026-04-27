import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { contact, personal } from '../data/portfolio';
import axios from 'axios';

// ── Network graph SVG ─────────────────────────────────────────────────────────
interface Node {
  id: string;
  label: string;
  icon: string;
  url: string;
  x: number;
  y: number;
  r: number;
}

const NODES: Node[] = [
  { id: 'email',    label: 'Email',    icon: '✉',  url: `mailto:${contact.email}`,   x: 300, y: 120, r: 22 },
  { id: 'linkedin', label: 'LinkedIn', icon: 'in',  url: contact.linkedin,             x: 480, y: 60,  r: 20 },
  { id: 'github',   label: 'GitHub',   icon: '◇',  url: contact.github,               x: 520, y: 200, r: 20 },
  { id: 'itchio',   label: 'itch.io',  icon: '🎮', url: contact.itchio,               x: 120, y: 180, r: 18 },
  { id: 'leetcode', label: 'LeetCode', icon: '⌨',  url: contact.leetcode,             x: 160, y: 60,  r: 18 },
];

const EDGES = [
  ['email', 'linkedin'],
  ['email', 'github'],
  ['email', 'itchio'],
  ['email', 'leetcode'],
  ['linkedin', 'github'],
  ['leetcode', 'itchio'],
];

function NetworkGraph() {
  const [hovered, setHovered] = useState<string | null>(null);

  const getNode = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div className="relative w-full max-w-lg mx-auto mb-10" style={{ height: 260 }}>
      <svg
        viewBox="0 0 640 260"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-bright">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {EDGES.map(([a, b]) => {
          const na = getNode(a);
          const nb = getNode(b);
          const isActive = hovered === a || hovered === b;
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x} y1={na.y}
              x2={nb.x} y2={nb.y}
              stroke={isActive ? 'rgba(240,240,240,0.4)' : 'rgba(240,240,240,0.1)'}
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray="4 6"
              filter={isActive ? 'url(#glow)' : 'none'}
              animate={{
                strokeDashoffset: [0, -20],
                opacity: isActive ? [0.4, 0.8, 0.4] : [0.1, 0.25, 0.1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const isHov = hovered === node.id;
          return (
            <a
              key={node.id}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ cursor: 'pointer' }}
            >
              <g
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Pulse ring */}
                <motion.circle
                  cx={node.x} cy={node.y}
                  r={node.r + 8}
                  fill="none"
                  stroke="rgba(240,240,240,0.15)"
                  strokeWidth="1"
                  animate={{ r: [node.r + 6, node.r + 14, node.r + 6], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: NODES.indexOf(node) * 0.5 }}
                />

                {/* Main circle */}
                <motion.circle
                  cx={node.x} cy={node.y}
                  r={node.r}
                  fill={isHov ? 'rgba(240,240,240,0.12)' : 'rgba(20,20,20,0.95)'}
                  stroke={isHov ? 'rgba(240,240,240,0.6)' : 'rgba(240,240,240,0.2)'}
                  strokeWidth="1.5"
                  filter={isHov ? 'url(#glow-bright)' : 'url(#glow)'}
                  animate={{ r: isHov ? node.r + 3 : node.r }}
                  transition={{ duration: 0.25 }}
                />

                {/* Icon */}
                <text
                  x={node.x} y={node.y + 4}
                  textAnchor="middle"
                  fontSize={node.r * 0.8}
                  fill={isHov ? '#fff' : '#999'}
                  style={{ fontFamily: 'monospace', userSelect: 'none' }}
                >
                  {node.icon}
                </text>

                {/* Label */}
                <text
                  x={node.x} y={node.y + node.r + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isHov ? '#f0f0f0' : '#555'}
                  style={{ fontFamily: '"JetBrains Mono", monospace', userSelect: 'none', letterSpacing: '0.1em' }}
                >
                  {node.label}
                </text>
              </g>
            </a>
          );
        })}
      </svg>
    </div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
type FormState = 'idle' | 'loading' | 'success' | 'error';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<FormState>('idle');

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setState('loading');
    try {
      await axios.post('/api/contact', form);
      setState('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setState('error');
    }
    setTimeout(() => setState('idle'), 4000);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(240,240,240,0.1)',
    borderRadius: 10,
    color: '#e0e0e0',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    padding: '12px 16px',
  };

  const focusStyle = '1px solid rgba(240,240,240,0.3)';

  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{ background: 'rgba(14,14,14,0.8)', border: '1px solid rgba(240,240,240,0.08)' }}
    >
      <h3 className="font-heading font-bold text-xl text-ash-100 mb-1">Send a Message</h3>
      <p className="font-mono text-xs text-ash-500 mb-6 tracking-wider">
        I read every message. Response within 24–48 hours.
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[10px] tracking-widest text-ash-500 uppercase block mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              style={inputStyle}
              onFocus={(e) => { (e.target as HTMLInputElement).style.border = focusStyle; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.border = '1px solid rgba(240,240,240,0.1)'; }}
            />
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-widest text-ash-500 uppercase block mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@email.com"
              style={inputStyle}
              onFocus={(e) => { (e.target as HTMLInputElement).style.border = focusStyle; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.border = '1px solid rgba(240,240,240,0.1)'; }}
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] tracking-widest text-ash-500 uppercase block mb-1.5">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="What's on your mind?"
            rows={5}
            style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
            onFocus={(e) => { (e.target as HTMLTextAreaElement).style.border = focusStyle; }}
            onBlur={(e) => { (e.target as HTMLTextAreaElement).style.border = '1px solid rgba(240,240,240,0.1)'; }}
          />
        </div>

        {/* Status messages */}
        {state === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs text-ash-200"
          >
            ✓ Message sent. I'll be in touch soon.
          </motion.p>
        )}
        {state === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs"
            style={{ color: '#888' }}
          >
            Something went wrong. Email me directly at {contact.email}
          </motion.p>
        )}

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={state === 'loading' || !form.name || !form.email || !form.message}
            className="flex-1 font-mono text-sm tracking-wider py-3 rounded-xl transition-all duration-200"
            style={{
              background: state === 'loading' ? 'rgba(240,240,240,0.05)' : 'rgba(240,240,240,0.1)',
              border: '1px solid rgba(240,240,240,0.25)',
              color: state === 'loading' ? '#555' : '#f0f0f0',
              cursor: state === 'loading' ? 'wait' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (state !== 'loading') {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(240,240,240,0.16)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(240,240,240,0.4)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(240,240,240,0.1)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(240,240,240,0.25)';
            }}
          >
            {state === 'loading' ? 'Sending…' : 'Send Message →'}
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-mono text-sm tracking-wider py-3 rounded-xl transition-all duration-200"
            style={{
              border: '1px solid rgba(240,240,240,0.12)',
              color: '#888',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(240,240,240,0.3)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(240,240,240,0.12)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#888';
            }}
          >
            Download Résumé ↓
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-36 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Ambient light from top (echo of hero sun) */}
      <motion.div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          height: 300,
          background: 'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(160,160,160,0.06) 0%, transparent 100%)',
        }}
      />

      {/* Top separator */}
      <div
        className="absolute top-0 left-24 right-24 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(240,240,240,0.08), transparent)' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8" style={{ background: 'rgba(240,240,240,0.15)' }} />
            <span className="section-index">07</span>
            <div className="h-px w-8" style={{ background: 'rgba(240,240,240,0.15)' }} />
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-ash-100 mb-3">
            SIGNAL
          </h2>
          <p className="font-body text-sm text-ash-400 max-w-md mx-auto leading-relaxed">
            {personal.availability}
          </p>
        </motion.div>

        {/* Network graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <NetworkGraph />
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <ContactForm />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="font-mono text-[10px] tracking-widest text-ash-600 uppercase">
            Aritra Chatterjee · KIIT CSE '27 · Built with React + TypeScript
          </p>
          <p className="font-mono text-[10px] text-ash-700 mt-1">
            {contact.email}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
