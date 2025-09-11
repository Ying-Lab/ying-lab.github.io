// src/data/peopleStore.js
import { ref } from 'vue'

// 导入成员照片
import wangYingPhoto from '@/assets/team/wangying.jpg'
import zhouFengPhoto from '@/assets/team/zhoufeng.jpg'
import baijiaxingPhoto from '@/assets/team/baijiaxing.png'
import caolanPhoto from '@/assets/team/caolan.jpg'
import dengtingzhiPhoto from '@/assets/team/dengtingzhi.jpg'
import gaoyichunPhoto from '@/assets/team/gaoyichun.jpg'
import huangweijiePhoto from '@/assets/team/huangweijie.jpg'
import linbinyaoPhoto from '@/assets/team/linbinyao.jpg'
import tanchongyangPhoto from '@/assets/team/tanchongyang.png'
import yuwenwenPhoto from '@/assets/team/yuwenwen.jpg'
import yuyuanyuanPhoto from '@/assets/team/yuyuanyuan.jpg'
import zhangwenhaoPhoto from '@/assets/team/zhangwenhao.jpg'
import zhangyiyangPhoto from '@/assets/team/zhangyiyang.jpg'
import baipeihaoPhoto from '@/assets/team/baipeihao.jpg'
import chenfufengPhoto from '@/assets/team/chenfufeng.jpg'
import longyongyuPhoto from '@/assets/team/longyongyu.jpg'
import heyushuangPhoto from '@/assets/team/heyushuang.jpg'
import xiaozixuanPhoto from '@/assets/team/xiaozixuan.jpg'

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

  // 博士
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

  // 硕士
  {
    category: '硕士生',
    name: '林炳垚',
    role: '2023级硕士生',
    description: '研究方向：数据科学、机器学习',
    imageUrl: linbinyaoPhoto,
  },
  {
    category: '硕士生',
    name: '高奕淳',
    role: '2023级硕士生',
    description: '研究方向：自然语言处理、健康大数据分析',
    imageUrl: gaoyichunPhoto,
  },
  {
    category: '硕士生',
    name: '何羽双',
    role: '2023级硕士生',
    description: '研究方向：自然语言处理、健康大数据分析',
    imageUrl: heyushuangPhoto,
  },
  {
    category: '硕士生',
    name: '肖子璇',
    role: '2023级硕士生',
    description: '研究方向：计算机科学、软件工程',
    imageUrl: xiaozixuanPhoto,
  },
  {
    category: '硕士生',
    name: '龙泳羽',
    role: '2023级硕士生',
    description: '研究方向：网络安全、数据隐私',
    imageUrl: longyongyuPhoto,
  },
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
])

export function usePeopleStore() {
  return { members }
}
