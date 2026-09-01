import { ref } from 'vue'

import pcbScanNetOverview from '@/assets/activity/pcb1014602-overview.jpg'
import pcbSkimOverview from '@/assets/activity/pcb1014638-overview.jpg'

// 导入活动图片资源
import activityImg1 from '@/assets/activity/1.png'
import activityImg2_1 from '@/assets/activity/2025欢送 1.jpg'
import activityImg2_2 from '@/assets/activity/2025欢送 2.jpg'
import activityImg2_3 from '@/assets/activity/2025欢送 3.jpg'
import activityImg3 from '@/assets/activity/仁豪师兄回校.jpg'
import activityImg4 from '@/assets/activity/24教师节.jpg'
import activityImg5_1 from '@/assets/activity/24毕业 1.jpg'
import activityImg5_2 from '@/assets/activity/24毕业 2.jpg'
import activityImg5_3 from '@/assets/activity/24毕业 3.jpg'
import activityImg5_4 from '@/assets/activity/24毕业 4.jpg'
import activityImg6_1 from '@/assets/activity/海门岛团建 1.jpg'
import activityImg6_2 from '@/assets/activity/海门岛团建 2.jpg'
import activityImg7_1 from '@/assets/activity/2025迎新博饼1.jpg'
import activityImg7_2 from '@/assets/activity/2025迎新博饼2.jpg'
import activityImg7_3 from '@/assets/activity/2025迎新博饼3.jpg'
import activityImg8_1 from '@/assets/activity/2025获奖1.jpg'
import activityImg8_2 from '@/assets/activity/2025获奖3.jpg'
import activityImg9 from '@/assets/activity/2025 BIBM.jpg'
import activity20251021 from '@/assets/activity/2025-ViTrace.jpg'
import activity2025908 from '@/assets/activity/Genome_research.jpg'
import activity20260824VitaxRag from '@/assets/activity/ViTax_RAG.jpg'
import activity20260828Cara from '@/assets/activity/CARA-web.jpg'
import syntheticCellGold from '@/assets/activity/合成生物学细胞赛道截图1.jpg'
import syntheticCellSilver from '@/assets/activity/合成生物学细胞赛道截图2.jpg'
// 将activity.txt中的数据转换为结构化数据
export const useActivityStore = () => {
  const activities = ref([
    {
      id: 'activity20260828-cara',
      date: '2026.8.28',
      title: '[论文+1]《CARA》发表在 Genome Research！',
      content:
        '实验室学术成果再传捷报！近日，团队博士生曹澜等同学的论文《Robust annotation and discovery of novel cell types in single-cell ATAC-seq data through cross-modal reference alignment》发表在 Genome Research。该研究提出跨模态贝叶斯框架 CARA，从 scRNA-seq 参考数据向 scATAC-seq 转移细胞类型知识，同时实现细胞类型注释、批次效应校正与新型细胞类型发现。CARA 在多种基准数据上表现稳健，并可推广至单细胞 DNA 甲基化等基因中心组学数据，为复杂单细胞多组学数据的精准解析提供了有力工具。',
      images: [activity20260828Cara],
    },
    {
      id: 'activity20260823-synthetic-cell',
      date: '2026.8.23',
      title: '奖来！实验室两支队伍斩获合成生物学创新赛合成细胞赛金奖、银奖',
      content:
        '实验室竞赛再传捷报！在 2026 合成生物学创新赛合成细胞赛中，团队博士生拜佩豪担任队长的 BioAI-Youth-Lab 队伍荣获金奖，团队硕士生黄圩杰担任队长的 HuangLab 队伍荣获银奖。两支队伍围绕合成细胞设计与功能构建展开项目实践，在赛题分析、实验方案设计和结果呈现等环节展现了扎实的专业能力与良好的团队协作精神。祝贺两支参赛队伍取得优异成绩！',
      contentHtml:
        '实验室竞赛再传捷报！在 2026 合成生物学创新赛合成细胞赛中，团队博士生拜佩豪担任队长的 BioAI-Youth-Lab 队伍荣获金奖，团队硕士生黄圩杰担任队长的 <a href="https://life.xmu.edu.cn/info/1039/5080.htm" target="_blank" rel="noopener noreferrer">HuangLab</a> 队伍荣获银奖。两支队伍围绕合成细胞设计与功能构建展开项目实践，在赛题分析、实验方案设计和结果呈现等环节展现了扎实的专业能力与良好的团队协作精神。祝贺两支参赛队伍取得优异成绩！',
      images: [syntheticCellGold, syntheticCellSilver],
      imageCaptions: ['YingLab 队伍：合成细胞赛金奖（队长：拜佩豪）', 'HuangLab 队伍：合成细胞赛银奖（队长：黄圩杰）'],
    },
    {
      id: 'activity20260824-vitax-rag',
      date: '2026.8.24',
      title: '[论文+1]《ViTax-RAG》被 Bioinformatics Advances 接收',
      content:
        '实验室学术成果再传捷报！近日，团队博士生周峰等同学的论文《ViTax-RAG: A Retrieval-Augmented Language Modeling Tool for Viral Contig Taxonomic Classification》被 Bioinformatics Advances 接收。该研究提出检索增强语言建模工具 ViTax-RAG，将外部知识检索与语言模型相结合，用于病毒 contig 的分类鉴定，为复杂病毒序列的快速注释与病毒组学研究提供了新的计算方法。',
      images: [activity20260824VitaxRag],
    },
    {
      id: 'activity20260810-pcb',
      date: '2026.8.10',
      title: '[论文+2] 实验室两篇论文被 PLOS Computational Biology 接收',
      content:
        '近日，团队博士生白佳兴、硕士生龙泳羽的两项研究成果同时被 PLOS Computational Biology 接收，实验室在单细胞计算生物学方向再添两篇论文。白佳兴的研究提出 SKIM，通过模型动态反馈构建高质量细胞草图，在大规模单细胞转录组分析中兼顾计算效率与注释表现；龙泳羽的研究提出 ScanNet，将转录调控网络先验融入异质图学习，用于提升单细胞类型注释的准确性与泛化能力。祝贺两位同学，也感谢团队成员在研究推进过程中的共同努力！',
      images: [pcbSkimOverview, pcbScanNetOverview],
      imageCaptions: ['SKIM 方法总览（Fig. 2）', 'ScanNet 方法框架（Fig. 1）'],
    },
    {
      id: "activity2025908",
      date: "2025.11.8",
      title: "论文++！ 《PRISM-GRN：单细胞多组学数据中恢复基因调控网络》被 Genome Research 接收！",
      content: "实验室学术成果再传捷报！近日，团队博士生章文浩等同学研究论文《Recovering gene regulatory networks in single-cell multiomics data with PRISM-GRN》被 Genome Research 接收（PMID: 41067887）。该研究提出贝叶斯模型 PRISM-GRN，整合先验 GRN、scRNA-seq 与 scATAC-seq 数据，按基因调控机制构建可解释架构，在 4 个基准数据集上优于 7 种基线方法，能精准重建细胞类型特异性 GRN，且适配非配对数据，为解析细胞异质性及疾病机制提供有力工具。",
      images: [activity2025908]
    },
    {
      
        id: "activity20251021",
        date: "2025.10.21",
        title: "实验室论文《ViTrace：基于混合语言模型的肿瘤转录组病毒检测框架》被 Communications Biology 接收 ！",
        content: "实验室学术成果再添新喜！近日，团队博士生周峰等同学的论文《ViTrace Detects Viral Signatures in Tumor Transcriptomes Using a Hybrid Language Model》被 Communications Biology 接收。该研究提出参考独立的混合语言模型 ViTrace，整合多维度生物特征，突破传统方法局限，对未知及变异病毒识别能力显著提升，在跨物种、跨系统场景中表现优异，为病毒相关癌症机制研究及病毒 - 宿主互作探索提供强大工具。",
        images: [activity20251021]
        
    },
    {
      id: 'activity9',
      date: '2025.10.8',
      title: "【论文+3】实验室三篇论文分别被 BIBM 2025 与 Bioinformatics Advances 接收",
      content: "实验室学术成果喜报频传，三位同学的研究论文成功被国际重要期刊与会议接收。其中，肖子璇同学的《BGC Prediction on Minimizing Generalization Error Upper Bound by Collaborative Belief from Fused Biological Language Representations》、林炳垚同学的《PhyMicroNet: Inferring Directed Species Interactions in Microbiomes from Longitudinal Abundance Data Using Physics-Informed Neural Networks》两篇论文，双双入选 2025 年国际生物医学信息学会议（BIBM）；高奕淳同学的《ICCTax: A Hierarchical Taxonomic Classifier for Metagenomic Sequences on a Large Language Model》则成功被《Bioinformatics Advances》接收。三篇成果聚焦生物信息学领域核心议题，展现了扎实的科研能力与创新视角，也彰显了实验室在该领域的培养成效与学术积累。",
      images: [activityImg9]
    },
    {
      id: 'activity8',
      date: '2025.9.25',
      title: '曹澜同学荣获第三届厦门大学科技期刊论文视频摘要大赛二等奖',
      content: '2025年9月25日，实验室曹澜同学在第三届厦门大学科技期刊论文视频摘要大赛中表现优异，其作品《基于心率变异性非线性动力学算法的不同年龄心脏分析》从20项参赛作品中脱颖而出，荣获二等奖。该研究运用非线性动力学方法分析心率变异性，揭示年轻人心脏活动更“混沌”且适应性更强，为心血管健康监测与早期预警提供了新视角。',
      images: [activityImg8_1, activityImg8_2],
    },
    {
      id: 'activity7',
      date: '2025.09.22',
      title: '2025年迎新与博饼主题团建活动（月满中秋，情聚实验室）',
      content:
        '2025年9月22日，正值国庆中秋佳节来临之际，实验室组织了以"月满中秋，情聚实验室"为主题的迎新与博饼团建活动。活动现场，新老成员齐聚一堂，共同参与博饼游戏，体验闽南传统习俗，交流科研心得与生活趣事。实验室为大家准备了精美的礼品，现场氛围温馨欢乐，不仅让新成员感受了实验室的温暖，也增强了团队凝聚力。',
      images: [activityImg7_2, activityImg7_3, activityImg7_1],
    },
    {
      id: 'activity1',
      date: '2025.07.14',
      title: 'Fengzhu Sun教授厦门大学学术交流会',
      content:
        '2025年7月14日，国际知名学者孙丰珠教授莅临厦门大学信息学院实验室交流指导。实验室成员汇报了最新研究进展，涵盖人工智能、数据挖掘等领域。孙教授肯定了研究成果，并针对各项目提出建设性意见，剖析关键问题，分享解决思路，为课题推进指明方向。现场学术讨论热烈。',
      images: [activityImg1],
    },
    {
      id: 'activity2',
      date: '2025.06.20',
      title: '2025届毕业欢送会（凤凰花开，骊歌起航——2025届毕业谢师宴暨欢送活动温情举办）',
      content:
        '2025年6月20日，凤凰花开之际，实验室为2025届毕业生举办"凤凰花开，骊歌起航"欢送会。师生齐聚餐厅举办温馨谢师宴，毕业生向导师表达感恩，导师寄语祝福。随后在凤凰花下、德旺图书馆前合影留念，为求学时光画上圆满句号，毕业生们承诺常回家看看。',
      images: [activityImg2_1, activityImg2_2, activityImg2_3],
    },
    {
      id: 'activity3',
      date: '2024.11.15',
      title: '仁豪师兄回校看望老师',
      content:
        '2024年11月15日，实验室2023届毕业生仁豪师兄返校看望恩师及师弟师妹。当天下午，仁豪与师生聚餐交流，分享工作体验与职场心得，介绍行业发展趋势，解答职业规划、求职技巧等问题，鼓励学弟学妹珍惜时光提升能力，为在校生与毕业生搭建通信桥梁。',
      images: [activityImg3],
    },
    {
      id: 'activity4',
      date: '2024.09.10',
      title: '实验室庆祝第四十个教师节感恩活动',
      content:
        '2024年9月10日第40个教师节，实验室全体同学精心策划感恩活动。同学们早早来到实验室布置场地，准备鲜花、贺卡和礼物。随后前往导师办公室献花送祝福，表达对导师学业指导和生活关怀的感激。导师勉励大家继续努力，活动氛围温馨，体现了尊师重教的团队文化。',
      images: [activityImg4],
    },
    {
      id: 'activity5',
      date: '2024.06.25',
      title: '2024届毕业团建（青春不散场，感恩前行——2024届毕业欢送会）',
      content:
        '2024年6月25日，实验室组织"青春不散场，感恩前行"2024届毕业团建。师生首先在德旺图书馆前拍摄毕业合影，记录难忘时刻。随后前往厦门园林植物园漫步交流，放松心情。中午举办温馨谢师宴，毕业生表达感恩与不舍，导师送上毕业赠言，活动充满温馨与感动。',
      images: [activityImg5_1, activityImg5_2, activityImg5_3, activityImg5_4],
    },
    {
      id: 'activity6',
      date: '2023.12.05',
      title: '海门岛团建（冬日之旅：实验室团建正当时）',
      content:
        '2023年12月5日，实验室组织"冬日之旅"海门岛自驾团建，丰富业余生活，增强团队凝聚力。成员们集合驱车前往，抵达后沿海岸线漫步，欣赏海岛风光。中午品尝新鲜海鲜大餐，下午在草坪上进行团队游戏，在轻松氛围中加深了解与友谊，为科研工作奠定坚实团队基础。',
      images: [activityImg6_1, activityImg6_2],
    },
  ])

  return {
    activities,
  }
}
