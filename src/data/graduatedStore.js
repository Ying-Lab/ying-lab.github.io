// src/data/graduatedStore.js
import { ref } from 'vue'
import rawCsv from '@/assets/team/graduated.csv?raw'

/**
 * 解析 graduated.csv 数据
 * 字段格式：学号,姓名,年级,学生类别,院系,专业
 */
function parseGraduatedCsv(csvText) {
  if (!csvText) return []

  const lines = csvText.trim().split(/\r?\n/)
  const result = []

  // 第一行为表头，从第二行开始解析
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const parts = line.split(',')
    if (parts.length < 6) continue

    const studentId = parts[0].trim()
    const name = parts[1].trim()
    const grade = parts[2].trim()
    const rawCategory = parts[3].trim()
    const department = parts[4].trim()
    const majorRaw = parts[5].trim()

    // 去除专业代码前缀，例如 "081103 系统工程" -> "系统工程"
    const major = majorRaw.replace(/^\d+\s*/, '')

    // 格式化学生类别标签
    let category = '硕士'
    let categoryShort = '学硕'
    if (rawCategory.includes('学术')) {
      category = '学术型硕士'
      categoryShort = '学硕'
    } else if (rawCategory.includes('专业')) {
      category = '专业型硕士'
      categoryShort = '专硕'
    }

    // 提取年份数字供排序
    const yearMatch = grade.match(/\d+/)
    const year = yearMatch ? parseInt(yearMatch[0], 10) : 0

    result.push({
      id: studentId || `${grade}-${name}-${i}`,
      studentId,
      name,
      grade,
      year,
      category,
      categoryShort,
      rawCategory,
      department,
      major,
    })
  }

  // 按年级降序排列（最新年份在前）
  return result.sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year
    }
    return a.name.localeCompare(b.name, 'zh-CN')
  })
}

const graduates = ref(parseGraduatedCsv(rawCsv))

export function useGraduatedStore() {
  return { graduates }
}
