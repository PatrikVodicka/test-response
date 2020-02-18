<template>
    <div id="app">
        <div style="width: 100%;text-align: center">
            <h1>Positive UI response test</h1>
            <img alt="Vue logo" src="./assets/logo.png">
        </div>
        <home></home>
    </div>
</template>

<script>
	import Home from './views/Home.vue'

	export default {
		name: 'App',
		components: {
			Home
		},
	}
</script>

<style>
    #app {
        max-width: 1200px;
        margin: 0 auto;
    }
</style>