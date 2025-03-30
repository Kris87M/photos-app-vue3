import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/add-photo', component: () => import('@/pages/AddPhotoPage.vue') },
  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
    children: [
      { path: ':photoId', component: () => import('@/pages/SinglePhotoPage.vue'), name: 'single-photo' }
    ]
  },
  {
    path: '/photos/:category',
    component: () => import('@/pages/CategoryPhotosPage.vue'),
    children: [
      { path: ':photoId', component: () => import('@/pages/SinglePhotoPage.vue'), name: 'category-single-photo' }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
