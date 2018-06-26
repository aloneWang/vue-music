import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {options,basic} from './config'
// 轮播数据
export function apiGetCarousle(){
	const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data=Object.assign({},basic,{
	platform:'h5',
	uin:0,
	needNewCode:1,
	_:1524035576554
	})
 return jsonp(url,data,options)
}
// 推荐音乐
export function apiGetRecomSongSheet(){
	const url="https://u.y.qq.com/cgi-bin/musicu.fcg"
	const data=Object.assign({},basic,{
	data:{
		"comm":{"ct":24},
		"recomPlaylist":{
			"method":"get_hot_recommend",
			"param":{"async":1,"cmd":2},
			"module":"playlist.HotRecommendServer"
		}
	},
	loginUin:0,
	hostUin:0,
	format:'jsonp',
	platform:'yqq',
	needNewCode:0
})
	return jsonp(url,data)
}

// 推荐音乐详情列表
export function apiGetRecomeDetailSongs(disstid){
	const url='/api/getRecomDetailSongs'
	const data ={
		type:1,
		json:1,
		utf8:1,
		onlysong:0,
		disstid,
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:'json',
		inCharset:'utf8',
		outCharset:'utf-8',
		notice:0,
		platform:'yqq',
		needNewCode:0
  }
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}
//获取歌源的vkey的键值
export function apiNormalSong(songmid,filename){
	const url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
	const data={
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:'json',
		inCharset:'utf8',
		outCharset:'utf-8',
		notice:0,
		platform:'yqq',
		uin:0,
		needNewCode:0,
		cid:205361747,
		songmid,
		filename:`C400${filename}.m4a`,
		guid:5544337966
	}
	return jsonp(url,data)
}
