import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 引入路由信息
import routes from './routes';

// 引入仓库
import store from '@/store';

// 改写底层push和replace
// 改写之前备份
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

// 改写
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originalPush.call(this, location, resolve, reject);
    } else {
        originalPush.call(this, location, ()=>{}, ()=>{});
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    // 如果传递了回调函数就调用原来的参数
    if (resolve && reject) {
        // 使用call修改originalReplace的执行上下文
        // 不然originalReplace的执行上下文是window
        originalReplace.call(this, location, resolve, reject);
    
    } else {
        // 否则在底层自动补加两个回调
        originalReplace.call(this, location, ()=>{}, ()=>{});
    }
}

const router= new VueRouter({
    //注册路由信息
    routes,
    // 滚动行为，跳转路由时,跳转到页面的哪个位置
    scrollBehavior() {
        // 跳转之后滚动条的位置
        return { y:0 }
    },
})

router.beforeEach(async (to, from,next) => {
    let token = localStorage.getItem('token');
    // 判断浏览器中是否存在token
    if (token) {
        // 如果有则阻止用户再次进入登陆页面
        if (to.path == '/login') {
            next('/home')
        } else {
            // 如果用户不进入登陆页面，查询用户的用户名
            let name = store.state.user.loginInFo.name;
            // 如果用户名存在证明已经登录且获取到用户信息，放行
            if (name) {
                next();
            } else {
                // 否则发送请求获取用户的信息
                try {
                    await store.dispatch('logininfo')
                    next();
                } catch (error) {
                    // 如果发生错误，证明用户的token过期了，要清除现有的token，然后跳转到登录页让用户重新登录
                    alert('用户信息已过期')
                    store.dispatch('logout')
                    next('/login')
                }
            }
        }
        // 如果未登录一些地方浏览不了(订单，购物车，支付页)
    } else {
        let toPath=to.path
        if (toPath == '/shopcart' || toPath =='/center/myorder' || toPath=='/addcartsuccess') {
            alert('还没有登陆哦，请您先登录')
            next(`/login?goingTo=${toPath}`)
        }
        next()
    }
})

export default router