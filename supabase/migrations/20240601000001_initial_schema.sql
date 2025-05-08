-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'dispatcher', 'officer', 'reviewer', 'connect', 'driver')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create trucks table
CREATE TABLE IF NOT EXISTS public.trucks (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'on_route', 'maintenance', 'offline')),
  driver_id UUID REFERENCES public.users(id),
  location TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  fuel_level INTEGER,
  mileage INTEGER,
  next_maintenance DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create dispatches table
CREATE TABLE IF NOT EXISTS public.dispatches (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  assigned_to UUID REFERENCES public.users(id),
  truck_id TEXT REFERENCES public.trucks(id),
  pickup_time TIMESTAMP WITH TIME ZONE,
  delivery_time TIMESTAMP WITH TIME ZONE,
  distance INTEGER,
  weight INTEGER,
  reference TEXT,
  vehicle_type TEXT,
  created_by UUID REFERENCES public.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create dispatch_notes table
CREATE TABLE IF NOT EXISTS public.dispatch_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dispatch_id TEXT REFERENCES public.dispatches(id) NOT NULL,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create dispatch_history table for tracking status changes
CREATE TABLE IF NOT EXISTS public.dispatch_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dispatch_id TEXT REFERENCES public.dispatches(id) NOT NULL,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create contragents table
CREATE TABLE IF NOT EXISTS public.contragents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('carrier', 'customer', 'facility', 'factoring')),
  logo TEXT,
  contact TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add carrier-specific fields
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS fleet_size INTEGER;
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS rating DECIMAL;
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS last_delivery TEXT;

-- Add customer-specific fields
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS total_orders INTEGER;
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS last_order TEXT;
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS account_value TEXT;

-- Add facility-specific fields
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS facility_type TEXT;
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS capacity TEXT;
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS dock_doors INTEGER;

-- Add factoring-specific fields
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS client_count INTEGER;
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS average_rate TEXT;
ALTER TABLE public.contragents ADD COLUMN IF NOT EXISTS payment_terms TEXT;

-- Enable realtime for all tables
alter publication supabase_realtime add table public.users;
alter publication supabase_realtime add table public.trucks;
alter publication supabase_realtime add table public.dispatches;
alter publication supabase_realtime add table public.dispatch_notes;
alter publication supabase_realtime add table public.dispatch_history;
alter publication supabase_realtime add table public.contragents;

-- Create basic policies
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
CREATE POLICY "Users can view their own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Dispatchers can view all trucks" ON public.trucks;
CREATE POLICY "Dispatchers can view all trucks"
  ON public.trucks
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'dispatcher')));

DROP POLICY IF EXISTS "Drivers can view assigned trucks" ON public.trucks;
CREATE POLICY "Drivers can view assigned trucks"
  ON public.trucks
  FOR SELECT
  USING (driver_id = auth.uid());

DROP POLICY IF EXISTS "Dispatchers can view all dispatches" ON public.dispatches;
CREATE POLICY "Dispatchers can view all dispatches"
  ON public.dispatches
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'dispatcher', 'reviewer')));

DROP POLICY IF EXISTS "Officers can view assigned dispatches" ON public.dispatches;
CREATE POLICY "Officers can view assigned dispatches"
  ON public.dispatches
  FOR SELECT
  USING (assigned_to = auth.uid());
