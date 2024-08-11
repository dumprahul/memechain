import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function createCategory(
  label: string,
  tokenAddress: string,
  metadata: string
): Promise<{ success: boolean; data: any }> {
  try {
    const { data: category, error } = await supabase
    .from("category")
    .insert([{
        label, token_address: tokenAddress, metadata
    }])
    .select();

  if (category == null) return { success: false, data: "Game not found" };
  else {
    return {
      success: true,
      data: category[0],
    };
  }
  } catch (e) {
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
