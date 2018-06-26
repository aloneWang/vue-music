import {playMode} from 'common/js/config'
export default{
	//推荐歌单的信息
	getRecomHeadInfo:0,
	//歌曲播放状态
	play:false,
	//大播放器
	bigPlayer:false,
	//当前歌曲播放列表
	playList:[],
	//歌曲列表
	sequenceList:[],
	// 当前播放地址
	currentIndex:{},
	//显示左后一个歌曲或歌单
	showLast:false,
	//付费弹窗是否显示
	songErrPop:false,
}