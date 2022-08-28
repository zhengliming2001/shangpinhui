import { reqGetSearchList } from "@/api"

// 引入请求函数
export default {
    state: {
        // 初始化数据
        searchList:{}
    },
    actions: {
        // 传入的参数最少是一个空对象
        async getsearchlist({commit},params={}) {
            let result = await reqGetSearchList(params);
            if (result.code === 200) {
                commit('GETSEARCHLIST',result.data)
            }
        }
    },
    mutations: {
        GETSEARCHLIST(state, value) {
            state.searchList = value;
        }
    },
    // getters类似于计算属性
    getters: {
        // 参数state是search的小仓库
        goodsList(state) {
            // 如果出现网络问题searchList身上没有数据，让他返回一个空数组，这样在遍历它的时候不会报错
            return state.searchList.goodsList || [];
        },
        attrsList(state) {
            return state.searchList.attrsList || [];
        },
        trademarkList(state) {
            return state.searchList.trademarkList || [];
        }
    }
}