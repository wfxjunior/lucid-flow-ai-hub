-- Create files table for FileManager metadata
CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  folder_id UUID,
  name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_url TEXT NOT NULL,
  description TEXT,
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own files" ON public.files;
CREATE POLICY "Users can view own files" ON public.files FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own files" ON public.files;
CREATE POLICY "Users can insert own files" ON public.files FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own files" ON public.files;
CREATE POLICY "Users can update own files" ON public.files FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own files" ON public.files;
CREATE POLICY "Users can delete own files" ON public.files FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_files_updated_at ON public.files;
CREATE TRIGGER update_files_updated_at BEFORE UPDATE ON public.files FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_files_user_id ON public.files(user_id);
CREATE INDEX IF NOT EXISTS idx_files_folder_id ON public.files(folder_id);
CREATE INDEX IF NOT EXISTS idx_files_created_at ON public.files(created_at DESC);

-- Create car_rentals table for Car Rental feature
CREATE TABLE IF NOT EXISTS public.car_rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  vehicle_id UUID NOT NULL,
  renter_name TEXT NOT NULL,
  rental_start_date TIMESTAMPTZ NOT NULL,
  rental_end_date TIMESTAMPTZ NOT NULL,
  pickup_location TEXT NOT NULL,
  return_location TEXT NOT NULL,
  pickup_time TEXT,
  return_time TEXT,
  fuel_level_pickup NUMERIC,
  fuel_level_return NUMERIC,
  initial_mileage INTEGER,
  final_mileage INTEGER,
  total_price NUMERIC NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  rental_status TEXT NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.car_rentals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own car rentals" ON public.car_rentals;
CREATE POLICY "Users can view own car rentals" ON public.car_rentals FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own car rentals" ON public.car_rentals;
CREATE POLICY "Users can insert own car rentals" ON public.car_rentals FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own car rentals" ON public.car_rentals;
CREATE POLICY "Users can update own car rentals" ON public.car_rentals FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own car rentals" ON public.car_rentals;
CREATE POLICY "Users can delete own car rentals" ON public.car_rentals FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_car_rentals_updated_at ON public.car_rentals;
CREATE TRIGGER update_car_rentals_updated_at BEFORE UPDATE ON public.car_rentals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_car_rentals_user_id ON public.car_rentals(user_id);
CREATE INDEX IF NOT EXISTS idx_car_rentals_vehicle_id ON public.car_rentals(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_car_rentals_start_date ON public.car_rentals(rental_start_date DESC);
