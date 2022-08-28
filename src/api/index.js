// 配置请求
import requests from "./request";
import mock_ajax from "./mock_ajax";

// 获取三级联动接口
export const reqCategoryList = () => {
    // 发请求
    return requests({
        url: '/product/getBaseCategoryList',
        method:'GET'
    })
}
//获取banner请求
export const reqGetBannerList = () => {
    // 发请求
    return mock_ajax({
        url: '/banner',
        method:'GET'
    })
}
// 获取floor请求
export const reqGetFloorList = () => {
    // 发请求
    return mock_ajax({
        url: '/floor',
        method:'GET'
    })
}

// 获取search组件数据
//请求方式：post
// 炫耀携带参数
export const reqGetSearchList = (params) => {
    return requests({
        url: '/list',
        method: 'POST',
        data:params
    })
}

// 获取详情页的数据
// 请求方式：get
// 携带参数：skuId
export const reqGetDetailList = (skuId) => {
    return requests({
        url: `/item/${ skuId }`,
        method:'GET'
    })
}

//添加到购物车(对已有物品进行数量改动)
// 请求方式：post
// 携带参数：skuId，skuNum
export const reqAddShopCart = (skuId,skuNum) => {
    return requests({
        url: `/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'POST'
    })
}

// 获取购物车列表数据
// 请求方式get
export const reqGetCartList = () => {
    return requests({
        url: `/cart/cartList`,
        method:'GET'
    })
}

// 删除购物车商品
// 请求方式delete
// url:/api/cart/deleteCart/{skuId}
// 携带参数:skuid
export const reqDeletecart = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method:'DELETE'
    })
}

// 切换商品选中状态
// 请求方式get
// url:/api/cart/checkCart/{skuId}/{isChecked}
// 携带参数：skuId，isChecked
export const reqChangeChecked = (skuId,isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method:'GET'
    })
}

// 获取验证码
// url:/api/user/passport/sendCode/{phone}
// 请求方式：get 
// 参数：phone——手机号
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method:'GET'
    })
}

// 注册用户
// url:/api/user/passport/register
// 请求方式:post
// 参数:phone password code
export const reqRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        data,
        method:'POST'
    })
}

// 登录账户
// url:/api/user/passport/login
// 请求方式:POST
// 参数:phone,password
export const reqLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        data,
        method:'POST'
    })
}

// 获取用户的登录信息
// url:/api/user/passport/auth/getUserInfo
// 请求方式：get
export const reqLoginInFo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method:'GET'
    })
}

// 退出登录
// url:/api/user/passport/logout
// 请求方式:get
export const reqLogOut = () => {
    return requests({
        url: '/user/passport/logout',
        method:'GET'
    })
}

// 获取用户地址信息
// url:/api/user/userAddress/auth/findUserAddressList
// 请求方式:get
export const reqGetAddress = () => {
    return requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method:'GET'
    })
}

// 获取订单交易页信息
// url:/api/order/auth/trade
// 请求方式:get
export const reqOrderInfo = () => {
    return requests({
        url: '/order/auth/trade',
        method:'GET'
    })
}

// 提交订单
// url:/api/order/auth/submitOrder?tradeNo={tradeNo}
// 请求方式：post
// 参数：tradeNo(query),一些其他的数据(data)
export const reqSubOrder = (tradeNo,data) => {
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'POST',
        data
    })
}

// 获取订单支付信息
// url:/api/payment/weixin/createNative/{orderId}
// 参数:orderId
// 请求方式:get
export const reqGetPayment = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method:'GET'
    })
}

// 查询支付状态
// url:/api/payment/weixin/queryPayStatus/{orderId}
// 请求方式:get
// 参数:orderId(支付订单号)
export const reqQueryOrderStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method:'GET'
    })
}

// 获取我的订单列表
// url:/api/order/auth/{page}/{limit}
// 请求方式:get
// 参数：page(页码数)，limit(每页显示的数量)
export const reqGetMyOrderList = (page,limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method:'GET'
    })
}