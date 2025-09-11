<template>
  <div class="hero-section">
    <div class="hero-background">
      <div class="hero-background-large" v-if="!isSmallScreen"></div>
      <div class="hero-background-small" v-else></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">{{ title }}</h1>
        <p class="hero-description">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式状态
const isSmallScreen = ref(window.innerWidth < 768)

// Hero内容
const title = '欢迎来到BioAl-Youth-Lab实验室'
const content = 'AI生物组学启智实验室致力于前沿人工智能算法对生命科学与人类健康的探索'

// 监听窗口大小变化
const handleResize = () => {
  isSmallScreen.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* 英雄区域容器 */
.hero-section {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
}

/* 英雄背景容器 */
.hero-background {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 英雄区域叠加层 */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

/* 英雄内容 */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 1200px;
  padding: 0 20px;
  transform: translateY(20px);
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.3s forwards;
}

/* 标题动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 英雄标题 */
.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
}

/* 英雄描述 */
.hero-description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 30px;
  font-weight: 300;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  text-align: center;
}

/* 英雄区域背景图片 - 大屏幕 */
/* 英雄区域背景图片 - 大屏幕 */
.hero-background-large {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/media/welcome3.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* 英雄区域背景图片 - 小屏幕 */
.hero-background-small {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/media/welcome3.jpg');
  background-size: cover;
  background-position: top;
  background-attachment: fixed;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .hero-section {
    height: 70vh;
  }

  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 992px) {
  .hero-section {
    height: 60vh;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 50vh;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 45vh;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-description {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
}
</style>
