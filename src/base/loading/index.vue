<template>
	<div class="loading">
		<img src="./Spinner.gif" width="60" height="60">
		<p>{{loading_text}}</p>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			loading_text:{
				type:String,
				default:"正在加载..."
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.loading
		position:fixed
		z-index:550
		top:50%
		width:100%
		text-align:center
		transform:translateY(-50%)
</style>