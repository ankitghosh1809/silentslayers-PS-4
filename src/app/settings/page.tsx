"use client";

import { Sidebar } from "@/components/sidebar";
import {
    Bell,
    Smartphone,
    Mail,
    Zap,
    ShieldAlert,
    Trash2,
    RefreshCw,
    Clock,
    Globe,
    Star,
    Shield,
    ChevronRight,
    Database,
    RotateCcw,
    Sparkles,
    CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("notifications");

    return (
        <div className="flex gap-6 min-h-[calc(100vh-2rem)] bg-slate-950 p-4">
            <Sidebar />

            <div className="flex-1 space-y-8 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 custom-scrollbar pb-20 no-scrollbar">
                {/* Header */}
                <div>
                    <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">System Settings</h2>
                    <p className="text-muted-foreground font-medium italic mt-2">Global configuration, notification logic, and automation tuning.</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-4 p-2 glass bg-white/5 rounded-[2rem] border-white/5 w-fit">
                    {[
                        { id: "notifications", label: "Preferences", icon: Bell },
                        { id: "automation", label: "Automation", icon: Zap },
                        { id: "security", label: "Security", icon: Shield },
                        { id: "danger", label: "Governance", icon: Trash2 },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Config Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {activeTab === "notifications" && <NotificationSettings />}
                        {activeTab === "automation" && <AutomationSettings />}
                        {activeTab === "security" && (
                            <div className="glass p-10 rounded-[3rem] border-white/5 min-h-[400px] flex items-center justify-center text-center">
                                <div>
                                    <Shield className="w-16 h-16 text-indigo-400 mx-auto mb-6 opacity-20" />
                                    <h3 className="text-xl font-black text-white italic uppercase italic tracking-tighter mb-2 italic">Role-Based Access</h3>
                                    <p className="text-[10.5px] text-muted-foreground font-medium italic italic italic">Configure manager permissions and branch restrictions.</p>
                                    <button
                                        onClick={() => alert("RBAC management restricted in demo mode.")}
                                        className="mt-8 glass bg-white/5 px-8 py-3 rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest active:scale-95 transition-all"
                                    >
                                        Manage Roles
                                    </button>
                                </div>
                            </div>
                        )}
                        {activeTab === "danger" && <DangerZone />}
                    </div>

                    {/* Side Info Column */}
                    <div className="space-y-8">
                        <div className="glass p-10 rounded-[4rem] border-white/5 bg-gradient-to-b from-indigo-500/10 to-transparent">
                            <h3 className="text-xl font-black text-white italic uppercase italic tracking-tighter mb-10 underline decoration-indigo-500 underline-offset-8 italic italic italic">Subscription Plan</h3>
                            <div className="text-center">
                                <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-indigo-500/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)] group cursor-help">
                                    <Zap className="w-12 h-12 text-indigo-400 fill-indigo-400/20 group-hover:scale-110 transition-transform" />
                                </div>
                                <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter italic">Enterprise Elite</h4>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-2 uppercase italic italic italic">Active until Feb 2027</p>
                            </div>
                            <div className="mt-12 space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest italic">
                                    <span>Branches Included</span>
                                    <span className="text-white">5 / Unlimited</span>
                                </div>
                                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-[1px]">
                                    <div className="h-full w-4/12 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                                </div>
                            </div>
                            <button
                                onClick={() => alert("Enterprise plan managed via billing portal.")}
                                className="w-full mt-10 glass bg-white/10 border-white/10 text-[10px] font-black text-white uppercase italic tracking-widest py-5 rounded-3xl hover:bg-white/20 transition-all shadow-xl active:scale-95"
                            >
                                Upgrade Subscription
                            </button>
                        </div>

                        <div className="glass p-10 rounded-[3.5rem] border-white/5 bg-slate-900/40">
                            <div className="flex items-center gap-4 mb-6">
                                <Database className="w-5 h-5 text-indigo-400" />
                                <h3 className="text-[10px] font-black text-white uppercase tracking-widest italic italic italic">Data Governance</h3>
                            </div>
                            <p className="text-[11px] text-muted-foreground font-medium italic italic italic leading-relaxed">
                                ReviewFlow AI is GDPR & CCPA compliant. All sentiment processing happens in regional encrypted clusters.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NotificationSettings() {
    return (
        <div className="glass p-12 rounded-[4rem] border-white/5 space-y-12 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter underline decoration-indigo-500 underline-offset-8 italic italic italic">Notification preferences</h3>
                <Bell className="w-8 h-8 text-indigo-400 opacity-20" />
            </div>

            <div className="space-y-6">
                {[
                    { id: "email_all", label: "Global Email Digest", sub: "Daily summary of all reviews and AI scores.", icon: Mail },
                    { id: "sms_critical", label: "WhatsApp Alerts (Critical)", sub: "Instant routing for urgency_score > 8.", icon: Smartphone },
                    { id: "sla_breach", label: "SLA Breach Alerts", sub: "Notify when reviews go unresponded for 6h+.", icon: Clock },
                    { id: "weekly_report", label: "Executive Weekly Summary", sub: "Deep-dive branch comparison PDF.", icon: Globe },
                ].map(item => (
                    <div key={item.id} className="flex items-center justify-between p-8 glass bg-white/3 rounded-[2.5rem] border-white/5 group hover:border-white/10 transition-all">
                        <div className="flex items-center gap-8">
                            <div className="w-14 h-14 rounded-[1.5rem] bg-slate-900 flex items-center justify-center border-2 border-white/5 group-hover:scale-105 transition-transform shadow-inner">
                                <item.icon className="w-7 h-7 text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-xl font-black text-white uppercase italic tracking-tight italic">{item.label}</p>
                                <p className="text-[11px] font-medium text-muted-foreground italic mt-1 italic italic italic">{item.sub}</p>
                            </div>
                        </div>
                        <Toggle />
                    </div>
                ))}
            </div>
        </div>
    );
}

const tonePreviews: Record<string, string> = {
    "Professional": "We appreciate your valuable feedback regarding our service at Downtown. We have shared your comments with our management team for immediate review and improvement.",
    "Friendly": "Hey there! Thanks so much for stopping by Downtown. We're so glad you had a great time and we can't wait to see you again soon! Cheers!",
    "Premium Luxury": "It was our distinct pleasure to host you at Downtown. We strive for excellence in every detail, and your refined feedback is invaluable to our pursuit of perfection."
};

function AutomationSettings() {
    const [selectedTone, setSelectedTone] = useState("Friendly");

    return (
        <div className="glass p-12 rounded-[4rem] border-white/5 space-y-12 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter underline decoration-purple-500 underline-offset-8 italic italic italic">AI Automation Engine</h3>
                <Zap className="w-8 h-8 text-purple-400 opacity-20" />
            </div>

            <div className="space-y-8">
                <div className="p-10 glass bg-purple-500/5 rounded-[3.5rem] border-purple-500/10 space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-[1.5rem] bg-slate-900 flex items-center justify-center border-2 border-purple-500/20 shadow-lg">
                                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500/20" />
                            </div>
                            <h4 className="text-2xl font-black text-white italic uppercase tracking-tight italic italic italic">Auto-Respond (Positive)</h4>
                        </div>
                        <Toggle active={true} />
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-purple-400 uppercase tracking-widest italic ml-1">Brand Intelligence Tone</h5>
                        <div className="flex gap-4">
                            {["Professional", "Friendly", "Premium Luxury"].map(tone => (
                                <button
                                    key={tone}
                                    onClick={() => setSelectedTone(tone)}
                                    className={cn(
                                        "flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl",
                                        selectedTone === tone ? "bg-purple-600 text-white shadow-purple-500/20 scale-105" : "glass bg-white/5 text-muted-foreground border-white/5 hover:text-white"
                                    )}
                                >
                                    {tone}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-purple-400 uppercase tracking-widest italic ml-1 italic italic italic">Live Preview</h5>
                        <div className="p-8 glass bg-black/40 rounded-[2.5rem] border-white/10 italic text-white/70 leading-relaxed font-medium text-sm relative overflow-hidden group">
                            <Sparkles className="absolute top-4 right-4 w-5 h-5 text-purple-400 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                            <p>"{tonePreviews[selectedTone]}"</p>
                        </div>
                    </div>
                </div>

                <div className="p-10 glass bg-rose-500/5 rounded-[3.5rem] border-rose-500/10 space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-[1.5rem] bg-slate-900 flex items-center justify-center border-2 border-rose-500/20 shadow-lg">
                                <ShieldAlert className="w-8 h-8 text-rose-500 fill-rose-500/20" />
                            </div>
                            <h4 className="text-2xl font-black text-white italic uppercase tracking-tight italic italic italic">Auto-Escalate (Negative)</h4>
                        </div>
                        <Toggle active={true} />
                    </div>
                    <p className="text-sm text-muted-foreground font-medium italic italic italic leading-relaxed px-2">
                        Reviews with <span className="text-white">urgency_score &gt; 6</span> are automatically synced to the Intelligence board and assigned to a manager.
                    </p>
                </div>
            </div>
        </div>
    );
}

function DangerZone() {
    const [executing, setExecuting] = useState<string | null>(null);

    const handleExecute = (label: string) => {
        if (window.confirm(`Are you absolutely sure you want to ${label}? This cannot be undone.`)) {
            setExecuting(label);
            setTimeout(() => {
                setExecuting(null);
                alert(`${label} successful.`);
            }, 2000);
        }
    };

    return (
        <div className="glass p-12 rounded-[4rem] border-rose-500/20 bg-rose-500/5 space-y-12 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-rose-500 italic uppercase tracking-tighter underline decoration-rose-500 underline-offset-8 italic italic italic">Danger zone</h3>
                <ShieldAlert className="w-8 h-8 text-rose-500 opacity-20" />
            </div>

            <div className="space-y-6">
                {[
                    { label: "Reset Demo Data", desc: "Flush the database and re-seed 150+ realistic reviews.", icon: RefreshCw },
                    { id: "del", label: "Delete Branch Data", desc: "Permanently remove all logs for a specific location.", icon: Trash2 },
                    { id: "deac", label: "Deactivate Suite", desc: "Shutdown all API bridges and archive business profile.", icon: Trash2 },
                ].map(item => (
                    <div key={item.label} className="flex items-center justify-between p-10 glass bg-white/5 rounded-[3rem] border-white/5 group hover:border-rose-500/30 transition-all">
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-slate-950 flex items-center justify-center border-2 border-rose-500/20 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all">
                                {executing === item.label ? <RotateCcw className="w-8 h-8 text-rose-500 animate-spin" /> : <item.icon className="w-8 h-8 text-rose-500" />}
                            </div>
                            <div>
                                <p className="text-xl font-black text-white uppercase italic tracking-tight italic italic italic">{item.label}</p>
                                <p className="text-[11px] font-medium text-rose-500/60 mt-1 italic italic italic italic">{item.desc}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleExecute(item.label)}
                            disabled={executing !== null}
                            className="px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-rose-500/20 active:scale-95 disabled:opacity-50"
                        >
                            {executing === item.label ? "Executing..." : "Execute"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Toggle({ active = false }: { active?: boolean }) {
    const [isOn, setIsOn] = useState(active);
    return (
        <button
            onClick={() => setIsOn(!isOn)}
            className={cn(
                "w-16 h-8 rounded-full p-1.5 transition-all shadow-inner",
                isOn ? "bg-indigo-600 shadow-indigo-500/20" : "bg-slate-800"
            )}
        >
            <div className={cn(
                "w-5 h-5 rounded-full bg-white transition-all transform shadow-lg",
                isOn ? "translate-x-8" : "translate-x-0"
            )} />
        </button>
    );
}
