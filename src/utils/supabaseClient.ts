import { createClient } from "@supabase/supabase-js"


const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL as string
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY as string

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing environment variables for Supabase")
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase
