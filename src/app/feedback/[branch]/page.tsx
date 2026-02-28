"use client";

import { useState, use } from "react";
import { Zap, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackPage({ params }: { params: Promise<{ branch: string }> }) {
    const { branch } = use(params);
    const branchName = branch.charAt(0).toUpperCase() + branch.slice(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const tags = ["Food", "Service", "Hygiene", "Ambience", "Staff", "Value"];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass p-12 rounded-[3.5rem] border-white/5 max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Thank You!</h2>
                    <p className="text-muted-foreground font-medium italic">Your feedback for {branchName} has been received. We value your input!</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center">
            <div className="w-full max-w-md mt-12 mb-12 flex flex-col items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">ReviewFlow</h1>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-2">{branchName} Hub</p>
                </div>
            </div>

            <main className="w-full max-w-md glass p-8 rounded-[3rem] border-white/5 space-y-8">
                <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter text-center">How was your visit?</h2>

                <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="transition-transform active:scale-95"
                        >
                            <Star
                                className={cn(
                                    "w-10 h-10 transition-all",
                                    rating >= star
                                        ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                                        : "text-white/10"
                                )}
                            />
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">What did you love?</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase italic transition-all border",
                                    selectedTags.includes(tag)
                                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg"
                                        : "glass bg-white/5 border-white/10 text-white/50 hover:text-white"
                                )}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Additional Comments</p>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white text-sm font-medium italic outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all min-h-[120px]"
                            placeholder="Tell us more about your experience..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={rating === 0}
                        className="w-full bg-gradient-to-tr from-indigo-500 to-indigo-700 py-4 rounded-2xl text-sm font-black text-white uppercase italic tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                        Submit Feedback
                    </button>
                </form>

                <p className="text-center text-[9px] font-black text-white/20 uppercase tracking-[0.4em] pt-4">
                    Powered by ReviewFlow AI
                </p>
            </main>
        </div>
    );
}
