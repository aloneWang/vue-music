import Vuex from 'vuex'
import Vue from 'vue'
import actions from './action'
import mutations from './mutation'
import getters from './getters'
import state from './state'
Vue.use(Vuex)
export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
})