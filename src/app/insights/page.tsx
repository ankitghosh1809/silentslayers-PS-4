"use client";

import { Sidebar } from "@/components/sidebar";
import {
    Zap,
    TrendingUp,
    AlertTriangle,
    Target,
    Lightbulb,
    ChevronRight,
    ArrowRight,
    Sparkles,
    BarChart3,
    Calendar,
    ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function InsightsPage() {
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
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">AI Intelligence Cluster Active</p>
                        </motion.div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">AI Insights</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">Deep-dive behavioral analysis and trend forecasting powered by Gemini.</p>
                    </div>
                    <button className="glass px-8 py-3 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all">
                        <Calendar className="w-4 h-4" /> Feb 22 - Feb 28
                    </button>
                </div>

                {/* Weekly Executive Summary Card */}
                <div className="p-1 glass bg-white/5 rounded-[4rem] border-white/5 overflow-hidden">
                    <div className="glass p-16 rounded-[3.8rem] border-transparent relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] -mr-64 -mt-64" />
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-indigo-400 fill-indigo-400/20" />
                            </div>
                            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">AI Weekly Executive Summary</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <p className="text-xl text-white/80 font-medium italic leading-relaxed">
                                    Overall sentiment has increased by <span className="text-emerald-400">12.4%</span> across all clusters. This is primarily driven by the 'Food Quality' improvements in Downtown, which saw a 24% boost in positive mentions after the kitchen protocol update.
                                </p>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">Core Observations</h4>
                                    <ul className="space-y-4">
                                        {[
                                            "Wait times in Midtown Express remain a bottleneck (avg 38m).",
                                            "Dine-in QR reviews are 1.2 points higher than Google reviews.",
                                            "Service sentiment peak is between 7PM - 9PM Friday.",
                                            "Chef Mario mentioned positively in 15 verified reviews."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 items-start text-sm text-white/60 font-medium italic">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="glass bg-white/5 p-8 rounded-[2.5rem] border-indigo-500/20">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Target className="w-4 h-4" /> Next Strategic Goal
                                    </h4>
                                    <p className="text-lg font-black text-white italic tracking-tight mb-4 uppercase">Reduce Midtown SLA by 15%</p>
                                    <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">
                                        AI analysis suggests adding 1 additional expediter during the dinner rush will neutralize 85% of current 'slow service' complaints.
                                    </p>
                                </div>
                                <button className="w-full bg-white text-slate-950 py-5 rounded-[2rem] font-black uppercase italic tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-all">
                                    Deploy Recommendations <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trending Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: "Hygiene Score", value: "98/100", trend: "+2", icon: ShieldCheck, color: "text-emerald-400" },
                        { label: "Pricing Perception", value: "Competitive", trend: "Stable", icon: TrendingUp, color: "text-blue-400" },
                        { label: "Staff Efficiency", value: "High", trend: "+5%", icon: BarChart3, color: "text-indigo-400" },
                        { label: "Ambience Score", value: "Premium", trend: "+1.2", icon: Zap, color: "text-purple-400" },
                    ].map((insight, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group hover:border-indigo-500/20 transition-all"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[40px] -mr-12 -mt-12 group-hover:bg-indigo-500/10 transition-all" />
                            <div className="p-3 bg-slate-900 rounded-xl w-fit mb-6">
                                <insight.icon className={cn("w-5 h-5", insight.color)} />
                            </div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 italic">{insight.label}</p>
                            <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase">{insight.value}</h4>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                                {insight.trend} <TrendingUp className="w-3 h-3" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Competitive Positioning */}
                <div className="glass p-10 rounded-[3.5rem] border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center">
                            <Lightbulb className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Market Opportunity Detected</h3>
                            <p className="text-xs text-muted-foreground font-bold italic mt-1 italic">Competitor 'City Bistro' has a 40% negative sentiment on 'Ambience'. Emphasize your premium interior in next campaign.</p>
                        </div>
                    </div>
                    <button className="text-[10px] font-black text-white uppercase italic tracking-widest px-8 py-4 glass bg-white/5 hover:bg-white/10 rounded-2xl border-white/5 transition-all">
                        Launch Campaign Wizard
                    </button>
                </div>
            </div>
        </div>
    );
}
