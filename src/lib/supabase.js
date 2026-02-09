import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qttprdhcxnmohupjeoej.supabase.co'
// Using service_role key as requested by user for this specific use case (backend-less persistence)
// WARNING: In a production environment with sensitive user data, this key should strictly be backend-only.
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dHByZGhjeG5tb2h1cGplb2VqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDY0MTkxMywiZXhwIjoyMDg2MjE3OTEzfQ.7amXEs9A2zsgVgNNJTSdKcHtwV5rPxVkQ-3M0xiU9jI'

export const supabase = createClient(supabaseUrl, supabaseKey)
