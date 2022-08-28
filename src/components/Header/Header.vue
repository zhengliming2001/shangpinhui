<template>
<div>
    <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <router-link to='/login'>登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                        <p v-else>
                            <span>嗨~</span>
                            <a href="javascript:;">{{userName}}</a>
                            <a href="javascript:;" class="register" @click="logOut">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="javascript:;">我的尚品汇</a>
                        <a href="javascript:;">尚品汇会员</a>
                        <a href="javascript:;">企业采购</a>
                        <a href="javascript:;">关注尚品汇</a>
                        <a href="javascript:;">合作招商</a>
                        <a href="javascript:;">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="searchGoods">搜索</button>
                    </form>
                </div>
            </div>
    </header>
</div>
</template>

<script>
export default {
    name:'Header',
    data() {
        return {
            keyword:''
        }
    },
    computed:{
        userName(){
            return this.$store.state.user.loginInFo.name
        }
    },
    methods:{
        searchGoods(){
            // 原本的$router.push方法返回的是一个promise实例对象,
            // 最后可以接收一组成功与失败的回调可以抓取错误
            // 也可以改写push和replace底层代码
            // this.$router.push('/search',(resolve)=>{console.log(resolve)},(err)=>{/* console.log(err) */});
            // 改写底层之后，连续点击也不报错

            // 如果该路由中存在query参数，一起带上
            // 合并参数
            if(this.$route.query){
                // || undefined 防止没传参数时路由跳转发生错误
                let location={name:'search',params:{keyword:this.keyword || undefined}};
                location.query=this.$route.query;
                this.$router.push(location);
            }

        },
        // 退出登录
        async logOut(){
            try {
                const result=await this.$store.dispatch('logout');
                // 退出登陆后推到主页
                this.$router.push('/home')
            } catch (error) {
                console.log(error.message);
            }
        }
    },
    // 组件间通信,清除输入框
    mounted(){
        this.$bus.$on('removeKeyword',()=>{
            this.keyword=undefined;
        })
    },
    // 组件销毁前解绑事件
    beforeDestroy(){
        console.log('兄弟们,我解绑了');
        this.$bus.$off('removeKeyword');
    }
}
</script>

<style scoped lang='less'>
.header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>