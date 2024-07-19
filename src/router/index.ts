import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/Auth/router'

const routes = [...authRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
