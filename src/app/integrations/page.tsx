"use client";

import { Sidebar } from "@/components/sidebar";
import {
    Globe,
    Settings,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    Mail,
    Smartphone,
    ChevronRight,
    Zap,
    Building2,
    Table as TableIcon,
    X,
    Send,
    Copy,
    Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const integrations = [
    { id: "google", name: "Google Business Profile", status: "CONNECTED", icon: Globe, color: "text-blue-500", desc: "Sync reviews, respond directly, and track rankings." },
    { id: "zomato", name: "Zomato", status: "CONNECTED", icon: TableIcon, color: "text-rose-500", desc: "Import restaurant reviews and delivery feedback." },
    { id: "swiggy", name: "Swiggy", status: "NOT_CONNECTED", icon: Building2, color: "text-orange-500", desc: "Monitor delivery experiences and staff performance." },
    { id: "whatsapp", name: "WhatsApp Business", status: "NOT_CONNECTED", icon: Smartphone, color: "text-emerald-500", desc: "Automate review collection via direct messaging." },
    { id: "gmail", name: "Email Insights", status: "NOT_CONNECTED", icon: Mail, color: "text-red-500", desc: "Digest reports and critical escalation alerts via SMTP." },
];

export default function IntegrationsPage() {
    const [showDocs, setShowDocs] = useState(false);
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
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">API Bridge Active</p>
                        </motion.div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Integrations</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">Connect your business stack to centralize reputation management.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {integrations.map((int, i) => (
                        <motion.div
                            key={int.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass p-10 rounded-[3rem] border-white/5 group hover:border-indigo-500/20 transition-all flex flex-col items-center text-center relative overflow-hidden"
                        >
                            {int.status === "CONNECTED" && (
                                <div className="absolute top-0 right-0 p-6">
                                    <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Active</span>
                                    </div>
                                </div>
                            )}

                            <div className={cn(
                                "w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 bg-slate-900 border border-white/5 transition-all group-hover:scale-110 group-hover:bg-indigo-500/10",
                                int.status === "CONNECTED" ? "border-indigo-500/20" : ""
                            )}>
                                <int.icon className={cn("w-10 h-10", int.status === "CONNECTED" ? "text-indigo-400" : "text-muted-foreground")} />
                            </div>

                            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4">{int.name}</h3>
                            <p className="text-[11px] text-muted-foreground font-medium italic leading-relaxed mb-8 flex-1">
                                {int.desc}
                            </p>

                            <div className="w-full space-y-3">
                                {int.status === "CONNECTED" ? (
                                    <button className="w-full py-4 glass bg-white/5 text-[10px] font-black text-white uppercase italic tracking-widest rounded-2xl border-white/5 hover:bg-white/10 transition-all">
                                        Manage Connection
                                    </button>
                                ) : (
                                    <button className="w-full py-4 bg-indigo-600 text-[10px] font-black text-white uppercase italic tracking-widest rounded-2xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20">
                                        Connect Now <Zap className="w-3 h-3 inline ml-2" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Webhooks Section */}
                <div className="p-1 glass bg-white/5 rounded-[4rem] border-white/5 overflow-hidden">
                    <div className="glass p-16 rounded-[3.8rem] border-transparent relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32" />
                        <div className="max-w-3xl">
                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-6">Developer Webhooks</h3>
                            <p className="text-lg text-muted-foreground font-medium italic mb-10 leading-relaxed">
                                Subscribe to events like `review.created`, `escalation.triggered`, or `response.published` to build your own custom automations with n8n, Zapier, or your internal tools.
                            </p>
                            <div className="flex gap-4">
                                <button className="glass bg-white text-slate-950 px-10 py-4 rounded-2xl text-[10px] font-black uppercase italic tracking-widest hover:scale-105 transition-all">
                                    Configure Webhooks
                                </button>
                                <button
                                    onClick={() => setShowDocs(true)}
                                    className="glass bg-white/5 border-white/10 px-10 py-4 rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest hover:bg-white/10 transition-all font-bold"
                                >
                                    Read API Docs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Docs Modal */}
                <AnimatePresence>
                    {showDocs && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pb-20">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowDocs(false)}
                                className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-2xl glass p-10 rounded-[4rem] border-white/10 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
                            >
                                <div className="absolute top-0 right-0 p-8">
                                    <button
                                        onClick={() => setShowDocs(false)}
                                        className="p-3 hover:bg-white/5 rounded-2xl transition-all"
                                    >
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Documentation</p>
                                    </div>
                                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">ReviewFlow API (Demo Mode)</h3>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                                            <Send className="w-4 h-4 text-indigo-400" /> Webhook Example
                                        </h4>
                                        <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 font-mono text-[10px] text-indigo-300 leading-relaxed overflow-x-auto">
                                            <pre>
                                                {`{
  "event": "review.created",
  "branch": "Downtown",
  "rating": 4,
  "sentiment": "positive",
  "created_at": "2026-03-01T12:30:00Z"
}`}
                                            </pre>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { title: "Google My Business", desc: "Real-time AI integration active. Response sync is enabled.", icon: Globe, status: "Active" },
                                            { title: "WhatsApp Business", desc: "Direct broadcast requires meta business verification.", icon: Sparkles, status: "Restricted" },
                                            { title: "Swiggy Partnership", desc: "Requires enterprise-level API keys for direct data pull.", icon: Building2, status: "Partnership" }
                                        ].map((item, i) => (
                                            <div key={i} className="glass bg-white/5 p-6 rounded-3xl border-white/5">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <item.icon className="w-5 h-5 text-indigo-400" />
                                                    <h5 className="text-[11px] font-black text-white uppercase italic">{item.title}</h5>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground font-medium italic mb-4">{item.desc}</p>
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-[8px] font-black text-white/50 uppercase italic tracking-widest">
                                                    {item.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest italic italic">Request Full Enterprise Documentation at support@reviewflow.ai</p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
