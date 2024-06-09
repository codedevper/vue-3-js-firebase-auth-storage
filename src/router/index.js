import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import AccountLayout from '@/layouts/AccountLayout.vue';
import { requireAuth } from '@/middleware/auth';
import { useAuthStore } from '@/stores/authStore'

const redirectToHomeOnLoggedIn = (to, from, next) => {
  if (useAuthStore().isLoggedIn) next({ name: 'page-home' })
  else next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'page-home',
          component: () => import('@/views/pages/HomeView.vue'),
        },
        {
          path: '/about',
          name: 'page-about',
          component: () => import('@/views/pages/AboutView.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: '/signin',
          name: 'auth-signin',
          component: () => import('@/views/auth/SignInView.vue'),
          beforeEnter: redirectToHomeOnLoggedIn,
        },
        {
          path: '/signup',
          name: 'auth-signup',
          component: () => import('@/views/auth/SignUpView.vue'),
          beforeEnter: redirectToHomeOnLoggedIn,
        },
      ],
    },
    {
      path: '/account',
      component: AccountLayout,
      children: [
        {
          path: '/profile',
          alias: ['/account/profile', '/my-account'],
          name: 'account-profile',
          component: () => import('@/views/account/ProfileView.vue'),
          beforeEnter: requireAuth,
        },
      ],
    }
  ]
})

export default router
