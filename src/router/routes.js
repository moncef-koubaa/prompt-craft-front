export default [
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
        path: '/notif',
        name: 'notifications',
        component: () => import('@/views/notif.vue'),
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: () => import('@/views/pricing.vue'),
    }
];