<template>
	<SongDetail :songtitle="songtitle" :getRecomHeadInfo="getRecomHeadInfo" 
	:recomeList="songlist" :recomeListSonglist="recomeListSonglist"></SongDetail>
</template>
<script>
	import SongDetail from 'components/SongDetail'
	import {creatSong} from 'common/js/song'
	import {apiRankDetail} from 'api/rankList'
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return{
				songlist:[],
				songtitle:''
			}
		},
		computed:{
			...mapGetters(['getRecomHeadInfo']),
			recomeListSonglist(){
				if(this.songlist.length>0){
					let TopSongList=[]
					this.songlist.forEach((value)=>{
						TopSongList.push(creatSong(value.data))
					})
					return TopSongList
				}
			}
		},
		components:{
			SongDetail
		},
		methods:{
			_getApiRank(){
				if(!this.getRecomHeadInfo.id){
					this.$router.push('/rankings')
					return
				}
				apiRankDetail(this.getRecomHeadInfo.id).then((res)=>{
					if(res.code===0){
						this.songlist=res.songlist
						this.songtitle=res.topinfo.ListName
					}
				})
			}
		},
		created(){
			this._getApiRank()
		}
	}
</script>
<style lang="stylus" scoped>

</style>
