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
    Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const leaderboard = [
    { id: 1, name: "Staff 1 (Downtown)", designation: "Manager", rating: 4.9, reviews: 142, points: 2840, trend: "+12%", color: "text-amber-400" },
    { id: 2, name: "Staff 3 (Harbor Grill)", designation: "Chef", rating: 4.8, reviews: 98, points: 2450, trend: "+8%", color: "text-slate-300" },
    { id: 3, name: "Staff 2 (Downtown)", designation: "Waiter", rating: 4.8, reviews: 120, points: 2320, trend: "+5%", color: "text-amber-700" },
    { id: 4, name: "Staff 5 (Westside Hub)", designation: "Waiter", rating: 4.7, reviews: 85, points: 2100, trend: "-2%", color: "text-muted-foreground" },
    { id: 5, name: "Staff 1 (Midtown Express)", designation: "Manager", rating: 4.6, reviews: 64, points: 1980, trend: "+15%", color: "text-muted-foreground" },
];

export default function StaffPage() {
    return (
        <div className="flex gap-6 min-h-[calc(100vh-2rem)] bg-slate-950 p-4">
            <Sidebar />

            <div className="flex-1 space-y-8 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 custom-scrollbar pb-20">
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

                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-widest transition-all shadow-xl shadow-indigo-500/20">
                        Initiate Rewards Cycle
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
                            className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group text-center"
                        >
                            <div className="absolute top-0 right-0 p-6">
                                <Award className={cn("w-10 h-10 opacity-20", staff.color)} />
                            </div>

                            <div className="relative mb-8 inline-block">
                                <div className="w-24 h-24 rounded-[2rem] bg-slate-900 border-2 border-white/10 flex items-center justify-center text-3xl font-black text-white uppercase italic shadow-2xl">
                                    {staff.name.split(' ')[1]}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center border-4 border-slate-950 text-[10px] font-black italic text-white">
                                    #{staff.id}
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-1">{staff.name}</h3>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 italic">{staff.designation}</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="glass bg-white/5 p-4 rounded-2xl border-white/5">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Rating</p>
                                    <p className="text-xl font-black text-white tracking-tight italic">{staff.rating}<span className="text-xs text-indigo-400 ml-1">★</span></p>
                                </div>
                                <div className="glass bg-white/5 p-4 rounded-2xl border-white/5">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Points</p>
                                    <p className="text-xl font-black text-white tracking-tight italic">{staff.points}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Full Table Leaderboard */}
                <div className="glass p-10 rounded-[3.5rem] border-white/5 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Global Leaderboard</h3>
                        <div className="flex gap-4">
                            <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-4 py-2 glass bg-indigo-500/10 rounded-xl">All Branches</button>
                            <button className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-4 py-2 hover:text-white transition-all">This Month</button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {leaderboard.map((staff, i) => (
                            <div key={staff.id} className="glass bg-white/5 p-8 rounded-[2rem] border-white/5 flex items-center justify-between group hover:border-indigo-500/20 transition-all cursor-pointer">
                                <div className="flex items-center gap-6">
                                    <span className="text-2xl font-black italic text-white/10 group-hover:text-indigo-500/30 transition-colors w-8">0{staff.id}</span>
                                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center font-black text-white border border-white/10">
                                        {staff.name.split(' ')[1]}
                                    </div>
                                    <div>
                                        <p className="text-base font-black text-white uppercase italic tracking-tight">{staff.name}</p>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">{staff.designation}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Reviews</p>
                                        <p className="text-sm font-black text-white italic tracking-tight">{staff.reviews}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                                        <div className={cn(
                                            "flex items-center text-[10px] font-black uppercase tracking-widest",
                                            staff.trend.startsWith('+') ? "text-emerald-400" : "text-rose-400"
                                        )}>
                                            {staff.trend} <TrendingUp className="w-3 h-3 ml-1" />
                                        </div>
                                    </div>
                                    <button className="w-10 h-10 rounded-xl glass bg-white/5 flex items-center justify-center hover:bg-indigo-600/20 transition-all border-white/5">
                                        <ChevronRight className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Performance Insight */}
                <div className="p-1 glass bg-white/5 rounded-[4rem] border-white/5 overflow-hidden">
                    <div className="glass p-16 rounded-[3.8rem] border-transparent relative overflow-hidden flex items-center gap-10">
                        <div className="w-32 h-32 bg-indigo-500/20 rounded-[2.5rem] flex items-center justify-center relative shrink-0">
                            <Zap className="w-16 h-16 text-indigo-400 fill-indigo-400/20" />
                            <div className="absolute inset-0 bg-indigo-500/20 rounded-[2.5rem] animate-pulse blur-xl opacity-20" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4 italic italic">AI Motivational Engine</h4>
                            <p className="text-lg text-white/80 font-medium italic italic leading-relaxed max-w-4xl italic italic">
                                "Staff 1 at Downtown has maintained a 100% positive sentiment score in Swiggy reviews for 14 consecutive days. We recommend initializing a 'Star Performer' bonus to sustain this momentum and share their dispatch protocol with the Midtown branch."
                            </p>
                            <div className="mt-8 flex gap-4">
                                <button className="bg-white text-slate-950 px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-2xl">Broadcast Recognition</button>
                                <button className="glass bg-white/5 border-white/10 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-widest">View Detailed Protocol</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
