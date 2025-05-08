import { supabase, handleSupabaseError } from "@/lib/supabase";

export type UserRole =
  | "admin"
  | "dispatcher"
  | "officer"
  | "reviewer"
  | "connect"
  | "driver";

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: UserRole;
}

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Fetch user profile data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError) throw userError;

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        fullName: userData.full_name,
        avatarUrl: userData.avatar_url,
        role: userData.role as UserRole,
      },
      session: data.session,
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName: string,
  role: UserRole = "dispatcher",
) => {
  try {
    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error("User creation failed");

    // Create profile in users table
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        email: email,
        full_name: fullName,
        role: role,
      },
    ]);

    if (profileError) throw profileError;

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        fullName,
        role,
      },
      session: data.session,
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get the current user
 */
export const getCurrentUser = async (): Promise<{
  user: AuthUser | null;
  error?: any;
}> => {
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) return { user: null };

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", sessionData.session.user.id)
      .single();

    if (userError) throw userError;

    return {
      user: {
        id: sessionData.session.user.id,
        email: sessionData.session.user.email!,
        fullName: userData.full_name,
        avatarUrl: userData.avatar_url,
        role: userData.role as UserRole,
      },
    };
  } catch (error) {
    return { user: null, error };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  updates: {
    fullName?: string;
    avatarUrl?: string;
    role?: UserRole;
  },
) => {
  try {
    const updateData: any = {};
    if (updates.fullName !== undefined) updateData.full_name = updates.fullName;
    if (updates.avatarUrl !== undefined)
      updateData.avatar_url = updates.avatarUrl;
    if (updates.role !== undefined) updateData.role = updates.role;

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    return {
      user: {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        avatarUrl: data.avatar_url,
        role: data.role as UserRole,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};
