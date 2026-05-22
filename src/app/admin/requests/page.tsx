import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { RequestRow } from "@/lib/types";

export default async function AdminRequestsPage() {
  const { data } = supabase ? await supabase.from("requests").select("*").order("created_at", { ascending: false }) : { data: [] as RequestRow[] };
  const rows = (data || []) as RequestRow[];
  return <section className="card"><h1>依頼一覧</h1><table><thead><tr><th>依頼日時</th><th>名前</th><th>電話番号</th><th>エリア</th><th>カテゴリ</th><th>希望時期</th><th>ステータス</th><th></th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{new Date(r.created_at).toLocaleString("ja-JP")}</td><td>{r.customer_name}</td><td>{r.phone}</td><td>{r.area}</td><td>{r.category}</td><td>{r.preferred_timing}</td><td>{r.status}</td><td><Link className="btn" href={`/admin/requests/${r.id}`}>詳細を見る</Link></td></tr>)}</tbody></table></section>;
}
