"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function LoadingSequencePage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/login");
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative z-10 w-24 h-24 lg:w-32 lg:h-32 rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center mb-12 shadow-[0_20px_50px_rgba(79,70,229,0.3)]"
            >
                <Zap className="w-12 h-12 lg:w-16 lg:h-16 text-white fill-white/20" />

                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-[2rem] lg:rounded-[2.5rem] border-2 border-indigo-500 animate-ping opacity-20" />
                <div className="absolute inset-[-20px] rounded-[3rem] border border-indigo-500/30 animate-pulse" />
            </motion.div>

            <div className="relative z-10 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl lg:text-3xl font-black text-white italic uppercase tracking-tighter"
                >
                    Initializing Review Intelligence Engine...
                </motion.h2>

                <div className="w-64 h-1.5 bg-white/5 rounded-full mx-auto overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] animate-pulse"
                >
                    Securing Enterprise Hub Connections
                </motion.p>
            </div>
        </div>
    );
}
