import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/splash'
  },
  {
    path: '/splash',
    component: () => import ('@/views/Splash.vue')
  },
  {
    path: '/doors',
    component: () => import ('@/views/theDoors.vue')
  },
  {
    path: '/door/1',
    component: () => import ('@/views/Doors/1-Doente.vue')
  },
  {
    path: '/door/2',
    component: () => import ('@/views/Doors/2-Fome.vue')
  },





  // Login
  {
    path: '/login',
    component: () => import ('../views/Login/TelefonePage.vue')
  },
  {
    path: '/login/sms',
    component: () => import ('../views/Login/SMSPage.vue')
  },
  {
    path: '/login/dados',
    component: () => import ('../views/Login/DadosPage.vue')
  },
  {
    path: '/login/address',
    component: () => import ('../views/Login/Address.vue')
  },
  {
    path: '/login/family-size',
    component: () => import ('../views/Login/FamilySize.vue')
  },

  // Home
  {
    path: '/more-info-please',
    component: () => import ('../views/MoreInfoPlease.vue')
  },
  
  // Home
  {
    path: '/home',
    component: () => import ('../views/Home.vue')
  },

  // i-want-to-help/uuid
  {
    path: '/i-want-to-help/:uuid',
    component: () => import ('../views/IWantToHelp.vue')
  },

  // help request
  {
    path: '/help-request/:uuid',
    component: () => import ('../views/HelpRequest.vue')
  },


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
