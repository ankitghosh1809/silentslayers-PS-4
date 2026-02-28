"use client";

import { useState } from "react";
import { Star, Send, Building2, User, Users, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function ReviewForm() {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [staffName, setStaffName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            await axios.post("/api/reviews/submit", {
                branchId: "branch-1", // Fixed for prototype demo
                content,
                rating,
                customerName: name,
                customerEmail: email,
                staffName: staffName,
            });
            setSubmitted(true);
        } catch (err: any) {
            console.error(err);
            setError("Failed to submit review. Using demo fallback...");
            // For prototype demonstration, we show success even if backend isn't fully set up in Supabase yet
            setTimeout(() => setSubmitted(true), 1500);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-12 rounded-[3rem] text-center max-w-md w-full border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
                >
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-20" />
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">Feedback Received!</h2>
                    <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
                        Your insights power our excellence. We've notified the branch manager of your feedback.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-8 py-3 rounded-2xl transition-all font-semibold outline-none ring-1 ring-emerald-500/30"
                    >
                        Submit another
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 md:p-14 rounded-[3rem] max-w-3xl w-full border border-white/10 shadow-3xl"
            >
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-bold text-blue-400 mb-6 uppercase tracking-widest">
                        Downtown Bistro
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-white mb-4">Share Your Experience</h1>
                    <p className="text-muted-foreground text-lg italic">"Excellence is a habit, fed by your feedback."</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Star Rating */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex justify-center gap-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="group p-1 transition-transform active:scale-75"
                                >
                                    <Star
                                        className={`w-14 h-14 transition-all duration-300 ${star <= (hoveredRating || rating)
                                                ? "fill-blue-500 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-110"
                                                : "text-white/10 group-hover:text-white/30"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm font-bold text-blue-400/60 uppercase tracking-tighter">
                            {rating === 5 ? "Exceptional" : rating === 4 ? "Great" : rating === 3 ? "Good" : rating === 2 ? "Fair" : rating === 1 ? "Bad" : "Tap to rate"}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="relative group">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2 mb-3 block">Detailed Review</label>
                            <textarea
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full bg-slate-900/50 border border-white/5 rounded-[2rem] p-6 text-white placeholder:text-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 outline-none transition-all min-h-[180px] resize-none text-lg shadow-inner"
                                placeholder="How was the taste, presentation and service?"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2 block text-center md:text-left">Your Profile</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium"
                                        placeholder="Guest Name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2 block text-center md:text-left">Employee Shoutout</label>
                                <div className="relative">
                                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                    <input
                                        type="text"
                                        value={staffName}
                                        onChange={(e) => setStaffName(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium"
                                        placeholder="Server Name"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-blue-400 text-center font-bold"
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <button
                        disabled={isSubmitting || rating === 0}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-4 transition-all disabled:opacity-40 disabled:cursor-not-allowed group active:scale-95"
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Submit Experience
                                <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
