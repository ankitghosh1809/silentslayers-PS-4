"use client";

import { useState, useEffect } from "react";
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

const reviewsData = [
    {
        id: "rev-1",
        customer: "Sarah Johnson",
        rating: 5,
        content: "Absolutely loved the Downtown Branch! The spicy pasta was incredible and the service was lightning fast.",
        sentiment: "POSITIVE",
        status: "RESPONDED",
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
        status: "PENDING",
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
        status: "PENDING",
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
        status: "RESPONDED",
        categories: ["service", "technology"],
        source: "DINE_IN_QR",
        branch: "Westside",
        time: "1d ago",
        staff: "Floor Supervisor"
    }
];

import { AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Wand2, CheckCircle } from "lucide-react";

export default function ReviewsPage() {
    const [activeFilter, setActiveFilter] = useState("All Reviews");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedReview, setSelectedReview] = useState<any>(null);
    const [draftText, setDraftText] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const filteredReviews = reviewsData.filter(rev => {
        const matchesSearch = rev.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rev.customer.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeFilter === "All Reviews") return matchesSearch;
        if (activeFilter === "Pending Response") return matchesSearch && rev.status === "PENDING";
        if (activeFilter === "Critical") return matchesSearch && (rev.sentiment === "NEGATIVE" || rev.rating <= 2);
        if (activeFilter === "Positive") return matchesSearch && rev.sentiment === "POSITIVE";
        if (activeFilter === "Neutral") return matchesSearch && rev.sentiment === "NEUTRAL";
        if (activeFilter === "Negative") return matchesSearch && rev.sentiment === "NEGATIVE";

        return matchesSearch;
    });

    const handleDraftAction = (rev: any) => {
        setSelectedReview(rev);
        setIsGenerating(true);
        // Simulate AI Geneation
        setTimeout(() => {
            const response = rev.sentiment === "POSITIVE"
                ? `Hi ${rev.customer.split(' ')[0]}, thank you so much for the kind words! We're thrilled you enjoyed your time at ${rev.branch}. We'll pass your praise to ${rev.staff}!`
                : `Dear ${rev.customer.split(' ')[0]}, we sincerely apologize for the experience at ${rev.branch}. This is not our standard. Our manager will reach out to you directly to resolve this.`;
            setDraftText(response);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="flex gap-6 min-h-[calc(100vh-2rem)] bg-slate-950 p-4">
            <Sidebar />

            <AnimatePresence>
                {selectedReview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="glass max-w-3xl w-full rounded-[3.5rem] border-white/10 shadow-2xl overflow-hidden"
                        >
                            <div className="p-10 border-b border-white/5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-500/20 rounded-xl">
                                            <Wand2 className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter italic italic">AI Response Architect</h3>
                                    </div>
                                    <button onClick={() => setSelectedReview(null)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                                        <X className="w-6 h-6 text-muted-foreground" />
                                    </button>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border-white/5 italic text-sm text-white/60 leading-relaxed">
                                    "{selectedReview.content}"
                                </div>
                            </div>

                            <div className="p-10 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">AI Generated Draft</label>
                                        {isGenerating && <span className="text-[9px] font-bold text-white/40 uppercase tracking-tighter animate-pulse">Brain Engine working...</span>}
                                    </div>
                                    <textarea
                                        value={draftText}
                                        onChange={(e) => setDraftText(e.target.value)}
                                        className="w-full bg-slate-900 border border-white/10 rounded-3xl p-8 text-white text-lg font-medium italic min-h-[180px] outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all no-scrollbar"
                                        placeholder="Drafting brilliance..."
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleDraftAction(selectedReview)}
                                        className="flex-1 glass bg-white/5 border-white/10 text-white py-4 rounded-[2rem] font-black uppercase italic tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                    >
                                        <Sparkles className="w-4 h-4 text-indigo-400" />
                                        Re-Generate
                                    </button>
                                    <button
                                        onClick={() => {
                                            alert("Response deployed successfully!");
                                            setSelectedReview(null);
                                        }}
                                        className="flex-[2] bg-white text-slate-950 py-4 rounded-[2rem] font-black uppercase italic tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-white/5"
                                    >
                                        <Send className="w-4 h-4" />
                                        Deploy Response
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 space-y-8 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 custom-scrollbar pb-20 no-scrollbar">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Review Feed</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">Centralized stream of sentiment from all connected platforms.</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="glass bg-white/5 border-white/5 pl-12 pr-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white outline-none focus:ring-2 focus:ring-indigo-500/20 w-64 placeholder:text-white/20"
                                placeholder="Search Intel..."
                            />
                        </div>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {["All Reviews", "Pending Response", "Critical", "Positive", "Neutral", "Negative"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={cn(
                                "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                                activeFilter === cat ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" : "glass bg-white/5 text-muted-foreground hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {filteredReviews.length > 0 ? filteredReviews.map((rev, i) => (
                        <motion.div
                            key={rev.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-10 rounded-[3rem] border-white/5 group hover:border-indigo-500/20 transition-all relative overflow-hidden"
                        >
                            {/* Source Badge */}
                            <div className="absolute top-0 right-0 p-8 flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2 glass bg-white/5 px-4 py-2 rounded-xl border-white/5">
                                    <Zap className={cn("w-4 h-4", rev.source === "ZOMATO" ? "text-rose-500" : "text-indigo-400")} />
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{rev.source}</span>
                                </div>
                                {rev.status === "RESPONDED" && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full">
                                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                                        <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Responded</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-8">
                                {/* Left Persona */}
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 border-2 border-white/5 flex items-center justify-center text-xl font-black text-white uppercase italic shadow-lg">
                                        {rev.customer[0]}
                                    </div>
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter",
                                        rev.sentiment === "POSITIVE" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
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
                                                <Building2 className="w-3 h-3 inline mr-1 text-indigo-400" /> {rev.branch} Branch
                                            </p>
                                        </div>
                                        <div className="flex gap-1 text-yellow-500">
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} className={cn("w-5 h-5 fill-current", j < rev.rating ? "text-yellow-400" : "text-white/5")} />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-lg text-white/90 font-medium italic leading-relaxed max-w-3xl">
                                        "{rev.content}"
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {rev.categories.map(cat => (
                                            <span key={cat} className="px-4 py-1.5 glass bg-indigo-500/10 rounded-xl text-[9px] font-black text-indigo-400 uppercase tracking-widest border border-indigo-500/10 active:scale-95 transition-all cursor-pointer hover:bg-indigo-500/20">
                                                #{cat}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex gap-8">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span className="text-[9px] font-black uppercase tracking-widest">{rev.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Users className="w-3.5 h-3.5" />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Staff: {rev.staff}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="glass bg-white/5 border-white/5 px-6 py-3 rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest hover:bg-indigo-500/10 hover:text-indigo-400 transition-all flex items-center gap-2">
                                                <Globe className="w-4 h-4" /> AI Translate
                                            </button>
                                            <button
                                                onClick={() => handleDraftAction(rev)}
                                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-widest transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2 group"
                                            >
                                                <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                                Draft Response
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="glass p-20 rounded-[3rem] text-center space-y-4">
                            <p className="text-xl font-black text-white uppercase italic tracking-widest">No matching intel found</p>
                            <p className="text-xs text-muted-foreground font-medium italic italic">Refine your search or filter to see more results.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
