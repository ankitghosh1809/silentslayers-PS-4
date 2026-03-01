"use client";

import { useState, useEffect } from "react";
import { X, Building2, Mail, Lock, LogOut, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
    const router = useRouter();
    const { logout, businessName: currentBusiness, user } = useAuth();
    const [formData, setFormData] = useState({
        businessName: "",
        email: "",
        branchName: "Downtown",
        password: "••••••••"
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                businessName: currentBusiness || "",
                email: user?.email || ""
            }));
        }
    }, [isOpen, currentBusiness, user]);

    const handleLogout = async () => {
        localStorage.removeItem("reviewflow_session");
        await logout();
        onClose();
        router.push("/");
    };

    const handleSave = () => {
        alert("Account settings updated successfully!");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        className="relative glass w-full max-w-lg rounded-[2.5rem] lg:rounded-[3.5rem] border-white/10 shadow-2xl overflow-hidden font-bold italic"
                    >
                        <div className="p-6 lg:p-10 border-b border-white/5 space-y-4 font-black">
                            <div className="flex justify-between items-center italic font-black">
                                <h3 className="text-xl lg:text-3xl font-black text-white italic uppercase tracking-tighter">Manage Account</h3>
                                <button onClick={onClose} className="p-2 lg:p-3 hover:bg-white/5 rounded-full transition-all">
                                    <X className="w-6 h-6 text-muted-foreground" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 lg:p-10 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Business Name</label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                                        <input
                                            type="text"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium italic"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Work Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium italic"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Master Branch</label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                                        <input
                                            type="text"
                                            value={formData.branchName}
                                            onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium italic"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Access Credentials</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
                                        <input
                                            type="password"
                                            value={formData.password}
                                            className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium italic"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-6">
                                <button
                                    onClick={handleLogout}
                                    className="w-full sm:flex-1 glass bg-rose-500/10 border-rose-500/20 text-rose-500 py-4 rounded-2xl lg:rounded-[2rem] font-black uppercase italic tracking-widest text-[10px] hover:bg-rose-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="w-full sm:flex-[2] bg-indigo-600 text-white py-4 rounded-2xl lg:rounded-[2rem] font-black uppercase italic tracking-widest text-[10px] hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20"
                                >
                                    <Save className="w-4 h-4" /> Save Intel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
