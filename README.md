# CloudEdit - Cloudinary画像編集Webアプリ

<div align="center">
  <h3>🎨 Powerful Image Editing with Cloudinary</h3>
  <p>React + Express + TypeScript による本格的な画像編集Webアプリケーション</p>
  <br>
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express" />
  <img src="https://img.shields.io/badge/Cloudinary-API-3448C5?style=flat-square&logo=cloudinary" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css" />
</div>

## ✨ 主な機能

- 📤 **画像アップロード** - ドラッグ&ドロップ対応
- ✂️ **リサイズ・クロップ** - 柔軟なサイズ調整
- 🎨 **フィルター・エフェクト** - 豊富な画像加工オプション
- 🖼️ **背景削除** - AI による自動背景削除
- 🔄 **回転・反転** - 画像の向き調整
- 📝 **テキスト追加** - カスタマイズ可能なテキストオーバーレイ
- 👁️ **リアルタイムプレビュー** - 即座に編集結果を確認
- 💾 **ダウンロード** - 複数フォーマット対応

## 🏗️ プロジェクト構成

```
cloudinary-image-editor/
├── client/          # React フロントエンド
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
│
├── server/          # Express バックエンド
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── middleware/
│   └── package.json
│
└── docs/           # ドキュメント
```

## 🚀 セットアップ

### 前提条件

- Node.js 18.x 以上
- npm 9.x 以上
- Cloudinary アカウント（[無料登録](https://cloudinary.com/users/register/free)）

### 1. リポジトリのクローン

```bash
git clone https://github.com/net-runners-com/cloudinary-image-editor.git
cd cloudinary-image-editor
```

### 2. Cloudinary 設定

1. [Cloudinary](https://cloudinary.com/) にログイン
2. ダッシュボードから以下の情報を取得:
   - Cloud Name
   - API Key
   - API Secret

### 3. サーバーのセットアップ

```bash
cd server
npm install

# 環境変数の設定
cp .env.example .env
# .env ファイルを編集して Cloudinary の認証情報を入力
```

**server/.env**:
```env
PORT=5000
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CORS_ORIGIN=http://localhost:5173
```

### 4. クライアントのセットアップ

```bash
cd ../client
npm install

# 環境変数の設定
cp .env.example .env
# .env ファイルを編集
```

**client/.env**:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### 5. 開発サーバーの起動

**ターミナル1（サーバー）**:
```bash
cd server
npm run dev
```

**ターミナル2（クライアント）**:
```bash
cd client
npm run dev
```

ブラウザで `http://localhost:5173` にアクセス

## 📚 API ドキュメント

詳細なAPIドキュメントは [docs/API.md](docs/API.md) を参照してください。

### 主要エンドポイント

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | `/api/upload` | 画像アップロード |
| POST | `/api/transform` | 画像変換 |
| GET | `/api/download` | 画像ダウンロード |
| DELETE | `/api/images/:publicId` | 画像削除 |

## 🛠️ 技術スタック

### フロントエンド
- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - ユーティリティファーストCSS
- **Axios** - HTTPクライアント
- **Lucide React** - アイコン

### バックエンド
- **Express** - Webフレームワーク
- **TypeScript** - 型安全性
- **Cloudinary SDK** - 画像処理
- **Multer** - ファイルアップロード
- **CORS** - クロスオリジン対応

## 🎯 開発ロードマップ

### ✅ Phase 1: 基本機能
- [x] プロジェクトセットアップ
- [ ] 画像アップロード機能
- [ ] 基本的な画像変換（リサイズ、クロップ）
- [ ] プレビュー機能
- [ ] ダウンロード機能

### 🚧 Phase 2: 高度な編集機能
- [ ] フィルター・エフェクト
- [ ] 背景削除
- [ ] テキスト追加
- [ ] 回転・反転

### 📋 Phase 3: UI/UX改善
- [ ] レスポンシブデザイン
- [ ] ダークモード
- [ ] アニメーション
- [ ] エラーハンドリング改善

### 🚀 Phase 4: 追加機能（オプション）
- [ ] ユーザー認証
- [ ] 画像ギャラリー
- [ ] 編集履歴
- [ ] バッチ処理

## 📖 ドキュメント

- [セットアップガイド](docs/SETUP.md)
- [API仕様書](docs/API.md)
- [開発ガイド](docs/DEVELOPMENT.md)

## 🤝 コントリビューション

コントリビューションを歓迎します！以下の手順でお願いします:

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照

## 👤 作成者

**netrunners**

- GitHub: [@net-runners-com](https://github.com/net-runners-com)

## 🙏 謝辞

- [Cloudinary](https://cloudinary.com/) - 画像処理API
- [React](https://react.dev/) - UIライブラリ
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク

---

<div align="center">
  Made with ❤️ by netrunners
</div>
