<template>
	<div class="search">
		<div class="search_input">
			<input type="text" v-model="searchValue" placeholder="搜索歌曲、歌手、专辑">
			<span class="iconfont icon-sousuo"></span>
			<span class="icon_delete" v-show="searchValue" @click="clearInputValue">X</span>		
		</div>
		天气太热。。。后面补上（没时间写啊。。）
	</div>
</template>
<script>
	export default{
		data(){
			return{
				searchValue:''
			}
		},
		methods:{
			clearInputValue(){
				this.searchValue=""
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.search
		position:fixed
		top:89px
		left:0
		right:0
		z-index:100
		overflow:hidden
		background:#fff
		.search_input
			background:#f2f2f2
			text-align:center
			height:45px
			line-height:45px
			position:relative
			span.icon-sousuo
				position:absolute
				top:0
				left:5px
				font-size:20px
			span.icon_delete
				position:absolute
				top:0
				right:10px
				font-size:15px
				color:#666
			&>input
				outline:none
				border:none
				padding-left:2.5em
				border-radius:5px
				background:#fff
				width:95%
				display:inline-block
				height:30px
				line-height:30px
</style>