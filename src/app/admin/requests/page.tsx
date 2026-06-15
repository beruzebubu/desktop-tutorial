import Link from "next/link";
import { listLocalRequests } from "@/lib/request-store";
import { supabaseServer } from "@/lib/supabase-server";
import { RequestRow } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminRequestsPage() {
  const { data, error } = supabaseServer
    ? await supabaseServer.from("requests").select("*").order("created_at", { ascending: false })
    : { data: await listLocalRequests(), error: null };
  const rows = (data || []) as RequestRow[];

  return (
    <section className="card">
      <h1>依頼一覧</h1>
      {error && <p className="small">依頼一覧の取得に失敗しました: {error.message}</p>}
      {!error && rows.length === 0 && <p className="small">まだ依頼はありません。</p>}
      <table>
        <thead>
          <tr><th>依頼日時</th><th>名前</th><th>電話番号</th><th>エリア</th><th>カテゴリ</th><th>希望時期</th><th>ステータス</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map((request) => (
            <tr key={request.id}>
              <td>{new Date(request.created_at).toLocaleString("ja-JP")}</td>
              <td>{request.customer_name}</td>
              <td>{request.phone}</td>
              <td>{request.area}</td>
              <td>{request.category}</td>
              <td>{request.preferred_timing}</td>
              <td>{request.status}</td>
              <td><Link className="btn" href={`/admin/requests/${request.id}`}>詳細を見る</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
