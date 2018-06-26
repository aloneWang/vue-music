export default{
	//  推荐歌单的信息
	set_getRecomHeadInfo({commit},data){
		commit('set_getRecomHeadInfo',data)
	},
	//点击歌曲，提交歌曲列表，索引等信息
	set_Play({commit},data){
		//播放控制 
		commit('set_selectPlay',true)
		//显示歌曲或歌单最后一a个
		commit('set_showLast',true)
		//歌曲列表
		commit('set_sequenceList',data.list)
		//当前歌曲列表
		commit('set_playlist',data.list)
		//当前歌曲索引、
		commit('set_currentIndex',data.index)
		//大播放器显是否示
		commit('set_bigPlayer',true)
	}
}