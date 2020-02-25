const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos/'

const state = {
	products: []
}

const getters = {
	getProduct(state) {
		return id => state.products.find(product => product.id === id)
	},
	getProducts(state) {
		return state.products
	}
}

const mutations = {
	setProducts(state, payload) {
		state.products = payload
	},

	pushProducts(state, products) {
		console.log('pushing to products:\n', products)

		products.forEach(product => {
			let foundProduct = state.products.find(storedProduct => product.id === storedProduct.id)

			if (foundProduct) {
				Object.assign(foundProduct, product)
			} else {
				state.products.push(product)
			}
		})
	}
}

const actions = {
	pullProducts({commit}) {
		return new Promise( (resolve, reject) => {
			fetch(API_ENDPOINT)
				.then(response => response.json())
				.then(json => {
					console.log('pulled products:\n', json)
					commit('pushProducts', json)
					resolve(json)
				}).catch(reject)
		})
	}
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}