<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-lab-name">
        厦门大学AI生物组学启智实验室 (BioAI-Youth-Lab at Xiamen University)
      </p>
      <p class="footer-address">地址：福建省厦门市厦门大学翔安校区航空航天学院418室 361102</p>
      <p class="footer-email">邮箱：wangying@xmu.edu.cn</p>
    </div>
  </footer>
</template>

<script setup>
// 页脚组件的脚本部分
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 2rem 0;
  text-align: center;
  border-top: 1px solid #dee2e6;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-lab-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.footer-address,
.footer-email {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 0.3rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    padding: 1.5rem 0;
  }

  .footer-lab-name {
    font-size: 1rem;
  }

  .footer-address,
  .footer-email {
    font-size: 0.85rem;
  }
}
</style>
