<template>
  <div class="research-section">
    <!-- 标题栏 -->
    <div class="section-header">
      <div class="header-left">
        <div class="section-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
              stroke="#4b8f8b"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 16H16"
              stroke="#4b8f8b"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 12H16"
              stroke="#4b8f8b"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 8H16"
              stroke="#4b8f8b"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2>研究方向</h2>
      </div>
    </div>

    <div class="research-intro">
      <p>我们针对力求通过算法创新推动AI与生命科学的交叉融合，研究的突破,开发具备高泛化能力的通用分析工具与智能系统,旨在将数据价值转化为精准洞察,服务于生命科学与医学发展。</p>
    </div>

    <!-- 研究方向展示区 -->
    <div class="research-container">
      <div
        v-for="(research, index) in researchList"
        :key="research.id"
        class="research-item"
        v-scroll-fade-in="index"
        :class="{ even: index % 2 === 1 }"
      >
        <!-- 内容区域 -->
        <div class="research-content">
          <!-- 标题栏 -->
          <div class="research-title-section">
            <h3 class="research-title">{{ research.title }}</h3>
          </div>

          <!-- 开放式布局展示 -->
          <div class="open-layout">
            <div class="research-image-container">
              <img
                :src="research.image"
                :alt="research.title"
                class="research-image"
                loading="lazy"
              />
            </div>
            <div class="research-description">
              <p class="research-summary">{{ research.summary }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { newsItems } from '@/data/researchData.js'

// 使用项目数据文件中的研究方向数据
const researchList = ref(newsItems)

// 自定义一个 Vue 指令来实现滚动触发动画，并支持交错动画
const vScrollFadeIn = {
  mounted: (el, binding) => {
    const index = binding.value || 0
    const delay = index * 200 // 每个项目延迟显示，创建交错效果

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 设置延迟，创建交错动画效果
            setTimeout(() => {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target) // 动画执行一次后停止观察
            }, delay)
          }
        })
      },
      {
        threshold: 0.1, // 元素进入视口10%时触发
      },
    )
    observer.observe(el)
  },
}
</script>

<style scoped>
/* 研究方向部分容器 */
.research-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

/* 标题栏样式 - 与LatestActivities.vue保持一致 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

/* 图标样式 */
.section-icon {
  margin-right: 15px;
  color: #4b8f8b;
}

/* 标题样式 */
.section-header h2 {
  font-size: 2.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* 研究介绍样式 */
.research-intro {
  background-color: #f9f9f9;
  padding: 1.5rem 2rem;
  border-left: 4px solid #4b8f8b;
  margin-bottom: 2rem;
  border-radius: 0 4px 4px 0;
}

.research-intro p {
  color: #333;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

/* 研究方向容器 */
.research-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* 研究方向项目 - 开放式布局 */
.research-item {
  display: flex;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s ease;
}

/* 偶数项目的反向布局 */
.research-item.even {
  flex-direction: row-reverse;
}

/* 动画触发后的状态 */
.research-item.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 研究内容区域 */
.research-content {
  flex: 1;
  min-width: 0;
}

/* 标题部分 */
.research-title-section {
  margin-bottom: 20px;
}

.research-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 3px solid #4b8f8b;
  display: inline-block;
}

/* 开放式布局 */
.open-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

/* 图片容器 */
.research-image-container {
  flex-shrink: 0;
  max-width: 300px;
  max-height: 150px;
  overflow: hidden;
}

/* 图片样式 */
.research-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.research-image:hover {
  transform: scale(1.05);
}

/* 描述区域 */
.research-description {
  flex: 1;
  min-width: 0;
}

/* 完整显示摘要内容 */
.research-summary {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .research-section {
    padding: 50px 20px;
  }

  .section-header {
    margin-bottom: 35px;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .open-layout {
    flex-direction: column;
    gap: 20px;
  }

  .research-image-container {
    width: 100%;
    height: 200px;
  }

  .research-title {
    font-size: 1.4rem;
  }
}

@media (max-width: 768px) {
  .research-section {
    padding: 40px 15px;
  }

  .section-header {
    margin-bottom: 30px;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .research-container {
    gap: 30px;
  }

  .research-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .research-section {
    padding: 30px 15px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .section-header h2 {
    font-size: 1.6rem;
  }

  .research-image-container {
    height: 150px;
  }

  .research-title {
    font-size: 1.2rem;
  }

  .research-summary {
    font-size: 0.95rem;
  }
}

@media (max-width: 992px) {
  .section-header {
    margin-bottom: 45px;
  }

  .section-header h2 {
    font-size: 2.2rem;
  }

  .research-container {
    gap: 40px;
  }

  .research-item,
  .research-item.even {
    flex-direction: column;
    gap: 20px;
    padding: 25px;
  }

  .research-number {
    align-self: flex-start;
  }

  .research-details {
    flex-direction: column;
    gap: 20px;
  }

  .research-image-container {
    width: 100%;
    max-width: 500px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .research-section {
    padding: 50px 15px;
  }

  .header-content {
    padding: 0 20px;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .research-title {
    font-size: 1.5rem;
  }

  .title-decoration {
    width: 70px;
  }

  .research-summary {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .research-section {
    padding: 40px 15px;
  }

  .section-icon {
    width: 50px;
    height: 50px;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .research-item {
    padding: 20px;
  }

  .research-number {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
  }

  .research-title {
    font-size: 1.4rem;
  }

  .research-image-container {
    height: 170px;
  }
}
</style>
