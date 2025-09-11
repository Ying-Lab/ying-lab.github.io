<template>
  <div class="activities-page" id="activities">
    <div class="page-header">
      <h1>实验室动态</h1>
      <p style="text-align: center">Lab News</p>
    </div>
    <div class="container">
      <div class="activities-list">
        <div v-for="activity in filteredActivities" :key="activity.id" class="activity-item">
          <p class="activity-date">{{ activity.date }}</p>
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

              <div class="activity-actions">
                <router-link :to="`/activities/${activity.id}`" class="view-detail-button"
                  >查看详情</router-link
                >
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
import { useActivityStore } from '@/data/activityStore.js'

const { activities } = useActivityStore()
const searchQuery = ref('')

// 计算需要展示的活动
const filteredActivities = computed(() => {
  let filtered = activities.value

  // 按搜索关键词筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(
      (activity) =>
        activity.title.toLowerCase().includes(query) ||
        activity.content.toLowerCase().includes(query) ||
        activity.date.toLowerCase().includes(query),
    )
  }

  // 按日期排序（降序）
  return filtered.sort((a, b) => {
    // 将日期格式转换为可以比较的格式
    const dateA = new Date(a.date.replace(/\./g, '-'))
    const dateB = new Date(b.date.replace(/\./g, '-'))
    return dateB - dateA
  })
})

// 获取内容预览
const getContentPreview = (content) => {
  // 移除换行符，取前150个字符
  return content.replace(/\n/g, ' ').substring(0, 100) + '...'
}
</script>

<style scoped>
/* 页面头部样式 */
.page-header {
  background-color: #4b8f8b;
  color: white;
  text-align: center;
  padding: 60px 20px;
  margin-bottom: 40px;
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
  margin: 0 auto;
  padding: 0 20px;
}

/* 筛选样式 */
.filters {
  margin-bottom: 30px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-input {
  padding: 10px;
  font-size: 1.1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  flex: 1;
  min-width: 200px;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }
}

/* 列表样式 */
.activities-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.activity-item {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border-bottom: 3px solid #4b8f8b;
}

.activity-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.activity-date {
  background-color: #f0f4f3;
  color: #4b8f8b;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.activity-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 15px 0;
  line-height: 1.4;
}

.activity-preview {
  font-size: 1rem;
  color: #555;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

/* 活动内容包装器 - 左右布局 */
.activity-content-wrapper {
  display: flex;
  gap: 25px;
  align-items: flex-start;
  margin-top: 15px;
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
  margin: 15px 0;
}

/* 右侧图片区域 */
.activity-image-container {
  width: 200px;
  height: 150px;
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
.activity-item:hover .activity-image {
  transform: scale(1.05);
}

/* 操作按钮 */
.activity-actions {
  display: flex;
  justify-content: flex-end;
}

.view-detail-button {
  display: inline-block;
  padding: 8px 20px;
  background-color: #4b8f8b;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(75, 143, 139, 0.2);
}

.view-detail-button:hover {
  background-color: #3a6b68;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(75, 143, 139, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    padding: 40px 20px;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .container {
    padding: 0 15px;
  }

  .activity-item {
    padding: 20px;
  }

  .activity-title {
    font-size: 1.3rem;
  }

  /* 调整左右布局为上下布局 */
  .activity-content-wrapper {
    flex-direction: column;
    gap: 15px;
  }

  /* 调整图片容器宽度为100% */
  .activity-image-container {
    width: 100%;
    height: 200px;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .activity-item {
    padding: 15px;
    border-bottom-width: 2px;
  }

  .activity-title {
    font-size: 1.2rem;
  }

  /* 小屏幕上的图片容器高度 */
  .activity-image-container {
    height: 160px;
  }

  .view-detail-button {
    padding: 6px 16px;
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
  }
}
</style>
