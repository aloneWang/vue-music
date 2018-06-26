<template>
	<div class="slider">
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide  v-for="item in carousel" :key="item.id" class="swiperSlide">
				<a :href="item.linkUrl">
					<img :src="item.picUrl" alt="轮播图">
				</a>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>
<script>
import { apiGetCarousle } from 'api/getRecomData'
	export default{
		data(){
			return{
				swiperOption:{
					autoplay:{
						delay:3000,
						disableOnInteraction: false
					},
          setWrapperSize :true,
          pagination:{
          	el:'.swiper-pagination',
          	clickable:true
          },
          loop:true,
          mousewheel: true,
          observeParents:true,
          autoplayDisableOnInteraction: false
				},
				carousel:[]
			}
		},
		created(){
			apiGetCarousle().then((res)=>{
				if(res.code===0){
					this.carousel=res.data.slider
				}
			})
		}
	}
</script>
<style lang="stylus" scoped>
		.swiperSlide
			img
				width:100%
</style>
