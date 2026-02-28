"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar";
import {
    TrendingUp,
    TrendingDown,
    Users,
    Star,
    MessageSquare,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    ArrowRight,
    ChevronRight,
    Zap,
    Globe
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { motion } from "framer-motion";

const sentimentData = [
    { name: 'Mon', positive: 85, neutral: 10, negative: 5 },
    { name: 'Tue', positive: 78, neutral: 15, negative: 7 },
    { name: 'Wed', positive: 92, neutral: 5, negative: 3 },
    { name: 'Thu', positive: 88, neutral: 8, negative: 4 },
    { name: 'Fri', positive: 95, neutral: 3, negative: 2 },
    { name: 'Sat', positive: 90, neutral: 6, negative: 4 },
    { name: 'Sun', positive: 82, neutral: 12, negative: 6 },
];

const categoryData = [
    { name: 'Food', value: 45, color: '#6366F1' },
    { name: 'Service', value: 30, color: '#8B5CF6' },
    { name: 'Ambience', value: 15, color: '#3B82F6' },
    { name: 'Cleanliness', value: 10, color: '#EC4899' },
];

const branchData = [
    { name: 'Downtown', rating: 4.8 },
    { name: 'Harbor', rating: 4.5 },
    { name: 'Westside', rating: 4.2 },
    { name: 'Midtown', rating: 4.7 },
    { name: 'Riverside', rating: 4.4 },
];

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex gap-6 min-h-[calc(100vh-2rem)] bg-slate-950 p-4">
                <Sidebar />
                <div className="flex-1 space-y-8 animate-pulse">
                    <div className="h-20 w-1/3 bg-white/5 rounded-[2rem]" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-white/5 rounded-[2.5rem]" />)}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 h-[400px] bg-white/5 rounded-[3rem]" />
                        <div className="h-[400px] bg-white/5 rounded-[3rem]" />
                    </div>
                </div>
            </div>
        );
    }

    const stats = [
        { label: "Total Reviews", value: 1284, prefix: "", icon: MessageSquare, change: "+12.5%", trending: "up" },
        { label: "Avg. Rating", value: 4.8, prefix: "", icon: Star, change: "+0.2", trending: "up" },
        { label: "Active Staff", value: 42, prefix: "", icon: Users, change: "-2", trending: "down" },
        { label: "Sentiment Score", value: 92, prefix: "", suffix: "%", icon: TrendingUp, change: "+5%", trending: "up" },
    ];

    return (
        <div className="flex gap-6 min-h-[calc(100vh-2rem)] bg-slate-950 p-4">
            <Sidebar />

            <div className="flex-1 space-y-8 max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 custom-scrollbar">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Live Feed Active</p>
                        </motion.div>
                        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase italic leading-none">Executive Overview</h2>
                        <p className="text-muted-foreground font-medium italic mt-2">Real-time performance across 5 premium locations.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="glass px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                            Weekly Summary
                        </button>
                        <button className="bg-gradient-to-tr from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/20">
                            Export PDF
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-8 rounded-[2.5rem] group hover:border-indigo-500/30 transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-[40px] rounded-full -mr-12 -mt-12" />
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-all">
                                    <stat.icon className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div className={cn(
                                    "flex items-center text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-full",
                                    stat.trending === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'
                                )}>
                                    {stat.change}
                                    {stat.trending === 'up' ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                                </div>
                            </div>
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 italic">{stat.label}</p>
                                <h3 className="text-4xl font-black text-white italic tracking-tighter">
                                    {stat.prefix}{stat.value}{stat.suffix}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden min-h-[450px]">
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Sentiment Analysis</h3>
                                <p className="text-xs text-muted-foreground font-bold mt-1">Growth of positive customer experience (Last 7 Days)</p>
                            </div>
                            <div className="flex gap-4 p-1 glass bg-white/5 rounded-xl border-white/5">
                                <button className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest bg-white/10 text-white rounded-lg transition-all">Daily</button>
                                <button className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-all">Weekly</button>
                            </div>
                        </div>

                        <div className="h-[300px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sentimentData}>
                                    <defs>
                                        <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 900 }}
                                        dy={15}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 900 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            backdropFilter: 'blur(12px)',
                                            padding: '20px'
                                        }}
                                        labelStyle={{ color: '#818cf8', fontWeight: 900, marginBottom: '10px', textTransform: 'uppercase' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="positive"
                                        stroke="#818cf8"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorPos)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass p-10 rounded-[3rem] flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-10 text-center">Category Distribution</h3>
                        <div className="h-[250px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <p className="text-3xl font-black text-white italic leading-none">Food</p>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Leading Topic</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full mt-10">
                            {categoryData.map(c => (
                                <div key={c.name} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                                    <p className="text-[10px] font-black text-white/50 uppercase italic tracking-tighter">{c.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Row 2: Escalations & Branch Benchmarks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass p-10 rounded-[3rem] border-white/5">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                                <AlertTriangle className="w-6 h-6 text-rose-500 fill-rose-500/20" />
                                Critical Escalations
                            </h3>
                            <Link href="/escalations" className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors flex items-center">
                                View Table <ChevronRight className="w-3 h-3 ml-1" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {[
                                { branch: "Midtown Express", content: "Wait time was over 45 minutes for a salad.", priority: "HIGH", time: "12m ago" },
                                { branch: "Harbor Grill", content: "Found hair in my food, manager didn't care.", priority: "HIGH", time: "45m ago" },
                                { branch: "Downtown Branch", content: "Server was rude and overcharged us.", priority: "MEDIUM", time: "1h ago" }
                            ].map((esc, i) => (
                                <div key={i} className="glass bg-white/5 p-6 rounded-2xl border-white/5 hover:border-white/10 transition-all group cursor-pointer relative overflow-hidden">
                                    <div className={cn(
                                        "absolute top-0 left-0 bottom-0 w-1",
                                        esc.priority === "HIGH" ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                    )} />
                                    <div className="flex justify-between items-start mb-3">
                                        <p className="text-xs font-black text-white uppercase italic tracking-tight">{esc.branch}</p>
                                        <p className="text-[9px] font-black text-muted-foreground uppercase">{esc.time}</p>
                                    </div>
                                    <p className="text-sm text-white/70 italic font-medium leading-relaxed group-hover:text-white transition-colors">"{esc.content}"</p>
                                    <div className="mt-4 flex gap-3">
                                        <span className={cn(
                                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase italic tracking-widest",
                                            esc.priority === "HIGH" ? "bg-rose-500/20 text-rose-500" : "bg-amber-500/20 text-amber-500"
                                        )}>Priority: {esc.priority}</span>
                                        <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase italic tracking-widest bg-white/10 text-muted-foreground group-hover:text-white transition-colors">Assign to Manager</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass p-10 rounded-[3rem] border-white/5">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Branch Performance</h3>
                            <Globe className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={branchData} layout="vertical" margin={{ left: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 900 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '15px' }}
                                    />
                                    <Bar dataKey="rating" radius={[0, 10, 10, 0]} barSize={25}>
                                        {branchData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.rating >= 4.5 ? '#6366F1' : entry.rating >= 4.3 ? '#818cf8' : '#3b82f6'}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 glass bg-indigo-500/10 p-4 rounded-2xl flex items-center justify-between border-white/5">
                            <div className="flex items-center gap-3">
                                <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
                                <p className="text-xs font-bold text-white italic italic italic">AI Insights: <span className="text-indigo-200">Downtown is outperforming peers by 12% this week.</span></p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-indigo-400" />
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <div className="py-6 flex justify-between items-center text-[10px] font-black text-muted-foreground uppercase tracking-widest border-t border-white/5">
                    <p>© 2026 ReviewFlow Executive Suite</p>
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Supabase Connected</span>
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> AI Agent Ready</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
