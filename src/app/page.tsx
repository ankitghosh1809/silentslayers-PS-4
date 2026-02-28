"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  BarChart3,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Star,
  CheckCircle2,
  MessageSquare,
  Users
} from "lucide-react";
import { useRef } from "react";

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothY = useSpring(y, springConfig);

  const floatingCards = [
    { name: "John D.", rating: 5, content: "Exceptional service at Downtown Bistro!", branch: "Downtown", delay: 0 },
    { name: "Sarah M.", rating: 4, content: "Great food, wait time was a bit long.", branch: "Harbor", delay: 0.2 },
    { name: "Mike R.", rating: 5, content: "Staff was incredibly attentive. 10/10.", branch: "Westside", delay: 0.4 },
  ];

  return (
    <div className="relative overflow-x-hidden bg-slate-950">
      {/* Navbar Mockup */}
      <nav className="fixed top-0 left-0 right-0 z-[60] px-6 py-6 flex justify-between items-center transition-all bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">ReviewFlow</h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground">
          <Link href="#features" className="hover:text-indigo-400 transition-colors uppercase tracking-widest">Features</Link>
          <Link href="#demo" className="hover:text-indigo-400 transition-colors uppercase tracking-widest">Demo</Link>
          <Link href="/dashboard" className="glass px-6 py-2.5 rounded-xl text-white hover:bg-white/10 transition-all border-white/10 uppercase tracking-widest font-black">Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[160px] animate-pulse delay-700" />

        <motion.div style={{ opacity, scale, y: smoothY }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-black text-indigo-400 mb-8 glass uppercase tracking-[0.2em] animate-in"
          >
            <Zap className="mr-2 h-4 w-4 fill-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
            <span>AI-Powered Reputation Intelligence</span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85] uppercase italic">
            Turn Feedback <br />
            <span className="gradient-text">Into Intelligence.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium leading-relaxed italic">
            The enterprise review management platform for multi-branch businesses.
            Analyze, escalate, and respond with human-level accuracy using Gemini AI.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/dashboard"
              className="bg-gradient-to-tr from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-10 py-5 rounded-[2rem] font-black text-lg flex items-center transition-all shadow-2xl shadow-indigo-500/40 group uppercase italic tracking-widest"
            >
              See It In Action
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/submit"
              className="glass px-10 py-5 rounded-[2rem] font-black text-lg text-white hover:bg-white/10 transition-all border-white/10 uppercase italic tracking-widest"
            >
              Get Started
            </Link>
          </div>

          {/* Floating Review Cards Mockup */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] -z-10" />
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + card.delay, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-8 rounded-[2.5rem] text-left border-white/5 shadow-2xl group transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(card.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full uppercase tracking-tighter">Verified</span>
                </div>
                <p className="text-white font-bold text-lg mb-4 italic leading-relaxed group-hover:text-indigo-200 transition-colors">"{card.content}"</p>
                <div className="flex items-center gap-3 text-muted-foreground border-t border-white/5 pt-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-black text-white">
                    {card.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-tight text-white/80">{card.name}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest">{card.branch} Branch</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Feature Section with Parallax */}
      <section id="features" className="py-32 px-4 bg-slate-900/40 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-6">Built for <span className="gradient-text">Hyper-Scale</span></h2>
            <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto italic">Scale your reputation from 5 branches to 500 without breaking a sweat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Sentiment Analysis", desc: "Real-time emotional scoring using Gemini AI.", icon: BarChart3, color: "text-blue-400" },
              { title: "Smart Escalations", desc: "Negative reviews trigger instant manager alerts.", icon: Shield, color: "text-indigo-400" },
              { title: "Staff Leaderboards", desc: "Gamify performance across all locations.", icon: Users, color: "text-purple-400" },
              { title: "Multi-Platform", desc: "Google, Zomato, Swiggy, and QR-Direct.", icon: Globe, color: "text-emerald-400" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[3rem] border-white/5 hover:border-indigo-500/20 transition-all group"
              >
                <div className="p-4 bg-white/5 rounded-2xl w-fit mb-8 group-hover:bg-indigo-500/10 transition-colors">
                  <f.icon className={`w-8 h-8 ${f.color}`} />
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">{f.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed italic">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center glass p-20 rounded-[4rem] border-white/10 relative overflow-hidden bg-gradient-to-b from-indigo-500/10 to-transparent">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[100px]" />
          <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-8">Ready to Own Your <br /> Reputation?</h2>
          <Link
            href="/dashboard"
            className="bg-white text-slate-950 px-12 py-5 rounded-[2rem] font-black text-xl transition-all inline-block hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 uppercase italic"
          >
            Launch Final Demo
          </Link>
          <p className="mt-8 text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]">Production-Ready SaaS for Hackathon 2026</p>
        </div>
      </section>
    </div>
  );
}
