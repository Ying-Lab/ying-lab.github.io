<template>
  <div class="news-view">
    <div class="page-header">
      <h1>研究方向</h1>
      <p class="page-subtitle" style="text-align: center">探索我们的最新研究方向</p>
    </div>

    <!-- 研究方向列表 -->
    <div class="news-list">
      <div
        v-for="(news, index) in newsItems"
        :key="news.slug"
        class="news-item"
        v-scroll-fade-in="index"
      >
        <div class="news-item-content">
          <div class="news-date">{{ news.date }}</div>
          <h2 class="news-title">{{ news.title }}</h2>
          <p class="news-summary">{{ news.summary }}</p>
        </div>
        <div class="news-item-image">
          <img :src="news.image" :alt="news.title" class="news-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { newsItems } from '@/data/researchData.js'

// 自定义一个 Vue 指令来实现滚动触发动画
const vScrollFadeIn = {
  mounted: (el, binding) => {
    const index = binding.value || 0
    const delay = index * 100 // 每项延迟显示，创建交错效果

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )
    observer.observe(el)
  },
}
</script>

<style scoped>
.news-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-header h1 {
  font-size: 2.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #555;
  max-width: 700px;
  margin: 0 auto;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.news-item {
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(30px);
}

.news-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.news-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.news-item-content {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-date {
  color: #4b8f8b;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.news-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.4;
}

.news-summary {
  color: #555;
  line-height: 1.7;
  margin-bottom: 20px;
  flex: 1;
}

.read-more-link {
  display: inline-flex;
  align-items: center;
  color: #4b8f8b;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.read-more-link:hover {
  color: #3a6b68;
}

.news-item-image {
  width: 300px;
  height: 200px;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.news-item:hover .news-image {
  transform: scale(1.08);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .news-view {
    padding: 50px 20px;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .news-item-image {
    width: 250px;
    height: 180px;
  }

  .news-item-content {
    padding: 25px;
  }

  .news-title {
    font-size: 1.4rem;
  }
}

@media (max-width: 768px) {
  .news-item {
    flex-direction: column;
  }

  .news-item-image {
    width: 100%;
    height: 250px;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .page-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .news-view {
    padding: 40px 15px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header {
    margin-bottom: 40px;
  }

  .news-item-content {
    padding: 20px;
  }

  .news-item-image {
    height: 200px;
  }

  .news-title {
    font-size: 1.3rem;
  }
}
</style>
