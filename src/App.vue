<template>
	<div id="app">
		<div v-show="NavHea_show">
			<Header></Header>
			<Nav></Nav>
		</div>
		<transition name="bounceLeft">
			<keep-alive>
				<router-view @show_nav="showNav"></router-view>
			</keep-alive>
		</transition>
		<Play></Play>
	</div>
</template>
<script>
import Nav from 'components/Nav/Nav'
import Header from 'components/Header/Header'
import Play from 'components/Play/Play'
export default {
	name: 'App',
	data(){
		return{
			// 解决刷新闪烁的问题
			NavHea_show:false
		}
	},
	watch:{
		$route(to){
			this.conRoute(to.path)
		}
	},
	components:{
		Header,
		Nav,
		Play
	},
	methods:{
		showNav(data){
			this.NavHea_show=data
		},
		conRoute(path){
			if(path.indexOf('comein')<0){
				this.NavHea_show=true
			}
		}
	},
	mounted(){
		this.conRoute(this.$route.path)
	}
}
</script>

<style lang="stylus" scoped>
	.bounceLeft-leave-active
		transition:all .3s linear
	.bounceLeft-leave-to
		transform:translate(-100%)
</style>
