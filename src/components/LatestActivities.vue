<template>
  <div class="activities-section">
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
        <h2>最新动态</h2>
      </div>
      <!-- <a href="/#/activities" class="view-all-link">查看全部 <span class="arrow-right">→</span></a> -->
      <router-link class="view-all-link" to="/activities">查看全部</router-link>
    </div>

    <!-- 活动卡片列表，带滚动动画 -->
    <div class="activities-container">
      <div
        v-for="(activity, index) in latestActivities"
        :key="activity.id"
        class="activity-card"
        v-scroll-fade-in="index"
      >
        <div class="card-header">
          <div class="activity-meta">
            <span class="activity-date">{{ activity.date }}</span>
          </div>
        </div>

        <div class="card-content" @click="goToDetail(activity.id)">
          <div class="activity-content-wrapper">
            <!-- 左侧文字区域 -->
            <div class="activity-text-content">
              <h3 class="activity-title">{{ activity.title }}</h3>
              <p class="activity-preview">{{ getContentPreview(activity.content) }}</p>

              <!-- 显示图片数量提示 -->
              <div v-if="activity.images.length > 1" class="image-count">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H21V15Z"
                    stroke="#4b8f8b"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 17H8"
                    stroke="#4b8f8b"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z"
                    stroke="#4b8f8b"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ activity.images.length }}张图片
              </div>
            </div>

            <!-- 右侧图片区域，只显示第一张图片 -->
            <div v-if="activity.images.length > 0" class="activity-image-container">
              <img :src="activity.images[0]" :alt="activity.title" class="activity-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useActivityStore } from '../data/activityStore.js'

const router = useRouter()
const { activities } = useActivityStore()

// 计算属性，获取最新的三个活动
const latestActivities = computed(() => {
  // 先按日期排序（降序），然后取前三个
  return [...activities.value]
    .sort((a, b) => {
      // 将日期格式转换为可以比较的格式
      const dateA = new Date(a.date.replace(/\./g, '-'))
      const dateB = new Date(b.date.replace(/\./g, '-'))
      return dateB - dateA
    })
    .slice(0, 3)
})

// 获取内容预览
const getContentPreview = (content) => {
  // 移除换行符，取前100个字符
  return content.replace(/\n/g, ' ').substring(0, 100) + '...'
}

// 跳转到详情页的方法
const goToDetail = (activityId) => {
  router.push({ path: `/activities/${activityId}` })
}

// 自定义一个 Vue 指令来实现滚动触发动画，并支持交错动画
const vScrollFadeIn = {
  mounted: (el, binding) => {
    const index = binding.value || 0
    const delay = index * 150 // 每张卡片延迟显示，创建交错效果

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
/* 最新动态部分容器 */
.activities-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

/* 标题栏样式 */
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

/* 查看全部链接 */
.view-all-link {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  background-color: #4b8f8b;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(75, 143, 139, 0.2);
}

/* 箭头图标 */
.arrow-right {
  margin-left: 8px;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

/* 查看全部链接悬停效果 */
.view-all-link:hover {
  background-color: #3a6b68;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(75, 143, 139, 0.3);
}

.view-all-link:hover .arrow-right {
  transform: translateX(4px);
}

/* 活动容器 */
.activities-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 活动卡片 */
.activity-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  border-bottom: 3px solid #4b8f8b;
  cursor: pointer;

  /* 动画初始状态 */
  opacity: 0;
  transform: translateY(20px);
}

/* 卡片动画触发后的状态 */
.activity-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 卡片悬停效果 */
.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-left-color: #3a6b68;
}

/* 卡片头部 */
.card-header {
  padding: 15px 25px 0;
}

/* 活动元数据 */
.activity-meta {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #4b8f8b;
  font-weight: 500;
}

/* 日期 */
.activity-date {
  background-color: #f0f4f3;
  padding: 4px 10px;
  border-radius: 15px;
  font-weight: 600;
}

/* 卡片内容 */
.card-content {
  padding: 15px 25px 20px;
}

/* 活动标题 */
.activity-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.5;
  transition: color 0.3s ease;
}

/* 卡片悬停时标题颜色变化 */
.activity-card:hover .activity-title {
  color: #4b8f8b;
}

/* 内容预览 */
.activity-preview {
  font-size: 1rem;
  color: #555;
  margin: 0 0 15px 0;
  line-height: 1.4;
}

/* 活动内容包装器 - 左右布局 */
.activity-content-wrapper {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

/* 左侧文字区域 */
.activity-text-content {
  flex: 1;
  min-width: 0;
}

/* 图片数量提示 */
.image-count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #4b8f8b;
  padding: 4px 10px;
  background-color: #f0f4f3;
  border-radius: 15px;
  margin-top: 10px;
}

/* 右侧图片区域 */
.activity-image-container {
  width: 150px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

/* 活动图片 */
.activity-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* 图片悬停效果 */
.activity-card:hover .activity-image {
  transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .activities-section {
    padding: 50px 20px;
  }

  .section-header {
    margin-bottom: 35px;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .activity-title {
    font-size: 1.15rem;
  }
}

@media (max-width: 768px) {
  .activities-section {
    padding: 40px 15px;
  }

  .section-header {
    margin-bottom: 30px;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .view-all-link {
    padding: 8px 20px;
    font-size: 0.9rem;
  }

  .card-content {
    padding: 15px 20px 15px;
  }

  .activity-meta {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  /* 调整左右布局为上下布局 */
  .activity-content-wrapper {
    flex-direction: column;
    gap: 15px;
  }

  /* 调整图片容器宽度为100% */
  .activity-image-container {
    width: 100%;
    height: 180px;
  }
}

@media (max-width: 480px) {
  .activities-section {
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

  .activity-card {
    border-bottom-width: 2px;
  }

  .card-header {
    padding: 12px 15px 0;
  }

  .card-content {
    padding: 12px 15px 12px;
  }

  .activity-title {
    font-size: 1.1rem;
  }

  /* 小屏幕上的图片容器高度 */
  .activity-image-container {
    height: 150px;
  }
}
</style>
