<template>
  <div class="home-container">
    <!-- 轮播组件 -->
    <HeroSlider />

    <!-- 简介组件 -->
    <section class="intro-section-wrapper">
      <Introduction />
    </section>

    <!-- 研究方向组件 -->
    <section class="news-section-wrapper" id="news">
      <Research />
    </section>

    <!-- 最新论文组件 -->
    <section class="publications-section-wrapper">
      <LatestPublications />
    </section>

    <!-- 最新动态组件 -->
    <section class="activities-section-wrapper">
      <LatestActivities />
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSlider from '@/components/HeroSlider.vue'
import Introduction from '@/components/Introduction.vue'
import Research from '@/components/Research.vue'
import LatestPublications from '@/components/LatestPublications.vue'
import LatestActivities from '@/components/LatestActivities.vue'

// 页面加载时执行的逻辑
onMounted(() => {
  // 为了确保页面平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      if (this.getAttribute('href') === '#') return

      const targetId = this.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        })
      }
    })
  })
})
</script>

<style scoped>
/* 主容器样式 */
.home-container {
  width: 100%;
  overflow-x: hidden;
}

/* 简介部分包装器 */
.intro-section-wrapper {
  background-color: #fafbfb;
  margin: -100px auto 0;
  position: relative;
  z-index: 2;
  border-radius: 30px 30px 0 0;
  padding-top: 100px;
}

/* 研究方向部分包装器 */
.news-section-wrapper {
  background-color: white;
}

/* 最新论文部分包装器 */
.publications-section-wrapper {
  background-color: #fafbfb;
  padding: 30px 0;
}

/* 最新动态部分包装器 */
.activities-section-wrapper {
  background-color: white;
  padding: 30px 0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .intro-section-wrapper {
    margin-top: -80px;
    padding-top: 80px;
  }
}

@media (max-width: 768px) {
  .intro-section-wrapper {
    margin-top: -60px;
    padding-top: 60px;
    border-radius: 20px 20px 0 0;
  }
}

@media (max-width: 480px) {
  .intro-section-wrapper {
    margin-top: -40px;
    padding-top: 40px;
    border-radius: 15px 15px 0 0;
  }

  .publications-section-wrapper {
    padding: 20px 0;
  }

  .activities-section-wrapper {
    padding: 20px 0;
  }
}
</style>
