// 二次封装axios

// 引入axios
import axios from 'axios';

// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"
// 引入仓库
import store from '@/store'

// 使用axios的create方法复制出来一个“axios”
const requests = axios.create({
    // 配置默认路径
    baseURL: '/api',
    // 配置请求最长时间
    timeout:5000
});
// 配置请求拦截器
requests.interceptors.request.use((config) => {
    // 开启进度条
    nprogress.start();
    // 判断仓库中是否有uuid_token,有则通过请求头传给服务器
    // 请求头添加的字段(userTempId)不能乱写，要跟后端商量
    if (store.state.detail.uuid_token) {
        config.headers.userTempId=store.state.detail.uuid_token
    }
    // 判断仓库中是否有token,有则通过请求头传给服务器
    if (store.state.user.token) {
        config.headers.token=store.state.user.token
    }
    return config
})
// 配置响应拦截器
requests.interceptors.response.use(
    // 成功的回调
    (res) => {
        // 结束进度条
        nprogress.done();
        return res.data
    },
    // 失败的回调
    (err) => {
        console.log(err);
        // 返回一个空的promise对象
        return new Promise({});
    }
)

// 向外暴露
export default requests