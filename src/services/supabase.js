import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://jlydwvoekcdtlpvslarc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpseWR3dm9la2NkdGxwdnNsYXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NjkzNzMsImV4cCI6MjA1NjA0NTM3M30.OUQkVoS4anq1Bc8bVHnYwHIjFPRnjga1xac1xfyIdEg"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;