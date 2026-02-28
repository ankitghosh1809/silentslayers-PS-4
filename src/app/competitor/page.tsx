"use client";

import { Sidebar } from "@/components/sidebar";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    AreaChart, Area
} from 'recharts';
import {
    Target,
    TrendingUp,
    Globe,
    Trophy,
    ArrowUpRight,
    TrendingDown,
    ChevronRight,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const radarData = [
    { subject: 'Food', A: 120, B: 110, fullMark: 150 },
    { subject: 'Service', A: 98, B: 130, fullMark: 150 },
    { subject: 'Ambience', A: 86, B: 130, fullMark: 150 },
    { subject: 'Value', A: 99, B: 100, fullMark: 150 },
    { subject: 'Hygiene', A: 85, B: 90, fullMark: 150 },
    { subject: 'Pricing', A: 65, B: 85, fullMark: 150 },
];

const benchmarkData = [
    { metric: 'Food Quality', you: 4.8, competition: 4.2 },
    { metric: 'Service Speed', you: 3.9, competition: 4.5 },
    { metric: 'Ambience', you: 4.9, competition: 4.1 },
    { metric: 'Hygiene', you: 4.7, competition: 4.0 },
    { metric: 'Pricing', you: 4.2, competition: 4.8 },
];

export default function CompetitorPage() {
    const [period, setPeriod] = useState("Last 7 days");

    return (
        <div className="flex gap-6 min-h-[calc(100vh-2rem)] bg-slate-950 p-4">
            <Sidebar />

            <div className="flex-1 space-y-8 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 custom-scrollbar">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Market Intelligence Active</p>
                        </motion.div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Competitor Benchmarking</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">How your branches compare against the local market leader.</p>
                    </div>

                    <div className="flex items-center bg-slate-900 rounded-2xl p-1.5 glass border-white/5">
                        <button
                            onClick={() => setPeriod("Last 7 days")}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                period === "Last 7 days" ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Last 7 Days
                        </button>
                        <button
                            onClick={() => setPeriod("Last 30 days")}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                period === "Last 30 days" ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Last 30 Days
                        </button>
                    </div>
                </div>

                {/* Main Intelligence Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Radar Chart Card */}
                    <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden flex flex-col items-center">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] -mr-16 -mt-16" />
                        <div className="w-full mb-10 text-center">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Competitive Edge</h3>
                            <p className="text-xs text-muted-foreground font-bold mt-1">Direct feature-by-feature comparison</p>
                        </div>

                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}
                                    />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                                    <Radar
                                        name="Your Business"
                                        dataKey="A"
                                        stroke="#6366F1"
                                        fill="#6366F1"
                                        fillOpacity={0.6}
                                        strokeWidth={3}
                                    />
                                    <Radar
                                        name="Main Competitor"
                                        dataKey="B"
                                        stroke="#8B5CF6"
                                        fill="#8B5CF6"
                                        fillOpacity={0.2}
                                        strokeWidth={3}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#0f172a',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '15px',
                                            textTransform: 'uppercase',
                                            fontWeight: 900,
                                            fontSize: '10px'
                                        }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex gap-10 mt-6 p-6 glass bg-white/5 rounded-[2rem] border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                <p className="text-[10px] font-black text-white uppercase tracking-widest">You</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-purple-500/40" />
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Main Competitor</p>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Delta Card */}
                    <div className="space-y-8">
                        <div className="glass p-10 rounded-[3rem] border-white/5">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Market Delta</h3>
                                <TrendingUp className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="space-y-6">
                                {benchmarkData.map((d, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="flex justify-between items-end mb-3">
                                            <p className="text-xs font-black text-white uppercase italic tracking-tight">{d.metric}</p>
                                            <div className={cn(
                                                "flex items-center text-[10px] font-black uppercase tracking-widest",
                                                d.you > d.competition ? "text-emerald-400" : "text-rose-400"
                                            )}>
                                                {d.you > d.competition ? "+" : ""}{(d.you - d.competition).toFixed(1)}
                                                {d.you > d.competition ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <TrendingDown className="w-3 h-3 ml-1" />}
                                            </div>
                                        </div>
                                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden relative">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(d.you / 5) * 100}%` }}
                                                viewport={{ once: true }}
                                                className="h-full bg-indigo-500 rounded-full absolute z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                            />
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(d.competition / 5) * 100}%` }}
                                                viewport={{ once: true }}
                                                className="h-full bg-white/5 rounded-full absolute"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-8 rounded-[3rem] border-white/5 bg-gradient-to-r from-indigo-500/10 to-transparent relative overflow-hidden">
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/20 flex items-center justify-center shrink-0">
                                    <Trophy className="w-8 h-8 text-indigo-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-white italic uppercase tracking-tighter mb-1">Leader Recognition</h4>
                                    <p className="text-xs text-white/60 font-medium italic">You are currently the #1 rated entity in 'Ambience' across Midtown.</p>
                                </div>
                                <ChevronRight className="w-5 h-5 ml-auto text-indigo-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Competitor AI View */}
                <div className="glass p-10 rounded-[4rem] border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px]" />
                    <div className="flex items-center gap-4 mb-8">
                        <Zap className="w-6 h-6 text-indigo-400 fill-indigo-400/20" />
                        <h4 className="text-xl font-black text-white italic uppercase tracking-tighter italic italic italic">AI Strategic Advisory</h4>
                    </div>
                    <p className="text-lg text-white/80 font-medium italic italic italic max-w-4xl leading-relaxed">
                        "Your competitor 'City Bistro' has seen a 14% uptick in 'Service Speed' mentions this week. Cross-referencing with your staffing levels at Harbor Grill suggests you may need to optimize of 2 additional floor staff during lunch rush to neutralize their gain."
                    </p>
                    <button className="mt-8 bg-white/5 hover:bg-white/10 px-8 py-3 rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest transition-all">
                        Initialize Strategic Counter-Plan
                    </button>
                </div>
            </div>
        </div>
    );
}
