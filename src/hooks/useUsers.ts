import { useState, useEffect, useCallback } from "react";
import {
  User,
  getAllUsers,
  getUsersByRole,
  updateUser,
  deleteUser,
} from "@/api/users";
import { UserRole } from "@/api/auth";

export function useUsers(initialRole?: UserRole) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | undefined>(initialRole);

  // Load users
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (role) {
        result = await getUsersByRole(role);
      } else {
        result = await getAllUsers();
      }

      if ("error" in result) {
        throw new Error(result.error.message);
      }

      setUsers(result.users);
    } catch (err: any) {
      console.error("Error loading users:", err);
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [role]);

  // Load users on mount and when role changes
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Update a user
  const updateUserById = useCallback(
    async (
      id: string,
      updates: {
        fullName?: string;
        avatarUrl?: string;
        role?: UserRole;
      },
    ) => {
      setLoading(true);
      setError(null);
      try {
        const result = await updateUser(id, updates);
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? result.user : user)),
        );
        return { success: true, user: result.user };
      } catch (err: any) {
        setError(err.message || "Failed to update user");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Delete a user
  const deleteUserById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteUser(id);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
      setUsers((prev) => prev.filter((user) => user.id !== id));
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Change role filter
  const changeRole = useCallback((newRole?: UserRole) => {
    setRole(newRole);
  }, []);

  return {
    users,
    loading,
    error,
    loadUsers,
    updateUser: updateUserById,
    deleteUser: deleteUserById,
    changeRole,
    currentRole: role,
  };
}
