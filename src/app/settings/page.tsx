"use client";

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
    Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("notifications");

    return (
        <DashboardShell>
            {/* Header */}
            <div>
                <h2 className="text-3xl lg:text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Settings</h2>
                <p className="text-muted-foreground text-sm lg:text-base font-medium italic mt-2">Global configuration and automation tuning.</p>
            </div>

            {/* Tab Switcher - Scrollable on mobile */}
            <div className="flex gap-2 lg:gap-4 p-2 glass bg-white/5 rounded-2xl lg:rounded-[2rem] border-white/5 overflow-x-auto no-scrollbar w-full sm:w-fit">
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
                            "flex items-center gap-2 lg:gap-3 px-4 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                            activeTab === tab.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        <tab.icon className="w-3.5 h-3.5 lg:w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                {/* Main Config Column */}
                <div className="lg:col-span-2 space-y-8">
                    {activeTab === "notifications" && <NotificationSettings />}
                    {activeTab === "automation" && <AutomationSettings />}
                    {activeTab === "security" && (
                        <div className="glass p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border-white/5 min-h-[300px] lg:min-h-[400px] flex items-center justify-center text-center">
                            <div>
                                <Shield className="w-12 h-12 lg:w-16 lg:h-16 text-indigo-400 mx-auto mb-6 opacity-20" />
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">Role Access</h3>
                                <p className="text-[10px] lg:text-[10.5px] text-muted-foreground font-medium italic">Configure manager permissions and branch restrictions.</p>
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
                    <div className="glass p-8 lg:p-10 rounded-[3rem] lg:rounded-[4rem] border-white/5 bg-gradient-to-b from-indigo-500/10 to-transparent italic font-bold">
                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-10 underline decoration-indigo-500 underline-offset-8">Subscription</h3>
                        <div className="text-center">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-slate-900 border-2 border-indigo-500/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                                <Zap className="w-10 h-10 lg:w-12 lg:h-12 text-indigo-400 fill-indigo-400/20" />
                            </div>
                            <h4 className="text-xl lg:text-2xl font-black text-white italic uppercase tracking-tighter">Enterprise Elite</h4>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-2">Active until Feb 2027</p>
                        </div>
                        <div className="mt-12 space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                <span>Branches</span>
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

                    <div className="glass p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3.5rem] border-white/5 bg-slate-900/40 italic font-bold">
                        <div className="flex items-center gap-4 mb-6">
                            <Database className="w-5 h-5 text-indigo-400" />
                            <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Data Governance</h3>
                        </div>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed italic">
                            ReviewFlow AI is GDPR & CCPA compliant. Regional processing clusters active.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}

function NotificationSettings() {
    return (
        <div className="glass p-6 lg:p-12 rounded-[2.5rem] lg:rounded-[4rem] border-white/5 space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-2 italic font-bold">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter underline decoration-indigo-500 underline-offset-8">Preferences</h3>
                <Bell className="w-8 h-8 text-indigo-400 opacity-20" />
            </div>

            <div className="space-y-4 lg:space-y-6">
                {[
                    { id: "email_all", label: "Email Digest", sub: "Daily summary of all scores.", icon: Mail },
                    { id: "sms_critical", label: "WhatsApp Alerts", sub: "Instant routing for urgency > 8.", icon: Smartphone },
                    { id: "sla_breach", label: "SLA Alerts", sub: "Notify when reviews exceed 6h.", icon: Clock },
                    { id: "weekly_report", label: "Weekly Summary", sub: "Deep-dive branch PDF reports.", icon: Globe },
                ].map(item => (
                    <div key={item.id} className="flex items-center justify-between p-6 lg:p-8 glass bg-white/3 rounded-[2rem] lg:rounded-[2.5rem] border-white/5 group hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4 lg:gap-8">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-[1.2rem] lg:rounded-[1.5rem] bg-slate-900 flex items-center justify-center border-2 border-white/5 group-hover:scale-105 transition-transform shadow-inner shrink-0">
                                <item.icon className="w-6 h-6 lg:w-7 lg:h-7 text-indigo-400" />
                            </div>
                            <div className="truncate">
                                <p className="text-lg lg:text-xl font-black text-white uppercase italic tracking-tight truncate">{item.label}</p>
                                <p className="text-[10px] lg:text-[11px] font-medium text-muted-foreground truncate">{item.sub}</p>
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
    "Professional": "We appreciate your valuable feedback regarding our service. Shared with management for review.",
    "Friendly": "Hey there! Thanks so much for stopping by. We're so glad you had a great time! Cheers!",
    "Premium Luxury": "It was our distinct pleasure to host you. Your refined feedback is invaluable to our pursuit of perfection."
};

function AutomationSettings() {
    const [selectedTone, setSelectedTone] = useState("Friendly");

    return (
        <div className="glass p-6 lg:p-12 rounded-[2.5rem] lg:rounded-[4rem] border-white/5 space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-2 italic font-bold">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter underline decoration-purple-500 underline-offset-8">AI Engine</h3>
                <Zap className="w-8 h-8 text-purple-400 opacity-20" />
            </div>

            <div className="space-y-6 lg:space-y-8">
                <div className="p-6 lg:p-10 glass bg-purple-500/5 rounded-[2.5rem] lg:rounded-[3.5rem] border-purple-500/10 space-y-8 lg:space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 lg:gap-6">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-[1.2rem] lg:rounded-[1.5rem] bg-slate-900 flex items-center justify-center border-2 border-purple-500/20 shadow-lg shrink-0">
                                <Star className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500 fill-yellow-500/20" />
                            </div>
                            <h4 className="text-xl lg:text-2xl font-black text-white italic uppercase tracking-tight">Auto-Respond</h4>
                        </div>
                        <Toggle active={true} />
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-purple-400 uppercase tracking-widest ml-1">Brand Tone</h5>
                        <div className="flex flex-col sm:flex-row gap-3">
                            {["Professional", "Friendly", "Premium"].map(tone => (
                                <button
                                    key={tone}
                                    onClick={() => setSelectedTone(tone.split(' ')[0])}
                                    className={cn(
                                        "flex-1 py-3 lg:py-4 px-4 lg:px-6 rounded-2xl text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all",
                                        (selectedTone === tone.split(' ')[0] || (selectedTone === 'Premium' && tone === 'Premium Luxury')) ? "bg-purple-600 text-white shadow-xl scale-105" : "glass bg-white/5 text-muted-foreground border-white/5 hover:text-white"
                                    )}
                                >
                                    {tone}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-purple-400 uppercase tracking-widest ml-1">Live Preview</h5>
                        <div className="p-6 lg:p-8 glass bg-black/40 rounded-[2rem] lg:rounded-[2.5rem] border-white/10 italic text-white/70 leading-relaxed font-medium text-sm relative group overflow-hidden">
                            <Sparkles className="absolute top-4 right-4 w-4 h-4 text-purple-400 opacity-20 group-hover:opacity-100 transition-all" />
                            <p>"{tonePreviews[selectedTone] || tonePreviews["Friendly"]}"</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 lg:p-10 glass bg-rose-500/5 rounded-[2.5rem] lg:rounded-[3.5rem] border-rose-500/10 space-y-6 lg:space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 lg:gap-6">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-[1.2rem] lg:rounded-[1.5rem] bg-slate-900 flex items-center justify-center border-2 border-rose-500/20 shadow-lg shrink-0">
                                <ShieldAlert className="w-6 h-6 lg:w-8 lg:h-8 text-rose-500 fill-rose-500/20" />
                            </div>
                            <h4 className="text-xl lg:text-2xl font-black text-white italic uppercase tracking-tight">Escalate</h4>
                        </div>
                        <Toggle active={true} />
                    </div>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                        Reviews with <span className="text-white">urgency &gt; 6</span> are automatically synced to managers.
                    </p>
                </div>
            </div>
        </div>
    );
}

function DangerZone() {
    const [executing, setExecuting] = useState<string | null>(null);

    const handleExecute = (label: string) => {
        if (window.confirm(`Are you absolutely sure you want to ${label}?`)) {
            setExecuting(label);
            setTimeout(() => {
                setExecuting(null);
                alert(`${label} successful.`);
            }, 2000);
        }
    };

    return (
        <div className="glass p-6 lg:p-12 rounded-[2.5rem] lg:rounded-[4rem] border-rose-500/20 bg-rose-500/5 space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-2 italic font-bold">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl lg:text-3xl font-black text-rose-500 italic uppercase tracking-tighter underline decoration-rose-500 underline-offset-8">Governance</h3>
                <ShieldAlert className="w-8 h-8 text-rose-500 opacity-20" />
            </div>

            <div className="space-y-4 lg:space-y-6">
                {[
                    { label: "Reset Demo", desc: "Flush and re-seed 150+ reviews.", icon: RefreshCw },
                    { label: "Delete Branch", desc: "Remove all logs for one location.", icon: Trash2 },
                ].map(item => (
                    <div key={item.label} className="flex flex-col sm:flex-row items-center justify-between p-6 lg:p-10 glass bg-white/5 rounded-[2rem] lg:rounded-[3rem] border-white/5 group hover:border-rose-500/30 transition-all gap-4">
                        <div className="flex items-center gap-4 lg:gap-8 w-full sm:w-auto">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-[1.2rem] lg:rounded-[1.5rem] bg-slate-950 flex items-center justify-center border-2 border-rose-500/20 shrink-0">
                                {executing === item.label ? <RotateCcw className="w-6 h-6 lg:w-8 lg:h-8 text-rose-500 animate-spin" /> : <item.icon className="w-6 h-6 lg:w-8 lg:h-8 text-rose-500" />}
                            </div>
                            <div className="truncate">
                                <p className="text-lg lg:text-xl font-black text-white uppercase italic tracking-tight truncate">{item.label}</p>
                                <p className="text-[10px] lg:text-[11px] font-medium text-rose-500/60 truncate">{item.desc}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleExecute(item.label)}
                            disabled={executing !== null}
                            className="w-full sm:w-auto px-6 lg:px-10 py-3 lg:py-4 bg-rose-600 hover:bg-rose-500 text-white text-[10px] lg:text-[11px] font-black uppercase tracking-widest rounded-xl lg:rounded-2xl transition-all shadow-xl disabled:opacity-50 shrink-0"
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
                "w-12 lg:w-16 h-6 lg:h-8 rounded-full p-1 lg:p-1.5 transition-all shadow-inner shrink-0",
                isOn ? "bg-indigo-600 shadow-indigo-500/20" : "bg-slate-800"
            )}
        >
            <div className={cn(
                "w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-white transition-all transform shadow-lg",
                isOn ? "translate-x-6 lg:translate-x-8" : "translate-x-0"
            )} />
        </button>
    );
}
