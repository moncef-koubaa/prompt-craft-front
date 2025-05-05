export default [
    {
        path : '/',
        name : 'home',
        component : () => import('@/views/Home.vue'),
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
    }
]