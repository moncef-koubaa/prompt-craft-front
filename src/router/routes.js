import { createRouter, createWebHistory } from 'vue-router'
import authService from '@/services/authService'
const routes= [
    {
        path : '/',
        name : 'home',
        component : () => import('@/views/Home.vue'),
    },
    {
        path : '/my-nft',
        name : 'my-nft',
        component : () => import('@/views/my-nft.vue'),
    },
    {
        path : '/bids-page',
        name : 'bids-page',
        component : () => import('@/views/bids-page.vue'),
    },
    {
        path: '/chat-bot',
        name: 'chat-bot',
        component: () => import('@/views/chat-bot.vue'),
    },
    {
        path : '/auction',
        name : 'auction',
        component : () => import('@/views/auction/Auction.vue'),
    },
    {
     path : '/wallet',
     name : 'wallet-login',
     component : ()=>import('@/views/wallet-login/WalletLogin.vue'),
    },
    {
    path : '/profile',
    name : 'profile',
    component : () => import('@/views/profile/ProfileInfo.vue'),
    },
    {
    path : '/profile/settings',
    name : 'profile-settings',
    component : () => import('@/views/profile/ProfileSettings.vue'),
    },
    {
        path :'/auth/signup',
        name : 'signup',
        component : () => import('@/views/auth/signup/basic.vue'),
    },
    {
        path :'/auth/signin',
        name : 'signin',
        component : () => import('@/views/auth/signin/basic.vue'),
    },

];
const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')

    if (to.meta.requiresAuth) {
        if (!token) {
            return next({ name: 'Login' })
        }

        try {
            await authService.getMe()
            return next()
        } catch (err) {
            authService.logout()
            return next({ name: 'Login' })
        }
    }

    next()
})
export default router

