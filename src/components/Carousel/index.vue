<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list" :key="item.id">
                <img :src="item.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
// 引入Swiper
import Swiper from 'swiper'
export default {
    name:'Carousel',
    // 接收使用该组件的组件传来的数据
    props:['list'],
    watch:{
        list:{
            // 因为floor中的数据是从父组件中传的，watch监视不到，所以先自动执行一次immediate才能被监视到
            immediate:true,
            handler(){
            this.$nextTick(()=>{
            var mySwiper = new Swiper(this.$refs.cur, {
                loop: true, // 循环模式选项
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    // 配置分页器
                    clickable:true
                }
                ,
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        })
        }
        }
}

}
</script>

<style>

</style>