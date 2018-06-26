<template>
  <div class="recommend">
    <Scroll class="recommend_wrapper" ref="recommend">
      <div>
        <Carousel></Carousel>
        <RecomSongSheet></RecomSongSheet>
      </div>
    </Scroll>
		<router-view></router-view>
  </div>
</template>
<script>
import Scroll from 'base/scroll'
import Carousel from '../Carousel/Carousel'
import RecomSongSheet from '../Recommend_songsheet/SongSheet'
import {mapGetters} from 'vuex'
  export default {
    components:{
      Carousel,
      RecomSongSheet,
      Scroll
    },
    computed:{
      ...mapGetters(['showLast'])
    }
  }
</script>
<style lang="stylus" scoped>
  .recommend
    position:fixed
    z-index:100
    top:89px
    bottom:0
    width:100%
    overflow:hidden
    background:#fff
    .recommend_wrapper
      position:absolute
      top:0
      bottom:0
      width:100%
</style>
