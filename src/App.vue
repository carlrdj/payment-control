<template lang="pug">
	#app
		p-c-header
		.section.section-for-menu-fixed-top
			router-view
		p-c-footer
	
</template>

<script>
	import PCHeader from '@/components/layout/Header.vue'
	import PCFooter from '@/components/layout/Footer.vue'
	export default {
		name: 'app',
		components: { PCHeader, PCFooter }
	}
</script>

<style lang="scss">
	@import './scss/main.scss';
</style>
