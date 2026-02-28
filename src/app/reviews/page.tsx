"use client";

import { Sidebar } from "@/components/sidebar";
import {
    Star,
    Search,
    Filter,
    MoreHorizontal,
    MessageSquare,
    Clock,
    Globe,
    CheckCircle2,
    XCircle,
    Zap,
    Building2,
    Users
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const reviews = [
    {
        id: "rev-1",
        customer: "Sarah Johnson",
        rating: 5,
        content: "Absolutely loved the Downtown Branch! The spicy pasta was incredible and the service was lightning fast.",
        sentiment: "POSITIVE",
        categories: ["food", "service"],
        source: "GOOGLE",
        branch: "Downtown",
        time: "2h ago",
        staff: "Waiter Tom"
    },
    {
        id: "rev-2",
        customer: "Michael Chen",
        rating: 2,
        content: "Midtown Express was a disappointment today. Floor was dirty and my Zomato order took forever.",
        sentiment: "NEGATIVE",
        categories: ["hygiene", "delivery"],
        source: "ZOMATO",
        branch: "Midtown",
        time: "4h ago",
        staff: "Unassigned"
    },
    {
        id: "rev-3",
        customer: "Elena Gomez",
        rating: 4,
        content: "Harbor Grill has the best view in the city. Food is good, but prices are a bit on the higher side.",
        sentiment: "POSITIVE",
        categories: ["ambience", "pricing"],
        source: "INTERNAL",
        branch: "Harbor",
        time: "6h ago",
        staff: "Chef Mario"
    },
    {
        id: "rev-4",
        customer: "David Smith",
        rating: 5,
        content: "The dine-in QR system is so convenient! No waiting around for the bill. Great job Westside Hub.",
        sentiment: "POSITIVE",
        categories: ["service", "technology"],
        source: "DINE_IN_QR",
        branch: "Westside",
        time: "1d ago",
        staff: "Floor Supervisor"
    }
];

export default function ReviewsPage() {
    return (
        <div className="flex gap-6 min-h-[calc(100vh-2rem)] bg-slate-950 p-4">
            <Sidebar />

            <div className="flex-1 space-y-8 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 custom-scrollbar pb-20">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Review Feed</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">Centralized stream of sentiment from all connected platforms.</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                className="glass bg-white/5 border-white/5 pl-10 pr-4 py-3 rounded-2xl text-xs font-bold text-white outline-none focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="Search content..."
                            />
                        </div>
                        <button className="glass px-6 py-3 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {["All Reviews", "Pending Response", "Critical", "Positive", "Neutral", "Negative"].map((cat, i) => (
                        <button
                            key={cat}
                            className={cn(
                                "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                                i === 0 ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" : "glass bg-white/5 text-muted-foreground hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.map((rev, i) => (
                        <motion.div
                            key={rev.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-10 rounded-[3rem] border-white/5 group hover:border-indigo-500/20 transition-all relative overflow-hidden"
                        >
                            {/* Source Badge */}
                            <div className="absolute top-0 right-0 p-8">
                                <div className="flex items-center gap-2 glass bg-white/5 px-4 py-2 rounded-xl border-white/5">
                                    <Zap className={cn("w-4 h-4", rev.source === "ZOMATO" ? "text-rose-500" : "text-indigo-400")} />
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{rev.source}</span>
                                </div>
                            </div>

                            <div className="flex gap-8">
                                {/* Left Persona */}
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 border-2 border-white/5 flex items-center justify-center text-xl font-black text-white uppercase italic">
                                        {rev.customer[0]}
                                    </div>
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter",
                                        rev.sentiment === "POSITIVE" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                                    )}>
                                        {rev.sentiment}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-black text-white italic tracking-tight">{rev.customer}</h3>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                                                <Building2 className="w-3 h-3 inline mr-1" /> {rev.branch} Branch
                                            </p>
                                        </div>
                                        <div className="flex gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} className={cn("w-5 h-5 fill-current", j < rev.rating ? "text-yellow-400" : "text-white/10")} />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-lg text-white/90 font-medium italic leading-relaxed max-w-3xl">
                                        "{rev.content}"
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {rev.categories.map(cat => (
                                            <span key={cat} className="px-4 py-1.5 glass bg-indigo-500/10 rounded-xl text-[9px] font-black text-indigo-400 uppercase tracking-widest border border-indigo-500/10 active:scale-95 transition-all cursor-pointer">
                                                #{cat}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex gap-8">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase">{rev.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Users className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase">Staff: {rev.staff}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="glass bg-white/5 border-white/5 px-6 py-3 rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest hover:bg-indigo-500/10 hover:text-indigo-400 transition-all flex items-center gap-2">
                                                <Globe className="w-4 h-4" /> AI Translate
                                            </button>
                                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-widest transition-all shadow-xl shadow-indigo-500/20">
                                                Draft Response
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
