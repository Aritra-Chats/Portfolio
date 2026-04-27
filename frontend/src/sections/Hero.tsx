import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { metrics, orbitIcons, personal, skills } from '../data/portfolio';
import { adaptiveViewportValue } from '../utils/viewport';

/* ─── helpers ─────────────────────────────────────────────── */
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

function useViewportSize() {
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  useEffect(() => {
    const onResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
}

function seeded(seed: number) {
  const x = Math.sin(seed * 91.177) * 10000;
  return x - Math.floor(x);
}

type ScatterCard = {
  id: string;
  kind: 'metric' | 'role' | 'status';
  title: string;
  value: string;
  left: number;
  top: number;
  rot: number;
  w: number;
};

function buildScatterCards(isMobile: boolean): ScatterCard[] {
  const metricCards = metrics.map((m) => ({
    id: `m-${m.label}`,
    kind: 'metric' as const,
    title: m.label,
    value: m.value,
  }));

  const roleCards = personal.seekingRoles.map((role) => ({
    id: `r-${role}`,
    kind: 'role' as const,
    title: 'Role',
    value: role,
  }));

  const statusCards = [
    {
      id: 's-open',
      kind: 'status' as const,
      title: 'Status',
      value: 'Open to Work · Bhubaneswar, India',
    },
  ];

  const source = [...metricCards, ...roleCards, ...statusCards];

  const items = source.slice(0, isMobile ? 8 : source.length);
  const placed: Array<{ left: number; top: number; w: number; h: number }> = [];

  return items.map((card, i) => {
    const w = card.kind === 'metric' ? (isMobile ? 120 : 162) : (isMobile ? 140 : 210);
    const h = card.kind === 'metric' ? (isMobile ? 62 : 72) : (isMobile ? 70 : 84);

    let pickLeft = 50;
    let pickTop = 50;

    for (let attempt = 0; attempt < 90; attempt += 1) {
      const a = seeded((i + 1) * 37 + attempt * 11);
      const b = seeded((i + 1) * 71 + attempt * 13);
      let left = 7 + a * 86;
      let top = 9 + b * 78;

      // Keep center lane cleaner so avatar remains midground focus.
      if (left > 36 && left < 64 && top > 17 && top < 83) {
        left += left < 50 ? -19 : 19;
        top += top < 52 ? -12 : 10;
      }

      const overlap = placed.some((p) => {
        const dx = Math.abs(left - p.left);
        const dy = Math.abs(top - p.top);
        const minDx = ((w + p.w) / 2 / (isMobile ? 3.1 : 3.9)) + 2.8;
        const minDy = ((h + p.h) / 2 / (isMobile ? 4.6 : 5.8)) + 2.4;
        return dx < minDx && dy < minDy;
      });

      if (!overlap) {
        pickLeft = left;
        pickTop = top;
        break;
      }
    }

    const left = Math.max(4, Math.min(96, pickLeft));
    const top = Math.max(7, Math.min(92, pickTop));
    const rot = -7 + seeded(i + 141) * 14;

    placed.push({ left, top, w, h });

    return {
      ...card,
      left,
      top,
      rot,
      w,
    };
  });
}

/* ─── Tech stack for the pill-reveal panel ─────────────────── */
const TECH_CATEGORIES = Object.entries(skills).map(([cat, items]) => ({
  cat,
  items: items.map(s => s.name),
}));

/* ═══════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const viewport = useViewportSize();
  const OR = adaptiveViewportValue(viewport, 'x', isMobile ? 0.23 : 0.103, {
    min: isMobile ? 80 : 132,
    max: isMobile ? 106 : 168,
  }); // orbit radius
  const initialAvatarSize = adaptiveViewportValue(viewport, 'x', isMobile ? 0.5 : 0.136, {
    min: isMobile ? 156 : 180,
    max: isMobile ? 206 : 220,
  });
  const wordsLiftY = adaptiveViewportValue(viewport, 'y', isMobile ? -0.055 : -0.08, {
    min: isMobile ? -58 : -78,
    max: isMobile ? -34 : -52,
  });
  const avatarLiftY = wordsLiftY * 2.5;
  const expandedAvatarY = adaptiveViewportValue(viewport, 'y', isMobile ? -0.24 : -0.48, {
    min: isMobile ? -220 : -460,
    max: isMobile ? -132 : -320,
  });
  const scrollHintShiftY = adaptiveViewportValue(viewport, 'y', isMobile ? 0.083 : 0.108, {
    min: isMobile ? 50 : 70,
    max: isMobile ? 78 : 96,
  });
  const pillBottom = isMobile ? '10%' : '10.5%'; // ~1.25x from previous 14%
  const pillBottomRatio = isMobile ? 0.14 : 0.145;
  const ringShiftX = adaptiveViewportValue(viewport, 'x', -0.015, {
    min: -128,
    max: 128,
  });
  const ringShiftY = adaptiveViewportValue(viewport, 'y', -0.098, {
    min: -128,
    max: 128,
  });
  const scatterCards = useMemo(() => buildScatterCards(isMobile), [isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const s = useSpring(scrollYProgress, { stiffness: 55, damping: 22 });

  // ── scroll phases (980 vh) ─────────────────────────────────
  // 0.00 – 0.14  initial hero
  // 0.14 – 0.46  avatar expands into portrait, about cards appear
  // 0.44 – 0.62  hold expanded
  // 0.62 – 0.80  avatar collapses + about fades (SIMULTANEOUS)
  // 0.80 – 0.86  role pill fully visible again
  // 0.86 – 1.00  pill expands into tech stack panel

  const expandedW = isMobile
    ? Math.min(viewport.width * 0.78, 360)
    : Math.min(viewport.width * 0.38, 540);
  const expandedH = Math.min(viewport.height * 0.98, isMobile ? 760 : 940);

  // Avatar morphs from circle to portrait without non-uniform scaling.
  const avW = useTransform(s, [0, 0.22, 0.62, 0.8, 1], [initialAvatarSize, expandedW, expandedW, initialAvatarSize, initialAvatarSize]);
  const avH = useTransform(s, [0, 0.22, 0.62, 0.8, 1], [initialAvatarSize, expandedH, expandedH, initialAvatarSize, initialAvatarSize]);
  const avY = useTransform(
    s,
    [0, 0.22, 0.62, 0.8, 1],
    [avatarLiftY, expandedAvatarY, expandedAvatarY, avatarLiftY, avatarLiftY]
  );
  const avBR = useTransform(s, [0, 0.18, 0.62, 0.8], [9999, 28, 28, 9999]);

  // avatar ring border fades when expanding
  const ringOpacity = useTransform(s, [0.1, 0.2], [1, 0]);

  // orbit returns after avatar recollapse, then fades out again during tech panel pull-up.
  const orbitOp = useTransform(s, [0, 0.12, 0.22, 0.76, 0.83, 0.9, 0.985, 1], [1, 0.8, 0, 0, 1, 1, 0, 0]);

  // name + scroll hint follow the same return-and-fade choreography as orbit/avatar.
  const nameOp = useTransform(s, [0, 0.1, 0.21, 0.76, 0.83, 0.9, 0.985, 1], [1, 1, 0, 0, 1, 1, 0, 0]);

  // intro pill appears immediately, then disappears before avatar expansion.
  const introPillOp = useTransform(s, [0, 0.16, 0.23], [1, 1, 0]);

  // same role pill returns only after avatar has fully collapsed.
  const returnPillOp = useTransform(s, [0.8, 0.83, 1], [0, 1, 1]);

  // about cards appear during expansion, fade during collapse
  const aboutBgOp = useTransform(s, [0.2, 0.34, 0.62, 0.8], [0, 1, 1, 0]);
  const aboutBgDY = useTransform(s, [0.2, 0.34], [20, 0]);
  const aboutSummaryOp = useTransform(s, [0.24, 0.36, 0.62, 0.8], [0, 1, 1, 0]);

  // expansion starts only after role pill is fully visible in post-collapse state.
  const techShellOp = useTransform(s, [0.86, 0.9], [0, 1]);
  const techPanelUpshift = isMobile ? -1 : -4;
  const techDY = techPanelUpshift;
  const availableTechHeight = viewport.height - viewport.height * pillBottomRatio - (isMobile ? 28 : 40) - techPanelUpshift;
  const maxTechHeight = isMobile ? 520 : 620;
  const finalTechHeight = Math.max(
    isMobile ? 388 : 488,
    Math.min(availableTechHeight, maxTechHeight) - 20
  );
  const finalTechWidth = isMobile ? viewport.width * 0.94 : Math.min(viewport.width * 0.9, 1240);
  const techShellH = useTransform(s, [0.9, 0.985], [48, finalTechHeight]);
  const techShellBR = useTransform(s, [0.86, 0.96], [18, 24]);
  const techShellBorder = useTransform(
    s,
    [0.86, 0.96],
    ['rgba(240,240,240,0.22)', 'rgba(240,240,240,0.10)']
  );
  const techContentOp = 1;
  const pillTopInset = isMobile ? 40 : 48;
  const pillFinalRise = Math.max(0, Math.min(finalTechHeight + techDY - pillTopInset, isMobile ? 430 : 560));
  const returnPillY = useTransform(s, [0.8, 0.84, 0.9, 0.985, 1], [0, -8, -8, -pillFinalRise, -pillFinalRise]);
  const techContentTopInset = isMobile ? 72 : 84;
  // Avatar fade-out as rectangle grows (0.9 to 0.985)
  const avatarFadeOp = useTransform(s, [0.9, 0.985], [1, 0]);

  const rolePillText =
    'Software Engineer | MERN-Stack Web Developer | Android Developer | Game Developer';

  return (
    <div ref={containerRef} style={{ height: '760vh' }}>
      <motion.div className="hero-stage-height sticky top-0 w-full overflow-hidden">

        {/* solid stage backdrop so later sections don't bleed into this storyboard */}
        <div className="absolute inset-0" style={{ background: '#0a0a0a', zIndex: 0 }} />

        {/* ── subtle radial bg ─ */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(70,70,70,0.07) 0%, transparent 70%)', zIndex: 1 }}
        />

        {/* ══ ORBIT RING (plain div – no Framer Motion = no transform conflict) ══ */}
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ opacity: orbitOp, zIndex: 2, x: ringShiftX, y: ringShiftY }}
        >
          {/* The orbit-ring div is NOT a motion.div so CSS animation works correctly */}
          <div
            className="orbit-ring relative"
            style={{ width: OR * 2, height: OR * 2, flexShrink: 0 }}
          >
            {orbitIcons.map((icon, i) => {
              const angle = (360 / orbitIcons.length) * i * (Math.PI / 180);
              const x = OR + Math.cos(angle) * OR;
              const y = OR + Math.sin(angle) * OR;
              return (
                <div
                  key={icon.name}
                  className="orbit-icon-inner absolute"
                  style={{ left: x, top: y }}
                  title={icon.name}
                >
                  <div
                    className="w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: 'rgba(18,18,18,0.92)',
                      border: '1px solid rgba(240,240,240,0.12)',
                    }}
                  >
                    {/* COLORED icons – no grayscale filter */}
                    <img
                      src={icon.icon}
                      alt={icon.name}
                      className="w-5 h-5 md:w-6 md:h-6"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ══ AVATAR (Framer Motion – no CSS animation conflict) ══ */}
        <motion.div
          className="absolute"
          style={{
            width: avW,
            height: avH,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: avY,
            opacity: avatarFadeOp,
            borderRadius: avBR,
            zIndex: 5,
            overflow: 'hidden',
            transformOrigin: 'center center',
          }}
        >
          {/* Photo from /public/avatar.jpg – user places file there */}
          <img
            src="/avatar.jpg"
            alt="Aritra Chatterjee"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              // fallback to LinkedIn avatar if local file missing
              (e.currentTarget as HTMLImageElement).src =
                'https://avatars.githubusercontent.com/u/147392149?v=4';
            }}
          />

          {/* Ring border – fades out as avatar expands */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: ringOpacity,
              borderRadius: 'inherit',
              boxShadow: 'inset 0 0 0 2.5px rgba(240,240,240,0.35), 0 0 40px rgba(240,240,240,0.15)',
            }}
          />
        </motion.div>

        {/* ══ NAME + SCROLL HINT (fades when expanding) ══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 pointer-events-none"
          style={{ opacity: nameOp, zIndex: 3, y: wordsLiftY }}
        >
          <motion.h1
            className="font-display text-5xl md:text-8xl tracking-widest text-ash-100 text-center mb-6 px-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            ARITRA CHATTERJEE
          </motion.h1>

          <motion.div
            className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            style={{ y: scrollHintShiftY }}
          >
            <span className="font-mono text-[10px] tracking-[0.35em] text-ash-500 uppercase">Scroll</span>
            <motion.div
              className="w-px h-8"
              style={{ background: 'linear-gradient(to bottom, #666, transparent)' }}
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* ══ PILL (initial state) ══ */}
        <motion.div
          className="absolute left-0 right-0 flex justify-center pointer-events-none"
          style={{ bottom: pillBottom, opacity: introPillOp, zIndex: 6 }}
        >
          <div
            className="px-6 py-2.5 rounded-full font-mono text-xs md:text-sm tracking-wider"
            style={{
              background: 'rgba(16,16,16,0.82)',
              border: '1px solid rgba(240,240,240,0.18)',
              backdropFilter: 'blur(14px)',
              width: isMobile ? '90vw' : 'min(92vw, 860px)',
              textAlign: 'center',
            }}
          >
            <span className="block text-ash-200">{rolePillText}</span>
          </div>
        </motion.div>

        {/* ══ ABOUT BACKGROUND CARDS (randomized, behind avatar) ══ */}
        {scatterCards.map((card, i) => (
          <motion.div
            key={card.id}
            className="absolute pointer-events-none"
            style={{
              left: `${card.left}%`,
              top: `${card.top}%`,
              x: '-50%',
              y: aboutBgDY,
              rotate: card.rot,
              opacity: aboutBgOp,
              zIndex: 3,
              width: card.w,
            }}
            transition={{ duration: 0.45, delay: i * 0.01 }}
          >
            <div
              className="p-3.5 rounded-xl"
              style={{
                background: 'rgba(12,12,12,0.7)',
                border: '1px solid rgba(240,240,240,0.08)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <p className="font-mono text-[9px] tracking-[0.2em] text-ash-500 uppercase mb-1">
                {card.title}
              </p>
              <p className="font-mono text-[11px] text-ash-300 leading-snug">{card.value}</p>
            </div>
          </motion.div>
        ))}

        {/* Summary foreground during avatar expansion */}
        <motion.div
          className="absolute left-1/2 pointer-events-none"
          style={{
            bottom: isMobile ? '12%' : '10%',
            x: '-50%',
            opacity: aboutSummaryOp,
            zIndex: 7,
            width: isMobile ? '92vw' : 'min(92vw, 980px)',
          }}
        >
          <div
            className="rounded-2xl p-4 md:p-5"
            style={{
              background: 'rgba(10,10,10,0.86)',
              border: '1px solid rgba(240,240,240,0.12)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ash-500 mb-2 text-center">About</p>
            <p className="font-body text-xs md:text-sm text-ash-200 leading-relaxed text-center">
              I build production-ready systems across web, Android, and real-time game networking with a strong backend foundation.
            </p>
            <p className="font-body text-xs md:text-sm text-ash-300 leading-relaxed mt-2 text-center">
              At KIIT CSE (CGPA 9.15), I am building Kampus Life with 30+ APIs, JWT + RBAC security, and offline-first Android workflows.
            </p>
            <p className="font-body text-xs md:text-sm text-ash-300 leading-relaxed mt-2 text-center">
              I also design multiplayer and local-AI systems with ownership from architecture to deployment.
            </p>
          </div>
        </motion.div>

        {/* ══ PILL (post-collapse, fully visible before expansion starts) ══ */}
        <motion.div
          className="absolute left-0 right-0 flex justify-center pointer-events-none"
          style={{ bottom: pillBottom, opacity: returnPillOp, y: returnPillY, zIndex: 9 }}
        >
          <div
            className="px-6 py-2.5 rounded-full font-mono text-xs md:text-sm tracking-wider"
            style={{
              background: 'rgba(16,16,16,0.88)',
              border: '1px solid rgba(240,240,240,0.2)',
              backdropFilter: 'blur(14px)',
              width: isMobile ? '90vw' : 'min(92vw, 860px)',
              textAlign: 'center',
            }}
          >
            <span className="block text-ash-200">{rolePillText}</span>
          </div>
        </motion.div>

        {/* ══ TECH STACK REVEAL PANEL (after avatar collapses) ══ */}
        <motion.div
          className="absolute left-1/2 pointer-events-none"
          style={{
            bottom: pillBottom,
            x: '-50%',
            opacity: techShellOp,
            y: techDY,
            zIndex: 8,
          }}
        >
          <motion.div
            className="relative z-10 w-full max-w-4xl overflow-hidden"
            style={{
              width: finalTechWidth,
              height: techShellH,
              borderRadius: techShellBR,
              background: 'rgba(10,10,10,0.96)',
              border: '1px solid',
              borderColor: techShellBorder,
              backdropFilter: 'blur(8px)',
              transformOrigin: 'center bottom',
            }}
          >
            <motion.div
              className="absolute inset-0 overflow-hidden flex flex-col"
              style={{
                padding: isMobile ? 14 : 22,
                paddingTop: techContentTopInset,
                opacity: techContentOp,
              }}
            >
              <motion.h2 className="font-display text-5xl md:text-7xl tracking-wider text-ash-100 mb-8" style={{ opacity: techContentOp }}>
                TECH STACK
              </motion.h2>

                <motion.div className="space-y-5 pr-1 flex-1 min-h-0" style={{ opacity: techContentOp, maxHeight: '100%', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {TECH_CATEGORIES.map((tc, ci) => (
                  <motion.div
                    key={tc.cat}
                    style={{ opacity: techContentOp }}
                    transition={{ delay: ci * 0.08 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-ash-500 uppercase">
                        {tc.cat}
                      </span>
                      <div className="h-px flex-1" style={{ background: 'rgba(240,240,240,0.06)' }} />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tc.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[11px] px-3 py-1.5 rounded-lg text-ash-300"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(240,240,240,0.09)',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p className="font-mono text-[10px] tracking-widest text-ash-600 uppercase mt-7 text-center animate-bounce" style={{ opacity: techContentOp }}>
                Keep scrolling →
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
}