<template>
	<div ref="wrapper" :class="{show_last:showLast}">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
import BScroll from 'better-scroll'
const COMPONENT_NAME='scroll'
const DIRECTION_H='horizontal'
const DIRECTION_V='vertical'
export default {
  name: COMPONENT_NAME,
  computed:{
    ...mapGetters(['showLast'])
  },
  watch:{
    $route(to,from){
      if(this.scroll){
        this.scroll.refresh()
      }
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_H
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    }
  },
  methods:{
  	initScroll(){
  		if(!this.$refs.wrapper){
  			return
  		}
  		this.scroll=new BScroll(this.$refs.wrapper,{
  			probeType:this.probeType,
  			click:this.click
  		})
  	}
  },
  mounted(){
    setTimeout(()=>{
      this.initScroll()
    },100)
  }
}
</script>
<style lang="stylus" scoped>
  .show_last
    bottom:60px !important
    overflow:hidden
</style>