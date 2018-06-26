export  class Song{
	constructor({id,mid,singer,name,album,duration,filename,image}){
		this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.filename=filename
    this.image = image
    this.url=""
    this.detailPage=false
	}
}
export function creatSong(musicInfo){
	return new Song({
		id:musicInfo.songid,
		mid:musicInfo.songmid,
		singer:filterSongName(musicInfo.singer),
		name:musicInfo.songname,
		album:musicInfo.albumname,
		duration:musicInfo.interval,
		filename:musicInfo.strMediaMid,
		image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicInfo.albummid}.jpg?max_age=2592000`
		// url:`http://dl.stream.qqmusic.qq.com/C400${musicInfo.songmid}/${musicInfo.songid}.m4a?guid=6432521350&fromtag=66`
	})
}
//songmid,filename
function filterSongName(singers){
	let sg=""
	if(!singers){return ''}
	singers.forEach((value)=>{
	sg+=`/${value.name}`
	})
	return sg.substring(1)
}
// 格式化 榜单歌曲信息(接口返回值对象属性不一样，又懒得该之前的code)
class TopSongList{
	constructor({id,cover,title,listen_num}){
		this.id=id
		this.cover=cover
		this.title=title
		this.listen_num=listen_num
	}
}

export function formatTopSong(data){
	return new TopSongList({
		id:data.id,
		cover:data.picUrl,
		title:data.topTitle,
		listen_num:data.listenCount
	})
}