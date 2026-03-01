"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const reviewCards = [
  { text: "The delivery was extremely late. Totally unacceptable.", keywords: ["late"], rating: 1, author: "Sarah K." },
  { text: "Bad service at the counter. Nobody helped me!", keywords: ["bad service"], rating: 2, author: "James R." },
  { text: "Had to request a refund after waiting 2 hours.", keywords: ["refund"], rating: 1, author: "Priya M." },
  { text: "Food was cold and staff was rude throughout dinner.", keywords: ["rude"], rating: 2, author: "Carlos B." },
  { text: "Complete waste of money. Will not return.", keywords: ["waste"], rating: 1, author: "Ava D." },
  { text: "No response from management to my complaint.", keywords: ["no response"], rating: 2, author: "Tom H." },
  { text: "Overcharged and the quality was terrible.", keywords: ["overcharged", "terrible"], rating: 1, author: "Mei L." },
  { text: "Disappointed with the hygiene standards here.", keywords: ["hygiene"], rating: 2, author: "Rajan P." },
];

const pipelineSteps = [
  { label: "Customer Review", icon: "💬", color: "#6366f1" },
  { label: "Database", icon: "🗄️", color: "#8b5cf6" },
  { label: "Automation Engine", icon: "⚙️", color: "#a855f7" },
  { label: "AI Analysis", icon: "🧠", color: "#c084fc" },
  { label: "Dashboard", icon: "📊", color: "#e879f9" },
];

// ─── UTILITY ─────────────────────────────────────────────────────────────────

function highlightKeywords(text: string, keywords: string[]) {
  const parts: { text: string; highlight: boolean }[] = [];
  let remaining = text;
  let lastIndex = 0;

  keywords.forEach(kw => {
    const idx = remaining.toLowerCase().indexOf(kw.toLowerCase());
    if (idx !== -1) {
      if (idx > 0) parts.push({ text: remaining.slice(0, idx), highlight: false });
      parts.push({ text: remaining.slice(idx, idx + kw.length), highlight: true });
      remaining = remaining.slice(idx + kw.length);
    }
  });
  if (remaining) parts.push({ text: remaining, highlight: false });
  return parts;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function ReviewCard({ card, style }: { card: typeof reviewCards[0]; style?: React.CSSProperties }) {
  const parts = highlightKeywords(card.text, card.keywords);
  return (
    <div
      style={style}
      className="absolute glass rounded-2xl p-5 w-72 border border-white/10 shadow-2xl backdrop-blur-lg"
    >
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < card.rating ? "text-yellow-400" : "text-white/10"}>★</span>
        ))}
      </div>
      <p className="text-sm text-white/80 leading-relaxed mb-3 font-medium">
        {parts.map((p, i) =>
          p.highlight ? (
            <span key={i} className="text-rose-400 font-bold drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]">{p.text}</span>
          ) : p.text
        )}
      </p>
      <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">— {card.author}</p>
    </div>
  );
}

function FloatingOrb({ className }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`} />
  );
}

function ParticleField({ count = 40 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-400/40"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -80, -160] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function Section1() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <FloatingOrb className="w-[600px] h-[600px] bg-rose-600/10 top-0 left-1/2 -translate-x-1/2" />
      <FloatingOrb className="w-[400px] h-[400px] bg-indigo-600/10 bottom-0 right-0" />

      {/* Floating 3D Review Cards */}
      <div className="absolute inset-0 perspective-1000">
        {reviewCards.map((card, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${8 + (i % 4) * 24}%`,
              top: `${10 + Math.floor(i / 4) * 45}%`,
              rotateX: 15,
              rotateY: (i % 2 === 0 ? -1 : 1) * 5,
              transformStyle: "preserve-3d",
            }}
            animate={{
              y: [0, i % 2 === 0 ? -30 : -20, 0],
              rotateZ: [(i % 2 === 0 ? -2 : 2), 0, (i % 2 === 0 ? -2 : 2)],
            }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          >
            <ReviewCard card={card} />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay to create depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] font-black text-rose-400 uppercase tracking-[0.5em] mb-8 animate-pulse">
            The Problem
          </p>
          <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8">
            Thousands of reviews.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">
              Zero intelligence.
            </span>
          </h2>
          <p className="text-xl text-white/40 font-medium max-w-xl mx-auto leading-relaxed">
            Your customers are telling you exactly what's wrong. But buried in noise, those signals go unheard.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Section2() {
  const [absorbed, setAbsorbed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAbsorbed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <FloatingOrb className="w-[800px] h-[800px] bg-indigo-600/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <ParticleField count={60} />

      {/* Neural Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 60px rgba(99,102,241,0.4), 0 0 120px rgba(99,102,241,0.2)",
              "0 0 100px rgba(99,102,241,0.7), 0 0 200px rgba(99,102,241,0.4)",
              "0 0 60px rgba(99,102,241,0.4), 0 0 120px rgba(99,102,241,0.2)",
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-white/20 flex items-center justify-center"
          >
            <div className="text-4xl md:text-6xl">🧠</div>
          </motion.div>
        </motion.div>

        {/* Ring orbits */}
        {[80, 120, 160].map((size, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 border border-indigo-500/20 rounded-full"
            style={{ width: size * 2 + 192, height: size * 2 + 192, marginLeft: -(size * 2 + 192) / 2, marginTop: -(size * 2 + 192) / 2 }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Reviews flying in */}
      {reviewCards.slice(0, 5).map((card, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const startX = Math.cos(angle) * 450;
        const startY = Math.sin(angle) * 300;

        return (
          <motion.div
            key={i}
            className="absolute text-xs text-white/60 italic font-medium pointer-events-none"
            style={{ left: "50%", top: "50%" }}
            animate={{
              x: [startX, 0],
              y: [startY, 0],
              opacity: [0.8, 0],
              scale: [0.6, 0.1],
            }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, repeatDelay: 3, ease: "easeIn" }}
          >
            ★ "{card.text.slice(0, 30)}..."
          </motion.div>
        );
      })}

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-[500px] md:mt-[600px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-8">
            AI Processing
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8">
            We don't just collect feedback.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              We understand it.
            </span>
          </h2>
          <p className="text-xl text-white/40 font-medium max-w-xl mx-auto">
            Every review is absorbed, processed, and transformed into actionable intelligence in real-time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Section3() {
  const [score, setScore] = useState(0);
  const [urgency, setUrgency] = useState(0);
  const [reply, setReply] = useState("");
  const fullReply = "Dear valued customer, we sincerely apologize for the delay. We've escalated your case to our team lead and will resolve this within 2 hours. — ReviewFlow AI";

  useEffect(() => {
    const t1 = setTimeout(() => { let s = 0; const iv = setInterval(() => { s += 2; setScore(s); if (s >= 72) clearInterval(iv); }, 20); }, 500);
    const t2 = setTimeout(() => { let u = 0; const iv = setInterval(() => { u += 1; setUrgency(u); if (u >= 8) clearInterval(iv); }, 80); }, 800);
    const t3 = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setReply(fullReply.slice(0, i));
        i++;
        if (i > fullReply.length) clearInterval(iv);
      }, 20);
    }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 py-32">
      <FloatingOrb className="w-[500px] h-[500px] bg-purple-600/10 top-0 right-0" />
      <FloatingOrb className="w-[400px] h-[400px] bg-emerald-600/10 bottom-0 left-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-20 px-6"
      >
        <p className="text-[11px] font-black text-purple-400 uppercase tracking-[0.5em] mb-8">Intelligence Output</p>
        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
          Sentiment. Urgency.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Smart Response.
          </span>
        </h2>
      </motion.div>

      {/* Dashboard UI */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl px-6 grid md:grid-cols-2 gap-6"
      >
        {/* Left Panel */}
        <div className="space-y-4">
          {/* Sentiment Score */}
          <div className="glass rounded-3xl p-8 border border-white/10">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Sentiment Score</p>
            <div className="flex items-end gap-4 mb-4">
              <span className="text-6xl font-black text-white">{score}</span>
              <span className="text-white/30 text-2xl font-black mb-2">/100</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400"
                style={{ width: `${score}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-white/30 font-black uppercase mt-2">
              <span>Negative</span><span>Neutral</span><span>Positive</span>
            </div>
          </div>

          {/* Urgency */}
          <div className="glass rounded-3xl p-8 border border-white/10">
            <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-4">Urgency Level</p>
            <div className="flex items-center gap-3">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-8 rounded-lg transition-all duration-300 ${i < urgency
                    ? i < 4 ? "bg-emerald-500/80 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                      : i < 7 ? "bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        : "bg-rose-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    : "bg-white/5"
                    }`}
                />
              ))}
            </div>
            <p className="text-right text-[10px] font-black text-rose-400 uppercase tracking-widest mt-3">
              {urgency >= 8 ? "⚠ CRITICAL" : urgency >= 5 ? "ELEVATED" : "LOW"}
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* AI Reply */}
          <div className="glass rounded-3xl p-8 border border-white/10 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px]">🤖</div>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">AI Reply Generated</p>
              <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-sm text-white/70 leading-relaxed font-medium italic min-h-[100px]">
              {reply}<span className="animate-pulse">|</span>
            </p>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 bg-indigo-600 py-3 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-indigo-500 transition-all">
                Send Reply
              </button>
              <button className="px-4 py-3 glass rounded-2xl text-[10px] font-black text-white/50 uppercase tracking-widest hover:bg-white/5 transition-all">
                Edit
              </button>
            </div>
          </div>

          {/* Risk Alert */}
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(239,68,68,0)", "0 0 0 8px rgba(239,68,68,0.1)", "0 0 0 0 rgba(239,68,68,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="glass rounded-3xl p-6 border border-rose-500/30 bg-rose-500/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center text-xl">⚠️</div>
              <div>
                <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Risk Alert</p>
                <p className="text-sm font-bold text-white/80 mt-1">Churn Risk Detected – Tier 1 Customer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Section4() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 py-32">
      <FloatingOrb className="w-[600px] h-[600px] bg-violet-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-24 px-6"
      >
        <p className="text-[11px] font-black text-violet-400 uppercase tracking-[0.5em] mb-8">Automation Pipeline</p>
        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
          Fully automated.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            Real-time intelligence.
          </span>
        </h2>
      </motion.div>

      {/* Pipeline Flow */}
      <div className="flex flex-col md:flex-row items-center gap-0 w-full max-w-5xl px-6">
        {pipelineSteps.map((step, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  boxShadow: [`0 0 20px ${step.color}40`, `0 0 50px ${step.color}80`, `0 0 20px ${step.color}40`]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center text-4xl border border-white/10 bg-slate-900"
                style={{ borderColor: `${step.color}40` }}
              >
                {step.icon}
              </motion.div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mt-4 text-center max-w-[80px]">
                {step.label}
              </p>
            </motion.div>

            {i < pipelineSteps.length - 1 && (
              <div className="flex-1 flex items-center justify-center py-2 md:py-0">
                <svg width="60" height="20" viewBox="0 0 60 20" className="rotate-90 md:rotate-0">
                  <motion.path
                    d="M0 10 L50 10 M40 4 L50 10 L40 16"
                    stroke="url(#arrowGrad)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  />
                  <defs>
                    <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 glass rounded-3xl px-10 py-6 border border-white/10 flex items-center gap-4"
      >
        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        <p className="text-sm font-black text-white/70 uppercase tracking-widest">
          Average processing time: <span className="text-emerald-400">{"< 2 seconds"}</span>
        </p>
      </motion.div>
    </section>
  );
}

function Section5() {
  const [notif, setNotif] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setNotif(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const graphPoints = [30, 25, 35, 28, 45, 42, 58, 65, 72, 80];
  const maxVal = 100;
  const svgW = 300, svgH = 100;
  const points = graphPoints.map((v, i) => `${(i / (graphPoints.length - 1)) * svgW},${svgH - (v / maxVal) * svgH}`).join(" ");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 py-32">
      <FloatingOrb className="w-[600px] h-[600px] bg-emerald-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-20 px-6"
      >
        <p className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-8">Business Impact</p>
        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
          Respond faster.<br />Retain customers.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Protect reputation.
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl px-6">
        {/* Alert Notification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 border border-white/10"
        >
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6">Manager Alert</p>
          <AnimatePresence>
            {notif && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="glass bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 mb-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-sm">🔔</div>
                  <div>
                    <p className="text-[9px] font-black text-rose-400 uppercase tracking-wider">Critical Alert</p>
                    <p className="text-xs font-bold text-white/80">3 urgent reviews pending</p>
                  </div>
                </div>
                <p className="text-[10px] text-white/40">Downtown Branch · Just now</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-2">
            {["2 positive reviews auto-replied ✓", "1 escalation resolved ✓"].map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2 + i * 0.3 }}
                viewport={{ once: true }}
                className="text-[10px] font-medium text-white/40"
              >
                {item}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* AI Reply Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 border border-white/10"
        >
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6">AI Auto-Reply</p>
          <div className="glass bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 text-xs text-white/70 font-medium italic leading-relaxed mb-4">
            "Thank you for your feedback. We've identified the issue and our team is already working on a resolution. We value your loyalty."
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-[9px] font-black text-white uppercase tracking-widest">
              Send ✓
            </div>
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-sm">✏️</div>
          </div>
        </motion.div>

        {/* Performance Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Reputation Score</p>
            <span className="text-emerald-400 font-black text-sm">+34% ↑</span>
          </div>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.polyline
              points={points}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            <motion.polygon
              points={`0,${svgH} ${points} ${svgW},${svgH}`}
              fill="url(#fillGrad)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              viewport={{ once: true }}
            />
          </svg>
          <div className="flex justify-between text-[9px] text-white/20 font-black uppercase mt-2">
            <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <FloatingOrb className="w-[800px] h-[800px] bg-indigo-600/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <ParticleField count={30} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-5xl mx-auto mb-12 shadow-2xl shadow-indigo-500/40">
          ⚡
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8">
          Your reputation<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            deserves intelligence.
          </span>
        </h2>
        <p className="text-xl text-white/40 font-medium mb-16 max-w-lg mx-auto">
          Join forward-thinking businesses using ReviewFlow AI to protect and grow their reputation.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/loading-sequence"
            className="bg-gradient-to-tr from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-12 py-6 rounded-[2rem] font-black text-lg uppercase italic tracking-widest transition-all shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95"
          >
            Launch ReviewFlow →
          </Link>
          <Link
            href="#"
            className="glass px-12 py-6 rounded-[2rem] text-white font-black text-lg uppercase italic tracking-widest hover:bg-white/10 transition-all border-white/10"
          >
            Watch Demo
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-5 transition-all duration-500 ${scrolled ? "glass border-b border-white/5 backdrop-blur-xl" : ""}`}
    >
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-black text-lg">⚡</span>
        </div>
        <span className="text-lg font-black text-white italic tracking-tighter uppercase">ReviewFlow</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-[11px] font-black text-white/40 uppercase tracking-widest">
        <a href="#problem" className="hover:text-white transition-colors">Problem</a>
        <a href="#solution" className="hover:text-white transition-colors">Solution</a>
        <a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a>
      </div>
      <Link
        href="/loading-sequence"
        className="bg-white text-slate-950 px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
      >
        Get Started
      </Link>
    </motion.nav>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main className="bg-slate-950 font-sans overflow-x-hidden">
      <Navbar />
      <div id="problem"><Section1 /></div>
      <div id="solution"><Section2 /></div>
      <Section3 />
      <div id="pipeline"><Section4 /></div>
      <Section5 />
      <FinalCTA />
    </main>
  );
}
