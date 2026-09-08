<template>
  <div class="people-page">
    <!-- 英雄式页眉 -->
    <header class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="title">研究团队</h1>
        <p class="subtitle">BioAI-Youth-Lab | 一个富有创造力与协作精神的学术共同体</p>
      </div>
    </header>

    <!-- 内容容器 -->
    <div class="container">
      <!-- 团队介绍 -->
      <section class="team-intro" v-scroll-fade-in>
        <h2>团队简介</h2>
        <p>
          本研究团队以智能计算为核心，专注于解决生物医学、健康医疗及生物信息学中的复杂数据分析与建模挑战。团队成员来自不同学科背景，形成了跨领域、多元化的研究氛围。我们注重理论与实践相结合，积极开展产学研合作，推动科研成果转化。
        </p>
      </section>

      <!-- 团队成员分组展示 -->
      <div v-for="group in groupedMembers" :key="group.category" class="team-section">
        <div class="section-header" v-scroll-fade-in="200">
          <h2 class="category-title">{{ group.category }}</h2>
          <div class="section-divider"></div>
        </div>

        <div class="members-grid">
          <div
            v-for="(member, index) in group.members"
            :key="member.name"
            class="member-card"
            v-scroll-fade-in="300 + index * 50"
          >
            <!-- 一寸照片容器 -->
            <div class="photo-container">
              <img :src="member.imageUrl" :alt="member.name" class="member-photo" />
              <div v-if="member.link" class="link-overlay" @click="openExternalLink(member.link)">
                <i class="fas fa-external-link-alt"></i>
              </div>
            </div>

            <!-- 信息区域 -->
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-desc">{{ member.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 往届毕业生板块 -->
      <div class="team-section alumni-section">
        <div class="section-header" v-scroll-fade-in="200">
          <h2 class="category-title">往届毕业生</h2>
          <div class="section-divider"></div>
          <p class="alumni-subtitle">
            青蓝相继，薪火相传 ｜ 见证每一位从实验室起航的学子
          </p>
        </div>

        <!-- 毕业生展示（按年级分组的时间轴样式） -->
        <div class="timeline-container">
          <div
            v-for="(group, gIdx) in graduatedGrouped"
            :key="group.grade"
            class="cohort-timeline-item"
            v-scroll-fade-in="300 + (gIdx % 6) * 40"
          >
            <!-- 时间轴圆点标记 -->
            <div class="timeline-marker"></div>

            <!-- 年级标题与人数徽章 -->
            <div class="cohort-header-badge">
              <span class="cohort-year-title">{{ group.grade }}</span>
              <span class="cohort-badge-count">{{ group.students.length }} 人</span>
            </div>

            <!-- 成员卡片网格 -->
            <div class="alumni-cards-grid">
              <div
                v-for="student in group.students"
                :key="student.id"
                class="alumni-card"
              >
                <div class="alumni-name-row">
                  <span class="alumni-name">{{ student.name }}</span>
                  <span
                    class="alumni-badge"
                    :class="student.categoryShort === '学硕' ? 'badge-academic' : 'badge-professional'"
                  >
                    {{ student.category }}
                  </span>
                </div>
                <div class="alumni-major" :title="student.major">
                  <i class="fas fa-graduation-cap major-icon"></i>
                  <span>{{ student.major }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚装饰 -->
    <div class="page-footer"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePeopleStore } from '@/data/peopleStore.js'
import { useGraduatedStore } from '@/data/graduatedStore.js'

const { members } = usePeopleStore()
const { graduates } = useGraduatedStore()

// 将毕业生按年级分组（已按年级降序排列）
const graduatedGrouped = computed(() => {
  const groupsMap = new Map()

  graduates.value.forEach((student) => {
    if (!groupsMap.has(student.grade)) {
      groupsMap.set(student.grade, {
        grade: student.grade,
        year: student.year,
        students: [],
      })
    }
    groupsMap.get(student.grade).students.push(student)
  })

  return Array.from(groupsMap.values())
})

// 使用 computed 属性对成员按类别进行分组
const groupedMembers = computed(() => {
  const groups = {}
  members.value.forEach((member) => {
    if (!groups[member.category]) {
      groups[member.category] = []
    }
    groups[member.category].push(member)
  })

  const categoryOrder = ['教师团队', '博士生', '硕士生']
  return Object.keys(groups)
    .map((key) => ({
      category: key,
      members: groups[key],
    }))
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category)
      const indexB = categoryOrder.indexOf(b.category)
      return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB)
    })
})

// 打开外部链接
const openExternalLink = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}

// 自定义一个 Vue 指令来实现滚动触发动画
const vScrollFadeIn = {
  mounted: (el, binding) => {
    const delay = binding.value || 0
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

// 生命周期钩子
onMounted(() => {
  // 初始化时不需要额外的滚动事件监听
})
</script>

<style scoped>
/* 全局样式 */
.people-page {
  position: relative;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 100px;
  overflow-x: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 英雄式页眉 */
.hero-section {
  position: relative;
  height: 60vh;
  min-height: 400px;
  background-image: url('@/assets/media/welcome2.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
  margin-bottom: 40px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  z-index: 1;
}

.hero-content {
  position: relative;
  max-width: 800px;
  padding: 0 20px;
  z-index: 2;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 20px;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.95;
  margin-bottom: 40px;
  font-weight: 300;
  line-height: 1.6;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 50px;
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #fff;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 400;
}

/* 主容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 60px 20px;
}

/* 团队介绍 */
.team-intro {
  padding: 80px 40px 40px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.team-intro h2 {
  font-size: 2.2rem;
  margin-bottom: 30px;
  color: #2c3e50;
  font-weight: 600;
}

.team-intro p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 0;
}

/* 研究方向 */
.research-directions {
  margin-bottom: 80px;
  padding: 0 40px;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.research-directions h3 {
  font-size: 1.8rem;
  margin-bottom: 40px;
  text-align: center;
  color: #2c3e50;
  font-weight: 600;
}

.directions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.direction-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 35px 25px;
  text-align: center;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.direction-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border-color: #4b8f8b;
}

.direction-icon {
  width: 64px;
  height: 64px;
  background-color: #4b8f8b;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 1.2rem;
}

.direction-card h4 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #2c3e50;
  font-weight: 600;
}

.direction-card p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 0;
}

/* 团队成员部分 */
.team-section {
  margin-bottom: 80px;
  padding: 0 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.category-title {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #2c3e50;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.section-divider {
  width: 60px;
  height: 3px;
  background-color: #4b8f8b;
  margin: 0 auto;
}

/* 成员网格 - 使用Flexbox替代Grid以解决居中问题 */
.members-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

/* 成员卡片 - Flexbox布局下的卡片样式 */
.member-card {
  flex: 0 0 240px;
  max-width: 240px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

/* 教师团队特定样式 */
.team-section:nth-child(2) .members-grid {
  justify-content: center;
}

/* 成员卡片 */
.member-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  border-color: #4b8f8b;
}

/* 一寸照片容器 - 确保照片比例符合一寸照片规范 */
.photo-container {
  position: relative;
  background-color: #f8f9fa;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  overflow: hidden;
}

.member-photo {
  width: 140px;
  height: 196px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* 链接覆盖层 */
.link-overlay {
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  background: rgba(75, 143, 139, 0.9);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.member-card:hover .link-overlay {
  opacity: 1;
}

.link-overlay:hover {
  background: rgba(75, 143, 139, 1);
  transform: scale(1.1);
}

/* 信息区域 */
.member-info {
  padding: 20px 15px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.member-name {
  font-size: 1.15rem;
  margin: 0 0 8px;
  color: #2c3e50;
  font-weight: 600;
}

.member-role {
  font-size: 0.95rem;
  color: #4b8f8b;
  margin: 0 0 12px;
  font-weight: 500;
  text-align: center;
}

.member-desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 0;
  flex: 1;
  text-align: center;
}

/* 动画触发后的状态 */
.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 页脚 */
.page-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, transparent, #f8f9fa);
  z-index: -1;
}

/* 往届毕业生样式 */
.alumni-section {
  margin-top: 50px;
}

.alumni-subtitle {
  font-size: 1.05rem;
  color: #666;
  margin-top: 15px;
  margin-bottom: 35px;
  line-height: 1.6;
}

/* 时间轴容器 */
.timeline-container {
  position: relative;
  padding-left: 20px;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 27px;
  top: 15px;
  bottom: 25px;
  width: 2px;
  background: linear-gradient(to bottom, #4b8f8b 0%, rgba(75, 143, 139, 0.2) 100%);
}

.cohort-timeline-item {
  position: relative;
  margin-bottom: 35px;
  padding-left: 36px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.4s ease-out,
    transform 0.4s ease-out;
}

.cohort-timeline-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-marker {
  position: absolute;
  left: 1px;
  top: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #4b8f8b;
  box-shadow: 0 0 0 3px rgba(75, 143, 139, 0.2);
  z-index: 2;
}

.cohort-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.cohort-year-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: -0.2px;
}

.cohort-badge-count {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b8f8b;
  background: rgba(75, 143, 139, 0.12);
  padding: 2px 9px;
  border-radius: 12px;
}

/* 毕业生卡片网格 */
.alumni-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 14px;
}

.alumni-card {
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.alumni-card:hover {
  transform: translateY(-3px);
  border-color: #4b8f8b;
  box-shadow: 0 8px 18px rgba(75, 143, 139, 0.12);
}

.alumni-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.alumni-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
}

.alumni-badge {
  font-size: 0.72rem;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 6px;
  white-space: nowrap;
}

.badge-academic {
  background: rgba(75, 143, 139, 0.12);
  color: #2a6864;
  border: 1px solid rgba(75, 143, 139, 0.25);
}

.badge-professional {
  background: rgba(59, 130, 246, 0.09);
  color: #2563eb;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.alumni-major {
  font-size: 0.84rem;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.major-icon {
  font-size: 0.78rem;
  color: #4b8f8b;
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .members-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 25px;
  }
}

@media (max-width: 992px) {
  .hero-section {
    height: 45vh;
    min-height: 350px;
  }
}

@media (max-width: 768px) {
  .page-header {
    height: 60vh;
    min-height: 400px;
  }

  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .header-stats {
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
    padding: 15px 10px;
  }

  .container {
    margin-top: -60px;
    padding-bottom: 40px;
  }

  .team-intro {
    padding: 60px 20px 30px;
  }

  .team-intro h2 {
    font-size: 1.8rem;
  }

  .research-directions,
  .team-section {
    padding: 0 20px;
  }

  .research-directions h3 {
    font-size: 1.6rem;
  }

  .category-title {
    font-size: 1.8rem;
  }

  .members-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .photo-container {
    height: 180px;
  }

  .member-photo {
    width: 120px;
    height: 168px;
  }

  /* 毕业生响应式适配 */
  .timeline-container {
    padding-left: 0;
  }

  .timeline-container::before {
    display: none;
  }

  .cohort-timeline-item {
    padding-left: 0;
  }

  .timeline-marker {
    display: none;
  }

  .alumni-cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .page-header {
    height: 50vh;
    min-height: 350px;
  }

  .title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .stat-number {
    font-size: 2rem;
  }

  .container {
    margin-top: -40px;
    padding-bottom: 30px;
    border-radius: 8px;
  }

  .members-grid {
    grid-template-columns: 1fr;
    max-width: 300px;
    margin: 0 auto;
  }

  .direction-card {
    padding: 25px 20px;
  }

  .photo-container {
    height: 160px;
  }

  .member-photo {
    width: 100px;
    height: 140px;
  }
}
</style>
