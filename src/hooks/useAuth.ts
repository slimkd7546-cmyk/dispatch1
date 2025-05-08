import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { AuthUser, getCurrentUser, signInWithEmail, signOut } from "@/api/auth";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const { user, error } = await getCurrentUser();
        if (error) throw error;
        setUser(user);
      } catch (err: any) {
        console.error("Error loading user:", err);
        setError(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          const { user } = await getCurrentUser();
          setUser(user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmail(email, password);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
      setUser(result.user);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Failed to login");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await signOut();
      setUser(null);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Failed to logout");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
