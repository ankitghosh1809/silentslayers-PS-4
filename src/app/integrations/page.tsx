"use client";

import {
    Globe,
    CheckCircle2,
    Zap,
    Building2,
    Table as TableIcon,
    X,
    Send,
    Sparkles,
    Mail,
    Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";

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
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">API Bridge Active</p>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Integrations</h2>
                    <p className="text-muted-foreground text-sm font-medium italic mt-2">Connect your business stack to centralize reputation management.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {integrations.map((int, i) => (
                    <motion.div
                        key={int.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border-white/5 group hover:border-indigo-500/20 transition-all flex flex-col items-center text-center relative overflow-hidden min-h-[350px]"
                    >
                        {int.status === "CONNECTED" && (
                            <div className="absolute top-0 right-0 p-4 lg:p-6 italic font-bold">
                                <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    <span className="text-[8px] lg:text-[9px] font-black text-emerald-500 uppercase">Active</span>
                                </div>
                            </div>
                        )}

                        <div className={cn(
                            "w-16 h-16 lg:w-20 lg:h-20 rounded-2xl lg:rounded-[2rem] flex items-center justify-center mb-6 lg:mb-8 bg-slate-900 border border-white/5 transition-all group-hover:scale-110",
                            int.status === "CONNECTED" ? "border-indigo-500/20 bg-indigo-500/5 text-indigo-400" : "text-muted-foreground"
                        )}>
                            <int.icon className="w-8 h-8 lg:w-10 lg:h-10" />
                        </div>

                        <h3 className="text-lg lg:text-xl font-black text-white italic uppercase tracking-tighter mb-4">{int.name}</h3>
                        <p className="text-[10.5px] lg:text-[11px] text-muted-foreground font-medium italic leading-relaxed mb-8 flex-1">
                            {int.desc}
                        </p>

                        <div className="w-full space-y-3">
                            {int.status === "CONNECTED" ? (
                                <button className="w-full py-4 glass bg-white/5 text-[9px] lg:text-[10px] font-black text-white uppercase italic tracking-widest rounded-xl lg:rounded-2xl border-white/5 hover:bg-white/10 transition-all">
                                    Manage
                                </button>
                            ) : (
                                <button className="w-full py-4 bg-indigo-600 text-[9px] lg:text-[10px] font-black text-white uppercase italic tracking-widest rounded-xl lg:rounded-2xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2">
                                    Connect <Zap className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Webhooks Section */}
            <div className="p-1 glass bg-white/5 rounded-[3rem] lg:rounded-[4rem] border-white/5 overflow-hidden">
                <div className="glass p-8 lg:p-16 rounded-[2.8rem] lg:rounded-[3.8rem] border-transparent relative overflow-hidden italic font-bold">
                    <div className="absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-indigo-500/10 blur-[100px] -mr-16 lg:-mr-32 -mt-16 lg:-mt-32" />
                    <div className="max-w-3xl relative z-10">
                        <h3 className="text-2xl lg:text-4xl font-black text-white italic uppercase tracking-tighter mb-4 lg:mb-6 leading-none">Developer Webhooks</h3>
                        <p className="text-base lg:text-lg text-muted-foreground font-medium italic mb-8 lg:mb-10 leading-relaxed">
                            Subscribe to events like `review.created`, `escalation.triggered`, or `response.published` to build your own custom automations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="glass bg-white text-slate-950 px-8 lg:px-10 py-4 rounded-xl lg:rounded-2xl text-[10px] font-black uppercase italic tracking-widest hover:scale-105 transition-all text-center">
                                Configure Webhooks
                            </button>
                            <button
                                onClick={() => setShowDocs(true)}
                                className="glass bg-white/5 border-white/10 px-8 lg:px-10 py-4 rounded-xl lg:rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest hover:bg-white/10 transition-all text-center"
                            >
                                API Docs
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* API Docs Modal */}
            <AnimatePresence>
                {showDocs && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 overflow-hidden">
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
                            className="relative w-full max-w-2xl glass p-6 lg:p-10 rounded-[3rem] lg:rounded-[4rem] border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col font-black"
                        >
                            <div className="absolute top-0 right-0 p-4 lg:p-8">
                                <button
                                    onClick={() => setShowDocs(false)}
                                    className="p-3 hover:bg-white/5 rounded-xl transition-all"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Documentation</p>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter">ReviewFlow API</h3>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar no-scrollbar italic font-bold">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                                        <Send className="w-4 h-4 text-indigo-400" /> Webhook Example
                                    </h4>
                                    <div className="p-4 lg:p-6 bg-slate-900/50 rounded-2xl lg:rounded-3xl border border-white/5 font-mono text-[10px] text-indigo-300 leading-relaxed overflow-x-auto italic">
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                    {[
                                        { title: "Google My Business", desc: "Real-time AI integration active. Response sync is enabled.", icon: Globe, status: "Active" },
                                        { title: "WhatsApp Business", desc: "Direct broadcast requires meta business verification.", icon: Sparkles, status: "Restricted" },
                                    ].map((item, i) => (
                                        <div key={i} className="glass bg-white/5 p-5 lg:p-6 rounded-2xl lg:rounded-3xl border-white/5">
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
                                <p className="text-[8px] lg:text-[9px] font-black text-muted-foreground uppercase tracking-widest italic leading-none">Enterprise Inquiries: support@reviewflow.ai</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardShell>
    );
}
