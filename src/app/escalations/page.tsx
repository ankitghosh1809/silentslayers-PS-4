"use client";

import { Sidebar } from "@/components/sidebar";
import {
    AlertTriangle,
    ChevronRight,
    MoreVertical,
    User,
    Clock,
    CheckCircle2,
    Filter,
    Search,
    Zap,
    MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const escalations = [
    {
        id: "esc-1",
        branch: "Midtown Express",
        customer: "James Wilson",
        content: "Wait time was over 45 minutes for a salad. This is unacceptable for a quick-dine spot.",
        urgency: 9,
        priority: "CRITICAL",
        status: "PENDING",
        time: "12m ago",
        staff: "Waitstaff Team",
        source: "SWIGGY"
    },
    {
        id: "esc-2",
        branch: "Harbor Grill",
        customer: "Elena Rossi",
        content: "Found hair in my food, manager didn't care when I pointed it out. Complete lack of hygiene.",
        urgency: 8,
        priority: "HIGH",
        status: "IN_PROGRESS",
        time: "45m ago",
        staff: "Staff 3 (Harbor Grill)",
        source: "GOOGLE"
    },
    {
        id: "esc-3",
        branch: "Downtown Branch",
        customer: "Anonymous",
        content: "Server was rude and overcharged us by $15 on our bill.",
        urgency: 7,
        priority: "HIGH",
        status: "RESOLVED",
        time: "2h ago",
        staff: "Staff 1 (Downtown)",
        source: "ZOMATO"
    }
];

export default function EscalationsPage() {
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
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em]">Critical Monitoring Active</p>
                        </motion.div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Smart Escalations</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">Manage high-urgency reviews and operational breaches.</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                className="glass bg-white/5 border-white/5 pl-10 pr-4 py-3 rounded-2xl text-xs font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="Search ID/Branch..."
                            />
                        </div>
                        <button className="glass px-4 py-3 rounded-2xl text-muted-foreground hover:text-white transition-all">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Board View */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
                    {/* Column: Pending */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-4 mb-4">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                Pending <span className="text-muted-foreground ml-2">({escalations.filter(e => e.status === "PENDING").length})</span>
                            </h3>
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </div>

                        {escalations.filter(e => e.status === "PENDING").map((esc) => (
                            <EscalationCard key={esc.id} esc={esc} />
                        ))}

                        <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-[2rem] text-[10px] font-black text-muted-foreground uppercase tracking-widest hover:bg-white/5 transition-all">
                            Drag Review Here to Escalate
                        </button>
                    </div>

                    {/* Column: In Progress */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-4 mb-4">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                In Progress <span className="text-muted-foreground ml-2">({escalations.filter(e => e.status === "IN_PROGRESS").length})</span>
                            </h3>
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {escalations.filter(e => e.status === "IN_PROGRESS").map((esc) => (
                            <EscalationCard key={esc.id} esc={esc} />
                        ))}
                    </div>

                    {/* Column: Resolved */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-4 mb-4">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Resolved <span className="text-muted-foreground ml-2">({escalations.filter(e => e.status === "RESOLVED").length})</span>
                            </h3>
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {escalations.filter(e => e.status === "RESOLVED").map((esc) => (
                            <EscalationCard key={esc.id} esc={esc} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function EscalationCard({ esc }: { esc: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className={cn(
                "glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group cursor-pointer transition-all",
                esc.priority === "CRITICAL" ? "shadow-[0_0_30px_rgba(244,63,94,0.15)] border-rose-500/20" : ""
            )}
        >
            {esc.priority === "CRITICAL" && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[40px] -mr-16 -mt-16 animate-pulse" />
            )}

            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-xl">
                        <Zap className={cn("w-4 h-4", esc.source === "SWIGGY" ? "text-orange-500" : "text-indigo-400")} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-tight">{esc.branch}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">{esc.source}</p>
                    </div>
                </div>
                <div className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase italic",
                    esc.priority === "CRITICAL" ? "bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "bg-amber-500/20 text-amber-500"
                )}>
                    {esc.priority}
                </div>
            </div>

            <p className="text-sm text-white/90 font-medium italic leading-relaxed mb-6 group-hover:text-white transition-colors">
                "{esc.content}"
            </p>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-black text-white border border-white/10 uppercase italic">
                        {esc.customer[0]}
                    </div>
                    <p className="text-[10px] font-black text-white/50 uppercase italic tracking-tighter">{esc.customer}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-500 uppercase tracking-tighter italic">
                    <span className="text-[14px]">⚡</span> {esc.urgency}/10 Urgency
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{esc.time}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="glass bg-white/5 items-center justify-center p-2 rounded-xl border-white/5 hover:border-indigo-500/50 transition-all">
                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                    </button>
                    <button className="glass bg-white/5 items-center justify-center p-2 rounded-xl border-white/5 hover:border-emerald-500/50 transition-all">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </button>
                </div>
            </div>

            {/* Internal Note Mock */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-900 shadow-inner border border-white/5 hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-2">
                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Internal Note</p>
                <p className="text-[11px] text-muted-foreground font-medium italic italic italic">
                    Manager: "Assigning to Floor Supervisor for validation. Will call customer by 5PM."
                </p>
            </div>
        </motion.div>
    );
}
