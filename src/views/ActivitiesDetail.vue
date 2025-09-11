<template>
  <div class="activity-detail">
    <div class="page-header">
      <h1>活动详情</h1>
      <button class="back-button" @click="goBack">← 返回列表</button>
    </div>

    <div v-if="activity" class="container">
      <div class="detail-content">
        <div class="activity-header">
          <h2 class="activity-title">{{ activity.title }}</h2>
          <p class="activity-date">{{ activity.date }}</p>
        </div>

        <!-- 图片展示 -->
        <div v-if="activity.images.length > 0" class="activity-gallery">
          <img
            v-for="(img, index) in activity.images"
            :key="index"
            :src="img"
            :alt="`${activity.title} ${index + 1}`"
            class="activity-image"
            :class="{ 'single-image': activity.images.length === 1 }"
            @click="openImageModal(img)"
          />
        </div>

        <!-- 内容展示 -->
        <div class="activity-content">
          <p v-for="(paragraph, index) in activityContentParagraphs" :key="index" class="content-paragraph">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      <p>加载中...</p>
    </div>

    <!-- 图片查看弹窗 -->
    <div v-if="showImageModal" class="image-modal-overlay" @click="closeImageModal">
      <div class="image-modal-content" @click.stop>
        <button class="close-button" @click="closeImageModal">&times;</button>
        <img :src="currentImage" :alt="activity?.title || '活动图片'" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useActivityStore } from '@/data/activityStore.js'

const router = useRouter()
const route = useRoute()
const { activities } = useActivityStore()

// 获取路由参数中的ID
const activityId = route.params.id

// 当前活动数据
const activity = ref(null)

// 图片弹窗相关状态
const showImageModal = ref(false)
const currentImage = ref('')

// 组件挂载时获取活动数据
onMounted(() => {
  loadActivity()
})

// 加载单个活动数据
const loadActivity = () => {
  const found = activities.value.find((act) => act.id === activityId)
  if (found) {
    activity.value = found
  } else {
    // 如果找不到，返回列表页
    router.push('/activities')
  }
}

// 返回上一页
const goBack = () => {
  router.push('/activities')
}

// 将内容按换行符分割成段落
const activityContentParagraphs = computed(() => {
  if (!activity.value) return []
  return activity.value.content.split('\n').filter(paragraph => paragraph.trim() !== '')
})

// 打开图片弹窗
const openImageModal = (image) => {
  currentImage.value = image
  showImageModal.value = true
}

// 关闭图片弹窗
const closeImageModal = () => {
  showImageModal.value = false
}
</script>

<style scoped>
/* 页面头部样式 */
.page-header {
  background-color: #4b8f8b;
  color: white;
  padding: 40px 20px;
  position: relative;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin: 0;
  text-align: center;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 详情内容样式 */
.detail-content {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.activity-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.activity-title {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.4;
}

.activity-date {
  background-color: #f0f4f3;
  color: #4b8f8b;
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

/* 图片画廊 */
.activity-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.activity-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.activity-image:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 单张图片样式 */
.activity-image.single-image {
  grid-column: 1 / -1;
  height: 400px;
}

/* 内容段落 */
.activity-content {
  margin-top: 30px;
}

.content-paragraph {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 20px;
}

/* 加载状态 */
.loading {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

/* 图片弹窗 */
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.image-modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
}

.close-button {
  position: absolute;
  top: -40px;
  right: 0;
  background: white;
  color: #333;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #f0f4f3;
  transform: scale(1.1);
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .back-button {
    position: relative;
    left: 0;
    top: 0;
    display: block;
    margin: 15px auto 0;
    max-width: 150px;
  }
  
  .detail-content {
    padding: 20px;
  }
  
  .activity-title {
    font-size: 1.6rem;
  }
  
  .activity-gallery {
    grid-template-columns: 1fr;
  }
  
  .activity-image {
    height: 180px;
  }
  
  .activity-image.single-image {
    height: 300px;
  }
  
  .content-paragraph {
    font-size: 1rem;
  }
  
  .close-button {
    top: -35px;
    width: 32px;
    height: 32px;
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 30px 15px;
  }
  
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .detail-content {
    padding: 15px;
  }
  
  .activity-title {
    font-size: 1.4rem;
  }
  
  .activity-image {
    height: 150px;
  }
  
  .activity-image.single-image {
    height: 200px;
  }
  
  .content-paragraph {
    font-size: 0.95rem;
    line-height: 1.7;
  }
}
</style>