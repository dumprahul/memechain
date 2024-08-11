import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getProfile(
  memeId: string
): Promise<{ success: boolean; data: any }> {
  try {
    let { data: profile, error } = await supabase
      .from("profile")
      .select(
        `*`
      )
      .eq("id", memeId);
    console.log(profile);
    if (profile == null || profile?.length == 0)
      return { success: false, data: "Meme not found" };
    else
      return {
        success: true,
        data: profile[0],
      };
  } catch (e) {
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
