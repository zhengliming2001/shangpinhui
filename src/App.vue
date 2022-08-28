<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted(){
    // App根组件中发请求只需要发送一次，优化性能
    this.$store.dispatch('CategoryList')
  }
}
</script>

<style>
</style>
