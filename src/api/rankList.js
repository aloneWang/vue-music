import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {options,basic} from './config'

// 排行榜
export function apiRankList(){
	const url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
	const data= Object.assign({},basic,{
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		_: 1529054340584
	})
	return jsonp(url,data,options)
}

// 榜单详细
export function apiRankDetail(topid){
	const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
	const data=Object.assign({},basic,{
		topid,
		uin:0,
    platform: 'h5',
    needNewCode: 1,
    page: 'detail',
    type: 'top',
    tpl: 3
	})
	return jsonp(url,data,options)
}
