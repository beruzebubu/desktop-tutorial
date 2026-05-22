import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CraftsmanRow, RequestRow } from "@/lib/types";
import { STATUSES } from "@/lib/constants";

async function updateRequest(formData: FormData) {
  "use server";
  if (!supabase) return;
  await supabase.from("requests").update({ status: formData.get("status"), admin_memo: formData.get("admin_memo"), assigned_craftsman_id: formData.get("assigned_craftsman_id") || null }).eq("id", formData.get("id"));
}

export default async function RequestDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [{ data: request }, { data: craftsmen }] = await Promise.all([
    supabase?.from("requests").select("*").eq("id", id).single() || Promise.resolve({ data: null }),
    supabase?.from("craftsmen").select("*") || Promise.resolve({ data: [] })
  ]);
  if (!request) return notFound();
  const req = request as RequestRow;
  const workers = (craftsmen || []) as CraftsmanRow[];
  return <section className="card"><h1>依頼詳細</h1><p>{req.customer_name} / {req.phone} / {req.area}</p><p>{req.description}</p><div className="grid grid-2">{(req.photo_urls || []).map((u)=> <Image key={u} src={u} alt="依頼写真" width={300} height={200} />)}</div>
  <form action={updateRequest} className="grid"><input type="hidden" name="id" value={req.id}/><label>ステータス<select name="status" defaultValue={req.status}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label><label>担当職人<select name="assigned_craftsman_id" defaultValue={req.assigned_craftsman_id || ""}><option value="">未選択</option>{workers.map(w=><option key={w.id} value={w.id}>{w.name}（{w.business_name}）</option>)}</select></label><label>管理メモ<textarea name="admin_memo" rows={4} defaultValue={req.admin_memo || ""}/></label><button className="btn">更新</button></form></section>;
}
