import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function CraftsmanDetail({ params }: { params: Promise<{ id: string }>}){
  const { id } = await params;
  const { data } = supabase ? await supabase.from("craftsmen").select("*").eq("id", id).single() : { data: null };
  if(!data) return notFound();
  return <section className="card"><h1>{data.name}</h1><p>屋号: {data.business_name}</p><p>電話: {data.phone}</p><p>エリア: {data.areas.join("、")}</p><p>カテゴリ: {data.categories.join("、")}</p><p>稼働状況: {data.availability_status}</p><p>メモ: {data.memo || "なし"}</p></section>
}
