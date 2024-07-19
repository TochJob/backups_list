export const authRoutes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/modules/Auth/pages/Auth.vue')
  }
]
