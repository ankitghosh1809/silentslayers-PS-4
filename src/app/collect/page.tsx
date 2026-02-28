"use client";

import { Sidebar } from "@/components/sidebar";
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
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Omni-Channel Collection Active</p>
                        </motion.div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Collect Feedback</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">Generate QR codes, links, and widgets to capture real-time reviews.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Controls Panel */}
                    <div className="lg:col-span-12 glass p-4 rounded-3xl border-transparent bg-white/5 shadow-2xl flex gap-6">
                        <button
                            onClick={() => setActiveTab("distribution")}
                            className={cn(
                                "flex items-center gap-2 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === "distribution" ? "bg-indigo-600 text-white shadow-xl" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            <Share2 className="w-4 h-4" /> Distribution methods
                        </button>
                        <button
                            onClick={() => setActiveTab("configuration")}
                            className={cn(
                                "flex items-center gap-2 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === "configuration" ? "bg-indigo-600 text-white shadow-xl" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            <Palette className="w-4 h-4" /> Form Configuration
                        </button>
                    </div>

                    {/* Left Config Panel */}
                    <div className="lg:col-span-7 space-y-8">
                        {activeTab === "distribution" ? (
                            <div className="glass p-10 rounded-[3rem] border-white/5 space-y-10">
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter underline decoration-indigo-500 underline-offset-8">Distribution methods</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="glass bg-white/5 p-8 rounded-[2.5rem] border-white/5 group hover:border-indigo-500/30 transition-all flex flex-col items-center text-center">
                                        <div className="w-20 h-20 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                                            <QrCode className="w-10 h-10 text-indigo-400" />
                                        </div>
                                        <h4 className="text-lg font-black text-white italic uppercase tracking-tight mb-2">QR Code Generator</h4>
                                        <p className="text-[10.5px] text-muted-foreground font-medium italic mb-6">Perfect for tablet displays and table standees.</p>
                                        <div className="flex gap-3 w-full">
                                            <button className="flex-1 glass bg-indigo-500/10 border-indigo-500/20 py-3 rounded-xl text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:bg-indigo-500/20 transition-all flex items-center justify-center gap-2">
                                                <Download className="w-3.5 h-3.5" /> Download SVG
                                            </button>
                                        </div>
                                    </div>

                                    <div className="glass bg-white/5 p-8 rounded-[2.5rem] border-white/5 group hover:border-indigo-500/30 transition-all flex flex-col items-center text-center">
                                        <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                                            <LinkIcon className="w-10 h-10 text-purple-400" />
                                        </div>
                                        <h4 className="text-lg font-black text-white italic uppercase tracking-tight mb-2">Shareable Link</h4>
                                        <p className="text-[10.5px] text-muted-foreground font-medium italic mb-6">Send via WhatsApp, Email, or Bio links.</p>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(feedbackLink);
                                                alert("Link copied to clipboard!");
                                            }}
                                            className="w-full glass bg-purple-500/10 border-purple-500/20 py-3 rounded-xl text-[9px] font-black text-purple-400 uppercase tracking-widest hover:bg-purple-500/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Copy className="w-3.5 h-3.5" /> Copy URL
                                        </button>
                                    </div>

                                    <div className="glass bg-white/5 p-8 rounded-[2.5rem] border-white/5 group hover:border-indigo-500/30 transition-all flex flex-col items-center text-center">
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                                            <MessageCircle className="w-10 h-10 text-emerald-400" />
                                        </div>
                                        <h4 className="text-lg font-black text-white italic uppercase tracking-tight mb-2">WhatsApp link</h4>
                                        <p className="text-[10.5px] text-muted-foreground font-medium italic mb-6">Direct broadcast with pre-filled message.</p>
                                        <button
                                            onClick={() => {
                                                const url = `https://wa.me/?text=${encodeURIComponent(`We value your feedback! ${feedbackLink}`)}`;
                                                window.open(url, '_blank');
                                            }}
                                            className="w-full glass bg-emerald-500/10 border-emerald-500/20 py-3 rounded-xl text-[9px] font-black text-emerald-400 uppercase tracking-widest hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Zap className="w-3.5 h-3.5" /> Open Link
                                        </button>
                                    </div>

                                    <div className="glass bg-white/5 p-8 rounded-[2.5rem] border-white/5 group hover:border-indigo-500/30 transition-all flex flex-col items-center text-center">
                                        <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                                            <Globe className="w-10 h-10 text-blue-400" />
                                        </div>
                                        <h4 className="text-lg font-black text-white italic uppercase tracking-tight mb-2">Feedback Widget</h4>
                                        <p className="text-[10.5px] text-muted-foreground font-medium italic mb-6">Embed directly onto your business website.</p>
                                        <button className="w-full glass bg-blue-500/10 border-blue-500/20 py-3 rounded-xl text-[9px] font-black text-blue-400 uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2">
                                            <Settings className="w-3.5 h-3.5" /> Get Code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="glass p-10 rounded-[3rem] border-white/5 space-y-10">
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter underline decoration-indigo-500 underline-offset-8">Form Configuration</h3>

                                <div className="space-y-6">
                                    {[
                                        { id: "starRating", label: "Enable Star Rating", icon: Star },
                                        { id: "categoryTags", label: "Enable Category Tags", icon: Globe },
                                        { id: "staffTagging", label: "Enable Staff Tagging", icon: Users },
                                        { id: "anonymous", label: "Allow Anonymous Mode", icon: User }
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-6 glass bg-white/5 rounded-2xl border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-slate-900 rounded-lg">
                                                    <item.icon className="w-5 h-5 text-indigo-400" />
                                                </div>
                                                <p className="text-sm font-black text-white uppercase italic tracking-widest">{item.label}</p>
                                            </div>
                                            <button
                                                onClick={() => setFormConfig({ ...formConfig, [item.id]: !formConfig[item.id as keyof typeof formConfig] })}
                                                className={cn(
                                                    "w-12 h-6 rounded-full p-1 transition-all",
                                                    formConfig[item.id as keyof typeof formConfig] ? "bg-indigo-600" : "bg-slate-800"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-4 h-4 rounded-full bg-white transition-all transform",
                                                    formConfig[item.id as keyof typeof formConfig] ? "translate-x-6" : "translate-x-0"
                                                )} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-8 glass bg-indigo-500/5 rounded-[2.5rem] border-indigo-500/10">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Custom Thank-You Message</p>
                                    <textarea
                                        className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white text-xs font-medium italic outline-none focus:ring-2 focus:ring-indigo-500/20 min-h-[100px]"
                                        defaultValue="Thank you for your valuable feedback! We hope to see you again soon at Downtown Bistro."
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Preview Panel */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-0 space-y-8">
                            <div className="flex items-center justify-center gap-3">
                                <Eye className="w-5 h-5 text-indigo-400" />
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Live Preview</h3>
                            </div>

                            {/* Mock Mobile Device */}
                            <div className="mx-auto w-[320px] h-[650px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-[0_0_100px_rgba(99,102,241,0.2)] relative overflow-hidden flex flex-col">
                                <div className="h-6 w-32 bg-slate-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-20" />

                                <div className="flex-1 overflow-y-auto bg-slate-950 p-6 pt-12 custom-scrollbar no-scrollbar">
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl">
                                            <Zap className="w-10 h-10 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-black text-white italic uppercase italic tracking-tighter leading-none">ReviewFlow</h2>
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-2 font-bold tracking-widest uppercase mb-12">Downtown Bistro</p>
                                    </div>

                                    <h3 className="text-xl font-black text-white italic uppercase italic tracking-tighter text-center mb-4">How was your experience?</h3>

                                    {formConfig.starRating && (
                                        <div className="flex justify-center gap-2 mb-8">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} className={cn("w-8 h-8 fill-current", i <= 4 ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" : "text-white/10")} />
                                            ))}
                                        </div>
                                    )}

                                    {formConfig.categoryTags && (
                                        <div className="mb-8">
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-4">What did you like?</p>
                                            <div className="flex flex-wrap gap-2">
                                                {["Food", "Service", "Staff", "Cleanliness", "Ambience", "Value"].map(tag => (
                                                    <div key={tag} className="px-3 py-1.5 glass bg-white/5 rounded-lg text-[9px] font-black text-white/60 uppercase italic border-white/5">
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {formConfig.staffTagging && (
                                        <div className="mb-8">
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-4">Who served you?</p>
                                            <div className="w-full glass bg-white/5 p-4 rounded-xl text-[10px] font-bold text-white/50 border-white/5 flex justify-between items-center group cursor-pointer">
                                                Select Staff Member
                                                <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-4">Additional Comments</p>
                                        <div className="w-full glass bg-white/5 p-4 rounded-xl text-[10px] font-medium text-white/30 border-white/5 h-24">
                                            Share your thoughts...
                                        </div>
                                    </div>

                                    <button className="w-full bg-gradient-to-tr from-indigo-500 to-indigo-700 py-4 rounded-2xl text-[11px] font-black text-white uppercase italic tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">
                                        Submit Feedback
                                    </button>

                                    <p className="text-center text-[8px] font-black text-muted-foreground uppercase tracking-widest mt-8 flex items-center justify-center gap-1.5">
                                        <CheckCircle2 className="w-2.5 h-2.5" /> Secured by ReviewFlow AI
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Section */}
                <div className="p-1 glass bg-white/5 rounded-[4rem] border-white/5 overflow-hidden">
                    <div className="glass p-16 rounded-[3.8rem] border-transparent relative overflow-hidden flex flex-col items-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
                        <div className="w-[200px] h-[200px] bg-white p-6 rounded-[2.5rem] shadow-2xl relative mb-10 flex items-center justify-center">
                            <QRCodeCanvas value={feedbackLink} size={160} />
                            <div className="absolute inset-x-0 -bottom-4 bg-indigo-600 text-[10px] font-black text-white py-1 px-4 rounded-full text-center shadow-lg border-2 border-slate-950 uppercase tracking-tighter">
                                Scan & Review
                            </div>
                        </div>
                        <h3 className="text-4xl font-black text-white italic uppercase italic tracking-tighter mb-4">Deploy Instant Feedback</h3>
                        <p className="text-muted-foreground font-bold italic mb-8 max-w-xl text-center">Place this QR code at your checkout, on table standees, or digital receipts to capture sentiment at the moment of peak emotion.</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => alert("Feedback system deployed successfully. Assets downloading...")}
                                className="glass bg-white text-slate-950 px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-widest hover:scale-105 transition-all"
                            >
                                Download High-Res Print Asset
                            </button>
                            <button className="glass bg-white/5 border-white/10 px-8 py-3 rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest hover:bg-white/10 transition-all">
                                Generate for All Branches
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
