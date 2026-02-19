# プロジェクト構造 — hitokoto-keihi

**Project**: hitokoto-keihi
**Last Updated**: 2026-02-18
**Version**: 0.1.0

---

## アーキテクチャパターン

**パターン**: シングルページアプリケーション（SPA）+ PWA

Vite + React による CSR（Client-Side Rendering）。
全データ処理はブラウザ内で完結（LocalStorage + Web Speech API + Canvas API）。

---

## ディレクトリ構成

```
hitokoto-keihi/
├── src/
│   ├── components/              # React コンポーネント
│   │   ├── ExpenseForm.tsx      # 一言入力フォーム（テキスト/音声）
│   │   ├── ExpenseList.tsx      # 経費一覧（日付降順・フィルター付き）
│   │   ├── MonthlySummary.tsx   # 月次サマリー（Chart.js円グラフ）
│   │   └── VoiceInput.tsx       # Web Speech API音声入力
│   ├── utils/                   # ユーティリティ
│   │   ├── parser.ts            # 一言入力パーサー（金額・場所・メモ抽出）
│   │   ├── categoryInference.ts # カテゴリ自動推定（食費/交通費/通信費等）
│   │   ├── storage.ts           # LocalStorage CRUD操作
│   │   └── export.ts            # CSV/PDFエクスポート
│   ├── types/                   # TypeScript型定義
│   │   └── expense.ts           # Expense型
│   ├── App.tsx                  # ルートコンポーネント
│   ├── main.tsx                 # エントリーポイント
│   └── index.css                # グローバルスタイル
├── public/
│   ├── manifest.json            # PWAマニフェスト
│   ├── sw.js                    # Service Worker
│   └── icons/                   # PWAアイコン各サイズ
├── steering/                    # MUSUBIステアリング文書
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## データフロー

```
ユーザー入力（テキスト/音声）
    ↓
parser.ts（金額・場所・メモ抽出）
    ↓
categoryInference.ts（カテゴリ自動推定）
    ↓
storage.ts（LocalStorage保存）
    ↓
ExpenseList / MonthlySummary（表示・集計）
    ↓
export.ts（CSV/PDF出力）
```

---

## 状態管理

- **ローカル状態**: React `useState` / `useEffect`
- **永続化**: LocalStorage（`hitokoto-keihi-expenses` キー）
- 外部状態管理ライブラリは不使用（シンプルさ優先）

---

## コンポーネント設計方針

- コンポーネントは `src/components/` に集約
- ロジックは `src/utils/` に分離（コンポーネントは表示に専念）
- 型定義は `src/types/` に集約（再利用性を確保）
