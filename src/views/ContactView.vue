<template>
  <div class="contact-page">
    <div class="page-header">
      <h1>加入我们</h1>
      <p style="text-align: center">Join Us</p>
    </div>

    <div class="container">
      <!-- 上部：招募信息 -->
      <div class="recruitment-section">
        <h2 class="section-title">人员招募</h2>
        <p class="recruitment-text">
          本实验室专注于利用计算与数据科学方法探索生命奥秘，主要研究AI在生物医学中的应用。现诚邀有志于投身前沿交叉学科研究的同学加入：
        </p>
        <div class="recruitment-details">
          <div class="recruitment-category">
            <h3>【招募对象】</h3>
            <ul>
              <li>
                博士生/硕士生：欢迎自动化、计算机、数学等相关专业对本实验室研究方向感兴趣的同学申请推免和报考。（2026年预计有一个博士生名额，欢迎硕士期间从事生物信息等相关方向的同学联系）
              </li>
              <li>
                科研本科生：面向本校对科研有浓厚兴趣的优秀本科生（大二、大三优先），提供完整的科研训练。
              </li>
            </ul>
          </div>
          <div class="recruitment-category">
            <h3>【基本要求】</h3>
            <ul>
              <li>对计算生物学领域有真诚的热情和好奇心。</li>
              <li>具备或愿意学习编程能力（Python/R/Linux等）。</li>
              <li>拥有良好的逻辑思维、自主学习能力和团队协作精神。</li>
            </ul>
          </div>
        </div>
        <div class="contact-details">
          <div class="info-item">
            <i class="fas fa-envelope-open-text"></i>
            <div>
              <strong>电子邮箱</strong>
              <p>wangying@xmu.edu.cn</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-map-marked-alt"></i>
            <div>
              <strong>地址</strong>
              <p>福建省厦门市厦门大学翔安校区航空航天学院楼418室 (邮编: 361102)</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 下部：地图 -->
      <div class="map-section">
        <h2 class="section-title">实验室位置</h2>

        <div class="map-container">
          <!-- OpenFreeMap - 按照官方文档使用MapLibre GL JS集成 -->
          <div id="openfreemap" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue'

let map = null
let currentStyle = 'positron'

onMounted(() => {
  // 动态加载MapLibre GL JS的样式和脚本
  const link = document.createElement('link')
  link.href = 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.css'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  const script = document.createElement('script')
  script.src = 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.js'
  script.onload = async () => {
    await nextTick() // 等待DOM更新完成

    // 等待MapLibre GL JS加载完成后初始化地图
    const maplibregl = window.maplibregl

    // 初始化地图 - 使用Positron样式
    map = new maplibregl.Map({
      style: `https://tiles.openfreemap.org/styles/liberty`,
      center: [118.30585, 24.61151], // 实验室经纬度坐标
      zoom: 17, // 设置合适的缩放级别
      container: 'openfreemap',
      attributionControl: true,
    })

    // 添加导航控制（缩放按钮）
    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    // 在地图上添加标记点（实验室位置）
    new maplibregl.Marker()
      .setLngLat([118.30585, 24.61151])
      .setPopup(
        new maplibregl.Popup().setHTML(
          '<h3>厦门大学翔安校区航空航天学院</h3><p>福建省厦门市翔安区翔安南路4221号</p>',
        ),
      )
      .addTo(map)

    // 地图加载完成后的回调
    map.on('load', () => {
      console.log('OpenFreeMap地图加载完成')
    })

    // 添加样式切换事件监听
    setupStyleSwitcher()
  }
  document.head.appendChild(script)
})

onUnmounted(() => {
  // 组件卸载时清理地图实例
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.contact-page {
  padding-bottom: 50px;
}

.page-header {
  background: linear-gradient(45deg, #3a7bd5, #3a6073);
  color: white;
  text-align: center;

  padding: 60px 20px;
}
.page-header h1 {
  font-size: 3rem;
  margin: 0;
}
.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.container {
  max-width: 900px;
  margin: 50px auto;
  padding: 0 20px;
}

.recruitment-section,
.map-section {
  padding: 40px;
  margin-bottom: 40px;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 30px;
  color: #333;
}

.recruitment-text {
  font-size: 1.2rem;
  line-height: 1.8;
  text-align: center;
  color: #555;
  margin-bottom: 30px;
}

.recruitment-details {
  margin: 30px 0 40px;
}

.recruitment-category {
  margin-bottom: 25px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3a7bd5;
}

.recruitment-category h3 {
  font-size: 1.3rem;
  color: #3a7bd5;
  margin-top: 0;
  margin-bottom: 15px;
  font-weight: 600;
}

.recruitment-category ul {
  padding-left: 20px;
  margin: 0;
}

.recruitment-category li {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 8px;
  list-style-type: disc;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  font-size: 1.1rem;
}
.info-item i {
  color: #3a7bd5;
  font-size: 1.8rem;
  width: 30px;
  text-align: center;
  margin-top: 5px;
}
.info-item strong {
  display: block;
  color: #333;
  margin-bottom: 5px;
}
.info-item p {
  margin: 0;
  color: #666;
}

.map-container {
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ccc;
  /* 确保地图容器在初始化前有正确的样式 */
  position: relative;
}

/* 地图样式选择器样式 */
.map-style-selector {
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.map-style-selector span {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
}

.style-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #555;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.style-btn:hover {
  background-color: #f0f0f0;
  border-color: #3a7bd5;
  color: #3a7bd5;
}

.style-btn.active {
  background-color: #3a7bd5;
  color: white;
  border-color: #3a7bd5;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .map-style-selector {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .map-style-selector span {
    margin-bottom: 5px;
  }

  .style-btn {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }
  .recruitment-section,
  .map-section {
    padding: 30px 20px;
  }
}
</style>
