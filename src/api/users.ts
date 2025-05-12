import { db, auth } from "@/lib/firebase";
import { deleteUser as deleteFirebaseUser } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { UserRole } from "./auth";

export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all users
 */
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("full_name");

    if (error) throw error;

    // Transform the data to match the frontend model
    const users: User[] = data.map((user) => ({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      avatarUrl: user.avatar_url,
      role: user.role as UserRole,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }));

    return { users };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get users by role
 */
export const getUsersByRole = async (role: UserRole) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", role)
      .order("full_name");

    if (error) throw error;

    const users: User[] = data.map((user) => ({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      avatarUrl: user.avatar_url,
      role: user.role as UserRole,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }));

    return { users };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    const user: User = {
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      avatarUrl: data.avatar_url,
      role: data.role as UserRole,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return { user };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Update a user
 */
export const updateUser = async (
  id: string,
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
      .eq("id", id)
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
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Delete a user
 */
export const deleteUser = async (id: string) => {
  try {
    // Delete the user from the users table
    const { error: userError } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (userError) throw userError;

    // Delete the user from auth.users (requires admin privileges)
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) throw authError;

    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
};
