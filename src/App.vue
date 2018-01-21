<template lang="pug">
	#app
		p-c-navbar
		.section.section-for-menu-fixed-top
			router-view
		p-c-footer
	
</template>

<script>
	import PCNavbar from '@/components/layout/Navbar.vue'
	import PCFooter from '@/components/layout/Footer.vue'
	export default {
		name: 'app',
		components: { PCNavbar, PCFooter }
	}
</script>

<style lang="scss">
	@import './scss/main.scss';
</style>
