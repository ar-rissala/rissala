"use client";

import React, { createContext, useContext } from "react";
import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";

interface AuthContextValue {
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const user = useQuery(api.users.getCurrentUser) || null;
  const { signOut: convexSignOut } = useAuthActions();

  const authLoading = isLoading || (isAuthenticated && user === undefined);

  const signOut = async () => {
    await convexSignOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading: authLoading, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
