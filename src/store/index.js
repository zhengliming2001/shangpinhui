// 引入vue
import Vue from "vue";
// 引入vuex
import Vuex from 'vuex'
// 使用Vuex
Vue.use(Vuex);

// 引入子仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";
// 创建并向外暴露Vuex
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})
