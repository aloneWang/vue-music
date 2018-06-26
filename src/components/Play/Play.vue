<template>
		<div class="player" v-show="playList.length>0">
			<!-- 全屏播放器 -->
			<transition name="slip">	
				<div class="biggerplay" v-show="bigPlayer">
					<!-- 背景 -->
					<div class="bg_div">
						<img :src="currentSong.image" alt="" width="100%" height="100%">
					</div>
					<div class="content">
						<!-- 回退按钮 -->
						<div class="back"> 
							<span class="iconfont icon-guanbi" @click="show_bigPlayer"></span>
						</div>
						<!-- 歌曲名 -->
						<div class="songTitle">
							<p class="name">{{currentSong.name}}</p>
							<p class="singer">{{currentSong.singer}}</p>
						</div>
						<!-- cd转盘 -->
						<div class="song_cd">
							<div class="content">
								<img :src="currentSong.image" alt="" :class="playControl">
							</div>
						</div>
						<!-- 歌曲时间控制	 -->
						<div class="progress_bar"></div>
						<!-- 播放控制 -->
						<div class="song_control">
							<div class="playMode">
								<span class="iconfont" :class="playMode" @click="changeMode"></span>
							</div>
							<div class="playControl">
								<span class="iconfont icon-shangyishou" @click="prev" :class="disableCls"></span>
								<span class="iconfont" :class="[playControl,disableCls]" @click="togglePlay"></span>
								<span class="iconfont icon-xiayishou" @click="next" :class="disableCls"></span>
							</div>
							<div class="musicLike">
								<span class="iconfont icon-xihuan"></span>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<div class="miniPlay" @click="show_bigPlayer" v-show="!bigPlayer">
				<div class="left_box">
					<div class="img">
						<img :src="currentSong.image" alt="" :class="playControl">
					</div>
					<div class="songinfo_mini">
						<p class="name">{{currentSong.name}}</p>
						<p class="singer">{{currentSong.singer}}</p>
					</div>
				</div>
				<div class="right_box">
					<p class="icon_wrapper">
						<span class="iconfont" :class="playControl" @click.stop="togglePlay"></span>
					</p>
				</div>
			</div>
			<audio :src="currentSong.url" ref="audio" @error="error" @play="play" @ended="ended" @timeupdate="timeUp">你的浏览器不支持 audio 标签
			</audio>
			<popUpWindow v-show="songErrPop" @win_close="win_close"></popUpWindow>		
		</div>
</template>
<script>
	import {apiNormalSong} from 'api/getRecomData.js'
	import {mapGetters,mapMutations} from 'vuex' 
	import popUpWindow from 'base/popUpWindow'
	import {playMode} from 'common/js/config'
	import {shuffle} from 'common/js/util'
	export default{
		data(){
			return{
				key:null,
				songReady:false,
				mode:0,
				currentTime:0
			}
		},
		computed:{
			...mapGetters([
				'currentSong',
				'selectPlay',
				'playList',
				'bigPlayer',
				'currentIndex',
				'songErrPop',
				'sequenceList'
			]),
			//播放与暂停的icon
			playControl(){
				if(this.selectPlay){
					return "icon-zanting"
				}else{
					return "icon-bofang"
				}	
			},
			disableCls(){
				return this.songReady ? '' : 'disable'
			},
			playMode(){
				return this.mode==playMode.random ? "icon-suiji" : this.mode==playMode.loop ? 'icon-danquxunhuan':"icon-xunhuan"
			}
		},
		watch:{
			//切歌歌曲会自动播放
			currentSong(newSong,oldSong){
				if(!newSong.id || newSong==oldSong){
					return
				}
				apiNormalSong(newSong.mid,newSong.filename).then((res)=>{
					if(res.code==0){
						this.key=res.data.items[0].vkey;
						if(this.key){
							newSong.url=`http://dl.stream.qqmusic.qq.com/C400${newSong.filename}.m4a?vkey=${this.key}&guid=5544337966&uin=0&fromtag=66`
							this.$nextTick(()=>{
								//切歌换图标
								this.set_songErrPop(false)
								this.set_selectPlay(true)
								this.$refs.audio.play()
							})
						}else{
							//显示付费弹窗
							this.set_songErrPop(true)
							this.set_selectPlay(false)
						}						
					}
				})
			},
			// 监听暂停与播放
			selectPlay(newvalue){
				if(this.currentSong.url){
					let audio=this.$refs.audio
					newvalue ? audio.play() : audio.pause()
				}
			}
		},
		methods:{
			...mapMutations([
				'set_selectPlay',
				'set_bigPlayer',
				'set_currentIndex',
				'set_songErrPop',
				'set_playlist'
				]),
			// 关闭付费弹窗
			win_close(data){
				this.set_songErrPop(data)
			},
			// 打开或关闭大播放器
			show_bigPlayer(){
				this.set_bigPlayer(!this.bigPlayer)
			},
			// 暂停与播放
			togglePlay(){
				if(!this.key || !this.songReady){
					return
				}
				this.set_selectPlay(!this.selectPlay)
			},
			//下一首
			next(){
				if(!this.songReady){
					return
				}
				if(this.currentIndex>=this.playList.length-1){
					this.set_currentIndex(0)
				}
				this.set_currentIndex(this.currentIndex+1)
				this.songReady=false
			},
			//上一首
			prev(){
				if(!this.songReady){
					return
				}
				if(this.currentIndex==0){
					this.set_currentIndex(this.playList.length-1)
				}
				this.set_currentIndex(this.currentIndex-1)
				this.songReady=false
			},
			//防止快速切歌报错
			error(){
				this.timer=setTimeout(()=>{
					this.songReady=true
				},1300)
			},
			play(){
				this.timer=setTimeout(()=>{
					this.songReady=true
				},1300)
			},
			// 改变播放模式
			changeMode(){
				this.mode=(this.mode+1)%3
				let list=null
				if(this.mode==playMode.random){
					list=shuffle(this.sequenceList)
				}else{
					list=this.sequenceList
				}
				// 歌曲模式为随机的情况下不会改变当前的歌曲播放
				this.currentSongNomalPlay(list)
				this.set_playlist(list)
			},
			//歌曲结束时做的操作
			ended(){
				//0——循环，1——单曲循环，2——随机
				this.mode==playMode.loop ? this.loop() : this.next()
			},
			timeUp(e){
				this.currentTime=e.target.currentTime
			},
			loop(){
				const audio=this.$refs.audio
				audio.currentTime=0
				audio.play()
			},
			currentSongNomalPlay(arr){
				let songIndex=arr.findIndex((item)=>{
				return item.id==this.currentSong.id
				})
				this.set_currentIndex(songIndex)
			}
		},
		components:{
			popUpWindow
		},
		mounted(){
		}
	}
</script>
<style lang="stylus" scoped>
	@import "../../common/css/iconfont.css"
	@keyframes cd_rotate
		0%
			transform:rotate(0deg)
		100%
			transform:rotate(360deg)
	.slip-enter-active,.slip-leave-active
		transition:all  .2s linear
	.slip-enter,.slip-leave-to
		transform:translate3d(0,70%,0) scale(0.3)
		opacity:0
	.player
		position:fixed
		z-index:300
		bottom:0
		width:100%
		height:60px
		border:1px
		background:#fff
		.biggerplay
			position:fixed
			z-index:500
			top:0
			bottom:0
			right:0
			left:0
			background:#fff
			.bg_div
				position:absolute
				top:0
				bottom:0
				right:0
				left:0
				z-index:-1
				opacity:.6
				filter:blur(20px)
			.content
				height:100%
				position:relative
				.back
					padding:10px 5px
					font-weight:500
					&>span
						font-size:30px
				.songTitle
					width:80%
					font-size:14px
					text-align:center
					margin-top:-40px
					padding:0 30px
					.name
						font-size:20px	
						text-overflow:ellipsis
						overflow:hidden
						white-space:nowrap
				.song_cd
					margin-top:30px
					position:relative
					height:0
					padding-top:80%
					&>.content
						position:absolute
						top:0
						left:50%
						transform:translate(-50%)
						width:80%
						height:100%
						border-radius:50%
						overflow:hidden
						border:10px solid #0e0e0ea3
						img
							width:100%
							display:block
							animation:cd_rotate 25s linear infinite
						img.icon-bofang
							animation-play-state:paused
				.progress_bar
					position:absolute
					bottom:100px
					height:10px
					width:80%
					margin:0 auto
				.song_control
					position:absolute
					bottom:15px
					width:100%
					height:80px
					line-height:80px
					padding:10px 5px
					box-sizing:border-box
					display:flex
					justify-content:space-between
					text-align:center
					.playMode,.musicLike
						flex-basis:23%
						width:23%
						line-height:60px
						&>span
							font-size:30px
							color:rgba(0,0,0,.4)
					.playControl
						flex-grow:1
						line-height:60px
						display:flex
						justify-content:center
						&>span
							color:rgba(0,0,0,.8)
							font-size:30px
							padding:0 10px
							&.disable
								color:rgba(0, 0, 0,.5)	
		.miniPlay
			height:100%
			width:100%
			background:#fff
			box-shadow:0 -1px 5px 1px #33333378
			display:flex
			justify-content:space-between
			color:#333
			.left_box
				flex-grow:1
				padding-left:10px
				display:flex
				justify-content:flex-start
				align-items:center
				width:70%	
				.img
					width:40px
					height:40px
					margin-right:10px
					flex-shrink:0
					img
						width:100%	
						border-radius:50%
						animation:cd_rotate 20s linear infinite
						border:1px solid #333
					img.icon-bofang
						animation-play-state:paused	
				.songinfo_mini
					flex-grow:1
					overflow:hidden
					.name,.singer
						text-overflow:ellipsis
						white-space:nowrap
						overflow:hidden
						font-size:15px
					&>.singer
						font-size:13px			
			.right_box
				flex-basis:50px
				width:50px
				text-align:center
				.icon_wrapper
					height:100%
					line-height:60px
					&>span
						font-size:30px
</style>