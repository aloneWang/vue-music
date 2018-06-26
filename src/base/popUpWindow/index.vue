<template>
	<transition name="twinkle">
		<div class="wrapper">
			<div class="content">
				<div class="text_top">不好意思，亲，此歌曲需要付费，去其他平台付费吧。</div>
				<div class="select_bottom">
					<a class="close" @click="win_close">关闭</a>
					<a href="https://m.y.qq.com/">去QQ音乐</a>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		methods:{
			win_close(){
				this.$emit('win_close',false)
			}
		}
	}
</script>
<style lang="stylus" scoped>
	//弹窗动画
	.twinkle-enter-active,.twinkle-leave-active
		transition:all  .3s linear
	.twinkle-enter,.twinkle-leave-to
		transform:translateY(-100%)	
	.wrapper
		position:fixed
		z-index:600
		top:0
		bottom:0
		right:0
		left:0
		background:rgba(8,8,8,.7)
		.content
			position:absolute
			top:50%
			left:50%
			transform:translate(-50%,-50%)
			padding:10px
			width:60%
			border:1px solid #fff
			display:flex
			flex-flow:column nowrap
			font-size:16px
			text-align:center
			color:#fff
			border-radius:20px
			.select_bottom
				margin-top:5px
				display:flex
				justify-content:space-between
				align-items:center
				height:30px
				&>a
					color:#fff
					flex-basis:50%
					width:50%
</style>
