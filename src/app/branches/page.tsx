"use client";

import { Sidebar } from "@/components/sidebar";
import {
    Building2,
    MapPin,
    Users,
    Star,
    TrendingUp,
    Zap,
    QrCode,
    ChevronRight,
    MoreVertical,
    Plus,
    Globe,
    Smartphone
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const branches = [
    { id: "br-1", name: "Downtown Branch", location: "Downtown Street, City Center", staff: 8, rating: 4.8, sentiment: 92, status: "PEAK", activeReviews: 14 },
    { id: "br-2", name: "Harbor Grill", location: "Marine Drive, Bay Area", staff: 6, rating: 4.6, sentiment: 88, status: "OPEN", activeReviews: 8 },
    { id: "br-3", name: "Westside Hub", location: "West Boulevard, Uptown", staff: 7, rating: 4.5, sentiment: 85, status: "BUSY", activeReviews: 11 },
    { id: "br-4", name: "Midtown Express", location: "Central Avenue, Midtown", staff: 5, rating: 4.2, sentiment: 76, status: "CRITICAL", activeReviews: 24 },
    { id: "br-5", name: "Riverside Dine", location: "River Bank, South End", staff: 6, rating: 4.4, sentiment: 82, status: "OPEN", activeReviews: 5 }
];

export default function BranchesPage() {
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
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Cloud Cluster Synced</p>
                        </motion.div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Entity Management</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">Oversee multi-branch health, staff allocation, and local reputation.</p>
                    </div>

                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-widest transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Branch
                    </button>
                </div>

                {/* Branch Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {branches.map((branch, i) => (
                        <motion.div
                            key={branch.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass p-10 rounded-[3.5rem] border-white/5 relative overflow-hidden group hover:border-indigo-500/20 transition-all flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                    <Building2 className="w-8 h-8 text-indigo-400" />
                                </div>
                                <div className={cn(
                                    "px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase italic",
                                    branch.status === "CRITICAL" ? "bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.3)]" :
                                        branch.status === "PEAK" ? "bg-amber-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.3)]" :
                                            "bg-emerald-500/10 text-emerald-500"
                                )}>
                                    {branch.status}
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2 group-hover:text-indigo-400 transition-colors">{branch.name}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground mb-8">
                                <MapPin className="w-3.5 h-3.5" />
                                <p className="text-[10px] font-bold uppercase italic">{branch.location}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 flex-1">
                                <div className="glass bg-white/5 p-5 rounded-2xl border-white/5">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Sentiment</p>
                                    <p className="text-xl font-black text-white tracking-tight italic">{branch.sentiment}%</p>
                                </div>
                                <div className="glass bg-white/5 p-5 rounded-2xl border-white/5">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Overall Rating</p>
                                    <p className="text-xl font-black text-white tracking-tight italic">{branch.rating}<span className="text-xs text-indigo-400 ml-1">★</span></p>
                                </div>
                                <div className="glass bg-white/5 p-5 rounded-2xl border-white/5">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Staff Count</p>
                                    <p className="text-xl font-black text-white tracking-tight italic">{branch.staff}</p>
                                </div>
                                <div className="glass bg-white/5 p-5 rounded-2xl border-white/5">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Active Leads</p>
                                    <p className="text-xl font-black text-white tracking-tight italic">+{branch.activeReviews}</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 flex gap-3">
                                <button className="flex-1 glass bg-white/5 text-[9px] font-black text-white uppercase italic tracking-widest py-3 rounded-xl hover:bg-indigo-600 transition-all border-white/5">
                                    Full Analytics
                                </button>
                                <button className="w-12 h-12 glass bg-white/5 rounded-xl flex items-center justify-center border-white/5 hover:border-indigo-500/30 transition-all">
                                    <QrCode className="w-5 h-5 text-indigo-400" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
