"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    Zap,
    Mail,
    Lock,
    ArrowRight,
    CheckCircle2,
    Building2,
    Globe,
    Shield,
    TrendingUp,
    BarChart3,
    ArrowUpRight,
    Star
} from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const scrollMessages = [
    { title: "Collect Reviews", desc: "Omni-channel feedback capture via QR & SMS.", icon: Globe },
    { title: "Analyze Sentiment", desc: "Gemini-powered emotional intelligence at scale.", icon: Zap },
    { title: "Optimize Operations", desc: "Data-driven decisions for every branch.", icon: BarChart3 },
    { title: "Grow Revenue", desc: "Turn reputation into recurring business.", icon: TrendingUp }
];

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [branchCount, setBranchCount] = useState("1");
    const [role, setRole] = useState("Owner");
    const [loading, setLoading] = useState(false);
    const [booting, setBooting] = useState(false);
    const router = useRouter();

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulated login for demo
            triggerBootingSequence();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const triggerBootingSequence = () => {
        setBooting(true);
        setLoading(false);
        setTimeout(() => {
            router.push("/dashboard");
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex overflow-hidden lg:overflow-visible">
            {/* Loading Overlay */}
            <AnimatePresence>
                {booting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center mb-10 shadow-2xl shadow-indigo-500/40"
                        >
                            <Zap className="w-10 h-10 text-white" />
                        </motion.div>

                        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3 }}
                                className="h-full bg-indigo-500"
                            />
                        </div>

                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] animate-pulse">Initializing ReviewFlow Intelligence...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left: Login Form */}
            <div className="w-full lg:w-[450px] p-8 lg:p-12 flex flex-col justify-center relative z-10 bg-slate-950">
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-3 group mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">ReviewFlow</h1>
                    </Link>
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2 leading-none">Welcome Back</h2>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic italic">The Enterprise Standard for Reputation Intelligence</p>
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Corporate ID</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground placeholder:italic outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium italic"
                                placeholder="enter corporate email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Business Name</label>
                        <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground placeholder:italic outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium italic"
                                placeholder="e.g. Urban Bites"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Branch count</label>
                            <select
                                value={branchCount}
                                onChange={(e) => setBranchCount(e.target.value)}
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium italic appearance-none"
                            >
                                <option>1-5</option>
                                <option>6-20</option>
                                <option>20+</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Your Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium italic appearance-none"
                            >
                                <option>Owner</option>
                                <option>Branch Manager</option>
                                <option>Marketer</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-slate-950 py-4 rounded-2xl font-black uppercase italic tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                        {loading ? "Verifying Credentials..." : "Initialize Dashboard"}
                        {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => { setEmail("admin@reviewflow.com"); setPassword("demo123"); }}
                            className="glass py-3 rounded-xl text-[9px] font-black text-indigo-400 border-indigo-500/20 uppercase tracking-tighter hover:bg-indigo-500/10 transition-all"
                        >
                            Quick Login: Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => { setEmail("owner@urbanbites.com"); setPassword("demo123"); }}
                            className="glass py-3 rounded-xl text-[9px] font-black text-purple-400 border-purple-500/20 uppercase tracking-tighter hover:bg-purple-500/10 transition-all"
                        >
                            Quick Login: Owner
                        </button>
                    </div>
                </form>

                <div className="mt-auto pt-12 text-center">
                    <p className="text-[10px] text-muted-foreground font-medium italic italic">
                        New deployment? <Link href="/signup" className="text-white hover:text-indigo-400 font-black uppercase italic transition-colors ml-1 underline decoration-indigo-500/30">Connect Branch Hub</Link>
                    </p>
                </div>
            </div>

            {/* Right: Scrolling Animation Panel */}
            <div className="hidden lg:block flex-1 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 z-0" />

                {/* Floating Cards (Parallax) */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-20 w-80 glass p-6 rounded-3xl border-white/10 shadow-2xl"
                    >
                        <div className="flex gap-1 text-yellow-500 mb-3">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                        <p className="text-white font-bold italic text-base leading-relaxed mb-4">"The best dining experience in Downtown. Staff was incredible!"</p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-black text-indigo-400 text-xs shadow-lg">JS</div>
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">James Smith</p>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-40 left-20 w-72 glass p-6 rounded-3xl border-white/5 shadow-2xl bg-slate-900/40"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                            </div>
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">+14.2%</span>
                        </div>
                        <h4 className="text-sm font-black text-white italic uppercase tracking-tighter mb-1">Reputation Growth</h4>
                        <p className="text-[10px] text-muted-foreground font-medium italic">Monthly trend relative to market benchmarks.</p>
                    </motion.div>
                </div>

                {/* Main Scroll Content */}
                <div ref={containerRef} className="h-full overflow-y-auto no-scrollbar scroll-smooth p-20 relative z-20">
                    <div className="space-y-[100vh]">
                        {scrollMessages.map((msg, i) => {
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ margin: "-20%" }}
                                    className="min-h-screen flex flex-col justify-center"
                                >
                                    <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-10 border border-white/10 group-hover:bg-indigo-500/10 transition-colors">
                                        <msg.icon className="w-10 h-10 text-indigo-400" />
                                    </div>
                                    <h3 className="text-7xl font-black text-white italic uppercase tracking-tighter mb-6 leading-none">{msg.title}</h3>
                                    <p className="text-2xl text-white/50 font-medium italic max-w-md leading-relaxed">{msg.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Info Badges */}
            <div className="fixed bottom-8 left-8 z-20 hidden lg:flex gap-8 opacity-40">
                <div className="flex items-center gap-2 text-white font-black text-[9px] uppercase tracking-[0.2em]">
                    <Shield className="w-4 h-4 text-indigo-400" /> SOC2 COMPLIANT
                </div>
                <div className="flex items-center gap-2 text-white font-black text-[9px] uppercase tracking-[0.2em]">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" /> GDPR READY
                </div>
            </div>
        </div>
    );
}
