import researchImg1 from '@/assets/latestnews/one.png'
import researchImg2 from '@/assets/latestnews/two.png'

export const newsItems = [
  {
    id: 1,
    slug: 'prior-knowledge-omics',
    title: '先验知识与高维数据融合的组学数据建模研究',
    summary:
      '通过大模型、神经网络、图网络、检索增强等手段，开发新的计算模型和智能框架，实现数据与已知的生物学知识（先验知识）的有机融合，来更好地分析、解释和挖掘单细胞多组学数据中蕴含的高维、稀疏、复杂的生物学信息，从而更精确地揭示细胞异质性、细胞状态转换、基因调控网络和疾病机制。',
    image: researchImg1,
  },
  {
    id: 2,
    slug: 'dynamic-data-analysis',
    title: '基于智能算法与统计推断的动态数据特性分析',
    summary:
      '利用时间序列微生物组数据，通过物理信息神经网络、贝叶斯网络等手段，将智能算法与严谨的统计推断方法，以揭示微生物群落内部动态的、可能具有因果指向性的相互作用关系，并最终构建可靠的微生物相互作用网络，该研究对于探索肠道菌群等复杂微生物系统中动态的、有方向的相互作用规则具有重要意义。',
    image: researchImg2,
  },
]
