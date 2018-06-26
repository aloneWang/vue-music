<template>
	<div class="come_index">
		<img src="./music_bj.jpg" alt="音乐背景图片" :height="img_hei">
			<p class="enjoy">
				<router-link to="/recommend">	
					<span @click="hide_recomebg()">ENJOY IT</span>
				</router-link>
			</p>
	</div>
</template>
<script type="text/javascript">
	export default{
		computed:{
			img_hei(){
				return document.documentElement.clientHeight
			}
		},
		methods:{
			hide_recomebg(){
				this.$emit("show_nav",'true')
			},
			autolink(){
				setTimeout(()=>{
					this.$router.push('/recommend')
					console.log("即将跳转")
				},3000)
			}
		},
		mounted(){
			this.autolink()
		}
	}
</script>
<style lang="stylus" scoped>
	@keyframes animateScale
		0%
			transform:scale(0.8)
		100%
			transform :scale(1)
			color:#fffs
	.come_index
			transition :all 0.3s linear
			position :fixed
			z-index:400
			top:0
			left:0
			bottom:0
			&>img
				width:100%
			.enjoy
				position :fixed
				left: 50%
				transform :translate(-50%)
				bottom:100px
				width:100px
				height :30px
				line-height :30px
				border-radius :5px
				border:1px solid #fff
				text-align:center
				& span
					display :inline-block
					animation :animateScale 0.4s infinite alternate
					font-size:18px
					color:#fff
</style>