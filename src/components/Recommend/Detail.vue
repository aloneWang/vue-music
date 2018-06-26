<template>
	<SongDetail :songtitle="songtitle" :getRecomHeadInfo="getRecomHeadInfo" 
	:recomeList="recomeList" :recomeListSonglist="recomeListSonglist"></SongDetail>
</template>
<script type="text/javascript">
import {apiGetRecomeDetailSongs} from 'api/getRecomData'
import {mapGetters} from 'vuex'
import {creatSong} from 'common/js/song'
import SongDetail from '../SongDetail/'
import appicon from 'common/images/music.jpg'
	export default{
    data(){
			return{
				songtitle:"aloneWang新歌推荐",
				recomeList:{}
			}
		},
		components:{
			SongDetail
		},
		computed:{
			...mapGetters(['getRecomHeadInfo']),
			//格式化歌曲信息
			recomeListSonglist(){
				if(this.recomeList.songlist){
				let recomeListSonglist=[]
				this.recomeList.songlist.forEach((value)=>{
				recomeListSonglist.push(creatSong(value))
				})
				return recomeListSonglist
				}
			}
		},
		methods:{
			_getRecomeDetailSongs(){
				if(!this.getRecomHeadInfo.content_id){
					this.$router.push('/recommend')
					return
				}
				apiGetRecomeDetailSongs(this.getRecomHeadInfo.content_id).then((res)=>{
					if(res.code===0){
						this.recomeList=res.cdlist[0]
					}
				})
			}
		},
		mounted(){
			this._getRecomeDetailSongs()
		}
	}
</script>


