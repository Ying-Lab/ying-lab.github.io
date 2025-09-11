<template>
  <div class="publication-detail">
    <div class="page-header">
      <h1>论文详情</h1>
      <button class="back-button" @click="goBack">← 返回列表</button>
    </div>

    <div v-if="publication" class="container">
      <div class="detail-content">
        <h2 class="pub-title">{{ publication.title }}</h2>

        <div class="pub-meta">
          <p class="pub-authors">{{ formatAuthors(publication.authors) }}</p>
          <p class="pub-year-type">{{ publication.year }} | {{ publication.type }}</p>
          <p class="pub-venue">
            <em>{{ publication.venue }}</em>
          </p>
        </div>

        <div class="pub-links">
          <a
            v-if="publication.pdf && publication.pdf !== '#'"
            :href="publication.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="pub-link"
            :class="{ 'doi-link': publication.pdf.includes('doi.org') }"
          >
            {{ publication.pdf.includes('doi.org') ? '访问DOI' : '下载PDF' }}
          </a>
          <button @click="showCiteModal" class="pub-link">引用</button>
        </div>

        <!-- 详细内容区域 - 根据论文ID显示特定内容 -->
        <div v-if="hasDetailedContent" class="pub-details">
          <!-- 显示对应的论文图片 -->
          <div v-if="paperImage" class="paper-image-container">
            <img :src="paperImage" alt="论文相关图片" class="paper-image">
          </div>
          <div class="detail-section" v-html="detailedContent"></div>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      <p>加载中...</p>
    </div>

    <!-- 引用弹窗 -->
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePublicationsStore } from '@/data/publicationsStore.js'

const router = useRouter()
const route = useRoute()
const { publications } = usePublicationsStore()

// 获取路由参数中的ID
const publicationId = route.params.id

// 当前出版物数据
const publication = ref(null)

// 引用弹窗相关状态
const showModal = ref(false)
const currentCiteText = ref('')

// 组件挂载时获取出版物数据
onMounted(() => {
  loadPublication()
})

// 加载单个出版物数据
const loadPublication = () => {
  const found = publications.value.find((pub) => pub.id === publicationId)
  if (found) {
    publication.value = found
  } else {
    // 如果找不到，返回列表页
    router.push('/publications')
  }
}

// 返回上一页
const goBack = () => {
  router.push('/publications')
}

// 格式化作者显示
const formatAuthors = (authors) => {
  // 清除特殊字符并格式化作者列表
  return authors
    .replace(/[*#†‡;]/g, '')
    .replace(/，/g, ', ')
    .replace(/;/g, ', ')
}

// 显示引用弹窗
const showCiteModal = () => {
  if (!publication.value) return

  // 根据出版物类型生成不同格式的 BibTeX 引用
  const pub = publication.value
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

// 关闭引用弹窗
const closeCiteModal = () => {
  showModal.value = false
}

// 复制引用文本
const copyCiteText = () => {
  navigator.clipboard.writeText(currentCiteText.value).then(() => {
    alert('引用已复制到剪贴板!')
  })
}

// 判断是否有详细内容
const hasDetailedContent = computed(() => {
  if (!publication.value) return false
  // 根据论文ID判断是否有详细内容
  const idsWithDetail = ['paper1', 'paper2', 'paper3']
  return idsWithDetail.includes(publication.value.id)
})

// 计算属性：获取详细内容
const detailedContent = computed(() => {
  if (!publication.value) return ''

  // 根据论文ID返回不同的详细内容
  switch (publication.value.id) {
    case 'paper1': // CanCellCap
      return `
        <div class="detail-section">
          <h3>研究背景</h3>
          <p>在单细胞RNA测序（scRNA-seq）技术推动癌症研究的背景下，癌细胞在不同组织环境中的异质性识别仍是关键挑战。传统方法难以有效处理跨组织类型的癌细胞捕获问题，尤其面临组织微环境差异导致的模型泛化能力不足。</p>
          
          <h3>核心创新</h3>
          <p>研究团队提出CanCellCap（Cancer Cell Capture）方法，通过多域学习框架整合多组织类型的单细胞转录组数据，构建跨域共享的癌细胞特征表示，首次实现了不依赖特定组织环境的癌细胞通用识别模型。</p>
          
          <p>CanCellCap的核心创新在于设计了"域自适应特征对齐"与"组织特异性抑制"双机制：</p>
          <ul>
            <li>一方面通过对抗学习对齐不同组织域的特征分布，消除组织背景差异对癌细胞信号的干扰</li>
            <li>另一方面利用注意力机制抑制组织特异性基因表达模式，强化癌细胞共性特征的提取</li>
          </ul>
          
          <h3>实验结果</h3>
          <p>在涵盖肺癌、乳腺癌、结直肠癌等8种实体瘤的scRNA-seq数据集上，CanCellCap相比传统方法将癌细胞识别准确率平均提升23.7%，尤其在罕见组织类型癌症数据中表现出显著优势，成功捕获了传统方法漏检的低丰度癌细胞亚群。</p>
          
          <h3>研究意义</h3>
          <p>该研究不仅为跨组织类型的癌症单细胞分析提供了标准化工具，其多域学习策略也为解决生物医学领域跨数据域的共性问题提供了方法论参考。目前，CanCellCap已开源至GitHub（https://github.com/Ying-Lab/CanCellCap），配套提供包含10万+单细胞的跨组织癌细胞特征数据库，助力精准肿瘤学中癌细胞异质性研究及治疗靶点发现。</p>
          
          <p>未来研究将进一步拓展该框架在循环肿瘤细胞（CTC）及肿瘤微环境动态演化研究中的应用。</p>
        </div>
      `

    case 'paper2': // MicroDIG
      return `
        <div class="detail-section">
          <h3>研究背景</h3>
          <p>微生物群落内物种的有向互作（如共生、捕食）是维持群落动态平衡的核心，其解析对理解人体健康（如肠道菌群与疾病关联）、生态功能（如养分循环）至关重要。然而，传统研究面临多重挑战：湿实验培养仅能分析少量微生物，相关性方法（如 Pearson、SparCC）无法捕捉有向性及时滞性，基于 GLV 方程的工具（如 MDSINE、CLV）也仅适用于 40 个 OTU 以下的小规模群落，且真实数据中物种互作标签缺失导致监督学习难以应用。</p>
          
          <h3>核心创新</h3>
          <p>为此，研究团队提出 MicroDIG 框架，首次将自监督学习与生态机理模型融合，突破大规模微生物组纵向数据的有向互作估计瓶颈。MicroDIG 的核心创新在于三大串行模块：</p>
          <ul>
            <li>一是自监督数据增强，基于 GLV 方程从原始丰度数据中采样真实 OTU 丰度，模拟生成带互作强度标签的虚拟 OTU 时序数据，解决无标注数据难题</li>
            <li>二是有向互作估计，通过自编码器提取时序特征，同步优化数据重构损失与互作强度估计损失，精准推断物种间作用强度</li>
            <li>三是有效性校验，构建 "真/假" 互作的 p 值分布，利用极大似然估计剔除假阳性（如传递性互作），确保结果高置信度</li>
          </ul>
          
          <h3>实验结果</h3>
          <p>实验验证显示，MicroDIG 在 28 个模拟数据集（40-100 个 OTU，4 类互作模式）及健康女性肠道真实数据（131 个时间点）上，均优于 Pearson、SparCC、CCLasso、GLV-based models、CLV 五类基准方法：大规模群落（100 个 OTU）中 R² 值仍保持 0.99 以上，假阳性率降低 2%-10%，能准确识别作用方向及剔除传递性假阳性。</p>
          
          <h3>研究意义</h3>
          <p>目前，MicroDIG 代码已开源（https://github.com/Ying-Lab/MicroDIG），为肠道菌群、环境微生物等领域的大规模互作网络研究提供标准化工具，未来可进一步拓展至多物种协同互作分析及外部扰动（如宿主健康状态）的融合建模。</p>
        </div>
      `

    case 'paper3': // ViTax
      return `
        <div class="detail-section">
          <h3>研究背景</h3>
          <p>病毒分类面临三大核心挑战：长基因组序列（如痘病毒超 200kb）的计算复杂度、RNA 病毒高突变率导致的分类歧义、以及环境宏基因组中未知病毒属的开放集识别难题。传统方法（如 Kraken、CAT）依赖 k-mer 匹配，无法捕捉长距离序列模式；基于深度学习的方法（如 DeepVirFinder）多针对短读段，且缺乏层级分类能力。</p>
          
          <h3>核心创新</h3>
          <p>为此，研究团队提出 ViTax 框架，首次将 HyenaDNA 基础模型与分类置信树结合，实现从科到种的自适应层级病毒分类。ViTax 的核心创新体现在三层技术架构：</p>
          <ul>
            <li>① HyenaDNA 特征提取层，利用 Hyena 算子的线性复杂度特性处理长基因组序列，通过位置编码与多尺度卷积捕获序列模式，相比 Transformer 降低 92% 计算开销</li>
            <li>② 监督原型对比学习（PCL）模块，构建病毒属级原型向量库，通过三元组损失（锚点-正例-负例）强化同类病毒特征聚类，在 HIV-1 高突变数据集上使类内距离缩小 41%</li>
            <li>③ 分类置信树（CCT）决策层，集成 LCA 算法与置信度剪枝策略，当预测置信度 < 0.7 时自动激活跨层特征融合，有效处理未知病毒属（开放集）分类</li>
          </ul>
          
          <h3>实验结果</h3>
          <p>在标准数据集上，ViTax 显著优于现有方法：RefSeq 病毒基因组数据集（含 1286 个 genus）中，genus 级分类准确率达 0.957，比 Kraken2 提升 21.3%；海洋 GOV2.0 宏基因组数据（含 130 万病毒序列）开放集分类准确率 0.81，成功识别 17 个新病毒属；对 Ebolavirus 变异株的种级分类准确率 0.987，远超传统 BLAST 方法（0.72）。</p>
          
          <h3>研究意义</h3>
          <p>目前 ViTax 已开源至 GitHub（https://github.com/Ying-Lab/ViTax），提供预训练模型（支持 10 万 + 序列批量推理）、Docker 部署方案及可视化分类报告生成工具，其长序列处理能力特别适用于噬菌体疗法、环境病毒组研究及新兴病毒快速鉴定场景。</p>
        </div>
      `

    default:
      return ''
  }
})

// 计算属性：获取对应的论文图片
const paperImage = computed(() => {
  if (!publication.value) return ''
  
  // 根据论文ID返回对应的图片路径
  const imageMap = {
    'paper1': '/src/assets/paper/cancell_cap_headimg.png',
    'paper2': '/src/assets/paper/microdig_headimg.png',
    'paper3': '/src/assets/paper/vitax_headimg.png'
  }
  
  return imageMap[publication.value.id] || ''
})
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
.pub-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  line-height: 1.4;
}
.pub-meta {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.pub-authors {
  font-size: 1.1rem;
  margin: 10px 0;
  color: #555;
  line-height: 1.6;
}
.pub-year-type {
  font-weight: bold;
  color: #4b8f8b;
  margin: 8px 0;
}
.pub-venue {
  color: #666;
  margin: 8px 0;
  font-style: italic;
}
.pub-links {
  margin-bottom: 30px;
}
.pub-link {
  display: inline-block;
  margin-right: 20px;
  padding: 8px 16px;
  background-color: #4b8f8b;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
  font-size: 1rem;
}
.pub-link:hover {
  background-color: #3d736f;
}
.doi-link {
  background-color: #1a73e8;
}
.doi-link:hover {
  background-color: #1557b0;
}
.pub-abstract {
  margin-top: 30px;
}
.pub-abstract h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #4b8f8b;
}
.pub-abstract p {
  line-height: 1.8;
  color: #444;
}
.no-abstract {
  color: #999;
  font-style: italic;
}

/* 加载状态 */
.loading {
  text-align: center;
  padding: 60px 20px;
  color: #666;
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
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 400px;
  overflow-y: auto;
  font-family: monospace;
  margin: 15px 0;
}
.copy-button {
  background-color: #4b8f8b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.copy-button:hover {
  background-color: #3d736f;
}

/* 详细内容区域样式 */
.pub-details {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

/* 论文图片容器样式 */
.paper-image-container {
  margin-bottom: 30px;
  text-align: center;
}

.paper-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.paper-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.detail-section h3 {
  font-size: 1.3rem;
  color: #4b8f8b;
  margin: 25px 0 15px 0;
  font-weight: 600;
}

.detail-section h3:first-child {
  margin-top: 0;
}

.detail-section p {
  line-height: 1.8;
  color: #444;
  margin-bottom: 15px;
}

.detail-section ul {
  padding-left: 25px;
  margin-bottom: 15px;
}

.detail-section li {
  line-height: 1.8;
  color: #444;
  margin-bottom: 10px;
}

.detail-section a {
  color: #4b8f8b;
  text-decoration: none;
  border-bottom: 1px solid #4b8f8b;
  transition: all 0.3s ease;
}

.detail-section a:hover {
  color: #3a6b68;
  border-bottom-color: #3a6b68;
}

/* 响应式调整 */
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
  .pub-title {
    font-size: 1.6rem;
  }
  .pub-link {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  }
  .detail-section h3 {
    font-size: 1.2rem;
  }
}
</style>
