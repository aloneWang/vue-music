let listen_num=value=>{
		if(value>Math.pow(10,4)){
			return (value/Math.pow(10,4)).toFixed(1)+'万'
		}else{
			return value
		}
}
export {listen_num}