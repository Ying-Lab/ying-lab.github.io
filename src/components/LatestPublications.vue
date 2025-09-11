<template>
  <div class="publications-section">
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
              d="M21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H21V15Z"
              stroke="#4b8f8b"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 17H4"
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
              d="M20 17H12"
              stroke="#4b8f8b"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2>最新论文</h2>
      </div>
      <!-- <a href="/#/publications" class="view-all-link"
        >查看全部 <span class="arrow-right">→</span></a
      > -->
      <router-link class="view-all-link" to="/publications">查看全部</router-link>
    </div>

    <!-- 论文卡片列表，带滚动动画 -->
    <div class="publications-container">
      <div
        v-for="(pub, index) in latestPublications"
        :key="pub.id"
        class="publication-card"
        v-scroll-fade-in="index"
      >
        <div class="card-header">
          <div class="publication-meta">
            <span class="publication-year">{{ pub.year }}</span>
            <span class="publication-dot"></span>
            <span class="publication-venue-short">{{ getVenueShortName(pub.venue) }}</span>
          </div>
        </div>

        <div class="card-content" @click="goToDetail(pub.id)">
          <h3 class="publication-title">{{ pub.title }}</h3>
          <p class="publication-authors">{{ pub.authors }}</p>
          <p class="publication-venue">{{ pub.venue }}</p>
        </div>

        <div class="card-footer">
          <div class="publication-actions">
            <a
              :href="pub.pdf"
              class="action-button pdf-button"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16V12M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              PDF/DOI
            </a>
            <button class="action-button cite-button" @click.stop="showCitation(pub)">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12H7C5.89543 12 5 11.1046 5 10V6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V10C19 11.1046 18.1046 12 17 12H15M9 12C9 13.1046 9.89543 14 11 14H13C14.1046 14 15 13.1046 15 12M9 12C9 13.1046 9.89543 14 11 14V18C11 19.1046 11.8954 20 13 20H15C16.1046 20 17 19.1046 17 18V14C18.1046 14 19 13.1046 19 12M9 12C7.89543 12 7 11.1046 7 10V6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              引用
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 引用弹窗 -->
    <div v-if="showCitationModal" class="citation-modal" @click="closeCitation">
      <div class="citation-content" @click.stop>
        <div class="citation-header">
          <h3>引用格式</h3>
          <button class="close-button" @click="closeCitation">×</button>
        </div>
        <div class="citation-body">
          <pre>{{ currentCitation }}</pre>
        </div>
        <div class="citation-footer">
          <button class="copy-button" @click="copyCitation">复制引用</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePublicationsStore } from '../data/publicationsStore.js'

const router = useRouter()
const { publications } = usePublicationsStore()

// 模态框状态
const showCitationModal = ref(false)
const currentCitation = ref('')

// 计算属性，获取最新的三篇论文
const latestPublications = computed(() => {
  // 先按年份排序（降序），然后取前三个
  return [...publications.value].sort((a, b) => b.year - a.year).slice(0, 3)
})

// 跳转到详情页的方法
const goToDetail = (pubId) => {
  router.push({ path: `/publications/${pubId}` })
}

// 显示引用弹窗
const showCitation = (pub) => {
  // 生成引用格式，设置为BibTeX格式

  currentCitation.value = `@article{${pub.id},
  title={${pub.title}},
  author={${pub.authors}},
  journal={${pub.venue}},
  year={${pub.year}},
  publisher={${pub.publisher}}
}`

  showCitationModal.value = true
}

// 关闭引用弹窗
const closeCitation = () => {
  showCitationModal.value = false
}

// 复制引用
const copyCitation = () => {
  navigator.clipboard.writeText(currentCitation.value).then(() => {
    // 可以添加一个复制成功的提示
    const originalText = document.querySelector('.copy-button').textContent
    const copyButton = document.querySelector('.copy-button')
    copyButton.textContent = '已复制!'
    setTimeout(() => {
      copyButton.textContent = originalText
    }, 2000)
  })
}

// 获取期刊的缩写
const getVenueShortName = (venue) => {
  // 简单的缩写逻辑，可以根据实际情况扩展
  const shortNames = {
    'Nature Communications': 'Nat Commun',
    Science: 'Science',
    Cell: 'Cell',
    'Proceedings of the National Academy of Sciences': 'PNAS',
    'IEEE Transactions on Pattern Analysis and Machine Intelligence': 'IEEE TPAMI',
  }

  return shortNames[venue] || venue.split(' ')[0]
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
/* 最新论文部分容器 */
.publications-section {
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

/* 论文容器 */
.publications-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 论文卡片 */
.publication-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  border-left: 4px solid #4b8f8b;
  cursor: pointer;

  /* 动画初始状态 */
  opacity: 0;
  transform: translateY(20px);
}

/* 卡片动画触发后的状态 */
.publication-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 卡片悬停效果 */
.publication-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-left-color: #3a6b68;
}

/* 卡片头部 */
.card-header {
  padding: 15px 25px 0;
}

/* 论文元数据 */
.publication-meta {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #4b8f8b;
  font-weight: 500;
}

/* 年份 */
.publication-year {
  background-color: #f0f4f3;
  padding: 4px 10px;
  border-radius: 15px;
  font-weight: 600;
}

/* 点分隔符 */
.publication-dot {
  width: 4px;
  height: 4px;
  background-color: #4b8f8b;
  border-radius: 50%;
  margin: 0 10px;
}

/* 期刊缩写 */
.publication-venue-short {
  color: #666;
}

/* 卡片内容 */
.card-content {
  padding: 15px 25px 10px;
}

/* 论文标题 */
.publication-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.5;
  transition: color 0.3s ease;
}

/* 卡片悬停时标题颜色变化 */
.publication-card:hover .publication-title {
  color: #4b8f8b;
}

/* 作者列表 */
.publication-authors {
  font-size: 1rem;
  color: #555;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

/* 期刊信息 */
.publication-venue {
  font-size: 0.95rem;
  color: #666;
  font-style: italic;
  margin: 0;
  line-height: 1.4;
}

/* 卡片底部 */
.card-footer {
  padding: 15px 25px;
  background-color: #fafbfb;
}

/* 操作按钮容器 */
.publication-actions {
  display: flex;
  gap: 10px;
}

/* 操作按钮 */
.action-button {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border: 1px solid #e0e8e7;
  background-color: white;
  color: #4b8f8b;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  gap: 6px;
}

/* 操作按钮悬停效果 */
.action-button:hover {
  background-color: #4b8f8b;
  color: white;
  border-color: #4b8f8b;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(75, 143, 139, 0.2);
}

/* 引用弹窗 */
.citation-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

/* 弹窗内容 */
.citation-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.3s ease;
}

/* 弹窗头部 */
.citation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e0e8e7;
}

.citation-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

/* 关闭按钮 */
.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: #f5f5f5;
  color: #333;
}

/* 弹窗内容 */
.citation-body {
  padding: 25px;
  max-height: 40vh;
  overflow-y: auto;
}

.citation-body pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #333;
  line-height: 1.5;
}

/* 弹窗底部 */
.citation-footer {
  padding: 20px 25px;
  border-top: 1px solid #e0e8e7;
  display: flex;
  justify-content: flex-end;
}

/* 复制按钮 */
.copy-button {
  padding: 8px 24px;
  background-color: #4b8f8b;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(75, 143, 139, 0.2);
}

.copy-button:hover {
  background-color: #3a6b68;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(75, 143, 139, 0.3);
}

/* 淡入上移动画 */
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

/* 响应式设计 */
@media (max-width: 992px) {
  .publications-section {
    padding: 50px 20px;
  }

  .section-header {
    margin-bottom: 35px;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .publication-title {
    font-size: 1.15rem;
  }
}

@media (max-width: 768px) {
  .publications-section {
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
    padding: 15px 20px 10px;
  }

  .card-footer {
    padding: 15px 20px;
  }

  .publication-meta {
    font-size: 0.8rem;
  }

  .action-button {
    padding: 5px 12px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .publications-section {
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

  .publication-card {
    border-left-width: 3px;
  }

  .card-header {
    padding: 12px 15px 0;
  }

  .card-content {
    padding: 12px 15px 8px;
  }

  .card-footer {
    padding: 12px 15px;
  }

  .publication-title {
    font-size: 1.1rem;
  }

  .publication-actions {
    flex-direction: column;
  }

  .citation-content {
    margin: 20px;
  }

  .citation-header,
  .citation-body,
  .citation-footer {
    padding: 15px 20px;
  }
}
</style>
