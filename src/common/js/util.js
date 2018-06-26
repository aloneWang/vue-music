// 打乱数组
export function shuffle(arr){
	var _arr=arr.slice(0)
	for(var i in _arr){
		var t=getRandomInt(0,i)
		var a=_arr[t]
		_arr[t]=_arr[i]
		_arr[i]=a
	}
	return _arr
}
function getRandomInt(min,max){
	return Math.floor((max-min+1)*Math.random()+min)
}