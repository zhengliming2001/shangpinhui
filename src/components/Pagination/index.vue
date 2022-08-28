<template>
    <div class="pagination">
        <button @click="$emit('getPageNow',pageno-1)" :disabled='pageNow==1'>上一页</button>
        <button v-if="starNumAndEndNum.start>1" @click="$emit('getPageNow',1)" :class="{active:pageNow==1}">1</button>
        <button v-if="starNumAndEndNum.start>2">...</button>

        <!-- 使用v-if来控制连续显示的页码 -->
        <button v-for="(item,index) in starNumAndEndNum.end" :key="index" v-if="item>=starNumAndEndNum.start" @click="$emit('getPageNow',item)" :class="{active:pageNow==item}">{{item}}</button>

        <button v-if="starNumAndEndNum.end<pageSum-1">...</button>
        <button v-if="starNumAndEndNum.end<pageSum" @click="$emit('getPageNow',pageSum)" :class="{active:pageNow==pageSum}">{{pageSum}}</button>
        <button :disabled='pageNow==pageSum' @click="$emit('getPageNow',pageno+1)">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>  
</template>

<script>
export default {
    name: "Pagination",
    // 接收假数据
    props:['pageNow','pageSize','total','continuous'],
    computed:{
        // 总共的页数
        pageSum(){
            // 向上取整
            return Math.ceil(this.total/this.pageSize)
        },
        // 计算分页器的连续数字，开始与结束的数字
        starNumAndEndNum(){
            // 结构拿到属性值直接使用
            let {pageNow,pageSum,continuous} = this;
            // 定义并初始化开始值与结束值
            let start=0;
            let end=0;
            // 连续页码数字5【就是至少5页】，如果出现不正常现象【不够五页】
            // 不正常现象
            if(continuous>pageSum){
                // 开始值为1
                start=1;
                // 结束值为页数
                end=pageSum;
            }else{
                // 正常现象【页码大于5】
                // 起始数字
                start=pageNow-parseInt(continuous/2);
                // 结束数字
                end=pageNow+parseInt(continuous/2);
                // 不正常情况——当开始值为0或负值，结束值超过页数
                if(start<1){
                    start=1;
                    end=continuous;
                }else if(end>pageSum){
                    start=pageSum-continuous+1;
                    end=pageSum;
                }
            }
            // 返回值
            return {start,end}
        },
        pageno(){
            let pageno=this.pageNow;
            return pageno
        }
    }
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
    }

    &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
    }
}
}
// 当前分页器添加样式
.active{
    background: skyblue;
}
</style>
