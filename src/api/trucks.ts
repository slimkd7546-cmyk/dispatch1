import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export type TruckStatus = "available" | "on_route" | "maintenance" | "offline";

export interface Truck {
  id: string;
  type: string;
  status: TruckStatus;
  driverId?: string;
  driver?: {
    id: string;
    name: string;
    avatar?: string;
  };
  location?: string;
  lastUpdated: string;
  fuelLevel?: number;
  mileage?: number;
  nextMaintenance?: string;
}

/**
 * Get all trucks
 */
export const getAllTrucks = async () => {
  try {
    const { data, error } = await supabase
      .from("trucks")
      .select(
        `
        *,
        driver:driver_id(id, full_name, avatar_url)
      `,
      )
      .order("id");

    if (error) throw error;

    // Transform the data to match the frontend model
    const trucks: Truck[] = data.map((truck) => ({
      id: truck.id,
      type: truck.type,
      status: truck.status as TruckStatus,
      driverId: truck.driver_id,
      driver: truck.driver
        ? {
            id: truck.driver.id,
            name: truck.driver.full_name,
            avatar: truck.driver.avatar_url,
          }
        : undefined,
      location: truck.location,
      lastUpdated: truck.last_updated,
      fuelLevel: truck.fuel_level,
      mileage: truck.mileage,
      nextMaintenance: truck.next_maintenance,
    }));

    return { trucks };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get truck by ID
 */
export const getTruckById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("trucks")
      .select(
        `
        *,
        driver:driver_id(id, full_name, avatar_url)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    const truck: Truck = {
      id: data.id,
      type: data.type,
      status: data.status as TruckStatus,
      driverId: data.driver_id,
      driver: data.driver
        ? {
            id: data.driver.id,
            name: data.driver.full_name,
            avatar: data.driver.avatar_url,
          }
        : undefined,
      location: data.location,
      lastUpdated: data.last_updated,
      fuelLevel: data.fuel_level,
      mileage: data.mileage,
      nextMaintenance: data.next_maintenance,
    };

    return { truck };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Create a new truck
 */
export const createTruck = async (truckData: Omit<Truck, "lastUpdated">) => {
  try {
    const { data, error } = await supabase
      .from("trucks")
      .insert([
        {
          id: truckData.id,
          type: truckData.type,
          status: truckData.status,
          driver_id: truckData.driverId,
          location: truckData.location,
          fuel_level: truckData.fuelLevel,
          mileage: truckData.mileage,
          next_maintenance: truckData.nextMaintenance,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      truck: {
        id: data.id,
        type: data.type,
        status: data.status as TruckStatus,
        driverId: data.driver_id,
        location: data.location,
        lastUpdated: data.last_updated,
        fuelLevel: data.fuel_level,
        mileage: data.mileage,
        nextMaintenance: data.next_maintenance,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Update a truck
 */
export const updateTruck = async (
  id: string,
  updates: Partial<Omit<Truck, "id" | "lastUpdated">>,
) => {
  try {
    const updateData: any = {};
    if (updates.type !== undefined) updateData.type = updates.type;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.driverId !== undefined) updateData.driver_id = updates.driverId;
    if (updates.location !== undefined) updateData.location = updates.location;
    if (updates.fuelLevel !== undefined)
      updateData.fuel_level = updates.fuelLevel;
    if (updates.mileage !== undefined) updateData.mileage = updates.mileage;
    if (updates.nextMaintenance !== undefined)
      updateData.next_maintenance = updates.nextMaintenance;

    const { data, error } = await supabase
      .from("trucks")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      truck: {
        id: data.id,
        type: data.type,
        status: data.status as TruckStatus,
        driverId: data.driver_id,
        location: data.location,
        lastUpdated: data.last_updated,
        fuelLevel: data.fuel_level,
        mileage: data.mileage,
        nextMaintenance: data.next_maintenance,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Delete a truck
 */
export const deleteTruck = async (id: string) => {
  try {
    const { error } = await supabase.from("trucks").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get trucks by status
 */
export const getTrucksByStatus = async (status: TruckStatus) => {
  try {
    const { data, error } = await supabase
      .from("trucks")
      .select(
        `
        *,
        driver:driver_id(id, full_name, avatar_url)
      `,
      )
      .eq("status", status)
      .order("id");

    if (error) throw error;

    const trucks: Truck[] = data.map((truck) => ({
      id: truck.id,
      type: truck.type,
      status: truck.status as TruckStatus,
      driverId: truck.driver_id,
      driver: truck.driver
        ? {
            id: truck.driver.id,
            name: truck.driver.full_name,
            avatar: truck.driver.avatar_url,
          }
        : undefined,
      location: truck.location,
      lastUpdated: truck.last_updated,
      fuelLevel: truck.fuel_level,
      mileage: truck.mileage,
      nextMaintenance: truck.next_maintenance,
    }));

    return { trucks };
  } catch (error) {
    return handleSupabaseError(error);
  }
};
