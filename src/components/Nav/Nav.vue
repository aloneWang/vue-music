<template>
  <div class="nav">
      <router-link to="/recommend">推荐</router-link>
      <router-link to="/rankings">排行榜</router-link>
      <router-link to="/search">搜索</router-link>
  </div>
</template>
<style lang="stylus" scoped>
  .nav
    position:fixed
    top:44px
    left:0
    display:flex
    z-index:99
    width:100%
    height:44px
    line-height:44px
    font-size:15px
    background:#fff
    border-bottom:1px solid transparent
    &>a
      flex-grow:1
      color:#666
      height: 100%
      display :inline-block
      text-align: center
      box-sizing:border-box
      &.router-link-active
        border-bottom:2px solid #db1eeb
        color:#db1eeb   
</style>  
