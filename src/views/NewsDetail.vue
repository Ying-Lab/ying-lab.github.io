<template>
  <div class="news-detail-container" v-if="newsItem">
    <div class="news-header" :style="{ backgroundImage: `url(${newsItem.image})` }">
      <h1>{{ newsItem.title }}</h1>
      <p class="news-meta">发布于: {{ newsItem.date }}</p>
    </div>
    <div class="news-body-content">
      <div v-html="newsItem.fullContent"></div>
    </div>
  </div>
  <div v-else>
    <p>加载中或未找到该研究方向...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 从数据文件导入研究方向数据
import { newsItems } from '@/data/researchData.js'

const route = useRoute()
const newsItem = ref(null)

onMounted(() => {
  const slug = route.params.slug
  // 在研究方向数据中查找与当前路由slug匹配的项
  newsItem.value = newsItems.find((item) => item.slug === slug)
})
</script>

<style scoped>
.news-detail-container {
  width: 100%;
}
.news-header {
  height: 30vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;
}
.news-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.news-header h1,
.news-header .news-meta {
  position: relative;
  z-index: 1;
}
.news-header h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}
.news-meta {
  font-size: 1rem;
  font-style: italic;
}
.news-body-content {
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
  line-height: 1.8;
  font-size: 1.1rem;
}
/* 对 v-html 渲染的内容进行样式设置 */
.news-body-content :deep(h4) {
  font-size: 1.1rem;
  margin-top: 30px;
  color: #333;
}
.news-body-content :deep(ul) {
  padding-left: 20px;
}
.news-body-content :deep(li) {
  margin-bottom: 15px;
}
</style>
