// 配置路由信息

// 引入一级路由组件
import Login from '../pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

// 路由懒加载
// 当访问该页面时才加载该组件
const Home = () => import('@/pages/Home')

const Search = () => import('@/pages/Search')

export default [
    {
        name: 'center',
        path: '/center',
        component:Center,
        meta: { isShow: true },
        // 二级路由
        children: [
            {
                // 默认路由——重定项
                path: '/center',
                redirect:'/center/myorder'
            },
            {
                path: 'myorder',
                component:MyOrder
            },
            {
                path: 'grouporder',
                component:GroupOrder
            }
            
        ]
        
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { isShow: true },
        
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { isShow: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { isShow: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component:ShopCart
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component:AddCartSuccess,
    },
    {
        name:'detail',
        path: '/detail/:skuid',
        component: Detail,
    },
    {
        name:'home',
        path: '/home',
        component: Home,
        meta:{isShow:true}
    },
    {
        name:'login',
        path: '/login',
        component:Login
    },
    {
        name: 'search',
        // /:keyword?表示该参数可传可不传
        path: '/search/:keyword?',
        component: Search,
        //路由元信息
        meta:{isShow:true}
    },
    {
        name:'register',
        path: '/register',
        component:Register
    },


    // 重定项
    {
        path: '/',
        redirect:'/home'
    }
]