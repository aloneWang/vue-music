import Vue from 'vue'
import  VueRouter from 'vue-router'

Vue.use(VueRouter)
const Recommend=()=>import('components/Recommend/Recommend');
const RecommendDetail=()=>import('components/Recommend/Detail');
const RankDeatil=()=>import('components/Rank/detail')
const ComeIn=()=>import('components/ComeIn/')
const Rank=()=>import('components/Rank/')
const Search=()=>import('components/Search/Search')
const routes=[
  {
    path:'/recommend',
    component:Recommend,
		children:[{
      path:'/recommend/:id',
      component:RecommendDetail
    }]
  },
  {
    path:'/comein',
    component:ComeIn
  },
  {
    path:'/rankings',
    component:Rank,
    children:[{
      path:'/rankings/:id',
      component:RankDeatil
    }]
  },
  {
    path:'/search',
    component:Search
  },
  {
    path:'/',
    redirect:'/comein'
  }
]
export default new VueRouter({
  routes
})
