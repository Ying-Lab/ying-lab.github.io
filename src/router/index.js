import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NewsView from '../views/NewsView.vue'
import NewsDetail from '../views/NewsDetail.vue'
import PeopleView from '../views/PeopleView.vue'
import PublicationsView from '../views/PublicationsView.vue'
import PublicationsDetail from '../views/PublicationsDetail.vue'
import ContactView from '../views/ContactView.vue'
import ActivitiesView from '../views/ActivitiesView.vue'
import ActivitiesDetail from '../views/ActivitiesDetail.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    // 研究方向列表路由
    {
      path: '/news',
      name: 'news',
      component: NewsView,
    },
    // 研究方向详情路由
    {
      path: '/news/:slug',
      name: 'news-detail',
      component: NewsDetail,
    },
    {
      // 2. 添加新路由
      path: '/people',
      name: 'people',
      component: PeopleView,
    },
    {
      path: '/publications',
      name: 'publications',
      component: PublicationsView,
    },
    {
      path: '/publications/:id',
      name: 'publications-detail',
      component: PublicationsDetail,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/activities',
      name: 'activities',
      component: ActivitiesView,
    },
    {
      path: '/activities/:id',
      name: 'activities-detail',
      component: ActivitiesDetail,
    },
    // 404页面路由
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    },
  ],
})

export default router
