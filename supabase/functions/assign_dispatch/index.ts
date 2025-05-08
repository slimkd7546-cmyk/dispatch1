import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the request body
    const { dispatchId, officerId, truckId, userId } = await req.json();

    // Validate required fields
    if (!dispatchId || !officerId) {
      return new Response(
        JSON.stringify({ error: 'Dispatch ID and officer ID are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get the current dispatch status
    const { data: currentDispatch, error: fetchError } = await supabaseClient
      .from('dispatches')
      .select('status')
      .eq('id', dispatchId)
      .single();

    if (fetchError) throw fetchError;

    const previousStatus = currentDispatch.status;

    // Update the dispatch in the database
    const { data, error } = await supabaseClient
      .from('dispatches')
      .update({
        assigned_to: officerId,
        truck_id: truckId,
        status: 'in-progress',
        updated_at: new Date().toISOString(),
      })
      .eq('id', dispatchId)
      .select()
      .single();

    if (error) throw error;

    // Add to dispatch history
    if (previousStatus !== 'in-progress') {
      await supabaseClient.from('dispatch_history').insert([
        {
          dispatch_id: dispatchId,
          user_id: userId,
          previous_status: previousStatus,
          new_status: 'in-progress',
        },
      ]);
    }

    // If a truck is assigned, update its status
    if (truckId) {
      await supabaseClient
        .from('trucks')
        .update({
          status: 'on_route',
          updated_at: new Date().toISOString(),
        })
        .eq('id', tr