"use client";

import { Sidebar } from "@/components/sidebar";
import {
    Trophy,
    Users,
    Star,
    TrendingUp,
    MessageSquare,
    Award,
    ChevronRight,
    User,
    Zap,
    Building2,
    Clock,
    X,
    CheckCircle,
    Globe,
    FileText,
    Sparkles,
    Send,
    RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const leaderboard = [
    { id: 1, name: "Staff 1 (Downtown)", designation: "Manager", rating: 4.9, reviews: 142, points: 2840, trend: "+12%", color: "text-amber-400" },
    { id: 2, name: "Staff 3 (Harbor Grill)", designation: "Chef", rating: 4.8, reviews: 98, points: 2450, trend: "+8%", color: "text-slate-300" },
    { id: 3, name: "Staff 2 (Downtown)", designation: "Waiter", rating: 4.8, reviews: 120, points: 2320, trend: "+5%", color: "text-amber-700" },
    { id: 4, name: "Staff 5 (Westside Hub)", designation: "Waiter", rating: 4.7, reviews: 85, points: 2100, trend: "-2%", color: "text-muted-foreground" },
    { id: 5, name: "Staff 1 (Midtown Express)", designation: "Manager", rating: 4.6, reviews: 64, points: 1980, trend: "+15%", color: "text-muted-foreground" },
];

export default function StaffPage() {
    const [showBroadcast, setShowBroadcast] = useState(false);
    const [showProtocol, setShowProtocol] = useState(false);
    const [rewarding, setRewarding] = useState(false);

    const handleRewards = () => {
        setRewarding(true);
        setTimeout(() => {
            setRewarding(false);
            alert("Rewards Cycle successfully calculated and distributed for Feb 2026.");
        }, 2500);
    };

    return (
        <div className="flex gap-6 min-h-[calc(100vh-2rem)] bg-slate-950 p-4">
            <Sidebar />

            <AnimatePresence>
                {/* Broadcast Recognition Modal */}
                {showBroadcast && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="glass max-w-xl w-full rounded-[4rem] border-white/10 shadow-2xl overflow-hidden p-16"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-500/20 rounded-2xl">
                                        <Sparkles className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter italic">Broadcast Intel</h3>
                                </div>
                                <button onClick={() => setShowBroadcast(false)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                                    <X className="w-6 h-6 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="space-y-10">
                                <div className="p-8 glass bg-white/5 rounded-[2.5rem] border-white/5 italic text-white/70 leading-relaxed font-medium text-lg">
                                    "Team, attention! <span className="text-white font-black uppercase">Staff 1 (Downtown)</span> has achieved an incredible <span className="text-emerald-400 font-bold">100% positive sentiment streak</span> for 14 days. This is the new gold standard. Let's keep the fire alive!"
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic ml-1 italic">Channel Selection</h4>
                                    <div className="flex gap-3">
                                        {["Slack", "WhatsApp", "App Dashboard", "Branch TV"].map(ch => (
                                            <span key={ch} className="px-5 py-2 glass bg-white/5 rounded-xl text-[9px] font-black text-white/50 uppercase tracking-widest">{ch}</span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowBroadcast(false);
                                        alert("Recognition broadcasted successfully!");
                                    }}
                                    className="w-full bg-indigo-600 text-white py-5 rounded-[2.5rem] font-black uppercase italic tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Transmit to All Hubs <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Detailed Protocol Panel */}
                {showProtocol && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end justify-center p-6 bg-slate-950/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="glass w-full max-w-5xl rounded-t-[5rem] border-white/10 shadow-2xl overflow-hidden"
                            style={{ height: "85vh" }}
                        >
                            <div className="p-20 h-full flex flex-col no-scrollbar overflow-y-auto">
                                <div className="flex justify-between items-center mb-16">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center">
                                            <FileText className="w-10 h-10 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter italic italic">Performance Protocol XP-9</h3>
                                            <p className="text-xs text-muted-foreground font-bold italic mt-2 italic italic uppercase tracking-widest">Optimized Dispatch Loop • Harbor Branch Approved</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowProtocol(false)} className="p-4 hover:bg-white/5 rounded-full transition-all">
                                        <X className="w-10 h-10 text-muted-foreground" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                    <div className="space-y-12">
                                        <div className="space-y-6">
                                            <h4 className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.3em] italic">Actionable Loop</h4>
                                            <div className="space-y-6 text-xl text-white/80 font-medium italic italic italic italic leading-relaxed">
                                                <p>1. <span className="text-white font-bold">Pulse-Check:</span> Every 15 minutes, the supervisor verifies dispatch speed vs AI projections.</p>
                                                <p>2. <span className="text-white font-bold">Feedback Loop:</span> Immediate positive reinforcement for any 'Quality mention' in real-time reviews.</p>
                                                <p>3. <span className="text-white font-bold">Shift Transition:</span> Handoff intelligence briefing for next manager via automated Slack digest.</p>
                                            </div>
                                        </div>
                                        <div className="p-10 glass bg-white/3 rounded-[3rem] border-white/5 space-y-4 italic">
                                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest italic">Efficiency Gain</p>
                                            <p className="text-3xl font-black text-white tracking-tighter">+18% Faster Service</p>
                                            <p className="text-xs text-white/40 leading-relaxed italic italic">When this protocol followed in Midtown, 1-star reviews for 'wait time' decreased by 22% in 4 days.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-12">
                                        <div className="space-y-6">
                                            <h4 className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.3em] italic">Visual Intelligence</h4>
                                            <div className="aspect-video glass bg-slate-900 border-2 border-white/5 rounded-[4rem] flex items-center justify-center relative overflow-hidden italic italic italic">
                                                <Zap className="w-20 h-20 text-indigo-500/20 animate-pulse" />
                                                <p className="absolute bottom-8 text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] italic italic italic italic">Flow Diagram Loading...</p>
                                            </div>
                                        </div>
                                        <button className="w-full bg-white text-slate-950 py-6 rounded-[2.5rem] font-black uppercase italic tracking-widest shadow-2xl hover:scale-[1.02] transition-all">Deploy this Protocol to Midtown hub</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 space-y-8 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 custom-scrollbar pb-20 no-scrollbar">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Performance Analytics Active</p>
                        </motion.div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Staff Excellence</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">Track performance, gamify service, and reward your top performers.</p>
                    </div>

                    <button
                        onClick={handleRewards}
                        disabled={rewarding}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-widest transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3 group active:scale-95"
                    >
                        {rewarding ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />}
                        {rewarding ? "Calculating Rewards..." : "Initiate Rewards Cycle"}
                    </button>
                </div>

                {/* Top Performers Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {leaderboard.slice(0, 3).map((staff, i) => (
                        <motion.div
                            key={staff.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group text-center hover:border-indigo-500/20 transition-all"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <Award className={cn("w-12 h-12 opacity-10 group-hover:opacity-30 transition-all group-hover:scale-110", staff.color)} />
                            </div>

                            <div className="relative mb-8 inline-block">
                                <div className="w-28 h-28 rounded-[2.5rem] bg-slate-900 border-2 border-white/10 flex items-center justify-center text-3xl font-black text-white uppercase italic shadow-2xl group-hover:scale-105 transition-all">
                                    {staff.name.split(' ')[1]}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-indigo-600 w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-slate-950 text-[12px] font-black italic text-white shadow-xl">
                                    #{staff.id}
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">{staff.name}</h3>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-8 italic">{staff.designation}</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="glass bg-white/5 p-5 rounded-[2rem] border-white/5 group-hover:bg-white/10 transition-all">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Rating</p>
                                    <p className="text-2xl font-black text-white tracking-tight italic">{staff.rating}<span className="text-xs text-indigo-400 ml-1">★</span></p>
                                </div>
                                <div className="glass bg-white/5 p-5 rounded-[2rem] border-white/5 group-hover:bg-white/10 transition-all">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Points</p>
                                    <p className="text-2xl font-black text-white tracking-tight italic">{staff.points}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Full Table Leaderboard */}
                <div className="glass p-12 rounded-[4rem] border-white/5 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Global Leaderboard</h3>
                        <div className="flex gap-4">
                            <button className="text-[10px] font-black text-white uppercase tracking-widest px-6 py-3 glass bg-indigo-500/20 rounded-2xl border border-indigo-500/30">All Clusters</button>
                            <button className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-6 py-3 hover:text-white transition-all cursor-pointer">This Month</button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {leaderboard.map((staff, i) => (
                            <div key={staff.id} className="glass bg-white/3 p-10 rounded-[2.5rem] border-white/5 flex items-center justify-between group hover:border-indigo-500/20 transition-all cursor-pointer hover:bg-white/5">
                                <div className="flex items-center gap-8">
                                    <span className="text-3xl font-black italic text-white/5 group-hover:text-indigo-500/30 transition-colors w-12">0{staff.id}</span>
                                    <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white border-2 border-white/5 text-lg shadow-inner group-hover:scale-110 transition-all">
                                        {staff.name.split(' ')[1]}
                                    </div>
                                    <div>
                                        <p className="text-xl font-black text-white uppercase italic tracking-tight italic italic">{staff.name}</p>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">{staff.designation}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-16">
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 italic">Reviews</p>
                                        <p className="text-base font-black text-white italic tracking-tight">{staff.reviews}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 italic">Status</p>
                                        <div className={cn(
                                            "flex items-center text-[11px] font-black uppercase tracking-widest",
                                            staff.trend.startsWith('+') ? "text-emerald-400" : "text-rose-400"
                                        )}>
                                            {staff.trend} <TrendingUp className="w-3.5 h-3.5 ml-1.5" />
                                        </div>
                                    </div>
                                    <button className="w-14 h-14 rounded-2xl glass bg-white/5 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all border-white/5 group-hover:scale-110 shadow-lg">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Performance Insight */}
                <div className="p-1 glass bg-white/5 rounded-[4.5rem] border-white/5 overflow-hidden">
                    <div className="glass p-16 rounded-[4.2rem] border-transparent relative overflow-hidden flex items-center gap-14">
                        <div className="w-40 h-40 bg-indigo-500/10 rounded-[3rem] flex items-center justify-center relative shrink-0 group">
                            <Zap className="w-20 h-20 text-indigo-400 fill-indigo-400/20 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-indigo-500/20 rounded-[3rem] animate-pulse blur-2xl opacity-10" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                <h4 className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.4em] italic leading-none">AI Intelligence Engine</h4>
                            </div>
                            <p className="text-2xl text-white font-medium italic italic italic leading-relaxed max-w-4xl italic italic italic">
                                "Staff 1 at Downtown has maintained a 100% positive sentiment score in Swiggy reviews for 14 consecutive days. We recommend initializing a <span className="text-white font-black underline decoration-indigo-500/50 underline-offset-8">Global Recognition Broadcast</span> to sustain this momentum."
                            </p>
                            <div className="mt-12 flex gap-6">
                                <button
                                    onClick={() => setShowBroadcast(true)}
                                    className="bg-white text-slate-950 px-10 py-4 rounded-[2rem] text-[11px] font-black uppercase italic tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    Broadcast Recognition
                                </button>
                                <button
                                    onClick={() => setShowProtocol(true)}
                                    className="glass bg-white/5 border-white/10 text-white px-10 py-4 rounded-[2rem] text-[11px] font-black uppercase italic tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
                                >
                                    <Globe className="w-4 h-4 text-indigo-400" /> View Detailed Protocol
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
