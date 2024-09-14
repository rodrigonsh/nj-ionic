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
    path: '/notifications',
    component: () => import ('@/views/Notifications.vue')
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

  // wait for helpers
  {
    path: '/wait-for-helpers',
    component: () => import ('../views/WaitForHelpers.vue')
  },
  
  // Home
  {
    path: '/home',
    component: () => import ('../views/Home.vue')
  },

  // i-want-to-help/uuid
  {
    name: 'i-want-to-help',
    path: '/i-want-to-help/:uuid',
    component: () => import ('../views/IWantToHelp.vue')
  },

  // help request
  {
    name: 'help-request',
    path: '/help-request/:uuid',
    component: () => import ('../views/HelpRequest.vue')
  },

  // wait for partner
  {
    name: 'wait-for-partner',
    path: '/wait-for-partner/',
    component: () => import ('../views/WaitForPartner.vue')
  },

  // meet your partner
  {
    name: 'meet-your-partner',
    path: '/meet-your-partner/:uuid',
    component: () => import ('../views/MeetYourPartner.vue')
  },

  // help on the way
  {
    name: 'help-on-the-way',
    path: '/help-on-the-way/:uuid',
    component: () => import ('../views/HelpOnTheWay.vue')
  },

  // help has arrived
  {
    name: 'help-has-arrived',
    path: '/help-has-arrived/:uuid',
    component: () => import ('../views/HelpHasArrived.vue')
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
