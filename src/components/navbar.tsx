"use client";

import { Menu, Zap } from "lucide-react";
import Link from "next/link";
import { useAuth } from "./auth-provider";

interface NavbarProps {
    onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
    const { businessName } = useAuth();

    return (
        <header className="lg:hidden sticky top-0 z-40 w-full glass bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="p-2 hover:bg-white/5 rounded-xl transition-all"
                    aria-label="Toggle Menu"
                >
                    <Menu className="w-6 h-6 text-white" />
                </button>
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Zap className="w-4 h-4 text-white fill-white/20" />
                    </div>
                    <span className="text-lg font-black text-white italic tracking-tighter">ReviewFlow</span>
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-white italic">
                    {businessName?.[0] || 'A'}
                </div>
            </div>
        </header>
    );
}
