<template>
	<div class="rank">
		<Scroll ref="rank" class="rank_wrapper">
			<div class="topList_wrapper">
				<div v-for="items in topList" :key="items.id" @click="jump(items.id,items)">
					<div class="img">
						<img v-lazy="items.picUrl" alt="图片" width="100%" height="100%">
					</div>
					<ul class="top_three">
						<li v-for="(item,index) in items.songList" :key="item.key" class="song"> 
							<span class="index iconfont" :class="rankIcon[index]"></span>
							<span class="title">{{item.songname+' — '+item.singername}}</span>
						</li>
					</ul>
				</div>
			</div>
			<Loading v-show="!topList.length"></Loading>
		</Scroll>
		<router-view></router-view>
	</div>
</template>
<script>
	import { apiRankList } from 'api/rankList'
	import {mapGetters,mapMutations} from 'vuex'
	import {formatTopSong} from 'common/js/song'
	import Scroll from 'base/scroll'
	import Loading from 'base/loading/'
	export default{
		data(){
			return{
				topList:[],
				rankIcon:['icon-diming','icon-dierming','icon-disanming']
			}
		},
		components:{
			Scroll,
			Loading
		},
		computed:{
			...mapGetters(['showLast'])
		},
		methods:{
			...mapMutations(['set_getRecomHeadInfo']),
			jump(id,items){
				this.$router.push({
					path:`/rankings/${id}`
				})
				this.set_getRecomHeadInfo(formatTopSong(items))
			}
		},
		created(){
			apiRankList().then((res)=>{
				if(res.code==0){
					this.topList=res.data.topList
				}
			})
		}
	}
</script>
<style lang="stylus" scoped>
	.rank
		position:fixed
		z-index:100
		top:89px
		bottom:0
		left:0
		right:0
		background:#fff
		overflow:hidden
		.rank_wrapper
			position:absolute
			top:0
			bottom:0
			width:100%
			.topList_wrapper
				width:95%
				margin:auto
				&>div
					margin-top:10px;
					display:flex
					justify-content:space-between
					.img
						flex-shrink:0
						flex-grow:0
						flex-basis:100px
						width:100px
						height:100px
					.top_three
						flex-grow:1
						overflow:hidden
						display:flex
						flex-flow:column nowrap
						justify-content:space-around
						.song
							display:flex
							justify-content:flex-start
							align-items:center
							font-size:14px
							padding:3px 0 3px 5px
							.index
								margin-right:8px
							.icon-diming
								color:rgb(244, 183, 21)
							.icon-dierming
								color:rgb(178, 178, 178)
							.icon-disanming
								color:rgb(241, 192, 164)	
							.title
								text-overflow:ellipsis
								white-space:nowrap
								overflow:hidden
</style>					

