import Link from "next/link";
import { AREAS, REQUEST_CATEGORIES } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="grid">
      <section className="card">
        <h1>都城・三股・曽於 職人マッチング</h1>
        <p>地域の小さな困りごとを、信頼できる地域職人へつなぎます。まずは写真と内容を送るだけでOKです。</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" href="/request">写真を送って相談する</Link>
          <a className="btn secondary" href={process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || "#"}>LINE公式で相談</a>
        </div>
      </section>
      <section className="card"><h2>対象エリア</h2><ul>{AREAS.map((a) => <li key={a}>{a}</li>)}</ul></section>
      <section className="card"><h2>対応カテゴリ</h2><ul>{REQUEST_CATEGORIES.slice(0,5).map((c) => <li key={c}>{c}</li>)}</ul></section>
      <section className="card"><h2>参考価格</h2><ul><li>草刈り：8,000円〜</li><li>庭木剪定：10,000円〜</li><li>波板交換：4,000円〜</li><li>外構小修理：要相談</li><li>塗装相談：無料相談〜</li></ul><p className="small">正式な料金は現地状況・作業内容により変わります。</p></section>
    </div>
  );
}
