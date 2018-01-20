<template lang="pug">
	#app
		p-c-navbar
		.section.section-for-menu-fixed-top
			router-view
	
</template>

<script>
	import PCNavbar from '@/components/layout/Navbar.vue'
	export default {
		name: 'app',
		components: { PCNavbar }
	}
</script>

<style lang="scss">
	@import './scss/main.scss';
</style>
