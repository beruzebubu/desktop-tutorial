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

## Supabaseの環境変数
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`（将来の管理処理向け）
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
3. 環境変数をVercelに設定
4. Deploy

## 今後追加すべき機能
- 管理者ログイン（Supabase Auth）
- 通知連携（LINE通知/Webhook）
- 職人向けの簡易応答画面
- CSV出力
- ステータス変更履歴
- 画像圧縮とEXIF削除
- RLSポリシー設計
