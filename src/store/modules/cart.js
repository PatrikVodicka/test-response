import Vue from 'vue'

function getProductById(id) {
	return state.cartProducts.find(product => product.id === id)
}

const state = {
	cartProducts: []
}

const getters = {
	getProducts(state) {
		return state.cartProducts
	}
}

const mutations = {
	setCartProduct(state, product) {
		let cartProduct = getProductById(product.id)

		if (cartProduct) {
			let cartProductIndex = state.cartProducts.indexOf(cartProduct)
			let copy = product
			copy.amount++

			// dafuq
			Vue.set(state.cartProducts, cartProductIndex, copy)
		} else {
			state.cartProducts.push(Object.assign(product, {amount: 1}))
		}
	},

	pushProduct(state, product) {
		let foundProduct = state.cartProducts.find(storedProduct => product.id === storedProduct.id)

		if (foundProduct) {
			Object.assign(foundProduct, product)
			product.amount++
		} else {
			state.cartProducts.push(Object.assign(product, {amount: 1}))
		}

		console.log('push product to cart:\n', product)
	},

	pushProducts(state, products) {
		products.forEach(product => {
			let foundProduct = state.cartProducts.find(storedProduct => product.id === storedProduct.id)

			if (foundProduct) {
				Object.assign(foundProduct, product)
			} else {
				state.cartProducts.push(product)
			}
		})
	}
}

const actions = {
	addProduct({commit}, product) {
		commit('setCartProduct', product)
	}
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}