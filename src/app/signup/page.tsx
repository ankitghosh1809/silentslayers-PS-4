"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Zap,
    Mail,
    Lock,
    User,
    Building2,
    ArrowRight,
    Globe,
    Plus
} from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        businessName: "",
        email: "",
        password: "",
        branchCount: "1-5"
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            // Here you would also create the user in your Prisma DB
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            router.push("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full glass p-12 rounded-[4rem] border-white/5 relative z-10 shadow-2xl"
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">Deploy Suite</h2>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic italic">Initialize high-scale review management for your brand.</p>
                </div>

                <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 md:col-span-2">
                        <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="text"
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground placeholder:italic outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium italic italic italic"
                                placeholder="Business Name"
                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="email"
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground placeholder:italic outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium italic italic italic"
                                placeholder="Work Email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="password"
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground placeholder:italic outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium italic italic italic"
                                placeholder="Master Password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-4">Initial Cluster Size</p>
                        <div className="flex gap-3">
                            {["1-5", "6-20", "21-50", "Custom"].map(size => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, branchCount: size })}
                                    className={cn(
                                        "flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        formData.branchCount === size ? "bg-indigo-600 text-white" : "glass bg-white/5 text-muted-foreground border-white/5"
                                    )}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 w-full bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white py-5 rounded-[2rem] font-black uppercase italic tracking-widest text-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/20"
                    >
                        {loading ? "Deploying..." : "Initialize Suite"}
                        {!loading && <Plus className="w-5 h-5" />}
                    </button>
                </form>

                <p className="mt-10 text-center text-[10.5px] font-medium text-muted-foreground italic italic italic">
                    Already managing an entity? <Link href="/login" className="text-white hover:text-indigo-400 font-black uppercase italic transition-colors ml-1">Connect Cluster</Link>
                </p>
            </motion.div>
        </div>
    );
}
