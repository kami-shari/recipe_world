import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseAnonKey) {
    throw new Error("Please provide key in your env");
}

export const supabase = createClient<Database>(supabaseURL, supabaseAnonKey);