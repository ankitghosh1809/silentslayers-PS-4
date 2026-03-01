"use client";

import { useState } from "react";
import {
    Star,
    Search,
    MessageSquare,
    Clock,
    Globe,
    CheckCircle,
    Zap,
    Building2,
    Users,
    X,
    Send,
    Sparkles,
    Wand2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard-shell";

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
        // Simulate AI Generation
        setTimeout(() => {
            const response = rev.sentiment === "POSITIVE"
                ? `Hi ${rev.customer.split(' ')[0]}, thank you so much for the kind words! We're thrilled you enjoyed your time at ${rev.branch}. We'll pass your praise to ${rev.staff}!`
                : `Dear ${rev.customer.split(' ')[0]}, we sincerely apologize for the experience at ${rev.branch}. This is not our standard. Our manager will reach out to you directly to resolve this.`;
            setDraftText(response);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <DashboardShell>
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0">
                <div>
                    <h2 className="text-3xl lg:text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Reviews</h2>
                    <p className="text-muted-foreground text-sm lg:text-base font-medium italic mt-2">Centralized sentiment stream from all platforms.</p>
                </div>

                <div className="w-full lg:w-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground mr-1" />
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
                {filteredReviews.length > 0 && filteredReviews.map((rev, i) => (
                    <motion.div
                        key={rev.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border-white/5 group hover:border-indigo-500/20 transition-all relative overflow-hidden"
                    >
                        {/* Source Badge */}
                        <div className="flex lg:absolute top-0 right-0 lg:p-8 flex-col items-start lg:items-end gap-2 mb-4 lg:mb-0">
                            <div className="flex items-center gap-2 glass bg-white/5 px-4 py-2 rounded-xl border-white/5 w-fit">
                                <Zap className={cn("w-4 h-4", rev.source === "ZOMATO" ? "text-rose-500" : "text-indigo-400")} />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{rev.source}</span>
                            </div>
                            {rev.status === "RESPONDED" && (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full w-fit">
                                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Responded</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                            {/* Persona */}
                            <div className="flex flex-row sm:flex-col items-center gap-4">
                                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-[1.2rem] lg:rounded-[1.5rem] bg-slate-900 border-2 border-white/5 flex items-center justify-center text-lg lg:text-xl font-black text-white uppercase italic shadow-lg shrink-0">
                                    {rev.customer[0]}
                                </div>
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-tighter w-fit",
                                    rev.sentiment === "POSITIVE" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                                )}>
                                    {rev.sentiment}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-4 lg:space-y-6">
                                <div className="flex flex-col lg:flex-row justify-between items-start gap-2 lg:gap-0">
                                    <div>
                                        <h3 className="text-xl font-black text-white italic tracking-tight">{rev.customer}</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                                            <Building2 className="w-3 h-3 inline mr-1 text-indigo-400" /> {rev.branch} Branch
                                        </p>
                                    </div>
                                    <div className="flex gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} className={cn("w-4 h-4 lg:w-5 lg:h-5 fill-current", j < rev.rating ? "text-yellow-400" : "text-white/5")} />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-base lg:text-lg text-white/90 font-medium italic leading-relaxed max-w-3xl">
                                    "{rev.content}"
                                </p>

                                <div className="flex flex-wrap gap-2 lg:gap-3">
                                    {rev.categories.map(cat => (
                                        <span key={cat} className="px-3 lg:px-4 py-1.5 glass bg-indigo-500/10 rounded-xl text-[8px] lg:text-[9px] font-black text-indigo-400 uppercase tracking-widest border border-indigo-500/10 active:scale-95 transition-all cursor-pointer hover:bg-indigo-500/20">
                                            #{cat}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-6 lg:pt-8 border-t border-white/5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-0">
                                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 w-full lg:w-auto">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">{rev.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Users className="w-3.5 h-3.5" />
                                            <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Staff: {rev.staff}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full lg:w-auto">
                                        <button className="glass bg-white/5 border-white/5 px-6 py-3 rounded-2xl text-[9px] font-black text-white uppercase italic tracking-widest hover:bg-indigo-500/10 hover:text-indigo-400 transition-all flex items-center justify-center gap-2 shrink-0">
                                            <Globe className="w-4 h-4" /> AI Translate
                                        </button>
                                        <button
                                            onClick={() => handleDraftAction(rev)}
                                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 lg:px-10 py-3 rounded-2xl text-[9px] font-black uppercase italic tracking-widest transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group shrink-0"
                                        >
                                            <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                            Draft Response
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* AI Response Architect Modal */}
            <AnimatePresence>
                {selectedReview && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedReview(null)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative glass w-full max-w-3xl rounded-[2.5rem] lg:rounded-[3.5rem] border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="p-6 lg:p-10 border-b border-white/5 space-y-4 shrink-0 font-bold italic">
                                <div className="flex justify-between items-center italic font-black">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-500/20 rounded-xl">
                                            <Wand2 className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-black text-white italic uppercase tracking-tighter">AI Architect</h3>
                                    </div>
                                    <button onClick={() => setSelectedReview(null)} className="p-2 lg:p-3 hover:bg-white/5 rounded-full transition-all">
                                        <X className="w-6 h-6 text-muted-foreground mr-1" />
                                    </button>
                                </div>
                                <div className="bg-white/5 p-4 lg:p-6 rounded-2xl border-white/5 text-xs lg:text-sm text-white/60 leading-relaxed italic truncate lg:whitespace-normal">
                                    "{selectedReview.content}"
                                </div>
                            </div>

                            <div className="p-6 lg:p-10 space-y-6 lg:space-y-8 overflow-y-auto no-scrollbar">
                                <div className="space-y-4 font-bold italic">
                                    <div className="flex justify-between items-center italic font-black">
                                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">AI Draft</label>
                                        {isGenerating && <span className="text-[9px] font-bold text-white/40 uppercase tracking-tighter animate-pulse">Brain Engine...</span>}
                                    </div>
                                    <textarea
                                        value={draftText}
                                        onChange={(e) => setDraftText(e.target.value)}
                                        className="w-full bg-slate-900 border border-white/10 rounded-3xl p-6 lg:p-8 text-white text-base lg:text-lg font-medium italic min-h-[150px] lg:min-h-[180px] outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all no-scrollbar"
                                        placeholder="Drafting brilliance..."
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pb-4">
                                    <button
                                        onClick={() => handleDraftAction(selectedReview)}
                                        className="w-full sm:flex-1 glass bg-white/5 border-white/10 text-white py-4 rounded-3xl lg:rounded-[2rem] font-black uppercase italic tracking-widest text-[9px] lg:text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                    >
                                        <Sparkles className="w-4 h-4 text-indigo-400" />
                                        Re-Generate
                                    </button>
                                    <button
                                        onClick={() => {
                                            alert("Response deployed successfully!");
                                            setSelectedReview(null);
                                        }}
                                        className="w-full sm:flex-[2] bg-white text-slate-950 py-4 rounded-3xl lg:rounded-[2rem] font-black uppercase italic tracking-widest text-[9px] lg:text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
                                    >
                                        <Send className="w-4 h-4" />
                                        Deploy Response
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardShell>
    );
}
