"use client";

import { User } from "@supabase/supabase-js";
import { createContext } from "react";

export const AuthContext = createContext<User | null>(null);

interface AuthUserProviderProps {
    user: User | null,
    children: React.ReactNode
}
export default function AuthUserProvider({ children, user }: AuthUserProviderProps) {
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}