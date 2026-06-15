# 都城・三股・曽於 職人マッチング（MVP）

Next.js + TypeScript + Supabase + Vercelで作った地域職人マッチングのMVPです。

## セットアップ手順
1. Node.js 20+ をインストール
2. 依存関係をインストール
   ```bash
   npm install
   ```
3. `.env.example` を `.env.local` にコピーして値を設定
4. Supabase SQL Editorで `supabase/schema.sql` を実行
5. Supabase Storageで `request-photos` バケットを作成（公開）


## 試作品として画面で試す方法
SupabaseやVercelの設定がなくても、`npm run dev` で依頼フォーム送信と管理画面反映を試せます。
送信内容はローカルの `.data/requests.json` に保存されます。

1. `npm install`
2. `npm run dev`
3. `http://localhost:3000/request` から依頼を送信
4. `http://localhost:3000/admin/requests` で送信内容を確認

## Supabaseの環境変数
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`（Vercel本番環境で依頼保存・管理画面取得をサーバー側で行うために設定推奨）
- `NEXT_PUBLIC_LINE_OFFICIAL_URL`

## 必要なテーブル
- `requests`
- `craftsmen`

詳細なDDLは `supabase/schema.sql` を参照してください。

## ローカル起動方法
```bash
npm run dev
```
`http://localhost:3000`

## Vercelデプロイ方法
1. GitHubにpush
2. VercelでプロジェクトImport
3. 環境変数をVercelに設定（特に `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`、`SUPABASE_SERVICE_ROLE_KEY`）
4. Supabase Storage の `request-photos` バケットが公開で作成済みであることを確認
5. Deploy
6. `/request` から送信し、`/admin/requests` に即時反映されることを確認

## 今後追加すべき機能
- 管理者ログイン（Supabase Auth）
- 通知連携（LINE通知/Webhook）
- 職人向けの簡易応答画面
- CSV出力
- ステータス変更履歴
- 画像圧縮とEXIF削除
- RLSポリシー設計
