"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    role: "ADMIN" | "MANAGER";
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    role: "ADMIN"
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<"ADMIN" | "MANAGER">("ADMIN");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            // For demo, we'll set ADMIN by default unless email contains 'manager'
            if (user?.email?.includes("manager")) {
                setRole("MANAGER");
            } else {
                setRole("ADMIN");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, role }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
