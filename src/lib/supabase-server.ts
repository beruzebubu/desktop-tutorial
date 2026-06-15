import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serverKey = serviceRoleKey || anonKey;

export const supabaseServer = url && serverKey ? createClient(url, serverKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
}) : null;
