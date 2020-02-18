const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/comments/'

const state = {
	products: []
}

const getters = {
	getProducts(state) {
		return state.products
	}
}

const mutations = {
	pushProduct(state, product) {
		let foundProduct = state.products.find(storedProduct => product.id === storedProduct.id)

		if (foundProduct) {
			foundProduct.amount++
		} else {
			state.products.push(product)
		}
	},

	pushProducts(state, products) {
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
	addProduct( {commit}, id) {
		return new Promise((resolve, reject) => {
			fetch(API_ENDPOINT + id)
				.then(response => response.json())
				.then(product => {
					commit('pushProduct', {
						id: product.id,
						postId: product.postId,
						name: product.name,
						email: product.email,
						body: product.body,
						amount: 1,
					})
					resolve({
						id: product.id,
						postId: product.postId,
						name: product.name,
						email: product.email,
						body: product.body,
						amount: 1,
					})
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