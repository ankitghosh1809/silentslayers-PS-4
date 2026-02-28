"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    role: "ADMIN" | "OWNER" | "MANAGER";
    businessName: string;
    branches: string[];
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    role: "ADMIN",
    businessName: "ReviewFlow Enterprise",
    branches: [],
    logout: async () => { }
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<"ADMIN" | "OWNER" | "MANAGER">("ADMIN");
    const [businessName, setBusinessName] = useState("ReviewFlow Enterprise");
    const [branches, setBranches] = useState<string[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);

            if (user?.email === "admin@reviewflow.com") {
                setRole("ADMIN");
                setBusinessName("Spice Garden Restaurants");
                setBranches(["Downtown", "Midtown", "Riverside"]);
            } else if (user?.email === "owner@urbanbites.com") {
                setRole("OWNER");
                setBusinessName("Urban Bites Cafe");
                setBranches(["Central", "Eastside"]);
            } else if (user?.email?.includes("manager")) {
                setRole("MANAGER");
                setBusinessName("Demo Branch");
                setBranches(["Local"]);
            } else {
                setRole("ADMIN");
                setBusinessName("ReviewFlow Demo");
                setBranches(["Downtown", "Harbor", "Westside", "Midtown", "Riverside"]);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, loading, role, businessName, branches, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
