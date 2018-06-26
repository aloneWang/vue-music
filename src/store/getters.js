export default{
	// 歌单详情页中歌单的信息
	getRecomHeadInfo:state=>state.getRecomHeadInfo,
	//歌曲的播放的状态
	selectPlay:state=>state.play,
	//大播放器
	bigPlayer:state=>state.bigPlayer,
	//当前播放列表
	playList:state=>state.playList,
	//歌曲列表
	sequenceList:state=>state.sequenceList,
	//当前播放索引
	currentIndex:state=>state.currentIndex,
	// 当前播放歌曲
	currentSong:(state)=>{
		return state.playList[state.currentIndex] || {}
	},
	//显示最后一个歌曲或歌单
	showLast:state=>state.showLast,
	//付费弹窗是否
	songErrPop:state=>state.songErrPop,
	//播放模式
}