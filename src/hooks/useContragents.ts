import { useState, useEffect, useCallback } from "react";
import {
  Contragent,
  ContragentType,
  getAllContragents,
  getContragentsByType,
  createContragent,
  updateContragent,
  deleteContragent,
} from "@/api/contragents";

export function useContragents(initialType?: ContragentType) {
  const [contragents, setContragents] = useState<Contragent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<ContragentType | undefined>(initialType);

  // Load contragents
  const loadContragents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (type) {
        result = await getContragentsByType(type);
      } else {
        result = await getAllContragents();
      }

      if ("error" in result) {
        throw new Error(result.error.message);
      }

      setContragents(result.contragents);
    } catch (err: any) {
      console.error("Error loading contragents:", err);
      setError(err.message || "Failed to load contragents");
    } finally {
      setLoading(false);
    }
  }, [type]);

  // Load contragents on mount and when type changes
  useEffect(() => {
    loadContragents();
  }, [loadContragents]);

  // Add a new contragent
  const addContragent = useCallback(
    async (contragentData: Omit<Contragent, "createdAt" | "updatedAt">) => {
      setLoading(true);
      setError(null);
      try {
        const result = await createContragent(contragentData);
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        setContragents((prev) => [...prev, result.contragent]);
        return { success: true, contragent: result.contragent };
      } catch (err: any) {
        setError(err.message || "Failed to add contragent");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Update a contragent
  const updateContragentById = useCallback(
    async (
      id: string,
      updates: Partial<Omit<Contragent, "id" | "createdAt" | "updatedAt">>,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const result = await updateContragent(id, updates);
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        setContragents((prev) =>
          prev.map((contragent) =>
            contragent.id === id ? result.contragent : contragent,
          ),
        );
        return { success: true, contragent: result.contragent };
      } catch (err: any) {
        setError(err.message || "Failed to update contragent");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Delete a contragent
  const deleteContragentById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteContragent(id);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
      setContragents((prev) =>
        prev.filter((contragent) => contragent.id !== id),
      );
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Failed to delete contragent");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Change type filter
  const changeType = useCallback((newType?: ContragentType) => {
    setType(newType);
  }, []);

  return {
    contragents,
    loading,
    error,
    loadContragents,
    addContragent,
    updateContragent: updateContragentById,
    deleteContragent: deleteContragentById,
    changeType,
    currentType: type,
  };
}
