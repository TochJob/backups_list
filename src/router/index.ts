import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/Auth/router'
import { backupsRoutes } from '@/modules/BackupsList/router'

const routes = [...authRoutes, ...backupsRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (to.path === '/auth') {
    next()
  } else if (to.name !== 'auth' && isAuthenticated) {
    next()
  } else {
    next('/auth')
  }
})
export default router
