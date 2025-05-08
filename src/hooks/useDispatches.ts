import { useState, useEffect, useCallback } from "react";
import {
  Dispatch,
  DispatchStatus,
  getAllDispatches,
  getDispatchesByStatus,
  getDispatchesByAssignee,
  createDispatch,
  updateDispatch,
  deleteDispatch,
  addDispatchNote,
  getDispatchNotes,
  getDispatchHistory,
} from "@/api/dispatches";

export function useDispatches(
  initialStatus?: DispatchStatus,
  assignedToUser?: string,
) {
  const [dispatches, setDispatches] = useState<Dispatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<DispatchStatus | undefined>(
    initialStatus,
  );

  // Load dispatches
  const loadDispatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (assignedToUser) {
        result = await getDispatchesByAssignee(assignedToUser);
      } else if (status) {
        result = await getDispatchesByStatus(status);
      } else {
        result = await getAllDispatches();
      }

      if ("error" in result) {
        throw new Error(result.error.message);
      }

      setDispatches(result.dispatches);
    } catch (err: any) {
      console.error("Error loading dispatches:", err);
      setError(err.message || "Failed to load dispatches");
    } finally {
      setLoading(false);
    }
  }, [status, assignedToUser]);

  // Load dispatches on mount and when status or assignedToUser changes
  useEffect(() => {
    loadDispatches();
  }, [loadDispatches]);

  // Add a new dispatch
  const addDispatch = useCallback(
    async (dispatchData: Omit<Dispatch, "id" | "createdAt" | "updatedAt">) => {
      setLoading(true);
      setError(null);
      try {
        const result = await createDispatch(dispatchData);
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        setDispatches((prev) => [result.dispatch, ...prev]);
        return { success: true, dispatch: result.dispatch };
      } catch (err: any) {
        setError(err.message || "Failed to add dispatch");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Update a dispatch
  const updateDispatchById = useCallback(
    async (
      id: string,
      updates: Partial<Omit<Dispatch, "id" | "createdAt" | "updatedAt">>,
      userId: string,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const result = await updateDispatch(id, updates, userId);
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        setDispatches((prev) =>
          prev.map((dispatch) =>
            dispatch.id === id ? result.dispatch : dispatch,
          ),
        );
        return { success: true, dispatch: result.dispatch };
      } catch (err: any) {
        setError(err.message || "Failed to update dispatch");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Delete a dispatch
  const deleteDispatchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteDispatch(id);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
      setDispatches((prev) => prev.filter((dispatch) => dispatch.id !== id));
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Failed to delete dispatch");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a note to a dispatch
  const addNote = useCallback(
    async (dispatchId: string, userId: string, note: string) => {
      setError(null);
      try {
        const result = await addDispatchNote(dispatchId, userId, note);
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        return { success: true, note: result.note };
      } catch (err: any) {
        setError(err.message || "Failed to add note");
        return { success: false, error: err.message };
      }
    },
    [],
  );

  // Get notes for a dispatch
  const getNotes = useCallback(async (dispatchId: string) => {
    setError(null);
    try {
      const result = await getDispatchNotes(dispatchId);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
      return { success: true, notes: result.notes };
    } catch (err: any) {
      setError(err.message || "Failed to get notes");
      return { success: false, error: err.message };
    }
  }, []);

  // Get history for a dispatch
  const getHistory = useCallback(async (dispatchId: string) => {
    setError(null);
    try {
      const result = await getDispatchHistory(dispatchId);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
      return { success: true, history: result.history };
    } catch (err: any) {
      setError(err.message || "Failed to get history");
      return { success: false, error: err.message };
    }
  }, []);

  // Change status filter
  const changeStatus = useCallback((newStatus?: DispatchStatus) => {
    setStatus(newStatus);
  }, []);

  return {
    dispatches,
    loading,
    error,
    loadDispatches,
    addDispatch,
    updateDispatch: updateDispatchById,
    deleteDispatch: deleteDispatchById,
    addNote,
    getNotes,
    getHistory,
    changeStatus,
    currentStatus: status,
  };
}
