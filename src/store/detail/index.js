// 请入发送请求的参数
import { reqGetDetailList, reqAddShopCart } from "@/api"
// 引入uuid函数
import { getUUID } from '@/utils/uuid_token';
export default {
    state: {
        // 初始化数据类型
        detailList: {},
        // 将uuid存在仓库中
        uuid_token: getUUID()
    },
    actions: {
        // 获取detail数据
        async getdetaillist({commit},skuid) {
            let result = await reqGetDetailList(skuid);
            if (result.code == 200) {
                commit('GETDETAULLIST',result.data)
            }
        },
        // 获取添加购物车
        // 调用async函数会返回一个promise实例
        // 添加购物车时，利用请求头将uuid_token传入服务器————请求拦截器
        async addshopcart({commit},{skuId,skuNum}) {
            let result = await reqAddShopCart(skuId, skuNum);
            if (result.code === 200) {
                // 函数的返回结果影响实例的状态
                // 返回非空字符串状态即为成功
                return 'ok'
            } else {
                // 如果失败则返回一个失败的状态
                return Promise.reject(new Error('失败'))
            }
        }
    },
    mutations: {
        GETDETAULLIST(state, value) {
            state.detailList = value;
        }
    },
    getters: {
        categoryView(state) {
            return state.detailList.categoryView || {};
        },
        skuInfo(state) {
            return state.detailList.skuInfo || {};
        },
        spuSaleAttrList(state) {
            return state.detailList.spuSaleAttrList
        }
    }
}