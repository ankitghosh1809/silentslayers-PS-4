import Link from "next/link";
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    Users,
    BarChart3,
    Building2,
    Bell
} from "lucide-react";

export function Sidebar() {
    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Reviews", icon: MessageSquare, href: "/reviews" },
        { label: "AI Insights", icon: BarChart3, href: "/insights" },
        { label: "Staff", icon: Users, href: "/staff" },
        { label: "Branches", icon: Building2, href: "/branches" },
        { label: "Settings", icon: Settings, href: "/settings" },
    ];

    return (
        <div className="w-64 glass h-[calc(100vh-4rem)] rounded-2xl flex flex-col p-4 space-y-2">
            <div className="px-4 py-4 mb-4">
                <h1 className="text-xl font-bold gradient-text">ReviewFlow</h1>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                    >
                        <item.icon className="w-5 h-5 mr-3 group-hover:text-blue-400 transition-colors" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                    <div className="flex items-center space-y-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
                        <div className="ml-3">
                            <p className="text-xs font-medium text-white">Staff Admin</p>
                            <p className="text-[10px] text-muted-foreground">Main Branch</p>
                        </div>
                    </div>
                    <Bell className="w-4 h-4 text-muted-foreground" />
                </div>
            </div>
        </div>
    );
}
