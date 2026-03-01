"use client";

import { useState, useRef, useEffect } from "react";
import {
    Zap,
    Send,
    Bot,
    User,
    Sparkles,
    MessageCircle,
    BarChart,
    Target,
    ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard-shell";

interface Message {
    role: 'user' | 'assistant';
    content: string;
    time: string;
}

export default function AIAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hello! I am your ReviewFlow AI Specialist. Ask me anything about your reviews, branch performance, or how to improve customer satisfaction.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMsg: Message = {
            role: 'user',
            content: input,
            time: timestamp
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await axios.post("/api/ai", {
                message: input
            });

            const botMsg: Message = {
                role: 'assistant',
                content: response.data.reply,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "AI temporarily unavailable.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestions = [
        "Why are ratings dropping in Midtown?",
        "Summarize this week's complaints.",
        "Generate apology response template."
    ];

    return (
        <DashboardShell>
            <div className="flex flex-col xl:flex-row gap-6 h-full min-h-[calc(100vh-200px)] lg:min-h-0">
                {/* Chat Interface */}
                <div className="flex-1 glass rounded-[2rem] lg:rounded-[3rem] border-white/5 flex flex-col overflow-hidden min-h-[500px]">
                    <div className="p-6 lg:p-8 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl animate-ping opacity-20" />
                                <Bot className="w-6 h-6 lg:w-7 lg:h-7 text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-lg lg:text-xl font-black text-white uppercase italic tracking-tighter">AI Specialist</h2>
                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <Sparkles className="w-6 h-6 text-indigo-400 opacity-20" />
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-8 custom-scrollbar">
                        <AnimatePresence initial={false}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex gap-4 max-w-[95%] lg:max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 shadow-lg",
                                        msg.role === 'user' ? "bg-indigo-600" : "bg-slate-900"
                                    )}>
                                        {msg.role === 'user' ? <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" /> : <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-400" />}
                                    </div>
                                    <div className="space-y-2">
                                        <div className={cn(
                                            "p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] text-sm font-medium italic leading-relaxed shadow-2xl",
                                            msg.role === 'user'
                                                ? "bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white rounded-tr-none"
                                                : "glass bg-white/5 text-slate-200 border-white/5 rounded-tl-none"
                                        )}>
                                            {msg.content}
                                        </div>
                                        <p className={cn("text-[9px] font-black text-muted-foreground uppercase px-2", msg.role === 'user' ? "text-right" : "")}>{msg.time}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isTyping && (
                            <div className="flex gap-4">
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/10 shadow-lg">
                                    <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-400" />
                                </div>
                                <div className="glass bg-white/5 px-4 py-3 lg:px-6 lg:py-4 rounded-2xl rounded-tl-none flex gap-1 items-center border-white/5 shadow-2xl">
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 lg:p-10 border-t border-white/5 bg-slate-900/40">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(s)}
                                    className="px-3 lg:px-4 py-2 glass bg-white/5 hover:bg-white/10 text-[9px] lg:text-[10px] font-black text-indigo-400 uppercase tracking-widest rounded-xl transition-all border-white/5"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        <form onSubmit={handleSend} className="relative group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full bg-slate-900 border border-white/10 rounded-[2rem] py-4 lg:py-5 pl-6 lg:pl-8 pr-16 lg:pr-20 text-white outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all text-sm font-medium italic shadow-inner"
                                placeholder="Ask ReviewFlow AI..."
                            />
                            <button
                                type="submit"
                                className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 p-2 lg:p-3 rounded-2xl text-white transition-all shadow-lg shadow-indigo-500/20 active:scale-95 group-hover:rotate-12"
                            >
                                <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Side Panel: Quick Stats */}
                <div className="w-full xl:w-80 flex flex-col gap-6">
                    <div className="glass p-6 lg:p-8 rounded-[2rem] lg:rounded-[3rem] border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] -mr-16 -mt-16" />
                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-8 flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                            AI Memory
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4 lg:gap-6">
                            {[
                                { label: "Complaints Topic", value: "Wait Time", icon: MessageCircle, color: "text-rose-400" },
                                { label: "Best Branch", value: "Downtown", icon: Target, color: "text-emerald-400" },
                                { label: "Next Goal", value: "Reduce SLA 15%", icon: BarChart, color: "text-blue-400" }
                            ].map((stat, i) => (
                                <div key={i} className="glass bg-white/5 p-5 rounded-2xl border-white/5 group hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-slate-900 rounded-lg">
                                            <stat.icon className={cn("w-4 h-4", stat.color)} />
                                        </div>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase italic tracking-widest">{stat.label}</p>
                                    </div>
                                    <p className="text-lg font-black text-white italic tracking-tight">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass p-6 lg:p-8 rounded-[2rem] lg:rounded-[3rem] border-white/5 bg-gradient-to-b from-indigo-500/10 to-transparent">
                        <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">AI Insight of the day</h3>
                        <p className="text-sm text-white/80 font-medium leading-relaxed italic border-l-2 border-indigo-500 pl-4 py-1">
                            "Negative Swiggy reviews correlate directly with rainy weather peak hours. Consider surge staffing for delivery dispatch."
                        </p>
                        <button className="mt-6 text-[10px] font-black text-white uppercase italic tracking-widest flex items-center group">
                            Learn more <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
