# 技術スタック — hitokoto-keihi

**Project**: hitokoto-keihi
**Last Updated**: 2026-02-18
**Version**: 0.1.0

---

## 概要

React + TypeScript + Vite による PWA（Progressive Web App）。
ユーザーの端末内で完結し、サーバー送信ゼロのプライバシーファーストな設計。

---

## プライマリ技術

### 言語・ランタイム

| 技術 | バージョン | 役割 |
|------|-----------|------|
| TypeScript | 5.2+ | 全コード（型安全） |
| React | 18.2 | UIライブラリ |
| Vite | 5.0 | ビルドツール・開発サーバー |

### スタイリング

| 技術 | バージョン | 役割 |
|------|-----------|------|
| Tailwind CSS | 3.4 | ユーティリティファーストCSS |
| PostCSS | 8.4 | CSS変換 |

### データ可視化

| 技術 | バージョン | 役割 |
|------|-----------|------|
| Chart.js | 4.4 | グラフ描画 |
| react-chartjs-2 | 5.2 | Chart.jsのReactラッパー |

---

## ストレージ

- **LocalStorage**: 経費データの永続化（サーバー不使用）
- 最大5,000件の経費レコードを保存可能
- キーバリュー形式でJSON文字列として保持

---

## PWA機能

- **Service Worker**: オフライン対応・キャッシュ制御
- **Web App Manifest** (`public/manifest.json`): ホーム画面追加対応
- **Web Speech API**: ブラウザ内蔵音声認識

---

## デプロイ

- **ターゲット**: Cloudflare Pages（無料）
- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `dist/`

---

## ビルド設定

```
vite.config.ts → @vitejs/plugin-react
tsconfig.json → strict mode
postcss.config.js → autoprefixer + tailwindcss
```

---

## 主要コマンド

```bash
npm run dev      # 開発サーバー (localhost:5173)
npm run build    # TypeScript コンパイル + Viteビルド
npm run preview  # ビルド結果プレビュー
```
