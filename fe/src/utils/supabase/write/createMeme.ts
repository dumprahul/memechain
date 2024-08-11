import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function createMeme(
  categoryId: string,
  templateId: string,
  image: string,
  createdBy: string
): Promise<{ success: boolean; data: any }> {
  try {
    const { data: meme, error } = await supabase
    .from("memes")
    .insert([{
        created_by: createdBy, image, template: templateId, category: categoryId
    }])
    .select();

  if (meme == null) return { success: false, data: "Game not found" };
  else {
    return {
      success: true,
      data: meme[0],
    };
  }
  } catch (e) {
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
