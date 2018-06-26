<template>
	<div class="songsheet">
		<p class="title">
			<span>推荐歌单</span>
		</p>
		<ul class="playlist"  ref="moresheet">
			<li v-for="(item,index) in recPlaCom" :key="index" @click="getRecomHeadInfo(item)">
				<router-link :to="'/recommend/' +item.content_id">
					<img v-lazy="item.cover" alt="图片" width="100%" height="100%">
					<div class="text">{{item.title}}</div>
					<div class="listen_num">
						<span class="iconfont icon-erji">{{item.listen_num | listen_num}}</span>
					</div>
				</router-link>
			</li>
		</ul>
		<Loading v-show="!this.recPlaCom.length"></Loading>
	</div>
</template>
<script>
import { apiGetRecomSongSheet } from 'api/getRecomData'
import Loading from '../../base/loading/'

	export default{
		data(){
			return{
				recomPlaylist:{},
				recomdata:8
			}
		},
		components:{
			Loading
		},
		methods:{
			getRecomHeadInfo(item){
				this.$store.dispatch('set_getRecomHeadInfo',item)
			}
		},
		computed:{
			recPlaCom(){
				if(this.recomPlaylist.length>this.recomdata){
				return	this.recomPlaylist.slice(0,this.recomdata+1)
				}else{
					return this.recomPlaylist
				}
			}
		},
		created(){
			apiGetRecomSongSheet().then((res)=>{
					if(res.code===0){
					this.recomPlaylist=res.recomPlaylist.data.v_hot
					}
			})
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../../common/css/iconfont.css'
	.songsheet
		&>.title
			margin:15px 0 5px 0
			padding:0 10px
			border-left:3px solid #db1eeb
		&>.playlist
			display:flex
			justify-content:space-between
			flex-flow:row wrap
			padding:0 3px
			&>li
				width:33%
				margin:3px 0 8px 0
				position:relative
				&>a
					display:block
					width:100%
					&.moresheet
						display:none
					&>img
						border-radius:5px
						max-width:100%
					&>.text
						font-size:13px
						padding:0 3px
						display: -webkit-box
						-webkit-box-orient: vertical
						-webkit-line-clamp: 2
						overflow: hidden
					&>.listen_num
						position:absolute
						top:2px
						right:5px
						color:#fff
						&>span:before
							padding-right:2px						
</style>
