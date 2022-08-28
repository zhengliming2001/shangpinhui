// 获取发送请求的函数
import { reqGetAddress, reqOrderInfo } from "@/api"
export default {
    state: {
        address: [],
        orderInfo:{}
    },
    actions: {
        // 获取用户地址
        async getaddress({commit}) {
            let result = await reqGetAddress()
            if (result.code === 200) {
                commit('GETADDRESS',result.data)
            }
        },
        // 获取交易页信息
        async getorderinfo({commit}) {
            let result = await reqOrderInfo()
            if (result.code === 200) {
                commit('GETORDERINFO',result.data)
            }
        }
    },  
    mutations: {
        GETADDRESS(state, address) {
            state.address = address;
        },
        GETORDERINFO(state, orderinfo) {
            state.orderInfo = orderinfo;
        }
    },
    getters:{}
}