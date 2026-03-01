"use client";

import {
    QrCode,
    Link as LinkIcon,
    MessageCircle,
    Share2,
    Download,
    Palette,
    Eye,
    Settings,
    Star,
    CheckCircle2,
    Copy,
    Zap,
    Globe,
    Users,
    User
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getBaseUrl } from "@/lib/urls";
import { DashboardShell } from "@/components/dashboard-shell";

export default function CollectFeedbackPage() {
    const [baseUrl, setBaseUrl] = useState("http://localhost:3000");

    useEffect(() => {
        setBaseUrl(getBaseUrl());
    }, []);

    const feedbackLink = `${baseUrl}/feedback/downtown`;
    const [activeTab, setActiveTab] = useState("distribution");
    const [formConfig, setFormConfig] = useState({
        starRating: true,
        categoryTags: true,
        staffTagging: true,
        anonymous: false
    });

    return (
        <DashboardShell>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0 font-black italic">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Omni-Channel Active</p>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Collect</h2>
                    <p className="text-muted-foreground text-sm font-medium italic mt-2">Generate QR codes and links to capture reviews.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                {/* Controls - Full Width on Mobile */}
                <div className="lg:col-span-12 glass p-4 lg:p-4 rounded-2xl lg:rounded-3xl border-transparent bg-white/5 shadow-2xl flex flex-col sm:flex-row gap-4 sm:gap-6 font-black italic">
                    <button
                        onClick={() => setActiveTab("distribution")}
                        className={cn(
                            "flex items-center justify-center sm:justify-start gap-2 px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-[10px] uppercase tracking-widest transition-all",
                            activeTab === "distribution" ? "bg-indigo-600 text-white shadow-xl" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        <Share2 className="w-4 h-4" /> Distribution
                    </button>
                    <button
                        onClick={() => setActiveTab("configuration")}
                        className={cn(
                            "flex items-center justify-center sm:justify-start gap-2 px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-[10px] uppercase tracking-widest transition-all",
                            activeTab === "configuration" ? "bg-indigo-600 text-white shadow-xl" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        <Palette className="w-4 h-4" /> Config
                    </button>
                </div>

                {/* Left Config Panel */}
                <div className="lg:col-span-7 space-y-8 font-black italic">
                    {activeTab === "distribution" ? (
                        <div className="glass p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border-white/5 space-y-8 lg:space-y-10">
                            <h3 className="text-xl lg:text-2xl font-black text-white italic uppercase tracking-tighter underline decoration-indigo-500 underline-offset-8">Methods</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                {[
                                    { icon: QrCode, label: "QR Code", desc: "For table standees", color: "text-indigo-400", bg: "bg-indigo-500/10", action: "Download" },
                                    { icon: LinkIcon, label: "Share Link", desc: "For bio or sms", color: "text-purple-400", bg: "bg-purple-500/10", action: "Copy URL" },
                                    { icon: MessageCircle, label: "WhatsApp", desc: "Direct broadcast", color: "text-emerald-400", bg: "bg-emerald-500/10", action: "Open" },
                                    { icon: Globe, label: "Widget", desc: "Embed on site", color: "text-blue-400", bg: "bg-blue-500/10", action: "Get Code" }
                                ].map((method, i) => (
                                    <div key={i} className="glass bg-white/5 p-6 lg:p-8 rounded-[2rem] border-white/5 group hover:border-indigo-500/30 transition-all flex flex-col items-center text-center">
                                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform", method.bg)}>
                                            <method.icon className={cn("w-8 h-8", method.color)} />
                                        </div>
                                        <h4 className="text-lg font-black text-white italic uppercase mb-1">{method.label}</h4>
                                        <p className="text-[10px] text-muted-foreground font-medium italic mb-6 leading-none">{method.desc}</p>
                                        <button className="w-full glass bg-white/5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                            {method.action}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="glass p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border-white/5 space-y-8 lg:space-y-10">
                            <h3 className="text-xl lg:text-2xl font-black text-white italic uppercase tracking-tighter underline decoration-indigo-500 underline-offset-8">Form Config</h3>

                            <div className="space-y-4 lg:space-y-6">
                                {[
                                    { id: "starRating", label: "Star Rating", icon: Star },
                                    { id: "categoryTags", label: "Category Tags", icon: Globe },
                                    { id: "staffTagging", label: "Staff Tagging", icon: Users },
                                    { id: "anonymous", label: "Anonymous Mode", icon: User }
                                ].map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-5 lg:p-6 glass bg-white/5 rounded-2xl border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-slate-900 rounded-lg">
                                                <item.icon className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-400" />
                                            </div>
                                            <p className="text-xs lg:text-sm font-black text-white uppercase tracking-widest">{item.label}</p>
                                        </div>
                                        <button
                                            onClick={() => setFormConfig({ ...formConfig, [item.id]: !formConfig[item.id as keyof typeof formConfig] })}
                                            className={cn(
                                                "w-10 lg:w-12 h-5 lg:h-6 rounded-full p-1 transition-all",
                                                formConfig[item.id as keyof typeof formConfig] ? "bg-indigo-600" : "bg-slate-800"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-3 lg:w-4 h-3 lg:h-4 rounded-full bg-white transition-all transform",
                                                formConfig[item.id as keyof typeof formConfig] ? "translate-x-5 lg:translate-x-6" : "translate-x-0"
                                            )} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Preview Panel - Mobile Friendly Preview */}
                <div className="lg:col-span-5 relative font-black italic">
                    <div className="sticky top-0 space-y-8">
                        <div className="flex items-center justify-center gap-3">
                            <Eye className="w-5 h-5 text-indigo-400" />
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Preview</h3>
                        </div>

                        {/* Mock Mobile Device - Scaled for Tablet/Small Desktop */}
                        <div className="mx-auto w-[280px] h-[550px] lg:w-[320px] lg:h-[650px] bg-slate-900 rounded-[2.5rem] lg:rounded-[3rem] border-[6px] lg:border-[8px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col shrink-0">
                            <div className="h-4 w-24 lg:h-6 lg:w-32 bg-slate-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-20" />

                            <div className="flex-1 overflow-y-auto bg-slate-950 p-6 pt-12 no-scrollbar">
                                <div className="text-center mb-8">
                                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl lg:rounded-2xl mx-auto flex items-center justify-center mb-4 lg:mb-6 shadow-xl">
                                        <Zap className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                                    </div>
                                    <h2 className="text-xl lg:text-2xl font-black text-white italic uppercase tracking-tighter leading-none">ReviewFlow</h2>
                                    <p className="text-[8px] lg:text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-2">Downtown Bistro</p>
                                </div>

                                <h3 className="text-base lg:text-xl font-black text-white italic uppercase tracking-tighter text-center mb-4 leading-tight">Rate Your Hub?</h3>

                                {formConfig.starRating && (
                                    <div className="flex justify-center gap-1 lg:gap-2 mb-6 lg:mb-8">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} className={cn("w-6 h-6 lg:w-8 lg:h-8 fill-current", i <= 4 ? "text-yellow-400" : "text-white/10")} />
                                        ))}
                                    </div>
                                )}

                                {formConfig.categoryTags && (
                                    <div className="mb-6 lg:mb-8 font-black">
                                        <p className="text-[8px] lg:text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3">What was peak?</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["Food", "Service", "Ambience"].map(tag => (
                                                <div key={tag} className="px-2 lg:px-3 py-1 lg:py-1.5 glass bg-white/5 rounded-lg text-[8px] lg:text-[9px] font-black text-white/60 uppercase">
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button className="w-full bg-indigo-600 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-[10px] lg:text-[11px] font-black text-white uppercase tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-center">
                                    Transmit Intel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QR Print Section */}
            <div className="p-1 glass bg-white/5 rounded-[3rem] lg:rounded-[4rem] border-white/5 overflow-hidden font-black italic">
                <div className="glass p-8 lg:p-16 rounded-[2.8rem] lg:rounded-[3.8rem] border-transparent relative overflow-hidden flex flex-col items-center italic">
                    <div className="w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] bg-white p-4 lg:p-6 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl relative mb-8 flex items-center justify-center">
                        <QRCodeCanvas value={feedbackLink} size={140} />
                        <div className="absolute inset-x-0 -bottom-3 bg-indigo-600 text-[8px] lg:text-[10px] font-black text-white py-1.5 px-3 lg:px-4 rounded-full text-center shadow-lg border-2 border-slate-950 uppercase tracking-tighter">
                            Scan & Review
                        </div>
                    </div>
                    <h3 className="text-2xl lg:text-4xl font-black text-white italic uppercase tracking-tighter mb-4 text-center leading-none">Instant Feedback</h3>
                    <button className="glass bg-white text-slate-950 px-8 lg:px-10 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all text-center">
                        Download high-res asset
                    </button>
                </div>
            </div>
        </DashboardShell>
    );
}
