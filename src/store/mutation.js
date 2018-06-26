export default{
	//推荐歌单的信息
	set_getRecomHeadInfo(state,data){
		state.getRecomHeadInfo=data
	},
	// 歌曲的播放状态
	set_selectPlay(state,data){
		state.play=data
	},
	// 大播放器显示是否
	set_bigPlayer(state,data){
		state.bigPlayer=data
	},
	set_sequenceList(state,data){
		state.sequenceList=data
	},
	// 当前歌曲列表
	set_playlist(state,data){
		state.playList=data
	},
	//当前播放索引
	set_currentIndex(state,data){
		state.currentIndex=data
	},
	//显示最后一个歌曲或歌单
	set_showLast(state,data){
		state.showLast=data
	},
	//设置付费弹窗是否显示
	set_songErrPop(state,data){
		state.songErrPop=data
	}
}