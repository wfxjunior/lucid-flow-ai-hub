
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tvdromfazjzargvesruq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZHJvbWZhemp6YXJndmVzcnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0OTkxMzAsImV4cCI6MjA2NDA3NTEzMH0.o2qM4KTfXwPia6lViwz4rrX4uh_ovMQ7BCtPIZIBoX8'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})
