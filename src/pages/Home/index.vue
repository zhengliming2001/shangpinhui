<template>
<div>
    <!-- typeNav组件已经注册为全局组件，不需要引用，可以直接使用 -->
    <TypeNav/>
    <!-- ListContainer组件 -->
    <ListContainer/>
    <!-- TodayRecommend组件 -->
    <TodayRecommend/>
    <!-- Rank组件 -->
    <Rank/>
    <!-- Like组件 -->
    <Like/>
    <!-- Floor组件 -->
    <!-- 组件标签内也可以使用指令 -->
    <!-- 使用组件间通信将home中的数据发送到floor子组件 -->
    <Floor v-for="item in floorList" :key="item.id" :list='item'/>
    <!-- Brand组件 -->
    <Brand/>

</div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'

export default {
    name:'Home',
    components:{
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted(){
        // 获取floor数据
        // 因为floor组件要使用两次所以数据放在home组件中
        this.$store.dispatch('getfloorlist');
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.FloorList
        })
    },
    methods:{
        
    }
}
</script>

<style>

</style>