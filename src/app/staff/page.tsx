"use client";

import {
    Trophy,
    TrendingUp,
    Award,
    ChevronRight,
    Zap,
    Building2,
    X,
    Sparkles,
    Send,
    RotateCcw,
    Globe,
    FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";

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
            alert("Rewards Cycle successfully calculated.");
        }, 2000);
    };

    return (
        <DashboardShell>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Synapse Performance Active</p>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Staff</h2>
                    <p className="text-muted-foreground text-sm font-medium italic mt-2">Track performance and reward your top performers.</p>
                </div>

                <button
                    onClick={handleRewards}
                    disabled={rewarding}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase italic tracking-widest transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 group active:scale-95"
                >
                    {rewarding ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {rewarding ? "Syncing..." : "Rewards Cycle"}
                </button>
            </div>

            {/* Top Performers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 italic font-bold">
                {leaderboard.slice(0, 3).map((staff, i) => (
                    <motion.div
                        key={staff.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3.5rem] border-white/5 relative overflow-hidden group text-center hover:border-indigo-500/20 transition-all min-h-[350px]"
                    >
                        <div className="absolute top-0 right-0 p-6 lg:p-8">
                            <Award className={cn("w-10 h-10 lg:w-12 lg:h-12 opacity-10 group-hover:opacity-30 transition-all", staff.color)} />
                        </div>

                        <div className="relative mb-6 lg:mb-8 inline-block">
                            <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-2xl lg:rounded-[2.5rem] bg-slate-900 border-2 border-white/10 flex items-center justify-center text-2xl lg:text-3xl font-black text-white uppercase italic shadow-2xl">
                                {staff.name.split(' ')[1]}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-indigo-600 w-8 h-8 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl flex items-center justify-center border-4 border-slate-950 text-[10px] lg:text-[12px] font-black text-white shadow-xl">
                                #{staff.id}
                            </div>
                        </div>

                        <h3 className="text-xl lg:text-2xl font-black text-white italic uppercase tracking-tighter mb-1 truncate">{staff.name}</h3>
                        <p className="text-[9px] lg:text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-8">{staff.designation}</p>

                        <div className="grid grid-cols-2 gap-3 lg:gap-4 font-black">
                            <div className="glass bg-white/5 p-4 lg:p-5 rounded-2xl border-white/5">
                                <p className="text-[8px] lg:text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Rating</p>
                                <p className="text-lg lg:text-2xl font-black text-white tracking-tight">{staff.rating}★</p>
                            </div>
                            <div className="glass bg-white/5 p-4 lg:p-5 rounded-2xl border-white/5">
                                <p className="text-[8px] lg:text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Points</p>
                                <p className="text-lg lg:text-2xl font-black text-white tracking-tight">{staff.points}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Global Leaderboard Table - Responsive List on mobile */}
            <div className="glass p-8 lg:p-12 rounded-[3.5rem] lg:rounded-[4rem] border-white/5 relative overflow-hidden font-black">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 mb-10 lg:mb-12">
                    <h3 className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Leaderboard</h3>
                    <div className="flex gap-4 italic">
                        <button className="text-[10px] font-black text-white uppercase tracking-widest px-4 lg:px-6 py-2.5 lg:py-3 glass bg-indigo-500/20 rounded-xl lg:rounded-2xl border border-indigo-500/30">All Clusters</button>
                    </div>
                </div>

                <div className="space-y-4 lg:space-y-6 italic">
                    {leaderboard.map((staff, i) => (
                        <div key={staff.id} className="glass bg-white/3 p-6 lg:p-10 rounded-2xl lg:rounded-[2.5rem] border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 group hover:border-indigo-500/20 transition-all cursor-pointer">
                            <div className="flex items-center gap-4 lg:gap-8 w-full sm:w-auto">
                                <span className="hidden lg:block text-3xl font-black text-white/5 group-hover:text-indigo-500/30 transition-colors w-12">0{staff.id}</span>
                                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white border-2 border-white/5 lg:text-lg shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                                    {staff.name.split(' ')[1]}
                                </div>
                                <div className="truncate">
                                    <p className="text-lg lg:text-xl font-black text-white uppercase tracking-tight truncate">{staff.name}</p>
                                    <p className="text-[9px] lg:text-[10px] font-black text-muted-foreground uppercase tracking-widest">{staff.designation}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-10 lg:gap-16 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                                <div className="text-right">
                                    <p className="text-[8px] lg:text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Reviews</p>
                                    <p className="text-sm lg:text-base font-black text-white">{staff.reviews}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] lg:text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Trend</p>
                                    <p className={cn(
                                        "flex items-center text-[10px] lg:text-[11px] font-black uppercase tracking-widest",
                                        staff.trend.startsWith('+') ? "text-emerald-400" : "text-rose-400"
                                    )}>
                                        {staff.trend}
                                    </p>
                                </div>
                                <button className="hidden sm:flex w-12 h-12 rounded-xl glass bg-white/5 items-center justify-center hover:bg-indigo-600 hover:text-white transition-all border-white/5 group-hover:scale-110 shadow-lg shrink-0">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Performance Insight - Large Banner */}
            <div className="p-1 glass bg-white/5 rounded-[3rem] lg:rounded-[4.5rem] border-white/5 overflow-hidden">
                <div className="glass p-8 lg:p-16 rounded-[2.8rem] lg:rounded-[4.2rem] border-transparent relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 lg:gap-14 text-center lg:text-left font-black italic">
                    <div className="w-24 h-24 lg:w-40 lg:h-40 bg-indigo-500/10 rounded-2xl lg:rounded-[3rem] flex items-center justify-center shrink-0">
                        <Zap className="w-12 h-12 lg:w-20 lg:h-20 text-indigo-400 fill-indigo-400/20" />
                    </div>
                    <div>
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 lg:mb-6">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <h4 className="text-[10px] lg:text-[12px] font-black text-indigo-400 uppercase tracking-[0.4em] leading-none">AI Intelligence</h4>
                        </div>
                        <p className="text-xl lg:text-2xl text-white font-medium italic leading-relaxed max-w-4xl font-bold">
                            "Downtown hub has maintained a <span className="text-white font-black underline decoration-indigo-500/50 underline-offset-8">100% positive sentiment streak</span> for 14 days. We recommend a global recognition broadcast."
                        </p>
                        <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start">
                            <button
                                onClick={() => setShowBroadcast(true)}
                                className="bg-white text-slate-950 px-8 lg:px-10 py-4 rounded-xl lg:rounded-[2rem] text-[10px] lg:text-[11px] font-black uppercase italic tracking-widest shadow-2xl hover:scale-105 transition-all text-center"
                            >
                                Broadcast recognition
                            </button>
                            <button
                                onClick={() => setShowProtocol(true)}
                                className="glass bg-white/5 border-white/10 text-white px-8 lg:px-10 py-4 rounded-xl lg:rounded-[2rem] text-[10px] lg:text-[11px] font-black uppercase italic tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <Globe className="w-4 h-4 text-indigo-400" /> Protocol XP-9
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Broadcast Modal */}
            <AnimatePresence>
                {showBroadcast && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 italic font-bold">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowBroadcast(false)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative glass w-full max-w-xl rounded-[3rem] lg:rounded-[4rem] border-white/10 shadow-2xl overflow-hidden p-8 lg:p-16 text-center lg:text-left flex flex-col gap-8 font-black shrink-0"
                        >
                            <div className="flex justify-between items-center mb-4 italic">
                                <h3 className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter">Broadcast Intel</h3>
                                <button onClick={() => setShowBroadcast(false)} className="p-2 hover:bg-white/5 rounded-full transition-all shrink-0">
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>
                            <div className="p-6 lg:p-8 glass bg-white/5 rounded-2xl lg:rounded-[2.5rem] border-white/5 text-white/70 leading-relaxed font-medium text-base lg:text-lg">
                                "Team, attention! <span className="text-white font-black uppercase">Staff 1</span> has achieved the gold standard. Let's keep the fire alive!"
                            </div>
                            <button
                                onClick={() => setShowBroadcast(false)}
                                className="w-full bg-indigo-600 text-white py-4 lg:py-5 rounded-xl lg:rounded-[2.5rem] font-black uppercase italic tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-center"
                            >
                                Transmit to All Hubs <Send className="w-4 h-4 inline-block ml-2 mb-1" />
                            </button>
                        </motion.div>
                    </div>
                )}

                {showProtocol && (
                    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 lg:p-6 font-bold italic">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowProtocol(false)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="relative glass w-full max-w-5xl rounded-t-[3rem] lg:rounded-t-[5rem] border-white/10 shadow-2xl overflow-hidden flex flex-col font-black"
                            style={{ height: "85vh" }}
                        >
                            <div className="p-8 lg:p-20 overflow-y-auto no-scrollbar">
                                <div className="flex justify-between items-center mb-10 lg:mb-16 italic">
                                    <div className="flex items-center gap-4 lg:gap-6">
                                        <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-xl lg:rounded-[2rem] bg-indigo-500/10 flex items-center justify-center shrink-0">
                                            <FileText className="w-6 h-6 lg:w-10 lg:h-10 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl lg:text-4xl font-black text-white italic uppercase tracking-tighter">Protocol XP-9</h3>
                                            <p className="text-[10px] lg:text-xs text-muted-foreground font-bold italic mt-2 uppercase tracking-widest">Optimized Dispatch Loop</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowProtocol(false)} className="p-2 lg:p-4 hover:bg-white/5 rounded-full transition-all shrink-0">
                                        <X className="w-6 h-6 lg:w-10 lg:h-10 text-muted-foreground" />
                                    </button>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 italic">
                                    <div className="flex-1 space-y-8 lg:space-y-12">
                                        <div className="space-y-4 lg:space-y-6">
                                            <h4 className="text-[10px] lg:text-[12px] font-black text-indigo-400 uppercase tracking-[0.3em]">Action Loop</h4>
                                            <div className="text-lg lg:text-xl text-white/80 font-medium leading-relaxed italic space-y-4 lg:space-y-6">
                                                <p>1. Pulse-Check every 15 minutes vs AI projections.</p>
                                                <p>2. Feedback Loop for real-time quality mentions.</p>
                                                <p>3. Automatic shift handoff via Slack digest.</p>
                                            </div>
                                        </div>
                                        <div className="p-6 lg:p-10 glass bg-white/3 rounded-2xl lg:rounded-[3rem] border-white/5 space-y-2 lg:space-y-4 font-black">
                                            <p className="text-[8px] lg:text-[10px] font-black text-emerald-400 uppercase tracking-widest">Gain</p>
                                            <p className="text-2xl lg:text-3xl font-black text-white tracking-tighter">+18% Faster Service</p>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/3 shrink-0">
                                        <button className="w-full bg-white text-slate-950 py-4 lg:py-6 rounded-xl lg:rounded-[2.5rem] font-black uppercase italic tracking-widest shadow-2xl hover:scale-105 transition-all text-center">
                                            Deploy Hub Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardShell>
    );
}
