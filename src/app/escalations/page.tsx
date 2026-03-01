"use client";

import {
    AlertTriangle,
    ChevronRight,
    MoreVertical,
    CheckCircle2,
    Search,
    Zap,
    MessageSquare,
    X,
    ArrowRightCircle,
    RotateCcw,
    Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";

const initialEscalations = [
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
    const [escalations, setEscalations] = useState(initialEscalations);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEsc, setSelectedEsc] = useState<any>(null);

    const updateStatus = (id: string, newStatus: string) => {
        setEscalations(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
        setSelectedEsc(null);
    };

    const filteredEscalations = escalations.filter(e =>
        e.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        { id: "PENDING", label: "Pending", color: "bg-rose-500" },
        { id: "IN_PROGRESS", label: "In Progress", color: "bg-amber-500" },
        { id: "RESOLVED", label: "Resolved", color: "bg-emerald-500" }
    ];

    return (
        <DashboardShell>
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                        <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em]">Critical Monitoring Active</p>
                    </motion.div>
                    <h2 className="text-3xl lg:text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Escalations</h2>
                    <p className="text-muted-foreground text-sm lg:text-base font-medium italic mt-2">Manage high-urgency operational breaches.</p>
                </div>

                <div className="w-full lg:w-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="glass bg-white/5 border-white/5 pl-12 pr-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white outline-none focus:ring-2 focus:ring-indigo-500/20 w-full lg:w-64 placeholder:text-white/20"
                            placeholder="Search Intel..."
                        />
                    </div>
                </div>
            </div>

            {/* Board View - Scrollable on mobile */}
            <div className="flex flex-col xl:flex-row gap-8 pb-10 items-start overflow-x-auto no-scrollbar">
                {columns.map(col => (
                    <div key={col.id} className="w-full xl:w-1/3 min-w-[320px] space-y-6 shrink-0">
                        <div className="flex items-center justify-between px-6 mb-4">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3">
                                <div className={cn("w-2 h-2 rounded-full", col.color)} />
                                {col.label} <span className="text-muted-foreground ml-2 opacity-40">({filteredEscalations.filter(e => e.status === col.id).length})</span>
                            </h3>
                            <button className="p-2 hover:bg-white/5 rounded-full transition-all">
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {filteredEscalations.filter(e => e.status === col.id).map((esc) => (
                                <EscalationCard key={esc.id} esc={esc} onAction={() => setSelectedEsc(esc)} />
                            ))}

                            {col.id === "PENDING" && (
                                <button className="w-full py-10 border-2 border-dashed border-white/5 rounded-[2.5rem] text-[10px] font-black text-muted-foreground uppercase tracking-widest hover:bg-white/5 hover:border-white/10 transition-all group flex flex-col items-center gap-3 italic">
                                    <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                                    Drag Intel Here
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Status Update Modal */}
            <AnimatePresence>
                {selectedEsc && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEsc(null)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative glass w-full max-w-lg rounded-[2.5rem] lg:rounded-[3.5rem] border-white/10 shadow-2xl overflow-hidden font-bold italic"
                        >
                            <div className="p-6 lg:p-8 border-b border-white/5 space-y-4 font-black">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Update Status</h3>
                                    <button onClick={() => setSelectedEsc(null)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                                        <X className="w-5 h-5 text-muted-foreground" />
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground font-medium italic">Shifting {selectedEsc.id} - {selectedEsc.branch}</p>
                            </div>

                            <div className="p-6 lg:p-8 space-y-3">
                                {columns.map(col => (
                                    <button
                                        key={col.id}
                                        onClick={() => updateStatus(selectedEsc.id, col.id)}
                                        className={cn(
                                            "w-full p-6 rounded-2xl flex items-center justify-between transition-all group",
                                            selectedEsc.status === col.id ? "bg-indigo-600 text-white" : "glass bg-white/5 text-white/70 hover:bg-white/10"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-2 h-2 rounded-full", col.color)} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{col.label}</span>
                                        </div>
                                        {selectedEsc.status === col.id ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRightCircle className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardShell>
    );
}

function EscalationCard({ esc, onAction }: { esc: any, onAction: () => void }) {
    return (
        <motion.div
            layoutId={esc.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            onClick={onAction}
            className={cn(
                "glass p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border-white/5 relative overflow-hidden group cursor-pointer transition-all min-h-[250px]",
                esc.priority === "CRITICAL" ? "shadow-[0_10px_40px_rgba(244,63,94,0.15)] border-rose-500/20" : "hover:border-indigo-500/20"
            )}
        >
            {esc.priority === "CRITICAL" && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[40px] -mr-16 -mt-16 animate-pulse" />
            )}

            <div className="flex justify-between items-start mb-6 italic font-black">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-white/5">
                        <Zap className={cn("w-4 h-4", esc.source === "SWIGGY" ? "text-orange-500" : "text-indigo-400")} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-tight italic">{esc.branch}</p>
                        <p className="text-[8px] font-bold text-muted-foreground uppercase">{esc.source}</p>
                    </div>
                </div>
                <div className={cn(
                    "px-3 py-1.5 rounded-xl text-[8px] lg:text-[9px] font-black tracking-widest uppercase italic",
                    esc.priority === "CRITICAL" ? "bg-rose-500 text-white shadow-lg" : "bg-white/10 text-muted-foreground"
                )}>
                    {esc.priority}
                </div>
            </div>

            <p className="text-[14px] text-white/80 font-medium italic leading-relaxed mb-6 group-hover:text-white transition-colors truncate lg:whitespace-normal">
                "{esc.content}"
            </p>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-[10px] font-black text-white border border-white/10 uppercase italic">
                        {esc.customer[0]}
                    </div>
                    <div className="max-w-[80px] truncate">
                        <p className="text-[9px] font-black text-white uppercase italic tracking-tighter truncate">{esc.customer}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-rose-500 uppercase tracking-tighter italic">
                        ⚡ {esc.urgency}/10
                    </div>
                    <div className="w-12 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${esc.urgency * 10}%` }}
                            className="h-full bg-rose-500"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[8px] font-black uppercase tracking-widest">{esc.time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="glass bg-white/5 p-2 rounded-lg border-white/5 hover:bg-white/10 transition-all shrink-0">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                    <button className="glass bg-white/10 p-2 rounded-lg border-white/10 hover:bg-emerald-500/20 transition-all shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
