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

export type DispatchStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled";
export type DispatchPriority = "low" | "medium" | "high";

export interface Dispatch {
  id: string;
  title: string;
  description?: string;
  origin: string;
  destination: string;
  status: DispatchStatus;
  priority: DispatchPriority;
  assignedTo?: string;
  assignedOfficer?: {
    id: string;
    name: string;
    avatar?: string;
  };
  truckId?: string;
  truck?: {
    id: string;
    type: string;
  };
  pickupTime?: string;
  deliveryTime?: string;
  distance?: number;
  weight?: number;
  reference?: string;
  vehicleType?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all dispatches
 */
export const getAllDispatches = async () => {
  try {
    const { data, error } = await supabase
      .from("dispatches")
      .select(
        `
        *,
        assignedOfficer:assigned_to(id, full_name, avatar_url),
        truck:truck_id(id, type)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform the data to match the frontend model
    const dispatches: Dispatch[] = data.map((dispatch) => ({
      id: dispatch.id,
      title: dispatch.title,
      description: dispatch.description,
      origin: dispatch.origin,
      destination: dispatch.destination,
      status: dispatch.status as DispatchStatus,
      priority: dispatch.priority as DispatchPriority,
      assignedTo: dispatch.assigned_to,
      assignedOfficer: dispatch.assignedOfficer
        ? {
            id: dispatch.assignedOfficer.id,
            name: dispatch.assignedOfficer.full_name,
            avatar: dispatch.assignedOfficer.avatar_url,
          }
        : undefined,
      truckId: dispatch.truck_id,
      truck: dispatch.truck
        ? {
            id: dispatch.truck.id,
            type: dispatch.truck.type,
          }
        : undefined,
      pickupTime: dispatch.pickup_time,
      deliveryTime: dispatch.delivery_time,
      distance: dispatch.distance,
      weight: dispatch.weight,
      reference: dispatch.reference,
      vehicleType: dispatch.vehicle_type,
      createdBy: dispatch.created_by,
      createdAt: dispatch.created_at,
      updatedAt: dispatch.updated_at,
    }));

    return { dispatches };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get dispatches by status
 */
export const getDispatchesByStatus = async (status: DispatchStatus) => {
  try {
    const { data, error } = await supabase
      .from("dispatches")
      .select(
        `
        *,
        assignedOfficer:assigned_to(id, full_name, avatar_url),
        truck:truck_id(id, type)
      `,
      )
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const dispatches: Dispatch[] = data.map((dispatch) => ({
      id: dispatch.id,
      title: dispatch.title,
      description: dispatch.description,
      origin: dispatch.origin,
      destination: dispatch.destination,
      status: dispatch.status as DispatchStatus,
      priority: dispatch.priority as DispatchPriority,
      assignedTo: dispatch.assigned_to,
      assignedOfficer: dispatch.assignedOfficer
        ? {
            id: dispatch.assignedOfficer.id,
            name: dispatch.assignedOfficer.full_name,
            avatar: dispatch.assignedOfficer.avatar_url,
          }
        : undefined,
      truckId: dispatch.truck_id,
      truck: dispatch.truck
        ? {
            id: dispatch.truck.id,
            type: dispatch.truck.type,
          }
        : undefined,
      pickupTime: dispatch.pickup_time,
      deliveryTime: dispatch.delivery_time,
      distance: dispatch.distance,
      weight: dispatch.weight,
      reference: dispatch.reference,
      vehicleType: dispatch.vehicle_type,
      createdBy: dispatch.created_by,
      createdAt: dispatch.created_at,
      updatedAt: dispatch.updated_at,
    }));

    return { dispatches };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get dispatches assigned to a specific user
 */
export const getDispatchesByAssignee = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("dispatches")
      .select(
        `
        *,
        assignedOfficer:assigned_to(id, full_name, avatar_url),
        truck:truck_id(id, type)
      `,
      )
      .eq("assigned_to", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const dispatches: Dispatch[] = data.map((dispatch) => ({
      id: dispatch.id,
      title: dispatch.title,
      description: dispatch.description,
      origin: dispatch.origin,
      destination: dispatch.destination,
      status: dispatch.status as DispatchStatus,
      priority: dispatch.priority as DispatchPriority,
      assignedTo: dispatch.assigned_to,
      assignedOfficer: dispatch.assignedOfficer
        ? {
            id: dispatch.assignedOfficer.id,
            name: dispatch.assignedOfficer.full_name,
            avatar: dispatch.assignedOfficer.avatar_url,
          }
        : undefined,
      truckId: dispatch.truck_id,
      truck: dispatch.truck
        ? {
            id: dispatch.truck.id,
            type: dispatch.truck.type,
          }
        : undefined,
      pickupTime: dispatch.pickup_time,
      deliveryTime: dispatch.delivery_time,
      distance: dispatch.distance,
      weight: dispatch.weight,
      reference: dispatch.reference,
      vehicleType: dispatch.vehicle_type,
      createdBy: dispatch.created_by,
      createdAt: dispatch.created_at,
      updatedAt: dispatch.updated_at,
    }));

    return { dispatches };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get dispatch by ID
 */
export const getDispatchById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("dispatches")
      .select(
        `
        *,
        assignedOfficer:assigned_to(id, full_name, avatar_url),
        truck:truck_id(id, type)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    const dispatch: Dispatch = {
      id: data.id,
      title: data.title,
      description: data.description,
      origin: data.origin,
      destination: data.destination,
      status: data.status as DispatchStatus,
      priority: data.priority as DispatchPriority,
      assignedTo: data.assigned_to,
      assignedOfficer: data.assignedOfficer
        ? {
            id: data.assignedOfficer.id,
            name: data.assignedOfficer.full_name,
            avatar: data.assignedOfficer.avatar_url,
          }
        : undefined,
      truckId: data.truck_id,
      truck: data.truck
        ? {
            id: data.truck.id,
            type: data.truck.type,
          }
        : undefined,
      pickupTime: data.pickup_time,
      deliveryTime: data.delivery_time,
      distance: data.distance,
      weight: data.weight,
      reference: data.reference,
      vehicleType: data.vehicle_type,
      createdBy: data.created_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return { dispatch };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Create a new dispatch
 */
export const createDispatch = async (
  dispatchData: Omit<Dispatch, "id" | "createdAt" | "updatedAt">,
) => {
  try {
    const { data, error } = await supabase
      .from("dispatches")
      .insert([
        {
          id: `DISP-${Date.now().toString().slice(-6)}`,
          title: dispatchData.title,
          description: dispatchData.description,
          origin: dispatchData.origin,
          destination: dispatchData.destination,
          status: dispatchData.status,
          priority: dispatchData.priority,
          assigned_to: dispatchData.assignedTo,
          truck_id: dispatchData.truckId,
          pickup_time: dispatchData.pickupTime,
          delivery_time: dispatchData.deliveryTime,
          distance: dispatchData.distance,
          weight: dispatchData.weight,
          reference: dispatchData.reference,
          vehicle_type: dispatchData.vehicleType,
          created_by: dispatchData.createdBy,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Add to dispatch history
    await supabase.from("dispatch_history").insert([
      {
        dispatch_id: data.id,
        user_id: dispatchData.createdBy,
        previous_status: null,
        new_status: dispatchData.status,
      },
    ]);

    return {
      dispatch: {
        id: data.id,
        title: data.title,
        description: data.description,
        origin: data.origin,
        destination: data.destination,
        status: data.status as DispatchStatus,
        priority: data.priority as DispatchPriority,
        assignedTo: data.assigned_to,
        truckId: data.truck_id,
        pickupTime: data.pickup_time,
        deliveryTime: data.delivery_time,
        distance: data.distance,
        weight: data.weight,
        reference: data.reference,
        vehicleType: data.vehicle_type,
        createdBy: data.created_by,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Update a dispatch
 */
export const updateDispatch = async (
  id: string,
  updates: Partial<Omit<Dispatch, "id" | "createdAt" | "updatedAt">>,
  userId: string,
) => {
  try {
    const updateData: any = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined)
      updateData.description = updates.description;
    if (updates.origin !== undefined) updateData.origin = updates.origin;
    if (updates.destination !== undefined)
      updateData.destination = updates.destination;
    if (updates.priority !== undefined) updateData.priority = updates.priority;
    if (updates.assignedTo !== undefined)
      updateData.assigned_to = updates.assignedTo;
    if (updates.truckId !== undefined) updateData.truck_id = updates.truckId;
    if (updates.pickupTime !== undefined)
      updateData.pickup_time = updates.pickupTime;
    if (updates.deliveryTime !== undefined)
      updateData.delivery_time = updates.deliveryTime;
    if (updates.distance !== undefined) updateData.distance = updates.distance;
    if (updates.weight !== undefined) updateData.weight = updates.weight;
    if (updates.reference !== undefined)
      updateData.reference = updates.reference;
    if (updates.vehicleType !== undefined)
      updateData.vehicle_type = updates.vehicleType;

    // Get the current status before updating
    let previousStatus = null;
    if (updates.status !== undefined) {
      const { data: currentData } = await supabase
        .from("dispatches")
        .select("status")
        .eq("id", id)
        .single();

      if (currentData) {
        previousStatus = currentData.status;
        updateData.status = updates.status;
      }
    }

    const { data, error } = await supabase
      .from("dispatches")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // Add to dispatch history if status changed
    if (previousStatus !== null && previousStatus !== updates.status) {
      await supabase.from("dispatch_history").insert([
        {
          dispatch_id: id,
          user_id: userId,
          previous_status: previousStatus,
          new_status: updates.status,
        },
      ]);
    }

    return {
      dispatch: {
        id: data.id,
        title: data.title,
        description: data.description,
        origin: data.origin,
        destination: data.destination,
        status: data.status as DispatchStatus,
        priority: data.priority as DispatchPriority,
        assignedTo: data.assigned_to,
        truckId: data.truck_id,
        pickupTime: data.pickup_time,
        deliveryTime: data.delivery_time,
        distance: data.distance,
        weight: data.weight,
        reference: data.reference,
        vehicleType: data.vehicle_type,
        createdBy: data.created_by,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Delete a dispatch
 */
export const deleteDispatch = async (id: string) => {
  try {
    // Delete related records first
    await supabase.from("dispatch_notes").delete().eq("dispatch_id", id);
    await supabase.from("dispatch_history").delete().eq("dispatch_id", id);

    // Then delete the dispatch
    const { error } = await supabase.from("dispatches").delete().eq("id", id);
    if (error) throw error;

    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Add a note to a dispatch
 */
export const addDispatchNote = async (
  dispatchId: string,
  userId: string,
  note: string,
) => {
  try {
    const { data, error } = await supabase
      .from("dispatch_notes")
      .insert([
        {
          dispatch_id: dispatchId,
          user_id: userId,
          note,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { note: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get notes for a dispatch
 */
export const getDispatchNotes = async (dispatchId: string) => {
  try {
    const { data, error } = await supabase
      .from("dispatch_notes")
      .select(
        `
        *,
        user:user_id(id, full_name, avatar_url)
      `,
      )
      .eq("dispatch_id", dispatchId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { notes: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get dispatch history
 */
export const getDispatchHistory = async (dispatchId: string) => {
  try {
    const { data, error } = await supabase
      .from("dispatch_history")
      .select(
        `
        *,
        user:user_id(id, full_name, avatar_url)
      `,
      )
      .eq("dispatch_id", dispatchId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { history: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
};
