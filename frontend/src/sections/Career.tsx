import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  experience,
  education,
  certifications,
  githubAchievements,
  featuredRepos,
  contact,
} from '../data/portfolio';

type DossierPanel = 'experience' | 'education' | 'certifications' | 'github';

const PANELS: { id: DossierPanel; label: string; icon: string }[] = [
  { id: 'experience',     label: 'Experience',      icon: '◈' },
  { id: 'education',      label: 'Education',       icon: '◉' },
  { id: 'certifications', label: 'Certifications',  icon: '◎' },
  { id: 'github',         label: 'GitHub',          icon: '◇' },
];

// ── Experience Panel ──────────────────────────────────────────────────────────
function ExperiencePanel() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {experience.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl overflow-hidden"
          style={{
            background: 'rgba(16,16,16,0.8)',
            border: `1px solid ${expanded === i ? 'rgba(240,240,240,0.18)' : 'rgba(240,240,240,0.07)'}`,
            transition: 'border-color 0.25s',
          }}
        >
          {/* Header row */}
          <button
            className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {exp.promotion && (
                  <span
                    className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full uppercase"
                    style={{ background: 'rgba(240,240,240,0.05)', border: '1px solid rgba(240,240,240,0.15)', color: '#888' }}
                  >
                    ↑ Promoted
                  </span>
                )}
                <span className="font-mono text-[10px] text-ash-500 tracking-wider">{exp.type}</span>
              </div>
              <h4 className="font-heading font-semibold text-base text-ash-100">{exp.role}</h4>
              <p className="font-mono text-xs text-ash-400 mt-0.5">{exp.org}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-mono text-[10px] text-ash-500">{exp.period}</p>
              <p className="font-mono text-[10px] text-ash-600">{exp.duration}</p>
              <motion.span
                className="inline-block mt-2 text-ash-500 font-mono text-xs"
                animate={{ rotate: expanded === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>
            </div>
          </button>

          {/* Accordion body */}
          <AnimatePresence>
            {expanded === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="px-5 pb-5 pt-1"
                  style={{ borderTop: '1px solid rgba(240,240,240,0.06)' }}
                >
                  {exp.promotion && (
                    <p className="font-mono text-[10px] text-ash-500 italic mb-3">
                      {exp.promotion}
                    </p>
                  )}
                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2 font-body text-sm text-ash-300 leading-relaxed">
                        <span className="text-ash-600 mt-0.5 shrink-0">—</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-full text-ash-500"
                        style={{ background: 'rgba(240,240,240,0.03)', border: '1px solid rgba(240,240,240,0.08)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ── Education Panel ───────────────────────────────────────────────────────────
function EducationPanel() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {education.map((edu, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl overflow-hidden"
          style={{
            background: 'rgba(16,16,16,0.8)',
            border: `1px solid ${expanded === i ? 'rgba(240,240,240,0.18)' : 'rgba(240,240,240,0.07)'}`,
            transition: 'border-color 0.25s',
          }}
        >
          <button
            className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex-1">
              {i === 0 && (
                <span
                  className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full uppercase mb-1.5 inline-block"
                  style={{ background: 'rgba(240,240,240,0.06)', border: '1px solid rgba(240,240,240,0.18)', color: '#aaa' }}
                >
                  Primary · {edu.gpa}
                </span>
              )}
              <h4 className="font-heading font-semibold text-sm text-ash-100 leading-snug">{edu.institution}</h4>
              <p className="font-mono text-xs text-ash-400 mt-0.5">{edu.degree}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-mono text-[10px] text-ash-500">{edu.period}</p>
              {i > 0 && <p className="font-mono text-[10px] text-ash-400 mt-0.5">{edu.gpa}</p>}
              <motion.span
                className="inline-block mt-2 text-ash-500 font-mono text-xs"
                animate={{ rotate: expanded === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>
            </div>
          </button>

          <AnimatePresence>
            {expanded === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-1" style={{ borderTop: '1px solid rgba(240,240,240,0.06)' }}>
                  <p className="font-mono text-[10px] text-ash-500 mb-3">{edu.location}</p>
                  {edu.activities && (
                    <p className="font-body text-sm text-ash-300 mb-3">
                      <span className="text-ash-500">Activities: </span>{edu.activities}
                    </p>
                  )}
                  {edu.coursework.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] text-ash-500 uppercase tracking-widest mb-2">Coursework</p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((c) => (
                          <span key={c} className="font-mono text-[10px] px-2.5 py-1 rounded-full text-ash-500"
                            style={{ background: 'rgba(240,240,240,0.03)', border: '1px solid rgba(240,240,240,0.08)' }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ── Certifications Panel ──────────────────────────────────────────────────────
function CertificationsPanel() {
  return (
    <div className="space-y-4">
      {certifications.map((cert, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl p-5"
          style={{
            background: 'rgba(16,16,16,0.8)',
            border: '1px solid rgba(240,240,240,0.1)',
          }}
        >
          {/* Stamp-style badge */}
          <div className="flex items-start gap-4 mb-4">
            <div
              className="shrink-0 w-14 h-14 rounded-lg flex items-center justify-center font-display text-2xl"
              style={{ background: 'rgba(240,240,240,0.04)', border: '2px solid rgba(240,240,240,0.15)' }}
            >
              ◎
            </div>
            <div>
              <div
                className="font-mono text-[10px] tracking-widest uppercase mb-1"
                style={{ color: '#666', border: '1px solid #333', display: 'inline-block', padding: '2px 8px', borderRadius: 4 }}
              >
                Verified · Udemy
              </div>
              <h4 className="font-heading font-bold text-base text-ash-100 leading-snug">
                {cert.title}
              </h4>
              <p className="font-mono text-xs text-ash-500 mt-0.5">{cert.issuer}</p>
            </div>
          </div>
          <ul className="space-y-2">
            {cert.highlights.map((h, j) => (
              <li key={j} className="flex gap-2 font-body text-sm text-ash-300 leading-relaxed">
                <span className="text-ash-600 shrink-0 mt-0.5">—</span>
                {h}
              </li>
            ))}
          </ul>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 font-mono text-[10px] tracking-wider px-3.5 py-1.5 rounded-full transition-all"
            style={{ border: '1px solid rgba(240,240,240,0.15)', color: '#888' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(240,240,240,0.35)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(240,240,240,0.15)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#888';
            }}
          >
            View on Udemy ↗
          </a>
        </motion.div>
      ))}

      {/* Learning note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-xl p-4"
        style={{ background: 'rgba(14,14,14,0.5)', border: '1px solid rgba(240,240,240,0.05)' }}
      >
        <p className="font-mono text-[11px] text-ash-500 leading-relaxed">
          Continuous learning through building: Kampus Life, PropHunt, and the Local LLM Assistant
          are all artefacts of hands-on system design — built under real constraints, shipped to production.
        </p>
      </motion.div>
    </div>
  );
}

// ── GitHub Panel ──────────────────────────────────────────────────────────────
function GithubPanel() {
  return (
    <div className="space-y-5">
      {/* Achievements */}
      <div>
        <p className="font-mono text-[10px] tracking-widest text-ash-500 uppercase mb-3">
          Achievements
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {githubAchievements.map((ach, i) => (
            <motion.div
              key={ach.badge}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl p-4 text-center"
              style={{
                background: 'rgba(16,16,16,0.8)',
                border: '1px solid rgba(240,240,240,0.1)',
              }}
            >
              <div className="font-display text-3xl mb-2 text-ash-300">
                {i === 0 ? '⚡' : i === 1 ? '🦈' : '🎲'}
              </div>
              <p className="font-heading font-semibold text-xs text-ash-100">{ach.badge}</p>
              <p className="font-mono text-[10px] text-ash-500 mt-1 leading-snug">{ach.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured repos */}
      <div>
        <p className="font-mono text-[10px] tracking-widest text-ash-500 uppercase mb-3">
          Featured Repositories
        </p>
        <div className="space-y-2">
          {featuredRepos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center justify-between p-4 rounded-xl group transition-all"
              style={{
                background: 'rgba(16,16,16,0.6)',
                border: '1px solid rgba(240,240,240,0.07)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(240,240,240,0.18)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(240,240,240,0.07)';
              }}
            >
              <div>
                <p className="font-mono text-sm text-ash-200 group-hover:text-white transition-colors">
                  {repo.name}
                </p>
                <p className="font-mono text-[10px] text-ash-500">{repo.lang}</p>
              </div>
              <span className="text-ash-500 group-hover:text-ash-200 transition-colors text-sm">↗</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* GitHub profile link */}
      <a
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-xs tracking-wider px-4 py-2 rounded-full transition-all"
        style={{ border: '1px solid rgba(240,240,240,0.15)', color: '#888' }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = 'rgba(240,240,240,0.35)';
          el.style.color = '#f0f0f0';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = 'rgba(240,240,240,0.15)';
          el.style.color = '#888';
        }}
      >
        View Full Profile on GitHub ↗
      </a>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function CareerSection() {
  const [activePanel, setActivePanel] = useState<DossierPanel>('experience');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const panelComponents: Record<DossierPanel, React.ReactNode> = {
    experience:     <ExperiencePanel />,
    education:      <EducationPanel />,
    certifications: <CertificationsPanel />,
    github:         <GithubPanel />,
  };

  return (
    <section id="career" ref={ref} className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24">
      {/* Top separator */}
      <div
        className="absolute top-0 left-24 right-24 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(240,240,240,0.08), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-baseline gap-4 mb-3">
            <span className="section-index">06</span>
            <div className="h-px w-8" style={{ background: 'rgba(240,240,240,0.15)' }} />
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-ash-100 mb-2">
            DOSSIER
          </h2>
          <p className="font-mono text-xs tracking-widest text-ash-500 uppercase">
            Experience · Education · Certifications · GitHub
          </p>
        </motion.div>

        {/* Dossier split-screen */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Left nav panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:w-48 shrink-0"
          >
            <div
              className="md:sticky md:top-20 rounded-2xl overflow-hidden"
              style={{ background: 'rgba(14,14,14,0.8)', border: '1px solid rgba(240,240,240,0.07)' }}
            >
              {PANELS.map((panel, i) => (
                <button
                  key={panel.id}
                  onClick={() => setActivePanel(panel.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left transition-all"
                  style={{
                    background: activePanel === panel.id ? 'rgba(240,240,240,0.06)' : 'transparent',
                    borderBottom: i < PANELS.length - 1 ? '1px solid rgba(240,240,240,0.05)' : 'none',
                    borderLeft: `2px solid ${activePanel === panel.id ? 'rgba(240,240,240,0.4)' : 'transparent'}`,
                  }}
                >
                  <span
                    className="font-mono text-base"
                    style={{ color: activePanel === panel.id ? '#f0f0f0' : '#444' }}
                  >
                    {panel.icon}
                  </span>
                  <span
                    className="font-mono text-xs tracking-wider uppercase"
                    style={{ color: activePanel === panel.id ? '#f0f0f0' : '#555' }}
                  >
                    {panel.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right content panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {panelComponents[activePanel]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
