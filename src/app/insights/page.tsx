"use client";

import { useState } from "react";
import {
    Sparkles,
    Calendar,
    Target,
    ArrowRight,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    Zap,
    Lightbulb,
    X,
    Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard-shell";

export default function InsightsPage() {
    const [showWizard, setShowWizard] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [generating, setGenerating] = useState(false);
    const [campaignData, setCampaignData] = useState<any>(null);

    const handleNext = () => setWizardStep(prev => prev + 1);
    const handlePrev = () => setWizardStep(prev => prev - 1);

    const generateCampaign = () => {
        setGenerating(true);
        setTimeout(() => {
            setCampaignData({
                title: "Midtown Excellence Protocol",
                whatsapp: "We value your presence! Share your experience at Midtown Express and get a complimentary appetizer on your next visit.",
                instagram: "Excellence served fresh. 🌟 See why Midtown is the higher standard. #ReviewFlow",
                impact: "+0.3 rating increase expected"
            });
            setGenerating(false);
            setWizardStep(4);
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
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">AI Intelligence Cluster Active</p>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">AI Insights</h2>
                    <p className="text-muted-foreground text-sm font-medium italic mt-2">Deep-dive behavioral analysis and trend forecasting powered by Gemini.</p>
                </div>
                <button className="w-full sm:w-auto glass px-8 py-3 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all">
                    <Calendar className="w-4 h-4" /> Feb 22 - Feb 28
                </button>
            </div>

            {/* Weekly Executive Summary Card */}
            <div className="p-1 glass bg-white/5 rounded-[3rem] lg:rounded-[4rem] border-white/5 overflow-hidden">
                <div className="glass p-8 lg:p-16 rounded-[2.8rem] lg:rounded-[3.8rem] border-transparent relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-indigo-500/10 blur-[80px] lg:blur-[120px] -mr-32 lg:-mr-64 -mt-32 lg:-mt-64" />
                    <div className="flex items-center gap-4 mb-8 lg:mb-10">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-400 fill-indigo-400/20" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter">AI Executive Summary</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        <div className="space-y-6 lg:space-y-8">
                            <p className="text-lg lg:text-xl text-white/80 font-medium italic leading-relaxed">
                                Overall sentiment has increased by <span className="text-emerald-400">12.4%</span> across all clusters. This is primarily driven by the 'Food Quality' improvements in Downtown.
                            </p>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">Core Observations</h4>
                                <ul className="space-y-3 lg:space-y-4">
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

                        <div className="space-y-6 lg:space-y-8">
                            <div className="glass bg-white/5 p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border-indigo-500/20">
                                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 lg:mb-6 flex items-center gap-2">
                                    <Target className="w-4 h-4" /> Strategic Goal
                                </h4>
                                <p className="text-lg font-black text-white italic tracking-tight mb-4 uppercase">Reduce Midtown SLA by 15%</p>
                                <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">
                                    AI analysis suggests adding 1 additional expediter during the dinner rush.
                                </p>
                            </div>
                            <button className="w-full bg-white text-slate-950 py-4 lg:py-5 rounded-[1.5rem] lg:rounded-[2rem] font-black uppercase italic tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-all text-xs lg:text-sm">
                                Deploy Recommendations <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                        className="glass p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border-white/5 relative overflow-hidden group hover:border-indigo-500/20 transition-all"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[40px] -mr-12 -mt-12 group-hover:bg-indigo-500/10 transition-all" />
                        <div className="p-3 bg-slate-900 rounded-xl w-fit mb-6">
                            <insight.icon className={cn("w-5 h-5", insight.color)} />
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 italic">{insight.label}</p>
                        <h4 className="text-xl lg:text-2xl font-black text-white italic tracking-tighter uppercase">{insight.value}</h4>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                            {insight.trend} <TrendingUp className="w-3 h-3" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Competitive Positioning */}
            <div className="glass p-6 lg:p-10 rounded-[2.5rem] lg:rounded-[3.5rem] border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 font-black">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-[1.2rem] lg:rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-6 h-6 lg:w-8 lg:h-8 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-lg lg:text-xl font-black text-white italic uppercase tracking-tighter">Market Opportunity</h3>
                        <p className="text-[10px] lg:text-xs text-muted-foreground font-bold italic mt-1 italic">Competitor 'City Bistro' has a 40% negative sentiment on 'Ambience'.</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowWizard(true)}
                    className="w-full sm:w-auto text-[10px] font-black text-white uppercase italic tracking-widest px-8 py-4 glass bg-white/5 hover:bg-white/10 rounded-2xl border-white/5 transition-all text-center"
                >
                    Launch Campaign Wizard
                </button>
            </div>

            {/* Campaign Wizard Modal */}
            <AnimatePresence>
                {showWizard && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowWizard(false)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl glass p-6 lg:p-10 rounded-[3rem] lg:rounded-[4rem] border-white/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
                        >
                            <div className="absolute top-0 right-0 p-4 lg:p-8">
                                <button onClick={() => setShowWizard(false)} className="p-2 lg:p-3 hover:bg-white/5 rounded-2xl transition-all">
                                    <X className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                </button>
                            </div>

                            {/* Stepper */}
                            <div className="flex gap-2 mb-10 pt-4">
                                {[1, 2, 3, 4].map(step => (
                                    <div
                                        key={step}
                                        className={cn(
                                            "h-1 flex-1 rounded-full transition-all",
                                            wizardStep >= step ? "bg-indigo-500" : "bg-white/10"
                                        )}
                                    />
                                ))}
                            </div>

                            {wizardStep === 1 && (
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Step 1: Select Opportunity</h4>
                                        <h3 className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter">What are we focusing on?</h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            "Low hygiene sentiment",
                                            "Pricing complaints",
                                            "Ambience promotion",
                                            "Staff recognition campaign"
                                        ].map(opt => (
                                            <button key={opt} onClick={handleNext} className="glass bg-white/5 p-4 lg:p-6 rounded-2xl lg:rounded-3xl border-white/5 hover:border-indigo-500/30 text-left group transition-all">
                                                <p className="text-sm font-black text-white italic uppercase">{opt}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {wizardStep === 2 && (
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Step 2: Choose Objective</h4>
                                        <h3 className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter">Target Result?</h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            "Increase rating",
                                            "Boost weekend traffic",
                                            "Reduce negative reviews",
                                            "Improve Google ranking"
                                        ].map(opt => (
                                            <button key={opt} onClick={handleNext} className="glass bg-white/5 p-4 lg:p-6 rounded-2xl lg:rounded-3xl border-white/5 hover:border-indigo-500/30 text-left group transition-all">
                                                <p className="text-sm font-black text-white italic uppercase">{opt}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {wizardStep === 3 && (
                                <div className="space-y-8">
                                    <div className="text-center py-10">
                                        <Sparkles className="w-12 h-12 lg:w-16 lg:h-16 text-indigo-400 mx-auto animate-pulse mb-6" />
                                        <h3 className="text-xl lg:text-2xl font-black text-white italic uppercase tracking-tight">AI Generation</h3>
                                        <p className="text-[10px] text-muted-foreground mt-2 italic capitalize font-bold">Gemini is synthesizing market data...</p>
                                    </div>
                                    <button
                                        onClick={generateCampaign}
                                        disabled={generating}
                                        className="w-full bg-indigo-600 py-4 rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest shadow-xl active:scale-95 transition-all"
                                    >
                                        {generating ? "Synthesizing..." : "Start AI synthesis"}
                                    </button>
                                </div>
                            )}

                            {wizardStep === 4 && campaignData && (
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Step 4: AI Strategic Output</h4>
                                        <h3 className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter">{campaignData.title}</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="glass bg-white/5 p-6 rounded-3xl border-white/5 font-bold italic">
                                            <p className="text-[9px] font-black text-indigo-400 uppercase mb-2">WhatsApp Channel</p>
                                            <p className="text-xs text-white/80 italic italic leading-relaxed">{campaignData.whatsapp}</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-black italic">
                                            <div className="glass bg-emerald-500/10 p-4 rounded-2xl border-emerald-500/20">
                                                <p className="text-[8px] font-black text-emerald-400 uppercase mb-1">Expected ROI</p>
                                                <p className="text-sm font-black text-white uppercase">+12% growth</p>
                                            </div>
                                            <div className="glass bg-indigo-500/10 p-4 rounded-2xl border-indigo-500/20">
                                                <p className="text-[8px] font-black text-indigo-400 uppercase mb-1">Impact</p>
                                                <p className="text-sm font-black text-white uppercase">+0.3 rating</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            alert("Campaign deployed successfully!");
                                            setShowWizard(false);
                                        }}
                                        className="w-full bg-white text-slate-950 py-4 rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <Rocket className="w-4 h-4" /> Deploy Strategic Campaign
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardShell>
    );
}
