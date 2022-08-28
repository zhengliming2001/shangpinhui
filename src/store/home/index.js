// 引入发送三级联动请求的模块
import { reqCategoryList, reqGetBannerList,reqGetFloorList } from "@/api"
export default {
    state: {
        // 初始化数据类型时要与接受的数据类型一致
        CategoryList: [],
        BannerList: [],
        FloorList:[]
    },
    actions: {
        // 获取三级联动数据
        async CategoryList({ commit }) {
            // 接收一下请求成功的返回值
            const result = await reqCategoryList()
            // 如果请求结果的code值为200，将请求回来的数据送给mutations处理
            if (result.code == 200) {
                commit('CATEGORYLIST',result.data.splice(0,15))
            }
        },
        // 获取轮播图数据
        // {commit}结构上下文只去context中的commit方法
        async getbannerlist({commit}) {
            const result = await reqGetBannerList();
            if (result.code === 200) {
                commit('GETBANNERLIST',result.data)
            }
        },
        // 获取floor数据
        async getfloorlist({commit}) {
            const result = await reqGetFloorList();
            if (result.code === 200) {
                commit('GETFLOORLIST',result.data)
            }
        }
    },
    mutations: {
        CATEGORYLIST(state, value) {
            // 将传过来的数据存放到state中保存
            state.CategoryList = value;
        },
        GETBANNERLIST(state, value) {
            // 将传过来的数据存放到state中保存
            state.BannerList = value;
        },
        GETFLOORLIST(state, value) {
            // 将传过来的数据存放到state中保存
            state.FloorList = value;
        }
    },
    getters:{}
}