<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>页面不存在</h1>
      <p>抱歉，您访问的页面不存在或已被移除。</p>
      <div class="action-buttons">
        <router-link to="/" class="home-button">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// 简单的404页面组件
</script>

<style scoped>
.not-found-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  background-color: white;
  padding: 4rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1;
}

.not-found-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.not-found-content p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.home-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: #555;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 5rem;
  }
  
  .not-found-content h1 {
    font-size: 2rem;
  }
  
  .not-found-content p {
    font-size: 1rem;
  }
}
</style>