# 🏔️ Mountain Travel - 全球頂級健行路線導覽

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245.svg)](https://reactrouter.com/)

**Mountain Travel** 是一個專為戶外愛好者打造的 React 單頁應用程式 (SPA)。收錄了世界四大經典徒步路線（環白朗峰、印加古道、米爾福德步道、熊野古道），並提供互動式的裝備重量計算器與登山安全指南。

🔗 **Live Demo:** [https://shernwu-creator.github.io/FE6_HW_MTFA/](https://shernwu-creator.github.io/FE6_HW_MTFA/)

---

## ✨ 核心功能 (Features)

*   **🗺️ 路線導覽 (Map Guide)**：靜態地形圖與路線資訊卡片的互動切換，提供每日行程地標與距離總覽。
*   **🎒 裝備清單與重量計算 (Gear Calculator)**：動態盤點裝備，即時計算背包總重量，並自動辨識必備品缺漏狀態。
*   **🧭 快速篩選系統 (Smart Filter)**：首頁提供依據距離長短（短程精華/長程縱走）的路線快速篩選功能。
*   **🌌 沉浸式安全指南 (Safety Guide)**：採用純 CSS 刻劃的無縫星空背景，搭配平滑視差捲動，提升閱讀體驗。

---

## 🛠️ 技術堆疊 (Tech Stack)

*   **前端框架**: React 18
*   **建置工具**: Vite
*   **路由管理**: React Router v6 (`BrowserRouter`, `Routes`, `Route`)
*   **樣式設計**: Pure CSS3 (Flexbox, Grid, CSS Animations, Clip-path)
*   **資料處理**: ES6+ JavaScript (Map, Filter, Reduce, 解構賦值, 隱含回傳)

---

## 💡 技術亮點 (Technical Highlights)

### 1. 動態路由與 SPA 架構
採用 React Router v6 打造無縫切換的單頁應用程式。透過 `<BrowserRouter>` 攔截傳統換頁行為，結合 `<Routes>` 與 `<Route>` 進行智慧路徑比對，大幅提升網頁流暢度與使用者體驗。

### 2. 資料驅動開發 (Data-Driven UI)
將路線與裝備資料抽離為獨立的 `data.json` 與資料處理模組。元件內部大量運用 `Array.map()` 結合 ES6 箭頭函式的隱含回傳特性，將原始資料陣列一對一映射為 JSX 虛擬 DOM 節點。

### 3. React Hooks 狀態管理與效能優化
*   **`useState`**: 管理當前選取路線、裝備勾選狀態 (`checkedItems`) 以及篩選分類。
*   **`useMemo`**: 優化裝備重量的衍伸計算。僅在 `checkedItems` 發生變化時，才重新執行 `forEach` 迴圈盤點總重量與缺漏項目，避免不必要的重複渲染運算。
*   **強制布林轉型 (`!!`)**: 在判斷裝備狀態時，使用雙驚嘆號將 `undefined` 等偏假值嚴格轉換為純布林值 (`true/false`)，確保邏輯判斷的嚴謹性。

### 4. 解決 GitHub Pages 靜態資源路徑問題
為解決部署至 GitHub Pages 子目錄時發生的圖片 404 破圖問題，專案透過 `data.js` 攔截 JSON 資料，並結合 Vite 環境變數動態補上部署前綴：
```javascript
const withBase = (path) => {
  if (typeof path !== 'string' || !path.startsWith('/')) return path
  return `${import.meta.env.BASE_URL}${path.slice(1)}`
}