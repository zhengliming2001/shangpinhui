// 引入发送请求的函数
import { reqChangeChecked, reqDeletecart, reqGetCartList } from "@/api"
export default {
    state: {
        // 初始化数据
        cartList:[]
    },
    actions: {
        // 获取购物车数据
        async getcartlist({commit}) {
            let result = await reqGetCartList();
            if (result.code === 200) {
                commit('GETCARTLIST',result.data)
            }
        },
        // 删除购物车商品
        async deletecart(_,skuId) {
            let result = await reqDeletecart(skuId);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('失败'));
            }
        },
        // 改变购物车商品选中状态
        async changechecked({commit},{skuId,isChecked}) {
            let result = await reqChangeChecked(skuId, isChecked);
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('失败'))
            }
        },
        // 删除所有选中的商品
        // context几乎就是小仓库，身上很多东西
        // 在该action中派发deletecart函数逐个删除
        deleteallchecked({ dispatch, getters }) {
            let promiseAll = [];
            getters.cartList.cartInfoList.forEach((item) => {
                let result = item.isChecked == 1 ? dispatch('deletecart', item.skuId) : '';
                promiseAll.push(result);
            })
            // 使用promise的all方法来监测是否全部删除成功
            // Promise.all()内传一个数组，只有数组内的promise都成功，返回的结果才成功
            return Promise.all(promiseAll)
        },
        // 全选商品
        allchecked({ dispatch, state }) {
            let promiseAll = [];
            if (state.cartList[0]) {
                // 遍历商品
                state.cartList[0].cartInfoList.forEach((item) => {
                    let result= item.isChecked == 0 ? dispatch('changechecked', { skuId: item.skuId, isChecked:Number(!item.isChecked) }) : '';
                    promiseAll.push(result)
                })
            }
            return Promise.all(promiseAll)
        }
    },
    mutations: {
        GETCARTLIST(state, value) {
            state.cartList = value;
        }
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {};
        }
    }
}