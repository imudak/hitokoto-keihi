# CLAUDE.md - P-18 ひとこと経費記録PWA

## MUSUBI SDD

このプロジェクトは **MUSUBI**（Ultimate Specification Driven Development）を採用。

- `/sdd-requirements <feature>` - EARS要件定義
- `/sdd-design <feature>` - C4 + ADR 設計
- `/sdd-tasks <feature>` - タスク分解
- `/sdd-implement <feature>` - 実装実行
- `/sdd-validate <feature>` - 憲法準拠検証

**ステアリング文書**
- `steering/product.ja.md` - プロダクトコンテキスト
- `steering/tech.ja.md` - 技術スタック
- `steering/structure.ja.md` - アーキテクチャ
- `steering/project.yml` - プロジェクト設定
- `steering/rules/constitution.md` - 9つの憲法条項

## プロジェクト情報

- **百式page_id:** 3041aeb6-4b1d-81b7-b9dd-ec8719205aa1
- **プロジェクト名:** ひとこと経費記録PWA (hitokoto-keihi)
- **カテゴリ:** アプリ
- **概要:** 一言入力で経費を記録できる超シンプルPWA

## コンセプト

フリーランス・個人事業主向けに、経費記録の心理的ハードルを極限まで下げたPWA。

**従来の問題点:**
- 会計アプリは機能過多で重い
- レシート撮影・仕訳入力が面倒
- 後回しにして記録漏れ

**本アプリの解決策:**
- 音声/テキストで「コンビニ 450円 昼食」のような一言入力
- PWAで即起動、オフラインでも記録可能
- カテゴリ自動推定でストレスゼロ
- 月次サマリーで支出を可視化

## 技術スタック

- **フロントエンド:** React + TypeScript + Vite
- **UI:** Tailwind CSS
- **ストレージ:** LocalStorage (シンプル・オフライン対応)
- **音声認識:** Web Speech API
- **デプロイ:** Cloudflare Pages (無料)

## MVP仕様

### 機能要件

1. **経費記録（一言入力）**
   - テキスト入力: 「コンビニ 450円 昼食」
   - 音声入力: Web Speech API使用
   - パース: 場所/金額/メモを自動抽出
   - カテゴリ自動推定（食費/交通費/通信費等）

2. **記録一覧表示**
   - 日付降順でリスト表示
   - 編集・削除機能
   - フィルター（カテゴリ別）

3. **月次サマリー**
   - 月別合計金額
   - カテゴリ別円グラフ
   - 前月比較

4. **データエクスポート**
   - CSV形式（会計ソフト取込用）
   - PDF形式（提出用）

5. **PWA機能**
   - Service Worker
   - オフライン対応
   - ホーム画面追加
   - プッシュ通知（将来）

### 非機能要件

- **パフォーマンス:** 初回ロード3秒以内
- **データ:** LocalStorageで5000件まで保存可能
- **プライバシー:** データは端末内のみ（サーバー送信なし）
- **ブラウザ:** Chrome/Safari/Firefox最新版

## ディレクトリ構成

```
hitokoto-keihi/
├── src/
│   ├── components/         # React コンポーネント
│   │   ├── ExpenseForm.tsx    # 入力フォーム
│   │   ├── ExpenseList.tsx    # 記録一覧
│   │   ├── MonthlySummary.tsx # 月次サマリー
│   │   └── VoiceInput.tsx     # 音声入力
│   ├── utils/              # ユーティリティ
│   │   ├── parser.ts          # 一言入力パーサー
│   │   ├── categoryInference.ts # カテゴリ推定
│   │   ├── storage.ts         # LocalStorage操作
│   │   └── export.ts          # CSV/PDFエクスポート
│   ├── types/              # TypeScript型定義
│   │   └── expense.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── manifest.json
│   ├── sw.js               # Service Worker
│   └── icons/              # PWAアイコン
├── steering/
│   └── product.ja.md       # プロダクト要件定義
├── vite.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 開発フロー

### MVP Phase 1 (最小機能)
1. ✅ プロジェクトセットアップ (Vite + React + TypeScript)
2. ✅ 一言入力パーサー実装
3. ✅ LocalStorage CRUD実装
4. ✅ 入力フォーム + 一覧表示
5. ✅ カテゴリ自動推定
6. ⏳ 音声入力対応

### MVP Phase 2 (サマリー・エクスポート)
1. 月次サマリー表示
2. CSVエクスポート
3. PDFエクスポート

### MVP Phase 3 (PWA化)
1. Service Worker実装
2. manifest.json設定
3. オフライン対応
4. ホーム画面追加テスト

### デプロイ Phase 4
1. Cloudflare Pages設定
2. カスタムドメイン設定（オプション）
3. 本番公開

## 作業ルール

- **完了報告時:** work-protocol.mdに従って百式DB更新
- **ステータス変更:** 企画中 → 開発中 → imudak待ち（必要時）→ 公開済
- **imudak操作が必要な場合:** TODO作成・紐付け必須

## 次のアクション
- 動作レビュー → フィードバック


## Git Push ルール

作業完了時は必ず `jj git push` を実行すること。
- MUSUBIの各ステップ完了時
- 機能実装完了時
- steering files 更新時
