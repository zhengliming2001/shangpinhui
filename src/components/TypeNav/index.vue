<template>
    <!-- 结构 -->
    <div class="type-nav" >
            <div class="container" >
                <div @mouseleave="removeBgc" @mouseenter="showList">
                    <h2 class="all">全部商品分类</h2>
                    <transition name="sort">
                        <div class="sort" v-show="isShow">
                        
                            <div class="all-sort-list2" @click="goToSearch" >
                                                                                                                                <!-- 动态添加类名，当indexCur===index时添加该类 -->
                            <div class="item" v-for="(c1,index) in CategoryList" :key='c1.categoryId' @mouseenter="addBgc(index)" :class="{cur:indexCur===index}">
                                <!-- 一级分类 -->
                                <h3>
                                    <a href="javascript:;" :data-categoryName="c1.categoryName" :data-category1Id='c1.categoryId'>{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二级分类 -->
                                <!-- v-show控制二级分类的显示与隐藏 -->
                                <!-- :style="{display:indexCur==index?'block':'none'}" -->
                                <div class="item-list clearfix" v-show="indexCur==index">
                                    <div class="subitem">
                                        <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId" >
                                            <dt>
                                                <a href="javascript:;" :data-categoryName="c2.categoryName" :data-category2Id='c2.categoryId'>{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a href="javascript:;" :data-categoryName="c3.categoryName" :data-category3Id='c3.categoryId'>{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                
            </div>
    </div>
</template>

<script>
// 引入mapState
import {mapState} from 'vuex';
// 引入节流函数throttle
import throttle from 'lodash/throttle';
export default {
    name:'TypeNav',
    data() {
        return {
            indexCur:-1,
            isShow:true
        }
    },
    mounted(){
        // 如果路由不是home则隐藏
        if(this.$route.path!=='/home'){
            this.isShow=false;
        }
    },
    // 计算属性
    computed:{
        // 使用mapState方法获取数据
        ...mapState({
            // 右边的箭头函数在使用该计算属性时调用，参数state为最大的哪个state
            CategoryList:(state)=>{
                // 依赖返回值
                return state.home.CategoryList
            }
        })
    },
    methods:{
        // 鼠标移入给三级联动一级标题添加背景颜色
        /*  addBgc(index){
            console.log('发送请求',index);
            this.indexCur=index;
        }, */
        // 使用节流函数
        addBgc:throttle(function(index){
            // console.log('发送请求',index);
            this.indexCur=index;
        },50),
        // 鼠标移出给三级联动一级标题去除背景颜色
        removeBgc(){
            this.indexCur=null;
        // 如果路由不是home则,鼠标移出是隐藏
            if(this.$route.path!=='/home'){
            this.isShow=false;
        }
        },
        goToSearch(e){
            let element=e.target.dataset;
            let {categoryname,category1id,category2id,category3id}=element;
            if(categoryname){
                // 配置送往的路由
                let location={name:'search'};
                let query={categoryName:categoryname}
                // 判断是几级分类，携带参数
                if(category1id){
                    query.category1Id=category1id
                }else if(category2id){
                    query.category2Id=category2id
                }else{
                    query.category3Id=category3id
                }
                // 整合路由，携带参数
                location.query=query;
                if(this.$route.params){
                    location.params=this.$route.params;
                }
                this.$router.push(location)
            }

        },
        showList(){
            this.isShow=true;
        }
    },

}
</script>

<style scoped lang='less'>
.type-nav {
        border-bottom: 2px solid #e1251b;
.cur{
    background: skyblue;
}
        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;
                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            // display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        /* &:hover {
                            .item-list {
                                display: block;
                            }
                        } */
                    }
                }
            }
            // 过渡动画
            .sort-enter{
                height: 0;
            }
            .sort-enter-to{
                height:450px;
            }
            .sort-enter-active{
                transition: all .3s linear;
            }
        }
    }
</style>