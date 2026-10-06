import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Vite 的 BASE_URL 會帶出部署路徑前綴（GitHub Pages 為 '/FE6_HW_MTFA/'、Netlify 為 '/'）。
// 若沒有設定 basename，部署到子路徑後瀏覽器路徑會是 '/FE6_HW_MTFA/'，
// 無法對應到任何 Route（'/'、'/map'…），<Routes> 會渲染出空畫面。
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
