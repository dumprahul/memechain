import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getMemesByCreator(
  created_by: string
): Promise<{ success: boolean; data: any }> {
  try {
    let { data: memes, error } = await supabase
      .from("memes")
      .select(`id,image`)
      .eq("created_by", created_by);
    console.log(memes);
    if (memes == null || memes?.length == 0)
      return { success: false, data: "Meme not found" };
    else
      return {
        success: true,
        data: memes
      };
  } catch (e) {
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
