"use client";

import {
    LayoutDashboard,
    MessageSquare,
    Users,
    Settings,
    Zap,
    ShieldAlert,
    Target,
    QrCode,
    Globe,
    Sparkles,
    Building2,
    ChevronRight,
    LogOut,
    Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useAuth } from "./auth-provider";

export function Sidebar() {
    const pathname = usePathname();
    const { role } = useAuth();

    const navItems = [
        { label: "Dashboard", id: "dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "AI Assistant", id: "ai-assistant", icon: Sparkles, href: "/ai-assistant" },
        { label: "Escalations", id: "escalations", icon: ShieldAlert, href: "/escalations", chip: "Live" },
        { label: "Reviews Feed", id: "reviews", icon: MessageSquare, href: "/reviews", hidden: role === "MANAGER" },
        { label: "Staff Stats", id: "staff", icon: Users, href: "/staff" },
        { label: "Branches", id: "branches", icon: Building2, href: "/branches", hidden: role === "MANAGER" },
        { label: "Competitors", id: "competitor", icon: Target, href: "/competitor" },
        { label: "Collect Feedback", id: "collect", icon: QrCode, href: "/collect" },
        { label: "Insights", id: "insights", icon: Zap, href: "/insights", hidden: role === "MANAGER" },
        { label: "Integrations", id: "integrations", icon: Globe, href: "/integrations", hidden: role === "MANAGER" },
        { label: "Settings", id: "settings", icon: Settings, href: "/settings" },
    ].filter(item => !item.hidden);

    const navGroups = [
        {
            label: "Main",
            items: navItems.filter(item => ["dashboard", "reviews", "insights"].includes(item.id))
        },
        {
            label: "Intelligence",
            items: navItems.filter(item => ["ai-assistant", "escalations", "competitor"].includes(item.id))
        },
        {
            label: "Operations",
            items: navItems.filter(item => ["staff", "branches", "collect", "integrations"].includes(item.id))
        }
    ];

    return (
        <div className="w-80 h-[calc(100vh-2rem)] glass rounded-[3rem] p-8 flex flex-col border-white/5 shadow-2xl relative overflow-hidden shrink-0">
            {/* Glossy Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 mb-12 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    <Zap className="w-7 h-7 text-white fill-white/20" />
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white italic tracking-tighter leading-none italic">ReviewFlow</span>
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Enterprise Suite</span>
                </div>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 space-y-10 overflow-y-auto no-scrollbar pr-2">
                {navGroups.map((group) => group.items.length > 0 && (
                    <div key={group.label} className="space-y-4">
                        <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] pl-4">{group.label}</h3>
                        <div className="space-y-1">
                            {group.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group",
                                        pathname === item.href
                                            ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20"
                                            : "text-muted-foreground hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon className={cn(
                                            "w-5 h-5 transition-transform group-hover:scale-110",
                                            pathname === item.href ? "text-white" : "text-indigo-400"
                                        )} />
                                        <span className="text-[11px] font-black uppercase tracking-widest italic">{item.label}</span>
                                    </div>
                                    {item.chip && (
                                        <span className="px-2 py-0.5 rounded-full bg-indigo-400/20 text-indigo-300 text-[8px] font-black uppercase tracking-tighter animate-pulse border border-indigo-500/30">
                                            {item.chip}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Profile & Settings Area */}
            <div className="mt-10 pt-8 border-t border-white/5 space-y-6">
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group",
                        pathname === "/settings" ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                    )}
                >
                    <Settings className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform" />
                    <span className="text-[11px] font-black uppercase tracking-widest italic">Settings</span>
                </Link>

                <div className="p-1 glass bg-white/5 rounded-[2.5rem] border-white/5">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-xl font-black text-white italic">
                                {role === "ADMIN" ? "A" : "M"}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-white uppercase italic">{role === "ADMIN" ? "Admin" : "Manager"}</span>
                                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">Premium Cluster</span>
                            </div>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500/20 group transition-all">
                            <LogOut className="w-4 h-4 text-muted-foreground group-hover:text-rose-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Glossy Overlay Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-30" />
        </div>
    );
}
