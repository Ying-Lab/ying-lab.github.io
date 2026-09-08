// src/data/peopleStore.js
import { ref } from 'vue'

// 导入教师照片
import wangYingPhoto from '@/assets/team/wangying.jpg'

// 导入博士生照片
import zhangwenhaoPhoto from '@/assets/team/zhangwenhao.jpg'
import zhouFengPhoto from '@/assets/team/zhoufeng.jpg'
import baijiaxingPhoto from '@/assets/team/baijiaxing.png'
import dengtingzhiPhoto from '@/assets/team/dengtingzhi.jpg'
import caolanPhoto from '@/assets/team/caolan.jpg'
import baipeihaoPhoto from '@/assets/team/baipeihao.jpg'
import chenfufengPhoto from '@/assets/team/chenfufeng.jpg'
import liuyanpengPhoto from '@/assets/team/liuyanpeng2026_phd.jpg'
import liuziqiangPhoto from '@/assets/team/liuziqiang2026_phd.jpg'
import zhangjiataoPhoto from '@/assets/team/zhangjiatao2026_phd.jpg'

// 导入硕士生照片
import yuwenwenPhoto from '@/assets/team/yuwenwen.jpg'
import zhangyiyangPhoto from '@/assets/team/zhangyiyang.jpg'
import huangweijiePhoto from '@/assets/team/huangweijie.jpg'
import yuyuanyuanPhoto from '@/assets/team/yuyuanyuan.jpg'
import tanchongyangPhoto from '@/assets/team/tanchongyang.png'
import chenkaiPhoto from '@/assets/team/chenkai2026_master.jpg'
import linkaiPhoto from '@/assets/team/linkai2026_master.jpg'
import xiaoxinyiPhoto from '@/assets/team/xiaoxinyi2026_master.jpg'

const members = ref([
  // 教师团队
  {
    category: '教师团队',
    name: '王颖',
    role: '博士生导师',
    description: '厦门大学自动化系教授，现任厦门市大数据智能决策与分析重点实验室主任',
    imageUrl: wangYingPhoto,
    link: 'https://aerospace.xmu.edu.cn/info/2433/49263.htm',
  },

  // 博士生
  {
    category: '博士生',
    name: '章文浩',
    role: '2021级博士生',
    description: '研究方向：大数据分析、人工智能',
    imageUrl: zhangwenhaoPhoto,
  },
  {
    category: '博士生',
    name: '周峰',
    role: '2022级博士生',
    description: '研究方向：自然语言处理、健康大数据分析',
    imageUrl: zhouFengPhoto,
  },
  {
    category: '博士生',
    name: '白佳兴',
    role: '2022级博士生',
    description: '研究方向：生物信息学、单细胞数据分析',
    imageUrl: baijiaxingPhoto,
  },
  {
    category: '博士生',
    name: '邓渟之',
    role: '2023级博士生',
    description: '研究方向：智能算法、数据挖掘',
    imageUrl: dengtingzhiPhoto,
  },
  {
    category: '博士生',
    name: '曹澜',
    role: '2024级博士生',
    description: '研究方向：计算机视觉、模式识别',
    imageUrl: caolanPhoto,
  },
  {
    category: '博士生',
    name: '拜佩豪',
    role: '2025级博士生',
    description: '研究方向：深度学习、健康大数据分析',
    imageUrl: baipeihaoPhoto,
  },
  {
    category: '博士生',
    name: '陈福沨',
    role: '2025级博士生',
    description: '研究方向：多域学习、深度学习',
    imageUrl: chenfufengPhoto,
  },
  {
    category: '博士生',
    name: '刘彦鹏',
    role: '2026级博士生',
    description: '研究方向：生物信息学、多组学数据分析',
    imageUrl: liuyanpengPhoto,
  },
  {
    category: '博士生',
    name: '刘自强',
    role: '2026级博士生',
    description: '研究方向：大语言模型、计算生物学',
    imageUrl: liuziqiangPhoto,
  },
  {
    category: '博士生',
    name: '张家涛',
    role: '2026级博士生',
    description: '研究方向：图神经网络、智能算法',
    imageUrl: zhangjiataoPhoto,
  },

  // 硕士生
  {
    category: '硕士生',
    name: '俞雯雯',
    role: '2024级硕士生',
    description: '研究方向：图神经网络、提示词工程',
    imageUrl: yuwenwenPhoto,
  },
  {
    category: '硕士生',
    name: '张毅阳',
    role: '2024级硕士生',
    description: '研究方向：自然语言处理、提示词工程',
    imageUrl: zhangyiyangPhoto,
  },
  {
    category: '硕士生',
    name: '黄圩杰',
    role: '2025级硕士生',
    description: '研究方向：人工智能、智能算法',
    imageUrl: huangweijiePhoto,
  },
  {
    category: '硕士生',
    name: '余圆圆',
    role: '2025级硕士生',
    description: '研究方向：数据可视化、人机交互',
    imageUrl: yuyuanyuanPhoto,
  },
  {
    category: '硕士生',
    name: '谭重阳',
    role: '2025级硕士生',
    description: '研究方向：提示词工程、健康大数据分析',
    imageUrl: tanchongyangPhoto,
  },
  {
    category: '硕士生',
    name: '陈凯',
    role: '2026级硕士生',
    description: '研究方向：机器学习、数据挖掘',
    imageUrl: chenkaiPhoto,
  },
  {
    category: '硕士生',
    name: '林锴',
    role: '2026级硕士生',
    description: '研究方向：自然语言处理、大模型应用',
    imageUrl: linkaiPhoto,
  },
  {
    category: '硕士生',
    name: '肖欣怡',
    role: '2026级硕士生',
    description: '研究方向：生物大数据分析、模式识别',
    imageUrl: xiaoxinyiPhoto,
  },
])

export function usePeopleStore() {
  return { members }
}
