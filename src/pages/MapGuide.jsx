import { useState } from 'react'
import { Link } from 'react-router-dom'
import data from '../data'
import '../styles/map.css'

/* ============================================================
   路線顏色與靜態地圖圖檔對應
   ============================================================ */
const ROUTE_COLORS = {
  'tmb': '#e67e22',
  'inca-trail': '#d4a017',
  'milford-track': '#3498db',
  'kumano-kodo': '#c0392b',
}

// 對應 public/images/ 底下的正方形地圖圖檔
const MAP_IMAGES = {
  'tmb': '/images/MAP_TMB.jpg',
  'inca-trail': '/images/MAP_inca_trail.jpg',
  'milford-track': '/images/MAP_milford_track.jpg',
  'kumano-kodo': '/images/MAP_kumano_kodo.jpg',
}

export default function MapGuide() {
  const routesData = data.routes
  const defaultRoute = routesData.find((r) => r.id === 'tmb') || routesData[0]

  const [activeRouteId, setActiveRouteId] = useState(defaultRoute.id)

  // 當前選中的路線
  const activeRoute = routesData.find((r) => r.id === activeRouteId) || defaultRoute

  // 切換路線：更新 state 並捲動到圖面區
  const handleSelectRoute = (route) => {
    setActiveRouteId(route.id)

    // 捲動到地圖區域（搭配 CSS 的 scroll-margin-top 避免被 navbar 遮住）
    requestAnimationFrame(() => {
      document
        .querySelector('.map-layout')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div className="catalog-container">
      <header className="catalog-header">
        <h1>探索全球頂級健行路線</h1>
        <p>點擊下方按鈕切換路線，查看專屬地形圖與行程簡介</p>
      </header>

      {/* ============ 上方：四個路線按鈕 ============ */}
      <div className="route-tabs">
        {routesData.map((route) => (
          <button
            key={route.id}
            className={`route-tab ${activeRouteId === route.id ? 'active' : ''}`}
            onClick={() => handleSelectRoute(route)}
          >
            <span
              className="tab-dot"
              style={{ background: ROUTE_COLORS[route.id] }}
            />
            {route.name}
          </button>
        ))}
      </div>

      {/* ============ 下方：左靜態圖 + 右卡片 ============ */}
      <div className="map-layout">
        
        {/* 左：靜態正方形地圖 */}
        <section className="static-map-section">
          <img 
            src={MAP_IMAGES[activeRoute.id]} 
            alt={`${activeRoute.name} 地形圖`} 
            className="static-map-image"
          />
        </section>

        {/* 右：當前路線卡片 */}
        <aside className="map-right">
          <article className="current-card">
            <div className="current-card-image">
              <img src={activeRoute.heroImage} alt={activeRoute.name} />
              <span className="current-card-country">{activeRoute.country}</span>
              <span
                className={`current-card-difficulty difficulty-${activeRoute.difficulty.toLowerCase()}`}
              >
                {activeRoute.difficulty}
              </span>
            </div>

            <div className="current-card-content">
              <h2 className="current-card-title">{activeRoute.name}</h2>
              <p className="current-card-sub">{activeRoute.englishName}</p>

              <p className="current-card-summary">{activeRoute.summary}</p>

              {/* 數據指標 2x2 */}
              <div className="current-card-stats">
                <div className="stat-item">
                  <span className="stat-label">距離</span>
                  <span className="stat-value">{activeRoute.distanceKm} km</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">預估天數</span>
                  <span className="stat-value">{activeRoute.durationDays}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">最高海拔</span>
                  <span className="stat-value">{activeRoute.maxElevationM} m</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">難易度</span>
                  <span className="stat-value">{activeRoute.difficulty}</span>
                </div>
              </div>

              {/* 標籤 */}
              <div className="current-card-tags">
                {activeRoute.tags.map((tag) => (
                  <span key={tag} className="current-card-tag">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 按鈕 */}
              <Link
                to={`/tour/${activeRoute.slug}`}
                className="current-card-btn"
              >
                查看完整行程 →
              </Link>
            </div>
          </article>
        </aside>
      </div>
    </div>
  )
}