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
    }
]