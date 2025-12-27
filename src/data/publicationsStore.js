import { ref } from 'vue'
import papersJson from './papers.json'

// 从papers.json导入数据
const papersData = papersJson.papers

// 将papers数据转换为publications格式
const transformedPublications = papersData.map((paper) => {
  // 构建venue字符串
  let venue = paper.journal
  if (paper.volume) venue += `, Volume ${paper.volume}`
  if (paper.issue) venue += `, Issue ${paper.issue}`
  if (paper.pages) venue += `, Pages ${paper.pages}`

  // 判断类型
  let type = 'Journal'
  if (paper.journal && paper.journal.includes('Conference')) {
    type = 'Conference'
  } else if (paper.journal && paper.journal.includes('Proceedings')) {
    type = 'Conference'
  }

  return {
    id: `paper${paper.id}`,
    year: paper.year,
    type: type,
    authors: paper.authors,
    title: paper.title,
    venue: venue,
    pdf: paper.doi || '#',
    cite: '#',
  }
})

const publications = ref(transformedPublications)

export function usePublicationsStore() {
  return { publications }
}
