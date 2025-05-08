import { supabase, handleSupabaseError } from "@/lib/supabase";

export type ContragentType = "carrier" | "customer" | "facility" | "factoring";
export type ContragentStatus = "active" | "inactive" | "pending";

export interface Contragent {
  id: string;
  name: string;
  type: ContragentType;
  logo?: string;
  contact?: string;
  phone?: string;
  email?: string;
  location?: string;
  status: ContragentStatus;
  createdAt: string;
  updatedAt: string;

  // Carrier-specific fields
  fleetSize?: number;
  rating?: number;
  lastDelivery?: string;

  // Customer-specific fields
  totalOrders?: number;
  lastOrder?: string;
  accountValue?: string;

  // Facility-specific fields
  facilityType?: string;
  capacity?: string;
  dockDoors?: number;

  // Factoring-specific fields
  clientCount?: number;
  averageRate?: string;
  paymentTerms?: string;
}

/**
 * Get all contragents
 */
export const getAllContragents = async () => {
  try {
    const { data, error } = await supabase
      .from("contragents")
      .select("*")
      .order("name");

    if (error) throw error;

    // Transform the data to match the frontend model
    const contragents: Contragent[] = data.map((contragent) => ({
      id: contragent.id,
      name: contragent.name,
      type: contragent.type as ContragentType,
      logo: contragent.logo,
      contact: contragent.contact,
      phone: contragent.phone,
      email: contragent.email,
      location: contragent.location,
      status: contragent.status as ContragentStatus,
      createdAt: contragent.created_at,
      updatedAt: contragent.updated_at,

      // Carrier-specific fields
      fleetSize: contragent.fleet_size,
      rating: contragent.rating,
      lastDelivery: contragent.last_delivery,

      // Customer-specific fields
      totalOrders: contragent.total_orders,
      lastOrder: contragent.last_order,
      accountValue: contragent.account_value,

      // Facility-specific fields
      facilityType: contragent.facility_type,
      capacity: contragent.capacity,
      dockDoors: contragent.dock_doors,

      // Factoring-specific fields
      clientCount: contragent.client_count,
      averageRate: contragent.average_rate,
      paymentTerms: contragent.payment_terms,
    }));

    return { contragents };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get contragents by type
 */
export const getContragentsByType = async (type: ContragentType) => {
  try {
    const { data, error } = await supabase
      .from("contragents")
      .select("*")
      .eq("type", type)
      .order("name");

    if (error) throw error;

    const contragents: Contragent[] = data.map((contragent) => ({
      id: contragent.id,
      name: contragent.name,
      type: contragent.type as ContragentType,
      logo: contragent.logo,
      contact: contragent.contact,
      phone: contragent.phone,
      email: contragent.email,
      location: contragent.location,
      status: contragent.status as ContragentStatus,
      createdAt: contragent.created_at,
      updatedAt: contragent.updated_at,

      // Type-specific fields
      fleetSize: contragent.fleet_size,
      rating: contragent.rating,
      lastDelivery: contragent.last_delivery,
      totalOrders: contragent.total_orders,
      lastOrder: contragent.last_order,
      accountValue: contragent.account_value,
      facilityType: contragent.facility_type,
      capacity: contragent.capacity,
      dockDoors: contragent.dock_doors,
      clientCount: contragent.client_count,
      averageRate: contragent.average_rate,
      paymentTerms: contragent.payment_terms,
    }));

    return { contragents };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get contragent by ID
 */
export const getContragentById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("contragents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    const contragent: Contragent = {
      id: data.id,
      name: data.name,
      type: data.type as ContragentType,
      logo: data.logo,
      contact: data.contact,
      phone: data.phone,
      email: data.email,
      location: data.location,
      status: data.status as ContragentStatus,
      createdAt: data.created_at,
      updatedAt: data.updated_at,

      // Type-specific fields
      fleetSize: data.fleet_size,
      rating: data.rating,
      lastDelivery: data.last_delivery,
      totalOrders: data.total_orders,
      lastOrder: data.last_order,
      accountValue: data.account_value,
      facilityType: data.facility_type,
      capacity: data.capacity,
      dockDoors: data.dock_doors,
      clientCount: data.client_count,
      averageRate: data.average_rate,
      paymentTerms: data.payment_terms,
    };

    return { contragent };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Create a new contragent
 */
export const createContragent = async (
  contragentData: Omit<Contragent, "createdAt" | "updatedAt">,
) => {
  try {
    const { data, error } = await supabase
      .from("contragents")
      .insert([
        {
          id: contragentData.id,
          name: contragentData.name,
          type: contragentData.type,
          logo: contragentData.logo,
          contact: contragentData.contact,
          phone: contragentData.phone,
          email: contragentData.email,
          location: contragentData.location,
          status: contragentData.status,

          // Type-specific fields
          fleet_size: contragentData.fleetSize,
          rating: contragentData.rating,
          last_delivery: contragentData.lastDelivery,
          total_orders: contragentData.totalOrders,
          last_order: contragentData.lastOrder,
          account_value: contragentData.accountValue,
          facility_type: contragentData.facilityType,
          capacity: contragentData.capacity,
          dock_doors: contragentData.dockDoors,
          client_count: contragentData.clientCount,
          average_rate: contragentData.averageRate,
          payment_terms: contragentData.paymentTerms,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      contragent: {
        id: data.id,
        name: data.name,
        type: data.type as ContragentType,
        logo: data.logo,
        contact: data.contact,
        phone: data.phone,
        email: data.email,
        location: data.location,
        status: data.status as ContragentStatus,
        createdAt: data.created_at,
        updatedAt: data.updated_at,

        // Type-specific fields
        fleetSize: data.fleet_size,
        rating: data.rating,
        lastDelivery: data.last_delivery,
        totalOrders: data.total_orders,
        lastOrder: data.last_order,
        accountValue: data.account_value,
        facilityType: data.facility_type,
        capacity: data.capacity,
        dockDoors: data.dock_doors,
        clientCount: data.client_count,
        averageRate: data.average_rate,
        paymentTerms: data.payment_terms,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Update a contragent
 */
export const updateContragent = async (
  id: string,
  updates: Partial<Omit<Contragent, "id" | "createdAt" | "updatedAt">>,
) => {
  try {
    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.type !== undefined) updateData.type = updates.type;
    if (updates.logo !== undefined) updateData.logo = updates.logo;
    if (updates.contact !== undefined) updateData.contact = updates.contact;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.location !== undefined) updateData.location = updates.location;
    if (updates.status !== undefined) updateData.status = updates.status;

    // Type-specific fields
    if (updates.fleetSize !== undefined)
      updateData.fleet_size = updates.fleetSize;
    if (updates.rating !== undefined) updateData.rating = updates.rating;
    if (updates.lastDelivery !== undefined)
      updateData.last_delivery = updates.lastDelivery;
    if (updates.totalOrders !== undefined)
      updateData.total_orders = updates.totalOrders;
    if (updates.lastOrder !== undefined)
      updateData.last_order = updates.lastOrder;
    if (updates.accountValue !== undefined)
      updateData.account_value = updates.accountValue;
    if (updates.facilityType !== undefined)
      updateData.facility_type = updates.facilityType;
    if (updates.capacity !== undefined) updateData.capacity = updates.capacity;
    if (updates.dockDoors !== undefined)
      updateData.dock_doors = updates.dockDoors;
    if (updates.clientCount !== undefined)
      updateData.client_count = updates.clientCount;
    if (updates.averageRate !== undefined)
      updateData.average_rate = updates.averageRate;
    if (updates.paymentTerms !== undefined)
      updateData.payment_terms = updates.paymentTerms;

    const { data, error } = await supabase
      .from("contragents")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      contragent: {
        id: data.id,
        name: data.name,
        type: data.type as ContragentType,
        logo: data.logo,
        contact: data.contact,
        phone: data.phone,
        email: data.email,
        location: data.location,
        status: data.status as ContragentStatus,
        createdAt: data.created_at,
        updatedAt: data.updated_at,

        // Type-specific fields
        fleetSize: data.fleet_size,
        rating: data.rating,
        lastDelivery: data.last_delivery,
        totalOrders: data.total_orders,
        lastOrder: data.last_order,
        accountValue: data.account_value,
        facilityType: data.facility_type,
        capacity: data.capacity,
        dockDoors: data.dock_doors,
        clientCount: data.client_count,
        averageRate: data.average_rate,
        paymentTerms: data.payment_terms,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Delete a contragent
 */
export const deleteContragent = async (id: string) => {
  try {
    const { error } = await supabase.from("contragents").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
};
