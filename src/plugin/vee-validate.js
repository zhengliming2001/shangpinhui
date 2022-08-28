// 引入Vue
import vue from "vue";
// 引入vee-validate
import VeeValidate from "vee-validate";
// 引入中文信息
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import Vue from "vue";
// 使用插件
vue.use(VeeValidate)

// 第二步：提示信息
VeeValidate.Validator.localize('zh_CN', {
messages: {
...zh_CN.messages,
is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
},
attributes: { // 给校验的 field 属性名映射中文名称
phone: '手机号',
code: '验证码',
password:'密码',
againPsd:'确认密码',
isCheck:'协议'
}
})
// 自定义校验规则
VeeValidate.Validator.extend('agree', {
    validate: value => {
    return value
    },
    getMessage: field => field + '必须同意'
    })