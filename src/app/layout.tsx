import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className="container" style={{ paddingBottom: 0 }}>
          <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/"><strong>都城・三股・曽於 職人マッチング</strong></Link>
            <nav style={{ display: "flex", gap: 12 }}>
              <Link href="/request">依頼フォーム</Link>
              <Link href="/admin/requests">管理画面</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
