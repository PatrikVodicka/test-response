<template>
    <div>
        <table>
            <tr>
                <th>Cart</th>
            </tr>

            <tr style="font-style: italic">
                <td>id</td>
                <td>email</td>
                <td>name</td>
                <td>amount</td>
            </tr>

            <tr class="cart" v-for="product in cart" :key="'cart'+product.id">
                <td v-text="product.id"></td>
                <td v-text="product.email"></td>
                <td v-text="product.name"></td>
                <td v-text="product.amount"></td>
            </tr>

            <tr>
                <th>All products <i>(click to add to cart)</i></th>
            </tr>

            <tr style="font-style: italic">
                <td>id</td>
                <td>email</td>
                <td>name</td>
                <td></td>
            </tr>

            <tr class="product" v-for="product in products" :key="product.id" @click="addProduct(product.id)">
                <td v-text="product.id"></td>
                <td v-text="product.email"></td>
                <td v-text="product.name"></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		name: "Home",

		computed: {
			...mapGetters({
				products: 'products/getProducts',
				cart: 'cart/getProducts',
			}),
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

    td {
        padding: 5px;
        border-bottom: 1px solid black;
    }

    th {
        padding: 50px 5px 30px;
    }

    .product:not(:first-of-type) {
        cursor: pointer;
    }

    .product:not(:first-of-type):hover {
        background: rgba(0, 0, 0, .15);
    }
</style>