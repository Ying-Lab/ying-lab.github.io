<template>
  <div class="publications-page" id="publications">
    <div class="page-header">
      <h1>代表性论文</h1>
      <p style="text-align: center">Selected Papers</p>
    </div>
    <div class="container">
      <div class="filters">
        <input v-model="searchQuery" type="text" placeholder="搜索出版物..." class="search-input" />
      </div>

      <div class="publications-list">
        <div v-for="pub in filteredPublications" :key="pub.id" class="publication-item">
          <p class="pub-authors">{{ pub.authors }} ({{ pub.year }}).</p>
          <h3 class="pub-title">{{ pub.title }}.</h3>
          <p class="pub-venue">
            <em>{{ pub.venue }}</em>
          </p>
          <div class="pub-links">
            <a
              v-if="pub.pdf && pub.pdf !== '#'"
              :href="pub.pdf"
              target="_blank"
              class="pub-link"
              :class="{ 'doi-link': pub.pdf.includes('doi.org') }"
            >
              {{ pub.pdf.includes('doi.org') ? 'DOI' : 'PDF' }}
            </a>
            <a :href="pub.cite" @click.prevent="showCiteModal(pub)" class="pub-link">Cite</a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click="closeCiteModal">
      <div class="modal-content" @click.stop>
        <button @click="closeCiteModal" class="close-button">&times;</button>
        <h3>引用</h3>
        <pre class="cite-text">{{ currentCiteText }}</pre>
        <button @click="copyCiteText" class="copy-button">复制</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePublicationsStore } from '@/data/publicationsStore.js'

const { publications } = usePublicationsStore()
const selectedYear = ref('all')
const searchQuery = ref('')

// 计算需要展示的出版物
const filteredPublications = computed(() => {
  let filtered = publications.value

  // 按年份筛选
  if (selectedYear.value !== 'all') {
    filtered = filtered.filter((pub) => pub.year.toString() === selectedYear.value)
  }

  // 按搜索关键词筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(
      (pub) =>
        pub.title.toLowerCase().includes(query) ||
        pub.authors.toLowerCase().includes(query) ||
        pub.venue.toLowerCase().includes(query),
    )
  }

  return filtered
})

// 获取所有唯一的年份用于筛选
const uniqueYears = computed(() => {
  const years = publications.value.map((p) => p.year)
  return [...new Set(years)].sort((a, b) => b - a) // 降序排列
})

// 引用弹窗相关逻辑
const showModal = ref(false)
const currentCiteText = ref('')

const showCiteModal = (pub) => {
  // 根据出版物类型生成不同格式的 BibTeX 引用
  let citeText = ''

  // 清除作者中的特殊字符，如*、#、†等
  const cleanAuthors = pub.authors.replace(/[*#†‡;]/g, '').replace(/，/g, ', ')

  if (pub.type === 'Conference') {
    citeText = `@inproceedings{${generateCiteKey(pub)},
  author    = {${cleanAuthors}},
  title     = {${pub.title}},
  booktitle = {${pub.venue}},
  year      = {${pub.year}}
}`
  } else {
    // 期刊论文或其他类型
    // 从venue中提取期刊名
    let journal = pub.venue
    const volumeMatch = journal.match(/Volume\s+(\d+)/)
    const issueMatch = journal.match(/Issue\s+(\d+)/)
    const pagesMatch = journal.match(/Pages\s+(.*)/)

    // 清理期刊名字
    journal = journal.replace(/,\s*Volume.*$/, '').trim()

    citeText = `@article{${generateCiteKey(pub)},
  author    = {${cleanAuthors}},
  title     = {${pub.title}},
  journal   = {${journal}},
  ${
    volumeMatch
      ? `volume    = {${volumeMatch[1]}},
  `
      : ''
  }${
    issueMatch
      ? `number    = {${issueMatch[1]}},
  `
      : ''
  }${
    pagesMatch
      ? `pages     = {${pagesMatch[1]}},
  `
      : ''
  }year      = {${pub.year}}${
    pub.pdf && pub.pdf.includes('doi.org')
      ? `,
  doi       = {${pub.pdf.replace('https://doi.org/', '')}}`
      : ''
  }
}`
  }

  currentCiteText.value = citeText
  showModal.value = true
}

// 生成简单的引用键
const generateCiteKey = (pub) => {
  // 提取第一作者姓氏
  const firstAuthor = pub.authors.split(/[;,]/)[0].trim()
  // 只保留字母和数字，移除特殊字符
  const cleanAuthor = firstAuthor.replace(/[^a-zA-Z0-9]/g, '')
  // 截取标题的前几个单词
  const titleWords = pub.title.split(/\s+/).slice(0, 3)
  const cleanTitle = titleWords.map((word) => word.replace(/[^a-zA-Z0-9]/g, '')).join('')
  // 组合成引用键
  return `${cleanAuthor.toLowerCase()}${pub.year}${cleanTitle.substring(0, 3).toLowerCase()}`
}

const closeCiteModal = () => {
  showModal.value = false
}

const copyCiteText = () => {
  navigator.clipboard.writeText(currentCiteText.value).then(() => {
    alert('引用已复制到剪贴板!')
  })
}
</script>

<style scoped>
/* 页面头部样式 */
.page-header {
  background-color: #4b8f8b; /* 换一个颜色 */
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
.filter-select {
  padding: 10px;
  font-size: 1.1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  min-width: 120px;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  .search-input,
  .filter-select {
    width: 100%;
  }
}

/* 列表样式 */
.publication-item {
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eee;
}
.pub-authors {
  margin: 5px 0;
  font-weight: bold;
}
.pub-title {
  font-size: 1.4rem;
  margin: 5px 0;
  color: #333;
}
.pub-venue {
  margin: 5px 0;
  line-height: 1.6;
  color: #555;
}
.pub-links {
  margin-top: 10px;
}
.pub-link {
  margin-right: 20px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.doi-link {
  color: #1a73e8;
  background-color: #f8f9fa;
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
}
.cite-text {
  background: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
  white-space: pre-wrap; /* 自动换行 */
  word-wrap: break-word;
}
.copy-button {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
