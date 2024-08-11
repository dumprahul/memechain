import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getFrameData(
  memeId: string
): Promise<{ success: boolean; data: any }> {
  try {
    let { data: meme, error } = await supabase
      .from("memes")
      .select(`*,
      created_by (
        name,
        image
      )`)
      .eq("id", memeId);
    console.log(meme);
    if (meme == null || meme?.length == 0)
      return { success: false, data: "Meme not found" };
    else
      return {
        success: true,
        data: meme[0],
      };
  } catch (e) {
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}