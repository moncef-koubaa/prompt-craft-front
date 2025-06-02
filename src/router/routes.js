
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/my-nft',
        name: 'my-nft',
        component: () => import('@/views/my-nft.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/auctions',
        name: 'bids-page',
        component: () => import('@/views/auctions.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/chat-bot',
        name: 'chat-bot',
        component: () => import('@/views/chat-bot.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/auction/:auctionId',
        name: 'auction',
        component: () => import('@/views/auction/Auction.vue'),
        meta: { requiresAuth: true },
            
    },
    {
        path: '/wallet',
        name: 'wallet-login',
        component: () => import('@/views/wallet-login/WalletLogin.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/ProfileInfo.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile/settings',
        name: 'profile-settings',
        component: () => import('@/views/profile/ProfileSettings.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/auth/signup',
        name: 'signup',
        component: () => import('@/views/auth/signup/basic.vue'),
    },
    {
        path: '/auth/signin',
        name: 'signin',
        component: () => import('@/views/auth/signin/basic.vue'),
    }, {
        path: '/auth/logout',
        name: 'logout',
        component: () => import('@/views/auth/logout.vue'),
    },
]

export default routes