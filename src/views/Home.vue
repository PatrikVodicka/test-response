<template>
    <div>
        <table v-if="products && products.length">

            <thead v-if="cartProducts && cartProducts.length">
            <tr>
                <th>Cart</th>
            </tr>
            <tr>
                <td>id</td>
                <td>name</td>
                <td></td>
                <td>amount</td>
            </tr>
            </thead>

            <tbody class="cart" v-if="cartProducts && cartProducts.length">
            <tr v-for="product in cartProducts" :key="'c-'+product.id">
                <td v-text="product.id"></td>
                <td v-text="product.title"></td>
                <td></td>
                <td v-text="product.amount"></td>
            </tr>
            </tbody>

            <thead>
            <tr>
                <th>All products <i>(click to add to cart)</i>
                </th>
            </tr>
            <tr>
                <td>id</td>
                <td>name</td>
                <td></td>
                <td></td>
            </tr>
            </thead>

            <tbody class="products">
            <tr v-for="product in products" :key="'p-'+product.id" @click="addProduct(product)">
                <td v-text="product.id"></td>
                <td v-text="product.title"></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>

        </table>

        <div v-else style="text-align: center">
            <h2>
                Pending ...
            </h2>
        </div>
    </div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		name: "Home",

			computed: {
				...mapGetters({
					products: 'test/getProducts',
					cartProducts: 'cart/getProducts'
				})
			},

		methods: {
			...mapActions({
				pullProducts: 'products/pullProducts',
				addProduct: 'cart/addProduct',
			})
		},

		mounted() {
			this.pullProducts()
		}
	}
</script>

<style scoped>
    table {
        margin: auto;
        border-collapse: collapse;
    }

    i {
        font-weight: normal;
    }

    thead td {
        font-style: italic;
    }

    td {
        padding: 5px;
        border-bottom: 1px solid black;
    }

    th {
        padding: 50px 5px 30px;
    }

    .products tr {
        cursor: pointer;
        user-select: none;
    }

    .products tr:hover {
        background: rgba(0, 0, 0, .15);
    }
</style>