export default [
    {
        path : '/',
        name : 'home',
        component : () => import('@/views/Home.vue'),
    },
    {
        path : '/auction',
        name : 'auction',
        component : () => import('@/views/auction/Auction.vue'),
    }
    ,{
     path : '/wallet',
     name : 'wallet-login',
     component : ()=>import('@/views/wallet-login/WalletLogin.vue'),
    }

]