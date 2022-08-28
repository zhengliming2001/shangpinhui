<template>
  <div class="spec-preview" @mousemove="moveMasking">
    <img :src="skuImageList[index].imgUrl" />
    <div class="event" ></div>
    <div class="big" >
      <img :src="skuImageList[index].imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        index:0
      }
    },
    props:['skuImageList'],
    // 页面挂载完成后启动接收skuImageList对应的图片序列号的全局事件总线
    mounted(){
      this.$bus.$on('getImgIndex',(value)=>{
        this.index=value
      })
    },
    beforeDestroy(){
      this.$bus.$off('getImgIndex');
    },
    methods:{
      moveMasking(e){
        // 获取蒙版
        let mask=this.$refs.mask;
        // 获取鼠标的位置
        let X=e.offsetX
        let Y=e.offsetY
        // 用鼠标的位置减去蒙版的一半得到蒙版到容器的距离
        let left=X-(mask.offsetWidth/2);
        let top=Y-(mask.offsetHeight/2);
        // 约束范围
        if(left<0){
          left=0;
        }else if(left>mask.offsetWidth){
          left=mask.offsetWidth
        }
        if(top<0){
          top=0;
        }else if(top>mask.offsetHeight){
          top=mask.offsetHeight
        }
        mask.style.left=left + 'px';
        mask.style.top=top  + 'px';
        // 获取big
        let big=this.$refs.big;
        // 大图的尺寸是小图的2倍，且移动方向是相反的
        big.style.left=-2*left + 'px';
        big.style.top=-2*top  + 'px';
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
    cursor: move;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>