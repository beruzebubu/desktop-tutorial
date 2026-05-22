import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { CraftsmanRow } from "@/lib/types";

export default async function CraftsmenPage(){
  const { data } = supabase ? await supabase.from("craftsmen").select("*").order("created_at", { ascending: false }) : { data: [] as CraftsmanRow[] };
  const rows = (data || []) as CraftsmanRow[];
  return <section className="card"><h1>職人一覧</h1><Link className="btn" href="/admin/craftsmen/new">職人を登録</Link><table><thead><tr><th>職人名</th><th>屋号</th><th>電話番号</th><th>対応カテゴリ</th><th>対応エリア</th><th>稼働状況</th><th></th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.name}</td><td>{r.business_name}</td><td>{r.phone}</td><td>{r.categories.join("、")}</td><td>{r.areas.join("、")}</td><td>{r.availability_status}</td><td><Link className="btn" href={`/admin/craftsmen/${r.id}`}>詳細を見る</Link></td></tr>)}</tbody></table></section>;
}
