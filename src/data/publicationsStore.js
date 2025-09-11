// src/data/publicationsStore.js
import { ref } from 'vue'

// 从papers.json导入数据
const papersData = [
  {
    id: 1,
    authors:
      'Jiaxing Bai; Yichun Gao; Feng Zhou; Yushuang He; Chen Lin*; Xiaobing Huang*; Ying Wang*',
    title:
      'CanCellCap: robust cancer cell capture across tissue types on single-cell RNA-seq data by multi-domain learning',
    journal: 'BMC Biology',
    volume: '23',
    issue: '230',
    pages: '1-19',
    year: 2025,
    doi: 'https://doi.org/10.1186/s12915-025-02337-1',
  },
  {
    id: 2,
    authors: '喻姚洋†; 章文浩†；孙丰珠；王颖*',
    title: 'MicroDIG: 基于自监督学习的大规模微生物组纵向数据有向互作估计',
    journal: '中国科学:数学',
    volume: '55',
    issue: '7',
    pages: '1-24',
    year: 2025,
    doi: 'https://doi.org/10.1360/SSM-2024-0293',
  },

  {
    id: 3,
    authors: 'He YuShuang†; Zhou Feng†; Bai JiaXing; Gao YiChun; Huang Xiaobing*; Wang Ying*',
    title:
      'ViTax: adaptive hierarchical viral taxonomy classification with a taxonomy belief tree on a foundation model',
    journal: 'Briefings in Bioinformatics',
    volume: '26',
    issue: '1',
    pages: 'bbaf041',
    year: 2025,
    doi: 'https://doi.org/10.1093/bib/bbaf041',
  },
  {
    id: 4,
    authors: 'Chen Kehan†; Bai Jiaxing†; Ji Yishan; Lin Chen*; Wang Ying*',
    title: 'Joint User and Item Prototype Alignment for Cross-Platform Recommendation',
    journal: 'International Conference on Database Systems for Advanced Applications (DASFAA)',
    year: 2025,
  },
  {
    id: 5,
    authors: 'Liang Chengwei; Yang Fan; Huang Xiaobing; Zhang Lijuan*; Wang Ying*',
    title:
      'Deep learning assists early-detection of hypertension-mediated heart change on ECG signals',
    journal: 'Hypertension Research',
    volume: '48',
    pages: '681–692',
    year: 2025,
    doi: 'https://doi.org/10.1038/s41440-024-01938-7',
  },
  {
    id: 6,
    authors:
      'Cao Lan; Zhang Wenhao; Yang Fan; Chen Shengquan; Huang Xiaobing; Zeng Feng*; Wang Ying*',
    title:
      'BIOTIC: a Bayesian framework to integrate single-cell multi-omics for transcription factor activity inference and improve identity characterization of cells',
    journal: 'Briefings in Bioinformatics',
    volume: '26',
    issue: '1',
    pages: 'bbaf013',
    year: 2025,
    doi: 'https://doi.org/10.1093/bib/bbaf013',
  },
  {
    id: 7,
    authors: 'Zhou Feng; He Yushuang; Bai Jiaxing; Gao Yichun; Wang Ying*',
    title:
      'ViPER: Virus-Prokaryote intEraction prediction using foundation model with hierarchical contrastive learning',
    journal: 'International Conference on Bioinformatics and Biomedicine (BIBM)',
    year: 2024,
    doi: 'https://doi.org/10.1109/BIBM62325.2024.10822305',
  },
  {
    id: 8,
    authors: 'Wang Yixiao; Wang Ying*',
    title: 'FunBGC: An Intelligent Framework for Fungal Biosynthetic Gene Cluster Identification',
    journal: 'The International Symposium on Bioinformatics Research and Applications (ISBRA)',
    year: 2024,
    doi: 'https://doi.org/10.1007/978-981-97-5131-0_22',
  },
  {
    id: 9,
    authors: 'Liang Chengwei; Liu Junyu; Peng Wenzhu; Wang Boyu; Yang Fan; You Weiwei*; Wang Ying*',
    title: 'AquaGS: An integrated GUI pipeline for genomic selection in aquaculture breeding',
    journal: 'SoftwareX',
    volume: '27',
    pages: '101770',
    year: 2024,
    doi: 'https://doi.org/10.1016/j.softx.2024.101770',
  },
  {
    id: 10,
    authors: '王博宇; 杨孜孜; SUN Fengzhu; 王颖*',
    title: '基于智能计算噬菌体的细菌宿主范围预测',
    journal: '微生物学报',
    pages: '1-24',
    year: 2023,
    doi: 'https://doi.org/10.13343/j.cnki.wsxb.20230418',
  },
  {
    id: 11,
    authors: 'Zhang Wenhao; Jiang Rui; Chen Shengquan*; Wang Ying*',
    title:
      'scIBD: a self-supervised iterative-optimizing model for boosting the detection of heterotypic doublets in single-cell chromatin accessibility data',
    journal: 'Genome Biology',
    volume: '24',
    pages: '225',
    year: 2023,
    doi: 'https://doi.org/10.1186/s13059-023-03072-y',
  },
  {
    id: 12,
    authors: 'Ma Zhi#; Lu Young Yang#*; Wang Yiwen#; Lin Renhao; Yang Zizi; Zhang Fang; Wang Ying*',
    title: 'Metric learning for comparing genomic data with triplet Network',
    journal: 'Briefings in Bioinformatics',
    year: 2022,
    doi: 'https://doi.org/10.1093/bib/bbac345',
  },
  {
    id: 13,
    authors: 'Zheng Yiluan#; Shi Jianlu#; Chen Qi; Deng Chao; Yang Fan; Wang Ying*',
    title: 'Identifying individual-specific microbial DNA fingerprints from skin microbiomes',
    journal: 'Frontiers in Microbiology',
    volume: '13',
    pages: '960043',
    year: 2022,
    doi: 'https://10.3389/fmicb.2022.960043',
  },
  {
    id: 14,
    authors: 'Deng Chao#; Peng Wenzhu#; Ma Zhi; Ke Caihuan; You Weiwei*; Wang Ying*',
    title:
      'AquaGWAS: a GWAS pipeline for aquatic animals and its application to reference-required and reference-free GWAS for abalone',
    journal: 'Frontiers in Marine Science',
    volume: '9',
    pages: '841561',
    year: 2022,
    doi: 'https://doi.org/10.3389/fmars.2022.841561',
  },
  {
    id: 15,
    authors: 'Hou Yujie#; Zhang Xiong#; Zhou Qinyan#; Hong Wenxing*; Wang Ying*',
    title: 'Hierarchical microbial functions prediction by graph aggregated embedding',
    journal: 'Frontiers in Genetics',
    volume: '11',
    pages: '1592',
    year: 2021,
  },
  {
    id: 16,
    authors:
      'Wang Xingze#; Tang Bin#; Luo Xuan; Ke Caihuan; Huang Miaoqin; You Weiwei*; Wang Ying*',
    title:
      'Effects of temperature, diet and genotype-induced variations on the gut microbiota of abalone',
    journal: 'Aquaculture',
    volume: '524',
    pages: '735269',
    year: 2020,
    doi: 'https://doi.org/10.1016/j.aquaculture.2020.735269',
  },
  {
    id: 17,
    authors: 'Lu Young Yang#; Bai Jiaxing#; Wang Yiwen; Wang Ying*; Fengzhu Sun*',
    title: 'CRAFT: Compact genome Representation toward large-scale Alignment-Free database',
    journal: 'Bioinformatics',
    year: 2020,
    doi: 'https://doi.org/10.1093/bioinformatics/btaa699',
  },
  {
    id: 18,
    authors: 'Wang Ying*; Chen Qi; Deng Chao; Zheng Yiluan; Sun Fengzhu*',
    title: 'KmerGO: A Tool to Identify Group-Specific Sequences With k-mers',
    journal: 'Frontiers in Microbiology',
    volume: '11',
    pages: '2067',
    year: 2020,
    doi: 'https://doi.org/10.3389/fgene.2020.608512',
  },
  {
    id: 19,
    authors: '王颖*',
    title: '第三章 人工智能与宏基因组，《中国人工智能系列白皮书----智能生物信息处理》',
    journal: '中国人工智能学会',
    year: 2019,
  },
  {
    id: 20,
    authors: 'Wang Ziye; Wang Ying; Jed A Fuhrman; Fengzhu Sun*; Shanfeng Zhu*',
    title:
      'Assessment of metagenomic assemblers based on hybrid reads of real and simulated metagenomic sequences',
    journal: 'Briefings in Bioinformatics',
    volume: '21',
    issue: '3',
    pages: '777–790',
    year: 2020,
    doi: 'https://doi.org/10.1093/bib/bbz025',
  },
  {
    id: 21,
    authors:
      'Wang Zicheng; Lou Huazhe; Wang Ying; Shamir Ron; Jiang Rui; Chen Ting; GePMI: A statistical model for personal intestinal microbiome identification',
    title: 'GePMI: A statistical model for personal intestinal microbiome identification',
    journal: 'npj Biofilms and Microbiomes',
    volume: '4',
    issue: '1',
    pages: '20',
    year: 2018,
    doi: 'http://dx.doi.org/10.1038/s41522-018-0065-2',
  },
  {
    id: 22,
    authors: 'Wang Ying*; Fu Lei; Ren Jie; Yu Zhaoxia; Chen Ting; Sun Fengzhu*',
    title:
      'Identifying Group-Specific Sequences for Microbial Communities Using Long k-mer Sequence Signatures',
    journal: 'Frontiers in Microbiology',
    volume: '9',
    pages: '872',
    year: 2018,
    doi: 'https://doi.org/10.3389/fmicb.2018.00872',
  },
  {
    id: 23,
    authors: 'Wang Ying*; Wang Kun; Lu Young Yang; Sun Fengzhu*',
    title:
      'Improving contig binning of metagenomic data using d2s oligonucleotide frequency dissimilarity',
    journal: 'BMC Bioinformatics',
    volume: '18',
    pages: '425',
    year: 2017,
    doi: 'https://doi.org/10.1186/s12859-017-1835-1',
  },
  {
    id: 24,
    authors: 'Liao Weinan#; Ren Jie#; Wang Kun; Wang Shun; Zeng Feng, Wang Ying*, Sun Fengzhu*',
    title:
      'Alignment-free Transcriptomic and Metatranscriptomic Comparison Using Sequencing Signatures with Variable Length Markov Chains',
    journal: 'Scientific Reports',
    volume: '6',
    pages: '37243',
    year: 2016,
    doi: 'https://doi.org/10.1038/srep37243',
  },
  {
    id: 25,
    authors:
      'Wang Ying*; Lei Xiaoye; Wang Shung; Wang Zicheng; Song Nianfeng; Zeng Feng; Chen Ting',
    title: 'Effect of k-tuple length on sample-comparison with high-throughput sequencing data',
    journal: 'Biochemical and Biophysical Research Communications',
    volume: '469',
    issue: '4',
    pages: '1021-7',
    year: 2016,
    doi: 'https://doi.org/10.1016/j.bbrc.2015.11.094',
  },
  {
    id: 26,
    authors: 'Wang Ying*; Chen Lina; Song Nianfeng; Lei Xiaoye',
    title: 'GASS: genome structural annotation for Eukaryotes based on species similarity',
    journal: 'BMC Genomics',
    volume: '16',
    pages: '150',
    year: 2015,
    doi: 'https://doi.org/10.1186/s12864-015-1353-3',
  },
  {
    id: 27,
    authors: 'Zhang Lijuan; Guo Tianci; Xi Bin; Yang Fan; Wang Kun; Bi Jiancheng; Wang Ying*',
    title:
      'Automatic recognition of cardiac arrhythmias based on the geometric patterns of Poincaré plots',
    journal: 'Physiological Measurement',
    volume: '36',
    pages: '283–301',
    year: 2015,
  },
  {
    id: 28,
    authors: 'Wang Ying*; Liu Lin; Chen Lina; Chen Ting; Sun Fengzhu*',
    title: 'Comparison of Metatranscriptomic Samples Based on k-Tuple Frequencies',
    journal: 'PLoS ONE',
    volume: '9',
    issue: '1',
    pages: 'e84348',
    year: 2014,
    doi: 'https://doi.org/10.1371/journal.pone.0084348',
  },
  {
    id: 29,
    authors: '王颖*; 刘麟',
    title: '一种基于RNA-Seq 的基因组注解评估方法',
    journal: '科学通报',
    volume: '58',
    pages: '3471–3482',
    year: 2013,
    doi: 'https://doi.org/10.1371/journal.pone.0084348',
  },
  {
    id: 30,
    authors: 'Wang Ying; Jianguo Cao; Lin Liu; Kai Feng; Shuyi Hong; Bin Xi',
    title:
      'Framework of Telemedicine Diagnosis Decision-Making with Bayesian Network based on Multi-Agent System',
    journal: 'Proceedings of 2012 7th International Conference on Computer Science and Education',
    year: 2012,
    doi: 'EI20124515635576',
  },
  {
    id: 31,
    authors: 'Feng Kai; Wang Ying*',
    title: 'A Valid Method of Inverse R Wave Detection',
    journal: 'Journal of Computational Information Systems',
    volume: '9',
    issue: '3',
    year: 2013,
  },
  {
    id: 32,
    authors: 'Wang Ying*; Lin Liu',
    title: 'Random Forests Toolbox with Scilab and its Application',
    journal: '2012 7th International Conference on Computer Science and Education, ICCSE 2012',
    year: 2012,
    doi: 'EI 20124515635799',
  },
  {
    id: 33,
    authors:
      'Wang Ying*; Mehta Gaurang; Mayani Rajiv; Lu Jingxi; Souaiaia Tade; Chen Yangho; Clark Andrew, Yoon Jae Hee, Wan Lin, Evgrafov V. Oleg, Knowles A. James*, Deelman Ewa*, Chen Ting*',
    title: 'RseqFlow: Workflows for RNA-Seq data analysis',
    journal: 'Bioinformatics',
    volume: '27',
    issue: '18',
    pages: '2598-600',
    year: 2011,
    doi: 'https://doi.org/10.1093/bioinformatics/btr441',
  },
  {
    id: 34,
    authors: 'Wang Ying*; Sheng Lu',
    title: 'A bounded random process model and its application in heart rate variability analysis',
    journal: 'International Journal of the Physical Sciences',
    volume: '6',
    issue: '4',
    pages: '651-659',
    year: 2011,
  },
  {
    id: 35,
    authors: 'Wang Ying*; Jianguo Cao; Lin Liu; Zhixian Lin; Tundong Liu; Jiping Tao',
    title:
      'An Automatic Tumor Segmentation System of Brain Tumor from MRI Based on A Novel Energy Functional',
    journal: 'Journal of Convergence Information Technology (JCIT)',
    volume: '6',
    pages: '59-67',
    year: 2011,
  },
  {
    id: 36,
    authors: 'Wang Ying*; Zhixian Lin; Jianguo Cao; Maoqing Li',
    title:
      'Automatic MRI Brain Tumor Segmentation System Based on Localizing Active Contour Models',
    journal: 'Advanced Materials Research',
    volume: '219-220',
    pages: '1342',
    year: 2011,
  },
  {
    id: 37,
    authors: 'Wang Ying*; Zhixian Lin; Maoqing Li',
    title: 'Model research and features simplification for Scheduling of wafer fabrication system',
    journal: 'ICCASE 2009',
    year: 2009,
  },
  {
    id: 38,
    authors: 'Wang Ying*; Zhixian Lin; Maoqing Li',
    title: 'Sampled-data Observer for Inverted-pendulum with Large Sampling Interval',
    journal: 'ICCMS 2010',
    year: 2010,
  },
  {
    id: 39,
    authors: 'Wang Ying*; Huiyu Jin; Shunzhi Zhu; Maoqing Li',
    title:
      'Scheduling of Re-entrant Lines with Neuro-Dynamic Programming Based on a New Evaluating Criterion',
    journal: 'Lecture Notes In Computer Science',
    volume: '3973',
    pages: '921-926',
    year: 2006,
  },
  {
    id: 40,
    authors: 'Wang Ying*; Shunzhi Zhu; Maoqing Li',
    title: 'Frequency domain identification for active vibration control of flexible structures',
    journal: 'proceedings of the 5th international conference on control and automation, ICCA’05',
    pages: '1149-1153',
    year: 2005,
  },
  {
    id: 41,
    authors: 'Wang Ying*; Shunzhi Zhu; Wei Xu; Maoqing Li',
    title: 'Simulation framework of scheduling re-entrant lines with Neuro-Dynamic Programming',
    journal:
      'Proceedings of the first international conference on computer science and education, ICCSE’06',
    pages: '176-181',
    year: 2006,
  },
  {
    id: 42,
    authors: 'Wang Ying*; Shunzhi Zhu; Maoqing Li',
    title: 'Research of Neuro-Dynamic Programming simulation framework for re-entrant lines',
    journal: 'Information and Control',
    volume: '36',
    issue: '2',
    pages: '218-224',
    year: 2007,
  },
  {
    id: 43,
    authors: 'Wang Ying*; Maoqing Li',
    title: 'A new criterion research of scheduling re-entrant lines',
    journal: 'Systems Engineering',
    volume: '23',
    issue: '12',
    pages: '39-44',
    year: 2005,
  },
  {
    id: 44,
    authors: 'Wang Ying*; Miao Kehua; Li Maoqing',
    title: 'Modeling of Electric Resistance Furnace in a Remote Simulation and Control Laboratory',
    journal: 'Journal of Xiamen University(Natural Science)',
    volume: '44',
    issue: '04',
    pages: '494-498',
    year: 2005,
  },
  {
    id: 45,
    authors: 'Wang Ying; Wang Yong; Zhang Zhigang; Sun Demin Sun',
    title: 'Model Identification of Active Vibration Control in Flexible Structure',
    journal: 'Journal of University of Science and Technology of China',
    volume: '32',
    issue: '3',
    pages: '302-308',
    year: 2002,
  },
]

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
