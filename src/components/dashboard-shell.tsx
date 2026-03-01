"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

interface DashboardShellProps {
    children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row lg:p-4 gap-0 lg:gap-6 relative overflow-hidden">
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex-1 w-full max-w-7xl mx-auto space-y-8 p-4 lg:p-0 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
                {children}
            </main>
        </div>
    );
}
