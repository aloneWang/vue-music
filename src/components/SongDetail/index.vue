<template>
	<transition name="slip">	
		<div class="content">
			<div class="back">
				<span class="iconfont icon-guanbi" onclick="window.history.go(-1)"></span>
			</div>
			<Scroll class="detail-content">
				<div class="wrapper">
						<div class="head">
							<div class="img_logo">
								<img :src="getRecomHeadInfo.cover" alt="logo" width="100%">
							</div>
							<div class="right_text">
								<p class="titile_name">{{getRecomHeadInfo.title}}</p>
								<p class="referer">
									<img :src="appicon" alt="" >
									<span class="text">{{songtitle}}</span>
								</p>
								<div class="play_count">播放量:{{getRecomHeadInfo.listen_num | listen_num}}</div>
							</div>
							<img class="background" :src="getRecomHeadInfo.cover" width="100%" height="100%">
						</div>
						<div class="explain" v-show="recomeList.tags">
							<div class="tags">标签：
								<span v-for="item in recomeList.tags">{{item.name}}</span>
							</div>
							<div v-show="recomeList.desc">
								<div class="text ellipsis" ref="desc" v-html="'简介：'+recomeList.desc"></div>	
								<div class="icon">
									<span class="iconfont icon-guanbi desc_icon" ref="desc_icon" @click="show_tags()"></span>
								</div>
							</div>	
						</div>
						<div class="songlist">
							<div class="title">歌曲列表</div>
							<ul class="wrapper">
								<li v-for="(item,key) in recomeListSonglist" :key="item.id" @click="selectPlay(item,key)">
									<div class="left_box">
										<div class="num">{{key+1}}</div>
										<div class="songinfo">
											<div class="name">{{item.name}}</div>
											<div class="author">{{item.singer}}</div>
										</div>
									</div>
									<div class="right_box">
										<span class="iconfont icon-bofang"></span>
									</div>
								</li>
							</ul>
						</div>	
				</div>
			</Scroll>
			<Loading v-show="!recomeListSonglist.length>0"></Loading>
		</div>
	</transition>
</template>
<script>
	import {mapActions} from 'vuex'
	import {apiNormalSong} from 'api/getRecomData'
	import Scroll from 'base/scroll'
	import appicon from 'common/images/music.jpg'
	import Loading from 'base/loading/'
	export default{
	  data(){
	    return{
				appicon,
				key:""
			}
		}, 
	  components:{
	    Scroll,
	    Loading
		},
		computed:{
			
		},
		methods:{
			//歌单标签
			show_tags(){
				let desc=this.$refs.desc
				let desc_icon=this.$refs.desc_icon
				if(desc.className.indexOf("ellipsis")>0){
					desc.classList.remove("ellipsis")
					desc_icon.style.transform="rotate(90deg)"
				}else{
					desc.classList.add("ellipsis")
					desc_icon.style.transform="rotate(-90deg)"
				}
			},
			// 歌曲信息提交到store
			selectPlay(info,index){
				// commit歌曲列表，索引，播放控制布尔值,歌曲或歌单能显示最后一个，大播放器是否显示
				this.set_Play({
					list:this.recomeListSonglist,
					index
				})
			},
			...mapActions(['set_Play'])
		},
		props:{
			getRecomHeadInfo:{
				type:[Object,Number,Array],
				default(){
					return {}
				}
			},
			recomeList:{
				type:[Object,Array],
				default(){
					return {}
				}
			},
			songtitle:{
			  type:String,
				default:'aloneWang歌单推荐'
			},
			recomeListSonglist:{
				type:[Object,Array],
				default(){
					return{}
				}
			}
		}
	}
</script>
<style lang="stylus" scoped>
	@import "../../common/css/iconfont.css"
	.slip-enter-active,.slip-leave-active
		transition:all  .3s linear
	.slip-enter,.slip-leave-to
		transform:translate(100%)	
	.content
		position :fixed
		right:0
		left:0
		top: 0
		bottom:0
		z-index:100
		background:#fff
		overflow:hidden
		.back
			background :rgba(255,255,255,0.6)
			padding:5px
			box-sizing:border-box
			height:40px
			position :fixed
			width:100%
			top:0
			left:0
			z-index:150
			.iconfont
				font-size:30px
		.detail-content
			position:fixed
			top:0
			left:0
			right:0
			bottom:0
			.wrapper
				box-sizing :border-box
				&>.head
					display :flex
					padding:55px 10px 10px 10px
					justify-content :space-between
					position :relative
					background: rgba(51, 51, 51, 0.4);
					color:#fff
					overflow:hidden
					&>.background
						position :absolute
						top:0
						left:0
						bottom:0
						right:0
						z-index:-1
						background-size :cover
						background-repeat :no-repeat
						filter:blur(20px)
					&>.img_logo
						flex-basis :40%
						width:40%
						flex-shrink :1
						font-size:0;
					&>.right_text
						padding-left: 10px
						flex-basis :60%
						width:60%
						display:flex
						flex-flow:column wrap
						justify-content:space-around
						&>.referer
							img
								display :inline-block
								width:24px
								height:24px
								border-radius:50%
							.text
								vertical-align :top
				&>.explain
					padding: 10px	
					color:#666
					.tags
						font-size:14px
						span
							border:1px solid #666
							padding:0px 4px
							border-radius:10%
							margin-right:10px	
							box-sizing:border-box
							font-size:12px
					.text
						font-size:13px
						margin-top:10px
					.icon
						text-align:right
						font-size:14px
						span
							display:inline-block	
							transition:all .3s linear
							transform:rotate(-90deg)
				&>.songlist
					&>.title
						background:#eee
						font-size:13px
						color:#666
						line-height:20px
						text-indent:10px
						line-height:2em;
					&>.wrapper
						width:95%
						margin:auto
						&>li
							display:flex
							justify-content:space-between
							align-items:center
							padding:10px
							border-bottom:1px solid #6666
							.left_box
								display:flex
								justify-content:flex-start
								align-items:center
								width:80%
								color:#666
								.num
									flex-basis:30px 
									width:30px
									flex-shrink:0
									text-align:center
								.songinfo
									display:flex
									flex-flow:column wrap
									font-size:12px
									flex-grow:1
									margin-left:15px
									overflow:hidden
									.name
										font-size:15px	
										text-overflow:ellipsis
										overflow:hidden
										white-space:nowrap
										margin-bottom:5px																	
							.right_box
								text-align:right
								.icon-bofang
									font-size:25px
									color:#666			
</style>


