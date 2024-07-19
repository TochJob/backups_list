import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/Auth/router'
import { backupsRoutes } from '@/modules/BackupsList/router'

const routes = [...authRoutes, ...backupsRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
