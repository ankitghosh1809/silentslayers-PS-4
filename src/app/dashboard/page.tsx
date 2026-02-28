"use client";

import { Sidebar } from "@/components/sidebar";
import {
    TrendingUp,
    Users,
    Star,
    MessageSquare,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const data = [
    { name: 'Mon', reviews: 40, rating: 4.2 },
    { name: 'Tue', reviews: 30, rating: 4.5 },
    { name: 'Wed', reviews: 20, rating: 4.8 },
    { name: 'Thu', reviews: 27, rating: 4.3 },
    { name: 'Fri', reviews: 18, rating: 4.9 },
    { name: 'Sat', reviews: 23, rating: 4.7 },
    { name: 'Sun', reviews: 34, rating: 4.8 },
];

export default function DashboardPage() {
    const stats = [
        { label: "Total Reviews", value: "1,284", icon: MessageSquare, change: "+12.5%", trending: "up" },
        { label: "Avg. Rating", value: "4.8", icon: Star, change: "+0.2", trending: "up" },
        { label: "Active Staff", value: "42", icon: Users, change: "-2", trending: "down" },
        { label: "Sentiment Score", value: "92%", icon: TrendingUp, change: "+5%", trending: "up" },
    ];

    return (
        <div className="flex gap-6 min-h-[calc(100vh-4rem)]">
            <Sidebar />

            <div className="flex-1 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Executive Dashboard</h2>
                        <p className="text-muted-foreground">Real-time insights across all 12 branches.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="glass px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all">
                            Download Report
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/20">
                            Add Branch
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="glass p-6 rounded-2xl group hover:border-blue-500/30 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
                                    <stat.icon className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className={`flex items-center text-xs font-medium ${stat.trending === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {stat.change}
                                    {stat.trending === 'up' ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts & Feed Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 glass p-6 rounded-2xl min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-white">Sentiment Overview</h3>
                            <select className="bg-transparent border-none text-xs text-muted-foreground focus:ring-0 cursor-pointer">
                                <option className="bg-slate-900">Last 7 days</option>
                                <option className="bg-slate-900">Last 30 days</option>
                            </select>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            backdropFilter: 'blur(8px)'
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="reviews"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorReviews)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass p-6 rounded-2xl">
                        <h3 className="font-semibold text-white mb-6">Recent Alerts</h3>
                        <div className="space-y-4">
                            {[
                                { branch: "Downtown Branch", content: "Great food but server Sarah was a bit rude.", color: "text-rose-400", bg: "bg-rose-500/10" },
                                { branch: "Harbor Grill", content: "Wait time was over 45 minutes for a salad.", color: "text-amber-400", bg: "bg-amber-500/10" },
                                { branch: "Westside Hub", content: "Ambience is too loud for a business dinner.", color: "text-rose-400", bg: "bg-rose-500/10" }
                            ].map((alert, i) => (
                                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5">
                                    <div className={`w-10 h-10 rounded-full ${alert.bg} flex items-center justify-center shrink-0`}>
                                        <Star className={`w-5 h-5 ${alert.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white mb-1">{alert.branch}</p>
                                        <p className="text-xs text-muted-foreground line-clamp-2 italic">"{alert.content}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                            View All Alerts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
