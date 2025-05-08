import { useState, useEffect, useCallback } from "react";
import {
  Truck,
  TruckStatus,
  getAllTrucks,
  getTrucksByStatus,
  createTruck,
  updateTruck,
  deleteTruck,
} from "@/api/trucks";

export function useTrucks(initialStatus?: TruckStatus) {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<TruckStatus | undefined>(initialStatus);

  // Load trucks
  const loadTrucks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (status) {
        result = await getTrucksByStatus(status);
      } else {
        result = await getAllTrucks();
      }

      if ("error" in result) {
        throw new Error(result.error.message);
      }

      setTrucks(result.trucks);
    } catch (err: any) {
      console.error("Error loading trucks:", err);
      setError(err.message || "Failed to load trucks");
    } finally {
      setLoading(false);
    }
  }, [status]);

  // Load trucks on mount and when status changes
  useEffect(() => {
    loadTrucks();
  }, [loadTrucks]);

  // Add a new truck
  const addTruck = useCallback(
    async (truckData: Omit<Truck, "lastUpdated">) => {
      setLoading(true);
      setError(null);
      try {
        const result = await createTruck(truckData);
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        setTrucks((prev) => [...prev, result.truck]);
        return { success: true, truck: result.truck };
      } catch (err: any) {
        setError(err.message || "Failed to add truck");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Update a truck
  const updateTruckById = useCallback(
    async (id: string, updates: Partial<Omit<Truck, "id" | "lastUpdated">>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await updateTruck(id, updates);
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        setTrucks((prev) =>
          prev.map((truck) => (truck.id === id ? result.truck : truck)),
        );
        return { success: true, truck: result.truck };
      } catch (err: any) {
        setError(err.message || "Failed to update truck");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Delete a truck
  const deleteTruckById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteTruck(id);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
      setTrucks((prev) => prev.filter((truck) => truck.id !== id));
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Failed to delete truck");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Change status filter
  const changeStatus = useCallback((newStatus?: TruckStatus) => {
    setStatus(newStatus);
  }, []);

  return {
    trucks,
    loading,
    error,
    loadTrucks,
    addTruck,
    updateTruck: updateTruckById,
    deleteTruck: deleteTruckById,
    changeStatus,
    currentStatus: status,
  };
}
