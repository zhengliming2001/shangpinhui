// 登录与注册的仓库

// 引入发送获取验证码的函数
import { reqGetCode, reqLogin, reqLoginInFo, reqLogOut, reqRegister } from "@/api"

export default {
    state: {
        // 初始化数据
        code: '',
        token: localStorage.getItem('token'),
        loginInFo:{}
    },
    actions: {
        // 获取验证码
        async getcode({commit},phone) {
            let result = await reqGetCode(phone);
            if (result.code === 200) {
                commit('GETCODE', result.data);
                return 'ok'
            } else {
                return Promise.reject(new Error('验证码获取失败'));
            }
        },
        // 注册用户
        async register({commit},data) {
            let result = await reqRegister(data);
            if (result.code === 200) {
                return result.message
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 登录账户
        async login({commit,dispatch},data) {
            let result = await reqLogin(data);
            if (result.code === 200) {
                commit('LOGIN', result.data.token);
                return result.message
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 获取用户的登录信息
        async logininfo({commit}) {
            let result = await reqLoginInFo();
            if (result.code === 200) {
                commit('LOGININFO', result.data)
                return result.message
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 退出登录
        async logout({commit}) {
            let result = await reqLogOut();
            if (result.code === 200) {
                commit('LOGOUT')
                return result.message
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
    },
    mutations: {
        // 获取验证码
        GETCODE(state,code) {
            state.code = code;
        },
        // 登陆账户
        LOGIN(state,token) {
            state.token = token;
            localStorage.setItem('token',token)
        },
        // 获取用户的登录信息
        LOGININFO(state,logininfo) {
            state.loginInFo = logininfo
        },
        // 退出登录
        LOGOUT(state) {
            // 清除本地token
            state.token = '';
            state.loginInFo = {};
            localStorage.removeItem('token');
        }
    },
    getters:{}
}