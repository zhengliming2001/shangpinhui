<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeQueryTag">×</i></li>
            <!-- 搜索的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeParamsTag">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademarkTag">×</i></li>
            <!-- 属性的面包屑---因为属性参数为一个数组所以使用v-for遍历 -->
            <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">{{item.split(':')[1]}}<i @click="removeAttrTag(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <!-- 父子组件间通信——自定义事件 -->
        <SearchSelector @triggerTrademark='triggerTrademark' @getAttr='getAttr'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 根据order的类型控制样式 -->
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-down':isDesc,'icon-up':isAsc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-down':isDesc,'icon-up':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 使用声明式路由导航跳转页面 -->
                    <router-link :to="{
                      name:'detail',
                      params:{
                        skuid:goods.id
                      }
                    }">
                      <img v-lazy="goods.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 注意：如果不传入动态绑定的数据，引号里的值为字符串 -->
          <Pagination :pageNow='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='total' :continuous='5' @getPageNow='getPageNow'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      // 初始化参数
      searchParams: {
        // 一级菜单id
        category1Id: "",
        // 二级菜单id
        category2Id: "",
        // 三级菜单id
        category3Id: "",
        // 分类名
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器用的代表当前第几页
        pageNo: 1,
        // 一页显示多少数据
        pageSize: 10,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount(){
    // 页面挂载前整理参数
      this.searchParams={...this.searchParams,...this.$route.query,...this.$route.params}
      this.getData();
  },
  mounted(){
    this.$bus.$on('sendTrademark',(value)=>{
      this.searchParams.trademark=`${value.tmId}:${value.tmName}`
    })
  },
  // 组件销毁前解绑自定义事件
  beforeDestroy(){
    this.$bus.$off('sendTrademark')
  },
  computed: {
    // 从getters中获取数据
    // getters中不会将数据分层
    ...mapGetters(["goodsList"]),
    isOne(){
      return this.searchParams.order.indexOf('1')!==-1
    },
    isTwo(){
      return this.searchParams.order.indexOf('2')!==-1
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc')!==-1
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc')!==-1
    },
    // 获取仓库中的total
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  methods:{
    // 发送请求的函数
    getData(){
      this.$store.dispatch("getsearchlist",this.searchParams);
    },
    // 删除分类面包屑
    removeQueryTag(){
      this.searchParams.categoryName=undefined;
      this.getData();
      // 点击删除之后，路由也应该改变
      // 自己跳自己,
      // 不再携带query参数,如果有params参数,携带params参数
      if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params});
      }
    },
    // 删除关键字面包屑
    removeParamsTag(){
      // 点击删除后,数据恢复默认数据
      this.searchParams.keyword=undefined;
      // 面包屑删除后,搜索框也要清空
      // 组件间通信___全局事件总线
      // 触发自定义事件
      this.$bus.$emit('removeKeyword');
      // 再次发送请求
      this.getData();
      // 改变路由
      if(this.$route.query){
        this.$router.push({name:'search',query:this.$route.query});
      }
    },
    // 删除品牌面包屑
    removeTrademarkTag(){
      this.searchParams.trademark=undefined;
      this.getData();
      if(this.$route.query || this.$route.params){
        this.$router.push({name:'search',query:this.$route.query,params:this.$route.params});
      }
    },
    // 删除属性面包屑
    removeAttrTag(index){
      // 从数组中删除对应的元素
      this.searchParams.props.splice(index,1);
      // 再次发送请求
      this.getData();
    },
    // 排序
    changeOrder(flag){
      // 初始的order的状态
      let originalOrderFlag=this.searchParams.order.split(':')[0];
      // 初始的order的排序方式
      let originalOrderSort=this.searchParams.order.split(':')[1];
      // 准备一个新的order属性值
      let newOrder='';
      if(flag===originalOrderFlag){
        // 用新的order来控制升序与降序的切换
        newOrder=`${originalOrderFlag}:${originalOrderSort=="desc"?"asc":"desc"}`
      }else{
        // 如果点击的不是默认综合按钮，将1换成2，排序不变
        newOrder=`${originalOrderFlag=flag}:${originalOrderSort}`
      }
      // 替换order
      this.searchParams.order=newOrder;
      // 发送请求
      this.getData();
    },
    // 自定义事件
    triggerTrademark(value){
      this.searchParams.trademark=`${value.tmId}:${value.tmName}`;
      this.getData();
    },
    getAttr(value,index){
      // 创建对应数据
      let props=`${value.attrId}:${value.attrValueList[index]}:${value.attrName}`;
      // 如果props内没有重复的则将该数据插入
      if(this.searchParams.props.indexOf(props)===-1){
          this.searchParams.props.push(props);
      }
      // 发送请求
      this.getData();
    },
    // 回去分页器当前页数
    getPageNow(pageNow){
      // 更新数据
      this.searchParams.pageNo=pageNow;
      this.getData();
    }
  },
  watch:{
    // 监听路由的变化，发送请求
    $route(){
      // 每次数据发生变化时将原有的id清空
      this.searchParams.category1Id=undefined;
      this.searchParams.category2Id=undefined;
      this.searchParams.category3Id=undefined;
      // 数据发生变化时再次整理参数
      this.searchParams={...this.searchParams,...this.$route.query,...this.$route.params}
      this.getData();

    }
  }

};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>