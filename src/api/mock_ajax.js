// 二次封装axios

// 引入axios
import axios from 'axios';

// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"

// 使用axios的create方法复制出来一个“axios”
const mock_ajax = axios.create({
    // 配置默认路径
    baseURL: '/mock',
    // 配置请求最长时间
    timeout:5000
});
// 配置请求拦截器
mock_ajax.interceptors.request.use((config) => {
    // 开启进度条
    nprogress.start();
    return config
})
// 配置响应拦截器
mock_ajax.interceptors.response.use(
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
export default mock_ajax