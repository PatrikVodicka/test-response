import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products'
import cart from './modules/cart'
import test from './modules/test'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		products,
		cart,
		test
	}
})
