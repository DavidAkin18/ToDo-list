import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import Registration from '@/views/Registration.vue'
import Inbox from '@/views/Inbox.vue'
import Today from '@/views/Today.vue'
import Profile from '@/views/Profile.vue'
import Upcoming from '@/views/Upcoming.vue'
import ProfileRegistration from '@/views/profileRegistration.vue'
import NotificationList from '@/views/NotificationList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/registration',
    name:'registration',
    component:Registration
  },
  {
    path:'/inbox',
    name:'inbox',
    component:Inbox,
  },
  {
    path:'/notifications',
    name: 'notifications',
    component: NotificationList
  },
  {
    path:'/today',
    name:'today',
    component:Today
  },
  {
    path:'/profile',
    name:'profile',
    component:Profile
  },
  {
    path:'/upcoming',
    name:'upcoming',
    component:Upcoming
  },
  {
    path:'/user',
    name:'user',
    component:ProfileRegistration
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
