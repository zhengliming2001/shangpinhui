//引入mock
import Mock from 'mockjs';


// json数据不需要向外暴露就可以引用
// 引入banner数据，
import banner from './banner.json'
// 引入floor数据，
import floor from './floor.json'

// mock的基本使用
// 1.下载mockjs
// 2.创建mockSever.js(src/mock/)
// 3.创建json数据文件(src/mock/)
// 4.引用mockjs，和json文件
// 5.通过Mock.mock的方法发送请求(只会在前端，不会发往服务器)
// 6.在入口文件中引用mockSever.js

// Mock的mock方法的
// 第一个参数为请求地址——以/mock开头
// 第二个参数为请求的数据
// banner
Mock.mock('/mock/banner', { code: 200, data: banner })
// floor
Mock.mock('/mock/floor',{code:200,data:floor})
